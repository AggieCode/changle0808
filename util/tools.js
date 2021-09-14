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

export {
	showToast,
	throttle
}