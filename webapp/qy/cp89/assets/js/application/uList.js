var page_value={
		pageRecordCount:10  // 查询时每页显示的行数
	}
	var _util = {
		getUrl:function(name){
        	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
            var r = location.search.substr(1).match(reg);
            if(r!=null) {
            	return unescape(r[2]);
        	} 
            return null; 
        },
	        
	    //工具方法，处理时间格式
	    getDateStr:function(time) {
	        var date = new Date(time);
	        return  date.getFullYear()+"-"+((date.getMonth()+1)>=10?(date.getMonth()+1):("0"+(date.getMonth()+1)))+"-"+(date.getDate()>=10?date.getDate():("0"+date.getDate()));
	    },
	    emptyPageStyle:function ( div_id,isEmpty ) {// 检查列表是否为空
	        if(isEmpty) {
	            $("#"+div_id+"  .allPageNum").css("display","none");
	            $("#"+div_id+"  .tip_page").text("暂无数据");
	            $("#"+div_id+"  .page").html("");
	            $("#"+div_id+"  .tip_page").css("display","block");
	        } else {
	            $("#"+div_id+"  .allPageNum").css("display","block");
	            $("#"+div_id+"  .tip_page").css("display","none");
	        }
	    },
	    //初始化页面的值 （静态值）
	    initData:function() {
	        //切换 lab
	        $("#top_lab>div").bind("click",function(){
	            $("#top_lab>div").removeClass("current");
	            $(this).addClass("current");
	            $(".list_div  .rec_box").css("display","none");
	            $("#"+$(this).data("divid")).css("display","block");
	            try {
	                _util[$(this).data("func")]();
	            } catch(e) {
	                console.log(e);
	            }
	        });
	    },
	    //投注记录
	    init_bet : function() {
	        var div_id = "bet_div";
	        if( $("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        //给日期控件赋上默认值
	        (function dateValueInit(){
	            var time = new Date().getTime();
	            $("#popupDatepicker_start").val( _util.getDateStr(time-1000*60*60*24*30) );
	            $("#popupDatepicker_end").val( _util.getDateStr(time+1000*60*60*24*1) );
	            if("最近" == $("#"+div_id+" .datatype_select").val()) {
	                $("#"+div_id+" .div_date").css("display","inline-block");
	            } else {
	                $("#"+div_id+" .div_date").css("display","none");
	            }
	        })();
	        //初始化 分页 div的样式
	        function pageDiv( pageNum , PageAllRecordCount) {
	            if(pageNum >= 1) {
	                laypage({
	                    cont: $('#bet_div .page'), //容器。值支持id名、原生dom对象，jquery对象,
	                    pages: pageNum , //总页数
	                    skip: true, //是否开启跳页
	                    skin: '#AF0000',
	                    groups: 4, //连续显示分页数
	                    jump: function(obj, first){ //触发分页后的回调
	                        if(!first){
	                            if($('#bet_div .page').data("pageindex") == obj.curr) { // 无需重复查询当前页的数据
	                                //return;
	                            }
	                            getUserBetList(obj.curr);
	                        }
	                    }
	                });
	                $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页， "+PageAllRecordCount+"笔）");
	            }
	        }
	
	        
			
	        window.showBetDetail1 = function( o ) {
		        _common.util.dialogUi();
		        var jsonObj = $(o).data("funcparam");
		        var betObj = ( typeof( jsonObj ) == "object" ) ? jsonObj : $.parseJSON(jsonObj);
		        var amount_obj = (function changeAmount() {
		            var status = '';
		            var rewardMoney = 0;
		            var winMoney = 0;
		            var trueWinMoney = 0;
		            if (betObj['status'] == 0) {
		                status = '未开奖';
		            } else if (betObj['status'] == -1) {
		                status = '已撤单';
		            } else if (betObj['status'] == 1) {
		                rewardMoney = betObj['fdAmount'];
		                winMoney = (betObj['winAmount'] == undefined || betObj['winAmount'] == null || betObj['winAmount'] == '') ? 0 : betObj['winAmount'];
		                trueWinMoney = _common.util.Math_sub(Number(accAdd(Number(winMoney), Number(rewardMoney))), Number(betObj['amount']));
		                if (trueWinMoney > 0 && trueWinMoney.toString().split(".").length > 1) {
		                    if (trueWinMoney.toString().split(".")[1].length > 3) {
		                        trueWinMoney = accAdd(Number(_common.util.Math_sub(Number(winMoney), Number(betObj['amount']))), Number(rewardMoney));
		                    }
		                }
		                var clear = '';
		                if(betObj['isWin'] == 4) {
		                    clear = '和局';//六合彩
		                } else {
		                    winMoney > 0 ? clear = '中奖' : clear = '未中奖';
		                }
		                status = '已结算（' + clear + ')';
		            } else if (betObj['status'] == 2) {
		                status = '退码';
		            } else if (betObj['status'] == 4) {
		                status = '注单异常';
		            }
		            return {
		                status:status,
		                rewardMoney:rewardMoney,
		                winMoney:winMoney,
		                trueWinMoney:trueWinMoney
		            };
		        })("",0,0,0);
		
		        var openNum = decodeURIComponent(betObj['openContent']);
		        if (openNum == null || openNum == undefined || openNum == '' || openNum == 'null') {
		            openNum = '尚未开奖';
		        }
		        var position = decodeURIComponent(betObj['pos']);
		        $("#JS_blockPage").addClass("big");
		        var txtHtml = '<h4>注单号：' + betObj['orderNo'] + '</h4>'
		            + '<div class="data data-order">'
		            + '<table border=0 cellspacing=0 cellpadding=0 width=100% heigth="800px">'
		            + '<tr class=hid>'
		            + '<td class=\"shortWidth\">账号：</td>'
		            + '<td width=100>' + $("#member_name").val() + '</td>'
		            + '<td class=\"shortWidth\">单注金额：</td>'
		            + '<td width=100>' + moneyFormat(accDiv(betObj['amount'], 1).toFixed(3)) + '</td></tr>'
		            + '<tr class=hid><td class=\"shortWidth\">下注时间：</td>'
		            + '<td width=100>' + decodeURIComponent(betObj['addTime']).replace('+', ' ') + '</td>'
		            + '<td class=\"shortWidth\">投注注数：</td>'
		            + '<td width=100>' + 1 + '</td></tr>'
		            + '<tr class=hid><td class=\"shortWidth\">彩种：</td>'
		            + '<td width=100>' + decodeURIComponent(betObj['typeName']) + '</td>'
		            + '<td class=\"shortWidth\">投注总额：</td>'
		            + '<td width=100>' + moneyFormat(betObj['amount']) + '</td></tr>'
		            + '<tr class=hid>'
		            + '<td class=\"shortWidth\">期号：</td>'
		            + '<td width=100>' + betObj['period'] + '</td>'
		            + '<td class=\"shortWidth\">下注号码：</td>'
		            + '<td width=100 id="dia_win">' + decodeURIComponent(betObj['content']).replace(/&/g, ',') + '</td></tr>'
		            + '<tr class=hid><td class=\"shortWidth\">玩法：</td>'
		            + '<td width=100>' + betObj['playName'] + '</td>'
		            + '<td class=\"shortWidth\">销售返点：</td>'
		            + '<td width=100>' + moneyFormat(amount_obj.rewardMoney, betObj['status']) + '</td></tr>'
		            + '<tr class=hid><td class=\"shortWidth\">开奖号码：</td>'
		            + '<td width=140>' + openNum + '</td>'
		            + '<td class=\"shortWidth\">中奖金额：</td>'
		            + '<td width=100>' + moneyFormat(amount_obj.winMoney, betObj['status']) + '</td></tr>'
		            + '<tr class=hid><td class=\"shortWidth\">状态：</td>'
		            + '<td width=100>' + amount_obj.status + '</td>'
		            + '<td class=\"shortWidth\">盈亏：</td>'
		            + '<td width=100>' + moneyFormat(amount_obj.trueWinMoney, betObj['status']) + '</td></tr><tr class=hid>'
		            + '<td class=\"shortWidth\">奖金/返点：</td>'
		            + '<td colspan=3>' + betObj['bonus'] + '/' + betObj['point'] + '</td>'
		            +'</tr></table></div>';
		        $("#JS_blockPage .table").html( txtHtml );
		        $("#JS_blockPage").css( "display","block" );
		        $("#block_draghandler").text("注单详情");
		    };
	        
	        //[搜索]按钮点击事件
	        $("#"+div_id+"  .btn_search").bind("click",function(){
	            //获得查询参数 并保存与 页面中
	            var dateStr = "";
	            if( $("#bet_div  .datatype_select").val() == "最近" )
	            {
	                if( $("#popupDatepicker_end").val() < $("#popupDatepicker_start").val() )
	                {
	                    _alert("时间输入有误");
	                    return;
	                }
	                else
	                {
	                    dateStr = "start="+$("#popupDatepicker_start").val()+"&enddate="+$("#popupDatepicker_end").val();
	                }
	            }
	            else
	            {
	                var time = new Date().getTime();
	                var dateObj = {
	                    "今天":0,
	                    "昨天":-1,
	                    "前天":-2
	                };
	                dateStr = "start="+_util.getDateStr(time+dateObj[$.trim( $("#bet_div  .datatype_select").val())]*1000*60*60*24)+"&enddate="+_util.getDateStr(time+dateObj[$.trim( $("#bet_div  .datatype_select").val())]*1000*60*60*24);//  dateObj[$.trim( $("#bet_div  .datatype_select").val())];
	            }
	            var queryParamString = "pageRecordCount="+page_value.pageRecordCount+"&gameId="+$("#bet_div .game_select").val()+"&type="+$("#bet_div .type_select").val()+"&stu=0&"+dateStr;
//	            if( queryParamString != $("#bet_div").data("queryparam") )
//	            {
	                $("#bet_div").data("queryparam",queryParamString);
	                //开始查询
//	                getUserBetList( 1 );
//	            }
	        });
	        //时间下拉绑定事件
	        $("#"+div_id+"  .datatype_select").bind("change",function(){
	            if( "最近" == $(this).val() )
	            {
	                $("#bet_div .div_date").css("display","inline-block");
	            }
	            else
	            {
	                $("#bet_div .div_date").css("display","none");
	            }
	        });
	        //绑定时间控件
	        $("#popupDatepicker_start").datepicker({
	            dateFormat:'yy-mm-dd',
	            onSelect: function( startDate ) {  }
	        }); //绑定输入框
	        $("#popupDatepicker_end").datepicker({
	            dateFormat:'yy-mm-dd',
	            onSelect: function( endDate ) {   }
	        });
	        $("#"+div_id).data("initevent","true");
	        $("#"+div_id+"  .btn_search").click();
	    } ,
    //充值记录
    init_recharge : function() {
        var div_id = "recharge_div";
        if( $("#"+div_id).data("initevent") == "true") {
            return;
        }
        function dateValueInit(){
            //给日期控件赋上默认值
            var dateType = {
                "0":0, "1":-7, "2":-14, "3":-30,"4":-90,"other":-10
            };
            var time = new Date().getTime();
            var static_value_hm = 1000*60*60*24;//静态常量，一天的毫秒数
            $("#"+div_id+" .datepicker_start").val( _util.getDateStr( time + static_value_hm*dateType[ $("#"+div_id+" .datatype_select").val() ] ) );
            $("#"+div_id+" .datepicker_end").val( _util.getDateStr(time) );
        }
        if("other" == $("#"+div_id+"  .datatype_select"))  {
            dateValueInit();
        }
        //时间下拉绑定事件
        $("#"+div_id+"  .datatype_select").bind("change",function(){
            dateValueInit();
            if( "other" == $(this).val()) {
                $("#"+div_id+" .div_date").css("display","inline-block");
            } else {
                $("#"+div_id+" .div_date").css("display","none");
            }
        });

        //初始化 分页 div的样式
        function pageDiv( pageNum , PageAllRecordCount ,sumAmount) {
            if(pageNum >= 1) {
                laypage({
                    cont: $("#"+div_id+" .page"), //容器。值支持id名、原生dom对象，jquery对象,
                    pages:pageNum , //总页数
                    skip: true, //是否开启跳页
                    skin: '#AF0000',
                    groups: 4, //连续显示分页数
                    jump: function(obj, first){ //触发分页后的回调
                        if(!first){
                            if( $("#"+div_id+" .page").data("pageindex") == obj.curr) { // 无需重复查询当前页的数据
                                //return;
                            }
//                          getList(obj.curr);
                        }
                    }
                });
                $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页， "+PageAllRecordCount+"笔）");
            }
            $("#"+div_id+" tfoot  .con_fr").html("交易额度:(<span class=\"red\">"+sumAmount+"</span>)");
        }

        

        //[搜索]按钮点击事件
        $("#"+div_id+"  .btn_search").bind("click",function(){
            //获得查询参数 并保存与 页面中
            var dateStr = "";
            if( "other" == $("#"+div_id+"  .datatype_select").val()  )
            {
                if( $("#"+div_id+" .datepicker_end").val() < $("#"+div_id+" .datepicker_start").val() )
                {
                    _alert("时间输入有误");
                    return;
                    //dateStr = "startdate="+$("#"+div_id+" .datepicker_end").val()+"&enddate="+$("#"+div_id+" .datepicker_start").val();
                }
                else
                {
                    dateStr = "startdate="+$("#"+div_id+" .datepicker_start").val()+"&enddate="+$("#"+div_id+" .datepicker_end").val();
                }
            }
            else
            {
                dateStr = "selected_time="+$("#"+div_id+"  .datatype_select").val();
            }

            var queryParamString = dateStr+"&pageCount="+page_value.pageRecordCount+"&deposit_status="+$("#"+div_id+" .deposit_status").val();
//            if( queryParamString != $("#"+div_id).data("queryparam") )
//            {
                $("#"+div_id).data("queryparam",queryParamString);
                //开始查询
//              getList( 1 );
//            }
        });

        //绑定时间控件
        $("#"+div_id+"  .datepicker_start").datepicker({
            dateFormat:'yy-mm-dd',
            onSelect: function( startDate ) {
        
            }
        }); //绑定输入框
        $("#"+div_id+"  .datepicker_end").datepicker({
            dateFormat:'yy-mm-dd',
            onSelect: function( endDate ) {
     
            }
        });

        $("#"+div_id).data("initevent","true");
        $("#"+div_id+"  .btn_search").click();
    },
    //提款记录
    init_withdrawal:function() {
        var div_id = "withdrawal_div";
        if($("#"+div_id).data("initevent") == "true") {
            return;
        }
        
        function dateValueInit(){
            //给日期控件赋上默认值
            var dateType = {
                "0":0, "1":-7, "2":-14, "3":-30,"4":-90,"other":-10
            };
            var time = new Date().getTime();
            var static_value_hm = 1000*60*60*24;//静态常量，一天的毫秒数
            $("#"+div_id+" .datepicker_start").val( _util.getDateStr( time + static_value_hm*dateType[ $("#"+div_id+" .datatype_select").val() ] ) );
            $("#"+div_id+" .datepicker_end").val( _util.getDateStr(time) );
        }
        if("other" == $("#"+div_id+"  .datatype_select")) {
            dateValueInit();
        }
        //时间下拉绑定事件
        $("#"+div_id+" .datatype_select").bind("change",function(){
            dateValueInit();
            if("other" == $(this).val()) {
                $("#"+div_id+" .div_date").css("display","inline-block");
            } else {
                $("#"+div_id+" .div_date").css("display","none");
            }
        });

        //初始化 分页 div的样式
        function pageDiv(pageNum , PageAllRecordCount ,sumAmount) {
            if(pageNum >= 1)  {
                laypage({
                    cont: $("#"+div_id+" .page"), //容器。值支持id名、原生dom对象，jquery对象,
                    pages:pageNum , //总页数
                    skip: true, //是否开启跳页
                    skin: '#AF0000',
                    groups: 4, //连续显示分页数
                    jump: function(obj, first){ //触发分页后的回调
                        if(!first){
                            //if($("#"+div_id+" .page").data("pageindex") == obj.curr ) { // 无需重复查询当前页的数据
                            //    return;
                            //}
//                          getList(obj.curr);
                        }
                    }
                });
                $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页， "+PageAllRecordCount+"笔）");
            }
            $("#"+div_id+" tfoot  .con_fr").html("交易额度:(<span class=\"red\">"+sumAmount+"</span>)");
        }

        

        //[搜索]按钮点击事件
        $("#"+div_id+"  .btn_search").bind("click",function(){
            //获得查询参数 并保存与 页面中
            var dateStr = "";
            if( "other" == $("#"+div_id+"  .datatype_select").val()  )
            {
                if( $("#"+div_id+" .datepicker_end").val() < $("#"+div_id+" .datepicker_start").val() )
                {
                    _alert("时间输入有误");
                    return;
                    //dateStr = "startdate="+$("#"+div_id+" .datepicker_end").val()+"&enddate="+$("#"+div_id+" .datepicker_start").val();
                }
                else
                {
                    dateStr = "startdate="+$("#"+div_id+" .datepicker_start").val()+"&enddate="+$("#"+div_id+" .datepicker_end").val();
                }
            }
            else
            {
                dateStr = "selected_time="+$("#"+div_id+"  .datatype_select").val();
            }

            var queryParamString = dateStr+"&pageCount="+page_value.pageRecordCount+"&type="+$("#"+div_id+" .deposit_status").val();
//            if( queryParamString != $("#"+div_id).data("queryparam") )
//            {
                $("#"+div_id).data("queryparam",queryParamString);
                //开始查询
//              getList( 1 );
//            }
        });

        //绑定时间控件
        $("#"+div_id+"  .datepicker_start").datepicker({
            dateFormat:'yy-mm-dd',
            onSelect: function( startDate ) { }
        }); //绑定输入框
        $("#"+div_id+"  .datepicker_end").datepicker({
            dateFormat:'yy-mm-dd',
            onSelect: function( endDate ) { }
        });

        $("#"+div_id).data("initevent","true");
        $("#"+div_id+"  .btn_search").click();
    },
    //投注消费
    init_consume : function()
    {
        var div_id = "consume_div";
        _util.transData(div_id,-3);
    },
    //交易明细
    init_trade:function(){
        var div_id = "trade_div";
        _util.transData(div_id,0);
    },
    //奖金派送
    init_prize:function(){
        var div_id = "prize_div";
        _util.transData(div_id,-5);
    },
    //投注消费(-3) ,  交易明细(0) ，  奖金派送 (-5)
    transData:function( div_id , flag ){
        if(  $("#"+div_id).data("initevent") == "true" )
        {
            return;
        }
        function dateValueInit(){
            //给日期控件赋上默认值
            var dateType = {
                "0":0, "1":-7, "2":-14, "3":-30,"4":-90,"other":-10
            };
            var time = new Date().getTime();
            var static_value_hm = 1000*60*60*24;//静态常量，一天的毫秒数
            $("#"+div_id+" .datepicker_start").val( _util.getDateStr( time + static_value_hm*dateType[ $("#"+div_id+" .datatype_select").val() ] ) );
            $("#"+div_id+" .datepicker_end").val( _util.getDateStr(time) );
        }
        if(   "other" == $("#"+div_id+"  .datatype_select") )
        {
            dateValueInit();
        }
        //时间下拉绑定事件
        $("#"+div_id+"  .datatype_select").bind("change",function(){
            dateValueInit();
            if( "other" == $(this).val() )
            {
                $("#"+div_id+" .div_date").css("display","inline-block");
            }
            else
            {
                $("#"+div_id+" .div_date").css("display","none");
            }
        });

        //初始化 分页 div的样式
        function pageDiv( pageNum , PageAllRecordCount ,sumAmount)
        {
            if( pageNum >= 1 )
            {
                laypage({
                    cont: $("#"+div_id+" .page"), //容器。值支持id名、原生dom对象，jquery对象,
                    pages:pageNum , //总页数
                    skip: true, //是否开启跳页
                    skin: '#AF0000',
                    groups: 4, //连续显示分页数
                    jump: function(obj, first){ //触发分页后的回调
                        if(!first){
                            if( $("#"+div_id+" .page").data("pageindex") == obj.curr ) { // 无需重复查询当前页的数据
                                //return;
                            }
//                          getList(obj.curr);
                        }
                    }
                });
                $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页， "+PageAllRecordCount+"笔）");
            }
            $("#"+div_id+" tfoot  .con_fr").html("交易额度:(<span class=\"red\">"+sumAmount+"</span>)");
        }

        

        //[搜索]按钮点击事件
        $("#"+div_id+"  .btn_search").bind("click",function(){
            //获得查询参数 并保存与 页面中
            var dateStr = "";
            if("other" == $("#"+div_id+"  .datatype_select").val()) {
                if($("#"+div_id+" .datepicker_end").val() < $("#"+div_id+" .datepicker_start").val()) {
                    _alert("时间输入有误");
                    return;
                } else {
                    dateStr = "startdate="+$("#"+div_id+" .datepicker_start").val()+"&enddate="+$("#"+div_id+" .datepicker_end").val();
                }
            } else {
                dateStr = "selected_time="+$("#"+div_id+"  .datatype_select").val();
            }

            var queryParamString = "type="+flag+"&"+dateStr+"&pageCount="+page_value.pageRecordCount;
            $("#"+div_id).data("queryparam",queryParamString);
//          getList(1);
        });

        //绑定时间控件
        $("#"+div_id+"  .datepicker_start").datepicker({
            dateFormat:'yy-mm-dd',
            onSelect: function( startDate ) {
            }
        }); //绑定输入框
        $("#"+div_id+"  .datepicker_end").datepicker({
            dateFormat:'yy-mm-dd',
            onSelect: function( endDate ) {
            }
        });
        $("#"+div_id).data("initevent","true");
        $("#"+div_id+"  .btn_search").click();
    },
    
    //签到记录
    init_checkin:function() {
        var div_id = "checkin_div";
        if($("#"+div_id).data("initevent") == "true") {
            return;
        }
        
        //初始化 分页 div的样式
        function pageDiv(pageNum , PageAllRecordCount ,sumAmount) {
            if(pageNum >= 1)  {
                laypage({
                    cont: $("#"+div_id+" .page"), //容器。值支持id名、原生dom对象，jquery对象,
                    pages:pageNum , //总页数
                    skip: true, //是否开启跳页
                    skin: '#AF0000',
                    groups: 4, //连续显示分页数
                    jump: function(obj, first){ //触发分页后的回调
                        if(!first){
//                          getList(obj.curr);
                        }
                    }
                });
                $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页， "+PageAllRecordCount+"笔）");
            }
        }
        
        
        
        $("#"+div_id).data("initevent","true");
//      getList( 1 );
    },
    
    //推荐收益
    init_spread:function() {
        var div_id = "spread_div";
        if($("#"+div_id).data("initevent") == "true") {
            return;
        }
        
        //初始化 分页 div的样式
        function pageDiv(pageNum , PageAllRecordCount ,sumAmount) {
            if(pageNum >= 1)  {
                laypage({
                    cont: $("#"+div_id+" .page"), //容器。值支持id名、原生dom对象，jquery对象,
                    pages:pageNum , //总页数
                    skip: true, //是否开启跳页
                    skin: '#AF0000',
                    groups: 4, //连续显示分页数
                    jump: function(obj, first){ //触发分页后的回调
                        if(!first){
//                          getList(obj.curr);
                        }
                    }
                });
                $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页， "+PageAllRecordCount+"笔）");
            }
        }
        
        
        
        $("#"+div_id).data("initevent","true");
//      getList( 1 );
    }
};
$(function(){
	$("#menu").find("li").on("click",function(){
    	var _href=$(this).attr("href");
    	if($(this).attr("id")=='customerService') {
    		window.open(_href);
    	} else {
    		location.href=document.getElementById('base_path').href+_href;
    	}
    });
    //下面方法毋改顺序
    _util.initData();
    var _tab = _util.getUrl("tab");
    if(_tab == null || _tab == 1) _util.init_bet();
    else if(_tab == 2) $("#recharge_div_1").click();
    else if(_tab == 3) $("#withdrawal_div_1").click();
    else if(_tab == 4) $("#consume_div_1").click();
    else if(_tab == 5) $("#prize_div_1").click();
    else if(_tab == 6) $("#trade_div_1").click();
    else if(_tab == 7) $("#checkin_div_1").click();
    else if(_tab == 8) $("#spread_div_1").click();
});