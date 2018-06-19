---
title: 响应式全屏无缝切换幻灯片DivasSlider
tags:
  - DivasSlider
id: 1168
categories:
  - 插件库
date: 2015-08-06 14:16:08
---

插件描述：Divas

&emsp;&emsp;Slider是一个多才多艺的jQuery滑块,容易使用和完全可定制。 充分响应和触摸启用。

1.引入样式表
```html
<link rel="stylesheet" type="text/css" media="screen" href="css/CSSreset.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/divas_instructions_style.css" />
<link id="skin" rel="stylesheet" type="text/css" media="screen" href="css/divas_free_skin.css" />
```
2.引入js
```javascript
<script type="text/javascript" src="js/jquery.divas-1.0.min.js"></script>
<script type="text/javascript">
	$(document).ready(function()
	{
		$("#slider").divas({
			slideTransitionClass: "divas-slide-transition-left",
			titleTransitionClass: "divas-title-transition-left",
			titleTransitionParameter: "left",
			titleTransitionStartValue: "-999px",
			titleTransitionStopValue: "0px",
			wingsOverlayColor: "rgba(0,0,0,0.6)"  //设置两侧遮罩层透明度
		});
	});
</script>
```
3.html部分
```html
<section id="slider_wrapper">
	<div id="slider" class="divas-slider">
		<ul class="divas-slide-container">
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img1.jpg" data-title="<h1>Divas Slider</h1><p>Title is visible only if you use the attribute 'data-title' of your image</p>"/></li>
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img2.jpg" data-title="<h1>Divas Slider</h1><p>Gives you the full freedom of clickable images</p>" /></li>
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img4.jpg" data-title="<h1>Divas Slider</h1><p>Images use lazy loading via deferred object</p>"/></li>
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img3.jpg" data-title="<h1>Divas Slider</h1><p>You can style it as you wish via CSS</p>"/></li>
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img5.jpg" data-title="<h1>Divas Slider</h1><p>Uses CSS3 transitions or jQuery.animate() as a fallback</p>" /></li>
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img6.jpg" data-title="<h1>Divas Slider</h1><p>You can set up almost any slider style your desire</p>" /></li>
           <li class="divas-slide"><img src="images/placeholder.gif" alt="" data-src="images/slider/img7.jpg" data-title="<h1>Divas Slider</h1><p>Gives you extensive documentation and friendly support</p>" /></li>
	    </ul>
	    <div class="divas-navigation">
	        <span class="divas-prev">&amp;nbsp;</span>
	        <span class="divas-next">&amp;nbsp;</span>
	    </div>
        <div class="divas-controls">
        	<span class="divas-start"><i class="fa fa-play"></i></span>
	        <span class="divas-stop"><i class="fa fa-pause"></i></span>
        </div>
	</div>
</section>
```
[![divas-slider](http://www.npm8.com/wp-content/uploads/2015/08/divas-slider-650x303.jpg)](http://www.npm8.com/wp-content/uploads/2015/08/divas-slider.jpg)

[查看演示](http://demo.grycheng.com/case/divas_free/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/08/divas_free.zip)

&nbsp;