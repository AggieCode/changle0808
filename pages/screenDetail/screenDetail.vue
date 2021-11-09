<template>
	<view>
		<view class="detailPam">
			<view class="titleBx">
				<view class="timeMonth">{{monthOur}}</view>
				<view class="timeMonth">最近更新:{{hoursMintu}}</view>
			</view>
			<view class="eqname">
				<image src="../../static/pingm.png" class="eqIcon"></image>{{eqnavList.name}}<text
					class="EQstatus">{{eqnavList.is_online?"在线":"离线"}}</text>
			</view>
			<view class="program">
				<view class="eqimei">ID：{{eqnavList.led_id}}</view>
				<view class="eqimei">正在播放:无</view>
			</view>
		</view>

		<!--设备信息-->
		<view class="eqParams">
			<view class="title">
				<ListTitle title="设备信息"></ListTitle>
			</view>
			<view class="eqList">
				<view class="titext">
					宽度
				</view>
				<view class="describe">
					<view>{{eqnavList.width}}</view>
				</view>
				<view class="opertion">
					<u-button type="primary" size="mini" style="opacity: 0;">调节</u-button>
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					高度
				</view>
				<view class="describe">
					{{eqnavList.height}}
				</view>
				<view class="opertion">
					<u-button type="primary" size="mini" style="opacity: 0;">调节</u-button>
				</view>
			</view>

			<view class="eqList">
				<view class="titext">
					亮度
				</view>
				<view class="describe">
					<slider :value="eqnavList.brightness" v-if="!light" block-size="20" @change="brightnChange"
						:show-value="true" />
					<text v-else>{{eqnavList.brightness}}</text>
				</view>
				<view class="opertion">
					<u-button type="primary" size="mini" v-if="light" @click="lightChange">调节</u-button>
					<u-button type="primary" size="mini" v-else @click="lightChange">设置</u-button>
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					音量
				</view>
				<view class="describe">
					<slider :value="eqnavList.volume" v-if="!volume" block-size="20" @change="setVolume"
						:show-value="true" />
					<text v-else>{{eqnavList.volume}}</text>
				</view>
				<view class="opertion">
					<view v-if="volume"><u-button type="primary" size="mini"  @click="volumeChange" class="Opteirbtn">调节</u-button></view>
					<view v-else><u-button type="primary" size="mini"  @click="volumeChange" class="Opteirbtn">确认</u-button></view>
				</view>
			</view>

			<view class="eqList">
				<view class="titext">
					状态
				</view>
				<view class="describe">
					{{eqnavList.is_open==1?"开":"关"}}
				</view>
				<view class="opertion">
					<u-switch v-model="eqnavList.is_open==1?true:false" @change="switchChnage"></u-switch>
				</view>
			</view>

			<view class="eqList">
				<view class="titext">
					定时
				</view>
				<view class="describe">

				</view>
				<view class="opertion">
					<u-button type="primary" size="mini" @click="setTimeOutModel">添加</u-button>
				</view>
			</view>

			<view class="setTime" v-if="timedTaskLis!=='not opened'">
				<!--全天亮-->
				<view class="allTime" v-if="taskShow">
					<ListTitle title="定时任务"></ListTitle>
					<view class="allTxt">全天亮</view>
				</view>
				<!--定时亮-->
				<view v-else>
					<ListTitle title="定时任务"></ListTitle>
					<view class="timeTask" v-for="(item,index) in timedTaskLis" :key="item.endTime">
						<text class="setName">定时任务{{index+1}}</text>
						<view class="eqList">
							<view class="titext">
								{{item.startTime}}
							</view>
							<view class="describe">
								~
							</view>
							<view class="opertion">
								{{item.endTime}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--添加定时任务弹窗-->
		<u-modal v-model="timeMode" title="添加定时任务" :show-cancel-button="true" @confirm="subimTimeLis">
			<view class="radioBX">
				<u-radio-group @change="RadioChange" v-model="setTimeType">
					<u-radio name="all">全天亮</u-radio>
					<u-radio name="dan">定时亮</u-radio>
				</u-radio-group>
			</view>
			<view class="temlateTime" v-for="(item,index) in timeList" :key="index" v-show="addTimeShow">
				<image src="../../static/del.png" class="deltTimeIcon" @click="deletTime(index)"></image>
				<text class="setName">定时任务{{index+1}}</text>
				<view class="modelTIme">
					<view class="titext">
						<view class="startInp">
							<view>
								<u-input placeholder="时" v-model="item.startTime.hour" style="text-align: center;">
								</u-input>
							</view>
							<view>：</view>
							<view>
								<u-input placeholder="分" v-model="item.startTime.minyte" style="text-align: center;">
								</u-input>
							</view>
						</view>
					</view>
					<view class="describe">
						<text style="color: gray;">~</text>
					</view>
					<view class="opertion">
						<view class="startInp">
							<view>
								<u-input placeholder="时" v-model="item.stopTime.hour" style="text-align: center;">
								</u-input>
							</view>
							<view>：</view>
							<view>
								<u-input placeholder="分" v-model="item.stopTime.minyte" style="text-align: center;">
								</u-input>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-button type="primary" size="mini" class="addBTn" :plain="true" v-show="addTimeShow" @click="addSetTime">
				添加</u-button>
		</u-modal>
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>
<script>
	import {
		mixin
	} from "../../mixins/mixin.js"
	export default {
		name: "screenDetail",
		mixins: [mixin],
		data() {
			return {
				taskShow:false,
				current: 0,
				timedTaskLis: [],
				hoursMintu: "",
				monthOur: "",
				eqnavList: {},
				timeMode: false,
				light: true,
				volume: true,
				volumeValue: 0, //音量
				lightValue: 0, //亮度
				switchState: false,
				setTimeType: "all",
				addTimeShow: false,
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
				timeList: [{
					startTime: {
						hour: "00",
						minyte: "00"
					},
					stopTime: {
						hour: "00",
						minyte: "00"
					}
				}]
			};
		},
		methods: {
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page
				})
			},
			//屏幕开关
			switchChnage() {
				let data;
				let url = this.$urls.platformUrl.Screen.setScreenOpen;
				if (this.eqnavList.is_open) {
					data = {
						id: this.eqnavList.id,
						ledOpen: 0
					}
				} else {
					data = {
						id: this.eqnavList.id,
						ledOpen: 1
					}
				}
				this.PromiseFun(url, data, "POST");
			},
			//亮度调节显示
			lightChange() {
				this.light = !this.light;
				if (this.light) {
					let data = {
						id: this.eqnavList.id,
						brightness: this.eqnavList.brightness
					}
					this.PromiseFun(this.$urls.platformUrl.Screen.setBrightness, data, "POST");
				}
			},
			PromiseFun(url, data, method = "POST") {
				this.$showToast("命令下发中...");
				return new Promise((resove, reject) => {
					this.$request({
						url,
						method,
						data,
						success: res => {
							if (res.code == 10000) {
								this.$showToast("操作成功");
								this.getEqupementParm();
							} else {
								this.$showToast(res.msg)
							}
							resolve(res);
						}
					})
				})
			},
			brightnChange(e) {
				this.eqnavList.brightness = e.detail.value;
			},
			//音量调节显示
			volumeChange() {
				this.volume = !this.volume;
				if (this.volume) {
					let data = {
						id: this.eqnavList.id,
						volume: this.eqnavList.volume
					}
					let url = this.$urls.platformUrl.Screen.setVolume;
					this.PromiseFun(url, data, "POST");
				}
			},
			setVolume(e) {
				this.eqnavList.volume = e.detail.value;
			},
			//设置定时显示
			setTimeOutModel() {
				this.timeMode = true;
			},
			//全天、定时
			RadioChange(e) {
				if (e == "dan") {
					this.addTimeShow = true;
				} else {
					this.addTimeShow = false;
				}
			},
			//添加定时
			addSetTime() {
				if (this.timeList.length < 4) {
					this.timeList.push({
						startTime: {
							hour: "00",
							minyte: "00"
						},
						stopTime: {
							hour: "00",
							minyte: "00"
						}
					})
				} else {
					this.$showToast("最多添加四个定时任务")
				}
			},
			//删除定时 index：索引
			deletTime(index) {
				this.timeList.splice(index, 1)
			},
			//提交定时任务
			subimTimeLis() {
				let data = {
					time: "",
					taskName: "",
					id: this.eqnavList.id
				}
				let url = this.$urls.platformUrl.Screen.setTimedScreening
				if (this.setTimeType == "all") {
					return this.PromiseFun(url, data, "POST");
				} else {
					let ary = "";
					this.timeList.reduce((r, v, j) => {
						let start = v.startTime.hour + ":" + v.startTime.minyte;
						let stop = v.stopTime.hour + ":" + v.stopTime.minyte;
						ary += "," + start + "-" + stop;
					}, 0)
					ary = ary.charAt(0) == "," ? ary.substr(1) : ary;
					data.time = ary;
				}
				this.PromiseFun(url, data, "POST");
			},
			//获取设备信息
			getEqupementParm() {
				let data = {
					pageNumber: 1,
					pageSize: 10,
					keyword: "",
					itemId: uni.getStorageSync("itemId")
				};
				this.$request({
					url: this.$urls.platformUrl.Screen.getScreenList,
					data,
					method: "POST",
					success: res => {
						uni.stopPullDownRefresh();
						if (res.code == 10000) {
							uni.hideLoading();
							this.eqnavList = res.data.list[0];
							uni.setStorageSync("led_id", this.eqnavList.id);
							this.timeClye();
							this.getTimedTask();
						}
					}
				})
			},
			//获取定时任务
			async getTimedTask() {
				let data = {
					id: this.eqnavList.id
				};
				let url = this.$urls.platformUrl.Screen.getTimedScreening;
				this.$request({
					url,
					data,
					method: "POST",
					success: res => {
						if (res.code == 10000) {
							this.timedTaskLis = res.data[0].data.schedules;
							if(this.timedTaskLis[0].timeType=='All'){
								this.taskShow=true
							}
						}
					}
				})
			},
			//时间转换
			timeClye() {
				if (this.eqnavList.update_time) {
					let time = new Date(this.eqnavList.update_time),
						m = time.getMonth() + 1,
						Dae = time.getDate(),
						hour = time.getHours(),
						day = time.getDay(),
						mintu = time.getMinutes();
					var dayCycleArray = ["日", "一", "二", "三", "四", "五", "六"];
					for (var i = 0; i < 7; i++) {
						if (day == i) {
							day = dayCycleArray[i];
						}
					}
					m = m < 10 ? "0" + m : m;
					Dae = Dae < 10 ? "0" + Dae : Dae;
					this.monthOur = m + "月" + Dae + "日" + " " + "星期" + day;
					this.hoursMintu = hour + ":" + mintu
				}
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中..."
			})
			this.getEqupementParm();
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
	}
</script>

<style lang="scss">
	@import "./index.css";

	.badge-button {
		padding: 20rpx 20rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 10;
	}
</style>
