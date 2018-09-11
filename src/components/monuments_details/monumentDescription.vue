<template>
   <div class="monument-description wrapper-width clearfix bdr">
        <div class="left-section">
          <div class="block-heading" v-if="showDescription">
              <div class="block-title">
                 <h2 v-html="monument_name"></h2>
              </div>
              <div class="txt-desc" v-if="!showfullDescription" v-html="convertIntoHTML(description).substring(0, readMoreTextLength)">
              </div>
              <div class="txt-desc" v-if="showfullDescription" v-html="convertIntoHTML(description)">
              </div>
              <div class="readMoreText" v-if="!showfullDescription" @click="showfullDescription = true">{{convertIntoHTML(description).length > readMoreTextLength ? 'READ MORE' : ''}}</div>
              <div class="readMoreText" v-if="showfullDescription" @click="showfullDescription = false">{{convertIntoHTML(description).length > readMoreTextLength ? 'READ LESS' : ''}}</div>
          </div>
          <div class="block-heading" v-if="monument_history != '' && showDescription">
              <div class="block-title">
                  <h2>Outstanding Universal Value</h2>
              </div>
              <div class="txt-desc" v-if="!showFullHistory" v-html="convertIntoHTML(monument_history).substring(0, readMoreTextLength)"></div>
              <div class="txt-desc" v-if="showFullHistory" v-html="convertIntoHTML(monument_history)"></div>
              <div  v-if="!showFullHistory" @click="showFullHistory = true" class="readMoreText">{{convertIntoHTML(monument_history).length > readMoreTextLength ? 'READ MORE' : ''}}</div>    
               <div  v-if="showFullHistory" @click="showFullHistory = false" class="readMoreText">{{convertIntoHTML(monument_history).length > readMoreTextLength ? 'READ LESS' : ''}}</div>    
          </div>
    </div>
  </div>     
</template>
<script>
  export default {
    props : {
      monumentDescription :{
        type :String,
        required:true
      },
      monumentName :{
       type:String,
       required:true 
      },
      monumentHistory :{
        type:String,
        required :true 
      }
    },
    name : "monument-description",
    data () {
      return {
        readMore : false,  
        showDescription : false,
        description : '',
        monument_name:'',
        monument_history : '',
        readMoreTextLength : 1000,
        showfullDescription : false,
        showFullHistory : false
      }  
    },
    created () {
      this.description = this.monumentDescription
      this.monument_name = 'About ' + this.monumentName
      this.monument_history = this.monumentHistory
    },
    methods :{
      convertIntoHTML(txt){
        var t =  new DOMParser().parseFromString(txt,'text/html').body
        return t.innerText
      } 
    },
    mounted (){
      this.showDescription = true
    }
  }
</script>
<style scoped lang="scss">
  .readMoreText{
    cursor:pointer;  
    color: #ea2330;
    font-weight: bold;
  }

  .left-section{
    
    .txt-desc{
        text-align: left;
        width: 70%;
        margin: 20px 0;
    }
  }
</style>

