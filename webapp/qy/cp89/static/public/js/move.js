var move = {};
//分页的页码
move.pageIndex=0;
//缓存存储时间，毫秒
move.storageTime=2592000000;

move.local = location.toString().indexOf("/longzhicai")>-1?0:1;
move.server="http://"+window.location.host+(move.local?"":"/longzhicai");
move.webpath=move.local?"":"/longzhicai";

move.advert=move.server+'/api/baseData_advert';
move.notice=move.server+'/api/baseData_notice';
move.latestList=move.server+'/api/baseData_latestList';
move.winList=move.server+'/api/baseData_winList';
move.changePwd=move.server+'/api/user_changePwd';
move.cashPassword=move.server+'/api/user_cashPassword';
move.gameColumn=move.server+'/api/baseData_gameColumn';
move.bankList=move.server+'/api/cash_bankList';
move.cityList=move.server+'/api/baseData_wechatList3';
move.cashSubmit=move.server+'/api/cash_submit';
move.recharge=move.server+'/api/recharge_submit';

move.login=move.server+'/api/user_login';
move.logout=move.server+'/api/user_logout';
move.sendCode=move.server+'/api/sms_send';
move.reg=move.server+'/api/user_reg';
move.retrievePwd=move.server+'/api/user_retrievePwd';
move.money=move.server+'/api/baseData_money';
move.rechargeDetail=move.server+'/api/recharge_detail';
move.cashList=move.server+'/api/cash_list';
move.betList=move.server+'/api/baseData_betlist';

move.bjPk10_currentTime=move.server+'/api/bjPk10_currentTime';
move.bjPk10_betPanel=move.server+'/api/bjPk10_betPanel';
move.bjPk10_bet=move.server+'/api/bjPk10_bet';
move.bjPk10_trend=move.server+'/api/bjPk10_trend';
move.bjPk10_hotRanking=move.server+'/api/bjPk10_hotRanking';
move.bjPk10_openList=move.server+'/api/bjPk10_openList';

move.bj3_currentTime=move.server+'/api/bj3_currentTime';
move.bj3_betPanel=move.server+'/api/bj3_betPanel';
move.bj3_bet=move.server+'/api/bj3_bet';
move.bj3_trend=move.server+'/api/bj3_trend';
move.bj3_hotRanking=move.server+'/api/bj3_hotRanking';
move.bj3_openList=move.server+'/api/bj3_openList';

move.bjLu28_currentTime=move.server+'/api/bjLu28_currentTime';
move.bjLu28_betPanel=move.server+'/api/bjLu28_betPanel';
move.bjLu28_bet=move.server+'/api/bjLu28_bet';
move.bjLu28_trend=move.server+'/api/bjLu28_trend';
move.bjLu28_hotRanking=move.server+'/api/bjLu28_hotRanking';
move.bjLu28_openList=move.server+'/api/bjLu28_openList';

move.xjpLu28_currentTime=move.server+'/api/xjpLu28_currentTime';
move.xjpLu28_betPanel=move.server+'/api/xjpLu28_betPanel';
move.xjpLu28_bet=move.server+'/api/xjpLu28_bet';
move.xjpLu28_trend=move.server+'/api/xjpLu28_trend';
move.xjpLu28_hotRanking=move.server+'/api/xjpLu28_hotRanking';
move.xjpLu28_openList=move.server+'/api/xjpLu28_openList';

move.cqSsc_currentTime=move.server+'/api/cqSsc_currentTime';
move.cqSsc_betPanel=move.server+'/api/cqSsc_betPanel';
move.cqSSc_bet=move.server+'/api/cqSsc_bet';
move.cqSSc_trend=move.server+'/api/cqSsc_trend';
move.cqSSc_hotRanking=move.server+'/api/cqSsc_hotRanking';
move.cqSSc_openList=move.server+'/api/cqSsc_openList';

