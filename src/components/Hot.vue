<template>
  <div class="com-container">
    <!--地区销售排行图表-->
    <div class="com-chart" ref="hot_ref"></div>
    <!--左右两边的箭头    -->
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
    <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
    <span class="cat-name" :style="comStyle">{{catName}}</span>
  </div>
</template>

<script>
  export default {
    name: "Hot",
    data(){
      return {
        chartInstance:null,
        allDate:null,
        currentIndex:0,//当前所展示出的一级分类数据
        titleFontSize:0,//要在计算属性comStyle中使用它
      }
    },

    computed:{
      //设置一级分类名字
      catName(){
        if(!this.allData){
          return ''
        } else {
          return this.allData[this.currentIndex].name
        }
      },
      //分辨率的适配：span标签（箭头和一级分类名字）
      comStyle(){
        return {
          fontSize:this.titleFontSize+'px'
        }
      }
    },
    created() {
      this.$socket.registerCallBack('hotData',this.getData)
    },
    mounted(){
      this.initChart()
      // this.getData()
      this.$socket.send({
        action:'getData',
        socketType:'hotData',
        chartName:'hotproduct',
        value:''
      })
      window.addEventListener('resize',this.screenAdapter)
      //并非窗口变换才调用分辨率的适配，第一次要主动调用
      this.screenAdapter()
    },
    destroyed() {
      window.removeEventListener('resize', this.screenAdapter)
      this.$socket.unRegisterCallBack('hotData')
    },
    methods:{
      //获取数据三部曲
      //1.初始化
      initChart(){
        this.chartInstance = this.$echarts.init(this.$refs.hot_ref,'chalk')
        const initOption = {
          title:{
            text:'# 热销商品的占比',
            top:20,
            left:20
          },
          //图例的调整
          legend:{
            top:'15%',
            icon:'circle'
          },
          //hover的时候提示三级分类
          tooltip:{
            show:true,
            //决定公式提示下的文字内容
            formatter:arg => {
              //arg代表每个扇区对应的数据，arg.data下有配置给series的name和value
              // console.log(arg)

              //计算出所有三级分类的百分比，麻烦（直接照着敲）,最后合成指定的格式///////////////////////
              const thirdCategory = arg.data.children
              let total =0
              thirdCategory.forEach(item =>{
                total += item.value
              })
              let retStr = ''
              thirdCategory.forEach(item =>{
                retStr += `
                ${item.name}:${parseInt(item.value/total *100)+'%'}
                <br/>
                `
              })
              //////////////////////////////////////////////////////////////////////////////

              return retStr
            }
          },
          series:[
            {
              type:'pie',
              //文字显示,鼠标没有hover的时候不显示文字
              label:{
                show:false
              },
               //鼠标hover的时候显示文字
              emphasis:{
                label:{
                  show:true
                },
                //不好看的线不显示
                labelLine:{
                  show:false
                }
              }
            }
          ]
        }
        this.chartInstance.setOption(initOption)
      },
      //2.得到对象（得到的是Promise对象，所以用async）
      getData(ret){
        // const {data:ret}= await this.$http.get('hotproduct')
        this.allData = ret
        console.log(ret)
        this.updateChart()
      },
      //3.更新数据
      updateChart(){
        const legendData = this.allData[this.currentIndex].children.map(item =>{
          return item.name
        })
        //seriesData数组（map方法进行循环遍历）
        const seriesData = this.allData[this.currentIndex].children.map(item => {
          return {
            name:item.name,
            value:item.value,
            children:item.children
          }
        })
        const dataOption = {
          legend:{
            data:legendData
          },
          series:[
            {
              data:seriesData
            }
          ]

        }
        this.chartInstance.setOption(dataOption)
      },
      //分辨率的适配
      screenAdapter(){
        //因为要在计算属性comStyle用到titleFontSize,所以把它赋值给this
        this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100*3.6
        const adapterOption ={
          //标题的大小
          title:{
            textStyle:{
              fontSize:this.titleFontSize
            }
          },
          legend:{
            itemWidth:this.titleFontSize/2,
            itemHeight:this.titleFontSize/2,
            //图例之间的间隙
            itemGap:this.titleFontSize/2,
            textStyle:{
              fontSize: this.titleFontSize/2,
            }
          },
          //饼图的大小
          series:[
            {
              //通过控制半径来控制整个饼图的大小
              radius:this.titleFontSize * 4.5,
              //确定饼图的位置在正中央
              center:['50%','60%']
            }
          ]
        }
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
      },
      //点击切换一级类别
      toLeft(){
        this.currentIndex--
        if(this.currentIndex < 0){
          this.currentIndex = this.allData.length -1
        }
        this.updateChart()
      },
      toRight(){
        this.currentIndex++
        if(this.currentIndex>this.allData.length - 1){
          this.currentIndex = 0
        }
        this.updateChart()
      }
    }
  }
</script>

<style scoped>
.arr-left{
  /*绝对定位*/
  position:absolute;
  left:10%;
  top:50%;
  /*向上移一点*/
  transform:translateY(-50%);
  cursor: pointer;
  color: white;
}
.arr-right{
  position:absolute;
  right:10%;
  top:50%;
  /*向上移一点*/
  transform:translateY(-50%);
  cursor: pointer;
  color: white;
}
  .cat-name{
    position: absolute;
    left:80%;
    bottom: 20px;
    color: white;
  }
</style>