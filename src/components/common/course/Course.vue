<template>
  <div id="course" class="offset">
    <div class="col-12 narrow text-center">
      <h1>网站介绍</h1>
      <p class="lead">目前只有电商平台数据的可视化，未来将开发更多与数据可视化相关的有趣的模块</p>
      <a class="btn btn-secondary btn-md" href="https://w3newbie.com/courses" target="_blank">...</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Course"
  }
</script>

<style scoped>
  /*============= COURSE SECTION =============*/
  .offset:before{
    height:3.8rem;
    margin-top:-3.8rem;
    content:"";
    display:block;
  }
  .narrow {
    width: 75%;
    margin: 0 auto;
    padding-top: 2rem;
  }
  .btn-md {
    border-width: medium;
    border-radius: 0;
    padding: .6rem 1.1rem;
    text-transform: uppercase;
    margin: 1rem;
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