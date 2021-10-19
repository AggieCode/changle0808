<template>
	<view>
		<view class="searchBox">
				<u-search placeholder="请输入项目名称" :show-action="false" action-text="添加" v-model="keyword" @change="serchChange" :clearabled="true"
					:disabled="false" @custom="custom">
				</u-search>
			<view class="addBimg" @click="custom">
				<image src="../../static/sb_add.png"></image>
			</view>
		</view>
		<view class="list-item">
			<view class="item-box" v-for="(item,index) in ListMsg">
				<u-swipe-action :show="item.show" :index="index" @click="removeClick" @open="open" :options="options">
					<view class="msgical" @click="toEQList(item)" @top="toEQList(item)">
						<view class="projectName">{{item.name}}</view>
						<view class="ringItem">

							<view class="preject-zx">
								<image class="pre-icon" src="../../static/deng.png"></image><text
									class="pre-font" style="color: gray;">在线：{{item.lightingSum}}</text>
							</view>
							<view class="preject-zx">
								<image class="pre-icon" src="../../static/item/onlieimg.png"></image><text
									class="pre-font" style="color: gray;">总数：{{item.equipmentSum}}</text>
							</view>
						</view>

					</view>
					<view class="pre-tishi">
						<text class="pre-cjr">创建人：{{item.username}}</text>
						<view class="pre-city">
							<image src="../../static/address.png"></image>
							<text style="margin-left: 10rpx;">{{item.province+item.city+item.district}}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>

		</view>
		<view style="margin-top: 30%;" v-if="!ListMsg.length">
			<u-empty text="暂无项目" mode="list"></u-empty>
		</view>
		<u-loadmore :status="status" v-else v-show="bottTipShow" />
		<u-back-top :scroll-top="scrollTop" top="100" z-index="9"></u-back-top>
	</view>
</template>

<script>
	//节流函数
	function debounce(func, wait = 1000) { //可以放入项目中的公共方法中进行调用
		let timeout;
		return function(event) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				func.call(this, event)
			}, wait)
		}
	}
	export default {
		data() {
			return {
				total: "",
				status: "loadmore",
				bottTipShow: true,
				scrollTop: 0,
				pageNumber: 1,
				pageSize: 10,
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
			//时间转换
			toTime(time) {
				//let date = new Date(1606728108489);
				var now = new Date(time),
					y = now.getFullYear(),
					m = now.getMonth() + 1,
					d = now.getDate();
				return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0,
					8);
			},
			getListItem() { //获取项目列表
				let data = {
					//state: 1,
					pageNumber: this.pageNumber,
					userId: uni.getStorageSync("userId"),
					pageSize: this.pageSize,
					keyword: this.keyword,
					product:2,
				}
				this.$request({
					url: this.$urls.url.ListIM.getItem,
					data: data,
					method: "POST",
					success: (res) => {
						 uni.hideLoading();
						let ary = []
						if (res.data) {
							res.data.list.forEach((v, h) => {
								v.show = false;
								ary.push(v);
							})
							if (this.ListMsg.length) {
								ary.forEach(v => {
									this.ListMsg.push(v);
								})
							} else {
								this.ListMsg = ary;
							}
							this.total = res.data.totalRow;
						}
					},
					fainly: error => {
						console.log(error)
					}

				})
			},
			//左滑事件
			removeClick(index, index1, item) {
				console.log(item);
				if (index1 == 1) {
					let data = {
						itemId: this.ListMsg[index].id,
					}
					this.$request({
						url: this.$urls.url.ListIM.deletItem,
						method: "POST",
						data,
						success: res => {
							if (res.code == 10000) {
								this.$showToast("删除成功");
								this.pageNumber = 1;
								this.pageSize = 10;
								this.getListItem()
							}

						}
					})
					this.ListMsg.splice(index, 1);


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
			toEQList(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/eqlistItem/index?id=${item.id}`
				})
			},
			//搜索
			serchChange: debounce(function(e) {
				console.log(e);
				this.keyword = e;
				this.pageNumber = 1;
				this.pageSize = 10;
				this.ListMsg = [];
				this.getListItem();
			})
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中'
			});
			this.getListItem();
			this.toTime();
		},
		onPullDownRefresh() {
			//下拉的生命周期
			let _self = this;
			setTimeout(function() {
				_self.ListMsg=[];
				_self.pageNumber=1;
				_self.pageSize=10;
				_self.getListItem();
				uni.stopPullDownRefresh(); //停止当前页面下拉刷新
				_self.$showToast("更新成功");
			}, 3000);

		},
		onReachBottom() { //上滑加载更多
			this.status = "loading";
			this.bottTipShow = true;
			let timer = ''
			if (this.total / 10 > this.pageNumber) {
				this.pageNumber++;
				timer = setTimeout(() => {
					this.getListItem();
					clearInterval(timer);
				}, 500)
			}
			if (this.ListMsg.length == this.total) { //设置底部文字未没有更多了
				this.status = "nomore";
			}
		},
		onPageScroll(e) { //监听页面滚动
			this.scrollTop = e.scrollTop;
		},
	}
</script>

<style lang="scss" scoped>
	@import "./index.css"
</style>
