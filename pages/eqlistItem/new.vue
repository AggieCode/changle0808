<template>
	<view>
		<!-- <view class="searchBox">
			<u-search placeholder="请输入项目名称" action-text="添加" :clearabled="true" :disabled="false" @custom="custom">
			</u-search>
		</view> -->
		<view>
			<view class="eq-tool">
				<view class="left">
					<view class='left-item' @click='sxClick'>
						<image v-if="sxPanel" class='icon' src='../../static/eqlist/selesx.png'></image>
						<image v-else class='icon' src='../../static/eqlist/shaixuanwx.png'></image>
						<text :class='{"toolActive":sxPanel}'>筛选</text>

					</view>
					<view class='left-item' @click='allClick'>
						<!--regColos-->
						<image v-if="allDis" class='icon' src='../../static/eqlist/piliangxuanzhong.png'></image>
						<image v-else class='icon' src='../../static/eqlist/piliangweix.png'></image>
						<text :class='{"toolActive":allDis}'>批量</text>
					</view>
				</view>
				<view class='right'>
					<view class='tianqi' v-if="weather">
						<image if="weather.icon" class='icon' src='../../static/sunny.png'></image>
						<text style='margin-left:10rpx'>晴</text>
						<text style='margin-left:10rpx'>22℃</text>
						<text style='margin-left:10rpx'>乌鲁木齐</text>
					</view>
					<!--搜索设备-->
					<image catchtap='searchEq' class='icon' src='../../static/sb_search.png' @click="toseacrhEQ">
					</image>
					<!--添加设备-->
					<image catchtap='goAddEq' class='icon' src='../../static/sb_add.png' @click="toAddEqpage"></image>
				</view>
			</view>

		</view>
		<!-- <u-mask :show="allDis" @click="allDis = false" z-index="16" duration="100"></u-mask> -->
		<u-mask :show="sxPanel" @click="sxPanel = false" z-index="9"></u-mask>
		<view class="checkall" v-show="allDis" @click="chechkAll(true)" v-if="navbtn"><text>全选</text></view>
		<view class="checkall" v-show="allDis" @click="chechkAll(false)" v-else><text>取消</text></view>
		<view :class="{'dropw':true,'slidD0ropw':sxPanel}" v-if="sxPanel">
			<view class="reagList" v-for="item in eqNameList" :key="item.id" @click="eqNameBtn(item)">
				<text :class="{'regColos':item.check}">{{item.name}}</text>
				<image class="reglistIm" src="../../static/eqlist/xuanze.png" v-show="item.check"></image>
			</view>
		</view>
		<view class="infoBox">
			<view class="eq-list" v-for="(item,index) in eqInofLis" :key="item.id">
				<view class="left">
					<view>
						<u-checkbox-group @change="" v-show="allDis">
							<u-checkbox @change="checkboxChange" v-model="item.check" :name="item.id">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<image src="../../static/eqlist/LED.png" class="IDicon"></image><text>{{item.name}}</text>
				</view>
				<view class="right">
					<image class="icon-cd" src="../../static/eqlist/WIFI.png" v-if="item.is_online"></image>
					<image class="icon-cd" src="../../static/item/lixianimg.png" v-else></image>
					<image class="icon-cd" src="../../static/eqlist/dianliang.png"></image>
					<image class="icon-cd" src="../../static/item/onlieimg.png" v-if="item.is_lighting"></image>
					<image class="icon-cd" src="../../static/item/denglixian.png" v-else></image>
					<text style="margin-left: 10rpx; margin-right: 15rpx;">{{item.brightness}}</text>
				</view>
			</view>
		</view>






		<!--设备底部开关-->
		<view class="eqswitchBox" v-show="allDis">
			<view class="witbtns">
				<image src="../../static/jiance.png"></image>
				<view style="margin-left: 10rpx;">开启</view>
			</view>
			<view class="witbtns">
				<image src="../../static/jiance.png"></image>
				<view style="margin-left: 10rpx;">关闭</view>
			</view>
			<view class="witbtns">
				<image src="../../static/gengxin.png" style="width: 28rpx;"></image>
				<view style="margin-left: 10rpx;">更新</view>
			</view>
		</view>

		<!--底部tabbar-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn" :show="!allDis">
		</u-tabbar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				navbtn: true,
				id: uni.getStorageSync("itemId"),
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
				value1: "",
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				eqNameList: [{
						name: "led设备",
						id: 0,
						check: true,
					},
					{
						name: "屏幕列表",
						id: 1,
						check: false,
					},
					{
						name: "音频广播",
						id: 2,
						check: false,
					}, {
						name: "监控",
						id: 3,
						check: false,
					}, {
						name: "智慧天气",
						id: 4,
						check: false
					}, {
						name: "一键报警",
						check: false,
						id: 5
					}
				],
				weather: true, //天气
				sxPanel: false,
				allDis: false,
				disMsg: "0",
				eqInofLis: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				checktrue: false
			}
		},
		methods: {
			custom() {
				console.log("搜索")
			},
			//点击筛选
			sxClick() {
				this.sxPanel = !this.sxPanel;
			},
			allClick() { //批量操作
				this.allDis = !this.allDis;
			},
			//点击tab标签

			Clickchange(e) {
				console.log(e);
				this.disMsg = e;
				this.swiperCurrent = e;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				// this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				// let current = e.detail.current;
				// // this.$refs.uTabs.setFinishCurrent(current);
				// this.swiperCurrent = current;
				// this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			},
			//单选
			checkboxChange(e) {
				console.log(e);
				console.log(this.eqInofLis)
			},
			//筛选
			eqNameBtn(value) {
				console.log(value);
				this.eqNameList.forEach((v, h) => {
					v.check = false;
				})
				this.eqNameList[value.id].check = true;
				setTimeout(() => {
					this.sxPanel = false;
				}, 200)


			},
			//跳转至添加设备页面
			toAddEqpage() {
				uni.navigateTo({
					url: "/pages/addequipments/index"
				})
			},
			//跳转至搜索页面
			toseacrhEQ() {
				uni.navigateTo({
					url: "/pages/searchEquip/index"
				})
			},
			//底部点击跳转页面
			tabListBtn(e) {
				let url = this.tabbarList[e];
				console.log(url);
				uni.redirectTo({
					url: url.page
				})
			},
			//获取设备列表
			getItemLis() {
				let data = {
					itemId: this.id,
					pageNumber: 1,
					pageSize: 10,
					keyword: "",
				}
				this.$request({
					url: this.$urls.url.eqItem.moduleList,
					method: "POST",
					data,
					success: res => {
						if (res.code == 10000) {
							res.data.list.forEach(v => {
								v.check = false;
							})
							this.eqInofLis = res.data.list;
						}
					}
				})
			},
			chechkAll(e) {
				if (e) {
					this.eqInofLis.forEach(v => {
						v.check = true;
					})
				} else {
					this.eqInofLis.forEach(v => {
						v.check = false;
					})
				}
				this.navbtn = !this.navbtn;
			}
		},
		onLoad(data) {
			if (data.id) {
				this.id = data.id;
				uni.setStorageSync("itemId", data.id);
			}
			this.getItemLis();
		}
	}
</script>

<style lang="scss">
	@import './index.css';

	.searchBox {
		height: 100rpx;
		margin: 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.eqlit-item {
		width: 700rpx;
		height: 500rpx;
		margin: 20rpx auto 0;
		border-radius: 10rpx;
		border: 1px solid red;
		position: relative;
	}
</style>
