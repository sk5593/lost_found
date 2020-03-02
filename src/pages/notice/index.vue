<template>
  <div class="notice">
    <nav-Bar
      title="消息">
    </nav-Bar>
    <div v-for="(key,item) in 10">
      <van-row>
        <van-col span="3">
          <div style="margin-left: 4px">
            <van-image
              round
              width="35"
              height="35"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
        </van-col>
        <van-col span="16">
          <div class="user-name">不管我在何方朦胧 回复我</div>
          <div class="content">
            所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。
          </div>
          <div style="font-size: 12px;color: gray;margin-top: 6px">2019-12-22</div>
        </van-col>
        <van-col span="5">
          <div style="margin-left: 10px;margin-top: 5px">
            <!--.stop阻止父类点击事件-->
            <van-image
              width="50"
              height="50"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              fit="cover"
              radius="3"
              @click.stop="imgShow"
            />
          </div>
        </van-col>
      </van-row>
      <van-divider custom-style="border: solid #ebedf0;margin-top: 5px"/>
    </div>
  </div>
</template>

<script>
    export default {
    }
</script>

<style>
  .notice .user-name {
    font-size: 12px;
  }
  .notice .content {
    margin-top: 5px;
    margin-right: 15px;
  }
</style>
