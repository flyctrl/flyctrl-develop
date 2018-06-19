---
title: 分享我的HTML模板页面
tags:
  - HTML模板
id: 496
categories:
  - 前端杂货
date: 2015-07-16 11:53:25
---

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>首页</title>
    <meta name="keywords" content=""/>
    <meta name="description" content=""/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="css/reset.css"/>
    <link rel="stylesheet" href="css/reset.css"/>
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <!--[if IE]>
        <link rel="stylesheet" href="css/ie.css" />
        <script src="js/html5.js"></script>
    <![endif]-->
</head>
<body>
    <script src="js/jquery.js"></script>
    <script src="js/common.js"></script>
</body>
</html>
```

用到文件说明

reset.css：样式重置，以及一些固定的样式

style.css：主CSS文件，一般放到所有调用的CSS的最后一个，如果你用到其他框架CSS，则把style.css放到最后

ie.css：兼容IE下的问题（这个实际问题实际写了）

html5.js的：百度搜下即可（让IE低版本兼容HTML5元素）

jquery.js：不解释了

common.js：这里是公用的js，一般头部导航等