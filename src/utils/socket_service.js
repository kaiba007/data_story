export default class SockService {
  // 1.单例
  static instance = null

  //在main.js中调用它不用加(),instance是get，不是函数
  static get Instance() {
    if (!this.instance) {
      this.instance = new SockService()
    }
    return this.instance
  }

  //2.定义连接服务器的方法
  //和服务端连接的socket对象(实例属性，方便其他方法的调用)
  ws = null

  //存储回调函数
  callBackMapping = {}

  //优化：处理bug（未connect完成就send数据）
  connected = false
  //记录send重试的次数
  sendRetryCount =0

  //重新连接尝试的次数
  connectRetryCount = 0

  connect() {
    //连接服务器
    if (!window.WebSocket) {
      return console.log('您浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    //连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务器成功了')
      this.connected = true
      this.connectRetryCount=0
    }
    //1.连接失败的事件
    //2.当连接成功之后，服务器关闭的情况
    this.ws.onclose = () => {
      console.log('连接服务器失败了')
      this.connected = false
      this.connectRetryCount++
      setTimeout(()=>{
        this.connect()
      },this.connectRetryCount*500)
    }
    //收到服务器消息的事件
    this.ws.onmessage = (msg) => {
      console.log('接受到服务器的数据了')
      //真正服务器发送来的数据在msg中的data字段
      // console.log(msg.data)
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      //判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {

        } else if (action === 'themeChange') {

        }
      }
    }

  }

  //回调函数的注册：把回调函数储存起来
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  //取消某一个回调函数
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }

  send(data){
    //判断此时此刻有没有连接成功
    if(this.connected){
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    }else {
      //隔一段时间,发送数据
      this.sendRetryCount ++
      setTimeout(()=>{
        this.send(data)
      },this.sendRetryCount*500)
    }
  }




















}