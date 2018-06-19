---
title: CSS关于细节的大美集
tags:
  - css细节
id: 325
categories:
  - HTML5/CSS3
date: 2015-07-13 15:47:39
---

**细节1</span>**

**一、当文字与图片在一行，需要将文字与图片底对齐，需要这样写：**

```<li>记住密码<img src="" align="bottom" style="margin-bottom:-4px"/></li>```

**二、当文字与图片在一行，需要将文字与图片居中对齐，需要这样写：**

```<li>记住密码<img src="static/img/xyx.jpg" align="middle"/></li>```

**三、更改IE“查看源代码”菜单打开的编辑器**

打开注册表编辑器,在开始-运行中输入regedit

找到以下位置： HKEY_LOCAL_MACHINE"SOFTWARE"Microsoft"Internet Explorer"View SourceEditor"Editor

Name"修改默认的数据为"D:" Program

Files"EmEditor"EmEditor.exe"

切换到IE中查看源代码就可以看到效果了。

如果View Source Editor"Editor Name项没有,可以自己新建。

**四、自动最大化窗口，在 `<body>` 与 `</body>` 之间加入：**
```javascript
<SCRIPT language="javascript">
setTimeout('top.moveTo(0,0)',5000);
setTimeout('top.resizeTo(screen.availWidth,screen.availHeight)',5000);
< /script>
```

**五、window.opener 实际上就是用window.open打开的窗体的父窗体。**

比如在父窗体parentForm里面 通过 window.open("subForm.html"),那么在subform.html中 window.opener

就代表parentForm,可以通过这种方式设置父窗体的值或者调用js方法。

1,window.opener.test(); ---调用父窗体中的test()方法；

2,如果window.opener存在,设置parentForm中stockBox的值。
```javascript
if (window.opener &amp;&amp; !window.opener.closed)

{

window.opener.document.parentForm.stockBox.value = symbol;

}
```

**六、刷新页面的方法**

Javascript刷新页面的方法：

1    history.go(0)

2    location.reload()

3    location=location

4    location.assign(location)

5    document.execCommand('Refresh')

6    window.navigate(location)

7    location.replace(location)

8    document.URL=location.href

**自动刷新页面的方法:**

1.页面自动刷新：把```<meta http-equiv="refresh" content="20">```加入```<head>```区域中

2.页面自动跳转：把```<meta http-equiv="refresh" content="20;url=http://www.wyxg.com">```加入```<head>```区域中

3.js自动刷新页面
```javascript
<script language="JavaScript">
function myrefresh()
{
window.location.reload();
}
setTimeout('myrefresh()',1000); //指定1秒刷新一次
< /script>
```

4.JS刷新框架

a)刷新包含该框架的页面用
```javascript
<script language=JavaScript>
parent.location.reload();
< /script>
```

b)子窗口刷新父窗口
```javascript
<script language=JavaScript>
self.opener.location.reload();
< /script>
```
(　或　```<a href="javascript:opener.location.reload()">刷新</a>```)

c)刷新另一个框架的页面
```javascript
<script language=JavaScript>
parent.另一FrameID.location.reload();
< /script>
```

七、用过CSS hack应该知道，用下划线命名是一种hack，如使用“_style”这样的命名，可以让IE外的大部分浏览器忽略这个样式的定义，所以使用“_”做为命名时的分隔符是不规范的。在做CSS检查时会出现错误提示。

**八、IE条件注释写法**
```
< !--[if !IE]>除IE外都可识别<![endif]-->
< !--[if IE]> 所有的IE可识别 <![endif]-->
< !--[if IE 5.0]> 只有IE5.0可以识别 <![endif]-->
```

**九、CSS HACK 写法**

第一种：
```css
.div {
background:orange;
*background:green !important;
*background:blue;
}
```

第二种：
```css
.div {
margin:10px;
*margin:15px;
_margin:15px;
}
```

第三种：
```css
#div { color: #333; }
*+html #div { color: #999; }
* html #div { color: #666; }
```

**细节2**

一、IE6及以下不识别a 标签外的:hover伪类，在火狐，IE7里能正确达到效果，
解决办法：
```css
#show li.s1{ border:1px solid #ff9900; background:#454242;}
#show li.s2{ border:1px solid #D9D8D8; background:#312E2E;}
< li></li>
```

二、为元素设置hasLayout

很多IE6（或IE7）的问题可以用设置hasLayout值的方法来解决，最简单的给元素设置hasLayout值的方法是给加上CSS 的height或width(当然，zoom也可以用，但这不是CSS的一部分)。比如设置为height:1%。如果父元素没有设置高度，那么元素的物理高度并不会改变，但是，已经具备hasLayout属性。

三、IE6下字符重复出现

确保浮动元素设置了 display:inline;

在浮动元素中使用 margin-right:-3px;

四、样式优先级

1，内联样式 [1.0.0.0]

2，ID选择器 [0.1.0.0]

3，类，属性，伪类 选择器 [0.0.1.0]

4，元素标签，伪元素 选择器 [0.0.0.1]

