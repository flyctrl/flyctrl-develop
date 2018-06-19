---
title: jQuery输入框提示自动完成插件 autocomplete
tags:
  - autocomplete
  - 提示自动完成插件
id: 1380
categories:
  - 插件库
date: 2015-08-27 22:54:50
---

```html
<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title>练习</title>
<script src="js.js"></script>
<script src="jquery-1.9.1.min.js"></script>
<script src="jquery.autocomplete.min.js"></script>
</head>
<body>
<form action="">
<input type="text" name="country" id="autocomplete"/>
</form>

</body>
<script>
var countries = [
{ value: 'Andorra', data: 'AD' },
// ...
{ value: 'Zimbabwe', data: 'ZZ' }
];

$('#autocomplete').autocomplete({
lookup: countries,
onSelect: function (suggestion) {
alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
}
});

</script>
</html>
```
效果：

![271443339849405](http://www.npm8.com/wp-content/uploads/2015/08/271443339849405.jpg)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/08/jQuery-Autocomplete-master.zip)