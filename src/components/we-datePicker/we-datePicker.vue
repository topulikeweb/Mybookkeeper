<template>		
	<view class="pcaPicker" @touchmove.stop.prevent="preventTouchMove">
	  <view :class="popFlag?'popMask':''" @click="hide"></view>
	  <view class="popBottom" :class="popFlag?'popRound':''">
	    <view class="head">
	      <text class="t1" @click="hide">关闭</text>
	      <text class="t2" @click="confirm">确认</text>
	    </view>
      <view>
	          <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
	              <picker-view-column>
	                  <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
	              </picker-view-column>
	              <picker-view-column>
	                  <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
	              </picker-view-column>
	              <picker-view-column>
	                  <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
	              </picker-view-column>
	          </picker-view>
          </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
      const date = new Date()
                  const years = []
                  const year = date.getFullYear()
                  const months = []
                  const month = date.getMonth() + 1
                  const days = []
                  const day = date.getDate()
                  for (let i = 1990; i <= date.getFullYear(); i++) {
                      years.push(i)
                  }
                  for (let i = 1; i <= 12; i++) {
                      months.push(i)
                  }
                  for (let i = 1; i <= 31; i++) {
                      days.push(i)
                  }
			return {
				popFlag:false,
				pcaIndex:[0,0,0],
         title: 'picker-view',
                        years,
                        year,
                        months,
                        month,
                        days,
                        day,
                        value: [9999, month - 1, day - 1],
                        visible: true,
                        indicatorStyle: `height: 50px;`,
                        date:""
			}
		},
		methods: {
        bindChange(e) {
                      const val = e.detail.value
                      this.year = this.years[val[0]]
                      this.month = this.months[val[1]]
                      this.day = this.days[val[2]]
                       this.date=this.year+"年"+this.month+"月"+this.day+"日"
                      },
			// 防穿透
			preventTouchMove(){},
			// 滚动切换
			pcaChange(e){   
			},
			// 显示
			show(e){
			  this.popFlag=true;
			},
			// 隐藏
			hide(e){
			  this.popFlag=false;
			},
			// 确认
			confirm(e){
				this.$emit('confirm',this.date)
			  this.hide();
			}
		}

	}
</script>

<style>
  	.picker-view {
  		width: 750rpx;
  		height: 600rpx;
  		margin-top: 20rpx;
  	}
  	.item {
  		height: 50px;
  		align-items: center;
  		justify-content: center;
  		text-align: center;
  	}
	.pcaPicker>.popMask {
	  position: fixed;
	  top: 0;
	  right: 0;
	  left: 0;
	  bottom: 0;
	  background: rgba(0, 0, 0, 0.6);
	  z-index: 10000;
	}
	.pcaPicker>.popBottom{
	  width: 100vw;
		background-color: #ffffff;
		font-size: 32rpx;
	  position: fixed;
	  bottom:0;
	  left:0;
	  transition: all 0.3s ease;
	  transform: translateY(100%);
	  opacity: 0;
	  z-index: 20000;
	}
	.pcaPicker>.popRound{
	  transition: all 0.3s ease;
	  transform: translateX(0);
	  opacity: 1;
	}
	.pcaPicker>.popBottom>.head{
	  width: 100%;
	  height: 80rpx;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  box-sizing: border-box;
	  padding: 0 30rpx 0 30rpx;
	  border-bottom: 1px solid #f0f0f0;
	}
	.pcaPicker>.popBottom>.head>text{
	  display: block;
	  width: 100rpx;
	  height: 100%;
	  text-align: center;
	  line-height: 80rpx;
	  font-weight: bold;
	}
	.pcaPicker>.popBottom>.head>.t1{  
	  color: #888888;
	}
	.pcaPicker>.popBottom>.head>.t2{
	  color: #8DDBE6;
	}
	.pcaPicker>.popBottom>picker-view{
		height: 500rpx;
	}
	.pcaPicker>.popBottom>picker-view view{
		text-align: center;
		line-height: 68rpx;
	}
</style>
