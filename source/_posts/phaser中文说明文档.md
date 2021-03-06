---
title: Phaser中文说明文档
tags:
  - phaser中文api
  - phaser中文文档
  - Phaser中文说明文档
id: 1242
categories:
  - Phaser
date: 2015-08-20 13:27:16
---

## **Phaser** 介绍

Phaser 是一款专门用于桌面及移动 HTML5 2D 游戏开发的开源免费框架，提供 JavaScript和 TypeScript 双重支持，内置游戏对象的物理属性，采用 Pixi.js 引擎以加快 Canvas 和WebGL 渲染，基于浏览器支持可自由切换。

本文将对以下类进行简单介绍：
<style>
table td{text-indent:10px;}
</style>
<table border="1" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td rowspan="11" align="center" valign="middle" width="99">&nbsp;

Core

核心</td>
<td valign="middle" width="186">

Game

</td>
<td valign="top" width="161">游戏</td>
</tr>
<tr>
<td valign="top" width="186">Group</td>
<td valign="top" width="161">组</td>
</tr>
<tr>
<td valign="top" width="186">World</td>
<td valign="top" width="161">世界</td>
</tr>
<tr>
<td valign="top" width="186">Loader</td>
<td valign="top" width="161">载入器</td>
</tr>
<tr>
<td valign="top" width="186">Time</td>
<td valign="top" width="161">时间</td>
</tr>
<tr>
<td valign="top" width="186">Camera</td>
<td valign="top" width="161">摄像机</td>
</tr>
<tr>
<td valign="top" width="186">State Manager</td>
<td valign="top" width="161">状态管理器</td>
</tr>
<tr>
<td valign="top" width="186">Tween Manager</td>
<td valign="top" width="161">补间动画管理器</td>
</tr>
<tr>
<td valign="top" width="186">Sound Manager</td>
<td valign="top" width="161">声音管理器</td>
</tr>
<tr>
<td valign="top" width="186">Input Manager</td>
<td valign="top" width="161">输入管理器</td>
</tr>
<tr>
<td valign="top" width="186">Scale Manager</td>
<td valign="top" width="161">缩放管理器</td>
</tr>
<tr>
<td rowspan="18" align="center" valign="middle" width="99">&nbsp;

Game Objects

游戏对象</td>
<td valign="top" width="186">Factory (game.add)</td>
<td valign="top" width="161">工厂</td>
</tr>
<tr>
<td valign="top" width="186">Creator (game.make)</td>
<td valign="top" width="161">创建者</td>
</tr>
<tr>
<td valign="top" width="186">Sprite</td>
<td valign="top" width="161">精灵</td>
</tr>
<tr>
<td valign="top" width="186">Image</td>
<td valign="top" width="161">图像</td>
</tr>
<tr>
<td valign="top" width="186">Sound</td>
<td valign="top" width="161">声音</td>
</tr>
<tr>
<td valign="top" width="186">Emitter</td>
<td valign="top" width="161">发射器</td>
</tr>
<tr>
<td valign="top" width="186">Particle</td>
<td valign="top" width="161">粒子</td>
</tr>
<tr>
<td valign="top" width="186">Text</td>
<td valign="top" width="161">文本</td>
</tr>
<tr>
<td valign="top" width="186">Tween</td>
<td valign="top" width="161">补间动画</td>
</tr>
<tr>
<td valign="top" width="186">BitmapText</td>
<td valign="top" width="161">位图文字</td>
</tr>
<tr>
<td valign="top" width="186">Tilemap</td>
<td valign="top" width="161">瓦片地图</td>
</tr>
<tr>
<td valign="top" width="186">BitmapData</td>
<td valign="top" width="161">位图数据</td>
</tr>
<tr>
<td valign="top" width="186">RetroFont</td>
<td valign="top" width="161">复古字体</td>
</tr>
<tr>
<td valign="top" width="186">Button</td>
<td valign="top" width="161">按钮</td>
</tr>
<tr>
<td valign="top" width="186">Animation</td>
<td valign="top" width="161">动画</td>
</tr>
<tr>
<td valign="top" width="186">Graphics</td>
<td valign="top" width="161">图形</td>
</tr>
<tr>
<td valign="top" width="186">RenderTexture</td>
<td valign="top" width="161">渲染纹理</td>
</tr>
<tr>
<td valign="top" width="186">TileSprite</td>
<td valign="top" width="161">瓦片精灵</td>
</tr>
<tr>
<td rowspan="6" align="center" valign="middle" width="99">Geometry

