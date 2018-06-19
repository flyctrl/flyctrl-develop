---
title: JS获取自身所在文件的目录路径
tags:
  - js路径
id: 381
categories:
  - JS/Jq
date: 2015-07-14 11:23:28
---

很多时候我们都需要在js文件中获取该文件的详细路径，以便根据其他文件与该js的相对位置计算并设置其他一些文件如图片或样式或脚本的目录路径。我们一般都这样做：
假设外部js文件的文件名为：test.js，则在test.js中都这样写：
```javascript
var js=document.scripts;
var jsPath;
for(var i=0;i<js.length;i++){
if(js[i].src.indexOf("test.js")>-1){
jsPath=js[i].src.substring(0,js[i].src.lastIndexOf("/")+1);
}
}
alert(jsPath);
```
或者为了提高效率，这样写
```javascript
var js=document.scripts;
var jsPath;
for(var i=js.length;i>0;i--){
if(js[i-1].src.indexOf("test.js")>-1){
jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
}
}
alert(jsPath);
```
这种思路很清晰，根据文件名获取引用的文件的src属性并进行判断截取即可。

**但这种办法有以下两个缺点：**

1、需要遍历页面的js文件，有时可能效率会比较低。

2、如果页面中出现目录不同的重名的js文件则可能判断错误。

其实我们可以有更简单的办法来准确获取路径，这是在一次js测试突然发现并幡然醒悟的。
```javascript
var js=document.scripts;
js=js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/")+1);
alert(js);
```
直接使用js.length？这会正确吗？

其实仔细想想，由于判断路径的js代码一般都直接放在js文件中而不是函数中，所以当加载该js文件时会立即执行其中的语句，而执行此语句时所获取到的js文件数目正好是js.length-1，因为页面后面的js文件还没有加载，所以该处的js文件获取的数目并不是页面所有的js文件的数目。这样一来，获取路径就无需再遍历了，而且文件判断也无需文件名，判断更加准确(js.length-1永远都是其文件本身)。