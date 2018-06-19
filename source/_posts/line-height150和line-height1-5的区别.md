---
title: 'line-height:150%和line-height:1.5的区别'
tags:
  - 'line-height:150%和line-height:1.5的区别'
id: 1913
categories:
  - HTML5/CSS3
date: 2015-12-01 15:30:58
---

"%"：是继承父级元素的距离；
"无单位"：是子元素计算各自的行距离；

举个栗子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
body{
font-size:14px;
line-height:150%;
background: black;
}
p{
font-size:26px;
background: gray;
color: white;
}
</style>
</head>
<body>
<p>你好！</p>
</body>
</html>
```
效果如图：

![line-height:150%;](http://www.npm8.com/wp-content/uploads/2015/12/1.png)

1、当line-height:XX%时：

body{font-size:14px;line-height:150%;}

p{font-size:26px;}

结果就是：

body{line-height:21px;}//14*150%=21

p{line-heigt:21px;}//继承父元素

&nbsp;

再举个栗子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
body{
font-size:14px;
line-height:1.5;
background: black;
}
p{
font-size:26px;
background: gray;
color: white;
}
</style>
</head>
<body>
<p>你好！</p>
</body>
</html>
```
效果如图：

![line-height:1.5](http://www.npm8.com/wp-content/uploads/2015/12/2.png)

2、当line-height:X.X时：

body{font-size:14px;line-height:1.5;}

p{font-size:26px;}

结果就是：

body{line-height:21px;}//14*1.5=21

p{line-height:39px;}//26*1.5=39
