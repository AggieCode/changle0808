<template>
	<view>
		<!-- <view class="gewayItem">
		
			
		</view> -->
		<view class="detailPam">
			<view class="titleBx">
				<view class="timeMonth">{{monthOur}}</view>
				<view class="timeMonth">最近更新:{{hoursMintu}}</view>
			</view>
			<view class="eqname">
				<view>{{eqnavList.name}}<text class="EQstatus">{{eqnavList.is_online?"在线":"离线"}}</text></view>
				<image  :src="getwayImg[eqnavList.producer]" mode="widthFix" class="getwayImg" @click="previewImage"></image>
			</view>
			<view class="program">
				<view class="eqimei eqiId">序列号：{{eqnavList.serial}}</view>
				<view class="eqimei">类型:{{PRODUCER[eqnavList.producer]}}</view>
			</view>
		</view>

		<!--设备信息-->
		<view class="eqParams">

			<view class="title">
				<ListTitle title="设备信息"></ListTitle>
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
					网关类型
				</view>
				<view class="describe">

				</view>
				<view class="opertion">
					{{PRODUCER[eqnavList.producer]}}
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					电压(v)
				</view>

				<view class="opertion">
					{{eqnavList.voltage}}
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					12V输出电压1
				</view>
				<view class="describe">

				</view>
				<view class="opertion">
					{{eqnavList.dc_1||"-"}}
				</view>
			</view>

			<view class="eqList">
				<view class="titext">
					12V输出电压1
				</view>
				<view class="describe">

				</view>
				<view class="opertion">
					{{eqnavList.dc_2||"-"}}
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					更新时间
				</view>
				<view class="opertion">
					{{timepToupdate_info(eqnavList.timestamp)}}
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					心跳时间
				</view>
				<view class="opertion">
					{{timepToupdate_info(eqnavList.timestamp)}}
				</view>
			</view>
			<view class="eqList">
				<view class="titext">
					出库时间
				</view>
				<view class="opertion">
					{{eqnavList.date}}
				</view>
			</view>
		</view>
		
		<u-modal v-model="addTimeShow" title="操作设备" @confirm="switchSubmit" :show-cancel-button="true">
					<view class="checkItem">
						<u-checkbox-group @change="checkboxGroupChange">
									<u-checkbox 
										v-model="item.checked" 
										v-for="(item, index) in switchLis" :key="index" 
										:name="item.name"
									>{{item.value}}</u-checkbox>
								</u-checkbox-group>
					</view>
				</u-modal>
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
				params:{},
				switchLis:[
					{
						name:"vlo1",
						value:"12v输出电压1",
						checked:false,
					},
					{
						name:"vlo2",
						value:"12v输出电压2",
						checked:false,
					}
				],
				getwayImg: {
					98: "https://image.xmnengjia.com/group1/M00/00/28/rBKIJ2FudhiAfextAALdLwlbfis193.png",
					97: "https://image.xmnengjia.com/group1/M00/00/28/rBKIJ2FudhSAND4tAAHswd-QsUY837.png",
					96: "https://image.xmnengjia.com/group1/M00/00/28/rBKIJ2FudhGAIWnMAAIbJ2S8HgQ698.png"
				},
				hoursMintu: "",
				monthOur: "",
				eqnavList: {},
				switchState: false,
				setTimeType: "all",
				addTimeShow: false,
				PRODUCER: {
					1: '未出库',
					96: '500',
					97: '520',
					98: '530',
				}
			};
		},
		methods: {
			//屏幕开关
			switchChnage() {
				this.addTimeShow=true;
				
			},
			//开关电压选择
			checkboxGroupChange(e){
				let data={
					gatewayRes: 1,
					sn: this.eqnavList.socket_id,
					dc1: 1,
					dc2: 1,
				}
				data.dc1=e.includes("vlo1")?1:-1;
				data.dc2=e.includes("vlo2")?1:-1;
				this.params=data;
			},
			//开关提交
			switchSubmit(){
				let data=this.params;
				let url=this.$urls.platformUrl.getGateway.switchOut;
				this.switchLis.reduce((r,v,i)=>{
					if(r==0){
						return v
					}else{
						//选择了其中一项则发送请求，否则提示
						if(r.checked || v.checked ){
							this.PromiseFun(url,data,"POST").then(()=>this.$showToast("操作成功")).catch(()=>this.$showToast("操作失败"))
						}else{
							this.$showToast("必须选择其中一项")
						}
					}
				},0)
				
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
			setVolume(e) {
				this.eqnavList.volume = e.detail.value;
			},
			//获取设备信息
			getEqupementParm() {
				let data = {
					pageNumber: 1,
					pageSize: 10,
					keyword: "",//因为接口不支持搜索，所以只能展示接口返回数据第一条的网关设备详情
					itemId: uni.getStorageSync("itemId")
				};
				this.$request({
					url: this.$urls.platformUrl.getGateway.getGateway,
					data,
					method: "POST",
					success: res => {
						uni.stopPullDownRefresh();
						if (res.code == 10000) {
							uni.hideLoading();
							this.eqnavList = res.data.list[0];//渲染
							uni.setStorageSync("led_id", this.eqnavList.id);
							this.timeClye();
						}
					}
				})
			},
			//时间转换
			timeClye() {
				if (this.eqnavList.production_time) {
					let time = new Date(this.eqnavList.production_time),
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
			},
			//点击预览大图
			previewImage(){
				this.$showToast("长按可保存图片")
				uni.previewImage({
					current:1,
					urls:[this.getwayImg[this.eqnavList.producer]],
					success:res=>{
						this.$showToast("长按可保存图片")
					}
					
				})
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中..."
			})
			this.getEqupementParm();
			//加载时
		},
		onBackPress(e) {
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
