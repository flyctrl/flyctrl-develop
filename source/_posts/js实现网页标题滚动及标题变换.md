---
title: JS实现网页标题滚动及标题变换
tags:
  - js标题变换
  - js网页标题滚动
id: 1587
categories:
  - JS/Jq
date: 2015-09-10 10:41:02
---

大家是否经常看到网页标题来回滚动，以及网页标题来回变动，这种效果是不是很炫，给人的感觉也不错。

下面就是我要分享给大家的代码，相互学习、改进已达到我们自己理想的状态。

js实现网页标题滚动（源码如下）
```javascript
var msg = document.title; 

msg = "…" + msg;pos = 0; 
function scrollMSG() { 
document.title = msg.substring(pos, msg.length) + msg.substring(0, pos); 
pos++; 
if (pos >  msg.length) pos = 0 
window.setTimeout("scrollMSG()",400); 
} 
scrollMSG(); 
``` 
&nbsp;
js实现网页标题变动（源码如下）
```javascript  
//  
var step=0;  
var _title=document.title; //获取网页标题  
var space='';  
for(var i=0;i<=_title.length;i++)space+='　'; //根据标题长度生产相应的空字符  
function flash_title() //核心函数  
{  
step++  
if (step==3) {step=1}  
if (step==1) {document.title=space}  
if (step==2) {document.title=_title}  
setTimeout("flash_title()",500);  
}  
flash_title();  
```  

PS:这两种效果还不错，大家可以试试。。
&nbsp;
