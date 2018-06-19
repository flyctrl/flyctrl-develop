---
title: js判断页面是否加载完成
tags:
  - js判断页面是否加载完成
id: 1867
categories:
  - JS/Jq
date: 2015-10-26 16:19:56
---

javascript代码如下：
```javascript
document.onreadystatechange = subSomething;    　　　 //当页面加载状态改变的时候执行这个方法

function subSomething()
{
    if(document.readyState == “complete”)            //判断页面加载状态
        myform.submit();
}
```

#### **解析如下：**

Document.readyState属性描述了文档的加载状况，一个文档的readyState可能是以下的其中一个：

loading

文档仍然在加载

interactive

文档已经加载完毕而且已经被解析，但是一些子资源，例如图像，样式表和框架还在加载。这个状态表明DOMContentLoaded事件已经被触发。

complete

文档和全部的子资源已经加载完毕。这个状态表明load事件已经被触发。

当readyState属性值改变的时候，document对象的readystatechange事件被触发。