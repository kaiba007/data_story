<template>
  <div id="slides" class="carousel slide" data-ride="carousel" data-interval="7000">
    <ol class="carousel-indicators">
      <li data-target="#slides" data-slide-to="0" class="actove"></li>
      <li data-target="#slides" data-slide-to="1" ></li>
      <li data-target="#slides" data-slide-to="2" ></li>

    </ol>
    <div class="carousel-inner" role="listbox">
      <!-- slide 1 -->
      <div class="carousel-item active" :style="{backgroundImage:'url(' + second+ ')'}">
        <div class="carousel-caption text-center">
          <h1>Welcom to </h1>
          <h2>Interesting data </h2>
          <a class="btn btn-outline-light btn-lg" href="#course">Get Started</a>
        </div>

      </div>
      <div class="carousel-item " :style="{backgroundImage:'url(' + third  + ')'}">
      </div>
      <div class="carousel-item " :style="{backgroundImage:'url(' + first + ')'}">
      </div>
    </div>

    <a class="carousel-control-prev" href="#slides" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hiddle="true"></span>
    </a>
    <a class="carousel-control-next" href="#slides" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hiddle="true"></span>
    </a>
  </div>
</template>

<script>
  import first from 'assets/img/1.png'
  import second from 'assets/img/2.png'
  import third from 'assets/img/3.png'

  export default {
    name: "Sliders",
    data () {
      return {
        first,
        second,
        third
      }
    }
  }
</script>

<style scoped>
  /* Slider */
  .carousel-item{
    height:100vh;
  }
  .carousel-caption{
    position: absolute;
    top:38%;
    text-transform: uppercase;
    width:100%;
    left:0;
    right:0;
  }
  .carousel-caption h1{
    font-size:3.8rem;
    font-weight:700;
    letter-spacing: .3rem;
    text-shadow: .1rem .1rem .8rem black;
    padding-bottom:1rem;
  }
  .carousel-caption h3{
    font-size:2rem;
    text-shadow: .1rem .1rem .5rem black;
    padding-bottom: 1.6rem;
  }
  .btn-lg{
    border-width:medium;
    border-radius: 0;
    font-size:1.1rem;
  }
</style>