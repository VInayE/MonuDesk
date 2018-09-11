<template>
   <div ref="secureSignIn">
     <div id ="headerHTML" v-cloak v-show="masterDataAJAX && Object.keys(masterDataAJAX).length>0 && monumentListData && Object.keys(monumentListData).length>0"></div>
      <div class="listing-module monument_list" @click="closeAutoSearchModal()" @keyup.esc="closeAutoSearchModal()" >
        <div ref="cartBlock">
        <div class="asi-modify-search" v-bind:class="{ sticky: stickyHeader}">
        	<ul class="wrapper-width modify-form">
        		<li class="fl"><img src="../assets/icons-monuments.png"  class="resp-logo"></li>
        		<li class="c-f" v-html="resultDisplay()"></li>
        		<li class="fr prel">
        			<div class="input-grp prel" @click="hideInput()">
        				<input type="text" placeholder="Search for a monument, museum, site, city or state">
        				<button class="btn-modify"><img src="../assets/search-icon.png"> </button>
        			</div>
        			<div class="input-grp pabs tpos" v-if="sResult">
        				<input type="text" v-model="searchedParams" @input="autoCompleteAPI()" placeholder="Search for a monument, museum, site, city or state" class="ellipsis">
                 		<button class="btn-modify"><img src="../assets/search-icon.png"> </button>
        				<div v-if="searchedParams.length > 2 && Object.keys(autoCompleteResult).length > 0  && (autoCompleteResult.states.length > 0 || autoCompleteResult.cities.length >0 || autoCompleteResult.monuments.length >0)" class="result-list">
						  <div  v-for="(state,index) in autoCompleteResult.states" @click.prevent="navigateToList('state',state,$event)" class="flex" :key="index">
						      <i class="ico-sprite ico-state"></i>
						      <span v-html="convertTextToBold(state.name)"></span>
						  </div>
						  <div  v-for="(city,index) in autoCompleteResult.cities" @click.prevent="navigateToList('city',city,$event)" class="flex" :key="index">
							<i class="ico-sprite ico-state"></i>
						   <span v-html="convertTextToBold(city.name)"></span>
						  </div>
						  <div  v-for="(monument,index) in autoCompleteResult.monuments" @click.prevent="navigateToDetails(monument,$event)" class="flex" :key="index">
						  <i class="ico-sprite ico-monument"></i>
						     <span v-html="convertTextToBold(monument.name)" class="red-color"></span>
						  </div>
						</div>
       					<div v-if="searchedParams.length > 2 && (autoCompleteResult.cities && autoCompleteResult.states && autoCompleteResult.monuments && autoCompleteResult.cities.length == 0 && autoCompleteResult.states.length == 0 && autoCompleteResult.monuments.length == 0)" class="no-result">
							<img src="../assets/not-found-yatra.png" class="img-nofound">
							<h2 class="resp-h2">No Result(s) Match for {{searchedParams}}</h2>
							<p class="resp-p">Please change the state and select any region !</p>
               			</div>
               			<div class="search-content" v-if="searchedParams.length <= 2">
               			<div class="cross" @click="closeReseult()">X</div>
						<ul class="d-iblock search-tabs">
							<li><a @click="activeTabs = 'north' " v-bind:class="{ active: activeTabs == 'north' , nonactive: activeTabs != 'north' }">NORTH</a></li>
							<li><a @click="activeTabs = 'east' " v-bind:class="{ active: activeTabs == 'east' , nonactive: activeTabs != 'east' }">EAST</a></li>
							<li><a @click="activeTabs = 'west' " v-bind:class="{ active: activeTabs == 'west' , nonactive: activeTabs != 'west' }">WEST</a></li>
							<li><a @click="activeTabs = 'south' " v-bind:class="{ active: activeTabs == 'south' , nonactive: activeTabs != 'south' }">SOUTH</a></li>
							<li><a @click="activeTabs = 'central' " v-bind:class="{ active: activeTabs == 'central' , nonactive: activeTabs != 'central' }">CENTRAL</a></li>
						</ul>
						<ul class="d-iblock search-img">
							<li v-for="(searchData,k) in listSearchData" @click="navigateToDetails(searchData)" style="cursor:pointer;">
								<img :src="searchData.imageUrl" style="cursor:pointer" class="img-resp" >
								<p>{{searchData.name}}</p>
							</li>
						</ul>
					</div>
        			</div>        			
        		</li>
        	</ul>
        	<div @click="menuModalOpen()" class="cart-count">
				<div class="cart-fixed">
						<span class="count"
					 		:isLoading="isLoading" 
					 		:disabled="isLoading"
					 		:status="status"
					 		v-if="cartLength >=	 0">
								{{cartLength}}
						</span>
						<span class="count count-error"
					 		v-if="cartLength == -1">
								!
						</span>
					<i class="ico-sprite ico-cart"></i>
					<span class="txt-cart">Travel Cart</span>
					<span class="pleasewait" v-if="pleasewaitLoader"></span>
				</div>
        	</div>
        </div>
        </div>
        <div class="" id="monument-list">
            <div class="list-nav">
               <div class="wrapper-width clearfix">
                <ul class="list-tab fl">
                    <li  @click="activeRegion = 'INDIA'" v-bind:class="{ active: activeRegion == 'INDIA' }" >ALL</li>
                    <li v-show="masterDataAJAX && Object.keys(masterDataAJAX).length>0" v-for="(region,index) in masterDataAJAX.regions" :key="index" @click.prevent="activeRegion = region" v-bind:class="{ active: activeRegion == region}">{{region}}</li>
                </ul>
                <div class="fr w40">
                          <div class="drop-down fl prel">
                             <select type="text" v-model="selectedState">
                                <option>Select State</option>
                                <option v-if="masterDataAJAX && Object.keys(masterDataAJAX).length>0" v-for="(state,index) in masterDataAJAX.states" :key="index">{{state}}</option>
                              </select>
                              <i class="ico-sprite ico-arr"></i>
                        </div>
                        <div class="drop-down fl prel" v-if="activeTab == 'ListView'">
                             <select type="text" v-model="selectedCountryType">
                                <option>Select Tourist Type</option>
                                <option v-if="masterDataAJAX && Object.keys(masterDataAJAX).length>0" v-for="(country,index) in masterDataAJAX.visitors" :key="index">
                                   {{index}}
                                </option>
                              </select>
                              <i class="ico-sprite ico-arr"></i>
                         </div>
                    <ul class="view-type fr">
                        <li v-bind:class="{ active: activeTab == 'ListView' }" @click="activeTab = 'ListView'">List View</li>
                        <li v-bind:class="{ active: activeTab == 'MapView' }" @click="activeTab = 'MapView'">Map View</li>
                    </ul>
                </div>
				</div>
            </div>
            <monument-gallery v-show="activeTab == 'ListView'" 
				v-if="monumentListData && Object.keys(monumentListData).length > 0" 
				:sendDeletedMonument="monumentDeleted" 
				@monumentListLength ="monumentListDataLength = $event"  
				:selectedCountryType="selectedCountryType" 
				:selectedState="selectedState" 
				:activeRegion="activeRegion" 
				:monumentListData="monumentListData.monumentsList" 
				@cartLengthCheck ="cartNum($event)" 
				@specificMonumentData = "cartSpecificMonumentData($event)">
			</monument-gallery>
            <monument-map v-if="activeTab == 'MapView' && monumentListData && Object.keys(monumentListData).length>0"  :monumentListData="monumentListData.monumentsList" :selectedCountryType="selectedCountryType"  :selectedState="selectedState" :activeRegion="activeRegion"></monument-map>
        </div>
        <loader-view v-if="showAjaxLoading"></loader-view>
       
     </div>
     <div id="footerHTML" v-cloak v-show="masterDataAJAX && Object.keys(masterDataAJAX).length>0 && monumentListData && Object.keys(monumentListData).length>0"></div>

     <transition name="slide-fade">
		<cart-block v-if="menuModal" 
			@closeMenuBar="menuModal=false" 
			:cartDataId = cartDataId
			@pleasewaitLoader ="pleasewaitLoader = $event"
			@deletedMonument="monumentDeleted = $event"
			@managingCount ="cartLength = $event"
			:selectedCountryType="selectedCountryType">
		</cart-block>
	 </transition>

   </div>
   
