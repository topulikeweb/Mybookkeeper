<template>
  <view class="container">
    <!--    tab栏-->
    <v-tabs v-model="current" :tabs="tabs" @change="changeTab"
            :scroll="false"></v-tabs>

    <swiper :current="current" class="swiper" @change="changeSwiper">
      <swiper-item class="swiper">
        <!--        折线图-->
        <view class="charts-box">
          <!--        月份下拉框-->
          <view>
            <hpy-form-select :dataList="monthRange" text="text" name="value"
                             v-model="monthValue" islot="true"
                             @change="monthChange">
              <view class="my-select">{{ monthText }}</view>
            </hpy-form-select>
          </view>
          <qiun-data-charts
              type="line"
              :opts="MonthOpts"
              :chartData="monthChartData"
          />
        </view>
        <view class="charts-box-fan">
          <!--        扇形图-->
          <qiun-data-charts
              type="pie"
              :opts="monthFanOpts"
              :chartData="fanChartData"
              :canvas2d="false"
              canvas-id="hello"
          />
        </view>
      </swiper-item>

      <!--      年图表-->
      <swiper-item class="swiper">
        <!--    折线图-->
        <view class="charts-box">
          <hpy-form-select :dataList="yearRange" text="text" name="value"
                           v-model="yearValue" islot="true"
                           @change="yearChange">
            <view class="my-select-year">{{ yearText }}</view>
          </hpy-form-select>
          <qiun-data-charts
              type="line"
              :opts="yearLineOpts"
              :chartData="yearChatData"
              :canvas2d="false"
              :ontouch="false"
              canvas-id="world"
          />
        </view>
        <!--        扇形图-->
        <view class="charts-box-fan">
          <qiun-data-charts
              type="pie"
              :opts="yearFanOpts"
              :chartData="yearFanChartData"
              :canvas2d="false"
              canvas-id="niHao"
          />
        </view>

      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      // 月份下拉框
      monthValue: 0,
      yearValue: 0,
      yearText: '2023',
      monthText: '暂无记账记录',
      month: '',
      // 消费月份的列表(默认为列表第一个)
      monthRange: [],
      yearRange: [{
        value: 0, text: '2023',
      }, {
        value: 1, text: '2024'
      }, {
        value: 2, text: '2025'
      }],
      // tab栏的数值
      current: 0,
      // tab栏的选项
      tabs: ['月', '年'],
      // 年消费金额数组
      spendMoneyArray: [],
      monthSpendMoneyArray: [],
      // 折线图的横坐标的数组
      monthCalendarArray: [],
      // 年收如金额数组
      incomeMoneyArray: [],
      monthIncomeMoneyArray: [],
      // 时间数组（x轴）
      calendarArray: [],
      // 月折线图的数据
      monthChartData: {},
      // 年折线图的数据
      yearChatData: {},
      // 月扇形图的数据
      fanChartData: {},
      fanDataObj: [],
      yearFanDataObj: [],
      yearFanChartData: {},
      yearLineOpts: {
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
      monthFanOpts: {
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
      },
      monthOpts: {
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
            type: "straight",
            width: 2,
            activeType: "hollow"
          }
        }
      },
      yearFanOpts: {
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
    }
  },
  onShow () {
<<<<<<< HEAD
=======
    this.tokenLister()
    // 获取所有账单的月份
>>>>>>> 623404e783e30fbddf78ddae9a99cf6dc120c9f6
    this.getTimeList()
    this.getServerData();
    this.getYearMoneyArray()
    this.getFanMonthData()
    this.getMonthMoneyArray()
    this.getFanYearData()
  },
  computed: {
    ...mapState('m_list', ['spendList']),
    ...mapState('m_list', ['timeList'])
  },
  methods: {
    ...mapMutations('m_user', ['tokenLister']),
    // 改轮播图是调用，将轮播图的索引赋值给tab栏，让用户滑动轮播图的时候，tab栏也会变化
    changeSwiper (e) {
      this.current = e.detail.current
    },
    getServerData () {
      //模拟从服务器获取数据时的延时(这里就用后端接口了，页面处理逻辑就行)
      setTimeout(() => {
        let res = {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          series: [
            {
              name: "支出",
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
        let monthRes = {
          categories: this.monthCalendarArray,
          series: [
            {
              name: "支出",
              data: this.monthSpendMoneyArray
            },
            {
              name: "收入",
              data: this.monthIncomeMoneyArray
            },
          ]
        };
        let yearFanRes = {
          series: [
            {
              data: this.yearFanDataObj
            }
          ]
        };
        this.yearFanChartData = JSON.parse(JSON.stringify(yearFanRes));
        this.monthChartData = JSON.parse(JSON.stringify(monthRes));
        this.fanChartData = JSON.parse(JSON.stringify(fanRes));
        this.yearChatData = JSON.parse(JSON.stringify(res));
      }, 100);
    },

    /**
     * @Description: （年）获取记账列表中消费和收入的金额，将其分别组成一个数组提供给折线图
     * @author topu
     * @date 2023/1/16
     */
    getYearMoneyArray () {
      this.spendMoneyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.spendList.forEach(item => {
        // 筛选用户选择的年份
        if (parseInt(item.calendar.split(' - ')[0]) === parseInt(this.yearText)) {
          let calendar_month = item.calendar.substring(10, 6).trim()
          // console.log(12, calendar_month)
          if (item.flag === 0) {
            // 强制转换为数字
            item.spendMoney = parseInt(item.spendMoney)
            // 根据月份来进行加减
            switch (calendar_month) {
              case '01':
                this.spendMoneyArray[0] = item.spendMoney + this.spendMoneyArray[0]
                break;
              case '02':
                this.spendMoneyArray[1] = item.spendMoney + this.spendMoneyArray[1]
                break;
              case '03':
                this.spendMoneyArray[2] = item.spendMoney + this.spendMoneyArray[2]
                break;
              case '04':
                this.spendMoneyArray[3] = item.spendMoney + this.spendMoneyArray[3]
                break;
              case '05':
                this.spendMoneyArray[4] = item.spendMoney + this.spendMoneyArray[4]
                break;
              case '06':
                this.spendMoneyArray[5] = item.spendMoney + this.spendMoneyArray[5]
                break;
              case '07':
                this.spendMoneyArray[6] = item.spendMoney + this.spendMoneyArray[6]
                break;
              case '08':
                this.spendMoneyArray[7] = item.spendMoney + this.spendMoneyArray[7]
                break;
              case '09':
                this.spendMoneyArray[8] = item.spendMoney + this.spendMoneyArray[8]
                break;
              case '10':
                this.spendMoneyArray[9] = item.spendMoney + this.spendMoneyArray[9]
                break;
              case '11':
                this.spendMoneyArray[10] = item.spendMoney + this.spendMoneyArray[10]
                break;
              case '12':
                this.spendMoneyArray[11] = item.spendMoney + this.spendMoneyArray[11]
                break;
            }
          }
        }
      })
      // 获取收入金额数组
      this.incomeMoneyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.spendList.forEach(item => {
        if (parseInt(item.calendar.split(' - ')[0]) === parseInt(this.monthText)) {
          let calendar_month = item.calendar.substring(10, 6).trim()
          // console.log(12, calendar_month)
          if (item.flag === 1) {
            // 强制转换为数字
            item.spendMoney = parseInt(item.spendMoney)
            // 根据消费月份来进行相同月份账单的求和
            switch (calendar_month) {
              case '01':
                this.incomeMoneyArray[0] = item.spendMoney + this.incomeMoneyArray[0]
                break;
              case '02':
                this.incomeMoneyArray[1] = item.spendMoney + this.incomeMoneyArray[1]
                break;
              case '03':
                this.incomeMoneyArray[2] = item.spendMoney + this.incomeMoneyArray[2]
                break;
              case '04':
                this.incomeMoneyArray[3] = item.spendMoney + this.incomeMoneyArray[3]
                break;
              case '05':
                this.incomeMoneyArray[4] = item.spendMoney + this.incomeMoneyArray[4]
                break;
              case '06':
                this.incomeMoneyArray[5] = item.spendMoney + this.incomeMoneyArray[5]
                break;
              case '07':
                this.incomeMoneyArray[6] = item.spendMoney + this.incomeMoneyArray[6]
                break;
              case '08':
                this.incomeMoneyArray[7] = item.spendMoney + this.incomeMoneyArray[7]
                break;
              case '09':
                this.incomeMoneyArray[8] = item.spendMoney + this.incomeMoneyArray[8]
                break;
              case '10':
                this.incomeMoneyArray[9] = item.spendMoney + this.incomeMoneyArray[9]
                break;
              case '11':
                this.incomeMoneyArray[10] = item.spendMoney + this.incomeMoneyArray[10]
                break;
              case '12':
                this.incomeMoneyArray[11] = item.spendMoney + this.incomeMoneyArray[11]
                break;
            }
          }
        }
      })
    },
    /**
     * 获取月份折线图收入和消费的横纵坐标
     */
    getMonthMoneyArray () {
      // 得到一个长度为31，且全为0的数组
      this.monthSpendMoneyArray = new Array(31).fill(0)
      this.monthIncomeMoneyArray = new Array(31).fill(0)
      this.monthCalendarArray = new Array(31).fill('~')
      this.monthCalendarArray[5] = 5
      this.monthCalendarArray[15] = 15
      this.monthCalendarArray[25] = 25
      let data = new Date()
      let year = data.getFullYear()
      this.spendList.forEach(item => {
        console.log(parseInt(item.calendar.split('-')))
        // 因为这里只展示每个月的数据，因此，只展示今年的每个月的数据，要排除开前几年的数据
        if (parseInt(item.calendar.split('-')) === year) {
          // 判断为消费
          if (item.flag === 0) {
            if (parseInt(item.calendar.substring(10, 6).trim()) === parseInt(this.monthText.substring(7, 5).trim())) {
              // 将天数作为索引
              let index = parseInt(item.calendar.split(' - ')[2])
              this.monthSpendMoneyArray[index - 1] = this.monthSpendMoneyArray[index - 1] + item.spendMoney
            }
          } else {// 判断为收入
            if (parseInt(item.calendar.substring(10, 6).trim()) === parseInt(this.monthText.substring(7, 5).trim())) {
              // 将天数作为索引
              let index = parseInt(item.calendar.split(' - ')[2])
              this.monthIncomeMoneyArray[index] = this.monthIncomeMoneyArray[index] + item.spendMoney
            }
          }
        }
      })
    },

    // 改变tab栏，将swiper的索引一起修改
    changeTab (index) {
      console.log('当前选择的是', index)
    }
    ,
    /**mapState
     * 根据选择的月份获取选择的月份的消费和收入数据
     */
    getFanMonthData () {
      let fanData = [0, 0, 0, 0, 0, 0]
      this.spendList.forEach(item => {
        if (item.flag === 0) {
          // 判断是不是今年（只展示今年的月份的消费情况）
          if (parseInt(item.calendar.split('-')) === this.getYear()) {
            let changeMonth = item.calendar.substring(10, 6).trim()
            // 如果月份和选择的月份相同，才进行加减
            if (changeMonth === this.monthText.substring(7, 5).trim()) {
              switch (item.spendType) {
                case '餐饮':
                  fanData[0] = fanData[0] + item.spendMoney
                  break;
                case '出行':
                  fanData[1] = fanData[1] + item.spendMoney
                  break;
                case '娱乐':
                  fanData[2] = fanData[2] + item.spendMoney
                  break;
                case '学习':
                  fanData[3] = fanData[3] + item.spendMoney
                  break;
                case '日用品':
                  fanData[4] = fanData[4] + item.spendMoney
                  break;
                case '其他':
                  fanData[5] = fanData[5] + item.spendMoney
                  break;
              }
            }
          }
        }
      })
      // 利用sum是否等于0来判断monthRange是否有值，如果没有值，就会隐藏扇形图
      let sum = 0
      for (let i = 0; i < fanData.length; i++) {
        sum = fanData[i] + sum
      }
      if (sum === 0) {
        this.fanDataObj = [{
          name: '暂无支出记录', value: 0
        }]
      } else {
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
      }
    },
    /**mapState
     * 根据选择的年份获取当前选择年份的消费数据（年扇形图）
     */
    getFanYearData () {
      let fanData = new Array(6).fill(0)
      this.spendList.forEach(item => {
        if (parseInt(item.calendar.split(' - ')[0]) === parseInt(this.yearText)) {
          switch (item.spendType) {
            case '餐饮':
              fanData[0] = fanData[0] + item.spendMoney
              break;
            case '出行':
              fanData[1] = fanData[1] + item.spendMoney
              break;
            case '娱乐':
              fanData[2] = fanData[2] + item.spendMoney
              break;
            case '学习':
              fanData[3] = fanData[3] + item.spendMoney
              break;
            case '日用品':
              fanData[4] = fanData[4] + item.spendMoney
              break;
            case '其他':
              fanData[5] = fanData[5] + item.spendMoney
              break;
          }
        }
      })
      let sum = 0
      for (let i = 0; i < fanData.length; i++) {
        sum = fanData[i] + sum
      }
      if (sum === 0) {
        this.yearFanDataObj = [{
          name: '暂无支出记录', value: 0
        }]
      } else {
        this.yearFanDataObj = [{
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
        console.log(this.yearFanDataObj)
      }
    },
    /**获取当前的年份
     */
    getYear () {
      let date = new Date()
      let year = date.getFullYear()
      return year
    },
    /**
     * 切换月份，根据相应的月份
     * @param e(选择项的详细信息)
     */
    monthChange (e) {
      this.monthText = e.data.text
      // 重新渲染图表
      this.getFanMonthData()
      this.getServerData()
      this.getMonthMoneyArray()

    },
    /**
     *年份选择框发生改变
     * @param e(选择项的详细信息)
     */
    yearChange (e) {
      this.yearText = e.data.text
      console.log(this.yearText)
      // 重新渲染图表
      this.getYearMoneyArray()
      this.getServerData()
      this.getFanYearData()
    },
    /**
     * 获取账单的记账日期,提供给月份选择框获取账单的记账日期,提供给月份选择框
     */
    getTimeList () {
      for (let i = 0; i < this.timeList.length; i++) {
        let obj = {}
        // 判断monthRange里面是否存在相同的日历，如果相同就不添加进去
        let result = this.monthRange.find(item => {
          return item.text === this.timeList[i].substring(0, 7) + '月'
        })
        if (!result) {
          obj.value = i
          obj.text = this.timeList[i].substring(0, 7) + '月'
          this.monthRange.push(obj)
          this.monthText = this.monthRange[0].text
        }
      }
    }
  },
};
</script>

<style scoped lang="scss">

.container {
  background-color: #e3dfdf;

  .charts-box {
    width: 100%;
    height: 600rpx;
    background-color: #ffffff;
    clear: both;

    .my-select {
      position: relative;
      border-radius: 10rpx;
      margin-left: 20rpx;
      width: 30%;
      top: 12rpx;
      margin-bottom: 10rpx;
      height: 60rpx;
      background-color: #007aff;
      line-height: 60rpx;
      text-align: center;
      color: whitesmoke;
    }
  }

  .charts-box-fan {
    background-color: white;
    height: 600rpx;
  }

  .my-select-year {
    position: relative;
    border-radius: 10rpx;
    margin-left: 20rpx;
    width: 30%;
    top: 12rpx;
    margin-bottom: 10rpx;
    height: 60rpx;
    background-color: #f8dc2d;
    line-height: 60rpx;
    text-align: center;
    color: #0d0a0e;
  }

  .swiper {
    width: 100%;
    height: 1200rpx;
  }
}
</style>
