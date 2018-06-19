---
title: 加入视频或音乐：embed基本语法
tags:
  - embed
id: 345
categories:
  - HTML5/CSS3
date: 2015-07-13 16:31:48
---

代码：
```html
<embed src="视频链接地址" width="200" height="45" type=audio/mpeg loop="true" autostart="false">
```
### 代码说明：
&emsp;&emsp;播放器宽度width和高度herght可以灵活设置,如果都设为0，那么音乐就成了背景音乐，没有播放器.autostart="true"为自动播放,autostart="false"为不自动播放.loop="true"为连续循环播放,loop="false"为不循环播放.loop可以等于一个整数,比如loop="2",就是音乐循环播放2次。
如下为embed基本语法：

### embed
#### （一）、基本语法：
embed src=url

说明：embed可以用来插入各种多媒体，格式可以是 Midi、Wav、AIFF、AU、MP3等等，
Netscape及新版的IE 都支持。url为音频或视频文件及其路径，可以是相对路径或绝对路径。

示例：
```html
<embed src="your.mid">
```
#### （二）、属性设置：
1、自动播放：

语法：autostart=true、false

说明：该属性规定音频或视频文件是否在下载完之后就自动播放。

true：音乐文件在下载完之后自动播放；

false：音乐文件在下载完之后不自动播放。

示例：
```html
<embed src="your.mid" autostart=true>
<embed src="your.mid" autostart=false>
```
2、循环播放：

语法：loop=正整数、true、false

说明：该属性规定音频或视频文件是否循环及循环次数。

属性值为正整数值时，音频或视频文件的循环次数与正整数值相同；

属性值为true时，音频或视频文件循环；

属性值为false时，音频或视频文件不循环。

示例：
```html
<embed src="your.mid" autostart=true loop=2>
<embed src="your.mid" autostart=true loop=true>
<embed src="your.mid" autostart=true loop=false>
```
3、面板显示：

语法：hidden=ture、no

说明：该属性规定控制面板是否显示，默认值为no。

ture：隐藏面板；

no：显示面板。

示例：
```html
<embed src="your.mid" hidden=ture>
<embed src="your.mid" hidden=no>
```
4、开始时间：

语法：starttime=mm:ss（分：秒）

说明：该属性规定音频或视频文件开始播放的时间。未定义则从文件开头播放。

示例：
```html
<embed src="your.mid" starttime="00:10">
```
5、音量大小：

语法：volume=0-100之间的整数
说明：该属性规定音频或视频文件的音量大小。未定义则使用系统本身的设定。

示例：
```html
<embed src="your.mid" volume="10">
```
6、容器属性：

语法：height=# width=#

说明：取值为正整数或百分数，单位为像素。该属性规定控制面板的高度和宽度。

height：控制面板的高度；

width：控制面板的宽度。

示例：
```html
<embed src="your.mid" height=200 width=200>
```
7、容器单位：

语法：units=pixels、en

说明：该属性指定高和宽的单位为pixels或en。

示例：
```html
<embed src="your.mid" units="pixels" height=200 width=200>
<embed src="your.mid" units="en" height=200 width=200>
```
8、外观设置：

语法：controls=console、smallconsole、playbutton、pausebutton、stopbutton、
volumelever

说明：该属性规定控制面板的外观。默认值是console。

* console：一般正常面板；
* smallconsole：较小的面板；
* playbutton：只显示播放按钮；
* pausebutton：只显示暂停按钮；
* stopbutton：只显示停止按钮；
* volumelever：只显示音量调节按钮。

示例：
```html
<embed src="your.mid" controls=smallconsole>
<embed src="your.mid" controls=volumelever>
```
9、对象名称：

语法：name=#

说明：#为对象的名称。该属性给对象取名，以便其他对象利用。

示例：
```html
<embed src="your.mid" name="sound1">
```
10、说明文字：

语法：title=#

说明：#为说明的文字。该属性规定音频或视频文件的说明文字。

