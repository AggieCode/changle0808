<template>
	<view>
		<u-upload ref="uUpload" :header="upDateheader" max-count="1" @on-success="updateSuccess" :action="action" :auto-upload="false"
			:show-progress="true"></u-upload>
	<view class="fixed">	<u-button @click="submit" type="primary" class="submit">提交</u-button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 上传地址
				action: 'https://warn.ludeng-yun.com/led/onUpload',
				upDateheader: {
					'Content-Type': 'application/x-www-form-urlencoded',
					token: uni.getStorageSync("token")
				},
			};
		},
		methods: {
			 submit() {
				 this.$refs.uUpload.upload()
				
			},
			updateSuccess(res){
				this.$showToast("上传成功");
				setTimeout(()=>{
					uni.redirectTo({
						url:"/pages/MediaLibrary/MediaLibrary"
					})
				},1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
.fixed{
	
	position: fixed;
	bottom: 5%;
	left: 3%;
	right: 3%;
}
</style>
