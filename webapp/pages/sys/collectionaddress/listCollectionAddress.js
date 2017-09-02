$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
var datagrid ;
function loadTable(){
	datagrid = $('#dg').datagrid({      
	    url:$.getContextPath() + 'sysCollectionAddress/queryData.do',
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:false,
		idField:'info_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'game_title',title:'游戏名称',width:120},      
	        {field:'address',title:'采集地址',width:600,editor: { 
		        	type: 'text',
	        		options:{
	        			height:40
	        		}
	        	}
	        },
	        {field:'result_type',title:'返回类型',width:100,fixed:false,
		        editor: { 
	        		type: 'combobox',
	        		options:{
	        			valueField:'value',
						textField:'name',
	        			height:30,
	        			method:'post',
	        			url:$.getContextPath() + 'sysCollectionAddress/getSelectValue.do'
	        		}
	        	}
	        },
	        {field:'oper',title:'操作',width:100,formatter: function(value,row,index){
	        	var str = '<button id="updateA'+index+'" onclick="javascript:updateRow(this,\''+index+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color:#30acf2">修改</button>&nbsp;&nbsp;';
	        	str += '<button id="savaA'+index+'" onclick="javascript:saveData(\''+index+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color: #30acf2">保存</button>';
	        	return str;
	        }}
	    ]],
	}); 
}

//定义全局变量 ，表示是否能执行批量保存的方法; 
//1 可以执行批量保存的方法，0 不可以执行批量保存的方法;默认为0
var isSave = 0;
//设置值方法
function setIsSave(val){
	isSave = val;
}


//修改指定行
function updateRow(target,index){
	setIsSave(1);
	$("#dg").datagrid("beginEdit", index);
}

//保存行数据 
//index  当前点击的行数  
function saveData(index){
	//先将数据保存起来
	$('#dg').datagrid('endEdit', parseInt(index))
	//然后在获取选中的行数据
	var rows = datagrid.datagrid('getRows');
	var row = rows[index];
	var address = row.address;
	var result_type = row.result_type;
	if(!validateUrl(address)){
		showMsg("系统提示","请输入正确的开奖地址","error");
		return;
	}
	if(result_type == null || result_type.length == 0){
		showMsg("系统提示","请选择返回类型","error");
		return;
	}
	
	var parames = "id=" + row.id;
	parames += "&address=" + $.strEncode(address);
	parames += "&result_type=" + row.result_type;
	parames += "&game_type=" + row.game_type;
	$.post($.getContextPath() + "sysCollectionAddress/updateAddress.do",parames,function(data){
		if(data == "SUCCESS"){
			setIsSave(0);
			showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			setIsSave(1);
			showMsg("系统提示","保存失败","error");
		}else if(data == "NOTEXIST"){
			setIsSave(1);
			showMsg("系统提示","没有操作权限","error");
		}else{
			setIsSave(1);
			showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
}

//批量更新数据
function batchUpdateData(){
	setIsSave(1);
	//设置表格可编辑
	betchSetEdit(1);
}

//批量保存数据
function batchSaveData(){
	//先设置表格不可编辑
	betchSetEdit(0);
	//再次获取表格中的数据
	var rows = datagrid.datagrid('getRows');
	if(rows == null || rows.length == 0){
		showMsg("系统提示","请选择保存的数据","info");
		return;
	}
	if(isSave == 0){
		showMsg("系统提示","数据未修改，不需要保存","info");
		return;
	}
	var jsonStr = "[";
	for(var i=0;i<rows.length;i++){
		var address = rows[i].address;
		var result_type = rows[i].result_type;
		if(address == null || address.length == 0){
			continue;
		}
		if(!validateUrl(address)){
			showMsg("系统提示","请输入正确的开奖地址","error");
			return;
		}
		if(result_type == null || result_type.length == 0){
			showMsg("系统提示","请选择返回类型","error");
			return;
		}
		jsonStr += '{id:"'+rows[i].id+'",address:"'+$.strEncode(rows[i].address)+'",result_type:"'+rows[i].result_type+'",game_type:"'+rows[i].game_type+'"},';
	}
	jsonStr = jsonStr.substring(0,jsonStr.length -1) + "]";
	$.post($.getContextPath() + "sysCollectionAddress/betchUpdateCollectionAddress.do",{jsonStr:jsonStr},function(data){
		if(data == "SUCCESS"){
			setIsSave(0);
			showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			setIsSave(1);
			showMsg("系统提示","保存失败","error");
		}else if(data == "NOTEXIST"){
			setIsSave(1);
			showMsg("系统提示","没有操作权限","error");
		}else{
			setIsSave(1);
			showMsg("系统提示","系统异常，请联系系统管理员","error");
		}
	},"text");
}


//批量设置表格可编辑（不可编辑）
//  type 1/0  可编辑/不可编辑
function betchSetEdit(type){
	var str = "";
	if(1 == type){
		str = "beginEdit";
	}else if(0 == type){
		str = "endEdit";
	}
	var rows = datagrid.datagrid('getRows');
    //全部开启编辑模式
	for(var i = 0;i<rows.length;i++){
		$("#dg").datagrid(str, i);
	}
}

