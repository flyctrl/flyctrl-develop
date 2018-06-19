---
title: Web前端开发浏览器兼容探索
tags:
  - 前端兼容
id: 247
categories:
  - 前端兼容
date: 2015-07-13 13:59:41
---

**前言** 

浏览器兼容是前端开发人员必须掌握的一个技能，但是初入前端的同学或者其他后台web开发同学往往容易选择忽略，而形成两个极端：

1\. 我最开始都是使用IE6，IE6上没问题，其它浏览器坑爹（多出现与前端后端一起搞的同学，小生2年前就这种状态，鼓励人家用ie6.。。。）

2\. 我要遵循标准，我只要ff就好，IE就是坑爹的玩意，我不必去理他（小生一年前的心态。。。）

现在看来，之前的想法都是不对的，我们诚然应该追求最新的浏览器使用最新的技术，但是渐进增强，向后兼容的思想一定要有，因为就现在IE6在中国的份额也是不容小视的。

抛开之前的大道理，我们说点实际的问题，哪次前端面试不问兼容性问题？哪次我们又能回答的很好？反正我就没一次说好的，知不足然后能改，我前段时间便经过整理形成这篇文章，**文章有很多不足，希望各位指正、补充，后面若是能形成一篇较全面的前端兼容文章就善莫大焉了！**

**为什么会有兼容问题？**

 由于市场上浏览器种类众多，而不同浏览器其内核亦不尽相同，所以各个浏览器对网页的解析就有一定出入，这也是导致浏览器兼容问题出现的主要原因，我们的网页需要在主流浏览器上正常运行，就需要做好浏览器兼容。
 
使用Trident内核的浏览器：IE、Maxthon、TT；

使用Gecko内核的浏览器：Netcape6及以上版本、FireFox；

使用Presto内核的浏览器：Opera7及以上版本；

使用Webkit内核的浏览器：Safari、Chrome。

 而我现在所说的兼容性问题，主要是说IE与几个主流浏览器如firefox，google等。
 
而对IE浏览器来说，IE7又是个跨度，因为之前的版本更新甚慢，bug甚多。从IE8开始，IE浏览器渐渐遵循标准，到IE9后由于大家都一致认为标准很重要，可以说在兼容性上比较好了，但是在中国来说，由于xp的占有率问题，使用IE7以下的用户仍然很多，所以我们不得不考虑低版本浏览器的兼容。

对浏览器兼容问题，我一般是这样分类的，HTML，Javascript兼容，CSS兼容。

其中html相关问题比较容易处理，无非是高版本浏览器用了低版本浏览器无法识别的元素，导致其不能解析，所以平时注意一点就是。特别是HTML5增加了许多新标签，低版本浏览器有点影响时代进步啊；

**JavaScript兼容性问题**

在javascript中，各个浏览器基本语法差距不大，其兼容问题主要出现在各个浏览器的实现上，尤其对事件的支持有很大问题，在此我就说说我知道的几个问题。

① 在标准的事件绑定中绑定事件的方法函数为 addEventListener,而IE使用的是attachEvent

② 标准浏览器采用事件捕获的方式对应IE的事件冒泡机制（即标准由最外元素至最内元素或者IE由最内元素到最外元素）最后标准方亦觉得IE这方面的比较合理，所以便将事件冒泡纳入了标准，这也是addEventListener第三个参数的由来，而且事件冒泡作为了默认值。

③ 事件处理中非常有用的event属性获得亦不相同，标准浏览器是作为参数带人，而ie是window.event方式获得，获得目标元素ie为e.srcElement 标准浏览器为e.target

④ 然后在ie中是不能操作tr的innerHtml的

⑤ 然后ie日期函数处理与其它浏览器不大一致，比如： var year= new Date().getYear(); 在IE中会获得当前年，但是在firefox中则会获得当前年与1900的差值。 

⑥获得DOM节点的方法有所差异，其获得子节点方法不一致。

IE：parentElement parentElement.children

Firefox：parentNode parentNode.childNodes

childNodes的下标的含义在IE和Firefox中不同，Firefox使用DOM规范，childNodes中会插入空白文本节点。一般可以通过node.getElementsByTagName()来回避这个问题。

当html中节点缺失时，IE和Firefox对parentNode的解释不同。例如:

 IE：input.parentNode的值为空节点
 
 Firefox：input.parentNode的值为form
 
解决方法：Firefox中节点没有removeNode方法，必须使用如下方法 node.parentNode.removeChild(node)

⑦ 关于AJAX的实现上亦有所不同；

就javascript来说，各大浏览器之间的差异还是不少的，但是具体我变得这里都不大关注了，因为我们开发过程中一般都会使用类库，若是不使用，都会自己积累形成一个类库，所以就js而言，兼容性问题基本解决了。

