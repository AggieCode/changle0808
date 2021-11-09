<template>
	<view>
		<view class='eqDetail-top'>
			<!--状态、信号、电量等-->
			<view class='one'>
				<view class='left'>
					<text class='name'>{{eqDetail.name}}</text>
				</view>
				<view class='right'>
					<view class="yuanhuan">
						<image class='icon' src="../../static/eqlist/WIFI.png" style="width: 38rpx; height: 38rpx;"
							v-if="eqDetail.signal_strength"></image>
						<image class='icon' src="../../static/eqlist/WiFiOff.png" style="width: 38rpx; height: 38rpx;"
							v-else></image>
					</view>
				</view>
			</view>
			<!--更新时间和序列号-->
			<view class='eqDetail-upTime'>
				<view class="xlh">设备ID：{{eqDetail.sos_id}}</view>
				<view>更新时间：{{timepToupdate_time(eqDetail.timestamp)}}</view>
			</view>
		</view>
		<view class='toolbar'>
			<view class='item' @click='updateEquipment'>
				<image class='icon' src='../../static/eqitemicon/reset.png'></image>
				<text class='dec'>更新</text>
			</view>
			<view class='item' @click='guanMethods'>
				<image class='icon' src='../../static/eqitemicon/bianji.png'></image>
				<text class='dec'>编辑</text>
			</view>
			<view class='item' @click='stopAutio'>
				<image class='icon' src='../../static/eqitemicon/callIcon.png'></image>
				<text class='dec'>呼叫</text>
			</view>

		</view>
		<view class='sbInfo'>
			<!--电压 电量 等  信息-->
			<view class='item-list'>
				<view class='left'>
					<image class='icon' src='../../static/eqitemicon/yinliang.png'></image>
					<text class='label'>ID</text>
					<text class='dec'></text>
				</view>
				<view>{{eqDetail.sos_id}}</view>
			</view>
			<view class='item-list'>
				<view class='left'>
					<image class='icon' src='../../static/eqitemicon/state.png'></image>
					<text class='label'>状态</text>
					<text class='dec'></text>
				</view>
				<view>未知</view>
			</view>
			<view class='item-list'>
				<view class='left'>
					<image class='icon' style='width:28rpx;height:32rpx' src='../../static/eqitemicon/time.png'></image>
					<text class='label'>添加时间</text>
					<text class='dec'></text>
				</view>
				<view>{{timepToupdate_time(eqDetail.timestamp)}}</view>
			</view>
		</view>
		<!--调整音量-->
		<u-modal v-model="dimmingShow" :async-close="true" :show-cancel-button="true" title="编辑设备名称"
			@confirm="dimmingFunc">
			<view class="slot-content">
				<view class="slidern">
					<u-input type="text" v-model="eqDetail.name" placeholder="请输入设备名称" :border="true"></u-input>
				</view>
			</view>
		</u-modal>
		<!--底部tabbar-->
		<BottonTabar :tabbarList="tabbarList"></BottonTabar>
	</view>
</template>

<script>
	import {
		formatTime
	} from "../../util/tools.js"
	export default {
		data() {
			return {
				reamark: "",
				ReamarkShow: false,
				eqName: "",
				eqnameAler: false,
				allDis: false,
				id: "",
				eqDetail: {}, //设备参数
				runDay: "",
				current: "",
				dimmingShow: false, //调光弹窗
				dimming: 0,
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '设备实况',
						customIcon: false,
						page: "/pages/onClickCallDetail/onClickCallDetail",
						pagePath: "/pages/onClickCallDetail/onClickCallDetail"

					}, {
						iconPath: "coupon",
						selectedIconPath: "coupon-fill",
						text: '报警记录',
						isDot: false,
						customIcon: false,
						page: "/pages/AlarmRecord/AlarmRecord",
						pagePath: "/pages/AlarmRecord/AlarmRecord"
					},
				],
			}
		},
		methods: {
			//时间戳转换
			timepToupdate_time(date) { //yy-mm-dd
				let time = formatTime(date).substr(0, 10);
				return time;
			},
			//获取设备信息 
			getEquimentDetail() {
				uni.showLoading({
					title: '加载中'
				})
				let data = {
					itemId: uni.getStorageSync("itemId"),
					pageNumber: 1,
					pageSize: 1,
					keyword: "name",
				}
				this.$request({
					url: this.$urls.platformUrl.oneClickCall.findSosList,
					method: "POST",
					data,
					success: res => {
						console.log(res);
						uni.hideLoading();
						uni.stopPullDownRefresh(); //停止当前页面下拉刷新
						if (res.code == 10000) {
							this.eqDetail = res.data.list[0];
							this.dimming = this.eqDetail.id
							this.eqName = res.data.dataLive.name; //初始化名称
						}
					},
					fail: err => {
						uni.hideLoading();
						this.$showToast(err);
					}
				})
			},
			//更新
			async updateEquipment() {
				uni.showLoading({
					title: '加载中'
				})
				await this.getEquimentDetail();
			},
			//时间转换
			toTime(time) {
				//let date = new Date(1606728108489);
				var now = new Date(time),
					y = now.getFullYear(),
					m = now.getMonth() + 1,
					d = now.getDate();
				return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " "
			},
			//编辑设备名称显示
			guanMethods() {
				this.dimmingShow=true;
			},
			stopAutio() { //呼叫
				let data = {
					serial: this.eqDetail.id,
					state: "stop",
					file: [this.eqDetail.name],
					guid: ""
				}
				this.$showToast("暂停播放");
			},
			async dimmingFunc() { //更改提交
				let data = {
					name: this.eqDetail.name,
					sosId: this.eqDetail.sos_id,
				};
				let url = this.$urls.platformUrl.oneClickCall.editSos;
				await this.promeFun(url, data);
				setTimeout(() => { //操作成功后取消弹窗
					this.dimmingShow = false;
					this.getEquimentDetail();
				}, 1000)
			},
			promeFun(url, data, method = "POST") {
				return new Promise((resolve, reject) => {
					this.$request({
						url,
						data,
						method,
						success: res => {
							if (res.code == 10000) {
								uni.hideLoading();
								this.getEquimentDetail();
								this.$showToast("操作成功");
								resolve(res);
							}else{
								this.$showToast(res.msg);
								resolve()
							}
						}
					})
				})
			}
		},
		onLoad(data) {
			if (data.id) {
				console.log(data);
				this.id = data.id;
				uni.setStorageSync("eqId", data.id);
			} else {
				this.id = uni.getStorageSync('eqId');
			}

			this.getEquimentDetail();
		},
		onPullDownRefresh() {
			//下拉的生命周期
			let _self = this;
			setTimeout(function() {
				_self.ListMsg = [];
				_self.pageNumber = 1;
				_self.pageSize = 10;
				_self.getEquimentDetail();
				_self.$showToast("更新成功");
			}, 3000);

		},
		onBackPress(e) {
			console.log(e)
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/LEDequimentDetail/index"
				})
				return true;
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "./index.css";
</style>
