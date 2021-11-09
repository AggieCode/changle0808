<template>
	<view>
		<view class="taskItem">
			<view class="taskList" v-for="item in taskList" :key="item.id">
				<view class="taskName">
					<view class="">{{item.name}}</view>
					<view class="taskTime">执行:{{item.start_time}}</view>
					<view class="taskTime">结束:{{item.end_time}}</view>
				</view>
				<view class="disAndDelt">
					<u-button type="primary" size="mini" class="btn" v-if="item.diabled" @click="startTask(item)">启用</u-button>
					<u-button type="error" size="mini" class="btn" v-else @click="disabledTask(item)">禁用</u-button>
					<u-button type="error" size="mini" class="btn" @click="deletTask(item)">删除</u-button>
				</view>
			</view>
		</view>
		<BottonTabar :tabbarList="tabbarList"></BottonTabar>
				<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>

<script>
	import {
		mixin
	} from "../../mixins/mixin.js"
	export default {
		mixins: [mixin],
		data() {
			return {
				current:0,
				taskList:[],
				disabled: false,
				tabbarList: [{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '设备实况',
						customIcon: false,
						page: "/pages/broadcastDetail/index",
						pagePath: "/pages/broadcastDetail/index"

					}, {
						iconPath: "coupon",
						selectedIconPath: "coupon-fill",
						text: '媒体库',
						isDot: false,
						customIcon: false,
						page: "/pages/broadcaStMedia/broadcaStMedia",
						pagePath: "/pages/broadcaStMedia/broadcaStMedia"
					},
					{
						iconPath: "calendar",
						selectedIconPath: "calendar-fill",
						text: '计划任务',
						isDot: false,
						customIcon: false,
						page: "/pages/scheduledTask/scheduledTask",
						pagePath: "/pages/scheduledTask/scheduledTask"
					}
				],
			};
		},
		methods: {
			tabListBtn(e) {
							let url = this.tabbarList[e];
							uni.redirectTo({
								url: url.page
							})
						},
			async getEqupementParm() {//获取计划任务
				let data = {
					pageNumber: 1,
					pageSize: 10,
					itemId: uni.getStorageSync("itemId")
				};
				let url = this.$urls.platformUrl.broadcast.getTaskData;
				let res=await this.superPromis(url, data);
				this.taskList=res.data;
				uni.hideLoading();
				uni.stopPullDownRefresh();
			},
			async disabledTask(item){
				//禁用
				uni.showLoading({
					title:"加载中..."
				})
				let data={taskId:item.id,state:1};
				let url=this.$urls.platformUrl.broadcast.exetaskEnable;
				await this.superPromis(url,data).then(()=>this.getEqupementParm());
			},
			async startTask(item){
				//启用
				uni.showLoading({
					title:"加载中..."
				})
				let data={taskId:item.id,state:0};
				let url=this.$urls.platformUrl.broadcast.exetaskEnable;
				await this.superPromis(url,data).then(()=>this.getEqupementParm());
			},
			async deletTask(item){
				//删除
				uni.showLoading({
					title:"加载中..."
				})
				let data={taskId:item.id,state:"del"};
				let url=this.$urls.platformUrl.broadcast.exetaskCmd;
				this.$request({
					url,
					data,
					method:"POST",
					success:res=>{
						this.getEqupementParm();
					}
				})
			}
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/LEDequimentDetail/index"
				})
				return true;
			}
		},
		onLoad() {
			this.getEqupementParm();
		}
	}
</script>

<style lang="scss">
	@import "./index.css";
</style>
