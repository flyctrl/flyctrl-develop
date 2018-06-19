---
title: 重置（修改）checkbox样式
tags:
  - checkbox样式
id: 185
categories:
  - HTML5/CSS3
date: 2015-07-12 21:37:17
---

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1">
<title >123</title>

<link rel="stylesheet" type="text/css" href="css.css" />
<style>

.li1{display: none;}
.li1_lab{width: 31px;height: 31px;border: 1px solid #ccc;display: block;
-moz-box-shadow:0px 0px 2px #999 inset; /* For Firefox3.6+ */
-webkit-box-shadow:0px 0px 2px #999 inset; /* For Chrome5+, Safari5+ */
box-shadow:0px 0px 2px #999 inset;
}
.li1:checked~.li1_lab{
background: url(checkbox.jpg); /* 选中后的图标 */
-moz-box-shadow:0px 0px 2px green inset; /* For Firefox3.6+ */
-webkit-box-shadow:0px 0px 2px green inset; /* For Chrome5+, Safari5+ */
box-shadow:0px 0px 2px green inset;
}
</style>

</head>
<body>

<input type="checkbox" id="li1" class="li1" value="1" name="li1">
<label for="li1" class="li1_lab"></label>

</body>
</html>
```