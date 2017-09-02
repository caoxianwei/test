$.ajax({
	url: CONFIG.BASEURL + 'user_testAccount',
	type: 'get',
	dataType: 'json',
	success: function(json) {
		$('#demoAccount').val(json.data.loginName);
	}
});

function ajaxRegister1() {
	var account = $("#demoAccount").val();
	var password = $("#registerPassword").val();
	var confirm = $("#confirmPassword").val();
	var yzm = $("#registerYzm").val();
//	var eamil = $("#registerEmail").val().trim();
	var id = $("#registerId").val();
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
	if(confirm != password){
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
		url: CONFIG.BASEURL + "user_testreg",
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
				$.cookie("type", json.userGrade, { path: "/" });
				$.cookie("uid", json.uid, { path: "/" });
				setTimeout(function() {
					window.location.href = "../index.html";
				}, 500);
			} else {
				layer.msg(json.msg);
				//                location.reload();
			}
		}
	});
}