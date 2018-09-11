<template>
   <div class="monument-list-banner banner-content">
      <div class="wrapper-width">
          <div class="menu wfull">
              <img @click="navigateHome()" class="logo fl mt30" src="../../assets/logo.png">
              <div class="menu-tab fr" style="cursor:pointer;" @click="menuModal = true">MENU <i class="ico-sprite ico-bar"></i></div>
          </div>
          <div class="heading wfull">
            <!-- <h1>Explore Incredible India</h1>
            <p class="fs26 mt10">“Must See” Indian Heritage</p>-->
            <div class="input-grp" @click="searchModal = true">
                <input type="text" disabled="true" :value="'Showing result for '+ $route.query.searchSrc" class="search mt20" style="background:white!important"/>
                <i class="ico-sprite ico-search"></i>
            </div>
          </div>
          <!-- <i class="ico-sprite ico-btn" v-scroll-to="'#monument-list'"></i>-->
      </div>
   </div>
</template>
<script>
  import {BASE_URL} from '../../util/constants'
  export default {
    name:"monument-list-banner",   
    data () {
      return {
       menuModal:false,
       feedBack:false,
       searchModal:false
      }  
    },
    methods :{
      openFeedBackForm(event){
         this.menuModal = false
          this.feedBack=true
      },  
      navigateHome(){
        this.menuModal = false  
        window.open(`${BASE_URL}/home`,"_self") 
      },  
      navigateHome(){
         window.open(`${BASE_URL}/home`,"_self") 
      }
    }
  }
</script>
<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
  .banner-content {
        background-image: url(https://ns.yatracdn.com/common/images/asi/list-banner.png);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 185px;
        background-position: center;
        .menu-tab {
            color: #fff;
               margin-top: 80px;
        }
        .heading{
            clear: both;
            text-align: center;
            color: #fff;
			.search {
                border-radius: 50px;
                border: 1px solid #979797;
                height: 72px;
                width: 60%;
                color: #9B9B9B;
                font-size: 1.125em;
                padding-left: 30px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h1 {
                font-size: 3.313em;
                font-weight: normal;
            }
            .fs26 {
                font-size: 1.625em;
            }
        }
    }
</style>
