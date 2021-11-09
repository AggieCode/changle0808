<template>
	<view>
		<view @click="addVidImg" class="tianjia">添加</view>
	</view>
</template>

<script>
	export default {
		name:"SuspendBtn",
		data() {
			return {
				
			};
		},
		methods:{
			addVidImg(){
				this.$emit("suspendFun")
			}
		}
	}
</script>

<style lang="scss">
.tianjia{
	position: fixed;
	bottom: 15%;
	right: 5%;
	width: 100rpx;
	height: 100rpx;
	border-radius: 100rpx;
	background-color: #007AFF;
	color: white;
	font-size: 26rpx;
	line-height: 100rpx;
	text-align: center;
	z-index: 10;
	box-shadow: 2px 2px 5px #888888;
}
</style>
