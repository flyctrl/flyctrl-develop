---
title: ie下按keydown事件会触发button
tags:
  - keydown事件
id: 113
categories:
  - JS/Jq
date: 2015-07-12 01:31:29
---

负责公司的一个b2c平台，头部那里有个搜索查询的功能，根据用户输入的内容按回车键也会跳转到响应的页面，后来在ie浏览器下惊奇的发现按回车键的同时它也会触发底部的邮箱订阅的button事件，开始以为是其它的地方用到了回车键从而冲突了，好来发现没有其它地方用到，找了好久都找不到原因，后来百度了一下，找到了相关的问题描述：

说是Button才会有这个问题，如果是a标签呢，我也做了实验，a标签是不会有这样的问题的，只有button会有

那该怎么解决呢？其实解决办法还是挺多的，比如可以把button换掉；我采用的是阻止keydown事件的默认行为preventDefault；的确解决问题。

1.阻止浏览器的默认行为

```javascript
function stopDefault(e) {
//如果提供了事件对象，则这是一个非IE浏览器
if(e &amp;&amp; e.preventDefault) {
//阻止默认浏览器动作(W3C)
e.preventDefault();
} else {
//IE中阻止函数器默认动作的方式
window.event.returnValue = false;
}
return false;
}
```

2.停止事件冒泡

```javascript
function stopBubble(e) {
//如果提供了事件对象，则这是一个非IE浏览器
if(e &amp;&amp; e.stopPropagation) {
//因此它支持W3C的stopPropagation()方法
e.stopPropagation();
} else {
//否则，我们需要使用IE的方式来取消事件冒泡
window.event.cancelBubble = true;
}
return false;
}
```

具体应用：

```javascript
<script type="text/javascript">// <![CDATA[
    function enter_down(form, event) { 
      if(event.keyCode== "13") {
          stopDefault(event);
          submitForm(form,'actionDiv');
      }
    }

    function stopDefault(e) {
        //如果提供了事件对象，则这是一个非IE浏览器 
        if(e && e.preventDefault) {
        　　//阻止默认浏览器动作(W3C)
        　　e.preventDefault();
        } else {
        　　//IE中阻止函数器默认动作的方式 
        　　window.event.returnValue = false; 
        }
        return false;
    }
// ]]></script>
<input id="appGrpName_s" name="appGrpName_s" type="text" />
```
这样就可以解决ie下面按回车键触发button click（）事件了