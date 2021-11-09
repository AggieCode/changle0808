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
		<view>
			<!--设备状态-->
			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">图表</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts1" type="demotype" :chartData="chartData"
							background="none" />
					</view>
				</view>
			</view>
			
			<view class="time-toolbar" style="margin-top: 30rpx;">
			  <view class="time-box" @click="changeTimeStart">
			        <view class="picker">{{startTime}}</view>
			  </view>~
			  <view class="time-box" @click="changeTimeStop">
			        <view class="picker">{{stopTime}}</view>
			  </view>
			  <view class="done" @click="getDataHis">确定</view>
			</view>
			
			<view class="propetybox" style=" margin-bottom: 100rpx;">
				<view class="chartMsg">
					<view class="titx">
						<view class="colrsBox"></view>
						<view class="titleBx">亮灯时长(h)</view>
					</view>
					<br />
					<view class="charts-box">
						<view class="charts-box" style="margin-left: -5%;width: 105%;height: 90%;margin-top: 6%;">
							<qiun-data-charts type="column" :chartData="annulus" background="none" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--图表时间-->
		<u-picker v-model="tabTimeShow" mode="time" @confirm="timeConfirmTB"></u-picker>
		
		<!--开始时间-->
		<u-picker v-model="TimeStart" mode="time" @confirm="TimeStartConfirm"></u-picker>
		<!--结束时间-->
		<u-picker v-model="TimeStop" mode="time" @confirm="TimeStopConfirm"></u-picker>
		<!--底部tabbar-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn" :show="!allDis">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		add0,
		formatTime,
		disTime
	} from "../../util/tools.js";
	export default {
		data() {
			return {
				startTime:"",
				stopTime:"",
				opts1: {
					dataLabel: false,
					enableScroll: true,
					xAxis: {
						itemCount: 5,
						boundaryGap: "justify",
						scrollShow: true
					}
				},
				tabTimeShow: false,
				isTop: false,
				updateTime: "", //日期
				allDis: false,
				current: "",
				TimeStop:false,
				TimeStart:false,
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '设备实况',
						customIcon: false,
						page: "/pages/LEDequimentDetail/index",
						pagePath: "/pages/LEDequimentDetail/index"

					}, {
						iconPath: "coupon",
						selectedIconPath: "coupon-fill",
						text: '设备参数',
						isDot: false,
						customIcon: false,
						page: "/pages/EquipimentParams/index",
						pagePath: "/pages/EquipimentParams/index"
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '历史数据',
						isDot: false,
						customIcon: false,
						page: "/pages/historicalData/index",
						pagePath: "/pages/historicalData/index"
					}
				],
				chartData: {
					"categories": [],
					"series": [{
							"name": "电压",
							"data": []
						},
						{
							"name": "电流",
							"data": []
						},
						{
							"name": "功率",
							"data": []
						},
						{
							"name": "亮度",
							"data": []
						}
					],
				},
				//设备增长量
				annulus: {
					"categories": [],
					"series": [{
						"name": "亮灯时长",
						"data": []
					}]
				},
			}

		},

		methods: {
			//底部tabbar跳转事件
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page,
				})
			},
			bindDateChange() { //顶部选取时间
				this.tabTimeShow = true;
			},
			PromisFun(url, data, method) {
				return new Promise((resolve, reject) => {
					this.$request({
						url,
						data,
						method,
						success: res => {
							resolve(res);
						}
					})
				})
			},
			async getHistoricslMsg() { //获取设备参数
				uni.showLoading({
					title: "加载中"
				})
				let data = {
					id: uni.getStorageSync("eqId"),
					updateTime: this.updateTime
				};
				let url = this.$urls.url.eqItem.getEquipmentHistory +
					`?id=${data.id}&updateTime=${data.updateTime}`;
				await this.PromisFun(url, data, "GET").then(res => {
					if (res.history.code == 10000) {
						let [led_dy, led_dl, led_gl, led_liang, time_arr] = [
							[],
							[],
							[],
							[],
							[]
						];
						let paramsAry = res.history.data;
						paramsAry.forEach(item => {
							time_arr.push(item.date);
							led_dy.push(item.voltage);
							led_dl.push(item.current);
							led_gl.push(item.active_power);
							led_liang.push(item.brightness);
						})
						this.chartData.series[0].data = led_dy;
						this.chartData.series[1].data = led_dl;
						this.chartData.series[2].data = led_gl;
						this.chartData.series[3].data = led_liang;
						this.chartData.categories = time_arr;
						uni.hideLoading();
					}
				})

			},
			getDataHis() {
				let data = {
					moduleId: uni.getStorageSync("eqId"),
					start:this.startTime,
					stop:this.stopTime
				};
				setTimeout(() => {
					uni.showLoading({
						title: "加载中"
					})
				}, 500)
				this.$request({
					url: this.$urls.url.eqItem.getDataHis,
					method: "POST",
					data,
					success: res => {
						if (res.code == 10000) {
							let [xData, yData] = [
								[],
								[]
							];
							res.data.forEach(v => {
								xData.push(v.date.substr(5, 5));
								yData.push(Number(isNaN(v.lights_time) ? 0 : (v.lights_time / 3600)
									.toFixed(2)));
								this.annulus.categories = xData;
								this.annulus.series[0].data = yData;
							})
						}
						uni.hideLoading()
					}
				})
			},
			//图表提前一天
			async prevEchart() {
				let time = this.updateTime;
				//将时间戳转换成时间
				let cuter = disTime(time, 1, "jian");
				this.updateTime = cuter;
				await this.getHistoricslMsg();
			},
			async nextEchart(){
				if(this.updateTime==this.getJinTime()){
					return this.$showToast("已经是最后一条了");
				}
				let time = this.updateTime;
				//将时间戳转换成时间
				let cuter = disTime(time, 1, "add");
				this.updateTime = cuter;
				await this.getHistoricslMsg();
			},
			getJinTime(){//获取当前时间
				let time = new Date(),
					year = time.getFullYear(),
					month = time.getMonth() + 1,
					date = time.getDate()-1,
					updateTime = year + "-" + month + "-" + date;
				return updateTime;
			},
			//时间选择
			async timeConfirmTB(e) {
				let frTime=e.year+'-'+e.month+"-"+e.day;
				if(new Date(frTime).getTime()>new Date().getTime()){
					return this.$showToast("时间不能大于当前日期")
				}
				this.updateTime=frTime;
				await this.getHistoricslMsg()
			},
			changeTimeStart(){
				this.TimeStart=true;
			},
			changeTimeStop(){
				this.TimeStop=true;
			},
			//结束时间
			TimeStopConfirm(e){
				let stTime=e.year+"-"+e.month+"-"+e.day;
				this.stopTime=stTime;
			},
			//开始时间
			TimeStartConfirm(e){
				let stTime=e.year+"-"+e.month+"-"+e.day;
				this.startTime=stTime;
			},
		},
		onLoad() {
			this.getHistoricslMsg();
			this.getDataHis();
			this.updateTime = this.getJinTime();
			this.startTime=this.getJinTime();
			this.stopTime=this.getJinTime();
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/eqlistItem/index"
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
	@import "./index.css";
	.charts-box {
		width: 100%;
		height: 100%;
	}
</style>
