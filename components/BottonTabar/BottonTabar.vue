<template>
	<view>
		<!--底部tabbar-->
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn">
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"BottonTabar",
		data() {
			return {
				current:"",
			};
		},
		methods:{
			//底部tabbar跳转事件
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page
				})
			}
		},
		props:{
			tabbarList:Array,
			allDis:{
				default:true
			}
		}
	}
</script>

<style lang="scss">

</style>
