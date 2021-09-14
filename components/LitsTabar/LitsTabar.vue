<template>
	<view class="Listabar">
		<view class="tyunj">
			<view :class="{'contexItem':true,'opens':lishow}">
				<view :class="{'nagtab':true }">
					<scroll-view class="sidebar" scroll-y="true">
						<uni-data-menu :localdata="menus" :unique-opened="true" :active="activeUrl"
							active-text-color="#409eff" @select="select"></uni-data-menu>
					</scroll-view>
				</view>

			</view>
		</view>
		<view @click="showL">
			<image src="../../static/fanhuibtn.png" :class="{'fhbtn':true,'fbtnshow':icoshow}"></image>
		</view>
		<view class="zhezhao" v-show="lishow" @click="showL">
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				icoshow: false,
				lishow: false,
				activeUrl: '/pages/demo/table/table',
				menus: [{
						menu_id: "demo",
						text: '首页',
						icon: 'uni-icons-list',
						value: "pages/index/index",
						children: []
					},
					
					{
						menu_id: "icons",
						text: '智慧照明',
						icon: 'uni-icons-list',
						value: '',
						children: [{
								menu_id: "icons",
								text: '单灯设备',
								icon: '',
								value: '/pages/Singlelampequipment/Singlelampequipment',
							},
							{
								menu_id: "icons",
								text: '巡测记录',
								icon: '',
								value: '/pages/Patrolrecord/Patrolrecord',
							},
							{
								menu_id: "icons",
								text: '集控器设备',
								icon: '',
								value: '/pages/Centralizedcontroldevice/Centralizedcontroldevice',
							},
							{
								menu_id: "icons",
								text: '能耗报表',
								icon: '',
								value: '/pages/energyconsumptionreport/energyconsumptionreport',
							},
							{
								menu_id: "icons",
								text: '照明总览',
								icon: '',
								value: '/pages/Lightingtheoverview/Lightingtheoverview',
							},
						]
					}, {
						menu_id: "icons",
						text: '信息发布',
						icon: 'uni-icons-list',
						value: '/',
						children: [{
								menu_id: "icons",
								text: '屏幕列表',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '屏幕媒体',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '节目管理',
								icon: '',
								value: '',
							},
						]
					},
					{
						menu_id: "icons",
						text: '信息发布',
						icon: 'uni-icons-list',
						value: '/',
						children: [{
								menu_id: "icons",
								text: '屏幕列表',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '屏幕媒体',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '节目管理',
								icon: '',
								value: '',
							},
						]
					},
					{
						menu_id: "icons",
						text: '公共广播',
						icon: 'uni-icons-list',
						value: '',
						children: [{
							menu_id: "icons",
							text: '广播列表',
							icon: '',
							value: '',
						}, {
							menu_id: "icons",
							text: '广播媒体库',
							icon: '',
							value: '',
						}, {
							menu_id: "icons",
							text: '计划任务',
							icon: '',
							value: '',
						}, ]
					},
					{
						menu_id: "icons",
						text: '环境监测',
						icon: 'uni-icons-list',
						value: '',
						children: [{
								menu_id: "icons",
								text: '环境监测列表',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '历史数据',
								icon: '',
								value: '',
							},
						]
					},
					{
						menu_id: "icons",
						text: '一键呼叫',
						icon: 'uni-icons-list',
						value: '/',
						children: [{
								menu_id: "icons",
								text: '一键呼叫列表',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '呼叫记录',
								icon: '',
								value: '',
							},
						]
					},
					{
						menu_id: "icons",
						text: '无线WIFI',
						icon: 'uni-icons-list',
						value: '',
						children: [{
							menu_id: "icons",
							text: 'wifi列表',
							icon: '',
							value: '',
						}, ]
					},

					{
						menu_id: "icons",
						text: '智能网关',
						icon: 'uni-icons-list',
						value: '',
						children: [{
								menu_id: "icons",
								text: '网关设备',
								icon: '',
								value: '',
							},
							{
								menu_id: "icons",
								text: '巡测记录',
								icon: '',
								value: '',
							},
						]
					},
					{
						menu_id: "icons",
						text: '智能充电',
						icon: 'uni-icons-list',
						value: '',
						children: [{
							menu_id: "icons",
							text: '充电桩列表',
							icon: '',
							value: '',
						}, ]
					}, {
						menu_id: "demo",
						text: '智慧灯杆',
						icon: 'uni-icons-list',
						value: "",
					}
				],


			}
		},
		methods: {
			select(e) {
				const value = e.value

				if (value != "") {
					console.log(value);
					uni.navigateTo({
						url: value
					})
				}
			},
			showL() {
				this.lishow = !this.lishow
				this.icoshow = !this.icoshow

			}
		}
	}
</script>
<style lang="scss">
	.Listabar {
		position: relative;
	}

	.tyunj {
		position: relative;
		z-index: 23;
		top: -10rpx;
		overflow: hidden;

	}

	.contexItem {
		width: 300rpx;
		height: 1300rpx;
		position: fixed;
		transition: ease 0.5s;
		left: -330rpx;
		z-index: 10;
		overflow: auto;
		transition: ease 0.5s;

	}



	.nagtab {
		width: 300rpx;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.opens {
		left: 0rpx;
		transition: ease 0.5s;
	}

	.fhbtn {
		width: 72rpx;
		height: 72rpx;
		position: fixed;
		top: 600rpx;
		left: 5rpx;
		transition: ease 0.5s;
		transform: rotate(180deg);
		z-index: 32;
	}

	.fbtnshow {
		left: 280rpx;
		transform: rotate(360deg);
	}

	.zhezhao {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: black;
		opacity: 0.3;
		z-index: 20;
		transition: ease 0.5s;
	}
</style>
