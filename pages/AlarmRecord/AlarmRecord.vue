<template>
	<view>
		<view class="erroInfo">
			<view class="listItem">
				<view class="state">设备ID</view>
				<view class="state">状态</view>
				<view class="time" style="text-align: center;">处理时间</view>
			</view>
			<view class="listItem" v-for="item in callList" :key="item.id">
				<view class="state">ID:{{item.sos_id}}</view>
				<view class="state">{{item.state?"已经接听":"未知"}}</view>
				<view class="time">{{item.time}}</view>
			</view>
		</view>
		<!--底部tabbar-->
		<BottonTabar :tabbarList="tabbarList"></BottonTabar>
	</view>
</template>

<script>
	import {mixin} from "../../mixins/mixin.js";
	export default {
		mixins:[mixin],
		data() {
			return {
				callList:[],
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '设备实况',
						customIcon: false,
						page: "/pages/onClickCallDetail/onClickCallDetail",
						pagePath: "/pages/onClickCallDetail/onClickCallDetail"
				
					}, {
						iconPath: "coupon",
						selectedIconPath: "coupon-fill",
						text: '报警记录',
						isDot: false,
						customIcon: false,
						page: "/pages/AlarmRecord/AlarmRecord",
						pagePath: "/pages/AlarmRecord/AlarmRecord"
					},
				],
			};
		},
		methods:{
			async getEqupementParm(){
				let data={itemId:uni.getStorageSync("itemId")};
				let url=this.$urls.platformUrl.oneClickCall.getSosHis;
				let res=await this.superPromis(url,data);
				this.callList=res.data;
			}
		},
		onLoad() {
			this.getEqupementParm();
		}
	}
</script>

<style lang="scss">
@import "./index.css"
</style>
