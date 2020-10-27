<template>
  <nav id="navbar-example2" class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link" href="#fat">@fat</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#mdo">@mdo</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#one">one</a>
          <a class="dropdown-item" href="#two">two</a>
          <div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#three">three</a>
        </div>
      </li>
    </ul>
  </nav>
  <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
    <h4 id="fat">@fat</h4>
    <p>...</p>
    <h4 id="mdo">@mdo</h4>
    <p>...</p>
    <h4 id="one">one</h4>
    <p>...</p>
    <h4 id="two">two</h4>
    <p>...</p>
    <h4 id="three">three</h4>
    <p>...</p>
  </div>
</template>
<script>
  export default {
    name: "text",
    data() {
      return {
        activeIndex:0,
        linkData:[{
          name:'首页',
          path:'/'
        },{
          name:'业务',
          path:'/service'
        },{
          name:'业务',
          path:'/service'
        },{
          name:'资源',
          path:'/resource'
        },{
          name:'关于我们',
          path:'/aboutus'
        },
        ]
      }
    },
    watch: {
      activeIndex:{
        deep:true,
        handler(val,oval){
          document.getElementById('navbar-links-'+val).className += 'active';
          document.getElementById('navbar-links-'+oval).classList.remove('active')
        }
      }
    },
    mounted() {
      document.getElementById('navbar-links-0').className += 'active';
    },
    methods: {
      handleSelect(key,index) {
        this.activeIndex=index
        this.$router.push({path: key})
      }
    }
  }
</script>
<style  scoped>
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
  }

  .nav {
    padding-top: 2rem;
    float: right;
    font-size: 18px;
    color: #AAAAAA;
  }
  .enterprise-logo-title{
    display: flex;flex-wrap: wrap
  }

  .nav-link:focus {
    border-top: 3px solid #631CA0;
  }

  .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
    color: #631CA0;
    background-color: transparent;
  }

  .nav-bg {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .enterprise-img-black {
    width: 100px;
    height: 100px
  }

  .enterprise-img-white {
    display: none;
  }

  .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {
    background-color: #631CA0;
  }

  .navbar-inverse .navbar-toggle {
    border-color: white;
    width: 44px;
  }

  .enterprise-box{
    margin-top: 3rem
  }
  .zhTitle {
    font-family: 华文中宋;
    font-size: 28px;
    color: #333333
  }

  .enTitle {
    font-family: 微软雅黑;
    font-size: 12px;
    color: rgba(170, 170, 170, 0.8)
  }

  @media (min-width: 768px) {
    .navbar {
      border-radius: 0px;
    }
  }

  @media (max-width: 768px) {
    .enterprise-img-black {
      display: none;
    }
    .nav-bg {
      background-color: #631CA0;
    }
    .enterprise-img-white {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .enterprise-title {
      font-size: 16px !important;
      color: white !important;
    }
    .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
      color: red;
      background-color: transparent;
    }
    .nav {
      float: left;
    }
    .zhTitle {
      font-family: 华文中宋;
      font-size: 16px;
      color: white;
    }
    .enTitle{
      font-family: 微软雅黑;
      font-size: 8px;
      color: rgba(170, 170, 170, 0.8)
    }
    .enterprise-box{
      margin-top: 1rem
    }
  }
  @media (max-width: 768px) {
    .enterprise-img-black {
      display: none;
    }
    .nav-bg {
      background-color: #631CA0;
    }
    .enterprise-img-white {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .enterprise-title {
      font-size: 16px !important;
      color: white !important;
    }
    .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
      color: white;
      background-color: transparent;
    }
    .nav {
      float: left;
    }
    .zhTitle {
      font-family: 华文中宋;
      font-size: 16px;
      color: white;
    }
    .enTitle{
      font-family: 微软雅黑;
      font-size: 8px;
      color: rgba(170, 170, 170, 0.8)
    }
    .enterprise-box{
      margin-top: 1rem
    }
    .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {
      color: white !important;
      background-color: #631CA0;
      /*border-top: 3px solid #631CA0;*/
    }
  }
  .navbar {
    margin-bottom: 0px;
    border: none;
  }

  nav {
    margin: 0;
    border-radius: 0;
  }

  .enterprise-title {
    font-family: 华文中宋;
    font-size: 28px;
    color: #333333;
    margin-right: 1rem;
    line-height: inherit;
    display: inline-block;
    text-decoration: none;
  }
  .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {
    color: #631CA0;
    background-color: rgba(255,255,255,0);
    border-top: 3px solid #631CA0;
  }
</style>