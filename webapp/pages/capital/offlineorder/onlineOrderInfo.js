
//返回
function goBack(){
	var parames = "menuid=" + $("#menuid").val();
	parames += "&user_name=" + $("#user_name").val();
	parames += "&order_num=" + $("#order_num").val();
	parames += "&pay_status=" + $("#pay_status").val();
	parames += "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + "card/gotoOfflineOrder.do?" + parames;
}
var flag = false;

//线下充值拒绝
function refuse(){
	if(flag == true){
		showMsg("系统提示","请不要重复提交","info");
		return;
	}
	flag = true;
	var reason = $("#reason").val();
	if($.isEmpty(reason)){
		flag = false;
		showMsg("系统提示","请填写拒绝信息","info");
		$("#reason").focus();
		return;
	}
	$.messager.confirm('系统提示',"您确定要拒绝吗？一旦确认就不能改变！",function(r){
	      if(r){
	    	  var parames = "order_id=" + $("#order_id").val();
	    	  parames += "&reason=" + reason;
	         $.post($.getContextPath() + "card/refuse.do",parames,function(data){
	        	 flag = false;
	        	 if(data == "SUCCESS"){
	        		 $.messager.alert("系统提示","操作成功","info",function(){
	        			 goBack();
					  });
	        	 }else if(data == "FAIL"){
	        		 showMsg("系统提示","操作失败","error");
	        	 }else if(data == "EMPTY"){
	        		 showMsg("系统提示","请填写拒绝信息","error");
	        	 }else if(data == "VALIDATE_FAIL"){
	        		 showMsg("系统提示","提交的信息中含有非法字符，请检查","error");
	        	 }else{
	        		 showMsg("系统提示","系统异常，请联系系统管理员","error");
	        	 }
	         },"text");
	      }else{
	    	  flag = false;
	      }
	   });
}

//修改用户金额  线下充值通过
function updateUserMoney(){
	var userpoints = $("#money").val();
	if($.isEmpty(userpoints)){
		showMsg("系统提示","请输入充值金额","info");
		$("#money").focus();
		return;
	}
	$.messager.confirm('系统提示',"您确定要充值吗？一旦确认就不能改变！",function(r){
	      if(r){
	    	  var parames = "order_id=" + $("#order_id").val();
	    	  parames += "&userpoints=" + userpoints;
	    	  parames += "&user_id=" + $("#user_id").val();
	         $.post($.getContextPath() + "card/modifyBalance.do",parames,function(data){
	        	 if(data == "SUCCESS"){
	        		 $.messager.alert("系统提示","操作成功","info",function(){
	        			 goBack();
					  });
	        	 }else if(data == "FAIL"){
	        		 showMsg("系统提示","操作失败","error");
	        	 }else if(data == "EMPTY"){
	        		 showMsg("系统提示","请填写拒绝信息","error");
	        	 }else if(data == "VALIDATE_FAIL"){
	        		 showMsg("系统提示","提交的信息中含有非法字符，请检查","error");
	        	 }else{
	        		 showMsg("系统提示","系统异常，请联系系统管理员","error");
	        	 }
	         },"text");
	      }
	   });
}
