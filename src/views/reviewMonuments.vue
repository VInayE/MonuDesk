<template>
  <div ref="secureSignIn">
	<div id ="headerHTML" style="display:none"></div>
	<div class="yatra-asi-review ">
	<div class="review-details wrapper-width clearfix rel">		 
	<section class="fl left-sec">
		<h2 class="review-head">
			Review Your Booking
			<i class="ico-review"></i>
		</h2>
		<p v-if="updateDate" class="change">
			<a class="color-blue under-link" @click="navigateToSrp()"> Update Travel Cart </a>
		</p>
		<ul class="module review" v-if="reviewData && Object.keys(reviewData).length > 0" v-for="item in reviewData">
			<li class="">
			  <div class="fl pos-rel">
				  	<div class="img-rep" v-bind:style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"></div>
					<div class="calender-date fl pos-abs" v-if="item && item.visitDate">
						<div class="blue-bg">
							<p class="month">{{getMonthName(item.visitDate)}}</p>
							<p class="date">{{getDate(item.visitDate)}}</p>
						</div>
						<div class="day">{{getDayName(item.visitDate)}}</div>
					</div>
			  </div>
			  <div class="pay-detail fl">
					<div class="">
						<p class="f-bold" v-html="convertIntoHTML(item.title)"></p>
						<p class="f-small" v-html="convertIntoHTML(item.cityName + '(India)')"></p>
					</div>
					<div class="pay-footer mt10" v-if="updateDate">
						<p>
							<a class="color-blue under-link" @click="navigateToSrp()">
								Update Travel Date
							</a>
						</p>
					</div>
					<div class="pay-footer mt10" v-if="totalAdultCount > 0 || totalChildCount > 0 ">
						<span v-if="totalAdultCount > 0 || totalChildCount > 0 ">
							Travellers
						</span>
						<span v-if="totalAdultCount > 0 || totalChildCount > 0 ">
							{{totalAdultCount > 1 ?'Adults':'Adult'}} : {{totalAdultCount}} 
							<span>
								{{totalChildCount > 1 ? 'Children' : 'Child' }} : {{totalChildCount}}
							</span>
						</span>
					</div>
                    <div class="time-slot"
					 	v-if=" item.timeSlot &&  Object.keys(item.timeSlot).length > 0 ">
						<p class="t-slot">Time Slot</p>
						<p style="font-size:14px">
							{{item.timeSlot.startTime}} - {{item.timeSlot.endTime}}
						</p>
					</div>
			  </div>
			</li>
		</ul>

        <div class="success-msg hide-opacity" v-if="isLoggedIn && (userName != '' || userEmail != '')">
			<p>
				<img src="../assets/tick-icon.png">
				<span 
					class="suc-text" 
					v-if="userName != '' && userName != null && userName != 'undefined'">
					You are currently logged in as {{userName}}
				</span>
				<span 
					class="suc-text" 
					v-if="(userName == '' || userName == null || userName == 'undefined') && userEmail != '' && userEmail != null && userEmail != 'undefined'">
					You are currently logged in as {{userEmail}}
				</span>
			</p>
		</div>
		 <p v-if="errorMessg" style="color: red">{{errorData}}</p> 
		<h2>
			<span class="review-head">Enter Traveller Details
				<i class="ico-traveller"></i>
			</span>
			 <span class="pipe" v-if="showHideSignIn">|</span>
			<span class="sign-text" v-if="showHideSignIn">
				<a class="under-link color-blue" href="javascript:void(0)" @click='showLoginClick()' >Sign In</a>
			    <span class="book-fast">to book faster</span>
		    </span> 
		</h2>

		 <div class="sign-in rel" v-bind:class="{hideDiv: isHideShow , showDiv: showLoginPannel}">
			<span class="close-icon" @click="hideLogin()">x</span>
            <span class="label" v-if= "showLoginPannel">Sign In Now</span>
			
            <span class="w25 prel">
                <input type="email" placeholder="Email Id" v-model="emailId" v-on:keypress="restrictSpecialChar">
                 <div class="error-message" v-if="submittedFormStatus && emailId == '' || forgotPwdStatus">Please Enter Email ID</div>
				 <div class="error-message" v-if="submittedFormStatus && emailId != '' && ! /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailId)">Please Enter Correct Email ID</div>
            </span>
           
            <span class="w25 prel"><input type="Password" placeholder="Password" v-model="password" required>
            <div class="error-message" v-if="submittedFormStatus">Please Enter Password</div>
				<div @click="forgotPassword()" class="forgot">Forgot?</div>
            </span>
           
            <span class="button"><button @click="submitLogin()" class="btn-blue m-pay">Login</button></span>
            <span class="vs-or"><span class="innr-or">OR</span></span>
			<span class="fb-logn" @click="FB_Login()">f</span>
			<div v-if="errorMessg" class="fb-login-error">{{errorData}}</div>
			<span v-if="showError" class="errorTxt">{{errorText}}</span>
            <div class="loading-html" v-if="showLoading">
               <p class="loading">Logging you in</p>
			</div>    
		</div> 

		<ul class="module travel-form">
			<li class="prel">
				<div class="first-div"><span class="lh32 text-right">Contact Details</span></div>               
				<div>
                    <span class="w30 prel">
                       <input type="email" v-model = "userEmail" placeholder="Email Id">
                        <div class="error-message" v-if="makePaymentCondition && userEmail == ''">Please Enter Email ID</div>
                        <div class="error-message" v-if="makePaymentCondition && userEmail != '' && ! /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(userEmail)">Please Enter Correct Email ID</div>
                    </span>
                      <span class="w60 prel">
						<div class="isd">
						  <select  v-model="userISD" class="sel-isd">
						     <option v-for="(isd,index) in telephoneCodeDetails" :key="index">+{{isd.countryCode}}</option>
					      </select>
					      <i data-v-cdebb716="" class="ico-sprite ico-arr"></i>
					    </div>
                        <input type="text" v-model = "userMobile" placeholder="Mobile Number" class="number" @input="validateTelephone($event)" :minlength="userISD == '+91'?0:3" :maxlength="userISD == '+91'? 10:16">
                           <div class="error-message" v-if="makePaymentCondition && userMobile == ''">Please Enter Mobile No</div>
                           <div class="error-message" v-if="userISD == '+91' && makePaymentCondition && userMobile && userMobile != '' && userMobile.length != 10">Please Enter Correct Mobile No</div>
						   <div class="error-message" v-if="userISD != '+91' && makePaymentCondition && userMobile && userMobile != '' && userMobile.length <3 && userMobile.length > 16">Please Enter Correct Mobile No</div>
                    </span>
				</div>
				<div class="email-sent">
				<p class="text-msg">Your booking details will be sent to this email address and mobile number.</p>
				<!-- whtsapp consent block -->
				<p class="watsup" v-if="isLoggedIn">
					<!-- <span v-if='whtsappConsent == "true"'>
						<input id='one' type="checkbox" :checked="whtsapp" disabled>
						<label for="one" style="display: none">whtsapp</label>
						<span v-if='userMobile != ""' class=''>We'll share your booking on Whatsapp with {{userMobile}}.</span>
						<span v-if='!userMobile || userMobile == ""' class=''>We'll share your booking on registered number.</span>
					</span> -->
					<span v-if='whtsappConsent == null && userEmail != ""'>
						<input id='one' type="checkbox" v-model='whtsappAskConsent' @change="takeWhtsappConsent">
						<label style="display: none" for="one">ask for whtsapp consent</label>
						<span v-if='userMobile' class=''>We'll share your booking on Whatsapp with {{userMobile}}.</span>
						<span v-if='!userMobile' class=''>We'll share your booking on registered number.</span>
					</span>
					<span v-if='whtsappConsent == "false" && userEmail != ""'>
						<input id='one' type="checkbox" v-model='whtsappAskConsent' @change="takeWhtsappConsent">
						<label style="display: none" for="one">ask for whtsapp consent</label>
						<span v-if='userMobile' class=''>We'll share your booking on Whatsapp with {{userMobile}}.</span>
						<span v-if='!userMobile' class=''>We'll share your booking on registered number.</span>
					</span>
					<span v-if='!(whtsappConsent == "true")'><i class="ico-watsup"></i></span>
				</p>
				</div>
			</li>
			<li v-for="(reviewPax,index) in savedPaxInfo" v-bind:class="{ fadein: fadein }" :key='index'>
				<div class="first-div"><span class="lh32 text-right">Visitor {{index+1}}</span></div>
				<div>
				<span class="prel adult w35">
					<select  v-model="reviewPax.gender" :disabled="reviewPax.isEditable">
						<option disabled>Title</option>
						<option v-for="(genderGroup,index) in gender" :key='index'>
							{{genderGroup}}
						</option>
					</select>
					<i class="ico-sprite ico-arr"></i>
					<input v-model="reviewPax.name" type="text" placeholder="Visitor Name" :disabled="reviewPax.isEditable">
					<div class="error-message pabs" v-if="reviewPax.gender == 'Title' && reviewPax.name == '' ">Please Enter Title & Visitor Name</div>
					<div class="error-message pabs" v-if="reviewPax.gender != 'Title' && reviewPax.name == '' ">Please Enter Visitor Name</div>
					<div class="error-message pabs" v-if="reviewPax.gender == 'Title' && reviewPax.name != '' ">Please Enter Title</div>
				</span>
				<span class="w35 prel">
					<select v-model="reviewPax.age" :disabled="reviewPax.isEditable">
								<option disabled>Age</option>
								<option value="1">01</option>
								<option value="2">02</option>
								<option value="3">03</option>
								<option value="4">04</option>
								<option value="5">05</option>
								<option value="6">06</option>
								<option value="7">07</option>
								<option value="8">08</option>
								<option value="9">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
								<option value="32">32</option>
								<option value="33">33</option>
								<option value="34">34</option>
								<option value="35">35</option>
								<option value="36">36</option>
								<option value="37">37</option>
								<option value="38">38</option>
								<option value="39">39</option>
								<option value="40">40</option>
								<option value="41">41</option>
								<option value="42">42</option>
								<option value="43">43</option>
								<option value="44">44</option>
								<option value="45">45</option>
								<option value="46">46</option>
								<option value="47">47</option>
								<option value="48">48</option>
								<option value="49">49</option>
								<option value="50">50</option>
								<option value="51">51</option>
								<option value="52">52</option>
								<option value="53">53</option>
								<option value="54">54</option>
								<option value="55">55</option>
								<option value="56">56</option>
								<option value="57">57</option>
								<option value="58">58</option>
								<option value="59">59</option>
								<option value="60">60</option>
								<option value="61">61</option>
								<option value="62">62</option>
								<option value="63">63</option>
								<option value="64">64</option>
								<option value="65">65</option>
								<option value="66">66</option>
								<option value="67">67</option>
								<option value="68">68</option>
								<option value="69">69</option>
								<option value="70">70</option>
								<option value="71">71</option>
								<option value="72">72</option>
								<option value="73">73</option>
								<option value="74">74</option>
								<option value="75">75</option>
								<option value="76">76</option>
								<option value="77">77</option>
								<option value="78">78</option>
								<option value="79">79</option>
								<option value="80">80</option>
								<option value="81">81</option>
								<option value="82">82</option>
								<option value="83">83</option>
								<option value="84">84</option>
								<option value="85">85</option>
								<option value="86">86</option>
								<option value="87">87</option>
								<option value="88">88</option>
								<option value="89">89</option>
								<option value="90">90</option>
								<option value="91">91</option>
								<option value="92">92</option>
								<option value="93">93</option>
								<option value="94">94</option>
								<option value="95">95</option>
								<option value="96">96</option>
								<option value="97">97</option>
								<option value="98">98</option>
								<option value="99">99</option>
								<option value="100">100</option>
					</select>
					<i class="ico-sprite ico-arr"></i>
				</span>
				<span class="prel w35 mt20">
					<select v-model="reviewPax.countryGroup" v-on:change="onEditTravellerChange(index)" :disabled="reviewPax.isEditable">
						<option disabled>Country Group</option>
						<option v-for="(countryGroup,index) in masterDataAJAX.visitors" :key="index">{{index}}</option>
					</select>
				</span>
				<span class="w35 mt20 prel">
					<select v-model="reviewPax.countryName" v-if="reviewPax.countryName != 'Country Group'" :disabled="reviewPax.isEditable">
						<option disabled>Country</option>
						<option v-for="(country,index) in masterDataAJAX.visitors[reviewPax.countryGroup]">{{country.countryName}}</option>
					</select>
					<i class="ico-sprite ico-arr"></i>
				</span>
				<span class="w35 mt20 prel"  v-if="reviewPax.identityType != '' || !reviewPax.isEditable">
				   	<select v-model="reviewPax.identityType" :disabled = "reviewPax.isEditable">
						<option>Identity Type</option>
						<option>ADHAAR</option>
						<option>PASSPORT</option>
						<option>DRIVING LICENSE</option>
					</select>
					<i class="ico-sprite ico-arr"></i>
				</span>
				<span class="w35 mt20"  v-if="reviewPax.identityType !='' || !reviewPax.isEditable">
				  <input  v-model="reviewPax.identityNumber" :disabled ="reviewPax.isEditable || reviewPax.identityType == 'Identity Type'" type="text" placeholder="Identity Number">
				</span>
			</div>
				
		  <p @click="editTravelers(index)" v-if="reviewPax.isEditable" class="edit-btn">Edit</p>
		  <p @click="saveTravelers(index) " v-if="!reviewPax.isEditable" class="edit-btn">Save</p>
		  <p @click="deleteTravelers(index)" class="edit-btn">Delete</p>
		</li>
			<li class="adult-details">
				<div class="first-div"><span class="lh32 text-right">Add Traveller</span></div>
				<div>
				<span class="prel visitor-name">
					<div class="pos">
						<select  v-model="paxInfoData.gender">
							<option>Title</option>
							<option v-for="(genderGroup,index) in gender">{{genderGroup}}.</option>
						</select>
						<i class="ico-sprite ico-arr pos-absl"></i>
					</div>
					<input v-model="paxInfoData.name" type="text" placeholder="Visitor Name" class="name-input">
     				<div class="error-message pabs" v-if="submitted && paxInfoData.gender == 'Title' && paxInfoData.name == '' ">Please Enter Title & Visitor Name</div>
					<div class="error-message pabs" v-if="submitted && paxInfoData.gender != 'Title' && paxInfoData.name == '' ">Please Enter Visitor Name</div>
					<div class="error-message pabs" v-if="submitted && paxInfoData.gender == 'Title' && paxInfoData.name != '' ">Please Enter Title</div>
				</span>
				<span class="w35 prel">
					<select v-model="paxInfoData.age">
								<option disabled>Age</option>
								<option value="1">01</option>
								<option value="2">02</option>
								<option value="3">03</option>
								<option value="4">04</option>
								<option value="5">05</option>
								<option value="6">06</option>
								<option value="7">07</option>
								<option value="8">08</option>
								<option value="9">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
								<option value="32">32</option>
								<option value="33">33</option>
								<option value="34">34</option>
								<option value="35">35</option>
								<option value="36">36</option>
								<option value="37">37</option>
								<option value="38">38</option>
								<option value="39">39</option>
								<option value="40">40</option>
								<option value="41">41</option>
								<option value="42">42</option>
								<option value="43">43</option>
								<option value="44">44</option>
								<option value="45">45</option>
								<option value="46">46</option>
								<option value="47">47</option>
								<option value="48">48</option>
								<option value="49">49</option>
								<option value="50">50</option>
								<option value="51">51</option>
								<option value="52">52</option>
								<option value="53">53</option>
								<option value="54">54</option>
								<option value="55">55</option>
								<option value="56">56</option>
								<option value="57">57</option>
								<option value="58">58</option>
								<option value="59">59</option>
								<option value="60">60</option>
								<option value="61">61</option>
								<option value="62">62</option>
								<option value="63">63</option>
								<option value="64">64</option>
								<option value="65">65</option>
								<option value="66">66</option>
								<option value="67">67</option>
								<option value="68">68</option>
								<option value="69">69</option>
								<option value="70">70</option>
								<option value="71">71</option>
								<option value="72">72</option>
								<option value="73">73</option>
								<option value="74">74</option>
								<option value="75">75</option>
								<option value="76">76</option>
								<option value="77">77</option>
								<option value="78">78</option>
								<option value="79">79</option>
								<option value="80">80</option>
								<option value="81">81</option>
								<option value="82">82</option>
								<option value="83">83</option>
								<option value="84">84</option>
								<option value="85">85</option>
								<option value="86">86</option>
								<option value="87">87</option>
								<option value="88">88</option>
								<option value="89">89</option>
								<option value="90">90</option>
								<option value="91">91</option>
								<option value="92">92</option>
								<option value="93">93</option>
								<option value="94">94</option>
								<option value="95">95</option>
								<option value="96">96</option>
								<option value="97">97</option>
								<option value="98">98</option>
								<option value="99">99</option>
								<option value="100">100</option>
					</select>
					<div class="error-message" v-if="submitted && paxInfoData.age == 'Age'">Enter your Age</div>
					<i class="ico-sprite ico-arr"></i>
				</span>
				<span class="prel w35 mt20">
					<select v-model="paxInfoData.countryGroup" v-on:change="onChange()">
						<option disabled>Country Group</option>
						<option v-for="(countryGroup,index) in masterDataAJAX.visitors" :key="index">{{index}}</option>
					</select>
					<div class="error-message" v-if="submitted && paxInfoData.countryGroup == 'Country Group'">Please Select Country Group</div>
					<i class="ico-sprite ico-arr"></i>
				</span>
				<span class="w35 mt20 prel">
					<select v-model="paxInfoData.countryName" v-if="paxInfoData.countryGroup != 'Country Group'">
						<option disabled>Country</option>
						<option v-for="(country,index) in masterDataAJAX.visitors[paxInfoData.countryGroup]">{{country.countryName}}</option>
					</select>
					<select v-model="paxInfoData.countryName" v-if="paxInfoData.countryGroup == 'Country Group'">
						<option disabled>Country</option>
					</select>
					<div class="error-message" v-if="submitted && paxInfoData.countryName == 'Country'">Please Select Country</div>
					<i class="ico-sprite ico-arr"></i>
				</span>
				</div>
			</li>
			<li class="optional-d">
				<p @click="showOptionalDetails = ! showOptionalDetails" class="mb10">Optional details</p>
				<div v-if="showOptionalDetails" class="first-div f-none"><span class="lh32">Adult 1</span></div>
				<div>
				<span class="w35 prel" v-if="showOptionalDetails">
				   <select v-model="paxInfoData.identityType">
								<option>Identity Type</option>
								<option>ADHAAR</option>
								<option>PASSPORT</option>
								<option>DRIVING LICENSE</option>
							</select>
				  </span>
				<span class="w35" v-if="showOptionalDetails">
				  <input v-model="paxInfoData.identityNumber" type="text" placeholder="Identity Number">
				</span>
					</div>
			</li>
			<li class="resp-tc"><button class="btn-blue" @click="addTravllerDetails()">Add Travellers</button></li>
		</ul>

		<div class="txt-c resp-btn">
			<button @click="submitPaxDetails()" class="btn-blue m-pay" >Proceed To Payment</button>
		</div>
	</section>
	<aside class="fr fare-detail" >		
		<section class="section-fare" v-if="totalAdultCount > 0 || totalChildCount > 0">
			<h2 class="review-head">Fare Details</h2>
			<div class="module">
				<ul v-for="(fareInfo,index) in fareJSON" v-if="parseInt(fareJSON[index].adultCount) > 0 || parseInt(fareJSON[index].childCount) > 0" :key="index" class="fare-details clearfix">
					<li class="clearfix">
						<span class="fl text-dark">{{index}}</span>
					</li>
					<li v-if="parseInt(fareJSON[index].adultCount) > 0" class="text-lght clearfix">
						<span class="fl" >Adult x {{fareJSON[index].adultCount}}</span><span class="fr" v-if="fareJSON[index].adultCount > 0">&#8377 {{fareJSON[index].adultPrice}}</span>
					</li>
					<li v-if="parseInt(fareJSON[index].childCount) > 0" class="text-lght clearfix">
						<span class="fl" >Child x {{fareJSON[index].childCount}}</span><span class="fr" v-if="fareJSON[index].childCount > 0">&#8377 {{fareJSON[index].childPrice}}</span>
					</li>
				</ul>
				<div class="clearfix you-pay">
					<span class="fl fs-20">You Pay</span>
					<span class="fr fs-24">&#8377 {{totalMonumentPrice}}</span>
				</div>
			</div>
		</section>		

		<section class="term-section">
			 <p class="review-head">Terms & Conditions</p>
			 <ul class="t-c clearfix">
                  <li>The e-ticket is not transferable.</li>
                  <li>Entry Fee is not refundable.</li>
                  <li>E-ticket cancellations are not permitted.</li>
                  <li>The Monument is open for visitors between sunrise and sunset.</li>
                  <li>Visitor shall be required to show photo identity proof in original at the entry to the monument.</li>
                  <li>Edibles are not allowed inside the monument.</li>
                  <li>Inflammable/dangerous/explosive articles are not allowed.</li>
              </ul>
		</section>
	</aside>
    </div>
