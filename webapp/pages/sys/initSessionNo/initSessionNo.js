//初始化期号
function initSessionNo(game_type){
	var msg = "确定要初始化期号吗？";
	var url = getInitUrl(game_type);
	if($.isEmpty(url)){
		showMsg("系统提示","请选择正确的彩种","info");
		return;
	}
	$.messager.confirm('系统提示',msg,function(r){
	      if(r){
	    	 url = $.getContextPath() + url;
	         $.post(url,function(data){
	        	 if(data == "SUCCESS"){
	        		 showMsg("系统提示","初始化成功","info");
	        	 }else if(data == "FAIL"){
	        		 showMsg("系统提示","初始化失败","warning");
	        	 }else if(data == "INITED"){
	        		 showMsg("系统提示","今天期号已经初始化","warning");
	        	 }else if(data == "NOTEXIST"){
	        		 showMsg("系统提示","您没有操作权限","warning");
	        	 }else{
	        		 showMsg("系统提示","系统异常，请联系系统管理员","error");
	        	 }
	         },'text');
	      }
	   });
}

//获取初始化的链接
function getInitUrl(game_type){
	var url = "";
	if(game_type == "0"){
		//北京三分彩
		url = "bj3/initSessionNo.do";
	}else if(game_type == "1"){
		//北京赛车PK10
		url = "bjpk10/initSessionNo.do";
	}else if(game_type == "3"){
		//重庆时时彩
		url = "cqSsc/initSessionNo.do";
	}else if(game_type == "4"){
		//PC蛋蛋
		url = "bjlu28/initSessionNo.do";
	}else if(game_type == "5"){
		//广东快乐10分
		url = "gdk10/initSessionNo.do";
	}else if(game_type == "6"){
		//天津时时彩
		url = "tjSsc/initSessionNo.do";
	}else if(game_type == "7"){
		//新疆时时彩
		url = "xjSsc/initSessionNo.do";
	}else if(game_type == "9"){
		//广东11选5
		url = "gdPick11/initSessionNo.do";
	}else if(game_type == "10"){
		//江苏快乐3
		url = "jsk3/initSessionNo.do";
	}else if(game_type == "12"){
		//香港六合彩
		url = "markSix/initSessionNo.do";
	}else if(game_type == "13"){
		//幸运飞艇
		url = "luckyAirship/initSessionNo.do";
	}
	return url;
}


