<template>
	<view>
		<ListTitle title="项目信息"></ListTitle>

		<view class="infoList">
			<view class="itemInfo" style="margin-top: 50rpx;">
				<text>项目名称</text>
				<text class="infoText" v-if="!bianjishow">岩层铁塔</text>
				<input v-else placeholder="请输入项目名称"  v-model="ItemName" class="fontInp"/>
			</view>
			<view class="itemInfo">
				<text>创建人</text>
				<text class="infoText">chenlin</text>
				
			</view>
			<view class="itemInfo">
				<text>创建时间</text>
				<text class="infoText">2019-11-12</text>
			</view>
			<view class="itemInfo">
				<text>项目位置</text>
				<text class="infoText">福建省厦门市</text>
			</view>
			<view class="infoDescribe">
				<view>描述</view>
				<view class="infoText" v-if="!bianjishow">信息</view>
				<textarea placeholder="请输入项目描述(不超过三十字)" class="fontInp" v-else v-model="ItemDescribe"></textarea>
			</view>
		</view>

		<view class="itemUser">
			<ListTitle title="项目成员"></ListTitle>
			<view class="user-list" style="margin-top: 50rpx;">
				<view>chehnlin <text class="infoText"> (工程师)</text></view>
				<view>
					<u-button type="primary" size="mini" @click="changPermis">修改权限</u-button>
				</view>
			</view>
			<view class="user-list">
				<view>chehnlin <text class="infoText"> (工程师)</text></view>
				<view>
					<u-button type="primary" size="mini" @click="changPermis">修改权限</u-button>
				</view>
			</view>
			<view class="adduser" @click="toAdditemUser">
				<text>添加成员</text>
				<image src="../../static/eqlist/jinru.png" class="toADDicon"></image>
			</view>
		</view>
		
		<!--编辑-->
		<view class="complie" @click="complieFun(false)"  v-if="!bianjishow">
			<text>编辑</text>
		</view>
		<view class="complie" @click="complieFun(true)" v-else>
			<text>完成</text>
		</view>
		<!--底部tabbar-->
		<u-select v-model="roleListShow" :list="roleList" @confirm="Roelconfirm"></u-select>
		<u-tabbar v-model="current" :list="tabbarList" active-color="#007AFF" @change="tabListBtn"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ItemName:"",//项目名称
				ItemDescribe:"",//项目描述
				bianjishow:false,
				roleListShow: false,
				roleList: [{
						value: "0",
						label: "工程师"
					}, {
						value: "1",
						label: "客户"
					},
					{
						value: "2",
						label: "体验客户"
					}
				], //用户角色
				current: "",
				tabbarList: [{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '设备列表',
					customIcon: false,
					page: "/pages/eqlistItem/index",
					pagePath: "/pages/eqlistItem/index"

				}, {
					iconPath: "list",
					selectedIconPath: "list-dot",
					text: '参数设置',
					customIcon: false,
					page: "/pages/parameterSetting/index",
					pagePath: "/pages/parameterSetting/index"
				}, {
					iconPath: "error-circle",
					selectedIconPath: "error-circle",
					text: '告警信息',
					customIcon: false,
					page: "/pages/waringEqList/index",
					pagePath: "/pages/waringEqList/index"

				}, {
					iconPath: "file-text",
					selectedIconPath: "file-text-fill",
					text: '项目信息',
					isDot: false,
					customIcon: false,
					page: "/pages/ItemInfoPage/index",
					pagePath: "/pages/ItemInfoPage/index"
				}],
			}
		},
		methods: {
			//底部点击跳转页面
			tabListBtn(e) {
				let url = this.tabbarList[e];
				console.log(url);
				uni.redirectTo({
					url: url.page
				})
			},
			changPermis(index) { //选择项目成员权限
				this.roleListShow = true;
			},
			Roelconfirm(e) {
				
				this.$showToast("选择了"+e[0].label)
			},
			complieFun(bol){
				console.log(bol)
				if(bol){
						if(this.ItemName==""){
							this.$showToast("请输入项目名称");
							return
						}else if(this.ItemDescribe.length>30){
							this.$showToast("项目描述内容不能超过三十字");
							return
						}
						this.bianjishow=!this.bianjishow
				}else{
					this.bianjishow=!this.bianjishow
				}
			},
			//跳转至添加成员页面
			toAdditemUser(){
				uni.navigateTo({
					url:"/pages/addItemUser/index"
				})
			}
		}
	}
</script>

<style>
	@import "./index.css";
</style>
