// function openHyzx() {
//     windowOpen('<%=basePath%>member/index.html','会员中心', 1250, 834);
// }
// function gotoGrzl() {
//     $("#nav_8").trigger("click");
// }
function showContent(obj) {
    var content = $(obj).data("content");
    var time = $(obj).data("time");
    var name = $(obj).data("name");
    var str = '';
    str += '<h5><span>优惠活动</span><i>×</i></h5>';
    str += '<h2>' + name + '</h2>';
    str += '<div>';
    str += content;
    str += '</div>';
    // str += '<h4>${webName}</h4>';
    str += '<h4>' + time + '</h4>';
    parent.$(".alert_col").html(str);

    parent.$('.alert_col h5 i').click(function(){
        parent.$('.alert').hide();
    })
    parent.$('.alert').show();
}
$.ajax({
    url: CONFIG.BASEURL +'baseData_activity',
    dataType: 'json',
    success: function (json) {
        var data = json.data.items;
        var str = '';
        $.each(data,function (index, value) {
            var context = value.context;
            context = context.replace(/</g,'&lt;');
            context = context.replace(/>/g,'&gt;');
            // console.log(context);
            str += '<li>\
                <a onclick="showContent(this)" data-name="'+value.title+'" data-time="'+value.releaseTime+'" data-content="'+context+'">\
                <img src="'+value.img+'">\
                </a>\
                </li>';
        });
        $('.activity ul').html(str);
    }
});
$(function () {
    var user = $.cookie('user');
    if( user != '' && user != null ) {
        var userInfo = eval('('+decodeURI(user)+')');
        console.log(userInfo);
        $('.eveb_index_money li:first-of-type span:last-of-type').html(userInfo.loginName);
        $('.eveb_index_money li:nth-of-type(2) span:last-of-type').html(userInfo.userName);
        $('.eveb_index_money li:nth-of-type(3) span:last-of-type').html(userInfo.cellPhone);
        $('.icon_level').removeClass('icon_level_1 icon_level_2 icon_level_3 icon_level_4 icon_level_5');
        if(userInfo.userGrade == '01'){
            $('.icon_level').addClass('icon_level_2');
        }else if(userInfo.userGrade == '02'){
            $('.icon_level').addClass('icon_level_1');
        }else if(userInfo.userGrade == '03'){
            $('.icon_level').addClass('icon_level_3');
        }else if(userInfo.userGrade == '04'){
            $('.icon_level').addClass('icon_level_4');
        }
    } else {
        $('.eveb_index_money li:first-of-type span:last-of-type').html($.cookie('loginName'));
        $('.eveb_index_money li:nth-of-type(2) span:last-of-type').html($.cookie('userName'));
        $('.eveb_index_money li:nth-of-type(3) span:last-of-type').html($.cookie('loginName'));
    };
    // debugger;
    // console.log(window.location);
$('.eveb_index_money li:nth-of-type(4) span:last-of-type em').html($.cookie('money'));
});