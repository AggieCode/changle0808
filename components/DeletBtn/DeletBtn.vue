<template>
	<view>
		<view class='del-tool' v-show="item.show">
		  <view class='del item' @click='delItem'>删除</view>
		  <view class='cannel item' @click='hideTool'>取消</view>
		  <view class='jiao'></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"DeletBtn",
		data() {
			return {
				
			};
		},
		methods:{
			delItem(){
				this.$emit("delItem",this.item,this.index)
			},
			hideTool(){
				console.log(this);
				this.$emit("hideTool",this.index);
			}
		},
		props:{
			inShow:Boolean,
			item:Object,
			index:Number||String
		}
	}
</script>

<style lang="scss">
/*删除按钮*/
	.del-tool{
	  width: 200rpx;
	  height: 70rpx;
	  background:#000000;
	  color: #fff;
	  position: absolute;
	  left: 50%;
	  margin-left: -100rpx;
	  top: -30rpx;
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
	  border-radius: 8rpx;
	  font-size: 28rpx;
	  z-index: 10;
	}
	.del-tool .item{
	  flex: 1;
	  box-sizing: border-box;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.del-tool::after{
	  content: "";
	  position: absolute;
	  bottom: -40rpx;
	  left: 50%;
	  margin-left: -20rpx;
	  border-width: 20rpx;
	  border-style: solid;
	  border-color: #000 transparent transparent transparent;
	}
</style>
