$(function(){
	//加载数据表格
	var login_name = $("#login_name").val();
	var session_no = $("#session_no").val();
	var game_name = $("#game_name").val();
	var play_name = $("#play_name").val();
	loadTable({login_name:login_name,session_no:session_no,game_name:game_name,play_name:play_name});
});

//加载数据表格
function loadTable(){
	$('#dg').datagrid({      
	    url:$.getContextPath() + 'lotteryOrder/queryAbnormalOrderData.do',
		rownumbers:true,
		singleSelect:false,
		autoRowHeight:false,
		fitColumns:false,
		pagination:true,
		pageSize:20,
		idField:'bet_detail_id',
		loadMsg:'正在加载数据，请稍等......',
	    columns:[[
	    	{field:'ck',checkbox:true },
	        {field:'login_name',title:'用户名'},      
	        {field:'session_no',title:'期号'},
	        {field:'game_name',title:'彩种'},
	        {field:'play_name',title:'玩法'},
	        {field:'option_title',title:'投注项',formatter:function(value,row,index){
	        	return row.bet_name + "&nbsp;&nbsp;&nbsp;" + value;
	        }},
	        {field:'bet_money',title:'投注金额'},
	        {field:'bet_rate',title:'赔率',formatter:function(value,row,index){
	        	var bet_rate2 = row.bet_rate2;
	        	if(bet_rate2 == null || bet_rate2.length == 0){
	        		return value;
	        	}
	        	return bet_rate2;
	        }},
	        {field:'open_result',title:'开奖结果',width:180},
	        {field:'win_cash2',title:'预计中奖金额'},
	    ]],
	}); 
}

//手动开奖
function gandDraw(){
	var row = $('#dg').datagrid('getSelections');
	if(row == null || row.length == 0){
		showMsg("系统提示","请选择一条数据进行操作","info");
		return;
	}
	var bet_detail_id = row[0].bet_detail_id;
	var gameType = row[0].game_type;
	var playName = row[0].play_name;
	var parames = "orderid=" + bet_detail_id;
	parames += "&login_name=" + row[0].login_name;
	if(gameType == "12"){
		parames += "&play_type=" + getMarkSixPlayType(playName);
	}else{
    	parames += "&play_type=" + getPlayType(gameType,playName);
	}
	//添加查询的参数
	parames += "&select_login_name=" + $("#login_name").val();
	parames += "&session_no=" + $("#session_no").val();
	parames += "&game_name=" + $("#game_name").val();
	parames += "&play_name=" + $("#play_name").val();
	window.location.href = $.getContextPath() + "lotteryOrder/gotoHandDrawView.do?" + parames;
}


//查询异常订单
function queryData(){
	var login_name = $("#login_name").val();
	var session_no = $("#session_no").val();
	var game_name = $("#game_name").val();
	var play_name = $("#play_name").val();
	reloadTable({
		tableId:'dg',
		params:{login_name:login_name,session_no:session_no,game_name:game_name,play_name:play_name}
	});
}

//获取玩法类型
function getPlayType(gameType,playName){
	if(gameType == "0" || gameType == "3" || gameType  == "6" || gameType == "7" || gameType == "9"){
		//三分彩，重庆时时彩，天津时时彩，新疆时时彩，广东11选5
		if(playName == "两面盘"){
			return "0";
		}else if(playName == "1-5球"){
			return "1";
		}
	}else if(gameType == "1" || gameType == "13"){
		//北京赛车  ,  幸运飞艇
		if(playName == "两面盘"){
			return "0";
		}else if(playName == "1-10名"){
			return "1";
		}else if(playName == "冠亚军和"){
			return "2";
		}
	}else if(gameType == "4"){
		// PC蛋蛋
		if(playName == "两面盘"){
			return "0";
		}else if(playName == "特码"){
			return "1";
		}
	}else if(gameType == "10"){
		// 江苏快3
		if(playName == "两面盘"){
			return "0";
		}else if(playName == "两连"){
			return "1";
		}
	}else if(gameType == "5"){
		// 广东快乐10分
		if(playName == "两面盘"){
			return "0";
		}else if(playName == "第1球"){
			return "1";
		}else if(playName == "第2球"){
			return "2";
		}else if(playName == "第3球"){
			return "3";
		}else if(playName == "第4球"){
			return "4";
		}else if(playName == "第5球"){
			return "5";
		}else if(playName == "第6球"){
			return "6";
		}else if(playName == "第7球"){
			return "7";
		}else if(playName == "第8球"){
			return "8";
		}
	}
	return "-1";
}

//获取六合彩类型
function getMarkSixPlayType(playName){
	 if(playName == "特码A"){
		  return "0";
	  }else if(playName == "特码B"){
		  return "1";
	  }else if(playName == "正码"){
		  return "2";
	  }else if(playName == "正1特"){
		  return "3";
	  }else if(playName == "正2特"){
		  return "4";
	  }else if(playName == "正3特"){
		  return "5";
	  }else if(playName == "正4特"){
		  return "6";
	  }else if(playName == "正5特"){
		  return "7";
	  }else if(playName == "正6特"){
		  return "8";
	  }else if(playName == "正码1-6"){
		  return "9";
	  }else if(playName == "过关"){
		  return "10";
	  }else if(playName == "二全中"){
		  return "11";
	  }else if(playName == "二中特"){
		  return "12";
	  }else if(playName == "特串"){
		  return "13";
	  }else if(playName == "三全中"){
		  return "14";
	  }else if(playName == "三中二"){
		  return "15";
	  }else if(playName == "四全中"){
		  return "16";
	  }else if(playName == "半波"){
		  return "17";
	  }else if(playName == "一肖"){
		  return "18";
	  }else if(playName == "尾数"){
		  return "19";
	  }else if(playName == "特码生肖"){
		  return "20";
	  }else if(playName == "二肖"){
		  return "21";
	  }else if(playName == "三肖"){
		  return "22";
	  }else if(playName == "四肖"){
		  return "23";
	  }else if(playName == "五肖"){
		  return "24";
	  }else if(playName == "六肖"){
		  return "25";
	  }else if(playName == "七肖"){
		  return "26";
	  }else if(playName == "八肖"){
		  return "27";
	  }else if(playName == "九肖"){
		  return "28";
	  }else if(playName == "十肖"){
		  return "29";
	  }else if(playName == "十一肖"){
		  return "30";
	  }else if(playName == "二肖连中"){
		  return "31";
	  }else if(playName == "三肖连中"){
		  return "32";
	  }else if(playName == "四肖连中"){
		  return "33";
	  }else if(playName == "五肖连中"){
		  return "34";
	  }else if(playName == "二肖连不中"){
		  return "35";
	  }else if(playName == "三肖连不中"){
		  return "36";
	  }else if(playName == "四肖连不中"){
		  return "37";
	  }else if(playName == "二尾连中"){
		  return "38";
	  }else if(playName == "三尾连中"){
		  return "39";
	  }else if(playName == "四尾连中"){
		  return "40";
	  }else if(playName == "二尾连不中"){
		  return "41";
	  }else if(playName == "三尾连不中"){
		  return "42";
	  }else if(playName == "四尾连不中"){
		  return "43";
	  }else if(playName == "五不中"){
		  return "44";
	  }else if(playName == "六不中"){
		  return "45";
	  }else if(playName == "七不中"){
		  return "46";
	  }else if(playName == "八不中"){
		  return "47";
	  }else if(playName == "九不中"){
		  return "48";
	  }else if(playName == "十不中"){
		  return "49";
	  }else if(playName == "十一不中"){
		  return "50";
	  }else if(playName == "十二不中"){
		  return "51";
	  }
 }

