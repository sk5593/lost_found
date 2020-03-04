<template>
  <div class="login">
    <nav-Bar
      extClass="index-nav-bar"
      title="登录"
      home
    />
    <div class="wxLogin-div">
      <van-button size="large" custom-class="wxLogin-bu" icon="data:image/png;base64,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"
                  type="primary" open-type="getUserInfo" @getuserinfo="login">微信登录</van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant/toast/toast'
  import store from '../../store'
  export default {
    methods: {
      login (detail) {
        // let success = () => {
        //   console.log(888)
        // }
        if (detail.mp.detail.errMsg === 'getUserInfo:ok') {
          let userInfo = {
            userName: '',
            userPhoto: '',
            isLogin: true
          }
          userInfo.userName = detail.mp.detail.userInfo.nickName
          userInfo.userPhoto = detail.mp.detail.userInfo.avatarUrl
          store.commit('changeLoginState', userInfo)
          this.$login()
          Toast({
            type: 'success',
            message: '登录成功',
            onClose: () => {
              wx.navigateBack()
            }
          })
        } else {
          Toast.fail('登录失败')
        }
      }
    }
  }
</script>

<style>
  .login .wxLogin-div {
    position: fixed;
    top: 50%;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
  .login .wxLogin-bu {
    height: var(--button-large-height,45px);
    border-radius: 6px;
  }
  .wxLogin-bu .van-button__icon {
    margin-right: 6px;
  }
</style>
