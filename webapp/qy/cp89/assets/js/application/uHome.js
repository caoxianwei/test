$(function() {
	(function css() {
		//初始化消息中心的高度
		var h2 = $(window).height() - $("body>div>#header").height() - 300;
		var static_height = 200;
		if(h2 < static_height) {
			h2 = static_height;
		}
		$("#message_div .user-news").css("max-height", (h2));
	})();
	$("#menu").find("li").on("click", function() {
		var _href = $(this).attr("href");
		if($(this).attr("id") == 'customerService') {
			window.open(_href);
		} else {
			location.href = document.getElementById('base_path').href + _href;
		}
	});

	$('#user_safe').find('input').each(function() {
		$(this).on('focus', function() {
			$('#bank_id').css('border-color', '#ddd');
			$('#user_safe').find('input').css('border-color', '#ddd');

			$(this).css('border-color', 'red');
		})
	});
	$('#bank_id').on('focus', function() {
		$(this).css('border-color', 'red');
		$('#user_safe').find('input').css('border-color', '#ddd');
	})

	$('.login_password').on('click', function() {
		if($('#login_password_div').css('display') == 'none') {
			$('#bind_bank_div').hide(200);
			$('#login_password_div').show(200);
			$('#question_answer_div').hide(200);
			$('#withdraw_password_div').hide(200);
		} else {
			$('#login_password_div').hide(200);
		}
	});

	$('.question_answer').on('click', function() {
		if($('#question_answer_div').css('display') == 'none') {
			$('#bind_bank_div').hide(200);
			$('#login_password_div').hide(200);
			$('#question_answer_div').show(200);
			$('#withdraw_password_div').hide(200);
		} else {
			$('#question_answer_div').hide(200);
		}
	});

	$('.withdraw_password').on('click', function() {
		/*if($('#is_question_set').val() == 0) {
			_alert("请先设置密保问题");
			$('#question_answer_div').show(200);
			
			return;
		}*/
		if($('#withdraw_password_div').css('display') == 'none') {
			$('#bind_bank_div').hide(200);
			$('#login_password_div').hide(200);
			$('#question_answer_div').hide(200);
			$('#withdraw_password_div').show(200);
		} else {
			$('#withdraw_password_div').hide(200);
		}
	});

	$('.bind_bank').on('click', function() {
		/*if($('#is_question_set').val() == 0) {
			_alert("请先设置密保问题");
			$('#question_answer_div').show(200);
			
			return;
		}*/
		/*if($('#is_need_set_question').val() == 1) {
			_alert("请先设置密保问题");
			$('#question_answer_div').show(200);
			
			return;
		}*/

		if($('#bind_bank_div').css('display') == 'none') {
			$('#bind_bank_div').show(200);
			$('#login_password_div').hide(200);
			$('#question_answer_div').hide(200);
			$('#withdraw_password_div').hide(200);
		} else {
			$('#bind_bank_div').hide(200);
		}
	});

	$('#changePwd').on('click', function() {
		if($(this).data("ajax") == "true") {
			return;
		}
		var pwd_1_1 = $.trim($("#oldpass").val());
		var pwd_1_2 = $.trim($("#pass").val());
		var pwd_1_3 = $.trim($("#repass").val());

		if(pwd_1_1 == null || pwd_1_1 == '') {
			_alert("旧密码不能为空");
			return;
		}
		if(pwd_1_2 == null || pwd_1_2 == '') {
			_alert("新密码不能为空");
			return;
		}
		if(!pwd_1_1.match(/^[A-Za-z0-9]{6,12}$/)) {
			_alert("旧密码输入有误");
			return;
		}
		if(!pwd_1_2.match(/^[A-Za-z0-9]{6,12}$/)) {
			_alert("新密码输入格式有误");
			return;
		}
		if(pwd_1_2 != pwd_1_3) {
			_alert("两次新密码输入不一致");
			return;
		}

		$(this).data("ajax", "true");
		$.ajax({
			url: CONFIG.BASEURL + 'user_changePwd',
			type: 'post',
			dataType: 'json',
			'timeout': 15000,
			data: { oldPwd: pwd_1_1, pwd: pwd_1_2, rePwd: pwd_1_3 },
			success: function(results) {
				$("#changePwd").data("ajax", "false");
				if(results.status == '200') {
					_alert('修改成功！', function() {
						location.reload();
					});
				} else {
					_alert(results.description);
				}
			},
			error: function(XMLHttpRequest, status) {
				$("#changePwd").data("ajax", "false");
			}
		});
	});

	$('#changeQuestion').on('click', function() {
		if($(this).data("ajax") == "true") {
			return;
		}

		var isSet = $('#is_question_set').val();
		var pwd_1_1 = $.trim($("#question").val());
		var pwd_1_3 = $.trim($("#answer").val());
		var pwd_1_2 = isSet == 1 ? $.trim($("#oldAnswer").val()) : '';
		if(pwd_1_1 == null || pwd_1_1 == '') {
			_alert("密保问题不能为空");
			return;
		}
		if(isSet == 1 && (pwd_1_2 == null || pwd_1_2 == '')) {
			_alert("旧密保答案不能为空");
			return;
		}
		if(pwd_1_3 == null || pwd_1_3 == '') {
			_alert("密保答案不能为空");
			return;
		}
		if(pwd_1_2 == pwd_1_3) {
			_alert("两次输入的密保答案不能一羊");
			return;
		}

		$(this).data("ajax", "true");
		$.ajax({
			url: "member/security/question",
			type: 'post',
			dataType: 'json',
			'timeout': 15000,
			data: { question: pwd_1_1, oldAnswer: pwd_1_2, answer: pwd_1_3 },
			success: function(results) {
				$("#changeQuestion").data("ajax", "false");
				if(results.status == '200') {
					_alert('设置成功！', function() {
						location.reload();
					});
				} else {
					_alert(results.description);
				}
			},
			error: function(XMLHttpRequest, status) {
				$("#changeQuestion").data("ajax", "false");
			}
		});
	});

	$('#changeWpwd').on('click', function() {
		if($(this).data("ajax") == "true") {
			return;
		}
		var isSet = $('#is_withdraw_password_set').val();
		var pwd_1_1 = isSet == 1 ? $.trim($("#oldWpass").val()) : '1111';
		var pwd_1_2 = $.trim($("#transPwd1").val()) + $.trim($("#transPwd2").val()) + $.trim($("#transPwd3").val()) + $.trim($("#transPwd4").val());
		var pwd_1_3 = pwd_1_2; //isSet == 1 ? $.trim($("#reWpass").val()) : pwd_1_2;

		if(isSet == 1 && (pwd_1_1 == null || pwd_1_1 == '')) {
			_alert("旧密码不能为空");
			return;
		}
		if(pwd_1_2 == null || pwd_1_2 == '') {
			_alert("密码不能为空");
			return;
		}
		if(isSet == 1 && !pwd_1_1.match(/^[0-9]{4}$/)) {
			_alert("旧密码输入有误");
			return;
		}
		if(!pwd_1_2.match(/^[0-9]{4}$/)) {
			_alert("密码输入格式有误");
			return;
		}
		if(isSet == 1 && (pwd_1_2 != pwd_1_3)) {
			_alert("两次新密码输入不一致");
			return;
		}

		$(this).data("ajax", "true");
		$.ajax({
			url: "member/changePwd/withdraw",
			type: 'post',
			dataType: 'json',
			'timeout': 15000,
			data: { oldPwd: pwd_1_1, pwd: pwd_1_2, rePwd: pwd_1_3 },
			success: function(results) {
				$("#changeWpwd").data("ajax", "false");
				if(results.status == '200') {
					_alert('修改成功！', function() {
						location.reload();
					});
				} else {
					_alert(results.description);
				}
			},
			error: function(XMLHttpRequest, status) {
				$("#changeWpwd").data("ajax", "false");
			}
		});
	});

	$('#changeBank').on('click', function() {
		if($(this).data("ajax") == "true") {
			return;
		}

		var truename = $.trim($("#realName").val());
		var bankname = $.trim($("#bank_id").val());
		var bankno = $.trim($("#account").val());
		var province = $.trim($("#province").val());
		var city = $.trim($("#city").val());
		var wPwd = null;
		if($('#btransPwd1') != null && $('#btransPwd1').length > 0) {
			wPwd = $('#btransPwd1').val() + $('#btransPwd2').val() + $('#btransPwd3').val() + $('#btransPwd4').val();
		} else {
			wPwd = $("#bPasswd").val();
		}
		var isSet = $('#is_bank_bind').val();
		var answer = isSet == 1 ? $('#questionAnswer').val() : '';
		var remark = '';
		if(truename == "") {
			_alert("开户人姓名不能为空");
			return;
		}
		/*if(isSet == 1 && answer == '') {
			_alert("密保答案不能为空");
		    return;
		}*/
		if((bankname == 'other' || !bankname) && $('#bankNameText').val() == '') {
			_alert("开户银行不能为空");
			return;
		}
		if(bankno == "") {
			_alert("银行账号不能为空");
			return;
		}
		if(province == "") {
			_alert("开户银行所在省不能为空");
			return;
		}
		if(city == "") {
			_alert("开户银行所在市不能为空");
			return;
		}
		if(wPwd == '') {
			_alert('提款密码不能为空!');
			return;
		}
		if(!wPwd.match(/^[0-9]{4}$/)) {
			_alert("提款密码输入格式有误");
			return;
		}
		if(bankname == 'other') {
			remark = 'other';
			bankname = $('#bankNameText').val();
		}

		var param = {
			truename: truename,
			bankname: bankname,
			bankno: bankno,
			province: province,
			city: city,
			wPwd: wPwd,
			answer: answer,
			remark: remark
		};
		$(this).data("ajax", "true");
		$.ajax({
			url: "../member/withdraw.html/bindbank",
			type: 'post',
			dataType: 'json',
			'timeout': 15000,
			data: param,
			success: function(results) {
				$("#changeBank").data("ajax", "false");
				if(results.status == '200') {
					_alert('修改成功！', function() {
						location.reload();
					});
				} else {
					_alert(results.description);
				}
			},
			error: function(XMLHttpRequest, status) {
				$("#changeBank").data("ajax", "false");
			}
		});
	});

	$("#bank_id").on("click", function() {
		if($('#bank_id').val() == 'other') {
			$('#bankNameText').show();
		} else {
			$('#bankNameText').hide();
		}
	});

	if($('#is_question_answer_open').val() == 1) {
		$('#question_answer_div').show(200);
		$('#question').trigger('focus');
	}
});

