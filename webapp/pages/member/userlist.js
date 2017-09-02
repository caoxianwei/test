$(function(){
	//
	initTable();
});
/**
 * 
 */
function initTable(){
	$('#table').datagrid({
		tableId:'table',
		url:'users/query.do',
		idField:'user_id',
		width:'99%',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:true,
		pagination:true,
		pageSize:20,
		loadMsg:'正在加载数据，请稍等......',
		columns:[[
			{field : 'user_id',checkbox : true,align : 'center'},
			{title : '<span class="header_name">ID<span>',field :'user_ids',width : 60,formatter:function(value,rows,index){			  
				return rows.user_id;
			}},
			{title : '<span class="header_name">用户名<span>',field : 'login_name',width : 110,formatter:function(value,row,index){
				var str = '<a title="点击查看用户详情" href="javascript:gotoUserInfo(\''+row.user_id+'\')" >'+value+'</a>';
				return str;
			}},
			{title : '<span class="header_name">余额<span>',field : 'money',width : 110},
			{title : '<span class="header_name">状态<span>',field : 'status',width : 50,formatter:function(value,rows,index){			  
				var htm = '<input type="hidden" id="ss_'+rows.user_id+'" value="'+value+'">';
				if(value==1){
					return htm +'<span id="s_'+rows.user_id+'">启用</span>';
				}else{
					return htm +'<span id="s_'+rows.user_id+'">禁用</span>';
				}
			}},
			{title : '<span class="header_name">允许投注<span>',field : 'bet_status',width : 60,formatter:function(value,rows,index){			  
				if(value==0){
					return '<span id="'+rows.user_id+'">不允许</span>';
				}else{
					return '<span id="'+rows.user_id+'">允许</span>';
				}
			}},
			{title : '<span class="header_name">注册IP(地址)<span>',field : 'regist_ip',width : 120,formatter:function(value,row,index){
				if(value != null && value.trim().length > 0){
					var str = value  ;
					var address = row.regist_address;
					if(address != null &&address.trim().length > 0){
						str += + "<br/>(" + address + ")" ;
					}
					return str;
				}
				return "";
			}},
			{title : '<span class="header_name">最近登录IP(地址)<span>',field : 'last_login_ip',width : 120,formatter:function(value,row,index){
				if(value != null && value.trim().length > 0){
					var str = value ;
					var address = row.last_login_address;
					if(address != null &&address.trim().length > 0){
						str += + "<br/>(" + address + ")" ;
					}
					return str;
				}
				return "";
			}},
			{title : '<span class="header_name">最近登录时间<span>',field : 'last_login_date',width : 150,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
			{title : '<span class="header_name">注册时间<span>',field : 'regist_date_time',width : 150,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
			]]
	});
}

//查看用户详情的方法
function gotoUserInfo(userid){
	if(userid == null){
		showMsg("系统提示","请选择一条数据查看","warning");
		return;
	}
	window.location.href = $.getContextPath() + 'users/initUserInfoView.do?user_id=' + userid;
}

//查询数据
function queryData(){
	var userName = $("#userName").val();
	var status = $("#status").val();
	var beginDate = $("#beginDate").val();
	var endDate = $("#endDate").val();
	var params = {"userName":userName,"status":status,"beginDate":beginDate,"endDate":endDate};
	reloadTable({tableId:'table',params:params});
}


//充值的方法
$("#recharge").click(function(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示", "请选择一条数据进行充值！","warning");
		return;
	}
	easyuiWidow({
		winId:'newWin',
		title:'用户充值',
		url:'users/torecharge.do?user_id='+rows[0].user_id,
		height:500
	});

});

//用户扣款
$("#debit").click(function(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示", "请选择一条数据进行扣款！","warning");
		return;
	}
	easyuiWidow({
		winId:'newWin',
		title:'用户扣款',
		url:'users/todebit.do?user_id='+rows[0].user_id,
		height:500
	});

});

//重置登录密码
$("#resetloginpw").click(function(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示", "请选择一条数据进行重置登录密码！","warning");
		return;
	}
	easyuiWidow({
		winId:'newWin',
		title:'重置登录密码',
		url:'users/toresetloginpw.do?user_id='+rows[0].user_id,
		height:500
	});
});
//重置取款密码
$("#resetdrawpw").click(function(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示", "请选择一条数据进行重置取款密码！","warning");
		return;
	}
	easyuiWidow({
		winId:'newWin',
		title:'重置取款密码',
		url:'users/toresetdrawpw.do?user_id='+rows[0].user_id,
		height:500
	});
});
//是否允许投注
$("#allowbet").click(function(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len==0){
		$.messager.alert("系统提示", "请选择一条数据进行修改","warning");
		return;
	}
	var userids = new Array();
	var usernames = new Array();
	for(var i=0;i<rows.length;i++){
		userids.push(rows[i].user_id);
		usernames.push(rows[i].login_name);
	}
	easyuiWidow({
		winId:'newWin',
		title:'是否允许投注',
		url:'users/totouzhu.do?user_id='+userids.join(",") + "&user_name=" + usernames.join(","),
		height:500
	});
});

//修改用户信息
$("#updateBtn").click(function(){
	var rows = $("#table").datagrid("getSelections");
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示", "请选择一条数据进行修改","warning");
		return;
	}
	easyuiWidow({
		winId:'newWin',
		title:'修改用户信息',
		url:'users/gotoUpdateUserInfo.do?user_id='+rows[0].user_id,
		height:500
	});
});

$("#switch").click(function(){
	var rows = $('#table').datagrid('getSelections');
	var len = rows.length;
	if(len!=1){
		$.messager.alert("系统提示","请选择要一个需要修改状态的用户!","warning");
		return;
	}
	var user_id = rows[0].user_id;
	var status = $("#ss_"+user_id).val();
	var title = '';
	if('1'==status){
		status = '0';
		title="禁用";
	}else{
		title="启用";
		status = '1';
	}
	$.messager.confirm("提示","确定要"+title+"该用户?",function(r){
		if(r){
			$.ajax({
				url:"users/saveswitch.do",
				data:{'user_id':user_id,"status":status,'version':Math.random()},
				dataType:'text',
				success:function(msg){
					if(msg=="SUCCESS"){
						$.messager.alert("系统提示",title+"成功","info");
						$("#ss_"+user_id).val(status);
						if(status=='1'){
							$("#s_"+user_id).html("启用");
						}else{
							$("#s_"+user_id).html("禁用");
						}
					}else{
						$.messager.alert("系统提示",msg,"error");
					}
				}
			});
		}
	});
});

function closeWin(){
	$('#newWin').window('close'); 
	reloadTable({
		tableId:'table'
	});
}

