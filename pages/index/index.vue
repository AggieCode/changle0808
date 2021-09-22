<template>
	<view>
		<view class="propetybox">
			<!-- <view class="textBx">
				<view>资产信息：</view>
			</view> -->
			<view class="chartMsg">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">设备统计</view>
				</view>
				<view class="charts-box">
					<view class="charts-box" style="margin-left: -5%;width: 105%;height: 90%;margin-top: 6%;">
						<qiun-data-charts type="column" :chartData="chartData" background="none" />
					</view>
				</view>
			</view>
		</view>
		<!--设备状态-->
		<view class="EquipmentStatus">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">设备增长量</view>
			</view>
			<br />
			<br />
			<view class="eqSum" style="margin-left: -5%;width: 105%;">
				<!-- <qiun-data-charts type="ring" :chartData="annulus" background="none" /> -->

				<qiun-data-charts type="line" :chartData="annulus" background="none" />

				<!-- <view class="charts-box">
					<qiun-data-charts type="pie" :chartData="chartData" background="none" />
				</view> -->
			</view>
			<!-- <view class="rigMsgtx">
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
			</view> -->
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

		<!--设备在线率-->
		<view class="consumption">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">设备在线率</view>
			</view>
			<view class="staicFom">
				<view class="charts-box" style="margin-left: -5%;width: 105%;height: 105%;margin-top: -5%;">
					<!-- <qiun-data-charts type="line" :chartData="chartData2
					" background="none" /> -->
					<qiun-data-charts type="bar" :chartData="chartData2" background="none" />
				</view>
			</view>
		</view>
		
		<view class="consumption">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">项目增长量</view>
			</view>
			<view class="staicFom">
				<view class="charts-box" style="margin-left: -5%;width: 105%;height: 105%;margin-top: -5%;">
					<qiun-data-charts type="line" :chartData="annulus
					" background="none" />
					
				</view>
			</view>
		</view>
		
		<view class="propetybox">
			<!-- <view class="textBx">
				<view>资产信息：</view>
			</view> -->
			<view class="chartMsg">
				<view class="titx">
					<view class="colrsBox"></view>
					<view class="titleBx">能耗统计</view>
				</view>
				<view class="charts-box">
					<view class="charts-box" style="margin-left: -5%;width: 105%;height: 90%;margin-top: 6%;">
						<qiun-data-charts type="column" :chartData="chartData" background="none" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				chartData: { //设备统计
					"categories": [
						"路灯",
						"灯杆",
						"监控",
						"屏幕",
						"广播",
						"天气",
						"充电桩",
						"报警"
					],
					"series": [{
						"name": "设备数",
						"data": [
							35,
							36,
							31,
							33,
							13,
							34,
							24,
							12
						]
					}]
				},
				chartData2: {//设备在线率
					"categories": [
						"报警",
						"充电桩",
						"天气",
						"广播",
						"屏幕",
						"监控",
						"灯杆",
						"路灯"
					],
					"series": [{
						"name": "设备在线率",
						"data": [
							35,
							36,
							31,
							33,
							13,
							34,
							32,
							54
						]
					}]
				},
				//设备增长量
				annulus: {
					"categories": [
						"1月",
						"2月",
						"3月",
						"4月",
						"5月",
						"6月"
					],
					"series": [{
						"name": "设备增长量",
						"data": [
							35,
							8,
							25,
							37,
							4,
							20
						]
					}]
				},
				//项目增长量
				annulus: {
					"categories": [
						"1月",
						"2月",
						"3月",
						"4月",
						"5月",
						"6月"
					],
					"series": [{
						"name": "项目增长量",
						"data": [
							35,
							8,
							25,
							37,
							4,
							20
						]
					}]
				},
				//能耗统计
				chartData: { //设备统计
					"categories": [//x
						"2021-4",
						"2021-5",
						"2021-6",
						"2021-7",
						"2021-8",
						"2021-9",
						
					],
					"series": [{
						"name": "设备数",
						"data": [//y
							60000,
							50000,
							40000,
							30000,
							20000,
							10000,
							0,
						]
					}]
				},
				
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
