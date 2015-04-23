/**
 * Copyright 2015, Zap Lin
 * All rights reserved.
 *
 * This source code is licensed under the Apache license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function($){


	// waterfall option of every elements
	var g_option = {
		// default setting 
		_init_:{
			top : false,	// all of column height
			w : false,		// current container-width
			col : false,	// grid number 
			gap : 10,
			gridWidth : [0,400,600,800,1200],
			refresh: 500,
			timer : false,
			scrollbottom : false
		}
	}

	// waterfall methods (can be called)
	var methods = {
		init : function() {
			// first call, set default
			if(!g_option[this.selector])g_option[this.selector]=g_option._init_;

			// overwrite setting
			if(arguments[0])g_option[this.selector]=$.extend(g_option[this.selector],arguments[0]);
	
			// if set scroll to bottom, overwrite setting`
			if(g_option[this.selector].scrollbottom){
				g_option[this.selector].scrollbottom = $.extend({
					ele : this.parent(),
					endele: $('<div>').css({width:'100%',textAlign:'center',position:'absolute'}),
					endtxt: 'No More Data',
					gap: 300
				},g_option[this.selector].scrollbottom);
			}

			// Waterfall is a absolute-position base layout
			// the container must be relative or absolute position
			// This setting needs to be strengthened
			this.css('position', 'relative');
			console.log(g_option[this.selector]);
			// start
			detect(this);
	  	},

		sort : function() { 
			sorting(this); 
		},
		// restart : function() { 
		// 	detect(); 
		// },
		stop : function() {
			if(g_option[this.selector].timer){ 
				clearInterval(g_option[this.selector].timer); 
				g_option[this.selector].timer = false; 
			}
		},
		end : function() {

			if(g_option[this.selector].scrollbottom){
				g_option[this.selector].scrollbottom.ele.css('top',g_option[this.selector].top[getMaxCol(this)]+"px");
				this.append(g_option[this.selector].scrollbottom.ele);
			}
			if(g_option[this.selector].timer){ 
				clearInterval(g_option[this.selector].timer); 
				g_option[this.selector].timer = false; 
			}		

		}
	};


	function getMinCol(t){
		var top = g_option[t.selector].top,
			col = 0,
			min =top[col];
		for(var i=0;i<top.length;i++) 
			if(top[i]<min){ min = top[i]; col = i;}
		return col;
	}

	function getMaxCol(t){
		var top = g_option[t.selector].top,
			col = 0,
			max = top[col];
		for(var i=0;i<top.length;i++) 
			if(top[i]>max){ max = top[i]; col = i;}
		return col;
	}

	function sorting(t){

		var gw = g_option[t.selector].gridWidth,
			w = g_option[t.selector].w,
			gap =g_option[t.selector].gap,
			scrollbottom = g_option[t.selector].scrollbottom;
		
		g_option[t.selector].col = 1;
		g_option[t.selector].top=[];

		for(var i=gw.length-1;i>=0;i--)
			if(w>gw[i]){ g_option[t.selector].col = i+1; break; }

		var cwidth =(w-((g_option[t.selector].col-1)*gap))/g_option[t.selector].col,
			left=[];

			console.log(cwidth);
		for(var i=0;i<g_option[t.selector].col;i++){
			left.push(i*cwidth+i*gap);
			g_option[t.selector].top.push(0);
		}
		t.children().css({
			position:'absolute',
			left: (w/2-cwidth/2)+'px',
			top: t.scrollTop(),
			transition: 'left ' + g_option[t.selector].refresh + 'ms ease-in-out,' +
						'top ' + g_option[t.selector].refresh + 'ms ease-in-out,' +
						'opacity ' + g_option[t.selector].refresh + 'ms ease-in-out'
			}).each(function(i) {
				var ic = getMinCol(t);
				$(this).css({ width: cwidth+'px', left: left[ic]+'px', top : g_option[t.selector].top[ic]+'px',opacity:'1' });
				g_option[t.selector].top[ic]+=$(this)[0].offsetHeight+gap;
			});
			if(scrollbottom)
				if(scrollbottom.endele)scrollbottom.endele.css({top:g_option[t.selector].top[getMaxCol(t)]+"px"});
	}

	// detect screen width change , resort cards
	function detect(t){
		//console.log(g_option[this.selector],this);
		if(!g_option[t.selector].timer){
			g_option[t.selector].timer = setInterval(function(){
				var bw = t[0].offsetWidth;
				if(g_option[t.selector].w!=bw) {  g_option[t.selector].w=bw;  sorting(t); }
				if(g_option[t.selector].scrollbottom)
					if(g_option[t.selector].scrollbottom.callback && isbottom(g_option[t.selector].scrollbottom.ele,g_option[this.selector].scrollbottom.gap))
						g_option[t.selector].scrollbottom.callback(t);
			},g_option[t.selector].refresh);
		}
		sorting(t);
	}


	// return is scroll to bottom  
	function isbottom(ele,gap){
		return ((ele.innerHeight()+ele.scrollTop())>(ele.prop("scrollHeight")-gap));
	}


	$.fn.waterfall = function() {
		var res;
		if(!arguments[0] || typeof arguments[0] === 'object')
			res = methods.init.apply(this,arguments);
		else if(methods[arguments[0]])
			res = methods[ arguments[0] ].apply( this, Array.prototype.slice.call( arguments[0], 1 ));
		else $.error( 'Method ' +  method + ' does not exist on jQuery.waterfall' );
		return res || this;
	}

})(jQuery);

