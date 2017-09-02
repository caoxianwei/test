var meObj={
	me:function(pageType){
		if(move.user.u!=null){
			$('#loginbtn').hide();
			$('#u').text(move.user.phone);
			$('#head-img').attr("src",move.user.logo);
			var map = {};
			map['u'] =move.user.u;
			var mw=baseObj.mw(map);
			$.ajax({
			    type: "POST",
			    url:move.money,
			    dataType:'json',
			    data:{
			    	mw:mw
			    },  
			    success: function(ret){
			    	var code=ret.code;
			    	if(code=='200'){
			    		var data=ret.data;
			    		var money=data.money;
			    		var drawMoney=data.drawMoney;
			    		var userBalance=data.userBalance;
			    		var logo=data.logo;
			    		if(money!=''){
			    			$('#yue').text(money);
			    			store.set('money',money);
			    		}
			    		if(drawMoney!=''){
			    			$('#tikuan').text(drawMoney);
			    		}
			    		if(userBalance!=''){
			    			$('#shuying').text(userBalance);
			    		}
			    		var head=$('#head-img').attr('src');
			    		if(head!=logo){
			    			$('#head-img').attr('src',logo);
			    			var user=store.get('user');
			    			user.logo=logo;
			    			store.set('user',user);
			    		}
			    	}
			    },
		        error: function (jqXHR, textStatus, errorThrown) {
		        }
			});
		}else{
			$('#u').hide();
			$('#loginbtn').show();
            baseObj.openLogin();
		};
        var winHeight = window.innerHeight;

        window.addEventListener('resize', function(event){
            winHeight = window.innerHeight;
            $('.main-content').css('margin-bottom',window.screen.height-winHeight);
        });
        $('.main-content').css('margin-bottom',window.screen.height-winHeight);
	},
	logout:function(){//登出
		if(move.user!=null){
			var map = {};
			map['u'] =move.user.u;
			var mw=baseObj.mw(map);
			$.ajax({
			    type: "POST",
			    url:move.logout,
			    dataType:'json',
			    data:{
			    	mw:mw
			    },  
			    success: function(ret){
			    	var code=ret.error_no;
			    	if(code=='200'){
			    		user.clear();
			    	}else{
			    		user.clear();
			    	}
			    	baseObj.openIndex();
			    },
		        error: function (jqXHR, textStatus, errorThrown) {
		        	user.clear();
		        	baseObj.openIndex();
		        }
			});
		}else{
			user.clear();
			baseObj.openIndex();
		}
	},
	rechargeDetail:function(isReset){
		if(isReset){
			move.pageIndex=0;
		}
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var mask=move.createLoading();
		mask.show();
		var map = {};
		map['u'] =move.user.u;
		map['pageIndex'] =move.pageIndex;
		var mw=baseObj.mw(map);
		$.ajax({
			type: "POST",
			url:move.rechargeDetail,
			dataType:'json',
			data:{
				mw:mw
			},  
			success: function(ret){
				mask.close();
				var code=ret.code;
				if(code=='200'){
					var result=ret.data;
					var items=result.items;
					var length=items.length;
					if(length>0){
						var html='';
						for (var i = 0; i < length; i++) {
							var obj=items[i];
							var title=obj.title;
							var money=obj.money;
							var date=obj.createDate;
							var status=obj.status;
							var statusTitle="";
							var statusCss="";
							if(status=='0'){
								statusTitle="充值中";
								statusCss="colour-yellow";
							}else if(status=='1'){
								statusTitle="充值成功";
								statusCss="colour-green";
							}else if(status=='2'){
								statusTitle="充值失效";
								statusCss="colour-red";
							}
							html=html+'<li class="recharge-cell">';
							html=html+'<div class="title">'+date+'</div><div class="introduce"><span class="paytype">'+title+'</span><span class="paysatatus '+statusCss+'">'+statusTitle+'</span></div>';
							html=html+'<div class="price-box">'+money+'元</div></li>';
						}
						if(isReset){
							$('.not-data').hide();
							$('#content').show();
	    					$("#dataList").html(html);
	    					mui('#content').pullRefresh().refresh(true);
	    				}else{
	    					$("#dataList").append(html);
	    				}
						move.pageIndex++;
	    				mui('#content').pullRefresh().endPullupToRefresh();
					}else{
						if(move.pageIndex==0){
							$('.not-data').show();
							$('#content').hide();
							mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}else{
	    					mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}
					}
				}else{
					if(move.pageIndex==0){
						$('.not-data').show();
						$('#content').hide();
						mui('#content').pullRefresh().endPullupToRefresh(true);
    				}else{
    					mui('#content').pullRefresh().endPullupToRefresh(true);
    				}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				mask.close();
			}
		});
	},
	cashList:function(isReset){
		if(isReset){
			move.pageIndex=0;
		}
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var mask=move.createLoading();
		mask.show();
		var map = {};
		map['u'] =move.user.u;
		map['pageIndex'] =move.pageIndex;
		var mw=baseObj.mw(map);
		$.ajax({
			type: "POST",
			url:move.cashList,
			dataType:'json',
			data:{
				mw:mw
			},  
			success: function(ret){
				mask.close();
				var code=ret.code;
				if(code=='200'){
					var result=ret.data;
					var items=result.items;
					var length=items.length;
					if(length>0){
						var html='';
						for (var i = 0; i < length; i++) {
							var obj=items[i];
							var title=obj.title;
							var money=obj.cashMoney;
							var date=obj.createTime;
							var status=obj.auditStatus;
							var statusTitle="";
							var statusCss="";
							if(status=='0'){
								statusTitle="审核中";
								statusCss="colour-yellow";
							}else if(status=='1'){
								statusTitle="通过";
								statusCss="colour-green";
							}else if(status=='2'){
								statusTitle="拒绝";
								statusCss="colour-red";
							}
							html=html+'<li class="recharge-cell">';
							html=html+'<div class="title">'+date+'</div><div class="introduce"><span class="paysatatus '+statusCss+'">'+statusTitle+'</span></div>';
							html=html+'<div class="price-box">'+money+'元</div></li>';
						}
						if(isReset){
							$('.not-data').hide();
							$('#content').show();
	    					$("#dataList").html(html);
	    					mui('#content').pullRefresh().refresh(true);
	    				}else{
	    					$("#dataList").append(html);
	    				}
						move.pageIndex++;
	    				mui('#content').pullRefresh().endPullupToRefresh();
					}else{
						if(move.pageIndex==0){
							$('.not-data').show();
							$('#content').hide();
							mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}else{
	    					mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}
					}
				}else{
					if(move.pageIndex==0){
						$('.not-data').show();
						$('#content').hide();
						mui('#content').pullRefresh().endPullupToRefresh(true);
    				}else{
    					mui('#content').pullRefresh().endPullupToRefresh(true);
    				}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				mask.close();
			}
		});
	},
    moneyList:function(isReset){
        if(isReset){
            move.pageIndex=0;
        }
        if(move.user.u==null){
            baseObj.openLogin();
            return;
        }
        var mask=move.createLoading();
        mask.show();
        var map = {};
        map['u'] =move.user.u;
        map['pageIndex'] =move.pageIndex;
        var mw=baseObj.mw(map);
        $.ajax({
            type: "POST",
            url:move.moneyList,
            dataType:'json',
            data:{
                mw:mw
            },
            success: function(ret){
                mask.close();
                var code=ret.code;
                if(code=='200'){
                    var result=ret.data;
                    var items=result.items;
                    var length=items.length;
                    if(length>0){
                        var html='';
                        for (var i = 0; i < length; i++) {
                            var obj=items[i];
                            var tradeType=obj.tradeType;//交易类型
                            var cashType=obj.cashType;//支付类型
                            var time=obj.time;//交易时间
                            var changeMoney=obj.changeMoney;//交易金额
                            var balance=obj.balance;//余额
                            var remark=obj.remark;//备注
							if(!remark){
                                remark = '无';
							}
							html +='<li class="recharge-cell">'+
                                '<div><span>借贷类型</span><span>'+tradeType+'</span></div>'+
                                '<div><span>交易类型</span><span>'+cashType+'</span></div>'+
                                '<div><span>交易金额</span><span class="money-color">'+changeMoney+'</span></div>'+
                                '<div><span>资金金额</span><span class="money-color">'+balance+'</span></div>'+
                                '<div><span>交易时间</span><span>'+time+'</span></div>'+
                                '<div><span>备注</span><span class="remarks">'+remark+'</span></div>'+
                                '</li>';
                        }
                        if(isReset){
                            $('.not-data').hide();
                            $('#content').show();
                            $("#dataList").html(html);
                            mui('#content').pullRefresh().refresh(true);
                        }else{
                            $("#dataList").append(html);
                        }
                        move.pageIndex++;
                        mui('#content').pullRefresh().endPullupToRefresh();
                    }else{
                        if(move.pageIndex==0){
                            $('.not-data').show();
                            $('#content').hide();
                            mui('#content').pullRefresh().endPullupToRefresh(true);
                        }else{
                            mui('#content').pullRefresh().endPullupToRefresh(true);
                        }
                    }
                }else{
                    if(move.pageIndex==0){
                        $('.not-data').show();
                        $('#content').hide();
                        mui('#content').pullRefresh().endPullupToRefresh(true);
                    }else{
                        mui('#content').pullRefresh().endPullupToRefresh(true);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.close();
            }
        });
    },
	touzhuList:function(isReset){
		if(isReset){
			move.pageIndex=0;
		}
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var mask=move.createLoading();
		mask.show();
		var map = {};
		map['u'] =move.user.u;
		map['pageIndex'] =move.pageIndex;
		var mw=baseObj.mw(map);
		$.ajax({
			type: "POST",
			url:move.betList,
			dataType:'json',
			data:{
				mw:mw
			},  
			success: function(ret){
				mask.close();
				var code=ret.code;
				if(code=='200'){
					var result=ret.data;
					var items=result.items;
					var length=items.length;
					if(length>0){
						var html='';
						for (var i = 0; i < length; i++) {
							var obj=items[i];
							var title=obj.gameName;
							var sessionNo=obj.sessionNo;//期号
							var betTime=obj.betTime;//投注时间
							var room=obj.room;//房间号
							var playName=obj.playName;//玩法
							var betRate=obj.betRate;//倍数
							var betName=obj.betName;//小玩法
							var betPoint=obj.betPoint;//投注数
							var status=obj.winStatus;//中奖状态
							var winCash=obj.winCash;//中奖金额
							
							title=title+" "+sessionNo+"期";
							var subtitle=betTime+" "+room+" "+playName+" @"+betRate;
							
							var statusTitle="";
							var statusCss="";
							if(status=='0'){
								statusTitle="(未开奖)";
								statusCss="colour-yellow";
							}else if(status=='1'){
								statusTitle="(中奖)";
								statusCss="colour-green";
							}else if(status=='2'){
								statusTitle="(未中奖)";
								statusCss="colour-red";
							}else if(status=='3'){
								statusTitle="(和)";
								statusCss="";
							}
							html=html+'<li class="recharge-cell">';
							html=html+'<div class="title">'+title+'</div><div class="subtitle">'+subtitle+'</div><div class="introduce"><span class="xtitle">'+betName+'</span> <span class="'+statusCss+'">'+statusTitle+'</span></div>';
							html=html+'<div class="price-box colour-red">投注：'+betPoint+'</div></li>';
						}
						if(isReset){
							$('.not-data').hide();
							$('#content').show();
	    					$("#dataList").html(html);
	    					mui('#content').pullRefresh().refresh(true);
	    				}else{
	    					$("#dataList").append(html);
	    				}
						move.pageIndex++;
	    				mui('#content').pullRefresh().endPullupToRefresh();
					}else{
						if(move.pageIndex==0){
							$('.not-data').show();
							$('#content').hide();
							mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}else{
	    					mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}
					}
				}else{
					if(move.pageIndex==0){
						$('.not-data').show();
						$('#content').hide();
						mui('#content').pullRefresh().endPullupToRefresh(true);
    				}else{
    					mui('#content').pullRefresh().endPullupToRefresh(true);
    				}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				mask.close();
			}
		});
	},
	zhongjiangList:function(isReset){
		if(isReset){
			move.pageIndex=0;
		}
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var mask=move.createLoading();
		mask.show();
		var map = {};
		map['u'] =move.user.u;
		map['pageIndex'] =move.pageIndex;
		map['status'] ='1';
		var mw=baseObj.mw(map);
		$.ajax({
			type: "POST",
			url:move.betList,
			dataType:'json',
			data:{
				mw:mw
			},  
			success: function(ret){
				mask.close();
				var code=ret.code;
				if(code=='200'){
					var result=ret.data;
					var items=result.items;
					var length=items.length;
					if(length>0){
						var html='';
						for (var i = 0; i < length; i++) {
							var obj=items[i];
							var title=obj.gameName;
							var sessionNo=obj.sessionNo;//期号
							var betTime=obj.betTime;//投注时间
							var room=obj.room;//房间号
							var playName=obj.playName;//玩法
							var betRate=obj.betRate;//倍数
							var betName=obj.betName;//小玩法
							var betPoint=obj.betPoint;//投注数
							var status=obj.winStatus;//中奖状态
							var winCash=obj.winCash;//中奖金额
							var payoff=obj.payoff;//收益
							if(typeof payoff =='undefined'){
								payoff=(parseFloat(winCash)-parseFloat(betPoint)).toFixed(2);
							}
							title=title+" "+sessionNo+"期";
							var subtitle=betTime+" "+room+" "+playName+" @"+betRate;
							
							html=html+'<li class="recharge-cell">';
							html=html+'<div class="title">'+title+'</div><div class="subtitle">'+subtitle+'</div><div class="introduce"><span class="xtitle">'+betName+'</span> 下注<span class="colour-red">'+betPoint+'元</span> 奖金<span class="colour-red">'+winCash+'元</span></div>';
							html=html+'<div class="price-box colour-red">'+payoff+'元</div></li>';
						}
						if(isReset){
							$('.not-data').hide();
							$('#content').show();
	    					$("#dataList").html(html);
	    					mui('#content').pullRefresh().refresh(true);
	    				}else{
	    					$("#dataList").append(html);
	    				}
						move.pageIndex++;
	    				mui('#content').pullRefresh().endPullupToRefresh();
					}else{
						if(move.pageIndex==0){
							$('.not-data').show();
							$('#content').hide();
							mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}else{
	    					mui('#content').pullRefresh().endPullupToRefresh(true);
	    				}
					}
				}else{
					if(move.pageIndex==0){
						$('.not-data').show();
						$('#content').hide();
						mui('#content').pullRefresh().endPullupToRefresh(true);
    				}else{
    					mui('#content').pullRefresh().endPullupToRefresh(true);
    				}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				mask.close();
			}
		});
	},
	changePwd:function(){
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var oldpwd=$.trim($('#oldpwd').val());
		var newpwd=$.trim($('#newpwd').val());
		var newpwd2=$.trim($('#newpwd2').val());
		if(oldpwd==''){
			mui.toast('请输入旧密码',{ duration:'long', type:'div' });
			return;
		}
		if(newpwd==''){
			mui.toast('请输入新密码',{ duration:'long', type:'div' });
			return;
		}
		if(newpwd2==''){
			mui.toast('请确认新密码',{ duration:'long', type:'div' });
			return;
		}
		if(newpwd!=newpwd2){
			mui.toast('两次新密码不一致',{ duration:'long', type:'div' });
			return;
		}
		var btnArray = ['确定', '取消'];
		mui.confirm('确认修改密码？', document.title, btnArray, function(e) {
			if (e.index == 0) {
				var mask=move.createLoading();
				mask.show();
				var map = {};
				map['u'] =move.user.u;
				map['oldpassword'] =hex_md5(oldpwd).toUpperCase();
				map['newpassword'] =hex_md5(newpwd).toUpperCase();
				map['repassword'] =hex_md5(newpwd2).toUpperCase();
				var mw=baseObj.mw(map);
				$.ajax({
				    type: "POST",
				    url:move.changePwd,
				    dataType:'json',
				    data:{
				    	mw:mw
				    },  
				    success: function(ret){
				    	mask.close();
				    	var code=ret.error_no;
				    	var msg=ret.msg;
				    	if(code=='200'){
				    		$('#oldpwd').val('');
				    		$('#newpwd').val('');
				    		$('#newpwd2').val('');
				    		mui.toast('修改成功',{ duration:'long', type:'div' });
				    	}else{
				    		mui.toast(msg,{ duration:'long', type:'div' });
				    	}
				    },
			        error: function (jqXHR, textStatus, errorThrown) {
			        	mask.close();
			        }
				});
			}
		});
	},
	cashPassword:function(){
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var oldpwd=$.trim($('#oldpwd').val());
		var newpwd=$.trim($('#newpwd').val());
		var newpwd2=$.trim($('#newpwd2').val());
		if(oldpwd==''){
			mui.toast('请输入登录密码',{ duration:'long', type:'div' });
			return;
		}
		if(newpwd==''){
			mui.toast('请输入提现密码',{ duration:'long', type:'div' });
			return;
		}
		if(newpwd2==''){
			mui.toast('请确认提现密码',{ duration:'long', type:'div' });
			return;
		}
		if(newpwd!=newpwd2){
			mui.toast('两次提现密码不一致',{ duration:'long', type:'div' });
			return;
		}
		var btnArray = ['确定', '取消'];
		mui.confirm('确认设置提现密码？', document.title, btnArray, function(e) {
			if (e.index == 0) {
				var mask=move.createLoading();
				mask.show();
				var map = {};
				map['u'] =move.user.u;
				map['password'] =hex_md5(oldpwd).toUpperCase();
				map['cashPassword'] =hex_md5(newpwd).toUpperCase();
				map['recashPassword'] =hex_md5(newpwd2).toUpperCase();
				var mw=baseObj.mw(map);
				$.ajax({
				    type: "POST",
				    url:move.cashPassword,
				    dataType:'json',
				    data:{
				    	mw:mw
				    },  
				    success: function(ret){
				    	mask.close();
				    	var code=ret.error_no;
				    	var msg=ret.msg;
				    	if(code=='200'){
				    		$('#oldpwd').val('');
				    		$('#newpwd').val('');
				    		$('#newpwd2').val('');
				    		mui.toast('设置成功',{ duration:'long', type:'div' });
				    	}else{
				    		mui.toast(msg,{ duration:'long', type:'div' });
				    	}
				    },
			        error: function (jqXHR, textStatus, errorThrown) {
			        	mask.close();
			        }
				});
			}
		});
	},
	bankList:function(){
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		$.ajax({
		    type: "POST",
		    url:move.bankList,
		    dataType:'json',
		    data:{
		    },
		    success: function(ret){
		    	console.log(ret);
		    	var code=ret.code;
		    	if(code=='200'){
		    		var items=ret.data.items;
		    		var obj=items[0];
		    		var cashType=obj.cashType;
		    		$("#cashType").val(cashType);
		    		var subitems=obj.subitems;
		    		(function($, doc) {
		    			var timePicker = new mui.PopPicker({layer: 1}); 
		    			if(subitems){
		    				timePicker.setData(subitems);
		    				var serveTime = doc.getElementById('bank');
		    				serveTime.addEventListener('tap', function(event) {
		    					timePicker.show(function(subitems) {
		    						jQuery('#bank-data-val').val(subitems);
		    						jQuery('#bank-data-text').text(subitems);
		    					});
		    				}, false);
		    			}
		    		})(mui, document);
		    		$("#confirm").bind("click", function(){
		    			meObj.cashSubmit();
					});
		    		var money=store.get('money');
		    		if(typeof money!='undefined'&&money!=''){
		    			$('#userMoney').val('可提款金额：￥'+money);
		    		}
		    	}else{
		    	}
		    },
	        error: function (jqXHR, textStatus, errorThrown) {
	        }
		});
	},
	cityList:function(){
		$.ajax({
			type: "POST",
			url:move.cityList,
			dataType:'json',
			data:{
			},
			success: function(ret){
				var code=ret.code;
				if(code=='200'){
					var items=ret.data.items;
					(function($, doc) {
						var timePicker = new mui.PopPicker({layer: 3}); 
						var timeData=items;
						if(timeData){
							timePicker.setData(timeData);
							var serveTime = doc.getElementById('city');
							serveTime.addEventListener('tap', function(event) {
								timePicker.show(function(items) {
									jQuery('#city-data-val').val(items[2].value);
									jQuery('#city-data-text').text(items[0].text+items[1].text+items[2].text);
								});
							}, false);
						}
					})(mui, document);
				}else{
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},
	cashSubmit:function(){
		var bankName=$("#bank-data-text").text();
		var cashMoney=$("#cashMoney").val();
		var accountNo=$("#accountNo").val();
		var userName=$("#userName").val();
		var cashPassword=$("#cashPassword").val();
		var cid=$("#city-data-val").val();
		var type=$("#cashType").val();
		if(!bankName || bankName=='请选择'){
			mui.alert('请选择银行',document.title, function() {});
			return;
		}
		if(!cid){
			mui.alert('请选择城市',document.title, function() {});
			return;
		}
		if(!accountNo){
			mui.alert('请填写银行卡号',document.title, function() {});
			return;
		}
		if(!userName){
			mui.alert('请填写账户姓名',document.title, function() {});
			return;
		}
		if(!cashPassword){
			mui.alert('请填写提款密码',document.title, function() {});
			return;
		}
		if(!cashMoney){
			mui.alert('请填写提款金额',document.title, function() {});
			return;
		}else{
			if(parseFloat(cashMoney)>parseFloat(store.get('money'))){
				mui.alert('您的余额不足',document.title, function() {});
				return;
			}else if(parseFloat(cashMoney)<100){
				mui.alert('单笔最少100',document.title, function() {});
				return;
			}
			
		}
		var map = {};
		map['u']=move.user.u;
		map['bankName']=bankName;
		map['cashMoney']=cashMoney;
		map['accountNo']=accountNo;
		map['userName']=userName;
		map['cashPassword']=hex_md5(cashPassword).toUpperCase();
		map['cid']=cid;
		map['type']=type;
		var mw=baseObj.mw(map);
		var mask=move.createLoading();
		mask.show();
		$.ajax({
		    type: "POST",
		    url:move.cashSubmit,
		    dataType:'json',
		    data:{
		    	mw:mw
		    },
		    success: function(ret){
		    	mask.close();
		    	var code=ret.code;
		    	var msg=ret.msg;
		    	if(code=='200'){
		    		mui.alert('提现成功！',document.title, function() {
		    			baseObj.openView('wallet.html');
		    		});
		    	}else{
		    		mui.alert(msg,document.title, function() {
		    			//baseObj.openView('wallet.html');
		    		});
		    	}
		    },
	        error: function (jqXHR, textStatus, errorThrown) {
	        	mask.close();
	        }
		});
	},
	recharge:function(){
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var paytype=$('#paytype').val();
		var payval=$('#payval').val();
		if(paytype==''){
			mui.alert('请选择支付类型',document.title, function() {});
			return;
		}
		if(payval==''){
			mui.alert('请选择充值金额',document.title, function() {});
			return;
		}
		var map = {};
		map['u']=move.user.u;
		map['rid']=payval;
		map['payType']=paytype;
		var mw=baseObj.mw(map);
		var mask=move.createLoading();
		mask.show();
		$.ajax({
		    type: "POST",
		    url:move.recharge,
		    dataType:'json',
		    data:{
		    	mw:mw
		    },
		    success: function(ret){
		    	var code=ret.code;
		    	var msg=ret.msg;
		    	if(code=='200'){
		    		var data=ret.data;
		    		var obj=data.bxsPayObj;
		    		var url=obj.payUrl;
		    		window.location.href=url; 
		    		mask.close();
		    	}else{
		    		mask.close();
		    		mui.alert(msg,document.title, function() {});
		    	}
		    },
	        error: function (jqXHR, textStatus, errorThrown) {
	        	mask.close();
	        }
		});
	},
	pay:function(){
		$.ajax({
		    type: "POST",
		    url:move.pay,
		    dataType:'json',
		    data:{},
		    success: function(ret){
		    	console.log(ret);
		    	var html = '';
		    	for(var i = 0; i < ret.data.items.length; i++){
		    		var name = ret.data.items[i].name;
		    		var type = -1;
		    		var imgSrc = '';
		    		if(name == '微信支付'){
                        type = 1;
                        imgSrc ='ico_wechat';
					} else if( name == '支付宝支付'){
		    			type = 0;
                        imgSrc ='ico_alipay';
					}
		    			html += '<li class="paytype-cell_1 border">';
						html += '<a href="chongzhiList.html?type='+type+'">';
						html += '<span class="ico payico">';
						html += '<img src="images/'+imgSrc+'.png">';
						html += '</span>';
						html += '<span class="lable icon mui-navigate-right" id="icon">'+name+'(<span class="red_1">线下充值</span>)</span>';
						html += '</a></li>'
		    	}
                $('.pay ul').html(html);
		    	
		    	
		    },
	        error: function (jqXHR, textStatus, errorThrown) {
	        }
		});
	},
	banklist:function(){
		$.ajax({
		    type: "POST",
		    url:move.banklist,
		    dataType:'json',
		    data:{},
		    success: function(ret){
		    	var code=ret.code;
		    	var msg=ret.msg;
		    	if(code=='200'){
		    		var data=ret.data;
		    		var items=data.items;
		    		store.set('banklist',items);
		    		var html='';
		    		for (var i=0;i<items.length;i++) {
		    			var obj=items[i];
		    			var bankName=obj.bankName;
		    			var no=obj.bankAccount;
		    			html=html+'<li class="mui-table-view-cell bank border">';
		    			html=html+'<a class="mui-navigate-right" href="javascript:baseObj.openView(\'chongzhi.html?id='+no+'\');">';
		    			html=html+bankName+'</a></li>';
					}
		    		$('#banklist ul').html(html);
		    	}else{
		    		mui.alert(msg,document.title, function() {
		    		});
		    	}
		    },
	        error: function (jqXHR, textStatus, errorThrown) {
	        }
		});
	},
	
	chongzhiInit:function(){
		var id=move.getParameter('id');
		var items=store.get('banklist');
		for (var i=0;i<items.length;i++) {
			var obj=items[i];
			var bankName=obj.bankName;
			var no=obj.bankAccount;
			var userName=obj.userName;
			var country=obj.country;
			if(no==id){
				$('#bank').text(bankName);
				$('#bankNo').text(no);
				$('#name').text(userName);
				$('#country').text(country);
			}
		}
		$("#btncz").bind("click", function(){
			meObj.offlineSubmit();
		});
		$("#btncz1").bind("click", function(){
			meObj.offlineSubmit();
		});
	},
	chongzhiList : function () {
        var type = move.getParameter('type');
        var mask=move.createLoading();
        var str = '';
        var name='';
        if(type == 0){
        	type = '支付宝支付';
        	name = '支付宝';
		}else if(type ==1){
        	type = '微信支付';
            name = '微信';
		}
		$(".mui-title span").html(name);
        mask.show();
		$.ajax({
			url : move.pay,
            dataType:'json',
			success: function (ret) {
                mask.close();
                var data = ret.data.items;
                // for(var i = 0 ; i < 3 ; i++) {
                //     data[0].path.push({url: "http://app.caicaike.com/upload/twocode/04fa8999e42a4a4eb5fd83e08510b71f.jpg"});
                // };
                for(var i = 0 ; i < data.length; i++){
                	var imgSrc =  '';
                    if (type == '微信支付') {
                        imgSrc = 'ico_wechat';
                    }else if(type == '支付宝支付'){
                        imgSrc = 'ico_alipay';
					}
					if(type == data[i].name) {
                    	console.log(data[i]);
                        for (var j = 0; j < data[i].ids.length; j++) {
                            str += '<li><label for="acc_'+i+'"><img src="images/'+imgSrc+'.png" align="center"> <span>'+data[i].name+'</span><input type="radio" name="pay-accout" id="acc_'+i+'" value="'+data[i].ids[j].payid+'"></label></li>';
                        };
                    };
				};
                $(".mui-table-view ul").html(str);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.close();
            }
		});
        $('#recharge').on('click',function(){
            location.href = 'recharge.html';
        });
    },
	offlineSubmit:function(){
		if(move.user.u==null){
			baseObj.openLogin();
			return;
		}
		var bank=$('#bank').text();
		var bankNo=$('#bankNo').text();
		var name=$('#name').text();
		var country=$('#country').text();
		if(bank==''){
			mui.alert('收款人银行有错，请刷新重试',document.title, function() {});
			return;
		}
		if(bankNo==''){
			mui.alert('收款人卡号有错，请刷新重试',document.title, function() {});
			return;
		}
		if(name==''){
			mui.alert('收款人姓名有错，请刷新重试',document.title, function() {});
			return;
		}
		if(country==''){
			mui.alert('收款人国籍有错，请刷新重试',document.title, function() {});
			return;
		}
		var bank2=$('#bank2').val();
		var bankNo2=$('#bankNo2').val();
		var name2=$('#name2').val();
		var money=$('#money').val();
		var depositType=$('#depositType').val();
		if(bank2==''){
			mui.alert('请输入汇款银行',document.title, function() {});
			return;
		}
		if(name2==''){
			mui.alert('请输入存款人姓名',document.title, function() {});
			return;
		}
		if(bankNo2==''){
			mui.alert('请输入存款人帐号',document.title, function() {});
			return;
		}
		if(money==''){
			mui.alert('请输入存款金额',document.title, function() {});
			return;
		}
		if(depositType==''){
			mui.alert('请选择存款类型',document.title, function() {});
			return;
		}
		
		var btnArray = ['确定', '取消'];
		mui.confirm('确认提交', document.title, btnArray, function(e) {
			if (e.index == 0) {
				var map = {};
				map['u']=move.user.u;
				map['receiveBankName']=bank;
				map['receiveBankAccount']=bankNo;
				map['receiveUserName']=name;
				map['receiveCountry']=country;
				map['depositorBankName']=bank2;
				map['depositorBankAccount']=bankNo2;
				map['depositorUserName']=name2;
				map['depositType']=depositType;
				map['money']=money;
				var mw=baseObj.mw(map);
				var mask=move.createLoading();
				mask.show();
				$.ajax({
				    type: "POST",
				    url:move.rechargeOfflineSubmit,
				    dataType:'json',
				    data:{
				    	mw:mw
				    },
				    success: function(ret){
				    	mask.close();
				    	var code=ret.code;
				    	var msg=ret.msg;
				    	if(code=='200'){
				    		mui.alert('提交成功',document.title, function(){});
				    		baseObj.openView('recharge.html');
				    	}else{
				    		mui.alert(msg,document.title, function() {});
				    	}
				    },
			        error: function (jqXHR, textStatus, errorThrown) {
			        	mask.close();
			        }
				});
			}
		});
	}
}

