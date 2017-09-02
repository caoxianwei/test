var lotIds = ',26,27,28,29,'; //add 7  fot it
var winUrl = window.location.href.split('/');
winUrl = winUrl[winUrl.length - 1].split('.');
winUrl = winUrl[0]; //获取当前的彩种
window.lastNumberOpening = false; // 是否开奖中
if(winUrl == 'sfssc') {
	winUrl = 'bj3';
} else if(winUrl == 'jsk3') {
	winUrl = 'jsK3';
} else if(winUrl == 'cqssc') {
	winUrl = 'cqSsc';
} else if(winUrl == 'tjssc') {
	winUrl = 'tjSsc';
} else if(winUrl == 'xjssc') {
	winUrl = 'xjSsc';
} else if(winUrl == 'pcdd') {
	winUrl = 'bjLu28';
} else if(winUrl == 'pk10') {
	winUrl = 'bjPk10';
} else if(winUrl == 'klsf') {
	winUrl = 'gdK10';
} else if(winUrl == 'gd115') {
	winUrl = 'gdPick11';
} else if(winUrl == 'lhc') {
	winUrl = 'markSix';
} else if(winUrl == 'xyft') {
	winUrl = 'luckyAirship';
};
$(document).ready(function() {
	createModelTbale();
	liClickEvent();
	timeBoxEvent();
	getLotteryResult();
	//refreshPageTimer();

});

function parentH() {
	window.parent.$("div[name=iframe_div]").css("height", $("body").height());
}

String.prototype.padLeft = function(padChar, width) {
	var ret = this;
	while(ret.length < width) {
		if(ret.length + padChar.length < width) {
			ret = padChar + ret;
		} else {
			ret = padChar.substring(0, width - ret.length) + ret;
		}
	}
	return ret;
};

/*
 * 按下标删除
 */
Array.prototype.remove = function(dx) {
	if(isNaN(dx) || dx >= this.length) { return false; }
	var len = this.length - 1;
	for(var i = 0, n = 0; i < len; i++) {
		if(i >= dx) {
			this[i] = this[i + 1];
		}
	}
	this.length -= 1;
}

//定时刷新页面定时器
page_start = new Date() - 0;
page_keep = 1200;
auto_refresh_page = '';

function refreshPageTimer() {
	auto_refresh_page = window.setInterval(function() {
		var tmp = new Date() - 0;
		tmp = parseInt((tmp - page_start) / 1000);
		if(page_keep == null || page_keep == undefined ||
			page_keep == '' || page_start == undefined ||
			tmp > page_keep) {
			clearInterval(auto_refresh_page);
			location.href = location.href;
		}
	}, 1000);
}

