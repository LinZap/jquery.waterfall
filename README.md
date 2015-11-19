# jQuery.waterfall

[![Code Climate](https://codeclimate.com/repos/553b2aaee30ba0242f001a88/badges/af9314d9006f0e098ca3/gpa.svg)](https://codeclimate.com/repos/553b2aaee30ba0242f001a88/feed) [![Join the chat at https://gitter.im/LinZap/jquery.waterfall](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LinZap/jquery.waterfall?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)



Waterfall is a simple and light [jQuery](https://jquery.com/) plug-in, you can use it easily and fluently! Enjoy!!!


![Alt text](https://raw.githubusercontent.com/LinZap/LinZap.github.io/master/img/waterfall.png "Waterfall")


## Examples

If you want to WATERFALL `div` under `#box`
```html
<!-- box is a container -->
<div id="box">
	<div>Card1</div>
	<div>Card2</div>
	<div>Card3</div>
	<div>Card4</div>
	<div>Card5</div>
</div>
```

Pick the target element
```js
// waterfall have effect on #box
$(function(){
	$('#box').waterfall();
})
```

All `div` in `#box` will be showed in Waterfall as above.


### More Examples

* [Basic](https://github.com/LinZap/jquery.waterfall/blob/master/index.html)
* [Multi-Waterfall](https://github.com/LinZap/jquery.waterfall/blob/master/demo-multi-water.html)
* [Scroll down load more content](https://github.com/LinZap/jquery.waterfall/blob/master/loadmore.html)

## Installation
Just load [jQuery](https://jquery.com/) library and then Waterfall library.


### Basic
```html
<!-- The jQuery library version >= 1.8 -->
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>;
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!-- The core Waterfall library -->
<script src="//linzap.github.io/waterfall/waterfall-light.js"></script>
```
or download Waterfall [starter kit](https://github.com/LinZap/jquery.waterfall/releases/tag/v1.2) to load the library which  make loading speed faster.

### Bower
```sh
bower install jquery.waterfall
```


## Advanced usage

Here are some methods below, if you need better control !

### Setting
```js
var setting = {
	gap: 10,
	gridWidth: [0,400,600,800,1200],
	refresh: 500,
	scrollbottom : {
		ele: $('body'),
		endtxt : 'No More~~',
		gap: 300,
		callback: funciton(container){
			// do something
		}
	}
};
$(function(){
	$('box').waterfall(setting);
})
```
　And more options if you like :smile:

* `gap`(int): distance between neighboring objects.(px)  
* `gridWidth`(array): Grid system, column number is determined by device width, for example

##### 5-column 
*  `gridWidth: [0,400,600,800,1200]`  

| device_width        | column number|
| ------------- |:-------------:|
|0~400	|1|
|400~600|2|
|600~800|3|
|800~1200|4|
|>1200|5|

##### 2-column 
*  `gridWidth: [0,400]`

| device_width        | column number|
| ------------- |:-------------:|
|0~400	|1|
|>400|2|

##### 1-column 
*  `gridWidth: [0]`

| device_width        | column number|
| ------------- |:-------------:|
|>0	|1|


* `refresh`(int): period of screen detection in millisecond
* `scrollbottom`(object): some action setting as reached the end of scrollbar
	* `ele`(element): owner of scrollbar, which is the parent element of `$('box')` by default.
	* `endtxt`(string): reminding message as reached the end of scrollbar
	* `gap`(int): if the distance to the bottom is smaller than `gap`, then will execute callback function.
	* `callback`(funciton): user-defined action as reached the end of scrollbar

　
　
### Stop,Restart Waterfall effect
Waterfall will continuingly detect your screen action. Therefore, if you want to stop its detection, method is showed as below.  
```js
$(function(){
	// Launch waterfall 
	$('box').waterfall();

	// Stop it
	$('box').waterfall('stop');
	
	// Restart it
	$('box').waterfall();	
})
```
Waterfall will distinguish the target by the container of `$('box')`. Therefore, stop action will only be activated to your specific container when there are two or more Waterfall container on Web.
　
　
### Auto load more data on page scroll
As `scrollbottom` is used, it's very likely that you would load some new content to `$('box')`. Then, `sort` allows you to rearrange every elements in container. Also, container itself(`$('box')`) will be transfered to `callback` function for you to manipulate.
```js
var setting = {
	scrollbottom : {
		callback: funciton(container){
			// if scroll to bottom, load more data...
			$.ajax({}).done(function(data){

				// resort elements
				container.waterfall('sort');

			});
		}
	}
};
$(function(){
	$('box').waterfall(setting);
})
```  
  
If there is nothing more to be loaded in the container, then it means reaching the bottom of scrollbar. At this moment, you should remind user that there is "no more data", and you can create your own reminding message by setting `endtxt`.
```js
var setting = {
	scrollbottom : {
		endtxt : 'No More Data !!',
		callback: funciton(container){
			// if scroll to bottom, load more data...
			$.ajax({}).done(function(data){
				if(data)	
					// resort elements
					container.waterfall('sort');
				else
					// done, show message
					container.waterfall('end');
			});
		}
	}
};

$(function(){
	$('box').waterfall(setting);
})
```  
:exclamation: Notice that if you execute `$('box').waterfall("stop")`, then `scrollbottom` and `$('box').waterfall("sort")` will be disabled.
 

Besides, `container.waterfall('end')` will not stop the detection but executing `$('box').waterfall("stop")` is the only way.

　
　
### Overwrite setting
Waterfall setting accepts overwriten by importing the setting object. And nothing but the specific target will be updated by  the transfered setting data.
```js
var setting = {
	gap: 10,
	gridWidth: [0,400,600,800,1200],
	refresh: 500,
};

$(function(){
	$('box').waterfall(setting);

	// only update "gap" value
	$('box').waterfall( {gap:30} );
})
```

　
　
## License

Waterfall is [Apache](http://www.apache.org/licenses/LICENSE-2.0) License
You can find it in the root directory of this source tree.
 

 
## More...
 If any suggestion, you are welcome to create [issue](https://github.com/LinZap/jquery.waterfall/issues/new).
 
 I am glad to have more contributer and make this Plug-in better(Pull-requests).


 
 


