<!--<template>
    <div class="detail-modal">

        <div class="cross" @click="closeModal()">X</div>
        <div class="bg-fff">
            <div class="nav-modal p50 mb20">
                <h1 class="fl">Ticket Booking</h1>
                <span class="fr">Powered by: <i class="ico-sprite ico-yatra" @click="navigateToYatra()"></i></span>
            </div>
            <div class="basic-detail clear" v-if="selectedTab == 'tab1'">
                <div class="traveler-banner">
                	<h2>Itinerary Details - Taj Mahal</h2>
                	<div class="basic-btn">Steps  - 1 of 2</div>
                </div>
                <form>
					 <div class="calender prel" @click="showCalenderDiv = !showCalenderDiv">
				   		<span class="date-txt">{{findDisplayDate(ddate)}}</span>
					   <div class="calender_div" v-if="showCalenderDiv">
							<div class="date-arrow" >
							  <div v-for="(calender,index) in 12">
								  <datepicker  :full-month-name="true" :maximum-view="'day'" v-on:selected="changeDateOnSelection($event,index)" v-bind:class="{ selectedDate: index == selectedCalenderIndex , unselectedDate : index != selectedCalenderIndex }" :value="calculateDate(index)" :inline="true" :monday-first="true" :disabled="index ==0 ?state.disabled:state.disabled_2 " class="input-grp 	date_picker"></datepicker>
							  </div>
							</div>
					   </div>
					   <i class="ico-sprite ico-cal"></i>
					</div>
                    <div class="prel">
						<input type="text" v-model="traveller.email_id" placeholder="Enter your Email" v-on:keypress="restrictSpecialChar">
						<div class="pabs error-msg">
						   <div class="error-message" v-if="submittedForm1 && traveller.email_id == ''">Please Enter Email ID</div>
						   <div class="error-message" v-if="submittedForm1 && traveller.email_id != '' && ! /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(traveller.email_id)">Please Enter Correct Email ID</div>
						</div>
                    </div>
                    <div class="prel">
						<input type="tel" v-model="traveller.telephone_no" placeholder="Mobile Number" v-on:keypress="validateTelephone()" maxlength='10'>
						<div class="pabs error-msg">
						   <div class="error-message" v-if="submittedForm1 && traveller.telephone_no == ''">Please Enter Mobile No</div>
						   <div class="error-message" v-if="submittedForm1 && traveller.telephone_no != '' && traveller.telephone_no.length != 10">Please Enter Correct Mobile No</div>
						</div>
					</div>
                    <div class="price-pay">You Pay: <span>Rs. 5,530</span></div>
                    <div class="d-block">
                    	<button @click.prevent ="navigateToTab_2()" class="d-iblock">Continue</button>
					</div>
                </form>
            </div>
            <div class="basic-detail clear" v-if="selectedTab == 'tab2'">
                <div class="traveler-banner prel">
                <span class="icon-btn pabs">
                	<i class="ico-sprite ico-prev pabs" @click="selectedTab = 'tab1'"></i>
                </span>
                	<h2>Travellers Details - Taj Mahal</h2>
                	<div class="basic-btn">Basic Details: Steps  - 2/2</div>
                </div>
                <div class="scroll-div">
                	<div class="traveller-detail">
                   <ul class="gender">
                   		<li class="d-iblock" @click="selectedGender = 'MALE'">
                   			<span v-bind:class="{ active: selectedGender == 'MALE' }"><i class="ico-sprite ico-male"></i></span>
                   			<p>Male</p>
                   		</li>
                   		<li class="d-iblock" @click="selectedGender = 'FEMALE'">
                   			<span v-bind:class="{ active: selectedGender == 'FEMALE' }"><i class="ico-sprite ico-female"></i></span>
                   			<p>Female</p>
                   		</li>
                   </ul>
					<div class="prel" v-bind:class="{ activeInput: emailDiv  , nonactiveInput: !emailDiv }">
						<input type="text" v-model="paxInfoData.name" placeholder="VISITOR NAME" class="" @focus="emailDiv = true" @blur="emailDiv = false">
						<div class="error-message pabs" v-if="submittedTab2 &&paxInfoData.name == ''">Please Enter Visitor Name</div>
					</div>
                   <div class="prel" v-bind:class="{ activeInput: ageDiv  , nonactiveInput: !ageDiv }">
						<div class="field" >
							<select v-model="paxInfoData.age"  @focus="ageDiv = true" @blur="ageDiv = false">
								<option disabled>AGE</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
								<option value="32">32</option>
								<option value="33">33</option>
								<option value="34">34</option>
								<option value="35">35</option>
								<option value="36">36</option>
								<option value="37">37</option>
								<option value="38">38</option>
								<option value="39">39</option>
								<option value="40">40</option>
								<option value="41">41</option>
								<option value="42">42</option>
								<option value="43">43</option>
								<option value="44">44</option>
								<option value="45">45</option>
								<option value="46">46</option>
								<option value="47">47</option>
								<option value="48">48</option>
								<option value="49">49</option>
								<option value="50">50</option>
								<option value="51">51</option>
								<option value="52">52</option>
								<option value="53">53</option>
								<option value="54">54</option>
								<option value="55">55</option>
								<option value="56">56</option>
								<option value="57">57</option>
								<option value="58">58</option>
								<option value="59">59</option>
								<option value="60">60</option>
								<option value="61">61</option>
								<option value="62">62</option>
								<option value="63">63</option>
								<option value="64">64</option>
								<option value="65">65</option>
								<option value="66">66</option>
								<option value="67">67</option>
								<option value="68">68</option>
								<option value="69">69</option>
								<option value="70">70</option>
								<option value="71">71</option>
								<option value="72">72</option>
								<option value="73">73</option>
								<option value="74">74</option>
								<option value="75">75</option>
								<option value="76">76</option>
								<option value="77">77</option>
								<option value="78">78</option>
								<option value="79">79</option>
								<option value="80">80</option>
								<option value="81">81</option>
								<option value="82">82</option>
								<option value="83">83</option>
								<option value="84">84</option>
								<option value="85">85</option>
								<option value="86">86</option>
								<option value="87">87</option>
								<option value="88">88</option>
								<option value="89">89</option>
								<option value="90">90</option>
								<option value="91">91</option>
								<option value="92">92</option>
								<option value="93">93</option>
								<option value="94">94</option>
								<option value="95">95</option>
								<option value="96">96</option>
								<option value="97">97</option>
								<option value="98">98</option>
								<option value="99">99</option>
								<option value="100">100</option>
							</select>
						</div>
						<div class="error-message" v-if="submittedTab2 && paxInfoData.age == 'AGE'">Enter your Age</div>
						<i class="ico-sprite ico-arr"></i>
					</div>
                   <div class="prel" v-bind:class="{ activeInput: countryGroupDiv  , nonactiveInput: !countryGroupDiv }">
						<div class="field">
							<select v-model="paxInfoData.countryGroup" v-on:change="onChange()" @focus="countryGroupDiv = true" @blur="countryGroupDiv = false">
								<option disabled>COUNTRY GROUP</option>
								<option v-for="(countryGroup,index) in masterDataAJAX.visitors" :key="index">{{index}}</option>
							</select>
						</div>
						<div class="error-message" v-if="submittedTab2 && paxInfoData.countryGroup == 'COUNTRY GROUP'">Please Select Country Group</div>
						<i class="ico-sprite ico-arr"></i>
					</div>
					<div class="prel" v-bind:class="{ activeInput: countryDiv  , nonactiveInput: !countryDiv }">
						 <div class="field">
							<select v-model="paxInfoData.countryName" @focus="countryDiv = true" @blur="countryDiv = false">
								<option disabled>COUNTRY</option>
								<option v-for="(country,index) in masterDataAJAX.visitors[paxInfoData.countryGroup]">{{country.countryName}}</option>
							</select>
						 </div>
						 <div class="error-message" v-if="submittedTab2 && paxInfoData.countryName == 'COUNTRY'">Please Select Country</div>
						 <i class="ico-sprite ico-arr"></i>
					</div>
					<div class="prel" v-bind:class="{ activeInput: identityTypeDiv  , nonactiveInput: !identityTypeDiv }">
						 <div class="field">
							<select v-model="paxInfoData.identityType" @focus="identityTypeDiv = true" @blur="identityTypeDiv = false">
								<option>IDENTITY TYPE</option>
								<option>ADHAAR</option>
								<option>PASSPORT</option>
								<option>DRIVING LICENSE</option>
							</select>
						 </div>
						 <i class="ico-sprite ico-arr"></i>
					</div>
					<div class="prel" v-bind:class="{ activeInput: identityNumberDiv  , nonactiveInput: !identityNumberDiv }">
						<input type="text" v-model="paxInfoData.identityNumber" placeholder="IDENTITY NUMBER" class="identity" @focus="identityNumberDiv = true" @blur="identityNumberDiv = false">
					    <div class="error-message" v-if="submittedTab2 && paxInfoData.identityType != 'IDENTITY TYPE' && paxInfoData.identityNumber == ''">Please Enter the Identity Number</div>
					</div>

                 
              	 <button class="add-traveller" @click="addTravellerList()">ADD TRAVELLER</button>
                	<button @click.prevent="navigateToTab_3()">Continue</button>
                 <div class="traveller-detail-block" v-for="(paxInfo,index) in savedPaxInfo" :key="index">
					<ul class="gender">
						<li class="d-iblock">
							<span class="active"><i v-if="paxInfo.gender =='MALE'" class="ico-sprite ico-male"></i><i v-if="paxInfo.gender =='FEMALE'" class="ico-sprite ico-female"></i></span>
						</li>
					</ul>
					<ul class="g-detail">
						<li>{{paxInfo.countryGroup}}</li>
						<li>{{paxInfo.name}}</li>
						<li>Country - {{paxInfo.countryName}}</li>
						<li>Age - {{paxInfo.age}}</li>
					</ul>
					<ul class="pabs edit-delete">
						<li @click="editTravellerInfo(index)"> Edit</li>
						<li @click="deletePaxInfo(index)">Delete</li>
					</ul>
				 </div>
               	 </div>
                </div>
            </div>
             <div class="basic-detail clear" v-if="selectedTab == 'tab3'">
                <div class="traveler-banner prel">
					 <span class="icon-btn pabs">
						<i class="ico-sprite ico-prev pabs" @click="selectedTab = 'tab2'"></i>
					</span>
                	<h2>Travellers Summary</h2>
                	<div class="basic-btn">Basic Details: Steps  - 3/3</div>
                </div>
			<div class="">
                <ul class="monument-detail">
                    <li class="fl w30">
                       <span class="fl w56">
                        <img :src="summaryDetails.monumentBookingDetails[$route.query.monumentID].imageUrl">
						</span>
                        <div class="calender-date fl">
                            <div class="blue-bg">
                                <p class="month">{{getMonthName(summaryDetails.monumentBookingDetails[$route.query.monumentID].visitDate)}}</p>
                                <p class="date">{{getDate(summaryDetails.monumentBookingDetails[$route.query.monumentID].visitDate)}}</p>
                            </div>
                            <div class="day">{{getDayName(summaryDetails.monumentBookingDetails[$route.query.monumentID].visitDate)}}</div>
                        </div>
                    </li>
                    <li class="fr w70">
                        <div class="header-block">
                            <div class="fl lh-30">
                                <p class="highlight mb0">{{summaryDetails.monumentBookingDetails[$route.query.monumentID].monumentTitle}}</p>
                                <p class="fs14 mb0">{{summaryDetails.monumentBookingDetails[$route.query.monumentID].cityName}} (India)</p>
                            </div>
                        </div>
                        <div class="body-block clear">
                            <ul class="fs14 ad-ch">
                                <li class="fl"><span>Adult: {{summaryDetails.monumentBookingDetails[$route.query.monumentID].adultCount}}</span>  <span style="margin-left:10px;">Child: {{summaryDetails.monumentBookingDetails[this.$route.query.monumentID].childCount}}</span></li>
                            </ul>
                            <div class="travel-detail fs14">
                                <ol class="travel-name fl">
                                    <li v-for="(paxInfo,index) in summaryDetails.monumentBookingDetails[$route.query.monumentID].paxInfo">{{paxInfo.name}} <span class="fr">Age: {{paxInfo.age}}</span></li>
                                </ol>
                            </div>
                            <p class="e-travel txt-l fs14" @click="selectedTab = 'tab2'">Edit Travellers</p>
                            <div class="fr lh-30 price-detail">
                                <p class="fs14">Amount: &#8377 {{summaryDetails.totalPrice}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                  <div class="d-block"><button @click.prevent ="makePayment()" class="d-iblock">Make Payment</button>
					   </div>
				</div>
                
            </div>
        </div>
        <loader-view v-if="isAPICompleted"></loader-view>
    </div>
