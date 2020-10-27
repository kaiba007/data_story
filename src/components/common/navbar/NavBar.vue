<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="index.html"><img src="~assets/img/logo.png" ></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#home">推荐</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#course">网站介绍</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#profolio">图表细分</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#team">网站作者</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">联系</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .navbar{
    text-transform: uppercase;
    font-weight:700;
    font-size:.9rem;
    letter-spacing: .1rem;
    background:rgb(0,0,0,.6)!important;
  }
  .navbar-brand img{
    height:3rem;
  }
  .navbar-brand li{
    padding-right:.7rem;
  }
  .navbar-dark .navbar-nav .nav-link{
    color:white;
    padding-top:.8rem;
  }
  .navbar-dark .navbar-nav .nav-link.active,
  .navbar-dark .navbar-nav .nav-link:hover {
    color: rgb(233, 230, 41);
  }

</style>