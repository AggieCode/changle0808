<template>
	<view class="paramList">
		<view class="telmLis">
			<view class="telmLisTX">更新时间</view>
			<view>{{updateTime}}</view>
		</view>

		<view v-if="paramsLis.length>0">
			<view class="timeSlot">
				<view style="margin-left: 36rpx; color: gray;">时间段</view>
			</view>
			<view class="telmLis" v-for="(item,index) in paramsLis" :key="index">
				<view class="telmLisTX">{{item.time}}</view>
				<view>{{item.status}}<text v-if="item.liang">{{item.lang}}50%</text></view>
			</view>
			<!-- <view class="telmLis" v-show="paramsLis.outtime">
				<view class="telmLisTX">{{paramsLis.outtime}}</view>
				<view>{{paramsLis.state2}}</view>
			</view> -->
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
		formatTime
	} from "../../util/tools.js";
	export default {
		data() {
			return {
				updateTime:"",//更新时间
				noDataShow: false, //提示显示
				allDis: false,
				current: "",
				itemId: "",
				id: "",
				parmas: {},
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
			//处理时间段
			disTimeList(data) {
				let that = this;
				let result = [];
				let cntData = data.split(',');
				cntData.forEach((item, index) => {
					let temp = item.split('_');
					result.push({
						time: temp[0] || false,
						status: that.disStatus(temp[1]),
						liang: temp[2] || false
					})
				})
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
							this.parmas = res.data;
							let timeIlist = "";
							if (res.data.timestamp) {
								this.updateTime = formatTime(res.data.timestamp);
							}
							if (res.data.strategy_content) {
								timeIlist = this.disTimeList(res.data.strategy_content);
							}
							this.paramsLis=timeIlist;
						}
					}
				})
			}
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/eqlistItem/index"
				})
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
