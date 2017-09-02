
var nowUrl = window.location.href;
$(function() {
    $('.name').html($.cookie('loginName'));
    $('.money').html('￥'+$.cookie('money'));
        var logo = decodeURI($.cookie('logo'));
    $('.account_img img').attr('src',logo);
    var type = $.cookie('type');
    	if(type == '04'){
    		$('.jifen').show();
    	} else {
    		$('.jifen').hide();
    	}
    // setTimeout(function () {
    //     var logo = decodeURI($.cookie('logo'));
    //
    // },500);
    $(window).resize(function(){
        resize();
    });

    resize();

    function resize() {
        var width = $(window).width();
        if (width < 1000) {
            width = 1000;
        }

        var rightHeight = $(".help_l_menu").height();

        var rightHeight = $(window).height() - $(".head").height() - $(".bottom").height();
        if (rightHeight < 672) {
            rightHeight = 672;
        }
        $("body").height($(".top").height() + $(".bottom").height() + rightHeight + "px")
        $("body").width(width + "px");
        $(".helpCont").width(width + "px");
        var leftWidth = $(".help_l_menu").width();
        var rightWidth = width - leftWidth;
        $("#ifm").width(rightWidth);

        $(".help_l_menu").height(rightHeight + "px");
        $("#ifm").height(rightHeight + "px");

        setInterval(function(){
            var time = $("#bjTime").data("time");
            if (isNaN(time) || time < 0) {
                return;
            }
            $("#bjTime").html(Tools.formatDate(time));
            $("#bjTime").data("time", time + 1000);
        }, 1000);
    }

    $("#leftNav li a").click(function() {
        goSubUrl($(this).data("url"),true,this);
    });

    layer.ready(function() {
        $("#leftNav li:first-of-type a").addClass("sli eveb_nav_hover");
    });
});

function goSubUrl(url,bool,dom) {
    if(bool) {
        window.location.href = "#" + url;
        nowUrl = window.location.href;
    }else {
        window.location.href = nowUrl+"#" + url;
    }
    $('#ifm').attr('src',url+'.html?v='+new Date().getTime());
    goSubPage(dom);
}

function goSubPage(dom) {
    $("#leftNav li a.sli").removeClass("sli");
    $("#leftNav li a.eveb_nav_hover").removeClass("eveb_nav_hover");
    if(dom.selector){
        $(dom.selector).addClass("sli eveb_nav_hover");
    } else {
        $(dom).addClass("sli eveb_nav_hover");
    }
};

function showLoading() {
    layer.load(2, {
        shade: [0.1,'#000'], //0.1透明度的白色背景
        offset: '350px'
    })
}

function hideLoading() {
    layer.ready(function() {
        layer.closeAll();
    });
}
var link = window.location.hash;
setTimeout(function () {
    //判断当前位置
    if(link){
        var str = link.match(/#[a-zA-Z]*/g)[0].replace(/#/, '');
        var dom = '';
        if(str == 'main') {
            dom = 'home_page'; //首页
        } else if ( str == 'zhcz'){
            dom = 'deposit';   //充值界面
        } else if ( str == 'withdraw'){
            dom = 'withdraw';   //提现界面
        } else if ( str == 'lsjl'){
            dom = 'record';   //历史界面
        } else if ( str == 'zhsz'){
            dom = 'setting';   //设置界面
        }
        if(dom) {
            goSubUrl(str, true, $("." + dom));
        };
    }
},0);

setInterval(function () {
    if($.cookie('u')== '' || $.cookie('u') == null){
        window.close();
    }
},3000);