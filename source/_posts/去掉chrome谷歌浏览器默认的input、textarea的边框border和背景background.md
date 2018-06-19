---
title: 去掉chrome(谷歌)浏览器默认的input、textarea的边框(border)和背景(background)
tags:
  - background
  - border
  - iinput
  - textarea
id: 350
categories:
  - HTML5/CSS3
date: 2015-07-13 16:33:46
---

1、使用Chrome的都知道，当鼠标焦点在input、textarea这些元素上时，Chrome默认的会给它们加上黄色的边框，我以前一直以为这是chrome的特性，没法去掉，原来是css的效果，outline这个属性。
你可以用下面的css代码去掉所有元素的边框：

`:focus {outline: none;}`

用下面的代码去掉你要去掉的元素的边框：

`.nohighlight:focus { outline:none; }`

你也可以给元素增加你希望的边框：

`.changeborder:focus { outline:Blue Solid 4px; }`

2、用chrome登录了一次并记录了COOKIES之后，再次打开，CHROME记录了上次输入的内容，背景图片就会被覆盖一层淡黄色的背景色， 点击一下鼠标，背景图片才显示出来。这个怎么解决呢？我当时碰到这个问题的时候，也很头疼，至今都没有发现有什么好的办法。有发现的请分享一下。

3、chrome默认用户可以控制textarea的大小，在CSS中加入下面一句就可以了

`textarea {resize:none;}`