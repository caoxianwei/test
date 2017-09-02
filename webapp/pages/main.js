$(function(){
	//提现申请id，在页面循环遍历时，给  id为 'appluCashMenuid' 的input框赋值；
	//在此处判断 appluCashMenuid 是否有值，若有值，则认为该管理员拥有提现申请的权限，则显示右上角的提现申请 提醒，反之则无
	var cashMenuid = $("#appluCashMenuid").val();
	if($.isEmpty(cashMenuid)){
		$("#cashApplyA").parent().remove();
	}else{
		//先执行一次 查询提现申请
		loadNewApplyCash();
		//定时执行
		setInterval(function(){
			loadNewApplyCash();
		},30000);
	}
	var onoffOrderMenuid = $("#onoffOrderMenuid").val();
	if($.isEmpty(cashMenuid)){
		$("#onOfforderA").parent().remove();
	}else{
		//设置欢迎语的位置
		$("#wecomeLi").css("margin-left","53%");
		//查询线下充值
		loadOnofforder();
		//定时执行
		setInterval(function(){
			loadOnofforder();
		},20000);
	}
	
	//将左边的导航栏初始化为一个exayui的面板，把菜单放到面板中
	$('#easyuipanel').panel();  

	$(".page-sidebar-menu li").click(function(){
		$(".page-sidebar-menu li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".subn-menu li").click(function(){
		$(this).addClass("active");
	});
});

//点击菜单的方法
function openc(src,menuid){
	if(src==""){
		src = $.getContextPath() + "sysadmin/loginout.do";
	}
	if(/\?/g.test(src)){
		src += "&menuid=" + menuid; 
	}else{
		src+="?menuid=" + menuid;
	}
	src += "&version=" + Math.random(); 
	$("#ifr").attr("src",src);
};


/**
 * 查询提现数量
 */
function loadNewApplyCash(){
	$.post($.getContextPath() + "cashApply/getApplyCashCount.do",
			function(data){
		data = $.trim(data);
		var num=Number(data);
		if(typeof num=='number'){
			if(!num) num = 0;
			$('#spandoing4').html(num);
			$("#spandoing4").css("font-size","18px");
			if(num > 0){
				if(window.attachEvent){//IE
					ietixianTishi("spandoing4","您有新的提现消息了");
				}else{
					notIetixianTishi("spandoing4","您有新的提现消息了");
				}
			}
		}
	});
} 

//用户修改信息	
function updateUser(){
	easyuiWidow({
		title:'修改个人信息',
		winId:'newwindow',
		width:600,   
		height:300,
		max:false,
		iconCls:'icon-win-updatemenu',
		url:$.getContextPath() + "sysadmin/usermodify.do"
	});
}

//查询线下充值
function loadOnofforder(){
	$.post($.getContextPath() + "card/getOnoffOrderCount.do",
			function(data){
		data = $.trim(data);
		var num=Number(data);
		if(typeof num=='number'){
			if(!num) num = 0;
			$('#spandoing5').html(num);
			$("#spandoing5").css("font-size","18px");
			if(num > 0){
				if(window.attachEvent){//IE
					ietixianTishi("spandoing5","您有新的充值消息了");
				}else{
					notIetixianTishi("spandoing5","您有新的充值消息了");
				}
			}
		}
	});
}


//前往提现申请页面
function gotoApplyCash(){
	var menuid = $("#appluCashMenuid").val();
	$("#ifr").attr("src",$.getContextPath()  + "cashApply/listCashApply.do?menuid=" + menuid);
}


//前往线下充值页面
function gotoOnoffOrder(){
	var menuid = $("#onoffOrderMenuid").val();
	$("#ifr").attr("src",$.getContextPath()  + "card/gotoOfflineOrder.do?menuid=" + menuid);
}

function ietixianTishi(id,zhText){
     zhText = encodeURI(zhText);
     var html = "<audio autoplay=\"autoplay\">"+"<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text="+ zhText +"\" type=\"audio/mpeg\">";
     html=html+"<bgsound height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text="+ zhText +"\">";
     html=html+"</audio>";
     $('#'+id).append(html);
}

function notIetixianTishi(id,zhText){
    zhText = encodeURI(zhText);
    var html = "<audio autoplay=\"autoplay\">"+"<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text="+ zhText +"\" type=\"audio/mpeg\">";
    html=html+"<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text="+ zhText +"\">";
    html=html+"</audio>";
    $('#'+id).append(html);
}
