import { formatTime } from "../util/tools.js"
export const mixin={
	data(){
		return{
			eqItem:uni.getStorageSync("led_id")
		}
	},
	methods:{
		onitMb(size) {
			//截取大小
			size = size / 1024 / 1024;
			size = size.toFixed(2)
			return size
		},
		//时间戳转换
		timepToupdate_time(date) {//yy-mm-dd
			let time = formatTime(date).substr(0, 10);
			return time;
		},
		//时间戳转换
		timepToupdate_info(date) {//yy-mm-dd hh:mm:ss
			let time = formatTime(date);
			return time;
		},
		 superPromis(url,data,method="POST"){//单组件请求封装
			 let that=this;
			 return new Promise((resolve,reject)=>{
				 that.$request({
					 url,data,method,
					 success:res=>{
						 uni.hideLoading();
						 if(res.code==10000){
							 resolve(res);
						 }
					 }
				 })
			 })
		 }
	},
	//监听下拉刷新
	onPullDownRefresh() {
		this.getEqupementParm();
	}
}