**让人头疼的CSS兼容**

因为之前对css的理解不够深入，也没有经过系统的学习，所以一度认为css是前端最难的东西，但真的学习后，才发现css真的很难。。。有很多东西啊！！！

我觉得最让人头疼的问题还是CSS问题，因为一点点布局上的bug，可能导致整个页面的错位，在用户看来这是极不专业的。

现在我就简要说说我对CSS兼容问题的认识： 先说点Hack的知识（真正的高手是不用Hack的，但要成为高手必须通过Hack这一关）
&nbsp;
```css
/* CSS属性级Hack */
color:red; /* 所有浏览器可识别*/
_color:red; /* 仅IE6 识别 */
*color:red; /* IE6、IE7 识别 */
+color:red; /* IE6、IE7 识别 */
*+color:red; /* IE6、IE7 识别 */
[color:red; /* IE6、IE7 识别 */
color:red\9; /* IE6、IE7、IE8、IE9 识别 */
color:red\0; /* IE8、IE9 识别*/
color:red\9\0; /* 仅IE9识别 */
color:red \0; /* 仅IE9识别 */
color:red!important; /* IE6 不识别!important 有危险*/
/* CSS选择符级Hack */
*html #demo { color:red;} /* 仅IE6 识别 */
*+html #demo { color:red;} /* 仅IE7 识别 */
body:nth-of-type(1) #demo { color:red;} /* IE9+、FF3.5+、Chrome、Safari、Opera 可以识别 */
head:first-child+body #demo { color:red; } /* IE7+、FF、Chrome、Safari、Opera 可以识别 */
:root #demo { color:red\9; } : /* 仅IE9识别 */
/* IE条件注释Hack */
<!--[if IE 6]>此处内容只有IE6.0可见<![endif]-->
<!--[if IE 7]>此处内容只有IE7.0可见<![endif]-->
```
**接下来说说一些我知道的BUG：**

① css盒模型在IE6下解析有问题，我们知道就width来说，一个块级元素的magin、padding、boder，width7个属性的宽度之和，应该等于其父级元素的内容区域（width），而我们一般设置宽度若是未达到其长度，浏览器就会重置margin-right的值，将之它们的和等于其值，当然若是我们为margin设置负值，那么元素的width可能超出其父元素。在标准下，width为padding所占区域，但是再ie6中设置width后，其真实width为所设width-其padding与border*2，我一般采用CSShack技术处理

② IE6的双倍边距BUG，在块级元素浮动后本来外边距10px,但IE解释为20px,解决办法是加上display: inline ，

1、问题：在IE6下如果某个标签使用了float属性，同时设置了其外补丁“margin:10px 0 0 10px”可以看出，上边距和左边距同样为10px，但第一个对象距左边有20px。

2、解决办法：当将其display属性设置为inline时问题就都解决了。

3、说明：这是因为块级对象默认的display属性值是block，当设置了浮动的同时，还设置了它的外边距 就会出现这种情况。

也许你会问：“为什么第二个对象和第一个对象之间就不存在双倍边距的BUG”？


因为浮动都有其相对应的对象，只有相对于其父对象的浮动 对象才会出现这样的问题。第一个对象是相对父对象的，而第二个对象是相对第一个对象的，所以第二个对象在设置后不会出现问题。另外在一些特殊布局中，可能需要组合使用display:block;和display:inline;才能达到预期效果。

当然最坏的情况下，我们就可以使用”margin:10px 0 0 10px;*margin:10px 0 0 10px;_margin:10px 0 0 5px”，这种“标准属性;*IE7识别属性;_IE6识别属性”HACK方式解决

4、总结：这个现象仅当块级对象设置了浮动属性后才会出现，内联对象（行级对象）不会出现此问题。并且只有设置左边距和右边距的值才会出问题，上下边距不会出现问题。


margin双布局可以说是IE6下经典的bug之一。产生的条件是：block元素+浮动+margin。

还记得我自认为会css的那个阶段，这个问题我经常碰到，会很熟练的用hack解决这个问题，当时还自以为是，洋洋得意。现在看来，当时的自己嫩的就像个 豆芽菜。真正css厉害的人基本上是不会碰到这个bug的，如果您时不时遇到这个bug，说明您的css还有好一段路要走。

我的体会是越少的浮动，就会越少的代码，会有更灵活的页面，会有扩展性更强的页面。这不多说，归结为到一定水平了，浮动会用的较少。另外，您也会避免使用浮动+margin的用法。所以，越后来越不易遇到这种bug。

这里提一下解决方法，使用hack我是不推荐的，使用hack属于比初学者稍高一点的层次水平。一个页面，没有一个hack，但是各个浏览器下表现一致，这才是水平。使用display:inline;可以解决这个问题。

