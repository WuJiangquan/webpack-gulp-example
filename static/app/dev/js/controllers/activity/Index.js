require(['../../viewControllers/activity/IndexViewController','quan-mvc',
	'../../models/Activity','../../models/collectors/Activitys','zepto'],
function(IndexViewController,quanMVC,ActivityModel,ActivityCollector,$){
	var viewController = new IndexViewController();
	var Controller = function(){
		quanMVC.BaseController.call(this);
		this.init = function(){
			viewController.init();
			console.log("activity index controller init ");
		}
	}
})