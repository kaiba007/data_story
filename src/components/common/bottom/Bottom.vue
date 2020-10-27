<template>
  <div id="contact" class="offset">
    <footer>
      <div class="bottom col-md-5 text-center">
        <img src="~assets/img/logo.png" alt="">
        <p>nothing </p>
        <strong>Contact Info</strong>
        <p>888-888888 <br>1060028900@qq.com</p>
        <a href=""></a>
      </div>
      <hr class="socket">
<!--      &copy:-->
    </footer>
  </div>

</template>

<script>
  export default {
    name: "Bottom"
  }
</script>

<style scoped>
  /* Contact */
  .offset:before{
    height:3.8rem;
    margin-top:-3.8rem;
    content:"";
    display:block;
  }
  footer{
    background-color: #40474e;
    color:white;
    padding: 2rem 0 3rem;
    margin-top: 1rem;
  }
  footer img{
    height: 3rem;
    margin:1.5rem 0;
  }
  hr.socket{
    border-top: .2rem solid #666b71;
    width:100%;
  }
  .bottom{
    margin: 0px auto;
  }

</style>