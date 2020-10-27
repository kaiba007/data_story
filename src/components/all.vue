<template>
  <div class="com-container">
    <!--地区销售排行图表-->
    <div class="com-chart" ref="rank_ref">

    </div>
  </div>
</template>

<script>
  export default {
    name: "all",
    data(){
      return {
        chartInstance:null,
        allDate:null
      }
    },
    created() {
      //在组件函数创建完成之后，进行回调函数的注册
      this.$socket.registerCallBack("#",this.getData)
    },
    mounted(){
      this.initChart()
      // this.getData()
      //发送数据给服务器，告诉服务器我需要数据
      this.$socket.send({
        action:'getData',
        socketType:'#',
        chartName:'#',
        value:''
      })
      window.addEventListener('resize',this.screenAdapter)
      //并非窗口变换才调用分辨率的适配，第一次要主动调用
      this.screenAdapter()
    },
    destroyed() {
      window.removeEventListener('resize', this.screenAdapter)
      //在组件销毁的时候，进行回调函数的取消
      this.$socket.unRegisterCallBack('#')
    },
    methods:{
      //获取数据三部曲
      //1.初始化
      initChart(){
        this.chartInstance = this.$echarts.init(this.$refs.rank_ref,'chalk')
        const initOption = {}
        this.chartInstance.setOption(initOption)
      },
      //2.得到对象（得到的是Promise对象，所以用async）
      getData(ret){
        // const {data:ret}= await this.$http.get('rank')
        this.allData = ret
        this.updateChart()
      },
      //3.更新数据
      updateChart(){
        const dataOption = {

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