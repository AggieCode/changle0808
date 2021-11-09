<template>
	<view class="paramList">
		<view class="TemplateName" @click="toParamsEatil">
			+ 添加新参数
		</view>
		<view class="templaLis" @click="toParamsEatil(item)" v-for="item in paramsLis" :key="item.id" v-if="paramsLis.length">
			<view class="temoName">
				{{item.name}}
			</view>
			<view class="name">
				<image mode="widthFix" src="../../static/eqlist/jinru.png" class="jinruIcon"></image>
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
		formatTime
	} from "../../util/tools.js";
	export default {
		data() {
			return {
				allDis: false,
				current: "",
				parmas: {},
				tabbarList: [{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '设备列表',
					customIcon: false,
					page: "/pages/eqlistItem/index",
					pagePath: "/pages/eqlistItem/index"

				}, {
					iconPath: "list",
					selectedIconPath: "list-dot",
					text: '参数设置',
					customIcon: false,
					page: "/pages/parameterSetting/index",
					pagePath: "/pages/parameterSetting/index"
				}, {
					iconPath: "file-text",
					selectedIconPath: "file-text-fill",
					text: '项目信息',
					isDot: false,
					customIcon: false,
					page: "/pages/ItemInfoPage/index",
					pagePath: "/pages/ItemInfoPage/index"
				}],
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
			toParamsEatil(item) {
				//跳转添加参数页面、
				let id=item.id;
				uni.navigateTo({
					url: `/pages/addParamsDetail/index?id=${id}`,
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
					pageNumber: 1,
					pageSize: 12,
					itemId: uni.getStorageSync("itemId")
				};
				this.$request({
					url: this.$urls.url.ListIM.getStrategyList,
					data,
					method: "POST",
					success: res => {
						uni.hideLoading();
						if (res.code == 10000) {
							this.paramsLis= res.data.list;
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
			this.getParams();

		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.css";
</style>
