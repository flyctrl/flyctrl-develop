---
title: jquery静态分页jPaging插件
tags:
  - jq 静态分页
  - jquery静态分页jPaging插件
  - js 静态分页
id: 2365
categories:
  - JS/Jq
date: 2016-05-05 23:11:58
---

做列表页的时候，产品想实现分页功能，但是网站是全静态的，说之前一个官网的新闻列表用到过，就过去找来使用。代码量非常少，满足功能就为王。[jPaging](http://www.npm8.com/wp-content/uploads/2016/05/jPaging.js)点击下载。

**使用说明：**

页面引入jQuery库及jPaging文件后，分析列表构成。我这里是div下ul li的列表。然后使用$.jPaging(‘.list ul li’,'li',15,’.list’); .list ul li为要进行翻页的列表项，15代表多少条为一页，li为分页的项，.list为容器。然后，修改相应样式表信息。参考如下：

**相应代码：**

html部分：
```html
<div class="list">
<ul>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
<li><span>2012-05-12</span>【新闻】<a href="http://k68.org">翻面演示</a></li>
</ul>
</div>
```
css部分：
```css
.jPaging-page{text-align: center; color:#3790ff; line-height:24px;}
.jPaging-page a{color:#3790ff; margin:0 5px; cursor:pointer;}
.jPaging-page a.jPaging-current{font-weight:bold; color:#F00; text-decoration:underline;}
.jPaging-page .cur{color:#8d2800;}
.jPaging-page span{cursor:pointer;}
```
javascript部分：
```javascript
$(function(){
$.jPaging('.list ul li','li',3,'.list');
});
```