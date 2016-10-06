define(['quan-mvc'],function(quanMVC){
	
	var ViewController = function(){
		quanMVC.BaseViewController.call(this);
		this.init = function(){
			console.log("activity index view controller init ");
		}
	}
	return Controller;
})