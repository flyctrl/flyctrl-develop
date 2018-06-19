---
title: 解决inline-block元素的空白间距
tags:
  - inline-block空白
id: 76
categories:
  - 前端兼容
date: 2015-07-11 16:57:24
---

&emsp;&emsp;有关于使用inline-block来代替float的讨论也蛮多的，最常说的就是使用inline-block来代替float进行布局，或者使用inline-block来实现元素的居中效果。，就是使用inline-block的元素之间会存在“4px”的空白间距。那么今天我们就一起来说说这个“4px”的问题。

大家首先来看一个demo

```html
<ul>
<li>item1</li>
<li>item2</li>
<li>item3</li>
<li>item4</li>
<li>item5</li>
</ul>
```

```css
*{
margin: 0;
padding: 0;
}
ul {
list-style: none outside none;
padding: 10px;
background: green;
text-align: center;
}
ul li {
display: inline-block;
*display: inline;
zoom: 1;
background: orange;
padding: 5px;
}
```

上面的demo效果，明显的可以看出，在inline-block的元素之间存在“4px”的空白：

[![1](http://www.npm8.com/wp-content/uploads/2015/07/1-300x60.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/1.jpg)

上面截图是：IE8-9、Firefox、Safari等浏览器下的效果，换句话说，这种现像只有在这几种浏览器中才会出现。下面我们就来说说解决这个“4px”(Chrome下是8px)的几种方法：

#### 方法一：改变HTML结构

简单一点的方法就是就是改变HTML的结构，你可以使用下面几种方法的任何一种都可以达到效果：

**结构一：**

```html
<ul>
<li>
item1</li><li>
item2</li><li>
item3</li><li>
item4</li><li>
item5</li>
</ul>
```

这种方法接近标签换行格式的写法，也更趋近阅读。

**结构二：**

```html
<ul>
<li>item1</li
><li>item2</li
><li>item3</li
><li>item4</li
><li>item5</li>
</ul>
```

结构二和结构一极呼是一样，结束标签的“>”成了另一行的起始标签。

**结构三：**

```html
<ul>
<li>item1</li><!–
–><li>item2</li><!–
–><li>item3</li><!–
–><li>item4</li><!–
–><li>item5</li>
</ul>
```

结构三的方法采用的是html的注释的方法，这种方法我想大家不太常见，不过同样能解决我们需要解决的问题。

**结构四：**

```html
<ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    <li>item4</li>
    <li>item5</li>
</ul>
```

结构四，我想是大家常用来解决这样的问题的方法吧，下面我们来看看按上述几种方法写的效果：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/2-300x248.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/2.jpg)

方法一所说的是通过标签来解决，虽然问题是解决了，但可以说不能称作是技巧。而且上面的方法只适合于写静态页面的时候，一旦你的HTML不是自己 写，而是后台生成，就比如CMS来说，标签后台生成，此时，我想大家又要骂街了，这可怎么办？其实我们除了上面的方法，还可以使用CSS来解决的。

#### 方法二：负的margin

很多地方讨论使用负的margin来解决，比如说：

```css
ul {
font-size: 12px;
}
ul li {
margin-right: -4px;
*margin-right: 0;
}
```

这种解决方法并不完美，如果你的父元素设置的字号不一样，可能你的“-4px”就不能解决问题。况且在Chrome中你需要另外设置一个负的margin值才能实现同等的效果。

[![3](http://www.npm8.com/wp-content/uploads/2015/07/3-300x126.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/3.jpg)

当然有些文章介绍使用”-0.25em”来解决，这也是跟元素的字号有极大的关系。**所以我个人建议不使用负的margin来解决这样的问题。**

#### 方法三：设置父元素字体为0

第三种方法设置父元素的字体为“0”，然后在“inline-block”元素上重置字体需要的大小。

```css
ul {
list-style: none outside none;
padding: 10px;
background: green;
text-align: center;
font-size: 0px;
}
ul li {
display: inline-block;
*display: inline;
zoom: 1;
background: orange;
padding: 5px;
font-size: 12px;
}
```

这样处理在Firexfox,chrome等浏览器下是达到了效果，可是在Safari下可问题依然存在：

[![4](http://www.npm8.com/wp-content/uploads/2015/07/4.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/4.jpg)

按此来说，方法三也不是绝佳的好方法，用不用大家自己考虑。

#### 方法四：丢失结束标签

说实在的，这种方法又回到了方法一，在html标签上动手脚。就是让“inline-block”元素丢失关闭标签

```html
<ul>
<li>item1
<li>item2
<li>item3
<li>item4
<li>item5
</ul>
```

样式基本不变，我们来看看效果：
[![5](http://www.npm8.com/wp-content/uploads/2015/07/5.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/5.jpg)```
<pre>这种方法虽然能达到各浏览器的兼容，但还是有一个前提，那就是“DOCTYPE”要选择对，在“XHTML”下可就问题又出来了。```

#### 全兼容的样式解决方法

经过高人指点，使用纯CSS还是找到了兼容的方法，就是在父元素中设置font-size:0,用来兼容chrome，而使用letter-space:-N px来兼容safari:

```css
.finally-solve {
letter-spacing: -4px;/*根据不同字体字号或许需要做一定的调整*/
word-spacing: -4px;
font-size: 0;
}
.finally-solve li {
font-size: 16px;
letter-spacing: normal;
word-spacing: normal;
display:inline-block;
*display: inline;
zoom:1;
}
```