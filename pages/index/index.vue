<template>
	<view>
		<view class="propetybox">
			<!-- <view class="textBx">
				<view>资产信息：</view>
			</view> -->
			<view class="chartMsg">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">资产信息</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="pie" :chartData="chartData" background="none" />
				</view>
			</view>
		</view>
		<!--设备状态-->
		<view class="EquipmentStatus">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">设备状态</view>
			</view>
			<view class="eqSum">
				<qiun-data-charts type="ring" :chartData="annulus" background="none" />
				<!-- <view class="charts-box">
					<qiun-data-charts type="pie" :chartData="chartData" background="none" />
				</view> -->
			 </view> 
			<view class="rigMsgtx">
				<view class="amountbx">
					<view class="lantxt">
						<uni-icons type="smallcircle-filled" size="10" color="#1890FF">&nbsp;&nbsp;</uni-icons><text
							class="qingk">在线</text> <text class="ge"> 15个</text>
					</view>
					<view class="offtext">
						<uni-icons type="smallcircle-filled" size="10" color="#91CB74">&nbsp;&nbsp;</uni-icons><text
							class="qingk">离线</text> <text class="ge"> 15个</text>
					</view>
				</view>
			</view>
		</view>

		<!--告警情况-->
		<view class=" alarmcondition">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">告警信息</view>
			</view>
			<br />
			<view class="sucorList">
				<!--告警信息列表-->
				<view class="lisermsg">
					<view class="list-title">
						<text>设备设备</text>
						<text class="list-id">5620</text>
					</view>
					<view class="list-item">
						<text class="list-state">设备不在线</text>
						<text class="list-time">2021-09-10</text>
					</view>
				</view>
				<view class="lisermsg">
					<view class="list-title">
						<text>设备设备</text>
						<text class="list-id">5620</text>
					</view>
					<view class="list-item">
						<text class="list-state">设备不在线</text>
						<text class="list-time">2021-09-10</text>
					</view>
				</view>
				<view class="lisermsg">
					<view class="list-title">
						<text>设备设备</text>
						<text class="list-id">5620</text>
					</view>
					<view class="list-item">
						<text class="list-state">设备不在线</text>
						<text class="list-time">2021-09-10</text>
					</view>
				</view>
				<view class="lisermsg">
					<view class="list-title">
						<text>设备设备</text>
						<text class="list-id">5620</text>
					</view>
					<view class="list-item">
						<text class="list-state">设备不在线</text>
						<text class="list-time">2021-09-10</text>
					</view>
				</view>
				<view class="lisermsg">
					<view class="list-title">
						<text>设备设备</text>
						<text class="list-id">5620</text>
					</view>
					<view class="list-item">
						<text class="list-state">设备不在线</text>
						<text class="list-time">2021-09-10</text>
					</view>
				</view>
				<view class="lisermsg">
					<view class="list-title">
						<text>设备设备</text>
						<text class="list-id">5620</text>
					</view>
					<view class="list-item">
						<text class="list-state">设备不在线</text>
						<text class="list-time">2021-09-10</text>
					</view>
				</view>
			</view>
		</view>

		<!--能耗统计-->
		<view class="consumption">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">能耗统计</view>
			</view>
			<view class="staicFom">
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData2
					" background="none" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				chartData: { //资产信息数据
					"series": [{
						"data": [{
								"name": "一班",
								"value": 50
							},
							{
								"name": "二班",
								"value": 30
							},
							{
								"name": "三班",
								"value": 20
							},
							{
								"name": "四班",
								"value": 18
							},
							{
								"name": "五班",
								"value": 8
							}
						]
					}]
				},
				chartData2: { //能耗统计数据
					"categories": [
						"2016",
						"2017",
						"2018",
						"2019",
						"2020",
						"2021",
						"2022"
					],
					"series": [{
						"name": "能耗统计",
						"data": [
							35,
							8,
							25,
							37,
							4,
							20,
							22,
						]
					}]
				},
				//圆环图数据
				annulus: {
					"series": [{
						"data": [{
								"name": "一班",
								"value": 50
							},
							{
								"name": "二班",
								"value": 30
							}
						]
					}]

				}
			}
		}
	}
</script>
<style lang="scss">
	@import "./index.css";

	.charts-box {
		width: 100%;
		height: 100%;
	}
</style>
