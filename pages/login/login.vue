<template>
	<view class="lonin">
		<!--logo-->
		<view class="logo-vi">
			<image src="../../static/logo.png" class="logo"></image>
		</view>
		<view class="title">
			能加新能源
		</view>
		<view class="item-box">
			<view item-box-inp>
				<text class="item-label">用户名</text>
				<input type="text" placeholder="请输入用户名" class="item-value" v-model="form.username" />
			</view>
			<view style="height: 40rpx;"></view>
			<view item-box-inp>
				<text class="item-label">密码</text>
				<input type="password" placeholder="请输入密码" class="item-value" v-model="form.password" />
			</view>
		</view>
		<view class="btn lonin-btn" @click="login()">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				biyiCaptchaKey: '',
				value: '',
				codeImage: ''
			};
		},
		onLoad() {
			this._login = this.$throttle(this.login, 2000);
		},
		methods: {
			login(){
				if(!this.form.username){
					return this.$showToast('用户名不能为空')
				}
				if(!this.form.password){
					return this.$showToast('密码不能为空')
				}
				console.log(this.$urls)
				this.$request({
					url: this.$urls.url.login.login,
					method: 'POST',
					data: this.form,
					success: res => {
						if(res.code==10000){
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync("userId",res.data.id);
							uni.setStorageSync("username",res.data.username);
							uni.setStorageSync("level",res.data.tree_level);
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}else if(res.code){
							this.$showToast(`${res.msg}！`)
						}
						
					},
					fail: err => {
						switch (err.code){
							case 401:
								if(err){
									this.$showToast(`登录失败`)
								}else{
									const locktime = this.formatLockedTime(err);
									this.$showToast(`登录失败，您的账号已被锁定，请在${locktime}后重试！`)
								}
								break;
							default:
								this.$showToast(`登录失败`)
						}
						// this.$showToast(err.message);
					}
				})
			},
			formatLockedTime (time) {
			    let str = ''
			    const d = parseInt(time / (3600 * 24))
			    let h = parseInt((time % (3600 * 24)) / 3600)
			    let m = parseInt((time % 3600) / 60)
			    let s = ((time % 3600) % 60)
			    if (d > 0) {
			        str = `${str}${d}天`
			    }
			    if (h > 0) {
			        str = `${str}${h}小时`
			    }
			    if (m > 0) {
			        str = `${str}${m}分`
			    }
			    if (s > 0) {
			        str = `${str}${s}秒`
			    }
			    return str
			},
		}
	}
</script>

<style lang="scss">
	.lonin {
		width: 680rpx;
		height: 620rpx;
		border-radius: 20rpx;
		margin: 150rpx auto 0;
		padding: 60rpx;
		box-sizing: border-box;
		position: relative;
		background-color: white;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
		
	}
	
	.logo-vi {
		width: 160rpx;
		height: 160rpx;
		border-radius: 100%;
		background: #fff;
		position: absolute;
		top: -80rpx;
		left: 50%;
		margin-left: -80rpx;
		background-color: #fff;
	}
	
	.logo {
		width: 140rpx;
		height: 140rpx;
		display: block;
		margin: 0 auto;
		margin-top: 5rpx;
	}
	.title{
			text-align: center;
		  position: absolute;
		  top: 90rpx;
		  left: 0;
		  width: 100%;
		  color:#333;
		  letter-spacing: 2rpx;
		  font-size: 38rpx;
		  font-weight: bold;
	}
	.item-box{
		margin-top:220rpx;
	}
	.item-box-inp{
		 position: relative;
		  display: flex;
		  flex-wrap: nowrap;
		  align-items: center;
		  height: 80rpx;
		   margin-bottom: 30rpx;
		  overflow: hidden;
	}
	.item-box-inp::after{
		content: '';
		  width: 100%;
		  height: 1rpx;
		  position: absolute;
		  top: 100%;
		  left: 0;
		  background:#f8f8f8;
	}
	.item-label{
		width: 140rpx;
		float: left;
	}
	.item-value{
		flex: 1;
	}
	.lonin-btn{
		margin-top:60rpx;
	}
</style>
