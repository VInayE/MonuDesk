<template>
	<div>
		<div class="cart-modal">
   		 	<div class="cross">
     			<span @click="closeMenuBar()" class="cross-icon">X</span>
      		</div>
       		<ul class="cart-body">
       			<div class="t-cart">Travel Cart</div>
       			<transition-group name="fade">
					<li v-for="(item,index) in cartDetailData" :key="index" v-if="cartDetailData.length">
						{{cartData.monumentId}}
						<span class="fl w35"><img :src="item.imagesInfo[0].url" alt="item.shortTitle" class="img-resp"></span>
						<span class="fl m-desc">
							<h2>{{item.shortTitle}}</h2>
							<small class="c666">{{item.cityName}}</small>
							<!-- Removing as per discussion -->
							<!-- <div class="price-info mt10"
								v-if="item.priceInfo && typeof item.priceInfo[selectedCountryType == 'Select Tourist Type' ? 'INDIAN':selectedCountryType] == 'object' && Object.keys(item.priceInfo).length >  0">
								&#8377 {{item.priceInfo[selectedCountryType == 'Select Tourist Type' ? 'INDIAN':selectedCountryType].adult.totalPrice}}<small> per adult</small>
							</div> -->
							<div class="mt20 travel-date">
							<p class="tdate">Travel Date</p>
							<div class="calender-block">
								<input class="book_now_calender"
									@input="showCalenderWidget(index)"
									type="text"
									placeholder=""
									:value="findDisplayDate(new Date(ddate[index]), index)">
								<div class="calender_div" v-if="showCalenderDiv[index]">
									<div class="date-arrow">
										<span class="cal_cross" @click="closeCalennderWidget(index)">X</span>
										<div v-for="(calender, index1) in calenderLength[index]" :key="index1">
											<datepicker
												:full-month-name="true"
												:maximum-view="'day'"
												v-on:selected="changeDateOnSelection($event, index)"
												v-bind:class="{ selectedDate:getSelectedDateIndex(index,index1), unselectedDate : getSelectedDateIndex(index,index1) }"
												:value="calculateDate(index1,index)"
												:inline="true"
												:monday-first="true"
												:disabled="index1 == 0 ? state[index].disabled : state[index].disabled_2" 
												class="input-grp date_picker">
											</datepicker>
										</div>
									</div>
								</div>
								<i class="ico-sprite ico-cal-ff" @click="showCalenderWidget(index)"></i>
							</div>
							<span v-if="item && item.timings && item.timings.timeSlots && item.timings.timeSlots.length > 0" class="prel">
								<span class="t-slot">Time Slot</span>
								<span class="drop-down">
									<select type="text"
									v-model="form.timingbox_index[index]"
									v-on:change="populate(index, item.id)">
										<option v-for="(timeslot, index) in item.timings.timeSlots"
											:key="index"
											:value="timeslot.name + '__' + timeslot.startTime + '__' + timeslot.endTime">
											{{ timeslot.name }}
										</option>
								</select>
								<i class="ico-sprite ico-arr"></i>
								</span>
							</span>
							<span @click="deleteItem(index, item.id)" class="fr del">Remove</span>
							</div>
						</span>
					</li>
				</transition-group>
				<li v-if="failedMonuments.length">
					<p v-for="(item,index) in failedMonuments" :key="index" >{{item}}</p>
				</li>
				<!-- <li>{{cartDetailData.length}} {{detailsUploader}}</li> -->
				<li v-if="(cartDetailData.length == 0 && !detailsUploader)" class="no-cart">
					<img src="../../assets/shopping-bag.png">
					<p>No Monuments in your Travel Cart!</p>
					<span class="make-booking-btn btn-red"
						v-on:click="navigateToHome()">
						Add Monuments
					</span>
				</li>
				<li v-if="cartDetailData.length" class="brd-n btn-fixed">
					<div @click="navigateToHome()">
						<span class="btn-red mr">
							Add Monuments
						</span>
					</div>
					<div @click="proceedCheckout()">
						<span class="btn-red">
							Proceed To Checkout
						</span>
					</div>
				</li>
			</ul>
			<div v-if="errorDiv" class="api-error">
				<span class='api-error-close' @click.prevent="errorDiv = !errorDiv">X</span>
				<p>{{errorDivMsg}}</p>
			</div>
		</div>
		<loader-view v-if="detailsUploader"></loader-view>
	</div>
