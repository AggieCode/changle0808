<template>
	<view>
		<u-select v-model="lisShow" :list="Lvlist" @confirm="Roelconfirm"></u-select>
		<view class="adduser">
			<input type="text" placeholder="请输入用户名" v-model="username" class="nameInp"/>
			<input type="password" placeholder="请输入密码" v-model="password" class="nameInp"/>
			
			<view class="lvitem">
				<text>账号等级：{{userLV}}</text>
				<button class="LVbtn" @click="LVbtn">选择</button>
			</view>
			<button class="addbtn" @click="addFun">添加</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userLV:"A",
				lisShow:false,
				Lvlist:[
					{
						value:'1',
						label:"A",
					},
					{
						value:'2',
						label:"B",
					},
					{
						value:'3',
						label:"C",
					},
					{
						value:'4',
						label:"D",
					}
				],
				password:"",
				username:"",
				treeLevel:1,
			}
		},
		methods:{
			addFun(){
				if(this.username==""){
					return this.$showToast("请输入用户名")
				}
				if(!this.password||this.password.length<6){
					return this.$showToast("密码长度不能小于6位")
				}
				let data={
					username:this.username,
					id:uni.getStorageSync('userId'),
					password:this.password,
					treeLevel:1,
				}
				this.$request({
					url:this.$urls.url.user.addUser,
					data,
					method:"POST",
					success:res=>{
						if(res.code==10000){
							this.$showToast("添加成功")
							setTimeout(()=>{
								uni.redirectTo({
									url:"/pages/userList/index"
								})
							},1500)
						}else{
							this.$showToast(res.msg);
						}
					}
				})
			},
			LVbtn(){
				this.lisShow=true;
			},
			Roelconfirm(e){
				this.userLV=e[0].label;
				this.treeLevel=e[0].value;
			}
		}
	}
</script>

<style lang="scss">
	.adduser{
		padding: 20rpx;
		
	}
	.nameInp{
		padding: 0 15rpx;
		height: 80rpx;
		border: 1px solid #F8F8F8;
		font-size: 26rpx;
		margin: 20rpx auto 0;
		box-sizing: border-box;
	}
	.addbtn{
		height: 70rpx;
		margin-top: 50rpx;
		background-color: #007AFF;
		color: white;
		line-height: 70rpx;
	}
	.LVbtn{
		width: 150rpx;
		text-align: center;
		line-height: 60rpx;
		background: #007AFF;
		font-size: 26rpx;
		color: white;
	}
	.lvitem{
		width: 100%;
		height: 80rpx;
		display: flex;
		margin-top: 20rpx;
		align-items: center;
		padding: 10rpx 10rpx;
	}
</style>
