---
title: Ckplayer.js视频播放插件之微信播放视频
tags:
  - ckplayer.js视频播放插件
  - 微信播放视频
  - 微信播放视频插件
id: 1284
categories:
  - 插件库
date: 2015-08-26 13:27:43
---

作为一名前端开发，在做页面时会碰到视频展示，一般都是用 flash 加载视频源文件，可惜功能太少，而且支持的视频格式有限。下面给大家分享一款不错的视频播放器——ckplayer（超酷网页视频播放器）。

ckplayer（超酷网页视频播放器）支持 http 协议下的 flv，f4v，mp4，支持 rtmp 视频流和 rtmp 视频回放，支持 m3u8 格式，是你做视频直播，视频点播的理想播放器。功能强，小巧，免费。

网页中常见的功能就是播放视频，下面介绍的这个ckplayer.js既可以在pc端播放，也可以在手机网页上播放。

## **可调用flash也可以调用html5播放器：**

```javascript
<div id="a1"></div>
<script type="text/javascript" src="ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript">
var flashvars={
f:'http://movie.ks.js.cn/flv/other/1_0.mp4',
c:0,
loaded:'loadedHandler'
};
var video=['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4'];
CKobject.embed('ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',false,flashvars,video);
</script>
```
CKobject.embed(

'flash播放器文件路径',

'容器ID',

'播放器的ID',

'宽度，可以是百分比',

'高度，可以是百分比',

优先调用设置，false=优先调用flash播放器，true=优先调用HTML5播放器

flash播放器的初始化参数，以及HTML5初始化参数，比如默认播放/暂停等设置，详细的可以参考【flashvars里各参数的说明】这一版块

HTML5视频播放地址，数组形式，详细的可参考HTML5视频调用的说明

)

## **只调用flash播放器：**

```javascript
<div id="a1"></div>
<script type="text/javascript" src="ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript">
var flashvars={
f:'http://movie.ks.js.cn/flv/other/1_0.flv',
c:0,
b:1
};
var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
CKobject.embedSWF('ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',flashvars,params);
</script>
```
CKobject.embedSWF('flash播放器路径',

'放置播放器的容器ID',

'播放器的ID',

'宽度，支持百分比',

'高度，支持百分比',

flashvars对象，初始化播放器参数,

相关的配置，如：背景色，是否允许全屏，是否允许交互，播放器是否透明

);

&nbsp;

## 只调用HTML5播放器：

```javascript
<div id="a1"></div>
<script type="text/javascript" src="ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript">
var flashvars={
p:1,
e:1
};
var video=['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4','http://www.ckplayer.com/webm/0.webm->video/webm','http://www.ckplayer.com/webm/0.ogv->video/ogg'];
var support=['all'];
CKobject.embedHTML5('a1','ckplayer_a1',600,400,video,flashvars,support);
</script>
```
CKobject.embedHTML5('放置播放器的容器的ID',

'播放器ID',

'宽高，支持百分比',

'高度，支持百分比',

视频地址，数组，因为不同的平台支持的视频格式不同，所以需要尽量多的视频格式来兼容,

初始化配置参数，比如默认是否播放,

在哪些平台上使用，all是指全部平台都调用

);

&nbsp;

