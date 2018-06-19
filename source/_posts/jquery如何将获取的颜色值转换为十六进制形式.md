---
title: jquery如何将获取的颜色值转换为十六进制形式
tags:
  - jq颜色值转换为十六进制
  - js 颜色值转换为十六进制
id: 1967
categories:
  - JS/Jq
date: 2015-12-18 10:34:02
---

大家或许已经注意到了，在谷歌、火狐和IE8以上浏览器中，获取的颜色值是RGB形式，例如rgb(255,255,0)，感觉非常不适应，或者在实际编码中不方便使用，这个时候就需要进行转换，下面就提供一段相关转换代码。
代码如下:

HTML：
```html
<!DOCTYPE html>
<html>
<head>
<meta charset=" utf-8">
<meta name="author" content="http://www.npm8.com/" />
<title>grycheng前端博客</title>
<style type="text/css">
#thediv
{
width:200px;
height:100px;
background-color:#CCC;
line-height:100px;
text-align:center;
color:#60F;
}
</style>
<script type="text/javascript" src="http://www.softwhy.com/mytest/jQuery/jquery-1.8.3.js"></script>
</head>
<body>
<div id="thediv">grycheng前端博客</div>
<input type="button" value="点击查看效果" id="bt" />
</body>
</html>
```
JavaScript：
```javascript
$.fn.getHexBackgroundColor=function(id,property) 
{  
  var rgb=$(id).css(property);  
  if($.browser.msie&amp;&amp;$.browser.version>8||$.browser.mozilla||$.browser.webkit) 
  {  
    rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);  
    function hex(x)  
    {  
      return ("0"+parseInt(x).toString(16)).slice(-2);  
    }  
    rgb="#"+hex(rgb[1])+hex(rgb[2])+hex(rgb[3]);  
  }  
  return rgb;  
}  
$(document).ready(function(){  
  $("#bt").click(function(){ 
    $("#thediv").text($.fn.getHexBackgroundColor("#thediv","color"))  
  }) 
}) 
```
注意:
运行编辑器之后，再按
F5
刷新网页即可查看演示。

以上代码实现了我们的要求，可以将RGB格式的颜色值转换为十六进制形式，下面就简单介绍一下实现过程:

**一.实现原理:**

当点击按钮的会触发click事件，进而执行click事件处理函数，此处理函数能够将转换后的颜色值写入div中去，其中的核心函数就是getHexBackgroundColor()，此函数首先会判断浏览器是否是IE9之下，如果是则直接返回颜色值，不进行转换，因为在IE9以下浏览器获取的颜色值就是16进制的，如果是IE8以上浏览器或者谷歌火狐，则需要进行转换，关于转换细节这里就不多介绍了，可以参考你代码注释。

**二.代码注释:** 

1.$.fn.getHexBackgroundColor=function(id,property){}，声明一个函数，此函数可以可以进行颜色值转换，此函数具有两个参数，第一个参数是元素的id属性值，第二个是属性。 

2.var rgb=$(id).css(property)，获取颜色值，这个时候rgb也许是16进制也许是RGB格式的。 

3.if($.browser.msie&&$.browser.version>8||$.browser.mozilla||$.browser.webkit)，判断浏览器是否是IE8以上或者是火狐或者谷歌浏览器。 

4.rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)，这个要对正则表达式有所了解，通过match()函数可以将颜色值字符串生成一个数组，这个数组中有4个元素，以rgb(102, 0, 255)作为例子，第一个元素是整个颜色值字符串rgb(102, 0, 255)，第二个数组元素是102，第三个是0，第四个是255。 

5.function hex(x){}，声明一个函数，此函数可以用就是进行颜色值转换，具有一个参数，传递的是rgb数组的某一项。 

6.return ("0"+parseInt(x).toString(16)).slice(-2)，可以将传入数值转换为16进制，注意前面是添加了一个0，最好使用slice函数截取最后两个字符，并返回截取的这两个字符。 

7.rgb="#"+hex(rgb[1])+hex(rgb[2])+hex(rgb[3])，将值组合起来。 

8.return rgb，返回rgb这个值。 

9.$(document).ready(function(){})，当文档结构完全加载完毕再去执行函数中的代码。 

10.$("#bt").click(function(){}），为按钮注册click事件处理桉树。 

11.$("#thediv").text($.fn.getHexBackgroundColor("#thediv","color")) ，将转换后的颜色值写入div。