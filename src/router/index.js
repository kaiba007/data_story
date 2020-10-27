import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from "../views/SellerPage";
import TrendPage from "../views/TrendPage";
import MapPage from "../views/MapPage";
import RankPage from "../views/RankPage";
import ScreenPage2 from '../views/ScreenPage2'
import Index from "../views/index/Index";
import test11 from "../views/test11";
import HotPage from "../views/HotPage";


Vue.use(VueRouter)

  const routes = [
    {
      path:'/text',component: test11
    },
    {
      path:'/',component: Index
    },
    // {
    //   path:'/screenpage',component: ScreenPage
    // },
    {
      path:'/sellerpage',component: SellerPage
    },
    {
      path:'/trendpage',component:TrendPage
    },
    {
      path:'/mappage',component:MapPage
    },
    {
      path:'/rankpage',component:RankPage
    },
    {
      path:'/hotpage',component:HotPage
    }

  ]

const router = new VueRouter({
  routes
})

export default router
