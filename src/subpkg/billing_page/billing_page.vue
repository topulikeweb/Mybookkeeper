<template>
  <view class="bigContainer">
    <!--    tab栏-->
    <view class="uni-tabs-box">
      <v-tabs v-model="current" :tabs="tabList" :pills="true" line-height="0"
              pills-color="#2855fc"
              :scroll="false"
              activeColor="#fff" @change="changeTab"
              style="padding-top: 40rpx"></v-tabs>
    </view>

    <!--    tab栏下内容部分使用轮播图-->
    <swiper class="swiper-box" :current="swiperCurrent" @change="changeSwiper">
      <swiper-item class="swiper-item">
        <view class="text-box">
          <uni-forms :modelValue="costForm" ref="sForm" rules="rules">
            <!--            金额输入框-->
            <uni-forms-item label="金额" name="spendMoney">
              <uni-easyinput v-model="costForm.spendMoney"
                             placeholder="请输入金额"
                             type="number" @click="showNumberKeyboard">
              </uni-easyinput>
            </uni-forms-item>

            <!--            类别输入框-->
            <uni-forms-item label="账户" prop="type">
              <picker name="type" :range="AccountTypeRanges"
                      @change="onTypeChange"
                      class="form-input">
                <view>{{ Account }}</view>
              </picker>
            </uni-forms-item>

            <!--            日历选择-->
            <uni-forms-item label="日期" name="calendar">
              <view>
                <uni-calendar
                    ref="calendar"
                    :insert="false"
                    @confirm="confirm"
                />
                <button @click="open" type="primary" class="openDate">
                  {{ costForm.calendar || '请选择时间' }}
                </button>
              </view>
            </uni-forms-item>

            <!--            支出类别-->
            <uni-forms-item label="支出类型">
              <picker name="type" :range="spendTypeRanges"
                      @change="onSpendChange"
                      class="form-input">
                <view>{{ Spend }}</view>
              </picker>
            </uni-forms-item>

            <!--            备注-->
            <uni-forms-item label="消费地点">
              <uni-easyinput type="textarea" class="textInput"
                             placeholder="输入消费地点">

              </uni-easyinput>
            </uni-forms-item>
            <!--            上传图片-->
            <uni-forms-item>
              <uni-section title="选择消费凭据(发票)" type="line">
                <view class="example-body">
                  <uni-file-picker limit="1"
                                   title="最多选择1张图片"
                                   @select="getImageUrl"></uni-file-picker>
                </view>
              </uni-section>
            </uni-forms-item>
          </uni-forms>
          <button type="primary" @click="submitSpend"
                  v-model="costForm.remarks" class="submitSpend">
            保存
          </button>
        </view>
      </swiper-item>

      <!--      收入界面-->
      <swiper-item class="swiper-item">
        <view class="text-box">
          <uni-forms :modelValue="costForm" ref="iForm" rules="rules">
            <!--            金额输入框-->
            <uni-forms-item label="金额" name="spendMoney">
              <uni-easyinput v-model="costForm.spendMoney"
                             placeholder="请输入金额"
                             type="number" @click="showNumberKeyboard">
              </uni-easyinput>
            </uni-forms-item>

            <!--            类别输入框-->
            <uni-forms-item label="账户" prop="type">
              <picker name="type" :range="AccountTypeRanges"
                      @change="onTypeChange"
                      class="form-input">
                <view>{{ Account }}</view>
              </picker>
            </uni-forms-item>

            <!--            日历选择-->
            <uni-forms-item label="日期" name="calendar">
              <view>
                <uni-calendar
                    ref="calendar2"
                    :insert="false"
                    @confirm="confirm2"
                />
                <button @click="open2" type="primary" class="openDate">
                  {{ costForm.calendar || '请选择时间' }}
                </button>
              </view>
            </uni-forms-item>

            <!--            收入类别-->
            <uni-forms-item label="收入类型">
              <picker name="type" :range="incomeTypeRanges"
                      @change="onSpendChange"
                      class="form-input">
                <view>{{ Income }}</view>
              </picker>
            </uni-forms-item>

            <!--            消费地点-->
            <uni-forms-item label="消费地点">
              <uni-easyinput type="textarea" class="textInput"
                             placeholder="可输入消费地点">

              </uni-easyinput>
            </uni-forms-item>
            <uni-forms-item>
              <!--              选择图片-->
              <uni-section title="选择消费凭据(发票)" type="line">
                <view class="example-body">
                  <uni-file-picker limit="1"
                                   title="最多选择1张图片"
                                   ref="imgPicker"
                                   @select="getImageUrl"></uni-file-picker>
                </view>
              </uni-section>
            </uni-forms-item>
          </uni-forms>
          <button type="primary" @click="submitIncome"
                  v-model="costForm.remarks" class="submitSpend">
            保存
          </button>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      tabList: ['支出', '收入'],
      current: 0,// tab栏的索引
      showKeyBoardFlag: false,
      showIncomePickerFlag: false,
      // 表单数据(收入和消费共用一个表单)
      costForm: {
        spendMoney: '',// 消费金额
        spendType: '',// 消费类型
        remarks: '',// 消费地点
        AccountType: '',// 账户类型
        calendar: '',// 消费时间
        flag: '',// 标志判断是收入还是消费
        credential: '',// 消费凭证
        shoper: ' '// 店家信息
      },
      AccountTypeRanges: ['现金', '微信', '支付宝', '银行卡'],
      spendTypeRanges: ['餐饮', '出行', '娱乐', '学习', '日用品', '其他'],
      incomeTypeRanges: ['工资', '生活费', '转账', '其他'],
      accountIndex: 0,
      spendIndex: 0,
      swiperCurrent: 0,
      // 表单校验
      rules: {
        spendMoney: {
          rules: [
            {
              required: true,
              errorMessage: '请输入金额'
            }
          ]
        },
        calendar: {
          rules: [
            {
              required: true,
              errorMessage: '请选择时间'
            }
          ]
        }
      },
    }
  },
  computed: {
    ...mapState('m_list', ['timeList']),
    // 账户类型
    Account: {
      get () {
        return this.AccountTypeRanges[this.accountIndex];
      },
      set (val) {
        this.costForm.AccountType = val;
        console.log(val);
      }
    },
    // 消费类型
    Spend: {
      get () {
        return this.spendTypeRanges[this.spendIndex];
      },
      set (val) {
        this.costForm.spendType = val;
      }
    },
    Income: {
      get () {
        return this.incomeTypeRanges[this.spendIndex];
      },
      set (val) {
        this.costForm.spendType = val
      }
    }
  },
  methods: {
    ...mapMutations('m_list', ['updateTimeList']),
<<<<<<< HEAD
    /**
     * @Description: 顶部tab栏切换触发
     * @author topu
     * @date 2023/1/16
     */
=======
    ...mapMutations('m_user', ['tokenLister']),
    // 顶部tab栏切换
>>>>>>> 623404e783e30fbddf78ddae9a99cf6dc120c9f6
    changeTab (index) {
      this.current = index;
      this.swiperCurrent = index
    },
    // swiper改变，让tab栏跟着一起改变
    changeSwiper (e) {
      this.current = e.detail.current
    },
    // 获取图片的url，目前只获取一张
    getImageUrl (e) {
      this.costForm.credential = e.tempFilePaths[0]
    },
    showNumberKeyboard () {
      this.showKeyBoardFlag = true;
    },
    showIncomePicker () {
      this.showKeyBoardFlag = true;
    },

    /**
     * @author topu
     * @date 2023/1/16
     * @Description
     * @param {type} [param] 点击账户的信息详情
     * @return 返回值
    */
    onTypeChange (e) {// 账户类型
      this.accountIndex = e.detail.value
      this.costForm.AccountType = this.Account
    },
    onSpendChange (e) {
      this.spendIndex = e.detail.value
      this.costForm.spendType = this.Spend
    },
    // 点击打开日历
    open () {
      this.$refs.calendar.open();

    },
    open2 () {
      this.$refs.calendar2.open()
    },
    confirm (e) {
      this.costForm.calendar = e.fulldate
    },
    confirm2 (e) {
      // 日历选择的日期
      this.costForm.calendar = e.fulldate
    },
    // 提交消费表单信息给后端
    submitSpend () {
      if (Date.parse(this.costForm.calendar) <= this.getNowTime()) {
        // 将消费类型校验，以免错误的提交消费类型
        this.costForm.spendType = this.spendTypeRanges[this.spendIndex];
        uni.showLoading({
          title: '数据加载中'
        })
        this.costForm.flag = 0
        console.log(this.$refs)
        this.$refs.sForm.validate().then(res => {
          uni.$showMsg('保存成功', 2000)
          // TODO 后端接口（把表单信息传给后端）
          console.log('表单信息', this.costForm)


          this.costForm.spendMoney = ''
          uni.hideLoading()
        }).catch(err => {
          uni.$showMsg('表单信息有误', 2000)
          console.log(err)
          uni.hideLoading()
        })
        // 将时间传给账单列表的时间选择框
        if (this.costForm.calendar) {
          // 先判断有没有重复
          const result = this.timeList.find((item) => {
            return item === this.costForm.calendar
          })
          // 如果没有重复
          if (!result) {
            this.timeList.push(this.costForm.calendar)
            // // 将本次消费时间存入本地
            // this.setTimeList()
            this.updateTimeList(this.timeList)
          }
        }
      } else {
        uni.$showMsg('不能选择之后的日期')
      }
    },
    // 获取当前时间(秒)
    getNowTime () {
      const date = new Date()
      return date.getTime()
    },
    // 提交收入
    submitIncome () {
      // 判断用户选择的时间是否正确
      if (Date.parse(this.costForm.calendar) <= this.getNowTime()) {
        this.costForm.spendType = this.incomeTypeRanges[this.spendIndex];
        uni.showLoading({
          title: '数据加载中'
        })
        // 将本次提交账单状态设置为收入
        this.costForm.flag = 1
        // 点击后进行的回调函数
        this.$refs.iForm.validate().then(res => {
          uni.$showMsg('保存成功', 2000)
          // TODO 后端接口和上述一样（把表单信息传给后端）
          console.log('表单信息', this.costForm)


          this.costForm.spendMoney = ''
          uni.hideLoading()
        }).catch(err => {
          uni.$showMsg('表单信息有误', 2000)
          uni.hideLoading()
        })
        // 将时间传给账单列表的时间选择框
        if (this.costForm.calendar) {
          // 先判断有没有重复
          const result = this.timeList.find((item) => {
            return item === this.costForm.calendar
          })
          // 如果没有重复
          if (!result) {
            this.timeList.push(this.costForm.calendar)
            // 将本次消费时间存入本地
            this.updateTimeList(this.timeList)
          }
        }
      } else {
        uni.$showMsg('不能选择之后的日期')
      }
      console.log(this.$refs.imgPicker)
    }
  },
  created () {
    this.costForm.AccountType = this.Account
    if (this.costForm.flag === 0) {
      this.costForm.spendType = this.Spend
    } else {
      this.costForm.spendType = this.Income
    }
  },
  // 设置表单校验规则
  onReady () {
    // 需要在onReady中设置规则
    this.$refs.sForm.setRules(this.rules)
    this.$refs.iForm.setRules(this.rules)
  },
  onShow () {
    this.tokenLister()
  }
}
</script>

<style lang="scss">
.bigContainer {
  background-color: #e3dfdf;

  .uni-tabs-box {
    margin-top: 30rpx;
  }

  .swiper-box {
    width: 90%;
    background-color: #ffffff;
    margin: 20rpx auto;
    border-radius: 20rpx;
    //box-sizing: border-box;
    padding: 20rpx;
    font-size: 28rpx;
    // TODO：记得改高度
    height: 1200rpx;

    .uni-forms-item {
      border-bottom: 0.5px #e3e1e1 solid;
    }

    .form-input {
      height: 100%;
      width: 40%;
      text-align: center;
      line-height: 200%;
      font-size: 32rpx;
      color: #0d0a0e;
      background-color: #f8dc2d;
      border-radius: 15rpx;
      font-weight: 600;
      position: absolute;
      right: 0;
    }

    .openDate {
      position: absolute;
      right: 0;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50%;
      text-align: center;
      //line-height: 200%;
      font-size: 32rpx;
      color: #0d0a0e;
      font-weight: 600;
      background-color: #f8dc2d;
      border-radius: 15rpx;
    }
  }

  .submitSpend {
    position: relative;
    top: 0;
    background-color: #0d0a0e;
    color: white;
  }
}
</style>
