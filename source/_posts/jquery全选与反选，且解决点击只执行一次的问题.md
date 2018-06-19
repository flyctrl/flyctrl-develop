---
title: jQuery全选与反选，且解决点击只执行一次的问题
tags:
  - jq全选
  - jq反选
id: 1217
categories:
  - JS/Jq
date: 2015-08-19 13:12:02
---

```html
<html>
<head>
<script src="jquery-1.11.1.min.js" type="text/javascript"></script>
</head>
<body>
<input type="checkbox" name="chk_list[]" value="1" />1
<input type="checkbox" name="chk_list[]" value="2" />2
<input type="checkbox" name="chk_list[]" value="3" />3
<input type="checkbox" name="chk_list[]" value="4" />4
<input type="checkbox" name="chk_all" id="chk_all" />全选/取消全选

<script type="text/javascript">
$("#chk_all").click(function(){
// 使用attr只能执行一次
$("input[name='chk_list[]']").attr("checked", $(this).attr("checked"));

// 使用prop则完美实现全选和反选
$("input[name='chk_list[]']").prop("checked", $(this).prop("checked"));

// 获取所有选中的项并把选中项的文本组成一个字符串
var str = '';
$($("input[name='chk_list[]']:checked")).each(function(){
str += $(this).next().text() + ',';
});
alert(str);
});
</script>

</body>
</html>
```
&nbsp;

总结：
对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。

对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。
参考 [http://www.npm8.com/?p=1137](http://www.npm8.com/?p=1137)