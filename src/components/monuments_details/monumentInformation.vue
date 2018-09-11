<template>
   <div class="bg-FAFAFA monument-information clearfix bdr">
   <div class="left-section">
    <div class="wrapper-width">
        <div class="block-heading">
            <div class="block-title">
                <h2>Monument Information</h2>
            </div>
        </div>

        <div class="monument-info prel">
            <ul class="fl">
                <li  @click="activeTab = 'overview' " v-bind:class="{ active: activeTab == 'overview' , nonactive: activeTab != 'overview' }"><a>Overview</a></li>
                <li @click="activeTab = 'weather' " v-bind:class="{ active: activeTab == 'weather' , nonactive: activeTab != 'weather' }"><a>Weather</a></li>
                <li @click="activeTab = 'maps' " v-bind:class="{ active: activeTab == 'maps', nonactive: activeTab != 'maps' }"><a>Location</a></li>
                <li @click="activeTab = 'facility' " v-bind:class="{ active: activeTab == 'facility', nonactive: activeTab != 'facility' }"><a>Facilities</a></li>
                <li @click="activeTab = 'accomodation' " v-if="monumentInformation.accomodations" v-bind:class="{ active: activeTab == 'accomodation', nonactive: activeTab != 'accomodation' }"><a>Accommodation</a></li>
                <li @click="activeTab = 'contact' " v-bind:class="{ active: activeTab == 'contact', nonactive: activeTab != 'contact' }"><a>Contact Details</a></li>
                <li @click="activeTab = 'museums' " v-if="monumentInformation.museums" v-bind:class="{ active: activeTab == 'museums', nonactive: activeTab != 'museums' }"><a>Museums</a></li>
            </ul>

             <div class="weather-info" v-if="activeTab == 'overview'">
              <div class="section-hours">
               <div class="section-address">
                  <h3>Address</h3>
                  <p>{{monumentInformation.address}}</p>
                </div>
                  <div class="section-howto">
                  <h3>How To Reach</h3>
                  <ul class="nearby">
                      <li><span class="w30">Nearest Airport :</span> <span class="ml20 w50">{{monumentInformation.nearestAirport.name}}</span></li>
                      <li><span class="w30">Nearest Railway Station :</span> <span class="ml20 w50">{{monumentInformation.nearestRailwayStation.name}}</span></li>
                      <li><span class="w30">Nearest Bus Station :</span><span class="ml20 w50">{{monumentInformation.nearestBusStation.name}}</span></li>
                  </ul>
                </div>
                <div class="opening">
                  <h3>Opening Hours</h3>
                    <ul class="nearby">
                      <li><span class="w30">Opening Time : </span><span class="ml20 w50">{{monumentInformation.timings.openingTime}}</span></li>
                      <li><span class="w30"> Closing Time :</span> <span class="ml20 w50">{{monumentInformation.timings.closingTime}}</span></li>
                      <li v-if="monumentInformation.timings.closedDays && monumentInformation.timings.closedDays.length > 0"><span class="w30" >Closed Days : </span> <span class="ml20 w50"><span class="mr10" v-for="(days,index) in monumentInformation.timings.closedDays" :key="index">{{days}} </span>   </span></li>
                      <li v-if="monumentInformation.timings.holidays && monumentInformation.timings.holidays.length > 0"><span class="w30" >Holidays : </span> <span class="ml20 w50"><span class="mr10" v-for="(days,index) in monumentInformation.timings.holidays" :key="index">{{formatDate(days)}} </span>   </span></li>
                      <li v-for="(externalLink,index) in monumentInformation.externalLinks" :key="index" @click="linkToNight(externalLink.link)" class="link_to_night">{{externalLink.name}}</li>
                  </ul>
                  </div>
                </div>  
            </div>


            <div class="weather-info" v-if="activeTab == 'weather'">
                <h3>Weather</h3>
              
                <div class="bg-weather p20">
                    <ul>
                        <li class="weather-desc" v-if="showWeather">
                            <p v-html="convertIntoHTML('Monsoon : ' ,monumentInformation.weatherMonsoon.description, 'ico-rain')"></p>
                            <p v-html="convertIntoHTML('Summer : ' ,monumentInformation.weatherSummer.description,'ico-summer')"></p>
                            <p v-html="convertIntoHTML('Winter : ' ,monumentInformation.weatherWinter.description,'ico-winter')"></p>
                            <p v-html="convertIntoHTML('Recommended Season to Visit : ' ,monumentInformation.recommendedSeason,'ico-season')"></p>
                        </li>
                    </ul>
                </div>
            </div>

             <div class="weather-info" v-if="activeTab == 'museums'">
                <h3>Museums near monument</h3>
                <ul v-for="(muesum,index) in monumentInformation.museums" :key="index">
                    <li>- {{muesum.name}}</li>
                    <li class="link_to_night" @click="openExternalMuesumMonument(muesum.link)">View Museum Details</li>
                </ul>
            </div>
            <div class="weather-info" v-if="activeTab == 'facility'">
                <h3>Facilities available At the Monument</h3>
                <ul>
                    <li v-for="(facilty,index) in monumentInformation.facilitiesAvailable" :key="index" v-html="facilty"></li>
                </ul>
            </div>
            <div class="weather-info" v-if="activeTab == 'accomodation'">
                <h3>Accommodation near the monument</h3>
                <ul v-for="(accomodation,index) in monumentInformation.accomodations" :key="index">
                    <li>{{accomodation.name}}</li>
                    <li @click="openMore(accomodation.link)" class="link_to_night" v-if="accomodation.link">More Details ... </li>
                </ul>
            </div>
            <div class="weather-info" v-if="activeTab == 'contact'">
                <h3>Contact Details</h3>
                <ul v-for="(contact,index) in monumentInformation.contactsInfo" :key="index">
                    <li class="bold">{{contact.name}}</li>
                    <li>{{contact.designation}}</li>
                    <li v-if="contact.phone.length > 0">Phone: <span v-for="(phone,index) in contact.phone" :key="index">{{phone}} {{index+1 == contact.phone.length ? '' : ','}}</span> </li>
                    <li v-if="contact.email.length > 0">E-mail: <span v-for="(email,index) in contact.email" :key="index">{{email}} {{index+1 == contact.email.length ? '' : ','}}  </span></li>
                </ul>
            </div>
            <div class="weather-info" v-show="activeTab == 'maps'" style="width:700px;height:500px;display:inline-flex;">
               <div id="asi-monument-map" style="width: 100%;height:100%"></div>
            </div>
            <div class="weather-info" style="width:700px;height:500px;display:inline-flex;" v-show="activeTab == 'view_3'">
                <div id="map" style="width: 0px;height:100%"></div>
                <div id="pano" style="width: 100%;height:100%"></div>
            </div>
        </div>
    </div>
  </div>
