/**
 * Created by simba on 2017/7/22.
 */
var winUrl = window.location.href.split('/');
winUrl = winUrl[winUrl.length-1].split('.');
winUrl = winUrl[0]; //获取当前的彩种
var pageUrl = winUrl;
var ssc = winUrl.indexOf('ssc');
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
if(ssc > 0) {
    $(function () {
        refreshViewRight();
    });

    function refreshViewRight() {
        ajaxRequest({
            url: CONFIG.BASEURL + winUrl + "_openList",
            data: {
                pageIndex: 0,
                pageSize: 30,
                today : -999
            },
            success: function (json) {
                if (json.code != 200) {
                    return;
                }
                var data = json.data.items;
                data.reverse();
                renderView(data);
            }
        });
    }
    function renderView(json) {
        var result = [];
        var maxdsY = [], maxzhdsY = [];
        var maxdxY = [], maxzhdxY = [];
        for (var i = 0; i < 6; ++i) {
            result[i] = {ds: [], dx: []};
            maxdsY[i] = 0;
            maxdxY[i] = 0;
            maxzhdsY[i] = 0;
            maxzhdxY[i] = 0;
        }
        var str = '';


        $("#bottom_zs_table_head tbody tr th").each(function () {
            var position = $(this).data("position");
            if (position != 'zh') {
                for (var i = 0; i < json.length; ++i) {
                    var value = parseInt(json[i].resultItems[Tools.parseInt(position)]);
                    var name = value % 2 == 0 ? '<font style="color:#e70f0f;border: 1px solid;margin-left: -9.5%;padding:0 2px;">双</font>' : '<font style="color:#58adff;border: 1px solid;margin-left: -9.5%;padding:0 2px;">单</font>';
                    var x = 0, y = 0;

                    if (result[Tools.parseInt(position)].ds.length != 0) {
                        var preObj = result[Tools.parseInt(position)].ds[i - 1];
                        if (preObj.name == name) {
                            x = preObj.x;
                            y = preObj.y + 1;
                        } else {
                            x = preObj.x + 1;
                            y = 0;
                        }
                    }
                    result[Tools.parseInt(position)].ds.push({
                        name: name,
                        x: x,
                        y: y
                    });


                    var value = json[i].resultItems[Tools.parseInt(position)];
                    var name = value >= 5 ? '<font style="color:#e70f0f;border: 1px solid;margin-left: -9.5%;padding:0 2px;">大</font>' : '<font style="color:#58adff;border: 1px solid;margin-left: -9.5%;padding:0 2px;">小</font>';
                    var xdx = 0, ydx = 0;

                    if (result[Tools.parseInt(position)].dx.length != 0) {
                        var preObj = result[Tools.parseInt(position)].dx[i - 1];
                        if (preObj.name == name) {
                            xdx = preObj.x;
                            ydx = preObj.y + 1;
                        } else {
                            xdx = preObj.x + 1;
                            ydx = 0;
                        }
                    }
                    result[Tools.parseInt(position)].dx.push({
                        name: name,
                        x: xdx,
                        y: ydx
                    });
                }




                // 单双
                str += '<table style="width: 100%;color:#007ABE;background: #F9F7F4;height: 30px; font-size: 14px;"><tobody><th>' + (position == 0 ? '第一球单双大小' : (position == 2 ? '第三球单双大小' : (position == 3 ? '第四球单双大小' : (position == 4 ? '第五球单双大小' : '第二球单双大小')))) + '<th></tobody></table>';
                str += '<table id="bottom_zs_table_' + position + '_ds" width="100%" border="0" class="resultLoad">';
                str += '<tbody>';


                var maxX = 30;
                var maxY = 5;

                $.each(result[Tools.parseInt(position)].ds, function (index, value) {
                    if (value.x > maxX) {
                        maxX = value.x;
                    }
                });


                for (var i = 0; i < maxY + 1; ++i) {
                    str += '<tr class="resultLoad">';
                    for (var j = 0; j < 52; ++j) {
                        str += '<td style="width: 15px;">&nbsp;</td>';
                    }
                    str += '</tr>';
                }
                str += '</tbody>';
                str += '</table>';


                // 大小
                str += '<table id="bottom_zs_table_' + position + '_dx" width="100%" border="0" class="resultLoad">';
                str += '<tbody>';

                var maxX = 25;
                var maxY = 5;
                $.each(result[Tools.parseInt(position)].dx, function (index, value) {
                    if (value.x > maxX) {
                        maxX = value.x;
                    }
                });

                for (var i = 0; i < maxY + 1; ++i) {
                    str += '<tr class="resultLoad">';
                    for (var j = 0; j < 52; ++j) {
                        str += '<td style="width:15px;">&nbsp;</td>';
                    }
                    str += '</tr>';
                }
                str += '</tbody>';
                str += '</table>';
            } else {
                for (var i = 0; i < json.length; ++i) {
                    var value = 0;
                    for (var j = 0, tmpArr = json[i].resultItems; j < tmpArr.length; ++j) {
                        value += Tools.parseInt(tmpArr[j]);
                    }

                    var name = value % 2 == 0 ? '<font style="color:#e70f0f;border: 1px solid;margin-left: -9.5%;padding:0 2px;">双</font>' : '<font style="color:#58adff;border: 1px solid;margin-left: -9.5%;padding:0 2px;">单</font>';
                    var x = 0, y = 0;

                    if (result[5].ds.length != 0) {
                        var preObj = result[5].ds[i - 1];
                        if (preObj.name == name) {
                            x = preObj.x;
                            y = preObj.y + 1;
                        } else {
                            x = preObj.x + 1;
                            y = 0;
                        }
                    }
                    result[5].ds.push({
                        name: name,
                        x: x,
                        y: y
                    });
                }

                for (var i = 0; i < json.length; ++i) {
                    var value = 0;
                    for (var j = 0, tmpArr = json[i].resultItems; j < tmpArr.length; ++j) {
                        value += Tools.parseInt(tmpArr[j]);
                    }
                    var name = value >= 23 ? '<font style="color:#e70f0f;border: 1px solid;margin-left: -9.5%;padding:0 2px;">大</font>' : '<font style="color:#58adff;border: 1px solid;margin-left: -9.5%;padding:0 2px;">小</font>';
                    var x = 0, y = 0;

                    if (result[5].dx.length != 0) {
                        var preObj = result[5].dx[i - 1];
                        if (preObj.name == name) {
                            x = preObj.x;
                            y = preObj.y + 1;
                        } else {
                            x = preObj.x + 1;
                            y = 0;
                        }
                    }
                    result[5].dx.push({
                        name: name,
                        x: x,
                        y: y
                    });
                }

                // 单双
                str += '<table style="width: 100%; color:#84200D;background: #F9F7F4;height: 30px; font-size: 15px;"><tobody><th>总和单双大小<th></tobody></table>';
                str += '<table style="width: 100%" id="bottom_zs_table_' + position + '_ds" border="0" class="resultLoad">';
                str += '<tbody>';


                var maxY = 5;
                var maxX = 30;
                $.each(result[5].ds, function (index, value) {
                    if (value.x > maxX) {
                        maxX = value.x;
                    }
                });

                for (var i = 0; i < maxY + 1; ++i) {
                    str += '<tr class="resultLoad">';
                    for (var j = 0; j < 52; ++j) {
                        str += '<td style="width:15px;">&nbsp;</td>';
                    }
                    str += '</tr>';
                }
                str += '</tbody>';
                str += '</table>';


                // 大小
                str += '<table id="bottom_zs_table_' + position + '_dx" width="100%" border="0" class="resultLoad">';
                str += '<tbody>';


                var maxX = 30;
                var maxY = 5;
                $.each(result[5].dx, function (index, value) {
                    if (value.x > maxX) {
                        maxX = value.x;
                    }
                });

                for (var i = 0; i < maxY + 1; ++i) {
                    str += '<tr class="resultLoad">';
                    for (var j = 0; j < 52; ++j) {
                        str += '<td style="width:15px;">&nbsp;</td>';
                    }
                    str += '</tr>';
                }
                str += '</tbody>';
                str += '</table>';
            }
        });

        $("#bottom_zs_table_content").html(str);

        var flagdx = new Array();
        var flagdx_1 = new Array();
        var flagdx_2 = new Array();
        var flagdx_3 = new Array();
        var flagdx_4 = new Array();
        var flagdx_5 = new Array();

        var flagds = new Array();
        var flagds_1 = new Array();
        var flagds_2 = new Array();
        var flagds_3 = new Array();
        var flagds_4 = new Array();
        var flagds_5 = new Array();
        for (var ydx = 0; ydx < 6; ydx++) {
            flagdx[ydx] = new Array();
            flagdx_1[ydx] = new Array();
            flagdx_2[ydx] = new Array();
            flagdx_3[ydx] = new Array();
            flagdx_4[ydx] = new Array();
            flagdx_5[ydx] = new Array();

            flagds[ydx] = new Array();
            flagds_1[ydx] = new Array();
            flagds_2[ydx] = new Array();
            flagds_3[ydx] = new Array();
            flagds_4[ydx] = new Array();
            flagds_5[ydx] = new Array();
            for (var xdx = 0; xdx < 53; xdx++) {
                flagdx[ydx][xdx] = 0;
                flagdx_1[ydx][xdx] = 0;
                flagdx_2[ydx][xdx] = 0;
                flagdx_3[ydx][xdx] = 0;
                flagdx_4[ydx][xdx] = 0;
                flagdx_5[ydx][xdx] = 0;

                flagds[ydx][xdx] = 0;
                flagds_1[ydx][xdx] = 0;
                flagds_2[ydx][xdx] = 0;
                flagds_3[ydx][xdx] = 0;
                flagds_4[ydx][xdx] = 0;
                flagds_5[ydx][xdx] = 0;
            }
        }

        for (var i = 0; i < 6; ++i) {
            var value = result[i];
            var col_y_flag_dx = 5, col_y_flag_ds = 5; //最初为5 ，为底层标记
            var dx_col_max_right_x = 0, ds_col_max_right_x = 0; //当前超过六行时，往右移动最大数标记
            var col_x_dx = 1, col_x_ds = 1;
            var pre = i == 5 ? 'zh' : i;
            $.each(value.ds, function (index, value) {
                if (value.y > col_y_flag_ds) {
                    $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(col_y_flag_ds).find("td").eq((parseInt(value.x) + col_x_ds)).html(value.name);
                    //分别设置每位遍历写入表格时，超过六行的标记（记录x轴的延伸情况）
                    if(i == 0){
                        flagds[col_y_flag_ds][value.x + col_x_ds] = 1;
                    }else if(i == 1){
                        flagds_1[col_y_flag_ds][value.x + col_x_ds] = 1;
                    }else if(i == 2){
                        flagds_2[col_y_flag_ds][value.x + col_x_ds] = 1;
                    }else if(i == 3){
                        flagds_3[col_y_flag_ds][value.x + col_x_ds] = 1;
                    }else if(i == 4){
                        flagds_4[col_y_flag_ds][value.x + col_x_ds] = 1;
                    }else if(i == 5){
                        flagds_5[col_y_flag_ds][value.x + col_x_ds] = 1;
                    }

                    ds_col_max_right_x = ds_col_max_right_x > (value.x + col_x_ds) ? ds_col_max_right_x : (value.x + col_x_ds);
                    col_x_ds++;
                } else {
                    //判断每位每组数据在碰到做标记的数据时，向右移动且对当前行数减掉一行，并且记录当前最大x轴延伸的位置
                    if ((i == 5 && flagds_5[value.y][value.x] == 1) ||(i == 4 && flagds_4[value.y][value.x] == 1) ||(i == 3 && flagds_3[value.y][value.x] == 1) ||(i == 2 && flagds_2[value.y][value.x] == 1) || (i == 1 && flagds_1[value.y][value.x] == 1) || (i == 0 && flagds[value.y][value.x] == 1)) {
                        if (col_y_flag_ds != 0) {
                            col_y_flag_ds--;
                        }
                        $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(col_y_flag_ds).find("td").eq(value.x + col_x_ds).html(value.name);
                        if(i == 0){
                            flagds[col_y_flag_ds][value.x + col_x_ds] = 1;
                        }else if(i == 1){
                            flagds_1[col_y_flag_ds][value.x + col_x_ds] = 1;
                        }else if(i == 2){
                            flagds_2[col_y_flag_ds][value.x + col_x_ds] = 1;
                        }else if(i == 3){
                            flagds_3[col_y_flag_ds][value.x + col_x_ds] = 1;
                        }else if(i == 4){
                            flagds_4[col_y_flag_ds][value.x + col_x_ds] = 1;
                        }else if(i == 5){
                            flagds_5[col_y_flag_ds][value.x + col_x_ds] = 1;
                        }
                        ds_col_max_right_x = ds_col_max_right_x > (value.x + col_x_ds) ? ds_col_max_right_x : (value.x + col_x_ds);
                        col_x_ds++;
                    } else {
                        //正常填入大小标记时，初始化x轴累加号 col_x_ds ，待下个往右移动数据时使用
                        col_x_ds = 1;
                        //当不在做记号数据坐标的范围时，初始化最大行号为5
                        if (value.x > ds_col_max_right_x) {
                            col_y_flag_ds = 5;
                        }
                        $('#bottom_zs_table_' + pre + '_ds').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                    }

                }
            });
            $.each(value.dx, function (index, value) {
                if (value.y > col_y_flag_dx) {
                    $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(col_y_flag_dx).find("td").eq((parseInt(value.x) + col_x_dx)).html(value.name);
                    //分别设置每位遍历写入表格时，超过六行的标记（记录x轴的延伸情况）
                    if(i == 0){
                        flagdx[col_y_flag_dx][value.x + col_x_dx] = 1;
                    }else if(i == 1){
                        flagdx_1[col_y_flag_dx][value.x + col_x_dx] = 1;
                    }else if(i == 2){
                        flagdx_2[col_y_flag_dx][value.x + col_x_dx] = 1;
                    }else if(i == 3){
                        flagdx_3[col_y_flag_dx][value.x + col_x_dx] = 1;
                    }else if(i == 4){
                        flagdx_4[col_y_flag_dx][value.x + col_x_dx] = 1;
                    }else if(i == 5){
                        flagdx_5[col_y_flag_dx][value.x + col_x_dx] = 1;
                    }

                    dx_col_max_right_x = dx_col_max_right_x > (value.x + col_x_dx) ? dx_col_max_right_x : (value.x + col_x_dx);
                    col_x_dx++;
                } else {
                    //判断每位每组数据在碰到做标记的数据时，向右移动且对当前行数减掉一行，并且记录当前最大x轴延伸的位置
                    if ((i == 5 && flagdx_5[value.y][value.x] == 1) ||(i == 4 && flagdx_4[value.y][value.x] == 1) ||(i == 3 && flagdx_3[value.y][value.x] == 1) ||(i == 2 && flagdx_2[value.y][value.x] == 1) || (i == 1 && flagdx_1[value.y][value.x] == 1) || (i == 0 && flagdx[value.y][value.x] == 1)) {
                        if (value.y  != 0) {
                            col_y_flag_dx = value.y - 1;
                        }
                        $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(col_y_flag_dx).find("td").eq(value.x + col_x_dx).html(value.name);
                        if(i == 0){
                            flagdx[col_y_flag_dx][value.x + col_x_dx] = 1;
                        }else if(i == 1){
                            flagdx_1[col_y_flag_dx][value.x + col_x_dx] = 1;
                        }else if(i == 2){
                            flagdx_2[col_y_flag_dx][value.x + col_x_dx] = 1;
                        }else if(i == 3){
                            flagdx_3[col_y_flag_dx][value.x + col_x_dx] = 1;
                        }else if(i == 4){
                            flagdx_4[col_y_flag_dx][value.x + col_x_dx] = 1;
                        }else if(i == 5){
                            flagdx_5[col_y_flag_dx][value.x + col_x_dx] = 1;
                        }
                        dx_col_max_right_x = dx_col_max_right_x > (value.x + col_x_dx) ? dx_col_max_right_x : (value.x + col_x_dx);
                        col_x_dx++;
                    } else {
                        //正常填入大小标记时，初始化x轴累加号 col_x_dx ，待下个往右移动数据时使用
                        col_x_dx = 1;
                        //当不在做记号数据坐标的范围时，初始化最大行号为5
                        if (value.x > dx_col_max_right_x) {
                            col_y_flag_dx = 5;
                        }
                        $('#bottom_zs_table_' + pre + '_dx').find("tr").eq(value.y).find("td").eq(value.x).html(value.name);
                    }

                }
            });
        }
    }
};
var pageSize=30;
$(function() {
    var date = new Date();
    var year=date.getFullYear();   //返回一个表示年份的 4 位数字
    var month=date.getMonth()+1;   //返回表示月份的数字。返回值是 0（一月） 到 11（十二月） 之间的一个整数
    var startT=null;
    var endT=null;

    $(".search-right .qi a").click(function () {
        $(".search-right .qi.xuan").removeClass("xuan");    //方法从被选元素移除一个或多个类.
        $(this).parent().addClass("xuan");   //addClass向被选元素添加一个或多个类 //parent)_返回被选元素的直接父元素。
        var flag = $(this).html();   //html()返回或设置被选元素的内容
        if (flag == "近30期") {
            pageSize = 30;
            ajaxGetData(pageSize, null, null);
        } else if (flag == "近50期") {
            pageSize = 50;
            ajaxGetData(pageSize, null, null);
        } else if (flag == "近100期") {
            pageSize = 100;
            ajaxGetData(pageSize, null, null);
        } else if (flag == "近150期") {
            pageSize = 150;
            ajaxGetData(pageSize, null, null);
        } else if (flag == "近200期") {
            pageSize = 200;
            ajaxGetData(pageSize, null, null);
        }
//            else if (flag == "今天") {
//                pageSize = null;
//                startT = 't1';
//                ajaxGetData(playGroupId, pageSize, startT, endT);
//            } else if (flag = "近三天") {
//                pageSize = null;
//                startT = 't3';
//                ajaxGetData(playGroupId, pageSize, startT, endT);
//            }
    });
});
function showLoading() {
    layer.load(2, {
        shade: [0.1,'#000'], //0.1透明度的白色背景
    })
}
function hideLoading() {
    layer.closeAll();
}