五、一个元素垂直居中的css写法
```css
#exm{
position:absolute;
left:50%;
top:50%;
z-index:1;
width:200px;

height:100px;
margin-left:-100px;
margin-top:-52px;
}
```

六、zoom : normal | number

设置或检索对象的缩放比例。设置或更改一个已被呈递的对象的此属性值将导致环绕对象的内容重新流动。虽然此属性不可继承，但是它会影响对象的所有子对象( children )。

七、图片跟文字并排时, 要实现图片文字垂直居中:

1> 将line-height:设置成图片的高度,或者图片父元素的高度.

2> 再将图片的CSS设置vertical-align:middle;

八、li 元素中包含 a img 元素的时候，IE6下出现空白

解决方法 一

使 li 浮动，并设置 img 为块级元素

解决方法 二

设置 ul 的 font-size:0;

解决方法 三

设置 img 的 vertical-align: bottom;

解决方法 四

设置 img 的 margin-bottom: -5px;


**细节3…**

一、被点击访问过的超链接样式不在具有hover和active

解决方法：改变CSS属性的排列顺序: L-V-H-A

二、FF下连续长字段不能自动换行

解决方法：word-wrap:break-word;overflow:hidden;

三、FF下父容器高度不能自适应

解决办法：清除子元素的浮动

四、IE下图片下方产生空隙

解决办法：定义img 为display:block，或vertical-align为top/bottom/middle/text-bottom

定义父容器的字体大小为零，font-size:0

五、IE6下浮动元素和它相邻的非浮动元素之间有3px空隙

解决办法：相邻的非浮动元素也设置浮动；

浮动元素相对IE6定义_margin-right:-3px;

六、LI内容超长后以省略号显示

解决办法： white-space:nowrap;(文本不换行)text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;

七、文本不能垂直居中

解决办法：行高和容器高度相等line-height=height；

八、文本输入框和相邻的文本不能对齐

解决办法：设置文本输入框vertical-align:middle;

九、IE设置滚动条样式

解决办法：
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

十、IE6无法定义高度为1px的容器

解决办法：overflow:hidden

zoom:0.8

line-height:1px

**细节4…**

一、让层显示在flash之上

解决办法：给FLASH设置透明```<param name="wmode" value="transparent" />```或者```<param name="wmode" value="opaque" />```

二、使一个层垂直居中浏览器中

解决办法：使用百分比绝对定位，与外补丁负值的方法。
```css
position:absolute;
top:50%;
left:50%;
margin:-100px auto auto -100px;
width:200px;
height:200px;
```

三、加入收藏夹

解决办法：
```javascript
<script type="text/javascript">
// <![CDATA[
function bookmark(){
var title=document.title
var url=document.location.href
if (window.sidebar) window.sidebar.addPanel(title, url,"");
else if( window.opera &amp;&amp; window.print ){
var mbm = document.create_r_rElement_x('a');
mbm.setAttribute('rel','sidebar');
mbm.setAttribute('href',url);
mbm.setAttribute('title',title);
mbm.click();}
else if( document.all ) window.external.AddFavorite( url, title);
}
// ]]>
< /script>
< a href="javascript:bookmark()">加入收藏夹</a>
```

**细节5**

1.常见新闻列表的写法：
```html
<ul class="list">
< li><span>2006年6月6日 </span><a href="http://www.52css.com/#">新闻标题01</a></li>
< li><span>2006年6月6日 </span><a href="http://www.52css.com/#">新闻标题02</a></li>
< li><span>2006年6月6日 </span><a href="http://www.52css.com/#">新闻标题03</a></li>
< li><span>2006年6月6日 </span><a href="http://www.52css.com/#">新闻标题04</a></li>
< /ul>
```

2.IE实现页面背景渐变（FF及chrome不支持）
从上到下：
```css
body{filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#ffffff,endColorStr=#000000);}
```
左上至右下：
```css
FILTER: Alpha( style=1,opacity=25,finishOpacity=100,startX=50,finishX= 100,startY=50,finishY=100); background-color: skyblue;}
```
从左至右
```css
body{FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=1,startColorStr=#ffffff,endColorStr=#000000);}
```
从上到下
```css
style="filter:progid:DXImageTransform.microsoft.gradient(gradienttype=0,startColorStr=blue,endColorStr=white);"
```

3.a hover的样式实现多种效果，可以灵活运用
```css
#outer a { border:1px solid #069;}
#outer a:hover {border:1px dashed #c00;}
```

4.border:none;与border:0区别

理论上的性能差异:

border:0;把border设为“0”像素虽然在页面上看不见，但按border默认值理解，浏览器依然对border-width/border-color进行了渲染，即已经占用了内存值。border:none;把border设为“none”即没有，浏览器解析“none”时将不作出渲染动作，即不会消耗内存值。

兼容性差异：

