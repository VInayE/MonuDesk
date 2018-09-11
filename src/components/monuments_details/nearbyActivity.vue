<template>
     <div class="bg-FAFAFA city-hotels nearby-activity" v-if="nearbyAct && Object.keys(nearbyAct).length > 0 && activityCityId != ''">
            <div class="wrapper-width">
                <div class="block-heading">
                    <div class="block-title txt-c">
                        <h2>Explore {{cityName}}</h2>
                    </div>
                </div>
                <ul class="activity-info">
                    <li v-for="items in nearbyAct.slice(0,4)">
                        <img :src="items.activityImageURL" class="img-resp">
                        <div class="block-btm prel">
                            <h3>{{items.title}}</h3>
                            <div class="price">
                                <span>starting From</span><br>
                                <strong>&#8377 {{numberComma(items.startingPrice)}} </strong>
                            </div>
                            <div class="yt-ico-rating yt-rating-4"></div>
                            <a class="btn-red pabs" @click.prevent="navigateToActivities(items.activityCode,$event)"> View details </a>
                        </div>
                    </li>
                </ul>
                <div class="explorecityactivities">
                    <span class="btn-red" href="javascript:void(0);" @click.prevent="exploreActivities(cityName,$event)"> Explore All</span>
                </div>
            </div>
        </div>  
</template>
<script>
import {activityNearby} from '../../api/api'
import {numberWithCommas} from '../../helper/asiHelper'
  export default {
    name:"nearby-activity",
	props:['cityName', 'activityCityId'], 
	 data () {
      return {  
        nearbyAct : {}
      }   
    }, 
	 created () {	 
      let self = this
	  let hotelParams = {
		 "magnumCityId": this.activityCityId,
		 "sortType":"desc",
		 "sortBy":"price",
		 "categoryIds":[1,2,3,5,6,7,8,9],
		 "priceRange":[{
			"minPrice":1,
			"maxPrice":2017
		  }],
		 "page":1,
		 "pageSize":5
		}
      activityNearby(hotelParams).then(response => {
         self.nearbyAct = response.data.activityDetailsSearchWSOs
      }, response => {
         self.nearbyAct = {}
      }); 
    },
    methods : {
      numberComma(price){
        return numberWithCommas(price)
      },
	  navigateToActivities(aCode,e){
		  let navigateURL = `https://www.yatra.com/activities/details/product/`+aCode		
          window.open(navigateURL,'_blank')
          e.preventDefault()
          e.stopPropagation()
	  },
	  exploreActivities(cityName,e){
		  let navigateURL = `https://www.yatra.com/activities/search/product/`+cityName
          window.open(navigateURL,'_blank')
          e.preventDefault()
          e.stopPropagation()
	  }
    }	  
  }
</script>
<style scoped lang="scss">
	.nearby-activity {
		background: #fff;
	}
  .bg-FAFAFA {
        padding-bottom: 100px;
        .monument-info {
            margin: 0 auto;
            width: 91%;
            overflow: hidden;
            .fl {
                li{
                    color: #777;
                    margin-bottom: 12px;
                }
            }
        }
    }
	.btn-red {
		background: #F34F4F;
		padding: 10px;
		color: #fff;
		text-align: center;
		border-radius: 3px;
		right: 15px;
		bottom: 20px;
		cursor: pointer;
	}
    .city-hotels {
        ul {
            li {
                display: inline-block;
                margin-bottom: 15px;
				border: 1px solid #cecece;
                width:23%;
				vertical-align: top;
				transition: all ease .5s;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
				margin-right: 30px;
				&:last-child {
					margin-right: 0;
				}
    				&:hover {
    				transform: scale(1.1);
    				box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                    cursor: pointer;
    				.img-desc {
    					padding: 10px;
    				}
			}
                .block-btm {
                    text-align: left;
                    padding: 15px;
                    h3 {
                        font-size: 1em;
                        color: #666;
                        margin: 0 0 5px;
						white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipse;
                        width: 225px;
                    }
                    .price {
                        span {
                            color: #999;
                            font-size: 0.750em;
                        }
                        strong {
                            font-size: 1.512em;
                        }
                    }
                }
            }
        }
    }
	.yt-ico-rating {
		background: transparent url(https://css.yatra.com/content/yatra-seo/default/images/ico-rating-md.png) 0 1px repeat-x;
		position: relative;
		text-indent: -9999px;
		width: 68px;
		vertical-align: middle;
	}
	 .yt-ico-rating:before {
                background: transparent url(https://css.yatra.com/content/yatra-seo/default/images/ico-rating-md.png) 0 -13px repeat-x;
                content: " ";
                left: 0;
                position: absolute;
                top: 0
            }

             .yt-ico-rating.yt-rating-5:before {
                width: 70px
            }

             .yt-ico-rating.yt-rating-4:before {
                width: 55px
            }

             .yt-ico-rating.yt-rating-3:before {
                width: 42px
            }

             .yt-ico-rating.yt-rating-2:before {
                width: 28px
            }

             .yt-ico-rating.yt-rating-1:before {
                width: 14px
            }

             .yt-ico-rating.yt-rating-0:before {
                width: 0
            }
	.explorecityactivities{
        clear: both;
        margin: 15px auto;
		text-align: center
    }
	@media only screen and (max-width: 640px) {
		.detail-module {
			.bg-FAFAFA {
				padding-bottom: 60px;
			}
			.city-hotels {
				ul {
					text-align: center;
					li {
						margin-right: 0;
					}
				}
			}
		}
	}

</style>
