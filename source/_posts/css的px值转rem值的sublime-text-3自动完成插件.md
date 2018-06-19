---
title: CSS的px值转rem值的Sublime Text 3自动完成插件
tags:
  - CSSREM
  - CSS的px值转rem值的Sublime Text 3自动完成插件
  - 自动化转换px到rem
id: 2303
categories:
  - 前端杂货
date: 2016-04-12 19:57:18
---

现在普遍移动端开发都是使用rem来进行开发，但是使用rem开发有一个痛病，就是写CSS的时候都需要通过px转化成rem，那么今天就给大家介绍一款SublimeText3的一款自动化转换px到rem的插件-CSSREM。
先上插件效果图：

![自动化转换px到rem](http://www.npm8.com/wp-content/uploads/2016/04/908250-20160412094317113-270866248.gif)

这样就可以安心的按px写，然后一回车转换成rem啦！

### 安装

*   下载本项目
*   进入packages目录：Sublime Text -> Preferences -> Browse Packages...
*   复制下载的cssrem目录到刚才的packges目录里。
*   重启Sublime Text。

### 配置参数

参数配置文件：Sublime Text -> Preferences -> Package Settings -> cssrem

*   `px_to_rem` - px转rem的单位比例，默认为40。
*   `max_rem_fraction_length` - px转rem的小数部分的最大长度。默认为6。
*   `available_file_types` - 启用此插件的文件类型。默认为：[".css", ".less", ".sass"]。

[点击下载](https://github.com/flashlizi/cssrem)

&nbsp;