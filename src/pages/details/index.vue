<template>
    <div class="details">
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
          <div class="time">1天前</div>
        </van-col>
      </van-row>
      <div>
        所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。
        CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。
        盒模型允许我们在其它元素和周围元素边框之间的空间放置元素
      </div>
      <div>
        <!--widthFix:缩放模式，宽度不变，高度自动变化，保持原图宽高比不变-->
          <image
            style="width: 100%;margin-top: 4px;"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            mode="widthFix"
            @click="imgShow"
          />
      </div>
      <share-and-comment/>
      <!--solid:边框是实线-->
      <van-divider custom-style="border: solid #ebedf0;"/>
      <div v-for="(index,key) in 10">
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
            <div class="time">第1楼 | 1天前</div>
            <div>赞赞重中之重重中之重重中之重重中之重重中之重制造者</div>
          </van-col>
        </van-row>
      </div>
      <div style="height: 44px"></div>
      <div class="bottom">
        <van-field
          placeholder="请输入用户名"
        />
      </div>
    </div>
</template>

<script>
  import shareAndComment from '@/components/shareAndComment'
  export default {
    methods: {
      imgShow (event) {
        wx.previewImage({
          current: 'https://img.yzcdn.cn/vant/cat.jpeg', // 当前显示图片的http链接
          urls: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'] // 需要预览的图片http链接列表
        })
      }
    },
    components: {shareAndComment}
  }
</script>

<style>
  .details {
    margin: 4px 4px 4px 4px;
  }
  .details .user-name {
    color: #4169E1;
    font-weight: 500;
    font-size: 15px;
    margin: 4px 0px 2px 0px
  }
  .details .time {
    font-size: 12px;
    color: gray;
  }
  .details .content {
    font-size: 15px;
    font-weight: 400;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .details .bottom {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
  }
</style>
