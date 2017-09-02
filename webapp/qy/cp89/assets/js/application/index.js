requirejs(["jquery", "layer", "home_menu", "user", "slide"], function($, layer, home_menu) {
    home_menu(); //memu功能函数
    $(function() {
        //轮播
        $("#slideBox").slide({ mainCell: ".bd ul", effect: "fold", autoPlay: true, autoPage: true, titCell: ".hd ul" });
        //二维码下载
        $('.down-apple').click(function() {
            $('#img-apple').show();
            $('#img-andoid').hide();
        });
        $('.down-andoid').click(function() {
            $('#img-apple').hide();
            $('#img-andoid').show();
        });
        //公告，指南
        $("#help-tab").find("li").on("mouseover", function(e) {
            e.preventDefault();
            $("#help-tab").find("li").removeClass('on');
            $(this).addClass('on');
            var index = $(this).index();
            $("#help-cnt").children('ul').hide();
            $("#help-cnt").children('ul').eq(index).show();
        });

        //高频彩，低频彩开奖
        //获取高频彩开奖公告。
        getLastAndNextPeriod();
        function getLastAndNextPeriod() {
            $.ajax({
                'url': 'common/lottery/getLatestOpen',
                'dataType': 'json',
                'type': 'post',
                'data':{type:1},
                'success': function(results) {
                    if(results.status=="200"){
                        var data=results.data;
                        try {
                        if (session_timeout(data) === false) {
                            return false;
                        }
                    } catch (e) { console.log(e); }
                    if (!data.Records || data.Records.length == 0) {
                        return;
                    }
                    var txtSscHtml = ''; //时时彩最新开奖信息
                    var txtQtHtml = ''; //体彩最新开奖信息
                    var openArr = [];
                    var tmpArr = [];
                    var nextArr = new Array(1, 5, 9, 2, 12); //下一期彩种列表
                    for (var i = 0; i < data.Records.length; i++) {
                        tmpArr = data.Records[i].period_opennum_opentime.split('___');
                        if (tmpArr.length != 3)
                            continue;
                        openArr = new Array();
                        if (tmpArr[1] != '' && tmpArr[1] != undefined) {
                            openArr = tmpArr[1].split(',');
                        }
                        if (data.Records[i].flag == 'max') { //时时彩
                            var perName = tmpArr[0];
                            if (data.Records[i].gid == 9) {
                                perName = tmpArr[0];
                            }
                            if (data.Records[i].gid == 19) {
                                for (var t = 0; t < 3; t++) {
                                    openArr[t] = switchKlpkOneNum(openArr[t]);
                                }
                            }
                            if (data.Records[i].gid != 9) { //去掉北京赛车，因为开奖号码太长，样式有问题。
                                txtSscHtml += '' + '<li>' + '<div>' + '<span class="lot-name"><a onclick=\"__location(\'common/draw\')\">' + data.Records[i].gname + '&nbsp;</a>' + perName + '期</span>' + '<span class="term">' + tmpArr[2].substr(0, 10) + '</span>' + '<span class="clear"></span>' + '<div class="clear"></div>';

                                var openLen = openArr.length;
                                if(openLen <= 0 || openArr == 'null') {
                                	txtSscHtml += '<div class="redball">正</div><div class="redball">在</div><div class="redball">开</div><div class="redball">奖</div>';
                                } else {
                                	for (var j = 0; j < openLen; j++) {
                                        txtSscHtml += '<div class="redball">' + openArr[j] + '</div>';
                                    }
                                }
                                txtSscHtml += '<br>' + '<div class="fr">' + '<a  onclick="__location(\'common/trend?gameOpen=' + data.Records[i].gid + '\');" >走势</a>' + '　|　<a  onclick="__location(\'' + data.Records[i].link + '\');">投注</a>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</li>';
                            }
                        }
                    }
                    if (nextArr.length > 0) {
                        nextArr.forEach(function(v) {
                            $('#quick_' + v).remove();
                        });
                    }

                    $('#lastOpenSsc').html(txtSscHtml);
                    $('#lastOpenQt').html(txtQtHtml);
                    }
                },
                error: function(XMLHttpRequest, status) {
                    process_timeout(status);
                }
            });
        }
        lowDataAleady = false;
        $('.tab-sel').on('mouseover', function(e) { //各彩种开奖公告

            for (i = 1; i < 3; i++) { //共3个标签
                if (i == $(this).data('val')) {
                    $('#tab-cont-' + i).css('display', '');
                } else {
                    $('#tab-cont-' + i).css('display', 'none');
                }
            }
            $('.tab-sel').removeClass("on");
            $(this).addClass("on");
            if ($(this).attr('data-val') == 2 && $('#lastOpenQt').html() === '' && lowDataAleady == false) { //获取低频彩
                lowDataAleady = true;
                $.ajax({
                    'url': 'common/lottery/getLatestOpen',
                    'dataType': 'json',
                    'type': 'post',
                    'data':{type:2},
                    'success': function(results) {

                       if(results.status=="200"){
                        var data=results.data;
                         try {
                            if (session_timeout(data) === false) {
                                return false;
                            }
                        } catch (e) { console.log(e); }
                        if (data.Records.length == 0) {
                            return;
                        }
                        var txtQtHtml = ''; //体彩最新开奖信息
                        var openArr = [];
                        var tmpArr = [];
                        for (var i = 0; i < data.Records.length; i++) {
                            tmpArr = data.Records[i].period_opennum_opentime.split('___');
                            if (tmpArr.length != 3)
                                continue;
                            openArr = new Array();
                            if (tmpArr[1] != '' && tmpArr[1] != undefined) {
                                openArr = tmpArr[1].split(',');
                            }
                            var perName = tmpArr[0];

                            function switchHcyNum(number) {
                                if (number == '')
                                    return '';
                                var codeSx = ['猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
                                var season = ['', '春', '夏', '秋', '冬'];
                                var direct = ['东', '南', '西', '北'];
                                var num = parseInt(number);
                                var pos = 0;
                                if (num > 18) {
                                    pos = num % 2 == 0 ? 3 : 2;
                                } else {
                                    pos = num % 2 == 0 ? 1 : 0;
                                }
                                var strNum = number + '|' + codeSx[num % 12] + '|' + season[Math.ceil(num / 9)] + '|' + direct[pos];
                                return strNum;
                            }
                            txtQtHtml += '' + '<li>' + '<div>' + '<span class="lot-name"><a onclick=\"__location(\'' + data.Records[i].link + '\')\" >' + data.Records[i].gname + '&nbsp;</a>' + perName + '期</span>' + '<span class="term">' + tmpArr[2].substr(0, 10) + '</span>' + '<span class="clear"></span>' + '<div class="clear"></div>'
                            if (data.Records[i].gid == 32) {
                                var num = switchHcyNum(openArr[0]);
                                arrNum = num.split('|');
                                txtQtHtml += '<div class="redball">' + arrNum[0] + '</div>' + '<div class="redball">' + arrNum[1] + '</div>' + '<div class="redball">' + arrNum[2] + '</div>' + '<div class="redball">' + arrNum[3] + '</div>';
                            }
                            var openLen = openArr.length;
                            if(openLen <= 0 || openArr == 'null') {
                            	txtQtHtml += '<div class="redball">正</div><div class="redball">在</div><div class="redball">开</div><div class="redball">奖</div>';
                            } else {
	                            for (var j = 0; j < openLen; j++) {
	                                if (!(j == 0 && data.Records[i].gid == 32)) {
	                                    txtQtHtml += '<div class="redball">' + openArr[j] + '</div>';
	                                }
	                            }
                            }
                            txtQtHtml += '<br>' + '<div class="fr">' + '<a  onclick="__location(\'/trend/index.html?gameId=' + data.Records[i].gid + '&periods=30\');">走势</a>' + '　|　<a onclick="__location(\'' + data.Records[i].link + '\');" >投注</a>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</li>';
                        }
                        $('#lastOpenQt').html(txtQtHtml);
                        lowDataAleady = false;
                       }
                    },
                    error: function(XMLHttpRequest, status) {
                        lowDataAleady = false;
                        process_timeout(status);
                    }
                });
            }
        });
        //获取中奖排行
        getPrizeUser();
        function getPrizeUser() {
            $.ajax({
                type: 'POST',
                url: 'common/lottery/getWin',
                data: '',
                dataType: 'json',
                timeout: '30000',
                success: function(results) {
                    if (results.status == "200") {
                        var data = results.data;
                        if(data == null) return false;
                        
                        var html = '';
                        var rank = 1;
                        var rankStr;
                        for(var i = 0; i < data.length; i++) {
                            if(rank < 10) {
                                rankStr = '0' + rank;
                            } else {
                                rankStr = rank;
                            }
                            rank++;
                            html += '<p><span><span>' + rankStr + '</span>' + data[i].User + '</span><span class="orange">' + data[i].WinAmount + '元</span></p>';
                        }
                        $('#prizeUser').empty().html(html);
                        pmCarousel();
                    }
                }
            });
        }
        //轮播排名列表
        function pmCarousel() {
            var _sItl_1 = null;
            var length = 355;
            if ($("#prizeUser").height() <= length) { //小于9个的时候不用 循环滚动
                return;
            }
            var _top1 = $(".tableCarousel .thead").height();
            var iCount = 0;

            function goPaly() {
                iCount++;
                if (iCount % 6 > 0) {
                    $("#prizeUser").css("top", _top1 - (iCount % 6) * 6);
                } else {
                    var newTr = $("#prizeUser  p:eq(0)");
                    $("#prizeUser").append("<p>" + newTr.html() + "</p>");
                    $("#prizeUser").css("top", _top1);
                    $("#prizeUser p:eq(0)").remove();
                }
            }
            _sItl_1 = setInterval(goPaly, 200);
            $("#prizeUser").bind("mouseover", function() {
                clearInterval(_sItl_1);
            });
            $("#prizeUser").bind("mouseout", function() {
                _sItl_1 = setInterval(goPaly, 200);
            });
        }
        
    });
    $(function() {
    	function _noticePop() {
    		$.ajax({
                type: 'POST',
                url: 'common/getPopNoticeCount',
                data: '',
                dataType: 'json',
                timeout: '30000',
                success: function(results) {
                    if(results.status == "200" && results.data > 0) {
                    	layer.open({
        				    type: 2,
        				    title: "系统公告",
        				    area: ['600px', '400px'],
        				    content: "common/getPopNoticeList"
        				}); 
                    }
                }
            });
        }
    	 
        //渲染中间5个彩种
        function _index_countdownIssue() {
            var selector = "#_index_countdownIssue";
            //该数组包含 id的顺序
            var gameIdArr = ["5", "1", "9", "2", "12"]; //example: [gameId,gameId,gameId]
            var gameListData = {}; // key:gameId ,  value:{gameObject}
            (function initData(gameIdArr, gameListData) {
                gameListData[gameIdArr[0]] = {
                    hide: true,
                    name: "重庆时时彩",
                    game_url: "common/hall?gameOpen="+gameIdArr[0], //游戏链接
                    game_url_param: function() {
                        var s = "amount=" + $('#_index_countdownIssue [name=times_nums]').val();
                        $("#_index_countdownIssue [name=num_list]>li input").each(function(i) {
                            s += "&num" + (parseInt(i) + 1) + "=" + $(this).val();

                        });
                        //s += "&amount=" + $('#_index_countdownIssue [name=bet_amount]').text();
                        return s;
                    },
                    trend_url: "common/trend?gameOpen="+gameIdArr[0], //走势图链接
                    timeout: 0,
                    issue: "----",
                    rNum: function(selector) { //时时彩
                        var numList = [parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10)];
                        var s = "";
                        for (var i = 0; i < numList.length; i++) {
                            s += "<li class=\"qb-red lot_sn_red\"><input value=\"" + numList[i] + "\" readonly></li>"
                        }
                        $(selector + " [name=num_list]").html(s);
                    }
                };
                gameListData[gameIdArr[1]] = {
                    name: "福彩3D",
                    game_url: "common/hall?gameOpen="+gameIdArr[1], //游戏链接
                    game_url_param: function() {
                        var s = "amount=" + $('#_index_countdownIssue [name=times_nums]').val();
                        $("#_index_countdownIssue [name=num_list]>li input").each(function(i) {
                            s += "&num" + (parseInt(i) + 1) + "=" + $(this).val();
                        });
                        //s += "&amount=" + $('#_index_countdownIssue [name=bet_amount]').text();
                        return s;
                    },
                    trend_url: "common/trend?gameOpen="+gameIdArr[1], //走势图链接
                    timeout: 0,
                    issue: "----",
                    rNum: function(selector) {
                        var numList = [parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10)];
                        var s = "";
                        for (var i = 0; i < numList.length; i++) {
                            s += "<li class=\"qb-red lot_sn_red\"><input value=\"" + numList[i] + "\" readonly></li>"
                        }
                        $(selector + " [name=num_list]").html(s);
                    }
                };
                gameListData[gameIdArr[2]] = {
                    name: "PK拾",
                    game_url: "common/hall?gameOpen="+gameIdArr[2], //游戏链接
                    game_url_param: function() {
                        var s = "amount=" + $('#_index_countdownIssue [name=times_nums]').val();
                        $("#_index_countdownIssue [name=num_list]>li input").each(function(i) {
                            s += "&num" + (parseInt(i) + 1) + "=" + $(this).val();
                        });
                        //s += "&amount=" + $('#_index_countdownIssue [name=bet_amount]').text();
                        return s;
                    },
                    trend_url: "common/trend?gameOpen="+gameIdArr[2], //走势图链接
                    timeout: 0,
                    issue: "----",
                    rNum: function(selector) {
                        var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
                        var numList = arr.sort(randomsort);
                        var s = "";
                        for (var i = 0; i < 3; i++) {
                            s += "<li class=\"qb-red lot_sn_red\"><input value=\"" + numList[i] + "\" readonly></li>"
                        }
                        $(selector + " [name=num_list]").html(s);
                    }
                };
                gameListData[gameIdArr[3]] = {
                    name: "排列三",
                    game_url: "common/hall?gameOpen="+gameIdArr[3], //游戏链接
                    game_url_param: function() {
                        var s = "amount=" + $('#_index_countdownIssue [name=times_nums]').val();
                        $("#_index_countdownIssue [name=num_list]>li input").each(function(i) {
                            s += "&num" + (parseInt(i) + 1) + "=" + $(this).val();
                        });
                        //s += "&amount=" + $('#_index_countdownIssue [name=bet_amount]').text();
                        return s;
                    },
                    trend_url: "common/trend?gameOpen="+gameIdArr[3], //走势图链接
                    timeout: 0,
                    issue: "----",
                    rNum: function() {
                        var numList = [parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10), parseInt(Math.random(10) * 10)];
                        var s = "";
                        for (var i = 0; i < numList.length; i++) {
                            s += "<li class=\"qb-red lot_sn_red\"><input value=\"" + numList[i] + "\" readonly></li>";
                        }
                        $(selector + " [name=num_list]").html(s);
                    }
                };
                gameListData[gameIdArr[4]] = {
                    name: "山东11选5",
                    game_url: "common/hall?gameOpen="+gameIdArr[4], //游戏链接
                    game_url_param: function() {
                        var s = "amount=" + $('#_index_countdownIssue [name=times_nums]').val();
                        $("#_index_countdownIssue [name=num_list]>li input").each(function(i) {
                            s += "&num" + (parseInt(i) + 1) + "=" + $(this).val();
                        });
                        //s += "&amount=" + $('#_index_countdownIssue [name=bet_amount]').text();
                        return s;
                    },
                    trend_url: "common/trend?gameOpen="+gameIdArr[4], //走势图链接
                    timeout: 0,
                    issue: "----",
                    rNum: function(selector) {
                        var numList = [];
                        for (var i = 0; i <= 2; i++) {
                            var num = parseInt(Math.random(10) * 11 + 1);
                            while ($.inArray(num, numList) != -1) {
                                num = parseInt(Math.random(10) * 11 + 1);
                            }
                            numList.push(num);
                        }
                        var s = "";
                        for (var i = 0; i < numList.length; i++) {
                            s += "<li class=\"qb-red lot_sn_red\"><input value=\"" + numList[i] + "\" readonly></li>"
                        }
                        $(selector + " [name=num_list]").html(s);
                    }
                };
            })(gameIdArr, gameListData);

            function randomsort(a, b) {
                return Math.random() > .5 ? -1 : 1;
            }
            var getTimeArr = function(sec) {
                sec = parseInt(sec);
                var arr = [];
                var day = parseInt(sec / (3600 * 24));
                arr.push(day);
                sec = sec - (3600 * 24) * day;
                var h = parseInt(sec / 3600);
                arr.push(h);
                sec = sec - 3600 * h;
                var m = parseInt(sec / 60);
                arr.push(m);
                sec = sec - 60 * m;
                arr.push(sec);
                return arr;
            };
            var init_event = function() {
                if ("true" == $(selector).data("bind")) {
                    return;
                }
                var str = "";
                for (var k = 0; k < gameIdArr.length; k++) {
                    var gameId = gameIdArr[k];
                    var o = gameListData[gameId];
                    if (o["hide"] !== false) {
                        continue;
                    }
                    str += "<li class=\"tab-sel-open\" data-gameid=\"" + gameId + "\" name=\"gameid_" + gameId + "\"><a>" + o["name"] + "</a></li>";
                }

                $(selector + " [name=quick_tab_list]").html(str);
                $(selector + " [name=quick_tab_list]>li").bind('mouseover', function(e) {
                    //各彩种中奖号码
                    $(selector + " [name=quick_tab_list]>li").removeClass("on");
                    $(this).addClass("on");
                    var gameId = $(this).data("gameid");
                    (function html(selector, o) {
                        $(selector + " [name=issue]").text(o["issue"]);
                        var t_arr = getTimeArr(o["timeout"]);
                        $(selector + " [name=day]").text(t_arr[0]);
                        $(selector + " [name=h]").text(t_arr[1]);
                        $(selector + " [name=m]").text(t_arr[2]);
                        $(selector + " [name=s]").text(t_arr[3]);
                        o["rNum"](selector);
                    })(selector, gameListData[gameId]);
                    $(selector).data("gameid", gameId);
                });

                $(selector + " [name=change_gameNum]").bind("click", function() {
                    var gameId = $(selector).data("gameid");
                    var o = gameListData[gameId];
                    o["rNum"](selector);
                });

                $(selector + " [name=quick_tab_list]>li").eq(0).trigger("mouseover");

                $(selector + " [name=quick_tab_list]>li").bind('click', function(e) {
                    var gameId = $(this).data("gameid");
                    __location(gameListData[gameId]["game_url"]);
                });

                $(selector + " [name=btn_game_play]").bind('click', function(e) {
                    e.preventDefault();
                    var gameId = $(selector).data("gameid");
                    __location(gameListData[gameId]["game_url"]);
                });

                $(selector + " [name=btn_trend]").bind('click', function(e) {
                    var gameId = $(selector).data("gameid");
                    __location(gameListData[gameId]["trend_url"]);
                });

                $(selector + " [name=doBet]").bind('click', function(e) {
                    var gameId = $(selector).data("gameid");
                    var o = gameListData[gameId];
                    var p = o.game_url_param();
                    var url = o.game_url;
                    if (url.indexOf("?") > 0) {
                        url += "&" + p;
                    } else {
                        url += "?" + p;
                    }
                    __location(url);
                });

                setInterval(function() {
                    for (var k in gameListData) {
                        var o = gameListData[k];
                        var leftTime = parseInt(o["timeout"]) - 1;
                        if (leftTime <= 0) {
                            if ($(selector).data("querydate") && new Date() - $(selector).data("querydate") > 4000) {
                                queryData();
                            }
                            o["timeout"] = 0;
                        } else {
                            o["timeout"] = leftTime;
                        }
                    }
                    var gameId = $(selector).data("gameid");
                    (function html(selector, o) {
                        $(selector + " [name=issue]").text(o["issue"]);
                        var t_arr = getTimeArr(o["timeout"]);
                        $(selector + " [name=day]").text(t_arr[0]);
                        $(selector + " [name=h]").text(t_arr[1]);
                        $(selector + " [name=m]").text(t_arr[2]);
                        $(selector + " [name=s]").text(t_arr[3]);

                    })(selector, gameListData[gameId]);
                }, 1000);
                $(selector).data("bind", "true");
            };
            var queryData = function() {
                $(selector).data("querydate", new Date().getTime());
                $.ajax({
                    'url': 'common/lottery/getIdxFiveLottery', //数据data/首页五个tab彩种.json
                    'dataType': 'json',
                    'data': { gameIds: gameIdArr.join(",") },
                    'type': 'post',
                    "success": function(results) {
                        if (results.status == "200") {
                            var data = results.data;
                            for (var i in data) {
                                try {
                                    var o = data[i];
                                    if (gameListData.hasOwnProperty(o.gameId)) {
                                        gameListData[o.gameId]["issue"] = o["issue"];
                                        //gameListData[o.gameId]["game_url"] = o["url"];
                                        gameListData[o.gameId]["timeout"] = o["timeout"];
                                        gameListData[o.gameId]["hide"] = false;
                                    }
                                } catch (e) { console.log(e); }
                            }
                            init_event();
                        }

                    }
                });
            };

            queryData();
        }
        _index_countdownIssue();
        $("#doBet_submit_index").on("click", function(e) {
            //立即投注
            e.preventDefault();
            //doBet();
        });
        $("#change_random").on("click", function(e) {
            //换一注
            e.preventDefault();
            setbetNum();
        });
        $("#times_nums").on("blur", function(e) {
            e.preventDefault();
            setTimesNum(0);
        });
        $("#times_sub").on("click", function(e) {
            e.preventDefault();
            setTimesNum(1);
        });
        $("#times_add").on("click", function(e) {
            e.preventDefault();
            setTimesNum(2);
        });
        
        //公告弹窗
        _noticePop();
        
        function setbetNum() {
            var type = $('#selected_open').val();
            if (type == 1) { //时时彩
                $('#bet_cq1').val(parseInt(Math.random(10) * 10));
                $('#bet_cq2').val(parseInt(Math.random(10) * 10));
                $('#bet_cq3').val(parseInt(Math.random(10) * 10));
                $('#bet_cq4').val(parseInt(Math.random(10) * 10));
                $('#bet_cq5').val(parseInt(Math.random(10) * 10));
            } else if (type == 2) { //福彩
                $('#bet_fc1').val(parseInt(Math.random(10) * 10));
                $('#bet_fc2').val(parseInt(Math.random(10) * 10));
                $('#bet_fc3').val(parseInt(Math.random(10) * 10));
            } else if (type == 3) { //体彩
                $('#bet_tc1').val(parseInt(Math.random(10) * 10));
                $('#bet_tc2').val(parseInt(Math.random(10) * 10));
                $('#bet_tc3').val(parseInt(Math.random(10) * 10));
            } else if (type == 4) { //pk10
                setPk10Num('#bet_pk');
            } else if (type == 5) { //山东11选5
                setEsdNum('#bet_esd');
            }
        }

        function setEsdNum(e) {
            var arrEsd = [];
            for (var i = 1; i <= 5; i++) {
                var num = parseInt(Math.random(10) * 11 + 1);
                while ($.inArray(num, arrEsd) != -1) {
                    num = parseInt(Math.random(10) * 11 + 1);
                }
                arrEsd.push(num);
                $(e + i).val(num);
            }
        }

        function setPk10Num(e) {
            var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
            var arr2 = arr.sort(randomsort);
            for (var k = 0; k < 3; k++) {
                $(e + k).val(arr2[k]);
            }
        }

        function randomsort(a, b) {
            return Math.random() > .5 ? -1 : 1;
        }

        function getTarget(url) {
            location.href = url;
        }

        function doBet() {
            var type = $('#selected_open').val();
            if (type == 1) { //重庆时时彩
                getTarget('/game/cqssc.html?times=' + $('#bet_amount').text() + '&num1=' + $('#bet_cq1').val() + '&num2=' + $('#bet_cq2').val() + '&num3=' + $('#bet_cq3').val() + '&num4=' + $('#bet_cq4').val() + '&num5=' + $('#bet_cq5').val() + '&amount=' + $('#bet_amount').text());
            } else if (type == 2) { //福彩
                getTarget('/gameFtc/fcsd.html?times=' + $('#bet_amount').text() + '&num3=' + $('#bet_fc1').val() + '&num4=' + $('#bet_fc2').val() + '&num5=' + $('#bet_fc3').val() + '&amount=' + $('#bet_amount').text());
            } else if (type == 3) { //体彩
                getTarget('/gameFtc/tcps.html?times=' + $('#bet_amount').text() + '&num3=' + $('#bet_tc1').val() + '&num4=' + $('#bet_tc2').val() + '&num5=' + $('#bet_tc3').val() + '&amount=' + $('#bet_amount').text());
            } else if (type == 4) { //pk10
                getTarget('/game/bjsc.html?times=' + $('#bet_amount').text() + '&num1=' + $('#bet_pk0').val() + '&num2=' + $('#bet_pk1').val() + '&num3=' + $('#bet_pk2').val() + '&amount=' + $('#bet_amount').text());
            } else if (type == 5) { //山东11选5
                getTarget('/elevenGame/sd.html?times=' + $('#bet_amount').text() + '&num1=' + $('#bet_esd1').val() + '&num2=' + $('#bet_esd2').val() + '&num3=' + $('#bet_esd3').val() + '&num4=' + $('#bet_esd4').val() + '&num5=' + $('#bet_esd5').val() + '&amount=' + $('#bet_amount').text());
            }
        }

        function setTimesNum(type) { //1:减,2:加
            var times = $('#times_nums').val();
            if (type == 0) {} else if (type == 1) {
                times = parseInt(times) - 1;
                times = (times < 1) ? 1 : times;
            } else if (type == 2) {
                times = parseInt(times) + 1;
            }
            $('#times_nums').val(times);
            $('#bet_amount').text(times * 2);
        }
    });

});
