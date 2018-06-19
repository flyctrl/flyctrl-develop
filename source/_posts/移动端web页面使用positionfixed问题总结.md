---
title: '移动端web页面使用position:fixed问题总结'
tags:
  - 移动端fixed总结
id: 1534
categories:
  - 移动前端
date: 2015-09-06 23:23:26
---

&emsp;&emsp;近期完成了一个新的项目，其中又涉及到了 fixed（固定位置定位）的问题，之前已经阐述过我对 iScroll 的态度，所以在这个项目中我决定不使用 iScroll，使用 position:fixed 实现头部、底部模块定位。在使用fixed的过程中，遇到了一些的问题，并且部分问题无法找到较好的解决方案。下面我就将这些问题一一阐述，提供给大家参考。

### 正常界面

[![1](http://www.npm8.com/wp-content/uploads/2015/09/11-563x1000.png)](http://www.npm8.com/wp-content/uploads/2015/09/11.png)

图中被红色选中区域为 position:fixed 元素

### 问题1：footer输入框 focus 状态，footer 被居中，而不是吸附在软键盘上部。

测试环境：iPhone 4s&amp;5 / iOS 6&amp;7 / Safari

[![2](http://www.npm8.com/wp-content/uploads/2015/09/2-563x1000.png)](http://www.npm8.com/wp-content/uploads/2015/09/2.png)

### 问题2：页面底部，footer输入框失去焦点时，header定位出错。当页面有滚动动作时，header定位恢复正常。

测试环境：iPhone 4s&amp;5 / iOS 6&amp;7 / Safari

操作步骤：1、页面滚动到底部；2、选中底部输入框，使输入框进入focus状态；3、点击页面其他区域，使输入框失去焦点；

[![3](http://www.npm8.com/wp-content/uploads/2015/09/3-563x1000.png)](http://www.npm8.com/wp-content/uploads/2015/09/3.png)

### 问题3：当页面发生跳转，再退回时，fixed区域消失，当内容获得焦点时，fixed区域才显示。

测试环境：iPhone 4 / iOS 5 / Safari（其他版本未发现此问题）

[![4](http://www.npm8.com/wp-content/uploads/2015/09/4.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/4.jpg)

### 问题4：部分浏览器不支持 fixed。

测试环境：魅族MX2 / 自带浏览器（MX2上QQ、UC浏览器支持fixed，**魅族的系统近期有过升级，更新之后自带浏览器就可以支持fixed**）

解决办法：使用 userAgent 检测，如果是魅族MX2自带浏览器则禁用 position:fixed，使用 position:relative 代替。
PS: iOS4 也是不支持 fixed 的。

[![5](http://www.npm8.com/wp-content/uploads/2015/09/5.png)](http://www.npm8.com/wp-content/uploads/2015/09/5.png)

### 问题5： 在滚屏过程中，fixed定位异常，touchend之后恢复正常。

测试环境：三星i9100(S2) / 自带浏览器（QQ、UC浏览器正常）

[![6](http://www.npm8.com/wp-content/uploads/2015/09/6.png)](http://www.npm8.com/wp-content/uploads/2015/09/6.png)

### 问题6： 部分低版本Android对支持不好，video poster属性设置的封面图会遮挡fixed元素。

测试环境：摩托罗拉ME525+ / Android 2.3.4 / 自带浏览器、QQ、UC浏览器

[![7](http://www.npm8.com/wp-content/uploads/2015/09/7.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/7.jpg)

### 问题7： WP8下，QQ、UC浏览器滚动页面时footer定位错误，会往上偏移，是由于地址栏收起的缘故。

测试环境：Nokia Lumia920 / WP8 / UC、QQ（自带浏览器正常）

[![8](http://www.npm8.com/wp-content/uploads/2015/09/8-600x1000.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/8.jpg)

### 总结

*   在 android 手机下 fixed 表现要比 iOS 更好，软键盘弹出时，不会影响fixed元素定位；
*   不要在 fixed 元素中使用 input / textarea 元素。
还是保留之前的态度，依然不推荐在 Android下使用 iScroll。在开发项目时，可以考虑分为两个版本：iOS下使用 iScroll的解决方案，Android下使用 position:fixed。