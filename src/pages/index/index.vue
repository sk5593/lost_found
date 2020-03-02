<template>
  <div class="index-top">
    <nav-Bar
      extClass="index-nav-bar"
      title="聊大找回"
    />
    <!--<div style="text-align: center">-->
      <!--<van-loading v-if="showTopLoading" type="spinner" color="#1989fa" size="24px"/>-->
    <!--</div>-->
    <van-search
      placeholder="输入关键词搜索"
      shape="round">
    </van-search>
    <div v-for="(count,key) in 10">
      <van-panel custom-class="panel-class" @click="detail">
        <div slot="header">
          <van-row>
            <van-col span="3">
              <div style="padding-top: 4px">
                <van-image
                  width="40"
                  height="40"
                  radius="3"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </div>
            </van-col>
            <van-col span="21">
              <div class="user-name">不管我在何方朦胧</div>
              <div class="content">
                所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。
                CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。
                盒模型允许我们在其它元素和周围元素边框之间的空间放置元素
              </div>
              <div>
                <!--.stop阻止父类点击事件-->
                <van-image
                  width="100"
                  height="100"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                  fit="cover"
                  @click.stop="imgShow"
                />
              </div>
              <share-and-comment/>
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
  // 导入自定义组件
  import shareAndComment from '@/components/shareAndComment'

  export default {
    data () {
      return {
        motto: 'Hello miniprograme',
        userInfo: {
          nickName: 'mpvue',
          avatarUrl: 'http://mpvue.com/assets/logo.png'
        },
        showTopLoading: false
      }
    },
    // 声明组件
    components: {shareAndComment},

    methods: {
      // 点击查看大图的方法
      imgShow (event) {
        wx.previewImage({
          current: 'https://img.yzcdn.cn/vant/cat.jpeg', // 当前显示图片的http链接
          urls: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'] // 需要预览的图片http链接列表
        })
      },
      // 路由到详情
      detail () {
        wx.navigateTo({
          url: '/pages/details/main'
        })
      }
    },
    mounted () {
      // 开启右上角的分享按钮
      wx.showShareMenu({
        withShareTicket: true
      })
      this.$fly.get(
        '/index/index'
      ).then(res => {
      })
    },
    onPullDownRefresh () {
      // this.showTopLoading = true
      setTimeout(() => {
        wx.stopPullDownRefresh({
          success: () => {
            // this.showTopLoading = false
          }
        })
      }, 3000)
    }
  }
</script>

<style>

  /*.index-top .van-search {*/
  /*padding: 0px 12px;*/
  /*!*搜索框背景色上黄下白*!*/
  /*background-image: linear-gradient(to bottom, yellow 50%, white 0);*/
  /*}*/

  /*.index-top .nav-class {*/
  /*background-color: yellow;*/
  /*}*/

  /*.index-top .tab-class {*/
  /*font-size: 17px;*/
  /*}*/

  /*.index-top .tab-active-class {*/
  /*font-size: 20px;*/
  /*font-weight: bold;*/
  /*}*/

  .index-top .van-tabs__content {
    /*解决fix布局下无法滚动的问题*/
    /*position: fixed;*/
    /*height: 100%;*/
    /*浏览器默认从左往右渲染元素，在没有超出父容器的宽度的前提下  如果子容器的宽度能够被容纳  设置margin-right是没有用的
    因此设置宽度让子容器小一点*/
    width: 97.5%;
    /*overflow: auto;*/
    margin: 5px 8px 5px 8px;
  }

  .index-top .user-name {
    color: #4169E1;
    font-weight: 500;
    font-size: 15px;
    margin: 4px 0px 2px 0px
  }

  .index-top .content {
    font-size: 15px;
    font-weight: 400;
    margin: 2px 0px 4px 0px
  }

  .index-nav-bar .lxy-nav-bar__center {
    font-weight: 600;
  }

  .index-top .panel-class {
    padding-left: 8px;
    padding-right: 8px;
  }
</style>
