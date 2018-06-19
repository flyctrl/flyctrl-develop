---
title: css中的负margin技术以及运用
tags:
  - 负margin
id: 321
categories:
  - HTML5/CSS3
date: 2015-07-13 15:36:47
---

刚刚开始学习css的时候，我采用了float为主来实现布局的方式，但是运用浮动很长一段时间之后，我发现这是一种被人牵着鼻子走的做法。至少，页面上不应过多的运用浮动，尤其是不要拿来确定整个布局。

很简单的道理，当你用了float:left,后面的div很可能需要跟着用float:left，而且当宽度不够的时候，本来该和上一个div一个水平线上的div跑到下面去了，如果某个div有margin属性，还会遇到ie6那个烦人的bug。而且浮动之后，你还必须在合适的地方使用清除浮动。

在网上看到了一篇讲负margin的文章，仔细研究之后，觉得很实用。我将那篇文章的内容提炼出来，原文写的很好，但是需要花很长的时间去阅读。

为了形象、易懂的解释负margin，我们将引入W3C上没有的参考线的说法。何谓参考线？参考线就是margin移动的基准点，此基准点相对于box(自身)是静止的。而margin的数值，就是box相对于参考线的位移量。

一个完整的margin属性是这么写的margin: top right bottom left;(eg: margin:10px 20px 30px 40px)。

**在margin属性中一共有两类参考线，top和left的参考线属于一类，right和bottom的参考线属于另一类。top和left是以外元素为参考，right和bottom是以元素本身为参考。**

margin的位移方向是指margin数值为正值时候的情形，如果是负值则位移方向相反。

先看看一个完整的例子
```html
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Margin参考线举例说明</title>
<style type="text/css">
*{margin:0; padding:0;}
.wrap{width:400px; border:5px solid #aaa;}
.example{width:200px; height:200px; background:#CCCCFF;}
.normal{width:200px; height:200px; background:#CCE8CF;}
.example{margin:-10px 20px -30px 40px;}
</style>
</head>
<body>
<div class="wrap">
<div class="example">example元素：margin参考线举例说明文字，请查看此元素由于margin的变化所移动的位移量。</div>
<div class="normal">一个普通的Box</div>
</div>
</body>
</html>
```

来分析这段代码，example元素下方有一相邻元素normal（注：这里分析的是添加和删除margin后的example元素，normal元素仅作为example元素前后效果的参照）。

根据上文的参考线原理margin:-10px(top) 20px(right) -30px(bottom) 40px(left);上-10px和左40px将以外元素为参考，**所谓外元素就是本元素的边界元素**（再白话点的解释就是元素的紧邻元素，这里涉及到containing block知识，可自行网上搜索）。

example元素上边和左边的边界元素即为wrap父元素，wrap父元素为基准点，example的margin-top为-10px，想象下如果这里margin-top为+10px会什么情况，没错如果为+10px，example元素相对于wrap父元素边缘为基准，那么example元素会同wrap父元素10px产生间隙边距，那么反过来，margin-tip:-10px;还是与wrap父元素边缘为基准，反过来向上推10px的距离位置。example元素的margin-left为40px，这里就按照正常逻辑相隔40px边距，同理如果为-40px，那么就是反方向向左推进40px的距离位置。

再来看example元素的margin-right和margin-bottom，由上文得知这俩个值是以元素本身为参考。**什么叫以元素本身为参考呢，确切含义是指以自身为参考来影响周围元素的位置（实质即为影响下边和右边相邻元素的参考线）**。这里的margin-bottom为-30px，对于其自身位置没有任何变化，但是对于其下方元素normal元素产生了极大的影响，因为normal元素的上边界元素即为example元素，根据example元素边界来判定自身位置，想象下如果example元素margin-bottom为+30px，那么example元素将隔开下方的normal元素，反之为-30px，下方normal元素由于example参考线内凹，导致了normal元素自个儿身不由己的被“提”了上去了。这就是以自身为参考影响周围元素位置的含义。

