<template>
	<view>
		<view class="glleryList">
			<view class="gllery" v-for="item in tabList" :key="item.id">
				<view class="bigImg">
					<image mode="widthFix" :src="'https://warn.ludeng-yun.com/led/getThumbnail?id='+item.source_id">
					</image>
				</view>
				<view class="subject">
					<view class="imgName">{{item.name}}</view>
					<view class="coazuo">
						<view class="fileType">类型:{{item.type+'/'+item.file_ext}}</view>
						<view class="dis" style="display: block;">
							<u-button type="error" size="mini" @click="deletIcon(item)">删除</u-button>
						</view>
					</view>
					<view class="coazuo">
						<view class="fileType">大小:{{onitMb(item.size)}}MB</view>
						<view class="fileType">上传时间:{{timepToupdate_time(item.update_time)}}</view>
					</view>
				</view>
			</view>
		</view>
		<!--内容为空-->
		<view class="nullItem">
			<u-empty text="暂无媒体" mode="list" v-show="!tabList.length"></u-empty>
		</view>
		<!-- <BottonTabar :tabbarList="tabbarList"></BottonTabar> -->
		<view @click="addVidImg" class="tianjia">添加</view>
		<!--底部导航-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>

<script>
	import {

		formatTime
	} from "../../util/tools.js";
	import {
		mixin
	} from "../../mixins/mixin.js";
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				current: 0,
				tabList: [],
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '屏幕详情',
						customIcon: false,
						page: "/pages/screenDetail/screenDetail",
						pagePath: "/pages/screenDetail/screenDetail"

					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '媒体库',
						isDot: false,
						customIcon: false,
						page: "/pages/MediaLibrary/MediaLibrary",
						pagePath: "/pages/MediaLibrary/MediaLibrary"
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '节目管理',
						isDot: false,
						customIcon: false,
						page: "/pages/ProgramManagement/ProgramManagement",
						pagePath: "/pages/ProgramManagement/ProgramManagement"
					},
				],
			};
		},
		methods: {
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page
				})
			},
			getEqupementParm() {
				uni.showLoading({
					title: "加载中..."
				})
				let data = {};
				this.$request({
					url: this.$urls.platformUrl.Screen.getSources,
					method: "POST",
					header: {
						token: uni.getStorageSync("token")
					},
					data,
					success: res => {
						uni.stopPullDownRefresh();
						if (res.code = 10000) {
							uni.hideLoading();
							this.tabList = res.data
						}
					}
				})
			},
			//删除
			deletIcon(item) {
				uni.showLoading({
					title: "指令下发中"
				})
				let data = {
					sourceId: item.source_id
				};
				this.$request({
					url: this.$urls.platformUrl.Screen.delSources,
					data,
					method: "POST",
					success: res => {
						if (res.code == 10000) {
							this.getEqupementParm();
							this.$showToast("操做成功")
						} else {
							this.$showToast(res.msg);
						}
					}
				})
			},
			onitMb(size) {
				//截取大小
				size = size / 1024 / 1024;
				size = size.toFixed(2)
				return size
			},
			//时间戳转换
			timepToupdate_time(date) {
				let time = formatTime(date).substr(0, 10);
				return time;
			},
			addVidImg() {
				//跳转至上传媒体页面
				uni.navigateTo({
					url:"/pages/updateIMG/updateIMG"
				})
			},
			//上传图片
			UploadPicture(path) {

			},
		},
		computed: {

		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/LEDequimentDetail/index"
				})
				return true;
			}
		},
		onLoad() {
			this.getEqupementParm()
		},

	}
</script>

<style lang="scss">
	@import "./index.css"
</style>
