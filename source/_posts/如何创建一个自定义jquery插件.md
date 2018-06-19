---
title: 如何创建一个自定义jQuery插件
tags:
  - jQuery插件
id: 481
categories:
  - JS/Jq
date: 2015-07-16 10:09:41
---

### **简介**

&emsp;&emsp;jQuery 库是专为加快 JavaScript 开发速度而设计的。通过简化编写 JavaScript 的方式，减少代码量。使用 jQuery 库时，您可能会发现您经常为一些常用函数重写相同的代码。如果这样的话，这可能就是您需要编写自定义 jQuery 插件的一个原因。

&emsp;&emsp;jQuery 插件允许您使用自定义代码扩展 jQuery 库；您可以对一些重复性函数使用插件。例如，很多插件可供幻灯片、下拉菜单和折叠菜单所用。如果您搜索 jQuery 插件，就会发现有大量可用于自己项目的示例（看看它们是如何构建的）。

常用缩略词
>CSS：层叠样式表

>HTML：超文本标记语言

&emsp;&emsp;在本文中，您将学习如何快速创建一个自定义 jQuery 插件。示例代码和逐步操作将为您演示如何创建一个 jQuery accordion 插件。如果您了解 jQuery，而且准备让您的技能再上一个台阶，这篇文章非常适合您。
您可以在此 下载 本文所用的示例源代码。
今天来介绍一下如何创建一个自定义jQuery插件。

### 前篇

&emsp;&emsp;jQuery 库是专为加快 JavaScript 开发速度而设计的。通过简化编写 JavaScript 的方式，减少代码量。使用 jQuery 库时，您可能会发现您经常为一些常用函数重写相同的代码。如果这样的话，这可能就是您需要编写自定义 jQuery 插件的一个原因。

&emsp;&emsp;jQuery 插件允许您使用自定义代码扩展 jQuery 库；您可以对一些重复性函数使用插件。例如，很多插件可供幻灯片、下拉菜单和折叠菜单所用。如果您搜索 jQuery 插件，就会发现有大量可用于自己项目的示例（看看它们是如何构建的）。

### **准备工作**

&emsp;&emsp;对JavaScript、jQuery 和CSS有一个基本了解。（用到的源代码及示例在本文最下方）

### **开始**

&emsp;&emsp;jQuery 是一个可扩展 JavaScript 语言的库。当您创建一个 jQuery 插件时，本质上是在扩展这个 jQuery 库。要真正了解插件如何扩展 jQuery 库需要对 JavaScript prototype 属性有一个基本了解。尽管不直接使用，但是 JavaScript prototype 属性可通过 jQuery 属性 fn 在后台使用，这是原生 JavaScript prototype 属性的一个 jQuery 别名。
要使用 fn 属性创建一个新 jQuery 插件，只需要为 fn 属性分配一个插件名，并将其指向一个充当构造函数的新函数，类似于纯 JavaScript。Code 1显示了如何定义一个名为 accordion 的新 jQuery 插件，其方法是通过使用 jQuery 对象和 fn 属性，并将其分配给一个新的构造函数。

**Code 1：定义一个名为 accordion 的新 jQuery 插件**
```javascript
jQuery.fn.accordion = function() {
// 在这里添加插件代码
};
```
**Code 1 展示了创建 jQuery**

&emsp;&emsp;插件的一种方法；该示例没有什么功能性错误。但是，创建一个 jQuery 插件所推荐的方法是，先创建一个允许使用美元符号 ($) 的包装器函数。在默认情况下，美元符号可能与其他 JavaScript 框架发生冲突，如果将插件包装在一个函数中，就不会出现冲突。Code 2 中的示例代码显示如何将一个包装器函数应用到一个 jQuery 插件定义中。

```javascript
(function($) {
$.fn.accordion = function() {
// 在这里添加插件代码
};
})(jQuery);
```

&emsp;&emsp;在Code 2 中，jQuery 关键字被应用到包装器函数中，这允许您在插件中使用美元符号，就像使用 fn 属性时那样。包装器函数就绪后，就可以在整个插件的任何地方使用美元符号代替 jQuery 关键字，不会干扰其他第三方插件。该选项提供了一种方法使我们可以在开发整个插件中编写较少的代码，并且有助于您的插件代码保持整洁，易于维护。

**维护链接性**

&emsp;&emsp;jQuery 的一个优势是允许您使用任何类型的选择器。但是，必须记住，您的插件可以处理几种不同的元素类型。使用 this 关键字允许您的插件应用于相关函数，通过循环实现每个元素的访问，而不考虑元素类型。如果在 each 循环前使用 return 关键字，就可以使用您的插件维护链接性。清单 3 显示了分配给一个函数处理程序且与 return 关键字相结合的 each 循环。

