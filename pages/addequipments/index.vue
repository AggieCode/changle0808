<template>
	<view>
		<!--添加设备历史记录-->
		<view class="listbox">
			<u-swipe-action :show="show" :index="1" @click="removeClick" @open="open" :options="options">

				<view class="eqname">
					<view>设备名称</view>
					<view>设备001</view>
				</view>
				<view class="eqname">
					<view>设备序列号</view>
					<view>534864354564</view>
				</view>
				<!--删除历史记录-->
				<!-- <image src="../../static/clear.png" class="quxiao"></image> -->
			</u-swipe-action>
		</view>
		<u-empty text="无历史记录" mode="history"></u-empty>


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
		<view class="addBox" @click="scanADD">
			<view class="smAdd">
				<image src="../../static/eqlist/saoma.png" class="addIcon"></image>
				<text style="margin-left: 30rpx;color: #007AFF;">扫码添加</text>
			</view>
			<view class="smAdd" @click="openTipes">
				<image src="../../static/eqlist/shoudong.png" class="addIcon" ></image>
				<text style="margin-left: 30rpx;" >手动添加</text>
			</view>
		</view>

		<!--手动输入信息-->
		<u-modal v-model="manuallyTip" :show-cancel-button="true" title="请手动输入内容">
			<view class="slot-content">
				<view class="manuallyBox">
					<input type="text" placeholder="请输入设备序列号" class="manuallyInp" />
					<input type="text" placeholder="请输入设备名称" class="manuallyInp" />
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				manuallyTip: false, //手动添加信息提示框
				tipshow: false, //弹窗提示
				master: "",
				show: false,
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
				]
			}
		},
		methods: {
			removeClick(index, index1) {
				if (index1 == 1) {
					// this.ListMsg.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
					//删除项目
				} else {
					// this.ListMsg[index].show = false;
					this.show = false;
					this.$u.toast(`收藏成功`);

				}
			},
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				console.log(index);
				this.show = false;
				// this.ListMsg[index].show = true;
				// this.ListMsg.map((val, idx) => {
				// 	if (index != idx) this.ListMsg[idx].show = false;
				// })
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
				console.log('aaa')
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					},
					complete: (data) => {
						console.log(data)
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	.listbox {
		padding: 30rpx 50rpx 0 30rpx;
		margin: 30rpx auto 0;
		box-sizing: border-box;
		position: relative;
		border-bottom: 1rpx solid #F8F8F8;
	}

	.eqname {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10rpx auto 0;
		box-sizing: border-box;
		margin-bottom: 15rpx;
	}

	.quxiao {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		right: 3%;
		top: 0%;

	}

	.tips {
		width: 600rpx;
		height: 400rpx;
		position: fixed;
		overflow: hidden;
		background: white;
		top: 50%;
		left: 50%;
		text-align: center;
		font-size: 26rpx;
		padding: 30rpx 30rpx;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		border: 1rpx solid gray;
		z-index: 10;
		border-radius: 10rpx;
	}

	.checkBox {
		margin: 30rpx auto 0;
		text-align: left;
		font-size: 24rpx;
	}

	.checkFont {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.custom-style {
		margin-top: 30rpx;
	}

	.addBox {
		width: 700rpx;
		height: 100rpx;
		position: absolute;
		bottom: 10%;
		margin: 0 auto;
		margin-left: 3%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.smAdd {
		width: 40%;
		height: 100%;
		border-radius: 70rpx;
		border: 1rpx solid #CCCCCC;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.addIcon {
		width: 35rpx;
		height: 35rpx;
	}

	.manuallyBox {
		width: 100%;
		height: 250rpx;
		padding: 20rpx 20rpx;
	}

	.manuallyInp {
		margin: 20rpx auto 0;
		height: 70rpx;
		padding: 20rpx 20rpx;
		font-size: 26rpx;
		box-sizing: border-box;
		border: 1rpx solid #F4F4F5;
	}
</style>
