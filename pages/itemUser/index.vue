<template>
	<view>
		<searchInput place="请输入成员名称" @custom="custom" @serchChange="serchChange"></searchInput>
		<view class="itemUser">
			<view class="user-list" v-for="(item,index) in userList" :key="item.create_time" @longpress="userLong(index)">
				<view>{{item.username}}<text class="infoText" v-show="item.nickname"> ({{item.nickname}})</text></view>
				<!-- <view>
					<u-button type="primary" size="mini" @click="changPermis">修改权限</u-button>
				</view> -->
				
				<!--删除-->
				<!-- <view class='del-tool' v-show="item.show">
				   <view class='del item' @click='delItem(item,index)'>删除</view>
				   <view class='cannel item' @click='hideTool(index)'>取消</view>
				   <view class='jiao'></view>
				 </view> -->
				 <DeletBtn :inShow="item.show" :item="item" :index="index" @hideTool="hideTool" @delItem="delItem"></DeletBtn>
			</view>
			
			 
		</view>
		<view style="margin-top: 30%;" v-if="!userList.length">
			<u-empty text="暂无成员" mode="list"></u-empty>
		</view>
		<u-loadmore :status="status" v-else v-show="bottTipShow" />
		<u-back-top :scroll-top="scrollTop" top="100" z-index="9"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: "loadmore",
				bottTipShow: false,
				params: {
					pageNumber: 1,
					pageSize: 15,
					itemId: uni.getStorageSync("itemId"),
					keyword: ""
				},
				total: "",
				userList: [],
				scrollTop: 0,
			}
		},
		methods: {
			serchChange(e) {
				this.params.keyword = e;
				console.log(e);
			},
			custom() { //跳转至添加成员页面
				uni.navigateTo({
					url: "/pages/addItemUser/index"
				})
			},
			getUserLis() {

				let data = {
					...this.params
				};
				this.$request({
					url: this.$urls.url.ListIM.getItemUser,
					method: "POST",
					data,
					success: res => {
						if (res.code == 10000) {
							uni.hideLoading();
							let ary = []
							res.data.list.forEach((v, h) => {
								v.show = false;
								ary.push(v);
							})
							console.log(ary)
							if (this.userList.length) {
								ary.forEach(v => {
									this.userList.push(v);
								})
							} else {
								this.userList = ary;
							}
							this.total = res.data.totalRow;
						}
					}
				})
			},
			userLong(index){
				this.userList.forEach(v=>{
					v.show=false;
				})
				this.userList[index].show=true;
			},
			hideTool(index){
				console.log(index)
				this.userList[index].show=false;
			},
			//删除
			delItem(item,ind){
				this.userList.splice(ind,1);
				let data={
					userId:item.id,
					itemId:uni.getStorageSync("itemId")
				}
				this.$request({
					url:this.$urls.url.ListIM.deletItemUser,
					method:"POST",
					data,
					success:res=>{
						this.$showToast(res.msg);
						this.params={
							pageNumber: 1,
							pageSize: 15,
							itemId: uni.getStorageSync("itemId"),
							keyword: ""
						}
						this.userList=[];
						this.getUserLis();
					}
				})
				
			}

		},
		onPullDownRefresh() {
			//下拉的生命周期
			uni.showLoading({
				title: '加载中'
			});
			let _self = this;
			setTimeout(function() {
				_self.userList = [];
				_self.pageNumber = 1;
				_self.pageSize = 1;
				_self.getUserLis();
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
					this.getUserLis();
					clearInterval(timer);
				}, 500)
			}
			if (this.userList.length == this.total) { //设置底部文字未没有更多了
				this.status = "nomore";
			}
		},
		onLoad() {
			this.getUserLis();
		},
		onPageScroll(e) { //监听页面滚动
			this.scrollTop = e.scrollTop;
		},
	}
</script>

<style lang="scss" scoped>
	.itemUser {
		width: 730rpx;
		
	}

	.user-list {
		padding: 20rpx 5rpx;
		margin: 0rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		border-bottom: 1rpx solid #ECF5FF;
	}

	.infoText {
		color: gray;
	}
	
	/*删除按钮*/
	.del-tool{
	  width: 200rpx;
	  height: 70rpx;
	  background:#000000;
	  color: #fff;
	  position: absolute;
	  left: 50%;
	  margin-left: -100rpx;
	  top: -30rpx;
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
	  border-radius: 8rpx;
	  font-size: 28rpx;
	  z-index: 10;
	}
	.del-tool .item{
	  flex: 1;
	  box-sizing: border-box;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.del-tool::after{
	  content: "";
	  position: absolute;
	  bottom: -40rpx;
	  left: 50%;
	  margin-left: -20rpx;
	  border-width: 20rpx;
	  border-style: solid;
	  border-color: #000 transparent transparent transparent;
	}
</style>
