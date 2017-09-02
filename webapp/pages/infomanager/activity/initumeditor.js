var content = $("#content").val();
var um = UM.getEditor('myEditor');
if(!$.isEmpty(content)){
	content = $.strDencode(content);
	content = content.replace(/\+/g," ");
	um.setContent(content);
}
