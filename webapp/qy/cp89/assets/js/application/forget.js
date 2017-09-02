//提交
function refer() {
	var code = $('#code').val();
	var question = $('#question').val();
	var answer = $('#answer').val();
	if(!code) {
		layer.msg('请输入会员帐号');
		return false;
	};
	if(!question) {
		layer.msg('请输入密保问题');
		return false;
	};
	if(!answer) {
		layer.msg('请输入密保答案');
		return false;
	};
	var map = {};
	map['code'] = code;
	map['question'] = question;
	map['answer'] = answer;
	console.log(map);
	var mw = baseObj.mw(map);
	$.ajax({
		type: "POST",
		url: CONFIG.BASEURL + 'user_retrievePwd',
		dataType: 'json',
		data: {
			mw: mw
		},
		success: function(ret) {
			var code = ret.code;
			console.log("code::" + code);
			var msg = ret.msg;
			if(code == '200') {
				var json = json.data.obj;
				$.cookie("u", json.u, { path: "/" });
				$.cookie("loginName", json.loginName, { path: "/" });
				$.cookie("uid", json.u, { path: "/" });
				window.location.href = "../index.html";
			} else {
				layer.msg('修改失败');
				//                location.reload();
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
};


function showLoading() {
	layer.load(2, {
		shade: [0.1, '#000'] //0.1透明度的白色背景
	})
}

function hideLoading() {
	layer.closeAll();
}