几何图形

&nbsp;</td>
<td valign="top" width="186">Circle</td>
<td valign="top" width="161">圆</td>
</tr>
<tr>
<td valign="top" width="186">Rectangle</td>
<td valign="top" width="161">矩形</td>
</tr>
<tr>
<td valign="top" width="186">Point</td>
<td valign="top" width="161">点</td>
</tr>
<tr>
<td valign="top" width="186">Line</td>
<td valign="top" width="161">直线</td>
</tr>
<tr>
<td valign="top" width="186">Ellipse</td>
<td valign="top" width="161">椭圆</td>
</tr>
<tr>
<td valign="top" width="186">Polygon</td>
<td valign="top" width="161">多边形</td>
</tr>
<tr>
<td rowspan="9" align="center" valign="middle" width="99">&nbsp;

Physics

物理引擎</td>
<td valign="top" width="186">Arcade Physics</td>
<td valign="top" width="161">Arcade 物理引擎</td>
</tr>
<tr>
<td valign="top" width="186">Body</td>
<td valign="top" width="161">刚体</td>
</tr>
<tr>
<td valign="top" width="186">P2 Physics</td>
<td valign="top" width="161">P2 物理引擎</td>
</tr>
<tr>
<td valign="top" width="186">Body</td>
<td valign="top" width="161">刚体</td>
</tr>
<tr>
<td valign="top" width="186">Spring</td>
<td valign="top" width="161">弹簧</td>
</tr>
<tr>
<td valign="top" width="186">CollisionGroup</td>
<td valign="top" width="161">碰撞组</td>
</tr>
<tr>
<td valign="top" width="186">ContactMaterial</td>
<td valign="top" width="161">接触物质</td>
</tr>
<tr>
<td valign="top" width="186">Ninja Physics</td>
<td valign="top" width="161">Ninja 物理引擎</td>
</tr>
<tr>
<td valign="top" width="186">Body</td>
<td valign="top" width="161">刚体</td>
</tr>
<tr>
<td rowspan="6" align="center" valign="middle" width="99">&nbsp;

Input

输入</td>
<td valign="top" width="186">Input Handler</td>
<td valign="top" width="161">输入处理</td>
</tr>
<tr>
<td valign="top" width="186">Pointer</td>
<td valign="top" width="161">指针</td>
</tr>
<tr>
<td valign="top" width="186">Mouse</td>
<td valign="top" width="161">鼠标</td>
</tr>
<tr>
<td valign="top" width="186">Keyboard</td>
<td valign="top" width="161">键盘</td>
</tr>
<tr>
<td valign="top" width="186">Key</td>
<td valign="top" width="161">按键</td>
</tr>
<tr>
<td valign="top" width="186">Gamepad</td>
<td valign="top" width="161">游戏手柄</td>
</tr>
</tbody>
</table>
&nbsp;

## 核心**Core**

**Game**

Game 对象是游戏的核心，它提供了一个快速调用公共函数和处理启动过程的渠道。

&nbsp;

**Group**

Group（组）是一个用于显示各种对象（包括 Sprites 和 Images）的容器。

Group 将显示/场景图组成了逻辑树的结构，应用到 Group 上的变换会应用到它的子对象上。

