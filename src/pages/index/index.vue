<template>
  <div @click="clickHandle">
    <div class="index-top">
      <van-tabs color="black"
                line-width="10"
                nav-class="nav-class"
                tab-class="tab-class"
                tab-active-class="tab-active-class"
                custom-class="custom-class"
                active="1"
      >
        <van-tab title="关注" name=0>
          <div v-for="(count,key) in 10">
            <van-panel title="标题" desc="描述信息" status="状态" use-footer-slot>
              <view>内容</view>
              <view slot="footer">
                <van-button size="small">按钮</van-button>
                <van-button size="small" type="danger">按钮</van-button>
              </view>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="首页" name=1>
          <div v-for="(count,key) in 10">
            <van-panel @click="detail">
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
                    <share-and-comment />
                  </van-col>
                </van-row>
              </div>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="青岛" name=2>内容 3</van-tab>
      </van-tabs>
    </div>
    <div style="height: 50px"></div>
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
        }
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

    created () {
      // 开启右上角的分享按钮
      wx.showShareMenu({
        withShareTicket: true
      })
      // let app = getApp()
    }
  }
</script>

<style>
  .index-top {
    /*导航栏上悬浮*/
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .index-top .van-search {
    padding: 0px 12px;
    /*搜索框背景色上黄下透明*/
    background-image: linear-gradient(to bottom, yellow 50%, transparent 0);
  }

  .index-top .nav-class {
    background-color: yellow;
  }

  .index-top .tab-class {
    font-size: 17px;
  }

  .index-top .tab-active-class {
    font-size: 20px;
    font-weight: bold;
  }


  .index-top .van-tabs__content {
    /*解决fix布局下无法滚动的问题*/
    position: fixed;
    height: 100%;
    /*浏览器默认从左往右渲染元素，在没有超出父容器的宽度的前提下  如果子容器的宽度能够被容纳  设置margin-right是没有用的
    因此设置宽度让子容器小一点*/
    width: 97.5%;
    overflow: auto;
    margin: 5px 5px 5px 5px;
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
</style>
