---
title: JavaScript拖拽翻页(ThrowPage)
tags:
  - js拖拽页
  - ThrowPage
id: 1363
categories:
  - JS/Jq
date: 2015-08-26 23:32:36
---

[查看演示](http://demo.grycheng.com/case/draglist.html)

**结构层**

要把一个目录的内容按页展开，该怎么写呢？也许是这样，至少我就是这么写的
```html
<div id=”menu”>
<div class=”page”>
<ul>
<li><span>09-11-25</span><a>恋曲1980</a></li>
<li><span>09-11-25</span><a>恋曲1990</a></li>
<li><span>09-11-25</span><a>恋曲2000</a></li>
<li><span>09-11-25</span><a>母亲</a></li>
</ul>
<span class=”tip”>1/2页 拖拽翻页</span>
</div>
<div class=”page”>
<ul>
<li><span>09-11-25</span><a>伴侣</a></li>
<li><span>09-11-25</span><a>思念</a></li>
<li><span>09-11-25</span><a>童年</a></li>
<li><span>09-11-25</span><a>牧童</a></li>
</ul>
<span class=”tip”>2/2页 拖拽翻页</span>
</div>
</div>
```

[![1](http://www.npm8.com/wp-content/uploads/2015/08/1.jpg)](http://www.npm8.com/wp-content/uploads/2015/08/1.jpg)

`<ul`> 是每一页的列表，图中的浅灰色色部分

`<li>` 是列表中的一条，图中的珊瑚色部分

`<span class=”tip”>` 是不应该出现在xhtml 中的，应该由 js 添加，它是每一页下面的索引标识，图中的深灰色部分

`<div class=”page”>` 是目录中的页，图中的白色部分

`<div id=”menu”>`是包含了所有页的目录，图中的亮蓝色部分。当然，如果页面中除了这个效果外没有其他东西的话，这个标签也可以不写，那么所有 `<div class=”page”>` 的父标签就是 `<body>`或许你会说，目录也应该是` <ul>`，所以应该这么写

```html
<ul id=”menu”>
<li class=”page”>
<ul>
<li><span>09-11-25</span><a>恋曲1980</a></li>
<li><span>09-11-25</span><a>恋曲1990</a></li>
<li><span>09-11-25</span><a>恋曲2000</a></li>
<li><span>09-11-25</span><a>母亲</a></li>
</ul>
<span class=”tip”>1/2页 拖拽翻页</span>
</li>
<ul class=”page”>
<ul>
<li><span>09-11-25</span><a>伴侣</a></li>
<li><span>09-11-25</span><a>思念</a></li>
<li><span>09-11-25</span><a>童年</a></li>
<li><span>09-11-25</span><a>牧童</a></li>
</ul>
<span class=”tip”>2/2页 拖拽翻页</span>
</li>
</li>
```
这样确实更符合语意，不过问题马上就来了

**表现层**

怎么给上面的嵌套列表定义 CSS 呢？如果万恶的 IE6 支持子对象选择符 “>”，问题很简单。但为了兼容 IE6 和保证 xhtml 部分的简介，在后面另我抓狂的测试中，最终放弃了嵌套列表的方案（事实上，page 类都是由 js 动态设置的）。
让 ThrowPage 应用到你的网页中，其实全靠为页面定义不同的 CSS 实现的，但有几点一定要注意。

`<div id=”menu”>` 应该设置 (overflow:hidden)，否则动画过程中可能出现滚动条，影响效果;

每个 `<div class=”page”>` 必须是绝对定位 (position:absolute;)

如果希望出现 `<span class=”tip”>`，要为其预留空间，并且 `<ul>` 是应该有固定高度的

不要用 IE6 的 AlphaImageLoader 滤镜为 `<div class=”tip”>` 添加 PNG 背景，那会让上面的链接在 IE6 中失效

暂时就想到这么多，其实还有一些值得注意的，将在下一节作说明
上面图中的 CSS 是这样定义的：
```css
html,body{
width:100%;
height:100%;
border:0px;
margin:0px;
overflow:hidden;
}
#menu{
width:1000px;
height:500px;
overflow:hidden;
background:lightblue;
}
.page{
position:absolute;
width:300px;
height:400px;
left:350px;
top:50px;
background:#FFF;
border:1px solid #999;
}
ul{
list-style:none;
height:320px;
margin:20px;
padding:0px;
background:#EEE;
}
li{

font-size:12px;
height:20px;
line-height:20px;
border-bottom:1px dashed #999;
}
li span{
float:right;
}
li a{
color:#000;
text-decoration:none;
}
li a:hover{
text-decoration:underline;
}
.tip{
display:block;
height:20px;
margin:0px 20px;
line-height:20px;
text-align:center;
font-size:12px;
background:#999;
}
```
**行为层**

先简单说一下拖动是怎么实现的

其中，A 是绝对定位的，并且有一个 left 值 a，当鼠标在上面按下（onmousedown）时，记录下 b 值，相减算出 c 值
```javascript
var c;
*.onmousedown=function(e){
if(!e){e=e||window.event;}
ex=e.pageX?e.pageX:e.x;
c=ex-*.offsetLeft;
}
```
鼠标按住并且移动时，A 应该随鼠标横向移动，不断产生 d 值，不断设定 A 的 left 值为 d-c，就实现了横向移动，纵向同理。
```javascript
*.onmousemove=function(e){
if(!e){e=e||window.event;}
ex=e.pageX?e.pageX:e.x;
*.style.left=ex-c;
}
```
转到 ThrowPage，其实效果的前半段就是标准的横向拖动
前面为 `<div class=”page”>` 定义了一个 left 值，如果想居中的话，这个值应为

`(<div id=”menu”>宽-<div class=”page”>宽)/2`

&nbsp;
```css
.page{
position:absolute;
width:x px;
left:50%;
margin-left:-(x/2)px;
}
```
实现居中的，涉及的 m-l 值请自行计算

松开鼠标后，停止移动，开始动画，页面左边线（即图中 B，下简称“左边”）可能有以下几种情况：

*   左边在 A 及 A 的左边——-页面跳到 AB 位置
*   左边在 AB 中间——-页面移动到 AB 位置
*   左边在 B——-不进行动画（变态，拽了半天又放回去）
*   左边在 BD 中间——-页面移动到 DE 位置
*   左边在 D 及 D 的右边——-页面跳到 DE 位置

题外话：由此可见，移动的距离并不确定，用 JQ 的 animate 的话，时间一定，速度就不一样了，很挠墙。所以我的方法是：向目标位置移动 10 像素（几像素都可以，自己定，其实这就是移动速度），如果没有到目标位置，再移动 10 像素，可以到或者超过的话，直接跳到目标位置（很像递归，但确切的说不是）
向中间回移也是同样道理，故略

z-index 层叠顺序问题：

当最上面的层被拖拽的时候，他下面的一层会被显示，正如上图所示，被拖拽的层 z-index 值为 2，下面显示的一层 z-index 值为 1，再下面的被覆盖的层 z-index 值统统为 0
被拖拽层移动到坐标中 AB 或 DE 后，降一下 z-index 值，飞回的时候就跑到后面去了，同理，“左拖前翻，右拖后翻”的实现关键，是计算好哪一层的 z-index 值应该是 1