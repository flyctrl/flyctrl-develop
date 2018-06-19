---
title: 超实用的10段 JavaScript 代码
tags:
  - 实用 JavaScript 代码
id: 2371
categories:
  - JS/Jq
date: 2016-05-23 10:55:59
---

&emsp;&emsp;JavaScript正变得越来越流行，它已经成为前端开发的第一选择，并且利用基于JavaScript语言的NodeJS，我们也可以开发出高性能的后端服务，甚至我还看到在硬件编程领域也出现了JavaScript的身影。JavaScript正在逐渐进化为一门全能的开发语言。
但用好JavaScript并不容易，你除了需要掌握它的语法并知道如何写出高质量的代码之外，还需要了解如何解决那些几乎在每个项目中都会遇到的需求场景，比如：判断日期，高亮文本，限制字符数等等，有很多第三方库可以解决这些问题，但这些库可能并非只是为解决这一个问题而创建的，这意味着你需要引入了很多无关的代码，这将使你的整个系统变得臃肿，而且也会影响到系统的性能。**我的做法是，收集和使用那些常见的JavaScript代码段，并在需要时，尽可能首先使用它们**。下面便是我收集的10段实用JavaScript代码，基于它们你还可以创造出更强大的JS插件或功能函数。

## 1\. 判断日期是否有效

&emsp;&emsp;JavaScript中自带的日期函数还是太过简单，很难满足真实项目中对不同日期格式进行解析和判断的需要。JQuery也有一些第三方库来使日期相关的处理变得简单，但有时你可能只需要一个非常简单的函数，而不想引入一个庞大的第三方库。这时，你可以使用下面这段日期校验代码，它允许你自定义日期格式并进行日期有效性的校验。
```javascript
function isValidDate(value, userFormat) {

  // Set default format if format is not provided
  userFormat = userFormat || 'mm/dd/yyyy';

  // Find custom delimiter by excluding
  // month, day and year characters
  var delimiter = /[^mdy]/.exec(userFormat)[0];

  // Create an array with month, day and year
  // so we know the format order by index
  var theFormat = userFormat.split(delimiter);

  // Create array from user date
  var theDate = value.split(delimiter);
  function isDate(date, format) {
    var m, d, y, i = 0, len = format.length, f;
    for (i; i < len; i++) { f = format[i]; if (/m/.test(f)) m = date[i]; if (/d/.test(f)) d = date[i]; if (/y/.test(f)) y = date[i]; } return ( m > 0 &amp;&amp; m < 13 &amp;&amp; y &amp;&amp; y.length === 4 &amp;&amp; d > 0 &amp;&amp;
      // Check if it's a valid day of the month
      d <= (new Date(y, m, 0)).getDate()
    );
  }
  return isDate(theDate, theFormat);
}
```
**使用方法：**
下面这个调用返回false，因为11月份没有31天
isValidDate('dd-mm-yyyy', '31/11/2012')

&nbsp;

## 2\. 获取一组元素的最大宽度或高度

下面这个函数，对于需要进行动态排版的开发人员非常有用。
```javascript
var getMaxHeight = function ($elms) {
  var maxHeight = 0;
  $elms.each(function () {
    // In some cases you may want to use outerHeight() instead
    var height = $(this).height();
    if (height > maxHeight) {
      maxHeight = height;
    }
  });
  return maxHeight;
};
```
**使用方法：**
```javascript
$(elements).height( getMaxHeight($(elements)) );
```

## 3\. 高亮文本

&emsp;&emsp;有很多JQuery的第三方库可以实现高亮文本的功能，但我更喜欢用下面这一小段JavaScript代码来实现这个功能，它非常短小，而且可以根据我的需要去进行灵活的修改，而且可以自己定义高亮的样式。下面这两个函数可以帮助你创建自己的文本高亮插件。
```javascript
function highlight(text, words, tag) {
  // Default tag if no tag is provided
  tag = tag || 'span';
  var i, len = words.length, re;
  for (i = 0; i < len; i++) {
    // Global regex to highlight all matches
    re = new RegExp(words[i], 'g');
    if (re.test(text)) {
      text = text.replace(re, '<'+ tag +' class="highlight">$&amp;');
    }
  }
  return text;
}
```
你同样会需要取消高亮的函数：
```javascript
function unhighlight(text, tag) {
  // Default tag if no tag is provided
  tag = tag || 'span';
  var re = new RegExp('(<'+ tag +'.+?>|<\/'+ tag +'>)', 'g');
  return text.replace(re, '');
}
```
**使用方法：**
```javascript
$('p').html( highlight(
    $('p').html(), // the text
    ['foo', 'bar', 'baz', 'hello world'], // list of words or phrases to highlight
    'strong' // custom tag
));
```

## 4\. 文字动效

