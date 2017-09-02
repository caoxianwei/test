define(["jquery"],function(){
	return function(){
		var nowTime=function(){
    	 var date = new Date();
        var dateStr = date.getFullYear() + "-" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() >= 10 ? date.getDate() : ("0" + date.getDate())) + " " + (date.getHours() >= 10 ? date.getHours() : ("0" + date.getHours())) + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : ("0" + date.getMinutes())) + ":" + (date.getSeconds() >= 10 ? date.getSeconds() : ("0" + date.getSeconds()));
        $("#current_time").html("<i></i>北京时间：" + dateStr);
    };
    setInterval(function() { //倒计时
       nowTime();
    }, 1000);
	};
});