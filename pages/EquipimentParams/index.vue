<template>
	<view class="paramList">
		<view class="TemplateName" @click="toParamsEatil" v-if="!parmas.timestamp">
			+ 添加新参数
		</view>
		<view class="telmLis" v-else>
			<view class="telmLisTX">更新时间</view>
			<view>{{paramsLis.time}}</view>
		</view>

		<view v-if="parmas.strategy_content">
			<view class="timeSlot">
				<view style="margin-left: 36rpx; color: gray;">时间段</view>
			</view>
			<view class="telmLis" v-show="paramsLis.uptime">
				<view class="telmLisTX">{{paramsLis.uptime}}</view>
				<view>{{paramsLis.state1}}</view>
			</view>
			<view class="telmLis" v-show="paramsLis.outtime">
				<view class="telmLisTX">{{paramsLis.outtime}}</view>
				<view>{{paramsLis.state2}}</view>
			</view>
		</view>
		<view class='noData' v-else>
			<image class='icon' src='../../static/noData.png'></image>
			<view class='dec'>无相关结果</view>
		</view>
		<!--底部tabbar-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn" :show="!allDis">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		dateFormatFn
	} from "../../util/tools.js";
	export default {
		data() {
			return {
				noDataShow: false, //提示显示
				allDis: false,
				current: "",
				itemId: "",
				id: "",
				parmas:{},
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
				paramsLis: [], //参数
			}
		},
		methods: {
			//底部tabbar跳转事件
			tabListBtn(e) {
				let url = this.tabbarList[e];
				console.log(url);
				uni.redirectTo({
					url: url.page
				})
			},
			toParamsEatil() {
				//跳转添加参数页面、

				uni.navigateTo({
					url: "/pages/addParamsDetail/index",
				})
			},
			//处理状态
			disStatus(status) {
				let result = '';
				switch (status) {
					case '00':
						result = '关灯'
						break;
					case '01':
						result = '开灯'
						break;
					case '02':
						result = '调光'
						break;
					default:
						result = false
						break;
				}
				return result;
			},
			getParams() {
				uni.showLoading({
					title: "加载中"
				})
				let data = {
					id: this.id,
					itemId: this.itemId
				};
				this.$request({
					url: this.$urls.url.eqItem.getEquipmentPar + `?itemId=${data.itemId}&id=${data.id}`,
					data,
					method: "GET",
					success: res => {
						uni.hideLoading();
						if (res.code == 10000) {
							this.parmas=res.data;
							if (res.data.strategy_content) {
								let msg = res.data.strategy_content;
								let uptime = msg.substr(0, 5);
								let outtime = msg.substr(9, 5);
								let time = dateFormatFn(res.data.timestamp);
								let state1 = msg.substr(7, 2) <= 10 ? "关灯" : "开灯";
								let state2 = this.disStatus(msg.substr(15, 2)) + " " + msg.substring(msg
									.length - 2) + "%";
								this.paramsLis = {
									time,
									uptime,
									outtime,
									state1,
									state2
								};
							}
						}
					}
				})
			}
		},
		onBackPress(e) {
			console.log(e)
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
		onLoad() {
			//
			this.itemId = uni.getStorageSync("itemId");
			this.id = uni.getStorageSync("eqId")
			this.getParams();

		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.css";
</style>
