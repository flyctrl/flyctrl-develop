---
title: 关于scrollbar-face-color只支持ie的解决方法
tags:
  - scrollbar-face-color
id: 336
categories:
  - 前端兼容
date: 2015-07-13 15:57:00
---

IE浏览器中自定义滚动条样式：
```css
HTML{
scrollbar-base-color: #C0C0C0;
scrollbar-base-color: #C0C0C0;
scrollbar-3dlight-color: #C0C0C0;
scrollbar-highlight-color: #C0C0C0;
scrollbar-track-color: #EBEBEB;
scrollbar-arrow-color: black;
scrollbar-shadow-color: #C0C0C0;
scrollbar-dark-shadow-color: #C0C0C0;
}
```
解释：
介绍一下涉及浏览器滚动条的样式表内容（某些样式需ie5.5+才能支持）：
1．
>overflow内容溢出时的设置（设定被设定对象是否显示滚动条）

>overflow-x水平方向内容溢出时的设置

>overflow-y垂直方向内容溢出时的设置

以上三个属性设置的值为visible(默认值)、scroll、hidden、auto。

2．
>scrollbar-3d-light-color立体滚动条亮边的颜色（设置滚动条的颜色）

>scrollbar-arrow-color上下按钮上三角箭头的颜色

>scrollbar-base-color滚动条的基本颜色

>scrollbar-dark-shadow-color立体滚动条强阴影的颜色

>scrollbar-face-color立体滚动条凸出部分的颜色

>scrollbar-highlight-color滚动条空白部分的颜色

>scrollbar-shadow-color立体滚动条阴影的颜色

CHROME浏览器中自定义滚动条样式：
```css
::-webkit-scrollbar { width: 3px; height: 3px;}
::-webkit-scrollbar-track-piece { background-color: #ffffff;}
::-webkit-scrollbar-thumb{height: 50px; background-color: #666; -webkit-border-radius: 3px;}
```
解释：
>::-webkit-scrollbar 滚动条宽跟高

>::-webkit-scrollbar-track-piece 滚动条样式底部内层样式

>::-webkit-scrollbar-thumb 滚动条滑块样式

>-webkit-border-radius: 滚动条滑块边角–导圆角

FireFox下自定义滚动条：
```css
@-moz-document url-prefix(http://),url-prefix(https://) {
/* 滚动条颜色 */
scrollbar {
-moz-appearance: none !important;
background: rgb(0,255,0) !important;
}
/* 滚动条按钮颜色 */
thumb,scrollbarbutton {
-moz-appearance: none !important;
background-color: rgb(0,0,255) !important;
}
/* 鼠标悬停时按钮颜色 */

thumb:hover,scrollbarbutton:hover {
-moz-appearance: none !important;
background-color: rgb(255,0,0) !important;
}
/* 隐藏上下箭头 */
scrollbarbutton {
display: none !important;
}
/* 纵向滚动条宽度 */
scrollbar[orient="vertical"] {
min-width: 15px !important;
}
}
```
FF下用JS实现自定义滚动条：

JS
```javascript
< script type=“text/javascript” src=“JQUERY-1.1.3.1.js”></script>
< script type=“text/javascript” src=“jquery.linscroll.js“></script>
< script type=“text/javascript”>
$(document).ready(
function(){
$(’#scrollContent’).setScroll( //scrollContent为滚动层的ID
{img:scroll_bk.gif’,width:10},//背景图及其宽度
{img:scroll_arrow_up.gif’,height:3},//up image
{img:scroll_arrow_down.gif’,height:3},//down image
{img:scroll_bar.gif’,height:25}//bar image
);});
< /script>
```
HTML
```html
< div id=“scrollContent” style=“width:140px;overflow:hidden;height:170px;”>内容</div>
```