function getLotteryResult() {
	var date = $('#cqssc_draw_time_box').val();
	var id = $('#lottery-id').val();
	$('#search_result_day').html(date);
	if(gameType != 9 && gameType != 41 && gameType != 10 && gameType != 27 && gameType != 34 && gameType != 15) {
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr1 = '';
				for(var i = 0; i < data.items.length; i++) {
					var result = data.items[i].resultItems.join(' ');
					htmlTr1 += '<span class="span_red">' + result + '</span>';
					htmlTr1 += '<span style="width:40px;">' + data.items[i].sumItems[1] + data.items[i].sumItems[2] + '</span>';
					htmlTr1 += '<span style="width:40px;">' + data.items[i].longhu + '</span>';
					var index = i + 1;
					if(index < 10) {
						index = '00' + index;
					} else if(index >= 10 && index < 100) {
						index = '0' + index;
					}
					$('#' + index + ' .open_num').html(htmlTr1);
					htmlTr1 = '';
				}
			}
		})
		$('#zt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr1 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result = data.items[i].resultItems.join(' ');
						htmlTr1 += '<span class="span_red">' + result + '</span>';
						htmlTr1 += '<span style="width:40px;">' + data.items[i].sumItems[1] + data.items[i].sumItems[2] + '</span>';
						htmlTr1 += '<span style="width:40px;">' + data.items[i].longhu + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr1);
						htmlTr1 = '';
					
					}
				}
			})	
		})
		$('#qt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr1 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result = data.items[i].resultItems.join(' ');
						htmlTr1 += '<span class="span_red">' + result + '</span>';
						htmlTr1 += '<span style="width:40px;">' + data.items[i].sumItems[1] + data.items[i].sumItems[2] + '</span>';
						htmlTr1 += '<span style="width:40px;">' + data.items[i].longhu + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr1);
						htmlTr1 = '';
					
					}
				}
			})	
		})
	}

	if(gameType == 9) {
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr2 = '';
				for(var i = 0; i < data.items.length; i++) {
					var result1 = data.items[i].resultItems;
					htmlTr2 += '<span class="span span' + result1[0] + '">' + result1[0] + '</span>';
					htmlTr2 += '<span class="span span' + result1[1] + '">' + result1[1] + '</span>';
					htmlTr2 += '<span class="span span' + result1[2] + '">' + result1[2] + '</span>';
					htmlTr2 += '<span class="span span' + result1[3] + '">' + result1[3] + '</span>';
					htmlTr2 += '<span class="span span' + result1[4] + '">' + result1[4] + '</span>';
					htmlTr2 += '<span class="span span' + result1[5] + '">' + result1[5] + '</span>';
					htmlTr2 += '<span class="span span' + result1[6] + '">' + result1[6] + '</span>';
					htmlTr2 += '<span class="span span' + result1[7] + '">' + result1[7] + '</span>';
					htmlTr2 += '<span class="span span' + result1[8] + '">' + result1[8] + '</span>';
					htmlTr2 += '<span class="span span' + result1[9] + '">' + result1[9] + '</span>';

					var index = i + 1;
					if(index < 10) {
						index = '00' + index;
					} else if(index >= 10 && index < 100) {
						index = '0' + index;
					}
					$('#' + index + ' .open_num').html(htmlTr2);
					htmlTr2 = '';
				}

			}
		})
		$('#zt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr2 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result1 = data.items[i].resultItems;
						htmlTr2 += '<span class="span span' + result1[0] + '">' + result1[0] + '</span>';
						htmlTr2 += '<span class="span span' + result1[1] + '">' + result1[1] + '</span>';
						htmlTr2 += '<span class="span span' + result1[2] + '">' + result1[2] + '</span>';
						htmlTr2 += '<span class="span span' + result1[3] + '">' + result1[3] + '</span>';
						htmlTr2 += '<span class="span span' + result1[4] + '">' + result1[4] + '</span>';
						htmlTr2 += '<span class="span span' + result1[5] + '">' + result1[5] + '</span>';
						htmlTr2 += '<span class="span span' + result1[6] + '">' + result1[6] + '</span>';
						htmlTr2 += '<span class="span span' + result1[7] + '">' + result1[7] + '</span>';
						htmlTr2 += '<span class="span span' + result1[8] + '">' + result1[8] + '</span>';
						htmlTr2 += '<span class="span span' + result1[9] + '">' + result1[9] + '</span>';
	
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr2);
						htmlTr2 = '';
					}
	
				}
			})
		})
		$('#qt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr2 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result1 = data.items[i].resultItems;
						htmlTr2 += '<span class="span span' + result1[0] + '">' + result1[0] + '</span>';
						htmlTr2 += '<span class="span span' + result1[1] + '">' + result1[1] + '</span>';
						htmlTr2 += '<span class="span span' + result1[2] + '">' + result1[2] + '</span>';
						htmlTr2 += '<span class="span span' + result1[3] + '">' + result1[3] + '</span>';
						htmlTr2 += '<span class="span span' + result1[4] + '">' + result1[4] + '</span>';
						htmlTr2 += '<span class="span span' + result1[5] + '">' + result1[5] + '</span>';
						htmlTr2 += '<span class="span span' + result1[6] + '">' + result1[6] + '</span>';
						htmlTr2 += '<span class="span span' + result1[7] + '">' + result1[7] + '</span>';
						htmlTr2 += '<span class="span span' + result1[8] + '">' + result1[8] + '</span>';
						htmlTr2 += '<span class="span span' + result1[9] + '">' + result1[9] + '</span>';
	
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr2);
						htmlTr2 = '';
					}
	
				}
			})
		})
	}
	if(gameType == 18) {
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr2 = '';
				$.each(data.items, function(k, v) {
					var sumitems = data.items[k].sumItems.join(' ')
					htmlTr2 += '<tr><td class="lhc_td">';
					htmlTr2 += '<span>' + data.items[k].sessionNo + '</span>';
					htmlTr2 += '<span>' + data.items[k].openTime + '</span>';
					htmlTr2 += '<span id="ball">';
					htmlTr2 += '<span>' + data.items[k].resultItems[0] + '</span>';
					htmlTr2 += '<span>' + data.items[k].resultItems[1] + '</span>';
					htmlTr2 += '<span>' + data.items[k].resultItems[2] + '</span>';
					htmlTr2 += '<span>' + data.items[k].resultItems[3] + '</span>';
					htmlTr2 += '<span>' + data.items[k].resultItems[4] + '</span>';
					htmlTr2 += '<span>' + data.items[k].resultItems[5] + '</span>+  ';
					htmlTr2 += '<span>' + data.items[k].resultItems[6] + '</span>';
					htmlTr2 += '</span>';
					htmlTr2 += '<span>' + sumitems + '</span>';
					htmlTr2 += '</tr></td>';

				})
				$('#lhc_draw_list_tbody').append(htmlTr2);
			}

		});
		$('#zt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr2 = '';
					$.each(data.items, function(k, v) {
						var sumitems = data.items[k].sumItems.join(' ')
						htmlTr2 += '<tr><td class="lhc_td">';
						htmlTr2 += '<span>' + data.items[k].sessionNo + '</span>';
						htmlTr2 += '<span>' + data.items[k].openTime + '</span>';
						htmlTr2 += '<span id="ball">';
						htmlTr2 += '<span>' + data.items[k].resultItems[0] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[1] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[2] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[3] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[4] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[5] + '</span>+  ';
						htmlTr2 += '<span>' + data.items[k].resultItems[6] + '</span>';
						htmlTr2 += '</span>';
						htmlTr2 += '<span>' + sumitems + '</span>';
						htmlTr2 += '</tr></td>';
	
					})
					$('#lhc_draw_list_tbody').append(htmlTr2);
				}
	
			});
		})
		$('#qt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr2 = '';
					$.each(data.items, function(k, v) {
						var sumitems = data.items[k].sumItems.join(' ')
						htmlTr2 += '<tr><td class="lhc_td">';
						htmlTr2 += '<span>' + data.items[k].sessionNo + '</span>';
						htmlTr2 += '<span>' + data.items[k].openTime + '</span>';
						htmlTr2 += '<span id="ball">';
						htmlTr2 += '<span>' + data.items[k].resultItems[0] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[1] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[2] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[3] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[4] + '</span>';
						htmlTr2 += '<span>' + data.items[k].resultItems[5] + '</span>+  ';
						htmlTr2 += '<span>' + data.items[k].resultItems[6] + '</span>';
						htmlTr2 += '</span>';
						htmlTr2 += '<span>' + sumitems + '</span>';
						htmlTr2 += '</tr></td>';
	
					})
					$('#lhc_draw_list_tbody').append(htmlTr2);
				}
	
			});
		})
	}
	if(gameType == 41) {
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr3 = '';
				for(var i = 0; i < data.items.length; i++) {
					var result2 = data.items[i].resultItems;
					htmlTr3 += '<span style="color: #E20E00;">'
					htmlTr3 += '<span class="span1">' + result2[0] + '</span>+';
					htmlTr3 += '<span class="span1">' + result2[1] + '</span>+';
					htmlTr3 += '<span class="span1">' + result2[2] + '</span>=';
					htmlTr3 += '<span class="span1">' + result2[3] + '</span>';
					htmlTr3 += '</span>';

					var index = i + 1;
					if(index < 10) {
						index = '00' + index;
					} else if(index >= 10 && index < 100) {
						index = '0' + index;
					}
					$('#' + index + ' .open_num').html(htmlTr3);
					htmlTr3 = '';
				}

			}
		})
		$('#zt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr3 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result2 = data.items[i].resultItems;
						htmlTr3 += '<span style="color: #E20E00;">'
						htmlTr3 += '<span class="span1">' + result2[0] + '</span>+';
						htmlTr3 += '<span class="span1">' + result2[1] + '</span>+';
						htmlTr3 += '<span class="span1">' + result2[2] + '</span>+';
						htmlTr3 += '<span class="span1">' + result2[3] + '</span>=';
						htmlTr3 += '<span class="span1">' + result2[4] + '</span>';
						htmlTr3 += '</span>';
	
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr3);
						htmlTr3 = '';
					}
	
				}
			})
		})
		$('#qt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr3 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result2 = data.items[i].resultItems;
						htmlTr3 += '<span style="color: #E20E00;">'
						htmlTr3 += '<span class="span1">' + result2[0] + '</span>+';
						htmlTr3 += '<span class="span1">' + result2[1] + '</span>+';
						htmlTr3 += '<span class="span1">' + result2[2] + '</span>+';
						htmlTr3 += '<span class="span1">' + result2[3] + '</span>=';
						htmlTr3 += '<span class="span1">' + result2[4] + '</span>';
						htmlTr3 += '</span>';
	
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr3);
						htmlTr3 = '';
					}
	
				}
			})
		})
	}
	if(gameType == 27 || gameType == 34) {
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr4 = '';
				for(var i = 0; i < data.items.length; i++) {
					var result3 = data.items[i].resultItems.join(' ');
					htmlTr4 += '<span class="span_red">' + result3 + '</span>';
					var index = i + 1;
					if(index < 10) {
						index = '00' + index;
					} else if(index >= 10 && index < 100) {
						index = '0' + index;
					}
					$('#' + index + ' .open_num').html(htmlTr4);
					htmlTr4 = '';
				}

			}
		})
		$('#zt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr4 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result3 = data.items[i].resultItems.join(' ');
						htmlTr4 += '<span class="span_red">' + result3 + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr4);
						htmlTr4 = '';
					}
	
				}
			})
		})
		$('#qt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr4 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result3 = data.items[i].resultItems.join(' ');
						htmlTr4 += '<span class="span_red">' + result3 + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr4);
						htmlTr4 = '';
					}
	
				}
			})
		})
	}
	if(gameType == 10){
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr5 = '';
				for(var i = 0; i < data.items.length; i++) {
					var result4 = data.items[i].resultItems;
					var xt = '';
					if(result4[0] == result4[1] && result4[0] == result4[2]){
						xt = '三同号';
					}
					else if(result4[0] == result4[1] || result4[0] == result4[2] || result4[1] == result4[2]){
						xt = '二同号';
					}
					else if(result4[0] != result4[1] && result4[0] != result4[2] && result4[1] != result4[2]){
						xt = '三不同号';
						if(Number(result4[0]) + 1 == result4[1] && Number(result4[1]) + 1 == result4[2]){
							xt = '三连号'
						}
						else if(Number(result4[0]) - 1 == result4[1] && Number(result4[1]) - 1 == result4[2]){
							xt = '三连号'
						}
					}
					htmlTr5 += '<span class="span_red" style="width: 130px;">';
					htmlTr5 += '<span class="jsk3">'+ result4[0]+'</span>';
					htmlTr5 += '<span class="jsk3">'+ result4[1]+'</span>';
					htmlTr5 += '<span class="jsk3">'+ result4[2]+'</span>';
					htmlTr5 += '</span>';
					htmlTr5 += '<span style="width:40px;">' + result4[3] + '</span>';
					htmlTr5 += '<span style="width:40px;">' + xt + '</span>';
					var index = i + 1;
					if(index < 10) {
						index = '00' + index;
					} else if(index >= 10 && index < 100) {
						index = '0' + index;
					}
					$('#' + index + ' .open_num').html(htmlTr5);
					htmlTr5 = '';
				}

			}
		})
		$('.text2').css('width','130px');
		$('#zt').on('click',function(){
					$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id,today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr5 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result4 = data.items[i].resultItems;
						var xt = '';
						if(result4[0] == result4[1] && result4[0] == result4[2]){
							xt = '三同号';
						}
						else if(result4[0] == result4[1] || result4[0] == result4[2] || result4[1] == result4[2]){
							xt = '二同号';
						}
						else if(result4[0] != result4[1] && result4[0] != result4[2] && result4[1] != result4[2]){
							xt = '三不同号';
							if(Number(result4[0]) + 1 == result4[1] && Number(result4[1]) + 1 == result4[2]){
								xt = '三连号'
							}
							else if(Number(result4[0]) - 1 == result4[1] && Number(result4[1]) - 1 == result4[2]){
								xt = '三连号'
							}
						}
						htmlTr5 += '<span class="span_red" style="width: 130px;">';
						htmlTr5 += '<span class="jsk3">'+ result4[0]+'</span>';
						htmlTr5 += '<span class="jsk3">'+ result4[1]+'</span>';
						htmlTr5 += '<span class="jsk3">'+ result4[2]+'</span>';
						htmlTr5 += '</span>';
						htmlTr5 += '<span style="width:40px;">' + result4[3] + '</span>';
						htmlTr5 += '<span style="width:40px;">' + xt + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr5);
						htmlTr5 = '';
					}
	
				}
			})
			$('.text2').css('width','130px');
		})
		$('#qt').on('click',function(){
					$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id,today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr5 = '';
					for(var i = 0; i < data.items.length; i++) {
						var result4 = data.items[i].resultItems;
						var xt = '';
						if(result4[0] == result4[1] && result4[0] == result4[2]){
							xt = '三同号';
						}
						else if(result4[0] == result4[1] || result4[0] == result4[2] || result4[1] == result4[2]){
							xt = '二同号';
						}
						else if(result4[0] != result4[1] && result4[0] != result4[2] && result4[1] != result4[2]){
							xt = '三不同号';
							if(Number(result4[0]) + 1 == result4[1] && Number(result4[1]) + 1 == result4[2]){
								xt = '三连号'
							}
							else if(Number(result4[0]) - 1 == result4[1] && Number(result4[1]) - 1 == result4[2]){
								xt = '三连号'
							}
						}
						htmlTr5 += '<span class="span_red" style="width: 130px;">';
						htmlTr5 += '<span class="jsk3">'+ result4[0]+'</span>';
						htmlTr5 += '<span class="jsk3">'+ result4[1]+'</span>';
						htmlTr5 += '<span class="jsk3">'+ result4[2]+'</span>';
						htmlTr5 += '</span>';
						htmlTr5 += '<span style="width:40px;">' + result4[3] + '</span>';
						htmlTr5 += '<span style="width:40px;">' + xt + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr5);
						htmlTr5 = '';
					}
	
				}
			})
			$('.text2').css('width','130px');
		})
	}
	if(gameType == 15){
		$.ajax({
			url: CONFIG.BASEURL + winUrl + "_openList",
			type: 'post',
			dataType: 'json',
			data: { date: date, id: id },
			timeout: timeOut,
			success: function(results) {
				var data = results.data;
				var htmlTr6 = '';
				for(var i = 0; i < data.items.length; i++) {
					data.items[i].resultItems.pop();
					var result5 = data.items[i].resultItems.join(' ');
					var radio = [0, 0];
					var radioJo = [0, 0];
					for(var j = 0; j < data.items[i].resultItems.length; j++){
						var number = Number(data.items[i].resultItems[j]);
						if(number >= 6){
							radio[0] = radio[0] + 1;
						} else {
							radio[1] = radio[1] + 1;
						}
						if(number % 2 == 1) {
								radioJo[0] += 1;
							} else {
								radioJo[1] += 1;
							}
					}
					
					htmlTr6 += '<span class="span_red" style="width: 130px;">' + result5 + '</span>';
					htmlTr6 += '<span style="width:40px;">' + radio[0] + ':' + radio[1] + '</span>';
					htmlTr6 += '<span style="width:40px;">' + radioJo[0] + ':' + radioJo[1] + '</span>';
					var index = i + 1;
					if(index < 10) {
						index = '00' + index;
					} else if(index >= 10 && index < 100) {
						index = '0' + index;
					}
					$('#' + index + ' .open_num').html(htmlTr6);
					htmlTr6 = '';
				}

			}
		})
		$('.text2').css('width','130px');
		$('#zt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -1 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr6 = '';
					for(var i = 0; i < data.items.length; i++) {
						data.items[i].resultItems.pop();
						var result5 = data.items[i].resultItems.join(' ');
						var radio = [0, 0];
						var radioJo = [0, 0];
						for(var j = 0; j < data.items[i].resultItems.length; j++){
							var number = Number(data.items[i].resultItems[j]);
							if(number >= 6){
								radio[0] = radio[0] + 1;
							} else {
								radio[1] = radio[1] + 1;
							}
							if(number % 2 == 1) {
									radioJo[0] += 1;
								} else {
									radioJo[1] += 1;
								}
						}
						
						htmlTr6 += '<span class="span_red" style="width: 130px;">' + result5 + '</span>';
						htmlTr6 += '<span style="width:40px;">' + radio[0] + ':' + radio[1] + '</span>';
						htmlTr6 += '<span style="width:40px;">' + radioJo[0] + ':' + radioJo[1] + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr6);
						htmlTr6 = '';
					}
	
				}
			})
			$('.text2').css('width','130px');
		})
		$('#qt').on('click',function(){
			$.ajax({
				url: CONFIG.BASEURL + winUrl + "_openList",
				type: 'post',
				dataType: 'json',
				data: { date: date, id: id, today: -2 },
				timeout: timeOut,
				success: function(results) {
					var data = results.data;
					var htmlTr6 = '';
					for(var i = 0; i < data.items.length; i++) {
						data.items[i].resultItems.pop();
						var result5 = data.items[i].resultItems.join(' ');
						var radio = [0, 0];
						var radioJo = [0, 0];
						for(var j = 0; j < data.items[i].resultItems.length; j++){
							var number = Number(data.items[i].resultItems[j]);
							if(number >= 6){
								radio[0] = radio[0] + 1;
							} else {
								radio[1] = radio[1] + 1;
							}
							if(number % 2 == 1) {
									radioJo[0] += 1;
								} else {
									radioJo[1] += 1;
								}
						}
						
						htmlTr6 += '<span class="span_red" style="width: 130px;">' + result5 + '</span>';
						htmlTr6 += '<span style="width:40px;">' + radio[0] + ':' + radio[1] + '</span>';
						htmlTr6 += '<span style="width:40px;">' + radioJo[0] + ':' + radioJo[1] + '</span>';
						var index = i + 1;
						if(index < 10) {
							index = '00' + index;
						} else if(index >= 10 && index < 100) {
							index = '0' + index;
						}
						$('#' + index + ' .open_num').html(htmlTr6);
						htmlTr6 = '';
					}
	
				}
			})
			$('.text2').css('width','130px');
		})
	}
}

