$(function(){
	//加载数据表格
	var gameType = $("#gameType").val();
	var playType = $("#playType").val();
	loadTable({gameType:gameType,playType:playType});
});

//加载数据表格
var datagrid ;
function loadTable(parames){
	datagrid = $('#dg').datagrid({      
	    url:$.getContextPath() + 'gaBetOption/queryData.do',
	    queryParams:parames,
		rownumbers:true,
		singleSelect:true,
		autoRowHeight:false,
		fitColumns:false,
		idField:'bet_option_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	        {field:'option_title',title:'玩法',width:150,formatter:function(value,row,index){
	        	return row.title + "--" + row.option_title;
	        }},      
	        {field:'rebate',title:'返点',width:160,
	        	formatter:function(value,row,index){
	        	    if(value != null && value > -1){
	        	    	return value;
	        	    }else{
	        	    	return "";
	        	    }
		        },editor: { 
		        	type: 'numberbox',
	        		options:{
	        			height:30,
	        			precision:4
	        		} 
	        	}
	        },
	        {field:'oper',title:'操作',width:120,formatter: function(value,row,index){
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
	var rebate = row.rebate;
	if(!checkNum(rebate)){
		parent.showMsg("系统提示","请输入正确的返点","info");
		return;
	}
	var parames = "option_id=" + row.bet_option_id;
	parames += "&rebate=" + row.rebate;
	//传递此参数是因为要修改内存变量中的返点
	parames += "&game_type=" + row.game_type;
	$.post($.getContextPath() + "gaBetOption/updaterebate.do",parames,function(data){
		if(data == "SUCCESS"){
			setIsSave(0);
			parent.showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			setIsSave(1);
			parent.showMsg("系统提示","保存失败","warning");
		}else if(data == "NOTEXIST"){
			setIsSave(1);
			parent.showMsg("系统提示","无操作权限","warning");
		}else{
			setIsSave(1);
			parent.showMsg("系统提示","系统异常，请联系系统管理员","error");
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
	if(isSave == 0){
		parent.showMsg("系统提示","数据未修改，不需要保存","info");
		return;
	}
	var updateDate = new Array();
	for(var i=0;i<rows.length;i++){
		var id = rows[i].bet_option_id;
		var rebate = rows[i].rebate;
		if(!$.isEmpty(rebate)){
			if(!checkNum(rebate)){
				parent.showMsg("系统提示","请输入正确的返点","info");
				return;
			}
			//id  返点
			updateDate.push(id+ "_" + rebate);
		}
	}
	if(updateDate.length == 0){
		parent.showMsg("系统提示","请输入有效的返点值","info");
		return;
	}
	 var parames = "updateRebateData=" + updateDate.join(";");
	//传递此参数是因为要修改内存变量中的返点
	 parames += "&game_type=" + rows[0].game_type;
	$.post($.getContextPath() + "gaBetOption/betchUpdateRebate.do",parames,function(data){
		if(data == "SUCCESS"){
			setIsSave(0);
			parent.showMsg("系统提示","保存成功","info");
		}else if(data == "FAIL"){
			setIsSave(1);
			parent.showMsg("系统提示","保存失败","warning");
		}else if(data == "NOTEXIST"){
			setIsSave(1);
			parent.showMsg("系统提示","无操作权限","warning");
		}else{
			setIsSave(1);
			parent.showMsg("系统提示","系统异常，请联系系统管理员","error");
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
