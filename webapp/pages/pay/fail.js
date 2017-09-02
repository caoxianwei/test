$(document).ready(function(){
	timerObj.rest = 1;
	timerxiazhu = window.setInterval(function(){timerObj.init(timerObj.rest,'timer-fail');},timerObj.interval);
	var r = $("#r").val();
	if(r != ""){
// 		window.location.href = r;
	}
});

