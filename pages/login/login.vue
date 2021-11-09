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
			<view class="item-box-inp">
				<text class="item-label">用户名</text>
				<!-- <input type="text" placeholder="请输入用户名" class="item-value" v-model="form.username" /> -->
				<u-input type="text" placeholder="请输入用户名" class="item-value" v-model="form.username"></u-input>
			</view>
			<view style="height: 40rpx;"></view>
			<view class="item-box-inp">
				<text class="item-label">密码</text>
				<u-input type="password" placeholder="请输入密码" class="item-value" v-model="form.password"></u-input>
				<!-- <input type="password" placeholder="请输入密码" class="item-value" v-model="form.password" /> -->
			</view>
		</view>
		<view class="">
			<checkbox-group @change="checkboxChange">
				<checkbox type="checkbox" @tap="rememberPsw = !rememberPsw" :checked="rememberPsw" id="chkRem"
					class="RememberCheck">记住密码</checkbox>
			</checkbox-group>

		</view>
		<view class="btn lonin-btn" @click="login()">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rememberPsw: true, //是否记住密码，默认是
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
			if (uni.getStorageSync("token")) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		},
		methods: {
			login() {
				if (!this.form.username) {
					return this.$showToast('用户名不能为空')
				}
				if (!this.form.password) {
					return this.$showToast('密码不能为空')
				}
				console.log(this.$urls)
				this.$request({
					// url: this.$urls.platformUrl.login.login,
					url: this.$urls.url.login.login,
					method: 'POST',
					data: this.form,
					success: res => {
						if (res.code == 10000) {
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync("nickname", res.data.nickname);
							if(this.rememberPsw){
								uni.setStorageSync("username", res.data.username);
							}else{
								uni.removeStorageSync("username")
							}
							uni.setStorageSync("userId", res.data.id);
							uni.setStorageSync("app_key", res.data.app_key);
							uni.setStorageSync("app_secret", res.data.app_secret);
							uni.setStorageSync("password",res.data.password);
							if(this.rememberPsw){
								uni.setStorageSync("password", this.form.password);
							}else{
								uni.removeStorageSync("password")
							}
							this.getAppKey();
							uni.reLaunch({
								url: '/pages/index/index'
							})
						} else if (res.code) {
							this.$showToast(`${res.msg}！`)
						}
					},
					fail: err => {
						switch (err.code) {
							case 401:
								if (err) {
									this.$showToast(`登录失败`)
								} else {
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
			//获取app_key和app_secret
			getAppKey() {
				this.$request({
					url: this.$urls.platformUrl.login.login,
					method: 'POST',
					data: this.form,
					success: res => {
						if (res.code == 10000) {
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync("username", res.data.username);
							if(this.rememberPsw){
								uni.setStorageSync("username", res.data.username);
							}else{
								uni.removeStorageSync("username")
							}
							uni.setStorageSync("app_key", res.data.app_key);
							uni.setStorageSync("app_secret", res.data.app_secret);
						}
					}
				})
			},
			formatLockedTime(time) {
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
			checkboxChange(e) {
				console.log(e.detail.value.length);
				if (e.detail.value.length == 1) {
					//获取缓存的账号
					uni.getStorageSync('username', this.form.username);
					uni.getStorageSync('password', this.form.password);
				} else {
					uni.removeStorageSync('username');
					uni.removeStorageSync('password');
				}
			}

		},
		mounted() {
			let that = this;
			//获取缓存账号密码
			const username = uni.getStorageSync('username');
			const password = uni.getStorageSync('password');
			
			if(username||password){
				this.form.username=username;
				this.form.password=password;
			}else{
				this.form.username="";
				this.form.password="";
			}
		}
	}
</script>

<style lang="scss">
	.lonin {
		width: 680rpx;
		height: 680rpx;
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

	.title {
		text-align: center;
		position: absolute;
		top: 90rpx;
		left: 0;
		width: 100%;
		color: #333;
		letter-spacing: 2rpx;
		font-size: 38rpx;
		font-weight: bold;
	}

	.item-box {
		margin-top: 220rpx;
	}

	.item-box-inp {
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 80rpx;
		overflow: hidden;
	}

	.item-box-inp::after {
		content: '';
		width: 100%;
		height: 1rpx;
		position: absolute;
		top: 100%;
		left: 0;
		background: #f8f8f8;
	}

	.item-label {
		width: 140rpx;
	}

	.item-value {
		flex: 1;
	}

	.lonin-btn {
		margin-top: 30rpx;
	}
</style>
