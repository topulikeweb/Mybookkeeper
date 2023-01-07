<template>
  <view class="big-box">
    <view class="top-box">
      <image :src="imageUrl" style="width: 100% ;height: 100%"
             v-if="imageUrl"></image>
      <!--      图片上的文字-->
      <view class="top-box-text">
        <view class="top-box-text-allCount">
          <view>今日支出</view>
          <view id="allCount">0.00</view>
          <view id="allMouth">本月支出:0.00</view>
        </view>

        <view class="top-box-text-surplus">
          <view>预算剩余:0.00</view>
        </view>
      </view>
    </view>

    <view class="bottom-box">
      <!--      排行榜-->
      <view class="ranking">
        <view>本月前三消费支出</view>
        <li>买很多很多很多东西 -20.00</li>
        <li>买东西 -20.00</li>
        <li>买东西 -20.00</li>
      </view>
      <!--    记一笔按钮-->
      <view class="makeAccount" @click="makeAccount">
        记一笔
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      imageUrl: "https://i1.shaodiyejin.com/uploads/tu/201905/9999/4ada68c934.jpg"
    }
  },
  methods: {
    makeAccount () {
      uni.navigateTo({
        url: '/subpkg/billing_page/billing_page'
      })
    }
  }
}
</script>

<style scoped>
.top-box {
  width: 100%;
  height: 43%;
  background-color: #2c405a;
  position: relative;
}

.top-box-text {
  width: 100%;
  height: 200rpx;
  position: absolute;
  bottom: 0rpx;
  display: flex;

}

.top-box-text-allCount:first-child {
  font-size: 30rpx;
  color: white;
  font-weight: 100;
}

.top-box-text-allCount #allCount {
  font-size: 60rpx;
  position: absolute;
  top: 60rpx;
}

.top-box-text-allCount {
  left: 10rpx;
  top: 10rpx;
  position: absolute;
}

.top-box-text-allCount #allMouth {
  font-size: 30rpx;
  position: absolute;
  top: 140rpx;
  font-weight: 100;
  width: 230rpx;
}

.top-box-text-surplus {
  position: absolute;
  right: 10rpx;
  bottom: 10rpx;
  color: white;
  font-weight: 100;
}

.bottom-box {
  background-color: #dadaf8;
  width: 100%;
  height: 57%;
  position: relative;
  bottom: 0;
}

.makeAccount {
  width: 250rpx;
  height: 250rpx;
  background-color: #9f56b0;
  position: absolute;
  top: 55%;
  left: 33%;
  border-radius: 250rpx;
  font-size: 50rpx;
  line-height: 250rpx;
  text-align: center;
}

.big-box {
  width: 100%;
  height: 100%;
}

body {
  height: 100%;
}

.ranking {
  width: 90%;
  height: 50%;
  margin: 20rpx auto;
  background-color: #d3d1d1;
  border-radius: 15px;
}

.ranking view {
  margin-top: 20rpx;
  width: 100%;
  padding-top: 20rpx;
  text-align: center;
  font-size: 35rpx;
}

.ranking li {
  margin: auto;
  height: 20%;
  width: 90%;
  font-weight: 300;
  border-bottom: 1px solid #989797;
  line-height: 280%;
}
</style>
