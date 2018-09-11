<template>
    <div class="contact-view">
        <div class="banner-content prel">
            <div class="wrapper-width">
                <div class="menu wfull">
                    <img class="logo fl mt30" @click="navigateHome()" src="../assets/logo.png">
                    <h1>"Must See" Indian Heritage</h1>
                    <div class="menu-tab fr" style="cursor:pointer;" @click="menuModal = true">MENU <i class="ico-sprite ico-bar"></i></div>
                </div>
            </div>
        </div>
        <div class="contact-us">
            <div class="wrapper-width">
                <div class="block-heading">
                    <div class="block-title txt-c">
                        <h2>Contact Us</h2>
                    </div>
                </div>
                <div class="contact-info">
                    <ul class="fl">
                       <li @click="activeTab = index "  v-bind:class="{ active: activeTab == index , nonactive: activeTab != index}" v-for="(name,index) in contactUsData">{{index}}</li>
                    </ul>
                    <div class="contact-detail">
                      <div v-for="(data,index) in contactUsData[activeTab]">
                        <div class="name">{{data.name}} {{data.designation ? ',' :''}} {{data.designation}}</div>
                        <span>{{data.position}}</span>
                        <span v-for="(telephone,index) in data.telephone">{{telephone ? 'Phone No :':''}} {{telephone}}</span>
                        <span>{{data.fax ? 'Fax :':''}} {{data.fax}}</span>
                        <span v-for="(email,index) in data.email">E-mail: {{email}}</span>
                       </div>
                       <div class="weather-info" style="width:652px;height:500px;display:inline-flex;">
                        <div id="asi-monument-map" style="width: 100%;height:100%"></div>
                    </div>
                    </div>

                </div>
            </div>
             <feed-back v-if="feedBack" @closefeedbackform = "feedBack = false"></feed-back>
             <transition name="slide-fade">
                	<menu-modal v-if="menuModal" @closeMenuBar="menuModal=false" @navigateToHome="navigateHome($event)" @closeMenuModal="menuModal=false" @openFeedBack="openFeedBackForm($event)"></menu-modal>
			 </transition>
        </div>
    </div>
