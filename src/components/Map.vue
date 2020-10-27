<template>
<!--  添加监听事件：当双击省份地图的时候返回原始大地图-->
  <div class="com-container" @dblclick="reverMap">
<!--    地图组件-->
    <div class="com-chart" ref="map_ref">

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getProvinceMapInfo} from "../utils/map_utils";

  export default {
    name: "Map",
    data(){
      return {
        chartInstance:null,
        allData : null,
      //  对地图的数据进行缓存，防止重复加载数据
        mapData:{}
      }
    },
    created() {
      this.$socket.registerCallBack('mapData',this.getData)
    },
    mounted() {
      //页面打开时就执行
      this.initChart()
      // this.getData()
      //发送数据给服务器，告诉服务器我需要数据
      this.$socket.send({
        action:'getData',
        socketType:'mapData',
        chartName:'map',
        value:''
      })
      window.addEventListener('resize', this.screenAdapter)
      // 在页面加载完成的时候, 主动进行屏幕的适配
      this.screenAdapter()
    },
    destroyed() {
      // 在组件销毁的时候, 需要将监听器取消掉
      window.removeEventListener('resize', this.screenAdapter)
      this.$socket.unRegisterCallBack('mapData')
    },
    methods: {
      //1.初始化echartInstance对象
      async initChart() {
        //选择主题chalk
        this.chartInstance = this.$echarts.init(this.$refs.map_ref,'chalk')
        //获取中国地图的矢量数据
        //因为获取的数据在项目内，不是位于KOA2的后台，所以不用this.$http
        //获取路径 http://localhost:8999/static/map/china.json,直接用axios(得到的是Promise对象)
        const ret = await axios.get('http://localhost:8999/static/map/china.json')
        //把地图的矢量数据注册给全局的echarts，再进行geo的配置
        this.$echarts.registerMap('china',ret.data)
        //对图标初始化配置的控制
        const initOption = {
          title:{
            text:'# 商家分布',
            left:20,
            top:20
          },
          //配置geo(地图)
          geo:{
            type:'map',
            map:'china',
            top:'5%',
            bottom:'5%',
            itemStyle:{
              //地图的颜色
              areaColor:'#2E72BF',
              //省份之间间隔的线 颜色
              boderColer:'#333'
            }
          },
          legend:{
            //图例的位置：左下方
            left:'5%',
            bottom:'5%',
            //图例的排布：垂直(默认水平)
            orient:'vertical'
          }
        }
        this.chartInstance.setOption(initOption)
        //添加点击地图事件(点击后切换图表为具体的省份信息):arg事件处理函数的参数，包含了点击的具体省份的信息
        this.chartInstance.on('click',async (arg)=>{
        //  arg.name得到的是点击省份的名字，是中文，而我们获取的数据是拼音(用工具：map_utils)
        //  得到省份的拼音和矢量数据的路径
          const provinceInfo = getProvinceMapInfo(arg.name)
        //  得到这个省份的地图矢量数据
          if(!this.mapData[provinceInfo.key]){
            const ret= await axios.get('http://localhost:8999'+provinceInfo.path)
            // console.log(ret)
            this.mapData[provinceInfo.key] = ret.data
            //把地图的矢量数据注册给全局的echarts,别名为省份的拼音即provinInfo.key
            this.$echarts.registerMap(provinceInfo.key,ret.data)
          }

          //切换图表
          const changeOption = {
            geo:{
              map:provinceInfo.key
            }
          }
          this.chartInstance.setOption(changeOption)
        })

      },
      //2.得到对象（得到的是Promise对象，所以用async）
      getData(ret){
        //后台获取地图的散点数据
        // const {data:ret}= await this.$http.get('map')
        // console.log(ret)
        this.allData = ret
        this.updateChart()
      },
      //3.更新数据
      updateChart() {
        //处理图表需要的数据
        //获取图例的数据
        const legendArr = this.allData.map(item =>{
          return item.name
        })
        //  return 的这个对象代表的是一个类别下的所有散点数据
        const seriesArr = this.allData.map(item =>{
          return {
            //涟漪动画的效果
            type:'effectScatter',
            //散点涟漪的效果
            rippleEffect:{
              //涟漪的效果加强：变大
              scale:5,
              //涟漪：空心效果
              brushType:'stroke'
            },
            name:item.name,
            data:item.children,
            //如果要在地图中显示散点数据，所以我们需要给散点的图标增加一个配置，coordinateSystem:geo
            coordinateSystem:'geo'
          }
        })
        const dataOption ={
          //显示图例
          legend:{
            data:legendArr
          },
          series:seriesArr
        }
        this.chartInstance.setOption(dataOption)
      },
      //分辨率的适配
      screenAdapter(){
        //设置标题的大小与图表容器的大小相匹配
        const titleFontSize = this.$refs.map_ref.offsetWidth / 100*3.6
        const adapterOption ={
          title:{
            textStyle:{
              fontSize:titleFontSize
            }
          },
          legend:{
            itemWidth:titleFontSize/2,
            itemHeight:titleFontSize/2,
            //图例之间的间隔
            itemGap:titleFontSize/2,
            textStyle:{
              fontSize:titleFontSize/2
            }
          }
        }
        this.chartInstance.setOption(adapterOption)
        //resize方法帮助图表自动计算外层的容器大小，从而控制自身图表的效果
        this.chartInstance.resize()
      },
      //双击切回中国地图
      reverMap(){
        const reverOption ={
          geo:{
            map:'china'
          }
        }
        this.chartInstance.setOption(reverOption)
      }
    }
  }
</script>

<style scoped>

</style>











