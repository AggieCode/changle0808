<template>
	<view class="preject-box">
		<input class="pre-inp" type="text" placeholder="请输入项目名称" v-model="name"/>
		<!-- <input class="pre-inp" type="text" placeholder="请输入项目描述"/> -->
		<textarea class="pre-textare" placeholder="请输入描述(不多于三十字)" v-model="miaoshu"></textarea>
		<button class="subBtn">添加</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:"",
				miaoshu:""
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.preject-box{
		padding: 42rpx;
		box-sizing: border-box;
	}
	.pre-inp{
		width: 95%;
		height: 60rpx;
		padding: 0 20rpx 0 20rpx;
		margin: 25rpx auto 0;
		border: 1px solid #F1F1F1;
		font-size: 26rpx;
	}
	.pre-textare{
		width: 95%;
		height: 150rpx;
		padding: 10rpx 20rpx 0 20rpx;
		margin: 25rpx auto 0;
		border: 1px solid #F1F1F1;
		font-size: 26rpx;
	}
	.subBtn{
		width: 95%;
		height: 70rpx;
		margin: 50rpx auto 0;
		line-height: 70rpx;
		background-color: #007AFF;
		color: white;
		
	}
</style>
