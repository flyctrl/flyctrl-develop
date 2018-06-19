---
title: 页面分享代码share
tags:
  - 分享代码share
id: 1269
categories:
  - 前端杂货
date: 2015-08-24 13:08:48
---

&emsp;&emsp;在开发一个页面的时候常常会有这么一个小功能，就是分享该页面中的信息。

&emsp;&emsp;常见的分享代码有百度分享， JiaThis分享插件，bshare分享插件等，我主要分享一下自定义分享代码，如下：
```javascript
function dofristshare(type) {
var title = encodeURIComponent("新年快乐,马年吉祥");
var link = encodeURIComponent('http://www.baidu.com');
var image = encodeURIComponent('http://www.baidu.com/img/bdlogo.gif');

if (type == "sina") {
window.open("http://v.t.sina.com.cn/share/share.php?url=" + link + "&amp;title=" + title + "&amp;content=utf8&amp;pic=" + image);
}

if (type == "tx") {
window.open("http://v.t.qq.com/share/share.php?url=" + link + "&amp;title=" + title + "&amp;pic=" + image);
}

if (type == "qzone") {
window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + link + "&amp;title=" + title + "&amp;pics=" + image);
}

if (type == "rr") {
window.open("http://widget.renren.com/dialog/share?resourceUrl=" + link + "&amp;title=" + title + "&amp;pic=" + image);
}

if (type == "douban") {
window.open("http://www.douban.com/recommend/?url=" + link + "&amp;title=" + title + "&amp;image=" + image);
}

return false;

}
```

htm代码：
```html
<div class="share_top_style">
<a href="javascript:void()" class="" onClick="dofristshare('sina')"><img src="images/sina.png" alt="新浪微博"></a>

<a href="javascript:void()" class="" onClick="dofristshare('tx')"><img src="images/tx.png" alt="腾讯微博"></a>

<a href="javascript:void()" class="" onClick="dofristshare('rr')"><img src="images/rr.png" alt="人人网"></a>

<a href="javascript:void()" class="" onClick="dofristshare('qzone')"><img src="images/qq.png" alt="QQ空间"></a>

<a href="javascript:void()" class="" onClick="dofristshare('douban')"><img src="images/db.png" alt="豆瓣"></a>
</div>
```