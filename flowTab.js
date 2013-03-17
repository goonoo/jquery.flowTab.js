/**
 * flowTab: Tab plugin for flow contents
 * by 겨미겨미 (miya.pe.kr)
 *
 * Copyright (c) 2010 겨미겨미 (miya.pe.kr)
 * Dual licensed under the MIT and GPL licenses.
 *
 * markup example
 *	<div id="tabs">
 *		<h2 class="heading">tab1</h2>
 *		<div>tab1 content</div>
 *		<h2 class="heading">tab2</h2>
 *		<div>tab2 content</div>
 *	</div>
 *
 */
;(function() {
	/*
		Developed by Robert Nyman, http://www.robertnyman.com
		Code/licensing: http://code.google.com/p/getelementsbyclassname/
	*/	
	var getElementsByClassName = function (className, tag, elm){
		if (document.getElementsByClassName) {
			getElementsByClassName = function (className, tag, elm) {
				elm = elm || document;
				var elements = elm.getElementsByClassName(className),
					nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
					returnElements = [],
					current;
				for(var i=0, il=elements.length; i<il; i+=1){
					current = elements[i];
					if(!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		else if (document.evaluate) {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
					classesToCheck = "",
					xhtmlNamespace = "http://www.w3.org/1999/xhtml",
					namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
					returnElements = [],
					elements,
					node;
				for(var j=0, jl=classes.length; j<jl; j+=1){
					classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
				}
				try	{
					elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
				}
				catch (e) {
					elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
				}
				while ((node = elements.iterateNext())) {
					returnElements.push(node);
				}
				return returnElements;
			};
		}
		else {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
					classesToCheck = [],
					elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
					current,
					returnElements = [],
					match;
				for(var k=0, kl=classes.length; k<kl; k+=1){
					classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
				}
				for(var l=0, ll=elements.length; l<ll; l+=1){
					current = elements[l];
					match = false;
					for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
						match = classesToCheck[m].test(current.className);
						if (!match) {
							break;
						}
					}
					if (match) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		return getElementsByClassName(className, tag, elm);
	};

	/**
	 * from http://www.openjs.com/scripts/dom/class_manipulation.php
	 */
	function hasClass(ele,cls) {
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	};
	function addClass(ele,cls) {
		if (!this.hasClass(ele,cls)) ele.className += " "+cls;
	};
	function removeClass(ele,cls) {
		if (hasClass(ele,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			ele.className=ele.className.replace(reg,' ');
		};
	};

	/**
	 * Copyright © 2001 by Scott Andrew LePera
	 */
	function addEvent(obj, evType, fn, useCapture){
		if (obj.addEventListener){
			obj.addEventListener(evType, fn, useCapture);
			return true;
		} else if (obj.attachEvent){
			var r = obj.attachEvent("on"+evType, fn);
			return r;
		} else {
			alert("Handler could not be attached");
		}
	};

	window.flowTab = function(el, options) {
		this.el = el;
		this.options = {
			tabClassName: options.tabClassName ? options.tabClassName : 'heading',
			tabEnabledClass: options.tabEnabledClass ? options.tabEnabledClass : 'headingEnabled',
			contentDisabledClass: options.contentDisabledClass ? options.contentDisabledClass : 'disabled',
		};

		this.tabEls = getElementsByClassName(this.options.tabClassName, false, el);
		this.contentEls = [];
		for (var i=0; i<this.tabEls.length; i++) {
			this.contentEls.push(this.tabEls[i].nextSibling);
		};

		this.init();
	};
	
	window.flowTab.prototype = {
		init: function() {
			var self = this;
			this.select(0);

			for (var i=0; i<this.tabEls.length; i++) {
				var tabEl = this.tabEls[i];
				tabEl.setAttribute('tabindex', 0);
				addEvent(tabEl, 'focus', function() {
					self._onFocusTabEl(this);
				}, false);
			};
		},

		_onFocusTabEl: function(tabEl) {
			for (var i=0; i<this.tabEls.length; i++) {
				if (this.tabEls[i] == tabEl)
					this.select(i);
			};
		},

		select: function(idx) {
			for (var i=0; i<this.tabEls.length; i++) {
				if (i == idx) {
					addClass(this.tabEls[i], this.options.tabEnabledClass);
					removeClass(this.contentEls[i], this.options.contentDisabledClass);
				} else {
					removeClass(this.tabEls[i], this.options.tabEnabledClass);
					addClass(this.contentEls[i], this.options.contentDisabledClass);
				};
			};
		}
	};
})();
