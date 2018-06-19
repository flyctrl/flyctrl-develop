---
title: javascript获取网页宽高方法汇总
tags:
  - js获取网页宽高
id: 1005
categories:
  - JS/Jq
date: 2015-07-26 16:14:15
---

document.body.clientWidth - 网页可见区域宽

document.body.clientHeight - 网页可见区域高

document.body.offsetWidth - 网页可见区域宽，包括边线和滚动条的宽

document.body.offsetHeight - 网页可见区域高，包括边线和滚动条的高[FF,chrom下是整个页面高，IE opera 下正常]

document.body.scrollWidth - 网页总宽

document.body.scrollHeight - 网页总高

document.body.scrollTop - 有滚动条的时候，向下拖动滚动条，上方不显示的那部分高度

document.body.scrollLeft - 同上

window.innerHeight - 浏览器窗口的内部高度

window.innerWidth - 浏览器窗口的内部宽度

window.screenTop - 网页正文部分上[网页文档的最上方距离屏幕最上方的距离，但FF不支持，Chrom,IE,Opera表现都不同，慎用]

window.screenLeft - 网页正文部分左[网页文档的最左方距离屏幕最左方的距离，但FF不支持，Chrom,IE,Opera表现都不同，慎用]

window.screen.height - 屏幕分辨率的高度

window.screen.width - 屏幕分辨率的宽度

window.screen.availHeight - 可用工作区高度[整个屏幕但不包括下方任务栏]

window.screen.availWidth - 可用工作区宽度[整个屏幕的宽度]

window.screen.clorDepth - 屏幕色彩，常用的16,32位等

window.screen.deviceXDPI - 屏幕像素/英寸【IE支持，其它不支持】

JavaScript 获取页面宽高的方法
```javascript
function getInfo() {
	var s = "";
	s += " 网页可见区域宽：" + document.body.clientWidth;
	s += " 网页可见区域高：" + document.body.clientHeight;
	s += " 网页可见区域宽：" + document.body.offsetWidth + " (包括边线和滚动条的宽)";
	s += " 网页可见区域高：" + document.body.offsetHeight + " (包括边线的宽)";
	s += " 网页正文全文宽：" + document.body.scrollWidth;
	s += " 网页正文全文高：" + document.body.scrollHeight;
	s += " 网页被卷去的高(ff)：" + document.body.scrollTop;
	s += " 网页被卷去的高(ie)：" + document.documentElement.scrollTop;
	s += " 网页被卷去的左：" + document.body.scrollLeft;
	s += " 网页正文部分上：" + window.screenTop;
	s += " 网页正文部分左：" + window.screenLeft;
	s += " 屏幕分辨率的高：" + window.screen.height;
	s += " 屏幕分辨率的宽：" + window.screen.width;
	s += " 屏幕可用工作区高度：" + window.screen.availHeight;
	s += " 屏幕可用工作区宽度：" + window.screen.availWidth;
	s += " 你的屏幕设置是 " + window.screen.colorDepth + " 位彩色";
	s += " 你的屏幕设置 " + window.screen.deviceXDPI + " 像素/英寸";
	alert(s);
}
getInfo(); 
```
在我本地测试当中：
在IE、FireFox、Opera下都可以使用
```javascript
document.body.clientWidth
document.body.clientHeight
```
即可获得，很简单，很方便。
而在公司项目当中：
Opera仍然使用
```javascript
document.body.clientWidth
document.body.clientHeight
```
可是IE和FireFox则使用
```javascript
document.documentElement.clientWidth
document.documentElement.clientHeight
```
原来是W3C的标准在作怪啊
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

如果在页面中添加这行标记的话 在IE中：
```javascript
document.body.clientWidth ==> BODY对象宽度
document.body.clientHeight ==> BODY对象高度
document.documentElement.clientWidth ==> 可见区域宽度
document.documentElement.clientHeight ==> 可见区域高度
```
在FireFox中：
```javascript
document.body.clientWidth ==> BODY对象宽度
document.body.clientHeight ==> BODY对象高度
document.documentElement.clientWidth ==> 可见区域宽度
document.documentElement.clientHeight ==> 可见区域高度
```
在Opera中：
```javascript
document.body.clientWidth ==> 可见区域宽度
document.body.clientHeight ==> 可见区域高度
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽） document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
```
而如果没有定义W3C的标准，则IE为：
```javascript
document.documentElement.clientWidth ==> 0
document.documentElement.clientHeight ==> 0
```
FireFox为：
```javascript
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）
document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
```
Opera为：
```javascript
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）
document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
```
&nbsp;