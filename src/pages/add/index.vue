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
      placeholder="来吧,尽情发挥吧..."
    />
    <van-cell>
      <van-uploader :file-list="fileList" @after-read="afterRead" />
    </van-cell>
    <van-cell>
      <van-button type="info" custom-class="add-button">发布</van-button>
    </van-cell>
    <van-overlay :show="overlayShow" />
  </div>
</template>

<script>
    export default {
      data () {
        return {
          fileList: [],
          overlayShow: false
        }
      },
      methods: {
        afterRead (event) {
          const { file } = event.detail
          // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
          wx.uploadFile({
            url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
            filePath: file.path,
            name: 'file',
            formData: { user: 'test' },
            success (res) {
              // 上传完成需要更新 fileList
              const { fileList = [] } = this.data
              fileList.push({ ...file, url: res.data })
              this.setData({ fileList })
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
        }
      },
      mounted () {
        this.checkLogin()
      },
      onShow () {
        // navigateBack后调用
        this.checkLogin()
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
