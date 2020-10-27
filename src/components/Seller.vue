<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref">

    </div>
  </div>
</template>

<script>
  export default {
    name: "Seller",
    data(){
      return {
        chartInstance:null,
        allData : null,
        currentPage :1,
        totalPage:0,
        timeId:null
      }
    },
    created() {
      this.$socket.registerCallBack('sellerData',this.getData)
    },
    mounted() {
      //页面打开时就执行
      this.initChart()
      // this.getData()
      //发送数据给服务器，告诉服务器我需要数据
      this.$socket.send({
        action:'getData',
        socketType:'sellerData',
        chartName:'seller',
        value:''
      })
      window.addEventListener('resize', this.screenAdapter)
      // 在页面加载完成的时候, 主动进行屏幕的适配
      this.screenAdapter()
    },
    destroyed() {
      clearInterval(this.timeId)
      // 在组件销毁的时候, 需要将监听器取消掉
      window.removeEventListener('resize', this.screenAdapter)
      this.$socket.unRegisterCallBack('sellerData')
    },
    methods:{
      //1.初始化echartInstance对象
      initChart(){
        this.chartInstance=this.$echarts.init(this.$refs.seller_ref,'chalk')
        //对图标初始化配置的控制
        const initOption={
          title:{
            text:'#商家销售统计',
            left:20,
            top:20,
            grid:{
              top:'20%',
              left:'30%',
              right:'6%',
              bottom :'3%',
              //直角坐标轴的调整不包括xy轴上的文字，如果要，设置下面的属性为true
              containLabel:true
            }
          },
          xAxis:{
            type:'value'
          },
          yAxis:{
            type:'category',
            // data:sellerNames
          },
          //鼠标移动到柱时的文字提示+背景色：透明灰
          tooltip:{
            trigger:'axis',
            axisPointer:{
              type:'line',
              //背景色层级最低
              z:0,
              lineStyle:{
                color:'#203443'
              }
            }
          },
          series:[
            {
              type:'bar',
              //文字的展示
              label:{
                show:true,
                //文字默认在柱内部中间
                position :'right',
                textStyle:{
                  color:'white'
                }
              },
              //柱的展示
              itemStyle:{
                // barBorderRadius:[0,33,33,0],
                //指明颜色渐变的方向（0，0)->(1,0)
                //指明不同百分比之下的颜色值
                color: new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                  //百分之0状态下的颜色值
                  {
                    offset:0,
                    color:'#5052EE'
                  },
                  //  百分之1状态下的颜色值
                  {
                    offset:1,
                    color:'#AB6EE5'
                  }
                ])
              }
            }
          ]
        }
        this.chartInstance.setOption(initOption)
        //对鼠标事件进行监听
        this.chartInstance.on('mouseover' ,()=>{
          clearInterval(this.timeId)
        })
        this.chartInstance.on('mouseout', ()=>{
          this.startInterval()
        })
      },
      getData(ret){
        //{data:ret}对数据进行重构赋值给ret（只要其中一部分数据）
        // const {data:ret} =await this.$http.get('seller')
        console.log(ret)
        this.allData = ret
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!为啥  #对数据进行排序
        this.allData.sort((a,b) =>{
          return a.value - b.value
        })
        // #计算总页数（每5个数据显示一页）
        this.totalPage = this.allData.length %5 === 0? this.allData.length/5 :this.allData.length/5 +1
        this.updateChart()
        //  启动定时器
        this.startInterval()
      },
      //2。
      updateChart(){
        const start = (this.currentPage - 1)*5
        const end =(this.currentPage)*5
        const showData =this.allData.slice(start, end)
        const sellerNames = showData.map((item) =>{
          return item.name
        })
        const sellerValues = showData.map((item) =>{
          return item.value
        })
        const dataOption ={
          yAxis:{
            data:sellerNames
          },
          series:[
            {
              data:sellerValues
            }
          ]
        }
        this.chartInstance.setOption(dataOption)
      },
      startInterval (){
        //编程的小技巧
        if(this.timeId){
          clearInterval(this.timeId)
        }
         this.timeId = setInterval (() =>{
          this.currentPage ++
          if(this.currentPage > this.totalPage){
            this.currentPage = 1
          }
          this.updateChart()
        },3000)
      },
      screenAdapter(){
        //数值是老师实验觉得最合适的
        const titleFontSize=this.$refs.seller_ref.offsetWidth /100 *3.6
        const adapterOption ={
          title:{
            textStyle:{
              fontsize:titleFontSize
            }
          },
          //鼠标移动到柱时的文字提示+背景色：透明灰
          tooltip:{
            axisPointer: {
              lineStyle: {
                width: titleFontSize
              }
            }
          },
          series:[
            {
              barWidth:titleFontSize,
              //柱的展示
              itemStyle:{
                barBorderRadius:[0,titleFontSize/2,titleFontSize/2,0],
              }
            }
          ]
        }
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
      }
    },
  }
</script>

<style scoped>

</style>