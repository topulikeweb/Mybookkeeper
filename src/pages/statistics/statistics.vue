<template>
  <view class="container">
    <view class="top-box">
      <view class="example-body">
        <button type="primary" @click="showDrawer('showLeft')" class="openBtn">
          <text class="word-btn-white">筛选</text>
        </button>
        <view class="panel">
          <view>收入</view>
          <view class="panel-text">0.00</view>
        </view>
        <view class="panel">
          <view>消费</view>
          <view class="panel-text">0.00</view>
        </view>
      </view>

      <uni-drawer ref="showLeft" mode="left" :width="400"
                  @change="change($event,'showLeft')">
        <view class="close">
          <button @click="closeDrawer('showLeft')" class="close-btn">
            <text class="word-btn-white">关闭</text>
          </button>
          <!--          抽屉里面的内容-->
          <view class="page">
            <view>
              <!--              时间选择框-->
              <!--        <view class="text">月份:</view>-->
              <!--        <uni-data-select-->
              <!--            :clear="false"-->
              <!--            v-model="value"-->
              <!--            :localdata="timeRange"-->
              <!--            @change="changeMouth"-->
              <!--            class="page1"-->
              <!--        ></uni-data-select>-->
              <uni-section :title="'选择的日期是：' + single"
                           type="line"></uni-section>
              <view class="example-body">
                <uni-datetime-picker type="date" :clear-icon="true"
                                     v-model="single"
                                     @maskClick="maskClick"
                                     @change="changeCalender"/>
              </view>
            </view>
            <!--类型选择框-->
            <view>
              <uni-section :title="'选择的类型是：'" type="line"></uni-section>
              <uni-data-select
                  :clear="false"
                  v-model="value"
                  :localdata="typeRange"
                  @change="changeType"
                  class="page2"
              ></uni-data-select>
            </view>
          </view>
        </view>
      </uni-drawer>
    </view>


    <view class="list-box">
      <view class="list-inside-box">
        <text>账单列表</text>
      </view>
      <!--    滑块-->
      <uni-swipe-action-item :right-options="options"
                             @click="onClick(key)"
                             v-for="(item,key) in spendList" :key="key">
        <!--      列表-->
        <uni-list-chat :title="item.calendar"
                       :avatar="imageUrl[item.flag]"
                       :note="item.spendType"
                       badge-positon="left">
          <view class="chat-custom-right">
            <text class="chat-custom-text">{{ item.spendMoney }}</text>
            <!-- 需要使用 uni-icons 请自行引入 -->
            <uni-icons type="smallcircle-filled" :color="color[item.flag]"
                       size="25"></uni-icons>
          </view>
        </uni-list-chat>
      </uni-swipe-action-item>
      <view class="list-bottom">
        <text>. . . . . .</text>
      </view>
    </view>
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
      showLeft: false,
      single: '',
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
    ...mapMutations('m_list', ['updateSpendList', 'updateTimeList']),
    ...mapMutations('m_user', ['tokenLister']),
    maskClick (e) {
      console.log('maskClick事件:', e);
    },
    showDrawer (e) {
      this.$refs[e].open()
    },
    closeDrawer (e) {
      this.$refs[e].close()
    },
    // 给选择的日期赋值给single
    changeCalender (e) {
      this.single = e;
      console.log(e)
    },
// 抽屉状态发生变化触发
    change (e, type) {
      console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
      this[type] = e
    },
    changeType (e) {
      this.theResult.typeResult = this.typeRange[e]
    },
    // 将timeList的时间以键值对的形式添加到timeRange中
    addTimeRange () {
      // 先对记账时间进行排序
      this.sortTime()
      console.log('调用了')
      for (let i = 0; i < this.timeList.length; i++) {
        let obj = {}
        obj.value = i
        obj.text = this.timeList[i]
        this.timeRange.push(obj)
      }
    },
    // 给记账时间进行排序
    sortTime () {
      // 将时间转换为毫秒来比较进行排序
      this.timeList.sort((a, b) => {
        return Date.parse(b) - Date.parse(a)
      })
      // 将排好序的timeList保存进本地
      this.updateTimeList(this.timeList)
      console.log(12312, this.timeList)
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

    /**
     * 获取总账单列表
     */
    getSpendList () {
      // TODO 这有一个后端接口函数，后端接口给spendList进行赋值（并将spendList存入本地）
      this.spendList = [{
        calendar: '2022 - 10 - 02',
        spendMoney: '12',
        flag: 1,
        remark: '成都市郫都区红光镇',
        spendType: '出行'
      }, {
        calendar: '2023 - 01 - 02',
        spendMoney: '14',
        flag: 0,
        remark: '成都市郫都区红光镇',
        spendType: '日用品'
      },
        {
          calendar: '2022 - 10 - 02',
          spendMoney: '14',
          flag: 0,
          remark: '成都市郫都区红光镇',
          spendType: '学习'
        }]
      this.updateSpendList(this.spendList)
    },
  },
  onShow () {
    this.getSpendList()
    this.addTimeRange()
    this.tokenLister()
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  background-color: #f5f4f4;

  .openBtn {
    background-color: #f8dc2d;
    width: 30%;
    height: 45%;
    color: black;
    font-weight: 600;
    margin-left: 0;
  }

  .top-box {
    width: 100%;
    height: 20%;
    background-color: #2855fc;
  }

  .example-body {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 190rpx;

    .panel {
      width: 27%;
      height: 100%;
      line-height: 170%;

      .panel-text {
        font-size: 45rpx;
      }
    }
  }

  .scroll-view {
    /* #ifndef APP-NVUE */
    width: 100%;
    height: 100%;
    /* #endif */
    flex: 1
  }

  // 处理抽屉内容滚动
  .scroll-view-box {
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .info {
    padding: 15px;
    color: #666;
  }

  .info-text {
    font-size: 14px;
    color: #666;
  }

  .info-content {
    padding: 5px 15px;
  }

  .close {
    padding: 10px;

    .close-btn {
      width: 50%;
      margin: auto;
      background-color: #007aff;
    }
  }

  .page {
    width: 100%;

    .example-body {
      background-color: #fff;
      padding: 10px;
    }

    ::v-deep .data-v-5f3cdb66 {
      font-size: 30rpx;
      width: 75%;

      .text {
        width: 80rpx;
        line-height: 65rpx;
      }
    }
  }

  .list-box {
    width: 90%;
    position: absolute;
    top: 190rpx;
    left: 5%;
    border-radius: 40rpx;
    box-shadow: 0px 0px 30px #9a9797;

    .list-bottom {
      width: 100%;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      background-color:white;
      border-radius: 40rpx;
    }

    .list-inside-box {
      width: 100%;
      background-color: white;
      border-radius: 20rpx 20rpx 0 0;
      height: 50rpx;

      text {
        width: 40rpx;
        font-size: 32rpx;
        margin-left: 40rpx;
        line-height: 50rpx;
        font-weight: 500;
      }

      ::v-deep .uni-list-chat__content-title {
        font-size: 32rpx;
      }

      .chat-custom-text {
        font-size: 38rpx;
        margin-left: 80rpx;
      }
    }
  }
}

</style>
