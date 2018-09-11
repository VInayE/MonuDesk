import Vue from 'vue'

export default {
 setMasterData (state,payload) {
    state.masterData = payload
 },
 setMonumentListData (state,payload) {
     state.monumentListData = payload
 },
 setMonumentDetailsData (state,payload) {
     state.monumentDetailsData = payload
 },
 setFrescoHeader (state,payload) {
     state.header = payload
 },
 setFrescoFooter (state,payload) {
     state.footer = payload
 }
}
