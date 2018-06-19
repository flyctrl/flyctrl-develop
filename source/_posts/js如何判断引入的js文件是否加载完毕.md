---
title: js如何判断引入的js文件是否加载完毕
tags:
  - 判断js文件是否加载完毕
id: 1608
categories:
  - JS/Jq
date: 2015-09-13 22:05:14
---

如果javascript代码较少的话完全可以将js代码通过`<script></script>`标签写在当前页面，但是如果js代码非常庞大的话，那么页面将会变得非常的臃肿，并且由于js代码是同步加载，所以当js代码加载的时候，会阻塞下面内容的解析，所以最好能够动态加载js功能，尤其是能够实现根据需要动态引入外部js文件。由于动态加载js文件是异步的，所以有时候需要判断js文件是否加载完毕，下面就通过代码介绍一下如何实现判断功能。

代码如下:
```javascript
function dynamicLoad(){//此函数实现判断指定文件是否加载完毕的功能。
  var _doc=document.getElementsByTagName('head')[0];//获取head头部标签元素对象。
  var script=document.createElement('script');//创建一个script标签元素。
  script.setAttribute('type','text/javascript');//设置script标签的type属性。
  script.setAttribute('src','jquery-1.8.3.js');//设置script标签的src属性值，也就是要加载js文件的路径。
  _doc.appendChild(script);//将script标签附加到head标签中，否则只能够在IE11以下浏览器能够完成判断。
  script.onload=script.onreadystatechange=function(){
    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
      alert('done');
    }
    script.onload=script.onreadystatechange=null;//删除事件处理函数。
  }
  //下面介绍一下上面代码的相关原理:
  //IE8和IE8以下浏览器中，script标签并不支持onload事件，但是支持onreadystatechange事件。
  //IE8以上浏览器、谷歌浏览器和火狐浏览器支持onload事件。
  //readyState是onreadystatechange事件的一个状态，当值为loaded或者complete的时候，都表示已经加载完毕。
  //if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')，!this.readyState表示不是不是IE11以下浏览器（IE11以下浏览器也是支持onreadystatechange事件的）
}
```