</template>
<script>
	import {checkMonumentAvailabilityAPIPost, fetchMonumentDetailsDataAPI, deleteMonumentFromCartAPI, saveAdditionalDetails, getCartItems} from '../../api/api'
	import Datepicker from 'vuejs-datepicker'
	import {BASE_URL} from '../../util/constants'
	import axios from 'axios'
	export default {
		data() {
			return {
				dataObject: [],
				ddate: [],
				cartData: [],
				detailsUploader: false,
				responseMasterData: [],
				cartDetailData: [],
				calenderTouch: false,
				showCalenderDiv: [],
				calenderLength: [],
				failedMonuments: [],
				selectedCalenderIndex: 0,
				state: [],
				form: {
					timingbox_index: []
				},
				errorDiv: false,
				errorDivMsg: '',
				monumentObjToPost: {},
				closedDays : {
					'SUNDAY':0,
					'MONDAY':1,
					'TUESDAY':2,
					'WEDNESDAY':3,
					'THURSDAY':4,
					'FRIDAY':5,
					'SATURDAY':6
				}
			}
		},
		props: ['cartDataId', 'managingCount', 'deletedMonument', 'selectedCountryType', 'pleasewaitLoader'],
		components :{
			Datepicker,
			LoaderView : () => import('../common/loader.vue')
		},
		mounted() {
			var _self = this;
			var index = '';
			var handleRequest = [];

            window.addEventListener('keyup', function(event) { 
                if (event.keyCode == 27) {
                    _self.$emit('closeMenuBar', false)
            	} 
			});
			
            _self.detailsUploader = true;
			
			if(_self.cartDataId.length <= 0) {
				_self.detailsUploader = false
			} else {
				handleRequest = _self.cartDataId.map(function(monument, index) {
					var monument = monument
					return (fetchMonumentDetailsDataAPI(monument.productId).catch(error => {
						_self.failedMonuments.push(error.response.data.responseInfo.message)
						//Promise.reject();
					}))
				})
			}
			
			// Fetching monuments details
			axios.all(handleRequest).then(response => {
				(response.map(function(responseData, index){
					if(responseData != 'undefined' && responseData != undefined) {
						_self.cartDetailData.push(responseData.data.data);
                        _self.detailsUploader = false
					}
				}))
				_self.defaultsToTimeSlots()
				_self.fillingCalendar()
				_self.closingDates()
				_self.detailsUploader = false
			})

			_self.$emit('pleasewaitLoader',false)
		},
		methods: {
			getSelectedDateIndex(index,index1){
			   let date1 = new Date()
			   let date2 = date1.setMonth(date1.getMonth()+index1)
			   date2 = new Date(date2)
               if(new Date(this.ddate[index]).getMonth() == date2.getMonth()){
				   return true
			   }else{
				   return false
			   }
			},
			closeMenuBar() {
          		this.$emit('closeMenuBar', false)
			},
			navigateToHome() {
                this.$emit('closeMenuBar', false)
				window.open(`${BASE_URL}/home`, "_self");
			},
			pullingItemId(id) {
				var self = this
				var exactItem = self.cartDataId.filter(function(item, index) {
					return (item.productId == id)
				})
				var exactItemId = exactItem.map(function(item, index) {
					return item.itemId
				})
				return exactItemId
			},
			defaultsToTimeSlots() {
				var _self = this
				// By default first time slot is added
				for(var a = 0; a < _self.cartDetailData.length; a++) {
					_self.$set(_self.showCalenderDiv, a, false);
					_self.monumentObjToPost[_self.cartDetailData[a].id] = {}
					if(_self.cartDetailData[a] && _self.cartDetailData[a].timings && _self.cartDetailData[a].timings.timeSlots != undefined) {
						_self.monumentObjToPost[_self.cartDetailData[a].id].timeSlot  = _self.cartDetailData[a].timings.timeSlots[0]
						_self.monumentObjToPost[_self.cartDetailData[a].id].visitDate = Date.parse(new Date(new Date().setDate(new Date().getDate()+1)))
					} else {
						_self.monumentObjToPost[_self.cartDetailData[a].id].visitDate = Date.parse(new Date(new Date().setDate(new Date().getDate()+1)))
					}
					// update initial values in Monument object
					if(_self.cartDataId[a] && _self.cartDataId[a].additionalDetails && _self.cartDataId[a].additionalDetails.timeSlotSelected != '' && _self.cartDataId[a].additionalDetails.timeSlotSelected != undefined) {
						let timeFSlot = _self.cartDataId[a].additionalDetails.timeSlotSelected.split('__')
						if(timeFSlot.length > 0) {
							var timeFSlotObj = {
								'name' : timeFSlot[0] || '',
								'startTime' : timeFSlot[1] || '',
								'endTime' : timeFSlot[2] || ''
							}
						}
						_self.monumentObjToPost[_self.cartDetailData[a].id].timeSlot = timeFSlotObj
					}
					if(_self.cartDataId[a].additionalDetails && _self.cartDataId[a].additionalDetails.dateSelected != '' && _self.cartDataId[a].additionalDetails.dateSelected != undefined){
						if(new Date(Date.parse(_self.cartDataId[a].additionalDetails.dateSelected)) >= new Date())
							_self.monumentObjToPost[_self.cartDetailData[a].id].visitDate = Date.parse(_self.cartDataId[a].additionalDetails.dateSelected)
						else {
							_self.monumentObjToPost[_self.cartDetailData[a].id].visitDate = Date.parse(new Date(new Date().setDate(new Date().getDate()+1)))
						}
					}
				}
			},
			fillingCalendar() {
				var _self = this
				// Filling values for time slots
				_self.cartDetailData.map(function(monument, a){
					let dis_obj = {
						disabled : {
							days: [],
							to: new Date(new Date().setDate(new Date().getDate() -1)),
							dates:[]
						},
						disabled_2 : {
							days: [],
							from: '',
							dates:[]
						}
					}
					_self.state.push(dis_obj)

					// pushing dates to cart block
					if(_self.cartDataId[a].additionalDetails && _self.cartDataId[a].additionalDetails.dateSelected != '' && _self.cartDataId[a].additionalDetails.dateSelected != undefined) {
						var date = _self.cartDataId[a].additionalDetails.dateSelected
						var d1 = new Date();
						var d2 = new Date(date);
						// checking date coming should not be smaller than todays date
						if(d1.getTime() > d2.getTime()) {
							_self.ddate.push(new Date(new Date().setDate(new Date().getDate()+1)))
						} else {
							_self.ddate.push(new Date(date))
						}						
					}
					else {
						_self.ddate.push(new Date(new Date().setDate(new Date().getDate()+1)))
					}
					
					// pushing time to time slots
					if(_self.cartDataId[a].additionalDetails && _self.cartDataId[a].additionalDetails.timeSlotSelected != '' && _self.cartDataId[a].additionalDetails.timeSlotSelected != undefined){
						_self.form.timingbox_index[a] = _self.cartDataId[a].additionalDetails.timeSlotSelected
					}
					else {
						if(_self.cartDetailData[a].timings.timeSlots != undefined) {
							_self.form.timingbox_index[a] = _self.cartDetailData[a].timings.timeSlots[0].name + '__' + _self.cartDetailData[a].timings.timeSlots[0].startTime + '__' + _self.cartDetailData[a].timings.timeSlots[0].endTime
						}
						else {
							_self.form.timingbox_index[a] = '____'
						}
					}
				})
			},
			closingDates() {
				var _self = this
				// closing dates
				for(var a = 0; a < _self.cartDetailData.length; a++) {
					if(_self.cartDetailData[a].timings.closedDays) {
						for(let i = 0; i < _self.cartDetailData[a].timings.closedDays.length; i++) {
							_self.state[a].disabled.days.push(_self.closedDays[_self.cartDetailData[a].timings.closedDays[i]])
							_self.state[a].disabled_2.days.push(_self.closedDays[_self.cartDetailData[a].timings.closedDays[i]])
						}
					}
					if(_self.cartDetailData[a].timings.holidays) {
						for(let i = 0; i < _self.cartDetailData[a].timings.holidays.length; i++) {
							_self.state[a].disabled.dates.push(new Date(_self.cartDetailData[a].timings.holidays[i]))
							_self.state[a].disabled_2.dates.push(new Date(_self.cartDetailData[a].timings.holidays[i]))
						}
					}
					if(_self.cartDetailData[a].timings.maxDate) {
						_self.state[a].disabled_2.from = new Date(_self.cartDetailData[a].timings.maxDate)
						_self.calenderLength[a] =  _self.monthDiff(new Date(), new Date(_self.cartDetailData[a].timings.maxDate)) + 3
					}
					else {
						_self.calenderLength[a] = 3
					}
				}
			},
			populate(index, id) {
				let timeFSlot = this.form.timingbox_index[index].split('__')
				if(timeFSlot.length > 0) {
					let timeFSlotObj = {
						'name' : timeFSlot[0] || '',
						'startTime' : timeFSlot[1] || '',
						'endTime' : timeFSlot[2] || ''
					}
					this.monumentObjToPost[id].timeSlot = timeFSlotObj
				}
				else {
					console.log("please check the time slots")
				}
				let cartId = localStorage.getItem('cartId')
				let itemId = this.cartDataId[index].itemId
				let itemDetails = {
					timeSlotSelected : this.form.timingbox_index[index]
				}

				saveAdditionalDetails(cartId, itemId, itemDetails).then(response => {
					console.log("item updated")
				}).catch(function(error){
					console.log(error, "can't update")
				})
			},
			monthDiff(d1, d2) {
				var months;
				months = (d2.getFullYear() - d1.getFullYear()) * 12;
				months -= d1.getMonth() + 1;
				months += d2.getMonth();
				return months <= 0 ? 0 : months;
			},
			fetchItemIdFromId(id) {
				var self = this
				var itemId = self.cartDataId.map(function(item, index){
					if(item.productId == id) {
						return item.itemId
					}
				})
				return itemId[0]
			},
			deleteItem(index, id) {
				var self = this
				let deletedMonumentID = self.cartDetailData[index].id
				let deletedItemId = self.pullingItemId(deletedMonumentID)
				let cartId = localStorage.getItem('cartId')
				deleteMonumentFromCartAPI(deletedItemId, cartId).then(function(response) {
					if(response && response.data && response.data.status == true) {
						self.cartDetailData.splice(index,1);
						delete self.monumentObjToPost[id]
						self.$emit('deletedMonument',deletedMonumentID)
						self.$emit('managingCount', self.cartDetailData.length)
					} else {
						if(response && response.data) {
							alert(response.data.message)
						}
					}
				}).catch(function(error) {
					console.log("delete", error)
				})
			},
			proceedCheckout() {
				let self = this
				checkMonumentAvailabilityAPIPost(this.monumentObjToPost).then(response => {
					//self.isAPICompleted = false
					if(response.data.data.monumentsAvailability) {
						self.bookingSuperPNR = response.data.data.superPnr
						var monuJSON = JSON.stringify(response.data.data)
						// Saving required values to local storage
						//localStorage.bookingMonuResponse = monuJSON
						//localStorage.setItem('superPNR', self.bookingSuperPNR)
						var intialURL = process.env.NODE_ENV === 'production' ? 'https://secure.yatra.com' :'http://yatra.com'
						window.open(intialURL+`${BASE_URL}/review?superPNR=${self.bookingSuperPNR}`,"_self")
					} else {
						console.log('something went wrong with response')
					}
				}, response => {
					//self.isAPICompleted = true
					//self.showTravellerDetails = false
					self.errorDiv = true
					if(response && response.response && response.response.data && response.response.data.responseInfo && response.response.data.responseInfo.errors) {
                        self.errorDivMsg =  response.response.data.responseInfo.errors
                    } else {
                        self.errorDivMsg =  "Can't proceed"
                    }
					setTimeout(function(){ self.errorDiv = false }, 2000);
					console.log('something went wrong !!')
				});
			},
			showCalenderWidget (indx) {
				var index = indx.toString();
				for(var key in this.showCalenderDiv) {
					this.$set(this.showCalenderDiv, key, false);
				}
				this.$set(this.showCalenderDiv, indx, true);
			},
			closeCalennderWidget( indx) {
				var index = indx.toString();
				this.$set(this.showCalenderDiv, index, false);
			},
			changeDateOnSelection (event, indx) {
				var index = indx.toString();
				let cartId = localStorage.getItem('cartId')
				this.ddate[indx] = event;
				let itemId = this.cartDataId[index].itemId
				let itemDetails = {
					dateSelected : event
				}
				
				this.calenderTouch = true;
				this.$set(this.showCalenderDiv, indx, false);
				this.selectedCalenderIndex = indx;

				saveAdditionalDetails(cartId, itemId, itemDetails).then(response => {
					console.log("item updated")
				}).catch(function(error){
					console.log(error, "can't update")
				})
			},
			findDisplayDate (date, index) {
				//calender touch for showing dates for the first time
				if(this.calenderTouch == false) {
					return date.getDate() +'/'+ parseInt(parseInt(date.getMonth())+1) + '/'+date.getFullYear()
				}
				else {
					let date = new Date(this.ddate[index]).getDate() +'/'+ parseInt(parseInt(new Date(this.ddate[index]).getMonth())+1) + '/'+new Date(this.ddate[index]).getFullYear()
					this.monumentObjToPost[this.cartDetailData[index].id].visitDate = Date.parse(this.ddate[index])
					return date
				}
			},
			getDate (date) {
				var d = new Date(date)
				return (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
			},
			calculateDate (index,index1) {
				// if(index == this.selectedCalenderIndex) {
				// 	//return this.ddate[index]

					
				// 	var today = new Date(new Date().setDate(new Date().getDate() + 1))
				// 	return new Date(today.getFullYear(), today.getMonth()+index, new Date(this.ddate[index1]).getDate())
				// } else {
				// 	var today = new Date(new Date().setDate(new Date().getDate() + 1))
				// 	return new Date(today.getFullYear(), today.getMonth()+index, new Date(this.ddate[index1]).getDate())
				//}
				var today = new Date(new Date().setDate(new Date().getDate() + 1))
				return new Date(today.getFullYear(), today.getMonth()+index, new Date(this.ddate[index1]).getDate())
			}
		}
	}
</script>
<style scoped="true" lang="stylus">
	.calender_div{
      color: #000;
    position: absolute;
    top: 8px;
    z-index: 999999;
    width: 316px;
    left: -74px;
      .date-arrow {
        height: 322px !important;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        width: 99%;
        left: -80px;
        box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.11);
        top: 32px;
        z-index: 9;
        border-bottom: 2px solid #e2e2e2;
      }
      &:before {
          content: "";
        position: absolute;
        top: 8px;
        right: 126px;
        margin-left: -5px;
        border-width: 12px;
        border-style: solid;
        border-color: transparent transparent #e2e2e2;
        z-index: 99;
      }
    }
    .date_picker{
      background:none!important;
      border:0px !important;
      margin-top:0px!important;
      height:100%!important;
    }
	.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.btn-fixed {
	margin-top : 20px;
	text-align: center;
}
.btn-fixed > div {
	display: inline-block;
	margin-right: 10px;
}
	.c666 {
		color: #9C9798;
	}
	.cart-modal {
		background-color: rgba(0, 0, 0, .6);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		.cross {
			position: absolute;
			right: 50%;
			color: #fff;
			font-size: 14px;
			z-index: 9999;
			background: #000;
			padding: 16px;
			span {
				margin-left: 10px;
				font-size: 16px;
				cursor: pointer;
			}
		}
		.cart-body {
			background: #fff;
			width: 50%;
			height: 100%;
			right: 0;
			position: absolute;
			padding: 18px;
			overflow-y: auto;
			li {
				width: 100%;
				float: left;
				border: 1px solid #ddd;
    			border-radius: 4px;
				margin-bottom: 16px;
				position: relative;
				.m-desc {
					padding: 10px 20px 15px 10px;
					width: 65%
					h2 {
						font-weight: normal;
						font-size: 1.1em;
					}
				}
				.w35 {
					width: 35%;
					img {
						min-height: 138px;
					}
				}
			}
			.btn-red {
				background: #F34F4F;
				padding: 10px;
				color: #fff;
				text-align: center;
				border-radius: 3px;
				cursor: pointer;
				margin-top: 20px;
			}
			.no-cart {
				border: none;
				text-align: center;
				top: 30%;
				position: absolute;
			}
			.brd-n {
				border: none;
				text-transform: capitalize;
			}
		}
		.del {
			color: #ea2330;
			cursor: pointer;
		}

	}
	.calender-block {
		position: relative;
		display: inline-block;
		width: 143px;
	}
	.ico-cal-ff {
		position: absolute;
		top: -11px;
		left: 90px;
	}
	.drop-down{
		border-radius: 5px;
		border: 1px solid #eee;
		padding: 5px 0;
		margin-left: 15px;
		font-size: 0.75em;
		background: #fff;
		color: #777;

		 select {
			padding: 0 14px;
			outline: none;
			text-transform: uppercase;
			position: relative;
			z-index: 1;
			width: 100px;
			cursor: pointer;
			}
		.ico-arr {
			top: 6px;
			right: 5px;
			margin-top: 0;
		}
	}
	.ajax-loader {
		background: white;
		width: 50%;
		height: 100%;
		right: 0;
		position: absolute;
		padding: 18px;
		overflow-y: auto;
	}
	.make-booking-btn {
		display: block;
    	width: 170px;
    	margin: 0 auto;
	}
	.cal_cross{
		position: relative;
		z-index: 10;
		cursor: pointer;
		float: right;
    	font-weight: bolder;
	}
	.t-cart {
		padding-bottom: 15px;
    	font-size: 18px;
	}
	.travel-date {
		position: absolute;
    width: 60%;
    bottom: 10px;
	}
	.tdate {
		font-size: 14px;
    margin-bottom: 5px;
    color: rgb(78, 165, 223);
	}
	.no-cart{
		p{
			margin: 15px 0;
		}
	}
	.vdp-datepicker__calendar .cell.selected.disabled {
		background: transparent !important;
	}
	.mr {
		margin-right: 20px;
	}
	.t-slot {
		position: absolute;
		width: 100%;
		top: -22px;
		font-size: 14px;
		margin-bottom: 5px;
		color: #4ea5df;
		text-align: center;
	}
	.api-error{
    	color: #ea2330;
    	border: 0 !important;
        text-align: center;
        position: absolute;
        top: 40%;
        left: 30%;
        background: #fff;
        padding: 40px 10px;
        -webkit-box-shadow: 0 4px 2px 0 rgba(0,0,0,0.7);  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
        -moz-box-shadow:    0 4px 2px 0 rgba(0,0,0,0.7);  /* Firefox 3.5 - 3.6 */
        box-shadow:         0 4px 2px 0 rgba(0,0,0,0.7);
	}
	.api-error .api-error-close {
	    font-weight: bolder;
        float: right;
        cursor: pointer;
        color: black;
        top: -30px;
        position: relative;
	}
</style>
