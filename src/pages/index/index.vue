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
    <div v-for="(data,key) in dataList" :key="key">
      <van-panel custom-class="panel-class" @click="detail(data)">
        <div slot="header">
          <van-row>
            <van-col span="3">
              <div style="margin-top: 6px">
                <image
                  style="width: 80rpx;height: 80rpx;border-radius: 10rpx"
                  mode="widthFix"
                  :src="data.user.image"
                />
              </div>
            </van-col>
            <van-col span="21">
              <div class="user-name">{{data.user.name}}</div>
              <div class="content">
                {{data.shortContent}}
              </div>
              <div>
                <!--.stop阻止父类点击事件-->
                <image
                  style="width: 200rpx;height: 200rpx;"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                  mode="widthFix"
                  @click.stop="imgShow"
                />
              </div>
              <share-and-comment :commentsNum="data.commentNum"/>
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </div>
    <van-divider v-if="end" contentPosition="center">我也是有底线的</van-divider>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  // 导入自定义组件
  import Toast from '../../../static/vant/toast/toast'
  import shareAndComment from '@/components/shareAndComment'
  export default {
    data () {
      return {
        page: {
          current: 1,
          size: 10,
          hasNextPage: false
        },
        dataList: [],
        showTopLoading: false,
        end: false
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
      detail (data) {
        wx.navigateTo({
          url: '/pages/details/main?id=' + data.id
        })
      },
      getDataList (current, fun = () => {}) {
        this.$fly.get(
          '/index/index', {
            current: current,
            size: this.page.size
          }
        ).then(res => {
          console.log(res)
          res.data.list.forEach(data => {
            this.dataList.push(data)
          })
          if (res.data.hasNextPage) {
            this.page.current = res.data.nextPage
            this.page.hasNextPage = true
          } else {
            this.end = true
            this.page.hasNextPage = false
          }
          fun()
        }).catch(err => {
          Toast('未知异常')
          console.log(err)
        })
      },
      getLatestData () {
        let latestTime = this.dataList[0].createTime
        this.$fly.get('/index/latest', {latestTime: latestTime}).then(res => {
          let t = res.data.length
          res.data.forEach(data => {
            this.dataList.splice(0, 0, data)
          })
          wx.stopPullDownRefresh({
            complete: () => {
              Toast('为你更新' + t + '条信息')
            }
          })
        }).catch(err => {
          Toast('未知异常')
          console.log(err)
        })
      }
    },
    mounted () {
      // 开启右上角的分享按钮
    },
    onPullDownRefresh () {
      this.getLatestData()
    },
    onReachBottom () {
      if (this.page.hasNextPage) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        let hide = () => {
          wx.hideLoading()
        }
        this.getDataList(this.page.current, hide())
      }
    },
    onLoad (option) {
      wx.showShareMenu({
        withShareTicket: true
      })
      // 第一次打开执行
      if (option.session === undefined || option.session === null) {
        this.getDataList(1)
      } else {
        // 添加后跳转执行
        this.getLatestData()
      }
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