**code 3\. 在 each 循环之前使用 return 关键字**
```javascript
(function($) {
$.fn.accordion = function() {
return this.each(function() {
// 使用 return
});
};
})(jQuery);
```

&emsp;&emsp;有了Code 3 的代码后，示例 accordion 插件可用在一个方法调用链中。有了链接性（另一个强大的 jQuery 特性），您的插件就可用在一个方法调用链中。例如，下面的代码显示了如何淡出HTML元素，并在单一的方法调用链中将其从文档对象模型 (DOM) 中删除。

`$("#my-div").fadeOut().remove();`

### **构造一个 accordion**

&emsp;&emsp;一个典型的层叠设计包括标题栏和相关内容区域。定义列表是一个可供 accordions 使用的很好的 HTML 结构；dt 元素供标题所用，而dd 元素供内容区域所用。清单 4 中的 HTML 结构是一个定义列表，含有四个标题以及相应的内容区域。

**Code 4\. 单一方法调用链**

```html
<dl class="accordion" id="my-accordion">
<dt>第1部分</dt>
<dd>内容一</dd>
<dt>第2部分</dt>
<dd>内容二</dd>
<dt>第3部分</dt>
<dd>内容三</dd>
<dt>第4部分</dt>
<dd>内容四</dd>
</dl>
```

&emsp;&emsp;Code 4 中定义的列表也有一个分配给它的名为 accordion 的 CSS 类。没有应用任何 CSS，这个 accordion 结构看起来类似于图 1 中的基础设计
为了美观，我们再给Code 4中的Html美化一下，并命名为“jquery.accordion.css”

**Code 5\. CSS部分**

```css
.accordion {
width: 500px;
border: 1px solid #ccc;
border-bottom: none;
font-family: Arial, Helvetica, sans-serif;
font-size: 12px;
}
.accordion dt,
.accordion dd {
border-bottom: 1px solid #ccc;
margin: 0px;
}
.accordion dt {
background: #eaeaea;
cursor: pointer;
padding: 8px 4px;
font-size: 13px;
font-weight: bold;
}
.accordion dd {
padding: 12px 8px;
}
```

效果如下图：

