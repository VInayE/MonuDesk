<template>
   <div class="banner-content prel" ref="detailsBanner" v-bind:style="{ backgroundImage: 'url(' + monument_images[0].url + ')' }">
        <div class="bg-overlay"></div>
        <div class="pabs banner-pos">
            <div class="wrapper-width">
                <div class="heading wfull">
                    <h1 v-html="monument_name"></h1>
                    <p class="fs26 mt10" v-html="monument_caption"></p>
                </div>
               <!-- <i class="ico-sprite ico-btn" v-scroll-to="'#monument-description'"></i> -->
            </div>
        </div>
        <ul class="link-tab pabs" v-bind:class="{ sticky: stickyHeader}" id='detail-info'>
            <li v-bind:class="{ active: tabActive == 'about'}" v-scroll-to="'#monument-description'" class="resp-hide">About</li>
            <li v-bind:class="{ active: tabActive == 'information'}" v-scroll-to="'#monument-information'" class="resp-hide">Information</li>
            <li v-bind:class="{ active: tabActive == 'ticket'}" v-scroll-to="'#monument-ticket-info'" class="resp-hide">Tickets</li>
            <!-- As discussed remove date n time selection here, moving this to cart block -->
            <!-- <li class="date-brd disabledAdd" v-if="booking_allowed && disabledAdd" @click.stop="disableInput()">
              <input class="book_now_calender" type="text" placeholder="" :value="findDisplayDate(ddate)">
              <i class="ico-sprite ico-cal-ff"></i>
            </li>
            <li class="date-brd" v-if="booking_allowed && !disabledAdd" @click="showCalenderWidget()">            
               <input class="book_now_calender" @input="showCalenderWidget()" type="text" placeholder="" :value="findDisplayDate(ddate)">
               <div class="calender_div" v-if="showCalenderDiv">
                  <div class="date-arrow" >
                    <div v-for="(calender,index) in calenderLength" :key="index">
                      <datepicker 
                        :full-month-name="true" 
                        :maximum-view="'day'" 
                        v-on:selected="changeDateOnSelection($event,index)" 
                        v-bind:class="{ selectedDate: index == selectedCalenderIndex , unselectedDate : index != selectedCalenderIndex }" 
                        :value="calculateDate(index)" 
                        :inline="true" 
                        :monday-first="true" 
                        :disabled="index ==0 ?state.disabled:state.disabled_2 " 
                        class="input-grp date_picker">
                      </datepicker>
                    </div>
                  </div>
               </div>
               <i class="ico-sprite ico-cal-ff" @click="showCalenderWidget()"></i>
            </li>
             <li v-if="time_slots.length > 0 && booking_allowed" 
               v-bind:class="{ disabledAdd: disabledAdd}"
               class="drop-down prel">
              <select type="text" v-model="timeSlot"
                :disabled="disabledAdd">
                <option v-for="(timeslot, index) in time_slots" 
                  :key="index" 
                  :value="timeslot.name + '__' + timeslot.startTime + '__' + timeslot.endTime">
                  {{ timeslot.name }}
                </option>
              </select>
              <i class="ico-sprite ico-arr"></i>
            </li> -->
            <li class="online_booking" 
              v-if="booking_allowed"  
              v-bind:class="{ disabledAdd: disabledAdd}"
              v-on:click="addItem()">
               <button-spinner
                :isLoading="isLoading" 
                :disabled="isLoading"
                :status="status">
                   <span v-if="disabledAdd">
                    Added To Cart
                   </span>   
                   <span v-if="!disabledAdd">
                    Add To Cart
                   </span>
               </button-spinner>
            </li>
            <li @click="menuModalOpen()" class="cart-count">
                  <span class="count" :isLoading="isLoading"
                    :disabled="isLoading"
                    :status="status"
                    v-if="cartLength >= 0">
                    {{cartLength}}
                  </span>
                  <span class="count count-error"
                    v-if="cartLength == -1">
                      !
                  </span>
              <i class="ico-sprite ico-cart"></i>
              <span class="txt-cart">Travel Cart</span>
              <span class="pleasewait" v-if="pleasewaitLoader"></span>
            </li>
        </ul>
        <loader-view v-if="isAPICompleted"></loader-view>
        <transition name="slide-fade">
          <cart-block v-if="menuModal"
            @closeMenuBar="menuModal=false"
            @pleasewaitLoader ="pleasewaitLoader = $event"
            @managingCount ="cartLength = $event"
			      :cartDataId = cartDataId
			      @deletedMonument="monumentDeleted($event)"
            :selectedCountryType="selectedCountryType">
          </cart-block>
	      </transition>
        <ask-modal
          :showConfirmationDialog= "showConfirmationDialog"
          :errorMessage = "errorMessage"
          :srpNavDisable = "srpNavDisable"
          @closeAskModal = "showConfirmationDialog = $event">
        </ask-modal>
    </div>
