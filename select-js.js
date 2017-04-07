/*!
 * Select.JS
 * Version: 1.0.20
 *
 * Copyright 2017 Wolfgang Kurz
 * Released under the MIT license
 * https://github.com/WolfgangKurz/Select-JS
 */
"use strict";
!function(){
	var selectjs = {
		initialized: false,
		global_optlist: null
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
			var ex = "";
			if( obj===null || (" "+obj.className+" ").indexOf(" select-js-global ")<0 )
				ex = ",.select-js-global-optlist.dropdown";

			var selects = document.querySelectorAll(".select-js.dropdown"+ex);
			for(var i=0; i<selects.length; i++){
				if(obj==selects[i]) continue;

				var clnm = " "+selects[i].className+" ";
				clnm = clnm.replace(" dropdown ", " ");

				while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
				selects[i].className = clnm.trim();
			}
		});

		var global_optlist = document.createElement("div");
		global_optlist.className = "select-js-global-optlist select-js-optlist";
		selectjs.global_optlist = global_optlist;

		document.querySelector("body").appendChild(selectjs.global_optlist);
		selectjs.initialized = true;
	};

	HTMLElement.prototype.selectjs = function(params){
		var paramlist = {};
		if(typeof params!="undefined"){
			for(var i in params)
				paramlist[i] = params[i];
		}

		var target = this;
		if(!selectjs.initialized) selectjs_initialize();

		var editable = false, is_autofilter = false, is_customfilter = false, is_nofocus = false, is_global = false;
		{
			var clnm = " "+target.className+" ";
			editable = clnm.indexOf(" select-js-editable ")>=0;
			is_autofilter = clnm.indexOf(" select-js-autofilter ")>=0;
			is_customfilter = clnm.indexOf(" select-js-customfilter ")>=0;
			is_nofocus = clnm.indexOf(" select-js-nofocus ")>=0;
			is_global = clnm.indexOf(" select-js-global ")>=0;
		}

		var ismobile = function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		};
		if(ismobile())
			is_nofocus = true;

		var prev = target.parentNode;
		if( (" "+prev.className+" ").indexOf(" select-js ")<0 ) prev = null;
		else prev.parentNode.insertBefore(target, prev);

		var wrapper = document.createElement("div");
		var opts = document.createElement("div");
		var focuser = document.createElement("input");
		var display;

		if(editable) {
			display = document.createElement("input");
			display.autocomplete = "off";
			if(target.name.length>0) display.name = target.name;
			if(target.id.length>0) display.id = target.id;
			if(target.className.length>0) display.className += " "+target.className;
			if(target.getAttribute("placeholder")!=null) display.placeholder = target.getAttribute("placeholder");

			focuser = display;
		} else {
			display = document.createElement("div");

			if(!is_nofocus){
				focuser = document.createElement("input");
				focuser.style.width = "1px";
				focuser.style.height = "1px";
				focuser.style.overflow = "hidden";
				focuser.style.opacity = "0";
				focuser.style.position = "absolute";
			}else{
				focuser = display;
			}
		}

		var focusIdx = null;
		var updateFocus = function(){
			var all = opts.querySelectorAll(".select-js-option.select-js-focus");
			for(var i=0; i<all.length; i++){
				var clnm = " "+all[i].className+" ";
				clnm = clnm.replace(" select-js-focus ", " ");
				all[i].className = clnm.trim();
			}

			all = opts.querySelectorAll(".select-js-option");
			if(focusIdx>=all.length) focusIdx = all.length - 1;
			if(focusIdx<0) focusIdx = 0;

			all[focusIdx].className += " select-js-focus";

			var m = focusIdx;
			all = selectjs.global_optlist.querySelectorAll(".select-js-option");
			if(m>=all.length) m = all.length - 1;
			if(m<0) m = 0;

			all[m].className += " select-js-focus";
		};
		var setFocus = function(idx, target){
			if(target===null || typeof target=="undefined") target = opts;

			if(idx===null || typeof idx=="undefined"){
				idx = 0;

				var elem = target.querySelector(".select-js-option[data-value=\""+target.value+"\"]");
				if(elem != null){
					var all = target.querySelectorAll(".select-js-option");
					for(var i=0; i<all.length; i++){
						if( all[i]==elem ){
							idx = i;
							break;
						}
					}
				}
			}
			if( target!=selectjs.global_optlist )
				setFocus(idx, selectjs.global_optlist);

			focusIdx = idx;
			updateFocus();
		};
		var moveFocus = function(value){
			focusIdx += value;
			updateFocus();
		};

		var toggle = function(open){
			var clnm = " "+wrapper.className+" ";

			if(typeof open=="undefined")
				open = clnm.indexOf(" dropdown ")<0;

			if(is_global){
				var m = selectjs.global_optlist;
				m.innerHTML = "";
				for(var i=0; i<opts.children.length; i++) {
					!function(ch, src){
						ch.addEventListener("click", function(){
							if(document.createEventObject) {
								src.fireEvent("onclick");
							} else {
								var evt = document.createEvent("HTMLEvents");
								evt.initEvent("click", false, true);
								src.dispatchEvent(evt);
							}
						});
						ch.addEventListener("mousemove", function(){
							if(document.createEventObject) {
								src.fireEvent("onmousemove");
							} else {
								var evt = document.createEvent("HTMLEvents");
								evt.initEvent("mousemove", false, true);
								src.dispatchEvent(evt);
							}
						});
						m.appendChild(ch);
					}( opts.children[i].cloneNode(true), opts.children[i] );
				}

				clnm = " "+m.className+" ";
				if(open) clnm += (clnm.indexOf(" dropdown ")<0 ? " dropdown" : "");
				else clnm = clnm.replace(" dropdown ", " ");

				while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
				m.className = clnm.trim();

				var current = m.querySelector(".select-js-option.selected");
				if(current!=null){
					if(m.scrollTo) m.scrollTo(0, current.offsetTop - m.clientHeight/2);
					else m.scrollTop = current.offsetTop - m.clientHeight/2;
				}

				var left = 0, top = 0, x = wrapper;
				while(x!==null && x.tagName!="BODY"){
					left += x.offsetLeft;
					top += x.offsetTop;
					x = x.parentNode;
					break;
				}
				m.style.left = left+"px";
				m.style.top = (top+wrapper.clientHeight)+"px";
				m.style.width = (wrapper.clientWidth+2)+"px";
				m.style.fontFamily = window.getComputedStyle(wrapper).fontFamily;
				m.style.fontStyle = window.getComputedStyle(wrapper).fontStyle;
				m.style.fontSize = window.getComputedStyle(wrapper).fontSize;
			}else{
				if(open) clnm += (clnm.indexOf(" dropdown ")<0 ? " dropdown" : "");
				else clnm = clnm.replace(" dropdown ", " ");

				while(clnm.indexOf("  ")>=0) clnm = clnm.replace(/  /g, " ");
				wrapper.className = clnm.trim();

				var current = opts.querySelector(".select-js-option.selected");
				if(current!=null){
					if(opts.scrollTo) opts.scrollTo(0, current.offsetTop - opts.clientHeight/2);
					else opts.scrollTop = current.offsetTop - opts.clientHeight/2;
				}
			}

			if(open) {
				setFocus(null, m);
				focuser.focus();
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
				opt.addEventListener("mousemove", function(){
					var idx = -1;
					var all = opts.querySelectorAll(".select-js-option");
					for(var i=0; i<all.length; i++){
						if( all[i]==this ){
							idx = i;
							break;
						}
					}
					if(idx>=0) setFocus(idx);
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
					opt.addEventListener("mousemove", function(){
						var idx = -1;
						var all = opts.querySelectorAll(".select-js-option");
						for(var i=0; i<all.length; i++){
							if( all[i]==this ){
								idx = i;
								break;
							}
						}
						if(idx>=0) setFocus(idx);
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
			var val = "";
			display.addEventListener("change", function(){ update() });
			display.addEventListener("keyup", function(){
				if(target.value != val){
					val = target.value;
					update();
				}
			});
		}

		target.parentNode.insertBefore(wrapper, target);
		if(editable) {
			display.value = target.getAttribute("value");

			target.parentNode.removeChild(target);
			target = display;
		}
		else target.style.display = "none";

		focuser.addEventListener("keydown", function(e){
			if(e.keyCode==38){ // Up
				moveFocus(-1);
			}else if(e.keyCode==40){ // Down
				var clnm = " "+wrapper.className+" ";
				var open = clnm.indexOf(" dropdown ")>=0;
				if(!open) toggle(true);

				moveFocus(+1);
			}else if(e.keyCode==13){ // Enter
				var focused = opts.querySelector(".select-js-option.select-js-focus");
				if(focused!=null) target.value = focused.getAttribute("data-value");

				if(document.createEventObject) {
					target.fireEvent("onchange");
				} else {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", false, true);
					target.dispatchEvent(evt);
				}

				update();
				toggle();

				e.preventDefault();
				return false;
			}else if(e.keyCode==27){ // ESC
				toggle(false);

				e.preventDefault();
				return false;
			}
		});

		update();

		wrapper.appendChild(focuser);
		wrapper.appendChild(target);
		wrapper.appendChild(display);
		wrapper.appendChild(opts);
		if(prev!=null) prev.parentNode.removeChild(prev);

		return {
			lazyfilter: function(data){ update(data) }
		};
	};
}()
