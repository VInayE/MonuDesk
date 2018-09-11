import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import { API_URL, DOMAIN_URL, BASE_URL, ACT_API_URL, HOTEL_API_URL, HOTEL_API_KEY, COM_TENANT_ID, API_CART_URL, API_WHTSAPP_URL } from '../util/constants'
const apiInitialURL = API_URL
const apiInitialActURL = ACT_API_URL
const apiInitialHotelURL = HOTEL_API_URL
const apiHotelkey = HOTEL_API_KEY
const comTenantId = COM_TENANT_ID
const apiCartURL = API_CART_URL
const apiWhtsappURL = API_WHTSAPP_URL

export const fetchAutoCompleteAPI = (txt) => {
  return axios.get(`${apiInitialURL}/suggestions/${txt}`)
}

export const fetchMasterDataAPI = () => {
  return axios.get(`${apiInitialURL}/masterdata`)
}

export const fetchMonumentListDataAPI = () => {
  return axios.post(`${apiInitialURL}/monuments`, {})
}

export const fetchMonumentDetailsDataAPI = (monumentID) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/monuments/${monumentID}`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId }
  })
}

// export const checkMonumentAvailabilityAPI = (monumentID,visitDate,timeslot,startTime,endTime) => {
//     return axios({
//         method:'GET',
//         url:(`${apiInitialURL}/booking/${monumentID}/available?visitDate=${Date.parse(visitDate)}?timeSlot=${timeslot}?startTime=${startTime}?endTime=${endTime}`),
//         headers:{'com.yatra.tenant.header.tenantId':comTenantId}
//     })
// }

export const checkMonumentAvailabilityAPIPost = (monumentParams) => {
  return axios({
    method: 'POST',
    url: `${apiInitialURL}/booking/check-availablity`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' },
    data: monumentParams
  })
}

export const checkMonumentAvailabilityAPI = (monumentID, visitDate) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/booking/${monumentID}/available?visitDate=${Date.parse(visitDate)}`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId }
  })
}

export const findNearbyMonumentsAPI = (monumentID) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/monuments/${monumentID}/nearbymonuments`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId }
  })
}

export const hotelNearby = (cityName, checkIn, checkOut) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialHotelURL}/v1/xsell/default/city/${cityName}?checkInDate=${checkIn}&checkOutDate=${checkOut}&apiKey=${apiHotelkey}`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' }
  })
}

export const activityNearby = (hotelParams) => {
  return axios.post(`${ACT_API_URL}/`, hotelParams)
}

export const savePaxDetailsAPI = (superPNR, paxInfo) => {
  return axios({
    method: 'POST',
    url: `${apiInitialURL}/booking/${superPNR}/paxdetails`, paxInfo,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: paxInfo
  })
}

export const retrieveCartAPI = () => {
  return axios({
    method: 'POST',
    url: `${apiCartURL}/cart/retrieve-cart`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: {}
  })
}

export const saveAdditionalDetails = (cartId, itemId, itemDetails) => {
  return axios({
    method: 'POST',
    url: `${apiCartURL}/item/save-additional-details`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: { cartId: cartId, itemId: itemId, itemDetails: itemDetails }
  })
}

export const saveMonumentToCartAPI = (items, cartId) => {
  return axios({
    method: 'POST',
    url: `${apiCartURL}/item/save-items`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: { items, cartId }
  })
}

export const deleteMonumentFromCartAPI = (itemIds, cartID) => {
  return axios({
    method: 'POST',
    url: `${apiCartURL}/item/remove-items`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: { itemIds, cartID }
  })
}

export const cartItemCount = (cartId) => {
  return axios({
    method: 'POST',
    url: `${apiCartURL}/cart/cart-item-count`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: { cartId: cartId }
  })
}

export const getCartItems = (cartId) => {
  return axios({
    method: 'POST',
    url: `${apiCartURL}/item/get-items`,
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId },
    data: { cartId: cartId }
  })
}

// export const getBookingSummaryAPI = (superPNR) => {
//    return axios.get(`${apiInitialURL}/booking/${superPNR}/summary`)
// }
//Point to 172.16.1.144 fresco.ui.service for local

export const getFrescoHeader = () => {
  var frescoCall = process.env.NODE_ENV === 'production' ? 'https://www.yatra.com' : 'http://fresco.ui.service'
  var frescoCall = 'http://www.yatra.com';
    
  return axios.get(`${frescoCall}/fresco/home/service?name=HEADER&source=yatra_monuments`)
}

export const getFrescoFooter = () => {
  var frescoCall = process.env.NODE_ENV === 'production' ? 'https://www.yatra.com' : 'http://fresco.ui.service'
  var frescoCall = 'http://www.yatra.com';
  return axios.get(`${frescoCall}/fresco/home/service?name=FOOTER&dataType=hook&additional=false`)
}

export const getSecureHeader = () => {
  var frescoCall = process.env.NODE_ENV === 'production' ? 'https://secure.yatra.com' : 'http://fresco.ui.service'
  return axios.get(`${frescoCall}/fresco/home/service?name=PAYMENT_HEADER&isSecure=true&headerTitle=`)
}

export const getSecureFooter = () => {
  var frescoCall = process.env.NODE_ENV === 'production' ? 'https://secure.yatra.com' : 'http://fresco.ui.service'
  return axios.get(`${frescoCall}/fresco/home/service?name=FOOTER&dataType=hook&additional=false&isSecure=true`)
}

export const getReviewSummaryAPI = (superPNR) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/booking/` + superPNR + `/review-details`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' }
  })
}

export const confirmationDataAPI = (superPNR) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/booking/${superPNR}/book`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' }
  })
}

export const resendEmailAPI = (superPNR, emailId) => {
  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/notifications/send-email/${superPNR}/${emailId}`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' }
  })
}

export const resendSMSAPI = (superPNR, mobileNo) => {

  return axios({
    method: 'GET',
    url: (`${apiInitialURL}/notifications/send-sms/${superPNR}/${mobileNo}`),
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' }
  })
}

export const whtsappConsectUpdateAPI = (email, consent) => {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/setWhtsappAPI`,
    data: {
      'email': email,
      "additionalDetails": {
        "whatsapp_consent": consent
      }
    }
  })
}

export const whtsappConsectFetchAPIs = (userID) => {
  return axios({
    method: 'GET',
    headers: { 'com.yatra.tenant.header.tenantId': comTenantId, 'Content-type': 'application/json' },
    url: `/checkWhtsappAPI/${userID}/additionalInfo?key=whatsapp_consent`,
  })
}

export const recentSearch = (monumentName, monumentId,price) => {
  return axios.get(`/personalization/activity/save?monumentName=${monumentName}&monumentId=${monumentId}&price=${price}&expiryDate=12days`)
}