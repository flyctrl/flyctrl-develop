---
title: 如何检测页面是否有重复的id属性值
tags:
  - js检测页面是否有重复的id属性值
  - js检测页面重复id
id: 1963
categories:
  - JS/Jq
date: 2015-12-18 10:25:00
---

&emsp;&emsp;根据W3C标准规定，在同一个文档内id属性值是唯一的，也就是说不能够有重复的id属性值，如果当页面比较庞大的话，如何去检测是否有重复的id属性值那将是一个复杂的工作，下面将提供一段代码实例可以解决此问题。
```html
<!DOCTYPE html>
<html>
<head>
<meta charset=" utf-8">
<meta name="author" content="http://www.npm8.com/" />
<title>grycheng前端博客</title>
<script type="text/javascript">
window.onload=function(){
var tags=document.getElementsByTagName("*"),
count=tags.length, time, ret = {}, id;
time=new Date();
for(var i = 0; i < count; i++)
{
id=tags[i].id;
if(id)
{
if(ret[id])
{
alert(id + "/n用时：" + (new Date() - time));
return;
}
else
{
ret[id]=true;
}
}
}
alert("未找到相同ID");
}
</script>
</head>
<body>
</body>
</html>
```
以上代码可以检测文档中是否含有重复的id。