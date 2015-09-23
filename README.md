# jQuery.waterfall

[![Code Climate](https://codeclimate.com/repos/553b2aaee30ba0242f001a88/badges/af9314d9006f0e098ca3/gpa.svg)](https://codeclimate.com/repos/553b2aaee30ba0242f001a88/feed) [![Join the chat at https://gitter.im/LinZap/jquery.waterfall](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LinZap/jquery.waterfall?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)



Waterfall-Light 是一個 [jQuery](https://jquery.com/) 的 plug-in

簡單、輕量的瀑布式排版，您可以簡單、快速的使用它。

![Alt text](https://raw.githubusercontent.com/LinZap/LinZap.github.io/master/img/waterfall.png "Waterfall")


## Examples

假設您欲將 id 為 `box` 元素內的 `div` 以 Waterfall 型式排列
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

您只需指定欲使用 Waterfall 排列的元素，便可達到排列的效果。
```js
// waterfall have effect on #box
$(function(){
	$('#box').waterfall();
})
```

如上所示，所有`box` 內的 `div` 元素會以 Waterfall 的形式排列。


### More Examples

* [Basic](https://github.com/LinZap/jquery.waterfall/blob/master/index.html)
* [Multi-Waterfall](https://github.com/LinZap/jquery.waterfall/blob/master/demo-multi-water.html)
* [Scroll down load more content](https://github.com/LinZap/jquery.waterfall/blob/master/loadmore.html)

## Installation
jQuery.waterfall 是一個 [jQuery](https://jquery.com/) 的 plug-in，
首先您需要先載入 [jQuery](https://jquery.com/) library
接著載入 Waterfall library

### Basic
```html
<!-- The jQuery library version >= 1.8 -->
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>;
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!-- The core Waterfall library -->
<script src="//linzap.github.io/waterfall/waterfall-light.js"></script>
```
或是下載 Waterfall [starter kit](https://github.com/LinZap/jquery.waterfall/releases/tag/v1.2) 來引入這個 library，載入速度也會相較的快。

### Bower
```sh
bower install jquery.waterfall
```


## Advanced usage

如果您需要控制更多參數、細節，Waterfall 擁有幾個 methods 如下所示。

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
　您可以傳入一個`物件`，其中的選項"全部"皆可選填，一覽如下：

* `gap`(int): 排列物體彼此的間距(margin)，單位為像素 px
* `gridWidth`(array): 宣告螢幕寬度所對應的欄位數量，上述設定表示螢幕寬度 (px)
	*  `0~400` 呈現 1 欄
	*  `400~600` 呈現 2 欄
	*  `600~800` 呈現 3 欄
	*  `800~1200` 呈現 4 欄
	*  `>1200` 呈現 5 欄
* `refresh`(int): 偵測螢幕變化的時間間隔，單位為毫秒 (ms)
* `scrollbottom`(object): 設定開啟偵測卷軸滾動到底部，要做的事情
	* `ele`(element): 產生卷軸的元素，預設為 `$('box')` 的父元素
	* `endtxt`(string): 捲動到底部後，顯示的文字
	* `gap`(int): 若距離底部小於這個 `gap` 值，則會觸發 callback 執行
	* `callback`(funciton): 回呼函式，您可以定義卷軸到底部時，會執行的其它功能

　
　
### Stop,Restart Waterfall effect
Waterfall 是一個會不斷偵測螢幕變化的函式，若您需要暫時停止它的偵測功能，可以這樣呼叫
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
Waterfall 會以您 `$('box')` 容器做為識別的依據，若 wab 上同時存在 2 個以上的 Waterfall 容器，stop 也只會作用在您指定的容器上

　
　
### Auto load more data on page scroll
若您有設定 `scrollbottom` 的話，表示您可能會加入新的元素到 `$('box')` 容器中，此時您可在 `callback` 中呼叫 `sort` 重新排列容器中的元素。在這個`callback`中，會傳入容器自身(`$('box')`)方便您操控。
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
  
  
若您已經沒有更多元素須被加入，此時表示已經捲動到最底部且需要提示使用者"沒有更多資料"，您可以設定`endtxt`來客製化這個提示文字
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
:exclamation: 注意，如果您呼叫了`$('box').waterfall("stop")`，那麼 `scrollbottom` 不會被觸發，而且 `$('box').waterfall("sort")` 也會失效。
 

另外，呼叫了 `container.waterfall('end')` 並不會停止偵測，若需停止偵測，仍需呼叫 `$('box').waterfall("stop")` 才行。

　
　
### Overwrite setting
如果您需要更新 Waterfall 的 setting，您可以直接傳入設定物件。Waterfall 不會覆蓋掉已經設定的參數
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
 如果有 Waterfall 的建議可以發出 [issue](https://github.com/LinZap/jquery.waterfall/issues/new) 讓我知道 
 也歡迎您成為 Waterfall 的 contributer，讓這個 Plug-in 更加完善 (Pull-requests)


 
 


