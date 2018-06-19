---
title: 参数传递的四种形式：URL、超链接、js、form表单
tags:
  - 参数传递的形式
id: 864
categories:
  - 前端杂货
date: 2015-07-25 15:59:43
---

什么时候用GET, 查，删，

什么时候用POST,增，改（特列：登陆用Post,因为不能让用户名和密码显示在URL上）

4种get传参方式

```html
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title></title>
<script type="text/javascript">
function Go() {
window.location.href="localhost:21811/Handler1.ashx?id=1&amp;name='abc'"
}
</script>
</head>
<body>

<!--//参数传递的几种形式-->
<!--第一种：直接在URL后面加参数：-->
localhost:21811/Handler1.ashx?id=1&amp;name="abc"

<!--第二种：用超链接的方法传递参数：当点击超链接的时候，首先会跳转到localhost:21811/Handler1.ashx页面，然后还会传递id 和name 两个参数过去-->
<a href="localhost:21811/Handler1.ashx?id=1&amp;name='abc'">超链接传递参数</a></body>

<!--第三种：通过js方法传递:用户点击这个button按钮，触发onClick事件，执行Go()方法，跳转到localhost:21811/Handler1.ashx页面，同时传递了id，和name两个参数过去-->
<input type="button" onclick="Go()" value="通过js方法传递参数" />

<!--第四种：通过form表单传递-->
<form action="Handler1.ashx" method="get"><!--注意action里面的连接不能带参数的-->>
<input type="text" name="id" value="3" />
<input type="text" name="name" value="abc" />
<input type="submit" value="通过传递参数" />
</form>
</body>
</html>
```