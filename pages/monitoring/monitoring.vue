<template>
	<view>
		<view class="montitoring">
			<video class="_video" direction="-90" title="123" :autoplay="true" :src="videoUrl"></video>
		</view>
		<!--监控操作-->
		<view class="montiButn">
			<u-grid :col="3" :border="false">
				<u-grid-item @click="deviceMonitor(4)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/zs.png" class="icon"></image>
				</u-grid-item>
				<u-grid-item @click="deviceMonitor(0)">
					<image src="/static/monitoring/s.png" class="icon"></image>
				</u-grid-item>
				<u-grid-item @click="deviceMonitor(6)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/ys.png" class="icon"></image>
				</u-grid-item>
			</u-grid>
			<u-grid :col="3" :border="false">
				<u-grid-item @click="deviceMonitor(2)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/z.png" class="icon"></image>
				</u-grid-item>
				<!--拍照-->
				<u-grid-item @click="photograph">
					<image src="/static/monitoring/xiangji.png" class="icon"></image>
				</u-grid-item>
				<u-grid-item @click="deviceMonitor(3)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/y.png" class="icon"></image>
				</u-grid-item>
			</u-grid>
			<u-grid :col="3" :border="false">
				<u-grid-item @click="deviceMonitor(5)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/zx.png" class="icon"></image>
				</u-grid-item>
				<u-grid-item @click="deviceMonitor(1)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/x.png" class="icon"></image>

				</u-grid-item>
				<u-grid-item @click="deviceMonitor(7)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/yx.png" class="icon"></image>
				</u-grid-item>
			</u-grid>
			<u-grid :col="2" :border="false" align="center">
				<u-grid-item @click="deviceMonitor(8)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/fangda.png" class="icon"></image>
				</u-grid-item>
				<u-grid-item @click="deviceMonitor(9)">
					<view style="color: white;">1</view>
					<image src="/static/monitoring/suoxiao.png" class="icon"></image>
				</u-grid-item>

			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: "", //视频播放地址
				params: {},
			};
		},
		methods: {
			getVideoUrl() { //获取播放链接
				let data = {
					...this.params
				};
				data.protocol = 2;
				uni.request({
					url: "https://open.ys7.com/api/lapp/v2/live/address/get",
					method: "POST",
					data,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						accessToken: this.params.accessToken
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							this.videoUrl = res.data.data.url;
							console.log(this.videoUrl);
						} else {
							this.$showToast(res.msg)
						}
					}
				})
			},
			//调整监控
			async deviceMonitor(state) {
				let data = {
					accessToken: sessionStorage.getItem("monitor_token"),
					speed: 1, // 云台速度
					channelNo: 1, //通道号
					deviceSerial: this.params.deviceSerial,
					direction: state
				};
				await this.operationMonit(data, "start")
				this.operationMonit(data, "stop")
			},
			//拍照
			photograph() {
				let url = "https://open.ys7.com/api/lapp/device/capture";
				let data = {
					accessToken: sessionStorage.getItem("monitor_token"),
					channelNo: 1, //通道号
					deviceSerial:this.params.deviceSerial
				}
				uni.request({
					url,
					data,
					method: "POST",
					success: res => {
						if (res.code == 10000) {
							this.$showToast("操作成功")
						} else {
							this.$showToast(res.msg);
						}
					}
				})
			},
			//操作
			operationMonit(data, type) {
				let url = `https://open.ys7.com/api/lapp/device/ptz/${type}`;
				uni.request({
					url,
					data,
					method: "POST",
					success: res => {
						if (res.code == 10000) {
							this.$showToast("操作成功")
						} else {
							this.$showToast(res.msg);
						}
					}
				})
			}
		},
		onLoad(data) {
			if (data.data) {
				console.log(data);
				this.params = JSON.parse(decodeURIComponent(data.data))
			}
			this.getVideoUrl();
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.css"
</style>