function judge() {
	var money = $.trim($(".wechat-int0").val());
	var money_num = Number(money);
	if(!money) {
		layer.msg("请输入金额");
		return;
	}
	if(money_num < 10 || money_num > 20000) {
		layer.msg("金额必须大于10，且小于20000!");
		return;
	}
	$('#wechat_step1').css('display', 'none');
	$('.wechat-three').css('display', 'block');
	$('.pay-int1').val(money_num);
}

function judge1() {
	var money1 = $.trim($(".wechat-int1").val());
	var money_num1 = Number(money1);
	if(!money1) {
		layer.msg("请输入金额");
		return;
	}
	if(money_num1 < 10 || money_num1 > 5000) {
		layer.msg("金额必须大于10，且小于5000!");
		return;
	}
	if(money_num1 >= 10 && money_num1 <= 5000) {
		$('#wechat_step1').css('display', 'none');
		$('#wechat_step2_scan').css('display', 'block');

		function GetRandomNum(Min, Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			return(Min + Math.round(Rand * Range));
		}
		var num = GetRandomNum(1, 100);
		var amount = money_num1 + '.' + num;
		$('#amount').html(amount);

		$.ajax({
			url: CONFIG.BASEURL + 'twocode_payOffewm',
			type: 'get',
			dataType: 'json',
			success: function(json) {
				console.log(json)
			}
		});

	}

}

