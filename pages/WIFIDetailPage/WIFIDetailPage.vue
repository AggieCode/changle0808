<template>
	<view>
		<view class="errorItme"  v-if="showERRor">
			<u-empty text="内容为空" mode="list"></u-empty>
		</view>
		<view v-else>
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
					<view class="xlh">MAC：{{eqDetail.item_id}}</view>
					<view>更新时间：{{eqDetail.time.substr(0,10)||""}}</view>
				</view>
			</view>
			<view class='sbInfo'>
				<!--电压 电量 等  信息-->
				<view class='item-list'>
					<view class='left'>
						<image class='icon' src='../../static/eqitemicon/eqName.png'></image>
						<text class='label'>设备名称</text>
						<text class='dec'></text>
					</view>
					<view>{{eqDetail.volume}}%</view>
				</view>
				<view class='item-list'>
					<view class='left'>
						<image class='icon' src='../../static/eqitemicon/imac.png'></image>
						<text class='label'>设备MAC</text>
						<text class='dec'></text>
					</view>
					<view>{{eqDetail.state}}</view>
				</view>
				<view class='item-list'>
					<view class='left'>
						<image class='icon' src='../../static/eqitemicon/IP.png'></image>
						<text class='label'>IP地址</text>
						<text class='dec'></text>
					</view>
					<view>{{eqDetail.state}}</view>
				</view>
				<view class='item-list'>
					<view class='left'>
						<image class='icon'  src='../../static/eqitemicon/userNum.png'></image>
						<text class='label'>用户数量</text>
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
						<view class="lingth">WIFI名称:{{Math.ceil(dimming/7)}}</view>
						<u-slider v-model="dimming"></u-slider>
					</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showERRor:false,
				current:0,
				reamark: "",
				eqName: "",
				id: "",
				eqDetail: {}, //设备参
				dimmingShow: false, //调光弹窗
				dimming: 0
			}
		},
		methods: {
			//获取设备信息 
			getEquimentDetail() {
				uni.showLoading({
					title: '加载中'
				})
				let data = {
					itemId: uni.getStorageSync("itemId"),
					pageNumber: 1,
					pageSize: 1,
					keyword: "",
				}
				this.$request({
					url: this.$urls.platformUrl.wifi.wifiList,
					method: "POST",
					data,
					success: res => {
						uni.hideLoading();
						uni.stopPullDownRefresh(); //停止当前页面下拉刷新
						if (res.code == 10000) {
							this.eqDetail = res.data.list[0];
							if(!res.data.list.length){
								this.showERRor=true;
							}
							// this.dimming=this.eqDetail.volume
							// this.eqName = res.data.dataLive.name; //初始化名称
						}
					},
					fail: err => {
						uni.hideLoading();
						this.$showToast(err);
					}
				})
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
