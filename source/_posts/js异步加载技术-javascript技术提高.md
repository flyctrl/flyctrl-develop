---
title: js异步加载技术 JavaScript技术提高
tags:
  - JavaScript技术提高
  - js异步加载技术
id: 1050
categories:
  - JS/Jq
date: 2015-07-31 13:28:40
---

默认情况下，js是默认同步加载的也就是是JS的加载时是阻塞的，后面的元素要等待js加载完成之后加载，那么对于一些无意义的javascript，如果放在头部会导致加载速度很慢，那么会影响用户体验，那么如何解决这种情况呢？

（1）defer,但只支持IE，代码如下：

```javascript
<script type=”text/javascript” defer=”defer”>
alert(document.getElementById(“p1″).children[0]);
</script>
```

(2),async，这种方法是html5属性，这种方式只能用于外部js代码如下

```javascript
<script type=”text/javascript” async=”async”></script>
```

(3).创建script，插入到dom中，加载完成后回调，代码如下

```javascript
function loadScript(url,callback)
{
var script=document.createElement(‘script’);
script.type=”text/javascript”;

//**IE**

if(script.readyState)
{
script.onreadystatechange=function()
{
if(script.readyState==”loaded”||script.readyState==”complete”)
{
script.onreadystatechange=null;
callback();
}
}
}else
{
script.onload=function()
{
callback();
}
}

script.src=url;
document.body.appendChild(script);
}
```