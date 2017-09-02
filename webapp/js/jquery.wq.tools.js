/**
 * jQuery 插件 本插件要依赖jQuery
 */
jQuery.extend({
	/**
	 * 验证字符串是否是中文
	 * @param {} source
	 * @return {Boolean}如果是中文返回true,否则返回false
	 */
	isChines:function(source){
		var regex = /^[\u4E00-\u9FA5]/;
		return regex.test(source);
	},
	/**
	 * 验证身份证号是否正确
	 * @param {} card
	 * @return {String} 如果验证成功返回"success"
	 */
	isCardNo:function(card){
		var len = card.length;
		if(len<15 || len>18){     
			return "请输入长度为15位或18位的身份证号码！";
		}
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
		var res = reg.test(card);
		if(!res){
			return "输入的身份证号格式不正确！";
		}
		return "success";
	},
	/**
	 * 验证字符串是否为空或空串或undefined
	 * @param {} source
	 * @return {Boolean} 如果为空，空串，undefined则返回true；否则返回false
	 */
	isEmpty:function(source){		
		if(source==null || typeof(source)=="undefined" || source=="" || source.toLowerCase()=="null"){
			return true;
		}
		return false;
	},
	/**
	 * 验证是否为电话号码（座机）；格式为：区号-号码或区号号码；如：023-65356830/02365356830
	 * @param {} phone
	 * @return {Boolean} 验证成功返回true；否则返回false
	 */
	isTelephone:function(phone){
		var regex = /^0\d{2,3}-?\d{7,8}$/;
		return regex.test(phone);
	},
	/**
	 * 验证是否为手机号码（移动手机）
	 * @param {} mobilePhone
	 * @return {Boolean} 验证成功返回true；否则返回false
	 */
	isMobilePhone:function(mobilePhone){
		var regex = /^1\d{10}$/;
		return regex.test(mobilePhone);
	},
	/**
	 * 验证是否为电子邮箱
	 * @param {} email
	 * @return {Boolean} 验证成功返回true；否则返回false
	 */
	isEmail:function(email){
		if(email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
			return true;
		}else{	   
			return false;
		}
	},
	/**
	 * 验证是否为邮编
	 * @param {} source
	 * @return {Boolean} 验证成功返回true；否则返回false
	 */
	isZip:function(source){
		var regex=/^[1-9]\d{5}$/;
		return regex.test(source);
	},
	/**
	 * 生成指定位数的随机整数
	 * @param {} count
	 * @return {String}
	 */
	getRandomNum:function(count){
		var arr = new Array;
		var reNum = "";
		for(var i=0;i<count;i++){
			arr[i] = parseInt(Math.random()*10);
			reNum += String(arr[i]);
		}
		return reNum;
	},
	/**
	 * 产生某个区间的随机数
	 * @param {} min
	 * @param {} max
	 * @return {Integer}
	 */
	random:function(min,max){
		return Math.floor(min+Math.random()*(max-min));
	},
	/**
	 * 产生一个UUID
	 * @return {}
	 */
	makeUUID:function(){
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};    
		return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
	},
	/**
	 * 得到文件的扩展名
	 * @param {} filename
	 * @return {String}
	 */
	getFileExt:function(filename){
		var d=/\.[^\.]+$/.exec(filename);
		var ext = new String(d);  
		var s = ext.toLowerCase();
		return s;
	},
	/**
	 * 得到项目的基地址
	 * @return {String}
	 */
	getContextPath:function(){
		var paths = $("base").attr("href");
		if(!$.isEmpty(paths)){
			return paths;
		}
		var strFullPath = window.document.location.href;
		var strPath = window.document.location.pathname;
		var pos = strFullPath.indexOf(strPath);
		var prePath = strFullPath.substring(0, pos);		
		var path = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);	
		return path;
	},
	/**
	 * 创建iframe框架
	 * @param {String} url
	 * @return {String}
	 */
	createFrame:function(url){		
		if(url.indexOf("http://")<0 && url.indexOf("HTTP://")<0){
			url = $.getContextPath()+""+url;
		}			
		var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';	
		return s;
	},
	/**
	 *  对字符串进行编码
	 * @param {String} source
	 * @return {String}
	 */
	strEncode:function(source){
		return encodeURIComponent(source); 
	},

	/**
	 * 字符串解码
	 * @param {String} source
	 * @return {String}
	 */
	strDencode:function(source){
		return decodeURIComponent(source);
	},
	/**
	 * 字符串转int形
	 * @param {String} source
	 * @return {Number}
	 */
	strParseInt:function(source){
		if($.isEmpty(source) || isNaN(source)){
			return 0;
		}
		return parseInt(source); 
	},
	/**
	 * 字符串转Float形
	 * @param {String} source
	 * @return {Number}
	 */
	strParseFloat:function(source){	
		if($.isEmpty(source) || isNaN(source)){
			return 0;
		}
		return parseFloat(source);
	},

	/**
	 * 判断包含关系
	 * @param {String} source 原始字符串
	 * @param {String} substr 子字符串
	 * @param {Boolean} isIgnoreCase 忽略大小写
	 * @return {Boolean}
	 */
	jsContains:function(source,substr,isIgnoreCase){
		if(isIgnoreCase){
			source=source.toLowerCase();
			substr=substr.toLowerCase();
		}
		var startChar=substr.substring(0,1);
		var strLen=substr.length;
		for(var j=0;j<source.length-strLen+1;j++){
			if(source.charAt(j)==startChar){////如果匹配起始字符,开始查找
				if(source.substring(j,j+strLen)==substr){//如果从j开始的字符与str匹配，那ok
					return true;
				}
			}
		}
		return false;
	},
	/**
	 * 校验时间格式
	 * @param {String} time
	 * @return {Boolean}
	 */
	checkTime:function(time){
		var regex = /^(([0-1][0-9])|([2][0-4]))(\:)[0-5][0-9](\:)[0-5][0-9]$/g;
		var b = regex.test(timevale);
		return b;
	},
	/**
	 * 校验Ip地址格式
	 * @param {String} ipvale
	 * @return {Boolean}
	 */
	checkIp:function(ipvale) {
		var regex = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
		var b = regex.test(ipvale);
		return b;
	},
	/**
	 * 是否是由字母或数字组成的字符串
	 * @param {String} letVale
	 * @return {Boolean}
	 */
	checkLetOrNum:function(letVale) {
		var regex = /^([a-zA-Z_]{1})([\w]*)$/g;
		var b = regex.test(letVale);
		return b;
	},
	/**
	 * 检查字符串中beindex位置到endindex位置之间是否全由targer组成
	 * @param {} source
	 * @param {} beindex
	 * @param {} endindex
	 * @param {} targer
	 * @return {}
	 */
	checkAllStr:function(source,beindex,endindex,targer){
		var flag = false;
		for (var i = beindex; i <= endindex; i++) {
			var temp = source.charAt(i);
			if (targer == temp) {
				flag = true;
			}
		}
		return flag;
	},
	/**
	 * 判断两个字符串是否想等 相等返回true否则返回false
	 * @param {} source
	 * @param {} target
	 * @return {Boolean}
	 */
	decideString:function(source, target){
		return (source == target) ? true : false;
	},
	/**
	 * 将字符串转换成数字
	 * @param {} val
	 * @return {}
	 */
	stringToNumber:function(val){
		if(isNaN(val)){
			return 0;
		}
		return Number(val);
	},
	/**
	 * 判断指定名称的复选框是否被选中
	 * @param {} chname 复选框名称
	 * @return {Boolean}
	 */
	chkCheckCha:function(chname){
		var obj = $("[name='" + chname + "']");
		var isCheck = false;
		for(var i = 0; i < obj.length; i++){
			if(obj[i].checked){
				isCheck = true;
				break;
			}
		}
		return isCheck;
	},
	/**
	 * 得到指定名称的复选框被选中个数
	 * @param {} chname 复选框名称
	 * @return {Number}
	 */
	getCheckCount:function(chname){
		var obj = $("[name='" + chname + "']");
		var count = 0;
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].checked) {
				count++;
			}
		}
		return count;
	},
	/**
	 * 得到多个复选框的值并以@分隔开
	 * @param {} chname 复选框名称
	 * @return {String}
	 */
	getCheckVals:function(chname){
		var str = "";	  
		var obj = $("[name='" + chname + "']");
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].checked) {
				str += obj[i].value+ "@";
			}
		}
		return str.substring(0, str.length - 1);
	},
	getCheckValArrays:function(chname){	   
		var ids = new Array();
		var obj = $("[name='" + chname + "']");
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].checked) {
				ids.push(obj[i].value);
			}
		}		 
		return ids;
	},
	/**
	 * 复选框全选
	 * @param {} chname 复选框名称
	 */
	checkboxAll:function(chname){
		var b = $.versions()>180;
		if(b){
			$("[name='" + chname + "']").each(function() {
				$(this).prop("checked", true);
			});
		}else{
			$("[name='" + chname + "']").each(function() {
				$(this).attr("checked", true);
			});
		}

	},

	/**
	 * 复选框反选
	 * @param {} chname 复选框名称
	 */
	inverSelect:function(chname){
		var b = $.versions()>180;
		if(b){
			$("[name='" + chname + "']").each(function(){
				if($(this).prop("checked")){
					$(this).prop("checked", false);
				}else{
					$(this).prop("checked", true);
				}
			});
		}else{   
			$("[name='" + chname + "']").each(function(){
				if($(this).attr("checked")){
					$(this).attr("checked", false);
				}else{
					$(this).attr("checked", true);
				}
			});
		}
	},
	/**
	 * 取消全选或反选
	 * @param {} chname
	 */
	clearSelect:function(chname){
		var b = $.versions()>180;
		if(b){
			$("[name='" + chname + "']").each(function() {
				$(this).prop("checked", false);
			});
		}else{
			$("[name='" + chname + "']").each(function() {
				$(this).attr("checked", false);
			});
		}      
	},
	/**
	 * 点击全选按钮让复选框全选
	 * @param {} all_id 按钮ID
	 * @param {} chname chname
	 */
	selects:function(all_id,chname){	 
		var b = $.versions()>180;	
		$("#"+all_id).click(function(){
			var a;
			if(b){
				a = $(this).prop("checked");
			}else{
				a = $(this).attr("checked");
			}
			if(a){
				$.checkboxAll(chname);
			}else{
				$.clearSelect(chname);
			}
		});
	},
	/**
	 * 验证是否是整数或小数 如果不是返回false；否则返回true
	 * @param {} source
	 * @return {Boolean}
	 */
	checkIntAndFloat:function(source){
		if(isNaN(source)){
			return false;
		}
		var regex = /^[0-9]+(\.[0-9]+)?$/g;
		return regex.test(source);
	},
	/**
	 * 验证是否是整数或只有一位小数点的小数
	 *
	 * @param {}source
	 * @return {Boolean}
	 */
	checkFloat:function(source) {		
		var regex = /^[0-9]+\d*[\.\d]?\d{0,1}$/g;
		return regex.test(source);
	},
	/**
	 * 验证是否有空格
	 * @param {} source
	 * @return {Boolean}
	 */
	checkSpace:function(source){
		var regex = /\s/g;
		return regex.test(source);
	},

	/**
	 * 验证正整数
	 * @param {} source
	 * @return {Boolean}
	 */
	checkInt:function(source){
		if(isNaN(source)){
			return false;
		}
		var regex = /^[0-9]*[1-9][0-9]*$/g;
		return regex.test(source);
	},
	/**
	 * 验证非负数
	 * @param {} source
	 * @return {Boolean}
	 */
	checkNegative:function(source){
		if(isNaN(source)){
			return false;
		}
		var regex=/^[0-9]\d*|0$/g
		return regex.test(source);
	},
	/**
	 * 验证是否是整数或只有2位小数的数
	 * @param {} source
	 * @return {Boolean}
	 */
	checkTowFloat:function(source){
		if(isNaN(source)){
			return false;
		}
		var regex = /^[1-9]+\d*[\.\d]?\d{0,2}$/g;
		return regex.test(source);
	},
	/**
	 * 将IP地址转成整形
	 * @param {} ipAddress
	 * @return {Number}
	 */
	getIpNum:function(ipAddress){
		if($.isEmpty(ipAddress)){
			return -1;
		}
		var ip = ipAddress.split(".");
		var a = $.strParseInt(ip[0]);
		var b = $.strParseInt(ip[1]);
		var c = $.strParseInt(ip[2]);
		var d = $.strParseInt(ip[3]);
		var ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
		return ipNum;
	},
	/**
	 * 判断IP大小 endIp是否大于startIp；如果大于则返回true、否则返回false
	 * @param {} startIp
	 * @param {} endIp
	 * @return {Boolean}
	 */
	decideIp:function(startIp, endIp){
		var ip1 = getIpNum(startIp);
		var ip2 = getIpNum(endIp);
		return (ip2 > ip1) ? true : false;
	},
	/**
	 * 验证是否全是空格
	 * @param {} source
	 * @return {}
	 */
	checkAllSpace:function(source){
		var regex = /^\s+$/g
		return regex.test(source);
	},
	/**
	 * 打开新窗口
	 * @param {} url 路径
	 * @param {} width 窗口宽度
	 * @param {} height 窗口高度
	 * @param {} resize yes时可调整窗口大小，no则不可调
	 * @param {} scrollbars yes有滚动条，no没有滚动条
	 */
	openWindow:function(url,width, height, resize,scrollbars){
		var mleft = (screen.width - width) / 2;
		var mtop = (screen.height - height) / 2;
		window.open(url,"","height=" + height + ",width=" + width
				+ ",location=no,menubar=no,resizable=" + resize
				+ ",scrollbars="+scrollbars+",status=no,toolbar=no,left=" + mleft
				+ ",top=" + mtop + "");
	},
	/**
	 * 打开模式窗口
	 * @param {} config.url 路径
	 * @param {} config.obj 像窗口传递值的对象
	 * @param {} config.width 窗口宽度
	 * @param {} config.height 窗口高度
	 * @return {}
	 */
	showNewWind:function(config){
		var obj = config.obj;
		var url = config.url;
		var width = config.width;
		var height = config.height;
		if(typeof(obj)=="undefined"){
			obj = new Object();
		}
		var showresult = window.showModalDialog(url,obj1,"dialogWidth="+width+"px;dialogHeight="+height+"px;location=no;status=no;scroll=yes");
		return showresult;
	},
	/**
	 * 由秒数转化成hh:mm:ss格式
	 * @param {} seconds
	 */
	timeTohhmmss:function(seconds){
		var hh;
		var mm;
		var ss;
		if(seconds==null || seconds<0){
			return;
		}
		var pseconds = parseInt(seconds);
		//得到小时
		hh = pseconds/3600|0;
		pseconds = parseInt(pseconds)-parseInt(hh)*3600;
		if(parseInt(hh)<10){
			hh="0"+hh;
		}
		if(parseInt(hh)>=24){
			hh="00";
		}
		//得到分钟
		mm = parseInt(pseconds)/60|0;
		//得到秒
		ss = parseInt(pseconds)-parseInt(mm)*60;
		if(parseInt(mm)<10){
			mm = "0"+mm;
		}
		if(parseInt(ss)<10){
			ss = "0"+ss;
		}
		return hh+":"+mm+":"+ss;
	},
	/**
	 * 时间变化
	 * @param {} source 原时间
	 * @param {} addval 增加量（秒）
	 * @return {}
	 */
	dateToString:function(source,addval){
		var paddval = parseInt(addval);//增量(秒)
		var temp = source.split(":");
		var thrs = parseInt(temp[0])*3600;//小时化成秒
		var tmis = parseInt(temp[1])*60;//分钟化成秒;
		var tss = parseInt(temp[2]);//秒
		var totals = parseInt(thrs)+parseInt(tmis)+parseInt(tss)+parseInt(paddval);
		var result = $.timeTohhmmss(totals);
		return result;
	},
	/**
	 * 给URL追加参数
	 * @param {} url 地址
	 * @param {} parameter 参数名称
	 * @param {} value 参数值
	 * @return {String}
	 */
	urlAddParmert:function(url,parameter,value){
		if($.isEmpty(url)){
			return "";
		}
		if(/\?/g.test(url)){
			url += "&" + parameter + "=" + value; 
		}else{
			url+="?"+parameter+"="+value;
		}
		return url;
	},
	/**
	 * 得到当前日期与星期
	 * @return {String}
	 */
	getTodayDate:function(){
		var now = new Date();  
		var yy = now.getFullYear();  
		var mm = now.getMonth()+1; 
		var dd=now.getDate();
		var day = new Array();  
		day[0] = "星期日";  
		day[1] = "星期一";  
		day[2] = "星期二";  
		day[3] = "星期三";  
		day[4] = "星期四";  
		day[5] = "星期五";  
		day[6] = "星期六";				
		return( yy + '年' + mm + '月'+ dd +'日&nbsp;'+day[now.getDay()]); 
	},
	/**
	 * 根据身份证号码得到出生日期
	 * @param {} card 身份证号
	 * @return {String}
	 */
	getBirthDate:function(card){
		var result = "";
		var len = card.length;
		if(len==15){//15位身份证号码：第7、8位为出生年份(两位数)，第9、10位为出生月份，第11、12位代表出生日期
			var str_7 = card.charAt(6);
			var str_8 = card.charAt(7);
			var years = "19"+str_7+""+str_8;//出生年份（四位数)
			var months = card.charAt(8)+""+card.charAt(9);
			var days = card.charAt(10)+card.charAt(11);
			result = years+"-"+months+"-"+days;
		}else if(len==18){//18位身份证号码：第7、8、9、10位为出生年份(四位数)，第11、第12位为出生月份，第13、14位代表出生日期
			var years = card.charAt(6)+card.charAt(7)+card.charAt(8)+card.charAt(9);
			var months = card.charAt(10)+card.charAt(11);
			var days = card.charAt(12)+card.charAt(13);
			result = years+"-"+months+"-"+days;
		}	
		return result;
	},

	/**
	 * 根据身份证号码得到性别
	 * @param {} card 身份证号
	 * @return {String}
	 */
	getSex:function(card){
		var result = "";
		var len = card.length;
		if(len==15){//15位身份证号码：第15位代表性别，奇数为男，偶数为女。
			var str_15 = card.charAt(14);
			var num = strParseInt(str_15);
			result = (num%2==0)?"女":"男";
		}else if(len==18){//18位身份证号码：第17位代表性别，奇数为男，偶数为女。
			var str_17 = card.charAt(16);
			var num = strParseInt(str_17);
			result = (num%2==0)?"女":"男";
		}
		return result;
	},

	/**
	 * 数字金钱转换成大写 如果返回-1 则输入数据过大
	 * @param {} currencyDigits
	 * @return {String}
	 */
	convertCurrency:function(currencyDigits){
		if($.isEmpty(currencyDigits)){
			return "";
		}
		if(isNaN(currencyDigits)){
			return "";
		}
		var MAXIMUM_NUMBER = 99999999999.99;  //最大值
		// 定义转移字符
		var CN_ZERO = "零";
		var CN_ONE = "壹";
		var CN_TWO = "贰";
		var CN_THREE = "叁";
		var CN_FOUR = "肆";
		var CN_FIVE = "伍";
		var CN_SIX = "陆";
		var CN_SEVEN = "柒";
		var CN_EIGHT = "捌";
		var CN_NINE = "玖";
		var CN_TEN = "拾";
		var CN_HUNDRED = "佰";
		var CN_THOUSAND = "仟";
		var CN_TEN_THOUSAND = "万";
		var CN_HUNDRED_MILLION = "亿";
		var CN_DOLLAR = "元";
		var CN_TEN_CENT = "角";
		var CN_CENT = "分";
		var CN_INTEGER = "整";

		// 初始化验证:
		var integral, decimal, outputCharacters, parts;
		var digits, radices, bigRadices, decimals;
		var zeroCount;
		var i, p, d;
		var quotient, modulus;  

		currencyDigits = currencyDigits.replace(/,/g, ""); 
		currencyDigits = currencyDigits.replace(/^0+/, ""); 
		//判断输入的数字是否大于定义的数值
		if (Number(currencyDigits) > MAXIMUM_NUMBER) {	        
			return "-1";
		}	     
		parts = currencyDigits.split(".");
		if (parts.length > 1) {
			integral = parts[0];
			decimal = parts[1];
			decimal = decimal.substr(0, 2);
		}else {
			integral = parts[0];
			decimal = "";
		}
		// 实例化字符大写人民币汉字对应的数字
		digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
		radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
		bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
		decimals = new Array(CN_TEN_CENT, CN_CENT);	    
		outputCharacters = "";
		//大于零处理逻辑
		if (Number(integral) > 0) {
			zeroCount = 0;
			for (i = 0; i < integral.length; i++) {
				p = integral.length - i - 1;
				d = integral.substr(i, 1);
				quotient = p / 4;
				modulus = p % 4;
				if (d == "0") {
					zeroCount++;
				}
				else {
					if (zeroCount > 0) {
						outputCharacters += digits[0];
					}
					zeroCount = 0;
					outputCharacters += digits[Number(d)] + radices[modulus];
				}
				if (modulus == 0 && zeroCount < 4) {
					outputCharacters += bigRadices[quotient];
				}
			}
			outputCharacters += CN_DOLLAR;
		}
		// 包含小数部分处理逻辑
		if (decimal != "") {
			for (i = 0; i < decimal.length; i++) {
				d = decimal.substr(i, 1);
				if (d != "0") {
					outputCharacters += digits[Number(d)] + decimals[i];
				}
			}
		}
		//确认并返回最终的输出字符串
		if (outputCharacters == "") {
			outputCharacters = CN_ZERO + CN_DOLLAR;
		}
		if (decimal == "") {
			outputCharacters += CN_INTEGER;
		}
		return outputCharacters;
	},
	getStrLength:function(str) {
		///<summary>获得字符串实际长度，中文2，英文1</summary>
		///<param name="str">要获得长度的字符串</param>
		if($.isEmpty(str)){
			return 0;
		}
		var realLength = 0, len = str.length, charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128) realLength += 1;
			else realLength += 2;
		}
		return realLength;
	},
	/**
	 *判断str1字符串是否以str2为结束
	 *@param str1 原字符串
	 *@param str2 子串
	 *@author pansen
	 *@return 是-true,否-false
	 */
	endWith:function(str1, str2){
		if(str1 == null || str2 == null){
			return false;
		}
		if(str1.length < str2.length){
			return false;
		}else if(str1 == str2){
			return true;
		}else if(str1.substring(str1.length - str2.length) == str2){
			return true;
		}
		return false;
	},
	/**
	 *判断str1字符串是否以str2为开头
	 *@param str1 原字符串
	 *@param str2 子串
	 *@author pansen
	 *@return 是-true,否-false
	 */
	startWith:function(str1, str2){
		if(str1 == null || str2 == null){
			return false;
		}
		if(str1.length < str2.length){
			return false;
		}else if(str1 == str2){
			return true;
		}else if(str1.substr(0, str2.length) == str2){
			return true;
		}
		return false;
	},
	versions:function(){
		var vers = $.fn.jquery;
		return vers.replace('.','').replace('.','')*1;
	}
});