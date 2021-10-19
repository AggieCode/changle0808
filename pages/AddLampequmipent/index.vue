<template>
	<!--添加灯杆绑定设备-->
	<view>
		<view class="equipentBX">
			<view class="equipenNav">
				<view>设备类型</view>
				<view>
					<u-input placeholder="请选择设备类型" v-model="eqTypeName" @click="eqtypeShow" :disabled="true"
						input-align="right" maxlength="15"></u-input>
				</view>
			</view>
			<!--添加屏幕-->
			<view v-show="typeNum==1">
				<view class="equipenNav">
					<view>屏幕id</view>
					<view>
						<u-input v-model="led.id" placeholder="请输入屏幕id" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>屏幕名称</view>
					<view>
						<u-input v-model="led.name" placeholder="请输入屏幕名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>厂家</view>
					<view>
						<u-input placeholder="请选择厂家" v-model="led.vender" :disabled="true" @click="vender=true"
							input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="remark">
					<view class="remarkTx">备注</view>
					<view>
						<textarea v-model="led.remark" class="textar" placeholder="请输入内容"></textarea>
					</view>
				</view>
			</view>

			<!--音频广播-->
			<view style="margin-top: 20rpx;" v-show="typeNum==2">
				<view class="equipenNav">
					<view>id</view>
					<view>
						<u-input v-model="broadcast.id" placeholder="请输入设备id" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>设备名称</view>
					<view>
						<u-input v-model="broadcast.name" placeholder="请输入设备名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
			</view>

			<!--添加监控-->
			<view style="margin-top: 20rpx;" v-show="typeNum==3">
				<view class="equipenNav">
					<view>监控名称</view>
					<view>
						<u-input v-model="monitoring.name" placeholder="请输入监控名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>序列号</view>
					<view>
						<u-input v-model="monitoring.imei" placeholder="请输入序列号" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>验证码</view>
					<view>
						<u-input v-model="monitoring.code" placeholder="请输入验证码" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
			</view>

			<!--智慧天气-->
			<view style="margin-top: 20rpx;" v-show="typeNum==4">
				<view class="equipenNav">
					<view>设备imei</view>
					<view>
						<u-input v-model="weather.imei" placeholder="请输入监控名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>名称</view>
					<view>
						<u-input v-model="weather.name" placeholder="请输入名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
			</view>

			<!--一键报警-->
			<view style="margin-top: 20rpx;" v-show="typeNum==5">
				<view class="equipenNav">
					<view>设备id</view>
					<view>
						<u-input v-model="oneclickCall.id" placeholder="请输入设备id" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>名称</view>
					<view>
						<u-input v-model="oneclickCall.name" placeholder="请输入名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
			</view>

			<!--智慧网关-->
			<view style="margin-top: 20rpx;" v-show="typeNum==6">
				<view class="equipenNav">
					<view>设备名称</view>
					<view>
						<u-input v-model="gateway.name" placeholder="请输入名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>设备序列号</view>
					<view>
						<u-input v-model="gateway.imei" placeholder="请输入设备序列号" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
			</view>

			<!--添加WIFI-->
			<view style="margin-top: 20rpx;" v-show="typeNum==7">
				<view class="equipenNav">
					<view>设备名称</view>
					<view>
						<u-input v-model="WIFI.name" placeholder="请输入设备名称" input-align="right" maxlength="15"></u-input>
					</view>
				</view>
				<view class="equipenNav">
					<view>设备MAC</view>
					<view>
						<u-input v-model="WIFI.mac" placeholder="请输入设备MAC" input-align="right" maxlength="15"></u-input>
					</view>
				</view>

			</view>
		</view>

		<u-button class="addBtnFun" type="primary" @click="addBtnFun">确定</u-button>

		<!--设备类型-->
		<u-select v-model="eqtype" :list="eqlist" @confirm="eqTypeConfirm"></u-select>

		<!--厂家-->
		<u-select v-model="vender" :list="venderLis" @confirm="venderFun"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				itemId:uni.getStorageSync("itemId"),
				led: { //屏幕广告
					vender: "",
					type: "",
					name: "",
					remark: "",
					id: "",
				},
				broadcast:{//音频广播
					id:"",
					name:""
				},
				monitoring :{//监控
					name:"",
					imei:"",
					code:"",//验证码
				},
				weather:{//智慧天气
					imei:"",
					name:""
				},
				oneclickCall:{//一键报警
					id:"",
					name:""
				},
				gateway:{//智慧网关
					name:"",
					imei:""
				},
				WIFI:{//智慧wifi
					name:"",
					mac:""
				},
				vender: false,
				eqtype: false,
				eqTypeName: "屏幕广告",
				typeNum: "1",
				eqlist: [{
						value: 1,
						label: '屏幕广告'
					},
					{
						value: 2,
						label: '音频广播'
					},
					{
						value: 3,
						label: '监控管理'
					},
					{
						value: 4,
						label: '智慧天气'
					},
					{
						value: 5,
						label: '一键报警'
					},
					{
						value: 6,
						label: '智慧网关'
					},
					{
						value: 7,
						label: '智慧WIFI'
					}
				],
				venderLis: [{
						value: 1,
						label: '熙讯'
					},
					{
						value: 2,
						label: '仰邦'
					}
				]
			}
		},
		methods: {
			eqtypeShow() {
				this.eqtype = true;
			},
			eqTypeConfirm(e) { //选择设备类型
				console.log(e);
				this.eqTypeName = e[0].label;
				this.typeNum = e[0].value;
			},
			venderFun(e) { //厂家选择
				this.led.vender = e[0].label;
				this.led.type = e[0].value;
			},
			addBtnFun() {
				//确认添加
				let i=this.typeNum;
				
			}
		},
		onLoad(data) {
			if(data){
				this.id=data.id;
				this.itemId=uni.getStorageSync("itemId");
			}
		},
		onBackPress(e) {
			console.log(e)
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

<style lang="scss" scoped>
	@import "./index.css";
</style>
