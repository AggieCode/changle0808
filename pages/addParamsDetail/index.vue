<template>
	<view class="paramList">
		<view class="telmLis">
			<view class="telmLisTX">模板名称</view>
			<view>
				<u-input inputAlign="right" placeholder="请输入"></u-input>
			</view>
		</view>
		<view class="telmLis">
			<view class="telmLisTX">选择设备</view>
			<view class="rightTX" @click="toSearchEQ">
				请选择
				<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
			</view>
		</view>

		<!--添加定时任务-->
		<view v-for="(item,index) in timerLis" :key="index">
			<view class="timeSlot">
				<view style="margin-left: 36rpx; color: gray;">时间段</view>
				<view style="color: #007AFF;" @click="deltTimerLis(index)">删除</view>
			</view>
			<picker mode="time" @change="timerPicker">
				<view class="telmLis" @click="timerIndex=index">
					<view class="telmLisTX">时刻</view>
					<view class="rightTX">
						{{item.timer}}
						<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
					</view>
				</view>
			</picker>
			<picker mode="selector" :range="operaLis" range-key="name" @change="rangePicker">
				<view class="telmLis" @click="timerIndex=index">
					<view class="telmLisTX">操作</view>
					<view class="rightTX">
						{{item.caozuo}}
						<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
					</view>
				</view>
			</picker>

			<view class="telmLis" v-show="item.lightShow">
				<view class="telmLisTX">亮度</view>
				<view class="rightTX">
					<u-input inputAlign="right" placeholder="范围10~100" v-model="item.light"></u-input>
				</view>
			</view>
		</view>
		<view class="TemplateName" @click="addTimerSlot">
			+ 添加时间段
		</view>
		<!-- <view class='noData'>
			<image class='icon' src='../../static/noData.png'></image>
			<view class='dec'>无相关结果</view>
		</view> -->
		
		<!--保存按钮-->
		<view class="botmBtn">
			<u-button type="primary" @click="subMit">确定</u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				operaLis: [{
						id: 1,
						name: '关'
					},
					{
						id: 2,
						name: '开'
					},
					{
						id: 3,
						name: '调光'
					},
				], //开关调光操作
				timerLis: [],
				timerIndex:0,
			}
		},
		methods: {
			addTimerSlot() {
				//添加时间段
				
				if(this.timerLis.length < 5) {
					this.timerLis.push({
						timer: "00:00",
						caozuo: "请输入",
						light: "",
						lightShow:false
					})
				} else {
					this.$showToast("最多添加五个时间段")
				}
			},
			timerPicker(e) { //时间段选择
			this.timerLis[this.timerIndex].timer=e.detail.value;
				console.log(e);
			},
			//操作选择
			rangePicker(e) {
				if(e.detail.value==2){
					this.timerLis[this.timerIndex].lightShow=true;
				}
				this.timerLis[this.timerIndex].caozuo=this.operaLis[e.detail.value].name;
			},
			//删除时间段
			deltTimerLis(index){
				this.timerLis.splice(index,1);
			},
			//选择设备
			toSearchEQ(){
				uni.navigateTo({
					url:"/pages/choiceEquipment/index"
				})
			},
			//确定保存
			subMit(){
				let ary=uni.getStorageInfoSync("ChoiceAry");
				//对接保存：
			}
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/EquipimentParams/index"
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '是否返回',
				// 	success: res => {
				// 		if (res.confirm) {
				// 			uni.redirectTo({
				// 				url: `/pages/Centralizedcontroldevice/Centralizedcontroldevice`
				// 			})

				// 		}
				// 	}
				// });
				// 禁止默认返回
				return true;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.paramList {
		box-sizing: border-box;
		border-top: solid #eee 1rpx;
		background: #fff;
		padding-left: 36rpx;
	}

	.TemplateName {
		height: 100rpx;
		box-sizing: border-box;
		border-bottom: solid #eee 1rpx;
		display: flex;
		align-items: center;
		color: #007AFF;
	}

	.paramList .telmLis {
		height: 100rpx;
		box-sizing: border-box;
		border-bottom: solid #eee 1rpx;
		display: flex;
		padding: 0 36rpx 0 0;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.telmLisIcon {
		width: 27rpx;
		height: 28rpx;
	}

	.noData {
		width: 200rpx;
		height: 230rpx;
		margin: 0 auto;
		color: gray;
		text-align: center;
		margin-top: 200rpx;
	}

	.noData .icon {
		width: 100rpx;
		height: 120rpx;
		display: block;
		margin: 0 auto;
		margin-bottom: 20rpx;

	}

	.rightTX {
		display: flex;
		align-items: center;
		color: gray;
	}

	.timeSlot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 36rpx 0 0;
		height: 80rpx;
		background: #F1F1F1;
		margin-left: -36rpx;
	}
	.botmBtn{
		position: absolute;
		left: 5%;
		right: 5%;
		bottom: 5%;
	}
	
</style>
