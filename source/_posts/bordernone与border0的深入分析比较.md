---
title: 'border:none与border:0的深入分析比较'
tags:
  - 'border:0'
  - 'border:none'
id: 189
categories:
  - HTML5/CSS3
date: 2015-07-12 21:39:34
---

如果你要用CSS去表达元素没有边框，你会怎么表达？
是border:0呢？
还是border:none呢？
我听过很多人推荐使用border:none，因为其理由是客户端的渲染。
乍听之下会觉得：嗯，有道理，又学到东西了呵……
其实，很多时候，代码是死的，没有绝对的好与坏！
在相对论面前，神马都是浮云……
要想明白哪种写法最适合你当前的环境，那么就必须先了解这两种写法的含义及优缺点：

### **一、border:0**
**含义：**
它代表着**边框:大小为0**，在浏览器解析后的结果是没有边框

**优点1：**
在写的时候，少写三个字母，这代表在写代码时，这种写法的效率更高

**优点2：**
比另外一种写法少了三个字节，这代表它在体积上更节约了，减低了服务端的负担

**缺点：**
浏览器在解析它的时候，会认为是（边框：其它的默认渲染依然存在，比如solid？比如red？仅是大小为0）

### **二、border:none**
**含义：**
它代表着**边框:没有**，在浏览器解析后的结果，未必是所有元素都没有边框，试试input如何？

**优点1：**
浏览器在解析它的时候，会认为是（边框：什么也没有，不渲染任何样式），不同于border:0，它毕竟还是有渲染的，但border:none是彻底无视，所以当浏览器在看它border:none时，就选择了路过……！

**缺点：**
请参考border:0的优点

**那么读到了这里，你会不会这样理解？**

border:0是为了服务端而服务的，它算是减轻了服务器的压力

border:none是为了客户端而服务的，它算是减轻了浏览器的压力

**那么，你现在决定了选择哪种写法**

我个人是无论大小网站，基本都选择border:0的
因为就网站而言，我觉得服务器的压力大于浏览器，因为服务器只有一个，而浏览器，有N个……
如果你的是大网站，你的服务器有多牛？千万别小看一句写法少了三个字节，千万别认为是"三个字节而已"
反之，如果是小网站，你的代码要有多复杂，才会让浏览器负荷到造成你浏览产生困扰的地步？从而必须要选择border:none去优化？

或许你不认同这种观点，那么我们换一种观点？用一些小学知识去理解怎么样？