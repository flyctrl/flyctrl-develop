---
title: 清除浮动方法总结（clearfix剖析）
tags:
  - clearfix
id: 354
categories:
  - HTML5/CSS3
date: 2015-07-13 16:46:34
---

&emsp;&emsp;浮动是一个有意思（你也可以说它很麻烦）的CSS属性，任何元素设置了浮动，层级就提高了，会影响它后面没设置浮动的元素，这些倒霉的被影响者会跑到浮动层的下面去（当然IE6、IE7除外），代码看起来是这样：
```html
<div style="width: 100px; height: 100px; border: 1px solid #333; float: left;"></div>
<div style="width: 120px; height: 140px; background: #eee;"></div>
```
**效果：**

[![1](http://www.npm8.com/wp-content/uploads/2015/07/18.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/18.jpg)

&emsp;&emsp;因为设置了浮动的元素会提高层级，所以如果一个平淡无奇的父级元素（没有设置浮动或别的提高层级的属性）居然包住了一个浮动的家伙，并且这个父级还没有设置高，那它就悲催了，因为父级没法包住它的子级浮动元素（当然IE6、IE7又除外）：
```html
<div style="width: 160px; border: 1px solid #333; padding: 10px;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
</div>
```
如图：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/22.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/22.jpg)

**那怎么样才能让父级包住浮动层呢？**

下面是我列举的一些方法，如有大家还有其他的办法，欢迎补充：

## **1\. 在浮动层下，设置空DIV，代码如下：**
```html
<div style="width: 160px; border: 1px solid #333; padding: 10px;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
<div style="clear: both; height: 0; font-size: 1px;"></div>
</div>
```

**说明：**

clear: both;可以让元素不受到浮动层影响，排到浮动层的底下，而父级可以包住最底下这个空DIV，这样看起来，它似乎也就包住那个浮动层了，其实是障眼法哈～

**缺点：**

IE6下会多出1像素来，并且设置了无语义的空DIV；

## **2\. 在父级设置：overflow: hidden;**

```html
<div style="width: 160px; border: 1px solid #333; padding: 10px; overflow: hidden;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
</div>
```

**说明：**

overflow: hidden; 用它是为了提高父级的层级，层级提高了，自然能包住子级浮动元素了。

**缺点：**
要是父级里面有什么元素居然飘到父级以外的地方，那就悲剧了，例如很多JS的提示层效果就不能用 overflow: hidden;

## **3\. 在父级设置：float;**

```html
<div style="width: 160px; border: 1px solid #333; padding: 10px; float: left;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
</div>
```

**说明：**

父级包不住浮动层，因为层级不够，那父级也设置float好喽

**缺点：**

父级如果也有父级，也要设置浮动，那用这种方法，一路浮动到body那儿才算完事儿～～呃。。此方法本身就很滑稽

## **4\. 在父级设置：display: inline-block;**

```html
<div style="width: 160px; border: 1px solid #333; padding: 10px; display: inline-block;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
</div>
```

**说明：**

inline-block; 是一个不兼容的属性，但用在这里只是为了提高父级层级，如此一来，可以完全忽略它的不兼容性哈～

**缺点：**

设置不了元素居中：margin-left: auto; margin-right: auto; 你可以在不需要居中的元素上使用这方法哈～


## **5\. 父级如果是绝对定位：position: absolute;**

```html
<div style="width: 160px; border: 1px solid #333; padding: 10px; position: absolute;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
</div>
```

**说明：**

要说层级，那绝对定位必定是老大，在绝对定位眼中，小小的浮动也居然敢称层级？？

**缺点：**

position: absolute;会影响布局，它是相对父级的块元素为参照物进行定位，完全不按文档流的方式走，呵呵，所以如果你要是在绝对定位的元素里设置浮动，那就尽情设置吧,不必理会任何浮动神马的，因为在绝对定位下，浮动啥的，真的是浮云了～

## **6\. 给浮动层下设置：<br clear="all" />**

```html
<div style="width: 160px; border: 1px solid #333; padding: 10px;">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
<br clear="all" />
</div>
```

## **7\. 给父级加上这行吧**

```html
.clear:after { content: '\20'; clear: both; display: block; }
<style>
.clear:after { content: '\20'; clear: both; display: block; }
</style>
<div style="width: 160px; border: 1px solid #333; padding: 10px;" class="clear">
<div style="width: 120px; height: 140px; background: #eee; float: left;"></div>
</div>
```

**说明：**

:after 是一个很好用的属性，有了它，可以往任何元素里插入字符串、空格啦，'.'之类的，但可惜，IE6，IE7不认识:after，不过，又有什么关系呢？反正IE6\IE7的父级能包住浮动层，所以不必管它们喽～

**忘了解释了，**

先给浮动层底下插入一个空格（content: '\20';），再把这个空格转成块元素，并且清除浮动层的影响，让父级包住这个空格，也是障眼法哈～

最后的结果都会是：

[![3](http://www.npm8.com/wp-content/uploads/2015/07/32.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/32.jpg)

参与测试的浏览器列表：

[![4](http://www.npm8.com/wp-content/uploads/2015/07/41.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/41.jpg)

## **补充常用清楚浮动方法**
```css
.clearfix:after {
content: ".";
display: block;
clear: both;
overflow:hiddden;
visibility: hidden;
height: 0;
}

.clearfix {
display: inline-block;
}

* html .clearfix {
height: 1%;
}
```