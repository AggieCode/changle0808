<template>
	<view class="mdPwd">
		<input type="text" v-model="jiupwd" placeholder="请输入旧密码" class="from-inp"/>
		<input type="text" v-model="newpwd" placeholder="请输入新密码" class="from-inp"/>
		<input type="text" v-model="password" placeholder="请再次输入密码" class="from-inp"/>
		<button @click="mdpwd" class="changebtn">修改</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				jiupwd:"",
				newpwd:"",
				password:""
			}
		},
		methods:{
			mdpwd(){
				if(this.jiupwd==""){
					this.$showToast("旧密码不能为空");
					return 
				}else if(this.newpwd==""){
					this.$showToast("请输入新密码");
					return 
				}else if(this.password=""){
					this.$showToast("请再次输入密码");
					return 
				}
				
				this.$request({
					url:this.$urls.url.changePassword,
					data:{
						id:uni.getStorageSync("userId"),
						oldPassword:this.jiupwd,
						newPassword:this.newpwd
					},
					method:"POST",
					success:res=>{
						console.log(res);
						if(res.code==10000){
							this.$showToast("修改成功");
							setTimeout(()=>{
								uni.reLaunch({
									url:"/pages/login/login"
								})
							},1500)
						}else{
							this.$showToast(res.msg);
							
						}
					}
					
				})
					
				
			}
		}
	}
</script>

<style lang="scss">
	.mdPwd{
		padding: 72rpx 72rpx;
		box-sizing: border-box;
		.from-inp{
			width: 100%;
			  height: 80rpx;
			  background:#fff;
			  padding: 0 30rpx;
			  box-sizing: border-box;
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  margin-bottom:36rpx;
			  border-radius: 4rpx;
			  border: 1px solid #F4F4F5;
		}
		.changebtn{
			width: 100%;
			height: 80rpx;
			margin-top: 30rpx;
			background: #007AFF;
			color: white;
			line-height: 80rpx;
		}
	}
	
</style>
