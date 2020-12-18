<template>
  <img :src="homeImg" :width="width" :height="height">
</template>

<script>
  export default {
    data() {
      return {
        homeImg: require('../../../../assets/home.jpg'),
        width:document.body.clientWidth,
        height:document.body.clientHeight-65
      };
    },
    mounted (){
      let self=this
      window.onresize = function(){
        self.width=document.body.clientWidth
        self.height=document.body.clientHeight-65
      }
    }
  }
</script>