</template>
<script>
   import {initializeContactUSGoogleMaps} from '../helper/asiMonumentMap'
   import {BASE_URL} from '../util/constants'
   export default {
     components :{
       MenuModal : () => import('../components/common/menu.vue'),
        FeedBack : () => import('../components/common/feedBack.vue') 
     },
     methods : {
      openFeedBackForm(event){
         this.menuModal = false
          this.feedBack=true
      },   
      navigateHome(){
        this.menuModal = false  
        window.open(`${BASE_URL}/home`,"_self") 
      },   
     },
     data () {
       return {
         menuModal : false, 
         feedBack : false, 
         activeTab:'Director General',
         contactUsData :{
            "Director General":[{
                "name":"Smt. Usha Sharma",
                "designation":"IAS",
                "position":"Director General",
                "telephone":["011-23015954"],
                "fax":"011-23019487",
                "email":["directorgeneralasi@gmail.com","dg.asi@gov.in"]
            }],
            "Additional Director General (Adm.)":[{
                "name":"Shri Rakesh Singh Lal",
                "designation":"",
                "position":"Additional Director General( Adm.)",
                "telephone":["011-23012058"],
                "fax":"011-23014456",
                "email":['adg1.asi@gmail.com','adg2.asi@gmail.com']
            }],
            "Joint Director General":[{
                "name":"Sh. S. B. Ota",
                "designation":"",
                "position":"Joint Director General ",
                "telephone":[],
                "fax":"",
                "email":[]
            },{
                "name":"Dr. Urmila Sant",
                "designation":"",
                "position":"Joint Director General( Science Branch Red Fort, Delhi)",
                "telephone":["011-23012058"],
                "fax":"",
                "email":['jtdg4.asi@gmail.com']
            },{
                "name":"Shri Janhwij Sharma",
                "designation":"",
                "position":"Joint Director General (Conservation,World Heritage,NCF,Website)",
                "telephone":["011-23013316"],
                "fax":"",
                "email":['jtdgconservation.asi@gmail.com','jtdgwh.asi@gmail.com']
            }],
            "Director (Administration,Planning)":[{
                "name":"P.G. Kaladharan",
                "designation":"",
                "position":"Director (Administration,Planning)",
                "telephone":["011-23013316 (T-f)",'011-23018614'],
                "fax":"011-23010789",
                "email":['diradm.asi@gmail.com','dirpla.asi@gmail.com']
            }],
            "Director (Antiquity, Publication)":[{
                "name":"Dr. D.N. Dimri ",
                "designation":"",
                "position":"Director (Antiquity, Publication)",
                "telephone":[],
                "fax":"",
                "email":['dircep.asi@gmail.com','dirpub.asi@gmail.com']
            }],
            "Director (Institute of Archaeology)":[{
                "name":"Dr. S.K. Manjul",
                "designation":"",
                "position":"Director (Institute of Archaeology)",
                "telephone":[' 011-23017197'],
                "fax":"",
                "email":['dirins.asi@gmail.com']
            }],
            "Director (Monument)":[{
                "name":"Sh. T. J. Alone",
                "designation":"",
                "position":"Director (Monument)",
                "telephone":['011-23018848'],
                "fax":"",
                "email":['dirmonu2.asi@gmail.com']
            }],
            "Director (Excavation & Exploration)":[{
                "name":"Shri. Jitendra Nath",
                "designation":"",
                "position":"Director (Excavation & Exploration)",
                "telephone":['011-23010953'],
                "fax":"",
                "email":[]
            }],
            "Director (World Heritage & museum)":[{
                "name":"Dr. K. Lourdusamy",
                "designation":"",
                "position":"Director (World Heritage & museum)",
                "telephone":['011-23017553'],
                "fax":"",
                "email":['directorwhs.asi@gmail.com','dirmuse.asi@gov.in']
            }],
            "Director(Museum, Publication, CEP & World Heritage)":[{
                "name":"Dr. Praveen Kumar Mishra",
                "designation":"",
                "position":"Director(Museum, Publication, CEP & World Heritage)",
                "telephone":['011-23792904'],
                "fax":"",
                "email":['dirpub.asi@gmail.com','dircep.asi@gmail.com']
            }],
            "Director (Conservation)":[{
                "name":"Dr. Praveen Kumar Mishra",
                "designation":"",
                "position":"Director(Museum, Publication, CEP & World Heritage)",
                "telephone":['011-23792904'],
                "fax":"",
                "email":['dirpub.asi@gmail.com','dircep.asi@gmail.com']
            }],
            "Joint Director (O/L)":[{
                "name":"",
                "designation":"",
                "position":"Joint Director (O/L) ",
                "telephone":['011-23014460 '],
                "fax":"",
                "email":[]
            }],
            "Deputy Director":[{
                "name":"Tara Chandar",
                "designation":"",
                "position":"Deputy Director (Admin) ",
                "telephone":[],
                "fax":"",
                "email":[]
            },{
                "name":"Shri Mritunjay Saini",
                "designation":"",
                "position":"Deputy Director (Account) ",
                "telephone":[' 011-23010822'],
                "fax":"",
                "email":[]
            }],
            "Superintending Archaeologist (Monuments)":[{
                "name":"V.N. Prabhakar",
                "designation":"",
                "position":"Superintending Archaeologist (Monuments)",
                "telephone":[],
                "fax":"",
                "email":[]
            },{
                "name":"T. Arunraj",
                "designation":"",
                "position":"Superintending Archaeologist (Museum)",
                "telephone":[],
                "fax":"",
                "email":[]
            },{
                "name":"Shri Bhima Azmira",
                "designation":"",
                "position":"Superintending Archaeological ( Engineer )",
                "telephone":[],
                "fax":"",
                "email":['bhimaazmiraasi@gmail.com']
            }],
            "Horticulture Cell":[{
                "name":"Shri Kanchan Singh",
                "designation":"",
                "position":"Chief Horticulturist",
                "telephone":['011-23792676'],
                "fax":"",
                "email":[]
            }],
            "Assistant Director (O/L)":[{
                "name":"Shri Kanchan Singh",
                "designation":"",
                "position":"Assistant Director (O/L)",
                "telephone":['011-23793607'],
                "fax":"",
                "email":['adolasi60@gmail.com']
            }],
            "Dy. Superintending Archaeologist":[{
                "name":"Dr. Vinay Kumar Gupta",
                "designation":"",
                "position":"Dy. Superintending Archaeologist (Antiquties and Customs)",
                "telephone":['011-23061659'],
                "fax":"",
                "email":[]
            },{
                "name":"Dr. R.K Patel",
                "designation":"",
                "position":"Dy. Superintending Archaeologist (Monument, Website)",
                "telephone":['011-23063282'],
                "fax":"",
                "email":['website.asi@gov.in']
            }],
            "Chief Artist":[{
                "name":"Shri Rakesh Chander",
                "designation":"",
                "position":"Chief Artist",
                "telephone":[],
                "fax":"",
                "email":['dgasi.art@gmail.com']
            }]
                
            
         }
       }  
     },  
     mounted () {
       initializeContactUSGoogleMaps()  
     }
   }
