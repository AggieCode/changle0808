<template>
	<view class="paramList">
		<view class="telmLis">
			<view class="telmLisTX">模板名称</view>
			<view>
				<u-input inputAlign="right" placeholder="请输入" v-model="params.name"></u-input>
			</view>
		</view>
		<view class="telmLis">
			<view class="telmLisTX">选择设备</view>
			<view class="rightTX" @click="toSearchEQ">
				<view v-if="eqLength">已选择{{eqLength}}个设备</view><view v-else>请选择</view>
				<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
			</view>
		</view>
		<!--添加定时任务-->
		<view v-for="(item,index) in timerLis" :key="index">
			<view class="timeSlot">
				<view style="margin-left: 36rpx; color: gray;">时间段</view>
				<view style="color: #007AFF;" @click="deltTimerLis(index)">删除</view>
			</view>
			<picker mode="time" @change="timerPicker">
				<view class="telmLis" @click="timerIndex=index">
					<view class="telmLisTX">时刻</view>
					<view class="rightTX">
						{{item.time}}
						<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
					</view>
				</view>
			</picker>
			<picker mode="selector" :range="operaLis" range-key="name" @change="rangePicker">
				<view class="telmLis" @click="timerIndex=index">
					<view class="telmLisTX">操作</view>
					<view class="rightTX">
						{{item.status}}
						<image src="../../static/eqlist/xiaojinru.png" class="telmLisIcon"></image>
					</view>
				</view>
			</picker>

			<view class="telmLis" v-show="item.liang">
				<view class="telmLisTX">亮度</view>
				<view class="rightTX">
					<u-input inputAlign="right" placeholder="范围10~100" v-model="item.light"></u-input>
				</view>
			</view>
		</view>
		<view class="TemplateName" @click="addTimerSlot">
			+ 添加时间段
		</view>
		<!-- <view class='noData'>
			<image class='icon' src='../../static/noData.png'></image>
			<view class='dec'>无相关结果</view>
		</view> -->
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
				params:{},
			}
		},
		methods: {
			//处理状态
			disStatus(status) {
				let result = '';
				switch (status) {
					case '00':
						result = '关灯'
						break;
					case '01':
						result = '开灯'
						break;
					case '02':
						result = '调光'
						break;
					default:
						result = false
						break;
				}
				return result;
			},
			//处理时间段
			disTimeList(data) {
				let that = this;
				let result = [];
				let cntData = data.split(',');
				cntData.forEach((item, index) => {
					let temp = item.split('_');
					result.push({
						time: temp[0] || false,
						status: that.disStatus(temp[1]),
						liang: temp[2] || false
					})
				})
				return result;
			},
			addTimerSlot() {
				//添加时间段
				if (this.timerLis.length < 5) {
					this.timerLis.push({
						time: "00:00",
						status: "请输入",
						liang: "",
						lightShow: false
					})
				} else {
					this.$showToast("最多添加五个时间段")
				}
			},
			//处理时间段 将数组格式转换成字符串格式
			  disTimeStr(){
			    let result = [];
			    let timeList = this.timerLis;
			    if(timeList.length>0){
			      timeList.forEach((item,index)=>{
							let status="";
							switch (item.status){
								case "关灯":
									status="00";
									break;
								case "开灯":
									status="01";
									break;
								case "调光":
									status=item.light<10?"0"+item.light:item.light;
									break;
							}
							result.push(item.time+"_"+status)
			      })
			    }
			    return result;
			  },
			timerPicker(e) { //时间段选择
				this.timerLis[this.timerIndex].time = e.detail.value;
			},
			//操作选择
			rangePicker(e) {
				if (e.detail.value == 2) {
					this.timerLis[this.timerIndex].liang = true;
				}
				this.timerLis[this.timerIndex].status = this.operaLis[e.detail.value].name;
			},
			//删除时间段
			deltTimerLis(index) {
				this.timerLis.splice(index, 1);
			},
			//选择设备
			toSearchEQ() {
				uni.navigateTo({
					url: "/pages/choiceEquipment/index"
				})
			},
			//确定保存
			subMit() {
				uni.showLoading({
					title:"保存中"
				})
				//let ary = uni.getStorageInfoSync("ChoiceAry");
				let data={
					itemId: uni.getStorageSync("itemId"),
					timeBrightness: this.disTimeStr(),
					equipmentId: [],
					name: this.params.name,
					id: uni.getStorageSync("templateId")||"",
				}
				let eqIdParams=uni.getStorageSync("ChoiceAry");
				if(eqIdParams){//如果有选择的设备，将设备ID添加到数组
					eqIdParams.forEach(v=>{
						data.equipmentId.push(v.id);
					uni.removeStorageSync("ChoiceAry");
					})
				}
				this.submitTemplat(data);
			},
			//提交模板参数
			submitTemplat(data){
				this.$request({
					url:this.$urls.url.ListIM.editStrategyInfo,
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
							},1500)
						}else{
							uni.hideLoading();
							this.$showToast(res.msg);
						}
					}
				})
			},
			//获取模板详情
			async getTemplateMsg(data){
				 await new Promise((resolve,reject)=>{
					this.$request({
						url:this.$urls.url.ListIM.getStragegy+`?id=${data.id}&itemId=${data.itemId}`,
						data,
						method:"GET",
						success:res=>{
							if(res.code==10000){
								this.params=res.data;
								this.timerLis=this.disTimeList(res.data.time_brightness);//时间段
								this.timerLis.forEach((v)=>{
									v.light=0;
								})
								if(uni.getStorageSync("ChoiceAry")){
									let ary=uni.getStorageSync("ChoiceAry")
									this.eqLength=ary.length;
								}else{
									this.eqLength=res.data.module_ids.split(",").length;
								}
								
							}
						}
					})
				})
			}
		},
		 onLoad(data) {
			let params={}
			let storageId=uni.getStorageSync("templateId");
				if (data.id!=undefined) {
					 params = {
						id: data.id,
						itemId: uni.getStorageSync("itemId")
					}
					uni.setStorageSync("templateId",data.id);
					 this.getTemplateMsg(params);
				}
				if(storageId){
					params = {
						id: storageId,
						itemId: uni.getStorageSync("itemId")
					}
					 this.getTemplateMsg(params);
				}
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/parameterSetting/index"
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