&emsp;&emsp;有时你会希望给你的一段文字增加动效，让其中的每个字都动起来。你可以使用下面这段jQuery插件代码来达到这个效果。当然你需要结合一个CSS3 transition样式来达到更好的效果。
```javascript
$.fn.animateText = function(delay, klass) {
  var text = this.text();
  var letters = text.split('');
  return this.each(function(){
    var $this = $(this);
    $this.html(text.replace(/./g, '<span class="letter">$&amp;</span>'));
    $this.find('span.letter').each(function(i, el){
      setTimeout(function(){ $(el).addClass(klass); }, delay * i);
    });
  });
};
```
**使用方法：**
```javascript
$('p').animateText(15, 'foo');
```

## 5\. 逐个隐藏元素

&emsp;&emsp;下面这个jQuery插件可以根据你设置的步长（间隔时间）来逐个隐藏一组元素。在列表元素的重新加载中使用，可以达到很好的效果。
```javascript
$.fn.fadeAll = function (ops) {
  var o = $.extend({
    delay: 500, // delay between elements
    speed: 500, // animation speed
    ease: 'swing' // other require easing plugin
  }, ops);
  var $el = this;
  for (var i=0, d=0, l=$el.length; i<l; i++, d+=o.delay) {
    $el.eq(i).delay(d).fadeIn(o.speed, o.ease);
  }
  return $el;
}
```
**使用方法：**
```javascript
$(elements).fadeAll({ delay: 300, speed: 300 });
```

## 6\. 限制文本字数

下面这端脚本允许你根据给定的字符长度截取文本，如果文本被截取，那么它的后面会自动带上省略号。
```javascript
function excerpt(str, nwords) {
  var words = str.split(' ');
  words.splice(nwords, words.length-1);
  return words.join(' ') +
    (words.length !== str.split(' ').length ? '…' : '');
}
```

## 7\. 判断相应式布局中当前适配度

&emsp;&emsp;目前很多设计已经采用了响应式布局来适配网站或应用在不同设备上的显示。你经常需要在代码中判断当前处于哪一个屏幕适配度下。
```javascript
function isBreakPoint(bp) {
  // The breakpoints that you set in your css
  var bps = [320, 480, 768, 1024];
  var w = $(window).width();
  var min, max;
  for (var i = 0, l = bps.length; i < l; i++) {
    if (bps[i] === bp) {
        min = bps[i-1] || 0;
        max = bps[i];
        break; 
    }
  }
    return w > min && w <= max;
}
```
**使用方法：**
```javascript
if ( isBreakPoint(320) ) {
  // breakpoint at 320 or less
}
if ( isBreakPoint(480) ) {
  // breakpoint between 320 and 480
}
```

## 8\. 全局计数

在一些游戏或广告场景中，你需要记录用户在当前页面上点击某一个按钮的次数，这时你可以使用jQuery的.data()函数来处理：
```javascript
$(element)
    .data('counter', 0) // begin counter at zero
    .click(function() {
        var counter = $(this).data('counter'); // get
        $(this).data('counter', counter + 1); // set
        // do something else...
    });
```

## 9\. 嵌入优酷视频

```javascript
function embedYouku(link, ops) {
  var o = $.extend({
    width: 480,
    height: 320,
    params: ''
  }, ops);
  var id = /\?v\=(\w+)/.exec(link)[1];
  return '<embed id="embedid" src="'+id+'?'+o.ops'" type="application/x-shockwave-flash" width="'+o.width+'" height="'+o.height+'" align="middle"></embed>
```
**使用方法：**
```javascript
embedYouku(
  'http://static.youku.com/v/swf/qplayer.swf', 
  {'winType=adshow&amp;VideoIDS=XMTE3NzQ0NTky&amp;isAutoPlay=false&amp;isShowRelatedVideo=false'}
);
```

## 10\. 创建动态菜单或下拉列表

&emsp;&emsp;在很多场景中，我们都需要动态地创建菜单、下拉列表或列表项。下面是一段最基础的代码实现上面的功能，你可以根据实际需要进行相应的扩展。
```javascript
function makeMenu(items, tags) {
  tags = tags || ['ul', 'li']; // default tags
  var parent = tags[0];
  var child = tags[1];
  var item, value = '';
  for (var i = 0, l = items.length; i < l; i++) {
    item = items[i];
    // Separate item and value if value is present
    if (/:/.test(item)) {
      item = items[i].split(':')[0];
      value = items[i].split(':')[1];
    }
    // Wrap the item in tag
    items[i] = '<'+ child +' '+ (value &amp;&amp; 'value="'+value+'"') +'>'+ // add value if present
        item +'';
  }
  return '<'+ parent +'>'+ items.join('') +'';
}
```
**使用方法：**
```javascript
// Dropdown select month
makeMenu(
  ['January:JAN', 'February:FEB', 'March:MAR'], // item:value
  ['select', 'option']
);
// List of groceries
makeMenu(
  ['Carrots', 'Lettuce', 'Tomatos', 'Milk'],
  ['ol', 'li']
);
```
&nbsp;

#### 总结：

&emsp;&emsp;以上只是那些实用JavaScript代码段中的一小部分，我也建议你平时注意收集或自己编写这样的基础代码段，它们能在很多项目中使用或通过一些改造提供更完善的功能，使用这些代码段将为你节省下大量的开发时间。