而为什么display:inline可以解决这个双边距bug，首先是inline元素或inline-block元素是不存在双边距问题的。然后，float:left等浮动属性可以让inline元素haslayout，会让inline元素表现得跟inline-block元素的特性一样， 支持高宽，垂直margin和padding等，所以div class的所有样式可以用在这个display inline的元素上。

③ IE6下图片下方有空隙产生；解决这个BUG的方法也有很多,可以是改变html的排版,或者设置img 为display:block，

或者设置vertical-align 属性为vertical-align:top bottom middle text-bottom都可以解决.（但是最近我发现这个问题在其它浏览器中也有所体现）

④ IE6 3px bug 两个浮动层中间有间隙，这个IE的3PX BUG也是经常出现的,

解决的办法是给右边元素也同样浮动 float:left 或者相对IE6定义.left margin-right:-3px;
经典两列布局，float: left;width:200px; 第二个，margin-left,200px; 他们之间会产生3px的间距。

⑤ 在IE6中没有min-width的概念，其默认width就是min-width，所以有时字体过多它会选择撑开容器。

⑥ IE6无法定义1px左右高度的容器，是因为默认的行高造成的,解决的方法也有很多, 例如: overflow:hidden zoom:0.08 line-height:1px

⑦ 使用margin ： 0 auto；方法使容器居中依然在IE6中行不通，我们要对其父容器使用

⑧ 被点击访问过的超链接样式不在具有hover和active了,很多人应该都遇到过这个问题, 

解决方法是改变CSS属性的排列顺序: L-V-H-A a:link {} a:visited {} a:hover {} a:active {}

⑨ 在使用绝对定位

相对定位时，设置z-index在ie中可能会失效，是因为其元素依赖于其父元素的z-index，而父元素默认为0 ？所以子元素z-index高，而父元素底，依然不会改变其显示顺序；

10、外边距叠加问题：
#box{ margin:10px; background-color:Red; }
#box p { margin:20px; background:gray; }

该代码会导致外边距叠加，并且外边距跑到div包裹外去，bug是由于块级子元素高度计算方式造成的。

若是元素没有垂直边框或者padding，那么它的高度就是包含的子元素的顶部和底部边框的的距离。

&nbsp;
以上便是我所记得的一些bug，在这里我再顺带提一下haslayout（IE8废弃该属性）。

在IE低版本浏览器时基本是表格布局的时代，几乎是所有的元素（除内联元素）都是一个盒子，内容不会超过表格的单元格，表格的单元格也不会超出表格。

在IE6推出后，CSS改变这一假设——因为CSS允许内容超出元素。 因此haslayout这个属性就诞生了。

在IE6，IE7中，每个元素都有haslayout这个属性，可以设置为 true 或者 false。如果设置为true，元素就必须去自我布局和渲染，因此元素会扩展去包含它溢出的内容，例如浮动或没截断的单词。

如果haslayout 没有被设置成true，那么元素需依靠某个祖先元素来渲染它。这就是很多的ie bugs诞生的地方。IE浏览器下的很多bug都是haslayout = false 引起的，

layout元素有以下特点：

*   拥有布局（haslayout=true）元素不会收缩，所以可能会发生文字截断、消失的现象；
*   布局元素对浮动自动清理；
*   相对定位的元素没有布局，这可能导致绝对元素定位偏差；
*   拥有布局的元素外边距不叠加；
*   滚动时，页面会有所跳动；
*   边框消失
*   像素偏差

haslayout不是一个CSS属性，所以我们不能这样的来设置它 haslayout:true;

 一个元素被设置成haslayout：true将被渲染成一个 having haslayout，反之同理。 一些元素本身该属性为true，若是需要触发，最好的方法是设置其zoom属性； 哪些元素本身就 haslayout：`<html>, <body><table>, <tr>, <th>, <td><iframe>, <embed>` (non-standard element),
`<object>, <applet> <img><hr><input>, <button>, <select>, <textarea>, <fieldset>, <legend>`

zoom:1，被认为是最好的触发Layout的方法，因为它对当前元素没有影响。 触发haslayout，相对来说比haslayout=false要简单。

以下属性和值将给定一个元素进行布局
position: absolute 

float:left or right 

display:inline-block；

width:any value other than auto;

height:any value other than auto；

zoom: any value other than normal 

(*)；writing-mode:  tb-rl

最后，因为各个浏览器对一些元素的默认值设置不一致也会导致表现差异，比如浏览器默认字体，默认行高，默认间距等。所以我们一般会为几个主要元素设置默认值。

**结语**
以上便是我对浏览器兼容的简单认识，但是还是有很多不足的地方，由于技术所限，这里提出来和各位高手交流，希望在交流学习中和以后工作中积累相关经验，做出满足主流浏览器的网页。
&nbsp;