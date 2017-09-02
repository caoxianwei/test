$(function(){
	loadTable();
});

//加载数据表格
function loadTable(){
	var codes = $("#codes").val();
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'sysTwoCodePayoff/queryPayoffData.do?codes=' + codes,
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:false,
	    idField:'id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[      
	    	{field:'ck',checkbox:true },
	        {field:'payoff_name',title:'收款人',width:200},      
	        {field:'payoff_accout',title:'收款账号',width:150},
	        {field:'img',title:'二维码',width:280,formatter:function(value,row,index){
	        	return '<img alt="'+row.payoff_name+'"  src="'+row.path+'" width="60px" height="30px" onclick="javascript:showImgDiv(\''+row.path+'\')"/>';
	        }},
	        {field:'status',title:'状态',width:150,formatter:function(value,row,index){
	        	var str = "无效";
	        	if(value == "1"){
	        		str = "有效";
	        	}
	        	return str;
	        }}
	    ]]      
	}); 
}

//到添加二维码页面
function gotoAddPayoffView(){
	var codes = $("#codes").val();
	window.location.href = $.getContextPath() + 'sysTwoCodePayoff/gotoAdd.do?codes=' + codes;
}

//到修改活动的页面
function gotoUpdatePayoffView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	var parames = "id=" + row[0].id;
	parames += "&codes=" + $("#codes").val();
	window.location.href = $.getContextPath() + 'sysTwoCodePayoff/gotoUpdate.do?' + parames
}

//删除二维码数据
function deletePayoffData(){
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
		url:$.getContextPath() + 'sysTwoCodePayoff/deleteData.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 window.location.reload();
				  });
			}else if(data == "FAIL"){
				 showMsg("系统提示","删除失败","warning");
			}else if(data == "EMPTY"){
				 showMsg("系统提示","未查询到二维码信息","warning");
		    }else if(data == "NOTEXIST"){
				 showMsg("系统提示","无操作权限","warning");
		    }else{
			     showMsg("系统提示","系统异常，请联系系统管理员","error");
			}
		}
	});	
}


//修改状态，即设置可用还是不可用
function updateStataus(id,input){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请至少选择一条数据修改","info");
		return;
	}
	var status = row[0].status;
	if(status == "1"){
		status = "0";
	}else if(status == "0"){
		status = "1";
	}
	//获取指定行的索引，在修改成功后更新行记录
	var index = $("#dg").datagrid("getRowIndex",row[0]);
	var parames = "id=" + row[0].id;
     parames += "&status=" + status;
	$.post($.getContextPath() + "sysTwoCodePayoff/updateStatus.do",parames,function(data){
		if(data == "SUCCESS"){
			showMsg("系统提示","设置成功","info");
			$('#dg').datagrid('updateRow',{
	    		index: index,
	    		row: { status: status}
	    	});
		}else if(data == "FAIL"){
			showMsg("系统提示","设置失败","warning");
		}else if(data == "EMPTY"){
			showMsg("系统提示","请选择二维码进行操作","warning");
		}else if(data == "NOTEXIST"){
			 showMsg("系统提示","无操作权限","warning");
	    }else{
			showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
}

//保存活二维码数据
function addData(){
	var url = $.getContextPath() + 'sysTwoCodePayoff/addData.do';
	saveOrUpdate(url);
}

//修改二维码数据
function updateData(){
	var url = $.getContextPath() + 'sysTwoCodePayoff/updateData.do';
	saveOrUpdate(url);
}

//保存或修改二维码
function saveOrUpdate(url){
	//收款人
	var payoff_name = $("#payoff_name").val();
	//收款账号
	var payoff_accout = $("#payoff_accout").val();
	//图片地址
	var imgPath = $("#imgPath").val();
	//二维码类型
	var codes = $("#codes").val();
	//主键id
	var id = $("#payoffId").val();
	$.post(url,
			   {
		           payoff_name:payoff_name,
		           payoff_accout:payoff_accout,
		           imgPath:imgPath,
		           codes:codes,
		           id:id
			   },function(data){
				   if(data != null){
					   if(data == "SUCCESS"){
						   $.messager.alert("系统提示","保存成功","info",function(){
							   window.location.href = $.getContextPath() + "sysTwoCodePayoff/gotoListPayOff.do?code=" + codes;
						   });
					   }else if(data == "FAIL"){
						   showMsg("系统提示","保存失败","warning");
					   }else if(data == "EMPTY"){
						   showMsg("系统提示","提交的内容为空，请检查","warning");
					   }else if(data == "FILE_EMPTY"){
						   showMsg("系统提示","请上传二维码","warning");
					   }else if(data == "VALIDATE_FAIL"){
						   showMsg("系统提示","提交的内容包含非法字符，请检查","warning");
					   }else if(data == "NOTEXIST"){
						   showMsg("系统提示","无操作权限","warning");
					   }else{
						   showMsg("系统提示","系统异常，请联系系统管理员","error");
					   }
				   }
			   },"text");
}


//上传图片
function uploadImg(){
	$("#uploadImgForm")[0].submit();
}

//选择文件
function selectImg(){
	$("#imgInput").click();
}

//上传文件的回调函数
function callback(data){
	if(!$.isEmpty(data)){
		$("#imgPath").val(data);
		$("#indexImg").css("display","block");
		$("#indexImg").attr("src",$.getContextPath() + "file/showImg.do?path=" + data);
	}
}

//显示图片弹框
function showImgDiv(path){
	$("#oneimg").attr("src",path);
	$("#div_showimg").css("left", document.body.scrollLeft + event.clientX + 1);
	$("#div_showimg").css("top", document.body.scrollLeft + event.clientY + 10);
	$("#div_showimg").show();
}

//关闭显示图片的div
function closeImgDiv(){
	$("#div_showimg").hide();
}
