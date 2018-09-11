<template>
  <div class="page-not-found">
   <div class="no-found-logo">
   		<img src="../assets/logo-black.png">
   		<p class="mt10">"Must See" Indian Heritage</p>
   </div>
    <img src="../assets/no-page-found.png" class="img-resp">
    <h2 class="mt10">No Code Found</h2>
	  <p class="get-back mt10">Visit <a :href='baseURL+"/home"' target="_self">our home page</a></p>
  </div>
</template>
<script>
  import {BASE_URL} from '../util/constants'
  export default {
	 data () {
	   return {
		 baseURL : BASE_URL
	   }	 
	 } 
  }
</script>
<style scoped="true" lang="scss">
	.page-not-found {
		text-align: center;
		img {
			margin-top: 50px;
		}
		.mt10{
			margin-top: 10px;
		}
		h2,a {
			color: #ea2330;
		}
	}
</style>
