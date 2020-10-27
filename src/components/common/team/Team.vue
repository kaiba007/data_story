<template>
  <div id="team" class="offset">
    <div class="col-12 text-center">
      <h3 class="heading">网站作者</h3>
      <div class="heading-underline"></div>
    </div>
    <div class="row padding">
<!--      <div class="col-md-6">-->
<!--        <div class="card text-center">-->
<!--          <img class="card-img-top" src="~assets/img/team/team1.png">-->
<!--          <div class="card-body">-->
<!--            <h4>kaiba007</h4>-->
<!--            <p>hi,i am the boss !!</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-md-6">-->
<!--        <div class="card text-center">-->
<!--          <img class="card-img-top" src="~assets/img/team/team1.png">-->
<!--          <div class="card-body">-->
<!--            <h4>kaiba007</h4>-->
<!--            <p>hi,i am the boss !!</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="card  mb-3 " style="max-width: 540px;" >
        <div class="row no-gutters  ">
          <div class="col-md-4 ">
            <img src="~assets/img/team/jun2.png" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">郑燕君</h5>
              <p class="card-text">hi,i am the boss !!</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Team"
  }
</script>

<style scoped>
  /* Card */
  .offset:before{
    height:3.8rem;
    margin-top:-3.8rem;
    content:"";
    display:block;
  }
  .card{
    margin: 0px auto;
    /*margin: 2rem;*/
  }

</style>