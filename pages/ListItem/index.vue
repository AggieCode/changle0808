<template>
	<view>
		<view class="searchBox">
			<u-search placeholder="请输入项目名称" action-text="添加" :clearabled="true" :disabled="false" @custom="custom">
			</u-search>
		</view>
		<view class="list-item">
			<ListTitle title="项目列表"></ListTitle>

			<view class="item-box" v-for="(item,index) in ListMsg" >
				<u-swipe-action :show="item.show" :index="index" @click="removeClick" @open="open" :options="options">
					<view class="msgical" @click.self="toEQList(index)">
						<view class="projectName">{{item.name}}</view>
						<view class="ringItem">
							<view class="preject-zx">
								<image class="pre-icon" src="../../static/deng_zx.png"></image><text
									class="pre-font">在线数 {{item.onlineSum}}</text>
							</view>
							<view class="preject-zx">
								<image class="pre-icon" src="../../static/deng_zs.png"></image><text class="pre-font"
									style="color: gray;">设备数 {{item.equipmentSum}}</text>
							</view>
						</view>

					</view>
					<view class="pre-tishi">
						<text class="pre-cjr">创建人：{{item.username}}</text>
						<view class="pre-city">
							<image src="../../static/address.png"></image>
							<text class="pre-cjr">{{item.province}}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>

			<!--~~~~~~-->

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNumber: 1,
				pageSize: 8,
				keyword: "",
				ListMsg: [],
				//左滑显示
				disabled: false,
				btnWidth: 180,
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
			custom() {
				uni.navigateTo({
					url: "/pages/addPreject/index"
				})
			},
			getListItem() { //获取项目列表
				let data = {
					pageNumber: this.pageNumber,
					userId: uni.getStorageSync("userId"),
					pageSize: this.pageSize,
					keyword: this.keyword
				}
				this.$request({
					url: this.$urls.url.prejectUrl,
					data: data,
					method: "POST",
					success: (res) => {
						console.log(res);
						let ary = []
						res.data.list.forEach((v, h) => {
							v.show = false,
								ary.push(v);
						})
						this.ListMsg = ary;

					},
					fainly: error => {
						console.log(error)
					}

				})
			},
			//左滑事件
			removeClick(index, index1) {
				if (index1 == 1) {
					this.ListMsg.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
					//删除项目
				} else {
					this.ListMsg[index].show = false;
					//this.$u.toast(`收藏成功`);
				}
			},
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.ListMsg[index].show = true;
				this.ListMsg.map((val, idx) => {
					if (index != idx) this.ListMsg[idx].show = false;
				})
			},
			toEQList(index) {
				console.log('aaa');
				uni.navigateTo({
					url: "/pages/eqlistItem/index"
				})
			}
		},
		onLoad() {
			this.getListItem();
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.css"
</style>
