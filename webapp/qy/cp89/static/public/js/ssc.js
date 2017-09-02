    var nowHref = "error/index.html";

    // 清除内容提示框
    var layerId = null;
    var T = null;
    var name = 'module';
    var winUrl = window.location.href.split('/');
    winUrl = winUrl[winUrl.length-1].split('.');
    winUrl = winUrl[0]; //获取当前的彩种
    window.lastNumberOpening = false;  // 是否开奖中
    // console.log(winUrl);
    if (winUrl =='sfssc'){
        winUrl = 'bj3';
    } else if(winUrl =='jsk3'){
        winUrl = 'jsK3';
    } else if(winUrl == 'cqssc') {
        winUrl = 'cqSsc';
    } else if( winUrl == 'tjssc') {
        winUrl = 'tjSsc';
    } else if ( winUrl == 'xjssc') {
        winUrl = 'xjSsc';
    } else if (winUrl == 'pcdd') {
        winUrl = 'bjLu28';
    } else if ( winUrl == 'pk10') {
        winUrl = 'bjPk10';
    } else if( winUrl == 'klsf') {
        winUrl = 'gdK10';
    } else  if ( winUrl == 'gd115') {
        winUrl = 'gdPick11';
    } else if (winUrl == 'lhc'){
        winUrl = 'markSix';
    }else if (winUrl == 'xyft'){
        winUrl = 'luckyAirship';
    };


    //登录
    setTimeout(function () {
        var pwd = $.cookie('pwd');
        var login = $.cookie('login');
        if(pwd && login){
            $.trim($("#registerLoginAccount").val(login));
            $.trim($("#registerLoginPassword").val(pwd));
        }

    },1000);
    function registerLogin() {
        var loginAccount = $.trim($("#registerLoginAccount").val());
        var loginPassword = $.trim($("#registerLoginPassword").val());
        var bool = $('input[type=checkbox]').is(':checked');

        if (!loginAccount) {
            parent.layer.msg("请输入账号");
            return;
        }
        if (!loginPassword) {
            parent.layer.msg("请输入密码");
            return;
        }
        var map = {};
        map['loginName'] = loginAccount;
        map['password'] = $.md5(loginPassword).toUpperCase();
        map['machineType'] = '3';
        var mw=baseObj.mw(map);
        $.ajax({
            url:CONFIG.BASEURL+"user_login",
            type:"post",
            data: {
                mw : mw
            },
            dataType:"json",
            success: function(json) {
                if (json.code == '200') {
                    var json = json.data.obj;
                    if(bool){
                        $.cookie("login",loginAccount , {path: "/"});
                        $.cookie("pwd", loginPassword, {path: "/"});
                    }else {
                        $.cookie("login",'' , {path: "/"});
                        $.cookie("pwd", '', {path: "/"});
                    }
                    setCookie(json);
                    location.reload();
                } else {
                    parent.layer.msg(json.msg);
                    setTimeout(function () {
                        location.reload();
                    },1000);
                }
            }
        });
    }

    function showClearBetTemplate() {
        if (layerId != null) {
            return;
        }
        var clearBet_template = '\
        <div class="clearBet_template">\
            <div class="l">\
                <span>\
                <i></i>\
                </span>\
            </div>\
            <div class="r">\
                <p>当前期已结束，是否要清空已投注内容？</p>\
                <p>要清空已投注内容请单击"确定",不刷新页面请点击"取消"</p>\
            </div>\
            <div style="clear:both"></div>\
            <div class="btns" style="text-align:center">\
                <button type="button" onclick="closeClearBetTemplate(true)">确定</button>\
                <button type="button" onclick="closeClearBetTemplate(false)">取消<font class="time"></font></button>\
            </div>\
        </div>\
        ';


        layer.closeAll();
        //页面层
        layerId =layer.open({
            type: 1,
            time: 15000,
            title: '温馨提示',
            skin: 'layui-layer-popup layui-layer-rim', //加上边框
            area: ['480px', '240px'], //宽高
            content: clearBet_template
        });


        var time = 5;
        T = setInterval(function() {
            if (time == 0) {
                closeClearBetTemplate();
                return;
            }
            $(".clearBet_template .time").html('(' + time + ')');
            --time;
        }, 1000);
        window.lastNumberOpening = true;
    }

    function closeClearBetTemplate(isReset) {
        if (T != null) {
            clearInterval(T);
            T = null;
        }
        if (layerId != null) {
            layer.close(layerId);
            layerId = null;
        }

        if (typeof isReset != 'undefined') {
            if (isReset && typeof reset == 'function') {
                reset();
            }
        }
    }

    // 显示封盘
    function showFengPan() {
        $(".pl").html("封盘");    // 初始显示封盘
        $('.table-txt,.txt').val('封盘');
        $('.table-txt,.txt').attr('disabled','disabled');
        $('.table-common td').removeClass("bg-yellow");
    }

    var getSscOpenTime_Running = false; // getSscOpenTime函数是否正在调用
    // 获取时间、期号
    function getSscOpenTime(callback) {
        if (getSscOpenTime_Running) {
            return;
        }
        var obj = {
            u : $.cookie('u')
        };

        ajaxRequest({
            url: CONFIG.BASEURL +winUrl+"_currentTime",
            data: {
                mw: baseObj.mw(obj)
            },
            beforeSend: function() {
                sscOpenTimeJson = null;
                getSscOpenTime_Running = true;
            },
            success: function(json) {
                if (json.code != 200) {
                    return;
                }
                var json = json.data.obj;
                $("#number").data("number", json.sessionNo).html(json.sessionNo); // 期数
                $('#open_time').html(json.openDate);

                if (json.betTime != 0) {
                    $("#tip").html(json.sessionNo + '期已开盘，欢迎投注。距离截止下注还有:');
                    $("#leftTime").data("time", json.betTime);

                    $('.table-txt,.txt').val('');
                    $('.table-txt,.txt').removeAttr('disabled');
                    getSscPlayPl(window.playId );
                } else {
                    $("#tip").html(json.sessionNo + '期已封盘，距离开盘还有:');
                    $("#leftTime").data("time", json.openTime);
                    showFengPan();
                    window.openIng = true;
                }
                window.openNum = parseInt(json.sessionNo) -1;

                if (typeof callback == 'function') {
                    callback();
                }
            },
            complete: function() {
                getSscOpenTime_Running = false;
            }
        });
    }

    // 获取玩法赔率
    var playPlJson = null;
    function getSscPlayPl(playId) {
        window.playId = playId;
        ajaxRequest({
            url: CONFIG.BASEURL + winUrl +"_betPanel",
            data: {
                mw: baseObj.mw({playType: playId})
            },
            success: function(json) {
                if (json.code != 200) {
                    return;
                }
                var data = json.data.betItems;
                for(var i = 0; i < data.length; i++) {
                    playPlJson = data[i].optionItems;
                    // 渲染数据
                    renderPlData();
                }
            },
            error: function() {
                // 重试
                setTimeout(function() {
                    getSscPlayPl(playId);
                }, 3000);
            }
        });
    }

    // 渲染赔率
    function renderPlData() {
        // console.log(playPlJson);
        if (playPlJson != null) {
            $.each(playPlJson, function (index, value) {
                $("[data-plid='" + value.optionId + "']").data("pl", value.rate).html(value.rate);
            });
        }
    }

    // 时间倒计时
    $(function() {
        var getSscOpenTime_Timestamp = null;   // 调用getSscOpenTime成功的时间

        var isInitSwfObject = false;
        // function play(file) {
        //     if (!isInitSwfObject) {
        //         // 初始化音乐
        //         var flashvars = {};
        //         var params = {
        //             wmode: "transparent"
        //         };
        //         var attributes = {};
        //         swfobject.embedSWF(CONFIG.RESURL + "js/swfobject/sound.swf", "soundContainer", "1", "1", "9.0.0", CONFIG.RESURL + "js/swfobject/expressInstall.swf", flashvars, params, attributes);
        //         isInitSwfObject = true;
        //     }
        //
        //     var sound = swfobject.getObjectById("soundContainer");
        //     if (sound) {
        //         sound.SetVariable("f", file);
        //         sound.GotoFrame(1);
        //     }
        // }

        function autoLeftTime() {
            var time = $("#leftTime").data("time");
            if (isNaN(time) || time < 0) {
                if (getSscOpenTime_Timestamp != null && (new Date()).getTime() - getSscOpenTime_Timestamp < 5 * 1000) {   // 5秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
                    return;
                }

                // if (1 == isFengpan) {
                //     getSscOpenTime( function () {
                //         getSscOpenTime_Timestamp = (new Date()).getTime();  // 设置调用getSscOpenTime成功的时间
                //         getOpenCodeHistory();   // 获取开奖记录
                //     });
                //
                //     if (opening) {
                //         if (time == -1) {
                            // 显示清除投注内容提示框
                //             if (typeof showClearBetTemplate == 'function') {
                //                 showClearBetTemplate();
                //                 alert(111);
                //             }
                //         }
                //     }
                // } else {
                    getSscOpenTime( function () {
                        getSscOpenTime_Timestamp = (new Date()).getTime();  // 设置调用getSscOpenTime成功的时间
                        getOpenCodeHistory();   // 获取开奖记录
                    });

                    if (time == -1) {
                        // 显示清除投注内容提示框
                        if (typeof showClearBetTemplate == 'function') {
                            if(!window.openIng) {
                                // showClearBetTemplate();
                            }
                            // alert(222);
                        }
                    }
                // }


                $("#leftTime").data("time", --time);
                return;
            }
            var tmpTime = time;
            var hour = Math.floor(tmpTime / 60 / 60);
            tmpTime = tmpTime - hour * 60 * 60;
            var minute = Math.floor(tmpTime / 60);
            tmpTime = tmpTime - minute * 60;
            var second = tmpTime;

            var str = '';
            str += '<ol class="s">';
            str += '<span class="sp1">' + (Math.floor(hour / 10)) + '</span>';
            str += '<span class="sp2">' + (Math.floor(hour % 10)) + '</span>';
            str += '</ol>';
            str += '<ol class="f">';
            str += '<span class="sp1">' + (Math.floor(minute / 10)) + '</span>';
            str += '<span class="sp2">' + (Math.floor(minute % 10)) + '</span>';
            str += '</ol>';
            str += '<ol class="pc">';
            str += '<span class="sp1">' + (Math.floor(second / 10)) + '</span>';
            str += '<span class="sp2">' + (Math.floor(second % 10)) + '</span>';
            str += '</ol>';

            $("#leftTime").data("time", --time).html(str);

            // 播放铃声
            // if (1 == isFengpan) {
            //     if (opening) {
            //         if (hour == 0 && minute == 0 && second < 10 && second > 0) {
            //             var file = $("#selectCount").find("option:selected").data("file");
            //             play(file);
            //         }
            //     }
            // } else {
            //     if (hour == 0 && minute == 0 && second < 10 && second > 0) {
            //         var file = $("#selectCount").find("option:selected").data("file");
            //         play(file);
            //     }
            // }
            return;
        }

        setInterval(function() {
            autoLeftTime();
        }, 1000);
    });

    function getSscSubPage(url) {
        var url = url.toString();
        ajaxRequest({
            url: CONFIG.BASEURL + winUrl+ "_betPanel",
            data: {
                mw : baseObj.mw({playType : url})
            },
            beforeSend: function () {
                parent.showLoading();
                $(".table-common").html('<img src="../../images/base_loading.gif" alt="" style="display: block;text-align: center;margin: auto;margin-top: 20px;">');
            },
            dataType: 'json',
            success: function(json) {
                $("#sscContent").html("");
                var typenum = $(".Playmethod .acti a").data('url');
                var html = "<div class=\"lot-content clearfix\">" +
                    "    <div class=\"fl main-left\">" +
                    "        <div class=\"hd clearfix rehd tzgz\" id=\"toptouzhu\">" +
                    "            <div class=\"fl refl\">" +
                    "                快捷金额：" +
                    "                <input type=\"text\" class=\"txt\"/>" +
                    "            </div>" +
                    "            <div class=\"kjanniu\">" +
                    "                <a href=\"javascript:void(0)\" class=\"img-50\" data-num=\"50\"></a>" +
                    "                <a href=\"javascript:void(0)\" class=\"img-100\" data-num=\"100\"></a>" +
                    "                <a href=\"javascript:void(0)\" class=\"img-500\" data-num=\"500\"></a>" +
                    "                <a href=\"javascript:void(0)\" class=\"img-1000\" data-num=\"1000\"></a>" +
                    "                <a href=\"javascript:void(0)\" class=\"img-5000\" data-num=\"5000\"></a>" +
                    "                <a href=\"javascript:void(0)\" class=\"img-10000\" data-num=\"10000\"></a>" +
                    "            </div>" +
                    "			<div class='fr'>" ;
                        if(winUrl == 'markSix') {
                            if (url == 0 || url == 1) {
                                html += "<div class=\"T-tab clearfix classify classify1 block\">";
                                    html+= "                	<span><a href=\"javascript:void(0)\" id='0' data-url=\"0\">特码A</a></span>"+
                                        "                	<span class=\"acti\"><a href=\"javascript:void(0)\" id='1' data-url=\"1\">特码B</a></span>";
                                html+= "           	</div>";
                            } else if (8 >= url && url >= 3) {
                                html += "				<div class=\"T-tab clearfix classify classify2 block\">" ;
                                html += "                	<span><a href=\"javascript:void(0)\" id=\"3\" data-url=\"3\">正一特</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"4\" data-url=\"4\">正二特</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"5\" data-url=\"5\">正三特</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"6\" data-url=\"6\">正四特</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"7\" data-url=\"7\">正五特</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"8\" data-url=\"8\">正六特</a></span>";
                                html+="           	</div>";
                            } else if (11 <=url && url <= 16) {
                                html += "				<div class=\"T-tab clearfix classify classify3 block\">" ;
                                html += "                	<span><a href=\"javascript:void(0)\" id=\"14\" data-url=\"14\">三全中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"15\" data-url=\"15\">三中二</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"11\" data-url=\"11\">二全中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"12\" data-url=\"12\">二中特</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"13\" data-url=\"13\">特串</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"16\" data-url=\"16\">四全中</a></span>";
                                html += "           	</div>";
                            } else if (18 <= url && url <= 30 && url != 20) {
                                html += "				<div class=\"T-tab clearfix classify classify4 block\">";
                                html += "                	<span><a href=\"javascript:void(0)\" id=\"18\" data-url=\"18\">一肖</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"21\" data-url=\"21\">二肖</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"22\" data-url=\"22\">三肖</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"23\" data-url=\"23\">四肖</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"24\" data-url=\"24\">五肖</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"25\" data-url=\"25\">六肖</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"26\" data-url=\"26\">七肖</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"27\" data-url=\"27\">八肖</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"28\" data-url=\"28\">九肖</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"29\" data-url=\"29\">十肖</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"30\" data-url=\"30\">十一肖</a></span>"+
                                    "                	<span><a href=\"javascript:void(0)\" id=\"19\" data-url=\"19\">尾数</a></span>";
                                 html+= "           	</div>";
                                 setTimeout(function () {
                                     $(".main-left .rehd").css({"padding-top":"14px","padding-bottom": "18px"});
                                     $('.classify4').css({'max-width':'440px',"top":"110px"});
                                     $('.T-tab a').css('margin','2px');
                                 },100);
                            } else if (url >= 31 && url <= 37) {
                                    html += "				<div class=\"T-tab clearfix classify classify5 block\">" +
                                        "                	<span><a href=\"javascript:void(0)\" id=\"31\" data-url=\"31\">二肖连中</a></span>" +
                                        "                	<span><a href=\"javascript:void(0)\" id=\"32\" data-url=\"32\">三肖连中</a></span>" +
                                        "					<span><a href=\"javascript:void(0)\" id=\"33\" data-url=\"33\">四肖连中</a></span>" +
                                        "                	<span><a href=\"javascript:void(0)\" id=\"34\" data-url=\"34\">五肖连中</a></span>" +
                                        "                	<span><a href=\"javascript:void(0)\" id=\"35\" data-url=\"35\">二肖连不中</a></span>" +
                                        "                	<span><a href=\"javascript:void(0)\" id=\"36\" data-url=\"36\">三肖连不中</a></span>" +
                                        "					<span><a href=\"javascript:void(0)\" id=\"37\" data-url=\"37\">四肖连不中</a></span>";
                                    html+= "           	</div>";
                                setTimeout(function () {
                                    $(".main-left .rehd").css({"padding-top":"14px","padding-bottom": "18px"});
                                    $('.classify5').css({'max-width':'448px',"top":"110px"});
                                    $('.T-tab a').css('margin','2px');
                                },100);
                            } else if (url >= 44 && url <= 51) {
                                html += "				<div class=\"T-tab clearfix classify classify5 block\">";
                                html+="                	<span><a href=\"javascript:void(0)\" id=\"44\" data-url=\"44\">五不中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"45\" data-url=\"45\">六不中</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"46\" data-url=\"46\">七不中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"47\" data-url=\"47\">八不中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"48\" data-url=\"48\">九不中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"49\" data-url=\"49\">十不中</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"50\" data-url=\"50\">十一不中</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"51\" data-url=\"51\">十二不中</a></span>";
                                html+="           	</div>";
                            }
                            else if (url >= 38 && url <= 43) {
                                html += "				<div class=\"T-tab clearfix classify classify5 block\">";
                                html += "                	<span><a href=\"javascript:void(0)\" id=\"38\" data-url=\"38\">二尾连中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"39\" data-url=\"39\">三尾连中</a></span>" +
                                    "					<span><a href=\"javascript:void(0)\" id=\"40\" data-url=\"40\">四尾连中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"41\" data-url=\"41\">二尾连不中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"42\" data-url=\"42\">三尾连不中</a></span>" +
                                    "                	<span><a href=\"javascript:void(0)\" id=\"43\" data-url=\"43\">四尾连不中</a></span>";
                                html+= "           	</div>";
                            }
                        };

                    html += "       	</div>" +
                    "        </div>" +
                    "        <div class=\"table-common\">" ;
                for(var r = 0 ; r < json.data.betItems.length; r++) {
                        var data = json.data.betItems[r].optionItems;

                    if(typenum ==11 || typenum == 12 || typenum == 14 || typenum == 15 || typenum == 16 || typenum == 31 ||
                        typenum == 32 || typenum == 33 || typenum == 34 || typenum == 35 || typenum == 36 || typenum == 37 ||
                        typenum == 38  || typenum == 39 || typenum == 40 || typenum == 41 || typenum == 42 || typenum == 43 ||
                        typenum == 44 || typenum == 45 || typenum == 46 || typenum == 47 || typenum == 48 || typenum == 49 || typenum == 50 || typenum == 51) {
                        html += "            <table width=\"100%\" border=\"1\">" +
                            "                <thead>" +
                            "                <tr>" +
                            "                    <th colspan=\"9\">" + json.data.betItems[r].optionTitle + "</th>" +
                            "                </tr>" +
                            "                <tr>" +
                            "                    <th width=\"47\">号码</th>" +
                            "                    <th width=\"56\">赔率</th>" +
                            "                    <th>勾选</th>" +
                            "                    <th width=\"47\">号码</th>" +
                            "                    <th width=\"56\">赔率</th>" +
                            "                    <th>勾选</th>" +
                            "                    <th width=\"47\">号码</th>" +
                            "                    <th width=\"56\">赔率</th>" +
                            "                    <th>勾选</th>" +
                            "                </tr>" +
                            "                </thead>" +
                            "                <tbody>";
                    } else {
                        html += "            <table width=\"100%\" border=\"1\">" +
                            "                <thead>" +
                            "                <tr>" +
                            "                    <th colspan=\"9\">" + json.data.betItems[r].optionTitle + "</th>" +
                            "                </tr>" +
                            "                <tr>" +
                            "                    <th width=\"47\">号码</th>" +
                            "                    <th width=\"56\">赔率</th>" +
                            "                    <th>金额</th>" +
                            "                    <th width=\"47\">号码</th>" +
                            "                    <th width=\"56\">赔率</th>" +
                            "                    <th>金额</th>" +
                            "                    <th width=\"47\">号码</th>" +
                            "                    <th width=\"56\">赔率</th>" +
                            "                    <th>金额</th>" +
                            "                </tr>" +
                            "                </thead>" +
                            "                <tbody>";
                    }
                    var index = 0;
                    html += "<tr>";
                    for (var i = 0; i < data.length; i++) {
                        var gid = '';
                        if(winUrl == 'bjPk10'){
                            if(isNaN(data[i].bettitle.substring(1,2))) {
                                gid =data[i].bettitle+parseInt(data[i].title.substring(0,2)).toString();
                            } else {
                                gid =parseInt(data[i].bettitle.substring(1,3))+parseInt(data[i].title.substring(0,2)).toString();
                            }
                        }else {
                            gid =data[i].bettitle.substring(1,2)+data[i].title.substring(0,1);
                        }
                        if(typenum ==11 || typenum == 12 || typenum == 14 || typenum == 15 || typenum == 16 || typenum == 31 ||
                            typenum == 32 || typenum == 33 || typenum == 34 || typenum == 35 || typenum == 36 || typenum == 37 ||
                            typenum == 38  || typenum == 39 || typenum == 40 || typenum == 41 || typenum == 42 || typenum == 43 ||
                            typenum == 44 || typenum == 45 || typenum == 46 || typenum == 47 || typenum == 48 || typenum == 49 || typenum == 50 || typenum == 51) {
                            html += "<td><strong>" + data[i].title + "</strong></td>" +
                                "<td><strong class=\"color-red pl\" data-plid=\"" + data[i].optionId + "\"></strong></td>" +
                                "<td><input type=\"checkbox\" id='" + gid + "' class=\"table-txt\" data-name=" + data[i].title + "\ data-plid=\"" + data[i].optionId + "\"/></td>";
                            $("#pl").data('pl',data[i].rate);
                        } else {
                            html += "<td><strong>" + data[i].title + "</strong></td>" +
                                "<td><strong class=\"color-red pl\" data-plid=\"" + data[i].optionId + "\"></strong></td>" +
                                "<td><input type=\"text\" id='" + gid + "' class=\"table-txt\" data-name=" + data[i].bettitle + "-" + data[i].title + "\ data-plid=\"" + data[i].optionId + "\"/></td>";
                        }

                        index++;
                        if (index == 3) {
                            html += "</tr><tr>";
                            index = 0;
                        }
                    };
                    html += "</tr>" ;
                };
                html +="</tbody>" +
                        "            </table>" +
                        "        </div>" +
                        "        <div class=\"btns\">" +
                        "            <button type=\"submit\" class=\"btn btn-1\">提交</button>" +
                        "            <button class=\"btn btn-2\">重设</button>" +
                        "        </div>" +
                        // "        <div class=\"game_tables\">" +
                        // "            <table width=\"100%\" border=\"0\" class=\"game_tab\" id=\"bottom_zs_table_head\">" +
                        // "                <tbody>" +
                        // "                <tr>" +
                        // "                    <th class=\"game_result choose\" data-position=\"zh\">总和</th>" +
                        // "                </tr>" +
                        // "                </tbody>" +
                        // "            </table>" +
                        // "            <table width=\"100%\" border=\"0\" class=\"game_tab\" id=\"bottom_zs_table_select\">" +
                        // "                <tbody>" +
                        // "                <tr>" +
                        // "                    <th class=\"game_result\" data-type=\"dx\">大小</th>" +
                        // "                    <th class=\"game_result choose\" data-type=\"ds\">单双</th>" +
                        // "                    <th></th>" +
                        // "                    <th></th>" +
                        // "                    <th></th>" +
                        // "                    <th></th>" +
                        // "                </tr>" +
                        // "                </tbody>" +
                        // "            </table>" +
                        // "            <div id=\"bottom_zs_table_content\">" +
                        // "            </div>" +
                        "        </div>";

                // 读取HTML页内容
                $("#sscContent").html(html);
                //"+data[i].rate+"
                // 读取赔率
                getSscPlayPl(url);

                // 下单按钮
                $("#sscContent .btns button[type='submit']").click(function() {
                    if($('.pl').html() != '封盘') {
                        xd();
                    } else {
                        parent.layer.msg('当前期已封盘，敬请期待下一期');
                    };
                });

                // 重置按钮
                $("#sscContent .btns .btn-2").click(function() {
                    if($('.pl').html() != '封盘') {
                        reset();
                    } else {
                        parent.layer.msg('当前期已封盘，敬请期待下一期');
                    };
                });
                $('#toptouzhu .fr span').on("click",function () {
                    var num = $(this).find('a').data('url');
                    getSscSubPage(num);
                })

                // 只能输入整数
                $('#sscContent input').keyup(function(){
                    // this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                    var obj = this;
                    var v = parseInt($(obj).val());
                    //先把非数字的都替换掉，除了数字和.
                    obj.value = obj.value.replace(/[^\d.]/g,"");
                    //必须保证第一个为数字而不是.
                    obj.value = obj.value.replace(/^\./g,"");
                    //必须保证第一个为非零数据
                    obj.value = obj.value.replace(/^0/g,"");
                    //保证只有出现一个.而没有多个.
                    obj.value = obj.value.replace(/\.{2,}/g,".");
                    //保证.只出现一次，而不能出现两次以上
                    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                    if (obj.value.indexOf(".") > 0 && obj.value.indexOf(".") + 0  <= obj.value.length) {
                        obj.value = obj.value.substr(0, obj.value.indexOf(".") + 0);
                    }
                    if(isNaN(v)|| v <= 0){
                        $(obj).val('');
                    }
                });
                $("#toptouzhu .kjanniu a").click(function () {
                    if($(".pl").html() !=  "封盘") {
                        var num = parseInt($(this).data('num'));
                        $('#toptouzhu input').val(num);
                    }else {
                        $(".pl").html("封盘");    // 初始显示封盘
                        $('.table-txt,.txt').val('封盘');
                    };
                });
                parent.hideLoading();

                setTimeout(function () {
                    $(".classify span a").removeClass('active');
                    $(".classify span a#"+url).addClass('active');
                },300);
            },
            complete: function() {
            }
        });
    }

    // 切换玩法
    $(function() {
        // 绑定
        $(".Playmethod ul li p span a").click(function() {
            if($('.pl').html() != '封盘') {
                $(".Playmethod ul li p span.acti").removeClass("acti");
                $(this).parent().addClass("acti");
                getSscSubPage($(this).data("url"));
            };


        });


           $(".cqssc").click(function(){
               getSscSubPage($(this).data("url"));
           });


        var navIndex = parent.parent.window.navIndex;    // 自定义导航子页面
        // 默认第一个玩法
        if (isNaN(navIndex)) {
            navIndex = 0;
        }
        $(".Playmethod ul li p span").removeClass("acti");
        $(".Playmethod ul li p span").eq(navIndex).addClass("acti");
        $(".Playmethod ul li p span a").eq(navIndex).trigger("click");
        var nums = parent.parent.window.nums;
        if(nums){
            var datas = nums.split(',');
            var obj = {};
            for(var i = 0 ; i <datas.length ;i ++){
                var value = datas[i].split('-');
                if(value[0] == 'gj'){
                    value[0] = '冠军';
                } else if(value[0] == 'yj'){
                    value[0] = '亚军';
                }
                obj[value[0]] = value[1];
            }
            setTimeout(function () {
                $.each(obj,function (index, value) {
                    $('#'+index+value+'').val(parent.parent.window.money);
                    $('#'+index+value+'').parent().prev().addClass("bg-yellow");
                    $('#'+index+value+'').parent().prev().prev().addClass("bg-yellow");
                });
            },1000);
        }
    });

    $(function() {
        // 关闭父页Loding
        try {
            parent.hideLoading();
        } catch (e) {}
    });

    $(function() {
        // 页面加载读取开奖时间
        getSscOpenTime();
    });

    var lastNumberOpening_intervalFlag = null;
    function getOpenCodeHistory() {
        // 获取开奖历史
        // debugger
        ajaxRequest({
            url: CONFIG.BASEURL + winUrl+ "_openList",
            data: {
                pageIndex: 0,
                today: 0
            },
            success: function (json) {
            	if(json.code != 200){
            		$('#lastOpenCode,#lastOpenCodeList').html('暂无记录');
            		$('#lastOpenCode,#lastOpenCodeList').css({"text-align": "center","line-height":"46px","font-size": "14px","width": "388px","padding":"0","margin":"0"});
            		return;
            	}
                var json = json.data;
                var tmpHtml = '';
                if (json.items.length > 0) {
                    var value = json.items[0];
                    var openCodeArr = value.resultItems;
                        if(value.sessionNo == window.openNum){
                            window.lastNumberOpening = false;
                        } else {
                            if(window.openNum - value.sessionNo == 1) {
                                window.lastNumberOpening = true;
                            } else {
                                window.lastNumberOpening = false;
                            }
                            //z 循环读取开奖时间，5秒
                            setTimeout(function () {
                                getOpenCodeHistory();
                            }, 5000);
                        }
                    if (window.lastNumberOpening) {
                        if (lastNumberOpening_intervalFlag == null) {
                            $("#lastNumber").html('第' + (parseInt(window.openNum)) + '期<var>开奖中</var>');

                            // 随机号码
                            if (typeof randomNumber == 'function') {
                                lastNumberOpening_intervalFlag = setInterval(function () {
                                    randomNumber();
                                }, 100);
                            }
                        }

                    } else {
                        if (null != lastNumberOpening_intervalFlag) {
                            clearInterval(lastNumberOpening_intervalFlag);
                            lastNumberOpening_intervalFlag = null;
                        }
                        $("#lastNumber").html($(".box1_name h2").html() + '第<var>' + value.sessionNo + '</var>期');
                        if (typeof renderLastOpenCode == 'function') {
                            renderLastOpenCode(openCodeArr);
                        }

                        // 我的中奖
                        if (typeof getBetZjDetails == 'function') {
                            getBetZjDetails();
                            getBetDetails();
                            getKjhm();
                        }
                    }
                } else {
                    var oLi = '<li style="text-align: center;line-height: 46px;font-size: 14px;">暂无记录</li>';
                    $('#lastOpenCode,#lastOpenCodeList').html('暂无记录');
                    $('#lastOpenCode,#lastOpenCodeList').css({"text-align": "center","line-height":"46px","font-size": "14px","width": "388px","padding":"0","margin":"0"});

                }
                 // $('.box2_stage p span i:last-of-type').html('近'+toZhDigit(json.items.length)+'期');
                // console.log($('.box2_stage p span i:last-of-type').html().length);
                // if( $('.box2_stage p span i:last-of-type').html().length== 7){
                //     $(this).css('width','98px');
                //     $(this).parent().css('width','150px');
                //
                // }
                template.helper('getBose',function(xvalue){
                    var value = parseInt(xvalue);
                    var num = getBose(value);
                    var numStr = '';
                    if (num == 0) {
                        numStr = 'ball-red';
                    } else if (num == 1) {
                        numStr = 'ball-blue';
                    } else {
                        numStr = 'ball-green';
                    }
                    return numStr;
                });
                $.each(json.items, function (index, value) {
                    var openCodeArr = value.resultItems;
                    if(winUrl == 'bjLu28' || winUrl == 'jsK3'){
                        value.resultItems.pop();
                        openCodeArr =value.resultItems;
                        tmpHtml +=  '<li>'+
                                    '<p>第'+value.sessionNo+'期</p>';
                       if(openCodeArr.length == 0) {
                           tmpHtml+='<p style="margin-left:5px">开奖中</p>';
                       } else {
                               $.each(openCodeArr,function(i,v){
                                   if(i < 2) {
                                       tmpHtml += '<i>' + v + '</i><b>+</b>';
                                   }else if(i < 3){
                                       tmpHtml += '<i>' + v + '</i>';
                                   }else {
                                       if(winUrl == 'bjLu28'){
                                           var color = '';
                                           var lastNum = value.longhu;
                                           if (lastNum == '绿波') {
                                               color = 'round ball-green';
                                           } else if (lastNum == "蓝波") {
                                               color = 'round ball-blue';
                                           } else if (lastNum == '红波') {
                                               color = '';
                                           } else if (lastNum == '无波色') {
                                               color = 'round ball-gray';
                                           }
                                           console.log(color);
                                           tmpHtml += '<b>=</b><i class="'+color+'">' + v + '</i>';
                                       } else {
                                           tmpHtml += '<b>=</b><i>' + v + '</i>';
                                       }
                                   }
                               });
                           // '</li>';
                       };
                    } else {
                        tmpHtml += template('template_openDataHistory', {number: value.sessionNo, list: openCodeArr});
                        // console.log(template('template_openDataHistory', {number: value.sessionNo, list: openCodeArr}));
                    }
                });
                $("#lastOpenCodeList ul").html(tmpHtml);
            },
            error: function() {
                // 失败重试
                setTimeout(function() {
                    getOpenCodeHistory()
                }, 5000);
            },
            complete: function () {
            }
        });
    }
    $(function() {
        // 开奖切换
        tabs_cg(".game_name .box2_stage p span i", ".game_name .box2_stage .number", "click", "acti", "", "", 0);
        setTimeout(function () {
            getOpenCodeHistory();
        },500);
    });

    // 下注
    function xd() {
        parent.showLoading();
        var num = 0;
        var minBet=0;
        var maxBet=0;
        var minNum = 0;
        var classify = $('.classify span a.active').data('url');
        var typenum = '';
        if(!classify) {
            typenum = $(".Playmethod .acti a").data('url');
        }
        else {
            typenum = classify;
        }
        if(typenum < 2) {
            minBet = 1;
            maxBet = 49;
        } else if( typenum >= 2  && typenum < 10){
            minBet = 0;
            maxBet = 100;
        }else if ( typenum == 10) {
            minBet = 2;
            maxBet = 8;
        }else if ( typenum >= 11 && typenum < 14 || typenum == 31 || typenum == 35 ||  typenum == 38 || typenum == 41){
            minBet = 2;
            maxBet = 5;
            minNum = 2;
        }else if ( typenum >= 14 && typenum < 16 || typenum == 32 || typenum == 39 ||  typenum == 36 ||  typenum == 42){
            minBet = 3;
            maxBet = 6;
            minNum = 3;
        }else if ( typenum == 16 ||typenum == 33 ||  typenum == 37 || typenum == 40 ||  typenum == 43){
            minBet = 4;
            maxBet = 7;
            minNum = 4;
        }else if ( typenum >= 17 && typenum < 21){
            minBet = 0;
            maxBet = 100;
        }else if ( typenum == 21){
            minBet = 2;
            maxBet = 2;
        }else if ( typenum == 22){
            minBet = 3;
            maxBet = 3;
        }else if ( typenum == 23){
            minBet = 4;
            maxBet = 4;
        }else if ( typenum == 24){
            minBet = 5;
            maxBet = 5;
        }else if ( typenum == 25){
            minBet = 6;
            maxBet = 6;
        }else if ( typenum == 26){
            minBet = 7;
            maxBet = 7;
        }else if ( typenum == 27){
            minBet = 8;
            maxBet = 8;
        }else if ( typenum == 28){
            minBet = 9;
            maxBet = 9;
        }else if ( typenum == 29){
            minBet = 10;
            maxBet = 10;
        }else if ( typenum == 30){
            minBet = 11;
            maxBet = 11;
        }else if ( typenum == 34 || typenum == 44){
            minBet = 5;
            maxBet = 8;
            minNum = 5;
        }else if ( typenum == 45){
            minBet = 6;
            maxBet = 9;
            minNum = 6;
        }else if ( typenum == 46){
            minBet = 7;
            maxBet = 10;
            minNum = 7;
        }else if ( typenum == 47){
            minBet = 8;
            maxBet = 11;
            minNum = 8;
        }else if ( typenum == 48){
            minBet = 9;
            maxBet = 12;
            minNum = 9;
        }else if ( typenum == 49){
            minBet = 10;
            maxBet = 13;
            minNum = 10;
        }else if ( typenum == 50){
            minBet = 11;
            maxBet = 14;
            minNum = 11;
        }else if ( typenum == 51){
            minBet = 12;
            maxBet = 15;
            minNum = 12;
        };
        if(typenum ==11 || typenum == 12 || typenum == 13 || typenum == 14 || typenum == 15 || typenum == 16 || typenum == 31 ||
            typenum == 32 || typenum == 33 || typenum == 34 || typenum == 35 || typenum == 36 || typenum == 37 ||
            typenum == 38  || typenum == 39 || typenum == 40 || typenum == 41 || typenum == 42 || typenum == 43 ||
            typenum == 44 || typenum == 45 || typenum == 46 || typenum == 47 || typenum == 48 || typenum == 49 || typenum == 50 || typenum == 51) {
            var betForm = getZhudan($(".Playmethod .acti a").html(), minNum);
        } else {
            var betForm = getZhudan();
        }
        if (typeof betForm != 'object') {
            parent.hideLoading();
            return;
        }
        if (betForm.sscBetList.length == 0) {
            parent.hideLoading();
            parent.layer.msg("请选择要下注的内容");
            return;
        }
        var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;">共计：￥<font class="red">' + betForm.totalMoney + '</font>/<font class="red">' + betForm.totalZhushu + '</font>&nbsp;注，您确定要下注吗？</p>';
        $.each(betForm.sscBetList, function(index, value) {
            str += '<p><span>[&nbsp;' + value.content + '&nbsp;]</span><span>&nbsp;@' + value.playPl + '&nbsp;X&nbsp;' + value.perMoney + '</span></p>';
            num++;
        });

        if(!(typenum ==11 || typenum == 12 || typenum == 13 || typenum == 14 || typenum == 15 || typenum == 16 || typenum == 31 ||
            typenum == 32 || typenum == 33 || typenum == 34 || typenum == 35 || typenum == 36 || typenum == 37 ||
            typenum == 38  || typenum == 39 || typenum == 40 || typenum == 41 || typenum == 42 || typenum == 43 ||
            typenum == 44 || typenum == 45 || typenum == 46 || typenum == 47 || typenum == 48 || typenum == 49 || typenum == 50 || typenum == 51)) {
            if (num < minBet || num > maxBet) {
                parent.hideLoading();
                parent.layer.msg('投注数在' + minBet + '-' + maxBet + '之间');
                return;
            }
        }
        parent.hideLoading();
        //询问框
        if(window.innerWidth < 1024){
            layer.confirm(str,
            {
            btn: ['确认','取消'], //按钮
            title: '下注清单',
            area: ['200px','340px'],
            offset: ['60px','320px']
        	}, function(){
            	sureXd(minNum);
        	}, function(){
        });
        }else{
            layer.confirm(str, {
			btn: ['确认', '取消'], //按钮
			title: '下注清单',
			// area: ['300px', '400px'],
            offset: ['80px','420px']
			}, function() {
				sureXd(minNum);
			}, function() {});
        }
        
        $(".layui-layer-title").addClass('xzqd');
        $(".layui-layer-close").css({'background': 'url(../../images/ico_close.png) no-repeat'});
    }




    function getZhudan(name,num) {
        var betForm = {
            totalMoney: 0,
            totalMoney1: 0,
            sessionNo: $("#number").data("number"),
            sscBetList: [],
            getSscBetList:[],
            totalZhushu: 0,
            totalZhushu1: 0
        };
        if(name && num) {
            var arr = [];
            $(".main-left .table-common input").each(function () {
                if ($(this).is(":checked")) {
                    arr.push($(this).data("name"));
                }
            });
            if (arr.length < num) {
                setTimeout(function () {
                    parent.layer.msg("至少选择"+num+"个号码");
                },500);
                return;
            }
            var tmpArr = getFlagArrs(arr, num);
            var inputMoney = $(".refl input").val();
            if (typeof inputMoney == 'undefined' || !inputMoney) {
                setTimeout(function () {
                    parent.layer.msg("请输入正确的金额");
                },500);
                return;
            }
            $.each(tmpArr, function (index, value) {
                betForm.sscBetList.push({
                    number: $("#number").data("number"),
                    playId: playId,
                    zhushu: 1,
                    perMoney: inputMoney,
                    content: name+'-' + value.split(" ").join(","),
                    playPlId: $("#pl").data("plid"),
                    playPl: $("#pl").data("pl")
                });
                betForm.totalMoney = add(betForm.totalMoney, inputMoney);
                betForm.totalZhushu = add(betForm.totalZhushu, 1);
            });
            $(".main-left .table-common input:checked").each(function () {
                var inputMoney = $(this).val();
                if (typeof inputMoney != 'undefined' && inputMoney != '') {
                    betForm.getSscBetList.push({
                        number: $("#number").data("number"),
                        zhushu: 1,
                        perMoney: $(".refl input").val(),
                        content: $(this).data("name"),
                        playPlId: $(this).data("plid"),
                        playPl: $("#pl").data("pl")
                    });
                    betForm.totalMoney1 = add(betForm.totalMoney1, inputMoney);
                    betForm.totalZhushu1 = add(betForm.totalZhushu1, 1);
                }
            });
        }else {
            $(".main-left .table-common input").each(function () {
                // console.log($(this));
                var inputMoney = $(this).val();
                if (typeof inputMoney != 'undefined' && inputMoney != '') {
                    betForm.sscBetList.push({
                        number: $("#number").data("number"),
                        zhushu: 1,
                        perMoney: inputMoney,
                        content: $(this).data("name"),
                        playPlId: $(this).data("plid"),
                        playPl: $(this).data("pl")
                    });
                    betForm.totalMoney = add(betForm.totalMoney, inputMoney);
                    betForm.totalZhushu = add(betForm.totalZhushu, 1);
                }
            });
        };
        // console.log(betForm.totalMoney);
        return betForm;
    }

    function checkZhudan() {
        return true;
    }
    function sureXd(minNum) {
        var data = {
            u :$.cookie("u"),
            optionArray:[]
        };
        if(minNum) {
            var betForm = getZhudan($(".Playmethod .acti a").html(), minNum);
            for(var i = 0; i <betForm.getSscBetList.length; i++) {
                data.optionArray.push({
                    id: betForm.getSscBetList[i].playPlId,
                    p: betForm.getSscBetList[i].perMoney
                });
            }
        } else {
            var betForm = getZhudan();
            for(var i = 0; i <betForm.sscBetList.length; i++) {
                data.optionArray.push({
                    id: betForm.sscBetList[i].playPlId,
                    p: betForm.sscBetList[i].perMoney
                });
            }
        }
        data['sessionNo']=betForm.sessionNo;
        if (typeof betForm != 'object') {
            return;
        }

            setTimeout(function () {
                data.optionArray = JSON.stringify(data.optionArray);
                var mw = baseObj.mw(data);
                ajaxRequest({
                    url: CONFIG.BASEURL + winUrl+ "_bet",
                    data: {
                        mw: mw
                    },
                    beforeSend: function () {
                        layer.closeAll();
                        parent.showLoading();
                    },
                    success: function (json) {
                        // console.log(baseObj.mw(data));
                        parent.hideLoading();
                        if (json.code == 200) {
                            parent.layer.msg("下注成功", {icon: 1});
                            // 刷新我的投注
                            getBetDetails();
                            // 刷新余额
                            parent.getUserSession({u: $.cookie('u')});
                            // 重置表格
                            reset();
                            setTimeout(function () {
                                getBetDetails();
                            },3000);
                        } else {
                            if(!$.cookie('u')) {
                                parent.layer.msg("下注失败：请先登录", {icon: 2});
                            } else {
                                parent.layer.msg("下注失败：" + json.msg, {icon: 2});
                            }
                        }
                    },
                    complete: function () {
                    }
                });
            }, 500);
    }

    function reset() {

        if($(".pl").html() =="封盘"){
            return;
        }
        $(".main-left .table-common input").each(function(index, value) {
            if ($(this).attr("type") == "checkbox") {
                $(this).prop("checked", false);
            } else if ($(this).attr("type") == "text") {
                $(this).val('');
            }
        });
        $(".bg-yellow").removeClass("bg-yellow");
        $(".main-left .fl input").each(function() {
            if ($(this).attr("type") != 'submit') {
                $(this).val('');
            }
        });
    }

    $(function() {

        $("#sscContent .btns button[type='submit']").click(function() {
            xd();
        });

        $("#sscContent .btns .btn-2").click(function() {
            reset();
        });
    });

    // 底部
    function getBetZjDetails(){
        var container = $(".wdzj");
        ajaxRequest({
            url: CONFIG.BASEURL + "baseData_betlist",
            data: {
                mw: baseObj.mw({
                u : $.cookie('u'),
                pageIndex:0,
                status: 1
                })
            },
            beforeSend: function() {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="../../images/base_loading.gif"/>');
                $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<a href="../../common/login.html" target="_blank"  class="spanlogin">登录</a>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="../../common/register.html" target="_blank">注册</a></span>一个</li>');

                $("#bottomInfo #BetLogin .spanlogin").click(function () {
                    $(".alert_log").fadeIn();
                });
                $(".alert_log .alert_log_col h5 i").click(function () {
                    $(".alert_log").fadeOut();
                });
                parent.getUserSession({u:$.cookie('u')});
            },
            success: function(json) {
                if(json.code == 404) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无中奖纪录</li>');
                    return;
                }
                if (json.code != 200) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<a href="../../common/login.html" target="_blank" class="spanlogin">登录</a>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="../../common/register.html" target="_blank">注册</a></span>一个</li>');

                    
                    $(".alert_log .alert_log_col h5 i").click(function () {
                        $(".alert_log").fadeOut();
                    });
                    parent.getUserSession({u:$.cookie('u')});
                    return;
                }
                if(json.code != 200) {
                    return;
                }

                if (json.data.items.length == 0) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无中奖纪录</li>');
                    return;
                }

                var obj = {list: []};
                $.each(json.data.items,function (index,value) {
                    obj.list.push({
                        playGroupName: value.gameName,
                        number: value.sessionNo,
                        playName: value.playName,
                        content: value.betName,
                        totalMoney: value.betPoint,
                        jiangjin: mul(value.betPoint, value.betRate),
                        status: value.winStatus,
                        zjMoney: value.winCash
                    });
                });
                var html = template('wdzjTemplate', obj);
                $(container).html(html);
            }
        });
    }

    function getJjsm() {
        var container = $(".jjsm");
        ajaxRequest({
            url: CONFIG.BASEURL + "ssc/ajaxGetSscPlayJjDescription.json",
            data: {
                playId: playId
            },
            beforeSend: function() {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="../../images/base_loading.gif"/>');
            },
            success: function(json) {
                if(json.result != 1) {
                    return;
                }

                $(container).html(json.jjDescription);
            }
        });
    }
    function getKjhm(){
        var container = $(".kjhm");
        ajaxRequest({
            url: CONFIG.BASEURL + winUrl+"_openList",
            data: {
                   today: 0,
                   pageIndex: 0,
                   pageSize:20
            },
            beforeSend: function() {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="../../images/base_loading.gif"/>');
            },
            success: function(json) {
                if(json.code == 404) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无记录</li>');
                    return;
                }
                if (json.code != 200) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">请先登录</li>');
                    return;
                }

                if (json.data.items.length == 0) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无记录</li>');
                    return;
                }

                var obj = {list: []};
                $.each(json.data.items,function (index,value) {
                        var openNum = '';
                        value.resultOpen = [];
                        if(winUrl == 'bjLu28' || winUrl == 'jsK3'){
                            $.each(value.resultItems,function (i, v) {
                                if(i < value.resultItems.length -2){
                                    value.resultOpen.push(value.resultItems[i]);
                                }
                            })
                            openNum = value.resultOpen.join(',');
                        } else {
                            openNum = value.resultItems.join(',');
                        }
                        obj.list.push({
                            playGroupName: value.gameName,
                            number: value.sessionNo,
                            openCode: openNum,
                            openTime: value.openTime
                        });
                });
                var html = template('kjhmTemplate', obj);
                $(container).html(html);
            }
        });
    }

    function getBetDetails(){
        var container = $(".wdtz");
        var map = {
            u : $.cookie('u'),
            pageIndex:0,
            status:0
        };
        var mw = baseObj.mw(map);
        ajaxRequest({
            url: CONFIG.BASEURL + "baseData_betlist",
            data: {
                mw: mw
            },
            beforeSend: function() {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="../../images/base_loading.gif"/>');
                $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<a href="../../common/login.html" target="_blank"  class="spanlogin">登录</a>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="../../common/register.html" target="_blank">注册</a></span>一个</li>');

                $("#bottomInfo #BetLogin .spanlogin").click(function () {
                    $(".alert_log").fadeIn();
                });
                $(".alert_log .alert_log_col h5 i").click(function () {
                    $(".alert_log").fadeOut();
                });
                parent.getUserSession({u:$.cookie('u')});
            },
            success: function(json) {
                if (json.code == 404) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无投注</li>');
                    return;
                }
                if (json.code != 200) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<a href="../../common/login.html" target="_blank"  class="spanlogin">登录</a>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="../../common/register.html" target="_blank">注册</a></span>一个</li>');

                    $(".alert_log .alert_log_col h5 i").click(function () {
                        $(".alert_log").fadeOut();
                    });
                    parent.getUserSession({u:$.cookie('u')});
                    return;
                }
                if(json.code != 200) {
                    return;
                }

                if (json.data.items.length == 0) {
                    $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无投注</li>');
                    return;
                }

                var obj = {list: []};
                $.each(json.data.items,function (index,value) {
                    obj.list.push({
                        playGroupName: value.gameName,
                        number: value.sessionNo,
                        playName: value.playName,
                        content: value.betName,
                        totalMoney: value.betPoint,
                        status: value.winStatus,
                        zjMoney: value.zjMoney
                    });
                });

                var html = template('wdtzTemplate', obj);
                $(container).html(html);
            }
        });
    }

    $(function() {
        $("#bottomInfo .tabs ul li").click(function() {
            $("#bottomInfo .tabs ul li.acti").removeClass("acti");
            $(this).addClass("acti");
            $("#bottomInfo .list_wrap").hide();

            var obj = $("#bottomInfo .list_wrap").eq($(this).index());
            $(obj).show();

            var operType = $(this).data("opertype");
            if (operType == 'wdtz') {
                getBetDetails();
            } else if (operType == 'kjhm') {
                getKjhm(obj);
            } else if (operType == 'jjsm') {
                getJjsm(obj);
            } else if (operType == 'wdzj') {
                getBetZjDetails(obj);
            }
        });

        $("#bottomInfo .tabs ul li").eq(0).trigger("click");


        // 点击变黄
        $("body").on('click','.main-left .table-common tbody tr td',function() {
            if($(".pl").html() !="封盘"){
                if ($(".main-left .fl input").length == 0) {
                    return;
                }
                var val = $(".main-left .fl input").val();
                if (typeof val == 'undefined' || !val) {
                    val = '';
                }
                if(winUrl != 'jsK3') {
                    var index = $(this).index();
                };
                if ($(this).find("input").length > 0) {

                } else if ($(this).find(".pl").length > 0) {

                    if ($(this).hasClass("bg-yellow")) {
                        $(this).removeClass("bg-yellow");
                        $(this).prev().find("input").length == 0 && $(this).prev().html() != '&nbsp;' && (typeof $(this).prev().html() != 'undefined' && $(this).prev().html().indexOf('和数') < 0) && $(this).prev().removeClass("bg-yellow");
                        $(this).next().find("input").val("");
                    } else {
                        $(this).addClass("bg-yellow");
                        $(this).prev().find("input").length == 0 && $(this).prev().html() != '&nbsp;' && (typeof $(this).prev().html() != 'undefined' && $(this).prev().html().indexOf('和数') < 0) && $(this).prev().addClass("bg-yellow");
                        $(this).next().find("input").val(val);
                    }
                } else if ($(this).html() != '&nbsp;' && ($(this).prev().find("strong").length == 0 || $(this).prev().find("strong").html() == 'undefined' || $(this).prev().find("strong").html().indexOf('和数') < 0)) {

                    if ($(this).hasClass("bg-yellow")) {
                        $(this).removeClass("bg-yellow");
                        $(this).next().removeClass("bg-yellow");
                        $(this).next().next().find("input").val("");
                    } else {
                        $(this).addClass("bg-yellow");
                        $(this).next().addClass("bg-yellow");
                        $(this).next().next().find("input").val(val);
                    }
                };
            }

        });
        $('.change2').on('click',function(){
		$('.classify2').addClass('block');
		$('.classify2').siblings().removeClass('block');
	})
    });

