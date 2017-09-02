$(function(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	loadTable({startDate:startDate,endDate:endDate});
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
	    url:$.getContextPath() + 'advertising/queryData.do',
	    rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		pagination:true,
	    pageSize:10,
	    idField:'id',
	    queryParams:parames,
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[      
	    	{field:'ck',checkbox:true },
	        {field:'title',title:'标题',width:260},      
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

//到添加首页轮播页面
function gotoAddIndexCarouselView(){
	var parames = "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + 'advertising/gotoAddIndexCarousel.do?type=1' + parames;
}

//到修改首页轮播的页面
function gotoUpdateIndexCarouselView(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0 || row.length > 1){
		showMsg("系统提示","请选择一条数据修改","info");
		return;
	}
	var parames = "&startDate=" + $("#startDate").val();
	parames += "&endDate=" + $("#endDate").val();
	window.location.href = $.getContextPath() + 'advertising/gotoUpdateIndexCarousel.do?id=' + row[0].id + parames;
}

//删除首页轮播数据
function deleteIndexCarouselData(){
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
		url:$.getContextPath() + 'advertising/deleteData.do',
		params:{'ids':ids.join(",")},
		len:row.length,
		callback:function(data){
			if(data == "SUCCESS"){
				 $.messager.alert("系统提示","删除成功","info",function(){
					 queryData();
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
	$.post($.getContextPath() + 'advertising/updateStatus.do',{id:id,status:status},function(data){
		if(data == "SUCCESS"){
			$.messager.alert("系统提示","操作成功","info",function(){
				queryData();
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

//保存首页轮播数据
function addData(){
	var url = $.getContextPath() + 'advertising/addData.do';
	saveOrUpdate(url);
}

//修改首页轮播数据
function updateData(){
	var url = $.getContextPath() + 'advertising/updateData.do';
	saveOrUpdate(url);
}

//保存或修改首页轮播
function saveOrUpdate(url){
	//类型
	var type = $("input[name='type']:checked").val();
	//发布的网址
	var link = $("#link").val();
	//发布的内容
	var content = um.getContent();
	//图片的临时路径
	var imgPath = $("#imgPath").val();
	//标题
	var title = $("#title").val();
	//排序值
	var sort = $("#sort").val();
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
	if(!checkNum(sort)){
		showMsg("系统提示","请输入正确的排序值","warning");
		return;
	}
	var id = $("#advertisid").val();
	if($.isEmpty(id) && $.isEmpty(imgPath)){
		showMsg("系统提示","请上传图片","warning");
		return;
	}
	link = $.strEncode(link);
	content = $.strEncode(content);
	$.post(url,
			   {
				   title:title,
				   imgPath:imgPath,
				   type:type,
				   link:link,
				   content:content,
				   sort:sort,
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
					   }else if(data == "FILE_EMPTY"){
						   showMsg("系统提示","请上传文件","error");
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
	window.location.href = $.getContextPath() + 'advertising/gotoIndexCarousel.do?' + parames;
}

//查询首页轮播
function queryData(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	reloadTable({
		tableId:'dg',
	    params:{startDate:startDate,endDate:endDate}
	});
}

//点击轮播类型radio的方法
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

