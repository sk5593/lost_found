<template>
  <div class="add">
    <nav-Bar
      title="发帖"
    />
    <van-field
      :cell-border=false
      class="add-textarea"
      focus
      fixed
      type="textarea"
      :value="fieldValue"
      @change="onChange"
      placeholder="来吧,尽情发挥吧..."
    />
    <van-cell>
      <van-uploader :file-list="fileList" @afterRead="afterRead" />
    </van-cell>
    <van-cell>
      <van-button @click="add" type="info" custom-class="add-button">发布</van-button>
    </van-cell>
    <van-overlay :show="overlayShow" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant/toast/toast'
  export default {
    data () {
      return {
        fileList: [],
        overlayShow: false,
        fieldValue: ''
      }
    },
    methods: {
      afterRead (event) {
        console.log(event)
        const { file } = event.mp.detail
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
          url: process.env.API_BASE_URL + '/upload', // 仅为示例，非真实的接口地址
          filePath: file.path,
          name: 'file',
          // formData: { user: 'test' },
          success: (res) => {
            const jsonObj = JSON.parse(res.data)
            let imgObj = {
              url: jsonObj.object,
              name: jsonObj.object
            }
            this.fileList.push(imgObj)
          }
        })
      },
      checkLogin () {
        wx.getStorage({
          key: 'session_key',
          fail: (res) => {
            if (res.errMsg === 'getStorage:fail data not found') {
              //  用户退出登录或者没有登录
              this.overlayShow = true
              wx.navigateTo({
                url: '/pages/login/main'
              })
            }
          },
          success: (res) => {
            this.overlayShow = false
          }
        })
      },
      add () {
        this.$fly.post('/add', {
          content: this.fieldValue,
          imgArr: this.fileList
        }).then((res) => {
          if (res.data.code === 200) {
            this.fieldValue = ''
            this.fileList = []
            Toast({
              type: 'success',
              message: '发布成功',
              onClose: () => {
                wx.reLaunch({
                  url: '../index/main?session=' + wx.getStorageSync('session_key')
                })
              }
            })
          }
        })
      },
      onChange (event) {
        // event.detail 为当前输入的值
        this.fieldValue = event.mp.detail
      }
    },
    mounted () {
      this.checkLogin()
    },
    onShow () {
      // navigateBack后调用
      this.overlayShow = false
    }
  }
</script>
<style>
  .add-textarea .van-cell {
    height: 300px;
  }
  .add .van-field__body {
    height: 300px;
  }
  .add .van-field__input {
    height: 280px;
  }
  .add .van-uploader {
    float: left;
  }
  .add .add-button {
    height: 25px;
  }
</style>
