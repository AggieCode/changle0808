<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	.charts-box {
		width: 100%;
		height: 100%;
	}
	.btn{
	  width: 582rpx;
	  height: 80rpx;
	  line-height: 80rpx;
	  background: #007aff;
	  border-radius: 4rpx;
	  color: #ffffff;
	  font-size: 32rpx;
	  text-align: center;
	}
	/*每个页面公共css */
</style>
