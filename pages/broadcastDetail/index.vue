<template>
	<view>
		<view class='eqDetail-top'>
			<!--状态、信号、电量等-->
			<view class='one'>
				<view class='left'>
					<text class='name'>{{""||eqDetail.name}}</text>
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
			<view class='eqDetail-upTime' v-if="eqDetail.time">
				<view class="xlh">音响ID：{{eqDetail.item_id}}</view>
				<view>更新时间：{{eqDetail.time.substr(0,10)||""}}</view>
			</view>
		</view>
		<view class='toolbar'>
			<view class='item' @click='updateEquipment'>
				<image class='icon' src='../../static/eqitemicon/reset.png'></image>
				<text class='dec'>更新</text>
			</view>
			<view class='item' @click='guanMethods'>
				<image class='icon' src='../../static/eqitemicon/playvidoe.png'></image>
				<text class='dec'>播放</text>
			</view>
			<view class='item' @click='stopAutio'>
				<image class='icon' src='../../static/eqitemicon/stopVideo.png'></image>
				<text class='dec'>暂停</text>
			</view>
			<view class='item' @click='showTGDiago'>
				<image class='icon' src='../../static/eqitemicon/shenyiedf.png'></image>
				<text class='dec'>音量</text>
			</view>
		</view>
		<view class='sbInfo'>
			<!--电压 电量 等  信息-->
			<view class='item-list'>
				<view class='left'>
					<image class='icon' src='../../static/eqitemicon/yinliang.png'></image>
					<text class='label'>音量</text>
					<text class='dec'></text>
				</view>
				<view>{{eqDetail.volume}}%</view>
			</view>
			<view class='item-list'>
				<view class='left'>
					<image class='icon' src='../../static/eqitemicon/state.png'></image>
					<text class='label'>状态</text>
					<text class='dec'></text>
				</view>
				<view>{{eqDetail.state}}</view>
			</view>
			<view class='item-list'>
				<view class='left'>
					<image class='icon' style='width:28rpx;height:32rpx' src='../../static/eqitemicon/time.png'></image>
					<text class='label'>更新时间</text>
					<text class='dec'></text>
				</view>
				<view>{{eqDetail.time}}</view>
			</view>
		</view>
		<!--调整音量-->
		<u-modal v-model="dimmingShow" :async-close="true" :show-cancel-button="true" title="音量调整"
			@confirm="dimmingFunc">
			<view class="slot-content">
				<view class="slidern">
					<view class="lingth">音量:{{Math.ceil(dimming/7)}}</view>
					<u-slider v-model="dimming"></u-slider>
				</view>
			</view>
		</u-modal>
		<!--底部tabbar-->
		<!-- <BottonTabar :tabbarList="tabbarList"></BottonTabar> -->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn">
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				reamark: "",
				eqName: "",
				id: "",
				eqDetail: {}, //设备参
				dimmingShow: false, //调光弹窗
				dimming: 0,
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '设备实况',
						customIcon: false,
						page: "/pages/broadcastDetail/index",
						pagePath: "/pages/broadcastDetail/index"

					}, {
						iconPath: "coupon",
						selectedIconPath: "coupon-fill",
						text: '媒体库',
						isDot: false,
						customIcon: false,
						page: "/pages/broadcaStMedia/broadcaStMedia",
						pagePath: "/pages/broadcaStMedia/broadcaStMedia"
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '计划任务',
						isDot: false,
						customIcon: false,
						page: "/pages/scheduledTask/scheduledTask",
						pagePath: "/pages/scheduledTask/scheduledTask"
					}
				],
			}
		},
		methods: {
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page
				})
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
					url: this.$urls.platformUrl.broadcast.audioList,
					method: "POST",
					data,
					success: res => {
						uni.hideLoading();
						uni.stopPullDownRefresh(); //停止当前页面下拉刷新
						if (res.code == 10000) {
							this.eqDetail = res.data.list[0];
							uni.setStorageSync("AutioId",this.eqDetail.id);
							this.dimming=this.eqDetail.volume
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
			//播放
			guanMethods() {
				uni.redirectTo({
					url:"/pages/broadcaStMedia/broadcaStMedia",
					})
			},
			showTGDiago() { //开灯
				//调节音量：
				this.dimmingShow = true;
			},
			stopAutio() { //暂停播放
			let data={
				serial: this.eqDetail.id,
				state: "stop",
				file: [this.eqDetail.name],
				guid: ""
			}
			let url=this.$urls.platformUrl.broadcast.exeRealPlayFile;
		this.promeFun(url,data);
				this.$showToast("命令下发中");
			},
			async dimmingFunc() { //音量提交
				let data = {
					id:this.eqDetail.id,
					bcoutv:Math.ceil(this.dimming/7)
				};
				let url = this.$urls.platformUrl.broadcast.setTervolume;
				await this.promeFun(url, data);
				setTimeout(() => {//操作成功后取消弹窗
					this.dimmingShow = false;
				}, 1000)
			},
			sliderChange(e){
			
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
								resolve(res);
							}
						}
					})
				})
			}
		},
		onLoad(data) {
			if (data.id) {
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
