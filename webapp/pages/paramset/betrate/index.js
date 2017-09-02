
$(function(){
	loadSessionInfoTree();
});

//加载彩种树结构
function loadSessionInfoTree(){
	var dpArr = "[";
	var gpArr = "[";
	var url = $.getContextPath()+"gaBetOption/gotoBetRateView.do?";
	for(var i=0;i<infoList.length;i++){
		var gameType = infoList[i].game_type;
		if(i==1){
			url += "gameType=" + gameType;
			url += "&playType=0";//默认查询游戏类型是0的数据
			url += "&menuid=" + $("#menuid").val();
		}
		if("12" == gameType){
			//六合彩属于低频彩
			dpArr += "{id:'"+i+"',text:'"+infoList[i].game_title+"',game_type:'"+infoList[i].game_type+"'},";
		}else{
			gpArr += "{id:'"+i+"',text:'"+infoList[i].game_title+"',game_type:'"+infoList[i].game_type+"'},";
		}
	}
	gpArr = gpArr.substring(0,gpArr.length-1) + "]";
	dpArr = dpArr.substring(0,dpArr.length-1) + "]";
	gpArr = eval("("+gpArr+")");
	dpArr = eval("("+dpArr+")");
	//加载右边的表格
	$("#plwf").attr("src",url);
	$("#sessionInfoTree").tree({
		animate:true,
		lines:true,
		data:[{
			text: '高频彩',
			children: gpArr
		},{
			text: '低频彩',
			children: dpArr
		}],
		onClick:function(node){
			var father = $(this).tree("getParent",node.target);
			if(father == null || father == "null"){
				return false;
			}
			var game_type = node.game_type;
			$("#plwf").attr("src",$.getContextPath()+"gaBetOption/gotoBetRateView.do?gameType=" + game_type+"&play_type=0");
		}
	});
	
	//设置id为1的树节点选中
	var node = $('#sessionInfoTree').tree('find', 1);
	$('#sessionInfoTree').tree('select', node.target);
	
}




