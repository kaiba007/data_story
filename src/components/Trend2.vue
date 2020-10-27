<template>
  <div class="com-container">
    <!--销量趋势排行图表-->
    <div class="com-chart" ref="trend_ref">

    </div>
  </div>
</template>

<script>
  export default {
    name: "Trend2",
    data(){
      return {
        chartInstance:null,
        allDate:null
      }
    },
    created() {
      //在组件函数创建完成之后，进行回调函数的注册
      this.$socket.registerCallBack("trendData",this.getData)
    },
    mounted(){
      this.initChart()
      // this.getData()
      //发送数据给服务器，告诉服务器我需要数据
      this.$socket.send({
        action:'getData',
        socketType:'trendData',
        chartName:'trend',
        value:''
      })
      window.addEventListener('resize',this.screenAdapter)
      //并非窗口变换才调用分辨率的适配，第一次要主动调用
      this.screenAdapter()
    },
    destroyed() {
      window.removeEventListener('resize', this.screenAdapter)
      //在组件销毁的时候，进行回调函数的取消
      this.$socket.unRegisterCallBack('trendData')
    },
    methods:{
      //获取数据三部曲
      //1.初始化
      initChart(){
        this.chartInstance = this.$echarts.init(this.$refs.trend_ref,'chalk')
        const initOption = {
          xAxis:{
            type:'category',
            //让1月从0开始
            boundaryGap:false
          },
          yAxis:{
            type:'value'
          }
        }
        this.chartInstance.setOption(initOption)
      },
      //2.得到对象（得到的是Promise对象，所以用async）
      getData(ret){
        // const {data:ret}= await this.$http.get('rank')
        this.allData = ret
        console.log(ret)
        this.updateChart()
      },
      //3.更新数据
      updateChart(){
        //x类目轴的数据
        const timeArr = this.allData.common.month
        //y轴的数据
        const valueArr = this.allData.map.data
        const seriesArr = valueArr.map(item=>{
          return {
            type:'line',
            data: item.data,
            stack:'map',
          }
        })
        const dataOption = {
          xAxis:{
            data:timeArr
          },
          series:seriesArr
        }
        this.chartInstance.setOption(dataOption)
      },
      //分辨率的适配
      screenAdapter(){
        const adapterOption ={}
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
      }
    }
  }
</script>

<style scoped>

</style>