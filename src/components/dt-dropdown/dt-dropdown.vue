<template>
	<view>
		<view @click="showShadow" class="dropWrap">{{ list[current] }}<view class="sanjiao"></view></view>
		<view class="dropdown">
			<view :class="showIf ? 'dropdown-mask' : 'undropdown-mask'" @click="hideShadow"></view>
			<!-- <view class="ul" :style="showIf?'height:'+list.length*30+'px':''"> --> 
			<view class="ul" :style="'--i:'+list.length" :class="showIf?'show':''">  <!-- 不支持就用上面那种 -->
				<view class="li" v-for="(item, index) in list" :key="index" @click="handlerItem(index)">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dropdown',
	props: {
		list: {
			type: Array,
			default: () => []
		},
		current: {
			type: [String, Number],
			default: 0
		}
	},
	data() {
		return {
			showIf: false
		};
	},
	methods: {
		handlerItem(value) {
			this.showIf = false
			this.$emit('onClick', value);
		},
		hideShadow() {
			this.showIf = false;
		},
		showShadow() {
			this.showIf = true;
		}
	}
};
</script>

<style scoped lang="scss">
.dropWrap {
	box-sizing: border-box;
	width: 96px;
	height: 26px;
	border: 1px solid #e8ecef;
	font-size: 12px;
	color: #8c9fad;
	padding: 4px 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.sanjiao{
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right:6px solid transparent;
		border-top:6px solid #C5CFD5;
		border-bottom:6px solid transparent;
		transform: translateY(3px);
	}
}
.dropdown {
	position: absolute;
	z-index: 100;
	.ul {
		width: 96px;
		position: relative;
		z-index: 101;
		list-style: none;
		background-color: #fff;
		border-radius: 4rpx;
		padding-left: 0;
		box-shadow: 6rpx 6rpx 10rpx rgba(122, 122, 122, 0.2);
		transition: all 0.2s;
		height: 0;
		overflow: hidden;
		.li {
			box-sizing: border-box;
			color: #000;
			height: 30px;
			border-bottom: 1px solid #e6eaeb;
			font-size: 24rpx;
			line-height: 30px;              //与下面的高度保持一致
			padding-left: 8px;
		}
		.li:last-child {
			border-bottom: none;
		}
	}
	.show {
		height: calc( var(--i) * 30px );   //与上面的高度保持一致
	}
	.dropdown-mask {
		top: 0;
		left: 0;
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		pointer-events: auto;
	}
	.undropdown-mask {
		pointer-events: none;
	}
}
</style>
