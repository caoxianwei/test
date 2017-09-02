$(function(){
	var pp = $('#payOffTabs').tabs('getSelected');    
	  pp.html(getTabsContent(0));
	
	  //为选项卡设置选中事件
	  $('#payOffTabs').tabs({    
		  fit:true,
		  border:false,
		  plain:true,
		  onSelect:function(title,index){
			  var pp = $('#payOffTabs').tabs('getSelected');    
			  pp.html(getTabsContent(index));
		    }    
		}); 
});

//获取面板内容的链接
function getTabsContent(index){
	var code = "001";
	if(index == 0){
		code = "001";//微信
	}else if(index == 1){
		code = "002";//支付宝
	}
	var parames = "code=" + code;//二维码类型;
	parames += "&menuid=" + $("#menuid").val();
	var url = $.getContextPath() + "sysTwoCodePayoff/gotoListPayOff.do?" + parames;
	var str = '<iframe style="border:0px;width:100%;height:400px" src="'+url+'"></iframe>';
	return str;
}