</script>

<style scoped="true" lang="scss">
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
    .contact-view {
        .banner-content {
            background-image: url(../assets/contact-banner.png);
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 165px;
            background-position: center;
            .menu-tab {
                color: #fff;
                margin-top: 80px;
            }
            .menu {
                h1 {
                color: #fff;
                text-align: center;
                font-weight: normal;
                font-size: 22px;
                position: absolute;
                width: 92%;
                top: 45%;
                }
            }
        }
        .block-heading {
        padding: 50px 0 ;
        .block-title {
            h2 {
                font-size: 2.688em;
                font-weight: normal;
            }
        }
        .txt-desc {
            text-align: center;
            width: 70%;
            margin: 40px auto;
            color: #333;
            p {
                margin-top: 30px;
                line-height: 28px;
                strong {
                    color: #ea2330;
                }
            }
        }
    }
        .contact-us {
            background: #fafafa;
            padding-bottom: 100px;
            .contact-info {
                margin: 0 auto;
                width: 100%;
                overflow: hidden;
                .fl {
                    .active {
                   height: auto;
                   padding: 10px;
                   background-color: #ea2330;
                   color: white;
                   border-radius: 22px;
                   padding-left: 20px;
                   padding-right: 20px; 
                   width:100%;
                }
                .nonactive{
                    padding-left: 20px;
                    height: auto;
                    width:100%;
                }
                    li{
                        color: #777;
                        margin-bottom: 12px;
                        cursor:pointer;
                    }
                }
            }
            .weather-info {
				margin-top: 30px;
				box-shadow: 0 0px 15px rgba(0, 0, 0, 0.2);
                h3 {
                    font-size: 1.250em;
                }
                ul {
                    margin-top: 20px;
                    li {
                        margin-bottom: 10px;
                        .ml20 {
                            margin-left: 20px;
                        }
                    }
                }
                .bg-weather {
                    background-repeat: no-repeat;
                    background-size: cover;
                    width: 100%;
                    height: auto;
                    background-position: center;
                    margin-top: 40px;
                    color: #fff;
                    &.p20 {
                        padding: 20px 0 10px 20px;
                    }
                    ul {
                        li {
                            display: inline-block;
                            width: 43%;
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
            }
        }
		.contact-detail {
			float: left;
			width: 50%;
			margin-left: 8%;
			.name {
				font-weight: bold;
				margin-bottom: 10px;
				font-size: 1.2em;
			}
			span {
				margin-bottom: 10px;
				display: block;
			}
		}
    }

	@media only screen and (max-width: 640px) {
		.contact-view {
			.banner-content {
				height: 350px !important;
				h1 {
					width: 100% !important;
					margin-top: 150px;
					font-size: 2em !important;
				}
			}
			.contact-detail {
				margin-left: 20px;
			}
		}
	}

</style>
