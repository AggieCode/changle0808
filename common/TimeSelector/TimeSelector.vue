<!--
时间选择器
-->
<template>
	<view>
		<view :class="{'history-top':true,'top':isTop}">
			<!-- {{isTop?'top':''}}-->
			<view class='left' @click='prevEchart'>
				<image class='left-icon' src='../../static/h_left.png'></image>前一天
			</view>
			<view class='center'>
				<view mode="date" value="time" @click="bindDateChange">
					<view class="picker">{{updateTime}}</view>
				</view>
				<image class='xia-icon' src='/static/img/h_xia.png'></image>
			</view>
			<view class='right' @click='nextEchart'>
				后一天<image class='right-icon' src='../../static/h_right.png'></image>
			</view>
		</view>
		<!--图表时间-->
		<u-picker v-model="tabTimeShow" mode="time" @confirm="timeConfirmTB"></u-picker>
	</view>
</template>

<script>
	export default {
		name:"TimeSelector",
		data() {
			return {
				updateTime:"",//选择的时间
				isTop:false,
				tabTimeShow:false,
			};
		},
		methods:{
			prevEchart(){//前一天
				this.$emit("prevEchart",this.updateTime);
			},
			nextEchart(){//后一天
				this.$emit("nextEchart",this.updateTime);
			}
			bindDateChange(){//显示时间选择器
				this.tabTimeShow=true;
			},
			timeConfirmTB(e){//时间选择器
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
.history-top{
  box-sizing: border-box;
  height: 112rpx;
  padding:0 36rpx;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-size: 26rpx;
}
.history-top.top{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  width: 100%;
  /* border-bottom: solid 1rpx #eee; */
  box-shadow: 0 5rpx 5rpx #eee;
}

.history-top .left-icon,.history-top .right-icon{
  width: 12rpx;
  height: 20rpx;
}
.history-top .left-icon{
  margin-right: 16rpx;
}
.history-top .right-icon{
  margin-left: 16rpx;
}
.history-top .xia-icon{
  width: 18rpx;
  height: 10rpx;
  position: absolute;
  right: 28rpx;
  top:50%;
  margin-top:-5rpx;
}
.history-top  .center{
  width: 400rpx;
  height: 70rpx;
  box-sizing: border-box;
  border:solid 1rpx #007AFF;
  text-align: center;
  line-height: 70rpx;
  font-size: 30rpx;
  background:#fff;
  position: relative;
}
.time-toolbar{
  padding: 20rpx;
  display: flex;
}
.time-toolbar .time-box{
  width: 260rpx;
  height: 70rpx;
  box-sizing: border-box;
  border:solid 1rpx #007AFF;
  border-radius: 8rpx;
  text-align: center;
  line-height: 70rpx;
  font-size: 30rpx;
  background:#fff;
  position: relative;
}
.time-toolbar .done{
  height: 70rpx;
  line-height: 70rpx;
  width: 160rpx;
  margin-left: 20rpx;
  text-align: center;
  border-radius: 8rpx;
  color: #fff;
  background: #ff9000;
}
.propetybox {
	width: 730rpx;

	border-radius: 10rpx;
	/* border: 1px solid red; */
	margin: 0rpx auto 0;
	/* box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); */
	padding: 10rpx 20rpx;
	color: $uni-text-color;
	box-sizing: border-box;
	color: #333;
	display: flex;
	align-items: center;
	position: relative;

}

.textBx {
	width: 30%;
	height: 100%;

}

.chartMsg {
	width: 100%;
	margin-left: 5%;
}

.titx {
	position: absolute;
	top: 20rpx;
	left: 15rpx;
	z-index: 9;
	display: flex;
	font-size: 24rpx;
	align-items: center;
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