$(function() {
    parent.hideLoading();
});

$(function(){
    //悬停
    $(".czqh").hover(function(){
        $(".min").show()
    },function(){
        $(".min").hide()
    });

    //点击绘图工具
    $(".kuang1 .div").click(function(){
        $(".kuang1 .btn-box").show();
        $("#canvas,#canvas2").css("z-index","10000");
    });

    $(".btn-cos").click(function(){
        $(".kuang1 .btn-box").hide();
        $("#canvas,#canvas2").css("z-index","-10");
        clear_canvas()
    });

});

function getDataNumber() {
    ajaxRequest({
        url: CONFIG.BASEURL+winUrl+"_currentTime",
        success: function(json) {
            if (json.code != 200) {
                var objNum = $("#number").parent();
                var objLeft = $(".jiezhi h3");
                objNum.html("&nbsp;");
                objLeft.html("未开盘");
                objLeft.css("color","gray");
                return;
            }
            json = json.data.obj;
            var obj = [];
            $("#number").html(json.sessionNo);
            var strNumber = json.sessionNo;
            var tempNum = strNumber;
            $("#openDate").html(json.openDate);
            if (json.openTime > 0) {
                $("#tip").html( tempNum + '期已开盘，距离下一期还有:');
                $("#leftTime").data("time", json.openTime);
                $("#tip").data("opening", true);
            } else {
                $("#tip").html('已封盘，距离开奖还有:');
                $("#leftTime").data("time", json.openTime);
                $("#tip").data("opening", false);
            }
        }
    });
}
$(function () {

    getDataNumber();
    setInterval(function () {
        getDataNumber();
    }, 10000);

    setInterval(function() {
        var time = $("#leftTime").data("time");
        if (isNaN(time) || time < 0) {
            return;
        }
        --time;

        var str = '';
        var tmp = time;
        var hour = Math.floor(tmp / 60 / 60);
        if (hour > 0) {
            str += hour + '时';
        }
        tmp = tmp - hour * 60 * 60;
        var minute = Math.floor(tmp / 60);
        str += minute + '分';
        tmp = tmp - minute * 60;
        var second = tmp;
        str += second + '秒';
        $("#leftTime").html(str);

        $("#leftTime").data("time", time);
    }, 1000);
});
function clearHuatu() {
    $("#canvas,#canvas2").attr("height","0");
    $("#canvas,#canvas2").attr("width","0");
}

