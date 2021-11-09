<template>
	<view>
		<view class="time-toolbar" style="margin-top: 10rpx;">
			<view class="time-box" @click="changeTimeStart">
				<view class="picker">{{startTime}}</view>
			</view>~
			<view class="time-box" @click="changeTimeStop">
				<view class="picker">{{stopTime}}</view>
			</view>
			<view class="done" @click="getHistoricslMsg">确定</view>
		</view>
		<view>
			<!--设备状态-->
			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">温度</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts2" type="demotype" :chartData="temperature"
							background="none" />
					</view>
				</view>
			</view>
			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">湿度</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts1" type="demotype" :chartData="humidity"
							background="none" />
					</view>
				</view>
			</view>
			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">PM.5</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts1" type="demotype" :chartData="Pm25Ary"
							background="none" />
					</view>
				</view>
			</view>
			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">PM10</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts1" type="demotype" :chartData="Pm10Ary"
							background="none" />
					</view>
				</view>
			</view>
			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">风速</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts1" type="demotype" :chartData="windSpeed"
							background="none" />
					</view>
				</view>
			</view>

			<view class="EquipmentStatus">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">噪音</view>
				</view>
				<view class="eqSum" style="margin-left: -6%;width: 110%;">
					<view class="charts-box">
						<qiun-data-charts :ontouch="true" :opts="opts1" type="demotype" :chartData="noiseAry"
							background="none" />
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
		<!--底部导航-->
		<BottonTabar :tabbarList="tabbarList"></BottonTabar>
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
				tabbarList: [{
						iconPath: "gift",
						selectedIconPath: "gift-fill",
						text: '智慧天气',
						customIcon: false,
						page: "/pages/environmentDetail/environmentDetail",
						pagePath: "/pages/environmentDetail/environmentDetail"
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '历史数据',
						isDot: false,
						customIcon: false,
						page: "/pages/weatherHistory/weatherHistory",
						pagePath: "/pages/weatherHistory/weatherHistory"
					}
				],
				startTime: "",
				stopTime: "",
				opts2: {
					dataLabel: false,
					enableScroll: false,
					color:[ "#EE6666"],
					xAxis: {
						itemCount: 5,
						boundaryGap: "center",
						scrollShow: true,
						
					},
					yAxis:{
						disableGrid:true
					}
				},
				opts1: {
					dataLabel: false,
					enableScroll: false,
					color:[ "#1890FF"],
					xAxis: {
						itemCount: 5,
						boundaryGap: "center",
						scrollShow: true,
						
					},
					yAxis:{
						disableGrid:true
					}
				},
				tabTimeShow: false,
				isTop: false,
				updateTime: "", //日期
				allDis: false,
				current: "",
				TimeStop: false,
				TimeStart: false,
				//温度
				temperature: {
					"categories": [],
					"series": [{
							"name": "温度(℃)",
							"data": []
						},

					],
				},
				//湿度
				humidity: {
					"categories": [],
					"series": [{
						"name": "湿度(%)",
						"data": []
					}]
				},
				Pm25Ary: {
					"categories": [],
					"series": [{
						"name": "PM2.5",
						"data": []
					}]
				},
				Pm10Ary: {
					"categories": [],
					"series": [{
						"name": "Pm10",
						"data": []
					}]
				},
				windSpeed: {
					"categories": [],
					"series": [{
						"name": "风速",
						"data": []
					}]
				},
				noiseAry: {
					"categories": [],
					"series": [{
						"name": "噪音",
						"data": []
					}]
				},
			};
		},
		methods: {
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
							uni.hideLoading();
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
					serial: uni.getStorageSync("imei"),
					start: this.startTime,
					stop: this.stopTime
				};
				let [temperature, humidity, Pm25Ary, Pm10Ary, windSpeed, noiseAry] = [
					[],
					[],
					[],
					[],
					[],
					[]
				]
				let url = this.$urls.platformUrl.environ.environStatus;
				let updeateTime = [];
				await this.PromisFun(url, data, "POST").then(res => {
					if (res.code == 10000) {
						let ary = res.data.history;
						ary.forEach((v, h) => {
							temperature.push(v.temp);
							humidity.push(v.humidity);
							Pm25Ary.push(v.pm2);
							Pm10Ary.push(v.pm1);
							windSpeed.push(v.wind_direction_num);
							noiseAry.push(v.noise);
							let str = v.date.substr(5, 5)
							updeateTime.push(str);
						})
					}
				})
				console.log(temperature)
				this.temperature.series[0].data = temperature;
				this.temperature.categories = updeateTime;
				this.humidity.series[0].data = humidity;
				this.humidity.categories = updeateTime;
				this.Pm25Ary.series[0].data = Pm25Ary;
				this.Pm25Ary.categories = updeateTime;
				this.Pm10Ary.series[0].data = Pm10Ary;
				this.Pm10Ary.categories = updeateTime;
				this.windSpeed.series[0].data = windSpeed;
				this.windSpeed.categories = updeateTime;
				this.noiseAry.series[0].data = noiseAry;
				this.noiseAry.categories = updeateTime;

			},
			getJinTime() { //获取当前时间
				let time = new Date(),
					year = time.getFullYear(),
					month = time.getMonth() + 1,
					date = time.getDate() - 1,
					updateTime = year + "-" + month + "-" + date;
				return updateTime;
			},
			//时间选择
			async timeConfirmTB(e) {
				let frTime = e.year + '-' + e.month + "-" + e.day;
				if (new Date(frTime).getTime() > new Date().getTime()) {
					return this.$showToast("时间不能大于当前日期")
				}
				this.updateTime = frTime;
				await this.getHistoricslMsg()
			},
			changeTimeStart() {
				this.TimeStart = true;
			},
			changeTimeStop() {
				this.TimeStop = true;
			},
			//结束时间
			TimeStopConfirm(e) {
				let stTime = e.year + "-" + e.month + "-" + e.day;
				this.stopTime = stTime;
			},
			//开始时间
			TimeStartConfirm(e) {
				let stTime = e.year + "-" + e.month + "-" + e.day;
				this.startTime = stTime;
			},
		},
		onLoad() {
			this.startTime = this.getJinTime();
			this.stopTime = this.getJinTime();
			this.getHistoricslMsg();
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/LEDequimentDetail/index"
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

<style lang="scss">
	@import "./index.css";

	.charts-box {
		width: 100%;
		height: 100%;
	}
</style>