例如。当 Group 被移动/旋转/缩放时，所有的子对象同时也会被移动/旋转/缩放。

此外，Group 也提供了对快速对象池和对象回收的支持。

Group 可以显示对象，同时也可能作为其他组的子对象。

&nbsp;

**World**

一个游戏只拥有一个 World(世界)。World 是一个抽象空间，所有游戏对象都生存在 World中。它它可以是任意尺寸大小，不受舞台的边界限制。你可以通过相机来查看世界。所有的游戏对象都以基于世界的坐标而生存在 World 中。默认情况下，World 的尺寸大小与舞台一致。

&nbsp;

**Loader**

Loader（加载器）用于处理所有外部内容的加载，例如图像、声音、纹理图集和数据文件。

它把 Image()载入和 XMLHttpRequest 对象结合在一起，提供了载入进度显示和载入完成的回调功能。

&nbsp;

**Time**

这是一个核心内部游戏时钟。

它维护了一个消逝时间，计算已消逝的时间值。这可用于游戏对象的运动、补间动画，还处理一个标准的定时器池。

要创建一个普通的定时事件，可使用 Phaser.Timer。

&nbsp;

**Camera**

Camera（摄像机）是观察游戏世界的视野。它有一个确定的位置和大小，并且只渲染在它视野范围内的对象。游戏启动时候，会自动创建一个跟舞台相同大小的摄像机。通过改变Phaser.Camera.x/y 的值可以在世界中移动摄像机。

&nbsp;

**State** **Manager**

状态管理器负责载入、设置、切换游戏状态。

&nbsp;

**Tween**** ****Manager**

Phaser.Game 维护了一个单一的 TweenManager 实例，所有补间动画对象都是由它创建和更新的。补间被钩入游戏时钟中，使系统暂停，并根据游戏状态而调整。

TweenManager 主要是基于 tween.js（http://soledadpenades.com）。区别是：补间动画属于游戏的 TweenManager 实例，而不是一个全局 TWEEN 对象。它提供了一些包装了信号的回调方法，还有一些用于修补关于属性和完成错误的问题。完整的贡献者名单请参见：https://github.com/sole/tween.js。

&nbsp;

**Sound** **Manager**

声音管理器负责通过传统的 HTML 音频标签或 Web 音频（需浏览器支持）来播放音频。注意：在 Linux 的 Firefox25 及以上版本中，如果你在 about:config 中禁用了 media.gstreamer，则无法播放 mp3 或 m4a 文件。音频文件的类型及其编码方式是极其重要的。不是所有的浏览器能播放所有的格式。这里有一份很好的参考：http://hpr.dogphilosophy.net/test/。

如果你在某个页面上没有正确的刷新 Phaser 游戏（例如在 AngularJS 项目中），你会很快从AudioContext 节点跑飞掉。如果在创建 game 前在 window 对象上创建了一个全局的PhaserGlobal     变 量 ， 则 当 game销 毁 时 ， 当 前 的 AudioContext会 保 存 到window.PhaserGlobal.audioContext，并且在 game 重启后重用这个变量。

&nbsp;

**Input** **Manager**

Phaser.Input 是所有输入设备的管理器，包括鼠标、键盘、触摸和 MSPointer。 输入管理器在主游戏循环中会自动被更新。

&nbsp;

**Scale** **Manager**

ScaleManager 对象控制了缩放、大小变化和游戏大小与显示画布之间的对齐操作。

游戏大小是游戏的逻辑尺寸，显示画布作为 HTML 元素也有其自己的尺寸。

缩放的计算受包围在外面的父容器的大小（显示画布的父容器/元素的大小）影响很大。

画布的父容器的有效 CSS 规则对于缩放管理器的操作来说扮演了一个很重要的角色。

显示画布或者游戏尺寸，依赖于缩放模式，被更新以使得能够最好的适应父容器尺寸。

在全屏模式或者 parentIsWindow 模式，父容器尺寸就是可视化视图（参见 getParentBounds）。

