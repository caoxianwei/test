/**
 * JavaScript 中的Set集合实现
 */
Set = function(){
	this.elements = new Array();
	//如果 set 包含指定的元素，则返回 true
	this.containsValue = function(_value){   	  
      var b = false;
      try{
      	 for(var i = 0;i<this.elements.length;i++){
      	    if(this.elements[i]==_value){
      	       b = true;
      	       break;
      	    }
      	 }
      }catch(e){
         b = false;
      }
      return b;
   }
   //如果 set 中尚未存在指定的元素，则添加此元素
   this.add = function(_value){   	 
      var b = this.containsValue(_value);      
      if(!b){
         this.elements.push(_value);
      }
   }
   
   this.size = function(){
      return this.values().length;
   }
   
   //返回Set中所有值的数组
   this.values = function(){
      var arr = new Array();
      for(var i = 0;i<this.elements.length;i++){
        arr.push(this.elements[i]);
      }
      return arr;
   }   
    //删除指定的值
   this.deletes = function(_value){
      try{
      	var len = this.elements.length;
      	for(var i = 0;i<len;i++){
      	   if(this.elements[i]==_value){
      	      this.elements.splice(i,1);
      	      break;
      	   }
      	}
      }catch(e){}
   }   
   //清除所以的值
   this.clear = function(){
     this.elements = new Array();
   }
}