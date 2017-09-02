//关闭窗口
function closeWin(){
	parent.$('#newWin').window('close'); 
}
//保存数据
function saveData(){
	var pwd = $("#pwd").val();
	if($.isEmpty(pwd)){
		showMsg("系统提示","请输入重置后的密码","error");
		return;
	}
	confirm("系统提示","确认重置密码?",function(){
		saveForm({
			formId:'ff',
			url:'users/saveresetloginpw.do',
			queryParams:$("ff").serialize(),
			callback:function(data){
				if(data == "SUCCESS"){
					$.messager.alert("系统提示","重置成功","info",function(){
						window.parent.closeWin();//关闭窗口
					});
				}else{
					showMsg("系统提示",data,"error");
				}
			}
		});
	})
}