var unOpenArr = new Array(); //未开奖期数数组
auto_remain_seconds = 300; //剩余秒数
auto_get_latest_open = null; //定时器
auto_get_open_num = null; //获取开奖号码定时器
function createRemainTimer(nextPeriod) {
	clearInterval(auto_get_latest_open);
	auto_get_latest_open = window.setInterval(function() {
		if(auto_remain_seconds <= 0 || nextPeriod == null || nextPeriod == undefined || nextPeriod == '') { //获取最新开奖信息
			clearInterval(auto_get_latest_open);
			getGongGaolastOpen(gameType, 0); //参数
		}
		var tmpTotalSec = auto_remain_seconds;
		var d = parseInt(tmpTotalSec / (3600 * 24)); //计算剩余的天数
		tmpTotalSec -= 3600 * 24 * d;
		var h = parseInt(tmpTotalSec / 3600); //计算剩余的小时数
		tmpTotalSec -= 3600 * h;
		var m = parseInt(tmpTotalSec / 60); //计算剩余的分钟数
		tmpTotalSec -= 60 * m;
		var s = tmpTotalSec; //计算剩余的秒数
		auto_remain_seconds--;
		//设置倒计时
		var tmpHtml = '距离开奖还剩：<span class="red">' + m + '分' + s + '秒</span><a onclick="goBet()" class="orangebg_btn bet_btn">投注</a>';

		if($('#draw_td_' + nextPeriod).html() == '' || $('#draw_td_' + nextPeriod).html() == undefined || $('#draw_td_' + nextPeriod).html().indexOf('距离开奖') >= 0) {
			$('#draw_td_' + nextPeriod).html(tmpHtml);
		}
		if(m == 0 && s == 0) { //倒计时为零
			if($('#draw_td_' + nextPeriod).html() == '' || $('#draw_td_' + nextPeriod).html() == undefined) {
				$('#draw_td_' + nextPeriod).html('正在开奖...');
			}
		}
	}, 1000);
}

