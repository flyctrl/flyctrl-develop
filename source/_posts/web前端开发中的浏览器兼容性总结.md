---
title: web前端开发中的浏览器CSS兼容性总结
tags:
  - css兼容
  - web前端css兼容性
  - web前端兼容性
id: 1466
categories:
  - 前端兼容
date: 2015-08-31 21:39:56
---

**1、居中问题**

div里的内容，IE默认为居中，而FF默认为左对齐，可以尝试增加代码margin: 0 auto;

**2、高度问题**

两上下排列或嵌套的div，上面的div设置高度(height)，如果div里的实际内容大于所设高度，在FF中会出现两个div重叠的现象；但在IE中，下面的div会自动给上面的div让出空间所以为避免出现层的重叠，高度一定要控制恰当，或者干脆不写高度，让他自动调节，比较好的方法是 height:100%;但当这个div里面一级的元素都float了的时候，则需要在div块的最后，闭和前加一个沉底的空div，对应CSS是：
```css
.float_bottom {clear:both;height:0px;font-size:0px;padding:0;margin:0;border:0;line-height:0px;overflow:hidden;}
```
**3、clear:both**

不想受到float浮动的，就在div中写入clear:both;

**4、IE浮动 margin产生的双倍距离**
```css
#box{
float:left;
width:100px;
margin:0 0 0 100px; //这种情况之下IE会产生200px的距离
display:inline; //使浮动忽略
}
```
**5、padding问题**

FF设置 padding 后，div会增加 height 和 width，但IE不会 （* 标准的 XHTML1.0 定义 dtd 好像一致了）高度控制恰当，或尝试使用 height:100%;宽度减少使用 padding但根据实际经验，一般FF和IE的 padding 不会有太大区别，div 的实际宽 = width + padding ，所以div写全 width 和 padding，width 用实际想要的宽减去 padding 定义。

**6、div嵌套时 y轴上 padding和 marign的问题**

FF里 y 轴上 子div 到 父div 的距离为 父padding + 子marign

IE里 y 轴上 子div 到 父div 的距离为 父padding 和 子marign 里大的一个

FF里 y 轴上 父padding=0 且 border=0 时，子div 到 父div 的距离为0，子marign 作用到 父div 外面

**7、padding，marign，height，width的傻瓜式解决技巧**

注意是技巧，不是方法：

写好标准头
```html
<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
<html xmlns=”http://www.w3.org/1999/xhtml”>
```
高尽量用padding，慎用margin，height尽量补上100%，父级height有定值子级height不用100%，子级全为浮动时底部补个空clear:both的div宽尽量用margin，慎用padding，width算准实际要的减去padding

**8、列表类**

1\. ul标签在FF中默认是有 padding值的，而在IE中只有margin有值

先定义 ul {margin:0;padding:0;}

2\. ul和ol列表缩进问题消除ul、ol等列表的缩进时，样式应写成: {list-style:none;margin:0px;padding:0px;}

**9、显示类（display:block,inline）**

1\. display:block,inline两个元素

display:block; //可以为内嵌元素模拟为块元素

display:inline; //实现同一行排列的的效果

display:table; //for FF,模拟table的效果

display:block 块元素，元素的特点是：

总是在新行上开始；高度，行高以及顶和底边距都可控制；宽度缺省是它的容器的100%，除非设定一个宽度

`<div>，<p>，<h1>，<form>，<ul>` 和 `<li>` 是块元素的例子

display:inline

就是将元素显示为行内元素，元素的特点是：和其他元素都在一行上；高，行高及顶和底边距不可改变；宽度就是它的文字或图片的宽度，不可改变。`<span>，<a>，<label>，<input>，<img>，<strong>` 和 `<em>` 是 inline 元素的例子

2.鼠标手指状显示

全部用标准的写法 cursor: pointer;

**10、背景、图片类**

1\. background显示问题

全部注意补齐 width，height 属性

2.背景透明问题

IE: filter: progid: DXImageTransform.Microsoft.Alpha(style=0,opacity=60);

IE: filter: alpha(opacity=10);

FF: opacity:0.6;

FF: -moz-opacity:0.10;

最好两个都写，并将opacity属性放在下面

**11、min-height最小高度的实现（兼容IE6、IE7、FF）**

作用是：当容器的内容较少时，能保持一个最小的高度，以免破坏了布局或UI设计效果。而当容器内的内容增加的时候，容器能够自动的伸展以适应内容的变化。
```css
#mrjin {
background:#ccc;
min-height:100px;
height:auto !important;
height:100px;
overflow:visible;
}
```

