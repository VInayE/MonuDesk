<template>
  <div  class="yatra-monuments" v-cloak>
      <router-view id="app"></router-view>
  </div>
</template>
<script>
  export default {
    name:"yatra-monuments",
  }
</script>
<style lang="scss">
  [v-cloak] {
    display: none;
  }
    @import url('https://fonts.googleapis.com/css?family=Lato');
	body {
		-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
	supported by Chrome and Opera */
		background: #fff;
	}
    * {
        margin: 0;
        padding: 0;
    }
	.rs {
		font-family: "WebRupee";
		font-style: normal;
	}
    p {
        padding: 0;
    }
    li {
        list-style-type: none;
    }
    #app {
     font-family: 'Lato';
      font-size: 16px;
    }
    .bg-overlay{
        background: rgba(0,0,0,.2);
        position: absolute;
        top: 0; right: 0; left: 0; bottom: 0; 
        z-index: 2;
    }
    .img-resp {
        width: 100%;
        height: auto;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .wrapper-width {
        margin: 0 auto;
        max-width: 1170px;
    }
    .clearfix:after {
       content: " "; /* Older browser do not support empty content */
       visibility: hidden;
       display: block;
       height: 0;
       clear: both;
    }
    .mt20 {
        margin-top: 20px
    }
    .mt10 {
        margin-top: 10px;
    }
    .mt30 {
        margin-top: 30px;
    }
    .wfull {
        width: 100%;
        float: left;
    }
    input {
        outline: none;
    }
    .btn-blue {
        padding: 15px;
        border: none;
        background: #ea2330;
        color: #fff;
        border-radius: 50px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.01);
        cursor: pointer;
    }
    .prel {
        position: relative;
    }
    .pabs {
        position: absolute;
    }
    .txt-c {
        text-align: center;
    }
    a {
        text-decoration: none;
    }
    .c777 {
        color: #777;
    }
    .d-block {
        display: block;
    }
    .d-iblock {
        display: inline-block;
    }
    .asi-footer {
        padding: 40px 0;
        h3 {
            color: #777;
            font-weight: normal;
        }
        ul {
            margin: 51px auto;
    		width: 90%;
            li {
                display: inline-block;
				width: 270px;
				margin-bottom: 20px;
				&:last-child {
					margin-right: 0;
				}
            }
        }
        p {
            color: #777;
            font-size: 0.875em;
        }
		.power {
			font-size: 0.875em;
		}
		.terms {
    		font-size: 0.875em;
			a {
				color: #ea2330;
			}
		}
    }
    .ico-sprite {
        background-image: url(./assets/sprite.png);
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
    }
	.ico-watsup {
		background-image: url(./assets/whatsApp-logo.png);
		display: inline-block;
		height: 26px;
		width: 26px;
		margin-top: -5px;
	}
	.ico-cart {
		background-position: -23px -1454px;
		height: 40px;
		width: 48px;
		right: 60px;
	}
	.cart-count {
		position: absolute;
		top: 14px;
		cursor: pointer;
		right: 60px;
		color: #ea2330;
	}
    .ico-india {
        background-position: -24px -69px;
        width: 142px;
        height: 78px;
    }
    .ico-tourism {
        background-position: -3px -175px;
        width: 179px;
        height: 82px;
    }
    .ico-irctc {
        background-position: -3px -276px;
        width: 179px;
        height: 98px;
    }
    .ico-inc {
        background-position: -3px -387px;
		width: 179px;
		height: 70px;
    }
	.ico-culture {
        background-position: -2px -836px;
		width: 179px;
		height: 70px;
    }
	.ico-visa {
        background-position: 0px -900px;
		width: 179px;
		height: 70px;
    }
    .ico-search {
        background-position: -82px -27px;
        width: 24px;
        height: 27px;
        position: relative;
        top: 0px;
        right: 60px;
    }
    .ico-btn {
        background-position: -34px -15px;
        width: 38px;
        height: 50px;
        margin: 0 auto;
        display: block;
        position: relative;
        clear: both;
        top: 60px;
    }
	.ico-yatra {
		background-position: -117px 0px;
		width: 44px;
		height: 16px;
		position: relative;
		top: 0px;
	}
	.ico-male {
		background-position: -3px -567px;
		width: 39px;
		height: 46px;
	}
	.active .ico-male {
		background-position: -3px -617px;
	}
	.ico-female {
		background-position: -56px -565px;
		width: 47px;
		height: 43px;
	}
	.active .ico-female {
		background-position: -56px -622px;
	}
	.ico-delete {
		background-position: -128px -654px;
		width: 30px;
		height: 29px;
	}
	.ico-edit {
		background-position: -133px -701px;
		width: 25px;
		height: 29px;
	}
	.ico-prev {
		background-position: -120px -604px;
		width: 32px;
		height: 34px;
		cursor: pointer;
	}
	.ico-next {
		background-position: -119px -564px;
		width: 32px;
		height: 34px;
		cursor: pointer;
	}
	.ico-bar {
		background-position: -134px -731px;
		width: 32px;
		height: 34px;
		cursor: pointer;
	}
	.ico-cal {
		background-position: -134px -781px;
		width: 32px;
		height: 34px;
		cursor: pointer;
		float: right;
		margin-right: 20px;
		margin-top: 5px;
	}
	.ico-cal-ff {
		background-position: -134px -783px;
		width: 32px;
		height: 34px;
		cursor: pointer;
		float: right;
		margin-right: 20px;
		margin-top: 5px;
	}
	.ico-arr {
		background-position: -155px -815px;
		width: 22px;
		height: 14px;
		cursor: pointer;
		float: right;
		margin-top: 5px;
		position: absolute;
		top: 9px;
		right: 10px;
	}
	.ico-state {
		background-position: -54px -1207px;
		width: 32px;
		height: 32px;
		zoom: .8;
	}
	.ico-monument {
		 background-position: -49px -1160px;
        width: 33px;
        height: 32px;
		zoom: .9;
	}
	.ico-rain {
        background-position: -5px -1106px;
        width: 40px;
        height: 40px;
    }
	.ico-summer {
        background-position: -5px -1199px;
        width: 40px;
        height: 40px;
    }
	.ico-winter {
        background-position: -5px -1159px;
        width: 40px;
        height: 40px;
    }
	.ico-season {
        background-position: -5px -1249px;
        width: 40px;
        height: 40px;
    }
    .ico-asi{
        background-position: 40px -1336px;
        width: 179px;
        height: 70px;
    }
	.ico-prevG {
		background-position: -22px -1421px;
		width: 15px;
		height: 18px;
	}
	.ico-nextG {
		background-position: -57px -1422px;
		width: 15px;
		height: 18px;
	}
	.ico-review{
         background-image: url(./assets/review.png);
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
        padding: 20px;
         position: absolute;
        left: 0;
        top: -10px;

    }
    .ico-traveller{
        background-image: url(./assets/traveller.png);
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
        padding: 20px;
         position: absolute;
        left: 0;
        top: -10px;

    }
	.mt16 {
        margin-top: 16px;
    }
    button {
        outline: none;
    }
     .block-heading {
        padding: 60px 0;
		 padding-bottom: 50px;
        .block-title {
            h2 {
                font-size: 2.688em;
                font-weight: normal;
            }
        }
        .txt-desc {
            text-align: center;
            width: 70%;
            margin: 20px auto;
            color: #333;
            p {
                margin-top: 30px;
                line-height: 28px;
                strong {
                    color: #ea2330;
                }
            }
        }
		 &:nth-child(2) {
			    padding: 0 0 60px 0;
		 }
    }
    .view-type {
        float: right;
        margin-top: -40px;
        li {
            float: left;
            border: 1px solid #eeeeee;
            background: #fff;
            border-radius: 0px 5px 5px 0px;
            color: #000;
            cursor: pointer;
            font-size: 0.875em;
            text-align: center;
            width: 95.9px;
            height: 40px;
            line-height: 40px;
                &:first-child {
                    border-radius: 5px 0px 0px 5px;
                    border-right: none;
                }
                &.active {
                    background: #ea2330;
                    color:#fff;
                }
            }
        }
        .bold{
            font-weight:bold
        }
        .normal{
            font-weight:normal!important;
        }
        .logo{
          cursor:pointer;
        }
        .detail-modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        display: table;
        transition: opacity .3s ease;
        .bg-fff {
            background: #fff;
            color: #000;
            float: right;
            width: 60%;
            height: 100%;
            .p50 {
                padding: 20px;
            }
            .mb20 {
                margin-bottom: 20px;
            }
            h1 {
                font-size: 1.300em;
                font-weight: normal;
            }
        }
        .basic-detail {
            background: #F1F1F1;
                text-align: center;
                height: calc(100vh - 40px);
				overflow-y :auto;
                h2 {
                    color: #fff;
					font-size: 1.375em;
					margin-bottom: 10px;
					padding: 35px 0;
					padding-bottom: 12px;
                }
                .hr {
                    border-bottom: 1px solid #D9D9D9;
                    span {
                        background: #f1f1f1;
                        position: relative;
                        top: 8px;
                        padding: 0 20px;
                    }
                }
			.gender {
				margin-bottom: 10px;
				li {
					margin-right: 20px;
					cursor: pointer;
					span {
						padding: 18px;
						border-radius: 100%;
						height: 80px;
						width: 80px;
						display: inline-block;
						&.active {
							background: #ea2330;
						}
					}
					p {
						margin-top: 8px;
						color: #666;
					}
				}
			}
			.traveler-banner {
				.icon-btn {
					position: absolute;
					width: 100%;
					left: 0;
					top: 50px;
					.ico-prev {
						left: 30px
					}
					.ico-next {
						right:30px
					}
				}
			}
        }
    }
	 .vdp-datepicker>div>input{
		color: #666!important;
		font-size: 14px!important;
		margin-top: 15px!important;
		width:100%!important;
		}
     .carousel__item{
          transition: 1.5s ease!important;
        }
	.selectedDate {
			.vdp-datepicker__calendar {
				.cell{
					&.selected{
						 background: #ea2330;
						 color: #fff;
					}
				}
			}
		}

	.info_content {
		img {
			width: 100%;
			height: auto;
			margin-top: 5px;
		}
		h3 {
			margin: 10px 0;
		}
		p {
			margin-bottom: 0;
			color: #EA2330;
		}
	}
	.gm-style-iw + div {
		display: none;
	}
	.gm-style-iw div:nth-of-type(1) {
		width: 100%;
		max-width: 100% !important;
	}

	.carousel {
		.carousel__controls {
			position: absolute;
			bottom: 50px;
			background: transparent;
			z-index:10;
			button {
				font-size: 0;
				width: 15px;
				height: 15px;
				border-radius: 100%;
				background: white;
				opacity: .2;
				.btn__content {
					display: none;
				}
				&.carousel__controls__item--active {
					opacity: 1;
				}
			}
		}
	}
