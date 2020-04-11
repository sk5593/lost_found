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
            <image
              style="width: 80rpx;height: 80rpx;border-radius: 10rpx"
              mode="widthFix"
              :src="articleData.user.image"
            />
          </div>
        </van-col>
        <van-col span="21">
          <div class="user-name">{{articleData.user.name}}</div>
          <div class="time">{{articleData.formatTime}}</div>
        </van-col>
      </van-row>
      <div class="article-content" @click="commentReply(0,articleData.user.name,articleData.opId)">
        {{articleData.content}}
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
      <share-and-comment :commentsNum="commentsNum"/>
      <!--solid:边框是实线-->
      <van-divider custom-style="border: solid #ebedf0;"/>
      <div v-if="noHasComment" style="text-align: center">
        <van-image
          width="80%"
          height="160"
          radius="3"
          fit="cover"
          src="data:image/png;base64,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"
        />
        <div style="font-size: 15px;color: gainsboro">成为第一个评论的人吧</div>
      </div>
      <div v-for="(comment,key) in articleData.commentsEntityList" :key="key">
        <div style="margin-bottom: 8rpx" @click="commentReply(comment.cid,comment.user.name,comment.opId)">
          <van-row>
            <van-col span="3">
              <div style="padding-top: 8rpx">
                <image
                  style="width: 80rpx;height: 80rpx;border-radius: 10rpx"
                  mode="widthFix"
                  :src="comment.user.image"
                />
              </div>
            </van-col>
            <van-col span="21">
              <div class="user-name">{{comment.user.name}}</div>
              <div class="time">第{{key+1}}楼 | {{comment.formatCommentCreateTime}}</div>
              <div class="article-content">{{comment.commentContent}}</div>
              <div class="second-comments" v-if="comment.secondCommentsEntities.length>0">
                <div @click.stop="commentReply(comment.cid,secondComment.commentatorName,secondComment.commentedOpId)" v-for="(secondComment,secondkey) in comment.secondCommentsEntities">
                  <div class="second-comments-name">{{secondComment.commentatorName}} :</div>
                  <div class="second-comments-content">回复 {{secondComment.commentedName}} :{{secondComment.secondCommentContent}}</div>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <div style="height: 50px"></div>
      <div class="bottom">
        <van-field
          maxlength="30"
          size="large"
          type="text"
          :value="inputValue"
          input-class="bottom-input"
          :placeholder="commentPlaceholder"
          cursor-spacing="20"
          @focus="focus"
          @change="onChange"
          @blur="blur"
          :focus="inputFocus"
        >
          <van-button v-if="commentFocus == 'focus'" size="small" custom-style="margin-bottom: 4px;height:27px;min-width:10px;margin-left:15px;" slot="button" :disabled="sendDisabled" type="info"  @click="addComment">发送</van-button>
          <van-icon v-if="commentFocus == 'blur'" custom-class="bottom-icon" name="star-o" slot="button" />
          <van-icon v-if="commentFocus == 'blur'" custom-class="bottom-icon" name="chat-o" :info="commentsNum" slot="button"  />
        </van-field>
      </div>
      <div>
        <van-button round type="info" custom-class="back" @click="back">回到首页</van-button>
      </div>
      <van-toast id="van-toast" />
    </div>
</template>

