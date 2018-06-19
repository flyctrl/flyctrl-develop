---
title: 可拖拽和删除jQuery网格布局插件jQuery Gridly
tags:
  - 可拖拽和删除布局
id: 957
categories:
  - 插件库
date: 2015-07-25 21:00:06
---

&emsp;&emsp;可拖拽和删除jQuery网格布局插件jQuery Gridly，基于jQuery插件实现，拖拽和删除自动计算宽度和高度，拖拽可交互网格位置，删除自动补位，点击网格自动放大自动重新布局，效果是非常不错的，推荐使用。

[![1-140420122S92S](http://www.npm8.com/wp-content/uploads/2015/07/1-140420122S92S.png)](http://www.npm8.com/wp-content/uploads/2015/07/1-140420122S92S.png)

## 使用方法：
### 1、加载插件和jQuery
```html
<script src="libs/jquery/2.0.2/jquery.min.js" type="text/javascript"></script>
<script src="javascript/jquery.gridly.js" type="text/javascript"></script>
<link href="stylesheets/jquery.gridly.css" rel="stylesheet" type="text/css" />
style type="text/css">
  .gridly {
    position: relative;
    width: 960px;
  }
  .brick.small {
    width: 140px;
    height: 140px;
  }
  .brick.large {
    width: 300px;
    height: 300px;
  }
</style>
```
### 2、HTML内容
```html
<div class="gridly">
  <div class="brick small"></div>
  <div class="brick small"></div>
  <div class="brick large"></div>
  <div class="brick small"></div>
  <div class="brick small"></div>
  <div class="brick large"></div>
</div>
```
### 3、函数调用
```javascript
<script>
  $('.gridly').gridly({
    base: 60, // px
    gutter: 20, // px
    columns: 12
  });
</script>
```

[查看演示](http://demo.grycheng.com/case/move2/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/07/move2.zip)