</template>
<script>
import Vue from 'vue'
import { activeHeaderTab } from "../../helper/asiHelper";
import { BASE_URL, SSO_LOGIN_URL, USER_Profile_URL } from "../../util/constants";
import { checkMonumentAvailabilityAPI, saveMonumentToCartAPI, retrieveCartAPI, getCartItems, recentSearch } from "../../api/api";
import Datepicker from "vuejs-datepicker";
import VueButtonSpinner from 'vue-button-spinner';
export default {
  name: "banner-content",
  data() {
    return {
      stickyHeader: false,
      disabledAdd: false,
      tabActive: "",
      showTravellerDetails: false,
      state: {
        disabled: {
          days: [],
          to: new Date(),
          dates: []
        },
        disabled_2: {
          days: [],
          from: "",
          dates: []
        }
      },
      pleasewaitLoader: false,
      selectedCountryType: 'Select Tourist Type',
      cartDataId: [],
      selectedCalenderIndex: 0,
      showCalenderDiv: false,
      menuModal: false,
      feedBack: false,
      monument_name: "",
      monument_caption: "",
      monument_city: "",
      time_slots: [],
      timeSlot: "",
      booking_allowed: false,
      calenderLength: 0,
      isAPICompleted: false,
      ddate: new Date(new Date().setDate(new Date().getDate() + 1)),
      closedDays: {
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6
      },
      tokenId: "",
      cart: [],
      cartId: '',
      itemCount: '',
      cartLength: 0,
      cartRoute: [],
      cartMainData: [],
      isLoggedIn: false,
      userEmail: '',
      userMobile: '',
      userName: '',
      showConfirmationDialog: false,
      srpNavDisable: false,
      errorMessage: '',
      itemAlreadyCart: [],
      isLoading: false,
      status: ''
    };
  },
  components: {
    Datepicker,
    LoaderView: () => import("./loader.vue"),
    CartBlock: () => import("../monuments_list/cartBlock.vue"),
    AskModal: () => import("./askModal.vue"),
    'button-spinner' : VueButtonSpinner
  },
  props: {
    monumentName: {
      type: String,
      required: true
    },
    closingTimings: {
      type: Object,
      required: true
    },
    monumentCaption: {
      type: String,
      required: true
    },
    monumentCity: {
      type: String,
      required: true
    },
    monumentCarouselImages: {
      type: Array,
      required: true
    },
    bookingAllowed: {
      type: Boolean,
      required: true
    },
    monumentPrice: {
      type: Object,
      required: true
    },
    monumentData: {
      type: Object,
      required: true
    }
  },
  created() {
    this.monument_name = this.monumentName;
    this.monument_caption = this.monumentCaption;
    this.monument_city = this.monumentCity;
    this.monument_images = this.monumentCarouselImages;
    this.booking_allowed = this.bookingAllowed;
    if (this.closingTimings.closedDays) {
      for (let i = 0; i < this.closingTimings.closedDays.length; i++) {
        this.state.disabled.days.push(
          this.closedDays[this.closingTimings.closedDays[i]]
        );
        this.state.disabled_2.days.push(
          this.closedDays[this.closingTimings.closedDays[i]]
        );
      }
    }
    if (this.closingTimings.holidays) {
      for (let i = 0; i < this.closingTimings.holidays.length; i++) {
        this.state.disabled.dates.push(
          new Date(this.closingTimings.holidays[i])
        );
        this.state.disabled_2.dates.push(
          new Date(this.closingTimings.holidays[i])
        );
      }
    }

    if (this.closingTimings.maxDate) {
      this.state.disabled_2.from = new Date(this.closingTimings.maxDate);
      this.calenderLength =
        this.monthDiff(new Date(), new Date(this.closingTimings.maxDate)) + 3;
    } else {
      this.calenderLength = 3;
    }

    this.time_slots = (this.closingTimings && this.closingTimings.timeSlots && this.closingTimings.timeSlots.length > 0) ? this.closingTimings.timeSlots : [];
  },
  mounted() {
    let self = this
    
    // Generating a unique ID to make cart ID
    //self.tokenId = "fcb0e079-ecea-42a5-a55a-786f06b5fcee"

    var cartId = localStorage.getItem("cartId")
    self.isLoggedIn = localStorage.getItem("isLoggedIn")
    self.userEmail = localStorage.getItem("userEmail")
    self.userMobile = localStorage.getItem("userMobile")
    self.userName = localStorage.getItem("userName")
    //!userLogin.isUserLogIn()

    if(!self.isLoggedIn || !userLogin.isUserLogIn()) {
      // if user is already logged in
      self.checkUser({}, 'pageLoad')
    }
    else {
      // Recent Search
      recentSearch(this.monumentName,this.$route.query.monumentID,this.monumentPrice.INDIAN.adult["totalPrice"])
      if(self.isLoggedIn && cartId != '' && cartId != 'undefined' && cartId != null) {
        self.retrievingCartItems()
      }
      else if(self.isLoggedIn && (cartId == '' || cartId == 'undefined' || cartId == null)) {
        console.log('fetched cart it and then save')
        self.retrievingCart({}, 'fetching')
      }
      else {
        // do nothing
      }
    }

    this.showAjaxLoading = true;
    document.title = "Yatra | Monuments of India";   

    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("keyup", function(event) {
      if (event.keyCode == 27) {
        self.showCalenderDiv = false;
      }
    });

    window.addEventListener("click", function(event) {
      if (
        event.target.className.toString() != "book_now_calender" &&
        event.target.className.toString() != "ico-sprite ico-cal-ff"
      ) {
        self.showCalenderDiv = false;
      }
    });

    //pasting first time slot
    if (this.closingTimings && this.closingTimings.timeSlots && this.closingTimings.timeSlots.length > 0) {
      this.timeSlot =
        this.closingTimings.timeSlots[0].name +
        "__" +
        this.closingTimings.timeSlots[0].startTime +
        "__" +
        this.closingTimings.timeSlots[0].endTime;
    }
  },
  watch: {
    itemAlreadyCart () {
      if(this.itemAlreadyCart.includes(this.monumentData.id))
        this.disabledAdd = true
      else
        this.disabledAdd = false
    }
  },
  methods: {
    disableInput() {
      console.log('disabled')
      return
    },
    secureLogin() {
      var sso_login_url = `${SSO_LOGIN_URL}`,
        returned_url = window.location.href;
      try {
        var x = document.getElementById("app");
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", sso_login_url);

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "returnUrl");
        hiddenField.setAttribute("value", returned_url);
        form.appendChild(hiddenField);
        x.appendChild(form);
        form.submit();
      } catch(err) {
        console.log(err.message);
        self.showConfirmationDialog = true
        self.errorMessage = "Can't validate user."
      }
    },
    checkUser(monument, passingFunc) {
        let self = this
        var cartId = localStorage.getItem("cartId")

        if(monument && passingFunc == "addItem") {
          let retrivedMonumentId = monument.id
          let retrivedMonument = monument
        }
        let postData = {
          "includeOptionalParams": 'true',
          "productId": 'yatramonuments',
          "channel": 'b2c'
        }
                
        Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        Vue.http.options.emulateJSON = true;
        this.$http.post(`${USER_Profile_URL}`, postData).then(function (response) {
          if (response.body.status == "SUCCESS") {
              self.isLoggedIn = true
              self.userEmail= response.body.responseData.userInfo.email
              self.userMobile=response.body.responseData.userInfo.mobile
              self.userName = response.body.responseData.userInfo.name + " " + response.body.responseData.userInfo.lastName
              // recent search
              recentSearch(this.monumentName,this.$route.query.monumentID,this.monumentPrice.INDIAN.adult["totalPrice"])
              // Saving logged in details to local storage
              localStorage.setItem("isLoggedIn", self.isLoggedIn)
              localStorage.setItem("userEmail", self.userEmail)
              localStorage.setItem("userMobile", self.userMobile)
              localStorage.setItem("userName", self.userName)
              
              // calling add items to cart if needed
              if(monument && passingFunc == "addItem")
                self.saveMonumentToCart(monument, cartId)
              if(passingFunc == "pageLoad")
                self.retrievingCart({}, 'fetching')
          } else {
              // calling add items to cart if needed
              if(monument && passingFunc == "addItem")
                self.secureLogin()
              self.isLoading = false
              localStorage.clear();
          }
        }).catch(function(error) {
          localStorage.clear();
          self.showConfirmationDialog = true
          self.errorMessage = "Unable to check user."
        })
    },
    retrievingCart(monument, saveTask) {
      var self = this
      self.isAPICompleted = true
      retrieveCartAPI().then(response => {
          self.cartId = response.data.cartId
          self.itemCount = response.data.itemCount
          localStorage.setItem("cartId", self.cartId)
          localStorage.setItem("itemCount", self.itemCount)
          if(!self.cartId || self.cartId == 'undefined') {
            self.disabledAdd = true
          }
          if(saveTask == 'saving') {
            self.saveMonumentToCart(monument, self.cartId)
          }
          if(saveTask == 'fetching') {
            self.retrievingCartItems()
          }
        }).catch(function (error) {
            console.log(error)
            self.isLoading = false
            self.isAPICompleted = false
            self.cartLength = -1
            //self.showConfirmationDialog = true
            //self.errorMessage = "Unable to create cart ID."
        })
    },
    saveMonumentToCart(monuments, cartId) {
      // In our case we are adding one monument at a time
      let self = this
      if(!self.itemAlreadyCart.includes(monuments.id)) {
        let items = [{
          itemId : "",
          productId : monuments.id,
          title : monuments.shortTitle,
          "fromTime": "",
          "toTime": "",
          "imageUrl": "",
          "quantity": 1,
          "product": "Monuments"
        }]
        saveMonumentToCartAPI(items, cartId).then(response => {
          // Disabling add to cart button if monument is already there
          self.itemAlreadyCart.push(monuments.id)
          items[0].itemId = response.data.itemIdList[0]
          self.cartDataId.push(items[0])
          self.cartLength = self.cartDataId.length
          self.isLoading = false
          self.isAPICompleted = false
          self.menuModal = true
        }).catch(function(error) {
          console.log(error)
          self.isAPICompleted = false
          self.showConfirmationDialog = true
          self.errorMessage = "Can't save monument to list."
        })
      }
      else{
        self.isLoading = false
        self.showConfirmationDialog = true
        self.srpNavDisable = true
        self.errorMessage = monuments.shortTitle + "is already in cart."
      }
    },
    retrievingCartItems() {
      var self = this
      var cartId = localStorage.getItem("cartId")
      if(cartId != '' || cartId != 'undefined') {
        getCartItems(cartId).then(response => {
          self.cartDataId = response.data.itemList
          self.cartLength = self.cartDataId.length
          self.isLoading = false
          self.isAPICompleted = false
          response.data.itemList.filter(function(items, index){
            self.itemAlreadyCart.push(items.productId)
            return
          })
        }).catch(function(error){
          self.isAPICompleted = false
          console.log(error, "monuments can't be fetched")
        })
      }
      else {
        // code issue as cartId should be created by now
        alert("Cart Id is not defined, please try gain later.")
        self.cartDataId = []
      }	
    },
    addItem() {
      var self = this
      var monumentId = this.$route.query.monumentID
      var isLoggedIn = localStorage.getItem("isLoggedIn")
      var cartId = localStorage.getItem("cartId")
      var monument = this.monumentData
      self.isLoading = true
      // check user is logged in or not
      if(!isLoggedIn) {
        this.checkUser(monument, 'addItem')
      }
      else {
        // If user is logged in create cart Id and save monument
        if(!cartId || cartId == 'undefined') {
            self.disabledAdd = true
            alert('Technical Error, Retry later')
        } else {
          self.saveMonumentToCart(monument, cartId)
        }
      }
    },
    monumentDeleted(id) {
      var index = this.itemAlreadyCart.indexOf(id);
      var index2
      if (index >= 0) {
        this.itemAlreadyCart.splice( index, 1 );
      }
      this.cartDataId.map(function(item, index){
        if(item.productId == id) {
          index2 = index
        }
      })
      if (index2 >= 0) {
        this.cartDataId.splice( index2, 1 );
      }
    },
    showCalenderWidget() {
      var container = this.$el.querySelector("#detail-info");
      if(window && window.scrollY <= 200)
        window.scroll(0, 200);
      this.showCalenderDiv = !this.showCalenderDiv;
    },
    changeDateOnSelection(event, index) {
      this.ddate = event;
      this.showCalenderDiv = !this.showCalenderDiv;
      this.selectedCalenderIndex = index;
    },
    findDisplayDate(date) {
      return (
        date.getDate() +
        "/" +
        parseInt(parseInt(date.getMonth()) + 1) +
        "/" +
        date.getFullYear()
      );
    },
    getDate(date) {
      var d = new Date(date);
      return d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    },
    calculateDate(index) {
      if (index == this.selectedCalenderIndex) {
        return this.ddate;
      } else {
        var today = new Date(new Date().setDate(new Date().getDate() + 1));
        return new Date(today.getFullYear(), today.getMonth() + index, 1);
      }
    },
    openFeedBackForm(event) {
      this.menuModal = false;
      this.feedBack = true;
    },
    monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth() + 1;
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    },
    navigateHome() {
      this.menuModal = false;
      window.open(`${BASE_URL}/home`, "_self");
    },
    menuModalOpen() {
      var self = this
      self.pleasewaitLoader = true
      let loggedInStatus = localStorage.getItem("isLoggedIn")
      if(loggedInStatus && loggedInStatus != undefined && loggedInStatus != 'undefined') {
        self.menuModal = true;
        //self.retrievingCartItems()
      }
      else
        self.secureLogin()
      //this.retrievingCartItems()
    },
    handleScroll(event) {
      if (
        this.$refs &&
        this.$refs.detailsBanner && 
        (document.documentElement.scrollTop >
        this.$refs.detailsBanner.clientHeight - 50)
      ) {
        this.stickyHeader = true;
      } else {
        this.stickyHeader = false;
      }
      this.tabActive = activeHeaderTab(document.documentElement.scrollTop);
    },
    navigateToHome() {
      window.open(`${BASE_URL}/home`, "_self");
    },
    showMonumentAvailability() {
      let self = this;
      this.isAPICompleted = true;
      let timeFSlot = this.timeSlot.split("__");
      if (timeFSlot.length > 0) {
        let timeFSlotObj = {
          name: timeFSlot[0] || "",
          startTime: timeFSlot[1] || "",
          endTime: timeFSlot[2] || ""
        };
      } else {
        let timeFSlotObj = {
          name: "",
          startTime: "",
          endTime: ""
        };
      }
      checkMonumentAvailabilityAPI(
        this.$route.query.monumentID,
        this.ddate
      ).then(
        response => {
          self.isAPICompleted = false;
          if (response.data.data.available) {
            self.bookingSuperPNR = response.data.data.superPnr;
            var intialURL =
              process.env.NODE_ENV === "production"
                ? "https://secure.yatra.com"
                : "http://yatra.com";
            window.open(
              intialURL + `${BASE_URL}/review?superPNR=${self.bookingSuperPNR}`,
              "_self"
            );
          } else {
            self.showTravellerDetails = false;
          }
        },
        response => {
          self.isAPICompleted = true;
          self.showTravellerDetails = false;
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
  .calender_div {
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
      top: 47px;
      z-index: 9;
      border-bottom: 2px solid #e2e2e2;
    }
    &:before {
      content: "";
      position: absolute;
      top: 27px;
      right: 120px;
      margin-left: -5px;
      border-width: 12px;
      border-style: solid;
      border-color: transparent transparent #e2e2e2;
      z-index: 99;
    }
  }
  .date_picker {
    background: none !important;
    border: 0px !important;
    margin-top: 0px !important;
    height: 100% !important;
  }
  .date-txt {
    float: left;
    margin-top: 16px;
    color: #666666;
  }
  .banner-content .overlay-carousel {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
  .detail-module {
    .banner-content {
      .heading {
        margin-top: 150px;
      }
    }
  }
  .carousel {
    height: 100%;
  }
  .banner-pos {
    width: 100%;
    top: 65px;
    z-index: 4;
  }
  .banner-content {
    width: 100%;
    height: 594px;
    background-position: center;
    background-size: cover;
    .menu-tab {
      color: #fff;
      margin-top: 80px;
    }
    .heading {
      clear: both;
      text-align: center;
      color: #fff;
      margin-top: 45px;
      h1 {
        font-size: 3.313em;
        font-weight: normal;
      }
      .fs26 {
        font-size: 1.625em;
      }
    }
    .sticky {
      position: fixed;
      top: 0px;
      padding-top: 10px;
      height: 68px;
      right: 0px;
      background: rgb(113, 93, 93);
      width: 100% !important;
      left: 0px;
      z-index: 9997;
      box-shadow: 0 0 2px #666;
    }
    .link-tab {
      width: 100%;
      text-align: center;
      color: #666;
      bottom: 0;
      margin: 0 auto;
      background: #f4f6f8;
      padding: 9px;
      height: 65px;
      line-height: 50px;
      z-index: 8;
      .online_booking {
        background-color: #ea2330;
        padding: 5px;
        border-radius: 3px;
        width: 135px;
		 position: relative;
    	top: -8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.01);
        text-align: center;
        color: #fff;
        line-height: 20px;
        &.disabledAdd {
          cursor: no-drop;
          background-color: #cccccc;
        }
        button {
          background: transparent;
          border: 0;
          color: white;
        }
      }
      .disabledAdd {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
      }
      .active {
        color: #ea2330 !important;
        border-bottom: 2px solid #ea2330;
        padding-bottom: 5px;
      }
      li {
        display: inline-block;
        margin-right: 50px;
        font-size: 1.125em;
        cursor: pointer;
      }
      .date-brd {
        border-bottom: 1px solid #666;
        position: relative;
        padding-bottom: 5px;
        span {
          small {
            display: block;
            text-align: left;
            margin-bottom: 4px;
          }
        }
        .ico-cal-ff {
          position: absolute;
          top: 5px;
          right: -20px;
        }
      }
    }
  }
  .book_now_calender {
    width: 125px;
  }
  .drop-down {
    border-radius: 5px;
    border: 1px solid #eee;
    height: 40px;
    width: 8%;
    font-size: 0.75em !important;
    background: #fff;
    color: #777;
    line-height: 40px;
    select {
      width: 90%;
      outline: none;
      position: relative;
      z-index: 100;
      &:hover {
        cursor: pointer;
      }
      .ico-arr {
        z-index: 0;
      }
    }
  }
  .cart-count {
    position: static!important;
    button {
      background: green;
		  color: white
    }
  }
	.count{
		position: relative;
		right: -18px;
		top: -8px;
		background-color: #ea2330;
		border-radius: 50%;
		color: #fff;
		width: 20px;
		height: 20px;
		text-align: center;
		display: inline;
		font-size: 14px;
		padding: 0 0px 0 4px;
	}
  .count-error {
		color: orangered;
    background-color: white
	}
	.txt-cart {
		float: right;
		font-size: 16px;
		color: #000;
		position: relative;
		top: 13px;
		font-weight: bold;
		left: -8px;
	}
  @media only screen and (max-width: 768px) {
    .detail-module {
      .banner-content {
        .link-tab {
          .resp-hide {
            display: none;
          }
          .date-brd {
            width: 140px;
            text-align: left;
            margin-right: 15px;
          }
          .online_booking {
            width: 120px;
          }
          li {
            margin-right: 0;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 640px) {
    .calender_div {
      left: -63px;
      .date-arrow {
        left: 0;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .calender_div {
      .date-arrow {
        left: 50px;
      }
    }
  }
  .pleasewait {
		height: 30px;
		width: 30px;
		display: inline-block;
		background: url("../../assets/pwait.gif") no-repeat center;
		position: absolute;
    top: 10px;
    right: 420px;
	}
</style>