.tabs__item--active {
    background-color: #ea2330;
    color: #fff !important;
    border-radius: 50px;
}
.carousel{
    height: 600px;
}
.error-message{
   color:red;
}
.basic-detail .traveller-detail .prel:focus, {
    border: 2px solid #ea2330!important;
}
	.tabs__bar .icon--right {
		display: none !important;
	}
	.tabs-bar {
		text-align: center;
		.tabs__container {
			display: block;
			position: static;
			li {
				display: inline-block;
			}
		}
	}
	.calender {
		.vdp-datepicker__calendar {
			width: 100%;
		}
	}
	.gm-iv-address {
			height: 57px !important;
			width: 150px;
		}
	.loader {
		position: absolute;
    width: 100%;
    background: rgba(0,0,0,0.8);
    border-radius: 5px;
    line-height: 220px;
    z-index: 99;
		height: 100%;
		min-height: 200px;
	}
	.sk-wave {
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 10px;
    display: inline-block;
		position: absolute;
}
.sk-wave .sk-rect {
   background-color:#dbdbdb;
   height: 100%;
   width:4px;
   margin:0 1px 0 0;
   display: inline-block;
    -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
            animation: sk-waveStretchDelay 1.2s infinite ease-in-out; }
  .sk-wave .sk-rect1 {
    -webkit-animation-delay: -1.2s;
            animation-delay: -1.2s; }
  .sk-wave .sk-rect2 {
    -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s; }
  .sk-wave .sk-rect3 {
    -webkit-animation-delay: -1s;
            animation-delay: -1s; }
  .sk-wave .sk-rect4 {
    -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s; }
  .sk-wave .sk-rect5 {
    -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s; }

