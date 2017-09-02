requirejs(["jquery"], function($) {
	$(document).ready(function () {
        getDrawResult();
        $('#issue_list').change(function () {
            getDrawResult();
        });
        window.parent.$("div[name=iframe_div]").css("height", $("body").height());
    });

    function getDrawResult() {
        var p = $('#issue_list').val();
        var id = $('#lottery-id').val();
        $.ajax({
            url: 'common/drawResult/one',
            type: 'post',
            dataType: 'json',
            data: {period: p, id: id},
            success: function (results) {
               var data=results.data;
               $('#open-time').html(data == null ? '' : data.openTime);
               var html = '';
               if(data == null || !data.content){
                    html += '<li class="red">正</li>'; 
                    html += '<li class="red">在</li>';
                    html += '<li class="red">开</li>';
                    html += '<li class="red">奖</li>';
                } else {
                    $.each(data.content, function (k, v) {
                        html += '<li class=\"col-'+v+'\">' + v + '</li>';
                    });
                }
                $('#gg_draw_result').html(html);
            }
        });
    }

    $(function(){
	    function AddFavorite(sURL, sTitle) {
	        try {
	            window.external.addFavorite(sURL, sTitle);
	        } catch (e) {
	            try {
	                window.sidebar.addPanel(sTitle, sURL, "");
	            } catch (e) {
	                alert("请使用Ctrl+D进行添加");
	            }
	        }
	    }
	    $('div.link_r').find('a').on('click',function(){
	        AddFavorite(location.href,'新彩');
	        return false;
	    });
	});
});