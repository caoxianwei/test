$.ajax({
	url: CONFIG.BASEURL + 'baseData_activity',
	type: 'get',
	dataType: 'json',
	success: function(json) {
		var data = json.data.items;
		var str = '';
		for(var i = 0 ; i < data.length ; i++) {

			str +='<table cellpadding="0" cellspacing="0" border="0" class="ac_list_table">\
				<tbody>\
					<tr>\
						<td class="ac_img ac_img'+i+'">\
						<a href="javascript:;"><img src="'+data[i].img+'"></a></td>\
						<td>\
							<div class="td_wrapper td_wrapper1">\
							<h2 class="activity">'+data[i].title+'</h2><div class="time_2">发布时间:'+data[i].beginTime+'</div><div class="time_2">结束时间:'+data[i].releaseTime+'</div></div>\
						</td>\
					</tr>\
				</tbody>\
			</table>\
			<div id="activity_'+i+'" class="xialawz" style="display: none;">\
					<div class="content">'+data[i].context+'</div></div>';
		};
		$("#act_1").html(str);
	}
});