move.gdK10_currentTime=move.server+'/api/gdK10_currentTime';
move.gdK10_betPanel=move.server+'/api/gdK10_betPanel';
move.gdK10_bet=move.server+'/api/gdK10_bet';
move.gdK10_trend=move.server+'/api/gdK10_trend';
move.gdK10_hotRanking=move.server+'/api/gdK10_hotRanking';
move.gdK10_openList=move.server+'/api/gdK10_openList';

move.tjSsc_currentTime=move.server+'/api/tjSsc_currentTime';
move.tjSsc_betPanel=move.server+'/api/tjSsc_betPanel';
move.tjSsc_bet=move.server+'/api/tjSsc_bet';
move.tjSsc_trend=move.server+'/api/tjSsc_trend';
move.tjSsc_hotRanking=move.server+'/api/tjSsc_hotRanking';
move.tjSsc_openList=move.server+'/api/tjSsc_openList';

move.xjSsc_currentTime=move.server+'/api/xjSsc_currentTime';
move.xjSsc_betPanel=move.server+'/api/xjSsc_betPanel';
move.xjSsc_bet=move.server+'/api/xjSsc_bet';
move.xjSsc_trend=move.server+'/api/xjSsc_trend';
move.xjSsc_hotRanking=move.server+'/api/xjSsc_hotRanking';
move.xjSsc_openList=move.server+'/api/xjSsc_openList';

move.kuailepuke3_currentTime=move.server+'/api/poker_currentTime';
move.kuailepuke3_betPanel=move.server+'/api/poker_betPanel';
move.kuailepuke3_bet=move.server+'/api/poker_bet';
move.kuailepuke3_trend=move.server+'/api/poker_trend';
move.kuailepuke3_hotRanking=move.server+'/api/poker_hotRanking';
move.kuailepuke3_openList=move.server+'/api/poker_openList';

move.jiangsuk3_currentTime=move.server+'/api/jsK3_currentTime';
move.jiangsuk3_betPanel=move.server+'/api/jsK3_betPanel';
move.jiangsuk3_bet=move.server+'/api/jsK3_bet';
move.jiangsuk3_trend=move.server+'/api/jsK3_trend';
move.jiangsuk3_hotRanking=move.server+'/api/jsK3_hotRanking';
move.jiangsuk3_openList=move.server+'/api/jsK3_openList';

move.gxk10_currentTime=move.server+'/api/gxK10_currentTime';
move.gxk10_betPanel=move.server+'/api/gxK10_betPanel';
move.gxk10_bet=move.server+'/api/gxK10_bet';
move.gxk10_trend=move.server+'/api/gxK10_trend';
move.gxk10_hotRanking=move.server+'/api/gxK10_hotRanking';
move.gxk10_openList=move.server+'/api/gxK10_openList';

move.gd115_currentTime=move.server+'/api/gdPick11_currentTime';
move.gd115_betPanel=move.server+'/api/gdPick11_betPanel';
move.gd115_bet=move.server+'/api/gdPick11_bet';
move.gd115_trend=move.server+'/api/gdPick11_trend';
move.gd115_hotRanking=move.server+'/api/gdPick11_hotRanking';
move.gd115_openList=move.server+'/api/gdPick11_openList';

move.liuhecai_currentTime=move.server+'/api/markSix_currentTime';
move.liuhecai_betPanel=move.server+'/api/markSix_betPanel';
move.liuhecai_bet=move.server+'/api/markSix_bet';
move.liuhecai_trend=move.server+'/api/markSix_trend';
move.liuhecai_hotRanking=move.server+'/api/markSix_hotRanking';
move.liuhecai_combinaInfo=move.server+'/api/markSix_combinaInfo';
move.liuhecai_openList=move.server+'/api/markSix_openList';

/**平面宽度*/
move.width=$(window).width();

