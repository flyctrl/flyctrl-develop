---
title: 玩转HTML5移动页面(优化篇)
tags:
  - html5移动页面
id: 472
categories:
  - 移动前端
date: 2015-07-15 14:11:25
---

[![1](http://www.npm8.com/wp-content/uploads/2015/07/114.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/114.jpg)

&emsp;&emsp;承接上文《[玩转HTML5移动页面（动效篇）]，上次说的是让页面动起来的一些小技巧。
而页面动起来的根基是功能可用的页面，因此有必要分享一些优化细节的技巧和方向，熟悉掌握一些方法论还是会对页面开发大大提高效率的，并且也能防止疏忽缺漏。

====前方高能====

（1） 动画雪碧图

&emsp;&emsp;涉及的动画十分多，用的元素也十分多，请务必使用雪碧图（Sprite）！

&emsp;&emsp;网上的工具有一些可以帮助你生成雪碧图的工具，例如[CssGaga](http://www.99css.com/tag/cssgaga/ "CssGAGA")，[GoPng](http://isux.tencent.com/alloyteam.github.io/gopng "goPng")等等，自动化构建工具Grunt和Gulp也提供了相应插件。

&emsp;&emsp;特别地，如果单张雪碧图面积实在太大，可以拆分雪碧图，例如拆分成2-4张，因为现代浏览器都支持4-6个同源请求下载，若资源实在太多，也可以考虑把静态资源放在不同源域名下去请求，这里牺牲多几个请求换来图片同时加载比一张图片慢慢加载要好，当然，这需要具体情况去衡量。

&emsp;&emsp;顺便提一下，我写动画的一个小技巧是把每一页的动画分在一个import.css里面，然后最后在主样式中import进去，这样方便调试动画，也容易维护，例如：
```css
//style.css
@import url("reset.import.css");
@import url("loading.import.css");
@import url("m-animate-1.import.css");
@import url("m-animate-2.import.css");
@import url("m-animate-3.import.css");
```
&emsp;&emsp;当然，import不是原生支持的，这里需要一些流程化工具让import的页面在输出之前经过组装-压缩的步骤。

（2）图片压缩

&emsp;&emsp;图片压缩是老生常谈，但是仍然有不少人忘记压缩，那可是活生生的带宽和流量的浪费啊…
压缩图片需要有好工具，有[智图](http://zhitu.tencent.com/ "智图")，[TinyPNG](https://tinypng.com/ "Tinypng")，[JPEGmini](http://www.jpegmini.com/ "JPEGmini")等等。
依靠工具外，还有以下方式可以优化图片：
* 1.尽量避免用PNG24。如果图片色彩要求不高，请使用PNG8；
* 2.使用新格式，WEBP和BPG等新格式的到来，在不用考虑兼容的情况下请大胆尝试；
* 3.用SVG和ICONFONT代替简单的图标；
* 4.用FUFU的[字蛛](http://isux.tencent.com/font-spider.html "字蛛")来代替艺术字体切图。

（3）多终端兼容

&emsp;&emsp;多终端兼容是一切的根基，要知道有人拿着肾6+，有人拿着肾4，大则414×736，小则320×416（IPHONE4在SAFARI保留上下端导航），因此多终端兼容是十分必要的。

&emsp;&emsp;曾经有一种派系为320派系，就是大部分页面都是320宽度，因此干脆直接用320的容器来包一切页面，那样也简单，然而IPHOEN6和IPHONE6+的出现简直是灭了这个派系。

**那么到底要如何兼容呢？**

这里我分了三个时期来说说：

**A.设计初期**

&emsp;&emsp;先审视设计稿，因为320派系的原因，大部分设计稿只考虑到IPHONE5来设计，因此很多背景元素是只有320px宽度（页面实际渲染宽度），例如下图。

[![2](http://www.npm8.com/wp-content/uploads/2015/07/26.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/26.jpg)

&emsp;&emsp;那么，这时候就需要设计提供一个较长的延伸背景了，最好是可以重复的，用background-repeat可以减少图片大小。

**B.设计中期**

也就是具体的兼容方法，可以使用CSS3 Media Query和类覆盖。

1.CSS3 Media Query，按范围兼容机型。
```css
/*iphone6*/
@media only screen
and (min-device-width : 375px)
and (max-device-width : 667px)
and (orientation : portrait)
and (-webkit-min-device-pixel-ratio : 2)
{
.page6 .ele-building{top: 69px;}
.page6 .ele-runner{top: 100px;}
.page6 .ele-pophome{top: 16px;}
}
```
2.类覆盖，这种方式适合直接为小屏或大屏做整体兼容。

首先，为小屏（大屏）加一个识别类，这里小于420表示为小屏幕（IPHONE4有上下导航栏）：
```javascript
var bh = $(window).height();
// 480 - 64 = 416 iphone4
if(bh&amp;lt;420){
$('body').addClass('low-screen');
}
```
然后，对应识别类加上要变动的元素覆盖，例如：
```css
.page6 .ele-bg{top: 10px;}
.low-screen .page6 .ele-bg{top: 0px;}
```

**C.设计后期**

&emsp;&emsp;这是最后一步，整体检查和体验，这里面会暴露一些问题，例如元素在IPHONE6P显得小了或者元素在IPHONE4挤不下了，可以来最后大招解决：

1.大屏适当用zoom:(倍率)或者transform:scale(倍率)来增大元素，实测失真根本看不出来，设计师也满意（毕竟不用多做一张图！）；

2.小屏适当去掉一些元素，例如一些翻页提示，一些多余图标，可以让优雅降级，把它们 display:none掉。

有以上几步，基本就能兼容大部分机器了。兼容一直是个苦活，但是这是前端必修课，多练就会发觉其实也没有那么难嘛。

（4）交互提示

&emsp;&emsp;前面说了，加了音效就要加上音乐切换开关的按钮，不然会被用户骂死。还有其他，例如如果你的页面不能兼容横屏，请监听横屏状态，然后加上适当的横屏提示。

例如：
```javascript
// 横屏监听
var updateOrientation = function(){
if(window.orientation=='-90' || window.orientation=='90'){
$('.landscape-wrap').removeClass('hide');
console.log('为了更好的体验，请将手机/平板竖过来！');
}else{
$('.landscape-wrap').addClass('hide');
console.log('竖屏状态');
}
};
window.onorientationchange = updateOrientation;
```
提示越多，界面越友好，有时候设计师会漏掉一些可能出现的页面情况。
**作为有态度的前端，请好好把关，让用户有好的体验**。

（5）分享接口
H5做好了，要传播分享才能展示你的牛逼轰轰。
然而分享其实是个坑，分享到微信、手Q等都有各种问题。

**A.微信**
旧微信会使用WeixinJSBridge来声明分享的缩略图、标题、正文等，比较方便。例如：

[![c1](http://www.npm8.com/wp-content/uploads/2015/07/c11.png)](http://www.npm8.com/wp-content/uploads/2015/07/c11.png)

而最新的微信提供了新的微信SDK，需要在公众账号绑定所属域名之后调用SDK作分享，可以说分享功能会更加强大，坑也会更加少。

**B.手Q**
手Q支持声明meta标签的的分享方式，例如：

[![c2](http://www.npm8.com/wp-content/uploads/2015/07/c21.png)](http://www.npm8.com/wp-content/uploads/2015/07/c21.png)

而若在qq.com域名下也支持api的定义方式。

**C.一般化分享**
在默认兼容旧版微信、手Q或者各种浏览器，平台，可以用这样的方法：
写h1做标题，p做内容，img做缩略图，只需要把h1隐藏掉就好，这里的缩略图最好要大于200x200px。

例如：

[![c3](http://www.npm8.com/wp-content/uploads/2015/07/c31.png)](http://www.npm8.com/wp-content/uploads/2015/07/c31.png)

当然，这样也有利于搜索引擎拉取信息。

&emsp;&emsp;分享的坑还有更多，例如不同浏览器例如QQ浏览器、Chrome也会有自己的默认拉取方式（部分截图作缩略图），需要多加测试优化。

（5）SEO搜索引擎优化
SEO（搜索引擎优化）的基本做法是把页面结构写好，这包括：

1.**定义精确的网页标题**

&emsp;&emsp;你的标题应该有概括性，能明确告知搜索引擎和用户你的网站大概内容和目的，可以是**当前页面标题-所属类型-产品名**，例如“全民来猜歌-年费黄钻-QQ空间”。

2.**针对页面内容补充description和keywords的meta标签**

&emsp;&emsp;你需要简短总结页面的主要目标，然后补充description，以及根据关键词补充keywords。

3.**优化你的超链接和图片**

&emsp;&emsp;包括优化超链接显示的文本，要具有语义性也要跟超链接的网页具有相关性，例如“空间主页”就不要链接到“www.qq.com”。同时，要补充”title”和”alt”属性，例如```“<img src=’images/apple.jpg’ title=’苹果示例图’ alt=’苹果示例图’ />”```。

4.**建立良好的网站导航和sitemap**

&emsp;&emsp;网站需要有一个良好的导航，控制根目录和各子目录的关键，通过sitemap可以帮助网站主了解网站结构，也方便搜索引擎收录整个站点。

5.**优化目录结构和URL**

&emsp;&emsp;你的URL应该有语义性，简短易懂，例如http://www.apple.com/macbook-air/，而且每一层级都要有它对应的页面展示以及语义。

6.**善用h1-h6的标题结构树**

&emsp;&emsp;合理的标题可以强调文字，也能让搜索引擎更加了解到各标题的重要性，因此建立良好的标题树十分有意义。

7.**不断致力于提供优质的内容**

&emsp;&emsp;社交化分享是网站曝光最快的因素，因此不断提供了优质原创内容才能真正提高你的网站曝光权重。


（6）无障碍

&emsp;&emsp;无障碍的普及是一件好事，这让互联网真正地为所有人可用。因此我们也应该为之而努力，无障碍的根基是你页面强壮的语义性和结构性，具体可以参考《[腾讯网无障碍说明](http://www.qq.com/demo/accessibility.htm "腾讯网无障碍说明")》了解无障碍的优化手段。