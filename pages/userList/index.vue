<template>
	<view>
		
		<u-modal v-model="TipsIF" :content="content" @confirm="removeUser" :show-cancel-button="true" :async-close="true">
		</u-modal>
		<view class="searchBox">
			<u-search placeholder="请输入用户名称" @change="searchChange" v-model="keyword" action-text="添加" :clearabled="true" :disabled="false" @custom="custom">
			</u-search>
		</view>
		<view class="user-list" v-for="(item,index) in userLis" :key="item.token">
			<view class="user-name">
				{{item.username}}<text style="color: gray;" v-show="item.nickname">({{item.nickname}})</text>
			</view>
			<view class="usList-rig">
				<button class="btn" v-if="item.check" style="background-color: red;" @click="disaBtn(index)">禁用</button>
				<button class="btn" v-else @click="disaBtn(index)">启用</button>
				<button class="btn" style="background-color: red;" @click="remoUserBtn(item,index)">删除</button>
			</view>
		</view>
		
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
	export default{
		data(){
			return{
				remoAnTR:true,
				content:"是否删除该用户",
				TipsIF:false,
				listShow:false,
				userLis:[],
				pageNumber:1,
				pageSize:15,
				deletUserId:"",
				keyword:"",//搜索内容
				userLv:[
					{
						value:"1",
						label:"A"
					},
					{
						value:"2",
						label:"B"
					},
					{
						value:"3",
						label:"C"
					},
					{
						value:"4",
						label:"D"
					},
				]
			}
		},
		methods:{
			//搜索
			searchChange:debounce(function(e){
				console.log(e);
				this.getUserList();
			}),
			custom(){//添加
				uni.navigateTo({
					url:"/pages/addUser/index"
				})
			},
			removeUser(){
				let data={
					userId:this.deletUserId,
					itemId:uni.getStorageSync("itemId")
				}
				this.$request({
					url:this.$urls.url.user.deleteUser,
					data,
					method:"POST",
					success:res=>{
						if(res.code==10000){
							this.$showToast("操作成功");
						}else{
							this.$showToast(res.msg);
						}
						this.getUserList();
					}
				})
				setTimeout(()=>{
					this.TipsIF=false;
				},1000)
			},
			disaBtn(index){//禁用、启用
				this.userLis[index].check=!this.userLis[index].check;
			},
			remoUserBtn(item,index){//删除
				this.TipsIF=true;
				this.deletUserId=item.id;
			},
			getUserList(){
				let data={
					id:uni.getStorageSync("userId"),
					pageNumber:this.pageNumber,
					pageSize:this.pageSize,
					keyword:this.keyword
				};
				this.$request({
					url:this.$urls.url.user.getUserLis,
					method:"POST",
					data,
					success:res=>{
						if(res.code==10000){
							res.data.list.forEach(v=>{
								v.check=false;
							})
							this.userLis=res.data.list;
						}
						if(this.pageSize<res.data.totalRow){
							this.pageSize=res.data.totalRow;
						}
					}
				})
			}
		},
		onLoad() {
			this.getUserList();
		}
	}
</script>

<style lang="scss">
	@import "index.css";
	.searchBox {
		height: 100rpx;
		margin: 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
</style>