[![11](http://www.npm8.com/wp-content/uploads/2015/07/115.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/115.jpg)

### **自定义插件**

&emsp;&emsp;要制作一个功能性accordion，必须将自定义代码应用到您上一小节创建 jQuery 插件的函数。accordion 插件从遍历所有已定义的 accordion 开始。要定义一个 accordion，在 HTML 文档或外部嵌入式 JavaScript 文件中使用下列 jQuery。

```javascript
$('dl#my-accordion').accordion();
```

&emsp;&emsp;对于每个 Accordion，您可以使用 jQuery 的 children 方法访问相关定义的标题，返回一个数组或 dt 元素。应用一个 click 事件到 dt 元素，然后一个名为 reset 方法应用到每个 dt。accordion 首次加载时，该 reset 方法会折叠所有 dd 元素。单击 dt 元素或者标题栏时，click 事件会触发一个名为 onClick 的自定义方法。自定义 onClick 方法用于查找 accordion 中的所有 dt 元素。它调用一个自定义 hide 方法，该方法通过使用 next 方法找到紧挨着 dt 元素的 dd 元素，隐藏每个相关的 dd 元素，通过使用 next 方法找到紧挨着 dt 元素的 dd 元素，然后向上滑动激活它。
所有 dd 元素被隐藏后，使用 slideDown 方法，就可以看见与单击过的 dt 元素相关的 dd 元素，并创建一个放大和收缩动画，如清单 8 所示。onClick 方法的最后一行代码是 return false，确保任何被点击的主题栏没有显现出其一般行为。例如，如果您使用一个 anchor 元素作为标题栏，您可能想要执行 return false，这样就不会将用户定向到另一个页面或现有页面的一部分。

**Code 6\. 自定义用于创建一个 jQuery 插件的 accordion 函数**

```javascript
(function($) {
    $.fn.accordion = function(options) {
    return this.each(function() {
    var dts = $(this).children('dt');
    dts.click(onClick);
    dts.each(reset);
    });

    function onClick() {
    $(this).siblings('dt').each(hide);
    $(this).next().slideDown('fast');
    return false;
    }

    function hide() {
    $(this).next().slideUp('fast');
    }

    function reset() {
    $(this).next().hide();
    }
    }
})(jQuery);
```

&emsp;&emsp;如果该accordion插件与一个HTML定义列表结构相关联时，比如您之前创建的那个 accordion 函数将被应用。有了 accordion 函数，单击一个标题栏或 dt 元素时，会打开其内容区域，而其他内容区域则关闭。换句话说，一次只能打开一个内容区域。

### **设定插件的默认值（Defaults）和设置项（options）**

&emsp;&emsp;jQuery 插件可以包括 defaults 和 options。Options 本质上就是传递给插件的参数。可以使用 options 发送一个参数作为 object literal，这是一个标准 jQuery 实践，而不需要传递多个参数。如果您的插件支持 options，使用 defaults 对象设置默认的 options 将是一个最佳方式。和 options 一样，defaults 是一个 object literal，应该包括您想要传递到插件中的属性。
例如，如果您支持一个可用于在首次加载时打开 accordion 第一个内容区域的属性，那么在您的插件中应该包括一个 open 属性的默认值。在您的插件中使用 defaults 确定默认函数，使用 options 覆盖默认值。如果插件接收 options，可以使用 $.extend 方法执行覆盖。jQuery 的 $.extend 方法合并两个或多个对象。Code 7 中的示例显示在一个自定义 jQuery 插件中使用 $.extend 方法合并用户定义选项和默认选项的一般实现。

**Code 7\. 向一个自定义的 accordion jQuery 插件添加 options 和 defaults**

```javascript
(function($) {
$.fn.accordion = function(options) {
var settings = $.extend({}, {open: false}, options);
return this.each(function() {
var dts = $(this).children('dt');
dts.click(onClick);
dts.each(reset);
if(settings.open) $(this).children('dt:first-child').next().show();
});

function onClick() {
$(this).siblings('dt').each(hide);
$(this).next().slideDown('fast');
return false;
}

function hide() {
$(this).next().slideUp('fast');
}

function reset() {
$(this).next().hide();
}
}
})(jQuery);
```

&emsp;&emsp;$.extend 方法参数是一个目标对象和 2 个或多个合并对象。在本示例中，目标对象是一个空 object literal，充当合并对象容器。目标将成为一个包含合并对象值的单一对象（在该案例中是 settings 变量）。第 2 个参数是一个包含默认插件属性的 object literal。第 3 个参数是用户定义的 options 参数。要在一个 HTML 元素上使用 accordion 插件传递 options，需要知道除了之前您作为 object literal 传递的属性外还有哪些属性，如下所示。

```javascript
$('dl#my-accordion').accordion({open:true});
```

&emsp;&emsp;在Code 7 示例中，传递到插件的 options 通过 $.extend 方法覆盖 defaults。如果没有传递 options，则使用默认值。对于示例插件，可使用 open 属性确定加载时是否打开第一个内容区域。

### **可重用性**

&emsp;&emsp;您可以在任何 HTML 文档中重用示例 accordion 插件，可以在单个 HTML 文档中多次使用。您也可以包括多个 accordion 结构，就像已创建的那个 accordion，使用刚创建的新 accordion 插件通过 jQuery 将每个单独定义为 accordion。要向一个 HTML 文档添加多个 accordion，只需要添加尽可能多的 accordion 结构。Code 8 中的代码包括两个 accordion 结构，由一个段落隔开。

**Code 8\. 在同一个 HTML 文档中使用多个 accordion**

```html
<dl class="accordion" id="my-accordion">
<dt>第1部分</dt>
<dd>内容一</dd>
<dt>第2部分</dt>
<dd>内容二</dd>
<dt>第3部分</dt>
<dd>内容三</dd>
<dt>第4部分</dt>
<dd>内容四</dd>
</dl>

<dl class="accordion" id="my-accordion">
<dt>第5部分</dt>
<dd>内容五d>
<dt>第6部分</dt>
<dd>内容六dd>
<dt>第7部分</dt>
<dd>内容七/dd>
</dl>
```

&emsp;&emsp;Code 8 中的两个 accordion 结构几乎一样，除了内容不一样外，更重要的是 ID 值也不一样。第一个结构包含一个 my-accordion ID 值。第 2 个结构包含一个 my-accordion2 ID 值。现在可以单独定向这些结构。例如，下列 jQuery 脚本使用已创建的新插件将每个 accordion 结构定义为一个 accordion。

```javascript
$('dl#my-accordion').accordion({open:true});
$('dl#my-accordion2').accordion({open:true});
```

&emsp;&emsp;两个 accordion 结构定义完成后，第一个面板默认设置为打开下图 显示一个用在同一个 HTML 文档的多个 accordion 插件的示例。

[![2](http://www.npm8.com/wp-content/uploads/2015/07/27.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/27.jpg)

演示地址：[http://demo.grycheng.com/case/custormJq/](http://demo.grycheng.com/case/custormJq/)

下载地址：[custormJq.zip](http://www.npm8.com/wp-content/uploads/2015/07/custormJq.zip)
