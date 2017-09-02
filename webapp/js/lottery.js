//自定义js 

//截取时间    保留 年 月 日 时 分 秒
function formatDate(date){
	if(!$.isEmpty(date)){
		var str = date.substring(0,19);
	    return str;
	}
	return "";
}

//获取 年 月 日
function getYear(date){
	if(!$.isEmpty(date)){
		var str = date.substring(0,10);
	    return str;
	}
	return "";
}

//校验url
function validateUrl(str){
	var match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
	return match.test(str);
}

//校验输入数字与小数点
function checkNum(num) { 
    var re = /^\d+(?=\.{0,1}\d+$|$)/ 
    if (num != "") { 
        if (re.test(num)) {
        	return true;
        } 
    } 
    return false;
} 

//校验银行账号
function validateBankAccount(str){
	var reg = /^(\d{15}|\d{19})$/;
	return reg.test(str);
}
