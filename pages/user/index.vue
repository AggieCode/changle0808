<template>
	<view>
		<view class="my-item one">
		  <text class=''>账户名：{{username}}</text>
		  <text class='label'>{{levelList[level]}}</text>
		</view>
		<view class='my-item two' @click='mdPwd'>
		  <view class='dec'><image class='left-icon lock' src='../../static/lock.png'></image>修改密码</view>
		  <image class='right' src='../../static/youjiantou.png'></image>
		</view>
		<view class='my-item two' @click='userLisPage'>
		  <view class='dec'><image class='left-icon lock' src='../../static/eqlist/yonghu.png' style="width: 34rpx;"></image>下级用户</view>
		  <image class='right' src='../../static/youjiantou.png'></image>
		</view>
		<view class='btn loginout' @click='loginout'>退出登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				username:uni.getStorageSync("username"),
				level:uni.getStorageSync("level"),
				levelList: ['管理员', 'A级', 'B级', 'C级','D级', 'E级']
			}
		},
		methods:{
			loginout(){
				uni.removeStorageSync("token");
				uni.reLaunch({
					url:"/pages/login/login",
				})
			},
			mdPwd(){//修改密码
				uni.navigateTo({
					url:"/pages/changePwds/index"
				})
			},
			//跳转下级用户界面
			userLisPage(){
				uni.navigateTo({
					url:"/pages/userList/index"
				})
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('token'))
		}
	}
</script>

<style lang="scss">
	@import "./index.css";
</style>
