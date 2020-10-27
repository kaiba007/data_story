<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref">

    </div>
  </div>
</template>

<script>
  export default {
    name: "Rank",
    data(){
      return {
        chartInstance:null,
        allDate:null
      }
    },
    created() {
      //在组件函数创建完成之后，进行回调函数的注册
      this.$socket.registerCallBack("rankData",this.getData)
    },
    mounted(){
      this.initChart()
      // this.getData()
      //发送数据给服务器，告诉服务器我需要数据
      this.$socket.send({
        action:'getData',
        socketType:'rankData',
        chartName:'rank',
        value:''
      })
      window.addEventListener('resize',this.screenAdapter)
      //并非窗口变换才调用分辨率的适配，第一次要主动调用
      this.screenAdapter()
    },
    destroyed() {
      window.removeEventListener('resize', this.screenAdapter)
      this.$socket.unRegisterCallBack('rankData')

    },
    methods:{
      //获取数据三部曲
      //1.初始化
      initChart(){
        this.chartInstance = this.$echarts.init(this.$refs.rank_ref,'chalk')
        const initOption = {
          title:{
            text:'# 地区销售排行',
            left:20,
            top:20
          },
          //坐标轴的调整
          grid:{
            top:'40%',
            left:'5%',
            right:'5%',
            bottom:'5%',
            //坐标轴的大小有没有包含坐标轴上的文字
            containLabel:true,
          },
          //提示文字
          tooltip:{
            show:true
          },
          xAxis: {
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              type:'bar'
            }
          ]
        }
        this.chartInstance.setOption(initOption)
      },
      //2.得到对象（得到的是Promise对象，所以用async）
      getData(ret){
        // const {data:ret}= await this.$http.get('rank')
        this.allData = ret
        //排序从大到小
        this.allData.sort((a,b)=>{
          return b.value - a.value
        })
        this.updateChart()
      },
      //3.更新数据
      updateChart(){
        const colorArr=[
            ['#0BA82C','#4FF778'],
            ['#2E72BF','#23E5E5'],
            ['#5052EE','#AB6EE5']
        ]
        //所有省份所形成的数组
        const provinceArr = this.allData.map(item =>{
          return item.name
        })
        //所有省份对应的销售金额
        const valueArr = this.allData.map(item =>{
          return item.value
        })
        const dataOption = {
          xAxis:{
            data:provinceArr
          },
          legend:{

          },
          series:[
            {
              data:valueArr,
            //  不同值产生不同的颜色(渐变)
              itemStyle:{
                color:arg=>{
                  let targetColorArr = null
                  if(arg.value>300){
                    targetColorArr=colorArr[0]
                  } else if(arg.value >200){
                    targetColorArr=colorArr[1]
                  }else{
                    targetColorArr=colorArr[2]
                  }
                  return new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                    //百分之0状态下的颜色值
                    {
                      offset:0,
                      color:targetColorArr[0]
                    },
                    //  百分之1状态下的颜色值
                    {
                      offset:1,
                      color:targetColorArr[1]
                    }
                  ])
                }
              }
            }
          ]
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