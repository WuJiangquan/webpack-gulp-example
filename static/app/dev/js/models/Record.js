define(['quan-mvc'],function(quanMVC){
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
})





