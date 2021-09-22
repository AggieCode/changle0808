<template>
	<view>
		<!-- <view class="searchBox">
			<u-search placeholder="请输入项目名称" action-text="添加" :clearabled="true" :disabled="false" @custom="custom">
			</u-search>
		</view> -->
		<view class="eq-tool">
			<view class="left">
				<view class='left-item' @click='sxClick'>
					<image v-if="sxPanel" class='icon' src='../../static/eqlist/selesx.png'></image>
					<image v-else class='icon' src='../../static/eqlist/shaixuanwx.png'></image>
					<text :class='{"toolActive":sxPanel}'>筛选</text> 
				</view>
				<view class='left-item' @click='allClick'>
					 <image v-if="allDis" class='icon' src='../../static/eqlist/piliangxuanzhong.png'></image>
				      <image v-else class='icon' src='../../static/eqlist/piliangweix.png'></image>
				      <text :class='{"toolActive":allDis}'>批量</text>
				</view>
			</view>
			  <view class='right'>
			    <!-- <view class='search'>
			      <input type='text' value='{{keyword}}' bindinput='searchKey'></input>
			      <view wx:if="{{isClear}}" class='search-clear' bindtap='clearVal'>
			        <image class='clear' src='/static/img/clear.png'></image>
			      </view>
			    </view> -->
			    <view class='tianqi' v-if="weather">
			      <image if="weather.icon" class='icon' src='../../static/sunny.png'></image>
			      <text style='margin-left:10rpx'>晴</text>
			      <text style='margin-left:10rpx'>22℃</text>
			      <text style='margin-left:10rpx'>乌鲁木齐</text>
			    </view>
			    <image catchtap='searchEq' class='icon' src='../../static/sb_search.png'></image>
			    <image catchtap='goAddEq' class='icon' src='../../static/sb_add.png'></image>
			  </view>
		</view>
		<view>
			<!-- <u-tabs-swiper ref="tabs" :current="disMsg" :list="list" :is-scroll="true" bar-height="6" bar-width="40"
				active-color="#2979ff" @change="Clickchange"></u-tabs-swiper> -->
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="Clickchange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<view style="height: 1500rpx;">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 100%">
				<swiper-item >
					<!--led列表-->
					<scroll-view scroll-y="true"
						style="width: 95%;height: 100%; margin: 0rpx auto 0; padding: 20rpx 10rpx;box-sizing: border-box;"
						@scrolltolower="onreachBottom">
						<view class="eq-list">
							<view class="left"><image src="../../static/eqlist/LED.png" class="IDicon"></image>杀虫灯</view>
							<view class="right">
								<image class="icon-cd" src="../../static/eqlist/chongdian.png"></image>
								<image class="icon-cd" src="../../static/eqlist/WIFI.png"></image>
								<image class="icon-cd" src="../../static/eqlist/dianliang.png"></image>
								<text style="margin-left: 5rpx;">100%</text>
							</view>
						</view>
						<view class="eq-list">
							<view class="left"><image src="../../static/eqlist/LED.png" class="IDicon"></image>杀虫灯</view>
							<view class="right">
								<image class="icon-cd" src="../../static/eqlist/chongdian.png"></image>
								<image class="icon-cd" src="../../static/eqlist/WIFI.png"></image>
								<image class="icon-cd" src="../../static/eqlist/dianliang.png"></image>
								<text style="margin-left: 5rpx;">100%</text>
							</view>
						</view>
						<view class="eq-list">
							<view class="left"><image src="../../static/eqlist/LED.png" class="IDicon"></image>杀虫灯</view>
							<view class="right">
								<image class="icon-cd" src="../../static/eqlist/chongdian.png"></image>
								<image class="icon-cd" src="../../static/eqlist/WIFI.png"></image>
								<image class="icon-cd" src="../../static/eqlist/dianliang.png"></image>
								<text style="margin-left: 5rpx;">100%</text>
							</view>
						</view>
						
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y
						style="height: 900rpx;width: 90%; margin: 0rpx auto 0; padding: 20rpx 10rpx;box-sizing: border-box;"
						@scrolltolower="onreachBottom">
					</scroll-view>
				</swiper-item>
				
				
				
				<swiper-item class="swiper-item">
					<scroll-view scroll-y
						style="height: 900rpx;width: 90%; margin: 0rpx auto 0; padding: 20rpx 10rpx;box-sizing: border-box;"
						@scrolltolower="onreachBottom">
						广播列表
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y
						style="height: 900rpx;width: 90%; margin: 0rpx auto 0; padding: 20rpx 10rpx;box-sizing: border-box;"
						@scrolltolower="onreachBottom">
						监控列表
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y
						style="height: 900rpx;width: 90%; margin: 0rpx auto 0; padding: 20rpx 10rpx;box-sizing: border-box;"
						@scrolltolower="onreachBottom">
						智慧天气
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y
						style="height: 900rpx;width: 90%; margin: 0rpx auto 0; padding: 20rpx 10rpx;box-sizing: border-box;"
						@scrolltolower="onreachBottom">
						报警
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>





	</view>
</template>

<script>
	export default {
		data() {
			return {
				weather:true,//天气
				sxPanel: false,
				allDis:false,
				disMsg: "0",
				list: [{
					name: 'led列表'
				}, {
					name: '屏幕列表',
				}, {
					name: '广播列表'
				}, {
					name: '监控列表'
				}, {
					name: '智慧天气'
				}, {
					name: '一键报警'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			custom() {
				console.log("搜索")
			},
			//点击筛选
			sxClick() {
				this.sxPanel=!this.sxPanel;
			},
			allClick() {//批量操作
				this.allDis=!this.allDis;
			},
			//点击tab标签

			Clickchange(e) {
				console.log(e);
				this.disMsg = e;
				this.swiperCurrent = e;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			}
		}
	}
</script>

<style lang="scss">
	@import './index.css';

	.searchBox {
		height: 100rpx;
		margin: 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.eqlit-item {
		width: 700rpx;
		height: 500rpx;
		margin: 20rpx auto 0;
		border-radius: 10rpx;
		border: 1px solid red;
		position: relative;
	}
	
</style>
