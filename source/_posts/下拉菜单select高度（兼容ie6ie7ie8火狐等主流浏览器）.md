---
title: 下拉菜单select高度（兼容IE6/IE7/IE8/火狐等主流浏览器）
tags:
  - select高度
id: 234
categories:
  - 前端兼容
date: 2015-07-13 13:50:09
---

**主要思路：**

&emsp;&emsp;用CSS设置select基本是没有效果的，因为select没有height这个属性，所以需要通过font-size来设置，使其高度撑起来。

```html
<!DOCTYPEhtml PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<htmlxmlns="http://www.w3.org/1999/xhtml">
<head>
<metahttp-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>兼容IE6/IE7/IE8/火狐---下拉菜单select高度</title>
<styletype="text/css">
.select{border:1px solid#ccc;line-height:22px;color:#666;margin:-1px;padding:4px3px;font-size:13px;width:93px;*width:85px;}

.select_border{*background:#fff;*border:1px solid#ccc;*padding:4px;width:83px;}

.container{*border:0;*position:relative;*width:83px;*height:18px;*overflow:hidden;*background:#fff;}
</style>
</head>
<body>
<divclass="select_border"> <divclass="container">
<select name=""class="select">
<optionselected="selected">区域不限
</option>
<option>北京</option>
<option>天津</option>
<option>上海</option>
<option>重庆</option>
</select>
</div>
</div>
</body>
</html>
```