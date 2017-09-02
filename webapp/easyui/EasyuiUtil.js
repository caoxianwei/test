/**
 * easyui的工具公共文件
 */
/**
 * 提交表单
 * @param {} config
 * config数组；设置方法为{formId:"",url:"",callback:function} 
 */
function submitForm(config){
	$.messager.progress();
	$("#"+config.formId).form('submit',{
	   url:config.url,
	   ajax:false,
	   queryParams:config.params,
	   onSubmit:function(){
	      var isValid = $(this).form('validate');	      
	      if(!isValid){	      	
            $.messager.progress('close');
          }
          return isValid;
	   },
	   success:function(result){	   	 
	   	  $.messager.progress('close');
	      config.callback(result);	      
	   }
	});
}

/**
 * 提交表单，不带进度条带提示;要使用到jquery.loadmask.js插件
 * @param {} config
 * config数组；设置方法为{formId:"",url:"",callback:function}
 */
function saveForm(config){
	var masks = config.masks;
	if(typeof(masks)=="undefined"){
	   masks = true;
	}
	if(masks){
	  $("body").mask("正在保存数据，请稍等。。。。。。");
	}
	var sub_url = config.url;	
	if($.type(sub_url)=="undefined" || $.isEmpty(sub_url)){
	   sub_url = $("#"+config.formId).attr("action");
	}
	var otherParam = {};
	if(typeof(config.params)!="undefined"){
	  otherParam = config.params;
	}
	$("#"+config.formId).form({
	  queryParams:otherParam
	}).form('submit',{
	  url:sub_url,
	  success:function(result){	  	
	  	if($("body").isMasked()){
	  	  $("body").unmask();
	  	}
	    config.callback(result);
	  }
	});	
}

/**
 * easyui 删除数据
 * @param {} config
 */
function deleteData(config){  
   var promts = config.promt||"删除";
   var title = "<span style='color:red;'>"+config.len+"条</span>"||"";   
   //$.messager.defaults.ok = '<span style="color:red;">是</span>';
   $.messager.confirm('系统提示',"确定要"+promts+"所选择的"+title+"记录吗？",function(r){
      if(r){
         $.post(config.url,config.params,function(data){
            config.callback(data);
         },config.dataType||'text');
      }
   });
}


/**
 * easyui删除行数据
 * @param {} config
 */
function deleteRows(config){
   var async = config.async||false;
   $.ajax({
      url:config.url,
      type:'POST',
      data:config.params,
      dataType:config.dataType,
      async:async,
      success:function(msg){
         config.success(msg);
      }
   });
}

/**
 *刷新列表
 * @param {} config
 */
function reloadTable(config){  
  $("#"+config.tableId).datagrid("clearSelections");
  $("#"+config.tableId).datagrid("unselectAll");
  $("#"+config.tableId).datagrid("uncheckAll"); 
  if(typeof(config.params)!="undefined"){
	 $("#"+config.tableId).datagrid("reload",config.params);		
  }else{
     $("#"+config.tableId).datagrid("reload");
  }  
}


/**
 * 刷新树
 * @param {} config
 */
function reloadTree(config){  
   var node = $("#"+config.treeId).tree('getRoot');
   $('#'+config.treeId).tree('reload',node.target);
}

/**创建easyui的window窗口
 * @param {} config
 */
function easyuiWidow(config){
	var width = config.width||800;
	var heigth = config.height||600;	
	var has_must =false;	
	var title = '新窗口&nbsp;&nbsp;';	
	var maxs = config.max;	
	if(typeof(config.max)=="undefined"){
     	maxs = false;
    }
    if(typeof(config.must)=='undefined'){
      has_must = true;
    }
	if(typeof(config.title)!="undefined"){
		title = config.title+'&nbsp;&nbsp;';
	}	
	if(has_must){
		title=title+'(<span style="color:red;">*为必填项</span>)';
	}
	var icons = config.iconCls||'icon-save';
	$("#"+config.winId).window({
	 title:title,
     width:width,   
     height:heigth,   
	 content:$.createFrame(config.url),
	 iconCls:"easyui-"+icons,
	 collapsible:false,	
	 modal:true,
	 top:10,
	 disabled:true,
	 draggable:false,
	 minimizable:false,
	 maximized:maxs,
	 onOpen:function(){
	    $("#"+config.winId).window("center");
	 }
   });
}

/**
 * 显示提示消息
 * @param title 标题
 * @param info  提示内容
 * @param type 类型  info,error
 * @returns
 */
function showMsg(title,info,type){
	$.messager.alert(title,info,type);
}

function confirm(title,info,fun){
	$.messager.confirm(title,info,function(r){
	    if(r){
	    	fun();
	    }
	 });
}