//获取开奖号码定时器
function createGetNumTimer() {
	clearInterval(auto_get_open_num);
	auto_get_open_num = window.setInterval(function() {
		if(unOpenArr.length > 0) {
			clearInterval(auto_get_open_num);
			getOpenNum(gameType);
		}
	}, 30000);
}

function createModelTbale() {
	var htmlTable = '';
	for(var i = 1; i <= line; i++) {
		var htmlTr = '';
		if(i % 2 == 0) {
			htmlTr = '<tr class="bgcolor">';
		} else {
			htmlTr = '<tr>';
		}
		for(var j = 0; j <= 2; j++) {
			var index = line * j + i;
			index = pad(index, 3);
			if(lotIds.indexOf(',' + gameType + ',') > -1 && index > 97) {
				index = '';
			}
			if((gameType == 3 && index > 23) || (gameType == 10 && index > 82) ||
				(gameType == 11 && index > 80) || (gameType == 16 && index > 79) ||
				(gameType == 51 && index > 460) || (gameType == 52 && index > 460) ||
				(gameType == 9 && index > 179) || (gameType == 53 && index > 920) || 
				(gameType == 41 && index > 179)) {
				htmlTr += '<td></td>';
			} else {
				var per = $("#sl_draw_list_t_tab  .active").attr("date").split("-").join("");
				htmlTr += '<td id="' + index + '"><span class="text1">' + index + '</span><span class="123 open_num" id="draw_td_' + index + '"></span></td>';
			}
		}
		htmlTr += '</tr>';
		htmlTable += htmlTr;
	}
	$('#cqssc_draw_list_tbody').html(htmlTable);

}

