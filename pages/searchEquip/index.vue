<template>
	<view>
		<view class="searchBox">
			<u-search placeholder="请输入设备名称" v-model="keyword"></u-search>
		</view>
		<view class="eqlist">
			<view class="eqleft">
				<image src="../../static/eqlist/LED.png" class="eqIcon"></image>
				<text>灯</text>
			</view>
			<view class="eqright">
				<image class="eqIcon" src="../../static/eqlist/chongdian.png"></image>
				<image class="eqIcon" src="../../static/eqlist/WIFI.png"></image>
				<view class="baifb">
					<image class="eqIcon" src="../../static/eqlist/dianliang.png"></image>
					<text>100%</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ""
			}
		}
	}
</script>

<style lang="scss">
	.searchBox {
		padding: 30rpx 20rpx;
	}

	.eqlist {
		width: 700rpx;
		height: 80rpx;
		
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #ECF5FF;
	}

	.eqleft {
		width: 30%;
		height: 100%;
		display: flex;
		align-items: center;
		// justify-content: space-around;

	}
	.eqleft text{
		margin-left: 20rpx;
	}

	.eqIcon {
		width: 32rpx;
		height: 32rpx;
	}

	.eqright {
		width: 35%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.baifb{
		display: flex;
		align-items: center;
	}
	.baifb text{
		font-size: 24rpx;
		color: #007AFF;
		margin-left: 10rpx;
	}
</style>