function initHuatu(id) {
    //canvas高
    if(!id){
        $(".kuang1").hide();
        return false;
    }
    $(".kuang1").show();
    $("#canvas,#canvas2").attr("height",$("#"+id+"").height()+"px");
    $("#canvas,#canvas2").attr("width",$("#"+id+"").width()+"px");
    $("#canvas,#canvas2").css("top",$("#"+id+"").offset().top+"px");
    $("#canvas,#canvas2").css("left",$("#"+id+"").offset().left+"px");
}

//走势图页面
function getZstPage(url) {
    if (typeof url == 'undefined') {
        url = 'index';
    }
    window.location.href = "../../ssc/zst/" + url + ".html?type=1";

}

//购彩页面
function getSscPage(module) {
    if (typeof module == 'undefined') {
        module = '';
    }

    // module -- 字符串例子：gcdt/cqssc
    // var caizhong = module.toString().split("/");
    window.location.href ='../../ssc/index.html?module=' + module;
}

$(function() {
    $(".btn-navs li").click(function(e) {
        $(".shuju").hide();
        $("#" + $(this).data("id")).show();    //data() 方法向被选元素附加数据，或者从被选元素获取数据
        $(this).attr("class", "fff").siblings().removeClass(); //attr()设置或返回被选元素的属性和值 //siblings()返回被选元素的所有同级元素
        if($(this).data("id") == 'shuju1' || $(this).data("id") == 'shuju2' || $(this).data("id") == 'shuju3') {
            if($(this).data("id") == 'shuju1'){
                $(".search").css("display","block");
                $(".main-ul-box li a.active").removeClass('active');
                $(".main-ul-box .main-ul-1 li:first-child a").addClass('active');
            }
            initHuatu($(this).data("contentid"));
        } else {
            clearHuatu();
        }
    });

    $(".main-ul-box li a").click(function () {
        $(".search").css("display","block");
        $(".shuju").hide();
        var smzsStr = $(this).data("id");    //data() 方法向被选元素附加数据，或者从被选元素获取数据
        if(smzsStr == 'smzs'){
            $("#shuju6").show();
        }else if(smzsStr == 'clzs'){
            $("#shuju7").show();
            $(".search").css("display","none");
        }else if(smzsStr == 'hmzs'){
            $("#shuju1").show();
        }
        $(".main-ul-box li a.active").removeClass('active');
        $(this).addClass('active');
        if($(this).data("id") == 'hmzs') {
            initHuatu($(this).data("contentid"));
        }else if($(this).data("id") == 'smzs'){
            initHuatu('canvasHeiht');
        } else {
            clearHuatu();
        }
    });

    var name = 'type';
    var type = window.location.search.substr(1).match(new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"))[2];
    if(typeof type == 'undefined' || type == '' || isNaN(type)) {  //isNaN() 函数用于检查其参数是否是非数字值
        type = 1;
    } else {
        type = Tools.parseInt(type);
    }
    $("[data-id='shuju" + type + "']").trigger("click"); //trigger() 方法触发被选元素上指定的事件以及事件的默认行为
    $(".search-right .qi a").eq(0).trigger("click");  //eq() 方法返回带有被选元素的指定索引号的元素
});
$(function () {
    var right_w = $(".shuoming .shuomingright").outerWidth();
    var right_h = $(".shuoming .shuomingright").outerHeight();
    var left_h = $(".shuoming .shuomingleft").outerHeight();
    if(right_h > left_h){
        $(".shuoming .shuomingleft").css("height",right_h);
    }
    var zong_w = $(".shuoming").outerWidth();
    var left_w = zong_w - right_w - 5;
    $(".shuoming .shuomingleft").css("width",left_w);
});

function ajaxGetData( pageSize, startT, endT) {
    var data = {};
    data.today = -999;
    data.pageIndex = 0;
    if(null != pageSize) {
        data.pageSize = pageSize;
    }
    if(null != startT) {
        data.startT = startT;
    }
    if(null != endT) {
        data.endT = endT;
    }
    // console.log(baseObj.mw(data));
    ajaxRequest({
        url: CONFIG.BASEURL+winUrl+"_openList",
        data: data,
        beforeSend: function() {
            parent.showLoading();
        },
        success: function(json) {
            if(json.code != 200) {
                return;
            }
            var data = json.data.items;
            data.reverse();
            // 折线
            zhexian(data);
            if(ssc > 0) {
                zhexianSm(data);
            };
            // k线
            kxian(data);
            // 直方图
            zhifang(data);
            // 历史数据
            lssj(data);
            parent.hideLoading();

            $(".btn-navs li").each(function() {
                if($(this).hasClass("fff")) {
                    initHuatu($(this).data("contentid"));
                    return;
                }

            });
        }
    });
}
function zhexianSm(data) {  //折线--双面走势
    var str = '';
    var i_w = $(".sm-head").outerWidth(); //表头单元格元素宽度
    var i_h = $(".sm-head i:eq(1)").outerHeight();


    for(var i = 0; i < data.length; i++) {
        // qihao
        str += '<div class="cl-30 clean">';
        str += '<div class="left cl-31 sm-qh number">' + data[i].sessionNo.substr(2) + '</div>';
        str += '<div class="left cl-32 sm-jh openCode">' + data[i].resultItems.join(',') + '</div>';
        var kjData = data[i].resultItems;

        for(var j = 0; j < kjData.length; ++j) {
            var next_daXiaoStr = '';
            var next_danSStr = '';
            var next_zhiHeStr = '';
            var daXiaoStr = getDaXaioStr(kjData[j]);
            var danSStr = getDanSStr(kjData[j]);
            var zhiHeStr = getZhiHeStr(kjData[j]);

            //画板高度
            var canves_h = i_h / 2;
            var Left_sm = 0;
            var top_sm = 0;
            var canves_w = 0;
            var nextNum = 0;

            str += '<div class="cl-35 cl-36 sm-w">';
            if(i < data.length - 1) {
                nextNum = data[i + 1].resultItems[j];
                //备用于画板定位号码（判断下一个号码位置）
                next_daXiaoStr = getDaXaioStr(nextNum); //计算总和的大小
                next_danSStr = getDanSStr(nextNum);
                next_zhiHeStr = getZhiHeStr(nextNum);
            }


            for(var k = 0; k < 6; ++k) {
                str += '<var class="' + (j % 2 == 0 ? 'sm-bg-a' : 'sm-bg-b') + ' i_' + j + "_" + k + '">';

                var commonStr = '';
                var dxStr = '',dsStr = '',zhStr = '';

                //画板宽度
                canves_w = i_w;
                //画面距离上边距离
                top_sm = i_h / 4 * 3;

                commonStr += '<canvas class="zhexian" id="smcanvas' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                commonStr += '</i>';

                if(k == 0 || k == 1){

                    if(daXiaoStr == '大' && k == 0){
                        if(daXiaoStr != next_daXiaoStr){
                            Left_sm = i_w * 0.4;
                        }else{
                            Left_sm = -(i_w * 0.1);
                        }
                        str += '<i data-num="' + daXiaoStr + '" class="sm-bg-1-ds">';
                        str += daXiaoStr;
                        str += '<canvas class="zhexian" id="smcanvas_dx' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                        str += '</i>';
                    }else if(daXiaoStr == '小' && k == 1){
                        if(daXiaoStr != next_daXiaoStr){
                            Left_sm = -(i_w / 4 * 2.6 + i_w * 0.1);
                        }else{
                            Left_sm = -(i_w * 0.1);
                        }
                        str += '<i data-num="' + daXiaoStr + '" class="sm-bg-1-xd">';
                        str += daXiaoStr;
                        str += '<canvas class="zhexian" id="smcanvas_dx' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                        str += '</i>';
                    }else {
                        str += '<i></i>';
                    }
                } else if(k == 2 || k  == 3){

                    if(danSStr == '单' && k == 2){
                        if(danSStr != next_danSStr){
                            Left_sm = i_w * 0.4;
                        }else{
                            Left_sm = -(i_w * 0.1);
                        }
                        str += '<i data-num="' + danSStr + '" class="sm-bg-1-xd">';
                        str += danSStr;
                        str += '<canvas class="zhexian" id="smcanvas_ds' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                        str += '</i>';
                    }else if(danSStr == '双' && k == 3){
                        if(danSStr != next_danSStr){
                            Left_sm = -(i_w / 4 * 2.6 + i_w * 0.1);
                        }else{
                            Left_sm = -(i_w * 0.1);
                        }
                        str += '<i data-num="' + danSStr + '" class="sm-bg-1-ds">';
                        str += danSStr;
                        str += '<canvas class="zhexian" id="smcanvas_ds' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                        str += '</i>';
                    }else {
                        str += '<i></i>';
                    }
                } else if(k == 4 || k  == 5){

                    if(zhiHeStr == '质' && k == 4){
                        if(zhiHeStr != next_zhiHeStr){
                            Left_sm = i_w * 0.4;
                        }else{
                            Left_sm = -(i_w * 0.1);
                        }
                        str += '<i data-num="' + zhiHeStr + '" class="sm-bg-3-zhi">';
                        str += zhiHeStr;
                        str += '<canvas class="zhexian" id="smcanvas_hz' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                        str += '</i>';
                    }else if(zhiHeStr == '合' && k == 5){
                        if(zhiHeStr != next_zhiHeStr){
                            Left_sm = -(i_w / 4 * 2.6 + i_w * 0.1);
                        }else{
                            Left_sm = -(i_w * 0.1);
                        }
                        str += '<i data-num="' + zhiHeStr + '" class="sm-bg-3-he">';
                        str += zhiHeStr;
                        str += '<canvas class="zhexian" id="smcanvas_hz' + i + j + '" width="' + canves_w + '" height="' + canves_h + '" style="z-index: 10; left:' + Left_sm + 'px; top:' + top_sm + 'px; display: none;"></canvas>';
                        str += '</i>';
                    }else {
                        str += '<i></i>';
                    }
                }


                str += '</var>';
            }

            str += '</div>';
        }


        var lhHeStr = '',zdxStr = '',zdsStr = '';
        var num1 =  parseInt(kjData[0]);
        var num2 =  parseInt(kjData[1]);
        var num3 =  parseInt(kjData[2]);
        var num4 =  parseInt(kjData[3]);
        var num5 =  parseInt(kjData[4]);

        var znum = num1 + num2 + num3 + num4 + num5;


        str += '<div class="cl-35 cl-36 sm-w sm-lh-w">';
        if(i < data.length - 1) {
            bc1 = (data[i].resultItems[j]) - (data[i + 1].resultItems[j]);
        }

        for(var k = 0; k < 7; ++k) {
            str += '<var class="sm-lh-bg i_' + j + "_" + k + ' zh">';
            if(k == 0 || k == 1 || k == 6){
                var tempStr = '';
                if(num1 > num5){
                    lhHeStr = '龙';
                }else if( num1 < num5){
                    lhHeStr = '虎';
                }else if( num1 == num5){
                    lhHeStr = '和';
                }


                if(lhHeStr == '龙' && k == 0){
                    str += '<i class="long" data-num="' + lhHeStr + '">';
                    str += lhHeStr;
                    str += '</i>';
                }else if(lhHeStr == '虎' && k == 1){
                    str += '<i class="hu" data-num="' + lhHeStr + '">';
                    str += lhHeStr;
                    str += '</i>';
                }else if(lhHeStr == '和' && k == 6){
                    str += '<i class="he" data-num="' + lhHeStr + '">';
                    str += lhHeStr;
                    str += '</i>';
                }else {
                    str += '<i></i>';
                }
            } else if(k == 2 || k  == 3) {
                var tempStr = '';
                if(znum > 22){
                    zdxStr = '总大';
                }else{
                    zdxStr = '总小';
                }
                if (zdxStr == '总大' && k == 2) {
                    str += '<i class="zongda" data-num="' + zdxStr + '">';
                    str += zdxStr;
                    str += '</i>';
                } else if (zdxStr == '总小' && k == 3) {
                    str += '<i class="zongxiao" data-num="' + zdxStr + '">';
                    str += zdxStr;
                    str += '</i>';
                } else {
                    str += '<i></i>';
                }
            } else if(k == 4 || k  == 5) {
                var tempStr = '';
                if(znum % 2 == 0){
                    zdsStr = '总双';
                }else{
                    zdsStr = '总单';
                }
                if (zdsStr == '总单' && k == 4) {
                    str += '<i class="zongdan" data-num="' + zdsStr + '">';
                    str += zdsStr;
                    str += '</i>';
                } else if (zdsStr == '总双' && k == 5) {
                    str += '<i class="zongshuang" data-num="' + zdsStr + '">';
                    str += zdsStr;
                    str += '</i>';
                } else {
                    str += '<i></i>';
                }
            }
            str += '</var>';
        }
        str += '</div>';
        str += '</div>';
    }

    $("#dxdshezhi").html(str); //html() 方法返回或设置被选元素的内容  //如果该方法未设置参数，则返回被选元素的当前内容


    for(var i = 0; i < data.length - 1; ++i) {
        for(var j = 0; j < 5; ++j) {

            var canvas_dx = document.getElementById("smcanvas_dx" + i + j);
            var canvas_ds = document.getElementById("smcanvas_ds" + i + j);
            var canvas_hz = document.getElementById("smcanvas_hz" + i + j);

            var context_dx = canvas_dx.getContext("2d");
            var context_ds = canvas_ds.getContext("2d");
            var context_hz = canvas_hz.getContext("2d");

            var kjData = data[i].resultItems;

            var next_daXiaoStr = '';
            var next_danSStr = '';
            var next_zhiHeStr = '';
            var daXiaoStr = getDaXaioStr(kjData[j]);
            var danSStr = getDanSStr(kjData[j]);
            var zhiHeStr = getZhiHeStr(kjData[j]);

            nextNum = data[i + 1].resultItems[j];
            //备用于画板定位号码（判断下一个号码位置）
            next_daXiaoStr = getDaXaioStr(nextNum); //计算总和的大小
            next_danSStr = getDanSStr(nextNum);
            next_zhiHeStr = getZhiHeStr(nextNum);

            if(daXiaoStr == '大'){
                if(daXiaoStr != next_daXiaoStr) {
                    context_dx.moveTo(0, 0);
                    context_dx.lineTo(canvas_dx.width, canvas_dx.height);
                } else {
                    context_dx.moveTo(canvas_dx.width / 2, 0);
                    context_dx.lineTo(canvas_dx.width / 2, canvas_dx.height);
                }
            }else{
                if(daXiaoStr != next_daXiaoStr) {
                    context_dx.moveTo(canvas_dx.width, 0);
                    context_dx.lineTo(0, canvas_dx.height);
                } else {
                    context_dx.moveTo(canvas_dx.width / 2, 0);
                    context_dx.lineTo(canvas_dx.width / 2, canvas_dx.height);
                }
            }

            context_dx.strokeStyle = "#e70f0f";
            context_dx.stroke();

            if(danSStr == '单'){
                if(danSStr != next_danSStr) {
                    context_ds.moveTo(0, 0);
                    context_ds.lineTo(canvas_ds.width, canvas_ds.height);
                } else {
                    context_ds.moveTo(canvas_ds.width / 2, 0);
                    context_ds.lineTo(canvas_ds.width / 2, canvas_ds.height);
                }
            }else{
                if(danSStr != next_danSStr) {
                    context_ds.moveTo(canvas_ds.width, 0);
                    context_ds.lineTo(0, canvas_ds.height);
                } else {
                    context_ds.moveTo(canvas_ds.width / 2, 0);
                    context_ds.lineTo(canvas_ds.width / 2, canvas_ds.height);
                }
            }

            context_ds.strokeStyle = "#e70f0f";
            context_ds.stroke();


            if(zhiHeStr == '质'){
                if(zhiHeStr != next_zhiHeStr) {
                    context_hz.moveTo(0, 0);
                    context_hz.lineTo(canvas_hz.width, canvas_hz.height);
                } else {
                    context_hz.moveTo(canvas_hz.width / 2, 0);
                    context_hz.lineTo(canvas_hz.width / 2, canvas_hz.height);
                }
            }else{
                if(zhiHeStr != next_zhiHeStr) {
                    context_hz.moveTo(canvas_hz.width, 0);
                    context_hz.lineTo(0, canvas_hz.height);
                } else {
                    context_hz.moveTo(canvas_hz.width / 2, 0);
                    context_hz.lineTo(canvas_hz.width / 2, canvas_hz.height);
                }
            }

            context_hz.strokeStyle = "#683535";
            context_hz.stroke();
        }
    }


    if($("#checkboxZhexian").is(":checked")) {
        $(".zhexian").show();
    } else {
        $(".zhexian").hide();
    }

    // 遗漏
    renderYilou(data);

//        if($("#checkboxYlsj").is(":checked")) {
//            $(".transparent").addClass("not-transparent");
//        } else {
//            $(".transparent").removeClass("not-transparent");
//        }
}
function lssj(data) {
    var str = '';
    $.each(data, function(index, value) {   //each() 方法为每个匹配元素规定要运行的函数
        str += '<tr>';
        str += '<td>' + value.sessionNo + '</td>';
        str += '<td>' + value.openTime + '</td>';
        str += '<td>';
        var arr = value.resultItems;
        for(var i = 0; i < arr.length; ++i) {
            str += '<span class="bg-10">' + arr[i] + '</span>';
        }
        str += '</td>';
        str += '</tr>';
    });
    $("#shuju5 table tbody").html(str);
}
$(function() {
    $("#checkboxZhexian").change(function() { //当元素的值发生改变时，会发生 change 事件。该事件仅适用于文本域（text field），以及 textarea 和 select 元素。hange() 函数触发 change 事件，或规定当发生 change 事件时运行的函数。
        if($(this).is(":checked")) {
            $(".zhexian").show();
        } else {
            $(".zhexian").hide();
        }
    });

    $("#checkboxYlsj").change(function() {
        if($(this).is(":checked")) {
            $(".transparent").addClass("not-transparent");
        } else {
            $(".transparent").removeClass("not-transparent");
        }
    });

    $("#checkboxYlfc").change(function() {
        if($(this).is(":checked")) {
            $(".ylfc").addClass("ylfc-bg");
        } else {
            $(".ylfc").removeClass("ylfc-bg");
        }
    });
    $.ajax({
        url: CONFIG.BASEURL+"baseData_gameColumn",
        type: 'get',
        success: function(json) {
            var json = eval('('+json+')');
            if (json.code == '200') {
                var data =  json.data.gamelist;
                var links = '';
                for(var i = 0;i < data.length; i++) {
                    var type = data[i].type;
                    var url = "";
                    if (type == '0') {//三分彩
                        url = "sfssc";
                    } else if (type == '1') {
                        url = "pk10";
                    } else if (type == '2') {
                        url = "xy28";
                    } else if (type == '3') {
                        url = "cqssc";
                    } else if (type == '4') {
                        url = "pcdd";
                    } else if (type == '5') {
                        url = "klsf";
                    } else if (type == '6') {
                        url = "tjssc";
                    } else if (type == '7') {
                        url = "xjssc";
                    } else if (type == '8') {
                        url = "kuailepuke3";
                    } else if (type == '9') {
                        url = "gd115";
                    } else if (type == '10') {
                        url = "jsk3";
                    } else if (type == '11') {
                        url = "gxk10";
                    } else if (type == '12') {
                        url = "lhc";
                    } else if (type == '13') {
                        url = "xyft";
                    }
                    if(url == pageUrl){
                        $(".cplogo img").attr('src',data[i].img);

                    }
                    links += '<li data-url="'+url+'"><a href="javascript:void(0)">'+data[i].title+'</a></li>';
                }
                $(".min ul").append(links);

            } else {

                console.log('彩票列表获取失败');
            }
        },
        error : function (e) {
            console.log(e.error);
        }
    });
    $("body").on('click',".min ul li",function () {
        getZstPage($(this).data('url'));
    });
});