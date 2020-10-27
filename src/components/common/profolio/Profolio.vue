<template>
  <div id="profolio" class="offset">
    <div class="jumbotron container-fluid">
      <div class="col-12 text-center">
        <h3 class="heading">图表细分</h3>
        <div class="heading-underline"></div>
      </div>
      <div class="row no-padding">
        <div class="col-md-4">
          <div class="protfolio">
            <a  @click="toInfo('sellerpage')">
              <img src="~assets/img/portfolio/1.png" alt=""></a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="protfolio">
            <a @click="toInfo('hotpage')">
              <img src="~assets/img/portfolio/2.png" alt=""></a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="protfolio">
            <a @click="toInfo('sellerpage')">
              <img src="~assets/img/portfolio/3.png" alt=""></a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="protfolio">
            <a @click="toInfo('mappage')">
              <img src="~assets/img/portfolio/4.png" alt=""></a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="protfolio">
            <a @click="toInfo('trendpage')">
              <img src="~assets/img/portfolio/5.png" alt=""></a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="protfolio">
            <a @click="toInfo('rankpage')">
              <img src="~assets/img/portfolio/6.png" alt=""></a>
          </div>
        </div>
      </div>

      <div class="narrow text-center">
        <div class="col-12">
          <p class="lead">想要看更多的图表吗 </p>
          <a class="btn btn-secondary btn-md"  οnclick="" target="_blank">点我</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profolio",
    methods:{
      toInfo(Topage){
        this.$router.push('/'+Topage)
      //   this.$router.push({
      //     path: ''+Topage,
      //     name: 'mallList',
      //     query: {
      //       mallCode: 'M000989'
      //     }
      //   })
      },
    },

  }
</script>

<style scoped>
  .jumbotron{
    border-radius:0;
    padding:3rem 0 2rem;
    margin-bottom: 0;
  }
  h3.heading{
    font-size:1.9rem;
    font-weight:700;
    text-transform: uppercase;
    padding-bottom:1.9rem;
  }
  .heading-underline{
    width:3rem;
    height:.2rem;
    background-color: rgb(92, 123, 163);
    margin: 0 auto 2rem;
  }
  /* Profolio */
  .protfolio img{
    max-width:100%;
    transition: transfrom .5s ease;
  }
  .row.no-padding [class*=col-]{
    padding :0;
  }
  .protfolio img:hover{
    transform: scale(1.1);
    cursor:zoom-in;
  }
  .protfolio{
    overflow: hidden;
  }


  .btn-secondary {
    border-width: medium;
    border-radius: 0;
    padding: .6rem 1.2rem;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin: 1rem;
    border-color: #1EBBA3;
    background-color: #1EBBA3;
    color: white;
  }
  .btn-secondary:hover,
  .btn-secondary:focus {
    border-color: #189582;
    background-color: #189582;
    color: white;
  }
</style>