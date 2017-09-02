 //点击复选框的方法
   function clickBox(input){
	   $("input[name='betStatus']").not($(input)).attr("checked",false);
   }
//关闭窗口
function closeWin(){
	parent.$('#newWin').window('close'); 
}
//保存数据
function saveData(){
	var betRemark = $("#betRemark").val();
	if($.isEmpty(betRemark)){
		$("#betRemark").val("网络延迟");
	}
	confirm("系统提示","确认保存?",function(){
		saveForm({
			formId:'ff',
			url:'users/savetouzhu.do',
			queryParams:$("ff").serialize(),
			callback:function(data){
				if(data == "SUCCESS"){
					$.messager.alert("系统提示","修改成功","info",function(){
						window.parent.closeWin();//关闭窗口
					});
				}else{
					showMsg("系统提示",data,"error");
				}
			}
		});
	})
}