父容器和显示画布包括以下准则：

1、给游戏画布的父元素添加样式以控制你固执父容器的大小，并因此而控制显示画布的大小和布局。

2、父元素的 CSS 样式应该有效地运用最大（和最小）的边界行为。

3、 父元素不能应用 padding。如果确实需要使用 padding，那么把它应用父容器的父容器，或者使用 margin。

4、不应该改变或者指定显示画布的 CSS 样式（例如边缘留空，大小），因为这可能会被ScaleManager 更新掉。

&nbsp;

## 游戏对象GameObjects

**Factory** **(game.add)**

GameObjectFactory 是一个使用 game.add 来创建很多常见游戏对象的快速方法。

创建出来的对象会自动被添加到适当的管理器、世界、或者用户指定的组中。

&nbsp;

**Creator** **(game.make)**

GameObjectCreator 是一个创建游戏对象的快速方法，但是并并不会把对象添加到游戏世界中。对象创建者可以被 game.make 访问。

&nbsp;

**Sprite**

精灵是游戏的生命体，几乎可用于所有的可视化物体。

基本上，精灵是有一套坐标和渲染在画布上的纹理所组成。精灵也包括了一些额外的属性，例如物理移动（通过 Sprite.body）、输入处理（通过 Sprite.input）、事件（通过 Sprite.events）、动画（通过 Sprite.animations），摄像机选择等等。

&nbsp;

**Image**

图像是一个轻量级对象，你可以使用它来显示任何不需要物理引擎或者动画的任务东西。它可以旋转、缩放、剪切，并接收输入事件。它可以完美的用于标识、背景、简单的按钮和其他非精灵类图形。

&nbsp;

**Sound**

声音类

&nbsp;

**Emitter**

Emitter 是一个使用 Arcade 物理引擎的轻量级粒子发射器。它可用于一次性的爆炸，或者像雨、火那样的连续性效果。它所有真正做的就是在设定的时间间隔里发射出 Particle（粒子）对象，并相应的修正他们的位置和速度。

&nbsp;

**Particle**

Particles（粒子）是精灵的扩展类，它由粒子发射器（例如 Phaser.Particles.Arcade.Emitter）发射出去。

&nbsp;

**Text**

文本对象创建了一个本地的隐藏 Canvas 对象，先把文本渲染上去，然后再把纹理渲染上去。正因为如此，你只能显示当前已经被载入的，且对于浏览器有效的字体。它不会为你载入字体 。 这 里 有 一 个 列 表 罗 列 了 不 同 移 动 浏 览 器 支 持 的 默 认 字 体 ：http://www.jordanm.co.uk/tinytype

&nbsp;

**Tween**

Tween（补间）允许你在一个指定的时间周期内更改一个目标对象的一个或多个属性。这个可用于让移动精灵 alpha 通道变化（即透明度变化）、缩放或者移动。使用 Tween.to 或者Tween.from 来设置 tween 值。你可以在同一个 Tween 上多次调用 Tween.to 来对同一个对象创建多个 tween。补充一下，以这种方式指定的 tween 会变成子 tween，并且会按次序播放。你可使用用 Tween.timeScale 和 Tween.reverse 来控制这个 Tween 及其所有子 tween 的回放。

&nbsp;

**BitmapText**

BitmapText（位图文字）对象包含了一个纹理文件和一个描述字体布局的 XML 文件。

在 Windows 上，你可以使用免费软件 BMFont: http://www.angelcode.com/products/bmfont/

在 OS X 上，我们建议使用 Glyph Designer: http://www.71squared.com/en/glyphdesigner

对于网页，有很好的 Littera: http://kvazars.com/littera/

&nbsp;

**Tilemap**

