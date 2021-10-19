<template>
	<view>
		<!--添加设备历史记录-->
		<view class="listbox" v-for="(item,index) in eqList" :key="item.imei">
			<view class="eqname">
				<view>设备名称：</view>
				<view style="margin-left: 20rpx;">{{item.name}}</view>
			</view>
			<view class="eqname">
				<view>设备序列号：</view>
				<view style="margin-left: 20rpx;">{{item.imei}}</view>
			</view>
			<!--删除历史记录-->
			<image src="../../static/eqitemicon/deleimg.png" class="quxiao" @click="deltEqlis(index)"></image>
		</view>
		<view style="position: absolute; top: 30%; left: 42%;" v-show="eqList.length==0">
			<u-empty text="无历史记录" mode="history"></u-empty>
		</view>


		<!--设备命名提示-->
		<view class="tips" v-if="tipshow">
			<h3>请手动选择设备名称的生成方式</h3>
			<text style="color: red;">(手动添加时请忽略)</text>

			<view class="checkBox">
				<!-- <view class="checkFont">
					
					<radio></radio>设备+序列号后四位数字(设备52xz)
					
				</view> -->

				<u-radio-group v-model="master" :wrap="true">
					<u-radio @change="radioChange" name="name">
						设备+序列号后四位数字(设备52xz)
					</u-radio>
					<u-radio @change="radioChange" name="true">
						设备+数字累加（设备001）
					</u-radio>
				</u-radio-group>
			</view>
			<u-button type="primary" class="custom-style" @click="hidetip">确认</u-button>
		</view>
		<!--遮罩-->
		<u-mask :show="tipshow" @click="tipshow = false" z-index="9"></u-mask>
		<!--添加按钮-->
		<view class="addBox">
			<view class="smAdd" @click="scanADD">
				<image src="../../static/eqlist/saoma.png" class="addIcon"></image>
				<text style="margin-left: 30rpx;color: #007AFF;">扫码添加</text>
			</view>
			<view class="smAdd" @click="openTipes">
				<image src="../../static/eqlist/shoudong.png" class="addIcon"></image>
				<text style="margin-left: 30rpx;">手动添加</text>
			</view>
		</view>

		<!--手动输入信息-->
		<u-modal v-model="manuallyTip" @confirm="sdConfirm" :show-cancel-button="true" title="请手动输入内容">
			<view class="slot-content">
				<view class="manuallyBox">
					<input type="text" v-model="sdeqlis.imei" placeholder="请输入设备序列号" class="manuallyInp" />
					<input type="text" v-model="sdeqlis.name" placeholder="请输入设备名称" class="manuallyInp" />
				</view>
			</view>
		</u-modal>
		<!--提交结果-->
		<view class='cmit-result' v-if="isResult">
			<view class='result'>
				<view class='title'>提交结果</view>
				<view class='home'>
					<view class='list' v-for="(item,index) in resultList" :key="index">
						<view class='imei'>{{item.imei}}</view>
						<view :class='{"msg":true, "success":item.code == 10000 }'>{{item.msg}}</view>
					</view>
				</view>
				<image @click="isResult=false" src='../../static/eqitemicon/quxiao.png' class='exit'></image>
			</view>
		</view>
		<view class="hiseqname" v-show="eqList.length">
			<view class="">已经添加{{eqList.length}}个设备</view>
			<view><button class="addbtn" @click="addEquipment">添加</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isResult: false,
				manuallyTip: false, //手动添加信息提示框
				tipshow: false, //弹窗提示
				master: "",
				options: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				sdeqlis: {
					name: "",
					imei: "",
					show: false,
				},
				saoma: "",
				eqList: [],
				resultList: [], //提交返回结果
			}
		},
		methods: {
			removeClick(index, index1) {
				if (index1 == 1) {
					this.eqList.splice(index, 1);
					this.$u.toast(`删除了第${index}个设备`);
					//删除项目
				} else {
					console.log(index)
					setTimeout(() => {
						this.eqList[index].show = true;
					}, 200)
				}
			},
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.eqList[index].show = true;
				this.eqList.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			radioChange(e) {
				//单选
				console.log(e)
			},
			hidetip() {
				//隐藏提示
				this.tipshow = false;
			},
			openTipes() { //手动添加设备信息
				this.manuallyTip = true;
			},
			//扫码添加
			scanADD() {
				let that = this;
				uni.scanCode({
					success: function(res) {
						if (res.errMsg == "scanCode:ok") {
							var name = res.result;
							var result = [];
							var eqName = `设备${name.substring(name.length-4)}`;
							var obj = {
								imei: res.result,
								name: eqName,
								show: false
							}
							result.push(obj);
							that.eqList = result;
						} else {
							this.$showToast("出现异常，请重试")
						}
					},
					complete: (data) => {
						console.log(data)
					}
				});
			},
			//添加设备
			addEquipment() {
				let data = {
					itemId: uni.getStorageSync("itemId"),
					eqList: JSON.stringify(this.eqList)
				};
				this.$request({
					url: this.$urls.url.eqItem.addEquipment,
					data,
					method: "POST",
					success: res => {
						this.disData(res);
						this.isResult = true;
						this.eqList = [];
					}
				})
			},
			//手动添加设备
			sdConfirm() {
				let obj = this.sdeqlis;

				this.eqList.push(obj);
				this.manuallyTip = false;
				this.sdeqlis = {
					name: "",
					imei: "",
					show: false
				}
			},
			//删除
			deltEqlis(index) {
				this.eqList.splice(index, 1);
			},
			//处理添加结果
			disData(data) {
				var arr = [];
				for (var index in data) {
					let obj = {
						imei: index,
						msg: data[index],
					}
					arr.push(obj);
				}
				this.resultList = arr;
			}

		},
		onBackPress(e) {
			console.log(e)
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/eqlistItem/index"
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
	@import "./index.css";
</style>
