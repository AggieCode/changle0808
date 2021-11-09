export default function(params) {
	let header = {
		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		// "userId": uni.getStorageSync("userId")
	}
	const base_url = 'https://iot.xmnengjia.com';
	//https://warn.ludeng-yun.com 平台
	const item_url = "https://warn.ludeng-yun.com";

	if (params.url.includes(item_url)) {
		if (uni.getStorageSync('token')) {
			header.token = uni.getStorageSync('token');
		}
	} else {
		header.userId = uni.getStorageSync("userId");
	}
	// if(uni.getStorageSync('token')){
	// 	//header.token = uni.getStorageSync('token');
	// }
	if (params.header) {
		header = {
			...header,
			...params.header
		}
	}
	uni.request({
		url: params.url,
		data: params.data,
		header: header,
		method: params.method,
		timeout: params.timeout,
		success: res => {
			if (res.data.code == 10002) {
				uni.showToast({
					icon: "none",
					title: "账号在其他地方登录，请重新登录"
				})
			}
			switch (res.statusCode) {
				case 200:
					params.success && params.success(res.data);
					break;
				case 0:
					uni.showToast({
						title: "登录过期，请重新登录"
					})
					break;
				case 500:
					uni.showToast({
						icon:"none",
						title: "请求异常"
					})
					break;
				default:
					params.fail && params.fail(res);
			}
		},
		fail: err => {

			console.log('fail', params, err)
			params.fail && params.fail(err);
		}
	})
}
