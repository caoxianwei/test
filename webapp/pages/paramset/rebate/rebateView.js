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
	var gameType = $("#gameType").val();
	var playType = index;
	if(gameType == "12"){
		//六合彩只查询特码b的返点
		playType = "1";
	}
	var parames = "gameType=" + gameType;//获取彩种类型;
	parames += "&playType=" + playType;//玩法类型，因为玩法类型是从0开始，所以此处用下标来表示;
	parames += "&menuid=" + $("#menuid").val();
//	var url = $.getContextPath() + "gaBetOption/gotoListRebateData.do?" + parames;
	var url = $.getContextPath() + "gaBetOption/gotoListRebateDataInfo.do?" + parames;
	var str = '<iframe style="border:0px;width:100%;height:100%" src="'+url+'"></iframe>';
	return str;
}