兼容性差异只针对浏览器IE6、IE7与标签button、input而言，在win、win7、vista 的XP主题下均会出现此情况。当border为“none”时似乎对IE6/7无效边框依然存在,当border为“0”时，感觉比“none”更有效，所有浏览器都一致把边框隐藏，
如何让border:none;实现全兼容？只需要在同一选择符上添加背景属性即可

5.css实现多列等高布局,正内边距与负外边距

给每个需要实现等高的列应用样式：
```.e{padding-bottom:32767px;margin-bottom:-32767px;}```

6.position:relative;特殊用法？？？？

```css
* {margin:0;padding:0;font:normal 12px/25px "宋体";}
body {background:#f8f8f8;}
ul {list-style:none;width:300px;height:25px;margin:20px auto;}
li {float:left;width:86px;height:25px;text-align:center;margin:0 -5px;display:inline;}
a {color:#fff; float:left;width:86px;height:25px;top:0;left:0;background:url(***.gif) center center no-repeat;}
a:hover {color:#000;background:url(***.gif) 0 0 no-repeat;width:86px;position:relative;}
```

**细节6**

1。innerText：从起始位置到结束位置的内容，不包含标签innerHTML

outerHTML:包含 innerHTML和标签

```<div id="test"><span>test1</span>test2</div>```

test.innerText:test1 test2

test.innerHTML:```<span>```test1```</span>```test2

test.outerHTML:
```<div id="test"><span>test1</span>test2</div>```

2。Number（）：任何包含非数字字符的字符串做参数时，结果为NaN
parseInt():从左到右尽可能多低把字符串转化为数字，直到遇到一个非数字时停止
isNaN():参数不是一个数字时，返回true;

3。a=23.50abc
typeof(a)=String
parseFloat(a)=23.5
parseInt(a)=23
Number(a)=NaN

4。JS变量名包含数字字母美元符下划线，不能以数字开头

5。getElementsByTagName_r()需要等文档加载完毕后才能获取到

6。nodeType：共12种，1表示元素节点，3表示文本节点

nodeName：表示节点名称，如果是文本节点，则表示#text

nodeValue：表示节点的值

eg: 获取tagname为li的节点if(obj.nodeName.toLowerCase()=='li'){}

改变P的文本内容  document.getElementsByTagName_r('p')[0].firstchild.nodeValue=''

7。父节点到子节点

childNodes：元素所有第一层子节点列表，不包括向下更深层次的子节点

obj.firstChild=obj.childNodes[0]

obj.lastChild=obj.childNodes[obj.childNodes.length-1]

hasChildNodes() 判断元素是否有子节点，返回布尔值

7。子节点到父节点

var parentElm=myLinkItem.parentNode;

while(parentElm,className!=‘syna’&amp;&amp;parentElm!='document.body')

parentElm=parentElm.parentNode

8。修改元素属性

1）以对象属性的方式获取或设置
```javascript
var mainImage=document.getElementByIdx_x('nav').getElementsByTagName['img'][0];
mainImage.src='';
mainImage.alt='';
```

2)用getAttribute()和setAttribute()方法

**细节7**

1。将数字转化为拥有X位小数位的形式
```javascript
function roundTo(base,precision)
{ var m=Math.pow(10,precision);
var a=Math.round(base*m)/m;
return a;
}
var n=3.942487;
roundTo(n,3)=3.942
roundTo(n,0)=3
```

2。创建受约束的随机数
```javascript
function randomBetween(min,max)
{ return min+Math.floor(Math.random()*(max-min+1))}
```

3。数字转换为字符串
```javascript
var a=10;
a=String(a);/a=a.toString();
```

4。对url的编码
```javascript
var a="http://www.google.com/directoryname/?p=e";
var b=escape(a);
var c=(b);
```

5。改变文档内元素的类型
p--->div
首先创建一个div元素，然后复制p的子节点到div中，最后再用div 替换p

6。一个函数需要多少参数
```javascript
function add(n1,n2){}
return num=add.length;
```

7。一个函数传入了多少参数
```javascript
function add(n1,n2){
return arguments.length;}
```

**细节8**

1). display:inline-block;顾名思义，就是在内联情况下的块状，可以设定高度宽度。
```css
.element-class {
display: -moz-inline-stack; //Firefox only code
display: inline-block; //some standard browsers
zoom: 1; //IE only
*display: inline; //Only IE know this code (CSS Hack)
}
```

2).清理浮动
```css
.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
.clearfix {zoom:1;}
```

3).在地址栏添加自定义图标

首先，我们需要预先制作一个图标文件，大小为16*16像素。文件扩展名为ico，然后上传到相应目录中。在HTML源文件“```<head></head>```”之间添加如下代码：```<Link Rel=”ICON NAME” href=”http://图片的地址（注意与刚才的目录对应）”>```，当然如果用户使用IE5或以上版本浏览时，就更简单了，只需将图片上传到网站根目录下，即可自动识别！

4). 在IE6中设置display:block的空容器一个较小高度时，如```<p style=”height:1px;”></p>```，会发现其高度不能小于某个值。解决方案：设置overflow:hidden。

5).文字用省略号截断
```css
div{width:200px;height:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
```