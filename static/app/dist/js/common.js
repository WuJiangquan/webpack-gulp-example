webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(8),
	__webpack_require__(9),__webpack_require__(10),__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Validator,templateEngine,BaseModel,BaseForm,
	BaseCollector,BaseViewController,BaseController){
		var quanMVC = {
			Validator : Validator,
			template : templateEngine.template,
			BaseModel : BaseModel,
			BaseForm : BaseForm,
			BaseCollector : BaseCollector,
			BaseViewController : BaseViewController,
			BaseController : BaseController,
			Ajax :  Ajax
		}
	
		return quanMVV;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
		var Validtor = function(){
			this.phone = function(phone){
				return  /^1\d{10}$/.test(phone);
			};
			
			this.string = function(data){
				return 'string' == typeof data;
			};
			
			this.number = function(data){
				return !isNaN(data);
			};
			
			this.email = function(data){
				return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(data);
			};
			
			this.length = function(data,length){
				var datastr = data + "";
				return datastr.length == length;
			};
			
			this.min = function(data,min){
				if('string' == typeof data){
					data = parseFloat(data);
				}
				if(isNaN(data)){
					return false;
				}
				
				return data > min;
			};
			
			this.max = function(data,max){
				if('string' == typeof data){
					data = parseFloat(data);
				}
				if(isNaN(data)){
					return false;
				}
				
				return data < max;
			};
			
			this.presence = function(data){
				if(isNaN(data)){
					return ("" != !!data);
				}
				return true;
			};
			
			this.format = function(data,format){
				return format.test(data);
			};
			
			this.isFieldValid = function(data,field){
				var verifications = field.verifycation;
				var type = field.type;
				if(type && !this[type](data)){
					return false;
				}
				if(verifications){
					for(var verificationsItem in verifications){
						if(this[verificationsItem] && !this[verificationsItem](data,verifications[verificationsItem].standard)){
							return false;
						}
					}
				}
				return true;
			};
		}
		return Validtor;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
		 // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
		 // IE 11 (#1621), and in Safari 8 (#1929).
		 var _ = {};
		 if (typeof /./ != 'function' && typeof Int8Array != 'object') {
		   _.isFunction = function(obj) {
		     return typeof obj == 'function' || false;
		   };
		 }
		 
		 var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
		 // Create quick reference variables for speed access to core prototypes.
		 var
		   push             = ArrayProto.push,
		   slice            = ArrayProto.slice,
		   toString         = ObjProto.toString,
		   hasOwnProperty   = ObjProto.hasOwnProperty;
	
		 // All **ECMAScript 5** native function implementations that we hope to use
		 // are declared here.
		 var
		   nativeIsArray      = Array.isArray,
		   nativeKeys         = Object.keys,
		   nativeBind         = FuncProto.bind,
		   nativeCreate       = Object.create;
	
		 
		 
		 // By default, Underscore uses ERB-style template delimiters, change the
		 // following template settings to use alternative delimiters.
		 _.templateSettings = {
		   evaluate    : /<%([\s\S]+?)%>/g,
		   interpolate : /<%=([\s\S]+?)%>/g,
		   escape      : /<%-([\s\S]+?)%>/g
		 };
	
		 // When customizing `templateSettings`, if you don't want to define an
		 // interpolation, evaluation or escaping regex, we need one that is
		 // guaranteed not to match.
		 var noMatch = /(.)^/;
	
		//Certain characters need to be escaped so that they can be put into a
		 // string literal.
		 var escapes = {
		   "'":      "'",
		   '\\':     '\\',
		   '\r':     'r',
		   '\n':     'n',
		   '\u2028': 'u2028',
		   '\u2029': 'u2029'
		 };
	
	
		 var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
		 var escapeChar = function(match) {
		   return '\\' + escapes[match];
		 };
		 
	
	
		 // Internal function that returns an efficient (for current engines) version
		 // of the passed-in callback, to be repeatedly applied in other Underscore
		 // functions.
		 var optimizeCb = function(func, context, argCount) {
		   if (context === void 0) return func;
		   switch (argCount == null ? 3 : argCount) {
		     case 1: return function(value) {
		       return func.call(context, value);
		     };
		     case 2: return function(value, other) {
		       return func.call(context, value, other);
		     };
		     case 3: return function(value, index, collection) {
		       return func.call(context, value, index, collection);
		     };
		     case 4: return function(accumulator, value, index, collection) {
		       return func.call(context, accumulator, value, index, collection);
		     };
		   }
		   return function() {
		     return func.apply(context, arguments);
		   };
		 };
	
		 // The cornerstone, an `each` implementation, aka `forEach`.
		 // Handles raw objects in addition to array-likes. Treats all
		 // sparse array-likes as if they were dense.
		 _.each = _.forEach = function(obj, iteratee, context) {
		   iteratee = optimizeCb(iteratee, context);
		   var i, length;
		   if (isArrayLike(obj)) {
		     for (i = 0, length = obj.length; i < length; i++) {
		       iteratee(obj[i], i, obj);
		     }
		   } else {
		     var keys = _.keys(obj);
		     for (i = 0, length = keys.length; i < length; i++) {
		       iteratee(obj[keys[i]], keys[i], obj);
		     }
		   }
		   return obj;
		 };
	
		 
		 // Retrieve the names of an object's own properties.
		  // Delegates to **ECMAScript 5**'s native `Object.keys`
		  _.keys = function(obj) {
		    if (!_.isObject(obj)) return [];
		    if (nativeKeys) return nativeKeys(obj);
		    var keys = [];
		    for (var key in obj) if (_.has(obj, key)) keys.push(key);
		    // Ahem, IE < 9.
		    if (hasEnumBug) collectNonEnumProps(obj, keys);
		    return keys;
		  };
		 
		//Shortcut function for checking if an object has a given property directly
		 // on itself (in other words, not on a prototype).
		 _.has = function(obj, key) {
		   return obj != null && hasOwnProperty.call(obj, key);
		 };
	
		 // Is a given variable an object?
		 _.isObject = function(obj) {
		   var type = typeof obj;
		   return type === 'function' || type === 'object' && !!obj;
		 };
		 
		 var property = function(key) {
		    return function(obj) {
		      return obj == null ? void 0 : obj[key];
		    };
		  };
	
		  // Helper for collection methods to determine whether a collection
		  // should be iterated as an array or as an object
		  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
		  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
		  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
		  var getLength = property('length');
		  var isArrayLike = function(collection) {
		    var length = getLength(collection);
		    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
		  };
		//Determine if the array or object contains a given item (using `===`).
		 // Aliased as `includes` and `include`.
		 _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
		   if (!isArrayLike(obj)) obj = _.values(obj);
		   if (typeof fromIndex != 'number' || guard) fromIndex = 0;
		   return _.indexOf(obj, item, fromIndex) >= 0;
		 };
		 
		 // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
		 var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
		 var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
		                     'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
		 
		 function collectNonEnumProps(obj, keys) {
			    var nonEnumIdx = nonEnumerableProps.length;
			    var constructor = obj.constructor;
			    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
			    // Constructor is a special case.
			    var prop = 'constructor';
			    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
			    while (nonEnumIdx--) {
			      prop = nonEnumerableProps[nonEnumIdx];
			      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
			        keys.push(prop);
			      }
			    }
			  }
		//Retrieve all the property names of an object.
		 _.allKeys = function(obj) {
		   if (!_.isObject(obj)) return [];
		   var keys = [];
		   for (var key in obj) keys.push(key);
		   // Ahem, IE < 9.
		   if (hasEnumBug) collectNonEnumProps(obj, keys);
		   return keys;
		 };
		 //An internal function for creating assigner functions.
		 var createAssigner = function(keysFunc, undefinedOnly) {
		   return function(obj) {
		     var length = arguments.length;
		     if (length < 2 || obj == null) return obj;
		     for (var index = 1; index < length; index++) {
		       var source = arguments[index],
		           keys = keysFunc(source),
		           l = keys.length;
		       for (var i = 0; i < l; i++) {
		         var key = keys[i];
		         if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
		       }
		     }
		     return obj;
		   };
		 };
		 
		  // Fill in a given object with default properties.
		  _.defaults = createAssigner(_.allKeys, true);
		 
		  _.template = function(text, settings, oldSettings) {
		    if (!settings && oldSettings) settings = oldSettings;
		    settings = _.defaults({}, settings, _.templateSettings);
	
		    // Combine delimiters into one regular expression via alternation.
		    var matcher = RegExp([
		      (settings.escape || noMatch).source,
		      (settings.interpolate || noMatch).source,
		      (settings.evaluate || noMatch).source
		    ].join('|') + '|$', 'g');
	
		    // Compile the template source, escaping string literals appropriately.
		    var index = 0;
		    var source = "__p+='";
		    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
		      source += text.slice(index, offset).replace(escaper, escapeChar);
		      index = offset + match.length;
	
		      if (escape) {
		        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
		      } else if (interpolate) {
		        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
		      } else if (evaluate) {
		        source += "';\n" + evaluate + "\n__p+='";
		      }
	
		      // Adobe VMs need the match returned to produce the correct offest.
		      return match;
		    });
		    source += "';\n";
	
		    // If a variable is not specified, place data values in local scope.
		    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
		    source = "var __t,__p='',__j=Array.prototype.join," +
		      "print=function(){__p+=__j.call(arguments,'');};\n" +
		      source + 'return __p;\n';
	
		    try {
		      var render = new Function(settings.variable || 'obj', '_', source);
		    } catch (e) {
		      e.source = source;
		      throw e;
		    }
	
		    var template = function(data) {
		      return render.call(this, data, _);
		    };
	
		    // Provide the compiled source as a convenience for precompilation.
		    var argument = settings.variable || 'obj';
		    template.source = 'function(' + argument + '){\n' + source + '}';
	
		    return template;
		  };
		  return _;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Validtor){
		var BaseModel = function(){
			var me = this;
			var validtor = new Validtor();
			/*map local model to server model*/
			this.getPostMappingRecord = function(){
				var newRecord = {};
				var fields = me['fields'];
				for(var element in fileds){
					var mapping = fileds[element]['mapping'] || element;
					newRecord[mapping] = me[element];
				}
				return newRecord
			}
			
			//map server model to local model
			this.setMappingRecord = function(record){
				var fields = me['fields'];
				for(var el in fields){
					var mapping = fileds[element]['mapping'] || element;
					me[el] = record[mapping];
				}
			}
			
			this.save = function(callback){
				if(model.doSave && "function" == typeof model.doSave)
					model.doSave(callback);
			}
			
			this.resetRecrod = function(newRecrod){
				var fields = me['fields'];
				for(var el in fields){
					me[el] = newRecrod[el] || me[el];
				}
			}
			
			this.set = function(proName,val){			
				me[proName] = val;
			}
			
			this.validate = function(callback){
				var fields = me['fields'];
				for(element in fields){
					var data = me[element];
					var verification = fields[element].verification;
					if(verification){
						for(var validateItem in verification){
							if(validtor[validateItem] && !validtor[validateItem](data,verification[validateItem].standard)){
								callback(verification[validateItem].errmsg);
								return
							}
						}
						
					}
				}
				callback("");
			}
			
			this.initMappingFields = function(){
				var fields = me['fields'];
				for(var el in fields){
					if(!fields[el]['mapping']){
						fields[el]['mapping'] = el;
					}
				}
			}
		}
		
		return BaseModel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5),__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseModel,Ajax){
		var ajax = new Ajax();
		var BaseForm = function(){
			BaseModel.call(this);
			this.action = "";
			this.method = "post";
			var me = this;
	
			this.setHeader = function(name,value){
				ajax.setHeader(name,value);
			};
	
			this.setAction = function(action){
				if("get" == this.action){
					this.action = "get";
				}else{
					this.action = "post";
				}
			}
	
			this.setAction = function(action){
				this.action = action;
			}
	
			this.collector = function(){
				if(!this.fields){
					throw new Error("you are require to add fields to  form" + this.name||"");
					return;
				}
				for(var iel in this.fields){
					var selector = "#" + this.fields[el].selector || el;
					var $selector = document.querySelector(context);
					if(!$selector){
						throw new Error("can not query the selector of fiedl " + el + " in form " + this.name||"");
						return;
					}
					this[el] = $selector.value;
				}
			}
	
			this.submit = function(callback){
				this.validate(function(errmsg){
					if(errmsg){
						callback(errmsg,"");
					}else{
						var postRecord = me.getPostMappingRecord();
						ajax[me.method](me.action,postRecord,callback);
					}
				});
			}
		}
	
		return BaseForm;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
		var Ajax = function(){
			var me = this;
			var request ;
			
			
			this.createHttpRequestObject = function(){
				
				if(window.XMLHttpRequest){
					return new XMLHttpRequest();
				}else if(window.ActiveXObject){
					try{
						return new ActiveXObject("Msxm12.XMLHTTP");
					}catch(e){
						try{
							return new ActiveXObject("Microsoft.XMLHTTP");
						}
						catch(e){
							
						}
					}
				}
				return null;
			};
			
			this.getrequest = function(){
				if(!request){
					request = this.createHttpRequestObject();;
				}
				return  request;
			} 
			
			
			
			this.processRespone = function(callBack){
				if(me.request.readyState == 4){
					if(me.request.status == 200){
						var response = me.request.responseText;
						if('string' == typeof response){
							response = JSON.parse(response);
						}
						callBack(response);
					}
				}
			};
			
			this.parseParmeter = function(obj){//子元素是对象的情况尚未考虑
				var newParameter = '';
				for(var element in obj){
					//obj[element] = obj[element].replace(/\+/g, "%2B");
					//obj[element] = obj[element].replace(/&/g,"%26");
					//obj[element] = escape(obj[element]);
					obj[element] = encodeURIComponent(obj[element]);
					newParameter += element+'=' + obj[element]+'&';
				};
				return newParameter.substring(0,newParameter.length - 1);	
			};
			
			this.post = function(url,parameter,callback){
				var request = this.getrequest();
				var parameterStr = this.parseParmeter(parameter);
				request.onreadystatechange = function(respone){
					me.processRespone(callback);
				};
				request.open("POST",url,true);
				request.setHeader('Charset',"utf-8");
				request.setHeader('Accept',"application/json");
				request.setHeader('Content-Type',"application/x-www-form-urlencoded;application/json;utf-8");
				request.send(parameterStr);
			};
	
			this.setHeader = function(name,value){
				var request = this.getrequest();
				request.setRequestHeader(name,value);
			}
			
			this.get = function(url,callback,parameter){
				var request = this.getrequest();
				var parameterStr = parameter?this.parseParmeter(parameter):"";
				request.onreadystatechange = function(respone){
					me.processRespone(callback);
				};
				if("" == parameterStr){
					request.open("GET",url,true);
				}else{
					request.open("GET",url+"?"+parameterStr,true);
				}
				request.send(null);
			};
	
		}
	
		return Ajax;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
		var BaseCollector = function(Model){
			var me = this;
			
			//all items had laoded.Not a single page;
			this.items = [];
			this.pageSize = 15;
			
			this.hasLoadMore = true;
			this.currentPageNumber = 1;
			
			//Is load in page? Or change it in children Class;
			this.isInPage = false;
			
			this.setPageSize = function(pageSize){
				this.getPageSize = pageSize;
			}
			
			this.isHasLoadMore = function(){
				return this.hasLoadMore;
			}
			
			this.resetHasLoadMore = function(hasLoadMore){
				this.hasLoadMore = hasLoadMore;
			}
			
			this.getItems = function(){
				return this.items;
			}
			
			
			this.clear = function(){
				this.hasLoadMore = true;
				this.currentPageNumber = 1;
				this.items = [];
			}
			
			this.mappingItems = function(items){
				var newItems = new Array();
				for(var i = 0,len = items.length;i<len;i++){
					var item = new Model();
					item.setMappingRecord(items[i]);
					newItems.push(item)
				}
				
				return newItems;
			}
			
			this.loadMoreItems = function(parameter,callBack){
				if(me.hasLoadMore){
					this.doLoadMore(parameter,function(error,datas,hasNext,count,totalPageLength){
						if(error && callBack){
							callBack(error,null);
						}
						if(datas && datas.length>0){
							me.addItems(me.mappingItems(datas));
						}
						me.hasLoadMore = hasNext;
						me.totalPageLength = totalPageLength;
						if(callBack && "function" == typeof callBack){
							if(me.inpage)
								callBack(null,me.getLastPage());
							else
								callBack(null,me.getItems());
						}
					})
				}
			}
			
			this.loadAllItems = function(callBack){
				this.doLoadAllItems(function(err,datas){
					if(error && callBack){
						callBack(error,null);
					}
					if(datas && datas.length>0 && callBack && "function" == typeof callBack){
						var mappingDatas = me.mappingItems(datas);
						callBack(null,mappingDatas);
					}
				})
			}
			
			this.reLoadMoreItems = function(parameter,callBack){
				this.clear();
				this.loadMoreItems(parameter, callBack);
			}
			
			
			this.addItems = function(items){
				this.items = this.items.concat(items);
			}
			
			this.loadIndexPage = function(index,parameter,callBack){
				this.items = [];
				me.currentPageNumber = index;
				this.loadMoreItems(parameter, callBack);
			}
			
			this.loadFirstPage = function(parameter,callBack){
				me.loadIndexPage(1,parameter,callBack);
			}
			
			this.loadNextPage = function(parameter,callBack){
				if(me.hasLoadMore){
					me.loadIndexPage(me.currentPageNumber + 1,parameter,callBack);
				}
			}
			
			this.loadPrevPage  = function(parameter,callBack){
				var currentPageNumber = me.currentPageNumber;
				if(currentPageNumber>1){
					me.loadIndexPage(currentPageNumber-1,parameter,callBack);
				}
			}
			
			this.loadLastPage = function(parameter,callBack){
				me.loadIndexPage(me.totalPageLength,parameter,callBack);
			}
		}
		
		return BaseCollector;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
		return function(){
			this.init = function(){
				console.log('this is base controller');
			}
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
		return function(){
			this.test = "baseController";
	
			this.saveSession= function(name,val){
				window.sessionStorage[name] = val;
			}
	
			this.getSession = function(name){
				return window.sessionStorage[name] || "";
			}
	
			this.startNewWebpage = function(webPageHref){
				window.location.href = webPageHref;
			}
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
]);
//# sourceMappingURL=common.js.map