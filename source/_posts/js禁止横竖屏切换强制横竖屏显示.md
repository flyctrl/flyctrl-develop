---
title: 'JS禁止横竖屏切换,强制横竖屏显示'
tags:
  - JS禁止横竖屏切换
id: 1292
categories:
  - 移动前端
date: 2015-08-26 16:37:07
---

js判断屏幕横竖屏：
```javascript
function orient() {
        //alert('gete');
        if (window.orientation == 0 || window.orientation == 180) {
            $("body").attr("class", "portrait");
            orientation = 'portrait';
            return false;
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            $("body").attr("class", "landscape");
            orientation = 'landscape';
            return false;
        }
    }

    $(function(){
        orient();
    });

    $(window).bind( 'orientationchange', function(e){
        orient();
    });
```
ipad： 90 或 -90 横屏

ipad： 0 或180 竖屏

Andriod：0 或180 横屏

Andriod： 90 或 -90 竖屏

iphone 、ipad禁止横竖屏切换、强制横竖屏