</template>-->
<!--<script>
 import {fetchMasterDataAPI,savePaxDetailsAPI,getBookingSummaryAPI} from '../../api/api'
  import Vue from 'vue'
  import Datepicker from 'vuejs-datepicker'
  export default {
    name : "detail-modal",
    components:{
      Datepicker,
        LoaderView : () => import('./loader.vue')
    },
    props :{
      bookingSuperPNR : {
        type:String,
        required : true  
      } 
    },
    data () {
      return {
        emailDiv : false,
        isAPICompleted : false,
        ageDiv:false, 
        countryGroupDiv:false,
        countryDiv:false, 
        identityTypeDiv:false,
        identityNumberDiv:false,
        state :{
          disabled :{
             days: [6, 0],
             to: new Date() 
          },
          disabled_2: {
            days: [6, 0]
          }
        }, 
        selectedCalenderIndex :0, 
        superPNR :'',  
        submittedForm1 : false,  
        selectedTab : 'tab1',
        activeTab: 'indian',
        traveller :{
           email_id :'',
           telephone_no :'' 
        },
        showCalenderDiv:false,
        ddate:new Date(new Date().setDate(new Date().getDate()+1)),
        selectedAdults : 'SELECT ADULTS',
        adultsList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        selectedChild : 'SELECT CHILD',
        saarcCountries : ['Afghanistan','Bangladesh','Bhutan','India','Maldives','Nepal','Pakistan','Sri Lanka'],
        bimstecCountries :['Bangladesh','Bhutan','Myanmar','Nepal','Sri Lanka','Thailand'],
        indianCountries :['India'],
        selectedTabAvailableCountry : ['India'],
        selectedCountry:'Select Country:  Ex. India',
        selectedGender :'MALE',
        savePaxDetails :{},
        savedPaxInfo :[],
        masterDataAJAX : {},
        submittedTab2:false,
        summaryDetails:{},
        paxInfoData : {
          'countryGroup':'COUNTRY GROUP',
          'countryName':'COUNTRY',
          'gender' :'',
          'age':'AGE',
          'paxType':'',
          'name':'',
          'identityType':'IDENTITY TYPE',
          'identityNumber':''  
        }
      }
    },
    created () {
     this.superPNR = this.bookingSuperPNR
      let self = this
      fetchMasterDataAPI().then(function (response) {
           self.masterDataAJAX = JSON.parse(response.body).data
      }).catch(function (error) {
           self.masterDataAJAX = {}
      })
      window.addEventListener('keyup', function(event) {
         if(event.keyCode ==27){
			self.showCalenderDiv = false
		 }
      });
      window.addEventListener('click', function(event) {
	 	if(event.target.className.toString() != 'calender prel' && event.target.className.toString() != 'ico-sprite ico-cal') {
             self.showCalenderDiv = false
         }
      });
    },
    watch :{
      activeTab () {
        this.selectedCountry = 'Select Country:  Ex. India'  
      }
    },
    methods:{
     navigateToYatra (){
         window.open('https://www.yatra.com')
     },    
      makePayment (){
          let self = this
           let paymentForm = document.createElement('FORM')
           paymentForm.name = 'payment_form'
           paymentForm.method = 'POST'
           paymentForm.action = 'https://secure.yatra.com/PaySwift/payment'
           var response = {
             'superPnr':self.superPNR,
              'product':'asimonuments',
               'merchant':'yatra'
           }
          let formKeys = Object.keys(response)
          for (let i = 0; i < formKeys.length; i++) {
              let formInput = document.createElement('INPUT')
              formInput.type = 'HIDDEN'
              formInput.name = formKeys[i]
              formInput.value = response[formKeys[i]]
              paymentForm.appendChild(formInput)
           }
           document.body.appendChild(paymentForm)
           paymentForm.submit()
      },  
      changeDateOnSelection (event,index){
          this.ddate = event
          this.selectedCalenderIndex = index
      },
      findDisplayDate (date){
         return date.getDate() +'/'+ parseInt(parseInt(date.getMonth())+1) + '/'+date.getFullYear()
      },  
      calculateDate (index){
        if(index == this.selectedCalenderIndex) {
            return this.ddate
        } else {
            var today = new Date();
            return new Date(today.setMonth(today.getMonth()+index))
        }  
      },  
      getMonthName (){
        var d = new Date(this.ddate)
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return monthNames[d.getMonth()]
      }, 
      getDate () {
         var d = new Date(this.ddate) 
         return d.getDate()
      },
      getDayName () {
         var d = new Date(this.ddate)
         var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
         return days[d.getDay()]
      },
      validateForm2(){
        return this.paxInfoData.identityType !='IDENTITY TYPE' ? this.paxInfoData.identityNumber !='' && this.paxInfoData.name != '' && this.paxInfoData.age != 'AGE' && this.paxInfoData.countryName != 'COUNTRY' && this.paxInfoData.countryGroup != 'COUNTRY GROUP' : this.paxInfoData.name != '' && this.paxInfoData.age != 'AGE' && this.paxInfoData.countryName != 'COUNTRY' && this.paxInfoData.countryGroup != 'COUNTRY GROUP'
      },
      validateContinueTab_2 (){
        return this.paxInfoData.identityType =='IDENTITY TYPE' &&  this.paxInfoData.identityNumber == '' && this.paxInfoData.name == '' && this.paxInfoData.age == 'AGE' && this.paxInfoData.countryName == 'COUNTRY' && this.paxInfoData.countryGroup == 'COUNTRY GROUP'
      },
      savePaxDetailsAPI (){
        let adultCount = 0,childCount = 0 ;
               for(let i=0 ; i < this.savedPaxInfo.length ; i++){
               if(this.savedPaxInfo[i].paxType == "CHILD") {
                 childCount += 1
               } else {
                 adultCount +=1 
               }
             }
             this.savePaxDetails.monumentPaxSummary[this.$route.query.monumentID].adultCount = adultCount
             this.savePaxDetails.monumentPaxSummary[this.$route.query.monumentID].childCount = childCount
             this.savePaxDetails.monumentPaxSummary[this.$route.query.monumentID].paxInfo = this.savedPaxInfo 
              let self = this 
              this.isAPICompleted = true
              savePaxDetailsAPI(this.superPNR,self.savePaxDetails).then(function (response) {
                 self.getSummaryDetails ()
              }).catch(function (error) {
                 console.log(error)
                 self.isAPICompleted = false
              })
      },
      getSummaryDetails (){
        let self = this 
        getBookingSummaryAPI(this.superPNR).then(function (response) {
           self.isAPICompleted = false 
           self.selectedTab = "tab3"
           self.summaryDetails = JSON.parse(response.data).data
           console.log(self.summaryDetails.monumentBookingDetails[self.$router.currentRoute.query.monumentID].imageUrl)
        }).catch(function (error) {
            self.isAPICompleted = false 
                 console.log(error)
        })
      },
      navigateToTab_3(){
        if(this.savedPaxInfo.length > 0){
           if(this.validateContinueTab_2 ()) {
              this.submittedTab2 = false
              this.savePaxDetailsAPI ()
           } else if(this.validateForm2()){
              this.addTravellerListData ()
              this.submittedTab2 = false
              this.savePaxDetailsAPI()
           } else {
               this.submittedTab2 = true
           }
        } else if(this.savedPaxInfo.length ==0){
            this.submittedTab2 = true
            if(this.validateForm2()){
               this.addTravellerListData ()
               this.submittedTab2 = false
               this.savePaxDetailsAPI() 
            }
        }  
      },  
      onChange () {
        this.paxInfoData.countryName = this.masterDataAJAX.visitors[this.paxInfoData.countryGroup][0].countryName
      },  
      editTravellerInfo (index){
         this.paxInfoData = {
          'countryGroup':this.savedPaxInfo[index].countryGroup,
          'countryName':this.savedPaxInfo[index].countryName,
          'gender' :this.savedPaxInfo[index].gender,
          'age':this.savedPaxInfo[index].age,
          'paxType':this.savedPaxInfo[index].paxType,
          'name':this.savedPaxInfo[index].name,
          'identityType':this.savedPaxInfo[index].identityType =='' ?'IDENTITY TYPE':this.savedPaxInfo[index].identityType ,
          'identityNumber':this.savedPaxInfo[index].identityNumber
        }
        this.selectedGender = this.savedPaxInfo[index].gender
        this.savedPaxInfo.splice(index,1) 
      },  
      deletePaxInfo(index){
         this.savedPaxInfo.splice(index,1) 
      },
      addTravellerListData(){
         this.paxInfoData.gender = this.selectedGender
            this.paxInfoData.identityType = this.paxInfoData.identityType == 'IDENTITY TYPE' ? '' : this.paxInfoData.identityType
            this.paxInfoData.identityNumber = this.paxInfoData.identityType == 'IDENTITY TYPE' ? '' : this.paxInfoData.identityNumber
            this.paxInfoData.paxType = parseInt(this.paxInfoData.age) >= 15 ? 'ADULT':'CHILD'
            this.savedPaxInfo.push(Vue.util.extend({}, this.paxInfoData))
            this.selectedGender = 'MALE'
            this.paxInfoData = {
             'countryGroup':'COUNTRY GROUP',
             'countryName':'COUNTRY',
             'gender' :'',
             'age':'AGE',
             'paxType':'',
             'name':'',
             'identityType':'IDENTITY TYPE',
             'identityNumber':''  
           }
      },
      addTravellerList (){
         this.submittedTab2 = true
         if(this.validateForm2()){
            this.submittedTab2 =false 
            this.addTravellerListData() 
         } 
      },
      validateTab_1Form () {
          var test = this.traveller.email_id != '' && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.traveller.email_id) && this.traveller.telephone_no != '' && this.traveller.telephone_no.length == 10
          return test
      },  
      navigateToTab_2 () {
        this.submittedForm1 = true  
        if(this.validateTab_1Form()) {
           this.submittedForm1 = false 
           this.savePaxDetails.email = this.traveller.email_id
           this.savePaxDetails.phone = {
            'isd' :'91',
            'number':this.traveller.telephone_no  
           }
           this.savePaxDetails.monumentPaxSummary = {
              [this.$route.query.monumentID] : {}
           }
           this.savePaxDetails.monumentPaxSummary[this.$route.query.monumentID].visitDate = Date.parse(new Date(this.ddate)) 
           this.selectedTab = 'tab2'
        }
        
      },  
      validateTelephone(evt,option){
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
           event.preventDefault();
           return false;
        }
      },  
      closeModal () {
         var d = document.getElementsByTagName('html')
         d[0].style.overflow = 'auto'  
         this.$emit('closeTravellerModal',false)
      },
        restrictSpecialChar(event) {
            var regex = new RegExp("^[-_@.a-zA-Z0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        }
    },
    mounted () {
      var d = document.getElementsByTagName('html')
       d[0].style.overflow = 'hidden'   
    }    
  }
