
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/changePwds/index","pages/user/index","pages/ListItem/index","pages/eqlistItem/index","pages/addPreject/index","pages/userList/index","pages/addUser/index","pages/addequipments/index","pages/searchEquip/index","pages/parameterSetting/index","pages/waringEqList/index","pages/ItemInfoPage/index","pages/addItemUser/index","pages/itemUser/index","pages/LEDequimentDetail/index","pages/AddLampequmipent/index","pages/EquipimentParams/index","pages/historicalData/index","pages/addParamsDetail/index","pages/choiceEquipment/index","pages/broadcastDetail/index","pages/monitoring/monitoring","pages/environmentDetail/environmentDetail","pages/weatherHistory/weatherHistory","pages/screenDetail/screenDetail","pages/ProgramManagement/ProgramManagement","pages/MediaLibrary/MediaLibrary","uview-ui/components/u-avatar-cropper/u-avatar-cropper","pages/gatewayDetail/gatewayDetail","pages/broadcaStMedia/broadcaStMedia","pages/scheduledTask/scheduledTask","pages/onClickCallDetail/onClickCallDetail","pages/AlarmRecord/AlarmRecord"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"能加","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"black","fontSize":"24rpx","selectedColor":"#007aff","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbar/Home.png","selectedIconPath":"static/tabbar/xuanzhong.png"},{"pagePath":"pages/ListItem/index","text":"项目列表","iconPath":"static/tabbar/Document.png","selectedIconPath":"static/tabbar/Documentyx.png"},{"pagePath":"pages/user/index","text":"个人中心","selectedIconPath":"static/tabbar/Profilexuanzhong.png","iconPath":"static/tabbar/Profile.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Net Join","compilerVersion":"3.2.9","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/changePwds/index","meta":{},"window":{"backgroundTextStyle":"light","scrollIndicator":"none","titleNView":{"titleText":"修改密码","backgroundColor":"#007aff","titleColor":"white"}}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","fontSize":"12rpx","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/ListItem/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"项目列表","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/eqlistItem/index","meta":{},"window":{"navigationBarTitleText":"设备列表","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/addPreject/index","meta":{},"window":{"navigationBarTitleText":"添加项目","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/userList/index","meta":{},"window":{"navigationBarTitleText":"下级用户","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/addUser/index","meta":{},"window":{"navigationBarTitleText":"添加用户","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/addequipments/index","meta":{},"window":{"navigationBarTitleText":"添加设备","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/searchEquip/index","meta":{},"window":{"navigationBarTitleText":"搜索设备","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/parameterSetting/index","meta":{},"window":{"navigationBarTitleText":"参数设置","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/waringEqList/index","meta":{},"window":{"navigationBarTitleText":"告警信息","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/ItemInfoPage/index","meta":{},"window":{"navigationBarTitleText":"项目信息","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/addItemUser/index","meta":{},"window":{"navigationBarTitleText":"添加项目成员","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/itemUser/index","meta":{},"window":{"navigationBarTitleText":"项目成员","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/LEDequimentDetail/index","meta":{},"window":{"navigationBarTitleText":"灯杆信息","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/AddLampequmipent/index","meta":{},"window":{"navigationBarTitleText":"添加设备","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/EquipimentParams/index","meta":{},"window":{"navigationBarTitleText":"设备参数","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/historicalData/index","meta":{},"window":{"navigationBarTitleText":"历史数据","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/addParamsDetail/index","meta":{},"window":{"navigationBarTitleText":"添加参数","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/choiceEquipment/index","meta":{},"window":{"navigationBarTitleText":"选择设备","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/broadcastDetail/index","meta":{},"window":{"navigationBarTitleText":"广播详情","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/monitoring/monitoring","meta":{},"window":{"navigationBarTitleText":"监控","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","backgroundTextStyle":"dark"}},{"path":"/pages/environmentDetail/environmentDetail","meta":{},"window":{"navigationBarTitleText":"智慧天气","enablePullDownRefresh":true,"navigationBarTextStyle":"black","navigationBarBackgroundColor":"white","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/weatherHistory/weatherHistory","meta":{},"window":{"navigationBarTitleText":"图表统计","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/screenDetail/screenDetail","meta":{},"window":{"navigationBarTitleText":"屏幕详情","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/ProgramManagement/ProgramManagement","meta":{},"window":{"navigationBarTitleText":"节目管理","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/MediaLibrary/MediaLibrary","meta":{},"window":{"navigationBarTitleText":"媒体库","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/uview-ui/components/u-avatar-cropper/u-avatar-cropper","meta":{},"window":{"navigationBarTitleText":"媒体选择","navigationBarBackgroundColor":"#000000"}},{"path":"/pages/gatewayDetail/gatewayDetail","meta":{},"window":{"navigationBarTitleText":"网关详情","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/broadcaStMedia/broadcaStMedia","meta":{},"window":{"navigationBarTitleText":"音频列表","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/scheduledTask/scheduledTask","meta":{},"window":{"navigationBarTitleText":"计划任务","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/onClickCallDetail/onClickCallDetail","meta":{},"window":{"navigationBarTitleText":"告警详情","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}},{"path":"/pages/AlarmRecord/AlarmRecord","meta":{},"window":{"navigationBarTitleText":"报警记录","enablePullDownRefresh":true,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#007AFF","pullToRefresh":{"color":"#007AFF"}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