Phaser.Tilemap（瓦片地图）可以用一个 JSON 文件或者 CSV 文件来填充数据。第一个参数是传入一个缓存键值。当要使用瓦片数据时，你只需要提供这个键值。当使用 CSV 数据时，你必须提供这个键值和瓦片的宽、高数据。如果你想创建一个空的瓦片地图，想后面再填充，你可以不指定任何参数然后再调用 Tilemap.create，或者也可以在这里传入地图和瓦片的尺寸。注意，所有的瓦片地图在计算尺寸时都使用一个基本的瓦片尺寸，但是 TilemapLayer可能会有自己独立的优先级更高的瓦片尺寸。瓦片地图要使用 TilemapLayer 来渲染并显示出来。它不会自己直接添加到显示列表里。一个地图可能会有多个层次。你可以对地图数据进行复制、粘贴、填充操作，也可以把瓦片移来移去。

&nbsp;

**BitmapData**

BitmapData（位图数据）对象包含了一个 Canvas 元素，你可以通过一些普通的 Canvas 上下文操作在这个元素上绘制任何你喜欢的东西。单一的 BitmapData 可以被用来作为一个或多个图像或者精灵的纹理。所以，如果你需要动态创建精灵的纹理，这是个很好的选择。

&nbsp;

**RetroFont**

Retro Font（复古字体）类似于 BitmapFont（位图字体），他使用纹理来渲染字体。然而与BitmapFont 不同的是，RetroFont 里的每一个文字的尺寸都是一样的。这个与 sprite sheet（精灵表）类似。你通常可以在一些老的 8 位、16 位游戏中查到字体表。

&nbsp;

**Button**

按钮是一个特殊类型的精灵，他能自动建立对指针事件的处理。

这里是四种按钮响应的状态：

1、Over（经过） - 指针移动经过按钮。这个也就是 hover；

2、Out（离开） - 指针曾经移动经过过按钮，现在离开了按钮；

3、Down（按下） - 指针被按键按下。例如在触摸屏上触摸，或者用鼠标点击；

4、Up（抬起） - 指针在被按钮按下后又释放了。

&nbsp;

**Animation**

一 个 Animation （ 动 画 ） 实 例 包 含 了 一 个 单 一 的 动 画 和 用 于 播 放 的 空 间 。 它 通 过AnimationManager 来创建，由多个 Animation.Frame 对象组成，属于某个单一的游戏对象（例如：精灵）。

&nbsp;

**Graphics**

Graphics（图形）对象

&nbsp;

**RenderTexture**

RenderTexture（渲染纹理）是一个特殊的问题，它允许任何显示对象在它上面渲染。它允许你把许多复杂的对象渲染在一个单一的方框内（利用 WebGL），然后再用作其他显示对象的纹理。这个生成纹理是实时的。

&nbsp;

**TileSprite**

TileSprite（瓦片精灵）是个有着重复纹理的精灵。纹理可以被滚动、缩放，并且自动包裹边缘。请注意，TileSprites 和普通的精灵默认没有输入处理方法和物理引擎刚体，两者都必须要启用后才会具有这些特性。

&nbsp;

## 几何图形** ****Geometry**

**Circle**

通过指定中心坐标（指定 x 和 y 参数）和直径参数来创建圆形。如果你没有指定参数，那么x，y，直径半径默认为 0。

&nbsp;

**Rectangle**

通过指定左上角（指定 x 和 y 参数）、宽、高参数来创建一个矩形。如果没有指定参数，则矩形的 x，y，宽，高都默认是 0。

&nbsp;

**Point**

点对象表示的是二维坐标系统上的一个位置， 表示水平方向，y 表示垂直方向。var myPoint= new Phaser.Point(); 这段代码在(0,0)上创建了一个点。你也可以把这个作为一个二维向量，你可以在这个类中找到一些不同的向量相关函数。

&nbsp;

**Line**

通过指定起始点和结束点来创建一条直线。

&nbsp;

**Ellipse**

通过指定椭圆外接矩形的左上角坐标（指定 x 和 y 参数）、宽、高来创建一个椭圆。

