---
title: 详解强大的jquery评分插件jquery.raty
tags:
  - jquery.raty
  - jquery.raty使用方法
  - jquery.raty参数
  - 评分插件
id: 744
categories:
  - 插件库
date: 2015-07-23 15:01:48
---

&emsp;&emsp;这是一款功能强大的**jquery评分插件****jquery**.raty，可灵活设置33个参数，可以显示数值和自定义字符串数组，比以往分享的**星级评分**插件功能强多了，使用也比较简单，最简单的使用初始化**jquery**代码就一行$(”#star“).raty();，具体的大家自己下载下来慢慢看吧。。。

&emsp;&emsp;使用方法很简单，首先下载raty的源代码（依赖于jquery），然后在页面中引入相应的js文件、css文件、图片资源，在需要添加评分组件的元素上（比如span标签）添加下面的jquery代码即可：
```
javascript$(<span class="hljs-string">'span'</span>).raty();
```
以上为jQuery Raty的缺省使用方法，此外，该组件还支持丰富的传入参数和回调函数，例如：

设置jQuery Raty的初始评分：

**1、评分回调函数：**

如果需要根据后台动态设置初始评分，可以使用回调函数实现。例如使用div中的data-attribute属性：
```javascript
<div data-score="1"></div>

$('div').raty({ score: function() { return $(this).attr('data-score'); } });
```
还可以改变星星的个数：
```javascript
$('div').raty({ number: 10 });
```
**2、只读模式：**
```javascript
$('div').raty({ readOnly: true, score: 3 });
```
**3、点击事件：**
```javascript
$('div').raty({ click: function(score, evt) { alert('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt); } });
```
**4、路径：**

变更图标保存的位置，所有图标需要位于同一目录下，路径结尾的/不添加也可以
```javascript
<div data-path="assets/images"></div>

$('div').raty({ path: function() { return this.getAttribute('data-path'); } });
```
**5、取消评分：**
```javascript
$('div').raty({ cancel: true });
```
**6、全局改变设置：**

&emsp;&emsp;你可以全局更改上述提到的所有设置 $.fn.raty.defaults.OPTION = VALUE;. 该语句必须添加在插件绑定之前。
```javascript
$.fn.raty.defaults.path = assets;

$.fn.raty.defaults.cancel = true;
```
**7、参数列表：**
```javascript
cancel : false // Creates a cancel button to cancel the rating.
cancelClass : 'raty-cancel' // Name of cancel's class.
cancelHint : 'Cancel this rating!' // The cancel's button hint.
cancelOff : 'cancel-off.png' // Icon used on active cancel.
cancelOn : 'cancel-on.png' // Icon used inactive cancel.
cancelPlace : 'left' // Cancel's button position.
click : undefined // Callback executed on rating click.
half : false // Enables half star selection.
halfShow : true // Enables half star display.
hints : ['bad', 'poor', 'regular', 'good', 'gorgeous'] // Hints used on each star.
iconRange : undefined // Object list with position and icon on and off to do a mixed icons.
mouseout : undefined // Callback executed on mouseout.
mouseover : undefined // Callback executed on mouseover.
noRatedMsg : 'Not rated yet!' // Hint for no rated elements when it's readOnly.
number : 5 // Number of stars that will be presented.
numberMax : 20 // Max of star the option number can creates.
path : undefined // A global locate where the icon will be looked.
precision : false // Enables the selection of a precision score.
readOnly : false // Turns the rating read-only.
round : { down: .25, full: .6, up: .76 } // Included values attributes to do the score round math.
score : undefined // Initial rating.
scoreName : 'score' // Name of the hidden field that holds the score value.
single : false // Enables just a single star selection.
space : true // Puts space between the icons.
starHalf : 'star-half.png' // The name of the half star image.
starOff : 'star-off.png' // Name of the star image off.
starOn : 'star-on.png' // Name of the star image on.
target : undefined // Element selector where the score will be displayed.
targetFormat: '{score}' // Template to interpolate the score in.
targetKeep : false // If the last rating value will be keeped after mouseout.
targetScore : undefined // Element selector where the score will be filled, instead of creating a new hidden field (scoreName option).
targetText : '' // Default text setted on target.
targetType : 'hint' // Option to choose if target will receive hint o 'score' type.
starType : 'img' // Element used to represent a star.
```
**8、回调函数列表：**

```javascript
$('div').raty('score'); // Get the current score.

$('div').raty('score', number); // Set the score.

$('div').raty('click', number); // Click on some star.

$('div').raty('readOnly', boolean); // Change the read-only state.

$('div').raty('cancel', boolean); // Cancel the rating. The last param force the click callback.

$('div').raty('reload'); // Reload the rating with the current configuration.

$('div').raty('set', { option: value }); // Reset the rating with new configurations.

$('div').raty('destroy'); // Destroy the bind and give you the raw element.

$('div').raty('move', number); // Move the mouse to the given score point position.
```

[Demo演示](http://demo.grycheng.com/case/jquery.raty/demo.html)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/07/jquery.raty_.zip)
