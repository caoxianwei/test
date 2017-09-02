
    var _value = {
	    bank:{}//用于保存银行入款返回的 data对象
    };
    
    window.init_event = {
		skipOpen:function() {
			 $("#online_form").submit();
		},
		
		selected:function(id) {
			var inputselect = $("#bank_form input[name=\"bankName\"]");
			$.each(inputselect, function(index, el) {
                $(el).prop('checked', false);
            });
			
			$("#"+id).prop('checked', true);
		},
    
	    page:function(){
	        // 支付方式 选项卡
	        $('.pay-top_1 a').click(function(){
	            $('.pay-top_1 a').removeClass();
	            $(this).addClass('current')
	            $('.deposit-info').find('.pay-info').hide();
	            if($(this).data("func")) {
	                //初始化当前页面的事件
	                init_event[$(this).data("func")]();
	            }
	            $('.deposit-info').find('.pay-info').eq($(this).index()).show().css("display","block");
	        });
	    },
	    
	    util_depositProcess:function(paramObj,callback,errorBack,always){
//	        $.ajax({
//	            type: 'POST',
//	            url: '../member/recharge.html/bank',
//	            type: 'post',
//	            dataType: 'json',
//	            data:paramObj,
//	            success: function (results){//成功
//	                var data=results.data;
//	                if(results.status=="200") {
//	                	callback && callback(data);
//	                } else{
//	                    _alert(results.description);
//	                }
//	               
//	            },
//	            error: function(XMLHttpRequest,status){
//	                 errorBack && errorBack();
//	            }
//	        }).always(always);
	    },
	    
	    util_depositSucess:function(paramObj,callback,errorBack,always){
	        $.ajax({
	            type: 'POST',
	            url: '../member/recharge.html/bankSubmit',
	            dataType: 'json',
	            data:paramObj,
	            success: function (results){//成功
	                var data=results.data;
	                if(results.status=="200"){
	                   callback && callback(data);
	                } else {
	                    _alert(results.description);
	                }
	               
	            },
	            error: function(XMLHttpRequest,status){
	                 errorBack && errorBack();
	            }
	        }).always(always);
	    },
	    
	    //银行入款第一步，绑定事件
	    bankDeposit:function() {
	        var div_id = "bankDeposit_div";
	        $("#div_1").css("display","block");
	        $("#div_2").css("display","none");
	        if($("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        $("#"+div_id+" .pay-select>select").bind("change",function() {
	            if($(this).val().indexOf("其他") >= 0) {
	                $("#"+div_id+" .pay-select .pay-int").css("display","block");
	            } else {
	            	$("#"+div_id+" .pay-select .pay-int").val('');
	                $("#"+div_id+" .pay-select .pay-int").css("display","none");
	            }
	        });
	        $("#"+div_id+" [name=\"next_btn\"]").bind("click",function(){
	            if($("#"+div_id+" [name=\"next_btn\"]").data("ajax") == "true") {//防止按钮重复点击，导致重复调用接口
	               return;
	            }
	            var userName = $.trim($("#"+div_id+" input[name=\"userName\"]").val());
	            var bankName = ($("#"+div_id+" .pay-select>select").val().indexOf("其他") >= 0 || $("#"+div_id+" .pay-select>select").val().indexOf("请选择") >= 0)?$.trim($("#"+div_id+" .pay-select>input").val()):$("#"+div_id+" .pay-select>select").val();
	            var amount = $.trim( $("#"+div_id+" input[name=\"ipt_money\"]").val() ) ;
	            if("" == userName ) {
	                _alert("请输入姓名");
	                return;
	            }
	            if("" == bankName){
	                _alert("请输入开户银行");
	                return;
	            }
	            if(amount == "" || !/^\d{0,20}(?:\.\d{1,2}|)$/.test(amount)){
	                _alert("金额必须大于1，且最多2位小数!");
	                return;
	            }
	            try{
	                $("#bank_name_url  button").text( $("#"+div_id+" .pay-select").find("option:selected").val() );
	                $("#bank_name_url  button").click(function(){
	                    __openWin('other2', $("#"+div_id+" .pay-select").find("option:selected").attr("bankurl"))
	                });
	            }catch(e){console.log(e);}
	            
	            $("#"+div_id+" [name=\"next_btn\"]").data("ajax") == "true";
	            init_event.util_depositProcess({
	                userName:userName,
	                bankName:bankName,
	                amount:amount
	            },function(data){
	                _value.bank = data;
	                $("#div_1").css("display","none");
	                $("#div_2,#div_2_2").css("display","block");
	                $("#div_2  #bank_list").html("");
	                if(data.records != null && data.records.length > 0) {
	                    for(var b= 0; b< data.records.length; b++) {
	                        var tempObj = data.records[b];
	                        $("#div_2 #bank_list").append("<div class=\"row\" data-index=\""+b+"\"><input type=\"radio\" name=\"user-name\"><div class=\"bank-mess\"><ul><li><span class=\"bold\">开户行网点：</span>"+tempObj.bankAddr+"</li><li><span class=\"bold\">收款人：</span>"+tempObj.accountName+"</li><li><span class=\"bold\">银行：</span>"+tempObj.bankName+"</li><li><span class=\"bold\">帐号：</span>"+tempObj.accountCode+"</li></ul></div></div>" );
	                    }
	                }
	                
	                init_event.bankDeposit_2();
	            },function(){
	            },function(){ $("#"+div_id+" [name=\"next_btn\"]").data("ajax","false");});
	        });
	        $("#"+div_id).data("initevent","true");
	    },
	    
	    //银行入款第二步，绑定事件
	    bankDeposit_2:function() {
	        var div_id = "div_2_2";
	        if($("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        window.gotoExplain = function(){
	            $("#div_iframe>iframe").attr("src","member/bank/explain");
	            document.getElementById("div_iframe").style.display = "block";
	        };
	        $("#"+div_id+" [name=\"back_btn\"]").bind("click",function(){
	            $("#div_1").css("display","block");
	            $("#div_2").css("display","none");
	        });
	        $("#"+div_id+" [name=\"next_btn\"]").bind("click",function(){
	            var arrIndex = $("#"+div_id+" input[name=\"user-name\"]:checked ").parent().data("index");
	            if( undefined == arrIndex) {
	                _alert("请选择银行卡号");
	                return;
	            } else {
	                _value.bank.arrIndex = parseInt(arrIndex) ;
	            }
	            $("#div_2_3").css("display","block");
	            $("#div_2_2").css("display","none");
	            
	            init_event.bankDeposit_3();
	        });
	        $("#"+div_id).data("initevent","true");
	    },
	    
	    //银行入款第3步，绑定事件
	    bankDeposit_3:function(){
	        var div_id = "div_2_3";
	        (function initDate(){
	            $("#" + div_id + " #daojishi").data("time",15*60);
	            window._setInt = setInterval(function(){//倒计时
	                var second = parseInt($("#" + div_id + " #daojishi").data("time"))-1 ;
	                if(second < 0) {
	                    clearInterval(_setInt);
	                    return;
	                }
	                $("#daojishi").data( "time", second );
	                var dateStr = (second-60>0) ? ( parseInt(second/60)+":"+((second-parseInt(second/60)*60)>=10?(second-parseInt(second/60)*60):("0"+(second-parseInt(second/60)*60))) ) : (second>=10?second:("0"+second)) ;
	                $("#daojishi").html("有效倒计时："+dateStr);
	            },1000);
	            $( "#"+div_id+" [name=\"receiverAddr\"]").text( _value.bank.records[_value.bank.arrIndex]["bankAddr"] );
	            $( "#"+div_id+" [name=\"receiverName\"]").text( _value.bank.records[_value.bank.arrIndex]["accountName"] );
	            $( "#"+div_id+" [name=\"bankName\"]").text( _value.bank.records[_value.bank.arrIndex]["bankName"] );
	            $( "#"+div_id+" [name=\"receiverAccount\"]").text( _value.bank.records[_value.bank.arrIndex]["accountCode"] );
	            $( "#"+div_id+" [name=\"orderId\"]").text( _value.bank.orderNo );
	            $( "#"+div_id+" input[name=\"userName\"]").val( _value.bank.userName );
	            $( "#"+div_id+" input[name=\"orderId\"]").val( _value.bank.orderNo );
	            $( "#"+div_id+" input[name=\"amount\"]").val( _value.bank.amount );
	            $( "#"+div_id+" input[name=\"save_time\"]").val( _value.bank.currentTime );
	            //绑定时间控件
	            //给日期控件赋上默认值
	            function getDateStr(date) {
	                return  date.getFullYear()+"-"+((date.getMonth()+1)>=10?(date.getMonth()+1):("0"+(date.getMonth()+1)))+"-"+(date.getDate()>=10?date.getDate():("0"+date.getDate()));
	            }
	            $("#"+div_id+"  .bt_time").val(getDateStr(new Date()));
	            $("#"+div_id+"  .bt_time").datepicker({
	                dateFormat:'yy-mm-dd',
	                onSelect: function( startDate ) {
	                }
	            }); //绑定输入框
	        })();
	        if($("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	
	        //时间下拉填充html
	        (function(){
	            /*var str ="";
	            var date = new Date();
	            for( var a = 0; a < 24 ; a++) {
	                if(a== date.getHours()) {
	                    str +="<option selected>"+(a<10?("0"+a):a)+"</option>" ;
	                } else {
	                   str +="<option>"+(a<10?("0"+a):a)+"</option>" ; 
	                }
	            }
	            $("#bank-order-time  [name=\"hour\"]").html(str);
	            var mins = "";
	            for(var b = 0; b < 60; b++) {
	                if(b == date.getMinutes()) {
	                    mins +="<option selected>"+(b<10?("0"+b):b)+"</option>" ;
	                } else {
	                   mins +="<option>"+(b<10?("0"+b):b)+"</option>" ; 
	                }
	            }
	            $("#bank-order-time  [name=\"minutes\"]").html(mins);*/
	        })();
	
	        $("#div_2_3  [name=\"back_btn\"]").bind("click",function(){
	            $("#div_2_3").css("display","none");
	            $("#div_2_2").css("display","block");
	        });
	        
	        $("#"+div_id+" [name=\"submit\"]").bind("click",function(){
	            if($("#"+div_id+" [name=\"submit\"]").data("ajax") == "true") {//防止按钮重复点击，导致重复调用接口
	                return;
	            }
	            if(parseInt( $("#daojishi").data("time") ) <= 0) {
	                _alert("已超时，请刷新页面重试");
	                return;
	            }
	            var amount = $.trim( $( "#"+div_id+" input[name=\"amount\"]").val() ) ;
	            var userName =  $.trim( $( "#"+div_id+" input[name=\"userName\"]").val() ) ;
	            var payType =  $("#"+div_id+" input[name=\"order-pay\"]:checked ").val();
	            _value.bank.payTypeName =  $("#"+div_id+" input[name=\"order-pay\"]:checked ").parent().text() ;
	            if(!/^\d{0,20}(?:\.\d{1,2}|)$/.test(amount) ){
	                _alert("金额必须大于1，且最多2位小数!");
	                return;
	            }
	            if(amount < _value.bank.records[ _value.bank.arrIndex]["payMin"] || amount > _value.bank.records[ _value.bank.arrIndex]["payMax"]) {
	                _alert("存入金额输入有误，不能大于"+_value.bank.records[ _value.bank.arrIndex]["payMax"]+"，  且不能小于"+_value.bank.records[ _value.bank.arrIndex]["payMin"]);
	                return;
	            }
	            if("" == userName ) {
	                _alert("请输入存入人姓名");
	                return;
	            }
	            if(!payType) {
	                _alert("请输选择存款方式");
	                return;
	            }
	            $("#"+div_id+" [name=\"submit\"]").data("ajax","true");
	            _value.bank.amount = amount;
	            _value.bank.userName = userName;
	            init_event.util_depositSucess({
	                userName:userName,
	                bankName:_value.bank.bankName,
	                orderNo:_value.bank.orderNo,
	                amount:amount,
	                saveTime:$('#save_time').val(),
	                saveType:payType,
	                payId:_value.bank.records[_value.bank.arrIndex]["id"]
	            },function(data){
	                $("#"+div_id+" [name=\"submit\"]").data("ajax","false");
	                if("SUCCESS" == data) {//成功
	                    $("#div_2_4").css("display","block");
	                    $("#div_2_3").css("display","none");
	                    var div_id = "div_2_4";
	                    var receiverAccount = _value.bank.records[_value.bank.arrIndex]["accountCode"];
	                    $( "#"+div_id+" [name=\"cunru\"]").text( _value.bank.records[_value.bank.arrIndex]["bankAddr"]+"/"+_value.bank.records[_value.bank.arrIndex]["accountName"]+"/"+("****"+ receiverAccount.substr( receiverAccount.length-5, receiverAccount.length-1 ) )  );
	                    $( "#"+div_id+" [name=\"bankName\"]").text( _value.bank.records[_value.bank.arrIndex]["bankName"] );
	                    $( "#"+div_id+" [name=\"userName\"]").text( _value.bank.userName );
	                    $( "#"+div_id+" [name=\"orderId\"]").text( _value.bank.orderNo );
	                    $( "#"+div_id+" [name=\"amount\"]").text( _value.bank.amount );
	                    $( "#"+div_id+" [name=\"payTypeName\"]").text( _value.bank.payTypeName );
	                    //$( "#"+div_id+" [name=\"cunruShijian\"]").text($("#div_2_3 .bt_time").val()+" "+$("#div_2_3 [name=\"hour\"]").val()+":"+$("#div_2_3 [name=\"minutes\"]").val());
	                } else {
	                    _alert("操作失败");
	                }
	            },function(){},function(){
	                $("#"+div_id+" [name=\"submit\"]").data("ajax","false");
	            });
	        });
	        $(".copy_outer  .copy-btn").zclip({
	            path:_prefixURL.plugins+"/zclip/swf/ZeroClipboard.swf",
	            copy:function(){
	                var text =  $("#"+div_id+" td[name=\""+$(this).data("name")+"\"]").text();
	                return text;
	            },afterCopy: function () {
	                _alert("复制成功");
	            }
	        });
	        $("#"+div_id).data("initevent","true");
	    },
    
	    //在线入款提交表单
	    onlineSubmit:function(){
	    	var amount = $.trim($("#online_money").val());
	    	
	    	var bankName = '';
	    	var inputselect = $("#bank_form input[name=\"bankName\"]");
			$.each(inputselect, function(index, el) {
                if($(el).prop('checked')) {
                	bankName = $(el).val();
                }
            });
			if("" == bankName) {
				bankName = $('#third_bank_name').val();
	    	}
	    	if("" == bankName) {
	    		_alert("请先选择银行！");
	    		return;
	    	}
            if("" == amount) {
                _alert("请输入金额");
                return;
            }
            if(!/^\d{0,20}(?:\.\d{1,2}|)$/.test(amount) ){
                _alert("金额必须大于0，且最多2位小数!");
                return;
            }
            var minAmount = $.trim($("#online_minamount").val());
            if(parseFloat(minAmount) > parseFloat(amount)) {
            	_alert("充值金额不能小于"+minAmount);
            }
            var maxAmount = $.trim($("#online_maxamount").val());
            if(parseFloat(maxAmount) < parseFloat(amount)) {
            	_alert("充值金额不能大于"+maxAmount);
            }
            $('#online_base_url').val(document.getElementById("base_path").href);
            
            $("#online_form").submit();
            layer.open({
                type: 1,
                title: "温馨提示",
                skin: 'layui-layer-rim',
                area: ['430px', '300px'],
                content: $('#dialog')
            });
	    },
	    
	    wechatAlipaySubmit:function(type, payId, amount, payUrl) {
	    	$("#wechat_alipay_type").val(type);
	    	$("#wechat_alipay_payid").val(payId);
	    	$("#wechat_alipay_amount").val(amount);
	    	$("#wechat_alipay_bankname").val(type==1?'微信':(type==2?'支付宝':'QQ钱包'));
	    	$('#third_base_url').val(document.getElementById("base_path").href);
	    	
	    	$("#wechat_alipay_form").attr("action",payUrl+'/common/recharge/third');
	    	$("#wechat_alipay_form").submit();
	    	
            layer.open({
                type: 1,
                title: "温馨提示",
                skin: 'layui-layer-rim',
                area: ['430px', '300px'],
                content: $('#dialog')
            });
	    },
	    
	    //微信支付第一步，绑定事件
	    weChatDeposit_1:function() {
	        var div_id = "wechat_step1";
	        if( $("#"+div_id).data("initevent") == "true") {//已经绑定过的事件无需重复绑定
	            return;
	        }
	        function bind_event(div_id) {
	            //输入框格式校验
	            $("#"+div_id+" input").bind("blur",function(event) {
	                var v=parseFloat($(this).val());
	                if(!v||isNaN(v)){v='';}
	                $(this).val(v);
	            });
	            //下一步
	            $("#"+div_id+" [name=next_btn]").bind("click",function(){
	                var payId = $(this).data("payid");
	                var payUrl = $(this).data("payurl");
	                var returnType = $(this).data("returntype");
	                var block_name = "block_" + payId+"_"+returnType;
	                var payType = $(this).data("paytype");
	                var partSlt = "#"+div_id+" [name="+block_name+"]";
	                if($(this).data("ajax") == "true") {//禁止因网速过慢的表单重复提交
	                    return;
	                }
	                var amount = $.trim($(partSlt+" [name=\"amount\"]").val());
	                if("" == amount ){
	                    _alert("请输入金额");
	                    return;
	                }
	                if(isNaN(parseFloat(amount))) {
	                    _alert("请输入正确的金额");
	                    return;
	                }
	                if(!/^\d{0,20}(?:\.\d{1,2}|)$/.test(amount)) {
	                    _alert("金额必须大于1，且最多2位小数!");
	                    return;
	                }
	                
	                var pMin = $(this).data("min");
	                var pMax = $(this).data("max");
	                if(amount < pMin || amount > pMax) {
	                    _alert("金额必须大于"+pMin+"，且小于"+pMax+"!");
	                    return;
	                }
	                
	                if(returnType == 2) {//第三方微信返回页面
	                	init_event.wechatAlipaySubmit(1, payId, amount, payUrl);
	                	return;
	                } 
//	                $.ajax({
//	                    type: 'post',
//	                    url: payType == 1 ? '../member/recharge.html/thirdWechat' : '../member/recharge.html/weichat',
//	                    dataType: 'json',
//	                    beforeSend:function(){
//	                        $(partSlt+" [name=next_btn]").data("ajax","true");
//	                        $(partSlt+" [name=next_btn]").text("请稍后");
//	                    },
//	                    data:{
//	                    	payid: payId,
//	                    	payType: payType,
//	                    	amount: amount,
//	                    	baseUrl: document.getElementById("base_path").href
//	                    }
//	                }).done(function(results){
//	                    var data=results.data;                  
//	                    if(results.status=="200") {
//	                      if(payType == "1") {
//	                        (function initdata(data) {
//	                        	var div_id = "wechat_step2_scan";
//	                        	$("#"+div_id+" [name=amount]").text(data.amount);
//	                            $("#"+div_id+" [name=orderId]").text(data.orderNo);
//	                            if(data.needDown == '1'){
//	                            	$("#"+div_id+" [id=showqrcode]").empty();
//	                            	$("#"+div_id+" [id=showqrcode]").html('<img name="pay_code_img" src="'+ data.payUrl +'">');
//	                                //$("#"+div_id+" [name=pay_code_img]").attr("src", data.payUrl);
//	                                $("#"+div_id+" [id=showqrcode]").css('margin-left', '0px');
//	                            }else{
//	                            	$("#"+div_id+" [id=showqrcode]").empty().qrcode({
//	                        			render : "canvas",
//	                        			text : data.payUrl,
//	                        			width : "180",
//	                        			height : "180",
//	                        			background : "#ffffff",
//	                        			foreground : "#000000",
//	                        			src: ""
//	                        		});	
//	                            }
//	                        })(data);
//	                        $("#wechat_step2_scan").show();
//	                        init_event.weChatDeposit_2_scan();
//	                    } else {
//	                    	(function initdata(data){
//	                    		var div_id = "wechat_step2_addF";
//	                            $("#"+div_id+" [name=wxName]").text(data.name);
//	                            $("#"+div_id+" [name=sWechatID]").text(data.code);
//	                            $("#"+div_id+" [name=amount]").val(data.amount);
//	                            $("#"+div_id+" [name=wechat_payid]").val(data.payId);
//	                            $("#"+div_id+" [name=date]").val(data.date);
//	                            $("#"+div_id+" [name=pay_code_img]").attr("src", data.payUrl);
//	                        })(data);
//	                        $("#wechat_step2_addF").show();
//	                        init_event.weChatDeposit_2_addF();
//	                    }
//	                    $("#wechat_step1").hide();
//	                } else {
//	                	_alert(results.description);
//	                }
                }).always(function(){
                    $(partSlt+" [name=next_btn]").data("ajax","false");
                    $(partSlt+" [name=next_btn]").text("下一步");
                });
	            //输入框格式校验
	            if($("#wechat_step1 input").length > 0) {
	                function jy(event){
	                    var e = event || window.event || arguments.callee.caller.arguments[0];
	                    var keycode = e.keyCode;
	                    if((keycode < 48 && keycode != 8 && keycode != 0 && keycode != 13 && keycode != 9 && keycode != 46 ) || (keycode > 57 && keycode != 190 && keycode != 110 &&(keycode>105||keycode<96 ) ))
	                    {
	                        try{if(event.preventDefault){event.preventDefault();}else{event.returnValue = false;}}catch(e){}
	                        return false;
	                    }
	                }
	                $("#wechat_step1 input").get(0).onkeydown = jy;
	            }
	        }
	        //返回账号列表
//	        $.ajax({
//	            type: 'post',
//	            dataType: 'json',
//	            url: '../member/recharge.html/getWeichatList'
//	        }).done(function(results) {
//		        try {
//		        	var data = results.data;
//		        	window.wechat_step1_key = data;
//		            var lth = wechat_step1_key.length;
//		            if(lth <= 0) {
//		            	$("#"+div_id).hide();
//		            	$("#no_wechat").show();
//	                    return;
//		            }
//		            
//		            function getHtmlStr(payId,payType,payName,payDesc,payMin,payMax,returnType,payUrl) {
//		            	var html = "<div name=\"block_"+payId+"_"+returnType+"\" class=\"wechat-top\"><div class=\"wechat-tit text-center\">"+payName+"</div>";
//		            	html += "<p class=\"text-center\">"+payDesc+"</p>";
//		            	html += "<div class=\"wechat-recharge\"><span>充值金额：</span><input name=\"amount\" class=\"wechat-int\" maxlength=\"14\">";
//		            	html += "<a name=\"next_btn\" data-payid=\""+payId+"\" data-payurl=\""+payUrl+"\" data-returntype=\""+returnType+"\" data-paytype=\""+payType+"\" data-min=\""+payMin+"\" data-max=\""+payMax+"\" class=\"btn fr\">下一步</a>"
//		            	html += "</div></div>";
//		            	return html;
//		            }
//		            $("#"+div_id+" [name=step_one_list]").empty();
//		            for(var i=0;i<lth;i++) {
//		                var o = wechat_step1_key[i];
//		                if(o.payType == 3) {
//		                	var html = "<div class=\"wechat-top\"><div class=\"wechat-tit text-center\">" + o.payDesc+"</div>";
//		                	html += "<p class=\"text-center ewm_tit\">微信号：" + o.code;
//			            	html += "  微信昵称：" + o.name + "</p>";
//			            	html += "<p class=\"text-center\"><img class=\"ewm_img\" src=\"" + o.payImg + "\"></p>";
//			            	html += "<p class=\"text-center add_span\">※1. 请勿存入整数金额(如存 1000.32元 , 500.77元 )，以免延误财务查收。</p>";
//			            	html += "<p class=\"text-center add_span\">※2. 转帐完成后请保留单据作为核对证明。</p>";
//			            	html += "</div></div>";
//			            	
//		                	$("#"+div_id+" [name=step_one_list]").append(html);
//		                } else {
//		                	$("#"+div_id+" [name=step_one_list]").append(getHtmlStr(o.id,o.payType,o.payName,o.payDesc,o.payMin,o.payMax,o.returnType,o.payUrl));
//		                }
//		            }
//		            bind_event("wechat_step1");
//		        } catch(e) {
//		            $("#"+div_id).hide();
//		            $("#no_wechat").show();
//		        }
//	        });
	        
	        $("#"+div_id).data("initevent","true");//标志已经绑定过事件
	    },
	    
	    //微信支付第2步(扫码直接支付)，绑定事件
	    weChatDeposit_2_scan:function() {
	        var div_id = "wechat_step2_scan";
	        if($("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        //复制按钮
	        $("#"+div_id+" [name=cp_btn]").zclip({
	            path:_prefixURL.plugins+"/zclip/swf/ZeroClipboard.swf",
	            copy:function(){
	                var text =  $( "#"+$(this).data("cp")).text();
	                return text;
	            },afterCopy: function () {
	                _alert("复制成功");
	            }
	        });
	        //上一步
	        $("#"+div_id+" [name=\"back_btn\"]").click(function(){
	            $('#wechat_step1').show();
	            $('#wechat_step2_scan').hide();
	        });
	        $("#"+div_id).data("initevent","true");
	    },
	    
	    //微信支付第2步（添加朋友支付），绑定事件
	    weChatDeposit_2_addF:function() {
	        var div_id = "wechat_step2_addF";
	        if($("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        //复制按钮
	        $("#"+div_id+" [name=cp_btn]").zclip({
	            path:_prefixURL.plugins+"/zclip/swf/ZeroClipboard.swf",
	            copy:function(){
	                var text =  $( "#"+$(this).data("cp")).text();
	                return text;
	            },afterCopy: function () {
	                _alert("复制成功");
	            }
	        });
	
	        //时间下拉填充html
	        (function(){
	            var str ="";
	            var date = new Date();
	            for(var a = 0; a < 24 ; a++) {
	                if(a== date.getHours()) {
	                    str +="<option selected>"+(a<10?("0"+a):a)+"</option>" ;
	                } else {
	                    str +="<option>"+(a<10?("0"+a):a)+"</option>" ;
	                }
	            }
	            $("#"+div_id+" [name=\"hour\"]").html(str);
	            var mins = "";
	            for(var b = 0; b < 60; b++) {
	                if( b == date.getMinutes()) {
	                    mins +="<option selected>"+(b<10?("0"+b):b)+"</option>" ;
	                } else {
	                    mins +="<option>"+(b<10?("0"+b):b)+"</option>" ;
	                }
	            }
	            $("#"+div_id+"  [name=minutes]").html(mins);
	            //给日期控件赋上默认值
	            function getDateStr(date) {
	                return  date.getFullYear()+"-"+((date.getMonth()+1)>=10?(date.getMonth()+1):("0"+(date.getMonth()+1)))+"-"+(date.getDate()>=10?date.getDate():("0"+date.getDate()));
	            }
	            $("#"+div_id+" [name=date]").val(getDateStr(date));
	            $("#"+div_id+" [name=date]").datepicker({
	                dateFormat:'yy-mm-dd',
	                onSelect: function( startDate ) {}
	            }); //绑定输入框
	
	        })();
	        
	        //上一步
	        $("#"+div_id+" [name=\"back_btn\"]").click(function(){
	            $('#wechat_step1').show();
	            $('#wechat_step2_addF').hide();
	        });
	        
	        $("#"+div_id+" [name=submit]").click(function(){
	        	var userCode = $("#"+div_id+" [name=userCode]").val();
	        	if(userCode==null || userCode.trim()=='') {
	        		//_alert('存款微信账号不能为空！');
	        		//return;
	        	}
	        	var userName = $("#"+div_id+" [name=userName]").val();
	        	if($('#r_is_wechat_show').val()=='1' && (userName==null || userName.trim()=='')) {
	        		_alert('存款微信昵称不能为空！');
	        		return;
	        	}
	        	var payId = $("#"+div_id+" [name=wechat_payid]").val();
	        	var amount = $("#"+div_id+" [name=amount]").val();
	        	var date = $("#"+div_id+" [name=date]").val();
	        	var hour = $("#"+div_id+" [name=hour]").val();
	        	var minute = $("#"+div_id+" [name=minutes]").val();
//	            $.ajax({
//	                type: 'POST',
//	                url: '../member/recharge.html/weichatSubmit',
//	                data:{payid:payId,amount:amount,date:date+' '+hour+':'+minute+':00',userCode:userCode,userName:userName},
//	                dataType: 'json'
//	            }).done(function (data) {
//	                if( data.status == "200" ) {
//	                    _alert("提交成功", function() {
//	                    	location.href = "../member/deal.html?tab=2";
//	                    });
//	                } else {
//	                	_alert(data.description);
//	                }
//	            });
	        });
	        $("#"+div_id).data("initevent","true");
	    },
	    
	    //QQ钱包第一步，绑定事件
	    qqpayDeposit_1:function() {
	        var div_id = "qqpay_step1";
	        if( $("#"+div_id).data("initevent") == "true") {//已经绑定过的事件无需重复绑定
	            return;
	        }
	        function bind_event(div_id) {
	            //输入框格式校验
	            $("#"+div_id+" input").bind("blur",function(event) {
	                var v=parseFloat($(this).val());
	                if(!v||isNaN(v)){v='';}
	                $(this).val(v);
	            });
	            //下一步
	            $("#"+div_id+" [name=next_btn]").bind("click",function(){
	                var payId = $(this).data("payid");
	                var payUrl = $(this).data("payurl");
	                var returnType = $(this).data("returntype");
	                var block_name = "block_" + payId+"_"+returnType;
	                var payType = $(this).data("paytype");
	                var partSlt = "#"+div_id+" [name="+block_name+"]";
	                if($(this).data("ajax") == "true") {//禁止因网速过慢的表单重复提交
	                    return;
	                }
	                var amount = $.trim($(partSlt+" [name=\"amount\"]").val());
	                if("" == amount ){
	                    _alert("请输入金额");
	                    return;
	                }
	                if(isNaN(parseFloat(amount))) {
	                    _alert("请输入正确的金额");
	                    return;
	                }
	                if(!/^\d{0,20}(?:\.\d{1,2}|)$/.test(amount)) {
	                    _alert("金额必须大于1，且最多2位小数!");
	                    return;
	                }
	                
	                var pMin = $(this).data("min");
	                var pMax = $(this).data("max");
	                if(amount < pMin || amount > pMax) {
	                    _alert("金额必须大于"+pMin+"，且小于"+pMax+"!");
	                    return;
	                }
	                
	                if(returnType == 2) {//第三方微信返回页面
	                	init_event.wechatAlipaySubmit(7, payId, amount, payUrl);
	                	return;
	                } 
//	                $.ajax({
//	                    type: 'post',
//	                    url: '../member/recharge.html/thirdQqpay',
//	                    dataType: 'json',
//	                    beforeSend:function(){
//	                        $(partSlt+" [name=next_btn]").data("ajax","true");
//	                        $(partSlt+" [name=next_btn]").text("请稍后");
//	                    },
//	                    data:{
//	                    	payid: payId,
//	                    	payType: payType,
//	                    	amount: amount,
//	                    	baseUrl: document.getElementById("base_path").href
//	                    }
//	                }).done(function(results){
//	                    var data=results.data;                  
//	                    if(results.status=="200") {
//                      (function initdata(data) {
//                      	var div_id = "qqpay_step2_scan";
//                      	$("#"+div_id+" [name=amount]").text(data.amount);
//                          $("#"+div_id+" [name=orderId]").text(data.orderNo);
//                          if(data.needDown == '1'){
//                          	$("#"+div_id+" [id=showqrcode]").empty();
//                          	$("#"+div_id+" [id=showqrcode]").html('<img name="pay_code_img" src="'+ data.payUrl +'">');
//                              //$("#"+div_id+" [name=pay_code_img]").attr("src", data.payUrl);
//                              $("#"+div_id+" [id=showqrcode]").css('margin-left', '0px');
//                          }else{
//                          	$("#"+div_id+" [id=showqrcode]").empty().qrcode({
//                      			render : "canvas",
//                      			text : data.payUrl,
//                      			width : "180",
//                      			height : "180",
//                      			background : "#ffffff",
//                      			foreground : "#000000",
//                      			src: ""
//                      		});	
//                          }
//                      })(data);
//                      $("#qqpay_step2_scan").show();
//                      init_event.weChatDeposit_2_scan();
//	                        
//	                    $("#qqpay_step1").hide();
//	                } else {
//	                	_alert(results.description);
//	                }
                }).always(function(){
                    $(partSlt+" [name=next_btn]").data("ajax","false");
                    $(partSlt+" [name=next_btn]").text("下一步");
                });
	            //输入框格式校验
	            if($("#qqpay_step1 input").length > 0) {
	                function jy(event){
	                    var e = event || window.event || arguments.callee.caller.arguments[0];
	                    var keycode = e.keyCode;
	                    if((keycode < 48 && keycode != 8 && keycode != 0 && keycode != 13 && keycode != 9 && keycode != 46 ) || (keycode > 57 && keycode != 190 && keycode != 110 &&(keycode>105||keycode<96 ) ))
	                    {
	                        try{if(event.preventDefault){event.preventDefault();}else{event.returnValue = false;}}catch(e){}
	                        return false;
	                    }
	                }
	                $("#qqpay_step1 input").get(0).onkeydown = jy;
	            }
	        }
	        //返回账号列表
//	        $.ajax({
//	            type: 'post',
//	            dataType: 'json',
//	            url: '../member/recharge.html/getQqpayList'
//	        }).done(function(results) {
//		        try {
//		        	var data = results.data;
//		        	window.qqpay_step1_key = data;
//		            var lth = qqpay_step1_key.length;
//		            if(lth <= 0) {
//		            	$("#"+div_id).hide();
//		            	$("#no_qqpay").show();
//	                    return;
//		            }
//		            
//		            function getHtmlStr(payId,payType,payName,payDesc,payMin,payMax,returnType,payUrl) {
//		            	var html = "<div name=\"block_"+payId+"_"+returnType+"\" class=\"wechat-top\"><div class=\"wechat-tit text-center\">"+payName+"</div>";
//		            	html += "<p class=\"text-center\">"+payDesc+"</p>";
//		            	html += "<div class=\"wechat-recharge\"><span>充值金额：</span><input name=\"amount\" class=\"wechat-int\" maxlength=\"14\">";
//		            	html += "<a name=\"next_btn\" data-payid=\""+payId+"\" data-payurl=\""+payUrl+"\" data-returntype=\""+returnType+"\" data-paytype=\""+payType+"\" data-min=\""+payMin+"\" data-max=\""+payMax+"\" class=\"btn fr\">下一步</a>"
//		            	html += "</div></div>";
//		            	return html;
//		            }
//		            $("#"+div_id+" [name=step_one_list]").empty();
//		            for(var i=0;i<lth;i++) {
//		                var o = qqpay_step1_key[i];
//	                	$("#"+div_id+" [name=step_one_list]").append(getHtmlStr(o.id,o.payType,o.payName,o.payDesc,o.payMin,o.payMax,o.returnType,o.payUrl));
//		            }
//		            bind_event("qqpay_step1");
//		        } catch(e) {
//		            $("#"+div_id).hide();
//		            $("#no_wechat").show();
//		        }
//	        });
//	        
//	        $("#"+div_id).data("initevent","true");//标志已经绑定过事件
	    },
	    
	    //支付宝 支付第一步
	    baoDeposit_1:function() {
	        var div_id = "bao_step1";
	        if($("#"+div_id).data("initevent") == "true") {//已经绑定过的事件无需重复绑定
	            return;
	        }
	        function bind_event(div_id) {
	            //输入框格式校验
	            $("#"+div_id+" input").bind("blur",function(event) {
	                var v=parseFloat($(this).val());
	                if(!v||isNaN(v)){v='';}
	                $(this).val(v);
	            });
	            //下一步
	            $("#"+div_id+" [name=next_btn]").bind("click",function(){
	                var payId = $(this).data("payid");
	                var payUrl = $(this).data("payurl");
	                var payType = $(this).data("paytype");
	                var returnType = $(this).data("returntype");
	                var block_name = "block_"+payId+"_"+returnType;
	                var partSlt = "#"+div_id+" [name="+block_name+"]";
	                if($(this).data("ajax") == "true") {//禁止因网速过慢的表单重复提交
	                    return;
	                }
	                var amount = $.trim($(partSlt+" [name=\"amount\"]").val());
	                if("" == amount ){
	                    _alert("请输入金额");
	                    return;
	                }
	                if(isNaN(parseFloat(amount))) {
	                    _alert("请输入正确的金额");
	                    return;
	                }
	                if(!/^\d{0,20}(?:\.\d{1,2}|)$/.test(amount)) {
	                    _alert("金额必须大于1，且最多2位小数!");
	                    return;
	                }
	                var pMin = $(this).data("paymin");
	                var pMax = $(this).data("paymax");
	                if(amount < pMin || amount > pMax) {
	                    _alert("金额必须大于"+pMin+"，且小于"+pMax+"!");
	                    return;
	                }
	                
	                if(returnType == 2) {//第三方支付宝返回页面
	                	init_event.wechatAlipaySubmit(2, payId, amount, payUrl);
	                	return;
	                }
//	                $.ajax({
//	                    type: 'post',
//	                    url: payType == 1 ? '../member/recharge.html/thirdAlipay' : '../member/recharge.html/alipay',
//	                    dataType: 'json',
//	                    beforeSend:function(){
//	                        $(partSlt+" [name=next_btn]").data("ajax","true");
//	                        $(partSlt+" [name=next_btn]").text("请稍后");
//	                    },
//	                    data:{
//	                        payid: payId,
//	                        payType: payType,
//	                        amount: amount,
//	                        baseUrl: document.getElementById("base_path").href
//	                    }
//	                }).done(function(results){
//	                    var data=results.data;
//	                    if(results.status=="200") {
//	                        if(payType == "1") {
//		                        (function initdata(data){
//		                            var div_id = "bao_step2_scan";
//		                            $("#"+div_id+" [name=orderId]").text( data.orderNo);
//		                            $("#"+div_id+" [name=amount]").text( data.amount);
//		                            if(data.needDown == '1'){
//		                            	$("#"+div_id+" [id=showqrcode]").empty();
//		                            	$("#"+div_id+" [id=showqrcode]").html('<img name="pay_code_img" src="'+ data.payUrl +'">');
//		                                //$("#"+div_id+" [name=pay_code_img]").attr("src", data.payUrl);
//		                                $("#"+div_id+" [id=showqrcode]").css('margin-left', '0px');
//		                            }else{
//		                            	$("#"+div_id+" [id=showqrcode]").empty().qrcode({
//		                        			render : "canvas",
//		                        			text : data.payUrl,
//		                        			width : "180",
//		                        			height : "180",
//		                        			background : "#ffffff",
//		                        			foreground : "#000000",
//		                        			src: ""
//		                        		});	
//		                            }
//		                            $("#"+div_id).show();
//		                        })(data);
//		                        init_event.baoDeposit_2_scan();
//	                        } else if(payType == "5"){
//		                        (function initdata(data){
//		                            var div_id = "bao_step2_transfer";
//		                            $("#"+div_id+" #bao_2_a_name").text(data.name);
//		                            $("#"+div_id+" #bao_2_a_oid").text(data.code);
//		                            $("#"+div_id+" [name=amount]").val(data.amount);
//		                            $("#"+div_id+" [name=alipay_payid]").val(data.payId);
//		                            $("#"+div_id+" [name=bao_2_a_bank]").text(data.bank);
//		                            $("#"+div_id).show();
//		                        })(data);
//		                        init_event.baoDeposit_2_addF("bao_step2_transfer");
//	                        } else {
//		                        (function initdata(data){
//		                            var div_id = "bao_step2_addF";
//		                            $("#"+div_id+" #bao_2_a_name").text(data.name);
//		                            $("#"+div_id+" #bao_2_a_oid").text(data.code);
//		                            $("#"+div_id+" [name=amount]").val(data.amount);
//		                            $("#"+div_id+" [name=alipay_payid]").val(data.payId);
//		                            $("#"+div_id+" [name=pay_code_img]").attr("src", data.payUrl);
//		                            $("#"+div_id).show();
//		                        })(data);
//		                        init_event.baoDeposit_2_addF('bao_step2_addF');
//	                        }
//		                    $("#bao_step1").hide();
//	                    } else {
//	                    	_alert(results.description);
//	                    }
//	                }).always(function(){
//	                    $(partSlt+" [name=next_btn]").data("ajax","false");
//	                    $(partSlt+" [name=next_btn]").text("下一步");
//	                });
	            });
	            
	            //输入框格式校验
	            if($("#bao_step1 input").length > 0) {
	                function jy(event){
	                    var e = event || window.event || arguments.callee.caller.arguments[0];
	                    var keycode = e.keyCode;
	                    if((keycode < 48 && keycode != 8 && keycode != 0 && keycode != 13 && keycode != 9 && keycode != 46 ) || (keycode > 57 && keycode != 190 && keycode != 110 &&(keycode>105||keycode<96 ))) {
	                        try{if(event.preventDefault){event.preventDefault();}else{event.returnValue = false;}}catch(e){}
	                        return false;
	                    }
	                }
	                $("#bao_step1 input").get(0).onkeydown = jy;
	            }
	        }
	        
	        //返回账号列表
	        $.ajax({
	            type: 'post',
	            dataType: 'json',
	            url: '../member/recharge.html/getAliPayList'
	        }).done(function(results) {
	        	try {
	        		var data = results.data;
	        		if(data == null || data.length == 0) {
		                $("#"+div_id).hide();
		                $("#no_alipay").show();
		                return;
		            }
	        		
		        	window.bao_step1_key = data;
		            var lth = bao_step1_key.length ;
		            
		            function getHtmlStr(payId,payType,payName,payDesc,payMin,payMax,returnType,payUrl) {
		            	var html = "<div name=\"block_"+payId+"_"+returnType+"\" class=\"wechat-top\">";
		            	html += "<div class=\"wechat-tit text-center\">"+payName+"</div>";
		            	html += "<p class=\"text-center\">"+payDesc+"</p>";
		            	html += "<div class=\"wechat-recharge\"><span>充值金额：</span><input name=\"amount\" class=\"wechat-int\" maxlength=\"14\">";
		            	html += "<a name=\"next_btn\" data-payid=\""+payId+"\" data-payurl=\""+payUrl+"\" data-returntype=\""+returnType+"\" data-paytype=\""+payType+"\" data-paymin=\""+payMin+"\" data-paymax=\""+payMax+"\" class=\"btn fr\">下一步</a>";
		            	html += "</div></div>";
		            	
		            	return html;
		            }
		            $("#"+div_id+" [name=step_one_list]").empty();
		            for(var i=0;i<lth;i++) {
		                var o = bao_step1_key[i];
		                if(o.payType == 3) {
		                	var html = "<div class=\"wechat-top\"><div class=\"wechat-tit text-center\">扫描二维码添加好友，直接支付宝转账，请在加好友时备注您的会员账号</div>";
			            	html += "<p class=\"text-center ewm_tit\">支付宝名称：" + o.code;
			            	html += " 支付宝名称：" + o.name + "</p>";
			            	html += "<p class=\"text-center\"><img class=\"ewm_img\" src=\"" + o.payImg + "\"></p>";
			            	html += "<p class=\"text-center add_span\">※1. 请勿存入整数金额(如存 1000.32元 , 500.77元 )，以免延误财务查收。</p>";
			            	html += "<p class=\"text-center add_span\">※2. 转帐完成后请保留单据作为核对证明。</p>";
			            	html += "</div></div>";
			            	
		                	$("#"+div_id+" [name=step_one_list]").append(html);
		                } else {
		                	$("#"+div_id+" [name=step_one_list]").append(getHtmlStr(o.id,o.payType,o.payName,o.payDesc,o.payMin,o.payMax,o.returnType,o.payUrl));
		                }
		            }
		            bind_event("bao_step1");
		        } catch(e) {
		            $("#"+div_id).hide();
		            $("#no_alipay").show();
		        }
	        });
	        $("#"+div_id).data("initevent","true");//标志已经绑定过事件
	    },
	    
	    baoDeposit_2_scan:function() {
	        var div_id = "bao_step2_scan";
	        if($("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        //复制按钮
	        $("#"+div_id+" [name=cp_btn]").zclip({
	            path:_prefixURL.plugins+"/zclip/swf/ZeroClipboard.swf",
	            copy:function(){
	                var text =  $( "#"+$(this).data("cp")).text();
	                return text;
	            },afterCopy: function () {
	                _alert("复制成功");
	            }
	        });
	        //上一步
	        $("#"+div_id+" [name=\"back_btn\"]").click(function(){
	            $('#bao_step1').show();
	            $('#bao_step2_scan').hide();
	        });
	        $("#"+div_id).data("initevent","true");
	    },
	    
	    //支付宝 支付第2步
	    baoDeposit_2_addF:function(div_id) {
	        if( $("#"+div_id).data("initevent") == "true") {
	            return;
	        }
	        //复制按钮
	        $("#"+div_id+" [name=cp_btn]").zclip({
	            path:_prefixURL.plugins+"/zclip/swf/ZeroClipboard.swf",
	            copy:function(){
	                var text =  $( "#"+$(this).data("cp")).text();
	                return text;
	            },afterCopy: function () {
	                _alert("复制成功");
	            }
	        });
	        
	        //时间下拉填充html
	        (function(){
	            var str ="";
	            var date = new Date();
	            for(var a = 0; a < 24 ; a++) {
	                if(a== date.getHours()) {
	                    str +="<option selected>"+(a<10?("0"+a):a)+"</option>" ;
	                } else {
	                    str +="<option>"+(a<10?("0"+a):a)+"</option>" ;
	                }
	            }
	            $("#"+div_id+" [name=\"hour\"]").html(str);
	            var mins = "";
	            for(var b = 0; b < 60; b++) {
	                if(b == date.getMinutes()) {
	                    mins +="<option selected>"+(b<10?("0"+b):b)+"</option>" ;
	                } else {
	                    mins +="<option>"+(b<10?("0"+b):b)+"</option>" ;
	                }
	            }
	            $("#"+div_id+"  [name=minutes]").html(mins);
	            //给日期控件赋上默认值
	            function getDateStr(date) {
	                return  date.getFullYear()+"-"+((date.getMonth()+1)>=10?(date.getMonth()+1):("0"+(date.getMonth()+1)))+"-"+(date.getDate()>=10?date.getDate():("0"+date.getDate()));
	            }
	            $("#"+div_id+" [name=date]").val(getDateStr(date));
	            $("#"+div_id+" [name=date]").datepicker({
	                dateFormat:'yy-mm-dd',
	                onSelect: function( startDate ) {}
	            }); //绑定输入框
	        })();
	        //上一步
	        $("#"+div_id+" [name=\"back_btn\"]").click(function(){
	            $('#bao_step1').show();
	            $('#bao_step2_addF').hide();
	            $('#bao_step2_transfer').hide();
	        });
	        $("#"+div_id+" [name=submit]").click(function(){
	        	var userCode = $("#"+div_id+" [name=userCode]").val();
	        	if(userCode==null || userCode.trim()=='') {
	        		//_alert('存款支付宝账号不能为空！');
	        		//return;
	        	}
	        	var userName = $("#"+div_id+" [name=userName]").val();
	        	if($('#r_is_alipay_show').val()==1 && (userName==null || userName.trim()=='')) {
	        		_alert('存款支付宝昵称不能为空！');
	        		return;
	        	}
	        	var amount = $("#"+div_id+" [name=amount]").val();
	        	var payId = $("#"+div_id+" [name=alipay_payid]").val();
	        	var date = $("#"+div_id+" [name=date]").val();
	        	var hour = $("#"+div_id+" [name=hour]").val();
	        	var minute = $("#"+div_id+" [name=minutes]").val();
	            $.ajax({
	                type: 'POST',
	                url: '../member/recharge.html/alipaySubmit',
	                data:{payid:payId,amount:amount,date:date+' '+hour+':'+minute+':00',userCode:userCode,userName:userName},
	                dataType: 'json'
	            }).done(function (results){
	                if(results.status=="200"){
	                    _alert("提交成功", function() {
	                    	location.href="../member/deal.html?tab=2";
	                    });
	                } else {
	                	_alert(results.description);
	                }
	            });
	        });
	        $("#"+div_id).data("initevent","true");
	    }
    };

	$(function(){
	    init_event.page();
	    $('.pay-top_1 a:first-child').trigger("click");
	    $("#wechat_step1 input , #bao_step1 input").bind("click",function() {
	        if(typeof (_canclick)!="undefined" && _canclick === false) {
	            try{if(event.preventDefault){event.preventDefault();}else{event.returnValue = false;}}catch(e){}
	        }
	    }).bind("focus",function() {
	        if(typeof (_canclick)!="undefined" && _canclick === false) {
	            try{if(event.preventDefault){event.preventDefault();}else{event.returnValue = false;}}catch(e){}
	        }
	    });
	    
	    $("#menu").find("li").on("click",function(){
	    	var _href=$(this).attr("href");
	    	if($(this).attr("id")=='customerService') {
	    		window.open(_href);
	    	} else {
	    		location.href=document.getElementById('base_path').href+_href;
	    	}
	    });
	});
