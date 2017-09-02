$(function(){
	var pp = $('#cashApplyTabs').tabs('getSelected');
	//投注明细
	pp.html(getTabsContent(0));
	
	  //为选项卡设置选中事件
	  $('#cashApplyTabs').tabs({    
		  fit:true,
		  border:false,
		  plain:true,
		  onSelect:function(title,index){
			  var pp = $('#cashApplyTabs').tabs('getSelected');    
			  pp.html(getTabsContent(index));
		    }    
		}); 
});

//获取面板内容的链接
function getTabsContent(index){
	var parames = "userid=" + $("#userid").val();//二维码类型;
	parames += "&menuid=" + $("#menuid").val();
	var url = $.getContextPath() + "";
	if(index == 0){//投注明细
		url += "cashApply/gotoUserBet.do?" + parames;
	}else if(index == 1){
	    url += "cashApply/gotoBalanceDetai.do?" + parames;//余额明细
	}
	var str = '<iframe style="border:0px;width:100%;height:100%" src="'+url+'"></iframe>';
	return str;
}