</script>-->
<!--<style scoped="true" lang="scss">
	.mb0 {
		margin-bottom: 0;
	}
    .calender{
        border-radius: 50px;
        margin-left:21%;
		background: #fff;
		border: 1px solid #CFCFCF;
		height: 45px;
		width: 58%;
		margin-top: 15px;
		padding-left: 5%;
		text-transform: uppercase;
		font-size: 12px;
		.calender_div{
			.date-arrow {
			  height: 282px!important;
			  overflow-y: auto;
			  overflow-x: hidden;
			  position: absolute;
			  width: 100%;
			  left: 0;
			  box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.11);
			  top: 50px;
			  z-index: 9;
			}
			&:before {
			    content: "";
				position: absolute;
				top: 27px;
				right: 29px;
				margin-left: -5px;
				border-width: 12px;
				border-style: solid;
				border-color: transparent transparent #fff;
				z-index: 99;
			}
		}
		.date_picker{
			background:none!important;
			border:0px !important;
			margin-top:0px!important;
			height:100%!important;
		}
		.date-txt {
			float: left;
			margin-top: 16px;
			color: #666666;
		}
      }
    .cross{
          position: absolute;
    left: 36%;
    color: white;
    font-size: 24px;
    padding: 12px 10px 10px 18px;
    cursor: pointer;
    height: 50px;
    width: 50px;
    background: black;
    }
    .basic-detail {
		.traveler-banner {
			background-image: url(../../assets/travel-banner.png);
			height: 110px;
			width: 100%;
			background-position: center;
			.basic-btn {
				width: 250px;
				margin: 0 auto;
				background-color: #f1f1f1;
				border-radius: 30px;
				padding: 12px;
				color: #333;
			}
		}
                form {
                    margin-top: 20px;
                    p {
                        color: #666666;
                        font-size: 0.875em;
                        margin-bottom: 10px;
                    }
                    .country-grp {
                        li {
                            display: inline-block;
                            border: 1px solid #eeeeee;
                            background: #fff;
                            color: #666;
                            cursor: pointer;
                            font-size: 0.875em;
                            text-align: center;
                            width: 15%;
                            height: 53px;
                            line-height: 53px;
                            margin-left: -5px;
                            &:first-child {
                                border-radius: 50px 0px 0px 50px;
                                border-right: none;
                            }
                            &:last-child {
                                border-radius: 0px 50px 50px 0px;
                                padding-right: 10px;
                            }
                            &.active {
                                background: #ea2330;
                                color: #fff;
                            }
                        }
                    }
                    .input-grp {
                        margin-top: 15px;
                        div {
                            border-radius: 50px;
                            display: inline-block;
                            overflow: hidden;
                            background: #fff;
                            border: 1px solid #eeeeee;
                            width: 29%;
                            height: 45px;
                            margin-right : 5px;
                            font-size: 12px;
                            line-height: 45px;
                            select {
                                border: 0;
                                outline: none;
                                width: 75%;
                                background: #fff;
                                color: #666;
                            }
                        }
                    }
                    input {
                            border-radius: 50px;
                            background: #fff;
                            border: 1px solid #CFCFCF;
                            height: 45px;
                            width: 58%;
                            margin-top: 15px;
                            padding-left: 5%;
                            font-size: 12px;
							transition: ease out .2s;
                    }
                    .tel-ex {
                            border-radius: 50px;
                            display: inline-block;
                            overflow: hidden;
                            background: #fff;
                            border: 1px solid #eeeeee;
                            width: 58%;
                            height: 45px;
                            line-height: 45px;
                            margin-top: 15px;
                            font-size: 12px;
                            select {
                                border: 0;
                                outline: none;
                                width: 86%;
                                background: #fff;
                                color: #666;
                                text-transform: capitalize;
                            }
                        }
                    .price-pay {
                        margin-top: 15px;
                        font-size: 1.250em;
                    }
                    button {
                        margin-top: 15px;
                        border: 1px solid #eee;
                        background: #ea2330;
                        padding: 15px;
                        border-radius: 50px;
                        width: 200px;
                        color: #fff;
                        text-transform: uppercase;
                        font-size: 1.063em;
                    }
                }
				.traveller-detail {
					font-size:0.750em;
					width: 68%;
					margin: 30px auto;
					.prel {
						border-radius: 50px;
						display: inline-block;
						vertical-align: top;
						background: #fff;
						border: 1px solid #CFCFCF;
						width: 48%;
						height: 45px;
						line-height: 45px;
						margin-left: 10px;
						margin-bottom: 25px;
					select {
						border: 0;
						outline: none;
						width: 75%;
						background: transparent;
						color: #666;
						height: 40px;
						position: relative;
						z-index: 99;
						cursor: pointer;
					}
					p {
						color: #666;
						margin-top: -5px;
					}
						.field {
							width: 100%;
						}
            	}
					input {
					padding-left: 0;
						width: 78%;
				}
					.traveller-detail-block {
						border-radius: 3px;
						width: 97%;
						height: auto;
   						padding: 12px 0px 2px 12px;
						background: #fff;
						position: relative;
						overflow: hidden;
                        margin-bottom:10px;
                        margin-top:10px;
						.gender {
							text-align: left;
							float: left;
							margin-right: 20px;
						}
						.g-detail {
							color: #333;
							float: left;
							text-align: left;
							line-height: 24px;
							li{
								&:nth-child(1) {
									font-size: 14px;
								}
								&:nth-child(2) {
									font-size: 22px;
								}
							}
						}
						.edit-delete {
							right: 0;
							height: 100%;
							top: 0;
							border-left: 1px solid #eee;
							padding: 10px;
							li {
								cursor: pointer;
								color: #ea2330;
								border-bottom: 1px solid #ccc;
								padding: 10px 15px;
								&:last-child{
									border-bottom: 0;
								}
							}
						}
					}
					.error-message {
						position: absolute;
						top: 35px;
						left: 16px;
					}
				}
				.text {
					width: 70%;
					margin: 60px auto;
					display: block;
					font-size: 14px;
					text-align: left;
					line-height: 20px;
					margin-bottom:20px;
				}
				button {
					margin-top: 15px;
					border: 1px solid #eee;
					background: #ea2330;
					padding: 15px;
					border-radius: 50px;
					width: 35%;
					color: #fff;
					text-transform: uppercase;
					font-size: 1.063em;
					margin-right: 10px;
				}
				.error-msg {
					right: 183px;
					top: 32px;
					font-size: 0.875em;
				}
            }
     .monument-detail {
        padding: 20px;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        overflow: hidden;
        margin: 40px 20px;
        background: #fff;
		 .w56 {
			 width: 56%;
			 img {
				 width: 100%;
				 height: auto;
				 min-height: 116px;
			 }
		 }
        .w30 {
            width: 40%;
            margin-right: 2%;
        }
        .w70 {
            width: 58%;
        }
        .calender-date {
            margin-left: 20px;
            width:100px;
        .blue-bg {
                background: #ea2330;
                color: #fff;
                padding: 9px;
                border-radius: 5px 5px 0 0;
                .date {
                    font-size: 30px;
                    margin-top: 5px;
                    margin-bottom:0px!important;
                }
            }
            .day {
                border: 1px solid #eee;
                padding: 4px;
                font-size: 14px;
                border-radius: 3px 0 3px 3px;
            }
        }
        .header-block {
            float: left;
            width: 100%;
            border-bottom: 2px solid #eee;
            padding-bottom: 7px;
            text-align: left;
            .lh-30 {
                line-height: 30px;
            }
            .highlight {
                font-size: 24px;
                font-weight: bold;
            }
        }
        .body-block {
            .c2387F5 {
                color: #ea2330;
                cursor: pointer;
            }
            .ad-ch {
                margin-top: 10px;
                display: inline-block;
                width: 100%;
            }
            .travel-detail {
                margin-top: 15px;
                overflow: hidden;
                padding-bottom: 10px;
                border-bottom: 2px solid #eee;

                .travel-name {
                    text-align: left;
                    width: 95%;
                    line-height: 25px;
                    margin-left: 15px;
                    li {
                        list-style-type: decimal;
                    }
                }
                .travel-price {
                    line-height: 25px;
                    width: 44%;
                    .total-price {
                        border-top: 1px solid #eee;
                        margin-top: 10px;
                        padding-top: 12px;
                        font-weight: bold;
                        font-size: 16px;
                    }
                }
            }
            .e-travel {
                color: #ea2330;
                margin-top: 5px;
                text-align:left;
                cursor:pointer;
            }
        }
    }

	@media only screen and (min-width: 800px) and (max-width: 1024px) {
			.detail-modal  {
				.bg-fff {
					width: 80%;
				}
				.cross {
						left: 15%;
					}
		}
	}

	@media only screen and (min-width: 668px) and (max-width: 768px) {
		.detail-modal  {
			.bg-fff {
				width: 100%;
				position: absolute;
				overflow-y: auto;
				.basic-detail {
					button {
						width: 35%;
					}
				}
			}
			.nav-modal {
				.fr {
					margin-right: 20px;
				}
			}
			.cross {
				right: -7px;
				color: #000;
				font-size: 24px;
				background: transparent;
				top: 3px;
				left: auto;
				z-index: 9;
			}
		}
	}


	@media only screen and (max-width: 667px) {
		.banner-content {
			h1{
				font-size: 1em !important;
			}
		}
		.detail-modal  {
			.bg-fff {
				width: 100%;
			}
			.calender {
				margin-left: 4%;
				width: 92%;
			}
			form {
				input {
					width: 90%;
				}
			}
			.nav-modal {
				.fr {
					float: left;
					margin-left: 10px;
				}
			}
			.cross {
				right: -7px;
				color: #000;
				font-size: 24px;
				background: transparent;
				top: 3px;
				left: auto;
			}
			.basic-detail {
				height: 100%;
				overflow-y: auto;
				position: absolute;
				width: 100%;
				padding-bottom: 80px;
				h2 {
					font-size: 1em;
				}
				button {
					width: 60%;
				}
				.error-msg {
					right: 30px;
				}
			}
			.traveller-detail {
				width: 80%;
				.prel {
					margin-left: 0;
					width: 100%;
				}
				.traveller-detail-block {
					.gender {
						display: none;
					}
				}
			}
			.traveler-banner {
				.icon-btn {
					.ico-prev {
						left: 7px;
						top: -20px;
						}
			 	 }
			}
			.monument-detail {
				.w30 ,.w56,.w70{
					width: 100%;
					position: relative;
				}
				.calender-date {
					position: absolute;
					right: 0;
   					top: 8px;
				}
				.header-block {
					> div {
						width: 100%;
					}
					p {
						margin-bottom: 0;
					}
					.price-detail {
						p{
							&:first-child {
								float: left;
							}
							&:last-child {
								float: right;
							}
						}
					}
					.highlight {
						font-size: 20px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						display: inline-block;
					}
				}
			}
		}
	}
    .activeInput{
       border: 2px solid #ea2330 !important; 
    }
</style>-->