示例：
```html
<embed src="your.mid" title="第一首歌">
```
11、前景色和背景色：

语法：palette=color|color

说明：该属性表示嵌入的音频或视频文件的前景色和背景色，第一个值为前景色，第二个值为背景
色，中间用 | 隔开。color可以是RGB色（RRGGBB）也可以是颜色名，还可以是transparent
（透明）。

示例：
```html
<embed src="your.mid" palette="red|black">
```
12、对齐方式：

语法：align=top、bottom、center、baseline、 left、right、texttop、middle、
absmiddle、absbottom

说明：该属性规定控制面板和当前行中的对象的对齐方式。

* center：控制面板居中；
* left：控制面板居左；
* right：控制面板居右；
* top：控制面板的顶部与当前行中的最高对象的顶部对齐；
* bottom：控制面板的底部与当前行中的对象的基线对齐；
* baseline：控制面板的底部与文本的基线对齐；
* texttop：控制面板的顶部与当前行中的最高的文字顶部对齐；
* middle：控制面板的中间与当前行的基线对齐；
* absmiddle：控制面板的中间与当前文本或对象的中间对齐；
* absbottom：控制面板的底部与文字的底部对齐。

示例：
```html
<embed src="your.mid" align=top>
<embed src="your.mid" align=center>
```
使用 object 和 embed 标记

&emsp;&emsp;要在 Web 浏览器中显示 Flash SWF 文件，HTML 文档必须使用具有正确参数的 object 和 embed 标记。
对于 object，其中的四个设置（height、width、classid 和 codebase）是出现在 object 标记内的属性；所有其他设置都是出现在单独的名为 param 标记内的参数。例如：
```html
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100"
height="100" codebase="[<span style="color: #0066cc;">[url]http://active.macromedia.com/flash7/cabs/</span>](http://active.macromedia.com/flash7/cabs/)[/url]
swflash.cab#version=7,0,0,0">
<param name="movie" value="moviename.swf">
<param name="play" value="true">
<param name="loop" value="true">
<param name="quality" value="high">
</object>
```
&emsp;&emsp;对于 embed 标记，所有设置（如 height、width、quality 和 loop）都是出现在开始 embed 标记的两个尖括号之间的属性。例如：
```html
<embed src="moviename.swf" width="100" height="100" play="true"
loop="true" quality="high"
pluginspage="[<span style="color: #0066cc;">[url]http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash</span>](http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash)[/url]">
</embed>
```
&emsp;&emsp;若要一起使用这两种标记，请将 embed 标记正好放在结束 object 标记的前面，如下所示：
```html
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100"
height="100" codebase="[<span style="color: #0066cc;">[url]http://active.macromedia.com/flash7/cabs/</span>](http://active.macromedia.com/flash7/cabs/)[/url]
swflash.cab#version=6,0,0,0">
<param name="movie" value="moviename.swf">
<param name="play" value="true">
<param name="loop" value="true">
<param name="quality" value="high">
<embed src="moviename.swf" width="100" height="100" play="true?
loop="true" quality="high"
pluginspage="[<span style="color: #0066cc;">[url]http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash</span>](http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash)[/url]">
</embed>
</object>
```
&emsp;&emsp;注意：如果既使用 object 标记也使用 embed 标记，则对每个属性或参数都要使用相同的值以确保能在各种浏览器上进行一致的回放。参数 swflash.cab#version=6,0,0,0 是可选参数，如果您不想检查版本号，则可以省略此参数。

src=歌曲（音乐地址）换成一个aaa.mp3文件，用记事本打开，
再新建一个aaa.mp3文件，里面放每一首歌的地址，如：
```html
[<span style="color: #0066cc;">http://****.mp3</span>](http://%2A%2A%2A%2A.mp3/)
[<span style="color: #0066cc;">http://****.mp3</span>](http://%2A%2A%2A%2A.mp3/)
[<span style="color: #0066cc;">http://****.mp3</span>](http://%2A%2A%2A%2A.mp3/)
```