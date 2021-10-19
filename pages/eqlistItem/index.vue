<template>
	<view>
		<!-- <view class="eq-tool">
			<view class="left">
				<view class='left-item' @click='sxClick'>
					<image v-if="sxPanel" class='icon' src='../../static/eqlist/selesx.png'></image>
					<image v-else class='icon' src='../../static/eqlist/shaixuanwx.png'></image>
					<text :class='{"toolActive":sxPanel}'>筛选</text>

				</view>
				<view class='left-item' @click='allClick'>
					<!--regColos-->
		<!--<image v-if="allDis" class='icon' src='../../static/eqlist/piliangxuanzhong.png'></image>
					<image v-else class='icon' src='../../static/eqlist/piliangweix.png'></image>
					<text :class='{"toolActive":allDis}'>批量</text>
				</view>
			</view>
			<view class='right'>
				<view class='tianqi' v-if="weather">
					<image if="weather.icon" class='icon' src='../../static/sunny.png'></image>
					<text style='margin-left:10rpx'>晴</text>
					<text style='margin-left:10rpx'>22℃</text>
					<text style='margin-left:10rpx'> </text>
				</view>
				<!--搜索设备-->
		<!--<!--<image catchtap='searchEq' class='icon' src='../../static/sb_search.png' @click="toseacrhEQ">
				</image>
				<!--添加设备-->
		<!--<image catchtap='goAddEq' class='icon' src='../../static/sb_add.png' @click="toAddEqpage"></image>
			</view>
		</view> -->
		<view class="searchBox">
			<u-search placeholder="请输入设备名称" :show-action="false" action-text="添加" v-model="keyword"
				@change="serchChange" :clearabled="true" :disabled="false">
			</u-search>

			<view class="addBimg" @click="toAddEqpage">
				<image src="../../static/sb_add.png"></image>
			</view>
		</view>
		<view class="infoBox">
			<view class="eq-list" v-for="(item,index) in eqInofLis" :key="item.id" @click="toeqDetailPage(item)">
				<view class="left">
					<view>
						<u-checkbox-group @change="" v-show="allDis">
							<u-checkbox @change="checkboxChange" v-model="item.check" :name="item.imei">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<image src="../../static/eqlist/LED.png" class="IDicon"></image><text>{{item.name}}</text>
				</view>
				<view class="right">
					<image class="icon-cd" src="../../static/eqlist/WIFI.png" v-if="item.is_online"></image>
					<image class="icon-cd" src="../../static/item/lixianimg.png" v-else></image>
					<!--一键报警-->
					<view v-show="item.err==0||item.err==1">
						<image class="icon-cd" src="../../static/eqitemicon/errorlan.png" v-if="item.err"></image>
						<image class="icon-cd" src="../../static/eqitemicon/errorhui.png" v-else></image>
					</view>
					<!--天气-->
					<view v-show="item.tianqi==0||item.tianqi==1">
						<image class="icon-cd" src="../../static/eqitemicon/tianqilan.png" v-if="item.tianqi"></image>
						<image class="icon-cd" src="../../static/eqitemicon/tianqihui.png" v-else></image>
					</view>
					<!--屏幕-->
					<view v-show="item.led==0||item.led==1">
						<image class="icon-cd" src="../../static/eqitemicon/ledpinm.png" v-if="item.led"></image>
						<image class="icon-cd" src="../../static/eqitemicon/ledhui.png" v-else></image>
					</view>

					<!--监控-->
					<view v-show="item.monitor==0||item.monitor==1">
						<image class="icon-cd" src="../../static/eqitemicon/monitoronlie.png" v-if="item.monitor">
						</image>
						<image class="icon-cd" src="../../static/eqitemicon/monitorhui.png" v-else></image>
					</view>
					<!--网关-->
					<view v-show="item.wangguan==0||item.wangguan==1">
						<image class="icon-cd" src="../../static/eqitemicon/onliewangguan.png" v-if="item.wangguan">
						</image>
						<image class="icon-cd" src="../../static/eqitemicon/wangguanhui.png" v-else></image>
					</view>
					<image class="icon-cd" src="../../static/item/onlieimg.png" v-if="item.is_lighting"></image>
					<image class="icon-cd" src="../../static/item/denglixian.png" v-else></image>
					<text style="margin-left: 10rpx; margin-right: 15rpx;">{{item.brightness}}</text>
				</view>
			</view>
		</view>


		<view class="dropw" v-if="sxPanel">
			<view class="reagList" v-for="item in eqNameList" :key="item.id" @click="eqNameBtn(item)">
				<text :class="{'regColos':item.check}">{{item.name}}</text>
				<image class="reglistIm" src="../../static/eqlist/xuanze.png" v-show="item.check"></image>
			</view>
		</view>
		<!-- <u-mask :show="allDis" @click="allDis = false" z-index="16" duration="100"></u-mask> -->
		<u-mask :show="sxPanel" @click="sxPanel = false" z-index="9"></u-mask>
		<!-- <view class="checkall" v-show="allDis" @click="chechkAll(true)" v-if="navbtn"><text>全选</text></view>
		<view class="checkall" v-show="allDis" @click="chechkAll(false)" v-else><text>取消</text></view> -->
		<!--设备底部开关-->
		<view class="eqswitchBox" v-show="allDis">
			<view class="witbtns" @click="turnLight">
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
		<view style="margin-top: 30%;" v-if="!eqInofLis.length">
			<u-empty text="暂无设备" mode="list"></u-empty>
		</view>
		<u-loadmore :status="status" v-else v-show="bottTipShow" />
		<u-back-top :scroll-top="scrollTop" top="800"></u-back-top>
		<!--底部tabbar-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn" :show="!allDis">
		</u-tabbar>


	</view>
