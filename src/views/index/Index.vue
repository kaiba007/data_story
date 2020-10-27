<template >
  <div data-spy="scroll" data-target="#navbar-example2" >
    <div id="home">
      <navbar></navbar>
      <silders></silders>
    </div>
    <course></course>
    <profolio></profolio>
    <team></team>
    <bottom></bottom>
  </div>

</template>

<script>
  import 'assets/css/fixed.css'
  import NavBar from "components/common/navbar/NavBar";
  import Sliders from "components/common/slides/Sliders";
  import Course from "components/common/course/Course";
  import Profolio from "components/common/profolio/Profolio";
  import Team from "components/common/team/Team";
  import Bottom from "components/common/bottom/Bottom";
  export default {
    name: "Index",
    components:{
      navbar:NavBar,
      silders:Sliders,
      course:Course,
      profolio:Profolio,
      team:Team,
      bottom:Bottom,
    },
    methods: {
      scrollMethod() {
        console.log('滚动监听')
        console.log(document.documentElement.scrollTop)
      }
    },
    mounted() {
      // 挂载时，添加监听滚动事件，然后用 scrollMethod 方法进行处理
      window.addEventListener('scroll',this.scrollMethod)

      document.querySelector('body').setAttribute("position","relative")
      document.querySelector('body').setAttribute("data-spy","scroll")
      document.querySelector('body').setAttribute("data-target","#navbarResponsive")
    },
    destroyed() {
      // 销毁时，删除监听滚动事件，否则其他.vue文件也会受影响
      window.removeEventListener('scroll',this.scrollMethod)
    }
    // beforeCreate () {
    //
    // }
  }


</script>

<style scoped>
  @import url('https://fonts.font.im/css?family=Lato:400,700');
  body{
    overflow-x: hidden;
    font-family: 'Lato', sans-serif ;
    color:black;
    position: relative;
  }
</style>