var help = {
    list : function (isReset) {
        if(isReset){
            move.pageIndex=0;
        }
        var mask=move.createLoading();
        mask.show();
        var map = {};
        map['pageIndex'] =move.pageIndex;
        map['device'] ='1';
        var mw=baseObj.mw(map);
        $.ajax({
            url: move.activity,
            data: {
                mw:mw
            },
            type: 'POST',
            dataType:'json',
            success: function (data) {
                console.log(mw);
                mask.close();
                var items = data.data.items;
                console.log(items);
                // for(var i = 0 ; i < 10; i ++){
                //     items.push(items[0]);
                // }

                if(items.length>0) {
                    var str = '';
                    $.each(items, function (index, value) {
                        str += '<div class="mui-card" data-begin="'+value.beginTime+'" data-end="'+value.endTime+'">' +
                            '<div class="mui-card-content">' +
                            '<div class="mui-card-content-inner">' +
                            '<p style="color: #333;">' + value.title + '</p>' +
                            '<p style="font-size: 12px;" >活动时间： ' + value.beginTime +'~'+value.endTime+ '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="mui-card-header mui-card-media" style="background-image:url(' + value.img + ')"></div>' +
                            '<div class="mui-card-footer">' +
                            '<a class="mui-card-link">查看详情</a>' +
                            '<a class="mui-card-link mui-icon mui-icon-arrowright"></a>' +
                            '</div>' +
                            '</div>';
                    });
                    $('.mui-scroll').html(str);
                    mui('#content').pullRefresh().endPullupToRefresh();
                }else{
                    if(move.pageIndex==0){
                        mui('#content').pullRefresh().endPullupToRefresh(true);
                    }else{
                        mui('#content').pullRefresh().endPullupToRefresh(true);
                    }
                }
                $('.mui-card').on('tap',function () {
                    window.location.href='content.html?'+$(this).index();
                    localStorage.setItem('startTime',$(this).data('begin'));
                    localStorage.setItem('endTime',$(this).data('end'));
                })
            }
        });
    },
    listContent: function () {
        var num = window.location.search.split('?')[1];
        var mask=move.createLoading();
        mask.show();
        var map ={};
        map['pageIndex'] =0;
        map['device'] =' ';
        var mw = baseObj.mw(mw);
        $.ajax({
            url: move.activity,
            type: 'POST',
            dataType:'json',
            data: {
                mw:mw
            },
            success: function (data) {
                var items = data.data.items;
                console.log(items);
                mask.close();
                var str = '';
                $.each(items,function (index, value) {
                    var beginTime = new Date(value.beginTime);
                    var endTime = new Date(value.endTime);
                    beginTime = help.getTime(beginTime);
                    endTime = help.getTime(endTime);
                    if(index == num) {
                        str += '<div class="mui-card">'+
                            '<div class="mui-card-content">'+
                            '<div class="mui-card-content-inner">'+
                            '<p style="color: #333;">'+value.title+'</p>'+
                            '<p style="font-size: 12px;">活动时间： '+ localStorage.getItem('startTime') +'~'+localStorage.getItem('endTime')+ '</p>'+
                            '</div>'+
                            '</div>'+
                            '<div class="mui-card-header mui-card-media" style="background-image:url('+value.img+')"></div>'+
                            '<div class="card-detail" style="padding:0 15px 10px 15px!important">'+value.context+'</div>'+
                            '</div>';
                    };
                });
                $('.mui-scroll').html(str);
            }
        });
    },
    getTime : function (time) {
        var year = time.getFullYear();
        var month = time.getMonth()+1;    //js从0开始取
        var date1 = time.getDate();
        if(month< 10){
            month = '0'+month;
        }
        if( date1 < 10){
            date1 = '0'+date1;
        }
        var newTime = year+'/'+month+'/'+date1;
        return newTime;
    }
}
