# Waterfall-Light

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
 $('#box').waterfall();
```

如上所示，`box` 內的 `div` 元素以 Waterfall 的形式排列。


## Installation

因為 Waterfall 是一個 [jQuery](https://jquery.com/) 的 plug-in，
首先您需要先載入 [jQuery](https://jquery.com/) library
接著載入 Waterfall library


```html
<!-- The jQuery library version >= 1.8 -->
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>;
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!-- The core Waterfall library -->
<script src="//linzap.github.io/waterfall/waterfall-light.js"></script>
```
或是下載 Waterfall[starter kit](https://github.com/LinZap/Waterfall-Light/archive/master.zip) 來引入這個 library，載入速度也會相較的快。

　
　
## Demo

http://linzap.github.io/waterfall/

　

