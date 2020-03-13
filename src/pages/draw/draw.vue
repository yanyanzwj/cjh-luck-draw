<template>
  <div class="draw-wrapper">
    <div class="draw-top">
      <div class="turntable">
        <p class="zhuanpan">
          <span class="turnimg">
            <img id="turn-anmin" :src="turntableImg" alt />
          </span>
          <span class="arrowimg">
            <img :src="arrowImg" alt />
          </span>
          <span class="startimg">
            <img @touchend="opendraw($event,'')" :src="startImg" alt />
          </span>
        </p>
        <p class="zhuzi">
          <img :src="columnImg" alt />
        </p>
      </div>
      <div class="batch-open">
        <cjh-button @touchend="opendraw($event,'all')" radius>一键刮奖</cjh-button>
        <p>
          <span>
            <i>{{natrData.myUsableNum}}</i>剩余次数
          </span>
          <span>
            <i>{{natrData.myLuckNum}}</i>幸运值
          </span>
        </p>
      </div>
      <div class="accumulative parts">
        <p class="title">
          <span>累积奖</span>
        </p>
        <div class="content">
          <p class="treasure flex">
            <img v-if=" natrData.myCumuFlag == 4 " :src="fouropenImg" alt />
            <img
              v-else
              :class="{'huangdong':natrData.myCumuFlag == 0 && natrData.kyCumuFlag == 4}"
              :src="fourcloseImg"
              @click="opentreasure"
              alt
            />
            <img v-if=" natrData.myCumuFlag == 3 " :src="threeopenImg" alt />
            <img
              v-else
              :class="{'huangdong':natrData.myCumuFlag == 0 && natrData.kyCumuFlag == 3}"
              :src="threecloseImg"
              @click="opentreasure"
              alt
            />
            <img v-if=" natrData.myCumuFlag == 2 " :src="twoopenImg" alt />
            <img
              v-else
              :class="{'huangdong':natrData.myCumuFlag == 0 && natrData.kyCumuFlag == 2}"
              :src="twocloseImg"
              @click="opentreasure"
              alt
            />
            <img v-if=" natrData.myCumuFlag == 1 " :src="oneopenImg" alt />
            <img
              v-else
              :class="{'huangdong':natrData.myCumuFlag == 0 && natrData.kyCumuFlag == 1}"
              :src="onecloseImg"
              @click="opentreasure"
              alt
            />
          </p>
          <p class="numtip flex">
            <span v-for="(item,index) in leijijiang" :key="index">（{{item.num}}次）</span>
          </p>
          <p class="step">
            <span class="onepostion">
              <span class="twopostion" :style="{width:natrData.myCumuNumper + '%'}"></span>
            </span>
          </p>
          <p class="radius flex">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </p>
          <p class="tips flex">
            <span v-for="(item,index) in leijijiang" :key="index">{{item.name}}</span>
          </p>
          <p class="target">
            <span v-if="natrData.myCumuFlag > 0">已兑奖</span>
            <span v-else>距{{natrData.yjCumuName}}:{{natrData.diffCumuFlag}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="draw-down">
      <div class="collect parts">
        <p class="title">
          <span>收集奖</span>
        </p>
        <div class="content">
          <ul class="cjh flex">
            <li v-for="(item,index) in natrData.myCollect" :key="index" v-show="index < 4">
              <p v-if="Number(item.num) > 0">
                <img :src="item.light_pic" alt />
                <span>x{{item.num}}</span>
              </p>
              <p v-else>
                <img :src="item.gray_pic" alt />
              </p>
            </li>
          </ul>
          <ul class="zj flex">
            <li v-for="(item,index) in natrData.myCollect" :key="index" v-show="index >= 4">
              <p v-if="Number(item.num) > 0">
                <img :src="item.light_pic" alt />
                <span>x{{item.num}}</span>
              </p>
              <p v-else>
                <img :src="item.gray_pic" alt />
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="description">
        <p class="nav">
          <span @click="navclick(1)" :class="{'active': navwhich == 1}">
            <i></i>奖品说明
            <i></i>
          </span>
          <span @click="navclick(2)" :class="{'active': navwhich == 2}">
            <i></i>活动规则
            <i></i>
          </span>
          <span @click="navclick(3)" :class="{'active': navwhich == 3}">
            <i></i>中奖记录
            <i></i>
          </span>
        </p>
        <div class="info">
          <ul v-if="navwhich == 1">
            <li>
              <p class="title">直开奖：</p>
              <p class="tipsinfo">通过电子奖券直接刮出一至六等奖</p>
              <div class="one-prize">
                <p class="goods">
                  <img :src="onegoodsImg" alt />
                </p>
                <p class="level">一等奖</p>
                <p class="prize-content">
                  价值 2000+ : KKTV 55 英寸液晶电视 2499 元
                  <br />/华为麦芒7 6GB+64GB 2399 元
                </p>
              </div>
              <div class="two-three-prize">
                <div>
                  <p class="goods">
                    <img :src="twogoodsImg" alt />
                  </p>
                  <p class="level">二等奖</p>
                  <p class="prize-content">
                    KKTV 40 英寸液晶电视 1599 元
                    <br />/海尔8公斤变频波轮全自动洗衣机 1599元
                  </p>
                </div>
                <div>
                  <p class="goods">
                    <img :src="threegoodsImg" alt />
                  </p>
                  <p class="level">三等奖</p>
                  <p class="prize-content">
                    价值 300+
                    <br />通用/专用机油
                  </p>
                </div>
              </div>
              <p class="other-prize">
                四等奖：50 元非油券 + 长 / 龙标
                <br />五等奖：20 元非油券 + 江 / 融 / 惠
                <br />六等奖：10 元非油券 + 汇 / 百 / 川 / 凤标
              </p>
              <ol class="remarks">
                <p>注：</p>
                <li>一至三等奖三个月度可能会更新一次，所确定商品不更换，不补差价！</li>
                <li>四至六等奖的非油券，如一键刮奖，则合并成一张券，即时到账；如选择单次刮奖，则所中多张非油券不合并，即时到账。</li>
                <li>幸运值越高中奖几率越大。</li>
              </ol>
            </li>
            <li>
              <p class="title">收集奖：</p>
              <p class="tipsinfo">通过收集电子奖券不同字符兑换收集大奖</p>
              <div class="collect">
                <p class="goods">
                  <img :src="collectgoodsImg" alt />
                </p>
                <p class="content">
                  5000元现金+
                  <br />5000元手机一部
                  <br />
                  <i>（集齐长、江、汇、融、惠、百、川、龙标、凤标）</i>
                </p>
              </div>
            </li>
            <li>
              <p class="title">累积奖：</p>
              <p class="content">
                累积通过加油刮奖满 180 次，可直接获得一等奖；
                <br />累积通过加油刮奖满 150 次，可直接获得二等奖；
                <br />累积通过加油刮奖满 100 次，可直接获得三等奖；
                <br />累积通过加油刮奖满 50 次，可获得 50元非油券一张。
                <br />
                <br />
                <br />注：单个大 V 账户单年内只可选择一次对应的奖项！
              </p>
            </li>
          </ul>
          <ol v-else-if="navwhich == 2">
            <li>本活动仅限大V用户可参与，且通过电子刮刮卡的形式参与长江夺宝活动；</li>
            <li>现款加油每满1吨即可获得1次长江夺宝刮奖机会；</li>
            <li>本活动严格遵循“一船、一人、一机、一账号”的原则、以及2019年12月19日公布的“线上订单取货规则”，一旦发现作弊行为将取消所有奖励；</li>
            <li>直开奖、收集奖的实物奖品每三月可能会更新一次，届时不退、不换、不补差价、不替换非活动商品；</li>
            <li>长江夺宝所产出的优惠券均为无门槛券，凡选择“一键刮奖”的用户，所产生的优惠券系统自动合并；选择“刮一刮”的用户，所中非油券即时到账。非油券自发放之日生效，有效期90天，不可用于代购，仅可使用于船员商品，且仅限长江汇APP下单可使用(即门店POS付款不可使用该优惠券)；</li>
            <li>活动地点为南京地区长江汇所有服务区，所有奖项必须在站点进行兑奖；</li>
            <li>
              直开奖说明：
              <br />一等奖：价值2000元的实物商品
              <br />二等奖：价值1500元的实物商品
              <br />三等奖：价值300元的实物商品
              <br />四等奖：50 元非油券 + 长 / 龙标
              <br />五等奖：20 元非油券 + 江 / 融 / 惠
              <br />六等奖：10 元非油券 + 汇 / 百 / 川 / 凤标
            </li>
            <li>
              收集奖说明：
              <br />需集齐：长、江、汇、融、惠、百、川、龙标、凤标，集齐即可获赠收集大奖
              <br />收集大奖：5000 元现金 + 价值5000元的手机一部(长、江、汇、融、惠、百、川、龙标、凤标)
            </li>
            <li>累积奖说明：2020 年度只可打开一次直兑奖宝箱，系统将自动匹配当前所能达到的最高奖项， 以避免误操作导致兑换了更低等奖项；</li>
            <li>幸运值说明：用户的幸运值越高获得大奖机会越高，中奖后幸运值清零重新开始累积；</li>
            <li>活动时间：2020年3月10日~2020年12月31日；</li>
            <li>本活动于2020年12月31日23:59截止，届时活动页面关闭。已中奖用户请务必于2021年3月1日0:00前前往服务区（兴隆洲、七坝）兑奖，逾期视为放弃奖励；</li>
            <li>本活动最终解释权在法律法规范围内归长江汇所有。</li>
          </ol>
          <ul v-else>
            <li>
              <p class="title">收集奖：</p>
              <p class="tipsinfo">通过收集电子奖券不同字符兑换收集大奖</p>
              <p v-for="(item,index) in awarddata.myCollect" :key="index" class="record">
                <span class="time">{{item.ex_coll_time}}:</span>
                <span class="infocon">{{item.name}}（{{item.pirzeName}} ）</span>
              </p>
            </li>
            <li>
              <p class="title">累积奖：</p>
              <p class="tipsinfo">通过加油累积次数获得累积奖</p>
              <p v-for="(item,index) in awarddata.myAccuAward" :key="index" class="record">
                <span class="time">{{item.open_time}}:</span>
                <span class="infocon">{{item.name}}（{{item.pirzeName}} ）</span>
              </p>
            </li>
            <li>
              <p class="title">直开奖：</p>
              <p class="tipsinfo">通过电子奖券直接刮出一至六等奖</p>
              <p v-for="(item,index) in awarddata.myStraOpen" :key="index" class="record">
                <span class="time">{{item.open_time}}:</span>
                <span class="infocon">{{item.name}}（{{item.pirzeName}} ）</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <cjh-copyright></cjh-copyright>
    <drawDialog
      v-if="drawDialog.visible"
      :type="drawDialog.type"
      :content="drawDialog.content"
      @on-confirm="bindClickRadDialogOnConfirm"
      @on-cancle="bindClickRadDialogOnCancle"
    ></drawDialog>
  </div>
</template>

<script>
import drawDialog from '@/components/drawDialog'
import { axiosPost } from '@/api/index.js'
import to from '@/utils/to'
export default {
  name: 'draw',
  data () {
    return {
      turntableImg: require('@/assets/images/turntable.png'),
      columnImg: require('@/assets/images/column.png'),
      arrowImg: require('@/assets/images/arrow.png'),
      startImg: require('@/assets/images/start.png'),
      fouropenImg: require('@/assets/images/four-open.png'),
      fourcloseImg: require('@/assets/images/four-close.png'),
      threeopenImg: require('@/assets/images/three-open.png'),
      threecloseImg: require('@/assets/images/three-close.png'),
      twoopenImg: require('@/assets/images/two-open.png'),
      twocloseImg: require('@/assets/images/two-close.png'),
      oneopenImg: require('@/assets/images/one-open.png'),
      onecloseImg: require('@/assets/images/one-close.png'),
      onegoodsImg: require('@/assets/images/one-goods.png'),
      twogoodsImg: require('@/assets/images/two-goods.png'),
      threegoodsImg: require('@/assets/images/three-goods.png'),
      collectgoodsImg: require('@/assets/images/collect-goods.png'),
      navwhich: 1,
      isclick: false, // 点击事件是否结束
      awarddata: {},
      natrData: {
        myCumuNum: 0, // 我的累积值
        myCumuFlag: 0, // 是否已兑累积奖（0未兑奖 1一等奖 2二等奖 3三等奖 4四等奖）
        myCumuList: [], // 累积奖（排序：四、三、二、一等奖） -> 集合如下所示（各参数值非Null）总共 2 个参数项
        myUsableNum: 0, // 可夺宝次数
        myLuckNum: 0 // 幸运值
      },
      leijijiang: {
        // 累积奖一二三四等奖的累积值
        four: { num: 50, name: '' },
        three: { num: 100, name: '' },
        two: { num: 150, name: '' },
        one: { num: 180, name: '' }
      },
      isBecomedV: 1, // 是否是大v(1是 其他为否)
      userinfo: {
        memberId: '',
        memberUuid: '',
        siteID: ''
      },
      drawDialog: {
        visible: false,
        type: 0,
        content: ''
      }
    }
  },
  components: {
    drawDialog
  },
  mounted () {
    // 标题
    document.title = '长江夺宝'

    // 分享
    setTimeout(() => {
      this.$cjhNative.jsCallAppWebview('jsCallAppHideShare', '1')
      var shareParams = {
        iconSrc: 'http://oss.njcjh.cn/20181120/cjh-logo.jpg',
        url: 'http://cpis.njcjh.cn/bss/totalDown',
        title: '长江夺宝，融汇百川',
        content:
        '长江汇刮刮乐全新升级，奖项更多，奖品更丰富，操作更便捷，重磅大奖等你来开！'
      }
      this.$cjhNative.jsCallAppWebview(
        'jsCallAppTellHuoDongContent',
        JSON.stringify(shareParams)
      )
    }, 200)

    // 获取用户信息
    this.$cjhNative.appCallJsWebview('appCalljsInitPage', arg => {
      if (arg.memberId && arg.memberId > 0 && arg.siteId) {
        this.userinfo.memberId = arg.memberId
        this.userinfo.memberUuid = arg.uuid
        this.userinfo.siteID = arg.siteId
        setTimeout(() => {
          this.initData()
        })
      } else {
        this.$cjhMessage({
          message: '请登录长江汇APP~',
          duration: 2000
        }).then(() => {
          this.$cjhNative.jsCallAppWebview('jsCallApp2Login')
        })
      }
    })
  },
  methods: {
    // 加载页面
    async initData () {
      const {
        data: { data: rdata, code }
      } = await to(axiosPost('/natrInit.as', this.userinfo))
      if (code === '0000') {
        rdata.myCollect.sort(function (a, b) {
          return a.order - b.order
        })
        this.natrData = rdata
        this.isBecomedV = rdata.isBecomedV
        for (let i = 0; i < rdata.myCumuList.length; i++) {
          let cum = rdata.myCumuList[i]
          if (cum.id === '1') {
            this.leijijiang.one.num = Number(cum.num)
            this.leijijiang.one.name = cum.name
          } else if (cum.id === '2') {
            this.leijijiang.two.num = Number(cum.num)
            this.leijijiang.two.name = cum.name
          } else if (cum.id === '3') {
            this.leijijiang.three.num = Number(cum.num)
            this.leijijiang.three.name = cum.name
          } else if (cum.id === '4') {
            this.leijijiang.four.num = Number(cum.num)
            this.leijijiang.four.name = cum.name
          }
        }
        this.natrData.myCumuNumper = 0 // 累积奖进度条百分比
        this.natrData.kyCumuFlag = 0 // 累积值已经达到的奖项
        this.natrData.yjCumuName = '' // 下一个目标奖项的名字
        this.natrData.chaCumuFlag = 0 // 距离下一个奖项还差...   负数表示可以开最大奖了，区分其他奖项
        this.natrData.diffCumuFlag = '/' // 累积值/下一个奖项的值
        if (Number(rdata.myCumuFlag) === 0) {
          let myCumuNumx = Number(rdata.myCumuNum)
          if (this.leijijiang.four.num > myCumuNumx) {
            this.natrData.myCumuNumper = myCumuNumx * (25 - 12.5) / this.leijijiang.four.num + 12.5
            this.natrData.kyCumuFlag = 0
            this.natrData.yjCumuName = this.leijijiang.four.name
            this.natrData.chaCumuFlag = this.leijijiang.four.num - myCumuNumx
            this.natrData.diffCumuFlag = myCumuNumx + '/' + this.leijijiang.four.num
          } else if (this.leijijiang.three.num > myCumuNumx && this.leijijiang.four.num <= myCumuNumx) {
            let jian1 = myCumuNumx - this.leijijiang.four.num
            let cha1 = this.leijijiang.three.num - this.leijijiang.four.num
            this.natrData.myCumuNumper = jian1 * 25 / cha1 + 25
            this.natrData.kyCumuFlag = 4
            this.natrData.yjCumuName = this.leijijiang.three.name
            this.natrData.chaCumuFlag = this.leijijiang.three.num - myCumuNumx
            this.natrData.diffCumuFlag = myCumuNumx + '/' + this.leijijiang.three.num
          } else if (this.leijijiang.two.num > myCumuNumx && this.leijijiang.three.num <= myCumuNumx) {
            let jian2 = myCumuNumx - this.leijijiang.three.num
            let cha2 = this.leijijiang.two.num - this.leijijiang.three.num
            this.natrData.myCumuNumper = jian2 * 25 / cha2 + 50
            this.natrData.kyCumuFlag = 3
            this.natrData.yjCumuName = this.leijijiang.two.name
            this.natrData.chaCumuFlag = this.leijijiang.two.num - myCumuNumx
            this.natrData.diffCumuFlag = myCumuNumx + '/' + this.leijijiang.two.num
          } else if (this.leijijiang.one.num > myCumuNumx && this.leijijiang.two.num <= myCumuNumx) {
            let jian3 = myCumuNumx - this.leijijiang.two.num
            let cha3 = this.leijijiang.one.num - this.leijijiang.two.num
            this.natrData.myCumuNumper = jian3 * 25 / cha3 + 75
            this.natrData.kyCumuFlag = 2
            this.natrData.yjCumuName = this.leijijiang.one.name
            this.natrData.chaCumuFlag = this.leijijiang.one.num - myCumuNumx
            this.natrData.diffCumuFlag = myCumuNumx + '/' + this.leijijiang.one.num
          } else {
            let jian4 = myCumuNumx - this.leijijiang.one.num
            this.natrData.myCumuNumper = jian4 * 25 / 50 + 100
            this.natrData.kyCumuFlag = 1
            this.natrData.yjCumuName = this.leijijiang.one.name
            this.natrData.chaCumuFlag = -1
            this.natrData.diffCumuFlag = myCumuNumx + '/' + this.leijijiang.one.num
          }
        }
        this.awardrecord()
      }
    },
    // 中奖纪录
    async awardrecord () {
      const {
        data: { data: rdata, code }
      } = await to(axiosPost('/natrMypriz.as', this.userinfo))
      if (code === '0000') {
        this.awarddata = rdata
      }
    },
    // 切换导航
    navclick (val) {
      this.navwhich = val
    },
    // 刮奖接口请求
    async clickscrape (val) {
      let shutype = { data: '', code: '' }
      const {
        data: { data: rdata, code }
      } = await to(
        axiosPost(
          val,
          Object.assign(this.userinfo, {
            hideLoading: true
          })
        )
      )
      shutype.code = code
      if (code === '0000') {
        shutype.data = rdata
      }
      return shutype
    },
    // 开始刮奖/一键刮奖
    opendraw (e, val) {
      if (!this.userinfo.memberId) {
        this.$cjhMessage({
          message: '请登录长江汇APP~',
          duration: 2000
        }).then(() => {
          this.$cjhNative.jsCallAppWebview('jsCallApp2Login')
        })
        return
      } else if (this.isclick) {
        return
      } else if (Number(this.isBecomedV) !== 1) {
        this.$cjhMessage({
          message: `本活动仅限大V用户参与`,
          duration: 2000
        })
        return
      }

      this.isclick = true
      let turn = document.getElementById('turn-anmin')
      let isClickScrape = ''

      if (val === 'all') {
        isClickScrape = '/natrClickScrape.as'
      } else {
        e.target.className = 'huxi'
        isClickScrape = '/oneClickScrape.as'
      }

      this.clickscrape(isClickScrape).then(shutype => {
        if (shutype.code === '0000') {
          var drawcon = ''
          for (let i = 0; i < shutype.data.myPrizList.length; i++) {
            drawcon += `<p>${shutype.data.myPrizList[i].name}</p>`
          }
          turn.style.transition = 'all ease-out'
          if (val === 'all') {
            turn.style.transitionDuration = '4S'
            turn.style.transform = 'rotate(720deg)'
          } else {
            turn.style.transitionDuration = '3S'
            turn.style.transitionDelay = '1s'
            let namezi = shutype.data.myPrizList[0].name
            let zanshi = namezi.substr(namezi.length - 1, namezi.length)
            if (zanshi === '长') {
              turn.style.transform = 'rotate(375deg)'
            } else if (zanshi === '江') {
              turn.style.transform = 'rotate(705deg)'
            } else if (zanshi === '汇') {
              turn.style.transform = 'rotate(675deg)'
            } else if (zanshi === '融') {
              turn.style.transform = 'rotate(645deg)'
            } else if (zanshi === '惠') {
              turn.style.transform = 'rotate(615deg)'
            } else if (zanshi === '百') {
              turn.style.transform = 'rotate(585deg)'
            } else if (zanshi === '川') {
              turn.style.transform = 'rotate(555deg)'
            } else if (zanshi === '一') {
              turn.style.transform = 'rotate(525deg)'
            } else if (zanshi === '二') {
              turn.style.transform = 'rotate(495deg)'
            } else if (zanshi === '三') {
              turn.style.transform = 'rotate(465deg)'
            } else if (zanshi === '凤') {
              turn.style.transform = 'rotate(435deg)'
            } else if (zanshi === '龙') {
              turn.style.transform = 'rotate(405deg)'
            } else {
              turn.style.transform = 'rotate(720deg)'
            }
          }
          setTimeout(() => {
            this.drawDialog = {
              visible: true,
              type: 1,
              content: drawcon
            }
            if (val !== 'all') {
              e.target.className = ''
            }
          }, 4500)
        } else {
          if (val !== 'all') {
            e.target.className = ''
          }
          this.isclick = false
        }
      })
    },
    // 开宝箱
    async opentreasure () {
      if (!this.userinfo.memberId) {
        this.$cjhMessage({
          message: '请登录长江汇APP~',
          duration: 2000
        }).then(() => {
          this.$cjhNative.jsCallAppWebview('jsCallApp2Login')
        })
      } else if (Number(this.natrData.myCumuFlag) === 0) {
        let bxcon = ''
        if (this.natrData.chaCumuFlag < 0) {
          bxcon = '您可领取最高奖项了哦！'
        } else if (this.natrData.kyCumuFlag === 0) {
          this.$cjhMessage({
            message: `您的累积值不足`,
            duration: 2000
          })
          return
        } else {
          bxcon = `仅差${this.natrData.chaCumuFlag}次即可获得“${this.natrData.yjCumuName}”`
        }
        this.drawDialog = {
          visible: true,
          type: 2,
          content: bxcon
        }
      }
    },
    // 弹层确认  开宝箱确认
    async bindClickRadDialogOnConfirm () {
      const {
        data: { data: rdata, code, msg }
      } = await to(axiosPost('/natrCumuExch.as', this.userinfo))
      if (code === '0000') {
        console.log(rdata)
        this.drawDialog.visible = false
        this.drawDialog = {
          visible: true,
          type: 1,
          content: msg
        }
      }
    },
    // 弹层取消
    bindClickRadDialogOnCancle () {
      this.drawDialog.visible = false
      let turn = document.getElementById('turn-anmin')
      turn.style.transition = 'all 0.1s ease-out'
      turn.style.transform = 'rotate(0deg)'
      this.isclick = false
      this.initData()
    }
  }
}
</script>

<style lang="less" scoped>
.draw-wrapper {
  width: 100%;
  min-height: 100vh;
  background: @theme-liner-bg;
  .draw-top {
    width: 100%;
    background-image: url("../../assets/images/backgb.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    .zhuanpan {
      padding-top: 350px;
      position: relative;
      overflow: hidden;
      .turnimg {
        img {
          width: 900px;
          height: 900px;
          margin-left: -75px;
        }
      }
      .arrowimg {
        position: absolute;
        left: 50%;
        top: 660px;
        margin-left: -30px;
        margin-top: -40px;
        z-index: 1;
        img {
          width: 60px;
          height: 80px;
        }
      }
      .startimg {
        position: absolute;
        top: 800px;
        left: 50%;
        margin-left: -175px;
        margin-top: -175px;
        width: 350px;
        height: 350px;
        background-image: url("../../assets/images/turn-radios.png");
        background-size: 100% 100%;
        text-align: center;
        img {
          width: 230px;
          height: 230px;
          margin: 60px auto;
        }
      }
    }
    .zhuzi {
      width: 100%;
      img {
        width: 540px;
        margin: -320px auto 0;
      }
    }
    .batch-open {
      width: 90%;
      background: #fff;
      border-radius: 30px;
      margin: 0 auto;
      text-align: center;
      .cjh-button {
        width: 400px;
        height: 120px;
        background: @theme-liner-btn;
        margin-top: -60px;
        font-size: 48px;
      }
      p {
        color: @theme-main-color;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 30px 0;
        font-size: 24px;
        i {
          display: block;
          font-style: normal;
          font-size: 52px;
        }
      }
    }
    .accumulative {
      .content {
        padding-bottom: 0;
      }
    }
  }
  .draw-down {
    margin-top: 30px;
    .collect {
      .content {
        .cjh {
          padding: 0 30px;
          margin-bottom: 20px;
        }
      }
    }
    .description {
      margin-top: 60px;
      .nav {
        width: 90%;
        height: 88px;
        line-height: 88px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-flex;
          width: 33%;
          height: 100%;
          text-align: center;
          color: #fff;
          font-size: 32px;
          background: @theme-btn-color;
          border-radius: 30px 30px 0 0;
          justify-content: space-around;
          align-items: center;
          box-shadow: 0 0 30px #debdae inset;
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background: #fff;
          }
        }
        .active {
          box-shadow: none;
          background: #fff;
          color: @theme-main-color;
          i {
            background: @theme-main-color;
          }
        }
      }
      .info {
        width: 90%;
        margin: 0 auto;
        padding: 40px 0 50px;
        background: #fff;
        border-radius: 0px 0px 30px 30px;
        ul > li {
          width: 90%;
          margin: 0 auto 50px;
          color: #999999;
          font-size: 22px;
          .title {
            font-size: 32px;
            color: @theme-main-color;
            height: 60px;
            line-height: 60px;
          }
          .tipsinfo {
            margin-bottom: 30px;
          }
          .level {
            width: 160px;
            height: 50px;
            line-height: 50px;
            margin: 20px auto;
            text-align: center;
            color: #fff;
            border-radius: 25px;
            font-size: 28px;
            background: @theme-liner-btn;
            box-shadow: 0 0 30px #efb599;
          }
          .goods {
            img {
              width: 100%;
              height: auto;
            }
          }
          .prize-content {
            width: 90%;
            margin: 0 auto;
            font-size: 26px;
            text-align: center;
          }
          .two-three-prize {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: 40px 0;
            > div {
              width: 49%;
            }
            .goods {
              width: 100%;
              height: 170px;
              img {
                width: auto;
                height: 170px;
                margin: 0 auto;
              }
            }
          }
          .remarks {
            margin-top: 30px;
            padding-left: 20px;
            p {
              margin-left: -20px;
            }
          }
          .collect {
            display: flex;
            justify-content: space-between;
            p {
              width: 49%;
              img {
                width: 100%;
                height: auto;
              }
            }
            .content {
              color: #666;
              font-size: 32px;
              i {
                font-style: normal;
                font-size: 22px;
                font-weight: 300;
              }
            }
          }
          .record {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-top: 10px;
            .time {
              width: 22%;
              word-break: keep-all; /* 不换行 */
              white-space: nowrap; /* 不换行 */
              overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
            }
            .infocon {
              width: 78%;
              text-align: left;
            }
          }
        }
        > ol > li {
          width: 80%;
          margin: 0 auto;
          color: #999999;
          font-size: 22px;
          line-height: 40px;
        }
      }
    }
  }
  .parts {
    width: 100%;
    .title {
      width: 320px;
      height: 120px;
      text-align: center;
      margin: 0 auto 20px;
      background: url("../../assets/images/title-bg.png") no-repeat;
      background-size: 100% 100%;
      span {
        display: inline-block;
        margin-top: 55px;
        color: #fff;
        font-size: 32px;
      }
    }
    .content {
      width: 80%;
      background: #fff;
      border-radius: 30px;
      margin: 0 auto;
      padding: 30px 5%;
      position: relative;
      .treasure {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .numtip {
        span {
          width: 200px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          overflow: hidden;
        }
      }
      .step {
        width: 100%;
        height: 30px;
        border-radius: 15px;
        margin: 18px 0;
        overflow: hidden;
        position: relative;
        .onepostion {
          display: inline-block;
          width: 112.5%;
          height: 30px;
          border-radius: 15px;
          background: #cccccc;
          margin-left: -12.5%;
          .twopostion {
            display: inline-block;
            height: 30px;
            background-image: url("../../assets/images/steps.png");
            background-size: cover;
            border-radius: 15px;
            position: absolute;
          }
        }
      }
      .radius {
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background: @theme-main-color;
        }
      }
      .tips {
        span {
          display: inline-block;
          width: 23%;
          text-align: center;
          font-size: 24px;
          color: @theme-font-color;
          height: 60px;
          line-height: 60px;
          overflow: hidden;
          font-weight: @theme-font-weight;
        }
      }
      .target {
        width: 320px;
        height: 70px;
        margin: 0 auto;
        background-image: url("../../assets/images/num-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        span {
          display: inline-block;
          font-size: 24px;
          color: #fff;
          margin-top: 28px;
          > span {
            margin: 0;
          }
        }
      }
      ul li {
        position: relative;
        img {
          width: 96px;
          height: 120px;
          border-radius: 10px;
        }
        span {
          display: inline-block;
          width: 96px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          position: absolute;
          bottom: 0;
        }
      }
      .flex {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .huxi {
    animation: scalebtn 1s linear backwards;
    -webkit-animation: scalebtn 1s linear backwards; /* Safari and Chrome */
  }
  @keyframes scalebtn {
    25% {
      transform: scale(0.8);
      -webkit-transform: scale(0.8);
    }
    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
  @-webkit-keyframes scalebtn {
    25% {
      transform: scale(0.8);
      -webkit-transform: scale(0.8);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    75% {
      transform: scale(0.8);
      -webkit-transform: scale(0.8);
    }
    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
  .huangdong {
    animation: rotateopen 1s linear infinite;
    -webkit-animation: rotateopen 1s linear infinite; /* Safari and Chrome */
  }
  @keyframes rotateopen {
    20% {
      transform: rotate(15deg);
      -webkit-transform: rotate(15deg);
    }
    40% {
      transform: rotate(-15deg);
      -webkit-transform: rotate(-15deg);
    }
    60% {
      transform: rotate(15deg);
      -webkit-transform: rotate(15deg);
    }
    80% {
      transform: rotate(-15deg);
      -webkit-transform: rotate(-15deg);
    }
  }
  @-webkit-keyframes rotateopen {
    20% {
      transform: rotate(15deg);
      -webkit-transform: rotate(15deg);
    }
    40% {
      transform: rotate(-15deg);
      -webkit-transform: rotate(-15deg);
    }
    60% {
      transform: rotate(15deg);
      -webkit-transform: rotate(15deg);
    }
    80% {
      transform: rotate(-15deg);
      -webkit-transform: rotate(-15deg);
    }
  }
}
</style>
