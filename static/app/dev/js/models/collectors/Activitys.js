define(['quan-mvc'],function(quanMVC){
	var ActivityCollector = function(){
		this.inpage = false;
		var me = this;
		this.operatorInfomation = {};
		this.getItemsByType = function(type){
			var newitems = [];
			for(var i =0;i<this.items.length;i++){
				if(type == this.items[i].type){
					newitems.push(this.items[i]);
				}
			}
			return newitems;
		}
		
		this.getType = function(){
			return me.operatorInfomation.type;
		}
		
		this.getOperator = function(){
			return me.operatorInfomation.operator;
		}
		
		me.saveType = function(type,operator){
			me.operatorInfomation.type = type;
			me.operatorInfomation.operator = operator;
		}
		
		this.doLoadMore = function(parameter,callBack){
			ajax.getProducts(parameter.phone,function(error,datas){
				if(datas && ("广东 移动" == datas.operator || "广东 联通" == datas.operator)){
					me.saveType(datas.phone_type || "",datas.operator || "");
					callBack(error,datas.results ,true);
				}else{
					callBack("目前只支持广东联通和广东移动的用户",[],true);
				}
				
			});
		}
		quanMVC.BaseCollector.call(this,Product);
	}
});