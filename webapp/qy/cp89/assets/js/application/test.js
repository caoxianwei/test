requirejs(["jquery","datePicker"], function($) {
	var lotIds = ',26,27,28,29,'; //add 7  fot it
	$(document).ready(function(){
	    createModelTbale();
	    liClickEvent();
	    timeBoxEvent();
	    getLotteryResult();
	    //refreshPageTimer();
	    
	});
	
	function parentH(){
		window.parent.$("div[name=iframe_div]").css("height", $("body").height());
	}
	
	String.prototype.padLeft = function(padChar, width) { 
		var ret = this; 
		while (ret.length < width) { 
			if (ret.length + padChar.length < width) { 
				ret = padChar + ret; 
			} else { 
				ret = padChar.substring(0, width-ret.length) + ret; 
			} 
		} 
		return ret; 
	}; 
	
	/*
	 * 按下标删除
	 */
	Array.prototype.remove = function(dx)
	{
	    if(isNaN(dx) || dx >= this.length) { return false;}
	    var len = this.length - 1;
	    for(var i = 0, n = 0; i < len; i++) {
	        if (i >= dx) {
	            this[i] = this[i+1];
	        }
	    }
	    this.length -= 1;
	}

	//定时刷新页面定时器
	page_start = new Date() - 0;
	page_keep = 1200;
	auto_refresh_page = '';
	function refreshPageTimer() {
	    auto_refresh_page = window.setInterval(function () {
	        var tmp = new Date() - 0;
	        tmp = parseInt((tmp - page_start) / 1000);
	        if (page_keep == null || page_keep == undefined
	            || page_keep == '' || page_start == undefined
	            || tmp > page_keep) {
	            clearInterval(auto_refresh_page);
	            location.href = location.href;
	        }
	    }, 1000);
	}

	function getLotteryResult(){
	    var date = $('#cqssc_draw_time_box').val();
	    var id = $('#lottery-id').val();
	    $('#search_result_day').html(date);
	
	    $.ajax({
	        url:'common/drawResult/many',
	        type:'post',
	        dataType:'json',
	        data:{date:date, id:id},
	        timeout:timeOut,
	        success:function(results){
	            var data=results.data;
	            $('.open_num').html('');//需清除旧界面数据
	            if(id == 18) {
	            	var htmlSpan = '';
	            	$.each(data.dataList, function(k, v){
	            		var arrNum = [], arrSx = [], tmp = '', tmpNum = '', tmpNum1 = '';
	            		if(v.content != null && v.content != undefined && v.content != '') {
		                	arrNum = v.content.split(',');
		                	arrSx = v.originalContent.split(',');
		                }
	            		if (v.content == null || v.content == undefined || v.content == '') {
	            			tmp = '<tr><td></td></tr>';
		                } else if(arrNum.length >= 1 && arrNum[0] != '') {
		                	tmpNum += '<span class="col-' + arrNum[0] + ' lh_ball">' + arrNum[0] + '</span>';
		                	tmpNum += '<span class="col-' + arrNum[1] + ' lh_ball">' + arrNum[1] + '</span>';
		                	tmpNum += '<span class="col-' + arrNum[2] + ' lh_ball">' + arrNum[2] + '</span>';
		                	tmpNum += '<span class="col-' + arrNum[3] + ' lh_ball">' + arrNum[3] + '</span>';
		                	tmpNum += '<span class="col-' + arrNum[4] + ' lh_ball">' + arrNum[4] + '</span>';
		                	tmpNum += '<span class="col-' + arrNum[5] + ' lh_ball">' + arrNum[5] + '</span>';
		                	tmpNum += '<span style="margin-right:5px;">+</span><span class="col-' + arrNum[6] + ' lh_ball">' + arrNum[6] + '</span>';
		                	
		                	tmpNum1 += '<span class="col-sx">' + arrSx[0] + '</span>';
		                	tmpNum1 += '<span class="col-sx">' + arrSx[1] + '</span>';
		                	tmpNum1 += '<span class="col-sx">' + arrSx[2] + '</span>';
		                	tmpNum1 += '<span class="col-sx">' + arrSx[3] + '</span>';
		                	tmpNum1 += '<span class="col-sx">' + arrSx[4] + '</span>';
		                	tmpNum1 += '<span class="col-sx">' + arrSx[5] + '</span>';
		                	tmpNum1 += '<span style="margin-right:5px;">+</span><span class="col-sx">' + arrSx[6] + '</span>';
		                	
		                	tmp = '<tr><td><span class="text1">' + v.period + '</span><span class="text2">' + v.openTime + '</span><span class="text2" style="width: 300px;">' + tmpNum + '</span><span>' + tmpNum1 + '</span></td></tr>';
		                }
	            		htmlSpan += tmp;
	            	})
	            	$('#lhc_draw_list_tbody').html(htmlSpan);
	            	parentH();
	            } else {
		            var cntNum = 0;
		            $.each(data.dataList, function(k, v){
		                var spanId = '#draw_td_'+ v.period.substr(8).padLeft('0', 3);
		                if(id==9) spanId = '#draw_td_' + v.period1;
		                var arrNum = [];
		                if(v.content != null && v.content != undefined && v.content != '') {
		                	arrNum = v.content.split(',');
		                }
		                var htmlSpan = '';
		                if (v.content == null || v.content == undefined || v.content == '') {
		                    htmlSpan = '';
		                    //if (!unOpenArr.contains(v.period)) {
		                    //    unOpenArr.push(v.period);//元素为完整期数
		                    //}
		                } else if(arrNum.length >= 1 && arrNum[0] != ''){
		                    htmlSpan = '<span class="text2"><span class="red_big">'+arrNum.join('&nbsp;')+'</span></span>';
		                    if(xtIni.hz == 1 && xtIni.xt == 1){
		                        htmlSpan = '<span class="text4"><span class="red_big">'+arrNum.join('&nbsp;')+'</span></span>';
		                    }else if(xtIni.ssc == 19 ){
		                        var strNum = switchKlpkNum(v.content);
		                        htmlSpan = '<span class="text2">' + strNum + '</span>';
		                    }
		                    if(id==10 || id==11 || id==17) {
		                    	htmlSpan = '<span class="text4">';
		                    	for(var tt=0;tt<arrNum.length;tt++) {
		                    		htmlSpan += '<span class="k3ball k3b' + arrNum[tt] + '"></span>';
		                    	}
		                    	htmlSpan += '</span>';
		                    } else if(id==9 || id==52) {
		                    	htmlSpan = '<span class="text2">';
		                    	for(var tt=0;tt<arrNum.length;tt++) {
		                    		htmlSpan += '<span class="pk10 pk10_' + arrNum[tt] + '"></span>';
		                    	}
		                    	htmlSpan += '</span>';
		                    }
		                    
		                    if( lotIds.indexOf(','+id+',') == -1 ){
		                        if(xtIni.dx.need == 1 && xtIni.jo == 1){
		                            var len = arrNum.length;
		                            var radio = [0,0];
		                            var radioJo = [0,0];
		                            for(var i = 0; i < len; i++){
		                                if(arrNum[i] > xtIni.dx.mid){
		                                    radio[0] = radio[0] + 1;
		                                }else{
		                                    radio[1] = radio[1] + 1;
		                                }
		                                if(arrNum[i] % 2 == 1){
		                                    radioJo[0] += 1;
		                                }else{
		                                    radioJo[1] += 1;
		                                }
		                            }
		                            htmlSpan += '<span class="text1">'+radio[0]+':'+radio[1]+'</span>';
		                            htmlSpan += '<span class="text1">'+radioJo[0]+':'+radioJo[1]+'</span>';
		                        }else if(xtIni.hz == 1 && xtIni.xt == 1){
		                            var len = arrNum.length;
		                            arrNum.sort()
		                            var hz = 0;
		                            var xt = '';
		                            for(var i = 0; i < len; i++){
		                                hz += parseInt(arrNum[i]);
		                            }
		                            var c1 = -1, c2 = -1;
		                            c2 = parseInt(arrNum[2]) - parseInt(arrNum[1]);
		                            c1 = parseInt(arrNum[1]) - parseInt(arrNum[0]);
		                            if(c1 == 1 && c2 == 1){
		                                xt = '三连号';
		                            }else if(c1 == 0 && c2 == 0){
		                                xt = '三同号';
		                            }else if((c1 == 0 && c2 != 0) || (c2 == 0 && c1 != 0)){
		                                xt = '二同号';
		                            }else{
		                                xt = '三不同号';
		                            }
		                            htmlSpan += '<span class="text1">'+hz+'</span>';
		                            htmlSpan += '<span class="text3">'+xt+'</span>';
		                        }else if(xtIni.ssc == 1){
		                            /*var zh = '',lh = '';
		                            ge = (parseInt(arrNum[3]) > 4 ? '大':'小') + (parseInt(arrNum[3]) % 2 == 1 ? '单':'双');
		                            shi = (parseInt(arrNum[4]) > 4 ? '大':'小') + (parseInt(arrNum[4]) % 2 == 1 ? '单':'双');
		                            if(arrNum[2] == arrNum[3] && arrNum[3] == arrNum[4]){
		                                hs = '豹子';
		                            }else if(arrNum[2] != arrNum[3] && arrNum[3] != arrNum[4] && arrNum[2] != arrNum[4]){
		                                hs = '组六';
		                            }else{
		                                hs = '组三';
		                            }*/
		                            var total = (parseInt(arrNum[0]) + parseInt(arrNum[1])
		                            		+ parseInt(arrNum[2]) + parseInt(arrNum[3]) + parseInt(arrNum[4]));
		                            
		                            var zh = (total >= 23 ? '大' : '小') + (total%2==0 ? '双' : '单');
		                            var lh = (parseInt(arrNum[0])>parseInt(arrNum[4])?'龙':(parseInt(arrNum[0])<parseInt(arrNum[4])?'虎':'和'));
		                            htmlSpan += '<span class="text1">'+zh+'</span>';
		                            htmlSpan += '<span class="text1">'+lh+'</span>';
		                           /* htmlSpan += '<span class="text1">'+hs+'</span>';*/
		                        }else if(xtIni.ssc == 19){
		                            var strNum = '--';
		                            var num1 = arrNum[0].substring(1,3);
		                            var num2 = arrNum[1].substring(1,3);
		                            var num3 = arrNum[2].substring(1,3);
		                            if(num1 == num2 && num1 == num3){
		                                strNum = '豹子';
		                            }else if((num1 == num2 && num2 != num3) || (num1 == num3 && num1 != num2) || (num2 == num3 && num2 != num1)){
		                                strNum = '对子';
		                            }
		                            htmlSpan += '<span class="text1">'+strNum+'</span>';
		                        }else if(xtIni.ssc == 34){
		                            var color = ['红','蓝','绿','黄','银','紫'];
		                            htmlSpan += '<span class="text1">'+color[parseInt((parseInt(arrNum[0]) - 1) / 2)]+
		                                color[parseInt((parseInt(arrNum[1]) - 1) / 2)]+color[parseInt((parseInt(arrNum[2]) - 1) / 2)]+'</span>';
		                        }
		                    }
		                }
		                $(spanId).html(htmlSpan);
		            });
		            /*if (date == GetDateStr(0)) {
		                getGongGaolastOpen();
		            } else {
		                clearInterval(auto_get_latest_open);
		            }*/
		            parentH();//改变父级iframe高度
		        }
	        }
	    });
	}

	var unOpenArr = new Array();//未开奖期数数组
	auto_remain_seconds = 300;//剩余秒数
	auto_get_latest_open = null;//定时器
	auto_get_open_num = null;//获取开奖号码定时器
	function createRemainTimer(nextPeriod) {
	    clearInterval(auto_get_latest_open);
	    auto_get_latest_open = window.setInterval(function () {
	        if (auto_remain_seconds <= 0 || nextPeriod == null || nextPeriod == undefined || nextPeriod == '') {//获取最新开奖信息
	            clearInterval(auto_get_latest_open);
	            getGongGaolastOpen(gameType, 0);//参数
	        }
	        var tmpTotalSec = auto_remain_seconds;
	        var d = parseInt(tmpTotalSec / (3600*24));//计算剩余的天数
	        tmpTotalSec -= 3600*24*d;
	        var h = parseInt(tmpTotalSec / 3600);//计算剩余的小时数
	        tmpTotalSec -= 3600*h;
	        var m = parseInt(tmpTotalSec / 60);//计算剩余的分钟数
	        tmpTotalSec -= 60*m;
	        var s = tmpTotalSec;//计算剩余的秒数
	        auto_remain_seconds--;
	        //设置倒计时
	        var tmpHtml = '距离开奖还剩：<span class="red">' + m + '分' + s + '秒</span><a onclick="goBet()" class="orangebg_btn bet_btn">投注</a>';
	
	        if($('#draw_td_' + nextPeriod).html() == '' || $('#draw_td_' + nextPeriod).html() == undefined  || $('#draw_td_' + nextPeriod).html().indexOf('距离开奖') >= 0){
	            $('#draw_td_' + nextPeriod).html(tmpHtml);
	        }
	        if (m == 0 && s == 0) {//倒计时为零
	            if($('#draw_td_' + nextPeriod).html() == '' || $('#draw_td_' + nextPeriod).html() == undefined){
	                $('#draw_td_' + nextPeriod).html('正在开奖...');
	            }
	        }
	    }, 1000);
	}

	//获取开奖号码定时器
	function createGetNumTimer() {
	    clearInterval(auto_get_open_num);
	    auto_get_open_num = window.setInterval(function () {
	        if (unOpenArr.length > 0) {
	            clearInterval(auto_get_open_num);
	            getOpenNum(gameType);
	        }
	    }, 30000);
	}

	$(function() {
	    //createGetNumTimer();
	});

	function getOpenNum(gameId) {
	    $.ajax({
	        url:'/draw/ajaxGetOpenNum.html',
	        type:'post',
	        dataType:'json',
	        data:{periods:unOpenArr, gameId:gameId},
	        timeout:timeOut,
	        success:function(results) {
	            var data=results.data;
	            //设置数据
	            if (data.Result == null || data.Result == undefined || data.Result == '') {
	                createGetNumTimer();
	                return;
	            }
	            for (var i = 0; i < data.RecordCount; i++) {
	                if (data.Records[i].sOpenNum == null || data.Records[i].sOpenNum == undefined
	                    || data.Records[i].sOpenNum == '') {
	                    continue;
	                }
	                var tmpPeriod = data.Records[i].sGamePeriod.substr(8);
	                //设置开奖号码
	                var arrNum = data.Records[i].sOpenNum.split('|');
	                var htmlSpan = '<span class="text2"><span class="red_big">'+arrNum.join('&nbsp;')+'</span></span>';
	                if(xtIni.hz == 1 && xtIni.xt == 1){
	                    htmlSpan = '<span class="text4"><span class="red_big">'+arrNum.join('&nbsp;')+'</span></span>';
	                }else if(xtIni.ssc == 19){
	                    var strNum = switchKlpkNum(v.content);
	                    htmlSpan = '<span class="text2">' + strNum + '</span>';
	                }
	                if((xtIni.ssc == 1) && (gameId == 7)){
	                    var ge = '',shi = '', hs='';
	                    ge = (parseInt(arrNum[3]) > 4 ? '大':'小') + (parseInt(arrNum[3]) % 2 == 1 ? '单':'双');
	                    shi = (parseInt(arrNum[4]) > 4 ? '大':'小') + (parseInt(arrNum[4]) % 2 == 1 ? '单':'双');
	                    if(arrNum[2] == arrNum[3] && arrNum[3] == arrNum[4]){
	                        hs = '豹子';
	                    }else if(arrNum[2] != arrNum[3] && arrNum[3] != arrNum[4] && arrNum[2] != arrNum[4]){
	                        hs = '组六';
	                    }else{
	                        hs = '组三';
	                    }
	                    htmlSpan += '<span class="text1">'+ge+'</span>';
	                    htmlSpan += '<span class="text1">'+shi+'</span>';
	                    htmlSpan += '<span class="text1">'+hs+'</span>';
	                }
	                if( lotIds.indexOf(gameId) == -1 ){
	                    if(xtIni.dx.need == 1 && xtIni.jo == 1){
	                        var len = arrNum.length;
	                        var radio = [0,0];
	                        var radioJo = [0,0];
	                        for(var j = 0; j < len; j++){
	                            if(arrNum[j] > xtIni.dx.mid){
	                                radio[0] = radio[0] + 1;
	                            }else{
	                                radio[1] = radio[1] + 1;
	                            }
	                            if(arrNum[j] % 2 == 1){
	                                radioJo[0] += 1;
	                            }else{
	                                radioJo[1] += 1;
	                            }
	                        }
	                        htmlSpan += '<span class="text1">'+radio[0]+':'+radio[1]+'</span>';
	                        htmlSpan += '<span class="text1">'+radioJo[0]+':'+radioJo[1]+'</span>';
	                    }else if(xtIni.hz == 1 && xtIni.xt == 1){
	                        var len = arrNum.length;
	                        arrNum.sort();
	                        var hz = 0;
	                        var xt = '';
	                        for(var j = 0; j < 3; j++){
	                            hz += parseInt(arrNum[j]);
	                        }
	                        var c1 = -1, c2 = -1;
	                        c2 = parseInt(arrNum[2]) - parseInt(arrNum[1]);
	                        c1 = parseInt(arrNum[1]) - parseInt(arrNum[0]);
	                        if(c1 == 1 && c2 == 1){
	                            xt = '三连号';
	                        }else if(c1 == 0 && c2 == 0){
	                            xt = '三同号';
	                        }else if((c1 == 0 && c2 != 0) || (c2 == 0 && c1 != 0)){
	                            xt = '二同号';
	                        }else{
	                            xt = '三不同号';
	                        }
	                        htmlSpan += '<span class="text1">'+hz+'</span>';
	                        htmlSpan += '<span class="text3">'+xt+'</span>';
	                    }else if(xtIni.ssc == 1){
	                        var ge = '',shi = '', hs='';
	                        ge = (parseInt(arrNum[3]) > 4 ? '大':'小') + (parseInt(arrNum[3]) % 2 == 1 ? '单':'双');
	                        shi = (parseInt(arrNum[4]) > 4 ? '大':'小') + (parseInt(arrNum[4]) % 2 == 1 ? '单':'双');
	                        if(arrNum[2] == arrNum[3] && arrNum[3] == arrNum[4]){
	                            hs = '豹子';
	                        }else if(arrNum[2] != arrNum[3] && arrNum[3] != arrNum[4] && arrNum[2] != arrNum[4]){
	                            hs = '组六';
	                        }else{
	                            hs = '组三';
	                        }
	                        htmlSpan += '<span class="text1">'+ge+'</span>';
	                        htmlSpan += '<span class="text1">'+shi+'</span>';
	                        htmlSpan += '<span class="text1">'+hs+'</span>';
	                    }else if(xtIni.ssc == 19){
	                        var strNum = '--';
	                        var num1 = arrNum[0].substring(1,3);
	                        var num2 = arrNum[1].substring(1,3);
	                        var num3 = arrNum[2].substring(1,3);
	                        if(num1 == num2 && num1 == num3){
	                            strNum = '豹子';
	                        }else if((num1 == num2 && num2 != num3) || (num1 == num3 && num1 != num2) || (num2 == num3 && num2 != num1)){
	                            strNum = '对子';
	                        }
	                        htmlSpan += '<span class="text1">'+strNum+'</span>';
	                    }
	                }
	                $('#draw_td_'+tmpPeriod).html(htmlSpan);
	                //删除已开奖号码
	                for (var k = 0; k < unOpenArr.length; k++) {
	                    //console.log(unOpenArr);console.log('mad');console.log(data.Records[i].sGamePeriod);
	                    if (unOpenArr[k] == data.Records[i].sGamePeriod) {
	                        //unOpenArr.splice(k, 1);//待测试
	                        unOpenArr.remove(k);
	                    }
	                }
	            }
	            createGetNumTimer();
	        }
	    });
	}

	function getGongGaolastOpen(gameId, dateType) {
	    dateType = (dateType == null || dateType == undefined || dateType == '') ? 0 : dateType;
	    $.ajax({
	        url:'/draw/ajaxLatestResult.html',
	        type:'post',
	        dataType:'json',
	        data:{dateType:dateType, gameId:gameId},
	        timeout:timeOut,
	        success:function(results) {
	            var data=results.data;
	            //设置数据
	            if (data.Result == null || data.Result == undefined || data.Result == '') {
	                auto_remain_seconds = 0;
	                createRemainTimer();
	                return;
	            }
	            var nextPeriod = '';
	            auto_remain_seconds = 0;
	            for (var i = 0; i < data.Records.length; i++) {
	                if(data.Records[i].period ==null || data.Records[i].period ==undefined){
	                    data.Records[i].period='';
	                }
	
	                var tmpPeriod = data.Records[i].period.substr(8);
	                if (data.Records[i].flag == -1 &&
	                    (data.Records[i].openNum == null || data.Records[i].openNum == undefined || data.Records[i].openNum == '')) {
	                    $('#draw_td_'+tmpPeriod).html('正在开奖...');
	                    if (!unOpenArr.contains(data.Records[i].period)) {
	                        unOpenArr.push(data.Records[i].period);//元素为完整期数
	                    }
	                    continue;
	                }
	
	                if (data.Records[i].flag == -1 && tmpPeriod < nextPeriod) {//最新开奖。注意：要显示的期数需小于当前期数，否则就是昨天的数据
	                    var arrNum = data.Records[i].openNum.split('|');
	                    var htmlSpan = '<span class="text2"><span class="red_big">'+arrNum.join('&nbsp;')+'</span></span>';
	                    if(xtIni.hz == 1 && xtIni.xt == 1){
	                        htmlSpan = '<span class="text4"><span class="red_big">'+arrNum.join('&nbsp;')+'</span></span>';
	                    }else if(xtIni.ssc == 19){
	                        var strNum = switchKlpkNum(data.Records[i].openNum);
	                        htmlSpan = '<span class="text2">' + strNum + '</span>';
	                    }
	                    if(xtIni.dx.need == 1 && xtIni.jo == 1){
	                        var len = arrNum.length;
	                        var radio = [0,0];
	                        var radioJo = [0,0];
	                        for(var j = 0; j < len; j++){
	                            if(arrNum[j] > xtIni.dx.mid){
	                                radio[0] = radio[0] + 1;
	                            }else{
	                                radio[1] = radio[1] + 1;
	                            }
	                            if(arrNum[j] % 2 == 1){
	                                radioJo[0] += 1;
	                            }else{
	                                radioJo[1] += 1;
	                            }
	                        }
	                        htmlSpan += '<span class="text1">'+radio[0]+':'+radio[1]+'</span>';
	                        htmlSpan += '<span class="text1">'+radioJo[0]+':'+radioJo[1]+'</span>';
	                    }else if(xtIni.hz == 1 && xtIni.xt == 1){
	                        var len = arrNum.length;
	                        arrNum.sort();
	                        var hz = 0;
	                        var xt = '';
	                        for(var j = 0; j < 3; j++){
	                            hz += parseInt(arrNum[j]);
	                        }
	                        var c1 = -1, c2 = -1;
	                        c2 = parseInt(arrNum[2]) - parseInt(arrNum[1]);
	                        c1 = parseInt(arrNum[1]) - parseInt(arrNum[0]);
	                        if(c1 == 1 && c2 == 1){
	                            xt = '三连号';
	                        }else if(c1 == 0 && c2 == 0){
	                            xt = '三同号';
	                        }else if((c1 == 0 && c2 != 0) || (c2 == 0 && c1 != 0)){
	                            xt = '二同号';
	                        }else{
	                            xt = '三不同号';
	                        }
	                        htmlSpan += '<span class="text1">'+hz+'</span>';
	                        htmlSpan += '<span class="text3">'+xt+'</span>';
	                    }else if(xtIni.ssc == 1){
	                        var ge = '',shi = '', hs='';
	                        ge = (parseInt(arrNum[3]) > 4 ? '大':'小') + (parseInt(arrNum[3]) % 2 == 1 ? '单':'双');
	                        shi = (parseInt(arrNum[4]) > 4 ? '大':'小') + (parseInt(arrNum[4]) % 2 == 1 ? '单':'双');
	                        if(arrNum[2] == arrNum[3] && arrNum[3] == arrNum[4]){
	                            hs = '豹子';
	                        }else if(arrNum[2] != arrNum[3] && arrNum[3] != arrNum[4] && arrNum[2] != arrNum[4]){
	                            hs = '组六';
	                        }else{
	                            hs = '组三';
	                        }
	                        htmlSpan += '<span class="text1">'+ge+'</span>';
	                        htmlSpan += '<span class="text1">'+shi+'</span>';
	                        htmlSpan += '<span class="text1">'+hs+'</span>';
	                    }else if(xtIni.ssc == 19){
	                        var strNum = '--';
	                        var num1 = arrNum[0].substring(1,3);
	                        var num2 = arrNum[1].substring(1,3);
	                        var num3 = arrNum[2].substring(1,3);
	                        if(num1 == num2 && num1 == num3){
	                            strNum = '豹子';
	                        }else if((num1 == num2 && num2 != num3) || (num1 == num3 && num1 != num2) || (num2 == num3 && num2 != num1)){
	                            strNum = '对子';
	                        }
	                        htmlSpan += '<span class="text1">'+strNum+'</span>';
	                    }
	                    $('#draw_td_'+tmpPeriod).html(htmlSpan);
	                } else if (data.Records[i].flag == 1) {//下一期倒计时信息
	                    nextPeriod = tmpPeriod;
	                    auto_remain_seconds = data.Records[i].leftSeconds;
	                }
	            }
	            createRemainTimer(nextPeriod);
	        }
	    });
	}

	function createModelTbale(){
	    var htmlTable = '';
	    for(var i = 1; i <= line; i++){
	        var htmlTr = '';
	        if(i % 2 == 0){
	            htmlTr = '<tr class="bgcolor">';
	        }else{
	            htmlTr = '<tr>';
	        }
	        for(var j = 0; j <= 2; j++){
	            var index = line * j + i;
	            index = pad(index, 3);
	            if( lotIds.indexOf(','+gameType+',') > -1 && index > 97 ){
	                index = '';
	            }
	            //时时乐每天23期.江苏快三82期.
	            if ((gameType == 3 && index > 23) || (gameType == 10 && index > 82)
	                || (gameType == 11 && index > 80) || (gameType == 16 && index > 79)
	                || (gameType == 51 && index > 460) || (gameType == 52 && index > 460)
	                || (gameType == 9 && index > 179) || (gameType == 53 && index > 920)) {
	                htmlTr += '<td></td>';
	            } else {
	                var per = $("#sl_draw_list_t_tab  .active").attr("date").split("-").join("");
	                htmlTr += '<td><span class="text1">' +index + '</span><span class="123 open_num" id="draw_td_' + index + '"></span></td>';
	            }
	        }
	        htmlTr += '</tr>';
	        htmlTable += htmlTr;
	    }
	    $('#cqssc_draw_list_tbody').html(htmlTable);
	}

	function liClickEvent(){
	    $('#sl_draw_list_t_tab li').click(function(){
	        if(!$(this).hasClass('active')){
	            $('#sl_draw_list_t_tab li').each(function(){
	                $(this).removeClass('active');
	            });
	            $(this).addClass('active');
	            var date = $(this).attr('date');
	            $('#search_result_day').html(date);
	            $('#cqssc_draw_time_box').val(date);
	            getLotteryResult();
	        }
	        createModelTbale();
	    });
	}
	
	function timeBoxEvent(){
	    $('#cqssc_draw_time_box').click(function(){
	        getLotteryResult();
	    });
	}

	function pad(num, n) {
	    var len = num.toString().length;
	    while(len < n) {
	        num = "0" + num;
	        len++;
	    }
	    return num;
	}

	function goBet(url){
	    var el = document.createElement("a");
	    document.body.appendChild(el);
	    if (url == null || url == undefined || url == '') {
	        url = betUrl;
	    }
	    __openWin("lottery_hall",url);
	    document.body.removeChild(el);
	}

	function GetDateStr(AddDayCount) {
	    var dd = new Date();
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    m = (m < 10) ? '0'+m : m;
	    var d = dd.getDate();
	    d = (d < 10) ? '0'+d : d;
	    return y+"-"+m+"-"+d;
	}

	$(function(){
	    function AddFavorite(sURL, sTitle) {
	        try {
	            window.external.addFavorite(sURL, sTitle);
	        } catch (e) {
	            try {
	                window.sidebar.addPanel(sTitle, sURL, "");
	            } catch (e) {
	                alert("请使用Ctrl+D进行添加");
	            }
	        }
	    }
	    $('div.link_r').find('a').on('click',function(){
	        AddFavorite(location.herf,'新彩');
	        return false;
	    });
	
	    //绑定时间控件
	    try{
	        $("#cqssc_draw_time_box").datepicker({
	            dateFormat:'yy-mm-dd',
	            onSelect: function( startDate ) {
	                if(startDate != ''){
	                    var date = $('#cqssc_draw_time_box').val();
	                    $('#search_result_day').html(date);
	                    $('#sl_draw_list_t_tab li').removeClass('active');
	                    $('#sl_draw_list_t_tab li').each(function(){
	                        if($(this).attr('date') == date){
	                            $(this).addClass('active');
	                        }
	                    });
	                } else {
	                    return;
	                }
	                getLotteryResult();
	            }
	        });
	    }catch(e){}
	});  
});