</div>
       
</template>
<script>
import { initializeDetailsGoogleMaps } from "../../helper/asiMonumentMap";
import { findNearbyMonumentsAPI } from "../../api/api";
export default {
  name: "monument-information",
  props: {
    monumentInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: "overview",
      monumentInformation: {},
      nearbyMonuments: {},
      showWeather: false
    };
  },
  created() {
    this.monumentInformation = this.monumentInfo;
    let self = this;
    findNearbyMonumentsAPI(this.$route.query.monumentID).then(
      response => {
        self.nearbyMonuments = response.data.data;
      },
      response => {
        self.nearbyMonuments = {};
      }
    );
  },
  watch: {
    activeTab() {
      if (this.activeTab == "view_3") {
        var fenway = {
          lat: this.monumentInformation.locationInfo.latitude,
          lng: this.monumentInformation.locationInfo.longitude
        };
        var map = new google.maps.Map(document.getElementById("map"), {
          center: fenway,
          zoom: 11
        });
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: fenway,
            pov: {
              heading: 14,
              pitch: 10,
              motionTracking: false,
              motionTrackingControl: false,
              linksControl: false,
              panControl: false
            }
          }
        );
        map.setStreetView(panorama);
      }
      if (this.activeTab == "maps") {
        initializeDetailsGoogleMaps(
          this.monumentInformation.locationInfo.latitude,
          this.monumentInformation.locationInfo.longitude,
          this.monumentInformation.shortTitle,
          this.monumentInformation.address
        );
      }
    }
  },
  methods: {
    convertIntoHTML(weather, txt, icon) {
      if (txt) {
        return (
          `<i class='ico-sprite ${icon}'></i>` + `<b>${weather}</b>` + " " + txt
        );
      } else {
        return "";
      }
    },
    openExternalMuesumMonument(link) {
      window.open(link, "_blank");
    },
    linkToNight(externalLink) {
      window.open(externalLink, "_blank");
    },
    formatDate(time) {
      var date = new Date(time);
      return (
        date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear()
      );
    },
    openMore(externalLink) {
      window.open(externalLink, "_blank");
    }
  },
  mounted() {
    this.showWeather = true;
  }
};
</script>
<style scoped lang="scss">
.bg-FAFAFA {
  background: #fff;
  padding-bottom: 50px;
  .monument-info {
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    .fl {
      .active {
        height: auto;
        padding: 10px 0;
        width: 100%;
        color: #ea2330;
        padding-left: 0;
        a {
          border-bottom: 1px solid #ea2330;
          padding-bottom: 5px;
        }
      }
      .nonactive {
        height: auto;
        width: 100%;
        padding: 10px 0;
      }
      li {
        color: #777;
        width: 160px;
        cursor: pointer;
      }
    }
  }
  .weather-info {
    display: inline-block;
    margin-left: 5%;
    width: 75% !important;
    h3 {
      font-size: 1.25em;
      margin-bottom: 20px;
    }
    ul {
      li {
        margin-bottom: 10px;
        .ml20 {
          margin-left: 20px;
        }
      }
    }
    .section-hours {
      h3 {
        margin-bottom: 10px;
      }
    }
    .section-address {
      margin: 0 0;
      h3 {
        margin-bottom: 10px;
      }
    }
    .section-howto {
      margin: 30px 0 0;
      h3 {
        margin-bottom: 10px;
      }
    }
    .opening {
      margin: 30px 0 0;
    }
    .bg-weather {
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: auto;
      background-position: center;
      margin-top: 0px;
      color: #000;
      ul {
        li {
          display: inline-block;
          vertical-align: top;
        }
      }
      .weather {
        font-size: 5.438em;
      }
      .weather-desc {
        font-size: 0.875em;
      }
    }
    .nearby {
      span {
        display: inline-block;
        vertical-align: top;
        &.w30 {
          width: 30%;
        }
        &.w50 {
          width: 65%;
        }
      }
      .mr10 {
        margin-right: 10px;
      }
    }
  }
}
.link_to_night {
  height: 50px;
  width: 260px;
  font-weight: bold;
  padding-top: 13px;
  color: #ea2330;
  border-radius: 50px;
  cursor: pointer;
}

@media only screen and (min-width: 770px) and (max-width: 1024px) {
  .bg-FAFAFA {
    .weather-info {
      width: 64%;
      margin-left: 6%;
    }
  }
}

@media only screen and (max-width: 769px) {
  .detail-module {
    .bg-FAFAFA {
      padding-bottom: 30px;
      .weather-info {
        margin-left: 0;
        width: 100%;
        h3 {
          font-size: 1.2em;
          font-weight: normal;
        }
        ul {
          li {
            .ml20 {
              margin-left: 0px;
            }
          }
        }
        .nearby {
          span {
            font-size: 14px;
            &.w30 {
              width: 50%;
            }
          }
        }
      }
    }
  }
  .monument-info {
    ul {
      &.fl {
        display: inline-flex;
        white-space: nowrap;
        overflow-x: auto;
        width: 100%;
        .nonactive {
          padding-left: 0 !important;
          padding-right: 10px !important;
        }
      }
      li {
        display: flex;
        align-items: center;
        &.active {
          color: #ea2330 !important;
          background-color: transparent !important;
          padding: 0 20px !important;
          padding-left: 0 !important;
          a {
            border-bottom: none !important;
          }
        }
      }
    }
  }
}
</style>
