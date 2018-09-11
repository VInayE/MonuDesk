<template>
  <div class="monument-gallery wrapper-width clearfix">
    <ul class="gallery-panel">
      <li class="prel" v-for="(monument,index) in monumentList" :key="index">
        <div class="loader" v-if="imageLoader">
          <div class="sk-wave">
            <div class="sk-rect sk-rect1"></div>
            <div class="sk-rect sk-rect2"></div>
            <div class="sk-rect sk-rect3"></div>
            <div class="sk-rect sk-rect4"></div>
            <div class="sk-rect sk-rect5"></div>
          </div>
        </div>
        <img :src="monument.imageUrl" class="img-resp" @click="navigateToDetails(monument.monumentId,monument.shortTitle)">
        <div class="img-desc prel">
            <span class="fl" @click="navigateToDetails(monument.monumentId,monument.shortTitle)">
              <p class="" v-html="monument.shortTitle"></p>
              <small class="c666">{{monument.cityName}}</small>
              <div class="price-info" v-if="monument.priceInfo && Object.keys(monument.priceInfo).length >  0">
                <p class='start-price'>Starting from</p>
                &#8377 {{monument.priceInfo[selectedCountryType == 'Select Tourist Type' ? 'INDIAN':selectedCountryType]}}
                <small> per adult </small>
              </div>
              <div class="price-info" v-if="!monument.priceInfo || Object.keys(monument.priceInfo).length == 0">
                <span class="free-entry">
                  <small>Free Entry</small>
                </span>
              </div>
            </span>
            <span
             v-on:click="addItem(monument)">
              <button-spinner
                class="pabs btn-red"
                v-if="monument.priceInfo && Object.keys(monument.priceInfo).length > 0"
                v-bind:class="{ disabledMonu: monument.selected}">
                  <span v-if="monument.selected">
                    Added To Cart
                </span>
                <span v-if="!monument.selected">
                    Add To Cart
                </span>
              </button-spinner>
            </span>
            <button-spinner
              class="pabs btn-red"
              v-if="!monument.priceInfo || Object.keys(monument.priceInfo).length == 0"
              v-bind:class="{ disabledMonu: monument.selected}">
              <span
                @click="navigateToDetails(monument.monumentId,monument.shortTitle)">
                  View Details
              </span>
            </button-spinner>
        </div>
        <!--<div class="mask" @click="navigateToDetails(monument.monumentId,monument.shortTitle)">
            <a href="#" class="info">View Detail</a>
        </div>-->
      </li>
    </ul>
    <div v-if="monumentList.length == 0" class="not-found">
      <img src="../../assets/not-found.png" class="">
      <h2> No Result Match for {{activeRegion == '' ? selectedState  : activeRegion}} </h2>
      <p> Please change the state and select any region ! </p>
    </div>
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
import {
  monumentRegionSelection,
  getMonumentListAccRegion,
  getMonumentListAccState,
  getMonumentListAccCity
} from "../../helper/asiHelper";
import { BASE_URL, SSO_LOGIN_URL, USER_Profile_URL } from "../../util/constants";
import { adobeAnalyticsPageView } from "../../helper/adobeAnalytic";
import {
  fetchMonumentDetailsDataAPI,
  saveMonumentToCartAPI,
  deleteMonumentFromCartAPI,
  retrieveCartAPI,
  cartItemCount,
  getCartItems
} from "../../api/api";
import VueButtonSpinner from 'vue-button-spinner';
export default {
  name: "monument-gallery",
  props: {
    monumentListData: {
      type: Array,
      required: true
    },
    sendDeletedMonument:{
      type:String,
      required:false
    },
    activeRegion: {
      type: String,
      required: true
    },
    selectedState: {
      type: String,
      required: true
    },
    selectedCountryType: {
      type: String,
      required: true
    },
    cartLengthCheck: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      cart: [],
      cartId: '',
      tokenId: '',
      userName: '',
      userEmail: '',
      itemCount: '',
      userMobile: '',
      cartDataId: [],
      monumentList: [],
      imageLoader: true,
      isLoggedIn: false,
      errorMessage : "",
      disabledMonu: false,
      selected: undefined,
      itemAlreadyCart: [],
      currentMonumentData: {},
      srpNavDisable: false,
      monumentRegionWise: {},
      monumentDetailsData: [],
      showConfirmationDialog : "",
      //isLoading: false,
      status: ''
    };
  },
  components: {
    AskModal: () => import("../common/askModal.vue"),
    'button-spinner' : VueButtonSpinner
  },
  watch: {
    sendDeletedMonument($event) {
      if($event != '') {
        var index = this.itemAlreadyCart.indexOf($event)
        var index2
        let requestedMonument = this.fetchMonumentFromId($event)
        // removing cart item
        this.cartDataId.map(function(item, index){
          if(item.productId == $event) {
            index2 = index
          }
        })
        if (index2 >= 0) {
          this.cartDataId.splice( index2, 1 );
        }
        if (index >= 0) {
          this.itemAlreadyCart.splice( index, 1 );
        }
        if(requestedMonument)
            this.$set(requestedMonument, "selected", false);
      }
    },
    itemAlreadyCart (e) {
      var self = this
      if(self.itemAlreadyCart.length > 0) {
        self.itemAlreadyCart.map(function(item, index) {
          let innerMonument = self.fetchMonumentFromId(item)
          if(innerMonument)
            self.$set(innerMonument, "selected", true);
        })
      }
    },
    monumentList() {
      this.$emit("monumentListLength", this.monumentList.length);
    },
    selectedState() {
      this.monumentList = getMonumentListAccState(
        this.monumentRegionWise["INDIA"],
        this.selectedState
      );
    },
    activeRegion() {
      if (this.activeRegion != "") {
        this.monumentList = getMonumentListAccRegion(
          this.monumentRegionWise,
          this.activeRegion
        );
      } else {
        if (this.selectedState != "") {
          this.monumentList = getMonumentListAccState(
            this.monumentRegionWise["INDIA"],
            this.selectedState
          );
        } else {
          this.monumentList = [];
        }
      }
    }
  },
  created() {
    // window.onpopstate = function(event) {
    //   alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    // };
    if (
      this.$route.query.searchType &&
      this.$route.query.searchType.toUpperCase() == "STATE"
    ) {
      this.monumentList = getMonumentListAccState(
        this.monumentListData,
        this.$route.query.searchSrc
      );
      this.monumentRegionWise = monumentRegionSelection(this.monumentListData);
      this.$emit("monumentListLength", this.monumentList.length);
    } else if (
      this.$route.query.searchType &&
      this.$route.query.searchType.toUpperCase() == "CITY"
    ) {
      this.monumentList = getMonumentListAccCity(
        this.monumentListData,
        this.$route.query.searchSrc
      );
      this.monumentRegionWise = monumentRegionSelection(this.monumentListData);
      this.$emit("monumentListLength", this.monumentList.length);
    } else if (
      this.$route.query.searchType &&
      this.$route.query.searchType.toUpperCase() == "REGION"
    ) {
      this.monumentRegionWise = monumentRegionSelection(this.monumentListData);
      this.monumentList = this.monumentRegionWise[this.$route.query.searchSrc];
      this.$emit("monumentListLength", this.monumentList.length);
    } else {
      this.monumentList = this.monumentListData;
      this.monumentRegionWise = monumentRegionSelection(this.monumentListData);
      this.$emit("monumentListLength", this.monumentList.length);
    }
  },

  mounted() {
    var self = this;

    // Generating a unique ID to make cart ID
    self.tokenId = "fcb0e079-ecea-42a5-a55a-786f06b5fcee"

    var cartId = localStorage.getItem("cartId")
    self.isLoggedIn = localStorage.getItem("isLoggedIn")
    self.userEmail = localStorage.getItem("userEmail")
    self.userMobile = localStorage.getItem("userMobile")
    self.userName = localStorage.getItem("userName")

    // Fetching monuments on reload when query is appended
    if(this.$route && this.$route.query && this.$route.query.addId) {
        //console.log('added via url')
        let monumentId = this.$route.query.addId
        let queriedMonument = self.fetchMonumentFromId(monumentId)

      if(!self.isLoggedIn) {
        self.checkUser(queriedMonument, 'pageLoad')
      }
      else {
        if(self.isLoggedIn && cartId && cartId != '' && cartId != 'undefined') {
          console.log("cart id not empty")
          self.retrievingCartItems(queriedMonument)
        }
        else if(self.isLoggedIn && (cartId == null || cartId == '' || cartId == 'undefined')) {
          console.log('fetched cartid and then save')
          self.retrievingCart(queriedMonument, 'fetching')
        }
        else {
          self.isLoading = false
          // do nothing
        }
      }
    }
    else {
      // if(!self.isLoggedIn) {
      //   self.checkUser({} ,'pageLoad')
      // }
      // else{
      //   self.retrievingCart({}, 'fetching')
      // }
      self.checkUser({} ,'pageLoad')
    }

    // setTimeout(function() {
    //   self.imageLoader = false;
    // }, 500);
  },
  methods: {
    navigateToDetails(id, name) {
      window.open(`${BASE_URL}/details?monumentID=${id}`, "_self");
    },
    fetchMonumentFromId(monumentId) {
      //console.log('fetch', this.monumentList)
      let monument = this.monumentList.filter(function(monument, index) {
        return (monument.monumentId == monumentId)
      })
      if(monument)
        return monument[0]
      else
        return {}
    },
    navigateToHome() {
      window.open(`${BASE_URL}/home`, "_self");
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
      }
    },
    checkUser(monument, passingFunc) {
        let self = this
        if(monument && passingFunc == "addItem") {
          let retrivedMonumentId = monument.monumentId
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
          console.log(response.body.status)
          if (response.body.status == "SUCCESS") {
              self.isLoggedIn = true
              self.userEmail= response.body.responseData.userInfo.email
              self.userMobile=response.body.responseData.userInfo.mobile
              self.userName = response.body.responseData.userInfo.name + " " + response.body.responseData.userInfo.lastName

              // Saving logged in details to local storage
              localStorage.setItem("isLoggedIn", self.isLoggedIn)
              localStorage.setItem("userEmail", self.userEmail)
              localStorage.setItem("userMobile", self.userMobile)
              localStorage.setItem("userName", self.userName)

              // calling add items to cart
              if(Object.keys(monument).length > 0 && monument.constructor === Object && passingFunc == "addItem") {
                self.saveMonumentToCart(monument, cartId)
              }
              if(Object.keys(monument).length > 0 && monument.constructor === Object && passingFunc == "pageLoad") {
                console.log("query and page load and user logged in")
                self.retrievingCart(monument ,'fetching')
              }
              if(Object.keys(monument).length === 0 && monument.constructor === Object && passingFunc == "pageLoad") {
                console.log("no query and check login and fetch cart")
                self.retrievingCart(null, 'fetching')
              }
              self.imageLoader = false;
          } else {
              //self.retrievingCart(null, 'fetching')
              if(Object.keys(monument).length > 0 && monument.constructor === Object && passingFunc == "addItem") {
                self.secureLogin()
              }
              if(Object.keys(monument).length > 0 && monument.constructor === Object && passingFunc == "pageLoad") {
                console.log("query and not logged in")
                self.secureLogin()
              }
              if(Object.keys(monument).length == 0) {
                self.isLoading = false
              }
              localStorage.clear();
              self.imageLoader = false;
          }
        }).catch(function(error){
          localStorage.clear();
          self.imageLoader = false;
          self.showConfirmationDialog = true
          self.errorMessage = "Unable to check user."
        })
    },
    addItem(monument) {
      var self = this;
      //console.log("addite,")
      var isLoggedIn = localStorage.getItem("isLoggedIn")
      var cartId = localStorage.getItem("cartId")
      self.isLoading = true
      //changing URL
      this.$router.push({
        name:'MonumentList',
        query: { addId: monument.monumentId }
      })

      // check user is logged in or not
      if(!isLoggedIn) {
        this.checkUser(monument, "addItem")
      }
      else {
        // If user is not logged in create cart Id and save monument
        if(!cartId || cartId == "undefined" || cartId == undefined) {
          self.retrievingCart(monument, 'fetching')
        } else {
          self.saveMonumentToCart(monument, cartId)
        }
        //self.fetchingCartCount(cartId)
      }
    },
    fetchingCartCount(cartId) {
      cartItemCount(cartId).then(response => {
        this.$emit("cartLengthCheck", response.count)
      })
    },
    retrievingCart(monument, saveTask) {
      var self = this
      retrieveCartAPI().then(response => {
          self.cartId = response.data.cartId
          self.itemCount = response.data.itemCount
          self.$emit("cartLengthCheck", self.itemCount)
          localStorage.setItem("cartId", self.cartId)
          localStorage.setItem("itemCount", self.itemCount)
          // If cart is not defined
          if(!self.cartId || self.cartId == 'undefined') {
              //self.disabledAdd = true
              self.$emit("cartLengthCheck", -1)
              self.isLoading = false
              self.imageLoader = false;
              self.srpNavDisable = false
              self.showConfirmationDialog = true
              self.errorMessage = "Technical Error, Retry later !"
          }
          self.isLoading = true
          if(saveTask == 'saving') {
            self.saveMonumentToCart(monument, self.cartId)
          }
          if(saveTask == 'fetching') {
            self.retrievingCartItems(monument)
          }
        }).catch(function (error) {
            self.isLoading = false
            self.imageLoader = false;
            self.$emit("cartLengthCheck", -1)
            console.log(error, 'retrieve cart')
            //self.showConfirmationDialog = true
            //self.errorMessage = "Unable to create cart ID."
        })
    },
    retrievingCartItems(monument) {
      var self = this
      var cartId = localStorage.getItem("cartId")
      if(cartId != '' && cartId != 'undefined' && cartId != null) {
        getCartItems(cartId).then(response => {
          self.cartDataId = response.data.itemList
          self.cartLength = self.cartDataId.length
          self.$emit("cartLengthCheck", self.cartLength)
          self.isLoading = false
          self.imageLoader = false;
          response.data.itemList.filter(function(items, index) {
            self.itemAlreadyCart.push(items.productId)
            return
          })
          if(monument && Object.keys(monument).length > 0 && monument.constructor === Object) {
            console.log('saving monument backed by retrieve cart items')
            //self.currentMonumentData = monument
            self.saveMonumentToCart(monument, cartId)
          }
        }).catch(function(error){
          self.isLoading = false
          self.imageLoader = false;
          self.srpNavDisable = true
          self.showConfirmationDialog = true
          self.errorMessage = "Please check again after sometime."
          console.log(error, "monuments can't be fetched")
        })
      }
      else {
        // code issue as cartId should be created by now
        //alert("Cart Id is not defined, please try again later.")
        console.log('Not getting cart ID')
        self.imageLoader = false;
        self.$emit("cartLengthCheck", -1)
        self.cartDataId = []
      }
    },
    saveMonumentToCart(monuments, cartId) {
      // In our case we are adding one monument at a time
      let self = this
      if(!self.itemAlreadyCart.includes(monuments.monumentId)) {
        let items = [{
          itemId : "",
          productId : monuments.monumentId,
          title : monuments.shortTitle,
          "fromTime": "",
          "toTime": "",
          "imageUrl": "",
          "quantity": 1,
          "product": "Monuments"
        }]
        saveMonumentToCartAPI(items, cartId).then(response => {
          // Disabling add to cart button if monument is already there
          self.itemAlreadyCart.push(items[0].productId)
          items[0].itemId = response.data.itemIdList[0]
          self.cartDataId.push(items[0])
          self.cartLength = self.itemAlreadyCart.length
          self.$emit("cartLengthCheck", self.cartLength)
          self.$set(monuments, "selected", true);
          self.isLoading = false
          self.$router.push({
            name:'MonumentList'
          })
        }).catch(function(error) {
          //self.$set(monuments, "selected", true);
          self.showConfirmationDialog = true
          self.errorMessage = "Can't save monument to list."
        })
      }
      else {
        self.isLoading = false
        self.showConfirmationDialog = true
        self.$router.push({
          name:'MonumentList'
        })
        self.srpNavDisable = true
        self.errorMessage = monuments.shortTitle + " is already in cart."
      }
    },
    getMonumentDetailsData(monumentID) {
      let self = this;
      if (monumentID) {
        let monumentId = monumentID;
        fetchMonumentDetailsDataAPI(monumentID).then(response => {
          self.monumentDetailsData = response.data.data;
          this.$emit("specificMonumentData", self.monumentDetailsData);
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
  .c666 {
    color: #9c9798;
  }
  .gallery-panel {
    margin-top: 60px;
    li {
      display: inline-block;
      width: 31.2%;
      margin-right: 30px;
      margin-bottom: 30px;
      overflow: hidden;
      cursor: pointer;
      transition: all ease 0.5s;
      vertical-align: top;
      border: 1px solid #ddd;
      border-radius: 4px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:hover {
        transform: scale(1.1);
        border-bottom: 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        .img-desc {
          padding: 10px;
        }
      }
      .img-desc {
        bottom: 0px;
        color: #000;
        width: 100%;
        left: 0px;
        padding: 10px;
        height: 118px;
        text-align: left;
        overflow: hidden;
        background: #fff;
        small {
          font-size: 0.875em;
        }
        .btn-red {
          right: 10px;
          bottom: 10px;
          font-size: 1em;
        }
        p {
          margin-bottom: 2px;
          font-size: 1.1em;
          line-height: 22px;
        }
        .price-info {
          font-size: 1.5em;
          margin-top: 10px;
          position: absolute;
          bottom: 8px;
          small {
            margin-left: 5px;
            font-size: 0.6em;
          }
          .free-entry {
            /*font-size: 16px;*/
            color: #f34f4f;
            small {
              font-size: 0.6em;
              margin-left: 0;
            }
          }
        }
      }
      .mask {
        background-color: rgba(0, 0, 0, 0.8);
        top: -200px;
        -ms-filter: "progid: DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
        opacity: 0;
        -webkit-transition: all 0.3s ease-out 0.2s;
        -moz-transition: all 0.3s ease-out 0.2s;
        -o-transition: all 0.3s ease-out 0.2s;
        -ms-transition: all 0.3s ease-out 0.2s;
        transition: all 0.3s ease-out 0.2s;
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        .info {
          color: #fff;
          border: 1px solid #fff;
          border-radius: 3px;
          padding: 10px 30px;
          position: relative;
          top: 50%;
          left: 30%;
        }
      }
      &:hover .mask {
        -ms-filter: "progid: DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: alpha(opacity=100);
        opacity: 1;
        top: 0px;
        -webkit-transition-delay: 0s;
        -moz-transition-delay: 0s;
        -o-transition-delay: 0s;
        -ms-transition-delay: 0s;
        transition-delay: 0s;
        -webkit-animation: bounceY 0.9s linear;
        -moz-animation: bounceY 0.9s linear;
        -ms-animation: bounceY 0.9s linear;
        animation: bounceY 0.9s linear;
      }
    }
    span {
      line-height: 20px;
      p {
        font-size: 1.25em;
      }
    }
    .w80 {
      width: 80%;
    }
    .w20 {
      width: 20%;
    }
    .ellipse {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 95%;
      padding-bottom: 4px;
      margin-bottom: 0;
    }
    .fs20 {
      font-size: 1.25em;
      small {
        margin-left: 3px;
      }
    }
  }
  .not-found {
    text-align: center;
    margin-top: 100px;
    h2 {
      color: #ea2330;
      font-size: 24px;
      font-weight: normal;
      margin: 50px 0 20px 0;
    }
    button {
      height: auto;
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
      width: 200px;
      padding: 20px;
    }
  }
  .btn-red {
    background: #f34f4f;
    padding: 10px;
    color: #fff;
    text-align: center;
    border-radius: 3px;
  }
  .disabledMonu {
    cursor: no-drop !important;
    background: grey !important;
  }
  button.btn-red {
    position: absolute;
    background: #ea2330;
    color: white;
  }
  @media only screen and (max-width: 480px) {
    .not-found {
      img {
        width: 100%;
      }
    }
  }
  .gallery-panel li .img-desc p.start-price {
    font-size: 12px;
    line-height: 22px;
    color: #ea2330;
  }
</style>