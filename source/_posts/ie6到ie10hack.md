---
title: IE6到IE10hack
tags:
  - IE6到IE10hack
id: 651
categories:
  - 前端兼容
date: 2015-07-18 17:42:15
---

作为一个前端开发攻城湿，说实在的最痛苦的就是面对IE的各种兼容性，坑爹的，蛋疼的各个版本的IE不同版本差异并不小。其实网上有太多的人转载了各式各样的方法，但是太多复制太多转载，太多未经测试就发布出来的东西，很多初学者在使用的时候会发现并没有什么效果。其中原因可能是代码本身就有问题，另一种原因可能是使用代码不正确导致。

什么样的方法才是最简洁，最高效的解决方法呢？今天我就给大家分享一下我个人工作以来总结的一下IEhack方法。

其实兼容各个版本的方法有许多，但是我觉得相对简单的方法应该是用**ie hack **了，使用方法简洁，易维护。

好了接下来我们看测试代码：

## html代码
```<div class="div1"></div>```

## CSS代码

请注意以下代码顺序不能有错,否则效果会出错，这就是为什么有些童鞋再用网上的方法时老是没有效果的原因，可能是因为顺序不对导致的，至于为什么顺序不对会导致无效果，大家可以去百度下css优先级。

```css
div{height:500px;}
/*请注意以下代码顺序不能有错,否则效果会出错*/
.div1{
	background-color:red\0;     /* ie 8/9/10 */
	background-color:blue\9\0;  /* ie 9/10*/
	*background-color:yellow;   /* ie 7/6*/
	_background-color:gray;     /* ie 6*/
}
/*特地为IE10写的样式效果*/
.ie10 .div1{
	background:#000;
	color:#fff;
}
```
在各个浏览器下的预览效果如下，IE6/7/8我使用的是虚拟机测试的，可能大部分同学都会使用IEtester或者其他模拟工具，但是其实我还是建议大家使用虚拟机，因为这样子的环境才是真实的，有人调用很多用网上的兼容的方法时候发现没有效果，可能也是跟你用的模拟器有关联的，或许在真实环境下那些方法是有用的。

效果预览如下：

[![i](http://www.npm8.com/wp-content/uploads/2015/07/i-650x422.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/i.jpg)

IE10的兼容不能用我们平常所熟知的方法来处理了，至少我现在还没发现在样式后面加什么数字是主要针对IE10的，下面是IE10的方法，有更好的方法的同学可以留言给我，谢谢！

## 在页面上写如下代码兼容IE10

```html
<!--[if !IE]><!--><script>
if (/*@cc_on!@*/false) {
    document.documentElement.className+=' ie10';
}
</script><!--<![endif]-->
```
使用这种方法需要针对IE10写一套CSS方法，代码见上面贴出来的CSS代码，实际就是给页面添加了一个IE10的类名,这样上面针对IE10的代码就会生效了

[![i2](http://www.npm8.com/wp-content/uploads/2015/07/i2.jpg)
](http://www.npm8.com/wp-content/uploads/2015/07/i2.jpg)

其实这个方法也是一样可以针对接下来微软即将出来的IE11的，原理如上，有些同学可能已经下载了IE11了，不妨试一下上述的方法。

==题外话题：==
我发现在貌似挺多同学的公司或者很多同学都已经放弃了兼容IE7浏览器了，开发的时候都不考虑了，其实貌似现在数据上显示IE7确实没有多少用户了，但是其实我发现很多国内浏览器例如：遨游，搜狗等等浏览器使用的其实居然是IE7的内核，相当坑爹。所以在项目中兼容IE7还是需要滴。