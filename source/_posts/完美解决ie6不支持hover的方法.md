---
title: 完美解决IE6不支持hover的方法
tags:
  - ie6 hover
id: 269
categories:
  - 前端兼容
date: 2015-07-13 14:18:52
---

&emsp;&emsp;在ie6 下只有a 才支持:hover 伪类，其它标签都不支持，现在可以通过 csshover.htc 可以解决 ie6 的 hover 兼容问题。

&emsp;&emsp;它利用 javascript 脚本来给元素的的样式定义，如果检测到 hover 定义，就给元素设置 onmouseover 和 onmouseout 事件，以此来实现 hover 的效果。
以下是 csshover.htc 代码：
```html
<attach event="ondocumentready" handler="parseStylesheets"/>
<script language="JScript">
function parseStylesheets() {
for (var a = doc.styleSheets,
b = a.length,
c = 0; b > c; c++) parseStylesheet(a[c])
}
function parseStylesheet(a) {
if (a.imports) try {
for (var b = a.imports,
c = b.length,
d = 0; c > d; d++) parseStylesheet(a.imports[d])
} catch(e) {}
try {
for (var f = (currentSheet = a).rules, c = f.length, g = 0; c > g; g++) parseCSSRule(f[g])
} catch(e) {}
}
function parseCSSRule(a) {
var b = a.selectorText,
c = a.style.cssText;
if (/(^|\s)(([^a]([^ ]+)?)|(a([^#.][^ ]+)+)):(hover|active)/i.test(b) &amp;&amp; c) {
var d = b.replace(/[^:]+:([a-z-]+).*/i, "on$1"),
e = b.replace(/(\.([a-z0-9_-]+):[a-z]+)|(:[a-z]+)/gi, ".$2" + d),
f = /\.([a-z0-9_-]*on(hover|active))/i.exec(e)[1],
g = b.replace(/:hover.*$/, ""),
h = getElementsBySelect(g);
currentSheet.addRule(e, c);
for (var i = 0; i < h.length; i++) new HoverElement(h[i], f, activators[d])
}
}
function HoverElement(a, b, c) {
a.hovers || (a.hovers = {}),
a.hovers[b] || (a.hovers[b] = !0, a.attachEvent(c.on,
function() {
a.className += " " + b
}), a.attachEvent(c.off,
function() {
a.className = a.className.replace(new RegExp("\\s+" + b, "g"), "")
}))
}
function getElementsBySelect(a) {
var b, c = [doc];
b = a.split(" ");
for (var d = 0; d < b.length; d++) c = getSelectedNodes(b[d], c);
return c
}
function getSelectedNodes(a, b) {
for (var c, d, e = [], f = /\.([a-z0-9_-]+)/i.exec(a), g = /\#([a-z0-9_-]+)/i.exec(a), h = a.replace(/(\.|\#|\:)[a-z0-9_-]+/i, ""), i = 0; i < b.length; i++) {
c = h ? b[i].all.tags(h) : b[i].all;
for (var j = 0; j < c.length; j++) d = c[j],
g &amp;&amp; d.id != g[1] || f &amp;&amp; !new RegExp("\\b" + f[1] + "\\b").exec(d.className) || (e[e.length] = d)
}
return e
}
var currentSheet, doc = window.document,
activators = {
onhover: {
on: "onmouseover",
off: "onmouseout"
},
onactive: {
on: "onmousedown",
off: "onmouseup"
}
};
</script>
```
使用方法：
```css
body{behavior:url(css/csshover.htc);}
```
注意

&emsp;&emsp;在引用 csshover.htc 时，不管你是在 css 文件里面引用 htc 文件，还是 html 里面引用 htc 文件，都是 html 文件去找 htc 的路径。也就是说路径一定要相对根目录或用绝对路径。