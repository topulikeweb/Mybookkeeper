<template>
  <ir-tabs :navs="navs" :multiple="true">
    <template v-slot:page1>
      <view>
        <expenditure></expenditure>
      </view>
    </template>

    <template v-slot:page2>
      <view>
        <income></income>
      </view>
    </template>

    <template v-slot:page3>
      <view>
        <tranfer></tranfer>
      </view>
    </template>

    <template v-slot:page4>
      <view>
        <repayment></repayment>
      </view>
    </template>
  </ir-tabs>
</template>


<script>
import irTabs from '../../components/ir-tabs/ir-tabs'

export default {
  components: { irTabs },
  name: "billing_page",
  data () {
    return {
      navs: ['支出', '收入', '转账', '还款']
    }
  }
}
</script>

<style scoped>
.submitForm {
  width: 50%;
  background-color: #007aff;
  margin-top: 100rpx;
}

::v-deep .uni-stat__select {
  width: 50%;
  margin-left: 200rpx;
}

.type {
  position: absolute;
  left: 20rpx;
  font-weight: 300;
  font-size: 30rpx;
}

::v-deep .uni-forms-item {
  width: 80%;
  margin-left: 40rpx;

}

</style>
