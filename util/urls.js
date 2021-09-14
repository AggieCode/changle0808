const base_url = 'https://iot.xmnengjia.com';
const url = {
	login: {//登录请求接口
		login:base_url+ '/api/user/login/',
	},
	changePassword:base_url+"/api/user/changePassword",
	prejectUrl:base_url+"/api/item/findPage",
}

export default {
	base_url,
	url
}