function liClickEvent() {
	$('#sl_draw_list_t_tab li').click(function() {
		if(!$(this).hasClass('active')) {
			$('#sl_draw_list_t_tab li').each(function() {
				$(this).removeClass('active');
			});
			$(this).addClass('active');
			var date = $(this).attr('date');
			$('#search_result_day').html(date);
			$('#cqssc_draw_time_box').val(date);
			getLotteryResult();
		}
		createModelTbale();
	});
}

function timeBoxEvent() {
	$('#cqssc_draw_time_box').click(function() {
		getLotteryResult();
	});
}

function pad(num, n) {
	var len = num.toString().length;
	while(len < n) {
		num = "0" + num;
		len++;
	}
	return num;
}

function goBet(url) {
	var el = document.createElement("a");
	document.body.appendChild(el);
	if(url == null || url == undefined || url == '') {
		url = betUrl;
	}
	__openWin("lottery_hall", url);
	document.body.removeChild(el);
}

function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	m = (m < 10) ? '0' + m : m;
	var d = dd.getDate();
	d = (d < 10) ? '0' + d : d;
	return y + "-" + m + "-" + d;
}

$(function() {
	function AddFavorite(sURL, sTitle) {
		try {
			window.external.addFavorite(sURL, sTitle);
		} catch(e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "");
			} catch(e) {
				alert("请使用Ctrl+D进行添加");
			}
		}
	}
	$('div.link_r').find('a').on('click', function() {
		AddFavorite(location.herf, '新彩');
		return false;
	});

	//绑定时间控件
	try {
		$("#cqssc_draw_time_box").datepicker({
			dateFormat: 'yy-mm-dd',
			onSelect: function(startDate) {
				if(startDate != '') {
					var date = $('#cqssc_draw_time_box').val();
					$('#search_result_day').html(date);
					$('#sl_draw_list_t_tab li').removeClass('active');
					$('#sl_draw_list_t_tab li').each(function() {
						if($(this).attr('date') == date) {
							$(this).addClass('active');
						}
					});
				} else {
					return;
				}
				getLotteryResult();
			}
		});
	} catch(e) {}
});

function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期 
	var d = dd.getDate();
	var m1 = Number(m);
	if(m1 < 10){
		return y + "-" + '0' + m + "-" + d;
	}else{
		return y + "-" + m + "-" + d;
	}
	
}
$('#cqssc_draw_time_box').val(GetDateStr(0));
$('#jt').attr('date', GetDateStr(0));
$('#zt').attr('date', GetDateStr(-1));
$('#qt').attr('date', GetDateStr(-2));