<template>
  <div>
    <div style="background:#ECECEC; padding:30px">
      <a-card title="giao里giao气" :bordered="false" style="width: 100%">
        <div v-for="(item,index) in content" :key="index">
          <p>{{ item }}</p>
        </div>
      </a-card>
    </div>
    <a-row style="margin-top: 30px;margin-left: 30px">
      <a-col :span="12">
        <a-input placeholder="请输入消息内容" v-model="message" :allowClear="true"></a-input>
      </a-col>
      <a-col :span="12">
        <a-button type="primary" @click="send" style="margin-left: 30px">
          发送
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        path: 'ws:/192.168.3.26:9001/netty/ws',
        socket: '',
        content: [],
        message: ''
      }
    },
    mounted () {
      // 初始化
      this.init()
    },
    methods: {
      init: function () {
        if (typeof (WebSocket) === 'undefined') {
          alert('您的浏览器不支持socket')
        } else {
          // 实例化socket
          this.socket = new WebSocket(this.path)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        }
      },
      open: function () {
        console.log('socket连接成功')
      },
      error: function () {
        console.log('连接错误')
      },
      getMessage: function (msg) {
        // console.log(msg.data)
        this.content.push(msg.data)
      },
      send: function () {
        this.socket.send(this.message)
        this.message = ''
      },
      close: function () {
        console.log('socket已经关闭')
      }
    },
    destroyed () {
      // 销毁监听
      this.socket.onclose = this.close
    }
  }
</script>

<style>

</style>
