<template>
  <view class="bigContainer">
    <!--    tab栏-->
    <view class="uni-tabs-box">
      <v-tabs v-model="current" :tabs="tabList" :pills="true" line-height="0"
              pills-color="#db91ec"
              padding-item="100rpx"
              activeColor="#fff" @change="changeTab"></v-tabs>
    </view>

    <!--    tab栏下内容部分使用轮播图-->
    <swiper class="swiper-box" :current="swiperCurrent"
            @animationfinish="animationfinish">
      <swiper-item class="swiper-item">
        <view class="text-box">
          <uni-forms :modelValue="costForm">
            <!--            金额输入框-->
            <uni-forms-item label="金额">
              <uni-easyinput v-model="costForm.money" placeholder="请输入金额"
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
            <uni-forms-item label="日期">
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
            <uni-forms-item label="备注">
              <uni-easyinput type="textarea" class="textInput"
                             placeholder="可输入账单备注">

              </uni-easyinput>
            </uni-forms-item>
          </uni-forms>
          <button type="primary" @click="submitSpend"
                  v-model="costForm.remarks" class="submitSpend">
            保存
          </button>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data () {
    return {
      tabList: ['支出', '收入', '转账'],
      current: 0,// tab默认索引
      showKeyBoardFlag: false,
      showIncomePickerFlag: false,
      costForm: { // 消费表单数据
        money: '',
        SpendType: '',// 消费类型
        remarks: '',// 备注信息
        AccountType: '',// 账户类型
        calendar: '',
      },
      AccountTypeRanges: ['现金', '微信', '支付宝', '银行卡'],
      spendTypeRanges: ['餐饮', '出行', '娱乐', '学习', '日用品', '其他'],
      accountIndex: 0,
      spendIndex: 0,
    }
  },
  computed: {
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
        this.costForm.SpendType = val;
      }
    }
  },
  methods: {
    // 顶部tab栏切换
    changeTab (index) {
      this.current = index;
    },
    showNumberKeyboard () {
      this.showKeyBoardFlag = true;
    },
    showIncomePicker () {
      this.showKeyBoardFlag = true;
    },
    // 类别选择器改变(将内容改变为选择的类型)
    onTypeChange (e) {// 账户类型
      this.accountIndex = e.detail.value
      this.costForm.AccountType = this.Account
    },
    onSpendChange (e) {
      this.spendIndex = e.detail.value
      this.costForm.SpendType=this.Spend
    },
    // 点击打开日历
    open () {
      this.$refs.calendar.open();

    },
    confirm (e) {
      // 日历选择的日期
      this.costForm.calendar = e.fulldate
    },
    // 提交表单信息给后端
    submitSpend () {
      console.log(this.costForm)
    }
  },
  created () {
    this.costForm.AccountType = this.Account
    this.costForm.SpendType = this.Spend
  }
}
</script>

<style lang="scss">
.bigContainer {
  background-color: #e3dfdf;


  .swiper-box {
    width: 90%;
    background-color: #ffffff;
    margin: 20rpx auto;
    border-radius: 20rpx;
    //box-sizing: border-box;
    padding: 20rpx;
    font-size: 28rpx;
    // TODO：记得改高度
    height: 1000rpx;

    .uni-forms-item {
      border-bottom: 1px #b7b6b6 solid;
    }

    .form-input {
      height: 100%;
      width: 40%;
      text-align: center;
      line-height: 200%;
      font-size: 32rpx;
      color: white;
      background-color: #007aff;
      border-radius: 15rpx;
    }

    .openDate {
      position: absolute;
      left: 0rpx;
      height: 100%;
      width: 50%;
      text-align: center;
      line-height: 200%;
      font-size: 32rpx;
      color: white;
      background-color: #007aff;
      border-radius: 15rpx;
    }
  }
  .submitSpend{
    background-color:#db91ec ;
  }
}
</style>