</div>
	 <loader-view v-if="showAjaxLoading"></loader-view>
	 <ask-modal
      :showConfirmationDialog= "showConfirmationDialog"
      :errorMessage = "errorMessage"
      :srpNavDisable = "srpNavDisable"
      @closeAskModal = "showConfirmationDialog = $event">
	 </ask-modal>
	<div id="footerHTML" style="display:none"></div>
</div>	
</template>
<script>
   import Vue from 'vue'
   import data from '../data/telephoneCode.js'
   import { APP_URL} from "../util/constants";
   import { adobeAnalyticsPageView } from '../helper/adobeAnalytic' 
   import {fetchMasterDataAPI,getReviewSummaryAPI,savePaxDetailsAPI,getSecureHeader,getSecureFooter,whtsappConsectUpdateAPI,whtsappConsectFetchAPIs} from '../api/api'
   export default {
	 components :{
	   AskModal: () => import("../components/common/askModal.vue"),
	   LoaderView : () => import('../components/common/loader.vue')	 
	 },  
	 data () {
	   return {
		  telephoneCodeDetails: data.telephoneCode,
		  fadein: true, 
		  errorMessg:false,
          errorData:'',
		  masterDataAJAX :{},
          showHideSignIn :true,
          showError:false, 
          isHideShow:true, 
          submittedFormStatus: false,
		  forgotPwdStatus:false,
          showLogin:true,
          toggleContainer:true,   
		  isLoggedIn:false,
		  whtsappAskConsent: true,
		  userName: '',
		  showAjaxLoading:false,
		  userEmail :'',
		  userMobile : '',
		  userISD:'+91',
		  makePaymentCondition : false,
		  reviewData :{},
		  gender : ['Mr','Ms','Mrs'],
		  submitted:false,
		  savedPaxInfo:[],
		  editablePaxInfo : [],
		  fareJSON :{},
		  whtsapp: true,
		  showOptionalDetails:false,
		  totalAdultCount : 0,
          proceedDisabled:0,
		  totalChildCount : 0,
		  savePaxDetails :{},
		  totalMonumentPrice:0,
		  totalPrice:0,
          emailId: '',
		  password: '',
		  showConfirmationDialog: false,
      	  errorMessage : "",
      	  srpNavDisable : false ,
		  paxInfoData : {
             'countryGroup' : 'Country Group',
             'countryName':'Country',
             'gender' :'Title',
             'age':'Age',
             'paxType':'',
             'name':'',
             'identityType':'Identity Type',
             'identityNumber':'',
			 'isEditable' :false
          },
        showLoginPannel:false,
        SocialLoginUrl:'/social/user/login.htm',
        UserProfileUrl:'/social/user/userProfile.htm', 
		forgotPasswordUrl:'/social/user/forgotPassword.htm',
        showLoading:false,
		errorText:'check',
        updateDate:false,
		whtsappConsent: null,
		userId: ''
       }
	 },
     created(){
         
     },
	 mounted (){
	  let self = this
	  //self.checkWhtsappConsent();
	  self.showAjaxLoading = true
	  document.title ="Yatra | Book Monuments in 3 simple steps"
      window.fbAsyncInit = function() { 
      FB.init({
          appId : '1690000827931920', 
          cookie : true, 
          xfbml : true, 
          version : 'v2.8'
        }); 
      }; 
      (function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js"; fjs.parentNode.insertBefore(js, fjs); }
      (document, 'script', 'facebook-jssdk'));

	   getSecureHeader().then(response => {
          $("#headerHTML").append(response.data)
		   setTimeout(function(){
			   $('#headerHTML').css('display','block')
               self.checkUser()
               self.getMasterData()
			   self.getReviewData()
		 	},300)
		  },response => {
			self.getMasterData()
			self.getReviewData()
       })
	   getSecureFooter().then(response => {
          $("#footerHTML").append(response.data)
		   setTimeout(function(){
			   $('#footerHTML').css('display','block')
			},500)
       },response => {})
	 },
	 methods :{
	  checkWhtsappConsent (userid){
		  let self = this;
		  var whtsappConsentData = null
		  whtsappConsectFetchAPIs(userid).then(response => {
			//SHOWING WHATSAPP CONSENT CHECKBOX
			if(response && response.data && response.data.additionalDetails && response.data.additionalDetails.whatsapp_consent) {
				whtsappConsentData = response.data.additionalDetails.whatsapp_consent
			}
			self.whtsappConsent = whtsappConsentData
			if(self.whtsappConsent == 'false') {
				self.whtsappAskConsent = false
			}
		  }).catch( error => {
			  self.whtsappConsent = whtsappConsentData
			  console.log('unable to fetch whtsapp details of user.')
		  })
	  },
	  takeWhtsappConsent (){
        var self = this
        whtsappConsectUpdateAPI(self.userEmail, self.whtsappAskConsent).then(function(response) {
          console.log('success', response)
        }).catch(response => console.log(response))
      },
	  scrollDown (){
		   window.scrollBy(0, 300)
	  },
      navigateToSrp(){
          let qUpdate = 'UpdateTravel'
           window.open(`${APP_URL}/list/?qUpdate=${qUpdate}`, "_self");
           //sessionStorage.setItem('updateDate','Review')
	  },
      checkUser(){
        let self = this
        let postData = {
			"includeOptionalParams": 'true',
			"productId": 'yatramonuments',
			"channel": 'b2c'
		}
                
		Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		Vue.http.options.emulateJSON = true;
		this.$http.post(self.UserProfileUrl,postData).then(function (response) {
			if (response.body.status == "SUCCESS") {
					self.isLoggedIn = true
					var resData = response.body.responseData
					self.userEmail = resData.userInfo.email
					self.userId = resData.userInfo.id
					if(resData.userInfo.mobile == undefined || resData.userInfo.mobile == '') {
						self.userMobile = ''
					} else {
						self.userMobile = resData.userInfo.mobile
					}
					self.userName = response.body.responseData.userInfo.name + " " + response.body.responseData.userInfo.lastName
					userLogin.setUserName(self.userName)
					// userid is required to fetch whtsapp consent
	  				self.checkWhtsappConsent(self.userId);
					self.showHideSignIn = false
					self.showError = false
					self.hideLogin()
					self.updateDate = true
			} else {
				self.showHideSignIn = true
				self.showError = false
				self.showLoginClick()
			}
		})
      },
	  convertIntoHTML(txt){
        var t =  new DOMParser().parseFromString(txt,'text/html').body
        return t.innerText
       }, 	 
       getMasterData (){
		  let self = this 
          fetchMasterDataAPI().then(response => {
		      self.masterDataAJAX = response.data.data	
		 	  for(let i =0 ; i < Object.keys(self.masterDataAJAX.visitors).length; i++){
              self.fareJSON[Object.keys(self.masterDataAJAX.visitors)[i]]={
				'adultCount':'',
                'adultPrice':'',
				'childCount':'',
				'childPrice':''
			   }
		    }
			self.showAjaxLoading = false
         }, response => {
          self.masterDataAJAX = {}
		  self.showAjaxLoading = false
         })
	   },
	   getReviewData () {
		  let self = this  
		  var localResponse = localStorage.getItem('bookingMonuResponse')
		  //service to fetch added monuments data
			getReviewSummaryAPI(this.$route.query.superPNR).then(response => {
				self.reviewData = response.data.data.monumentsAvailability
				self.showAjaxLoading = false
				if (self.isLoggedIn) {
					self.isLoggedIn=false
					self.showHideSignIn = false
					self.showError = false
					self.hideLogin()
				} else {
					self.isLoggedIn = false
					self.showHideSignIn = true
					self.showError = false
					self.hideLogin()
				}
			}, response => {
				self.reviewData = {}
				self.showAjaxLoading = false
			})

		  setTimeout(function(){
			  adobeAnalyticsPageView("yt:monument:dom:review traveller","monuments","web","business","monument checkout","domestic monument","review traveller","","")
		  }, 1000);
		   
	   },		 
	   validateTelephone(evt,option){
		this.userMobile = isNaN(parseInt(this.userMobile)) ? '' : parseInt(this.userMobile)   
       },
	   onEditTravellerChange (index){
         this.savedPaxInfo[index].countryName = this.masterDataAJAX.visitors[this.savedPaxInfo[index].countryGroup][0].countryName
	   },
       validateTab_1Form () {
          var test = this.emailId != '' && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.emailId) && this.password != ''
          return test
       },
	   validateUserEmailId() {
          var test = this.emailId != '' && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.emailId)
          return test
       },
       submitLogin () {
        this.showLoading=true
        this.submittedFormStatus = true  
        if(this.validateTab_1Form()) {
        this.submittedFormStatus = false 
        let postData = {
			"emailId": this.emailId,
			"password": this.password,
			"includeOptionalParams": 'true',
			"productId": 'yatramonuments',
			"channel": 'b2c'
		}
         Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
         Vue.http.options.emulateJSON = true;
                let self = this
                this.$http.post(self.SocialLoginUrl,postData).then(function (response) {
                    if (response.body.authMode == "FACEBOOK") {
                        if (response.body.responseCode == "104") {
                             self.isLoggedIn=true
                             setTimeout(function(){
                                 self.isLoggedIn=false
                             },2000)
                             self.showHideSignIn = false
                             self.showError = false
                             self.userEmail= response.body.email
							 var resData = response.body.responseData
                             if(resData.mobileNum == undefined || resData.mobileNum == '') {
								 self.userMobile = ''
							 } else {
								 self.userMobile = resData.mobileNum
							 }
                             userLogin.setUserName(response.body.responseData.personName.givenName)
							 self.hideLogin()
							 self.updateDate = true
                             self.showLoading=false
                        } else {
                              self.showLoginClick()
							  self.errorText = response.body.responseMessage
                              self.showError = true
                              self.showLoading=false
                            }
                    }else{
                        if (response.body.status == "SUCCESS") {
                             self.isLoggedIn=true
                             setTimeout(function(){
                                 self.isLoggedIn=false
                             },2000)
                             self.showHideSignIn = false
                             self.showError = false
							 var resData = response.body.responseData
                             self.userEmail= resData.userInfo.email
                             if(resData.userInfo.mobile == undefined || resData.userInfo.mobile == '') {
								 self.userMobile = ''
							 } else {
								 self.userMobile = resData.userInfo.mobile
							 }
                             userLogin.setUserName(resData.userInfo.name)
                             self.hideLogin()
							 self.showLoading=false
							 self.updateDate = true
						} else {
                            self.showLoading=false
                            self.showLoginClick()
							self.errorText = response.body.responseMessage
                            self.showError = true
                        }
                    }
              }, function (response) {
                  self.showLoading=false
            });
        }
           else{
               this.showLoading=false
           }
       },
	   deleteTravelers (index){
        this.proceedDisabled = this.proceedDisabled-1
		for(var i=0;i<Object.keys(this.reviewData).length;i++){
			this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count'] = parseInt(this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count'])-1
			this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Price'] = this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()].totalPrice*parseInt(this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count'])
			this.totalMonumentPrice -= this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()].totalPrice
		}
		if(this.savedPaxInfo[index].paxType == 'ADULT'){
			this.totalAdultCount -= 1
		} else {
			this.totalChildCount -=1
		}
        this.savedPaxInfo.splice(index,1)
	   },
       restrictSpecialChar(event) {
		this.forgotPwdStatus=false;
		var searchSpecial = '$Backspace$Del$Home$Tab$Left$Right$Up$Down$End$';
		if (searchSpecial.indexOf('$' + event.key + '$') < 0) {
			var theEvent = event.htmlEvent || window.event;
			var regex = new RegExp("^[-_@.a-zA-Z0-9]+$");
			var key = String.fromCharCode(!theEvent.charCode ? theEvent.which : theEvent.charCode);
			if (!regex.test(key)) {
				event.preventDefault();
				return false;
			}
		}
	   }, 
	   validateContinueTab_2 (){
        return this.paxInfoData.identityType =='Identity Type' &&  this.paxInfoData.identityNumber == '' && this.paxInfoData.name == '' && this.paxInfoData.age == 'Age' && this.paxInfoData.countryName == 'Country' && this.paxInfoData.countryGroup == 'Country Group' && this.paxInfoData.gender == 'Title'
       },
	   savePaxDetailsAPI (){
        var superPnr = this.getUrlParams(window.location.href)["superPNR"]
        let adultCount = 0,childCount = 0 ;
		for(let i=0 ; i < this.savedPaxInfo.length ; i++){
			if(this.savedPaxInfo[i].paxType == "CHILD") {
				childCount += 1
			} else {
				adultCount +=1 
			}
			this.savedPaxInfo[i].identityType = this.savedPaxInfo[i].identityType == 'Identity Type' ? '' : this.savedPaxInfo[i].identityType
		}
		this.savePaxDetails['email']  = ''
		this.savePaxDetails['email'] = this.userEmail
		this.savePaxDetails.phone = {}
		this.savePaxDetails.phone = {
			'isd':'91',
			'number':this.userMobile
		}

		var tempArray=[]
		for(var key in this.reviewData) {
			tempArray.push(key)
		}
		this.savePaxDetails.monumentPaxSummary = {}

		for(var key in this.reviewData) {
			for(var j=0; j<tempArray.length; j++) {
				if(key == tempArray[j]) {
					let a = tempArray[j]
					this.savePaxDetails.monumentPaxSummary[a] = {}
					this.savePaxDetails.monumentPaxSummary[a].visitDate = this.reviewData[a].visitDate
					if(this.reviewData[a].timeSlot) {
						this.savePaxDetails.monumentPaxSummary[a].timeSlot = {
							'name':this.reviewData[a].timeSlot.name,
							'startTime': this.reviewData[a].timeSlot.startTime,
							'endTime': this.reviewData[a].timeSlot.endTime
						}
					}
					this.savePaxDetails.monumentPaxSummary[a].adultCount = adultCount
					this.savePaxDetails.monumentPaxSummary[a].childCount = childCount
					this.savePaxDetails.monumentPaxSummary[a].paxInfo = this.savedPaxInfo
				}
			}
		}

		let self = this 
		this.isAPICompleted = true
		
		savePaxDetailsAPI(superPnr,self.savePaxDetails).then(function (response) {
			self.paySwift(superPnr)
		}).catch(function (error) {
			//console.log(error, error.body, error.data, error.response)
			self.showConfirmationDialog = true
			self.srpNavDisable = true
			self.errorMessage = error.response.data.responseInfo.errors
			self.isAPICompleted = false
		})
      },
      getUrlParams(url) {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
            function(m,key,value) {
              vars[key] = value;
            });
            return vars;
      },
      paySwift(s) {
       let self = this
       let paymentForm = document.createElement('FORM')
       paymentForm.name = 'payment_form'
       paymentForm.method = 'POST'
       paymentForm.action = 'https://secure.yatra.com/PaySwift/payment'
       var response = {
         'superPnr':s,
         'product':'yatramonuments',
         'merchant':'yatra'
       }
       let formKeys = Object.keys(response)
       for (let i = 0; i < formKeys.length; i++) {
          let formInput = document.createElement('INPUT')
          formInput.type = 'HIDDEN'
          formInput.name = formKeys[i]
          formInput.value = response[formKeys[i]]
          paymentForm.appendChild(formInput)
       }
       document.body.appendChild(paymentForm)
       paymentForm.submit()
      },
	  validateContact (){
		  if(this.userISD == '+91'){
            var test = this.userEmail != '' && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.userEmail) && this.userMobile != '' && this.userMobile.toString().length == 10
		  } else {
			   var test = this.userEmail != '' && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.userEmail) && this.userMobile != '' && this.userMobile.toString().length >= 3 && this.userMobile.toString().length <= 16
		  }
          return test
	  },
	  validateSavedPaxDetails (paxInfo){
         if(paxInfo.name == ''){
			 return false
		 } else {
			 return true
		 }
	  },
	  validateEmptyTraveller (){
		 return this.paxInfoData.age == 'Age' && this.paxInfoData.countryGroup == 'Country Group' && this.paxInfoData.countryName == 'Country' && this.paxInfoData.gender == 'Title' && this.paxInfoData.name == '' && this.paxInfoData.paxType == ''
	  },
	  submitPaxDetails (){
		  this.makePaymentCondition = true
		  //console.log(this.savedPaxInfo)
		  if(this.savedPaxInfo.length == 0){
			   this.submitted = true
               if(this.validateForm() && this.validateContact()) {
				   this.submitted = false
				   this.addTravellerListData() 
				   this.savePaxDetailsAPI()
			   }				  
		  } else {
              for(let i =0; i < this.savedPaxInfo.length ; i++){
				  let checkSavedCondition =  this.validateSavedPaxDetails(this.savedPaxInfo[i])
				  if(!checkSavedCondition) {
					  return false
				  }
			  }
			  if(this.validateEmptyTraveller()){
				if(this.validateContact()){
					 this.savePaxDetailsAPI()
					 this.makePaymentCondition = false
				}                    
			  } else if(this.validateForm() && this.validateContact()){
					this.submitted = false
					this.addTravellerListData()
                    this.savePaxDetailsAPI() 
			  } else {
					this.submitted = true
			  }              
		  }
	   },
	   editTravelers (index){
		  this.fadein = false
		  this.savedPaxInfo[index].identityType = this.savedPaxInfo[index].identityType == '' ? 'Identity Type' : reviewPax.identityType 
          this.savedPaxInfo[index].isEditable = false
	   },
	   saveTravelers (index){
		  this.fadein = true 
         this.savedPaxInfo[index].isEditable = !this.savedPaxInfo[index].isEditable;
		 this.savedPaxInfo[index].identityType = this.savedPaxInfo[index].identityType == 'Identity Type' ? '' : this.savedPaxInfo[index].identityType
		 this.savedPaxInfo[index].paxType = parseInt(this.savedPaxInfo[index].age) >= 15 ? 'ADULT':'CHILD'
		  for(var i=0;i<Object.keys(this.reviewData).length;i++){
			 this.fareJSON[this.editablePaxInfo[index].countryGroup][this.editablePaxInfo[index].paxType.toLowerCase()+'Count'] = parseInt(this.fareJSON[this.editablePaxInfo[index].countryGroup][this.editablePaxInfo[index].paxType.toLowerCase()+'Count'])-1
			 this.fareJSON[this.editablePaxInfo[index].countryGroup][this.editablePaxInfo[index].paxType.toLowerCase()+'Price'] = this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.editablePaxInfo[index].countryGroup][this.editablePaxInfo[index].paxType.toLowerCase()].totalPrice*parseInt(this.fareJSON[this.editablePaxInfo[index].countryGroup][this.editablePaxInfo[index].paxType.toLowerCase()+'Count'])
			 this.totalMonumentPrice -= this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.editablePaxInfo[index].countryGroup][this.editablePaxInfo[index].paxType.toLowerCase()].totalPrice
			 this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count']=isNaN(parseInt(this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count']))? 1: parseInt(this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count'])+1
			 this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Price']=isNaN(parseInt(this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Price']))? this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()].totalPrice: this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()].totalPrice*parseInt(this.fareJSON[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()+'Count'])
			 this.totalMonumentPrice += this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.savedPaxInfo[index].countryGroup][this.savedPaxInfo[index].paxType.toLowerCase()].totalPrice
		  }
		 if(this.editablePaxInfo[index].paxType == 'ADULT'){
			this.totalAdultCount = this.totalAdultCount == 1 ? 0 : this.totalAdultCount -1
		} else {
			this.totalChildCount = this.totalChildCount ==1 ? 0 : this.totalChildCount -1
		}
		if(this.savedPaxInfo[index].paxType == 'ADULT'){
             this.totalAdultCount += 1
			} else {
			  this.totalChildCount += 1
		}
		this.editablePaxInfo = $.extend(true,[],this.savedPaxInfo)
	   },	 
	   getMonthName (date){
        var d = new Date(date)
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return monthNames[d.getMonth()]
      }, 
      getDate (date) {
         var d = new Date(date) 
         return (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
      },
      getDayName (date) {
         var d = new Date(date)
         var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
         return days[d.getDay()]
      },
	   onChange () {
        this.paxInfoData.countryName = this.masterDataAJAX.visitors[this.paxInfoData.countryGroup][0].countryName
      },
	   addTravellerListData(){
            this.paxInfoData.identityType = this.paxInfoData.identityType == 'Identity Type' ? '' : this.paxInfoData.identityType
            this.paxInfoData.identityNumber = this.paxInfoData.identityType == 'Identity Type' ? '' : this.paxInfoData.identityNumber
            this.paxInfoData.paxType = parseInt(this.paxInfoData.age) >= 15 ? 'ADULT':'CHILD'
			if(this.paxInfoData.paxType == 'ADULT'){
             this.totalAdultCount += 1
			} else {
			  this.totalChildCount += 1
			}
			 
			this.paxInfoData.gender = this.paxInfoData.gender.split('.')[0]
	        this.paxInfoData.isEditable = true

		    this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Count']=isNaN(parseInt(this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Count']))? 1: parseInt(this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Count'])+1


		    for(var i=0;i<Object.keys(this.reviewData).length;i++){
				this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Price'] =isNaN(parseInt(this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Price']))? this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()].totalPrice: this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()].totalPrice*parseInt(this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Count'])+parseInt(this.fareJSON[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()+'Price'] )


				this.totalMonumentPrice += this.reviewData[Object.keys(this.reviewData)[i]].priceInfo[this.paxInfoData.countryGroup][this.paxInfoData.paxType.toLowerCase()].totalPrice
			}


			[this.paxInfoData.paxType.toLowerCase()].totalPrice
            this.savedPaxInfo.push(Vue.util.extend({}, this.paxInfoData))
			this.editablePaxInfo = $.extend(true,[],this.savedPaxInfo)
            this.paxInfoData = {
             'countryGroup':'Country Group',
             'countryName':'Country',
             'gender' :'Title',
             'age':'Age',
             'paxType':'',
			 'isEditable':false,
             'name':'',
             'identityType':'Identity Type',
             'identityNumber':''  
           }
      },
	  validateForm(){
        return this.paxInfoData.gender != 'Title'  && this.paxInfoData.name != '' && this.paxInfoData.age != 'Age' && this.paxInfoData.countryName != 'Country' && this.paxInfoData.countryGroup != 'Country Group'
      },
	  addTravllerDetails(){
		  this.submitted = true 
		  if(this.validateForm()){
             this.proceedDisabled = this.proceedDisabled+1
			 this.submitted =false 
            this.addTravellerListData() 
		  }
	   },
       FB_Login(){
           var self = this;
           FB.login(function(response) {
                FB.api('/me', dude => {
                    self.fblogin(response.authResponse.accessToken);
                })
            });
       },
       fblogin (accessToken) {
           this.showLoading = true
           let postData = {
                authMode: "FACEBOOK",
                loginStep: "ResponseCheck",
                accessToken:accessToken,
                sourcepage: window.location.href,
                includeOptionalParams: true,
                channel: "b2c",
                productId: "yatramonuments",
              }
              Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              Vue.http.options.emulateJSON = true;
              let self = this
              this.$http.post('https://secure.yatra.com/social/social/login.htm',postData).then(function (response) {
                if (response.body.customerDetails && Object.keys(response.body.customerDetails).length>0) {
                    this.showLoading = false
                  if(response.body.isLinkedAccount) {
					self.userEmail = response.body.customerDetails.email ? response.body.customerDetails.email :''
					var resData = response.body.responseData
					if(response.body.customerDetails.mobileNum == undefined ||response.body.customerDetails.mobileNum == '') {
						self.userMobile = ''
					} else {
						self.userMobile = response.body.customerDetails.mobileNum
					}
                    self.showLoginPannel=false
                    self.showHideSignIn = false
					self.isHideShow = true
					userLogin.setUserName(response.body.customerDetails.personName.givenName)
                    let userInfo = {
                      'email': response.body.customerDetails.email,
                      'mob': response.body.customerDetails.mobileNum ? response.body.customerDetails.mobileNum : null,
                      'mobileISD': response.body.customerDetails.mobileISDCode ? response.body.customerDetails.mobileISDCode : null
                     }
                  } else{
                    self.errorMessg = true
                    self.errorData = response.body.responseMessage ? response.body.responseMessage : 'Some error occured.Please try later' 
                    setTimeout(function(){
                      self.errorMessg = false  
                    },2000)
                  }
                } else {
                    self.errorMessg = true
                    self.errorData = response.body.responseMessage ? response.body.responseMessage : 'Some error occured.Please try later'
                    setTimeout(function(){
                      self.errorMessg = false  
                    },2000)
                }
               }, function (response) {
                  this.showLoading = false
                  console.log('Error')
              });
       },
       hideLogin() {
           this.showLoginPannel=false
           this.isHideShow = true
           setTimeout(function(){
			  this.isLoggedIn=false
           },500)
       },
       showLoginClick() {
           this.isHideShow = false
           this.showLoginPannel=true
       },
       showLoginDialog(){
        if (typeof userLogin == 'function' && typeof userLogin.isUserLogIn == 'function' && !userLogin.isUserLogIn()){
               this.isHideShow = false
               this.showLoginPannel=true
        }
     },
     showLogoutDialog() {
        if (typeof userLogin == 'function' && typeof userLogin.removeUserLogin == 'function') {
			this.isHideShow = false
			this.isLoggedIn=false
            this.showHideSignIn = true
            this.showLoginPannel=true
            this.userEmail = ''
            this.userMobile = ''
			this.updateDate = false
			if(localStorage) {
              localStorage.clear()
			}
			//window.location.reload()
        }
       },
	   forgotPassword () {
			this.forgotPwdStatus = true
		   // setTimeout(function(){$('.error-message').fadeOut(1500);}, 1500);
			if(this.validateUserEmailId()) {
			    this.forgotPwdStatus = false 
				let postData = {
					"emailId": this.emailId,
					"password": this.password,
					"includeOptionalParams": 'true',
					"productId": 'yatramonuments',
					"channel": 'b2c'
				}
			Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			Vue.http.options.emulateJSON = true;
			let self = this
			this.$http.post(self.forgotPasswordUrl,postData).then(function (response) {
				self.showLoading=false
				self.showError = true
				if(response.body.responseMessage!="") {
					self.errorText = response.body.responseMessage	
				} else{
					self.errorText = "You have not been registered with us yet."
				}
				
				//setTimeout(function(){$('.errorTxt').fadeOut(1500);}, 1500);	
				});
			}
		}
	 }
   }
  
