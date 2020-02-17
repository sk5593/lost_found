<template>
  <!--<div class="index-top">-->
    <!--<van-row>-->
      <!--<van-col span="9" class="index-top-navBar" style="text-align: right"><a href="http://www.w3school.com.cn">关注</a></van-col>-->
      <!--<van-col span="6" class="index-top-navBar" style="text-align: center"><a href="http://www.w3school.com.cn">首页</a></van-col>-->
      <!--<van-col span="9"class="index-top-navBar" style="text-align: left"><a href="http://www.w3school.com.cn">青岛</a></van-col>-->
    <!--</van-row>-->
    <!--<van-search-->
      <!--shape="round"-->
      <!--input-align="center"-->
      <!--background></van-search>-->
  <!--</div>-->
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
          <van-panel title="标题" desc="描述信息" status="状态" use-footer-slot>
            <view>内容</view>
            <view slot="footer">
              <van-button size="small">按钮</van-button>
              <van-button size="small" type="danger">按钮</van-button>
            </view>
          </van-panel>
        </div>
      </van-tab>
      <van-tab title="青岛" name=2>内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
    export default {

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
    /*搜索框背景色上白下黄*/
    background-image: linear-gradient(to bottom, yellow 50%, white 0);
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
  .index-top .custom-class {
    /*background-color: yellow;*/
  }
  .index-top .van-tabs__content {
    /*解决fix布局下无法滚动的问题*/
    position: fixed;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
</style>
