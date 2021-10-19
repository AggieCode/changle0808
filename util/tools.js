const showToast = function(title, icon = 'none', mask = false, duration = 2000){
	uni.showToast({
		title,
		icon,
		mask,
		duration
	})
}

/**
 * 节流
 * @param {*} callback 
 * @param {*} wait 
 * @returns 
 */
const throttle = function(callback, wait){
  let timer = 0;
  return () => {
    let now = new Date().getTime();
    if (now - timer > wait) { // 对比时间差，如果大于时间差就可执行
       callback();
       timer = now; // 再把上次时间替换为本次时间
    }
  }
}
//将时间戳转换成时间
function add0(m) { return m < 10 ? '0' + m : m }
function formatTime(sjc){
  var time = new Date(sjc);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

/*
  指定时间 和 指定天数 加减
*/
function disTime(data,days,type){
  var data = new Date(data);
  if(type == "add"){
    data.setDate(data.getDate() + days);
  }else{
    data.setDate(data.getDate() - days);
  }
  var month = data.getMonth() + 1;
  var day = data.getDate();
  var year = data.getFullYear();
  return `${year}-${add0(month)}-${add0(day)}`;
}
import {dateFormatFn} from "./timestamp.js"
export {
	showToast,
	throttle,
	dateFormatFn,
	add0,
	formatTime,
	disTime
}