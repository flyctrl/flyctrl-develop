---
title: jquery颜色选择器拾色器插件iColor
tags:
  - 颜色选择器拾色器 iColor
id: 1829
categories:
  - 插件库
date: 2015-10-08 11:34:48
---

![jquery颜色选择器拾色器插件iColor](http://www.npm8.com/wp-content/uploads/2015/10/67327.jpg)

#### 用法简介：


jquery颜色选择器拾色器插件iColor。

文件引用：
```javascript
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/iColor-min.js"></script>
<script type="text/javascript">
$(function() {
$('input').iColor({'x': 10, 'y': -50});
$('#lineColor').iColor(function(hx) {
console.log('自定义回调：去掉内容');
this.val('').css('background', '#' + hx);
});
$('#color').iColor(function(hx) {
console.log('自定义回调：我不修改背景色');
this.val('#' + hx)
});
$('#mycolor2').iColor();
$('[name="mousecolor"]').iColor({
'type': 'mouseover',
'open': function(e) {
var color = this.data('color');
console.log('事件类型' + e.type);
console.log(color ? '之前设置的颜色为：' + color : '之前没有设置颜色');
},
'set': function(hx) {
this.data('color', '#'+hx);
this.val('').css('background', '#' + hx);

console.log('现在设置的颜色为：' + '#'+hx);
}
});
});
</script>
```
[查看演示](http://demo.grycheng.com/case/icolor/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/10/icolor.zip)