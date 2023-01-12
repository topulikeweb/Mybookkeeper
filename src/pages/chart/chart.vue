<template>
  <view class="charts-box">
    <qiun-data-charts
        type="line"
        :opts="opts"
        :chartData="chartData"
        :canvas2d="true"
        canvasId="XvYzspoRhfazYcDprNxOohgCjZaxUAfS"
    />
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 消费金额数组
      spendMoneyArray: [],
      // 收金额数组
      incomeMoneyArray: [],
      // 时间数组（x轴）
      calendarArray: [],
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
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
      }
    };
  },
  onReady () {
    this.getServerData();
    // 获取消费金额的数组
    this.getMoneyArray()
    // 获取现今的年月
    this.getCalendar()
  },
  computed: {
    ...mapState('m_list', ['spendList'])
  },
  methods: {
    getServerData () {
      //模拟从服务器获取数据时的延时
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
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },

    // 获取记账列表中消费和收入的金额，将其分别组成一个数组提供给折线图
    getMoneyArray () {
      this.spendList.forEach(item => {
        // 去除收入的金额
        if (item.flag === 0) {
          this.spendMoneyArray.push(parseInt(item.SpendMoney))
        } else {
          this.incomeMoneyArray.push(parseInt(item.SpendMoney))
        }
      })
      console.log(this.spendMoneyArray)
    },
    // 获取现在到后5个月的月份，渲染到x轴
    getCalendar () {
      let date = new Date()
      let year = date.getFullYear()
      let mouth = date.getMonth()
      console.log("" + year + '-' + mouth)// 转换为字符串
      for (let i = 1; i < 6; i++) {
        let Mouth = mouth + i
        this.calendarArray.push("" + year + '-' + Mouth)
      }
    }
  }
};
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 500rpx;
}
</style>
