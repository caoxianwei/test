/**
 * Created by simba on 2017/7/26.
 */

    window.type = 0;
    var no = 0;
    var num = -1;

    var title = '';
    var navTitle = '';
    var name = 'type';
    var typeUrl = window.location.search.substr(1).match(new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"));
    var strUrl = 'no';
    var noUrl = window.location.search.substr(1).match(new RegExp("(^|&)"+ strUrl +"=([^&]*)(&|$)"));
    var htmlUrl = 'num';
    var numUrl = window.location.search.substr(1).match(new RegExp("(^|&)"+ htmlUrl +"=([^&]*)(&|$)"));
    var json = {};

    if(noUrl != null){
        no = noUrl[2];
    }
    if(typeUrl != null) {
        window.type = typeUrl[2];
    };
    if(numUrl != null){
        num = numUrl[2];
    };
    $('.li1').find('.slide').hide();
    if( window.type == 1 && no ==1){
        title = '关于注册';
        navTitle= '新手指南';
        json.name = registrArr;
        $('.li1:nth-of-type(2)').addClass('sli');
        $('.list ul li:nth-of-type(2)').attr('sl','0');
        $('.li1:nth-of-type(2) .slide p:first-of-type a').parent().addClass('acti').siblings('p').removeClass('acti');
        $('.li1:nth-of-type(2) .slide').show();
    }else if( window.type == 1 && no ==2){
        title = '关于充值';
        navTitle= '新手指南';
        json.name = rechargeArr;
        $('.li1:nth-of-type(2)').addClass('sli');
        $('.list ul li:nth-of-type(2):nth-of-type(2)').attr('sl','0');
        $('.li1:nth-of-type(2) .slide p:nth-of-type(2) a').parent().addClass('acti').siblings('p').removeClass('acti');
        $('.li1:nth-of-type(2) .slide').show();
    }else if ( window.type == 1 && no ==3){
        title = '关于提款';
        navTitle= '新手指南';
        json.name = drawArr;
        $('.li1:nth-of-type(2)').addClass('sli');
        $('.list ul li:nth-of-type(2):nth-of-type(2)').attr('sl','0');
        $('.li1:nth-of-type(2) .slide p:nth-of-type(3) a').parent().addClass('acti').siblings('p').removeClass('acti');
        $('.li1:nth-of-type(2) .slide').show();
    }else if ( window.type == 2 && no == 1){
        navTitle= '安全保障';
        json.name = safeArr;
        $('.li1:nth-of-type(4)').addClass('sli');
        $('.list ul li:nth-of-type(2):nth-of-type(4)').attr('sl','0');
        $('.li1:nth-of-type(4) .slide p:nth-of-type(1) a').parent().addClass('acti').siblings('p').removeClass('acti');
        $('.li1:nth-of-type(4) .slide').show();
    }else  if( window.type == 2 && no == 2 ){
        navTitle ='热门问题';
        json.name = hotArr;
        $('.li1:nth-of-type(4)').addClass('sli');
        $('.list ul li:nth-of-type(2):nth-of-type(4)').attr('sl','0');
        $('.li1:nth-of-type(4) .slide p:nth-of-type(2) a').parent().addClass('acti').siblings('p').removeClass('acti');
        $('.li1:nth-of-type(4) .slide').show();

    };
    var listNav = '';
    var info = '';

    listNav += '<h5>'+navTitle+'</h5>';
    if(title != '') {
        listNav += '<h4>' + title + '</h4>';
    }
    listNav += '<ul>';
    if(json.name != null) {
        for (var i = 0; i < json.name.length; i++) {
            listNav += '<li><a href="javascript:void(0)">' + (i + 1) + '.' + json.name[i][0] + '</a></li>';
        }
    };
    listNav += '</ul>';
    $(".help_problem").html(listNav);
    $(function () {

        $("body").on('click','.help_problem ul li',function () {
            var index = $(this).index();
            console.log($(this).text().substring(2,$(this).text().length));
            info +='<div class="lis">\
            <h5>'+$(this).text().substring(2,$(this).text().length)+'</h5>\
            </div>';
            info += json.name[index][1];
            $('.help_list').html(info);
            $('.help_list').show();
            $('.help_problem').hide();
        });
        if(num >= 0){
            info +='<div class="lis">\
            <h5>'+json.name[num][0].substring(0,$(this).text().length-1)+'</h5>\
            </div>';
            info += json.name[num][1];
            $('.help_list').html(info);
            $('.help_list').show();
            $('.help_problem').hide();
        }
    });
$('.help_list').hide();