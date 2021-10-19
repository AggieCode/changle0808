const base_url = 'https://iot.xmnengjia.com';
//https://warn.ludeng-yun.com/item/itemList  平台
const item_url = "https://warn.ludeng-yun.com";
const url = { //市电小程序
	login: { //登录请求接口
		// login:base_url+ '/user/login',
		login: base_url + '/api/user/login',
	},
	changePassword: base_url + "/api/user/changePassword",
	prejectUrl: base_url + "/item/itemList",
	eqItem: { //led
		moduleList: base_url + "/module/moduleList",
		//kight: base_url + "/light/adjust", //调节亮度，开关灯
		getEquipmentList: base_url + "/api/equipment/getEquipmentList",
		addEquipment: base_url + "/api/equipment/addEquipment",
		getEquipmentStatus: base_url + "/api/equipment/getEquipmentStatus", //设备详情
		addWifi: base_url + "/wifi/addDevice", //wifi绑定
		detectionEquipment: base_url + "/api/equipment/detectionEquipment", //调节亮都，开关灯
		setEqName: base_url + "/api/equipment/modifyEquipmentName", //修改设备名称
		setEqRemark: base_url + "/api/equipment/addComment", //修改设备备注
		getEquipmentPar:base_url+"/api/equipment/getEquipmentPar",//获取设备参数定时任务
		getEquipmentHistory:base_url+"/api/equipment/getEquipmentHistory",//获取设备历史记录
		getDataHis:base_url+"/api/webEquipment/dataHis",//最近亮灯时长
		
	},
	ListIM: { //项目
		// deletItem: base_url + "/item/delItem", //删除项目
		deletItem: base_url + "/api/item/delItem", //删除项目
		// addItem: base_url + "/item/addItem",
		addItem: base_url + "/api/item/addItem",
		getItem: base_url + "/api/item/getItem",
		getItemInfo: base_url + "/api/item/getItemInfo",
		getItemUser: base_url + "/api/item/showMembers",
		deletItemUser: base_url + "/api/item/deleteMember", //删除项目成员
		addItemUser: base_url + "/api/item/addMember", //添加项目成员
		updateItemInfo: base_url + "/api/item/updateItemInfo", //修改项目名称
	},
	pinmu: { //屏幕列表
		pinLis: base_url + "/led/getAllLed",

	},
	audio: { //音频广播
		audioList: base_url + "/audio/audioList",
		mediaData: base_url + "/audio/getMediaData", //媒体库查询
	},
	monitor: { //监控设备
		monitorLis: base_url + "	/monitor/monitorList", //监控列表
	},
	environ: { //天气列表
		environLis: base_url + "/environ/environList",
	},
	sos: { //一键报警"
		sosList: base_url + "/sos/findSosList",
	},
	user:{//下级用户
		getUserLis:base_url+"/api/user/findAllSubordinateStaff",//下级用户
		addUser:base_url+"/api/user/addUser",//添加下级用户
		deleteUser:base_url+"/api/user/deleteUser",//删除下级用户
		
	}
}



