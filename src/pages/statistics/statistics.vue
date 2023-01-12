<template>
  <view class="container">
    <view class="page">
      <view>
        <view class="text">月份:</view>
        <uni-data-select
            :clear="false"
            v-model="value"
            :localdata="timeRange"
            @change="changeMouth"
            class="page1"
        ></uni-data-select>
      </view>
      <view>
        <view class="text">类型:</view>
        <uni-data-select
            :clear="false"
            v-model="value"
            :localdata="typeRange"
            @change="changeType"
            class="page2"
        ></uni-data-select>
      </view>
    </view>

    <!--    滑块-->
    <uni-swipe-action-item :right-options="options"
                           @click="onClick(key)"
                           v-for="(item,key) in spendList" :key="key">
      <!--      列表-->
      <uni-list-chat :title="item.SpendMoney"
                     :avatar="imageUrl[item.flag]"
                     :note="item.remark"
                     badge-positon="left">
        <view class="chat-custom-right">
          <text class="chat-custom-text">{{ item.calendar }}</text>
          <!-- 需要使用 uni-icons 请自行引入 -->
          <uni-icons type="smallcircle-filled" :color="color[item.flag]"
                     size="25"></uni-icons>
        </view>
      </uni-list-chat>
    </uni-swipe-action-item>
  </view>
</template>

<script>

import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  /** TODO 本页面需要完成的：
   * 1：请求到用户所有的记账信息
   * 2: 删除对应的li
   * 3：根据用户的选择账单的时间和类型进行列表的筛选
   */
  name: "statistics",
  data () {
    return {
      // 请过来的数组
      spendList: [],
      value: 0,
      // 月份列表
      timeRange: [
        { value: 0, text: '全部' }
      ],
      // 类型列表
      typeRange: [
        {
          value: 0, text: '全部'
        },
        {
          value: 0, text: '收入'
        },
        {
          value: 0, text: '支出'
        }
      ],
      // 选中的结果
      theResult: {
        mouthResult: '',
        typeResult: ''
      },
      //  收入支出图片的链接(第一个是收入)
      imageUrl: ['https://s2.loli.net/2023/01/11/KVlBmiPErIUR2Gk.png',
        'https://s2.loli.net/2023/01/11/XaTEfy9kePlYNSr.png'],
      color: ['red', 'green'],
      // 滑块选择框
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
    };
  },
  computed: {
    ...mapState('m_list', ['timeList']),
  },
  methods: {
    ...mapMutations('m_list', ['setTimeList']),
    ...mapMutations('m_list', ['updateSpendList']),
    changeMouth (e) {
      this.theResult.mouthResult = this.timeRange[e]
      // console.log():
      // text: "全部"
      // value: 0
    },
    changeType (e) {
      this.theResult.typeResult = this.typeRange[e]
    },
    // 将timeList的时间以键值对的形式添加到timeRange中
    addTimeRange () {
      for (let i = 0; i < this.timeList.length; i++) {
        let obj = {}
        obj.value = i
        obj.text = this.timeList[i]
        this.timeRange.push(obj)
      }
    },

    // 点击滑块的删除按钮,删除对应的li
    onClick (key) {
      // TODO 删除的接口


      // 删除过后重新获取数据
      this.getSpendList()
      // 刷新页面
      uni.redirectTo({
        url: '/pages/statistics/statistics'
      })

      // let TheDeleteSpendList = this.spendList.splice(key, 1)
      // 将删除后的spendList保存到本地
      // this.updateSpendList(t)
    },

    getSpendList () {
      // TODO 这有一个后端接口函数，后端接口给spendList进行赋值（并将spendList存入本地）
      this.spendList = [{
        calendar: '2021 - 10 - 02',
        SpendMoney: '12',
        flag: 1,
        remark: '成都市郫都区红光镇',
        spendType: '买东西'
      }, {
        calendar: '2021 - 10 - 02',
        SpendMoney: '14',
        flag: 0,
        remark: '成都市郫都区红光镇',
        spendType: '买东西'
      },
        {
          calendar: '2021 - 10 - 02',
          SpendMoney: '14',
          flag: 0,
          remark: '成都市郫都区红光镇',
          spendType: '买东西'
        }]
      this.updateSpendList(this.spendList)
    },
  },
  created () {
    this.getSpendList()
    this.addTimeRange()
  }
}
</script>

<style scoped lang="scss">
.container {
  .page {
    width: 100%;
    display: flex;
    justify-content: space-between;

    ::v-deep .data-v-5f3cdb66 {
      font-size: 30rpx;
      display: flex;
      justify-content: space-between;
      width: 75%;

      .text {
        width: 80rpx;
        line-height: 65rpx;
      }
    }
  }
}
</style>