@-webkit-keyframes sk-waveStretchDelay {
  0%, 40%, 100% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4); }
  20% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1); } }

@keyframes sk-waveStretchDelay {
  0%, 40%, 100% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4); }
  20% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1); } }
	@media only screen and (max-width: 1040px) and (min-width: 769px) {
		#monument-list {
			padding: 0 20px;
			.list-nav {
				.w40{
					width: 54%;
				}
				.drop-down {
					width: 28%;
				}
			}
		}
		.monument-list-banner {
			.menu {
				padding: 0 30px;
			}
		}
	}

	@media only screen and (min-width: 960px) {
    .desk-gallery {
            display: block;
        }
        .mobile-gallery {
            display: none;
        }
    }
    @media only screen and (max-width: 988px) {
        .banner-content{
            background-size: cover;
            height: auto;
            background-position: center;
            padding-bottom: 80px;
            .menu {
                .fl {
                    float: none;
                    margin-top: 20px;
                    margin-left: 20px;
                }
                &.wfull {
                    float: none;
                    text-align: left;
                }
                .menu-tab {
                    &.fr {
                        float: none;
                        position: absolute;
                         right: 25px;
                            top: -70px;
                    }
                }
            }
            .search-block,.heading {
                margin-top: 59px;
                h1 {
                    font-size: 2em !important;
                }
                .fs26 {
                    font-size: 3.125em;
                }
                .search {
                    border-radius: 100px;
                    width: 95% !important;
                    font-size: 2.250em;
                    padding-right:15%;
                }
                .input-grp {
                    position: relative;
                    .ico-sprite {
                        position: absolute;
                        right: 40px;
                        top: 40px;
                    }
                }
            }
            .btn-explore {
                font-size: 1.875em;
                width: 60%;
                height: 126px;
                border-radius: 100px;
            }
         }
        #monument-list {
            padding: 0 20px;
            margin-top: 70px;
        }
        .monument-gallery {
            .gallery-panel {
                li {
                    display: inline-block !important;
                    width: 48% !important;
                    margin-right: 20px !important;
                    margin-bottom: 20px !important;
                    overflow: hidden !important;
                    border-radius: 5px !important;
                    max-height: inherit!important;
                    min-height: inherit!important;
                    &:nth-child(2n) {
                        margin-right: 0 !important;
                    }
                    &:nth-child(3n) {
                        margin-right: none !important;
                    }
                }
            }
        }
        .list-nav {
            margin-top: 0 !important;
            border-bottom: none !important;
            padding: 0!important;
            .w40 {
                    width: 100% !important;
                    text-align: center;
                    margin: 40px 0 !important;
            }
            .drop-down {
                margin-right: 15px;
                margin-left: 0px !important;
            }
        }
        .logo {
            width: 50px;
            img {
                width: 100%;height: auto;
            }
        }
    }
	@media only screen and (max-width: 768px) {
		.banner-content{
            background-size: cover;
            height: auto;
            background-position: center;
            padding-bottom: 80px;
            .menu {
                .fl {
                    float: none;
                    margin-top: 60px;
                }
                &.wfull {
                    float: none;
                    text-align: center;
                }
                .menu-tab {
                    &.fr {
                        float: none;
                        position: absolute;
                         right: 25px;
   						 top: -60px;
                    }
                }
            }
            .search-block,.heading {
                margin-top: 59px;
                h1 {
                    font-size: 5.000em;
                }
                .fs26 {
                    font-size: 3.125em;
                }
                .search {
                    border-radius: 100px;
                    width: 95% !important;
                    font-size: 2.250em;
					padding-right:15%;
                }
				.input-grp {
					position: relative;
					.ico-sprite {
						position: absolute;
						right: 40px;
						top: 40px;
					}
				}
			}
            .btn-explore {
                font-size: 1.875em;
                width: 60%;
                height: 126px;
                border-radius: 100px;
            }
     	}
		#monument-list {
			padding: 0 20px;
			margin-top: 50px;
		}
		.monument-gallery {
			.gallery-panel {
				li {
					display: inline-block !important;
					width: 48% !important;
					margin-right: 20px !important;
					margin-bottom: 20px !important;
					overflow: hidden !important;
					&:nth-child(2n) {
						margin-right: 0 !important;
					}
					&:nth-child(3n) {
						margin-right: none !important;
					}
					.mask {
						.info {
							top: 45%!important;
    						left: 35%!important;
						}
					}
				}
			}
		}
		.list-nav {
			margin-top: 0 !important;
			border-bottom: none !important;
			padding: 0!important;
			.w40 {
				    width: 100% !important;
					text-align: center;
					margin: 40px 0 !important;
			}
			.drop-down {
				margin-right: 15px;
				margin-left: 0px !important;
			}
		}
        .left-module{
            width: 100% !important;
        }
        .nearby-activity, #nearby-hotel{
            display: none;
        }
	}

	@media only screen and (max-width: 667px) {
		.listing-module .banner-content {
			height: 282px !important;
		}
		.carousel,.banner-content  {
			height: 640px !important;
		}
		.list-nav {
			margin-bottom: 0 !important;
			width: 100% !important;
			padding: 0 20px;
			float: left;
			height: auto !important;
			.list-tab {
				line-height: normal!important;
				display: inline-flex;
				overflow-x: auto;
				width: 100%;
				li {
					height: auto !important;
					&.active {
						border-bottom: none !important;
						color: #ea2330 !important;
					}
				}
			}
			.w40 {
				    width: 100% !important;
					text-align: center;
					margin-top: 20px;
			}
			.drop-down {
				display: none;
			}
			.view-type {
				float: none;
    			margin: 0 auto;
				li {
					display: inline-block;
					float: none;
				}
			}
		}
		.monument-gallery {
			clear: both;
			.gallery-panel {
				li {
					display: inline-block !important;
					width: 100% !important;
					margin-right: 0 !important;
					margin-bottom: 30px !important;
					overflow: hidden !important;
					.mask {
						.info {
							top: 45%!important;
    						left: 35%!important;
						}
					}
				}
			}
		}
		.detail-module {
			.block-heading {
				padding: 40px 0px !important;
				&:nth-child(2) {
					padding-top: 0 !important;
				}
				.txt-desc {
					width: 90%;
				}
			}
		}
		.asi-footer {
			ul {
				    margin: 20px 0;
				li {
					display: inline-block;
					margin-right: 0;
					width: 30%;
					margin-bottom: 25px;
				}
			}
		}
		.tabs-bar {
			.tabs__wrapper {
				margin: 0 30px !important;
			}
			li {
				a {
					&.tabs__item--active {
						background-color: transparent;
						color: #ea2330 !important;
					}
				}
			}
		}
		.tabs__container {
			position: static;
			white-space: nowrap;
			overflow-x: scroll;
		}
		.detail-module #frescoHeader .dropdown-toggle {
			 color:#666!important;
 		}
	}
	@media only screen and (max-width: 580px) {
		.block-heading {
			padding: 70px 0;
		}
		.monument-gallery {
			clear: both;
			.gallery-panel {
				li {
					.mask {
						.info {
							top: 45%!important;
    						left: 45%!important;
						}
					}
				}
			}
		}
		.asi-footer {
			padding:40px 10px 10px 10px;
			ul {
				width: 100%;
				li {
					margin-right: 0;
					margin-bottom: 30px;
					display:block;
					width: auto;
				}
			}
		}
	}
	@media only screen and (max-width: 480px) {
		.carousel,.banner-content  {
			height: 560px !important;
		}
		.banner-content {
			h1 {
				font-size: 2.313em !important;
			}
			 .search-block {
				 .search {
					 font-size: 1em !important;
				 }
			}
			.btn-explore {
				width: 75%!important;
				top: 110px !important;;
			}
		}
		.block-heading {
			.block-title {
				h2 {
					font-size: 1.6em !important;;
				}
				p {
					font-size: .9em;
					width: 70%;
   					margin: 15px auto;
				}
			}
		}
		.monument-gallery {
			clear: both;
			.gallery-panel {
				li {
					.mask {
						.info {
							top: 45%!important;
    						left: 36%!important;
						}
					}
				}
			}
		}
	}

    .tabs__item--active {
    background-color: #ea2330;
    color: #fff !important;
    border-radius: 50px;
}
.carousel{
    height: 600px;
}
.error-message{
   color:red;
}
.basic-detail form input:focus,.basic-detail .traveller-detail .prel:focus {
    border: 2px solid #ea2330!important;
}
	.basic-detail .traveller-detail .prel {
		outline: none;
	}
