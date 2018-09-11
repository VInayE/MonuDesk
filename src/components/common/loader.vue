<template>
  <div class="ajax-loader">
	  <div class="sk-wave">
	    <div class="sk-rect sk-rect1"></div>
		<div class="sk-rect sk-rect2"></div>
		<div class="sk-rect sk-rect3"></div>
		<div class="sk-rect sk-rect4"></div>
		<div class="sk-rect sk-rect5"></div>
	  </div>
	</div>
</template>
<script>
  export default {
     mounted (){
       var d = document.getElementsByTagName('html')
 	     d[0].style.overflow = 'hidden'	
     },
     destroyed (){
         var d = document.getElementsByTagName('html')
 	   d[0].style.overflow = 'auto' 
     }
  }
</script>
<style scoped lang="scss">
  .ajax-loader{
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0px;
    z-index: 9999;
  }
</style>