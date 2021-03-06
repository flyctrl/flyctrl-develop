---
title: CSS判断浏览器
tags:
  - css判断浏览器
id: 228
categories:
  - HTML5/CSS3
date: 2015-07-13 13:44:17
---

&emsp;&emsp;在进行WEB标准网页的学习和应用过程中，网页对浏览器的兼容性是经常接触到的一个问题。其中因微软公司的Internet Explorer(简称IE)占据浏览器市场的大半江山，此外还有Firefox、Opera等。需要对这些浏览器进行兼容。

&emsp;&emsp;同时，单就IE而言，因IE版本的升级更替，目前浏览者使用的主要停留在 IE5(IE5.5)、IE6和IE7这三个版本中。而这3个版本对于我们制作的WEB标准网页（XHTML+CSS）解释执行的显示状况不尽相同。并且，其他非IE浏览器与IE对某些CSS解释也不一样。所以，通过IE浏览器中的专有条件注释可有针对性的进行相关属性的定义。条件注释只能用于Explorer 5+ Windows(以下简称IE)(条件注释从IE5开始被支持)。如果你安装了多个IE，条件注释（Conditional comments）将会以最高版本的IE为标准（目前为IE 7）。
```html
<!--[if lte IE 6]>
<LINK rel="stylesheet" type="text/css" href="images/StyleSheet.css" />
<![endif]-->
<!--[if IE 7]>
<LINK rel="stylesheet" type="text/css" href="images/css.css" />
<![endif]-->
```
```css
#example{color:red ;}/*firefox*/
* html #example{color:blue;}/*ie6*/
*+html #example{color:green;}/*ie7*/
```
```html
<!–[if lte IE 6]>……<![endif]–>
```
&emsp;&emsp;Ite：less than or equal to意思是小于或等于IE6浏览器，用于IE浏览器的条件注释，常用于CSShack，针对IE的JS等。
条件注释只能在windows Internet Explorer(以下简称IE)下使用，因此我们可以通过条件注释来为IE添加特别的指令。通俗点，条件注释就是一些if判断，但这些判断不是在脚本里执行的，而是直接在html代码里执行的，比如：
```html
<!–[if IE]>
这里是正常的html代码
<![endif]–>
```
* 1，条件注释的基本结构和HTML的注释(```<!– –>```是一样的。因此IE以外的浏览器将会把它们看作是普通的注释而完全忽略它们。
* 2，IE将会根据if条件来判断是否如解析普通的页面内容一样解析条件注释里的内容。
* 3，条件注释使用的是HTML的注释结构，因此他们只能使用在HTML文件里，而不能在CSS文件中使用。可使用如下代码检测当前IE浏览器的版本（注意：在非IE浏览器中是看不到效果的）
```html
<!–[if IE]>
<h1>您正在使用IE浏览器</h1>
<!–[if IE 5]>
<h2>版本 5</h2>
<![endif]–>
<!–[if IE 5.0]>
<h2>版本 5.0</h2>
<![endif]–>
<!–[if IE 5.5]>
<h2>版本 5.5</h2>
<![endif]–>
<!–[if IE 6]>
<h2>版本 6</h2>
<![endif]–>
<!–[if IE 7]>
<h2>版本 7</h2>
<![endif]–>
<![endif]–>
```
那如果当前的浏览器是IE，但版本比IE5还低，该怎么办呢，可以使用
```html
<!–[if ls IE 5]>
```
当然，根据条件注释只能在IE5+的环境之下，所以
```html
<!–[if ls IE 5]>
```
根本不会被执行。

lte：就是Less than or equal to的简写，也就是小于或等于的意思。

lt ：就是Less than的简写，也就是小于的意思。

gte：就是Greater than or equal to的简写，也就是大于或等于的意思。

gt ：就是Greater than的简写，也就是大于的意思。

! ：就是不等于的意思，跟javascript里的不等于判断符相同

Conditional comments属于CSS hack? 条件判断属于CSS hack吗？

&emsp;&emsp;严格地说是属于CSS hack。因为就好象其他真正的css hack一样，它使得我们可以给一些浏览器赋予特殊的样式，再则它不依赖于某个浏览器的BUG来控制另外一个浏览器（的样式）。除此之外，条件判断还能用来做一些超出CSS HACK范围的事情(虽然这种情况很少发生)。
因为条件判断不依赖于某个浏览器的hack,而是一个经过深思熟虑的特色功能，所以我相信它是可以被放心地使用的。当然，其他浏览器也有可能支持条件判断（到目前为止还没有），但是看起来，他们应该不会使用如```<!–[if IE]>```这样的语法。
应该如何应用条件注释本文一开始就说明了，因为IE各版本的浏览器对我们制作的WEB标准的页面解释不一样，具体就是对CSS的解释不同，我们为了兼容这些，可运用条件注释来各自定义，最终达到兼容的目的。比如：
```html
<!– 默认先调用css.css样式表 –>
<link rel="stylesheet" type="text/css" href="css.css" />
<!–[if IE 7]>
<!– 如果IE浏览器版是7,调用ie7.css样式表 –>
<link rel="stylesheet" type="text/css" href="ie7.css" />
<![endif]–>
<!–[if lte IE 6]>
<!– 如果IE浏览器版本小于等于6,调用ie.css样式表 –>
<link rel="stylesheet" type="text/css" href="ie.css" />
<![endif]–>
```
这其中就区分了IE7和IE6向下的浏览器对CSS的执行，达到兼容的目的。同时，首行默认的css.css还能与其他非IE浏览器实现兼容。

注意：默认的CSS样式应该位于HTML文档的首行，进行条件注释判断的所有内容必须位于该默认样式之后。

&emsp;&emsp;比如如下代码，在IE浏览器下执行显示为红色，而在非IE浏览器下显示为黑色。如果把条件注释判断放在首行，则不能实现。该例题很能说明网页对IE浏览器和非IE浏览器间的兼容性问题解决。
```css
<style type="text/css">
body{
background-color: #000;
}
</style>
<!–[if IE]>
<style type="text/css">
body{
background-color: #F00;
}
</style>
<![endif]–>
```
&emsp;&emsp;同时，有人会试图使用
```html
<!–[if !IE]>
```
来定义非IE浏览器下的状况，但注意：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下非单不是执行该条件下的定义，而是当做注释视而不见。正常就是默认的样式，对IE浏览器需要特殊处理的，才进行条件注释。在HTML文件里，而不能在CSS文件中使用。