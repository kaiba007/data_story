<template>
  <div clasa="com-container">
    <div class="com-chart" ref="trend_ref">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Trend",
    data(){
      return {
        chartInstance : null,
        //从服务器中获取的所有数据
        allData : null
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
        //public的index.html已经引入了chalk主题的文件
        this.chartInstance = this.$echarts.init(this.$refs.trend_ref,'chalk')
        const initOption = {
          //控制坐标轴的大小
          grid:{
            left:'3%',
            top:'35%',
            right:'4%',
            bottom:'1%',
            //把坐标轴的文字控制在范围内，不会超出范围看不到
            containLabel:true,
          },
          //鼠标悬浮提示工具
          tooltip:{
            trigger:'axis'
          },
          //图例的位置和形状
          legend:{
            left:20,
            top:'15%',
            icon:'circle'
          },
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
      getData(ret ){
        // const {data:ret}= await this.$http.get('trend')
        console.log(ret)
        this.allData = ret
        this.updateChart()
      },
      //3.更新数据
      updateChart(){
        //提前准备好的数据：半透明的颜色值
        const colorArr1 = [
          'rgba(11,168,44,0.5)',
          'rgba(44,110,255,0.5)',
          'rgba(22,242,217,0.5)',
          'rgba(254,33,30,0.5)',
          'rgba(250,105,0,0.5)'
        ]
        //提前准备好的数据：全透明的颜色值
        const colorArr2 = [
          'rgba(11,168,44,0)',
          'rgba(44,110,255,0)',
          'rgba(22,242,217,0)',
          'rgba(254,33,30,0)',
          'rgba(250,105,0,0)'
        ]

        //x类目轴的数据
        const timeArr = this.allData.common.month
        //y轴的数据
        const valueArr = this.allData.map.data
        //seriesArr是5条分类轴下的数组：对valueArr进行循环遍历
        const seriesArr = valueArr.map((item,index) =>{
          return {
            name:item.name,
            type:'line',
            data: item.data,
            stack:'map',
            //设置面积的颜色渐变，（自带颜色不好看，要自己配置颜色的渐变）
            areaStyle:{
              color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                {
                  offset:0,
                  color:colorArr1[index]
                },//%0的颜色值
                {
                  offset:1,
                  color:colorArr2[index]
                }//100%的颜色值
              ])
            }
          }
        })
        //图例的数据
        const legendArr = valueArr.map(item =>{
          return item.name
        })
        const dataOption = {
          xAxis:{
            data:timeArr
          },
          legend:{
            data:legendArr
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