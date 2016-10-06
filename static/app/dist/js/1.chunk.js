webpackJsonp([1],{

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(quanMVC){
		
		var ViewController = function(){
			quanMVC.BaseViewController.call(this);
			this.init = function(){
				console.log("activity index view controller init ");
			}
		}
		return Controller;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(quanMVC){
		
		
		
		var ActivityModel = function(){
			var me = this;
			quanMVC.BaseModel.call(this);
			
		}
		
		ActivityModel.addPhotoToAlbum= function(base64File,activity_id,callback){
			ajaxRequest.postAlbumPhoto( base64File,activity_id,callback);
		};
		
		ActivityModel.postActivityPhotos = function(image_ids_list,activity_id,callback){
			ajaxRequest.postActivityPhotos( image_ids_list,activity_id,callback);
		}
		
		ActivityModel.getRecordAndAlbumAmount = function(activiti_id,callback){
			ajaxRequest.getRecordAndAlbumAmount( activity_id,callback);
		}
		
		ActivityModel.sureJoindActivity = function(activity_id,joinState,callback){
			ajaxRequest.sureJoindActivity( activity_id,joinState,callback);
		}
		
		ActivityModel.prototype.fileds = {
			id :{
				type:"string",
			},
			name : {
				type:"string",
				mapping : "title"
			},
			salary :{//薪水
				type : "string"
			},
			salaryUnit : {
				type : "string"
			},
			address : {
				type : "string",
				mapping:"workAddress"
			},
			workStartTime : {
				type : "string",
				mapping:"workDateBegin"
			},
			workEndTime : {
				type : "string",
				mapping : "workDateEnd"
			},
			createTime : {
				type : "string",
				mapping : "create_time"
			},
			modifyTime : {
				type : "string"
			}
		}
		
		var currentSearchActivty = null;
		
		ActivityModel.searchActivty = function(activityCode,callback){
			ajaxRequest.searchActivity(activityCode,function(errmsg,data){
				if(data){
					currentSearchActivty = data;
				}else{
					currentSearchActivty = null;
				}
				if(callback && "function" == typeof callback){
					callback(errmsg,data);
				}
			});
		}
		
		ActivityModel.join = function(callback){
			if(currentSearchActivty){
				var activityCode = currentSearchActivty.id;
				ajaxRequest.joinactivity(activityCode,callback);
			}else {
				if(callback && "function" == typeof callback){
					callback("请选择一个活动",null);
				}
			}
		}
		
		ActivityModel.getActivityId = function(){
			return currentSearchActivty.id;
		}
		
		return ActivityModel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	
	
	
	


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(quanMVC){
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

});
//# sourceMappingURL=1.chunk.js.map