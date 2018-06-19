---
title: 基于jQuery-autocomplete文本框自动联想补全
tags:
  - jQuery-autocomplete
  - 文本框自动联想补全
id: 1921
categories:
  - 插件库
date: 2015-12-01 15:50:30
---

&emsp;&emsp;基于jQuery文本框自动联想补全特效。这是一款简单使用的jQuery自动完成插件，可定义索引关键词，可设置输入框的宽高，支持搜索回调函数。效果图如下：

![grycheng.com](http://www.npm8.com/wp-content/uploads/2015/12/3.png)

实现的代码。
html代码：
```html
<div id="demo">
<div class="wrapper">
<h3>试试输入"侠名风"</h3>
<div id="search-form"></div>
<div id="message"></div>
</div>
</div>
```
js代码：
```javascript
var proposals = ['at', 'boat', 'bear', 'chief', 'dog', 'drink', 'elephant', 'fruit', 'grave', 'hotel', 'illness', 'London', 'motorbike', '侠名风博客', '侠名风jQuery', '侠名风HTML','侠名风grycheng','侠名风JavaScript'];

$(document).ready(function () {
    $('#search-form').autocomplete({
        hints: proposals,
        width: 300,
        height: 30,
        onSubmit: function (text) {
            $('#message').html('Selected: **' + text + '**');
        }
    });
});
```

[查看演示](http://demo.grycheng.com/case/searchtoken/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/12/searchToken.zip)
