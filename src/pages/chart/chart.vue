<template>
  <view class="container">
    <!--    tab栏-->
    <v-tabs v-model="current" :tabs="tabs" @change="changeTab"
            :scroll="false"></v-tabs>

    <swiper :current="current">
      <!--        月份下拉框-->
      <view>
        <hpy-form-select :dataList="mouthRange" text="text" name="value"
                         v-model="mouthValue" islot="true"
                         @change="mouthChange">
          <view class="my-select">{{ mouthText }}</view>
        </hpy-form-select>
      </view>
      <swiper-item>
        <!--    折线图-->
        <view class="charts-box">
          <qiun-data-charts
              type="line"
              :opts="lineOpts"
              :chartData="chartData"
              :canvas2d="true"
              canvas-id="world"
          />
        </view>
        <!--        扇形图-->
        <view class="charts-box">
          <qiun-data-charts
              type="pie"
              :opts="fanOpts"
              :chartData="fanChartData"
              :canvas2d="true"
              canvas-id="hello"
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 月份下拉框
      mouthValue: 0,
      mouthText: '',
      mouth: '',
      // 消费月份的列表(默认为列表第一个)
      mouthRange: [],
      // tab栏的数值
      current: 0,
      // tab栏的选项
      tabs: ['月', '年'],
      // 消费金额数组
      spendMoneyArray: [],
      // 收金额数组
      incomeMoneyArray: [],
      // 时间数组（x轴）
      calendarArray: [],
      chartData: {},
      fanChartData: {},
      fanDataObj: [],
      lineOpts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          }
        }
      },
      fanOpts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      }
    };
  },
  onReady () {
    // 获取所有账单的月份
    this.getTimeList()

    this.getServerData();
    // 获取消费金额的数组
    this.getMoneyArray()
    // 获取现今的年月
    this.getCalendar()
    // 获取扇形图的数据
    this.getFanMouthData()
  },
  computed: {
    ...mapState('m_list', ['spendList']),
    ...mapState('m_list', ['timeList'])
  },
  methods: {
    getServerData () {
      //模拟从服务器获取数据时的延时(这里就用后端接口了，页面处理逻辑就行)
      setTimeout(() => {
            let res = {
              categories: this.calendarArray,
              series: [
                {
                  name: "消费",
                  data: this.spendMoneyArray
                },
                {
                  name: "收入",
                  data: this.incomeMoneyArray
                }
              ]
            };
            // 扇形图的数据
            let fanRes = {
              series: [
                {
                  data: this.fanDataObj
                }
              ]
            };
            this.fanChartData = JSON.parse(JSON.stringify(fanRes));
            this.chartData = JSON.parse(JSON.stringify(res));
          }, 100
      )
      ;
    },

// 获取记账列表中消费和收入的金额，将其分别组成一个数组提供给折线图
    getMoneyArray () {
      this.spendMoneyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.spendList.forEach(item => {
        let calendar_mouth = item.calendar.substring(10, 6).trim()
        // console.log(12, calendar_mouth)
        if (item.flag === 0) {
          // 强制转换为数字
          item.SpendMoney = parseInt(item.SpendMoney)
          // 根据月份来进行加减
          switch (calendar_mouth) {
            case '01':
              this.spendMoneyArray[0] = item.SpendMoney + this.spendMoneyArray[0]
              break;
            case '02':
              this.spendMoneyArray[1] = item.SpendMoney + this.spendMoneyArray[1]
              break;
            case '03':
              this.spendMoneyArray[2] = item.SpendMoney + this.spendMoneyArray[2]
              break;
            case '04':
              this.spendMoneyArray[3] = item.SpendMoney + this.spendMoneyArray[3]
              break;
            case '05':
              this.spendMoneyArray[4] = item.SpendMoney + this.spendMoneyArray[4]
              break;
            case '06':
              this.spendMoneyArray[5] = item.SpendMoney + this.spendMoneyArray[5]
              break;
            case '07':
              this.spendMoneyArray[6] = item.SpendMoney + this.spendMoneyArray[6]
              break;
            case '08':
              this.spendMoneyArray[7] = item.SpendMoney + this.spendMoneyArray[7]
              break;
            case '09':
              this.spendMoneyArray[8] = item.SpendMoney + this.spendMoneyArray[8]
              break;
            case '10':
              this.spendMoneyArray[9] = item.SpendMoney + this.spendMoneyArray[9]
              break;
            case '11':
              this.spendMoneyArray[10] = item.SpendMoney + this.spendMoneyArray[10]
              break;
            case '12':
              this.spendMoneyArray[11] = item.SpendMoney + this.spendMoneyArray[11]
              break;
          }
        }
      })
      // 获取收入金额数组
      this.incomeMoneyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.spendList.forEach(item => {
        let calendar_mouth = item.calendar.substring(10, 6).trim()
        // console.log(12, calendar_mouth)
        if (item.flag === 1) {
          // 强制转换为数字
          item.SpendMoney = parseInt(item.SpendMoney)
          // 根据月份来进行加减
          switch (calendar_mouth) {
            case '01':
              this.incomeMoneyArray[0] = item.SpendMoney + this.incomeMoneyArray[0]
              break;
            case '02':
              this.incomeMoneyArray[1] = item.SpendMoney + this.incomeMoneyArray[1]
              break;
            case '03':
              this.incomeMoneyArray[2] = item.SpendMoney + this.incomeMoneyArray[2]
              break;
            case '04':
              this.incomeMoneyArray[3] = item.SpendMoney + this.incomeMoneyArray[3]
              break;
            case '05':
              this.incomeMoneyArray[4] = item.SpendMoney + this.incomeMoneyArray[4]
              break;
            case '06':
              this.incomeMoneyArray[5] = item.SpendMoney + this.incomeMoneyArray[5]
              break;
            case '07':
              this.incomeMoneyArray[6] = item.SpendMoney + this.incomeMoneyArray[6]
              break;
            case '08':
              this.incomeMoneyArray[7] = item.SpendMoney + this.incomeMoneyArray[7]
              break;
            case '09':
              this.incomeMoneyArray[8] = item.SpendMoney + this.incomeMoneyArray[8]
              break;
            case '10':
              this.incomeMoneyArray[9] = item.SpendMoney + this.incomeMoneyArray[9]
              break;
            case '11':
              this.incomeMoneyArray[10] = item.SpendMoney + this.incomeMoneyArray[10]
              break;
            case '12':
              this.incomeMoneyArray[11] = item.SpendMoney + this.incomeMoneyArray[11]
              break;
          }
        }
      })
    },
// 获取现在到后5个月的月份，渲染到x轴
    getCalendar () {
      this.calendarArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
    ,
    changeTab (index) {
      console.log('当前选择的是', index)
    },
    // 获取某个月的消费扇形图
    getFanMouthData () {
      let fanData = [0, 0, 0, 0, 0, 0]
      this.spendList.forEach(item => {
        let changeMouth = item.calendar.substring(10, 6).trim()
        // 如果月份前面有0就去掉0
        if (changeMouth[0] === '0') {
          changeMouth = changeMouth[1]
        }
        // 如果月份和选择的月份相同，才进行加减
        if (changeMouth + '月' === this.mouthText) {
          switch (item.spendType) {
            case '餐饮':
              fanData[0] = fanData[0] + item.SpendMoney
              break;
            case '出行':
              fanData[1] = fanData[1] + item.SpendMoney
              break;
            case '娱乐':
              fanData[2] = fanData[2] + item.SpendMoney
              break;
            case '学习':
              fanData[3] = fanData[3] + item.SpendMoney
              break;
            case '日用品':
              fanData[4] = fanData[4] + item.SpendMoney
              break;
            case '其他':
              fanData[5] = fanData[5] + item.SpendMoney
              break;
          }
        }
      })
      this.fanDataObj = [{
        name: '餐饮', value: fanData[0]
      }, {
        name: '出行', value: fanData[1],
      }, {
        name: '娱乐', value: fanData[2],
      }, {
        name: '学习', value: fanData[3],
      }, {
        name: '日用品', value: fanData[4],
      }, {
        name: '其他', value: fanData[5],
      }]
      console.log(this.fanDataObj)
    },
    // 切换月份，根据相应的月份
    mouthChange (e) {
      this.mouthText = e.data.text
      // console.log(this.mouth)
      // 重新渲染图表
      this.getFanMouthData()
      this.getServerData()
      // uni.redirectTo({
      //   url: '/pages/chart/chart'
      // })
    },
    // 获取账单的记账日期,提供给月份选择框
    getTimeList () {
      for (let i = 0; i < this.timeList.length; i++) {
        let obj = {}
        obj.value = i
        this.mouth = this.timeList[i].substring(7, 5).trim()
        if (this.mouth[0] === '0') {
          this.mouth = this.mouth[1]
        }
        obj.text = this.mouth + '月'
        // console.log(1233, obj)
        this.mouthRange.push(obj)
        this.mouthText = this.mouthRange[0].text
      }
    }
  }
};
</script>

<style scoped lang="scss">

.container {
  background-color: #e3dfdf;

  .charts-box {
    width: 100%;
    position: relative;
    height: 550rpx;
    background-color: #ffffff;
    z-index: 0;
  }


  .my-select {
    margin-top: 10rpx;
    width: 100%;
    height: 70rpx;
    background-color: #007aff;
    line-height: 70rpx;
    text-align: center;
    color: whitesmoke;
  }
}
</style>
