---
title: 'overflow-y:auto;属性在IE6下无效的终极解决方案'
tags:
  - 'overflow-y:auto'
id: 259
categories:
  - 前端兼容
date: 2015-07-13 14:04:07
---

今天在IE6下测试主题，发现凡是贴代码的文章页面都是代码框撑破了页面。我贴代码是手动用pre标签，再用主题集成的shjs来给代码着色的。因为我是在代码框定义时，在CSS中设置了水平滚动条“overflow-x:auto;”属性，这样代码太长宽度超过时会自动产生水平滚动条，但是这在IE6下失效了。

在网上找了一些方法，最终解决了问题下面我来说明是如何解决的。

一共是两种情况：

**第一种情况：**
在ul或者其他内联标签上添加over-y:auto;属性的时候，此时只需要添加属性：position:relative;在IE6下即正常。

**第二种个情况：**
在div或者块级标签上添加over-y:auto;属性的时候，此时有2种解决方法

一种方法是在代码框的div的CSS定义中设置宽度，我定义的代码框是.code，我之前定义如下：

.code{overflow-x:auto; margin:5px auto 8px;}

后来附加设置了宽度，问题得以解决，如下：
.code{overflow-x:auto; margin:5px auto 8px;width:95%;}

另一种方法，将原来的.code的CSS定义修改如下：
```css
.code{
    word-wrap:break-word;
    word-break:break-all;
    overflow:auto;
    margin:5px auto 8px;
    
}
/*前两个是在IE下单词内断行，然后其他浏览器自动产生水平滚动条*/
```
这样，基于以上两种方法，该问题得到了解决。
