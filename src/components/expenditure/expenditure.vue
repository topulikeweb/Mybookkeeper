<template>
  <view>
    <!--    金额-->
    <view class="container1">
      <uni-forms ref="form" :modelValue="formData" :rules="rules"
                 label-position="left">
        <uni-forms-item label="金额" name="money" required>
          <input type="number" v-model="formData.money"
                 placeholder="请输入金额"
                 style="height: 100rpx;font-size: 30rpx;line-height: 100rpx;position: relative;margin-right: 0rpx"/>
        </uni-forms-item>
      </uni-forms>
    </view>

    <!--    类别-->
    <view class="container2">
      <view class="cate ">类别 :</view>

      <dropdown :list="list" @onClick="dropDownChange" :current="dropCurrent"
                style="width:500rpx;position:relative;left: 500rpx"></dropdown>
    </view>

    <view class="container3">
      <!--    日期选择-->
      <view style="font-size: 33rpx;margin-left:50rpx ">
        日期 :
      </view>
      <button type="default" @click="openDatetimePicker" class="btnDate" style=" width: 50%;
  height: 70rpx;">
        {{ defaultDate }}
      </button>
      <SimpleDateTimePicker
          ref="myPicker"
          @submit="handleSubmit"
          :start-year="2000"
          :end-year="2030"
      />
    </view>
    <!--    保存按钮-->
    <button @click="submit" type="primary" class="btn">保存
    </button>
  </view>
</template>


<script>
import SimpleDateTimePicker
  from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";

export default {
  components: {
    SimpleDateTimePicker,
  },
  name: "expenditure",
  data () {
    /**
     * 消费信息包括但不限于：消费时间，金额，消费类型，消费店家。
     * 消费类型包括：餐饮，出行，娱乐，学习，日用品及其他。
     * 消费凭据种类：包括但不限于外卖小票、购物小票，火车票，出租车发票，
     * 电影票，过路费，船运票，客运票等
     */
    return {
      formData: {
        money: "",
        cate: 0,// 默认选择
        date: "" // 消费时间
      },
      // 下拉框内容
      list: ['餐饮', '出行', '娱乐', '学习', '日用品', '其它'],
      dropCurrent: 0,// 下拉选择框的选择位置
      defaultDate: '选择时间'// 默认时间
    }
  },
  methods: {
    // 保存按钮
    submit () {
      uni.$showMsg('保存成功')
    },
    // 数据选择框,选择就会触发函数
    dropDownChange (value) {
      this.dropCurrent = value
    },
    // 打开picker
    openDatetimePicker () {
      this.$refs.myPicker.show();
    },

    // 关闭picker
    closeDatetimePicker () {
      this.$refs.myPicker.hide();
    },

    handleSubmit (e) {
      // {year: "2019", month: "07", day: "17", hour: "15", minute: "21"}
      console.log(e);
      this.formData.date = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
      this.defaultDate = this.formData.date
    },
  }
}
</script>

<style scoped>
::v-deep .btnDate {
  background-color: #f5bf74;
  color: #eee8e8;
  line-height: 70rpx;
  position: absolute;
  left: 300rpx;
  z-index: 2;
}

.container2 {
  height: 400rpx;
  width: 100%;
  position: relative;
  top: 200rpx;
  border-bottom: #aba9a9 1px solid;
  border-top: #aba9a9 1px solid;
  display: flex;
  justify-content: space-between;
}

.container3 {
  margin-top: 50rpx;
  width: 100%;
  position: relative;
  top: 300rpx;
  border-bottom: #aba9a9 1px solid;
}

.container1 {
  left: -70rpx;
  position: relative;
  top: 30rpx;
  margin: auto;
}

::v-deep .data-v-f7d69ff8 {
  width: 100%; /*有改动*/
  height: 130rpx;
  position: absolute;
  right: 0;
  /*border-bottom: 1px #706f6f solid;*/
}

.btn {
  width: 50%;
  height: 100rpx;
  margin-top: 700rpx;
  position: absolute;
  left: 0;
  background-color: #007aff;
}

::v-deep text {
  position: relative;
  top: 10rpx;
  font-size: 30rpx;
  color: black;
  height: 50rpx;
  line-height: 50rpx;
}

.cate {
  position: absolute;
}
/*::v-deep text{*/
/*  !*margin-left: 20rpx;*!*/
/*  position: absolute;*/
/*  left: -20rpx;*/
/*}*/
/*::v-deep .uni-forms-item__content{*/
/*  position: absolute;*/
/*  left: -20rpx;*/
/*}*/
</style>
