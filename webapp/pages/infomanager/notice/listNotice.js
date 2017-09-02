$(function(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	loadTable({startDate:startDate,endDate:endDate});
	//控制新增修改页面的网址与发布内容的显示隐藏
	var type = $("#type").val();
	if("1"==type){
		$('#linktext').show();
		$('#contentbox').hide();
	}else if("2"==type){
		$('#linktext').hide();
		$('#contentbox').show();
	}
});

//加载数据表格
function loadTable(parames){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'notice/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:10,
	    queryParams:parames,
	    columns:[[      
	    	{field:'ck',checkbox:true },
	        {field:'title',title:'标题',width:400},      
	        {field:'create_date',title:'创建时间',width:150,formatter:function(value,row,index){
	        	return formatDate(value);
	        }},
	        {field:'status',title:'状态',width:80,formatter:function(value,row,index){
	        	if(value == "1"){
	        		return "有效";
	        	}else if(value == "0"){
	        		return "无效";
	        	}
	        }}
	    ]]      
	}); 
}

//到添加通知页面
function gotoAddNoticeView(){
	var parames = "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + 'notice/gotoAddNotice.do?type=1' + parames;
}

//到修改通知的页面
function gotoUpdateNoticeView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	var parames = "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + 'notice/gotoUpdateNotice.do?id=' + row[0].id + parames;
}

//删除通知数据
function deleteNoticeData(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据删除","info");
		return;
	}
	var ids = new Array();
	for(var i=0;i<row.length;i++){
		ids.push(row[i].id);
	}
	deleteData({
		url:$.getContextPath() + 'notice/deleteData.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 queryNotice();
				  });
			}else if(data == "FAIL"){
				 showMsg("系统提示","删除失败","error");
			}else if(data == "EMPTY"){
				 showMsg("系统提示","提交的内容为空，请检查","error");
		    }else if(data == "NOTEXIST"){
				 showMsg("系统提示","无操作权限","error");
		    }else{
			     showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});	
}

//修改状态 、 即 开关的方法
function updateStatus(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据操作","info");
		return;
	}
	var id = row[0].id;
	var status = row[0].status;
	if(status == "1"){
		status = "0";
	}else if(status == "0"){
		status = "1";
	}
	$.post($.getContextPath() + 'notice/updateStatus.do',{id:id,status:status},function(data){
		if(data == "SUCCESS"){
			$.messager.alert("系统提示","操作成功","info",function(){
				queryNotice();
			});
		}else if(data == "FAIL"){
			showMsg("系统提示","操作失败","error");
		}else if(data == "EMPTY"){
			showMsg("系统提示","未查询到信息，请重试","error");
		}else{
			showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
}


//保存通知数据
function addData(){
	var url = $.getContextPath() + 'notice/addData.do';
	saveOrUpdate(url);
}

//修改通知数据
function updateData(){
	var url = $.getContextPath() + 'notice/updateData.do';
	saveOrUpdate(url);
}

//保存或修改数据
function saveOrUpdate(url){
	//类型
	var type = $("input[name='type']:checked").val();
	//发布的网址
	var link = $("#link").val();
	//发布的内容
	var content = um.getContent();
	//标题
	var title = $("#title").val();
	if($.isEmpty(title)){
		showMsg("系统提示","请输入标题","warning");
		return;
	}
	if(type == "1"){
		if(!validateUrl(link)){
			showMsg("系统提示","请输入正确的网址","warning");
			return;
		}
	}else if(type == "2"){
		if($.isEmpty(content)){
			showMsg("系统提示","请输入发布内容","warning");
			return;
		}else{
			$("#content").val(content);
		}
	}
	var id = $("#noticeId").val();
	link = $.strEncode(link)
	content = $.strEncode(content);
	$.post(url,
			   {
				   title:title,
				   type:type,
				   link:link,
				   content:content,
				   id:id
			   },function(data){
				   if(data != null){
					   if(data == "SUCCESS"){
						   $.messager.alert("系统提示","保存成功","info",function(){
							   goBack();
						   });
					   }else if(data == "FAIL"){
						   showMsg("系统提示","保存失败","error");
					   }else if(data == "EMPTY"){
						   showMsg("系统提示","提交的内容为空，请检查","error");
					   }else if(data == "VALIDATE_FAIL"){
						   showMsg("系统提示","提交的内容包含非法字符，请检查","error");
					   }else if(data == "NOTEXIST"){
						   showMsg("系统提示","无操作权限","error");
					   }else{
						   showMsg("系统提示","系统异常，请联系系统管理员","error");
					   }
				   }
			   },"text");
}

//返回
function goBack(){
	var parames = "startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + 'notice/gotoNotice.do?' + parames;
}

//查询通知
function queryNotice(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	reloadTable({
		tableId:'dg',
		params:{startDate:startDate,endDate:endDate}
	});
}

//点击通知类型radio的方法
function clickType(input){
	var type = $(input).val();
	if(type=='1'){
		$('#linktext').show();
		$('#contentbox').hide();
	}else if(type=='2'){
		$('#contentbox').show();
		$('#linktext').hide();
	}
}

