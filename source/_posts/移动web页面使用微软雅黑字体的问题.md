---
title: 移动web页面使用微软雅黑字体的问题
tags:
  - 移动端 微软雅黑
id: 1512
categories:
  - 移动前端
date: 2015-09-06 17:58:48
---

&emsp;&emsp;很多前端工程师在开发手机页面的时候，发现视觉设计师们喜欢用微软雅黑作为中文字体进行设计，于是写页面的时候也定义 font-family 为微软雅黑，后来发到线上后，细心的产品经理发现页面的字体不是微软雅黑，要求马上修改，于是就惊呆了，还跟产品争执一番。实际上手机系统 ios、android 等是不支持微软雅黑字体，为了满足产品的需要，保证视觉稿的还原度，手机端是如何定义微软雅黑字体呢？

&emsp;&emsp;相信大家会想到 @font-face 定义为微软雅黑字体并存放到 web 服务器上，在需要使用时被自动下载
```css
@font-face {
font-family: 'MicrosoftYaHei';
src: url('MicrosoftYaHei.eot'); /* IE9 Compat Modes */
src: url('MicrosoftYaHei.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
url('MicrosoftYaHei.woff') format('woff'), /* Modern Browsers */
url('MicrosoftYaHei.ttf') format('truetype'), /* Safari, Android, iOS */
url('MicrosoftYaHei.svg#MicrosoftYaHei') format('svg'); /* Legacy iOS */
}
```
&emsp;&emsp;雅黑字体问题虽然解决了，但也带来了影响，一来消耗用户的流量，二来对页面的打开速度造成了延迟。

&emsp;&emsp;总感觉不好，为了说服产品经理，找了三大手机系统的字体资料：

**ios 系统**

*   默认中文字体是[Heiti SC](http://stackoverflow.com/questions/9918421/what-is-the-default-font-in-chinese-enviroment)
*   默认英文字体是[Helvetica](http://stackoverflow.com/questions/3838336/iphone-system-font)
*   默认数字字体是HelveticaNeue
*   无微软雅黑字体
**android 系统**

*   默认中文字体是Droidsansfallback
*   默认英文和数字字体是Droid Sans
*   无微软雅黑字体
**winphone 系统**

*   默认中文字体是Dengxian(方正等线体)
*   默认英文和数字字体是Segoe
*   无微软雅黑字体
[附：ios7字体列表](http://support.apple.com/kb/HT5878?viewlocale=zh_CN&amp;locale=en_US)

&emsp;&emsp;并做了个小测试，下图为测试机 iphone 4s、三星 GT-N7000 android 2.3.6、HTC windows Phone 8.0 三种手机中的默认中文字体和英文字体展现：

[![1](http://www.npm8.com/wp-content/uploads/2015/09/1-650x187.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/1.jpg)

&emsp;&emsp;我们可以看出三种不同的中文字体和微软雅黑一样是无衬线字体，有无衬线只是一个小原因，而无论页面中使用哪种字体，肉眼很难看出它们的差异，对产品的体验几乎没有影响。

&emsp;&emsp;有关衬线字体和无衬线字体的差别，参考下图：

![2](http://www.npm8.com/wp-content/uploads/2015/09/2.jpg)

&emsp;&emsp;那么，**使用系统默认的字体所达到的视觉效果跟使用微软雅黑字体没有明显的差别**，权衡利弊，最终说服了产品经理放弃使用微软雅黑的想法。

### 结论

*   各个手机系统有自己的默认字体，且都不支持微软雅黑
*   如无特殊需求，手机端无需定义中文字体，使用系统默认
*   英文字体和数字字体可使用 Helvetica ，三种系统都支持
代码：
```css
/* 移动端定义字体的代码 */
body{font-family:Helvetica;}
```
&nbsp;