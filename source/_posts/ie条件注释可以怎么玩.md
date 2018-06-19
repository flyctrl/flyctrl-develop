---
title: IE条件注释可以怎么玩
tags:
  - IE注释
id: 225
categories:
  - 前端杂货
date: 2015-07-13 13:40:54
---

**IE条件注释（Conditional comments）是IE浏览器私有的代码，是一个类似IF判断的语法注释块，IE5之上支持。**

代码看起来是这样的
```html
<!--[if IE 6]>
你正在使用IE6
<![endif]-->
```
他的语法是一个普通的HTML注释 <!– comments –>，分支块以 [if 条件(conditional)]> 开始 <![endif]结束。条件和JS中的if很类似，布尔值类型，可以把浏览器特性作为条件，比如IE ，IE 6， IE 7 ，此外还支持 非(!) 、与(&amp;) 、或(|)、 括号、 大于(gt)、 大于等于(gte)、 小于(le) 、 小于等于(lte)。

直观的代码如下：

```html
<!--[if IE]>
According to the conditional comment this is IE<br />
<![endif]-->
<!--[if IE 6]>
According to the conditional comment this is IE 6<br />
<![endif]-->
<!--[if IE 7]>
According to the conditional comment this is IE 7<br />
<![endif]-->
<!--[if IE 8]>
According to the conditional comment this is IE 8<br />
<![endif]-->
<!--[if IE 9]>
According to the conditional comment this is IE 9<br />
<![endif]-->
<!--[if gte IE 8]>
According to the conditional comment this is IE 8 or higher<br />
<![endif]-->
<!--[if lt IE 9]>
According to the conditional comment this is IE lower than 9<br />
<![endif]-->
<!--[if lte IE 7]>
According to the conditional comment this is IE lower or equal to 7<br />
<![endif]-->
<!--[if gt IE 6]>
According to the conditional comment this is IE greater than 6<br />
<![endif]-->
<!--[if !IE]> -->
According to the conditional comment this is not IE<br />
<!-- <![endif]-->
```
更详细的信息可以在微软MSDN文档中查看

[http://msdn.microsoft.com/en-us/library/ms537512.aspx](http://msdn.microsoft.com/en-us/library/ms537512.aspx)

基础介绍完毕，这个东西可以做IE浏览器检测，所以变成了CSS兼容多版本浏览器的方案之一。

**最普遍使用场景1**
```html
<!--[if IE 8]>
<link href="ie8.css" rel="stylesheet" type="text/css" media="screen" />
<![endif]-->
<!--[if IE 7]>
<link href="ie7.css" rel="stylesheet" type="text/css" media="screen" />
<![endif]-->
<!--[if lt IE 7]>
<link href="ie7lt.css" rel="stylesheet" type="text/css" media="screen" />
<![endif]-->
```
既可以解决浏览器差异，还可以保证CSS的标准化，避免了很多私有CSS属性作为hack的方式。
可是这样会增加过多的文件加载，维护代码数量也增加，有没有更好的方式?

**使用场景2**
```html
<!--[if lt IE 7]><html class="ie6 oldie" lang="zh"><![endif]-->
<!--[if IE 7]><html class="ie7 oldie" lang="zh"><![endif]-->
<!--[if IE 8]><html class="ie8 oldie" lang="zh"><![endif]-->
<!--[if gt IE 8]><!--> <html lang="zh"> <!--<![endif]-->
```
场景1中的问题就解决了。通过选择器的优先级就可以轻松解决差异。

有了条件注释，JS也能从总获益，免去的通过JS去判断浏览器类型和版本了。

比如：如果你的页面想使用html5标签，条件注释也能发挥作用。
```html
<!--[if lte IE 8]>
<script>
(function(){
var e = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,
footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),
i= e.length;
while(i--){
document.createElement(e);
}
})();
</script>
<![endif]-->
```
再比如：IE6的背景图片缓存问题

```html
<!--[if IE 6]>
<script>
document.execCommand("BackgroundImageCache", false, true);
</script>
<![endif]-->
```
甚至还可以帮助JS直接获取浏览器信息，大多数库和方案识别浏览器都是通过userAgent串处理的，而且大部分的应用场景也是if （IExx） {doxx}
```javascript
function isIE(v){
var v = v || "",
tester = document.createElement('div');
tester.innerHTML = '<!--[if IE ' + v + ']><i></i><![endif]-->';
return !!tester.getElementsByTagName('i')[0];
}
```
还可以在HTML代码中玩
```html
<body>
<!--[if lte IE 8]>
<p>亲爱的用户，您的浏览器版本过低，建议您升级浏览器获得更好的体验....</p>
<![endif]-->
```
或许还有更多的玩法，就等待您的发现和分享了。

最后，条件注释也不仅限于HTML中，JS也可以有，那就是JScript的特性了，这种坑爹的东东还是少用的好，因为JS中的注释总是要被压缩掉的。
```html
<script>
/*@cc_on
document.write("You are using IE4 or higher");
@*/
</script>
```