<template>
  <div @click="clickHandle">
    <topNavBar/>
  </div>
</template>

<script>
import card from '@/components/card'
import topNavBar from '@/components/topNavBar'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },
  components: {
    topNavBar,
    card
  },

  methods: {
    onPullDownRefresh () {
      wx.showNavigationBarLoading()
      console.log(1111)
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style>
</style>
