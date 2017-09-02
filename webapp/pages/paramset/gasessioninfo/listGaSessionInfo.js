$(function(){
	//加载数据表格
	loadTable();
});

//加载数据表格
var datagrid ;
function loadTable(){
	datagrid = $('#dg').datagrid({      
	    url:$.getContextPath() + 'gaSessionInfo/queryData.do',
	    striped:true,
		nowrap:false,
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:true,
		idField:'info_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'game_title',title:'游戏名称',width:150},      
	        {field:'single_note_amount',title:'单注限额',width:120,
	        	formatter:function(value,row,index){
	        	    if(value != null && value > -1){
	        	    	return value;
	        	    }else{
	        	    	var val = "";
	        	    	$('#dg').datagrid('updateRow',{
	        	    		index: index,
	        	    		row: { single_note_amount: val}
	        	    	});
	        	    }
		        },editor: { 
		        	type: 'numberbox',
	        		options:{
	        			height:30,min:0
	        		} 
	        	}
	        },
	        {field:'quota',title:'单期投注限额',width:120,
	        	formatter:function(value,row,index){
	        	    if(value != null && value > -1){
	        	    	return value;
	        	    }
		        },editor: { 
		        	type: 'numberbox',
	        		options:{
	        			height:30,min:0
	        		} 
	        	}
	        },
	        {field:'amount',title:'保不中限制金额',width:120,
	        	formatter:function(value,row,index){
	        	    if(value != null && value > -1){
	        	    	return value;
	        	    }
		        },editor: { 
		        	type: 'numberbox',
		        	options:{height:30,min:0}
		        }
	        },
	        {field:'status',title:'状态',width:65,fixed:false,
		        formatter:function(value,row,index){
		        	var str = "";
		        	if(value == "1"){
		        		str = "开";
		        	}else if(value == "0"){
		        		str = "关";
		        	}
		        	return str;
		        },editor: { 
	        		type: 'combobox',
	        		options:{
	        			valueField:'value',
						textField:'name',
	        			height:30,
	        			method:'post',
	        			panelHeight:50,
	        			url:$.getContextPath() + 'gaSessionInfo/getSelectValue.do'
	        		}
	        	}
	        },
	        {field:'remark',title:'停售说明',width:150,
	        	formatter:function(value,row,index){
	        		var str = value;
	        		if(row.status == "1"){
	        			str = "";
	        		}
	        		return str;
	        	},editor:{
	        		type:'textarea',
	        		options:{
	        			height:35
	        		}
	        	}
	        },
	        {field:'oper',title:'操作',width:100,formatter: function(value,row,index){
	        	var str = '<button id="updateA'+index+'" onclick="javascript:updateRow(this,\''+index+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color:#30acf2">修改</button>&nbsp;&nbsp;';
	        	str += '<button id="savaA'+index+'" onclick="javascript:saveRowData(\''+index+'\')" class="l-btn l-btn-small blue-x" style="padding: 5px !important;outline: none !important;border-color: #30acf2">保存</button>';
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
function saveRowData(index){
	//先将数据保存起来
	$('#dg').datagrid('endEdit', parseInt(index))
	//然后在获取选中的行数据
	var rows = datagrid.datagrid('getRows');
	var row = rows[index];
	var parames = "info_id=" + row.info_id;
	parames += "&quota=" + row.quota;//单期投注限额
	parames += "&single_note_amount=" + row.single_note_amount;//单注限额
	parames += "&amount=" + row.amount;
	parames += "&status=" + row.status;
	parames += "&remark=" + row.remark;
	parames += "&game_type=" + row.game_type;
	$.post($.getContextPath() + "gaSessionInfo/updateGaSessionInfo.do",parames,function(data){
		if(data == "SUCCESS"){
			setIsSave(0);
			showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			setIsSave(1);
			showMsg("系统提示","保存失败","error");
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
	var jsonStr = '[';
	for(var i=0;i<rows.length;i++){
		var quota = rows[i].quota;
		var single_note_amount = rows[i].single_note_amount;
		var amount = rows[i].amount;
		if($.isEmpty(quota)){
			quota = -1;
		}
		if($.isEmpty(single_note_amount)){
			single_note_amount = -1;
		}
		if($.isEmpty(amount)){
			amount = -1;
		}
		jsonStr += '{info_id:'+rows[i].info_id+',quota:'+quota+',single_note_amount:'+single_note_amount+',amount:'+amount + ',status:' + rows[i].status +',remark:"'+rows[i].remark+'",game_type:"'+rows[i].game_type+'"},';
	}
	jsonStr = jsonStr.substring(0,jsonStr.length -1) + ']';
	$.post($.getContextPath() + "gaSessionInfo/betchUpdateGaSessionInfo.do",{jsonStr:jsonStr},function(data){
		if(data == "SUCCESS"){
			setIsSave(0);
			showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			setIsSave(1);
			showMsg("系统提示","保存失败","error");
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
