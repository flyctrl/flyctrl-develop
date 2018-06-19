---
title: 网站性能工具Yslow的使用方法
tags:
  - Yslow使用
  - 前端性能
id: 156
categories:
  - 前端杂货
date: 2015-07-12 21:21:18
---


&emsp;&emsp;Yslow是雅虎开发的基于网页性能分析浏览器插件，从年初我使用了YSlow后，改变了博客模板大量冗余代码，不仅提升了网页的打开速度，这款插件还帮助我分析了不少其他网站的代码，之前我还特意写了提高网站速度的秘籍，就是通过这款插件分析得出的。网络上已经有不少Yslow使用说明了，本文我想介绍下我使用Yslow的方法和一些别人没提到的小技巧。

Yslow的安装方法

&emsp;&emsp;现在Yslow已经有很多版本了，本文介绍的是3.0.4最新版，打开Yslow官网就能看到有四个版本可供选择：火狐（firefox）浏览器、谷歌（chrome）浏览器、欧朋（opera）浏览器和移动版。

安装Yslow要先安装

Firebug（本地址以火狐为例），两种方法启动Yslow：

1、打开Firebug窗口，选择Yslow选项。

2、直接点击火狐右下角的Yslow启动按钮。Yslow的启动界面

[![1](http://www.npm8.com/wp-content/uploads/2015/07/1.gif)](http://www.npm8.com/wp-content/uploads/2015/07/1.gif)


&emsp;&emsp;点 击 Run Test 运行Yslow，也可以点击 Grade, Components, 或Statistics选项开始对页面的分析，如果在 Autorun YSlow each time a web page is loaded 上打上对勾，它将自动对以后打开页面进行分。

注意图中的红框，这里是规则集，YSlow

（V2）包含了所有22个测试的规则，YSlow

（V1）包含原始13规则，小网站或博客-这个规则集包含14个规则，适用于小型网站或博客，建议对号入座

&emsp;&emsp;雅虎评估网站性能的23条军规
雅虎曾经针对网站速度提出了非常著名34条准则：《Best Practices for Speeding Up Your Web Site》。而现在将34条精简为更加直观的23条，并针对每一条给出从F~A的评分以及最终的总分,而现在23条网站性能优化建议在YSlow的官网首页就能看到，当然也可以不看，在使用Yslow后，在控制面板里就会给你评分提示，和改进建议。

Grade(等级视图)—Yslow的第二个选项卡

YslowGrade(等级视图)给出的网站性能评分

[![2](http://www.npm8.com/wp-content/uploads/2015/07/21.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/21.jpg)
（图2：Yslow给出的网站性能评分）

&emsp;&emsp;Yslow给出的网站性能评分，从F~A，A是最好的，通过测试卢松松博客来看，网站有4处得分最低，例如图2中的最低分提示：我博客的HTTP请求太多。其中应用了14个外部JS、3个CSS文件（之前我已从6个合并为3个）、14个CSS背景图片。

&emsp;&emsp;Yslow的建议是让我合并这些，至于合并CSS引用图片我在“提高网站打开速度的7大秘籍”中介绍过。

Components（组件视图）—Yslow的第三个选项卡

通过Components考验查看网页各个元素占用的空间大小

[![3](http://www.npm8.com/wp-content/uploads/2015/07/31.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/31.jpg)
（图3：通过Components考验查看网页各个元素占用的空间大小）

&emsp;&emsp;通 过Components考验查看网页各个元素占用的空间大小，例如我博客某个页面，有236个images（图片），占用了489.2K，通过详细查看， 发现来自gravatar（评论头像）的引用图片非常大，在加上我博客本省评论量就打，每个头像就占用几K，几百个就占用了整个网页50%的大小，而且图片还是引用的，加载就更慢。所以，我得出的结论是：gravatar虽然增强了互动性和个性，但也结结实实影响了网站速度。

Statistics（统计信息视图）—Yslow的第四个选项卡

Yslow的统计信息视图

[![4](http://www.npm8.com/wp-content/uploads/2015/07/4.gif)](http://www.npm8.com/wp-content/uploads/2015/07/4.gif)
（图4：Yslow的统计信息视图)

&emsp;&emsp;左 侧图表显示是页面元素在空缓存的加载情况，右侧为页面元素使用缓存后的页面加载情况。从图中可以直观的看出（尤其是我标的红框），这个网页263个 

&emsp;&emsp;HTTP请求，网页的大小达到773.9K，意味着打开没打开一个页面几乎需要下载1M的东西，而通过使用缓存后我们可以看到效果图片基本靠缓存，而网页 的总大小压缩到43.2K。

&emsp;&emsp;Statistics这个统计信息视图工具和Components（第三选项卡）一样，只是效果更直观，如果要获得性能优化建议还是要看Grade（第二选项卡）的详细建议。</span>

Tools（辅助工具）—Yslow的第五个选项卡

Yslow提供的小工具

[![5](http://www.npm8.com/wp-content/uploads/2015/07/5.gif)](http://www.npm8.com/wp-content/uploads/2015/07/5.gif)
（图5：Yslow提供的小工具）

&emsp;&emsp;JSLint是一个强大的工具，它可以检验HTML代码以及内联的Javascript代码，通过JSLint发现了google analytics上的一个js错误。

ALL JS：查看你这个网页上一共引用了多少JS。

All JS Beautified：把所有JS放在打开的页面中，利用站长统一检查（我感觉作用不大）。

All JS Minified：同上，但它显示的是压缩过的js代码，如果你要JS优化，它已经给你优化好了，来过来直接用。

All CSS：显示你网页所有CSS文件。

YUI CSS Compressor：显示网页压缩后的CSS文件，也是拿过来可以直接用的。

All Smush.it™：图片在线优化网站，点击它后会自动跳到smushit网站上给你自动优化CSS图片，该网站提供了优化前与优化后的对比，点击直接下载优化后的图片，在覆盖到自己网站上就可以了，强烈推荐。


Printable View：这个是打印用的，部门开会、前端设计师讨论、向老板汇报时估计用的上。