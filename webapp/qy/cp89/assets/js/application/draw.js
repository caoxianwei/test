$(function() {
	//彩种列表
	ajaxRequest({
		url: CONFIG.BASEURL + 'baseData_latestList',
		success: function(json) {
			var data = json.data.items;
			var str = '';
			var str1 = '';
			var str2 = '';
			var str3 = '';
			var str4 = '';
			var str5 = '';
			$.each(data, function(index, value) {
				var o = '';
				var type = value.type;
				var url = "";
				var num_count = "";
				var rate = "";
				$.each(value.openResult, function(i, v) {
						o += '<i>' + v + '</i>';
				})
				if(type == '0') { //三分彩
					url = "sfssc";
					num_count = "420";
					rate = "3分";
				} else if(type == '1') {
					url = "pk10";
					num_count = "179";
					rate = "5分";
				} else if(type == '2') {
					url = "xy28";
					num_count = "179";
					rate = "5分";
				} else if(type == '3') {
					url = "cqssc";
					num_count = "120";
					rate = "5/10分";
				} else if(type == '4') {
					url = "pcdd";
					num_count = "179";
					rate = "5分";
				} else if(type == '5') {
					url = "klsf";
					num_count = "97";
					rate = "10分";
				} else if(type == '6') {
					url = "tjssc";
					num_count = "84";
					rate = "10分";
				} else if(type == '7') {
					url = "xjssc";
					num_count = "96";
					rate = "10分";
				} else if(type == '8') {
					url = "kuailepuke3";
					num_count = "82";
					rate = "10分";
				} else if(type == '9') {
					url = "gd115";
					num_count = "84";
					rate = "10分";
				} else if(type == '10') {
					url = "jsk3";
					num_count = "82";
					rate = "10分";
				} else if(type == '11') {
					url = "gxk10";
					num_count = "179";
					rate = "10分";
				} else if(type == '12') {
					url = "lhc";
					num_count = "1";
					rate = "2/3天";
				} else if(type == '13') {
					url = "xyft";
					num_count = "180";
					rate = "5分";
				}
				if(type != '12') {
					str1 += '<tr id="_menu_draw_b_3" name="_type_1" class="bgcolor">';
					str1 += '<td><a class="name" href="javascript:;">' + value.gameName + '</a></td>';
					str1 += '<td><a href="javascript:;">' + value.latestSessionNo + '</a></td>';
					str1 += '<td>' + value.time + '</td>';
					str1 += '<td><div><span class="ball">' + o + '</span></div></td>';
					str1 += '<td>' + num_count + '期</td>';
					str1 += '<td>' + rate + '</td>';
					str1 += '<td><a class="c-blue blod" href="draw/'+url+'.html"><img src="../assets/statics/images/details.gif"></a></td>';
					str1 += '<td><a href="trend.html" target="_top"><img src="../assets/statics/images/zst_01.gif"></a></td>';
					str1 += '<td class="b"><a data-url='+url+' class="draw-lottery-btn">投注</a></td>';
					str1 += '</tr>';
				}

				if(type == '5') {
					str2 += '<tr id="_menu_draw_b_3" name="_type_1" class="bgcolor">';
					str2 += '<td><a class="name" href="javascript:;">' + value.gameName + '</a></td>';
					str2 += '<td><a href="javascript:;">' + value.latestSessionNo + '</a></td>';
					str2 += '<td>' + value.time + '</td>';
					str2 += '<td><div><span class="ball">' + o + '</span></div></td>';
					str2 += '<td>' + num_count + '期</td>';
					str2 += '<td>' + rate + '</td>';
					str2 += '<td><a class="c-blue blod" href="draw/'+url+'.html"><img src="../assets/statics/images/details.gif"></a></td>';
					str2 += '<td><a href="trend.html" target="_top"><img src="../assets/statics/images/zst_01.gif"></a></td>';
					str2 += '<td class="b"><a data-url='+url+' class="draw-lottery-btn">投注</a></td>';
					str2 += '</tr>';
				}
				if(type == '9') {
					str3 += '<tr id="_menu_draw_b_3" name="_type_1" class="bgcolor">';
					str3 += '<td><a class="name" href="javascript:;">' + value.gameName + '</a></td>';
					str3 += '<td><a href="javascript:;">' + value.latestSessionNo + '</a></td>';
					str3 += '<td>' + value.time + '</td>';
					str3 += '<td><div><span class="ball">' + o + '</span></div></td>';
					str3 += '<td>' + num_count + '期</td>';
					str3 += '<td>' + rate + '</td>';
					str3 += '<td><a class="c-blue blod" href="draw/'+url+'.html"><img src="../assets/statics/images/details.gif"></a></td>';
					str3 += '<td><a href="trend.html" target="_top"><img src="../assets/statics/images/zst_01.gif"></a></td>';
					str3 += '<td class="b"><a data-url='+url+' class="draw-lottery-btn">投注</a></td>';
					str3 += '</tr>';
				}
				if(type == '12') {
					str4 += '<tr id="_menu_draw_b_3" name="_type_1" class="bgcolor">';
					str4 += '<td><a class="name" href="javascript:;">' + value.gameName + '</a></td>';
					str4 += '<td><a href="javascript:;">' + value.latestSessionNo + '</a></td>';
					str4 += '<td>' + value.time + '</td>';
					str4 += '<td><div><span class="ball">' + o + '</span></div></td>';
					str4 += '<td>' + num_count + '期</td>';
					str4 += '<td>' + rate + '</td>';
					str4 += '<td><a class="c-blue blod" href="draw/'+url+'.html"><img src="../assets/statics/images/details.gif"></a></td>';
					str4 += '<td><a href="trend.html" target="_top"><img src="../assets/statics/images/zst_01.gif"></a></td>';
					str4 += '<td class="b"><a data-url='+url+' class="draw-lottery-btn">投注</a></td>';
					str4 += '</tr>';
				}
				if(type == '4') {
					str5 += '<tr id="_menu_draw_b_3" name="_type_1" class="bgcolor">';
					str5 += '<td><a class="name" href="javascript:;">' + value.gameName + '</a></td>';
					str5 += '<td><a href="javascript:;">' + value.latestSessionNo + '</a></td>';
					str5 += '<td>' + value.time + '</td>';
					str5 += '<td><div><span class="ball">' + o + '</span></div></td>';
					str5 += '<td>' + num_count + '期</td>';
					str5 += '<td>' + rate + '</td>';
					str5 += '<td><a class="c-blue blod" href="draw/'+url+'.html"><img src="../assets/statics/images/details.gif"></a></td>';
					str5 += '<td><a href="trend.html" target="_top"><img src="../assets/statics/images/zst_01.gif"></a></td>';
					str5 += '<td class="b"><a data-url='+url+' class="draw-lottery-btn">投注</a></td>';
					str5 += '</tr>';
				}
				str += '<tr id="_menu_draw_b_3" name="_type_1" class="bgcolor">';
				str += '<td><a class="name" href="javascript:;">' + value.gameName + '</a></td>';
				str += '<td><a href="javascript:;">' + value.latestSessionNo + '</a></td>';
				str += '<td>' + value.time + '</td>';
				str += '<td><div><span class="ball">' + o + '</span></div></td>';
				str += '<td>' + num_count + '期</td>';
				str += '<td>' + rate + '</td>';
				str += '<td><a class="c-blue blod" href="draw/'+url+'.html"><img src="../assets/statics/images/details.gif"></a></td>';
				str += '<td><a href="trend.html" target="_top"><img src="../assets/statics/images/zst_01.gif"></a></td>';
				str += '<td class="b"><a data-url='+url+' class="draw-lottery-btn">投注</a></td>';
				str += '</tr>';
			});
			$('.tbody_list').html(str);
			$('.draw-lottery-btn').on('click',function(){
				parent.window.location.href="../ssc/index.html?module=" + $(this).data('url');
			});
			$('#qbcz').on('click', function() {
				$('#iframeid1').contents().find(".tbody_list").empty().append(str);
				var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
				$('#_iframe_divs1').css('height',iframe2+'px');
			})
			$('#ssc_gp').on('click', function() {
				$('#iframeid1').contents().find(".tbody_list").empty().append(str1);
				var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
				$('#_iframe_divs1').css('height',iframe2+'px');
			})
			$('#klsf').on('click', function() {
				$('#iframeid1').contents().find(".tbody_list").empty().append(str2);
				var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
				$('#_iframe_divs1').css('height',iframe2+'px');
			})
			$('#11x5').on('click', function() {
				$('#iframeid1').contents().find(".tbody_list").empty().append(str3);
				var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
				$('#_iframe_divs1').css('height',iframe2+'px');
			})
			$('#dcp').on('click', function() {
				$('#iframeid1').contents().find(".tbody_list").empty().append(str4);
				var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
				$('#_iframe_divs1').css('height',iframe2+'px');
			})
			$('#pcdd').on('click', function() {
				$('#iframeid1').contents().find(".tbody_list").empty().append(str5);
				var iframe2 = document.getElementById("iframeid1").contentWindow.document.body.scrollHeight;
				$('#_iframe_divs1').css('height',iframe2+'px');
			})
		}

	});
	$('.goCz').on('click', function() {
		console.log($(this));
	});
	
	// 底部信息调用
	function ajaxGetDbxx() {
		ajaxRequest({
			url: CONFIG.BASEURL + "ajaxGetWebInfo.json",
			success: function(json) {
				if(json.result != 1) {
					return;
				}
				$(".webDbxx").html(json.webDbxx);
			}
		});
	}

	if($(".webDbxx").length > 0) {
		ajaxGetDbxx();
	}
});




