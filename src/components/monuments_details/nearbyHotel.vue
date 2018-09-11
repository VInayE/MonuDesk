<template>
   <div>
   <div class="loader" v-if="imageLoader">
		   <div class="sk-wave">
				<div class="sk-rect sk-rect1"></div>
				<div class="sk-rect sk-rect2"></div>
				<div class="sk-rect sk-rect3"></div>
				<div class="sk-rect sk-rect4"></div>
				<div class="sk-rect sk-rect5"></div>
		   </div>
		</div>
		<div class="bg-FAFAFA city-hotels nearby-hotels clearfix" v-if="nearbyHotels && Object.keys(nearbyHotels).length>0">
			<div class="left-section">
				<div class="">
					<div class="block-heading">
						<div class="block-title">
							<h2>Hotels in {{this.cityName}} </h2>
						</div>
					</div>
					<ul>
						<li v-for="items in nearbyHotels.slice(0,4)">
							<img :src="items.image" class="img-resp">
							<div class="block-btm prel">
								<h3>{{items.name}}</h3>
								<div class="price">
									<span>starting From</span><br>
									<strong>&#8377 {{numberComma(items.pricing.price)}} </strong>
								</div>
								<div class="yt-ico-rating yt-rating-4"></div>
								<a class="btn-red pabs" target="_blank" :href="items.detailURL">Choose Room</a>
							</div>
						</li>
						<li class="view-all">
						  <a class="btn-red" target="_blank"
							  :href="viewAllHotelsFn(this.hotelCheckInDate, this.hotelCheckOutDate, this.cityName)">
							  View all Hotels for  {{this.cityName}}
						  </a>
						</li>
					</ul>

				</div>
			 </div>
		  </div>
	</div>
</template>
<script>
import {hotelNearby} from '../../api/api'
import {convertDate, numberWithCommas} from '../../helper/asiHelper'
  export default {
      name:"nearby-hotels",
	   props:['cityName'],
	 data () {
      return {  
        nearbyHotels : {},
        hotelCheckInDate : new Date(new Date().setDate(new Date().getDate())),
        hotelCheckOutDate : new Date(new Date().setDate(new Date().getDate()+2)),
		imageLoader:true
      }   
    },
	created () {
      let self = this
      let cityName = this.cityName
      
      let checkInDate = new Date(new Date().setDate(new Date().getDate()+1))
      checkInDate = self.findDisplayDate(checkInDate)
       
      let checkOutDate = new Date(new Date().setDate(new Date().getDate()+2))
      checkOutDate = self.findDisplayDate(checkOutDate)

      self.hotelCheckInDate = self.findDisplayDate(self.hotelCheckInDate)

      self.hotelCheckOutDate = self.findDisplayDate(self.hotelCheckOutDate)

      hotelNearby(cityName,checkInDate,checkOutDate).then(response => {
		  if(response.data.data) {
			  self.nearbyHotels = response.data.data.hotels
			  this.imageLoader = false
		  }
		  else {
			  this.imageLoader = false
		  }
      }, response => {
         self.nearbyHotels = {}
         this.imageLoader = false
      }); 
    },
    methods : {
      numberComma(price){
         return numberWithCommas(price)
      },
      findDisplayDate (date){
         return this.getDateFormat(date) +'/'+ this.getMonthFormat(date) + '/'+date.getFullYear()
      },
      getMonthFormat(d) {
         var nd = d.getMonth() == '00' ? '0'+(d.getMonth() + 1) : d.getMonth() + 1
         return nd
      },
      getDateFormat(d) {
         return (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
      },
      viewAllHotelsFn(checkinDate, checkoutDate, cityname) {
         let url = 'https://hotel.yatra.com/hotel-search/dom/hotelSearch?checkoutDate='+checkoutDate+'&checkinDate='+checkinDate+'&roomRequests[0].id=1&roomRequests[0].noOfAdults=1&roomRequests[0].noOfChildren=0&source=YATRA_MONUMENTS&tenant=B2C&pg=1&city.name='+cityname+'&city.code='+cityname+'&state.name=&state.code=&country.name=India&country.code=IND'
         return url
      }
    }
  }
</script>
<style scoped lang="scss">
	.loader{
		width: 23%;
		height: 100px;
		margin-top: 20px;
	}
	.nearby-hotels {
	background: #fff;
	.wrapper-width {
		width: 75%;
	}
}
	.btn-red {
		background: #F34F4F;
		padding: 10px;
		color: #fff;
		text-align: center;
		border-radius: 3px;
		right: 15px;
		bottom: 20px;
	}
    .city-hotels {
        ul {
            text-align: center;
            li {
                display: inline-block;
                margin-bottom: 20px;
				border: 1px solid #cecece;
                width:100%;
				vertical-align: top;
				transition: all ease .5s;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    				&:hover {
    				transform: scale(1.1);
    				box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                    cursor: pointer;
    				.img-desc {
    					padding: 10px;
    				}
			}
                .block-btm {
                    text-align: left;
                    padding: 15px;
                    h3 {
                        font-size: 1em;
                        color: #666;
                        width: 98%;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                    }
                    .price {
                        span {
                            color: #999;
                            font-size: 0.750em;
                        }
                        strong {
                            font-size: 1.2em;
                        }
                    }
                    .btn-red{
                        padding: 10px; 
                        font-size: 14px;
                    }
                }
            }
        }
    }
	.yt-ico-rating {
		background: transparent url(https://css.yatra.com/content/yatra-seo/default/images/ico-rating-md.png) 0 1px repeat-x;
		position: relative;
		text-indent: -9999px;
		width: 68px;
		vertical-align: middle;
	}
	 .yt-ico-rating:before {
                background: transparent url(https://css.yatra.com/content/yatra-seo/default/images/ico-rating-md.png) 0 -13px repeat-x;
                content: " ";
                left: 0;
                position: absolute;
                top: 0
            }

             .yt-ico-rating.yt-rating-5:before {
                width: 70px
            }

             .yt-ico-rating.yt-rating-4:before {
                width: 55px
            }

             .yt-ico-rating.yt-rating-3:before {
                width: 42px
            }

             .yt-ico-rating.yt-rating-2:before {
                width: 28px
            }

             .yt-ico-rating.yt-rating-1:before {
                width: 14px
            }

             .yt-ico-rating.yt-rating-0:before {
                width: 0
            }
	@media only screen and (max-width: 640px) {
		.detail-module {
			.bg-FAFAFA {
				padding-bottom: 60px;
			}
			.city-hotels {
				ul {
					text-align: center;
					li {
						margin-right: 0;
					}
				}
			}
		}
	}
  .view-all{
    border: none !important;
    width: 100% !important;
    margin: 10% 0 0;
    box-shadow: none!important;
  }
</style>