**12、著名的 Meyer Reset（重置）**
```css
html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6，p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, font, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td
{
margin: 0;
padding: 0;
border: 0;
outline: 0;
font-weight: inherit;
font-style: inherit;
font-size: 100%;
font-family: inherit;
vertical-align: baseline;
}
:focus {
outline: 0;
}
body {
line-height: 1;
color: black;
background: white;
}
ol, ul {
list-style: none;
}
table {
border-collapse: separate;
border-spacing: 0;
}
caption, th, td {
text-align: left;
font-weight: normal;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: "";
}
blockquote, q {
quotes: "" "";
}
```

**13、跨浏览器的CSS透明度**
```css
.transparent {
opacity: 0.7;
-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
filter: alpha(opacity=70);
-moz-opacity: 0.7;
-khtml-opacity: 0.7;}
```

**14、文字阴影（CSS3）**
```css
.text { text-shadow: 1px 1px 1px #666; filter: Shadow(Color=#666666, Direction=135, Strength=5); }
```

**15、Box阴影(CSS3)**
```css.box { box-shadow: 5px 5px 5px #666; -moz-box-shadow: 5px 5px 5px #666; -webkit-box-shadow: 5px 5px 5px #666; }```
**16、Sticky Footer (让页脚永远停靠在页面底部，而不是根据绝对位置)**
```html
<div id="wrap">
<div id="main" class="clearfix"></div>
</div>
<div id="footer"> </div>
```
CSS:
```css
* { margin:0; padding:0; }
html, body, #wrap { height: 100%; }
body > #wrap {height: auto; min-height: 100%;}
#main { padding-bottom: 150px; }
#footer {
position: relative;
margin-top: -150px;
height: 150px;
clear:both;}
.clearfix:after {content: ".";
display: block;
height: 0;
clear: both;
visibility: hidden;}
.clearfix {display: inline-block;}
* html .clearfix { height: 1%;}
.clearfix {display: block;}
```
**17、iframe元素內嵌頁面如何去掉继承的html及body背景色/背景图片**

iframe元素的功能是在一个文档里内嵌一个文档，创建一个浮动的帧。内嵌文档时一个完整的页面，有HTML,BODY等属性。这样遇到了一个问题，如果样式表中对BODY定义过背景色/背景图片，那么内嵌文档将全部继承过来。所以如何去掉背景色和背景图片：

【1】去掉背景色：filter:Chroma(Color=white);

举例：
```html
<iframe width="100%" height="400" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" leftmargin="0" topmargin="0" style="filter:Chroma(Color=white);" ></iframe>
```
【2】去掉背景图片：

举例：
```html
<iframe width="100%" height="400" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" leftmargin="0" topmargin="0" style="filter:Chroma(Color=white);" allowTransparency="true" ></iframe>
```
注意：内嵌页面同时也要增加BODY属性：
```html
<body bgcolor="transparent" style='background:transparent'>
```
**18、为什么web标准中无法设置IE浏览器滚动条颜色了？**

原来样式设置：
```css
body{
scrollbar-face-color:#f6f6f6;
scrollbar-highlight-color:#fff;
scrollbar-shadow-color:#eeeeee;
scrollbar-3dlight-color:#eeeeee;
scrollbar-arrow-color:#000;
scrollbar-track-color:#fff;
scrollbar-darkshadow-color:#fff;
}
```
解决办法是将body换成html。

**19、为什么中火狐浏览器下文本无法撑开容器的高度？**

标准浏览器中固定高度值的容器是不会象IE6里那样被撑开的,那我又想固定高度，又想能被撑开需要怎样设置呢？办法就是去掉height设置min-height:200px; 这里为了照顾不认识min-height的IE6 可以这样定义：
```css
div { height:auto!important; height:200px; min-height:200px; }
```

**20、如何定义1px左右高度的容器？**

IE6下这个问题是因为默认的行高造成的，解决的方法也有很多，例如：overflow:hidden | zoom:0.08 | line-height:1px

**21、怎么样才能让层显示在FLASH之上呢？**

解决的办法是给FLASH设置透明:
```html
<a href="http://www.chinaz.com/">:</a>
<pre lang="html" line="1">
<param name="wmode" value="transparent" />
```
**22、怎样使一个div层居中于浏览器中？**
```css
<style type="text/css">
<!--
div {
position:absolute;
top:50%;
left:50%;
margin:-100px 0 0 -100px;
width:200px;
height:200px;
border:1px solid red;
}
-->
</style>
```
**23、怎样使div背景透明？**

