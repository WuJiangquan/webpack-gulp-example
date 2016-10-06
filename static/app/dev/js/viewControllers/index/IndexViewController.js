define(['quan-mvc'],function(quanMVC){
	return function(){
		this.init = function(){
			quanMVC.BaseViewController.call(this);
			console.log("index indexViewController init");
		}
	}
})