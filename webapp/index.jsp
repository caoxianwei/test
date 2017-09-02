<%@page import="com.wanqing.util.StringHandler"%>
<%@page import="com.caicaike.lottery.util.SysConstant"%>
<%@page import="com.caicaike.lottery.lotteryutil.LoteryUtil"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+"/";
String header = request.getHeader("User-Agent");
String domain = LoteryUtil.getInstance().getDomainByUsed(SysConstant.DOMAIN_USED_TYPE_HT);
if(!basePath.equalsIgnoreCase(domain)){
	if(basePath.contains("plat")){
		response.sendRedirect("/plat/index");
	}else{
		if(StringHandler.isNotEmptyOrNull(header)){
			header = header.toUpperCase();
		}
		if(StringHandler.isEmptyOrNull(header) || header.contains("MOBILE")){
			response.sendRedirect("/game");	
		}else{
			response.sendRedirect("/pc");	
		}	
	}	
}else{
	response.sendRedirect("/plat/index");
}

%>