.vdp-datepicker{
	z-index:9;
	.vdp-datepicker__calendar{
		header span:nth-child(2){
          width:100%!important
		}
		.prev,.next{
			display:none!important
		}
		.cell {
		   border:1px solid #efefef!important;	
		}
	}
}
.unselectedDate {
	.vdp-datepicker__calendar {
		.cell.selected{
           background:white!important;   
           &:hover{
                background: #ea2330 !important;
            }   
		}
	}
}	
.selectedDate .vdp-datepicker__calendar .cell.selected{
     background: #ea2330 !important;
}
	.detail-module #frescoHeader .dropdown-toggle {
	 color:white;
 }
	@media only screen and (max-width: 1024px) and (min-width: 769px) {
		#monument-list {
			padding: 0 20px;
			.list-nav {
				.w40{
					width: 54%;
				}
				.drop-down {
					width: 28%;
				}
			}
		}
		.monument-list-banner {
			.menu {
				padding: 0 30px;
			}
		}
	}


	@media only screen and (max-width: 360px) {
		.banner-content {
			h1 {
				font-size: 2em !important;
			}
			.heading {
				.search {
                    width: 90% !important;
					font-size: .95em !important;
				}
				.input-grp {
					.ico-sprite {
						position: absolute;
						right: 28px;
						top: 40px;
					}
				}
			}
		}
	}
    .tabs__item--active {
    background-color: #2387f5;
    color: #fff !important;
    border-radius: 50px;
}
.detail-module #frescoHeader{
	background-color: transparent!important;
    width: 100%!important;
    border-bottom: 0px!important;
    z-index: 9!important;
    position: absolute!important;
}

 .detail-module #frescoHeader .list-dropdown>a:after{
	 border-top: 4px solid white!important;
 }
 

   /* Date picker */
     .vdp-datepicker__calendar{
         background-color: #e6e6e6;
        font-size: 13px;
        color: #333;
        padding: 0;
        div{
            font-size: 13px;
            background-color: #f5f5f5;
        }
     }
     .vdp-datepicker .vdp-datepicker__calendar header span:nth-child(2){
         background-color: #e6e6e6;
     }

 input::-webkit-input-placeholder { 
      color: #666 !important;
    }
    input::-moz-placeholder {
      color: #666;
    }
    input::-ms-input-placeholder { 
      color: #666;
    }
    input::-moz-placeholder { 
      color: #666;
    }

    .additional-footer{
        width: 100%;
        clear: both;
        text-align: center;
        padding: 20px;
        li{
            display: inline-block;
            padding: 0 20px ;
        }
        @media only screen and (max-width: 768px) {
            display: none;
        }
    }


    /* details page css*/

.left-module{
     width: 65%;
    float: left;
    margin-left: 5%;
    .left-section{
        .block-heading{
        .block-title{
                h2{
                font-size: 1.6em;
             }
            }
        .txt-desc{
             width: 96%;
            }
        } 
    }
    
}
.right-module{
    width: 23%;
    float: left;
    margin-right: 5%;
    margin-left: 2%;
    .wrapper-width{
        width: 96% !important;
        margin-left: 4%;
    }
    .block-heading{
        .block-title{
                h2{
                font-size: 1.6em;
             }
            }
        } 
    .activity-info{
        li{
            width: 100% !important;
            margin: 0;
        }
    }
}

 .left-section{
    width: 100%;
    float: left;
}

.bdr{
    border-bottom: 1px solid #ccc;
}
.pb50{
    padding: 0 0 50px;
}
	.hotel-section{
    .block-heading{
        .block-title h2{
            font-size: 26px;
        }
    } 
  }
</style>
