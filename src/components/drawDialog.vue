<template>
  <cjh-dialog
    :class="type === 1 ? 'type1-dialog-wrapper' : 'type2-dialog-wrapper' "
    :visible.sync="visible"
    @on-close="bindClose"
  >
    <template v-if="type===1">
      <div class="zhongjiang">
        <div class="d-t-bg">
          <img :src="Trophy" alt />
          <p>恭喜中奖</p>
        </div>
        <div class="d-info">
          <cjh-scroll class="dialog-info">
            <div v-html="content"></div>
          </cjh-scroll>
        </div>
        <div class="d-f-close" @click="bindClickCancle"></div>
      </div>
    </template>
    <template v-else>
      <div class="type2-wrapper">
        <p class="type2-title">确认兑奖</p>
        <p class="type2-info" v-html="content"></p>
        <p class="type2-tips">2020年度只可打开一次兑奖宝箱，系统已为您自当匹配当前所能达到的最高奖项，确认兑换？</p>
        <p class="type2-btn">
          <cjh-button @click="bindClickCancle" radius>取消</cjh-button>
          <cjh-button @click="bindClickConfirm" radius>确认</cjh-button>
        </p>
      </div>
    </template>
  </cjh-dialog>
</template>

<script>
export default {
  name: 'draw-dialog',
  // 参数说明
  // type： 1中奖 2兑换
  // content：弹层内容
  props: {
    type: Number,
    content: String
  },
  data () {
    return {
      Trophy: require('../assets/images/trophy.png'),
      visible: true
    }
  },
  components: {},
  mounted () {},
  methods: {
    bindClickConfirm () {
      this.$emit('on-confirm', this)
    },
    bindClickCancle () {
      this.$emit('on-cancle', this)
    },
    bindClose () {
      this.$emit('on-cancle')
    }
  }
}
</script>
<style lang="less" scoped>
.cjh-dialog {
  /deep/ .c-d-wrapper {
    .c-d-content {
      background-color: #fff;
      .d-c-close {
        display: none;
      }
    }
  }
}
.type1-dialog-wrapper&.cjh-dialog {
  /deep/ .c-d-wrapper {
    .c-d-content {
      background-color: transparent !important;
      height: auto;
      .d-c-body {
        height: 100% !important;
        text-align: center;
        font-size: 30px;
        padding: 0 20px;
        .scroll-wrapper {
          .zhongjiang {
            width: 100%;
            padding-bottom: 120px;
            background: #fff;
            border-radius: 30px;
            .d-t-bg {
              width: 270px;
              position: absolute;
              top: 0;
              left: 50%;
              margin-left: -135px;
              z-index: 10;
              img {
                width: 270px;
                height: auto;
              }
              p {
                margin-top: 30px;
                font-size: 42px;
                color: #fc6a27;
              }
            }
            .d-info {
              font-size: 30px;
              color: #666;
              margin-top: 120px;
              padding: 215px 20px 0;
              .dialog-info {
                width: 100%;
                max-height: 400px;
                .s-w-body {
                  padding-bottom: 40px;
                  > div {
                    > * {
                      margin-top: 20px;
                    }
                  }
                }
              }
            }
            .d-f-close {
              width: 60px;
              height: 60px;
              background: url("../assets/images/close.png") no-repeat;
              background-size: 60px 60px;
              position: absolute;
              bottom: 60px;
              left: 50%;
              margin-left: -30px;
            }
          }
        }
      }
    }
  }
}
.type2-dialog-wrapper&.cjh-dialog {
  /deep/ .c-d-wrapper {
    .c-d-content {
      height: auto;
      .type2-wrapper {
        padding: 50px 60px 30px;
        .type2-title {
          font-size: 42px;
          color: #fc6a27;
        }
        .type2-info,
        .type2-title {
          color: #fc6a27;
          font-weight: @theme-font-weight;
        }
        .type2-info {
          font-size: 34px;
          margin: 30px 0;
        }
        .type2-tips {
          color: #666;
          font-size: 30px;
          text-align: left;
          line-height: 45px;
          margin: 50px 0;
        }
        .type2-btn {
          display: flex;
          justify-content: space-between;
          .cjh-button {
            width: 40%;
            height: 80px;
            font-size: 30px;
            background: #fc6a27;
            border: 1px solid #fc6a27;
          }
          .cjh-button:first-child {
            background: #fff;
            color: #fc6a27;
          }
        }
      }
    }
  }
}
</style>
