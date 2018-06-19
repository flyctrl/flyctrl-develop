---
title: 跨域iframe高度计算
tags:
  - 跨域iframe高度计算
id: 1220
categories:
  - 前端杂货
date: 2015-08-19 13:21:16
---

## 一、同域获取iframe内容

[![1](http://www.npm8.com/wp-content/uploads/2015/08/12-650x341.png)](http://www.npm8.com/wp-content/uploads/2015/08/12.png)

**这里有两个细节：**
* 1\. 取iframe内的文档对象，标准浏览器使用[contentDocument](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-78799536)属性，IE低版本(IE6,7,8)使用[document](http://msdn.microsoft.com/en-us/library/ie/cc196985(v=vs.85).aspx)属性。</div>

* 2\. calcPageHeight函数计算页面的实际高度，标准浏览器使用document.documentElement，低版本IE使用document.body，默认取clientHeight，出现滚动条的取scrollHeight，最后取两个值中最大的。

## 二、跨域获取iframe高度
**1、主域一致，子域不同**

比如’a.alitrip.com/a.html’和’b.alitrip.com/b.html’两个跨子域页面

a.html
[![2](http://www.npm8.com/wp-content/uploads/2015/08/21-650x215.png)](http://www.npm8.com/wp-content/uploads/2015/08/21.png)

b.html
[![3](http://www.npm8.com/wp-content/uploads/2015/08/31-650x438.png)](http://www.npm8.com/wp-content/uploads/2015/08/31.png)

**2、主域、子域均不相同**

分别有以下资源
* 页面A : a.alitrip.com/a.html
* 页面B：a.alitrip.com/b.html
* 页面C：dev.taobao.com/c.html
* D.js：a.alitrip.com/d.js

这四个资源有如下关系
* 1\. A里嵌入C，A和C是不同域的，即跨域iframe
* 2\. C里嵌入B，C和B是不同域的，但A和B是同域的
* 3\. C里嵌入D.js，D.js放在和A同域的项目里

通过一个间接方式实现，即通过一个隐藏的B.html来实现高度自适应A.html
[![4](http://www.npm8.com/wp-content/uploads/2015/08/41-650x151.png)](http://www.npm8.com/wp-content/uploads/2015/08/41.png)

B.html嵌入在C页面中，它是隐藏的，通过parent.parent访问到A，再改变A的iframe(C.html)高度，这是最关键的，因为A，B是同域的所以可以访问A的文档对象等。
[![5](http://www.npm8.com/wp-content/uploads/2015/08/51-650x635.png)](http://www.npm8.com/wp-content/uploads/2015/08/51.png)

C.html嵌入在A中，和A不同域，要实现C的自适应，C多高则A里的iframe就设为多高。C里嵌入B.html 和 D.js
[![6](http://www.npm8.com/wp-content/uploads/2015/08/61-650x203.png)](http://www.npm8.com/wp-content/uploads/2015/08/61.png)

**D.js**
在页面C载入后计算其高度，然后将计算出的height赋值给C里引入的iframe（B.html）的src
[![7](http://www.npm8.com/wp-content/uploads/2015/08/71-650x268.png)](http://www.npm8.com/wp-content/uploads/2015/08/71.png)

## 三、页面100%自适应
```<iframe name="ifr" id="ifr" src="http://www.npm8.com/" style="overflow-y: scroll;width: 100%;height: 100%;"></iframe>```

## 四、postMessage数据通信，通过监听window的message事件接收消息
**postMessage(data,origin)方法接受两个参数**

**data**:要传递的数据。

**origin**：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以建参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

**MessageEvent的几个重要属性**
[![8](http://www.npm8.com/wp-content/uploads/2015/08/81.png)](http://www.npm8.com/wp-content/uploads/2015/08/81.png)

1.  **data**：传递来的message
2.  **source**：发送消息的窗口对象
3.  **origin**：发送消息窗口的源（协议+主机+端口号)
[![10](http://www.npm8.com/wp-content/uploads/2015/08/101-650x368.png)](http://www.npm8.com/wp-content/uploads/2015/08/101.png)
[![9](http://www.npm8.com/wp-content/uploads/2015/08/91-650x368.png)](http://www.npm8.com/wp-content/uploads/2015/08/91.png)