<template>
	<view>
		<view class='eqDetail-top'>
			<!--状态、信号、电量等-->
			<view class='one'>
				<view class='left'>
					<text class='name'>{{eqDetail.name}}</text>
					<image @click='showEditDiago' class='icon' src='../../static/xr@2x.png'></image>
				</view>
				<view class='right'>
					<view class="yuanhuan">
						<image class='icon' src='../../static/item/onlieimg.png' v-if="eqDetail.is_lighting==1"></image>
						<image v-else class='icon' src='../../static/item/denglixian.png'></image>
					</view>
					<view class="yuanhuan">
						<image class='icon' src="../../static/eqlist/WIFI.png" style="width: 38rpx; height: 38rpx;"
							v-if="eqDetail.signal_strength"></image>
						<image class='icon' src="../../static/eqlist/WiFiOff.png" style="width: 38rpx; height: 38rpx;"
							v-else></image>
					</view>
				</view>
			</view>
			<!--更新时间和序列号-->
			<view class='eqDetail-upTime'>
				<view class="xlh">序列号：{{eqDetail.imei}}</view>
				<view>更新时间：{{toTime(eqDetail.timestamp)||""}}</view>
			</view>
			<!--备注-->
			<view class='remark' @click='showEditRemark'>
				{{eqDetail.comment||"暂无备注" }}
				<image class='icon' src='../../static/xr@2x.png' style="margin-left: 15rpx;"></image>
			</view>

			<!--温度、放电等-->
			<view class='sb-info'>
				<view class='info-list'>
					<text class='dec'>有功功率</text>
					<text class='val'>{{eqDetail.active_power}}W</text>
				</view>
				<view class='info-list'>
					<text class='dec'>总电量</text>
					<text class='val'>{{eqDetail.total_active_power}}</text>
				</view>
				<view class='info-list'>
					<text class='dec'>功率因素</text>
					<text class='val'>{{eqDetail.reactive_power}}</text>
				</view>
				<view class='info-list'>
					<text class='dec'>运行天数</text>
					<text class='val'>{{runDay||0}}天</text>
				</view>
			</view>

		</view>
		<view class='toolbar'>
			<view class='item' @click='updateEquipment'>
				<image class='icon' src='../../static/eqitemicon/reset.png'></image>
				<text class='dec'>更新</text>
			</view>
			<!-- <view class='item' data-status="1" bindtap='openEquipment'>
		      <image class='icon open' src='/static/img/sb_kd.png'></image>
		      <text class='dec'>开灯</text>
		    </view> -->
			<view class='item' @click='showTGDiago'>
				<image class='icon' src='../../static/ziaxian.png'></image>
				<text class='dec'>开灯</text>
			</view>
			<view class='item' @click='guanMethods'>
				<image class='icon' src='../../static/item/denglixian.png'></image>
				<text class='dec'>关灯</text>
			</view>
			<view class='item' @click='dingwei'>
				<image class='icon' src='../../static/eqitemicon/dingwei.png'></image>
				<text class='dec'>定位</text>
			</view>
		</view>


		<view class='sbInfo'>
			<!--led-->
			<!-- <view class='item'>
		        <view class='item-info'>
		          <view class='list'>
		            <image class='icon' src='/static/img/sb_V.png'></image>{{eqmentData.voltage}}V
		          </view>
		          <view class='list'>
		            <image class='icon' src='/static/img/sb_A.png'></image>{{eqmentData.current}}mA
		          </view>
		          <view class='list'>
		            <image class='icon' style='width:28rpx;height:32rpx' src='/static/img/deng_g.png'></image>{{eqmentData.brightness}}%
		          </view>
		        </view>
		      </view> -->

			<!--电压 电量 等  信息-->
			<view class='item-list'>
				<view class='left'>
					<image class='icon' src='../../static/sb_V.png'></image>
					<text class='label'>电压</text>
					<text class='dec'>96~264V</text>
				</view>
				<view>{{eqDetail.voltage}}V</view>
			</view>
			<view class='item-list'>
				<view class='left'>
					<image class='icon' src='../../static/sb_A.png'></image>
					<text class='label'>电流</text>
					<text class='dec'></text>
				</view>
				<view>{{eqDetail.current}}mA</view>
			</view>
			<view class='item-list'>
				<view class='left'>
					<image class='icon' style='width:28rpx;height:32rpx' src='../../static/deng_g.png'></image>
					<text class='label'>亮度</text>
					<text class='dec'>0~100%</text>
				</view>
				<view>{{eqDetail.brightness}}%</view>
			</view>
		</view>

		<!--绑定的设备-->
		<view class="ledEquemies">
			<ListTitle title="灯杆设备"></ListTitle>
			<view class="facility">
				<view class="facilitynav" @click="toEnverPage">
					<image src="../../static/eqlist/guanggaolan.png" class="eqitmeicon"></image>
					<text class="eqNames">屏幕广告</text>
				</view>
				<view class="facilitynav" @click="toboradCastPage">
					<image src="../../static/eqitemicon/guangbo.png" class="eqitmeicon"></image>
					<text class="eqNames">音频广播</text>
				</view>
				<view class="facilitynav" @click="toMontonPage">
					<image src="../../static/eqitemicon/monitoronlie.png" class="eqitmeicon"></image>
					<text class="eqNames">监控管理</text>
				</view>
				<view class="facilitynav" @click="toweatherPage">
					<image src="../../static/eqitemicon/tianqilan.png" class="eqitmeicon"></image>
					<text class="eqNames">智慧天气</text>
				</view>
				<view class="facilitynav">
					<image src="../../static/eqlist/gaojingzaxian.png" class="eqitmeicon"></image>
					<text class="eqNames" @click="toOneClickCallPage">一键报警</text>
				</view>
				<view class="facilitynav" @click="togatewayDetail">
					<image src="../../static/eqitemicon/onliewangguan.png" class="eqitmeicon"></image>
					<text class="eqNames" >智慧网关</text>
				</view>
				<view class="facilitynav" @click="toWifiDetails">
					<image src="../../static/eqitemicon/xinhao.png" class="eqitmeicon"></image>
					<text class="eqNames">智慧WIFI</text>
				</view>
				<view class="facilitynav" @click="toAddEquimentPage">
					<image src="../../static/eqitemicon/tianjia.png" class="eqitmeicon"></image>
					<text class="eqNames">添加</text>
				</view>
			</view>
		</view>

		<!--调光-->
		<u-modal v-model="dimmingShow" :async-close="true" :show-cancel-button="true" title="调光" @confirm="dimmingFunc">
			<view class="slot-content">
				<view class="slidern">
					<view class="lingth">亮度:{{dimming}}</view>
					<u-slider v-model="dimming"></u-slider>
				</view>
			</view>
		</u-modal>

		<!--编辑设备名称-->
		<u-modal v-model="eqnameAler" title="编辑设备名称" :show-cancel-button="true" @confirm="setEqname">
			<view class="slot-content">
				<view class="eqnameInp">
					<u-input placeholder="请输入设备名称" v-model="eqName"
						style="border: 1rpx solid #F1F1F1; padding: 0rpx 20rpx;"></u-input>
				</view>
			</view>
		</u-modal>

		<!--编辑设备备注-->
		<u-modal v-model="ReamarkShow" title="编辑备注" :show-cancel-button="true" @confirm="setReamark">
			<view class="slot-content">
				<view class="eqnameInp">
					<u-input placeholder="请输入内容" v-model="reamark"
						style="border: 1rpx solid #F1F1F1; padding: 0rpx 20rpx;"></u-input>
				</view>
			</view>
		</u-modal>
		<BottonTabar :tabbarList="tabbarList"></BottonTabar>
		<!--底部tabbar-->
		<!-- <u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn" :show="!allDis">
		</u-tabbar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reamark: "",
				ReamarkShow: false,
				eqName: "",
				eqnameAler: false,
				id: "",
				eqDetail: {}, //设备参数
				runDay: "",
				dimmingShow: false, //调光弹窗
				dimming: 0,
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
				device_serial: "", //监控设备ID
				validate_code: "", //监控视频加密
				accessToken: "", //设备token
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
			//获取设备信息
			async getEquimentDetail() {
				uni.showLoading({
					title: '加载中'
				})
				let id;
				if (!this.id) {
					id = uni.getStorageSync("eqId");
				} else {
					id = this.id;
				}
				let data = {
					id,
				}
				let url = this.$urls.url.eqItem.getEquipmentStatus + `?id=${this.id}`;
				await this.promeFun(data, url, "GET").then(res => {
					uni.hideLoading();
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
					if (res.code == 10000) {
						let msg = res.data.dataLive;
						this.eqDetail = res.data.dataLive;
						this.eqName = res.data.dataLive.name; //初始化名称
						uni.getStorageSync("eqId", msg.id);
					}
				}).then(() => {
					this.getMontoirParams(); //获取监控设备信息
					this.getEqToken(); //token
				}).catch((err) => {
					uni.hideLoading();
					this.$showToast(err);
				})
			},

			//更新
			async updateEquipment() {
				uni.showLoading({
					title: '加载中'
				})
				await this.getEquimentDetail();
			},
			//时间转换
			toTime(time) {
				//let date = new Date(1606728108489);
				var now = new Date(time),
					y = now.getFullYear(),
					m = now.getMonth() + 1,
					d = now.getDate();
				return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " "
			},
			//开关等
			guanMethods() {
				let data = {
					deviceName: this.id,
					state: 0,
					itemId: uni.getStorageSync("itemId")
				}
				this.$request({
					url: this.$urls.url.eqItem.detectionEquipment,
					data,
					method: "POST",
					success: res => {
						if (res.code == 10000) {
							this.$showToast("命令已下发")
						} else {
							this.$showToast(res.msg);
						}
					}
				})
			},
			//编辑设备名称:
			showEditDiago() {
				this.eqnameAler = !this.eqnameAler
			},
			async setEqname() {
				let data = {
					itemId: uni.getStorageSync("itemId"),
					id: this.eqDetail.id,
					name: this.eqName
				};
				let url = this.$urls.url.eqItem.setEqName;

				await this.promeFun(data, url).then(res => {
					if (res.code == 10000) {
						this.$showToast("修改成功");
					} else {
						this.$showToast(res.msg);
					}
					this.showEditDiago();
				}).then(() => {
					setTimeout(() => {
						this.getEquimentDetail()
					}, 3000)
				})

			},
			showEditRemark() {
				this.ReamarkShow = !this.ReamarkShow;
			},
			setReamark() { //编辑备注
				let data = {
					itemId: uni.getStorageSync("itemId"),
					id: this.eqDetail.id,
					comment: this.reamark
				};
				this.promeFun(data).then(data => {
					this.$request({
						url: this.$urls.url.eqItem.setEqRemark,
						data,
						method: "POST",
						success: res => {
							if (res.code == 10000) {
								this.$showToast("修改成功");
							} else {
								this.$showToast(res.msg);
							}
							this.showEditRemark();

						}
					})
				}).then(() => {
					this.getEquimentDetail();
				})

			},
			showTGDiago() { //开灯
				//调光：
				this.dimmingShow = true;
			},
			dimmingFunc() {
				setTimeout(() => {
					this.dimmingShow = false;
				}, 1000)
			},
			toAddEquimentPage() {
				uni.navigateTo({
					url: "/pages/AddLampequmipent/index" + `?id=${this.id}`
				})
			},
			promeFun(data, url, method = "POST") {
				return new Promise((resolve, reject) => {
					this.$request({
						url,
						data,
						method,
						success: res => {
							resolve(res);
						}
					})
				})
			},
			//跳转监控详情
			toMontonPage() {
				let data={
					accessToken:this.accessToken,
					deviceSerial:this.device_serial,
					code:this.validate_code,
				}
				uni.navigateTo({
					url: "/pages/monitoring/monitoring" + `?data=${encodeURIComponent(JSON.stringify(data))}`
				})
			},
			toOneClickCallPage(){
				uni.navigateTo({
					url: "/pages/onClickCallDetail/onClickCallDetail"
				})
			},
			toEnverPage(){
				//跳转屏幕页面
				console.log(this.eqDetail)
				let itemId=this.eqDetail.led_id
				uni.navigateTo({
					url: "/pages/screenDetail/screenDetail" + `?itemId=${itemId}`
				})
			},
			//跳转至天气详情
			toweatherPage() {
				let itemId = this.eqDetail.id
				uni.navigateTo({
					url: "/pages/environmentDetail/environmentDetail" + `?itemId=${itemId}`
				})
			},
			toWifiDetails(){//跳转至wifi详情页
			let itemId = this.eqDetail.id
				uni.navigateTo({
					url:"/pages/WIFIDetailPage/WIFIDetailPage"+ `?itemId=${itemId}`
				})
			},
			//跳转至智慧网关
			togatewayDetail() {
				let name = this.eqDetail.name
				uni.navigateTo({
					url: "/pages/gatewayDetail/gatewayDetail" + `?name=${name}`
				})
			},
			//跳转至音频广播
			toboradCastPage(){
				let name = this.eqDetail.name
				uni.navigateTo({
					url:"/pages/broadcastDetail/index"+`?name=${name}`
				})
			},
			//获取监控参数
			async getMontoirParams() {
				let data = {
					pageNumber: 1,
					pageSize: 10,
					keyword: this.eqDetail.name,
					itemId: uni.getStorageSync("itemId"),
				}
				let url = this.$urls.platformUrl.monitor.monitorList;
				let res = await this.promeFun(data, url, "POST");
				if (res.code == 10000) {
					this.device_serial = res.data.list[0].device_serial;
					this.validate_code = res.data.list[0].validate_code;
				} else {
					this.$showToast(res.msg)
				}
			},
			
			//获取设备token
			getEqToken() {
				let data = {
					appKey: uni.getStorageSync("app_key"),
					appSecret: uni.getStorageSync("app_secret")
				}
				uni.request({
					url: "https://open.ys7.com/api/lapp/token/get",
					method: "POST",
					data,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						appKey: uni.getStorageSync("app_key")
					},
					success: res => {
						if (res.data.code==200) {
							this.accessToken = res.data.data.accessToken;
						}else{
							this.$showToast(res.msg);
						}
					}
				})
			}
		},
		onLoad(data) {
			uni.showLoading({
				title: "加载中"
			})
			if (data.id) {
				this.id = data.id;
				uni.setStorageSync("eqId", data.id);
			} else {
				this.id = uni.getStorageSync('eqId');
			}
			this.getEquimentDetail();

		},
		onPullDownRefresh() {
			//下拉的生命周期
			let _self = this;
			setTimeout(function() {
				_self.ListMsg = [];
				_self.pageNumber = 1;
				_self.pageSize = 10;
				_self.getEquimentDetail();
				_self.$showToast("更新成功");
			}, 3000);

		},
		onBackPress(e) {
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
	}
</script>

<style lang="scss" scoped>
	@import "./index.css";
</style>
