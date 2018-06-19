---
title: jQuery轻量级的书本和杂志翻页效果插件Turn.js
tags:
  - turn.js
  - 书本和杂志翻页效果
id: 962
categories:
  - 插件库
date: 2015-07-25 21:38:25
---

<效果很炫的jQuery轻量级的书本和杂志翻页效果插件Turn.js，支持移动触摸屏设备，采用硬件加速看起来更自然平滑，带有强大的选项配置功能以及两种切换效果，支持Ajax数据加载，浏览器支持：Safari 5、Chrome 16、Firefox 10、IE 10, 9, 8，基于jQuery 1.7及以上，还是很不错的，值得使用[![1-14031Q01ZA56](http://www.npm8.com/wp-content/uploads/2015/07/1-14031Q01ZA56.png)](http://www.npm8.com/wp-content/uploads/2015/07/1-14031Q01ZA56.png)

使用方法：
1.加载jQuer和插件

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="js/turn.min.js"></script>
<style type="text/css">
body{
	background:#ccc;
}
#magazine{
	width:1152px;
	height:752px;
}
#magazine .turn-page{
	background-color:#ccc;
	background-size:100% 100%;
}
</style>
```
2.HTML内容
```html
<div id="magazine">
<div style="background-image:url(pages/01.jpg);"></div>
<div style="background-image:url(pages/02.jpg);"></div>
<div style="background-image:url(pages/03.jpg);"></div>
<div style="background-image:url(pages/04.jpg);"></div>
<div style="background-image:url(pages/05.jpg);"></div>
<div style="background-image:url(pages/06.jpg);"></div>
</div>
```
3.函数调用
```javascript
<script type="text/javascript">
	$(window).ready(function() {
		$('#magazine').turn({
			display: 'double',
			acceleration: true,
			gradients: !$.isTouch,
			elevation:50,
			when: {
				turned: function(e, page) {
				/*console.log('Current view: ', $(this).turn('view'));*/
				}
			}
		});
	});

	$(window).bind('keydown', function(e){

		if (e.keyCode==37)
			$('#magazine').turn('previous');
		else if (e.keyCode==39)
			$('#magazine').turn('next');

	});

</script>
```

[查看演示](http://www.turnjs.com/#samples/steve-jobs)

[官方下载](https://github.com/blasten/turn.js) 

[官方网站](http://www.turnjs.com/#home)