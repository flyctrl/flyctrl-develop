---
title: 如何让iframe自适应高度_iframe去掉滚动条
tags:
  - iframe
  - 滚动条
  - 高度
id: 319
categories:
  - 前端杂货
date: 2015-07-13 15:29:50
---

如何让iframe自适应高度_iframe去掉滚动条
```html
<iframe id="frame1" src="###.html" width="640" scrolling="no" frameborder="0"></iframe>
```
```javascript
<script type="text/javascript">
function reinitIframe(){
var iframe = document.getElementById("frame1");
try{
var bHeight = iframe.contentWindow.document.body.scrollHeight;
var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
var height = Math.max(bHeight, dHeight);
iframe.height =  height;
}catch (ex){}
}
window.setInterval("reinitIframe()", 200);
</script>
```

**iframe去掉滚动条**
```html
<iframe name="leftframe" marginwidth=10 marginheight=10 src="1.asp" frameborder=no width="100%" scrolling="no" height=100%></iframe>
```
设置frameborder=no就可以了！希望对你有用！