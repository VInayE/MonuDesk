import Vue from 'vue'
import {getFrescoHeader,getFrescoFooter} from '../api/api'
export default {
 getFrescoHeaderFooter :(context) => {
   return Promise.all([getFrescoHeader(),getFrescoFooter()]).then(values => { 
        context.commit('setFrescoHeader', values[0].body.toString())
        context.commit('setFrescoFooter', values[1].body.toString())
    })
 },
}




