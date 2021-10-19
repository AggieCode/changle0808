<template>
	<view class="preject-box">
		<input class="pre-inp" type="text" placeholder="请输入项目名称" v-model="name"/>
		<!-- <input class="pre-inp" type="text" placeholder="请输入项目描述"/> -->
		<input class="pre-inp" type="text" placeholder="请选择项目地址" :disabled="true" v-model="csti" @click="cstiFun"/>
		<textarea class="pre-textare" placeholder="请输入描述(不多于三十字)" v-model="miaoshu"></textarea>
		<button class="subBtn" @click="addItem">添加</button>
		<u-picker mode="region" v-model="cstiShow" @confirm="csticonfirm" ></u-picker>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				csti:"",
				name:"",
				miaoshu:"",
				cstiShow:false,
				detailedAddress:"",
				city:"",
				district:"",
				province:"",
				
			}
		},
		methods:{
			cstiFun(){
				this.cstiShow=true;
			},
			csticonfirm(e){
				console.log(e);
				this.province=e.province.label;
				this.city=e.city.label;
				this.district=e.area.label;
				this.detailedAddress=e.area.value;
				this.csti=e.province.label+""+e.city.label+""+e.area.label
			},
			addItem(){
				if(this.name){
					let data={
						code:this.detailedAddress,
						city:this.city,
						remark:this.miaoshu,
						name:this.name,
						district:this.district,
						province: this.province,
						userId:uni.getStorageSync("userId"),
						product:"2",
						
					}
					this.$request({
						url:this.$urls.url.ListIM.addItem,
						data,
						method:"POST",
						success:res=>{
							if(res.code=10000){
								this.$showToast("添加成功");
								uni.switchTab({
									url:"../ListItem/index"
								})
							}
						}
					})
				}else{
					this.$showToast("请输入项目名称")
				}
				
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
