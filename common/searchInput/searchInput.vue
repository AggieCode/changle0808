<template>
	<view class="searchBox">
		<u-search :placeholder="place" :show-action="false" action-text="添加" v-model="keyword" @change="serchChange"
			:clearabled="true" :disabled="false" @custom="custom">
		</u-search>
		<view class="addBimg" @click="custom">
			<image src="../../static/sb_add.png"></image>
		</view>
	</view>
</template>

<script>
	//节流函数
	function debounce(func, wait = 1000) { //可以放入项目中的公共方法中进行调用
		let timeout;
		return function(event) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				func.call(this, event)
			}, wait)
		}
	}
	export default {
		data() {
			return {
				keyword: "",
			}
		},
		props: ["place", ],
		methods: {
			custom() {
				this.$emit("custom", "")
			},
			serchChange: debounce(function(e) {//搜索框内容改变时
				this.$emit("serchChange", e);
			})
		}
	}
</script>

<style lang="scss" scoped>
	.searchBox {
		height: 100rpx;
		margin: 0rpx 20rpx 0rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.addBimg {
		width: 10%;
	}

	.addBimg image {
		width: 54rpx;
		height: 54rpx;
		float: right;
		display: flex;
		align-items: center;
		justify-content: right;
	}
</style>
