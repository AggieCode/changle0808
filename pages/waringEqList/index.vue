<template>
	<view>
		<view class="waringTime">
			<view class="dayBefore">
				<image src="../../static/eqlist/fanhui.png" class="dayIcon"></image>
				<view>前一天</view>
			</view>
			<view class="selectTime" @click="selectFun">
				<view>{{time}}</view>
				<image src="../../static/eqlist/xiala.png"></image>
			</view>
			<view class="dayBefore">
				<view>后一天</view>
				<image src="../../static/eqlist/xiaojinru.png" class="dayIcon"></image>
			</view>
		</view>
		<view class="waringBox">
			<h4>设备006</h4>
			<view class="errInfo">告警内容:电压低 未检测到负载</view>
			<view class="errInfo"><text>告警时间:2021-08-03</text>
				<view class="errbtn">
					<!--处理按钮-->
					<u-button type="primary" size="mini">已处理</u-button>
				</view>
			</view>
		</view>
		<u-picker  v-model="timeSelect" mide="time" :params="Timeparams" @confirm="affirmFun"></u-picker >
		<!--底部tabbar-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:"2021-09-17",
				Timeparams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				timeSelect: false,
				current: "",
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
					iconPath: "error-circle",
					selectedIconPath: "error-circle",
					text: '告警信息',
					customIcon: false,
					page: "/pages/waringEqList/index",
					pagePath: "/pages/waringEqList/index"

				}, {
					iconPath: "file-text",
					selectedIconPath: "file-text-fill",
					text: '项目信息',
					isDot: false,
					customIcon: false,
					page: "/pages/ItemInfoPage/index",
					pagePath: "/pages/ItemInfoPage/index"
				}],
			}
		},
		methods: {
			//底部点击跳转页面
			tabListBtn(e) {
				let url = this.tabbarList[e];
				console.log(url);
				uni.redirectTo({
					url: url.page
				})
			},
			selectFun() {
				//选择时间
				this.timeSelect = true;
			},
			affirmFun(e){
				console.log(e);
				this.time=e.year+"-"+e.month+"-"+e.day
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.css";
</style>
