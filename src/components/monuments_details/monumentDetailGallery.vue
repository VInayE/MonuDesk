<template>
	<div class="wrapper-width photo-gallery prel clearfix bdr" id="">
		<div class="block-heading">
			<div class="block-title">
				<h2>Photo Gallery</h2>
			</div>
		</div>
			<div class="gallery-img animated">
				<img :src="monumentMainImage.url" class="img-resp">
			</div>	
			<ul class="ThumbImage">
				<li v-for="(monument,index) in monument_images" :key="index" @click="monumentMainImage = monument;selectedIndex = index" >
					<img :src="monument.url" class="img-resp" v-bind:style="{ opacity: selectedIndex == index ? '1':'.5' }">
				</li>	
			</ul>
			<div class="page-control">
				<span @click="findPrevImage()" class="pabs prev"><i class="ico-sprite ico-prevG"></i></span>
				<span @click="findNextImage()" class="pabs next"><i class="ico-sprite ico-nextG"></i></span>
			</div>
		</div>
</template>

<script>
	
 export default {
  data () {
    return {
		monumentMainImage :{},
		selectedIndex : 0
  }
  },
 props: {
   monumentCarouselImages : {
   type:Array,
   required :true  
	}
 },
 created () {
  this.monument_images = this.monumentCarouselImages
  this.monumentMainImage = this.monument_images[0]	 
 },
 methods :{
	findNextImage(){
	  if(this.selectedIndex < this.monument_images.length -1){
		  this.monumentMainImage = this.monument_images[this.selectedIndex+1]
		  this.selectedIndex +=1
	  } else {
		  this.selectedIndex = 0
		  this.monumentMainImage = this.monument_images[0]
	  }
	}, 
	findPrevImage(){
	  if(this.selectedIndex == 0){
		  this.selectedIndex = this.monument_images.length-1
		  this.monumentMainImage = this.monument_images[this.selectedIndex]
	  }else {
		  this.selectedIndex -=1
		  this.monumentMainImage = this.monument_images[this.selectedIndex]
	  }
    }
 }
 }
</script>
<style scoped="true" lang="scss">
	.photo-gallery {
		
		padding-bottom: 50px;
		.gallery-img {
			transition: all .1s ease-in-out;
		}
		.ThumbImage {
			text-align: center;
			margin-top: 10px;
			li {
				display: inline-block;
				width: 80px;
				margin-right: 8px;
				cursor: pointer;
				img {
					border-radius: 5px;
					transition: all .3s ease-in-out;
					&:hover {
						opacity: 1 !important;
					}
				}
			}
		}
		.page-control {
			span {
			background: #fff;
			padding: 10px;
			opacity: .8;
				cursor: pointer;
			}
		}
		.prev {
			top: 50%;
			border-radius: 0 3px 3px 0;
		}
		.next {
			top: 50%;
			right: 0;
			border-radius: 3px 0 0 3px
		}
	}
	@media only screen and (min-width: 769px) {
		.photo-gallery {
			width: 100%;
			clear: both;
		}
	}
	@media only screen and (min-width: 640px) {
		.photo-gallery {
			.ThumbImage {
				li {
					width: 60px;
				}
			}
		}
	}

	.animated {
	  animation-duration: 1s;
	  animation-fill-mode: both;
	}
	@keyframes slideInRight {
	  from {
		transform: translate3d(100%, 0, 0);
		visibility: visible;
	  }

	  to {
		transform: translate3d(0, 0, 0);
	  }
	}

	.slideInRight {
	  animation-name: slideInRight;
	}
	@keyframes slideInLeft {
	  from {
		transform: translate3d(-100%, 0, 0);
		visibility: visible;
	  }

	  to {
		transform: translate3d(0, 0, 0);
	  }
	}

	.slideInLeft {
	  animation-name: slideInLeft;
	}

	.photo-gallery{
		.block-heading .block-title h2{
			font-size: 1.6em ;
		}
	}
</style>
