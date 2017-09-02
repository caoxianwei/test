
	
	var page_value = {
        pageRecordCount:5
    };
	
    $(function(){
    	$("#menu").find("li").on("click",function(){
        	var _href=$(this).attr("href");
        	if($(this).attr("id") == 'customerService') {
        		window.open(_href);
        	} else {
        		location.href=document.getElementById('base_path').href+_href;
        	}
        });
    	
        var _util = {
    		getUrl:function(name){
            	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
                var r = location.search.substr(1).match(reg);
                if(r!=null) {
                	return unescape(r[2]);
            	} 
                return null; 
            },
                
            emptyPageStyle:function (div_id,isEmpty) {
                if(isEmpty) {
                    $("#"+div_id+"  .allPageNum").css("display","none");
                    $("#"+div_id+"  .tip_page").text("暂无数据");
                    $("#"+div_id+"  .page").html("");
                    $("#"+div_id+"  .tip_page").css("display","block");
                } else {
                    $("#"+div_id+"  .allPageNum").css("display","block");
                    $("#"+div_id+"  .tip_page").css("display","none");
                }
            },
            //初始化 分页 div的样式
            pageDiv:function(pageNum,PageAllRecordCount,div_id,funcName) {
                if(pageNum > 1) {
                    laypage({
                        cont: $("#"+div_id+" .page"), //容器。值支持id名、原生dom对象，jquery对象,
                        pages:pageNum , //总页数
                        skip: true, //是否开启跳页
                        skin: '#AF0000',
                        groups: 4, //连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){
                            	// 无需重复查询当前页的数据
                                if($("#"+div_id+" .page").data("pageindex") == obj.curr) {
                                    return;
                                }
                                if(funcName && (typeof(_util.getList[funcName]) == 'function')) {
                                    _util.getList[funcName](div_id,obj.curr);
                                }
                            }
                        }
                    });
                    $("#"+div_id+" .allPageNum").html("（共"+pageNum+"页）");
                }
            },
            changeHeight: function(size) {
            	var h2 = $(window).height()-$("body>div>#header").height();
                var static_height = (size<=1?250 :300)+130*(size-1);
                if(size <= 3 || h2 < static_height) {
                    h2 = static_height;
                }
                
                $("#h2").css("height",h2);
                $("#message_div .css4").css("min-height",(h2));
            },
            getList:{
                sys:function(div_id, pageIndex) {
                    $("#"+div_id+"  .tip_page").css("display","block");
                    $("#"+div_id+"  .tip_page").text("加载中请稍后");
//                  $.ajax({
//                      type: 'POST',
//                      url: '../member/center.html/ajaxNewMsgList',
//                      dataType: 'json',
//                      data: "pageRecordCount="+page_value.pageRecordCount+"&pageIndex="+pageIndex,
//                      success: function (results) {//成功
//                      	var data=results.data;
//                      	if(data != null && data.itemsCount && data.itemsCount > 0) {
//		                        $("#"+div_id+" .page").data("pageindex",data.pageNo ); //将当前页码保存于页面中
//		                        $("#"+div_id+" .page input").val(data.pageNo);
//		                        $("#"+div_id+"  tbody").html("");
//		                        if(data.itemsCount && data.itemsCount > 0) {
//		                            $("#"+div_id+"  .list").html("");
//		                            for(var a = 0; a < data.itemsCount; a++) {
//		                                var tempObj = data.items[a];
//		                                var txtHtml = 
//		                                		'<div class="row"><i></i><div><i></i>'
//		                                        +'<p><strong>'+tempObj.title+'</strong>'
//		                                        +(tempObj.addTime?("<span>"+_common.util.UnixToDate(tempObj.addTime,true)+"<i></i></span>"):"")
//		                                        +"</p><p>"+tempObj.content+"</p></div></div>";
//		                                $("#"+div_id+"  .list").append(txtHtml);
//		                            }
//		                            _util.emptyPageStyle( div_id, false );
//		                        } else {
//		                            //暂无数据
//		                            _util.emptyPageStyle(div_id, true );
//		                        }
//		                        //如果是新的查询，则初始化 分页div的样式
//		                        if(1 == data.pageNo ||  "1" == data.pageNo) {
//		                            _util.pageDiv(data.totalPage , data.totalSize ,div_id ,"sys");
//		                        }
//                          } else {
//                              //暂无数据
//                              _util.emptyPageStyle(div_id, true );
//                          }
//                          
//                          _util.changeHeight(data.itemsCount);
//                      },       
//                      error: function(XMLHttpRequest,status){
//                          _util.emptyPageStyle(div_id, true );
//                      }
//                  });
                    $("#"+div_id).data("initevent","true");
                },
                personal: function(div_id, pageIndex) {
                    $("#"+div_id+"  .tip_page").css("display","block");
                    $("#"+div_id+"  .tip_page").text("加载中请稍后");
//                  $.ajax({
//                      type: 'POST',
//                      url: '../member/center.html/ajaxPrivateMsgList',
//                      dataType: 'json',
//                      data: "msgStatus=0&pageRecordCount="+page_value.pageRecordCount+"&pageIndex="+pageIndex,
//                      success: function (results) {//成功
//                          try {
//                              if(session_timeout(results) === false) {
//                                  return false;
//                              }
//                          } catch(e){ console.log(e);}
//                          var data = results.data;
//                          if(data != null && data.itemsCount && data.itemsCount > 0) {
//                          	$("#"+div_id+" .page").data("pageindex",data.pageNo ); //将当前页码保存于页面中
//                              $("#"+div_id+" .page input").val(data.pageNo);
//                              $("#"+div_id+"  tbody").html("");
//                              $("#"+div_id+"  .list").html("");
//                              for(var a = 0; a < data.itemsCount; a++) {
//                                  var tempObj = data.items[a];
//                                  var txtHtml = 
//                                  		'<div class="row"><i></i><div><i></i>'
//                                          +'<p><strong>'+tempObj.title+'</strong>'
//                                          +(tempObj.addTime ? ("<span>"+_common.util.UnixToDate(tempObj.addTime,true)+"<i></i></span>") : "")
//                                          +"</p><p>"+tempObj.content+"</p></div></div>";
//                                  $("#"+div_id+"  .list").append(txtHtml);
//                              }
//                              _util.emptyPageStyle( div_id, false );
//                              
//                            //如果是新的查询，则初始化 分页div的样式
//                              if(1 == data.pageNo ||  "1" == data.pageNo) {
//                                  _util.pageDiv( data.totalPage , data.totalSize ,div_id ,"personal");
//                              }
//                              
//              	    		$.ajax({
//              	                type: 'POST',
//              	                url: 'common/getUnreadMsgCount',
//              	                data: '',
//              	                dataType: 'json',
//              	                timeout: '30000',
//              	                success: function(results) {
//              	                	$('#un_read_msg_count').hide();
//              	                    if(results.status == "200" && results.data > 0) {
//              	                    	$('#un_read_msg_count').text('('+results.data+')');
//              	                    	$('#un_read_msg_count').show();
//              	                    }
//              	                }
//              	            });
//                          } else {
//                              //暂无数据
//                              _util.emptyPageStyle(div_id, true );
//                          }
//                          
//                          _util.changeHeight(data.itemsCount);
//                      },
//                      error: function(XMLHttpRequest,status){
//                          _util.emptyPageStyle(div_id, true );
//                      }
//                  });
                    $("#"+div_id).data("initevent","true");
                }
            }
        };
        
        (function bind_event(){
            //个人消息
            $("#lab_per").click(function(){
                if($(this).get(0).className.indexOf("current") >= 0) {
                    return;
                }
                $(this).addClass("current");
                $("#personal_mesg").css("display","block");
                $("#lab_sys").removeClass("current");
                $("#system_mesg").css("display","none");
                if($("#personal_mesg").data("initevent") != "true") {
                    _util.getList.personal("personal_mesg",1);
                }
            });
            
            //系统消息
            $("#lab_sys").click(function(){
                if($(this).get(0).className.indexOf("current") >= 0) {
                    return;
                }
                $(this).addClass("current");
                $("#system_mesg").css("display","block");
                $("#lab_per").removeClass("current");
                $("#personal_mesg").css("display","none");
                if($("#system_mesg").data("initevent") != "true") {
                    _util.getList.sys("system_mesg",1);
                }
            });
        })();
        
        var _tab = _util.getUrl("tab");
        if(_tab == 2) {
        	$("#lab_per").trigger('click');
        } else {
        	_util.getList.sys("system_mesg", 1);
        }
        
        (function style() {
            //初始化消息中心的高度
            var h2 = $(window).height()-$("body>div>#header").height()+150;
            var static_height = 310;
            if(h2 < static_height) {
                h2 = static_height;
            }
            
            $("#h2").css("height",h2);
            $("#message_div .css4").css("min-height",(h2));
        })();
    });
