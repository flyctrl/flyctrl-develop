---
title: Phaser里通过json读取数据的两种方式
tags:
  - phaser json
  - phaser通过json读取数据
id: 1737
categories:
  - Phaser
date: 2015-09-22 12:58:40
---

## 1\. Phaser官方教程里的方式

首先在preload里面加载游戏数据文本

this.load.text('data', 'assets/data.json');​

然后通过cache和json解析函数获得数据，其中JSON.parse解析是js自带函数

this.levelData = JSON.parse(this.game.cache.getText('data'));​

## 2\. 其他开发者的使用案例

​首先在preload里面加载游戏数据文本

this.load.json('data', 'assets/data.json');​

然后通过cache和getJSON获得数据

var str = game.cache.getJSON('data');

看起来第二种方式更便捷一些，可能是因为phaser更新版本后官网的教程没有及时跟上的原因吧。
&nbsp;
