/**
 * StringBuffer对象，实现StringBuffer功用
 */
StringBuffer = function(){
	this._strings = new Array();
	//追加字符串
	this.append = function(str){
		this._strings.push(str);
	}
	this.toString = function(){
	  return this._strings.join("");
	}
	this.clear = function(){
	   this._strings = new Array();
	}
	this.doReverse = function(){
		var str = this._strings.join('') ; 
		str = str.split('');
		return str.reverse().join(''); 
	}
}