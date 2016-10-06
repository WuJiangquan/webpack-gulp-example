
define(['quan-mvc'],function(quanMVC){
	
	
	
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
});





