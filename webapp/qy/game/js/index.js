var indexObj={
	init:function(){
		this.slider();
		this.notice();
		this.winList();
		this.gameColumn();
	},
	slider:function(){
		var map = {};
		map['adType'] =1;
		var mw=baseObj.mw(map);
		$.ajax({
			type: "POST",
			url:move.advert,
			dataType:'json',
			data:{
				mw:mw
			},
			success:function(ret){
				var code=ret.code;
				var data=ret.data;
				var msg=ret.msg;
				if(code==200){
					var html='';
					var items=data.items;
					var totalLength=items.length;
					if(totalLength>0){
						var imgbox='<div class="mui-slider-group mui-slider-loop">';
						var roundbox='<div class="mui-slider-indicator">';
						var img=items[0].img;
						var type=items[0].type;
						if(img){
							var url;
							if(type==2){
								url=items[0].link;
							}else{
								url="#";
							}
							imgbox=imgbox+'<div class="mui-slider-item mui-slider-item-duplicate">'+
							'<a href="'+url+'"> <img src="'+img+'"></a></div>';
						}
						var length=totalLength;
						if(totalLength>3){
							length=3;
							var staticadvertBox="";
							for (var i = length; i < totalLength; i++) {
								var obj=items[i];
								img=obj.img;//图片
								type=obj.type;
								if(img){
									var url;
									if(type==2){
										url=obj.link;
									}else{
										url="#";
									}
									var htmlcode='<a href="'+url+'"><img src="'+img+'"></a>';
									staticadvertBox=staticadvertBox+htmlcode;
								}
							}
							$("#static-advert").html(staticadvertBox);
						}
						for (var i = 0; i < length; i++) {
							if(i==0){
								roundbox=roundbox+'<div class="mui-indicator mui-active"></div>';
							}else{
								roundbox=roundbox+'<div class="mui-indicator"></div>';
							}
							var obj=items[i];
							img=obj.img;//图片
							type=obj.type;
							if(img){
								var url;
								if(type==2){
									url=obj.link;
								}else{
									url="#";
								}
								var htmlcode='<div class="mui-slider-item">'+
								'<a href="'+url+'"><img src="'+img+'"></a></div>';
							}
							imgbox=imgbox+htmlcode;
						}
						img=items[length-1].img;
						type=items[length-1].type;
						if(img){
							var url;
							if(type==2){
								url=items[length-1].link;
							}else{
								url="#";
							}
							imgbox=imgbox+'<div class="mui-slider-item mui-slider-item-duplicate">'+
							'<a href="'+url+'"><img src="'+img+'"></a></div>';
						}
						imgbox=imgbox+'</div>';
						roundbox=roundbox+'</div>';
						html=imgbox+roundbox;
					}
					jQuery("#slider").html(html);
					var slider = mui("#slider");
					slider.slider({
						interval: 2000
					});
				}else{
					var html="<div class=''><img src='images/login_head.png'/></div>";
					jQuery("#slider").html(html);
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理
				console.log(type);
			}
		});
	},
	notice:function(){
		$.ajax({
			type: "POST",
			url:move.notice,
			dataType:'json',
			data:{},  
			success: function(ret){
				var code=ret.code;
				var data=ret.data;
				if(code=='200'){
					var items=data.items;
					if(items){
						var length=items.length;
						var html='';
						for(var i=0;i<length;i++){
							var obj=items[i];
							var title=obj.title;
							var url=obj.link;
							var id=obj.id;
							if(url){
								html=html+'<li><a href="'+url+'">'+title+'</a></li>';
							}
						}
						$("#topline ul").html(html);
						$(".smarticktemp").smarticker({
							title:'<img alt="" src="images/icon_announcement.png">'
						});
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},
	serve: function () {
        $.ajax({
            type: "GET",
            url:move.onlineServer,
            dataType:'json',
            success: function(ret){
                var code=ret.code;
                var data=ret.data;
                if(code=='200'){
                    $("#hover-btn").attr('href',data.url);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    },
	xiazhu:function(){
		$.ajax({
			type: "POST",
			url:move.latestList,
			dataType:'json',
			data:{},  
			success: function(ret){
				var code=ret.code;
				var data=ret.data;
				if(code=='200'){
					var items=data.items;
					if(items){
						var length=items.length;
						var html='';
						for(var i=0;i<length;i++){
							var obj=items[i];
							var title=obj.gameName;
							var type=obj.type;
							var img=obj.img;
							var openSessionNo=obj.openSessionNo;
							var latestSessionNo=obj.latestSessionNo;
							var url="";
							if(type=='0'){//三分彩
								url="bj3";
							}else if(type=='1'){
								url="bjpk10";
							}else if(type=='2'){
								url="xjp28";
							}else if(type=='3'){
								url="cqssc";
							}else if(type=='4'){
								url="pcdd";
							}else if(type=='5'){
								url="gdk10";
							}else if(type=='6'){
								url="tjssc";
							}else if(type=='7'){
								url="xjssc";
							}else if(type=='8'){
								url="kuailepuke3";
							}else if(type=='9'){
								url="gd115";
							}else if(type=='10'){
								url="jiangsuk3";
							}else if(type=='11'){
								url="gxk10";
							}else if(type=='12'){
								url="liuhecai";
							}
							else if(type=='13'){
								url="xyft";
							}
							html=html+'<li class="mui-table-view-cell"><a href="'+url+'" class="mui-navigate-right">';
							html=html+'<div class="logo-box"><img src="'+img+'"></div><div class="title-box"><div class="title">'+title+'</div>';
							html=html+'<div class="sbtitle">第'+latestSessionNo+'期</div></div></a></li>';
						}
						$("#xiazhubox").html(html);
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},
	open:function(){
		$.ajax({
			type: "POST",
			url:move.latestList,
			dataType:'json',
			data:{},  
			success: function(ret){
				var code=ret.code;
				var data=ret.data;
				if(code=='200'){
					var items=data.items;
					if(items){
						var size=items.length;
						var html='';
						for(var i=0;i<size;i++){
							var obj=items[i];
							var title=obj.gameName;
							var type=obj.type;
							var img=obj.img;
							var time=obj.openedtime;
							var openSessionNo=obj.openSessionNo;
							var openResult=obj.openResult;
							var openhtml="";
							var resultArr=new Array();
							var url="";
							if(type=='0'){//三分彩
								url="bj3/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='1'){//北京赛车
								url="bjpk10/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='2'){//新加坡幸运28
								url="xjp28/openList.html";
								//0=无波色 1=绿波 2=蓝波 3=红波
								var length=openResult.length;
								if(length==5){
									for (var j = 0; j <3; j++) {
										openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
										if(j==2){
											openhtml=openhtml+'<span class="symbol">=</span>';
										}else{
											openhtml=openhtml+'<span class="symbol">+</span>';
										}
									}
									var colorSize=openResult[4];
									var colorClass='bg-white';
									if(colorSize=='0'){
										colorClass='bg-white';
									}else if(colorSize=='1'){
										colorClass='bg-green';
									}else if(colorSize=='2'){
										colorClass='bg-blue';
									}else if(colorSize=='3'){
										colorClass='bg-red';
									}
									openhtml=openhtml+'<span class="num '+colorClass+'">'+openResult[3]+'</span>';
								}
							}else if(type=='3'){//重庆时时彩
								url="cqssc/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='4'){//PC蛋蛋
								url="pcdd/openList.html";
								//0=无波色 1=绿波 2=蓝波 3=红波
								var length=openResult.length;
								if(length==5){
									for (var j = 0; j <3; j++) {
										openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
										if(j==2){
											openhtml=openhtml+'<span class="symbol">=</span>';
										}else{
											openhtml=openhtml+'<span class="symbol">+</span>';
										}
									}
									var colorSize=openResult[4];
									var colorClass='bg-gray';
									if(colorSize=='0'||colorSize =='13'|| colorSize=='14'|| colorSize=='27'){
										colorClass='bg-gray';
									}else if(colorSize=='1' ||colorSize==4||colorSize==7||colorSize==10||colorSize==16||colorSize==19||colorSize==22||colorSize==25){
										colorClass='bg-green';
									}else if(colorSize=='2'||colorSize==5||colorSize==8||colorSize==11||colorSize==17||colorSize==20||colorSize==23||colorSize==26){
										colorClass='bg-blue';
									}else if(colorSize=='3'||colorSize==6||colorSize==9||colorSize==12||colorSize==15||colorSize==18||colorSize==21||colorSize==24){
										colorClass='bg-red';
									}
									openhtml=openhtml+'<span class="num '+colorClass+'">'+openResult[3]+'</span>';
								}
							}else if(type=='5'){//广东快乐十分
								url="gdk10/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='6'){//天津时时彩
								url="tjssc/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='7'){//新疆时时彩
								url="xjssc/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='8'){//快乐扑克3
								url="kuailepuke3/openList.html";
								var length=openResult.length;
								if(length==5){
									for (var j = 0; j <3; j++) {
										openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
										if(j==2){
											openhtml=openhtml+'<span class="symbol">=</span>';
										}else{
											openhtml=openhtml+'<span class="symbol">+</span>';
										}
									}
									var colorSize=openResult[4];
									var colorClass='bg-white';
									if(colorSize=='0'){
										colorClass='bg-gray';
									}else if(colorSize=='1'){
										colorClass='bg-coffee';
									}else if(colorSize=='2'){
										colorClass='bg-blue2';
									}else if(colorSize=='3'){
										colorClass='bg-violet';
									}else if(colorSize=='4'){
										colorClass='bg-green2';
									}else if(colorSize=='5'){
										colorClass='bg-red2';
									}
									openhtml=openhtml+'<span class="num '+colorClass+'">'+openResult[3]+'</span>';
								}
							}else if(type=='9'){//广东11选5
								url="gd115/openList.html";
								for (var j = 0; j <openResult.length; j++) {
									openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
									if(j==4){
										openhtml=openhtml+'<span class="symbol">=</span>';
									}else if((openResult.length-1)==j){
									}else{
										openhtml=openhtml+'<span class="symbol">+</span>';
									}
								}
							}else if(type=='10'){//江苏快三
								url="jiangsuk3/openList.html";
								//0=无波色 1=绿波 2=蓝波 3=红波
								var length=openResult.length;
								if(length==5){
									for (var j = 0; j <3; j++) {
										openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
										if(j==2){
											openhtml=openhtml+'<span class="symbol">=</span>';
										}else{
											openhtml=openhtml+'<span class="symbol">+</span>';
										}
									}
									var colorSize=openResult[4];
									var colorClass='bg-white';
									if(colorSize=='0'){
										colorClass='bg-white';
									}else if(colorSize=='1'){
										colorClass='bg-green';
									}else if(colorSize=='2'){
										colorClass='bg-blue';
									}else if(colorSize=='3'){
										colorClass='bg-red';
									}
									openhtml=openhtml+'<span class="num '+colorClass+'">'+openResult[3]+'</span>';
								}
							}else if(type=='11'){//广西快乐十分
								url="gxk10/openList.html";
								for ( var j = 0; j < openResult.length; j++) {
									var num=openResult[j];
									openhtml=openhtml+'<span class="num bg-red">'+num+'</span>';
								}
							}else if(type=='12'){//六合彩
								url="liuhecai/openList.html";
								for (var j = 0; j <openResult.length; j++) {
									openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
									if(j==5){
										openhtml=openhtml+'<span class="symbol">+</span>';
									}
								}
							}else if(type=='13'){//幸运飞艇
								url="xyft/openList.html";
								for (var j = 0; j <openResult.length; j++) {
									openhtml=openhtml+'<span class="num bg-red">'+openResult[j]+'</span>';
								}
							}
							html=html+'<li class="mui-table-view-cell"><a href="'+url+'"><div class="title-box"><div class="title">'+title+'</div>';
							html=html+'<div class="time">第'+openSessionNo+'期 '+time+'</div></div>';
							html=html+'<div class="open-number">'+openhtml+'</div></a></li>';
						}
						$("#openbox").html(html);
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},
	winList:function(){
		$.ajax({
			type: "POST",
			url:move.winList,
			dataType:'json',
			data:{},  
			success: function(ret){
				var code=ret.code;
				var data=ret.data;
				if(code=='200'){
					var items=data.winlist;
					if(items){
						var length=items.length;
						var html='';
						for(var i=0;i<length;i++){
							html=html+'<li class="winlist-data-cell">'+items[i]+'</li>';
						}
						$("#winlistdatabox").html(html);
						$("#winlistdatabox").smarticker({});
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},
	gameColumn:function(){
		$.ajax({
			type: "POST",
			url:move.gameColumn,
			dataType:'json',
			data:{},  
			success: function(ret){
				var code=ret.code;
				var data=ret.data;
				if(code=='200'){
					var items=data.gamelist;
					if(items){
						var length=items.length;
						var html='';
						for(var i=0;i<length;i++){
							var obj=items[i];
							var img=obj.img;
							var title=obj.title;
							var subtitle=obj.subtitle;
							var type=obj.type;
							var url="";
							if(type=='0'){//三分彩
								url="bj3";
							}else if(type=='1'){
								url="bjpk10";
							}else if(type=='2'){
								url="xjp28";
							}else if(type=='3'){
								url="cqssc";
							}else if(type=='4'){
								url="pcdd";
							}else if(type=='5'){
								url="gdk10";
							}else if(type=='6'){
								url="tjssc";
							}else if(type=='7'){
								url="xjssc";
							}else if(type=='8'){
								url="kuailepuke3";
							}else if(type=='9'){
								url="gd115";
							}else if(type=='10'){
								url="jiangsuk3";
							}else if(type=='11'){
								url="gxk10";
							}else if(type=='12'){
                                url="liuhecai";
                            }else if(type=='13'){
                                url="xyft";
                            }
							html=html+'<li class="caizhong-cell"><a href="'+url+'"><div class="ico"><img src="'+img+'"></div>';
							html=html+'<div class="name-box"><div class="title">'+title+'</div><div class="subtitle">'+subtitle+'</div></div></a></li>';
						}
						$("#gameColumnbox").html(html);
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},
	zoushi:function(type,t){
		if(typeof type=='undefined'){
			type='0';
		}
		var url="";
		if(type=='0'){//三分彩
			url="/api/bj3_trend";
		}else if(type=='1'){
			url="/api/bjPk10_trend";
		}else if(type=='2'){
			url="/api/xjpLu28_trend";
		}else if(type=='3'){
			url="/api/cqSsc_trend";
		}else if(type=='4'){
			url="/api/bjLu28_trend";
		}else if(type=='5'){
			url="/api/gdK10_trend";
		}else if(type=='6'){
			url="/api/tjSsc_trend";
		}else if(type=='7'){
			url="/api/xjSsc_trend";
		}else if(type=='8'){
			url="/api/poker_trend";
		}else if(type=='9'){
			url="/api/gdPick11_trend";
		}else if(type=='10'){
			url="/api/jsK3_trend";
		}else if(type=='11'){
			url="/api/gxK10_trend";
		}else if(type=='12'){
			url="/api/markSix_trend";
		}
		
		var mask=move.createLoading();
		mask.show();
		if(typeof t=='undefined'){
			t='0';
		}
		var map = {};
		map['type'] =t;
		var mw=baseObj.mw(map);
		$.ajax({
			type: "POST",
			url:move.server+url,
			dataType:'json',
			data:{
				mw:mw
			},
			success: function(ret){
				mask.close();
				var code=ret.code;
				var msg=ret.msg;
				if(code=='200'){
					var data=ret.data;
					var items=data.items;
					var length=items.length;
					var cssid='tab'+t;
					var html='<ul class="zoushi-table" id="'+cssid+'">';
					for (var i = 0; i < length; i++) {
						var liclass='single';
						if(i%2==1){
							liclass='double';
						}
						html=html+'<li class="'+liclass+'">';
						var obj=items[i];
						var size=obj.length;
						for (var j = 0; j < size; j++) {
							var va=obj[j];
							var spanclass='';
							if(va=='大'||va=='双'||va=='龙'||va=='家禽'||va=='红波'){
								spanclass='colour-red';
							}else if(va=='小'||va=='单'||va=='虎'||va=='野兽'){
								spanclass='colour-green';
							}else if(va=='蓝波'){
								spanclass='colour-blue';
							}else if(va=='对子'){
								spanclass='colour-coffee';
							}else if(va=='同花'){
								spanclass='colour-blue2';
							}else if(va=='顺子'){
								spanclass='colour-violet';
							}else if(va=='同花顺'){
								spanclass='colour-green2';
							}
							if(type == "10"){
								if(size > 4) {
                                    html += '<span class="lattice jsk3 ' + spanclass + '">' + va + '</span>';
                                } else {
                                    html += '<span class="lattice ' + spanclass + '">' + va + '</span>';
								}
							} else {
                                html += '<span class="lattice ' + spanclass + '">' + va + '</span>';
                            };
						}
						html=html+'</li>';
					}
					html=html+'</ul>';
					$('#zou'+type+' .zoushi-table-box').html(html);
				}else{
					mui.toast(msg,{
					    duration:'long',
					    type:'div' 
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				mask.close();
			}
		});
		
		
	}
}