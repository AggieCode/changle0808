<template>
	<view>
		
		<u-modal v-model="TipsIF" :content="content" :show-cancel-button="true" :async-close="true">
			
		</u-modal>
		<view class="searchBox">
			<u-search placeholder="请输入用户名称" action-text="添加" :clearabled="true" :disabled="false" @custom="custom">
			</u-search>
		</view>
		<view class="user-list">
			<view class="user-name">
				chenlinaaa
			</view>
			<view class="usList-rig">
				<button class="btn" v-if="remoAnTR" style="background-color: red;" @click="disaBtn">禁用</button>
				<button class="btn" v-else @click="disaBtn">启用</button>
				<button class="btn" style="background-color: red;" @click="remoUserBtn">删除</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				remoAnTR:true,
				content:"是否删除该用户",
				TipsIF:false,
				listShow:false,
				userLv:[
					{
						value:"1",
						label:"A"
					},
					{
						value:"2",
						label:"B"
					},
					{
						value:"3",
						label:"C"
					},
					{
						value:"4",
						label:"D"
					},
				]
			}
		},
		methods:{
			custom(){//添加
				uni.navigateTo({
					url:"/pages/addUser/index"
				})
			},
			disaBtn(){//禁用、启用
				this.remoAnTR=!this.remoAnTR;
			},
			remoUserBtn(){//删除
				this.TipsIF=true;
			},
			
		}
	}
</script>

<style lang="scss">
	@import "index.css";
	.searchBox {
		height: 100rpx;
		margin: 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
</style>
