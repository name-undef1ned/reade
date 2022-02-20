<template>
  <div class="storehome-wraper">
   <searchbar></searchbar>
   <homecontent></homecontent>
   <card v-if="$store.state.storehome.cardvisible" :randomObjlist="randomObjlist"></card>
  </div>
</template>

<script>
import searchbar from '../../components/store/home/searchbar.vue'
import homecontent from '../../components/store/home/homecontent.vue'
import card from '../../components/store/home/children/card.vue'
import {home,home2} from '../../API/store'

export default {
name:'storehome',
components:{
    searchbar,
    homecontent,
    card
},
data() {
    return {
        randomObjlist:null
    }
},
mounted() {

    // const list=require('../../mock/bookShelf');
    // console.log(JSON.stringify(list));
//      home2().then(res=>{
//    console.log(typeof res.data);
//  }).catch(err=>{
//    console.log(err);
//  })



home().then(res=>{
    if(res.status==200){
        this.randomObjlist=res.data.random;
        this.$store.commit('storehome/SETHOMEBOOKLIST',res.data)
    }else{
        this.randomObjlist='获取失败！'
    }
})
},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.storehome-wraper{
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
}

</style>