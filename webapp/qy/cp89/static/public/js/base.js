/**
 * Created by simba on 2017/7/12.
 */
var serve = window.location.host;
var CONFIG = {
    BASEURL: "http://"+serve+"/api/",    // 根路径
};

// 闪烁
var blinkColorArr = "#fa6200|#0f3f94".split("|");
$(".blink").each(function() {
    var obj = $(this);
    setInterval(function() {
        var tmpColor = blinkColorArr[parseInt(Math.random() * blinkColorArr.length)];
        $(obj).css("color", tmpColor);
    },200);
});
//退出登录
function sigout() {
    var  map = baseObj.mw({
        u :$.cookie('u')
    });
    ajaxRequest({
        url: CONFIG.BASEURL+'user_logout',
        data: {
            mw: map
        },
        success: function (json) {
            if (json.code == 200) {
                $.cookie("u", '', {path: "/", expires: -1});
                $.cookie("uid", '', {path: "/", expires: -1});
                $.cookie("loginName", '', {path: "/", expires: -1});
                $.cookie('user','',{path:"/"});
                $.cookie('logo','',{path:"/"});
                $.cookie('type','',{path:"/"});
                location.reload();
            }

        }
    });
}

$(function () {


//    首页游戏栏目及右上角购买彩票列表
    $.ajax({
        url: CONFIG.BASEURL+"baseData_gameColumn",
        type: 'get',
        success: function(json) {
            var json = eval('('+json+')');
            if (json.code == '200') {
                var pathName  = window.location.pathname.split('/')[2];
                var data =  json.data.gamelist;
                var domP0 = '';
                var domP1 =  "";
                var list0 = '';
                var list1 = '';
                var nowPath = '';
                for(var i = 0;i < data.length; i++) {
                    var type = data[i].type;
                    var category = data[i].category;
//                       console.log(category);
                    var url="";
                    if(type=='0'){//三分彩
                        url="sfssc";
                        $('.menu_left .list_menu ul li .down a#sfssc').css("display",'block');
                    }else if(type=='1'){
                        url="pk10";
                        $('.menu_left .list_menu ul li .down a#pk10').css("display",'block');
                    }else if(type=='2'){
                        url="xy28";
                        $('.menu_left .list_menu ul li .down a#xy28').css("display",'block');
                    }else if(type=='3'){
                        url="cqssc";
                        $('.menu_left .list_menu ul li .down a#cqssc').css("display",'block');
                    }else if(type=='4'){
                        url="pcdd";
                        $('.menu_left .list_menu ul li .down a#pcdd').css("display",'block');
                    }else if(type=='5'){
                        url="klsf";
                        $('.menu_left .list_menu ul li .down a#klsf').css("display",'block');
                    }else if(type=='6'){
                        url="tjssc";
                        $('.menu_left .list_menu ul li .down a#tjssc').css("display",'block');
                    }else if(type=='7'){
                        url="xjssc";
                        $('.menu_left .list_menu ul li .down a#xjssc').css("display",'block');
                    }else if(type=='8'){
                        url="kuailepuke3";
                        $('.menu_left .list_menu ul li .down a#kuailepuke3').css("display",'block');
                    }else if(type=='9'){
                        url="gd115";
                        $('.menu_left .list_menu ul li .down a#gd115').css("display",'block');
                    }else if(type=='10'){
                        url="jsk3";
                        $('.menu_left .list_menu ul li .down a#jsk3').css("display",'block');
                    }else if(type=='11'){
                        url="gxk10";
                        $('.menu_left .list_menu ul li .down a#gxk10').css("display",'block');
                    }else if(type=='12'){
                        url="lhc";
                        $('.menu_left .list_menu ul li .down a#lhc').css("display",'block');
                    }else if(type=='13'){
                        url="xyft";
                        $('.menu_left .list_menu ul li .down a#xyft').css("display",'block');
                    }
                    if(pathName == "index_1.html"){
                        nowPath = "ssc/index.html?module=";
                    }else {
                        nowPath = "../ssc/index.html?module=";
                    }
                    $(".left_layout .menu_list").append('<li data-url="'+url+'"><a href="javascript:void(0)"><img src="'+data[i].img+'" alt="">'+data[i].title+'</a><i class="i0">'+data[i].subtitle+'</i>' +
                        '</li>');
                    if(data[i].category == 1){
                        domP0 += '<a href="ssc/index.html?module=zst/index&url='+url+'" target="_top">'+data[i].title+'</a>';
                        list0 +=  '<span><a href="'+nowPath+url+'">'+data[i].title+'</a></span>';
                    }else if(category == 0 ){
                        domP1 += '<a href="ssc/index.html?module=zst/index&url='+url+'" target="_top">'+data[i].title+'</a>';
                        list1 +=  '<span><a href="'+nowPath+url+'">'+data[i].title+'</a></span>';
                    }
                }
                $('.links p').eq(0).append(domP0);
                $('.links p').eq(1).append(domP1);
                $('.pay_list').eq(0).find('p').html(list0);
                $('.pay_list').eq(1).find('p').html(list1);
                $('.menu_list li').on('click',function () {
                    var module = $(this).data('url');
                    windowOpenBlank('ssc/index.html?module=' + module);
                });

                //判断当前那些彩种存在
                setTimeout(function () {
                    var xNum =  $('.inner-menu .xHide').length;
                    for(var i = 0 ; i < xNum ;i++) {
                        var dis  = $('.inner-menu .xHide:nth-of-type('+parseInt(i+1)+') a').length ;
                        var arr = 0;
                        for(var j = 0 ; j < dis; j++) {
                            var getDisplay =$('.inner-menu .xHide:nth-of-type('+parseInt(i+1)+') a:nth-of-type('+parseInt(j+1)+')').css('display');
                            if (getDisplay == 'block') {
                                arr++;
                            };
                        }
                        if(arr == 0) {
                            $('.inner-menu .xHide:nth-of-type('+parseInt(i+1)+')').prev().hide();
                        }

                    };
                },300);


            } else {

                console.log('彩票列表获取失败');
            }
        },
        error : function (e) {
            console.log(e.error);
        }
    });


    //获得用户金额
    function getUserSession() {
        var mw = baseObj.mw({
            u :$.cookie("u")
        });
        ajaxRequest({
            url: CONFIG.BASEURL+'baseData_money',
            data: {
                mw :mw
            },
            // beforeSend: function () {
            //     $(".Account").html('<img src="http://192.168.1.106:8080/frontWeb/index-1/static/public/img/base_loading.gif" alt="" style="display: block;text-align: center;margin: auto;padding-top: 25px;">');
            // },
            success: function (json) {
                if (json.code == 200) {
                    $('.login form').remove();
                    $('.left_div a ,.left_div span').remove();
                    $.cookie('money',json.data.money,{path: "/" });
                    if(json.data.logo != '' && json.data.logo != null) {
                        $.cookie('logo', json.data.logo, {path: "/"});
                    } else {
                        $.cookie('logo', 'images/account_img.png', {path: "/"});
                    };
                    $('#balance').append(json.data.money);
                    $('.user-account #__user_balance').append(json.data.money);
                } else {
                }
            }
        });
    }
    //登录成功
    function showLogin(user) {
        var hour = (new Date()).getHours();
        if (hour < 6) {
            hour = '凌晨好！';
        } else if (hour < 12) {
            hour = '上午好！'
        } else if (hour < 14) {
            hour = '中午好！';
        } else if (hour < 18) {
            hour = '下午好！';
        } else if (hour < 24) {
            hour = '晚上好！';
        };
        var str = '<ul class="state">'+
            '<li>尊敬的：<i style="cursor: pointer;" onclick="openHyzx()">'+user.account+'</i>'+ hour+
            '</li>'+
            '<li>'+
            '<a href="javascript:void(0)" onclick="openHyzx(\'zhcz\')">充值</a>|'+
            '<a href="javascript:void(0)" onclick="openHyzx(\'withdraw\')">提款</a>|'+
            '<a onclick="openHyzx(\'lsjl\')" href="javascript:void(0)">历史记录</a>|'+
            '<a onclick="openHyzx(\'main\')" href="javascript:void(0)">会员中心</a>'+
            '</li>'+
            '<li>余额：<i class="i0">'+user.balance+'</i> 元</li>'+
            '<li>'+
            '<button onclick="sigout()" type="button">退出</button>'+
            '</li>'+
            '</ul>';
        $('.login').append(str);
        var topNav = '<span class="line">'+
            '                            <a onclick="openHyzx()" href="javascript:void(0)" class="a1">'+user.account+'</a>'+
            '                            <a href="javascript:void(0)" onclick="openHyzx(\'zhcz\')" class="par">充值</a>'+
            '                            <a href="javascript:void(0)" onclick="openHyzx(\'withdraw\')" class="par">提款</a>'+
            // '                            <a href="javascript:void(0)" onclick="openHyzx(\'member/letter.html\')" class="par">站内信</a>'+
            '                            <a href="javascript:void(0)" class="par" onclick="sigout()">退出</a>'+
            '                        </span>';
        $('.left_div').append(topNav);
    };
    //判断用户是否登录
    var u = $.cookie('u');
    if(u){
        getUserSession();
    }
});

//获得在线客服地址
$.ajax({
    url : CONFIG.BASEURL + 'baseData_onlineService',
    type: 'get',
    dataType: 'json',
    success: function (json) {
        if(json.code != 200){
            return;
        } else {
            var data = json.data.url;
            $(".right ul li.li0").eq(1).find('a').attr('href',data);
            $(".main .list h3 a").attr('href',data);
            $(".kefu").attr('href',data);
        }
    }
});