$(function() {
	//获取验证码
	$('#registerYzmImg1').attr('src', CONFIG.BASEURL + 'baseData_checkCode?t=' + new Date().getTime());

});

function openHyzx(module) {
	if(typeof module == 'undefined') {
		module = '';
	}
	if(typeof $.cookie("uid") == 'undefined' || typeof $.cookie("token") == 'undefined') {
		layer.msg("请先登录");
		if($("#loginAccount1").length > 0) {
			$("#loginAccount1").focus();
			return;
		}
		window.location.href = "../index.html";
		return;
	}
	windowOpen('../member/index.html?module=' + module, '会员中心', 1250, 834);
}

function openGcdt(module) {
	if(typeof module == 'undefined') {
		module = '';
	}
	windowOpenBlank('../ssc/index.html?module=' + module);

}

function goZst(url) {
	window.open('../ssc/' + url + '.html?type=1');
}

function openZstIndex(module) {
	if(typeof module == 'undefined') {
		module = '';
	}
	windowOpenBlank('../ssc/index.html?module=' + module);

}
//更换验证码
function refreshYzm(obj) {
	$(obj).attr("src", CONFIG.BASEURL + "baseData_checkCode?t=" + new Date().getTime());
}

function showLoading() {
	layer.load(2, {
		shade: [0.1, '#000'] //0.1透明度的白色背景
	})
}

function hideLoading() {
	layer.closeAll();
}

function showKhxy() {
	console.log($("#template_khxy").contents().find("body").html());
	//自定页
	layer.open({
		type: 1,
		skin: 'layui-layer-popup', //样式类名
		closeBtn: 2, //显示关闭按钮
		anim: 2,
		title: '开户协议',
		shadeClose: true, //开启遮罩关闭
		content: $("#template_khxy").html()
	});
}

function registerLogin() {
	var loginAccount = $.trim($("#registerLoginAccount").val());
	var loginPassword = $.trim($("#registerLoginPassword").val());
	var bool = $('input[type=checkbox]').is(':checked');
	if(!loginAccount) {
		layer.msg("请输入用户名");
		return;
	}
	if(!loginPassword) {
		layer.msg("请输入密码");
		return;
	}
	var mw = baseObj.mw({
		loginName: loginAccount,
		password: $.md5(loginPassword).toUpperCase(),
		machineType: 3
	});
	ajaxRequest({
		url: CONFIG.BASEURL + "user_login",
		data: {
			mw: mw
		},
		success: function(json) {
			if(json.code == 200) {
				layer.msg("登录成功");
				if(bool) {
					$.cookie("login", loginAccount, { path: "/" });
					$.cookie("pwd", loginPassword, { path: "/" });
				} else {
					$.cookie("login", '', { path: "/" });
					$.cookie("pwd", '', { path: "/" });
				}
				var json = json.data.obj;
				$.cookie('user', JSON.stringify(json), { path: "/" });
				$.cookie("u", json.u, { path: "/" });
				$.cookie("loginName", json.loginName, { path: "/" });
				$.cookie("uid", json.uid, { path: "/" });
				$.cookie("type", json.userGrade, { path: "/" });
				$('#header_user_login').css('display','none');
				$('#header_user').css('display','block');
				setTimeout(function(){
					location.href = '../index.html';
				},1000)
				
			} else {
				alert('登录失败');
				location.reload();
			}
		}
	});
}

function indexLogin() {
	var loginAccount = $.trim($("#registerLoginAccount").val());
	var loginPassword = $.trim($("#registerLoginPassword").val());
	var bool = $('input[type=checkbox]').is(':checked');
	if(!loginAccount) {
		layer.msg("请输入用户名");
		return;
	}
	if(!loginPassword) {
		layer.msg("请输入密码");
		return;
	}
	var mw = baseObj.mw({
		loginName: loginAccount,
		password: $.md5(loginPassword).toUpperCase(),
		machineType: 3
	});
	ajaxRequest({
		url: CONFIG.BASEURL + "user_login",
		data: {
			mw: mw
		},
		success: function(json) {
			if(json.code == 200) {
				layer.msg("登录成功");
				if(bool) {
					$.cookie("login", loginAccount, { path: "/" });
					$.cookie("pwd", loginPassword, { path: "/" });
				} else {
					$.cookie("login", '', { path: "/" });
					$.cookie("pwd", '', { path: "/" });
				}
				var json = json.data.obj;
				$.cookie('user', JSON.stringify(json), { path: "/" });
				$.cookie("u", json.u, { path: "/" });
				$.cookie("loginName", json.loginName, { path: "/" });
				$.cookie("uid", json.uid, { path: "/" });
				setTimeout(function(){
					location.reload();
				},500)
				
			} else {
				alert('登录失败');
				location.reload();
			}
		}
	});
}


