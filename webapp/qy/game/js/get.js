var pathName = window.location.pathname.split('/')[2];
$('head').append('<script type="text/javascript" src="../js/move.js?time='+new Date().getMilliseconds()+'"></script>');
$('head').append('<script type="text/javascript" src="../js/'+pathName+'.js?time='+new Date().getMilliseconds()+'"></script>');
$('head').append('<script type="text/javascript" src="../js/rollups/tripledes.js?time='+new Date().getMilliseconds()+'"></script>');
$('head').append('<script type="text/javascript" src="../js/components/mode-ecb.js?time='+new Date().getMilliseconds()+'"></script>');
$('head').append('<link type="text/css" rel="stylesheet" href="../css/'+pathName+'.css?time='+new Date().getMilliseconds()+'" />');
$('head').append('<link type="text/css" rel="stylesheet" href="../css/base.css?time='+new Date().getMilliseconds()+'" />');