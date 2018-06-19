---
title: 'HTML Meta中添加X-UA-Compatible和IE=Edge,chrome=1的作用'
tags:
  - chrome=1
  - chrome=1作用
  - IE=Edge
  - Meta中添加X-UA-Compatible和IE=Edge
  - X-UA-Compatible
id: 1978
categories:
  - HTML5/CSS3
date: 2015-12-22 23:28:02
---

X-UA-Compatible是自从IE8新加的一个设置，对于IE8以下的浏览器是不识别的。通过在meta中设置X-UA-Compatible的值，可以指定网页的兼容性模式设置。

在网页中指定的模式优先权高于服务器中(通过HTTP Header)所指定的模式。
兼容性模式设置优先级：
```javascriptmeta tag > http header```
**常用的例子：**
```html
<meta http-equiv="X-UA-Compatible" content="IE=7"> 
#以上代码告诉IE浏览器，无论是否用DTD声明文档标准，IE8/9都会以IE7引擎来渲染页面。 
<meta http-equiv="X-UA-Compatible" content="IE=8"> 
#以上代码告诉IE浏览器，IE8/9都会以IE8引擎来渲染页面。 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
#以上代码告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面。 
<meta http-equiv="X-UA-Compatible" content="IE=7,IE=9"> 
<meta http-equiv="X-UA-Compatible" content="IE=7,9"> 
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
```

#以上代码IE=edge告诉IE使用最新的引擎渲染网页，chrome=1则可以激活Chrome Frame.

“IE=Edge,chrome=1″这样简单快捷，但是弊端是代码将无法通过W3C验证。其实这并不是问题，毕竟标准只是标准，如果只有这一个“错误”完全不会有任何不良的影响。

&nbsp;

**IE文档兼容性模式所有可能的值：**

* Emulate IE8 mode

#指示IE使用指令来决定如何编译内容。Standards

mode指令会显示成IE8 Standards mode而quirks

mode会显示成IE5 mode。不同于IE8 mode，Emulate IE8 mode重视指令。

* Emulate IE7 mode

#指示IE使用指令来决定如何编译内容。Standards 

mode指令会显示成IE7 Standards mode而quirks

mode会显示成IE5 mode。不同于IE7 mode，Emulate IE7 

mode重视指令。对于许多网页来说这是最推荐的兼容性模式。

* IE5 mode

#编译内容如同IE7的quirks

mode之显示状况，和IE5中显示的非常类似。

* IE7 mode

#编译内容如同IE7的standards

mode之显示状况，无论网页是否含有指令。

* IE8 mode
#提供对业界标准的最高支持，包含 W3C Cascading Style Sheets Level 2.1 Specification和W3C Selectors 

API，并有限的支持 W3C Cascading Style Sheets Level 3 Specification (Working Draft)。

* Edge mode
#指示IE以目前可用的最高模式显示内容。当使用IE8时其等同于IE8 mode。若(假定)未来放出支持更高兼容性模式的IE，使用Edge mode的页面会使用该版本能支持的最高模式来显示内容。同样的那些页面在使用IE8浏览时仍会照常显示。

&nbsp;

**注意事项：**

1，根据官网定义X-UA-compatible 标头不区分大小写；不过，它必须显示在网页中除 title 元素和其他 meta 元素以外的所有其他元素之前。如果不是的话，它不起作用

2，content的内容是IE=8，或者IE=edge等值，注意不是IE8或者直接写个edge的值，否则不起作用

如果对WEb服务器了解，可以直接配置一下VirtualHost:
Apache:
```html
<IfModule mod_setenvif.c>
<IfModule mod_headers.c>
BrowserMatch MSIE ie
Header set X-UA-Compatible "IE=Edge" env=ie
BrowserMatch chromeframe gcf
Header append X-UA-Compatible "chrome=1" env=gcf
</IfModule>
</IfModule>
```
Nginx:
```javascript
add_header "X-UA-Compatible" "IE=Edge,chrome=1";
```
&nbsp;