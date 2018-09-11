<template>
 <div class="home-list-map">
    <div id="asi-monument-map"></div> 
  </div>
</template>
<script>
    import {
  monumentRegionSelection,
  getMonumentListAccRegion,
  getMonumentListAccState,
  getMonumentListAccCity
} from "../../helper/asiHelper";
  import {initializeGoogleMaps} from '../../helper/asiMonumentMap'
  export default {
    name : "home-list-map",
    props : {
      monumentListData :{
        type : Array,
        required: true
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
    mounted () {
      initializeGoogleMaps(this.monumentList)
    },
      watch:{
          selectedState() {
      this.monumentList = getMonumentListAccState(
        this.monumentRegionWise["INDIA"],
        this.selectedState
      );
        initializeGoogleMaps(this.monumentList)
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
        initializeGoogleMaps(this.monumentList)
    }
      }
 }    
</script>
<style lang="scss" scoped>
  .home-list-map{
     height:500px;
     width:100%; 
     #asi-monument-map{
       width:100%;
       height:100%
     }
  }
</style>