function ajaxRegister() {
	var account = $("#registerAccount").val().trim();
	var password = $("#registerPassword").val().trim();
	var confirm = $("#confirmPassword").val().trim();
	var yzm = $("#registerYzm").val().trim();
	//	var eamil = $("#registerEmail").val().trim();
	var id = $("#registerId").val().trim();
	console.log(account)
	if(!account) {
		layer.msg("请输入用户名");
		return;
	}

	//        var myreg = /^((1[0-9]{2})+\d{8})$/;
	//        if(!myreg.test(account)) {
	//            layer.msg('请输入有效的手机号码！');
	//            return;
	//        }

	if(!password) {
		layer.msg("请输入密码");
		return;
	}
	if(!confirm) {
		layer.msg("请输入确认密码");
		return;
	}
	//	if(!eamil) {
	//		layer.msg("请输入邮箱");
	//		return;
	//	}
	//	var eamilreg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var accountreg = /^[a-zA-Z0-9]{4,16}$/;
	var passwordreg = /^[a-zA-Z0-9]{6,12}$/;
	//	if(!eamilreg.test(eamil)) {
	//		layer.msg('请输入有效的邮箱！');
	//		return;
	//	}
	if(!accountreg.test(account)) {
		layer.msg('用户名须为4-16个字母或数字！');
		return;
	}
	if(!passwordreg.test(password)) {
		layer.msg('密码须为6-12个同时包含字母或数字的组合！');
		return;
	}
	//        if (!password.match(/^[0-9a-zA-Z]{6,12}$/)) {
	//            layer.msg("请输入6-12位字母、数字的密码");
	//            return;
	//        }
	if(confirm != password) {
		layer.msg("两次输入的密码不一致！");
		return;
	}
	if(!yzm) {
		layer.msg("请输入验证码");
		return;
	}
	var code = yzm.trim();
	var map = {};
	map['loginName'] = account;
	//	map['email'] = eamil;
	map['password'] = password;
	map['inpcode'] = code;
	var mw = baseObj.mw(map);
	console.log(mw);
	$.ajax({
		type: "POST",
		url: CONFIG.BASEURL + "user_pcreg",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		dataType: 'json',
		data: { mw: mw },
		success: function(json) {
			if(json.code == 200) {
				layer.msg(json.msg);
				var json = json.data.obj;
				$.cookie("u", json.u, { path: "/" });
				$.cookie("user", JSON.stringify(json), { path: "/" });
				$.cookie("eamil", json.eamil, { path: "/" });
				$.cookie("loginName", json.loginName, { path: "/" });
				$.cookie("uid", json.uid, { path: "/" });
				setTimeout(function() {
					window.location.href = "login.html";
				}, 500);
			} else {
				layer.msg(json.msg);
				//                location.reload();
			}
		}
	});
}

function showLoading() {
	layer.load(2, {
		shade: [0.1, '#000'] //0.1透明度的白色背景
	})
}

function hideLoading() {
	layer.closeAll();
}
$(window).resize(function() {
	ate();
});

$(function() {
	ate();
	$(".alert_log_col h5 i").click(function() {
		$(".two2").fadeOut();
	});
	autobox(".Customerservice", 1, 1180, 0);
	tabs_cg(".Resultt .latyout .tabs_ce ul li", "", "hover", "acti", "", "");
	click_addname(".Resultt .latyout .wrap_select a", "acti", "click");
	$('.reg_rt h5 span').click(function() {
		$('.two2').fadeIn();
	})
});

function ate() {
	var hei = $(window).height();
	$(".back").css("height", hei - 27 + "px");
}

function login1() {
	var loginAccount = $.trim($("#loginAccount1").val());
	var loginPassword = $.trim($("#loginPassword1").val());
	var yzm = $.trim($("#loginYzm1").val());

	if(!loginAccount) {
		layer.msg("请输入账号");
		return;
	}
	if(!loginPassword) {
		layer.msg("请输入密码");
		return;
	}
	//        if (!yzm) {
	//            layer.msg("请输入验证码");
	//            return;
	//        }

	ajaxRequest({
		url: CONFIG.BASEURL+"user_reg",
		data: {
			yzm: yzm,
			account: loginAccount,
			password: $.md5(loginPassword).toUpperCase()
		},
		beforeSend: function() {
			layer.load(2, {
				shade: [0.1, '#000'] //0.1透明度的白色背景
			})
		},
		success: function(json) {
			var json = eval('(' + json + ")");
			layer.closeAll();
			if(json.code == 200) {
				location.reload();
			} else {
				layer.msg(json.msg);
			}
		}
	});
}