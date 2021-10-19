<template>
	<view>
		<view class="titx">
			<view class="colrsBox"></view>
			<view class="titleBx">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["title"]
	}
</script>

<style lang="scss" scoped>
	.titx {
	
		top: 20rpx;
		left: 15rpx;
		z-index: 9;
		display: flex;
		font-size: 24rpx;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.colrsBox {
		width: 10rpx;
		height: 15rpx;
		background: #1890FF;
		float: left;
	}
	
	.titleBx {
		float: left;
		margin-left: 5rpx;
	}
</style>
