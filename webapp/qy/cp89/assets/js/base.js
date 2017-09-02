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


$(function () {


//    首页游戏栏目及右上角购买彩票列表
    $.ajax({
        url: CONFIG.BASEURL+"baseData_gameColumn",
        type: 'post',
        success: function(json) {
            var json = eval('('+json+')');
            if (json.code == '200') {
                var pathName  = window.location.pathname.split('/')[2];
                var data =  json.data.gamelist;
                var domP0 = '';
                var domP1 =  "";
                var domP2 =  "";
                var domP3 =  "";
                var domP4 =  "";
                var list0 = '';
                var list1 = '';
                var helpg = '';
                var helpd = '';
                var trend = '';
                var trend1 = '';
                var trend2 = '';
                var trend3 = '';
                var trend4 = '';
                var nowPath = '';
                var trend_list0 = '';
                var trend_list1 = '';
                var trend_list2 = '';
                var trend_list3 = '';
                var trend_list4 = '';
                var trend_list5 = '';
                var xzcz = '';
                var xzcz_1 = '';
                var xzcz_2 = '';
                var xzcz1 = '';
                var xzcz2 = '';
                var xzcz3 = '';
                var all_gpc = '';
                var all_all = '';
                var gplj_list = '';
                for(var i = 0;i < data.length; i++) {
                    var type = data[i].type;
                    var category = data[i].category;
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
                        domP4 += '<a href="javascript:void(0);" data-url="'+url+'" target="_top">|<span>'+data[i].title+'</span></a>';
                        trend_list4 += '<a href="javascript:void(0)" data-url="'+url+'" name="type_1" target="data" class="trend_list">'+data[i].title+'</a>';
                    }else if(type=='5'){
                        url="klsf";
                        $('.menu_left .list_menu ul li .down a#klsf').css("display",'block');
                        domP2 += '<a href="javascript:void(0);" data-url="'+url+'" target="_top">|<span>'+data[i].title+'</span></a>';
                        trend_list2 += '<a href="javascript:void(0)" data-url="'+url+'" name="type_1" target="data" class="trend_list">'+data[i].title+'</a>';
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
                        domP3 += '<a href="javascript:void(0);" data-url="'+url+'" target="_top">|<span>'+data[i].title+'</span></a>';
                        trend_list3 += '<a href="javascript:void(0)" data-url="'+url+'" name="type_1" target="data" class="trend_list">'+data[i].title+'</a>';
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
                    $('#game_btn').append('<a href="javascript:void(0)" data-url="'+url+'" name="type_1" target="data">'+data[i].title+'</a>');
                    $("#rule_list").append('<li class="mainGame" data-url="'+url+'"><a href="../../common/rule/'+url+'.html"><i class="icon nav40-9"><img src="'+data[i].img+'" alt=""></i><i class="i_list">'+data[i].title+'</i></a></li>');
                    $(".games_list1").append('<a href="javascript:void(0);" data-url="'+url+'" name="_type_1"">|<span>'+data[i].title+'</span></a>');
                    if(category == 1){
	                    domP0 += '<a href="javascript:void(0);" data-url="'+url+'" target="_top">|<span>'+data[i].title+'</span></a>';
	                    helpg += '<li><a href="rule/'+url+'.html"><span>'+data[i].title+'</span></a></li>';
	                    list0 +=  '<span><a href="'+nowPath+url+'">'+data[i].title+'</a></span>';
	                    trend_list1 += '<a href="javascript:void(0)" data-url="'+url+'" name="type_1" target="data" class="trend_list">'+data[i].title+'</a>';
	                }else if(category == 0 ){
	                    domP1 += '<a href="javascript:void(0);" data-url="'+url+'" target="_top">|<span>'+data[i].title+'</span></a>';
	                    helpd += '<li><a href="rule/'+url+'.html"><span>'+data[i].title+'</span></a></li>';
	                    list1 +=  '<span><a href="'+nowPath+url+'">'+data[i].title+'</a></span>';
	                    trend_list5 += '<a href="javascript:void(0)" data-url="'+url+'" name="type_1" target="data" class="trend_list">'+data[i].title+'</a>';
	                }
	                if(type == 0 || type == 13 || type == 3 || type == 4 || type == 7 || type == 10){
	                	xzcz += '<li class="mainGame" data-url="'+url+'">';
	                	xzcz += '<a href="javascript:void(0)"><i class="icon nav40-9"><img src="../assets/statics/images/logo/34/'+type+'.png" alt=""></i>'+data[i].title+'</a>';
	                	xzcz += '<i class="i0">'+data[i].subtitle+'</i></li>';
	                	
	                	xzcz_1 += '<li class="mainGame" data-url="'+url+'">';
	                	xzcz_1 += '<a href="javascript:void(0)"><i class="icon nav40-9"><img src="assets/statics/images/logo/34/'+type+'.png" alt=""></i>'+data[i].title+'</a>';
	                	xzcz_1 += '<i class="i0">'+data[i].subtitle+'</i></li>';
	                	
	                	
	                	xzcz_2 += '<li class="mainGame" data-url="'+url+'">';
	                	xzcz_2 += '<a href="javascript:void(0)"><i class="icon nav40-9"><img src="../../assets/statics/images/logo/34/'+type+'.png" alt=""></i>'+data[i].title+'</a>';
	                	xzcz_2 += '<i class="i0">'+data[i].subtitle+'</i></li>';
	                	
	                	xzcz1 += '<a href="javascript:void(0)" data-url="'+url+'">'+data[i].title+'</a>';
	                	xzcz3 += '<a href="javascript:void(0)" data-url="'+url+'">'+data[i].title+'</a>';
	                }
	                
	                if(type != 12){
	                	trend += '<li>';
		                trend += '<div class="lottery-logo lottery-logo-big">';
		                trend += '<a href="../ssc/zst/'+url+'.html"><img src="../assets/statics/images/logo/76/'+type+'.png" alt="" /></a>';
		                trend += '<div class="lottery-title"><h3>'+data[i].title+' </h3></div>';
		                trend += '</div>';
		                trend += '<div class="right-content right-content-big">';
		                trend += '<div class="row-content">';
		                trend += '<div class="trend-content">';
		                trend += '<span class="trend-btn"><a href="../ssc/zst/'+url+'.html">基本走势</a></span>';
		                trend += '</div>';
		                trend += '<div class="clear"></div>';
		                trend += '</div>';
		                trend += '<div><a name="dltAnchor"></a></div>';
		                trend += '</div>';
		                trend += '<div class="clear"></div>';
		                trend += '</li>';
		                
		                all_gpc += '<a href="javascript:void(0)" data-url="'+url+'">'+data[i].title+'</a>';
	                }
	                if(type == 5){
	                	trend1 += '<li>';
		                trend1 += '<div class="lottery-logo lottery-logo-big">';
		                trend1 += '<a href="../ssc/zst/'+url+'.html"><img src="../assets/statics/images/logo/76/'+type+'.png" alt="" /></a>';
		                trend1 += '<div class="lottery-title"><h3>'+data[i].title+' </h3></div>';
		                trend1 += '</div>';
		                trend1 += '<div class="right-content right-content-big">';
		                trend1 += '<div class="row-content">';
		                trend1 += '<div class="trend-content">';
		                trend1 += '<span class="trend-btn"><a href="../ssc/zst/'+url+'.html">基本走势</a></span>';
		                trend1 += '</div>';
		                trend1 += '<div class="clear"></div>';
		                trend1 += '</div>';
		                trend1 += '<div><a name="dltAnchor"></a></div>';
		                trend1 += '</div>';
		                trend1 += '<div class="clear"></div>';
		                trend1 += '</li>'; 
	                }
	                if(type == 9){
	                	trend2 += '<li>';
		                trend2 += '<div class="lottery-logo lottery-logo-big">';
		                trend2 += '<a href="../ssc/zst/'+url+'.html"><img src="../assets/statics/images/logo/76/'+type+'.png" alt="" /></a>';
		                trend2 += '<div class="lottery-title"><h3>'+data[i].title+' </h3></div>';
		                trend2 += '</div>';
		                trend2 += '<div class="right-content right-content-big">';
		                trend2 += '<div class="row-content">';
		                trend2 += '<div class="trend-content">';
		                trend2 += '<span class="trend-btn"><a href="../ssc/zst/'+url+'.html">基本走势</a></span>';
		                trend2 += '</div>';
		                trend2 += '<div class="clear"></div>';
		                trend2 += '</div>';
		                trend2 += '<div><a name="dltAnchor"></a></div>';
		                trend2 += '</div>';
		                trend2 += '<div class="clear"></div>';
		                trend2 += '</li>'; 
	                }
	                if(type == 12){
	                	trend3 += '<li>';
		                trend3 += '<div class="lottery-logo lottery-logo-big">';
		                trend3 += '<a href="../ssc/zst/'+url+'.html"><img src="../assets/statics/images/logo/76/'+type+'.png" alt="" /></a>';
		                trend3 += '<div class="lottery-title"><h3>'+data[i].title+' </h3></div>';
		                trend3 += '</div>';
		                trend3 += '<div class="right-content right-content-big">';
		                trend3 += '<div class="row-content">';
		                trend3 += '<div class="trend-content">';
		                trend3 += '<span class="trend-btn"><a href="../ssc/zst/'+url+'.html">基本走势</a></span>';
		                trend3 += '</div>';
		                trend3 += '<div class="clear"></div>';
		                trend3 += '</div>';
		                trend3 += '<div><a name="dltAnchor"></a></div>';
		                trend3 += '</div>';
		                trend3 += '<div class="clear"></div>';
		                trend3 += '</li>';
		                
		                xzcz2 += '<a href="javascript:void(0)" data-url="'+url+'">'+data[i].title+'</a>';	
	                }
	                if(type == 4){
	                	trend4 += '<li>';
		                trend4 += '<div class="lottery-logo lottery-logo-big">';
		                trend4 += '<a href="../ssc/zst/'+url+'.html"><img src="../assets/statics/images/logo/76/'+type+'.png" alt="" /></a>';
		                trend4 += '<div class="lottery-title"><h3>'+data[i].title+' </h3></div>';
		                trend4 += '</div>';
		                trend4 += '<div class="right-content right-content-big">';
		                trend4 += '<div class="row-content">';
		                trend4 += '<div class="trend-content">';
		                trend4 += '<span class="trend-btn"><a href="../ssc/zst/'+url+'.html">基本走势</a></span>';
		                trend4 += '</div>';
		                trend4 += '<div class="clear"></div>';
		                trend4 += '</div>';
		                trend4 += '<div><a name="dltAnchor"></a></div>';
		                trend4 += '</div>';
		                trend4 += '<div class="clear"></div>';
		                trend4 += '</li>'; 
	                }
	                trend_list0 += '<a href="javascript:void(0)" data-url="'+url+'" target="data" name="type_1" class="trend_list">'+data[i].title+'</a>';
	                
	                all_all += '<a href="javascript:void(0)" data-url="'+url+'">'+data[i].title+'</a>';
                }
                $('.all_gpc span').append(all_gpc);
                $('.all_all span').append(all_all);
                $('.all_gpc1 span').append(all_gpc);
                $('.all_all1 span').append(all_all);
                $("#lottery-list-box").append(xzcz);
                $("#lottery-list-box1").append(xzcz_1);
                $("#lottery-list-box2").append(xzcz_2);
                $("#register").append(xzcz);
                $(".gpc_li_list").append(xzcz1);
                $(".dpc_li_list").append(xzcz2);
                $(".all_li_list").append(xzcz3);
                $(".gpc_li_list1").append(xzcz1);
                $(".dpc_li_list1").append(xzcz2);
                $(".all_li_list1").append(xzcz3);
                $('#ssc_trend').append(trend);
                $('#klsf_trend').append(trend1);
                $('#11x5_trend').append(trend2);
                $('#dpc_trend').append(trend3);
                $('#pcdd_trend').append(trend4);
                $(' .games_list2').append(domP0);
                $(' .games_list3').append(domP2);
                $(' .games_list4').append(domP3);
                $(' .games_list5').append(domP1);
                $(' .games_list6').append(domP4);
                $('.help_gpc').append(helpg);
                $('.help_dcz').append(helpd);
                $('.gpc_li li,.all_gpc').on('mouseenter',function(){
                	$('.all_gpc').css('display','block');
                });
                $('.gpc_li li,.all_gpc').on('mouseleave',function(){
                	$('.all_gpc').css('display','none');
                })
                $('.all_li li,.all_all').on('mouseenter',function(){
                	$('.all_all').css('display','block');
                });
                $('.all_li li,.all_all').on('mouseleave',function(){
                	$('.all_all').css('display','none');
                })
                
                $('.gpc_li1 li,.all_gpc1').on('mouseenter',function(){
                	$('.all_gpc1').css('display','block');
                });
                $('.gpc_li1 li,.all_gpc1').on('mouseleave',function(){
                	$('.all_gpc1').css('display','none');
                })
                $('.all_li1 li,.all_all1').on('mouseenter',function(){
                	$('.all_all1').css('display','block');
                });
                $('.all_li1 li,.all_all1').on('mouseleave',function(){
                	$('.all_all1').css('display','none');
                })
                
                $('#qbcz').on('click',function(){
					$('.games_list1').addClass('active_games');
					$('.games_list1').siblings().removeClass('active_games');
					$('.game_btn').empty().append(trend_list0);
					
				})
                $('#ssc_gp').on('click',function(){
					$('.games_list2').addClass('active_games');
					$('.games_list2').siblings().removeClass('active_games');
					$('.game_btn').empty().append(trend_list1);
				})
                $('#klsf').on('click',function(){
					$('.games_list3').addClass('active_games');
					$('.games_list3').siblings().removeClass('active_games');
					$('.game_btn').empty().append(trend_list2);
				})
                $('#11x5').on('click',function(){
					$('.games_list4').addClass('active_games');
					$('.games_list4').siblings().removeClass('active_games');
					$('.game_btn').empty().append(trend_list3);
				})
                $('#dcp').on('click',function(){
					$('.games_list5').addClass('active_games');
					$('.games_list5').siblings().removeClass('active_games');
					$('.game_btn').empty().append(trend_list5);
				})
                $('#pcdd').on('click',function(){
					$('.games_list6').addClass('active_games');
					$('.games_list6').siblings().removeClass('active_games');
					$('.game_btn').empty().append(trend_list4);
				})
                $('.pay_list').eq(0).find('p').html(list0);
                $('.pay_list').eq(1).find('p').html(list1);
                $('#lottery-list-box1 li,.all_gpc span a,.gpc_li_list a,.all_all span a,.all_li_list a,.dpc_li_list a').on('click',function () {
                    var module = $(this).data('url');
                    windowOpenBlank('ssc/index.html?module=' + module);
                });
                $('#register li,.all_gpc1 span a,.gpc_li_list1 a,.all_all1 span a,.all_li_list1 a').on('click',function () {
                    var module = $(this).data('url');
                    windowOpenBlank('../ssc/index.html?module=' + module);
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
	
    $(document.body).on("click","#game_btn a",function(e){
        e.preventDefault();
        var  url = $(this).data("url");
        $("#iframeid").attr("src",'../ssc/zst/'+url+'.html');
	            
        setTimeout(function(){            	
			var iframe1 = document.getElementById("iframeid").contentWindow.document.body.scrollHeight;
			$('#_iframe_divs').css('height',iframe1+'px');
        },1000);
    });
    
    $(document.body).on("click",".search-right li,.btn-navs li",function(e){
        e.preventDefault();           
        setTimeout(function(){            	
			var iframe = document.getElementById("box").offsetHeight;
			$('#_iframe_divs').css('height',iframe+'px');
        },1000);
    });
    
    $(document.body).on("click","#_games_1 div a",function(e){
        e.preventDefault();
        var  url = $(this).data("url");
        $("#iframeid1").attr("src",'draw/'+url+'.html');           
        setTimeout(function(){            	
			var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
			$('#_iframe_divs1').css('height',iframe2+'px');
        },500);
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
                 $("#news_url,.news_url").attr('href',data);
                $(".main .list h3 a").attr('href',data);
            }
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
                } else {
                }
            }
        });
    }
    //判断用户是否登录
    var u = $.cookie('u');
    if(u){
        getUserSession();
    }
});

if($.cookie("loginName")){
	$('#header_user_login,#agent_reg_url,#play_free').css('display', 'none');
	$('#header_user,#spread_url_1').css('display', 'block');
	$('.play-jl').append($.cookie("loginName"));
	$('.user-name').append($.cookie("loginName"));
	$('.user-account .zh').append($.cookie("loginName"));
	ajaxRequest({
        url: CONFIG.BASEURL+'baseData_money',
        data: {
            mw: baseObj.mw({u :$.cookie("u")})
        },
        success: function (json) {
            if (json.code == 200) {
                $('#balance').append(json.data.money);
                $('.user-account #__user_balance').append(json.data.money);
            } 
        }
   });
   ajaxRequest({
        url: CONFIG.BASEURL+'user_save',
        data: {
            mw: baseObj.mw({u :$.cookie("u")})
        },
        success: function (json) {
            if (json.code == 200) {
                $('.wdtjid').append(json.data.obj.uid);
            } 
        }
   });
}

$('.icon-refresh-icon,.icon-refresh-icon1').on('click',function(){
	self.location.reload();
})

function sigout() {
        ajaxRequest({
            url: CONFIG.BASEURL+'user_logout',
            data: {
                 u:$.cookie('u')
            },
            beforeSend: function () {
                $(".Account").html('<img src="../static/public/img/base_loading.gif" alt="" style="display: block;text-align: center;margin: auto;margin-top: 20px;">');
            },
            success: function (json) {
                if (json.code == 200) {
                    $.cookie("u", '', {path: "/", expires: -1});
                    $.cookie("uid", '', {path: "/", expires: -1});
                    $.cookie("loginName", '', {path: "/", expires: -1});
                    $.cookie('user','',{path:"/"});
                    location.href = 'common/login.html';
                }
                getUserSession();
            }
        });
        
    }

function sigout1() {
        ajaxRequest({
            url: CONFIG.BASEURL+'user_logout',
            data: {
                 u:$.cookie('u')
            },
            beforeSend: function () {
                $(".Account").html('<img src="../static/public/img/base_loading.gif" alt="" style="display: block;text-align: center;margin: auto;margin-top: 20px;">');
            },
            success: function (json) {
                if (json.code == 200) {
                    $.cookie("u", '', {path: "/", expires: -1});
                    $.cookie("uid", '', {path: "/", expires: -1});
                    $.cookie("loginName", '', {path: "/", expires: -1});
                    $.cookie('user','',{path:"/"});
                    location.href = '../common/login.html';
                }
                getUserSession();
            }
        });
        
    }

function sigout2() {
        ajaxRequest({
            url: CONFIG.BASEURL+'user_logout',
            data: {
                 u:$.cookie('u')
            },
            beforeSend: function () {
                $(".Account").html('<img src="../static/public/img/base_loading.gif" alt="" style="display: block;text-align: center;margin: auto;margin-top: 20px;">');
            },
            success: function (json) {
                if (json.code == 200) {
                    $.cookie("u", '', {path: "/", expires: -1});
                    $.cookie("uid", '', {path: "/", expires: -1});
                    $.cookie("loginName", '', {path: "/", expires: -1});
                    $.cookie('user','',{path:"/"});
                    location.href = '../../common/login.html';
                }
                getUserSession();
            }
        });
        
    }
