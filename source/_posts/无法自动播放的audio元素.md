---
title: 无法自动播放的audio元素
tags:
  - 无法自动播放audio
id: 1526
categories:
  - HTML5/CSS3
date: 2015-09-06 23:04:40
---

&emsp;&emsp;HTML5新增了video元素和audio元素，替代了传统HTML4使用复杂的object元素与embed来播放视频或者音频的方法。这次的一个项目，产品经理要求手机加载开始时播放音乐，想到播放音乐，又是在ios和android平台，那audio元素必然是首选。

### **一、audio的基本知识**

audio:标签定义声音，比如音乐或其他音频流。

### **二、audio的属性**

![a](http://www.npm8.com/wp-content/uploads/2015/09/a.jpg)

### **三、audio的写法**

写法一：
```html
<audio src="baishu.mp3"  auto loop>你的浏览器还不支持哦</audio>
```

写法二：
```html
<audio controls="controls">
<source src="baishu.ogg" type="audio/ogg">
<source src="baishu.mp3" type="audio/mpeg">
优先播放音乐baishu.ogg，不支持在播放baishu.mp3
</audio>
```

### **四、audio实战**

&emsp;&emsp;在项目中使用audio，一开始在chrome浏览器下做测试，使用了autoplay和loop属性，在页面打开时自动播放并循环，在chrome是成功支持，发布到测试环境后，在ios和android手机中音乐不会自动播放- -!，做了一系列测试，使用JS，还是无法自动播放...

&emsp;&emsp;想用回HTML4的object元素与embed，但手机中有些浏览器禁止了控件....

&emsp;&emsp;后来在外国网站找了一些对audio使用的资料：

[![b](http://www.npm8.com/wp-content/uploads/2015/09/b-650x358.png)](http://www.npm8.com/wp-content/uploads/2015/09/b.png)

对audio的使用，总结如下：

1.audio元素的autoplay属性在ios和andriod上无法使用的，在PC端上正常

2.audio元素没有设置controls时，在ios和android上会占据空间大小，而在PC端chrome是不会占据任何空间

后来，跟产品经理商量后，暂不使用音乐了....如果大家有办法能在iso和android上自动播放背景音乐，请联系我~~~Thx
&nbsp;

参考资料：

[http://stackoverflow.com/questions/4259928/how-can-i-autoplay-media-in-ios-4-2-1-mobile-safari](http://stackoverflow.com/questions/4259928/how-can-i-autoplay-media-in-ios-4-2-1-mobile-safari)

[http://www.ibm.com/developerworks/library/wa-ioshtml5/index.html](http://www.ibm.com/developerworks/library/wa-ioshtml5/index.html)

[http://www.w3school.com.cn/html5/html5_audio.asp](http://www.w3school.com.cn/html5/html5_audio.asp)
&nbsp;
&nbsp;