---
title: jquery城市搜索自动补全特效
tags:
  - 城市搜索
id: 140
categories:
  - 插件库
date: 2015-07-12 19:02:44
---

给大家推荐一款APP：掘金，在这个APP上有很多的技术干货。

此作品是一款非常棒的Jquery特效，实现城市搜索自动补全功能，文本获得焦点的时候就会弹出层让你选择城市，默认情况下是热门城市选择，跟着是按字母检索的选项卡，还可以输入城市的首字母自动补全检索，可用键盘的上下左右控制列表的上下选择和左右分页控制。。。

页面初始化核心代码如下：
```javascript
var labelFromcity = new Array();
labelFromcity ['热门城市'] = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40);
labelFromcity ['A-F'] = new Array(0,3,4,5,6,28,29);
labelFromcity ['G-J'] = new Array(1,7,8,9,30,31,32,33,37,40);
labelFromcity ['K-N'] = new Array(10,11,12,34,35,38);
labelFromcity ['P-W'] = new Array(13,14,15,16,17,18,22,24,25,36);
labelFromcity ['X-Z'] = new Array(2,19,20,21,26,27,39);
labelFromcity ['国际城市'] = new Array(41,42,43,44,45,46,47,48,49);
var hotList = new Array(14,15,16,17,18,19);
$(document).ready(function(){
$('#fromcity').querycity({'data':citysFlight,'tabs':labelFromcity,'hotList':hotList});
$('#tocity').querycity({'data':citysFlightTo});
});
</script>
```
效果如下：

[![1](http://www.npm8.com/wp-content/uploads/2015/07/13-300x295.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/13.jpg)

**[点此下载](http://www.npm8.com/plug/city.zip)**

&nbsp;