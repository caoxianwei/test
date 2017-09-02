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
    url: CONFIG.BASEURL +'baseData_activitie',
    success: function (json) {
        json = eval('('+json+')');
        var data = json.data;
        $.ajax({
            url : data.link,
            dataType: 'html',
            success: function (json) {
                $('.activity ul li').html(json);
            }
        });
    }
});
$(function () {
    var user = $.cookie('user');
    if( user != '' && user != null ) {
        var userInfo = eval('('+decodeURI(user)+')');
        $('.eveb_index_money li:first-of-type span:last-of-type').html(userInfo.userName);
        $('.eveb_index_money li:nth-of-type(2) span:last-of-type').html(userInfo.email);
        $('.eveb_index_money li:nth-of-type(3) span:last-of-type').html(userInfo.loginName);
    } else {
        $('.eveb_index_money li:first-of-type span:last-of-type').html($.cookie('loginName'));
        $('.eveb_index_money li:nth-of-type(2) span:last-of-type').html($.cookie('email'));
        $('.eveb_index_money li:nth-of-type(3) span:last-of-type').html($.cookie('loginName'));
    };
    // debugger;
    console.log(window.location);
$('.eveb_index_money li:nth-of-type(4) span:last-of-type em').html($.cookie('money'));
});