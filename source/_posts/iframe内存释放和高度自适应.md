---
title: iframe内存释放和高度自适应
tags:
  - iframe内存释放
  - iframe高度自适应
id: 2269
categories:
  - JS/Jq
date: 2016-04-06 13:28:48
---

## 一、iframe内存释放

相关资料称IE在iframe元素的回收方面存在着bug，在通常情况下应该将该元素的src属性值修改为”abort:blank”，并手工将其从 DOM树上移除，然后把脚本中引用它的变量置空并调用CollectGarbage()就可以避免iframe不能正常回收所造成的内存泄露。
```javascript
function clearRAM() {
  var frame = document.getElementById("ifr_content");
  frame.src = 'about:blank';
  frame.contentWindow.document.write( '');//清空frame的内容
  frame.contentWindow.document.clear();
  frame.contentWindow.close(); //避免frame内存泄漏

  if (navigator.userAgent.indexOf('MSIE') >= 0) {
          if (CollectGarbage) {

               CollectGarbage(); //IE 特有 释放内存

                //删除原有标记
               var tags = document.getElementById("ifrSet");
               tags.removeChild(frame);

                //添加frameset框架
               var _frame = document.createElement('frame');
               _frame.src = '';
               _frame.name = 'content';
               _frame.id = 'ifr_content';
               tags.appendChild(_frame);
         }
  }

 }

//主动释放 5秒一次
setInterval( function() {
  if (navigator.userAgent.indexOf('MSIE') >= 0) {
    if (CollectGarbage) {
      //alert(1)
     CollectGarbage(); //IE 特有 释放内存
    }
  }
}, 5000);
```

## 二、iframe高度自适应

很多人一直被iframe的高度自适应的问题困扰着，在项目中也是多次遇到。网上也有不少相关的代码，但是总不能满足自己的要求。

本代码主要解决的问题是：最外层滚动条随着iframe高度动态变化的问题。如果iframe高度比较大最外层就会出现滚动条，否则就不会。网上好多例子的问题都是iframe只保留最大的高度以至于页面内容高度很小但是右边还有滚动条。
兼容性：谷歌、火狐、ie8+
```javascript
/**
 * iframe自适应高度，height为手动设置的最小高度
 */
function initIframeHeight(height){
    var userAgent = navigator.userAgent;
    var iframe = parent.document.getElementById("contentIframe");
    var subdoc = iframe.contentDocument || iframe.contentWindow.document;
    var subbody = subdoc.body;
    var realHeight;
    //谷歌浏览器特殊处理
    if(userAgent.indexOf("Chrome") > -1){
        realHeight = subdoc.documentElement.scrollHeight;
    }
    else{
        realHeight = subbody.scrollHeight;
    }
    if(realHeight < height){
        $(iframe).height(height);
    }
    else{
        $(iframe).height(realHeight);
    }
}
```