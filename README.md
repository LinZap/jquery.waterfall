Waterfall-Light
===============

簡單、輕量的瀑布式排版，您可以簡單、快速的使用它。

## Usage

1. include jQuery 

        &lt; script src="//code.jquery.com/jquery-1.11.0.min.js"&gt; &lt;/script&gt;
        &lt; script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"&gt; &lt;/script&gt;

2. include Waterfall-Light

        &lt;script src="waterfall-light.js"&gt;&lt;/script&gt;

3. write js and run!

        var setting={
        'gap':10, //間距
        'box':$('#box'), //容器
        'ele':$('.card'), // 所有元素(呈現瀑布式排版的元素)
        'refresh':1000, // 更新頻率(ms)
        'col5':1200, // 5欄時寬度以上為何(px)?
        'col4':800, // 4欄時寬度以上為何(px)?
        'col3':600, // 3欄時寬度以上為何(px)?
        'col2':400 // 2欄時寬度以上為何(px)? 剩下的就是 1欄
        };
        
        waterfall(setting);

4. 詳細使用可以參考 index.html 

## License

   Copyright 2014 LinZap

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
