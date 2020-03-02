<template>
    <div class="details">
      <nav-Bar
        extClass="details-nav-bar"
        back
        home
        searchBar
        searchText="输入关键词搜索"
      />
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
      <div style="height: 40px"></div>
      <div class="bottom">
        <van-field
          input-class="bottom-input"
          placeholder="评论一句,前排打call！"
          cursor-spacing="20"
        >
          <van-button icon="star-o" size="small" custom-style="min-width:10px;font-size:18px;padding:0px;border:none;margin-left:15px;padding-bottom:2px" slot="button" type="default" />
        </van-field>

      </div>
      <div>
        <van-button round type="info" custom-class="back" @click="back">回到首页</van-button>
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
      },
      collection () {
        console.log(888)
      },
      back () {
        wx.navigateBack()
      }
    },
    components: {shareAndComment}
  }
</script>

<style>
  .details {
    margin: 4px 8px 4px 8px;
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
    height: 38px;
    padding-bottom: 5px;
    /*设置阴影*/
    box-shadow: 10px 10px 2px 10px rgba(230,230,250,1);
  }
  .details .bottom-input {
    background-color: lavender;
    width: 38%;
    /*输入框圆角*/
    border-radius: 9px;
    padding-left: 5px;
    font-size: 13px;
    text-align: center;
  }
  .details .back {
    font-size: 11px;
    position: fixed;
    right: 5px;
    top: 420px;
    width: 11%;
    padding: 0px 6px;
    line-height: 1.5;
  }
</style>
