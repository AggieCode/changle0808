<template>
	<view>
		<view class="listItme">
			<view class="itemBox" v-for="(item,index) in itemList" :key="item.id">
				<view class="itemBox-list">
					<view class="itemMsg">
						<view class="itemEqName">{{item.name}}</view>
						<view class="itemEqxq">宽度：{{item.width}}</view>
						<view class="itemEqxq">高度：{{item.height}}</view>
					</view>
					<!--节目信息-->
					<view class="infoList">
						<view class="imgInfo" v-for="(v,indx) in item.source_time" v-show="indx==3?false:true">
							<view class="brodeTime">{{v.t}}s</view>
							<image :src="'https://warn.ludeng-yun.com/led/getThumbnail?id='+v.s" mode="widthFix"
								class="progamIcon"></image>
						</view>
					</view>
					<view class="opeatryItme">
						<u-button type="primary" size="mini" class="xiafa" @click="IssueProgam(item)">下发</u-button>
						<u-button type="error" size="mini" class="xiafa" @click="deletProgam(item)">删除</u-button>
					</view>
				</view>
				<view class="bottom-info">
					<view class="itemEqxq">总大小：{{onitMb(item.total_size)}}MB</view>
					<view class="itemEqxq">创建时间：{{timepToupdate_time(item.update_time)}}</view>
				</view>
			</view>
		</view>

		<!-- <BottonTabar :tabbarList="tabbarList"></BottonTabar> -->
		<view class="nullItem">
			<u-empty text="暂无节目" mode="list" v-show="!itemList.length"></u-empty>
		</view>
		<SuspendBtn @suspendFun="suspendFun"></SuspendBtn>
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>

<script>
	import {
		formatTime
	} from "../../util/tools.js"
	import {
		mixin
	} from "../../mixins/mixin.js"
	export default {
		mixins: [mixin],
		data() {
			return {
				current: 0,
				eqitem: {}, //屏幕
				itemList: [],
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
					//获取列表信息
					let data = {};
				this.$request({
					url: this.$urls.platformUrl.Screen.getAllProgram,
					data,
					method: "POST",
					success: res => {
						if (res.code == 10000) {
							uni.stopPullDownRefresh()
							this.itemList = res.data;
						}
					}
				})
			},
			//删除节目
			deletProgam(item) {
				let data = {
						programId: item.id
					},
					url = this.$urls.platformUrl.Screen.delProgram;
				this.RefrshList(url, data);
			},
			//下发节目
			IssueProgam(item) {
				console.log(this.eqitem)
				let data = {
						programId: item.id,
						id: uni.getStorageSync("led_id")
					},
					url = this.$urls.platformUrl.Screen.onRelease;
				this.RefrshList(url, data);
			},
			//刷新
			RefrshList(url, data, method = "POST") {
				return new Promise((resolve, reject) => {
					return this.$request({
						url,
						data,
						method,
						success: res => {
							if (res.code == 10000) {
								this.$showToast("操作成功");
								this.getEqupementParm();
								resolve(res);
							} else {
								this.$showToast(res.msg);
							}
						}
					})
				})
			},
			//跳转至添加计划任务
			suspendFun(){
				uni.navigateTo({
					url:"/pages/AddProgram/AddProgram"
				})
			},
		},
		onBackPress(e) {
			console.log(e)
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/LEDequimentDetail/index"
				})
				return true;
			}
		},
		onLoad() {
			this.getEqupementParm();
		}
	}
</script>

<style lang="scss">
	@import "./index.css";
</style>
