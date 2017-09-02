$(function(){
	  
	var pp = $('#betrateTabs').tabs('getSelected');    
	  pp.html(getTabsContent(0));
	
	  //为选项卡设置选中事件
	  $('#betrateTabs').tabs({    
		  fit:true,
		  border:false,
		  plain:true,
		  onSelect:function(title,index){
			  var pp = $('#betrateTabs').tabs('getSelected');    
			  pp.html(getTabsContent(index));
		    }    
		}); 
	  
	  	  
});

//获取面板内容的链接
function getTabsContent(index){
	var parames = "gameType=" + $("#gameType").val();//获取彩种类型;
	parames += "&playType=" + index;//玩法类型，因为玩法类型是从0开始，所以此处用下标来表示;
	parames += "&menuid=" + $("#menuid").val();
//	var url = $.getContextPath() + "gaBetOption/gotoListBetrateData.do?" + parames;
	var url = $.getContextPath() + "gaBetOption/gotoListBetrateDataInfo.do?" + parames;
	var str = '<iframe style="border:0px;width:100%;height:100%" src="'+url+'"></iframe>';
	return str;
}

