$(function(){
	//加载数据表格
	loadTable();
	
});

//加载数据表格
function loadTable(){
	var isSavePower = $("#isSavePower").val();
	 $('#dg').datagrid({      
	    url:$.getContextPath() + 'markSix/queryMarkSixDateData.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:false,
		pagination:true,
		width:'99%',
		idField:'session_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'session_no',title:'期号',width:80},      
	        {field:'start_time',title:'开始时间',width:360,formatter:function(value,row,index){
	        	var str = formatDate(value) + "&nbsp;&nbsp;&nbsp;修改为&nbsp;&nbsp;&nbsp;   " ;
	        	str += '<input class="easyui-datetimebox" id="startDate_'+row.session_id+'" name="startdate" style="height:28px" >';
	        	return str;
	        }},
	        {field:'end_time',title:'结束时间',width:360,formatter:function(value,row,index){
	        	var str = formatDate(value) + "&nbsp;&nbsp;&nbsp;修改为&nbsp;&nbsp;&nbsp;   " ;
	        	str += '<input class="easyui-datetimebox" id="endDate_'+row.session_id+'" name="startdate" style="height:28px" >';
	        	return str;
	        }},
	        {field:'oper',title:'操作',width:120,formatter:function(value,row,index){
	        	var str = "";
	        	if(isSavePower == "1"){
	        		str += '<button onclick="javascript:updateDate(\''+row.session_id+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color:#30acf2">保存</button>&nbsp;&nbsp;';
	        	}
	        	return str;
	        }}
	    ]],
	    onLoadSuccess:function(data){
	    	$("input[name='startdate']").datetimebox({    
	    	    showSeconds: true,
	    	    panelHeight:200,
	    	    panelWidth:175
	    	});
	    }
	}); 
}


//保存六合彩时间
function updateDate(session_id){
	var startDate = $("#startDate_" + session_id).val();
	var endDate = $("#endDate_" + session_id).val();
	if($.isEmpty(startDate) && $.isEmpty(endDate)){
		showMsg("系统提示","请选择六合彩时间","warning");
		return ;
	}
	$.post($.getContextPath() + "markSix/updateDate.do",{session_id:session_id,startDate:startDate,endDate:endDate},function(data){
		if (data == "SUCCESS") {
			$.messager.alert("系统提示","保存成功","info",function(){
				window.location.reload();
			});
		}else if(data == "FAIL"){
			showMsg("系统提示","保存失败","warning");
		}else if(data == "EMPTY"){
			showMsg("系统提示","未查询到期号信息","warning");
		}else if(data == "NOTEXIST"){
			showMsg("系统提示","您没有操作权限","warning");
		}else if(data == "VALIDATE_FAIL"){
			showMsg("系统提示","请输入正确的六合彩日期","warning");
		}else if(data == "LOTTERY"){
			showMsg("系统提示","当前期正在开奖或已开奖","warning");
		}else{
			showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
		
	},"text");
}

