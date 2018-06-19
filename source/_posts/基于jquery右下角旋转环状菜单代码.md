---
title: 基于jQuery右下角旋转环状菜单代码
tags:
  - js旋转环状菜单
  - 旋转环状菜单代码
id: 1590
categories:
  - 插件库
date: 2015-09-10 12:42:22
---

&emsp;&emsp;基于jQuery右下角旋转环状菜单代码。这是一款固定在页面的右下角位置，当用户点击了主菜单按钮后，子菜单项会以环状旋转进入页面，并使用animate.css来制作动画效果。效果图如下：

![201508060847551131](http://www.npm8.com/wp-content/uploads/2015/09/201508060847551131.jpg)

实现的代码。

html代码：
```html
<div class="htmleaf-container">
	<div id='ss_menu'>
	  <div>
		<i class="fa fa-qq"></i>
	  </div>
	  <div>
		<i class="fa fa-weibo"></i>
	  </div>
	  <div>
		<i class="fa fa-weixin"></i>
	  </div>
	  <div>
		<i class="fa fa-renren"></i>
	  </div>
	  <div class='menu'>
		<div class='share' id='ss_toggle' data-rot='180'>
		  <div class='circle'></div>
		  <div class='bar'></div>
		</div>
	  </div>
	</div>
</div>
```

js代码：
```javascript
$(document).ready(function (ev) {
	var toggle = $('#ss_toggle');
	var menu = $('#ss_menu');
	var rot;
	$('#ss_toggle').on('click', function (ev) {
		rot = parseInt($(this).data('rot')) - 180;
		menu.css('transform', 'rotate(' + rot + 'deg)');
		menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
		if (rot / 180 % 2 == 0) {
			toggle.parent().addClass('ss_active');
			toggle.addClass('close');
		} else {
			toggle.parent().removeClass('ss_active');
			toggle.removeClass('close');
		}
		$(this).data('rot', rot);
	});
	menu.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
		if (rot / 180 % 2 == 0) {
			$('#ss_menu div i').addClass('ss_animate');
		} else {
			$('#ss_menu div i').removeClass('ss_animate');
		}
	});
});
```

[查看演示](http://demo.grycheng.com/case/css3ShareBtn/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/09/css3ShareBtn.zip)
&nbsp;