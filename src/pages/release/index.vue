<template>
  <div>
    <nav-Bar
      title="我的"
      back
      home
      @back="handlerGobackClick"
      extClass="my-nav-bar">
    </nav-Bar>
    <div v-for="(key,item) in 10">
      <van-row>
        <van-col span="3">
          <div style="font-size: 13px;color: gray">12</div>
          <van-divider customStyle="border-color: black;transform: rotate(145deg);width: 25px;margin-top: 1px;margin-left: 4px;margin-bottom: 2px;"/>
          <div style="font-size: 20px;margin: 0px 2px 0px 14px">22</div>
        </van-col>
        <van-col span="21">
          <div class="content">
            所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。
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
        </van-col>
      </van-row>
      <van-divider custom-style="border: solid #ebedf0;"/>
    </div>
  </div>
</template>

<script>
    export default {
      methods: {
        handlerGobackClick () {
          wx.navigateBack()
        },
        imgShow (event) {
          wx.previewImage({
            current: 'https://img.yzcdn.cn/vant/cat.jpeg', // 当前显示图片的http链接
            urls: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'] // 需要预览的图片http链接列表
          })
        }
      }
    }
</script>

<style>

</style>
