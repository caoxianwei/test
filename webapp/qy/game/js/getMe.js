var pathName = window.location.pathname.split('/')[2].split('.')[0];
$('head').append('<script type="text/javascript" src="js/mui/mui.min.js?time='+new Date().getMilliseconds()+'"></script>\
    <script type="text/javascript" src="js/mui/mui.min.js?time='+new Date().getMilliseconds()+'"></script>\
    <script type="text/javascript" src="js/move.js?time='+new Date().getMilliseconds()+'"></script>\
    <script type="text/javascript" src="js/'+pathName+'.js?time='+new Date().getMilliseconds()+'"></script>\
    <script type="text/javascript" src="js/rollups/tripledes.js?time='+new Date().getMilliseconds()+'"></script>\
    <script type="text/javascript" src="js/components/mode-ecb.js?time='+new Date().getMilliseconds()+'"></script>\
    <link type="text/css" rel="stylesheet" href="css/mui/mui.min.css?time='+new Date().getMilliseconds()+'" />\
    <link type="text/css" rel="stylesheet" href="css/base.css?time='+new Date().getMilliseconds()+'" />\
    <link type="text/css" rel="stylesheet" href="css/'+pathName+'.css?time='+new Date().getMilliseconds()+'" />');