</template>

<script>
	//节流函数
	function debounce(func, wait = 1000) { //可以放入项目中的公共方法中进行调用
		let timeout;
		return function(event) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				func.call(this, event)
			}, wait)
		}
	}
	export default {
		data() {
			return {
				keyword: "",
				status: "loadmore",
				bottTipShow: true, //底部显示
				navbtn: true,
				id: uni.getStorageSync("itemId"),
				current: "",
				scrollTop: 0,
				tabbarList: [{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '设备列表',
					customIcon: false,
					page: "/pages/eqlistItem/index",
					pagePath: "/pages/eqlistItem/index"

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
				eqNameList: [{
						name: "led设备",
						id: 0,
						check: true,
						eqUrl: this.$urls.url.eqItem.moduleList
					},
					{
						name: "屏幕列表",
						id: 1,
						check: false,
						eqUrl: this.$urls.url.pinmu.pinLis
					},
					{
						name: "音频广播",
						id: 2,
						check: false,
						eqUrl: this.$urls.url.audio.audioList,
					}, {
						name: "监控",
						id: 3,
						check: false,
						eqUrl: this.$urls.url.monitor.monitorLis
					}, {
						name: "智慧天气",
						id: 4,
						check: false,
						eqUrl: this.$urls.url.environ.environLis
					}, {
						name: "一键报警",
						check: false,
						id: 5,
						eqUrl: this.$urls.url.sos.sosList
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
				checktrue: false,
				total: "",
				page: 1,
				size: 15,
				listUrl: "",
				serial: [],
			}
		},
		methods: {
			custom() {
				console.log("搜索")
			},
			Clickchange(e) {
				console.log(e);
				this.disMsg = e;
				this.swiperCurrent = e;
			},
			//筛选
			eqNameBtn(value) {
				this.eqNameList.forEach((v, h) => {
					v.check = false;
				})
				this.eqNameList[value.id].check = true;
				setTimeout(() => {
					this.sxPanel = false;
				}, 200)

				let data = {
					itemId: this.id,
					pageNumber: 1,
					pageSize: 10,
					keyword: "",
				}
				let url = value.eqUrl;
				this.listUrl = value.eqUrl;
				this.pageNumber = 1;
				this.pageSize = 10;
				uni.showLoading({
					title: '加载中'
				});
				this.eqInofLis = [];
				this.getItemLis(data, url);
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
			getItemLis(msg, url) {
				let urls = "";
				if (url) {
					urls = url;
				} else {
					urls = this.$urls.url.eqItem.getEquipmentList;
				}
				let data;
				if (msg) {
					data = msg;
				} else {
					data = {
						itemId: this.id,
						pageNumber: this.page,
						pageSize: this.size,
						keyword: "",
						status: "",
					}
				}
				this.status = "loading";
				this.$request({
					url: urls,
					method: "POST",
					data,
					success: res => {
						let ary = [];
						if (res.code == 10000) {
							uni.hideLoading();
							ary = res.data.equipmentList.list;
							ary.forEach(v => {
								v.check = false;
							})
							if (this.eqInofLis.length) {
								ary.forEach(v => {
									this.eqInofLis.push(v)
								})
							} else {
								this.eqInofLis = ary;
							}
							this.total = res.data.equipmentList.totalRow;
							if (this.eqInofLis.length == this.total) {
								this.status = "nomore"
							} else {
								this.status = "loadmore"
							}
						}

					}
				})
			},
			//搜索
			serchChange: debounce(function(e) {
				this.keyword = e;
				this.pageNumber = 1;
				this.pageSize = 10;
				this.eqInofLis = [];
				this.getItemLis();
			}),
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
			},
			//批量开启关闭
			turnLight(v) {
				let data;
				if (v) {
					data = {
						serial: this.serial,
						outPower: 50,
						outPower2: 50
					}
				} else {
					data = {
						serial: this.serial,
						outPower: 0,
						outPower2: 0
					}
				}
			},
			//跳转灯杆详情页
			toeqDetailPage(item){
				console.log(item)
				uni.navigateTo({
					url:"/pages/LEDequimentDetail/index"+`?id=${item.id}`
				})
			}
		},
		onLoad(data) {
			uni.showLoading({
				title: '加载中'
			});
			if (data.id) {
				this.id = data.id;
				uni.setStorageSync("itemId", data.id);
			}
			this.getItemLis();
		},
		onPullDownRefresh() {
			//下拉的生命周期
			let _self = this;
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(function() {
				_self.getItemLis();
				uni.stopPullDownRefresh(); //停止当前页面下拉刷新
				_self.eqInofLis = [];
				_self.$showToast("更新成功");
			}, 3000);

		},
		onReachBottom:debounce(function(e) { //上滑加载更多
			this.status = "loading";
			this.bottTipShow = true;
			let timer = ''
			if (this.total / 10 > this.page) {
				this.page++;
				timer = setTimeout(() => {
					this.getItemLis();
					clearInterval(timer);
				}, 500)
			}
			if (this.eqInofLis.length == this.total) { //设置底部文字未没有更多了
				this.status = "nomore";
			}

		}),
		onBackPress(e) {
			console.log(e)
			if (e.from === 'backbutton') {
				uni.switchTab({
					url: "/pages/ListItem/index"
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
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
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