&nbsp;

**Polygon**

多边形的点可以通过多种方式来设置：

1、点对象数组： [new Phaser.Point(x1, y1), ...]

2、包含 x/y 公共属性的对象数组： [obj1, obj2, ...]

3、包含表示坐标的成对数据的数组： [x1,y1, x2,y2, ...]

4、离散的 Point 参数： setTo(new Phaser.Point(x1, y1), ...)

5、离散的包含 x/y 公共属性的对象： setTo(obj1, obj2, ...)

6、离散的包含表示坐标的成对数据： setTo(x1,y1, x2,y2, ...)

&nbsp;

## 物理引擎Physics

**Arcade** **Physics**

Arcade 物理引擎。包含了一些碰撞、重叠、运动等函数。

&nbsp;

**Body**

刚体是一个单一的精灵，所有的物理操作都是针对这个刚体，而不是针对精灵本身。例如，你设置的速度、加速度、边界值都是针对的刚体。

&nbsp;

**P2** **Physics**

P2 物理引擎。你可以用来创建材料、监听事件、在物理仿真中添加刚体。

&nbsp;

**Body**

P2 物理引擎的刚体。注意，当刚体绑定到一个精灵的时候，为了避免在移动设备上单像素抖动，我们强烈建议使用精灵的尺寸并包含两个轴，例如，要使用 128x128 而不是 127x127。另外，在 P2 刚体的时候，它的 x/y 轴锚点为 0.5，也就是刚体的中心位置。

&nbsp;

**Spring**

创建一根线性的连接两个刚体的弹簧。弹簧有静止长度、阻尼、刚度等属性。

&nbsp;

**CollisionGroup**

碰撞组

&nbsp;

**ContactMaterial**

定义一种物理材料

&nbsp;

**Ninja** **Physics**

Ninja 物理引擎。本引擎由 Metanet 软件公司制作并用于 Flash，由 Richard Davey 发布JavaScript 版本。它允许使用 AABB（轴对齐矩形边界框）和圆形瓦片碰撞。瓦片可以是任意 34 种不同的类型，包括斜坡、凹凸形状。它目前发展的还算好，但是在扩展性和优化上还需要进一步成熟起来。这里有一些社区为它添加的特性：

1、AABB 与 AABB 的碰撞

2、AABB 与 Circle 的碰撞

3、支持 AABB 和 Circle 的“固定”属性

4、多路碰撞，这样 AABB 或者圆形就可以从下往上穿过瓦片，并停在上面

5、用于快速刚体和瓦片组查询的四叉树和空间网格

6、内部数学数量优化、减少临时变量的生成

7、扩展重力和边界功能，允许分离的 x/y 轴值

8、支持与精灵关联的刚体的锚点不一定是 0.5

你可以自由的使用上面的特性，并用你的代码提交 Pull 请求！一定要包含测试用例哦。

&nbsp;

## 输入Input

**Input** **Handler**

输入句柄会绑定到一个指定的精灵，并负责管理针对这个精灵的所有输入事件。

&nbsp;

**Pointer**

由鼠标、触摸和 MSPoint 管理器 使用，也触摸屏上的一个手指。

&nbsp;

**Mouse**

处理鼠标与浏览器的各种交互。

这个类捕捉了所有发生在游戏画布对象上的鼠标事件，同时也增加了一个鼠标抬起监听器，用于捕捉鼠标不在游戏上的鼠标按键释放事件。

&nbsp;

**Keyboard**

监控键盘输入、分发键盘事件。由于硬件限制，很多键盘无法处理一些组合按键。

&nbsp;

**Key**

如果你需要用指定按键实现更细的操作，你可以使用这个对象。

&nbsp;

**Gamepad**

处理游戏手柄输入和事件分发。请调用 gamepad.start()。目前还只处于实现阶段，并且只有部分浏览器支持。