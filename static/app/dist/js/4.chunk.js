webpackJsonp([4],{

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

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(quanMVC){
		return function(){
			this.init = function(){
				quanMVC.BaseViewController.call(this);
				console.log("index indexViewController init");
			}
		}
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(quanMVC){
		var RecordModel = function(){
			var me = this;
		}
		
		RecordModel.postRecordAlbum = function(base64File,callback){
			ajaxRequest.postEditPhoto( base64File,callback);
		};
		
		RecordModel.addRecord = function(record,activity_id,callback){
			ajaxRequest.addRecordToActivity( record,activity_id,callback);
		}
		
		RecordModel.editRecord = function(recordId,record,activity_id,callback){
			ajaxRequest.editRecord( recordId,record ,activity_id,callback);
		}
		
		RecordModel.prototype.fileds = {
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
		
		return RecordModel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	
	
	
	
	


/***/ }

});
//# sourceMappingURL=4.chunk.js.map