const platformUrl = { //智慧灯杆
	monitor: { //监控
		monitorList: item_url + "/monitor/monitorList", //监控列表
		addMonitor: item_url + "/monitor/addMonitor", //添加监控
		delMonitor: item_url + "/monitor/delMonitor'", //删除监控
		addEzvizInfo: item_url + "/monitor/addEzvizInfo", //注册萤石云
		ptzContrl: item_url + "/monitor/ptzContrl", //控制
		deviceCapture: item_url + "/monitor/deviceCapture"

	},
	login: {
		login: item_url + "/user/login",
		test: "https://47.107.242.199:8088/"
	},
	item: { //项目列表
		itemList: item_url + "/item/itemList", //列表
		addItem: item_url + "/item/addItem", //添加
		delItem: item_url + '/item/delItem', //删除
	},
	light: {
		lightList: item_url + '/module/moduleList', //灯列表
		addModule: item_url + '/module/addModule', //添加灯
		delModule: item_url + '/module/delModule', //删除灯
		deviceBind: item_url + '/module/deviceBind', //绑定相关
		bindInfo: item_url + '/module/bindInfo', //查看绑定信息
		adjust: item_url + '/light/adjust', //调光
		turnOn: item_url + '/light/turnon', //开关灯
		addParam: item_url + '/light/param', //参数下发
		moduleCondition: '/module/moduleCondition', //一级大屏设备海量点
	},
	Screen: { //屏幕
		getScreenList: item_url + '/led/getAllLed', //屏幕列表
		addLed: item_url + '/led/addLed', //添加屏幕
		delLed: item_url + '/led/delLed', //删除屏幕
		setVolume: item_url + '/led/setVolume', // 设置音量
		setBrightness: item_url + '/led/setBrightness', //设置亮度
		setScreenOpen: item_url + '/led/setScreenOpen', //开关屏幕
		getSources: item_url + '/led/getSources', //媒体库列表
		delSources: item_url + '/led/delSources', //删除媒体资源
		getAllProgram: item_url + '/led/getAllProgram', //节目列表
		addProgram: item_url + '/led/addProgram', //添加节目
		delProgram: item_url + '/led/delProgram', //删除节目
		onRelease: item_url + '/led/onRelease', //下发节目
		setTimedScreening: item_url + '/led/setTimedScreening', //设置定时任务
		getTimedScreening: item_url + '/led/getTimedScreening', //查询定时任务
	},
	environ: { //环境监测
		environStatus: item_url +'/environ/environStatus', // 获取单个环境传感器数据
		updateEnviron: item_url+ '/environ/updateEnviron', // 更新环境传感器数据
		environList: item_url +'/environ/environList', //获取环境传感器列表
		addEnviron: item_url +'/environ/addEnviron', //添加
		delEnviron: item_url +'/environ/delEnviron', //删除
		bindLight: item_url +'environ/bindLight', //绑定路灯
	},
	broadcast: { //广播列表
		audioList: item_url +'/audio/audioList', //广播列表
		addAudio: item_url+ '/audio/addAudio', //添加广播
		delAudio: item_url+ '/audio/delAudio', //删除广播
		setTervolume: item_url +'/audio/setTervolume', //设置音量
		getMediaData: item_url+ '/audio/getMediaData', //媒体库资源
		delMediaData: item_url+ '/audio/delMediaData', //删除媒体资源
		getTaskData: item_url+ '/audio/getTaskData', //获取任务
		addTaskInfo: item_url +'/audio/addTaskInfo', //添加任务
		exetaskEnable: item_url +'/audio/exetaskEnable', //启用/禁用任务
		exetaskCmd: item_url +'/audio/exetaskCmd', //运行、暂停、删除广播任务
		getMediaPath: item_url+ '/audio/getMediaPath', //获取媒体文件真实路径
		exeRealPlayFile: item_url +'/audio/exeRealPlayFile' //测试播放
	},
	oneClickCall: { //一键报警
		findSosList: item_url +'/sos/findSosList',
		delSos: item_url+ '/sos/delSos',
		addSos: item_url +'/sos/addSos',
		editSos: item_url+ '/sos/editSos'
	},
	big: { //大屏数据
		getMontior: item_url +'/monitor/monitorStatus', // 获取监控
		getLight: item_url +'/module/moduleStatus', // 获取智慧路灯
		getAudion: item_url +'/audio/audioStatus', // 获取音响
		getLed: item_url+ '/led/getLed', //获取led屏幕
		getWeather: item_url+ '/module/weather',

		// 一级大屏
		deviceWarn: item_url +'/statistics/deviceWarn', //告警列表
		deviceStatistics: item_url+ '/statistics/deviceStatistics', //设备数量相关信息
		energyConsumptionStatistics: item_url+ '/statistics/energyConsumptionStatistics', //市电所有设备近六个月的耗能统计
	},


}
export default {
	base_url,
	url
}