/**获得登录用户信息*/
move.user={
    uid:null,
    u:null,
    logo:null,
    longAlt:null,
    exp:null,//过期时间
    time:null,//存入时间
    points:0//积分
}

/**
 * 获得get请求的URL参数
 * @param name 参数名
 * @returns
 */
move.getParameter=function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

move.createLoading=function() {
    var mask = {};
    mask.show=function(){
        var loading=$(".mask").html();
        if(loading){
            $(".mask").show();
        }else{
            var width=$(window).width();//宽度
            var widthLoading=width*0.4;//loading宽度
            var height=$(window).height();//高度
            $('body').append('<div class="masktrans"></div> <div class="mask"><div class="loading"><div class=" loader-inner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>');
            if(widthLoading>85){
                widthLoading=85;
            }
            var top=(height/2)-(widthLoading);
            var left=(width/2)-(widthLoading/2);
            $('.loading').css({width:widthLoading,height:widthLoading,marginTop:top,marginLeft:left});
        }
    }
    mask.close=function(){
        var loading=$(".mask").html();
        if(loading){
            $(".mask").hide();
            $(".masktrans").hide();
        }
    }
    return mask;
}

/**
 * 获得设备
 * @return 'ios'\'android'\'other'
 */
move.getDevice=function(){
    if(/(bxsios|bxsandroid)/i.test(navigator.userAgent)){
        return 'app';
    }else
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return 'ios';
    } else if (/(Android)/i.test(navigator.userAgent)) {
        return 'android';
    }else{
        return 'other'
    }
}

