---
title: javascript阻止事件冒泡的函数
tags:
  - js事件冒泡函数
id: 1015
categories:
  - JS/Jq
date: 2015-07-26 17:05:50
---

兼容主流浏览器的阻止冒泡的方法：

```javascript
function stopPropagation(e) {  
    e = e || window.event;  
    if(e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();  
    } else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    }  
}
```

调用：
```javascript
document.getElementById('btn_show').onclick = function(e) {  
    document.getElementById('need_hide').style.display = 'block';  
    stopPropagation(e);  
}
```