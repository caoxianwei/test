
$(document).ready(function(){
	move.hideHeader();
});


function timekeeping(intDiff) {
		var timer = setInterval(function() {
			var day = 0;
			var hour = 0;
			var minute = 0;
			var second = 0;
			
			if(intDiff > 0){
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			intDiff--;
			
			if (minute <= 9) {
				minute = '0' + minute
			}
			if (second <= 9) {
				second = '0' + second;
			}
			
			if ($.cookie('total') == 0) {
				$.removeCookie('total');
				$("#QRcode .mask").show();
// 				timeout();
				clearInterval(timer);
				if(s == '2'){
					var device = move.getDevice();
					if(device == 'ios' || device == 'android'){
						starup.close();
					}
					return;
				}
				// closeWebPage();
				window.location.href = $.getContextPath() + "pay/fail.do";
			}else{
				$.cookie('total', intDiff);
			}
			
			$('#hour_show').html('<s></s>'+hour+'时');
			$('#minute_show').html('<s></s>'+minute+'分');
			$('#second_show').html('<s></s>' + second + '秒');
		}, 1000);
	}
	
	function closeWebPage() {
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf("MSIE") > 0) {//close IE
			if (userAgent.indexOf("MSIE 6.0") > 0) {
				window.opener = null;
				window.close();
			} else {
				window.open('', '_top');
				window.top.close();
			}
		} else if (userAgent.indexOf("Firefox") > 0 || userAgent.indexOf("Chrome") > 0) {//close firefox  
			window.location.href = 'about:blank ';
		} else {
			var device = move.getDevice();
			if(device == 'ios' || device == 'android'){
				starup.close();
			}else{
				window.opener = null;
				window.open('', '_self');
				window.close();
			}
		}
	}
	
	function getStatus(){
		var postData = "a=" + $("#a").val();
		var statusTimer = setInterval(function() {
			var url = $.getContextPath() + "pay/getStatus.do";
			jQuery.post(url, postData, function(ret){
				var result = jQuery.parseJSON(ret);
				if(result.code == "200"){
					var data=result.data;
					if(data.status=='2'){
						$.removeCookie('total');
						window.location.href = $.getContextPath() + "pay/success.do";
					}
				}else{
					console.log(jdata.code + "=" + jdata.msg);
				}
			});
			if ($.cookie("total") == undefined) {
				clearInterval(statusTimer);
			}
		}, 2000);
	}
	$(function() {
		var code = $("#code").val();
		var msg = $("#msg").val();
		if(code!='200'){
			$('#QRcode .mask').text(msg);
			$('#QRcode .mask').show();
		}
		var s = $("#s").val();//支付场景1.pc2.app
		var g = $("#g").val();//支付类型5.微信1.支付宝
		if(s == '2' && g == '5'){
			$('#paylable').text('微信');
			$('#tipswechat').show();
			$('#tipsalipay').hide();
		}else if(s == '2' && g == '1'){
			$('#paylable').text('支付宝');
			$('#tipsalipay').show();
			$('#tipswechat').hide();
		}
		var intDiff = parseInt($("#t").val());
		timekeeping(intDiff);
		getStatus();
	});