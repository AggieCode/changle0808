<template>
	<view>
		<!-- <ListTitle title="项目信息"></ListTitle> -->

		<view class="infoList">
			<view class="itemInfo" style="margin-top: 50rpx;">
				<text>项目名称</text>
				<text class="infoText" v-if="!bianjishow">{{itemInfo.name}}</text>
				<view  v-else >
					<u-input input-align="right" placeholder="请输入项目名称" v-model="ItemName" class="fontInp" ></u-input>
				</view>
			</view>
			<view class="itemInfo">
				<text>创建人</text>
				<text class="infoText">{{itemInfo.username}}</text>
			</view>
			<view class="itemInfo">
				<text>创建时间</text>
				<text class="infoText">{{toTime(itemInfo.create_time)}}</text>
			</view>
			<view class="itemInfo">
				<text>项目位置</text>
				<text class="infoText" v-if="!bianjishow">{{itemInfo.province+itemInfo.city+itemInfo.district}}</text>
				<view v-else>
					<u-input input-align="right" :disabled="true" @click="regionshow=true" placeholder="请选择项目位置" v-model="cstyinp" class="fontInp" ></u-input>
				</view>
			</view>
			<view class="itemInfo">
				<text>项目成员</text>
				<text class="infoText" @click="toItemUser">点击查看</text>
			</view>
			<view class="infoDescribe">
				<view>描述</view>
				<view class="infoText" v-if="!bianjishow">{{itemInfo.remark}}</view>
				<textarea placeholder="请输入项目描述(不超过三十字)" class="fontInp" v-else v-model="ItemDescribe"></textarea>
			</view>
		</view>
		<!--项目位置-->
		<view>
			<u-picker mode="region" v-model="regionshow" @confirm="regiConfirm" ></u-picker>
		</view>

		<!--编辑-->
		<view class="complie" @click="complieFun(false)" v-if="!bianjishow">
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
				code:"",
				area:"",
				city:"",
				province:"",
				cstyinp:"",
				regionshow:false,//项目位置
				ItemName: "", //项目名称
				ItemDescribe: "", //项目描述
				bianjishow: false,
				roleListShow: false,
				itemInfo: {},
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
				tabbarList:[{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '设备列表',
					customIcon: false,
					page:"/pages/eqlistItem/index",
					pagePath:"/pages/eqlistItem/index"
				}, {
					iconPath: "list",
					selectedIconPath: "list-dot",
					text: '参数设置',
					customIcon: false,
					page:"/pages/parameterSetting/index",
					pagePath:"/pages/parameterSetting/index"
				},{
					iconPath: "file-text",
					selectedIconPath: "file-text-fill",
					text: '项目信息',
					isDot: false,
					customIcon: false,
					page:"/pages/ItemInfoPage/index",
					pagePath:"/pages/ItemInfoPage/index"
				} ],
			}
		},
		methods: {
			toTime(time) {
				//let date = new Date(1606728108489);
				var now = new Date(time),
					y = now.getFullYear(),
					m = now.getMonth() + 1,
					d = now.getDate();
				return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0,
					8);
			},
			//底部点击跳转页面
			tabListBtn(e) {
				let url = this.tabbarList[e];
				uni.redirectTo({
					url: url.page
				})
			},
			changPermis(index) { //选择项目成员权限
				this.roleListShow = true;
			},
			Roelconfirm(e) {
				this.$showToast("选择了" + e[0].label)
			},
			complieFun(bol) {
				if (bol) {
					if (this.ItemName == "") {
						this.$showToast("请输入项目名称");
						return
					} else if (this.ItemDescribe.length > 30) {
						this.$showToast("项目描述内容不能超过三十字");
						return
					}
					let data={
						userId:uni.getStorageSync("userId"),
						name:this.ItemName,
						province:this.province,
						city:this.city,
						district:this.area,
						remark:this.ItemDescribe,
						code:this.code,
						product:2,
						itemId:uni.getStorageSync("itemId"),
					}
					this.$request({
						url:this.$urls.url.ListIM.updateItemInfo,
						data,
						method:"POST",
						success:res=>{
							if(res.code==10000){
								this.$showToast(res.msg);
								this.getItemInfo();
							}else{
								this.$showToast(res.msg);
							}
						}
					})
					
					this.bianjishow = !this.bianjishow
				} else {
					this.bianjishow = !this.bianjishow
				}
			},
			getItemInfo() {
				let id = uni.getStorageSync("itemId")
				let data = {
					id
				};
				this.$request({
					url: this.$urls.url.ListIM.getItemInfo + `?id=${id}`,
					data,
					method: "GET",
					success: res => {
						if (res.data) {
							this.itemInfo = res.data;
						}
						console.log(res);
					}
				})
			},
			//跳转项目成员
			toItemUser() {
				uni.navigateTo({
					url: "/pages/itemUser/index"
				})
			},

			//跳转至添加成员页面
			toAdditemUser() {
				uni.navigateTo({
					url: "/pages/addItemUser/index"
				})
			},
			regiConfirm(e){
				this.cstyinp=e.province.label+e.city.label+e.area.label;
				this.city=e.city.label;
				this.province=e.province.label;
				this.area=e.area.label;
				this.code=e.area.value;
			}
		},
		onLoad() {
			this.getItemInfo(); //获取项目信息
		}
	}
</script>

<style>
	@import "./index.css";
</style>
