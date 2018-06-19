---
title: 在IIS中配置Phaser的examples站点
tags:
  - phaser配置examples站点
id: 1712
categories:
  - Phaser
date: 2015-09-21 14:53:36
---

phaser是HTML5开源的游戏引擎。

一、源码下载地址：[https://github.com/photonstorm/phaser](https://github.com/photonstorm/phaser)

二、文档结构：

[![1](http://www.npm8.com/wp-content/uploads/2015/09/14-660x520.png)](http://www.npm8.com/wp-content/uploads/2015/09/14.png)

三、将phaser-master部署到IIS中站点中，如果这是直接浏览站点则会出现报错

[![2](http://www.npm8.com/wp-content/uploads/2015/09/22-660x207.png)](http://www.npm8.com/wp-content/uploads/2015/09/22.png)

四、原因是没有配置充当静态文件的扩展名，需要在IIS功能视图中的“MIME类型”中添加".json"扩展名。

[![3](http://www.npm8.com/wp-content/uploads/2015/09/31.png)](http://www.npm8.com/wp-content/uploads/2015/09/31.png)

[![4](http://www.npm8.com/wp-content/uploads/2015/09/4-660x355.png)](http://www.npm8.com/wp-content/uploads/2015/09/4.png)

这时打开站点，就能正确显示网站了。

[![5](http://www.npm8.com/wp-content/uploads/2015/09/51-660x359.png)](http://www.npm8.com/wp-content/uploads/2015/09/51.png)
