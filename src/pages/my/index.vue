<template>
  <div class="my">
    <div class="top">
      <nav-Bar
        extClass="my-nav-bar">
      </nav-Bar>
      <van-row>
        <van-col span="4">
          <div>
            <image
              class="user-photo"
              mode="widthFix"
              :src="userInfo.userPhoto"
            />
          </div>
        </van-col>
        <van-col span="15" custom-class="user-name">{{userInfo.userName}}</van-col>
        <van-col span="5">
          <van-button v-if="userInfo.isLogin" custom-class="login" @click="loginOut">退出登录</van-button>
          <van-button v-else custom-class="login" open-type="getUserInfo" @getuserinfo="login">登录</van-button>
        </van-col>
      </van-row>
    </div>
    <div  style="border-radius: 5rpx;background-color: white">
      <van-cell-group>
        <van-cell icon="column"  icon-size="28px" icon-color="green" is-link title="我的帖子"  url="/pages/release/main"  />
        <van-cell icon="star" icon-size="28px" icon-color="yellow" is-link title="我的收藏" url="/pages/collect/main" />
        <van-cell icon="phone" icon-size="28px" icon-color="red" is-link title="投诉反馈"  />
      </van-cell-group>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant/toast/toast'
  import store from '../../store'
  export default {
    data () {
      return {
      }
    },
    methods: {
      login (detail) {
        // let success = () => {
        //   console.log(888)
        // }
        if (detail.mp.detail.errMsg === 'getUserInfo:ok') {
          Toast.success('登录成功')
          let userInfo = {
            userName: '',
            userPhoto: '',
            isLogin: true
          }
          userInfo.userName = detail.mp.detail.userInfo.nickName
          userInfo.userPhoto = detail.mp.detail.userInfo.avatarUrl
          store.commit('changeLoginState', userInfo)
          this.$login()
        } else {
          Toast.fail('登录失败')
        }
      },
      loginOut () {
        try {
          wx.clearStorage()
          store.commit('initState')
          Toast.success('退出成功')
        } catch (e) {
          Toast.fail('退出失败')
          // Do something when catch error
        }
      }
    },
    computed: {
      userInfo () {
        return store.state.userInfo
      }
    },
    mounted () {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                // 判断是否退出登录
                wx.getStorage({
                  key: 'session_key',
                  success: storage => {
                    let userInfo = {
                      userName: '',
                      userPhoto: '',
                      isLogin: true
                    }
                    userInfo.userName = res.userInfo.nickName
                    userInfo.userPhoto = res.userInfo.avatarUrl
                    store.commit('changeLoginState', userInfo)
                  }
                })
              }
            })
          }
        }
      })
    }
  }
</script>

<style>
.my .van-row {
  margin: 10px;
}
.my .login {
  font-size: 12px;
  padding: 0px 11px 0px 11px;
  height: 25px;
  margin-top: 10px;
}
.my .user-name {
  color: white;
  margin-top: 10px;
  font-size: 17px;
}
.my .top {
  /*外层元素（如div）中只有一个非空子元素，此时margin是被折叠了。两者之间取最大的margin值，表现在外层父元素上，而不是内层子元素。*/
  /*hidden:内容会被修剪，并且其余内容是不可见的。*/
  overflow:hidden;
  background-image: linear-gradient(to right, #8A2BE2 , #FF00FF);
}
.my-nav-bar .lxy-nav-bar__inner {
  background-image: linear-gradient(to right, #8A2BE2 , #FF00FF)!important;
}
.my .user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
}
.my .van-cell {
  padding: 18px 8px 18px 14px;
}
</style>