<script>
  import Toast from '../../../static/vant/toast/toast'
  import shareAndComment from '@/components/shareAndComment'
  export default {
    data () {
      return {
        commentPlaceholder: '评论一句,前排打call!',
        inputFocus: false,
        sendDisabled: true,
        inputValue: '',
        commentFocus: 'blur',
        articleData: {},
        commentData: [],
        noHasComment: true,
        commentsNum: '',
        commentsReply: {
          cid: 0,
          name: '',
          opId: ''
        }
      }
    },
    methods: {
      commentReply (cid, name, opId) {
        // 如果cid为0，代表回复的是article
        this.commentsReply.cid = cid
        // 被回复的的人的name
        this.commentsReply.name = name
        // 被回复的人的opid
        this.commentsReply.opId = opId
        this.commentPlaceholder = '回复 ' + name + ':'
        this.inputFocus = true
      },
      checkLogin () {
        wx.getStorage({
          key: 'session_key',
          fail: (res) => {
            if (res.errMsg === 'getStorage:fail data not found') {
              //  用户退出登录或者没有登录
              wx.navigateTo({
                url: '/pages/login/main'
              })
            }
          },
          success: (res) => {
          }
        })
      },
      onChange (event) {
        // event.detail 为当前输入的值
        if (event.mp.type === 'change') {
          if (event.mp.detail !== '') {
            this.sendDisabled = false
            this.inputValue = event.mp.detail
          } else {
            this.sendDisabled = true
          }
        }
      },
      addComment () {
        console.log(this.commentsReply)
        if (this.sendDisabled) return
        let id = this.articleData.id
        let value = this.inputValue
        this.inputValue = ''
        this.$fly.post('/details/comments', {id: id, value: value, cid: this.commentsReply.cid, name: this.commentsReply.name, opId: this.commentsReply.opId}, {headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }}).then(res => {
          if (res.data.code === 200) {
            this.getComments(this.articleData.id)
            Toast.success('评论成功')
          } else {
            Toast.fail('添加评论失败')
          }
        })
      },
      blur (event) {
        wx.onKeyboardHeightChange(res => {
          if (res.height === 0) {
            this.inputFocus = false
            this.commentFocus = 'blur'
          }
        })
      },
      focus (event) {
        this.checkLogin()
        this.commentFocus = 'focus'
      },
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
      },
      getDetails (id) {
        // let articleData = JSON.parse(data)
        // let id = articleData.id
        // this.articleData = articleData
        this.$fly.get('/details/article', {id: id}).then(res => {
          console.log(res.data.object)
          this.articleData = res.data.object
          let len = res.data.object.commentsEntityList.length
          if (len > 0) {
            this.commentsNum = len
            this.noHasComment = false
          } else {
            this.commentsNum = '评论'
            this.noHasComment = true
          }
        })
        // this.getComments(id)
      },
      getComments (id) {
        this.$fly.get('/details/comments', {id: id}).then(res => {
          if (res.data.code === 200) {
            let len = res.data.object.length
            if (len > 0) {
              this.commentsNum = len
              this.noHasComment = false
            } else {
              this.commentsNum = '评论'
              this.noHasComment = true
            }
            this.articleData.commentsEntityList = res.data.object
            console.log(this.articleData.commentsEntityList)
            // res.data.object.forEach(data => {
            //   this.commentData.push(data)
            // })
          } else {
            Toast.fail('加载评论失败')
          }
        })
      }
    },
    components: {shareAndComment},
    onLoad (option) {
      // 重置data中的数据 ？
      Object.assign(this.$data, this.$options.data())
      this.getDetails(option.id)
    }
  }
</script>

<style>
  .details .second-comments-name {
    font-size: 13px;
    color: #4169E1;
  }
  .details .second-comments-content {
    font-size: 13px;
  }
  .details .second-comments {
    margin-top: 5px;
    padding: 6px;
    background-color: lavender;
  }
  .details .bottom-icon {
    min-width: 10px;
    font-size: 23px;
    padding: 0px;
    border: none;
    margin-left: 15px;
    padding-bottom: 2px
  }
  .details .article-content {
    font-size: 16px;
    margin-top: 10px
  }
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
    height: 50px;
    padding-bottom: 5px;
    /*设置阴影*/
    box-shadow: 10px 10px 2px 10px rgba(230,230,250,1);
  }
  .details .bottom-input {
    background-color: lavender;
    /*输入框圆角*/
    border-radius: 9px;
    padding-left: 5px;
    font-size: 15px;
    height: 30px;
    width: 70%;
    margin-bottom: 4px;
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
  .details .van-info {
    transform: translate(40%,-5%);
  }
</style>
