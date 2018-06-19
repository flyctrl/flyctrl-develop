---
title: 十六进制颜色转换成RGB
tags:
  - 换成RGB
id: 573
categories:
  - 前端杂货
date: 2015-07-17 13:01:21
---

使用示例：

"#333".toRGB();

"#AAAAAA".toRGB();

```javascript
String.prototype.toRGB = function(){
 var _color = this,
 _rgb = [];
 if(_color.search(/^#[a-fA-F0-9]{3}$|^#[a-fA-F0-9]{6}$/) === 0){
 // 如果是3位的十六进制转换成6位的十六进制
 if(this.length === 4){
 _color = this.replace(/[a-fA-F0-9]/g, function(color){
 return color + color;
 })
 }

 // 将十六进制颜色转换成RGB模式
 _color.replace(/[a-fA-F0-9]{2}/g, function(color){
 _rgb.push(parseInt(color, 16));
 });
 return "rgb("+ _rgb.toString() + ")";
 }
 console.error("类型错误");
 return null;
}

```