move.isWechat=function(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

/**
 * 打开链接
 * @param vurl
 */
function openCustURL(vurl){
    mui.openWindow({url:vurl,show:{
        autoShow:true,
        aniShow:'slide-in-right',
        duration:400
    },waiting:{authShow:false,title:'正在加载...'}});
}


var baseObj={
    openIndex:function(){
        mui.openWindow({
            url:  move.webpath+'/game/index.html',
            show:{
                autoShow:false
            }
        });
    },
    openMe:function(){
        mui.openWindow({
            url:  move.webpath+'/game/me.html',
            show:{
                autoShow:false
            }
        });
    },
    xiazhu:function(){
        mui.openWindow({
            url:  move.webpath+'/game/xiazhu.html',
            show:{
                autoShow:false
            }
        });
    },
    open:function(){
        mui.openWindow({
            url:  move.webpath+'/game/kaijiang.html',
            show:{
                autoShow:false
            }
        });
    },
    openLogin:function(){
        mui.openWindow({
            url: move.webpath+'/game/login.html',
            show:{
                autoShow:false
            }
        });
    },
    openView:function(url){
        mui.openWindow({
            url: url,
            show:{
                autoShow:false
            }
        });
    },
    mw:function(map){
        //遍历map
        var mw="";
        for(var prop in map){
            if(map.hasOwnProperty(prop)){
                var key=prop;
                var val=encodeURI(map[prop]);
                if(map[prop]==null||map[prop]=='null'){
                    val="";
                }
                mw=mw+key+"="+val+"&";
            }
        }
        if(mw.length>1){
            mw=mw.substring(0,mw.length-1);
        }
        if(mw!=''){
            mw=encryptByDES(mw);
            //第二次整体编码
            mw=encodeURI(mw);

        }
        return mw;
    }

}

var desKey="Y74lNq1J";
function encryptByDES(message) {
    var keyHex = CryptoJS.enc.Utf8.parse(desKey);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
var starup={
    login:function(){
        starupLogin();
        return false;
    },
    home:function(){
        starupHome();
        return false;
    },
    userHome:function(name){
        starupUserHome(name);
        return false;
    },
    commentList:function(articleId,id){
        starupCommentList(articleId,id);
        return false;
    },
    video:function(url){
        starupVideo(url);
    }
}

var user = {
    init:function(uid,u,longAlt,logo,phone){
        move.user.uid=(uid!=null)?uid:null;
        move.user.u=(u!=null)?u:null;
        move.user.longAlt=(longAlt!=null)?longAlt:null;
        move.user.logo=(logo!=null)?logo:null;
        move.user.phone=(phone!=null)?phone:null;
        move.user.exp=move.storageTime;
        move.user.time=new Date().getTime();
    },
    get:function(){
        if(typeof store =='object'){
            var obj=store.get('user');
            if(obj!=null){
                if (new Date().getTime() - obj.time > obj.exp) {//过期
                    store.remove('user');
                    return null;
                }else{
                    move.user=obj;
                    return move.user;
                }
            }else{//用户未登录
                return null;
            }
        }else{
//          console.log('没有引用store.min.js');
            return null;
        }
    },
    set:function(obj){
        store.set('user', obj);
    },
    clear:function(){
        store.remove('user');
    }
};
if(move.user.u==null){
    var obj=user.get();
    if(obj!=null){
        move.user=user.get();
    }
}
var timerxiazhu=null;
var timeropen=null;
var timeropenresult=null;
var timerObj={
    interval:1000,
    intervalAPI:3000,
    rest:null,//下注倒计时
    openrest:null,//开奖倒计时剩余秒数
    init:function(second,source){//初始化，封盘倒计时
        second--;
        var day1=0;
//		var day1=Math.floor(second/(60*60*24));
        var hour=Math.floor((second-day1*24*60*60)/3600);
        var minute=Math.floor((second-day1*24*60*60-hour*3600)/60);
        var second=Math.floor(second-day1*24*60*60-hour*3600-minute*60);
        hour = this.checkTime(hour);
        minute = this.checkTime(minute);
        second = this.checkTime(second);
        if(timerObj.rest>=0){
            if(timerObj.rest>0){
                $('#hour').html(hour);
                $('#minute').html(minute);
                $('#sec').html(second);
                timerObj.rest=timerObj.rest-1;
            }
        }
//		console.log("timerObj.rest::"+timerObj.rest+"____s::"+source);
        if(timerObj.rest==0){
            timerObj.rest=null;
            window.clearInterval(timerxiazhu);
            timerxiazhu=null;
            if(source=='timer-bj'){
                console.warn('此处调用北京赛车封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-bj3'){
                console.warn('此处调用北京三分彩封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-bjpcdd'){
                console.warn('此处调用北京PC蛋蛋封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-xjp28'){
                console.warn('此处调用新加坡28封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-cqssc'){
                console.warn('此处调用重庆时时彩封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-gdk10'){
                console.warn('此处调用广东快乐十分封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-tjssc'){
                console.warn('此处调用天津时时彩封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-xjssc'){
                console.warn('此处调用新疆时时彩封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-kuailepuke3'){
                console.warn('此处调用快乐扑克3封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-jiangsuk3'){
                console.warn('此处调用江苏快3封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-gxk10'){
                console.warn('此处调用广西快乐十分封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-gd115'){
                console.warn('此处调用广东11选5封盘方法');
                lotteryObj.seal();
            }else if(source=='timer-liuhecai'){
                console.warn('此处调用六合彩封盘方法');
                lotteryObj.seal();
            }
        }
    },
    open:function(second,source){//开奖倒计时
        var day1=Math.floor(second/(60*60*24));
        var hour=Math.floor((second-day1*24*60*60)/3600);
        var minute=Math.floor((second-day1*24*60*60-hour*3600)/60);
        var second=Math.floor(second-day1*24*60*60-hour*3600-minute*60);
        hour = this.checkTime(hour);
        minute = this.checkTime(minute);
        second = this.checkTime(second);
        if(timerObj.openrest>0){
            timerObj.openrest=timerObj.openrest-1;
        }
        console.log("timerObj.openrest::"+timerObj.openrest+"____s::"+source);
        if(timerObj.openrest==0){
            timerObj.openrest=null;
            window.clearInterval(timeropen);
            timeropen=null;
            if(source=='timer-bjopen'){
                console.warn('此处调用北京赛车开奖方法');
                lotteryObj.open();
            }else if(source=='timer-bj3open'){
                console.warn('此处调用北京三分彩开奖方法');
                lotteryObj.open();
            }else if(source=='timer-bjpcddopen'){
                console.warn('此处调用北京PC蛋蛋开奖方法');
                lotteryObj.open();
            }else if(source=='timer-xjp28open'){
                console.warn('此处调用新加坡28开奖方法');
                lotteryObj.open();
            }else if(source=='timer-cqsscopen'){
                console.warn('此处调用重庆时时彩开奖方法');
                lotteryObj.open();
            }else if(source=='timer-gdk10open'){
                console.warn('此处调用广东快乐十分开奖方法');
                lotteryObj.open();
            }else if(source=='timer-tjsscopen'){
                console.warn('此处调用天津时时彩开奖方法');
                lotteryObj.open();
            }else if(source=='timer-xjsscopen'){
                console.warn('此处调用新疆时时彩开奖方法');
                lotteryObj.open();
            }else if(source=='timer-kuailepuke3open'){
                console.warn('此处调用快乐扑克3开奖方法');
                lotteryObj.open();
            }else if(source=='timer-jiangsuk3open'){
                console.warn('此处调用江苏快3开奖方法');
                lotteryObj.open();
            }else if(source=='timer-gxk10open'){
                console.warn('此处调用广西快乐十分开奖方法');
                lotteryObj.open();
            }else if(source=='timer-gd115open'){
                console.warn('此处调用广东11选5开奖方法');
                lotteryObj.open();
            }else if(source=='timer-liuhecaiopen'){
                console.warn('此处调用六合彩封盘方法');
                lotteryObj.open();
            }
        }
    },
    result:function(source){
        console.warn('循环请求开奖接口');
        if(source=='timer-bjopen'){
            lotteryObj.open(-1);
        }else if(source=='timer-bj3open'){
            lotteryObj.open(-1);
        }else if(source=='timer-bjpcddopen'){
            lotteryObj.open(-1);
        }else if(source=='timer-xjp28open'){
            lotteryObj.open(-1);
        }else if(source=='timer-cqsscopen'){
            lotteryObj.open(-1);
        }else if(source=='timer-gdk10open'){
            lotteryObj.open(-1);
        }else if(source=='timer-tjsscopen'){
            lotteryObj.open(-1);
        }else if(source=='timer-xjsscopen'){
            lotteryObj.open(-1);
        }else if(source=='timer-kuailepuke3open'){
            lotteryObj.open(-1);
        }else if(source=='timer-jiangsuk3open'){
            lotteryObj.open(-1);
        }else if(source=='timer-gxk10open'){
            lotteryObj.open(-1);
        }else if(source=='timer-gd115open'){
            lotteryObj.open(-1);
        }else if(source=='timer-liuhecaiopen'){
            lotteryObj.open(-1);
        }
    },
    checkTime:function(i){
        //将0-9的数字前面加上0，例1变为01
        if(i<10){
            i = "0" + i;
        }
        return i;
    }
}

move.hideHeader=function(){
    $('.main-content').css("min-height",$(window).height());
    var header=$('header.mui-bar');
    if(header){
        if(!move.isWechat()){//微信
            $(header).before('<div class="margin-top-header"></div>');
            $('.bxs-pages').css('margin-top','44px');
        }else{
            $(header).hide();
            $('div.margin-top-header').hide();
        }
        var plat=move.getParameter('plat');
        if(plat=='1'||plat=='2'){//1.ios 2.安卓
            $(header).hide();
            $('div.margin-top-header').hide();
        }
    }
}
function bettingObj(optionId,betPoints){
    var obj=new Object();
    obj.id=optionId;
    obj.p=betPoints;
    return obj;
}