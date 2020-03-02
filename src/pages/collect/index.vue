<template>
  <div class="collect">
    <nav-Bar
      title="我的"
      back
      home
      @back="handlerGobackClick"
      extClass="my-nav-bar" />
    <div v-for="(k,v) in 10">
      <van-row custom-class="collect-row">
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
        <van-col span="19">
          <div class="user-name">不管我在何方朦胧</div>
          <div class="time">1天前</div>
        </van-col>
        <van-rol span="2">
          <van-icon name="star" color="yellow" />
        </van-rol>
      </van-row>
      <van-row>
        <van-col span="5">
          <van-image
            custom-class="collect-image"
            width="75"
            height="75"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
            @click.stop="imgShow"
          />
        </van-col>
        <van-col span="19">
          <div style="margin-right: 10px;background-color: rgb(248,248,233);padding: 8px;">
            不管我在何方朦胧不管我在何方朦胧不管我在何方朦胧不管我在何方朦胧不管我在何方朦胧不管我在何方朦胧
          </div>
        </van-col>
      </van-row>
      <van-divider/>
    </div>
  </div>
</template>

<script>
    export default {
      methods: {
        handlerGobackClick () {
          wx.navigateBack()
        }
      }
    }
</script>

<style>
  .collect .collect-row {
    margin: 13px;
  }
  .collect-image {
    margin-left: 8px;
  }
</style>
