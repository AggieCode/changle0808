<template>
	<view>
		<view class="eqImt" v-for="(item,index) in eqListData" @click="toDetaliPage(item)" :key="item.equipmentName">
			<view class="itemlist">
				<view class="list-left">
					<view class="groupName">
						{{item.equipmentName}}
					</view>
					<view class="lampId">
						设备编号:{{item.equipmentCode}}
					</view>
					<view class="lampId">
						分组名称:{{item.equipmentGroupName}}
					</view>
				</view>

				<view class="list-right">
					<view class="eqState">
						<image class="stateIcon" src="../../static/ziaxian.png"></image>
						<text class="textBx"><text style="color: gray;">状态:</text><text style="margin-left: 10rpx;">{{onlie[item.isOnline]||"未知"}}</text></text>
					</view>
					<view class="eqState">
						<image class="stateIcon" src="../../static/deng.png">
							<text  class="textBx"><text style="color: gray;">类型:</text><text style="margin-left: 10rpx;">{{item.lamppostTypeName||eqName}}</text></text>
					</view>
					<view class="eqState">
						<image class="stateIcon" src="../../static/xinhao.png">
							<text  class="textBx"><text style="color: gray;">通信强度:</text><text style="margin-left: 10rpx;"></text></text>
					</view>
				</view>
			</view>
			<u-divider half-width="340" border-color="#A0CFFF" :use-slot="false"></u-divider>
			<view class="botInfo">
				<view class="infoLeft">
					道路:{{item.roadName}}
				</view>
				<view class="infoLeft">
					巡测时间:{{item.time}}
				</view>
			</view>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageSize:10,
				page:1,
				total:"",//列表数据总数
				tabarMsg:"",
				onlie:["在线","离线","未知"]
			}
		},
		props:{
			eqListData:{default:[]},
			eqName:{default:"灯"}
		},
		methods: {
			toDetaliPage(item){
				//跳转至详情页
				this.$emit("toDetaliPage",item)
			},
		},
		onLoad() {
		console.log(this.eqListData)
		}
	}
</script>

<style lang="scss">
	@import "./index.css";
</style>
