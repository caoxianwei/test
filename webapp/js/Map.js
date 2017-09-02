/**
 * JavaScript 实现Map功能
 */
Map = function(){
   this.elements = new Array();
   
   //返回此映射中的键-值映射关系数
   this.size = function(){
      return this.elements.length;
   }   
   //如果此映射未包含键-值映射关系，则返回 true。
   this.isEmpty = function(){
      return (this.elements.length<1);
   }
   //从此映射中移除所有映射关系
   this.clear = function(){
     this.elements = new Array();
   }
   //将指定的值与此映射中的指定键关联
   this.put = function(_key,_value){
	  for(var i = 0;i<this.elements.length;i++){
  		 if(this.elements[i].key == _key){
  		   return;
  		 }
      }
      this.elements.push({
        key:_key,
        value:_value
      });
   }
   //如果此映射包含指定键的映射关系，则返回 true。更确切地讲，当且仅当此映射包含针对满足 (key==null ? k==null : key.equals(k)) 的键 k 的映射关系时，返回 true。（最多只能有一个这样的映射关系）。 
   this.containsKey = function(_key){
	   var falg = false;
	   for(var i = 0;i<this.elements.length;i++){
  		 if(this.elements[i].key == _key){
  		    falg = true;
  		    break;
  		 }
	   }
	   return falg;
   }
   //如果存在一个键的映射关系，则将其从此映射中移除
   this.remove = function(_key){
      var flag = false;
      try{
      	for(var i = 0;i<this.elements.length;i++){
      		if(this.elements[i].key == _key){
      		   this.elements.splice(i,1);
      		   flag = true;
      		   break;
      		}
      	}
      }catch(e){
        flag = false;
      }
      return flag;
   }
   //返回指定键所映射的值；如果此映射不包含该键的映射关系，则返回 null
   this.get = function(_key){
     try{
      	for(var i = 0;i<this.elements.length;i++){
      		if(this.elements[i].key == _key){
      		   return this.elements[i].value;
      		}
      	}
      }catch(e){
        return null;
      }
   }
   //返回此映射中包含的值的数组
   this.values = function(){
      var arr = new Array();
      for(var i = 0;i<this.elements.length;i++){
      	 arr.push(this.elements[i].value);
      }
      return arr;
   }
   // 返回此映射中包含的键的数组
   this.keySet = function(){
      var arr = new Array();
      for(var i = 0;i<this.elements.length;i++){
      	 arr.push(this.elements[i].key);
      }
      return arr;
   }
}