function judge2() {
	var money2 = $.trim($(".wechat-int2").val());
	var money_num2 = Number(money2);
	if(!money2) {
		layer.msg("请输入金额");
		return;
	}
	if(money_num2 < 10 || money_num2 > 20000) {
		layer.msg("金额必须大于10，且小于20000!");
		return;
	}
	if(money_num2 >= 10 && money_num2 <= 20000) {
		$('#wechat_step1').css('display', 'none');
		$('#wechat_step2_scan').css('display', 'block');

		function GetRandomNum(Min, Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			return(Min + Math.round(Rand * Range));
		}
		var num = GetRandomNum(1, 100);
		var amount = money_num2 + '.' + num;
		$('#amount').html(amount);
	}

}

function judge3() {
	var money3 = $.trim($(".wechat-int3").val());
	var money_num3 = Number(money3);
	if(!money3) {
		layer.msg("请输入金额");
		return;
	}
	if(money_num3 < 10 || money_num3 > 50000) {
		layer.msg("金额必须大于10，且小于50000!");
		return;
	}
	if(money_num3 >= 10 && money_num3 <= 50000) {
		$('#wechat_step1').css('display', 'none');
		$('#wechat_step2_scan').css('display', 'block');
	}

}

function judge4() {
	var money4 = $.trim($(".wechat-int4").val());
	var money_num4 = Number(money4);
	if(!money4) {
		layer.msg("请输入金额");
		return;
	}
	if(money_num4 < 10 || money_num4 > 20000) {
		layer.msg("金额必须大于10，且小于20000!");
		return;
	}
	if(money_num4 >= 10 && money_num4 <= 20000) {
		$('#wechat_step1').css('display', 'none');
		$('#wechat_step2_scan').css('display', 'block');
	}

}

function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期 
	var d = dd.getDate();
	var m1 = Number(m);
	if(m1 < 10) {
		return y + "-" + '0' + m + "-" + d;
	} else {
		return y + "-" + m + "-" + d;
	}
}

$('#time').val(GetDateStr(0));
var dd = new Date();
var hour = dd.getHours();
var minutes = dd.getMinutes();
var hour1 = Number(hour) < 10 ? '0' + Number(hour) : Number(hour);
var minutes1 = Number(minutes) < 10 ? '0' + Number(minutes) : Number(minutes);
$('#hour').val(hour1);
$('#minutes').val(minutes1);

$('.fl').on('click', function() {
	$('#wechat_step1').css('display', 'block');
	$('#wechat_step2_scan').css('display', 'none');
})