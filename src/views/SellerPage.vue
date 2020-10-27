<template>
  <div class="com-page">
    <seller></seller>
  </div>
</template>

<script>
  import Seller from 'components/Seller.vue'
  export default {
    name: "SellerPage",
    data(){
      return {}
    },
    components:{
      seller:Seller
    }
  }
</script>

<style scoped>

</style>