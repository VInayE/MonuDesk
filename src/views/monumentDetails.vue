<template>
  <div class="detail-module" ref="secureSignIn">

    <div id="headerHTML" v-cloak v-show="monumentDetailsData && Object.keys(monumentDetailsData).length > 0"></div>

    <!-- <input id='one' type="checkbox" v-model='whtsappAskConsent' @change="takeWhtsappConsent">
    <label style="display: none" for="one">ask for whtsapp consent</label>
    <span class=''>We'll share your booking on Whatsapp.</span> -->

    <asi-carousel id="monument-carousel" v-if="Object.keys(monumentDetailsData).length > 0"
        :monumentData="monumentDetailsData" 
        :bookingAllowed="monumentDetailsData.isBookable" 
        :monumentCarouselImages="monumentDetailsData.imagesInfo" 
        :monumentCity="monumentDetailsData.cityName" 
        :monumentCaption="monumentDetailsData.caption ? monumentDetailsData.caption : ''" :monumentName="monumentDetailsData.shortTitle" 
        :closingTimings="monumentDetailsData.timings" 
        :monumentPrice ="monumentDetailsData.priceInfo">
    </asi-carousel>

    <div class="left-module">
        <monument-description id="monument-description" v-if="Object.keys(monumentDetailsData).length > 0" :monumentHistory = "monumentDetailsData.history ? monumentDetailsData.history : '' " :monumentName="monumentDetailsData.shortTitle" :monumentDescription="monumentDetailsData.description"></monument-description>
        <monument-information id="monument-information" v-if="Object.keys(monumentDetailsData).length>0" :monumentInfo="monumentDetailsData"></monument-information>
        <monument-ticket-info id="monument-ticket-info" class="clearfix bdr pb50" v-if="Object.keys(monumentDetailsData).length>0" :bookingAllowed="monumentDetailsData.isBookable" :monumentPriceInfo="monumentDetailsData.priceInfo"></monument-ticket-info>
        <monument-detail-gallery id="monument-gallery" v-if="Object.keys(monumentDetailsData).length>0 && monumentDetailsData.imagesInfo.length >1"  :monumentCarouselImages="monumentDetailsData.imagesInfo"></monument-detail-gallery>		    
    </div>

    <div class="right-module">
      <nearby-hotel id="nearby-hotel" v-if="Object.keys(monumentDetailsData).length > 0" :cityName="monumentDetailsData.cityName"
      :hotelCityName="monumentDetailsData.hotelCityName"
      :activityCityId="monumentDetailsData.activityCityId"></nearby-hotel>
    </div>

    <div class="wrapper hotel-section" style="clear:both">
      <nearby-activity id="nearby-activity" v-if="Object.keys(monumentDetailsData).length>0" :cityId="monumentDetailsData.cityId" 
      :cityName="monumentDetailsData.cityName" :activityCityId="monumentDetailsData.activityCityId"></nearby-activity>
    </div>

    <loader-view v-if="showAjaxLoading"></loader-view>

    <div id="footerHTML" v-cloak v-show="monumentDetailsData && Object.keys(monumentDetailsData).length > 0"></div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {fetchMonumentDetailsDataAPI,getFrescoHeader,getFrescoFooter,whtsappConsectUpdateAPI,whtsappConsectFetchAPI} from '../api/api'
  import { adobeAnalyticsPageView } from '../helper/adobeAnalytic'
  export default {
    components : {
     AsiCarousel : () => import('../components/common/asiCarousel.vue'),
     MonumentDescription : () => import('../components/monuments_details/monumentDescription.vue'),
     MonumentInformation : () => import('../components/monuments_details/monumentInformation.vue'),
     MonumentTicketInfo : () => import('../components/monuments_details/monumentTicketInfo.vue'),
     MonumentDetailGallery : () => import('../components/monuments_details/monumentDetailGallery.vue'),
     LoaderView : () => import('../components/common/loader.vue'),
	   NearbyHotel : () => import('../components/monuments_details/nearbyHotel.vue'),
	   NearbyActivity : () => import('../components/monuments_details/nearbyActivity.vue')
    },
    data () {
      return {
        monumentDetailsData :{},
        showAjaxLoading:false,
        whtsappAskConsent: true
      }
    },
    mounted (){
      let self = this
      this.showAjaxLoading = true
        console.log(this.$route)
      getFrescoHeader().then(response => {
          $("#headerHTML").append(response.data)
          if(Object.keys(response.data).length > 0){
              self.getMonumentDetailsData()
          }
      }, response => {
          self.getMonumentDetailsData()
      })
      getFrescoFooter().then(response => {
         $("#footerHTML").append(response.data)
		  setTimeout(function(){
			   $('#footerHTML').css('display','block')
		 },300)
      }, response => {
      })
    },
    methods :{
      // takeWhtsappConsent (){
      //   var self = this
      //   whtsappConsectFetchAPI().then(function(response) {
      //     console.log(response.data.userProfileDetails.userProfile.additionalProperties.filter((item, index) => { return (item.key == 'whatsapp_consent')}))
      //   }).catch(response => console.log(response))
      // },
      pageRefresh() {
        if(localStorage) {
					localStorage.clear()
				}
				window.location.reload()
			},
       saveRecentSearchData(pageUrl, data) {
                var _obj_ = {};
                var date = new Date(data.timings.maxDate);
                var dte = date.getDate()>9?date.getDate():'0'+date.getDate()
                var mnth = date.getMonth()>9?date.getMonth():'0'+date.getMonth()
                var years = date.getFullYear();
                _obj_.expiryDate = dte+'/'+mnth+'/'+years;
                _obj_.url = pageUrl.fullPath;
                _obj_.cityName = data.cityName;
                _obj_.stateName = data.stateName;
                _obj_.product = "monuments";
                _obj_.vertical = _obj_.product;
                _obj_.price = data.priceInfo.INDIAN.adult.totalPrice;
                _obj_.monumentName = data.shortTitle;
                _obj_.page = (typeof page === "undefined") ? "details" : page;
                _obj_.monumentId = pageUrl.query.monumentID;//if any
                _rs_yatra.push(['setAccount', 'yatra.com']); //required 
                console.log(_obj_)
                _rs_yatra.push(["setData", _obj_]);
            },
      getMonumentDetailsData () {
        let self = this
        if(this.$route.query.monumentID) {
		    let monumentId = this.$route.query.monumentID
           fetchMonumentDetailsDataAPI(this.$route.query.monumentID).then(response => {
              document.title = `Yatra | ${response.data.data.shortTitle}`
              setTimeout(function() {
                self.monumentDetailsData =response.data.data
                self.saveRecentSearchData(self.$route,self.monumentDetailsData)
                self.showAjaxLoading = false 
			  	adobeAnalyticsPageView("yt:monument:dom:detail","monuments","web","business","monument detail","domestic monument","detail",self.$route.query.monumentID,"")
              }, 500);	   	       
           }, response => {
              self.monumentDetailsData = {}
              self.showAjaxLoading = false
              this.$router.push({name:'MonumentList'})
           })
        } else {
            this.$router.push({name:'MonumentList'})
        }        
      }
    }
  }
</script>

<style scoped lang="scss">
  .vdp-datepicker__calendar .cell.selected:hover{
    background: #ea2330 !important;
  }
  .hotel-section{
    max-width: 1180px; margin: 0 auto;
  }
  .hotel-section .city-hotels ul li{
    width: 20%;
  }
</style>