/*阿拉伯数字转中文数字*/
// function toZhDigit(digit) {
//     digit = typeof digit === 'number' ? String(digit) : digit;
//     const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
//     const unit = ['千', '百', '十', ''];
//     const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
//
//     let breakLen = Math.ceil(digit.length / 4);
//     let notBreakSegment = digit.length % 4 || 4;
//     let segment;
//     let zeroFlag = [], allZeroFlag = [];
//     let result = '';
//
//     while (breakLen > 0) {
//         if (!result) { // 第一次执行
//             segment = digit.slice(0, notBreakSegment);
//             let segmentLen = segment.length;
//             for (let i = 0; i < segmentLen; i++) {
//                 if (segment[i] != 0) {
//                     if (zeroFlag.length > 0) {
//                         result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
//                         // 判断是否需要加上 quot 单位
//                         if (i === segmentLen - 1 && breakLen > 1) {
//                             result += quot[breakLen - 2];
//                         }
//                         zeroFlag.length = 0;
//                     } else {
//                         result += zh[segment[i]] + unit[4 - segmentLen + i];
//                         if (i === segmentLen - 1 && breakLen > 1) {
//                             result += quot[breakLen - 2];
//                         }
//                     }
//                 } else {
//                     // 处理为 0 的情形
//                     if (segmentLen == 1) {
//                         result += zh[segment[i]];
//                         break;
//                     }
//                     zeroFlag.push(segment[i]);
//                     continue;
//                 }
//             }
//         } else {
//             segment = digit.slice(notBreakSegment, notBreakSegment + 4);
//             notBreakSegment += 4;
//
//             for (let j = 0; j < segment.length; j++) {
//                 if (segment[j] != 0) {
//                     if (zeroFlag.length > 0) {
//                         // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
//                         if (j === 0) {
//                             result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
//                         } else {
//                             result += '零' + zh[segment[j]] + unit[j];
//                         }
//                         zeroFlag.length = 0;
//                     } else {
//                         result += zh[segment[j]] + unit[j];
//                     }
//                     // 判断是否需要加上 quot 单位
//                     if (j === segment.length - 1 && breakLen > 1) {
//                         result += quot[breakLen - 2];
//                     }
//                 } else {
//                     // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
//                     if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
//                         result += quot[breakLen - 1];
//                         zeroFlag.length = 0;
//                         zeroFlag.push(segment[j]);
//                     } else if (allZeroFlag.length > 0) {
//                         // 执行到最后
//                         if (breakLen == 1) {
//                             result += '';
//                         } else {
//                             zeroFlag.length = 0;
//                         }
//                     } else {
//                         zeroFlag.push(segment[j]);
//                     }
//
//                     if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
//                         // 如果执行到末尾
//                         if (breakLen === 1) {
//                             allZeroFlag.length = 0;
//                             zeroFlag.length = 0;
//                             result += quot[breakLen - 1];
//                         } else {
//                             allZeroFlag.push(segment[j]);
//                         }
//                     }
//                     continue;
//                 }
//             }
//
//
//             --breakLen;
//         }
//
//         return result;
//     }
// }