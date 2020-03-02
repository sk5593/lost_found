<template>
  <div class="add">
    <nav-Bar
      title="发帖"
      back
      home
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
  </div>
</template>

<script>
    export default {
      data () {
        return {
          fileList: []
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
        }
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