首先，需要这两个层都是兄弟关系，其次，这两个层都需要绝对定位。举个例子：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="colinivy" />
<title> Colinivy's world</title>
<style type="text/css">
body {
font:normal 12px/30px Verdana; }
#test {
position:relative;
width:400px;
height:50px;
}
#inner {
z-index:2;
position:absolute;
top:10px;
left:10px;
width:380px;
height:30px;
color:#003;
font-weight:bold;
text-align:center;
}
#transbox {
z-index:1;
position:absolute;
top:0px;
left:0px;
width:400px;
height:50px;
background:#eef;
border:1px solid #a00;
filter:alpha(opacity=40);
-moz-opacity:0.4;
opacity:0.4;
}
</style>
</head>
<body>
<div id="test">
<div>
<p>这里很多的文字,这里很多的文字,这里很多的文字,这里很多的文字,</p>
</div>
<div id="transbox"></div>
<div id="inner">
BlueIdea,BlueIdea,BlueIdea
</div>
</div>
</body>
</html>
```
**24、怎样去掉选中时的虚线框？**

利用onfocus="this.blur();"例如：`<a href="#" onfocus="this.blur();">测试</a>`

**25、ie6下png背景显示问题？**

针对ie6下png背景显示问题,CSS中可以这样解决:_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop, src=’http://www.0351zhuangxiu.com/uploads/images/bj.jpg’);

**26、文字与表单对齐方法？**

设置表单元素第一字体为Tahoma(Verdana系列也可),并设置vertical-align:middle.建设大家把这个约定写入CSS RESET中,能减小很多麻烦:

body,button,input,select,textarea{font:12px/1.5 tahoma,arial,sans-serif; vertical-align:middle}

**27、optgroup标签的用法？**

optgroup标签,鲜为人知,它对提升选择表单用户体验很有帮助。就是可以在有很多选项时,对这些选项分组：例子：
```html
<select id="selectId">
<optgroup label="GROUP ONE">
<option value="1">one select</option>
<option value="2">two select</option>
</optgroup>
<optgroup label="GROUP TWO">
<option value="3">three select</option>
<option value="4">four select</option>
</optgroup>
</select>
```
**28、文字与图片垂直居中对齐方法？**

为图片与文字的共同父元素所有的后代元素定义*{vertical-align:middle};例如:

<p>我要的坚强<img src="i/image.gif" /></p>

只需定义p*{vertical-align:middle}即可使文字与图片同行垂直居中.

**29、文章标题列表中日期居右显示的两种方法？**

方法A相对方法B省资源,但比方法B要多写两句代码,使用时请视情况而定:

方法A：

`<p>这是文章标题<span>2010-10-10</span></p>`

然后定义p和span的样式：
```css
p{ position:relative}
p span{ position:absolute; right:0}
```
方法B:

`<p><span>2010-10-10</span>这是文章标题</p>`

然后定义span右浮动:
```css
p span{float:right}
```
**30、ie6下max/min-width/height实现？**

ie6下max/min-width/height实现,_width: expression_r(this.width >600 ? “600px” : true);,height同理.

**31、空白外边距互相叠加的问题？**

一般通过添加透明边框或者1px的内边距避免；

其一,为外围元素定义透明边框.具体到本例,即在样式div中加入border:1px solid transparent;

其二,为外围元素定义内边距填充..具体到本例,即在样式div中加入padding:1px；

例如：
```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>空白边距叠加demo@Mr.Think</title>
<style>
body{width:300px; font-family:'微软雅黑'; font-size:1em; text-indent:10px; line-height:1.25}
div{background:#a40000;margin:10px}
div p{background:#eee;margin:15px}
</style>
</head>
<body>
<div><p>空白边距叠加demo@Mr.Think</p></div>
</body>
</html>
```
**32、网页设计中的默认字体**

font: 12px/1.5 Tahoma, Helvetica, Arial, sans-serif;

说明：line-height采用1.5, 也就是18px. 这是淘宝视觉规范中定义的行高，对于12px字体，这个行高看起来很舒服。font-family默认采用Tahoma. Tahoma是英文Windows操作系统的默认字体，这个字体比较均衡，显示中英文混排很不错，是经久耐看的一款字体。

**33、浏览器兼容——常用的css hack**

（1）
```css
.title{ height:200px;
*height:200px;
_height:200px; }
```
（2）
```css
.title{ height:200px;
*height:200px !important;
*height:200px; }
```
（3）
```css
.title{ height:200px; }
*html.title{ height:200px;}
*+html.title{ height:200px;}
```
&nbsp;