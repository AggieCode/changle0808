export default function(params){
	let header = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    // "userId": uni.getStorageSync("userId")
  }
  const base_url = 'https://iot.xmnengjia.com';
  //https://warn.ludeng-yun.com 平台
  const item_url="https://warn.ludeng-yun.com";

  if(params.url.includes(item_url)){
	  if(uni.getStorageSync('token')){
	  	header.token = uni.getStorageSync('token');
	  }
  }else{
	  header.userId=uni.getStorageSync("userId");
  }
	// if(uni.getStorageSync('token')){
	// 	//header.token = uni.getStorageSync('token');
	// }
	if(params.header){
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
			console.log(params, res)
			switch(res.statusCode){
				case 200:
					params.success && params.success(res.data);
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
