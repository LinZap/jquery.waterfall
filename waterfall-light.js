/*
 * Waterfall-Light 
 * github : 
 * by LinZap
 * 
 */

function waterfall(setting){
		var col,w,
		gap = setting.gap,
		box = setting.box,
		ele = setting.ele;
		box.css({ position:'relative'});
		ele.css({
			position:'absolute',
			transition: /*'width ' + setting.refresh + 'ms ease-in-out,' +*/
						'left ' + setting.refresh + 'ms ease-in-out,' +
						'top ' + setting.refresh + 'ms ease-in-out' 
		})

		setInterval(function(){
			var bw = box[0].offsetWidth;
			if(w!=bw) { w=bw; sorting(); }
		},setting.refresh);

		function sorting(){
			if(w>setting.col5) col=5;
			else if(w>setting.col4) col=4;
			else if(w>setting.col3) col=3;
			else if(w>setting.col2) col=2;
			else col=1;
			var cwidth = (w-((col-1)*gap))/col,left=[],top=[];
			for(var i=0;i<col;i++)left.push(i*cwidth+i*gap);
			for(var i=0;i<col;i++)top.push(0);
			ele.each(function( i ) {
				var ic = getMinCol(top);//i%col;
				$(this).css({ width: cwidth+'px', left: left[ic]+'px', top : top[ic]+'px' });
				top[ic]+=$(this)[0].offsetHeight+gap;
			});
		}
		function getMinCol(arr){
			var col = 0;
			var min = arr[col];
			for(var i=0;i<arr.length;i++) if(arr[i]<min){ min = arr[i]; col = i;}
			return col;
		}
}