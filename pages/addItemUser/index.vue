<template>
	<view>
		<u-select v-model="lisShow" :list="Lvlist" @confirm="Roelconfirm"></u-select>
		<view class="adduser">
			<input type="text" placeholder="请输入成员账号" v-model="Memberaccount" class="nameInp" />
			<view class="lvitem">
				<text>成员角色：{{userLV}}</text>
				<button class="LVbtn" @click="LVbtn">请选择</button>
			</view>
			<button class="addbtn" @click="addFun">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Memberaccount: "", //成员账号
				lisShow: false,
				userLV: "工程师", //角色等级
				Lvlist: [{
						value: '0',
						label: "工程师",
					},
					{
						value: '1',
						label: "客户",
					},
					{
						value: '2',
						label: "体验客户",
					},
				],
				lv: ""
			}
		},
		methods: {
			addFun() {
				if (this.Memberaccount == "" || this.Memberaccount == undefined || !this.Memberaccount) {
					return this.$showToast("请输入成员账号")
				}
				if (!this.lv) {
					this.lv = 2;
				}
				let data = {
					username: this.Memberaccount,
					itemId: uni.getStorageSync("itemId"),
					roleType: this.lv
				};
				this.$request({
					url: this.$urls.url.ListIM.addItemUser,
					method: "POST",
					data,
					success: res => {
						if (res.code == 10000) {
							this.$showToast(res.msg);
							setTimeout(() => {
								uni.navigateBack();
							}, 1500)
							return
						}
						this.$showToast(res.msg)
					}
				})
			},
			LVbtn() {
				this.lisShow = true;
			},
			Roelconfirm(e) {
				console.log(e)
				this.userLV = e[0].label;
				this.lv = e[0].value;
			}
		}
	}
</script>

<style lang="scss">
	.adduser {
		padding: 20rpx;

	}

	.nameInp {
		padding: 0 15rpx;
		height: 80rpx;
		border: 1px solid #F8F8F8;
		font-size: 26rpx;
		margin: 20rpx auto 0;
		box-sizing: border-box;
	}

	.addbtn {
		height: 70rpx;
		margin-top: 20rpx;
		background-color: #007AFF;
		color: white;
		line-height: 70rpx;
	}

	.LVbtn {
		width: 150rpx;
		text-align: center;
		line-height: 60rpx;
		background: #007AFF;
		font-size: 26rpx;
		color: white;
	}

	.lvitem {
		width: 100%;
		height: 80rpx;
		display: flex;
		margin-top: 20rpx;
		align-items: center;
		padding: 10rpx 10rpx;
	}
</style>