**当margin四个值都为正数值的话，那么margin按照正常逻辑同周围元素产生边距。当元素margin的top和left是负值时会引起元素的向上或向左位置移动。而当元素margin的bottom和right是负值时会影响右边和下边相邻元素的参考线。**

接下来我们将利用两个例子深入讲解负margin技术的应用领域。
**负margin在Tab选项卡中的应用：**
最核心的就是下方俩行高亮部分代码，第二行的margin-bottom:-1px;使下方的正文部分向上“提”了1px的距离，从而达到了鼠标上移后选项卡白色遮住下方黑色边框的效果（注：由于IE不是符合W3C标准，所以当鼠标移到选项卡上时需要添加一个额外属性position:relative;来修复IE不覆盖下方边框的这个Bug）。第四行的margin-left:-1px;的目的是让四个选项卡向左移动1px的距离，达到左右都只有一条分割线的效果。

```css
.demoTab{width:400px; font:14px/1.5 Microsoft YaHei,verdana,Helvetica,Arial,sans-serif;}
.demoTab .demoTabHd{margin-bottom:-1px; border:1px solid #6C92AD; border-bottom:none; background:#EAF0FD;}
.demoTab .demoTabNav{height:28px; overflow:hidden; *zoom:1;}
.demoTab .demoTabList{float:left; margin-left:-1px;  padding:0 22px; line-height:28px; border-left:1px solid #6C92AD; border-right:1px solid #6C92AD;  font-weight:bold; color:#005590; text-align:center; cursor:pointer;}
.demoTab .demoTabList.current{position:relative; background:#fff;}
.demoTab .demoTabBd{border:1px solid #6C92AD;}
.demoTab .demoTabBd .roundBox{padding:15px;}
.demoTab .demoTabContent{display:none;}
.demoTab .demoTabContent.current{display:block;}
```

HTML代码：
```html
<div id="demoTab" class="demoTab">
<div class="demoTabHd">
<ul class="demoTabNav clearfix">
<li class="demoTabList current">前端</li>
<li class="demoTabList">实战</li>
<li class="demoTabList">交互</li>
<li class="demoTabList">优化</li>
</ul>
</div>
<div class="demoTabBd">
<div class="roundBox">
<div class="demoTabContent current">这是第一个选项卡的内容。</div>
<div class="demoTabContent">这是第二个选项卡的内容。</div>
<div class="demoTabContent">这是第三个选项卡的内容。</div>
<div class="demoTabContent">这是第四个选项卡的内容。</div>
</div>
</div>
</div>
```

**利用负margin制作自适应左右布局：**

```css
.demoLayout{width:500px; border:1px solid #aaa; background:#EEEEEE;}
.demoLayout .roundBox{padding:10px; min-height:170px; _height:170px;}
.demoLayout .demoShowPic img{padding:1px; border:1px solid #DAA520;}
.demoText{margin:-170px 0 0 215px;}
.demoLayoutBtn{margin:15px 0 0 0;}
```
&nbsp;
```html
<div id="demoLayout" class="demoLayout">
<div class="roundBox">
<div class="demoShowPic"><img width="200" height="166" src="toygersKittens.jpg" alt="toygers kittens" /></div>
<div class="demoText">利用负margin制作自适应左右布局</div>
</div>
</div>
```

如上例这类布局效果（左边一个固定图片，右边为内容），负margin能够替代float浮动布局，进行左右布局规划，并且拥有float所没有的自适应效果。

根据上面的几个实例，相信你已经对负margin技术有了一个比较完整的理解。负margin不但可以做出一般CSS属性所不能达到的效果还能够化繁为简、化腐朽为神奇之奇效，当然负margin用到的地方不仅仅是这些，还有许多效果都是需要负margin技术来实现的，只要你耐心的去实践去探索，相信你会发现更多负margin用到得场合。