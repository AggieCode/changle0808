<template>
	<view>
		<view class="medioItem" v-for="item in medioList" :key="item.id">
			<view class="medioList">
				<view class="imgNmae">
					<image mode="widthFix" src="../../static/eqitemicon/mp3.png" class="mpIcon"></image>
					<view class="medioName">{{item.name}}</view>
				</view>
				<view>
					<u-button type="primary" size="mini" @click="playAudio(item)">播放</u-button>
					<br/>
					<u-button type="error" size="mini" @click="deletBtn(item)" style="margin-top: 10rpx;">删除</u-button>
				</view>
			</view>
			<view class="botInfo">
				<view>大小:{{item.time}}</view>
				<view>时长:{{item.durations}}</view>
			</view>
		</view>
		<!--确认删除-->
		<u-modal v-model="deleTips" title="提示" :show-cancel-button="true" @confirm="deleteMedio">
			<view class="tipsItm">
				是否删除该音频
			</view>
		</u-modal>
		<!--添加按钮-->
	<!-- 	<SuspendBtn @suspendFun="suspendFun"></SuspendBtn> -->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>

<script>
	import {
		mixin
	} from "../../mixins/mixin.js"
	export default {
		mixins: [mixin],
		data() {
			return {
				current: 0,
				deleTips: false,
				medioList: [],
				medioMsg: {},
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '设备实况',
						customIcon: false,
						page: "/pages/broadcastDetail/index",
						pagePath: "/pages/broadcastDetail/index"

					}, {
						iconPath: "coupon",
						selectedIconPath: "coupon-fill",
						text: '媒体库',
						isDot: false,
						customIcon: false,
						page: "/pages/broadcaStMedia/broadcaStMedia",
						pagePath: "/pages/broadcaStMedia/broadcaStMedia"
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '计划任务',
						isDot: false,
						customIcon: false,
						page: "/pages/scheduledTask/scheduledTask",
						pagePath: "/pages/scheduledTask/scheduledTask"
					}
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
			//获取媒体库信息
			async getEqupementParm() {
				let data = {};
				let url = this.$urls.platformUrl.broadcast.getMediaData;
				let res = await this.superPromis(url, data);
				this.medioList = res.data;
				uni.stopPullDownRefresh();
				uni.hideLoading();
			},
			//删除音频
			deleteMedio() {
				uni.showLoading({
					title: "删除中"
				})
				let data = {
					fileName: this.medioMsg.name
				};
				let url = this.$urls.platformUrl.broadcast.delMediaData;
				this.superPromis(url, data).then(() => this.getEqupementParm())
			},
			deletBtn(item) {//删除
				this.medioMsg = item;
				this.deleTips = true;
			},
			async playAudio(item){//播放音乐
				let data={
					serial: uni.getStorageSync("AutioId"),
					state: "start",
					file: item.name
				}
				let url=this.$urls.platformUrl.broadcast.exeRealPlayFile;
				this.$showToast("命令下发中")
				await this.superPromis(url,data);
			},
			//添加
			suspendFun(){
				uni.chooseFile({//添加MP3文件
				  count: 1, //默认100
				  extension:['.mp3'],//根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
				    success: function (res) {
						var tempFilePaths = res.tempFilePaths;
						console.log(res)
				                console.log(JSON.stringify(tempFilePaths));
						uni.uploadFile({
							url:'' ,
							filePath: tempFilePaths[0],
							fileType: 'audio',
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								var data = JSON.parse(uploadFileRes.data);
							}
						});
				    }
				});
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getEqupementParm();
		},
		onBackPress(e) {
			console.log(e)
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
	@import "./index.css"
</style>
