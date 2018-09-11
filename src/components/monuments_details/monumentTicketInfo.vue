<template>
    <div>
       <div class="wrapper-width monument-ticket-info">
          <div class="left-section">
            <div class="block-heading">
                <div class="block-title">
                    <h2>Ticket Information</h2>
                </div>
            </div>
            <div class="ticket-info">
                
                <div class="bg-world d-iblock">
                  <div class="bg-img">
                    <img src="../../assets/taj-blue.png">
                  </div>
                  <div class=""> 
                  <section class="term-c">
                    <p class="fs-md bold">Terms & Conditions</p>
                    <ul>
                        <li>The e-ticket is not transferable.</li>
                        <li>Entry Fee is not refundable.</li>
                        <li>E-ticket cancellations are not permitted.</li>
                        <li>The Monument is open for visitors between sunrise and sunset.</li>
                        <li>Visitor shall be required to show photo identity proof in original at the entry to the monument.</li>
                        <li>Edibles are not allowed inside the monument.</li>
                        <li>Inflammable/dangerous/explosive articles are not allowed.</li>
                    </ul>
                   </section>
                  </div>
                </div>
                
                <div class="d-iblock txt-l ml10 tic-desc txt-l" v-if="booking_allowed">
                   <div v-for="(priceInformation,index) in Object.keys(price_info).length" :key="index">
                      {{Object.keys(price_info)[index]}} Visitor:<br>
                        <strong>Total  &#8377 {{price_info[Object.keys(price_info)[index]].adult.totalPrice}}</strong><br>
                        <span>&#8377 {{price_info[Object.keys(price_info)[index]].adult.asi}}/- by ASI as Entry fee {{price_info[Object.keys(price_info)[index]].adult.lda == 0 ?'' : '& &#8377' +price_info[Object.keys(price_info)[index]].adult.lda +'/- by ADA as Toll tax' }}</span>
                   </div>
               </div>
                <div class="d-iblock txt-l ml10 tic-desc txt-l" v-if="!booking_allowed">
                   <div>
                        Non Ticketed <br>
                        <strong>Free Entry</strong><br>
                        <span>For all visitors.</span>
                   </div>
               </div>
            </div>
        </div>
        </div>
         <loader-view v-if="isAPICompleted"></loader-view>
    </div>
</template>
<script>
  import {numberWithCommas} from '../../helper/asiHelper'
  export default {
    name :"monument-ticket-info",
    props : {
      bookingAllowed :{
        type:Boolean,
        required:true
      },
      monumentPriceInfo : {
        type:Object
      }
    },
    data () {
      return {
        isAPICompleted:false,  
        showTravellerDetails:false,
        booking_allowed: false,
        price_info : {},
        bookingSuperPNR : ''
      }
    },
    created (){
      this.booking_allowed = this.bookingAllowed
      this.price_info = this.monumentPriceInfo
    },
    methods : {
      numberComma(price){
        return numberWithCommas(price)
      }
    }
  }
</script>
<style scoped lang="scss">
.txt-l {
    text-align : left;
}
.monument-ticket-info {
    padding-bottom: 50px;
	
    .book-now {
        text-align: center;
        button {
            width: 200px;
        }
    }
}
    .ticket-info {
        .bg-world {
                width: 50%;
                vertical-align: top;
            }
            .bg-img{
              background-image: url(../../assets/bg-world.png);
                background-repeat: no-repeat;
                background-size: cover;
                width: auto;
                height: auto;
                background-position: center;
            }
        .ml10 {
            margin-left: 5%;
        }
        .tic-desc {
            font-size: 1.100em;
            strong {
                color: #ea2330;
                font-size: 1.600em;
                margin-top: 8px;
                display: inline-block;
            }
            span {
                color: #999;
                font-size: 0.875em;
            }
            div {
                margin-bottom: 18px;
            }
        }
        term-c{
              font-size: 14px;
            color: #666;
            margin: 10% 0 0;
        }
    }

	@media only screen and (max-width: 768px) {
		.detail-module {
			.ticket-info {
				.ml10 {
					margin-left: 5%;
					width: 95%;
          text-align: center;
				}
				.bg-world {
					display: none;
				}
			}
			.monument-ticket-info {
    			padding-bottom: 60px;
			}
		}
	}


  /* new UAT*/

.term-c{
  margin: 20px 0 0;
}
  .term-c li{
    margin-bottom: 10px;
    list-style-type: disc;
    font-size: 14px;
    margin: 0 0 10px 10px;
    color: #666;
    width: 96%;
}
</style>
