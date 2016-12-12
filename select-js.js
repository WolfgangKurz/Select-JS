/*!
 * Select.JS
 * Version: 1.0.10
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
				selects[i].className = clnm;
			}
		});
	};

	HTMLElement.prototype.selectjs = function(){
		var target = this;
		if(!selectjs.initialized) selectjs_initialize();

		var editable = false;
		{
			var clnm = " "+target.className+" ";
			editable = clnm.indexOf(" select-js-editable ")>=0;
		}

		var prev = target.parentNode;
		if( (" "+prev.className+" ").indexOf(" select-js ")<0 ) prev = null;
		else prev.parentNode.insertBefore(target, prev);

		var wrapper = document.createElement("div");
		var opts = document.createElement("div");
		var display;

		if(editable) {
			display = document.createElement("input");
			if(target.name.length>0) display.name = target.name;
			if(target.id.length>0) display.id = target.id;
			if(target.className.length>0) display.className += " "+target.className;
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
			opts.scrollTo(0, current.offsetTop - opts.clientHeight/2);
		};
		var update = function(){
			var all = opts.querySelectorAll(".select-js-option.selected");
			for(var i=0; i<all.length; i++){
				var clnm = " "+all[i].className+" ";
				clnm = clnm.replace(" selected ", " ");

				while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
				all[i].className = clnm;
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
				opt.onclick = function(){
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
				};
			}else{
				opt.innerHTML = ops[i].label;
				opt.className = "select-js-optgroup";
				opts.appendChild( opt );

				var ops2 = ops[i].querySelectorAll("option");
				for(var j=0; j<ops2.length; j++){
					var opt = document.createElement("div");

					opt.className = ("select-js-option select-js-indent " + ops2[j].className).trim();
					opt.innerHTML = ops2[j].innerHTML;
					opt.setAttribute("data-value", ops2[j].value);
					opt.onclick = function(){
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
					};
					opts.appendChild( opt );
				}
			}
			opts.appendChild( opt );
		}

		display.onclick = function(){
			if(!editable) toggle();
			else toggle(true);
		};
		update();

		target.parentNode.insertBefore(wrapper, target);
		if(editable) {
			target.parentNode.removeChild(target);
			target = display;
		}
		else target.style.display = "none";

		wrapper.appendChild(target);
		wrapper.appendChild(display);
		wrapper.appendChild(opts);
		if(prev!=null) prev.parentNode.removeChild(prev);
	};
}()
