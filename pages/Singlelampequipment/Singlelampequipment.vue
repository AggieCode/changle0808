<template>
	<view>
		<view class="SingItem">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">设备统计</view>
			</view>
			<view :class="{'list-item':true,'borderBox':item==1}" @click="switchBtn(1)">
				<image src="../../static/deng.png" class="list-icon"></image>
				<view>灯杆总数</view>
				<view class="list-msg">27<text class="list-danwei">个</text></view>
			</view>
			<view :class="{'list-item':true,'borderBox':item==2}" @click="switchBtn(2)">
				<image src="../../static/ziaxian.png" class="list-icon"></image>
				<view>在线数</view>
				<view class="list-msg">27<text class="list-danwei">个</text></view>
			</view>
			<view :class="{'list-item':true,'borderBox':item==3}" @click="switchBtn(3)">
				<image src="../../static/lixian.png" class="list-icon"></image>
				<view>离线数</view>
				<view class="list-msg5">27<text class="list-danwei">个</text></view>
			</view>
			<view :class="{'list-item':true,'borderBox':item==4}" @click="switchBtn(4)">
				<image src="../../static/danbideng.png" class="list-icon"></image>
				<view>单臂灯</view>
				<view class="list-msg3">27<text class="list-danwei">个</text></view>
			</view>
			<view :class="{'list-item':true,'borderBox':item==5}" @click="switchBtn(5)">
				<image src="../../static/shaungbideng.png" class="list-icon"></image>
				<view>双臂灯</view>
				<view class="list-msg4">27<text class="list-danwei">个</text></view>
			</view>
			<view :class="{'list-item':true,'borderBox':item==6}" @click="switchBtn(6)">
				<image src="../../static/sanbideng.png" class="list-icon"></image>
				<view>三臂灯</view>
				<view class="list-msg2">27<text class="list-danwei">个</text></view>
			</view>
		</view>
		<view class="led-from">
			<view class="titx">
				<view class="colrsBox"></view>
				<view class="titleBx">设备信息</view>
			</view>
			<view class="let-fromList">
				<uni-table border stripe emptyText="暂无更多数据" >
				    <!-- 表头行 -->
				    <uni-tr>
				        <uni-th align="center">日期</uni-th>
				        <uni-th align="center">姓名</uni-th>
				        <uni-th align="left">地址</uni-th>
				    </uni-tr>
				    <!-- 表格数据行 -->
				    <uni-tr>
				        <uni-td>2020-10-20</uni-td>
				        <uni-td>Jeson</uni-td>
				        <uni-td>北京市海淀区</uni-td>
				    </uni-tr>
				    <uni-tr>
				        <uni-td>2020-10-21</uni-td>
				        <uni-td>HanMeiMei</uni-td>
				        <uni-td>北京市海淀区</uni-td>
				    </uni-tr>
				    <uni-tr>
				        <uni-td>2020-10-22</uni-td>
				        <uni-td>LiLei</uni-td>
				        <uni-td>北京市海淀区</uni-td>
				    </uni-tr>
				    <uni-tr>
				        <uni-td>2020-10-23</uni-td>
				        <uni-td>Danner</uni-td>
				        <uni-td>北京市海淀区</uni-td>
				    </uni-tr>
				
				</uni-table>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: 1,
			}
		},
		methods: {
			switchBtn(index) {
				console.log(index);
				this.item = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.css"
</style>
