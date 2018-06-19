---
title: 提高CSS文件可维护性的五种方法
tags:
  - 提高CSS文件可维护性
id: 2113
categories:
  - HTML5/CSS3
date: 2016-01-29 15:25:30
---

&emsp;&emsp;当完成一项前端的工作之后，许多人都会忘记该项目的结构与细节。然而代码并不是马上就能完全定型，在余下的时间里还有不断的维护工作，而这些工作也许不会是你自己完成。所以，结构优良的代码能很大程度上优化它的可维护性。下面列出五种提高CSS文件可维护性的方法，也就是一种较好的CSS样式指南。

**1.分解你的样式**

&emsp;&emsp;对于小项目，在写代码之前，按页面结构或页面内容将代码分为几块并给予注释。例如，可以分别将 全局样式、布局、字体样式、表单、评论和其他分为几个不同的块来继续工作。

&emsp;&emsp;而对于较大的工程，这样显然不会有什么效果。此时，就需要将样式分解到几个不同的样式表文件。下面的master stylesheet 就是这一方法的例子，它的工作主要是导入其他样式文件。使用这一方法不仅能优化样式结构，而且有利于减少一些不必要的服务器请求。而分解文件的方法就有许多种，master stylesheet 使用了最常见的一种。

&emsp;&emsp;同时对于大型项目，你也可以加上CSS文件的升级标志或者一些诊断措施，这里不再详述。

**2.建立CSS文件索引**

&emsp;&emsp;为了能够迅速的了解整个CSS文件的结构，在文件开头建立文件索引是一个不错的选择。一种可行的方法是建立树形的索引：结构上的id 和 class 都可以成为该树的一个分支。如下：

[Layout]
* body
Header / #header
Content / #content
- Left column / #leftcolumn
- Right column / #rightcolumn
- Sidebar / #sidebar
- RSS / #rss
- Search / #search
- Boxes / .box
- Sideblog / #sideblog
Footer / #footer
Navigation #navbar
Advertisements .ads
Content header h2

或者也可以这样：

[Table of contents]
1\. Body

2\. Header / #header

2.1\. Navigation / #navbar

3\. Content / #content

3.1\. Left column / #leftcolumn

3.2\. Right column / #rightcolumn

3.3\. Sidebar / #sidebar

3.3.1\. RSS / #rss

3.3.2\. Search / #search

3.3.3\. Boxes / .box

3.3.4\. Sideblog / #sideblog

3.3.5\. Advertisements / .ads

4\. Footer / #footer

&emsp;&emsp;另一种方式可以只是先简单的将内容列举出来，也不需要缩进。下面的一个例子中，如果你需要跳至RSS部分你只需要简单的搜索。

[Table of contents]
1\. Body

2\. Header / #header

3\. Navigation / #navbar

4\. Content / #content

5\. Left column / #leftcolumn

6\. Right column / #rightcolumn

7\. Sidebar / #sidebar

**3.定义你的颜色和版式**

&emsp;&emsp;CSS 中我们无法使用常量，但是在编写颜色和版式方面的代码是我们会经常遇到可以使用很多次的类，在这里可以将之视为CSS 的常量。

&emsp;&emsp;一种可以减小CSS无常量定义确定的方法是在CSS文件顶部的注释中下一些定义，也就是定义常量。一种最简单的应用就是创建一个颜色表。这样你就可以快速的了解整个页面的色彩，从而避免一些反复修改过程中的错误。如果你需要对颜色进行修改，你也可以很快找到它。

# [Color codes]
# Dark grey (text): #333333
# Dark Blue (headings, links) #000066
# Mid Blue (header) #333399
# Light blue (top navigation) #CCCCFF
# Mid grey: #666666

&emsp;&emsp;或者，你也可以选择描述你布局当中使用的颜色。对于一个给定的颜色，你可以将用到该颜色的块罗列出来。当然，你也可以选择按页面元素来罗列颜色。

[Color codes]
Background: #ffffff (white)

Content: #1e1e1e (light black)

Header h1: #9caa3b (green)

Header h2: #ee4117 (red)

Footer: #b5cede (dark black)

a (standard): #0040b6 (dark blue)

a (visited): #5999de (light blue)

a (active): #cc0000 (pink)

对于版式有同样的例子。

[Typography]

Body copy: 1.2em/1.6em Verdana, Helvetica, Arial, Geneva, sans-serif;

Headers: 2.7em/1.3em Helvetica, Arial, "Lucida Sans Unicode", Verdana, sans-serif;

Input, textarea: 1.1em Helvetica, Verdana, Geneva, Arial, sans-serif;

Sidebar heading: 1.5em Helvetica, Trebuchet MS, Arial, sans-serif;

Notes: decreasing heading by 0.4em with every subsequent heading level

**4.格式化CSS属性**

&emsp;&emsp;当我们编写代码的时候，使用一些特殊的编码风格会对提高CSS代码的可读性有很大帮助。许多人都有各自不同的编码风格。一部分人习惯于将颜色和字体的代码放在前面，另外一部分则更喜欢将类似浮动和定位的更“重要”的属性放在前面。类似的，也可以将页面元素按照它在布局中的结构进行排序：
```css
body,
h1, h2, h3,
p, ul, li,
form {
border: 0;
margin: 0;
padding: 0;
}
```
&emsp;&emsp;一些开发者用一种更为有意思的方法：他们将属性按首字母的顺序排列。值得注意的是，这样一种方法可能对某些浏览器会产生问题。
不管自己的格式如何，你要确保你已经清晰的定义了这些格式方法。这样，你的同事在阅读你的代码的时候将会感谢你的努力。

**5.缩进会是你的朋友！**

&emsp;&emsp;为了让你的代码给人感觉更为直观，你可以使用一行来定义大纲元素的样式。当指定的选择器里的属性超过三个的时候，这种方式将带来混乱。但是，适度的使用这种方式，你可以很清楚的区分相同类的不同点。
```css
#main-column { display: inline; float: left; width: 30em; }
#main-column h1 { font-family: Georgia, "Times New Roman", Times, serif; margin-bottom: 20px; }
#main-column p { color: #333; }
```
&emsp;&emsp;同时，样式修改的维护也是个比较麻烦的问题。很多人修改样式之后就忘记了，结果后来又发现修改的样式导致了页面出错，不得不苦苦寻找。因此，为修改的样式构建一个特殊的格式就很必要了。一种很简单的方式是，给修改过的样式缩进，同时，也可以使用一些注释（比如"@new"）来做一个标识。
```css
#sidebar ul li a {
display: block;
background-color: #ccc;
border-bottom: 1px solid #999; /* @new */
margin: 3px 0 3px 0;
padding: 3px; /* @new */
}
```
&emsp;&emsp;总的来说，只有建立一个合适的样式指南才会对样式表的可读性有所帮助。记住，移去每一个对你理解文件没有帮助的样式指南，避免对过多的元素使用过多的样式指南。然后，为了一个可读性可维护性良好的CSS文件而努力吧。

8\. RSS / #rss

9\. Search / #search

10\. Boxes / .box

11\. Sideblog / #sideblog

12\. Advertisements / .ads

13\. Footer / #footer

[8\. RSS / #rss]

#rss { ... }

#rss img { ... }

&emsp;&emsp;定义这样一个样式检索可以很有效的使其他人阅读学习你的代码变得容易。在制作大项目的时候，你也可以将检索打印出来从而在你阅读代码的时候方便查阅。