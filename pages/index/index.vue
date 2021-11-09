<template>
	<view>

		<!--智慧WIFI-->
		<view class="evnomar">
			<ListTitle title="智慧WIFI"></ListTitle>
			<view class="monEqnum">
				<view>设备总数</view> <text style="font-size: 46rpx; color: #1890FF;margin-left: 15rpx;">{{0}}</text>
			</view>
			<view class="evnomarBox">
				<view class="PMmsg">
					<view class="PMnum">20</view>
					<view>累计流量</view>
				</view>
				<view class="PMmsg">
					<view class="PMnum">37</view>
					<view>累计人数</view>
				</view>
				<view class="PMmsg">
					<view class="PMnum">20%</view>
					<view>当日流量</view>
				</view>
				<view class="PMmsg">
					<view class="PMnum">37%</view>
					<view>在线人数</view>
				</view>
			</view>
		</view>
		<!--视频监控-->
		<view class="MontiorBox">
			<ListTitle title="视频监控"></ListTitle>
			<view class="monEqnum" style="margin-bottom: 20rpx;">
				<view>人流量</view> <text style="font-size: 46rpx; color: #1890FF;margin-left: 15rpx;">{{0}}</text>
			</view>
			<view class="MontiorImg">
				<video class="vdeo" :src="videoUrl">
				</video>
			</view>
		</view>
		<!--智慧照明-->
		<view class="MontiorBox">
			<ListTitle title="智慧照明"></ListTitle>
			<view class="ligthPar">
				<view class="paramsBX">
					<view class="paramsTX">229V</view>
					<view class="paraMios">电压</view>
				</view>
				<view class="paramsBX">
					<view class="paramsTX">229A</view>
					<view class="paraMios">电流</view>
				</view>
				<view class="paramsBX">
					<view class="paramsTX">229W</view>
					<view class="paraMios">功率</view>
				</view>
				<view class="paramsBX">
					<view class="paramsTX">关</view>
					<view class="paraMios">状态</view>
				</view>
			</view>
			<view class="chartsBX">
				<view class="charts-box">
					<qiun-data-charts type="column" :chartData="chartData2" background="none" :opts="chartOpts1" />
					<!-- 
					<qiun-data-charts type="line" :chartData="chartData2
					" background="none" /> -->
				</view>
			</view>
		</view>

		<view class="weatherPars">
			<ListTitle title="智慧天气"></ListTitle>

			<!--天气详情-->
			<view>
				<u-grid :col="4" :border="false">
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/fssy.png" class="weatherIcon"></image>
						<view class="weatherParms">0KM/S</view>
						<view class="grid-text">风速</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/21wd.png" class="weatherIcon"></image>
						<view class="weatherParms">0℃</view>
						<view class="grid-text">温度</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/shiduchuanganqi.png" class="weatherIcon"></image>
						<view class="weatherParms">45%</view>
						<view class="grid-text">湿度</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/fengxiangcaise.png" class="weatherIcon"></image>
						<view class="weatherParms">北</view>
						<view class="grid-text">风向</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/jiangyuliangSVG.png" class="weatherIcon"></image>
						<view class="weatherParms">0mm</view>
						<view class="grid-text">降雨量</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/CAIPM2.5.png" class="weatherIcon"></image>
						<view class="weatherParms">0ug/m3</view>
						<view class="grid-text">PM2.5</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/PMCAOZUO10.png" class="weatherIcon"></image>
						<view class="weatherParms">0ug/m3</view>
						<view class="grid-text">PM10</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding: '15rpx 0'}">
						<image src="../../static/tianqi/zaoyin.png" class="weatherIcon"></image>
						<view class="weatherParms">55DB</view>
						<view class="grid-text">噪音</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!--屏幕广告-->
		<view class="advertising">
			<ListTitle title="屏幕广告"></ListTitle>
			<view class="advervdeo">
				<u-swiper :list="IMGlist" height="300" border-radius="0" :effect3d="true"></u-swiper>
				<!-- <image class="vdeo"
												src="https://image.xmnengjia.com/group1/M00/00/01/rBKIJ2AdDGeAYMwTAA1tw4AGm0E718.jpg">
											</image> -->
			</view>

			<view class="borderBtom">
				<view>当前播放：无</view>
				<view>正在执行节目：无</view>
			</view>
		</view>

		<!--充电桩-->
		<view class="chargingPile">
			<ListTitle title="充电桩"></ListTitle>
			<view class="">
				<image src="https://iot2.xmnengjia.com/static/media/qiche.7a0def4d.png" class="cdche"></image>
			</view>
			<view class="cdMsgBX">
				<view class="cellVX">
					<view class="params">34.5</view>
					<view>电池(A)</view>
				</view>
				<view class="cellVX">
					<view class="params">24</view>
					<view>电压(V)</view>
				</view>
				<view class="cellVX" style="border: 0;">
					<view class="params">0%</view>
					<view>SOC</view>
				</view>
			</view>
			<view class="cdTimebx">
				<view>充电时长：</view>
				<view>00:00:20</view>
			</view>
			<view class="cdTimebx">
				<view>消费金额：</view>
				<view>00.00<text class="unit">元</text></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				IMGlist: [{
						image: 'https://image.xmnengjia.com/group1/M00/00/01/rBKIJ2AdDGeAYMwTAA1tw4AGm0E718.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://image.xmnengjia.com/group1/M00/00/02/rBKIJ2A3EGuARRB8AAiTtIrlU9M791.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://image.xmnengjia.com/group1/M00/00/01/rBKIJ2A1xbWABuKAAAs7BXrOIMI530.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://image.xmnengjia.com/group1/M00/00/02/rBKIJ2A3EGaAZiEHAAlnLYSW1RI657.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
				],
				chartOpts1: {
					legend: {
						show: false,
					},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						disableGrid: true
					}
				},
				chartData2: { //能耗统计数据
					"categories": [
						'3月', '4月', '5月', '6月', '7月'
					],
					"series": [{
						"name": "G",
						"data": [
							224, 218, 135, 147, 260
						]
					}, ]
				},
				accessToken:"",//监控token
				videoUrl:"",
			}
		},
		methods:{
			//获取监控视频
			getMontoryVideo(){
				let data={
					accessToken:this.accessToken,
					deviceSerial:"E68113922",
					code:"COTWMU",
					protocol:2
				};
				uni.request({
					url:"https://open.ys7.com/api/lapp/v2/live/address/get",
					method:"POST",
					data,
					header:{
						"Content-Type": "application/x-www-form-urlencoded",
						accessToken:this.accessToken,
					},
					success:res=>{
						if(res.data.code==200){
							this.videoUrl=res.data.data.url;
						}else{
							this.$showToast("视频播放失败")
						}
					}
				})	
			},
			//获取监控token
			getAccessToken(){
				let data={
					appKey:uni.getStorageSync("app_key"),
					appSecret:uni.getStorageSync("app_secret")
				}
				return new Promise((resolve,reject)=>{
					uni.request({
						url:"https://open.ys7.com/api/lapp/token/get",
						method:"POST",
						data,
						header:{
							"Content-Type": "application/x-www-form-urlencoded",
						},
						success:res=>{
							if(res.data.code==200){
								this.accessToken=res.data.data.accessToken;
								resolve();
							}
						}
					})
				})
			}
		},
		onLoad() {
			this.getAccessToken().then(()=>this.getMontoryVideo())
		}
	}
</script>
<style lang="scss">
	@import "./index.css";

	.charts-box {
		width: 100%;
		height: 100%;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
