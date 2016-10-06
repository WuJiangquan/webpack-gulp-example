require(['../../viewControllers/index/IndexViewController','quan-mvc',
	'../../models/Record','../../models/collectors/Activitys','zepto'],
function(ViewController,quanMVC,RecordModel,ActivityCollector,$){
	var viewController = new ViewController();
	var wu = "wujiangquanhaha";
	var Controller = function (){
		quanMVC.BaseController.call(this);
		this.init = function(){
			viewController.init();
			console.log("index Index Controller init");
		}
	}

});
