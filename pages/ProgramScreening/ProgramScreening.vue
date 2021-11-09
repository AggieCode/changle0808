<template>
	<view>
		<view class="glleryList">
			<view class="gllery" v-for="item in tabList" :key="item.id">
				<view class="bigImg">
					<image mode="widthFix" :src="'https://warn.ludeng-yun.com/led/getThumbnail?id='+item.source_id">
					</image>
				</view>
				<view class="subject">
					<view class="imgName">{{item.name}}</view>
					<view class="coazuo">
						<view class="fileType">类型:{{item.type+'/'+item.file_ext}}</view>
						<view class="dis" style="display: block;">
							<u-checkbox-group @change="">
								<u-checkbox @change="checkboxChange" v-model="item.check" :name="item.id">
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
					<view class="coazuo">
						<view class="fileType">大小:{{onitMb(item.size)}}MB</view>
						<view class="fileType">上传时间:{{timepToupdate_time(item.update_time)}}</view>
					</view>
				</view>
			</view>
		</view>
		<!--内容为空-->
		<view class="nullItem">
			<u-empty text="暂无媒体" mode="list" v-show="!tabList.length"></u-empty>
		</view>
		<view class="submitBtn"><u-button type="primary" @click="selectProgram">确定(已选择{{selectLis}}个)</u-button></view>
	</view>
</template>

<script>
	import {
		formatTime
	} from "../../util/tools.js";
	import {
		mixin
	} from "../../mixins/mixin.js";
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				tabList: [],
				selectLis:0
			};
		},
		methods: {
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page
				})
			},
			getEqupementParm() {
				uni.showLoading({
					title: "加载中..."
				})
				let data = {};
				this.$request({
					url: this.$urls.platformUrl.Screen.getSources,
					method: "POST",
					header: {
						token: uni.getStorageSync("token")
					},
					data,
					success: res => {
						uni.stopPullDownRefresh();
						if (res.code = 10000) {
							uni.hideLoading();
							res.data.forEach(v=>{
								v.check=false;
								this.tabList.push(v)
							})
						}
					}
				})
			},
			onitMb(size) {
				//截取大小
				size = size / 1024 / 1024;
				size = size.toFixed(2)
				return size
			},
			//时间戳转换
			timepToupdate_time(date) {
				let time = formatTime(date).substr(0, 10);
				return time;
			},
			addVidImg() {
				//跳转至上传媒体页面
				uni.navigateTo({
					url: "/pages/updateIMG/updateIMG"
				})
			},
			//单选{
			checkboxChange(e) {
				if(e.value){
					this.selectLis++;
				}else{
					this.selectLis--;
				}
				
			},
			//筛选
			selectProgram(){
				let ary=[];
				this.tabList.forEach(v=>{
					if(v.check){
						ary.push(v);	
					}
				})
				
				if(!ary.length){
					return this.$showToast("最少选择一项")
				}else{
					uni.setStorageSync("ProgramAry",ary);
					this.$showToast("保存中...")
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/AddProgram/AddProgram"
						})
					},1000)
				}
			}
			
		},
		onBackPress(e) {
			if (e.from === 'backbutton') {
				uni.redirectTo({
					url: "/pages/AddProgram/AddProgram"
				})
				return true;
			}
		},
		onLoad() {
			this.getEqupementParm()
		},
	}
</script>

<style lang="scss">
	@import "./index.css"
</style>
