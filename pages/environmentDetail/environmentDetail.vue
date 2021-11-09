<template>
	<view>
		<view class="weatherTemp">
			<view class="xxinfo">
				<view class="title">
					<view class="eqname">{{eqParams.name}}</view>
					<view class="uptime">10月26日 星期二</view>
				</view>
				<view class="weather">
					<view class="tianqinav">
						<text class="tianqiPar">{{eqParams.temp}}</text><text class="unit">℃</text>
					</view>
					<view class="tubiao">
						<image src="../../static/tianqi/tq_q.png" class="tianqiIcon"></image>
						<view class="tianqiTx">晴天</view>
					</view>
				</view>
				<view class="tempNav">
					<view class="tempRx">imei：{{eqParams.imei}}</view>
					<view class="airtx">空气质量：38</view>
				</view>
			</view>

			<view class="exponent">
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/wdc.png" class="exIcon"></image>
					</view>
					<view>温度</view>
					<view class="params">{{eqParams.temp}}℃</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/sd.png" class="exIcon"></image>
					</view>
					<view>湿度</view>
					<view class="params">{{eqParams.humidity}}%</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/zwx.png" class="exIcon"></image>
					</view>
					<view>紫外线</view>
					<view class="params">{{eqParams.UV_index}}</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/yyhd.png" class="exIcon"></image>
					</view>
					<view>一氧化碳</view>
					<view class="params">{{eqParams.CO}}</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/eyhd.png" class="exIcon"></image>
					</view>
					<view>二氧化碳</view>
					<view class="params">{{eqParams.CO2}}</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/guangxian.png" class="exIcon"></image>
					</view>
					<view>光线</view>
					<view class="params">{{eqParams.beam}}</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/qy.png" class="exIcon"></image>
					</view>
					<view>气压</view>
					<view class="params">{{eqParams.pressure}}</view>
				</view>
				<view class="wdpTempn">
					<view>
						<image src="../../static/tianqi/zy.png" class="exIcon"></image>
					</view>
					<view>噪音</view>
					<view class="params">{{eqParams.noise}}DB</view>
				</view>
			</view>

			<!--风力风向-->
			<view class="windPower">
				<view class="title">风力风向</view>
				<view class="powerNav">
					<view class="fxbnav">
						<image src="../../static/tianqi/fxb.png" class="fxb"></image>
					</view>
					<view class="windpowerParams">
						<view class="fengxiang">
							<view>
								<image src="../../static/tianqi/fxui.png" class="fxUIcon"></image>
							</view>
							<view>风向</view>
							<view>{{eqParams.wind_direction}}</view>
						</view>
						<view class="fengxiang">
							<view>
								<image src="../../static/tianqi/fengsu.png" style="width: 64rpx;height: 64rpx;"
									class="fxUIcon"></image>
							</view>
							<view>风速</view>
							<view>{{eqParams.wind_direction_num}}</view>
						</view>
					</view>
				</view>
			</view>

			<!--空气质量-->
			<view class="airquality">
				<view class="title">空气质量</view>
				<view class="quality">
					<view class="wdpTempn">
						<view  class="params">{{eqParams.pm2}}</view>
						<view class="huitx">PM2.5</view>
					</view>
					<view class="wdpTempn">
						<view  class="params">{{eqParams.pm1}}</view>
						<view class="huitx">PM10</view>
					</view>
					<view class="wdpTempn">
						<view class="params">{{eqParams.SO2}}</view>
						<view class="huitx">SO2</view>
					</view>
					<view class="wdpTempn" style="border-right: 0rpx solid red;">
						<view  class="params">{{eqParams.NO2}}</view>
						<view class="huitx">NO2</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--底部导航-->
		<BottonTabar :tabbarList="tabbarList"></BottonTabar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eqParams:{},
				tabbarList: [{
						iconPath: "gift",
						selectedIconPath: "gift-fill",
						text: '智慧天气',
						customIcon: false,
						page: "/pages/environmentDetail/environmentDetail",
						pagePath: "/pages/environmentDetail/environmentDetail"
				
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '历史数据',
						isDot: false,
						customIcon: false,
						page: "/pages/weatherHistory/weatherHistory",
						pagePath: "/pages/weatherHistory/weatherHistory"
					}
				],
				itemId:"",//设备Id
			};
		},
		methods:{
			async getWeatherMsg(){
				let data={
					itemId: this.itemId,
					pageNumber: 1,
					pageSize: 1,
					keyword: "",
				}
				let url=this.$urls.platformUrl.environ.environList;
				
				let res=await this.PromisFun(data,url,"POST");
				if(res.code==10000){
					if(!res.data.list.length){
						return this.$showToast("获取设备信息异常")
					}
					this.eqParams=res.data.list[0];
					uni.setStorageSync("imei",res.data.list[0].imei);
					
				}
			},
			PromisFun(data,url,method){
				return new Promise((resolve,reject)=>{
					this.$request({
						url,
						data,
						method,
						success:res=>{
							uni.stopPullDownRefresh();
							resolve(res);
							uni.hideLoading()
						},
						fail:err=>{
							uni.stopPullDownRefresh();
							this.$showToast("获取设备信息异常")
						}
					})
				})
			},
			//时间转换成：xx月xx日 星期xx
			transiorTimer(date){
				let time=new Date(date);
				let month=time.getMonth()+1;//月
				let day=time.getDate();//日
				
			}
		},
		onLoad(item) {
			uni.showLoading({
				title:"加载中"
			})
			// if(item.itemId){
			// 	this.itemId=item.itemId;
			// 	this.getWeatherMsg();
			// }else{
				this.itemId=uni.getStorageSync("itemId")
				this.getWeatherMsg();
			
		},
		onPullDownRefresh() {
			//下拉的生命周期
			let _self = this;
			setTimeout(function() {
				_self.getWeatherMsg();
				_self.$showToast("更新成功");
			}, 3000);
		
		},
		onBackPress(e) {
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
