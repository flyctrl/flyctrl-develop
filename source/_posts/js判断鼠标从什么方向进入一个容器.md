---
title: JS判断鼠标从什么方向进入一个容器
tags:
  - JS判断鼠标方向
id: 1046
categories:
  - JS/Jq
date: 2015-07-31 13:24:09
---

基于jquery：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset=”UTF-8″>
<title>判断鼠标进入方向</title>
</head>
<body>
<style>
html,body{margin:0;padding:0;}
#wrap{width:300px;height:300px;background:#33aa00;margin:50px;display:inline-block;font-size:50px;text-align:center;line-height:300px;}
</style>
<div id=”wrap”>
方向反馈
</div>
<script type=”text/javascript” src=”http://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js”></script>
<script>
$(“# wrap”).bind(“mouseenter mouseleave”,
	function(e) {
		var w = $(this).width();
		var h = $(this).height();
		var x = (e.pageX– this.offsetLeft–(w / 2)) * (w > h ? (h / w) : 1);
		var y = (e.pageY– this.offsetTop–(h / 2)) * (h > w ? (w / h) : 1);
		var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		var eventType = e.type;
		var dirName = new Array(‘上方’, ’右侧’, ’下方’, ’左侧’);
		if (e.type == ‘mouseenter’) {
			$(this).html(dirName[direction] + ’进入’);
		} else {
			$(this).html(dirName[direction] + ’离开’);
		}
	});
</script>
</body>
</html>
```

&nbsp;

上面代码是基于jquery的，原生js如下：

```javascript
var wrap = document.getElementById(‘wrap’);
var hoverDir = function(e) {
	var w = wrap.offsetWidth;
	var h = wrap.offsetHeight;
	var x = (e.clientX– wrap.offsetLeft–(w / 2)) * (w > h ? (h / w) : 1);
	var y = (e.clientY– wrap.offsetTop–(h / 2)) * (h > w ? (w / h) : 1);
	var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
	var eventType = e.type;
	var dirName = new Array(‘上方’, ’右侧’, ’下方’, ’左侧’);
	if (e.type == ‘mouseover’ || e.type == ‘mouseenter’) {
		wrap.innerHTML = dirName[direction] + ’进入 ';
	} else {
		wrap.innerHTML = dirName[direction] + ’离开 ';
	}
}
if (window.addEventListener) {
	wrap.addEventListener(‘mouseover’, hoverDir, false);
	wrap.addEventListener(‘mouseout’, hoverDir, false);
} else if (window.attachEvent) {
	wrap.attachEvent(‘onmouseenter’, hoverDir);
	wrap.attachEvent(‘onmouseleave’, hoverDir);
}
```
&nbsp;