其中
```
/**
注意，flashvars中的参数：
v：ckplayer_volume，视频默认音量 0-100 之间，默认为 85。
p：ckplayer_play，是否自动播放，可以为 1 或 0，默认为 1，参数不为 1 时播放器加载完成后均为暂停状态。
f：ckplayer_flv，视频地址，默认为空，可以是单独视频地址、url 地址列表文件、xml 地址列表文件、Flash 地址文件这四种情况。（注意对应修改 s 参数的值，即 ckplayer_style）
i：ckplayer_loadimg，视频播放器初始图片地址，即封面图片，默认为空。
d：ckplayer_pauseflash，暂停时播放的广告，只支持 Flash 和图片，默认为空。
u：ckplayer_pauseurl，暂停时播放广告图片的链接地址，默认为空。
l：ckplayer_loadadv，视频开始前播放的广告，可以是 图片/Flash/视频格式，默认为空。
r：ckplayer_loadurl，视频开始前广告的链接地址，主要针对视频广告，如果是 Flash 广告可以不填写，默认为空。
t：ckplayer_loadtime，视频开始前广告播放的秒数，只针对 Flash 或图片有效，默认为 0。
e：ckplayer_endstatus，视频结束后的动作，0 停止播放并发送js，1 是不发送 js 且重新循环播放，2 停止播放，默认为2。当为 0 时需要自定义函数：
function playerstop(){
alert("播放完成");
}
a：ckplayer_pat，只有在使用 Flash 加密地址传递时有效，需要 f 和 s 参数配合，以及你自定义的 geturl.swf 文件配合，f：ckplayer_flv 参数也可以为 getflv.php?id=[$pat] 这样的格式，相当于 Flash 加密地址传递，其中的 pat 是有效的,可以通过这里传递参数后得到视频播放地址给播放器。
s：ckplayer_style，f 参数的传递方式，0 是普通视频地址，1 是视频地址列表文件，2 是 xml 地址列表文件，3 是 Flash 加密地址解析，默认为 0 普通视频地址文件播放。
x：ckplayer_xml，皮肤配置文件，如果为空的话将使用 js 文件配置，默认为官方皮肤 ckplayer.xml，要修改为其他皮肤只需要下载后改这个文件名就可以了，比如网易皮肤 ckplayer_163.xml。
c：ckplayer_default，读取文本配置，此参数具有非常强大的功能，非 0 值时调用本地 ckplayer.txt 配置文件（比如外站引用视频只需一个参数即可）说来话长，请到网站了解详情。
b：ckplayer_bgcolor，该参数以适应站外调用时有些论坛自动设置透明度的问题。
h：ckplayer_http，默认为0，定义 http 视频流采用按关键帧拖动还是按关键时间点拖动，0是按关键帧，1是按关键时间点。
m：ckplayer_load，默认为0，为1时不自动加载视频，选择是否采用点击播放按钮时再加载视频，这个参数的功能是在同页面加载多个视频时，有些视频可以先不加载，省带宽。
g：ckplayer_start，默认为0，开头跳过时间，这两个参数可以定义按指定时间进行播放的功能和提前结束的功能，该功能的用处一是可以记录用户已播放到的时间下次打开该视频时直接从指定时间进行播放,二是可以做跳过片头和片尾的功能。
j：ckplayer_ending，同上，默认为0，提前结束时间。
o：附加参数，非 CKplayer 官方参数，可选，默认值为 0，当值为 1 时，可加载站外视频 Flash 地址，如优酷分享中的 Flash 地址等，相当于使用 <embed width="300" height="150"></embed> 标签加载站外 Flash 视频。
**/
```
下面贴一个实例代码：

html代码：
```html
<div id="video_c"></div>
```

css代码：
```css
#video_c{ width:840px; height:353px;margin:0 auto;}
```

js代码：
```javascript
<script type="text/javascript" src="ckplayer/ckplayer.js"></script>
<script type="text/javascript">

var flashvars={
f:'ckplayer/video/1_0.flv',
p:0
//i：'http://www.ckplayer.com/static/images/letitgo.jpg' //视频播放器初始图片地址，即封面图片，默认为空。
};
var video=['ckplayer/video/1_0.mp4->video/mp4'];
CKobject.embed('ckplayer/ckplayer.swf','video_c','ckplayer_a1','100%','100%',false,flashvars,video);

</script>
```
结果截图如下如下：

[![241740312968328](http://www.npm8.com/wp-content/uploads/2015/08/241740312968328-650x273.png)](http://www.npm8.com/wp-content/uploads/2015/08/241740312968328.png)


相关地址：

**官网地址：[http://www.ckplayer.com/](http://www.ckplayer.com/)**

**下载地址：[http://www.ckplayer.com/bbs/forum.php?mod=viewthread&amp;tid=10864](http://www.ckplayer.com/bbs/forum.php?mod=viewthread&amp;tid=10864)**

**帮助手册：[http://www.ckplayer.com/tool/](http://www.ckplayer.com/tool/)**

**使用示例：[http://www.ckplayer.com/article/19.htm](http://www.ckplayer.com/article/19.htm)**

**在线配置：[http://www.ckplayer.com/tool/flashvars.htm](http://www.ckplayer.com/tool/flashvars.htm)**

**论坛地址：[http://www.ckplayer.com/bbs/forum.php](http://www.ckplayer.com/bbs/forum.php)**