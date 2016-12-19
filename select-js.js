/*!
 * Select.JS
 * Version: 1.0.15
 *
 * Copyright 2016 Wolfgang Kurz
 * Released under the MIT license
 * https://github.com/WolfgangKurz/Select-JS
 */
"use strict";
!function(){
	var selectjs = {
		initialized: false
	};
	var selectjs_initialize = function(){
		document.addEventListener("click", function(e){
			var x = e.target, obj = null;
			while(x != null){
				if(!("tagName" in x)) break;
				if(x.tagName.toLowerCase()=="body") break;
				if( (" "+x.className+" ").indexOf(" select-js ")>=0 ){
					obj = x;
					break;
				}
				x = x.parentNode;
			}
			var selects = document.querySelectorAll(".select-js.dropdown");
			for(var i=0; i<selects.length; i++){
				if(obj==selects[i]) continue;

				var clnm = " "+selects[i].className+" ";
				clnm = clnm.replace(" dropdown ", " ");

				while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
				selects[i].className = clnm.trim();
			}
		});
	};

	HTMLElement.prototype.selectjs = function(params){
		var paramlist = {};
		if(typeof params!="undefined"){
			for(var i in params)
				paramlist[i] = params[i];
		}

		var target = this;
		if(!selectjs.initialized) selectjs_initialize();

		var editable = false, is_autofilter = false, is_customfilter = false;
		{
			var clnm = " "+target.className+" ";
			editable = clnm.indexOf(" select-js-editable ")>=0;
			is_autofilter = clnm.indexOf(" select-js-autofilter ")>=0;
			is_customfilter = clnm.indexOf(" select-js-customfilter ")>=0;
		}

		var prev = target.parentNode;
		if( (" "+prev.className+" ").indexOf(" select-js ")<0 ) prev = null;
		else prev.parentNode.insertBefore(target, prev);

		var wrapper = document.createElement("div");
		var opts = document.createElement("div");
		var display;

		if(editable) {
			display = document.createElement("input");
			display.autocomplete = "off";
			if(target.name.length>0) display.name = target.name;
			if(target.id.length>0) display.id = target.id;
			if(target.className.length>0) display.className += " "+target.className;
			if(target.getAttribute("placeholder")!=null) display.placeholder = target.getAttribute("placeholder");
		} else {
			display = document.createElement("div");
		}

		var toggle = function(open){
			var clnm = " "+wrapper.className+" ";

			if(typeof open=="undefined")
				open = clnm.indexOf(" dropdown ")<0;

			if(open) clnm += (clnm.indexOf(" dropdown ")<0 ? " dropdown" : "");
			else clnm = clnm.replace(" dropdown ", " ");

			while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
			wrapper.className = clnm.trim();

			var current = opts.querySelector(".select-js-option.selected");
			if(current!=null){
				if(opts.scrollTo) opts.scrollTo(0, current.offsetTop - opts.clientHeight/2);
				else opts.scrollTop = current.offsetTop - opts.clientHeight/2;
			}
		};
		var update = function(lazyfilter){
			if(typeof lazyfilter=="undefined") lazyfilter = null;

			var all = opts.querySelectorAll(".select-js-option.selected");
			for(var i=0; i<all.length; i++){
				var clnm = " "+all[i].className+" ";
				clnm = clnm.replace(" selected ", " ");

				while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
				all[i].className = clnm.trim();
			}

			if(is_customfilter && (lazyfilter!=null || "customfilter" in paramlist)){
				all = opts.querySelectorAll(".select-js-option.select-js-customopt");
				for(var i=0; i<all.length; i++) all[i].parentNode.removeChild( all[i] );

				all = opts.querySelectorAll(".select-js-option");
				for(var i=0; i<all.length; i++){
					var clnm = " "+all[i].className+" ";
					clnm = clnm.replace(" select-js-filtered ", " ");

					if(target.value.length==0 || all[i].innerHTML.indexOf(target.value)>=0)
						clnm += " select-js-filtered";

					while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
					all[i].className = clnm.trim();
				}

				all = opts.querySelectorAll(".select-js-option");
				all = lazyfilter!=null ? lazyfilter : paramlist["customfilter"](target.value, all);
				for(var i=0; i<all.length; i++){
					var opt = document.createElement("div");
					opt.className = "select-js-option select-js-filtered select-js-customopt";
					opt.innerHTML = all[i].display;
					opt.setAttribute("data-value", all[i].value);
					opt.addEventListener("click", function(){
						target.value = this.getAttribute("data-value");

						if(document.createEventObject) {
							target.fireEvent("onchange");
						} else {
							var evt = document.createEvent("HTMLEvents");
							evt.initEvent("change", false, true);
							target.dispatchEvent(evt);
						}

						update();
						toggle();
					});
					opts.appendChild(opt);
				}

				all = opts.querySelectorAll(".select-js-optgroup");
				for(var i=0; i<all.length; i++){
					var clnm = " "+all[i].className+" ";
					clnm = clnm.replace(" select-js-filteredless ", " ");

					var selector =
						".select-js-option.select-js-filtered"
						+ "[select-js-optgroup=\""+all[i].getAttribute("select-js-optgroup")+"\"]";

					if(opts.querySelectorAll(selector).length==0)
						clnm += " select-js-filteredless";

					while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
					all[i].className = clnm.trim();
				}
			}else if(is_autofilter){
				all = opts.querySelectorAll(".select-js-option");
				for(var i=0; i<all.length; i++){
					var clnm = " "+all[i].className+" ";
					clnm = clnm.replace(" select-js-filtered ", " ");

					if(target.value.length==0 || all[i].innerHTML.indexOf(target.value)>=0)
						clnm += " select-js-filtered";

					while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
					all[i].className = clnm.trim();
				}

				all = opts.querySelectorAll(".select-js-optgroup");
				for(var i=0; i<all.length; i++){
					var clnm = " "+all[i].className+" ";
					clnm = clnm.replace(" select-js-filteredless ", " ");

					var selector =
						".select-js-option.select-js-filtered"
						+ "[select-js-optgroup=\""+all[i].getAttribute("select-js-optgroup")+"\"]";

					if(opts.querySelectorAll(selector).length==0)
						clnm += " select-js-filteredless";

					while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
					all[i].className = clnm.trim();
				}
			}

			var current = opts.querySelector(".select-js-option[data-value=\""+target.value+"\"]");
			if(current!=null){
				current.className += " selected";
				if(!editable) display.innerHTML = current.innerHTML;
			}
		};

		wrapper.className = ("select-js " + target.className).trim();
		display.className = "select-js-display";
		opts.className = "select-js-optlist";

		var ops = target.children;
		for(var i=0; i<ops.length; i++){
			var opt = document.createElement("div");

			if(ops[i].tagName.toLowerCase()=="option"){
				opt.className = ("select-js-option " + ops[i].className).trim();
				opt.innerHTML = ops[i].innerHTML;
				opt.setAttribute("data-value", ops[i].value);
				opt.addEventListener("click", function(){
					target.value = this.getAttribute("data-value");

					if(document.createEventObject) {
						target.fireEvent("onchange");
					} else {
						var evt = document.createEvent("HTMLEvents");
						evt.initEvent("change", false, true);
						target.dispatchEvent(evt);
					}

					update();
					toggle();
				});
			}else{
				var grpId = Math.random().toFixed(6).substr(2);
				opt.innerHTML = ops[i].label;
				opt.className = "select-js-optgroup";
				opt.setAttribute("select-js-optgroup", "grp"+grpId);
				opts.appendChild( opt );

				var ops2 = ops[i].querySelectorAll("option");
				for(var j=0; j<ops2.length; j++){
					var opt = document.createElement("div");

					opt.className = ("select-js-option select-js-indent " + ops2[j].className).trim();
					opt.innerHTML = ops2[j].innerHTML;
					opt.setAttribute("data-value", ops2[j].value);
					opt.setAttribute("select-js-optgroup", "grp"+grpId);
					opt.addEventListener("click", function(){
						target.value = this.getAttribute("data-value");

						if(document.createEventObject) {
							target.fireEvent("onchange");
						} else {
							var evt = document.createEvent("HTMLEvents");
							evt.initEvent("change", false, true);
							target.dispatchEvent(evt);
						}

						update();
						toggle();
					});
					opts.appendChild( opt );
				}
			}
			opts.appendChild( opt );
		}

		display.addEventListener("click", function(){
			if(!editable) toggle();
			else toggle(true);
		});
		if(editable) {
			display.addEventListener("change", function(){ update() });
			display.addEventListener("keyup", function(){ update() });
		}

		target.parentNode.insertBefore(wrapper, target);
		if(editable) {
			display.value = target.getAttribute("value");

			target.parentNode.removeChild(target);
			target = display;
		}
		else target.style.display = "none";

		update();

		wrapper.appendChild(target);
		wrapper.appendChild(display);
		wrapper.appendChild(opts);
		if(prev!=null) prev.parentNode.removeChild(prev);

		return {
			lazyfilter: function(data){ update(data) }
		};
	};
}()