</script>



<style scoped="true" lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.loading-html {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255, 0.9);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.loading {
        color: #000;
        background: rgba(0,0,0,0.6);
        padding: 5px 20px;
        border-radius: 3px;
        color: #fff;
    }
    .loading:after {
  content: ' .';
  animation: dots 1s steps(5, end) infinite;}
    @keyframes dots {
    0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
    40% {
    color: white;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
    60% {
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 rgba(0,0,0,0);}
    80%, 100% {
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;}
    }
    .hideDiv {
	    overflow: hidden;
	    max-height: 0;
	    padding-top: 0;
	    padding-bottom: 0;
	    margin-top: 0;
	    margin-bottom: 0;
	    -moz-transition-duration: 0.3s;
	    -webkit-transition-duration: 0.3s;
	    -o-transition-duration: 0.3s;
	    transition-duration: 0.3s;
	    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        padding: 0!important;
        margin-bottom: 0 !important;
	}
	.d-none {
		display: none;
	}
    
    .showDiv {
		    -moz-transition-duration: 0.3s;
		    -webkit-transition-duration: 0.3s;
		    -o-transition-duration: 0.3s;
		    transition-duration: 0.3s;
		    -moz-transition-timing-function: ease-in;
		    -webkit-transition-timing-function: ease-in;
		    -o-transition-timing-function: ease-in;
		    transition-timing-function: ease-in;
		    max-height: 200px;
		    overflow: hidden;
		}
    
    
	.yatra-asi-review {
		background: #e2e2e2;
		padding-top: 50px;
		.left-sec{
			margin: 0 0 4%;
		}
		section {
			width: 75%;
		}
		p{
			margin-bottom: 5px;
		}
	.module {
		padding: 20px;
		overflow: hidden;
		box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.3);
		margin-bottom: 30px;
		background: #fff;
		}
		.mt16 {
			margin-top: 16;
		}
		.review-head {

			position: relative;
   			 padding: 0 0 0 50px;
			margin-bottom: 15px;
			font-size: 20px;
			background-image: -webkit-linear-gradient(left, #43264e, #ea2331);
			background-image: -moz-linear-gradient(left, #43264e, #ea2331);
			background-image: -ms-linear-gradient(left, #43264e, #ea2331);
			background-image: -o-linear-gradient(left, #43264e, #ea2331);
			background-image: linear-gradient(to right, #43264e, #ea2331);
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			display: inline-block;
			font-weight: normal;
		}
		.calender-date {
                margin-left: 30px;
				width: 100px;
				border: 1px solid #C4C4C4;
				border-radius: 5px;
				text-align: center;
        .blue-bg {
                background: #D64443;
                color: #fff;
                padding: 9px;
                border-radius: 5px 5px 0 0;
                .date {
                    font-size: 30px;
                    margin-top: 5px;
                    margin-bottom:0px!important;
                }
			.month {
				margin-bottom: 0;
				}
            }
            .day {
                border: 1px solid #eee;
                padding: 4px;
                font-size: 14px;
                border-radius: 3px 0 3px 3px;
                background: #fff;
            }
        }
		.f-small {
			color: #999;
			font-size: 14px;
		}
		.f-bold {
			font-size: 24px;
		}
		.pay-detail {
			margin-left: 30px;
			float: left;
			width: 65%;
		}
		.pay-footer {
			border: 1px solid #ddd;
			border-right: none;
			border-left: none;
			font-size: 14px;
			padding: 8px 0;
		}
		.mt10 {
			margin-top: 10px;
		}
		.travel-form  {
			li {
				display: block;
				margin: 15px 20px;
				float: left;
				width: 96%;
				& > div {
					float: left;
    				width: 77%;
				}
				.first-div {
					width: 16%;
					margin-right: 40px;
					float: left;
				}
				.lh32 {
					line-height: 32px;
					width: 100%;
				}
				input ,select{
					border: 1px solid #a3a3a3;
					padding: 8px;
					border-radius: 3px;
					width: 100%;
					outline: none;
					color: #333;
				}
				.ico-arr {
					top: 6px;
    				right: 20px;
				}
				.pos-absl{
					position: absolute;
    				left: 32px;
				}
				span {
					float: left;
					margin-right: 20px;
				}
				.adult {
					border: 1px solid #a3a3a3;
					padding: 7px;
					border-radius: 3px;
					input,select {
						border: none;
						display: inline-block;
						width: auto;
						padding: 0;
					}
					span {
						border: 1px solid #a3a3a3;
						padding: 8px;
						border-radius: 3px;
					}
				}
				.w30{
					width: 30%;
				}
				.w35 {
					width: 46%;
					&.adult {
					select {
						font-size: 14px;
					    margin-right: 14px;
					    border-right: 1px solid #000;
					    border-radius: 0;
					    width: 50px;
						}
					}
				}
				.f-none {
					font-size: 0;
				}
				p {
					margin-bottom: 20px;
					font-size: 15px;
					margin-left: 21%;
					color: red;
					cursor: pointer;
					width: 100%;
				}
				select {
					color: #333;
					font-size: 14px;
					color: #333;
					font-size: 14px;
					z-index: 999;
					position: relative;
					cursor: pointer;
				}
				.sel-isd{
					 width: 85%;
				    float: left;
				    height: 37px;
				    border-radius: 0;
				}
				.w60{
					width: 62%;
				}
				.btn-blue {
					width: 30%;
    				margin-left: 21%;
					border-radius: 0;
				}
				.isd {
					width: 25%; float: left;
					position: relative;
   					z-index: 2;
				}
				.number {
					 padding-left: 90px;
				    width: 100%;
				    float: left;
				    margin: 0 0 0 0%;
				    position: absolute;
				    left: 0;
				}
				.visitor-name{
					width: 46%;
					.pos{
						width: 25%;
					    float: left;
					    position: relative;
					    z-index: 2;
					    select{
					    	border-radius: 0;
					    }
					}
					.name-input{
				    	padding-left: 90px;
					    width: 100%;
					    float: left;
					    margin: 0 0 0 0%;
					    position: absolute;
					    left: 0;
				    }
				}

			}
			.mt20 {
				margin-top: 20px;
			}
			input::placeholder {
			  	color: #999;
				font-size: 14px;
			}
		}
		.fare-detail {
			width: 22%;
			font-size: 15px;
			li {
				float: left;
				width: 100%;
				margin-bottom: 5px;
				&:last-child {
					margin-bottom: 0;
				}
			}
			.fare-foot {
				font-size: 20px;
				border-top: 1px solid #ddd;
				padding-top: 20px;
			}
		}
		.m-pay {
			width: 30%;
			border-radius: 0;
			&:disabled {
			  background:grey;	
			}
		}
		.error-message {
			position: absolute;
			font-size: 12px;
			right: 0;
			bottom: -19px;
		}
		.edit-btn {
			display: inline-block;
			margin-top: 20px;
			margin-bottom: 0px!important;

			&:last-child {
				margin-left: 5%!important;
			}
		}
	}

	.rel{
		position: relative;
	}
	.time-slot {
		font-size: 14px;
		margin-top: 10px;
	}
	.t-slot {
		color: #ea2330;
	}
	.sign-in{

		padding: 20px;
	    overflow: hidden;
	    -webkit-box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.3);
	    box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.3);
	    margin-bottom: 30px;
	    background: #fff;
	    .label{
	    	width: 23%; float: left;
   			 padding: 8px 40px 0 0px;
   			 text-align: right;
	    }
	    .w25{
	    	width: 20%;
	    	float: left;
	    	margin-right: 2%;
	    }
	    input{
	    	border: 1px solid #a3a3a3;
		    padding: 8px;
		    border-radius: 3px;
		    width: 100%;
		    outline: none;
	    }
	    .button{
	    	width: 15%;
		    float: left;
		    .m-pay{
		    	width: 100%;
		    	padding: 9px 10px; 
		    }
	    }
	    .close-icon{
	    	position: absolute;
		    top: 5px;
		    border: 1px solid #999;
		    border-radius: 100%;
		    color: #666;
		    height: 17px;
		    width: 17px;
		    right: 5px;
		    padding: 0px 5px;
		    font-size: 12px;
		    line-height: 13px;
		    &:hover{
		    	cursor: pointer;
		    	color: #ea2330;
		    	border: 1px solid #ea2330;
		    }
	    }
	}
	.pipe{
		color: #999;
		padding: 0 10px;
		font-size: 18px;
	}
	.sign-text{
		a{
			font-size: 18px;
			font-weight: normal;
		}
		.book-fast{
			font-size: 14px; color: #333;
			 margin: 0 10px;
		}
	}
	.show{
		-webkit-transition: width 2s; 
    	transition: width 2s;

	}
	
	.vs-or{
		float: left;
	    position: relative;
		display: inline-block;
	    position: relative;
	    vertical-align: top;
	    min-height: 40px;
	    margin-left: 25px;
	    padding-left: 10px;
	    border-left: 1px solid #c3c3c3;
			.innr-or {
			    background-color: #fff;
			    color: #b6b6b6;
			    font-size: 12px;
			    left: -9px;
			    line-height: 22px;
			    position: absolute;
			    text-align: center;
			    top: 25%;
			}
		} 
		.fb-logn {
		    width: 40px;
		    height: 40px;
		    opacity: 0.88;
		    border-radius: 50%;
		    border: solid 1px #3b5998;
		    position: relative;
		    cursor: pointer;
		    vertical-align: top;
		    display: inline-block;
		    text-align: center;
		    line-height: 40px;
		    font-size: 22px;
		    color: #3b5998;
		    margin: 0 0 0 15px;
		    &:hover{
		    	color: #fff;
	    		background-color: #3b5998;
		    }

	}

	.success-msg.hide-opacity{
		opacity: 0;
	}

	.success-msg{
			background: #02CB66;
		    color: #fff;
		    padding: 10px;
		    border-radius: 80px;
		    width: 80%;
		    margin: 0 auto 10px;
		    text-align: center;
			-webkit-transition: opacity 3s ease-in-out;
			-moz-transition: opacity 3s ease-in-out;
			-ms-transition: opacity 3s ease-in-out;
			-o-transition: opacity 3s ease-in-out;
			opacity: 1;
		    p{
		    	margin: 0;
		    	.suc-text{
		    		display: inline-block;
				    position: relative;
				    top: -8px;
				    padding: 0 10px;
		    	}
		    }
		}

		.pos-rel{
			position: relative;
			width: 30%;
			.img-rep{
				    background-repeat: no-repeat;
				    background-size: cover;
				    width: 100%;
				    height: 185px;
				    background-position: 50%;
			}
		}
		.pos-abs{
			position: absolute;
			bottom: 0;
    		right: 0;
		}
	.email-sent{
		.text-msg{
			color: #333!important;
			clear: both;
			font-size: 14px!important;
			padding: 15px 0 0 0;
			margin-bottom: 15px!important;
		}
		.watsup {
			padding-bottom: 50px;
			border-bottom: 2px solid #e4e4e4;
			color: #333!important;
			span {
				margin-right: 3px !important;
			}
		}
	}
		.text-right{
			text-align: right;
		}
		.optional-d{
			margin: 0 20px !important;
			.mb10{
				margin-bottom: 10px !important;
			}
		}
		.text-lght{
			color: #999;
		}
		.fs-24{
			font-size: 24px;
		}
		.fs-20{
			font-size: 18px;
		    font-weight: bold;
		    color: #666;
		}
		.module{
			.fare-details{
				&:first-child {
					margin:0 0 10px;
				}
				margin: 10px 0;
				font-size: 14px;
			}
			.you-pay{
				margin: 10px 0 0;
				padding: 15px 0 0;
				border-top: 1px solid #e4e4e4;
			}
		}
		.clearfix:after {
		   content: " "; /* Older browser do not support empty content */
		   visibility: hidden;
		   display: block;
		   height: 0;
		   clear: both;
		}
		
		.yatra-asi-review{
			.section-fare{
				width: 100%; 
				.review-head{
					padding: 0;
				}
			}
				.term-section{
					width: 100%; 
					.review-head{
						padding: 0;
					}
				.t-c{
					background: #fff; padding: 15px;
					-webkit-box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.3);
	    			box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.3);
					li{
						margin-bottom: 10px;
					    list-style-type: disc;
					    font-size: 12px;
					    margin: 0 0 10px 10px;
					    color: #666;
					    width: 96%;
					}
				}
			}
		}
		.adult-details{
			select{
				height: 37px;
			}
		}
		
	.fadein select, .fadein .adult {
		opacity: .5;
	}
	
	select:focus {
		border-bottom: 2px solid #000 !important;
	}
	.forgot {
		color: #4197cd;
		font-size: 14px;
		cursor: pointer;
		position: absolute;
		top: 1px;
		right: 1px;
		background: #fff;
		height: 93%;
		line-height: 35px;
		width: 70px;
    	padding-left: 14px;
		&:hover {
			color: #d64443 !important;
		}
	}
	@media only screen and (min-width:811px )and (max-width: 1024px){
		.yatra-asi-review{
				.left-sec{
					width: 96%; float: none;
					margin: 0 auto 4%;
				}
			} 
	}

	 @media only screen and (max-width: 810px) {
  	.yatra-asi-review{
  			padding: 15px 0 80px;
			.left-sec, .fare-detail{
			width: 96%; margin: 0 auto;
			float: none;
			.review-head{
				font-size: 18px;
				padding: 0 0 0 38px;
				margin: 0 0 10px;
			}
			.change{
				display: block;
			    float: none;
			    margin: 0px 0 10px 38px;
			}
			.ico-traveller, .ico-review{
				zoom: .8;
			}
			.sign-text{
				display: block; 
    			margin: 0 0 10px 38px; 
			}
			.pipe{
				display: none;
			}
		}
		.sign-in{
				.label{
					width: 100%; margin: 0 0 10px;
					padding: 0;
				}
				.button{
					width: 50%;
					margin: 0;
					padding: 0;
					.m-pay{
						width: 100%;
					}
				}
				input{
					margin-bottom: 24px;
				}
			} 
		.w25{
			width: 100%; margin: 0 0 10px;
		}
		.travel-form{
			li{
				margin: 0;
				width: 100%;
				.w30{
					width: 100%;
					margin-bottom: 10px;
				}
				.w60{
					width: 100%;
				}
				.first-div{
					width: 100%;
				}
				
				> div{
					width: 100%; float: left;
					.w35{
						width: 100%; margin: 0 0 24px;
					}
				}
				p{
					margin: 0 !important;
				}
				.btn-blue{
					width: auto;
    				margin: 0 auto;
				}
				.ico-arr{
					right: 15px;
				}
				.text-right{
					text-align: left;
				}
				.isd{
					.sel-isd{
						width: 55px;
					}
					.ico-arr{
						position: absolute;
	  		    		left: 32px;
					}
				}
				.visitor-name{
					width: 100%;
    				margin: 0 0 24px;
    				.pos{
    					select{
    						width: 55px;
    					}
    				}
				}
				
			}
		}
		.close-icon{
			top:8px;
			right: 8px;
		}
		.optional-d{
			margin-bottom: 10px !important;
			margin-left: 0 !important; 
		}
		.resp-tc{
			text-align: center;
		}
		.m-pay{
				width: 70%;
		}
		.pay-detail{
			margin: 0;
			width: 100%;
		}
		.pos-rel{
			width: 100%;
		}
		.showDiv{
			max-height: inherit;
		}
		.resp-btn{
			position: absolute;
		    bottom: -69px;
		    width: 94%;
		    margin: 0;
		    padding: 0;
		}
		.rel{
			position: relative;
		}
		.f-bold{
			font-size: 20px;
   			 margin: 10px 0 0;
		}
		.resp-tc{
			.btn-blue{
			    width: 80% !important;
			}
		}
			.section-fare{
				width: 100%; 
				.review-head{
					padding: 0;
				}
			}
			.term-section{
				width: 100%; 
				.review-head{
					padding: 0;
				}
			}
	} 
	.yatra-monuments #headerHTML .yatra-header .payment-header .menu{
		    width: 82%!important;
	}
	.sign-in{
		.error-message{
			bottom: 4px;
		}
	}
  }


	  input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="select"]:focus{
	  	    background-size: 100% 1px;
	  }
	  input[type=text]:focus, input[type=password]:focus{
	  	    border-color: #575757;
	    outline: none;
	  }
	 input[type="text"], input[type="email"], input[type="password"], input[type="select"]{
	  	    background-image: -webkit-linear-gradient(#333, #333);
	    background-image: linear-gradient(#333333,#333333);
	    background-size: 0 1px;
	    background-repeat: no-repeat;
	    background-position: center bottom,center calc(100% - 1px);
	    -webkit-transition: background .3s ease-out;
	    transition: background .3s ease-out;
	  }
	  .under-link {
		    position: relative;
			cursor: pointer;
		}
	  .under-link:hover, .link.active, .active.under-link{
	  	color: #d64443;
	  }

	  .color-blue:hover {
		    color: #d64443;
		}
	  .under-link:after{
	  	    content: "";
		    position: absolute;
		    width: 100%;
		    height: 1px;
		    bottom: -5px;
		    left: 0;
		    background-color: #d64443;
		    visibility: hidden;
		    -webkit-transform: scaleX(0);
		    transform: scaleX(0);
		    -webkit-transition: all 0.3s ease-in-out 0s;
		    transition: all 0.3s ease-in-out 0s;
		}
		.under-link:hover:after {
		    visibility: visible;
		    -webkit-transform: scaleX(1);
		    transform: scaleX(1);
		}
		.color-blue {
   			 color: #4197cd;
		}
		.change{
			font-size: 12px; 
			margin: 10px 0 0;
			float: right;
		}
		.fb-login-error{
			text-align: center;
            color: #ea2330;
             margin-top: 12px;
		}
	.errorTxt{
		color:red;
		margin-left:191px;
		font-size: 12px;
	}
	#one {
		float: left;
    	width: 30px;
		margin-top: 5px;
	}
		
</style>

