/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {date}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 * 		date('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11 
 *		date('Y-m-d H:i:s','1350052653');//得到的结果是2012-10-12 22:37:33
 */
export function dateFormatFn(date,format='YYYY-MM-DD HH:mm:ss'){
	date=new Date(date);
　　let config = {
　　　　YYYY:date.getFullYear(),
　　　　MM:date.getMonth()+1 >10?date.getMonth()+1:'0'+(date.getMonth()+1),
　　　　DD:date.getDate(),
　　　　HH:date.getHours()>10?date.getHours():'0'+(date.getHours()),
　　　　mm:date.getMinutes(),
　　　　ss:date.getSeconds()
　　}
　　for(const key in config){
　　　　format = format.replace(key,config[key])
　　}
　　return format
}