</template>
<script>
	import {
		eventBus
	} from '../util/eventBus'
	import VueButtonSpinner from 'vue-button-spinner';
	import {
		fetchMasterDataAPI,
		fetchMonumentListDataAPI,
		fetchAutoCompleteAPI,
		getFrescoHeader,
		getFrescoFooter,
		getCartItems
	} from '../api/api'
	import {
		adobeAnalyticsPageView,
		adobevirtualPageView
	} from '../helper/adobeAnalytic'
	import { BASE_URL, SSO_LOGIN_URL, USER_Profile_URL } from "../util/constants";
	export default {
		name: "monument_list",
		components: {
			MonumentListBanner: () =>
				import ('../components/monuments_list/monumentListBanner.vue'),
			MonumentGallery: () =>
				import ('../components/monuments_list/monumentGallery.vue'),
			MonumentMap: () =>
				import ('../components/monuments_list/monumentMap.vue'),
			LoaderView: () =>
				import ('../components/common/loader.vue'),
			CartBlock: () =>
				import ('../components/monuments_list/cartBlock.vue'),
			'button-spinner' : VueButtonSpinner
		},
		data() {
			return {
				stickyHeader: false,
				activeTab: 'ListView',
				masterDataAJAX: {},
				monumentListDataLength: 0,
				monumentListData: {},
				searchedParams: '',
				autoCompleteResult: {},
				showAjaxLoading: false,
				activeRegion: this.$route.query.searchType && this.$route.query.searchType.toUpperCase() == 'REGION' ? this.$route.query.searchSrc : this.$route.query.searchType && this.$route.query.searchType.toUpperCase() == 'STATE' || this.$route.query.searchType && this.$route.query.searchType.toUpperCase() == 'CITY' ? '' : 'INDIA',
				selectedCountryType: 'Select Tourist Type',
				isHeaderLoader: false,
				selectedState: this.$route.query.searchType && this.$route.query.searchType.toUpperCase() == 'STATE' ? this.$route.query.searchSrc : 'Select State',
				menuModal: false,
				cartLength: 0,
				activeState: false,
				cartRoute: [],
				cartDataId: [],
				cartMainData: [],
				monumentDeleted: '',
				isLoading: true,
				status: '',
				pleasewaitLoader: false,
				sResult: false,
				activeTabs:'north',
				listSearchData : [],
       			mostPopularTile : {
					north:[
						{'imageUrl' :'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/a9d3b5f77509094c7884c84b27e3535c.jpg','name':'Taj Mahal','place':'Agra','id':'ASI_c632aef9-5c4f-44a4-89cc-697ef17457d0'},
						{'imageUrl' :'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/2a78ba0aa94df9bdfd7c1adf60c775fe.jpg','name':'Qutub Minar','place':'Delhi','id':'ASI_e591210d-5bb7-4642-aba8-06d9ff895464'},
						{'imageUrl' :'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_detailslargeimg/v1514015046/Monuments/vaishali/5e99bf4e-6b77-4799-bc9c-2ab7d76a289a/1_cnZyIT.jpg','name':'Relic Stupa','place':'Vaishali','id':'ASI_5e99bf4e-6b77-4799-bc9c-2ab7d76a289a'},
						{'imageUrl' :'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014389/Monuments/lahaul-spiti/3c7ddc9f-f3a8-465f-bc1c-0e0ad3ce24ed/4_EKsk7m.jpg','name':'Buddhist Monastery','place':'Spiti','id':'ASI_3c7ddc9f-f3a8-465f-bc1c-0e0ad3ce24ed'},
						{'imageUrl' :'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014261/Monuments/agra/e8948564-0040-44a5-b364-83638d3017ea/4_QTWv7G.jpg','name':'Agra Fort','place':'Agra','id':'ASI_e8948564-0040-44a5-b364-83638d3017ea'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014482/Monuments/sivasagar/c7cff4f6-2c2d-47ff-b37e-96e8d3f40201/4_S4Ylem.jpg','name':'Devidol','place':'Sivasagar','id':'ASI_c7cff4f6-2c2d-47ff-b37e-96e8d3f40201'},
						{'imageUrl' :'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015015/Monuments/jhansi/b829fa2c-4f17-4a9c-8c0f-0cf97ad4b5d1/4_ScpyAm.jpg','name':'Rani Mahal','place':'Jhansi','id':'ASI_b829fa2c-4f17-4a9c-8c0f-0cf97ad4b5d1'}, 
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015029/Monuments/sawaimadhopur/f718b1d1-6ae1-4a67-9864-6d23e98533f2/4_pgPmWB.jpg','name':'Ranthambore Fort','place':'Ranthambore','id':'ASI_f718b1d1-6ae1-4a67-9864-6d23e98533f2'}
					],
					east:[
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015108/Monuments/bhojpur/f6dc7358-665a-476b-82a8-ece1616f9a83/4_1XwtnP.jpg','name':'Shiva Temple','place':'Bhopal','id':'ASI_f6dc7358-665a-476b-82a8-ece1616f9a83'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015242/Monuments/bhubaneswar/77a0d03a-38bf-451a-8e7b-a570fe32acbd/4_bLXkwA.jpg','name':'Udaygiri Caves','place':'Bhubaneshwar','id':'ASI_77a0d03a-38bf-451a-8e7b-a570fe32acbd'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015269/Monuments/bhagalpur/94aad72a-3182-4904-a761-5a8b14696d7b/4_ieOvhq.jpg','name':'Vikramshila Monastery','place':'Bhagalpur','id':'ASI_94aad72a-3182-4904-a761-5a8b14696d7b'},     
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014457/Monuments/bihar/f3f112f9-6e40-46fa-998d-03f3a6fb8e98/4_tCvepO.jpg','name':'Cooch Behar Palace','place':'Cooch','id':'ASI_f3f112f9-6e40-46fa-998d-03f3a6fb8e98'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015145/Monuments/puri/27c9a98d-0964-499c-a065-721a4aeffe10/4_jwxACa.jpg','name':'Sun Temple','place':'Konarak','id':'ASI_27c9a98d-0964-499c-a065-721a4aeffe10'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014625/Monuments/murshidabad/834f74fd-cf26-4d3d-babf-44cbf689990c/4_saY4ON.jpg','name':'Hazardauri Palace ','place':'Murshidabad','id':'ASI_834f74fd-cf26-4d3d-babf-44cbf689990c'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/0e3590fdb7f50c783f8dbc74b4cab13a.jpg','name':'Sher Shah Tomb ','place':'Bihar','id':'ASI_2a22ff56-ea36-4296-a830-4a5ff38de8b9'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/Jan/3be060b3bdb8d5ff3667679ca7582069.jpg','name':'Rajarani Temple ','place':'Bhubaneswar','id':'ASI_a432fb66-3268-40ff-94ec-7c4445c02514'}
					],
					south:[
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014990/Monuments/srirangapatna/06fa5bf9-76dc-4038-b70a-ae737a4bff24/4_X0J8vV.jpg','name':'Sri Ranganatha Swami Temple','place':'Srirangapatna','id':'ASI_06fa5bf9-76dc-4038-b70a-ae737a4bff24'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014939/Monuments/hassan/229b3b3b-6d1e-47d7-ad4b-52b12e082c2a/4_A5GDf5.jpg','name':'Parsvanatha Basadi','place':'Hassan','id':'ASI_229b3b3b-6d1e-47d7-ad4b-52b12e082c2a'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014806/Monuments/hassan/b84fef8e-e9b8-4791-a07d-62329b43374e/4_6vCDCY.jpg','name':'Kedaresvara Temple','place':'Halebidu','id':'ASI_b84fef8e-e9b8-4791-a07d-62329b43374e'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014576/Monuments/bijapur/73cb04cd-0ada-4967-816c-0764a7940966/4_hACs8c.jpg','name':'Gol Gumbaz','place':'Bijapur','id':'ASI_73cb04cd-0ada-4967-816c-0764a7940966'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014818/Monuments/belurhalebedu/a1dee11f-2e2c-48bb-ab1a-0890fcd8c8d6/4_lkrVck.jpg','name':'Keshava Temple','place':'Belur','id':'ASI_a1dee11f-2e2c-48bb-ab1a-0890fcd8c8d6'},     
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014952/Monuments/pattadakal/a4401532-d0e7-4fc8-8a83-a99bc09eb7d0/4_a01PKc.jpg','name':'Group of Monuments','place':'Pattadakal','id':'ASI_a4401532-d0e7-4fc8-8a83-a99bc09eb7d0'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/167ecd8ef6f9eb0a13d952aab77c780d.jpg','name':'Charminar','place':'Hyderabad','id':'ASI_9e934665-81f2-424b-b5a3-bcaffa8801e3'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/06780f3dfd8629f86b589aa8f0dc6dbe.jpg','name':'Golconda Fort','place':'Hyderabad','id':'ASI_b7d969f2-dbe4-485e-93da-0662395abd15'}
					],
					west:[
						{'imageUrl' : 'https://imgcld.yatra.com/dpv7guyco/image/upload/t_monuments_srplist/v1512395250/Monuments/chikhaldara/ASI_e5900466-645f-49a8-81bb-48ff84490364/4_HfiE0b.jpg','name':'Gawligarh Fort','place':'Chikhaldara','id':'ASI_e5900466-645f-49a8-81bb-48ff84490364'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014431/Monuments/pavagadh/bf1bb545-439c-4d7a-89c5-aba0df5d8d5a/4_JHZP1E.jpg','name':'Ellora Caves','place':'Aurangabad','id':'ASI_f490c5ac-a163-4143-9046-2c50014d231e'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514014508/Monuments/aurangabad/f490c5ac-a163-4143-9046-2c50014d231e/4_66WAt7.jpg','name':'Champaner Archaelogical Park','place':'Gujarat','id':'ASI_bf1bb545-439c-4d7a-89c5-aba0df5d8d5a'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/bfc4de21cbd8263202c1737e3523dcda.jpg','name':'Aurangabad Caves','place':'Aurangabad','id':'ASI_073b7704-83d6-4529-ae92-68b9556a2795'},
						{'imageUrl' : 'https://imgcld.yatra.com/dpv7guyco/image/upload/t_monuments_srplist/v1512394689/Monuments/aurangabad/ASI_225ad77a-081f-4c16-b255-c1981407dad0/4_ScIa05.jpg','name':'Ajanta Caves','place':'Aurangabad','id':'ASI_225ad77a-081f-4c16-b255-c1981407dad0'},
						{'imageUrl' : 'https://imgcld.yatra.com/ytimages/image/upload/t_monuments_srplist/v1514015161/Monuments/modhera/7b94823b-cf61-4730-97f4-4d742cc690ec/4_DJAIIl.jpg','name':'Rani Ki Vav','place':'Ahmedabad','id':'ASI_deb1135d-375c-4066-8564-107818ae2770'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/3d1eee20e4097198f5296adacde4079e.jpg','name':'Elephanta Caves','place':'Maharashtra','id':'ASI_ea4ffd79-98cd-4333-9f02-c96bfce8dc16'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/631d8ec0aa94f23e86910e0578ed874e.jpg','name':'Aga Khan Palace','place':'Pune','id':'ASI_7464165b-9274-4d23-b7e3-deabbcf42aca'}
					],
					central:[
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/48f4485c5319fe1f9282a5c8f483160b.jpg','name':'Udaigiri Caves','place':'Vidisha','id':'ASI_a1b16620-d965-4491-ab2d-23b000ac751a'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/e2798562a98a82d2fed717f44c88ddda.jpg','name':'Hoshang Shah Tomb','place':'Dhar','id':'ASI_74946ddc-22ef-4a77-a504-41ecc34f5721'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/cd8cad0463bd86c28902fdfb8d34b05c.jpg','name':'Jhansi Fort','place':'Jhansi','id':'ASI_f9d9c50e-bdc7-47a9-862e-c833cd108943'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/812f413de1f070fc32bd040a667f3dec.jpg','name':'Sanchi Buddhist Monuments','place':'Sanchi','id':'ASI_45a39b8f-15fb-4112-a614-a0b4b16c3528'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/Jan/7a14a70983c1be9a4bd10b470a25c2f5.jpg','name':'Khajuraho Monuments','place':'Chhatarpur','id':'ASI_34ae41ef-15e1-4e98-9fea-e67bf6d9a8a6'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/May/e4679a47284f6383622fa1734dc62ecd.jpg','name':'Roopmati Pavilion','place':'Dhar','id':'ASI_29070b5a-1af9-4244-bce5-6ddf61c97cfc'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/Jan/be31dc86fb75d3bb5990a6b5626806c8.jpg','name':'Laxman Temple','place':'Mahasamund','id':'ASI_ac7d414c-71b0-4329-9bb8-d5ddb46adf25'},
						{'imageUrl' : 'https://www.yatra.com/ythomepagecms/media/asi_monument/2018/Jan/f7a86343d6aa247ac53341988111930d.jpg','name':'Gwalior Fort','place':'Gwalior','id':'ASI_e368f7e1-9dc9-4d7b-911f-6c96d3ff270c'}
					]   
				} 
			}
		},
		mounted() {
			let self = this
            let qData = this.$route.query.qUpdate
            if(qData == 'UpdateTravel') {
				this.menuModalOpen()
				//localStorage.setItem('updateDate','')
            }
			window.addEventListener('scroll', this.handleScroll)

			this.showAjaxLoading = true
			document.title = "Yatra | Monuments of India"
			window.addEventListener('keyup', function(event) {
				if (event.keyCode == 27) {
					self.searchedParams = ''
					self.autoCompleteResult = {}
				}
			});

			window.addEventListener('click', function(event) {
				self.searchedParams = ''
				self.autoCompleteResult = {}
			});

			getFrescoHeader().then(response => {
				$("#headerHTML").append(response.data)
				if (response.data && Object.keys(response.data).length > 0) {
					self.getMasterData()
					self.getSRPListData()
				}
			}, response => {
				self.getMasterData()
				self.getSRPListData()
			})
			getFrescoFooter().then(response => {
				$("#footerHTML").append(response.data)
				setTimeout(function() {
					$('#footerHTML').css('display', 'block')
				}, 300)
			}, response => {})
		},
		methods: {
			pageRefresh() {				
				if(localStorage) {
					localStorage.clear()
				}
				window.location.reload()
			},		
			handleScroll(event) {
				if (this.$refs.cartBlock && (document.documentElement.scrollTop > this.$refs.cartBlock.clientHeight)) {
					this.stickyHeader = true
				} else {
					this.stickyHeader = false
				}
			},
			cartNum(length) {
				this.cartLength = length
				this.monumentDeleted = ''
				this.isLoading = false
				// open cart when 1 monument is added
				if(localStorage.getItem('firstCart')==undefined && length==1){
                   this.menuModalOpen()
                   localStorage.setItem('firstCart','first')
               }

			},
			cartSpecificMonumentData(data) {
				this.cartMainData.push(data.timings)
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
			menuModalOpen() {
				//localStorage.setItem("isLoggedIn", true)
				this.pleasewaitLoader = true
				let loggedInStatus = localStorage.getItem("isLoggedIn")
				if(loggedInStatus && loggedInStatus != undefined && loggedInStatus != 'undefined') {
					this.retrievingCartItems()
				}
				else
					this.secureLogin()
			},
			retrievingCartItems() {
				//console.log('yo yo get')
				var self = this
				var cartId = localStorage.getItem("cartId")
				if(cartId && cartId != 'undefined') {
					getCartItems(cartId).then(response => {
						self.cartDataId = response.data.itemList
						self.menuModal = true
					}).catch(function(error){
						console.log("Get cart items API not responding")
					})
				}
				else {
					self.pleasewaitLoader = false
					self.cartDataId = []
				}	
			},
			getMasterData() {
				let self = this
				fetchMasterDataAPI().then(response => {
					self.masterDataAJAX = response.data.data
				}, response => {
					self.masterDataAJAX = {}
				})
			},
			getSRPListData() {
				let self = this
				fetchMonumentListDataAPI().then(response => {
					let srpData = response.data.data
					setTimeout(function() {
						self.monumentListData = srpData
						self.showAjaxLoading = false
						var initial_url = window.location.href;
						var url = initial_url.split('?');
						var n = url[1]
						if (n) {
							if (self.$route.query.searchType == 'STATE') {
								var regType = 'yt:monument:dom:srp:' + self.$route.query.searchSrc
								adobeAnalyticsPageView(regType, "monuments", "web", "business", "monument srp", "domestic monument", self.$route.query.searchSrc, "", "")
							} else if (self.$route.query.searchType == 'REGION') {
								var regType = 'yt:monument:dom:srp:' + self.$route.query.searchSrc
								adobeAnalyticsPageView(regType, "monuments", "web","business", "monument srp", "domestic monument", self.$route.query.searchSrc, "", "")
							} else if (self.$route.query.searchType == 'CITY') {
								var regType = 'yt:monument:dom:srp:' + self.$route.query.searchSrc
								adobeAnalyticsPageView(regType, "monuments", "web","business", "monument srp", "domestic monument", self.$route.query.searchSrc, "", "")
							}
						} else {
							adobeAnalyticsPageView("yt:monument:dom:srp:all", "monuments", "web","business", "monument srp", "domestic monument", "all")
						}
					}, 500);

				}, response => {
					self.showAjaxLoading = false
					self.monumentListData = {}
				})
			},
			resultDisplay() {
				if (this.monumentListDataLength <= 1) {
					return `Showing ${this.monumentListDataLength} monument for  ` + `<br><span style="text-transform:capitalize">${this.$route.query.searchSrc ? this.$route.query.searchSrc.toLowerCase() : 'INDIA'}</span>`
				} else if (this.monumentListDataLength > 1) {
					return `Showing ${this.monumentListDataLength} monuments for  ` + `<br><span style="text-transform:capitalize">${this.$route.query.searchSrc ? this.$route.query.searchSrc.toLowerCase() : 'INDIA'}</span>`
				}
			},
			autoCompleteAPI() {
				let self = this
				if (this.searchedParams.length > 2) {
					fetchAutoCompleteAPI(this.searchedParams).then(response => {
						if (response.data.responseInfo.code != 400) {
							self.autoCompleteResult = response.data.data
						} else {
							self.autoCompleteResult = {}
						}
					}, response => {
						self.autoCompleteResult = {}
					});
				} else {
					this.autoCompleteResult = {}
				}
			},
			navigateToDetails(monument, e) {
				window.open(`/monuments/details?monumentID=${monument.id}`, '_self')
				e.preventDefault();
				e.stopPropagation();
			},
			navigateToList(type, option, e) {
				let navigateURL = option.id ? `/monuments/list?searchType=${type.toUpperCase()}&searchSrc=${option.name}` : `/monuments/list?searchType=${type.toUpperCase()}&searchSrc=${option.name}`
				var stateType = 'yt:monument:dom:srp:' + option.name
				var state = option.name
				adobeAnalyticsPageView(stateType, "monuments","web", "business", "monument srp", "domestic monument", state, "", "")
				window.open(navigateURL, '_self')
				e.preventDefault()
				e.stopPropagation()
			},
			closeAutoSearchModal() {
				eventBus.closeAutoSearchModal(false)
			},
			getCountryGroup(index) {
				return Object.keys(this.masterDataAJAX.visitors)[index]
			},
			convertTextToBold(text) {
				var t = new RegExp(this.searchedParams)
				return text.toLowerCase().replace(t, "<span style='color:#ea2330'>" + this.searchedParams + '</span>')
			},
			hideInput(){
				this.sResult = true
			},
			closeReseult(){
				this.sResult = false
			}
		},
		watch: {
			selectedState() {
				if (this.selectedState != 'Select State') {
					this.$router.push({
						name: 'MonumentList',
						query: {
							searchType: 'STATE',
							searchSrc: this.selectedState,
							navigateFrom: 'YATRA'
						}
					})
					this.activeRegion = ''
					var stateType = 'yt:monument:dom:srp:' + this.selectedState
					var stateName = this.selectedState
					setTimeout(function() {
						adobevirtualPageView(stateType, "monuments", "web","business", "monument srp", "domestic monument", stateName, "", "")
					}, 300)
					return false
				} else {
					this.$router.push({
						name: 'MonumentList',
						query: {
							searchType: 'REGION',
							searchSrc: this.activeRegion,
							navigateFrom: 'YATRA'
						}
					})
					this.activeRegion = this.activeRegion != '' ? this.activeRegion : 'INDIA'
					return false
				}
			},
			activeRegion() {
				if (this.activeRegion != '') {
					this.selectedState = 'Select State'
					this.$router.push({
						name: 'MonumentList',
						query: {
							searchType: 'REGION',
							searchSrc: this.activeRegion,
							navigateFrom: 'YATRA'
						}
					})
					var regType = 'yt:monument:dom:srp:' + this.activeRegion
					var regName = this.activeRegion
					setTimeout(function() {
						adobevirtualPageView(regType, "monuments", "web", "business", "monument srp", "domestic monument", regName, "", "")
					}, 300)
					return false
				}
			},
			activeTab() {
				this.selectedState = 'Select State'
				this.activeRegion = 'INDIA'
			},
			managing_count(evt) {
				this.cartLength = evt
			},
			activeTabs(){
				console.log(this.activeTabs)
				this.listSearchData = this.mostPopularTile[this.activeTabs]
				
			}
		},
		created(){
			this.listSearchData = this.mostPopularTile.north
		}
	}
</script>

<style scoped lang="scss">
	.ellipsis {
		width: 96%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.monument_list {
		background-color: #fafafa;
		padding-bottom: 40px;
	}

	.list-nav {
		display: block;
		box-shadow: 0 8px 8px -5px rgba(0, 0, 0, 0.3);
		padding: 20px 0 0;
		background: #fff;
		.list-tab {
			line-height: 42px;
			li {
				display: inline-block;
				margin-right: 25px;
				color: #777;
				cursor: pointer;
				height: 60px;
				font-size: 14px;
				&.active {
					border-bottom: 2px solid #ea2330;
					color: #ea2330;
				}
			}
		}
		input,
		.drop-down {
			border-radius: 5px;
			border: 1px solid #eee;
			height: 40px;
			width: 30%;
			margin-left: 15px;
			font-size: 0.750em;
			background: #fff;
			color: #777;
		}
		.drop-down {
			select {
				padding: 14px;
				width: 98%;
				outline: none;
				text-transform: uppercase;
				left: 12px;
				position: relative;
				z-index: 1;
				&:hover {
					cursor: pointer;
				}
				.ico-arr {
					z-index: 0;
				}
			}
		}
		.view-type {
			margin-top: 0;
		}
		.w40 {
			width: 55%;
		}
	}

	.asi-modify-search {
		clear: both;
		background: #e2e2e2;
		width: 100%;
		height: auto;
		padding: 10px 0;
		display: inline-block;
		position: relative;
		.modify-form {
			text-align: center;
			>li {
				display: inline-block;
				vertical-align: top;
				&:last-child {
					vertical-align: middle;
					line-height: 46px;
					color: #fff;
					width: 74%;
					>div {
						display: inline-block;
						vertical-align: top;
						margin-left: 20px;
						width: 77%;
						float: left;
						input {
							border: 1px solid #ccc;
							color: #333;
							width: 100%;
							border-right: none;
							padding-left: 20px;
							float: left;
							background: #fff;

						}
					}
				}
				.btn-modify {
					border: 1px solid #ccc;
					padding: 0 15px;
					font-size: 14px;
					cursor: pointer;
					color: #333;
					background: #fff;
					border-left: none;
					border-radius: 0 3px 3px 0;
					align-items: center;
					justify-content: center;
					display: flex;
					height: 48px;
					float: left;
					position: absolute;
					right: 0;
				}
			}
			input::placeholder {
				color: #fff;
			}
			.result-list {
				color: #000;
				text-align: left;
				width: 100%;
				z-index: 9;
				background: #fff;
				position: absolute;
				box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
				text-transform: capitalize;
				top: 46px;
				.flex {
					border-bottom: 1px solid #e0e0e0;
					width: 100%;
					cursor: pointer;
					span {
						b {
							color: #ea2330;
						}
					}
					&:hover {
						background: #f5f5f5;
					}
				}
				div {
					display: flex;
					align-items: center;
					padding: 0px 10px;
					span {
						white-space: nowrap;
						overflow: hidden;
						-o-text-overflow: ellipsis;
						text-overflow: ellipsis;
						display: inline-block;
						width: 94%;
						margin-left: 10px;
					}
				}
			}
			.result-list div span b {
				color: #ea2330;
			}
			.c-f {
				text-align: left;
				color: #333;
				margin-top: 4px;
			}
			.no-result {
				position: absolute;
				background: #fff;
				z-index: 9;
				width: 100%;
				color: #000;
				box-shadow: 0 0 8px #666;
				top: 45px;
			}
		}
	}

	.img-nofound {
		width: 50%;
		margin: 5% 0 0;
	}
	.asi-modify-search .modify-form .result-list div span b {
		color: #ea2330;
	}

	.result-list {
		b {
			color: #ea2330 !important;
		}
	}

	.fixedCart {
		background: #fff;
		border-radius: 50%;
		height: 90px;
		width: 90px;
		position: fixed;
		box-shadow: 0 8px 8px -5px rgba(0, 0, 0, 0.3);
		z-index: 99;
		.cart-fixed {
			position: relative;
			top: 30px;
			right: -9px;
		}
	}

	.cart-fixed button {
		background: transparent;
		color: #ea2330;
		border: none;
	}
	.txt-cart {
		float: right;
		font-size: 16px;
		color: #000;
		position: relative;
		top: 20px;
		font-weight: bold;
		left: -8px;
	}
	.sticky {
		position: fixed;
		width: 100%;
		z-index: 99;
		box-shadow: 0 8px 8px -5px rgba(0, 0, 0, 0.3);
		top: 0;
	}
	.count {
		    position: relative;
		right: -19px;
		top: -8px;
		background-color: #ea2330;
		border-radius: 50%;
		color: #fff;
		width: 20px;
		height: 20px;
		text-align: center;
		display: inline-block;
		font-size: 14px;
	}
	.count-error {
		color: orangered;
		background-color: white
	}
	.tpos {
		top: 0;
		left: 0;
		background: #fff;
		z-index: 10;
		-webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
    	box-shadow: 0 5px 15px rgba(0,0,0,.5);
	}
	.search-tabs {
		li {
			display: inline-block;
			margin-right: 30px;
			margin-bottom: 20px;
			a {
				color: #666;
				cursor: pointer;
				&.active {
					border-bottom: 1px solid #ea2330;
					padding-bottom: 2px;
					color: #ea2330;
				}
			}
		}
	}
	.search-img {
		    vertical-align: top;
			width: 98%;
			text-align: left;
			padding: 0 2%;
		li {
			display: inline-block;
			margin-right: 14px;
			margin-bottom: 14px;
			position: relative;
			width: 31.7%;
			&:nth-child(3n){
				margin-right: 0;
			}
			img{
				min-height: 120px;
				max-height: 120px;
			}
			p {
				position: absolute;
				bottom: 17px;
				left: 0;
				color: #fff;
				margin: 0;
				background: rgba(0, 0, 0, 0.4);
				width: 100%;
				text-align: left;
				font-size: 16px;
				padding: 5px 4px;
				white-space: nowrap;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				overflow: hidden;
				line-height: 20px;
			}
		}
	}  
	.cross {
		position: absolute;
		top: 0px;
		right: 16px;
		font-size: 20px;
		color: #666;
		cursor: pointer;
	}
	.search-content {
		clear: both;
		padding-top: 20px;
		position: relative;
	}
	@media only screen and (min-width:769px)and (max-width: 1024px) {
		.asi-modify-search {
			.modify-form {
				>li {
					&:last-child {
						width: 62%;
					}
				}
			}
		}
	}

	@media only screen and (max-width: 768px) {
		.asi-modify-search {
			padding: 12px;
			.modify-form {
				>li {
					&:last-child {
						width: 100%;
						margin-left: 0 !important;
						margin-top: 20px;
						>div {
							margin-left: 0;
							float: left;
							width: 100%;
						}
						input {
							padding-left: 10px;
						}
						button {
							padding: 0 5px;
						}
					}
				}
			}
		}
	}

	@media only screen and (max-width: 640px) {
		.asi-modify-search {
			padding: 12px;
			.modify-form {
				>li {
					&:last-child {
						input {
							padding-left: 4% !important;
						}
						button {
							padding: 0 5px;
							font-size: 13px;
							float: left;
						}
					}
				}
			}
			.resp-h2 {
				font-size: 18px;
				padding: 0 5px;
			}
			.resp-p {
				font-size: 16px;
				line-height: 20px;
				padding: 0 5px;
			}
			.c-f {
				margin-top: 0 !important;
			}
			.resp-logo {
				zoom: .80;
			}
		}
	}
	.pleasewait {
		height: 30px;
		width: 30px;
		display: inline-block;
		background: url("../assets/pwait.gif") no-repeat center;
		position: absolute;
    	top: 3px;
    	left: 55px;
	}
</style>
