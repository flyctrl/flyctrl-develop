---
title: jQuery按照比例自动调整网站图片大小
tags:
  - js按比例自动调整图片
id: 954
categories:
  - JS/Jq
date: 2015-07-25 20:52:00
---

基于jQuery，用在图片过大撑开页面影响美观的情况下，可以自定义图片超过最大尺寸并根据这个尺寸进行比例缩放，从而控制页面大图的显示，下面贴下代码，有需要的可以借鉴下。
```javascript
<script type="text/javascript">
$(document).ready(function(){
    $('img').each(function(){   
        var maxWidth =500;      // 图片最大宽度   
        var maxHeight =500;     // 图片最大高度   
        var ratio = 0;      // 缩放比例  
        var width = $(this).width();    // 图片实际宽度   
        var height = $(this).height();  // 图片实际高度        
        if(width > maxWidth){           // 检查图片是否超宽 
            ratio = maxWidth / width;       // 计算缩放比例       
            $(this).css("width", maxWidth); // 设定实际显示宽度       
            height = height * ratio;        // 计算等比例缩放后的高度       
            $(this).css("height", height);  // 设定等比例缩放后的高度   
        }       
        if(height > maxHeight){         // 检查图片是否超高    
            ratio = maxHeight / height; // 计算缩放比例      
            $(this).css("height", maxHeight);   // 设定实际显示高度       
            width = width * ratio;              // 计算等比例缩放后的高度       
            $(this).css("width", width);        // 设定等比例缩放后的高度   
        }
    });
}); 
</script>
```
&nbsp;