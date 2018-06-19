---
title: 'overflow:auto;在IE6/7下诡异事件'
tags:
  - 'ie6/ie7 overflow:auto;'
id: 641
categories:
  - 前端兼容
date: 2015-07-18 17:15:33
---

今天在开发一个产品列表的时候遇到了一个有趣的问题，关于overflow:auto;在IE6/7下无效的问题，在其他浏览器都是正常的，这个还真是我第一次遇到了这样的问题，不知道其他人有没有遇到过。

#### 我们先来看看我页面的html代码

```html
<div class="prd_box">
    <ul class="prd_list">
        <li class="list clearfix"></li>
    </ul>
</div>
```

#### CSS代码

```css
.prd_box {
  height:610px;
  border:1px solid #ccc;
  background-color:#fff;
  border-top:none;
  overflow:auto;
}
.prd_box .prd_list {
  padding:15px 0 0;
}
.prd_box .prd_list .list {
  width:152px;
  float:left;
  display:inline;
  margin:0 0 0 -1px;
  border-left:1px dashed #E0E0E0;
  padding:12px 12px 15px;
  margin-left:-1px;
  border:none;
  position:relative;
}
```
以上代码只截取了部分重要的，在现代浏览器里面效果都是正常的，但是在IE6/7下的效果却是这样的

[
![1](http://www.npm8.com/wp-content/uploads/2015/07/117-650x580.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/117.jpg)

当时就看傻了，以为是浏览器问题，然后用虚拟机的真实环境下重看了下效果依旧如此，无言啊。检查了无数次代码，都没什么问题，后面我在
**.prd_box**层加了**position:relative;**
后，神奇的IE6/7恢复了正常。无解啊，难道是**overflow:auto;**
改变了父元素的属性，必须重新给父元素指定**position:relative;**
才能生效吗？

#### 修改后的CSS：

```css
.prd_box {
  height:610px;
  border:1px solid #ccc;
  background-color:#fff;
  border-top:none;
  overflow:auto;
  position:relative;
}
```
修改后IE6/7下效果：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/28-650x471.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/28.jpg)