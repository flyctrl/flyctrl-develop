---
title: 用rem做响应式开发
tags:
  - rem响应式
id: 809
categories:
  - 移动前端
date: 2015-07-24 12:37:29
---

&emsp;&emsp;一般移动端项目最大的宽度限制是640px,最小限制是320px,大家可以改变浏览器的分辨率或者通过手机访问看看效果。基本上在不同分辨率下都是差不多的展示效果，而且在手机移动终端下都是100%的撑开。这种响应式的效果，我想应该是最符合现在移动终端多样化的需求的，如果只是做几个特别适应的尺寸，例如320、480、340、600这种特定的尺寸，那真是要累死前端开发的同学了。但是如果用rem来实现就可以不用考虑上诉的问题也可以达到自适应了。

&emsp;&emsp;这个效果对设计师的要求也是非常严格的，例如你需要指定一个规范的宽度进行设计，我们的设计师是按照640的宽度去设计的，实际设计图的宽度是640*2这样做的目的是为了在移动端能高清显示。小图标是采用CSS3的图标字体，不得不说这是个非常好的东西。

### 设置对应的响应式的html rem比例

&emsp;&emsp;我们平常在使用长度单位都会使用px，但是在做上面的响应式的时候，需要用rem或者百分比的单位，大家可以看我的Demo代码。在上篇文章介绍了rem的字体设置计算方法：
```css
html{
    font-size:62.5%; /* 10÷16=62.5% */
}
body{
    font-size:12px;
    font-size:1.2rem ; /* 12÷10=1.2 */
}
p{
    font-size:14px;
    font-size:1.4rem;
}
```
&emsp;&emsp;通过设置html的font-size值来控制全局的rem输出，这段代码其实是这个rem的精髓所在，我在我的页面中设置了如下的代码来控制不同设备下的字体大小显示使其达到自适应：
```css
html {
	font-size: 62.5%;
}
@media only screen and (min-width: 481px){
	html {
		font-size: 94%!important;
	}
}
@media only screen and (min-width: 561px){
	html {
		font-size: 109%!important;
	}

}
@media only screen and (min-width: 641px){
	html {
		font-size: 125%!important;
	}
}
```
看上面的代码，可能大家会觉得为什么要这样设置呢，其实这个是根据许多测试推算出来的，上面代码如果要转换城px会变成这样：
```css
html {
	font-size: 62.5%; /* 10÷16=62.5% */
}
@media only screen and (min-width: 481px){
	html {
		font-size: 94%!important; /* 15.04÷16=94% */
	}
}
@media only screen and (min-width: 561px){
	html {
		font-size: 109%!important; /* 17.44÷16=109% */
	}

}
@media only screen and (min-width: 641px){
	html {
		font-size: 125%!important; /* 20÷16=125% */
	}
}
```

### 给margin padding 设置rem

&emsp;&emsp;上面展示的是怎么通过计算获取到不同分辨率下的html font-site百分比的值。实际开发如果设计师是按照640的宽度去设计的，我们就按照最大的640去切图，切图的时候如果我们要设置margin怎么banner，设计图的值加入是10px的间距，我们通过640的比例去计算：
```css
margin-top:.5rem; /*10 ÷ 20 = 0.5*/
padding-top:1rem /* 20 ÷ 20 =1 */
```
上面分别是设计图上的间距10px和20px计算成rem的方法，大家可以以此类推，如果你的设计图是640设计的就可以用上面的方法，反正每次以最大的值来计算就可以了。

### 给height width 设置rem

&emsp;&emsp;实际开发中大家最常设置的估计就是height width值了，为了做到各个设备下长度自己相应，许多开发人员会用百分比来做，这个是没有问题，但是其实很多场景下用rem比百分比更加灵活，在我实际开发中，一般我只在大块的div布局里面用百分比，元素的设置一般都用rem来。例如：
```css
height:100px; /* 100 ÷ 20 = 5rem;*/
width:50px; /* 50 ÷ 20 = 2.5rem;*/
```

### 给border 设置rem

&emsp;&emsp;其实就连border我们也可以用rem来做，但是貌似现在的安卓手机对border用rem单位有一小部分不支持，在我开发测试发现了，高版本的安卓浏览器支持，但是低版本的有许多都不支持，具体要不要使用就看你们自己的情况。
```cssb
order:.2rem solid #cccccc;
```
**总结**

&emsp;&emsp;rem的使用其实我可能是只是总结了大家比较常用的一些属性，其实他的范围肯定不止是这么多，实际的项目开发中我相信大家在使用他的过程会发现许多惊喜的，非常希望大家留言讨论这一章的内容。有什么问题我会第一时间反馈。

**强烈推荐这篇文章**[**《**详解移动端rem变革**》**]