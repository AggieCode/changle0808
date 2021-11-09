<template>
	<view class="paramList">
		<view class="telmLis">
			<view class="telmLisTX">节目名称</view>
			<view>
				<u-input inputAlign="right" placeholder="请输入" v-model="params.name"></u-input>
			</view>
		</view>
		<view class="telmLis">
			<view class="telmLisTX">宽度</view>
			<view>
				<u-input inputAlign="right" placeholder="请输入" type="number" maxlength="4" v-model="params.width"></u-input>
			</view>
		</view>
		<view class="telmLis">
			<view class=".">高度</view>
			<view>
				<u-input inputAlign="right" placeholder="请输入" type="number" maxlength="4" v-model="params.height"></u-input>
			</view>
		</view>
		<view class="telmLis">
			<view class="telmLisTX">选择设备</view>
			<view class="rightTX" @click="toSearchEQ">
				<view v-if="eqLength">已选择{{eqLength}}个设备</view><view v-else>请选择</view>
				<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
			</view>
		</view>
		<!--保存按钮-->
		<view class="botmBtn" style="position: fixed;">
			<u-button type="primary" @click="subMit">确定</u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				eqLength:0,
				operaLis: [{
						id: 1,
						name: '关'
					},
					{
						id: 2,
						name: '开'
					},
					{
						id: 3,
						name: '调光'
					},
				], //开关调光操作
				timerLis: [],
				timerIndex: 0,
				params:{
					name:"",
					width:"",
					height:"",
				},
				
			}
		},
		methods: {
			//选择设备
			toSearchEQ() {
				uni.navigateTo({
					url: "/pages/ProgramScreening/ProgramScreening"
				})
			},
			//确定保存
			subMit() {
				uni.showLoading({
					title:"保存中"
				})
				//let ary = uni.getStorageInfoSync("ChoiceAry");
				for(let v in this.params){//判断三个输入框是否有值
					if(!this.params[v]){
						this.$showToast("请输入正确的内容")
					}
				}
				let data={
					sourceTime: [],
					totalSize: 0,
					name: this.params.name,
					width: this.params.width,
					height: this.params.height,
				}
				let eqIdParams=uni.getStorageSync("ProgramAry");
				if(eqIdParams.length){//如果有选择的设备，将设备ID添加到数组
					eqIdParams.forEach(v=>{
						data.sourceTime.push({s:v.id,t:10})
						data.totalSize+=v.size;
					})
				}
				console.log(data);
				 this.submitTemplat(data);
			},
			//确认提交
			submitTemplat(data){
				this.$request({
					url:this.$urls.platformUrl.Screen.addProgram,
					data,
					method:"POST",
					success:res=>{ 
						if(res.code==10000){
							setTimeout(()=>{
								uni.hideLoading();
								this.$showToast("保存成功");
								uni.redirectTo({
									url: "/pages/parameterSetting/index"
								})
								uni.removeStorageSync("ProgramAry");
							},1500)
						}else{
							uni.hideLoading();
							this.$showToast(res.msg);
						}
					}
				})
			},
		},
		 onLoad() {
			 //判断本地是否保存了选中的设备，如果有则显示选择的设备数量
			 let ary=uni.getStorageSync("ProgramAry");
			if(ary.length){
				this.eqLength=ary.length;
			}
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/ProgramManagement/ProgramManagement"
				})
				return true;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.paramList {
		box-sizing: border-box;
		border-top: solid #eee 1rpx;
		background: #fff;
		padding-left: 36rpx;
	}

	.TemplateName {
		height: 100rpx;
		box-sizing: border-box;
		border-bottom: solid #eee 1rpx;
		display: flex;
		align-items: center;
		color: #007AFF;
	}

	.paramList .telmLis {
		height: 100rpx;
		box-sizing: border-box;
		border-bottom: solid #eee 1rpx;
		display: flex;
		padding: 0 36rpx 0 0;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.telmLisIcon {
		width: 27rpx;
		height: 28rpx;
	}

	.noData {
		width: 200rpx;
		height: 230rpx;
		margin: 0 auto;
		color: gray;
		text-align: center;
		margin-top: 200rpx;
	}

	.noData .icon {
		width: 100rpx;
		height: 120rpx;
		display: block;
		margin: 0 auto;
		margin-bottom: 20rpx;

	}

	.rightTX {
		display: flex;
		align-items: center;
		color: gray;
	}

	.timeSlot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 36rpx 0 0;
		height: 80rpx;
		background: #F1F1F1;
		margin-left: -36rpx;
	}

	.botmBtn {
		position: absolute;
		left: 5%;
		right: 5%;
		bottom: 5%;
	}
</style>
