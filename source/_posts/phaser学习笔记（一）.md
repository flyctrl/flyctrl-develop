---
title: H5游戏开发之phaser学习笔记（一）
tags:
  - phaser
id: 1232
categories:
  - Phaser
date: 2015-08-19 23:11:39
---

1、Phaser.Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
width: 游戏的宽度,也就是用来渲染游戏的canvas的宽度，单位为px

height: 游戏的高度，也就是用来渲染游戏的canvas的高度，单位为px

renderer: 使用哪种渲染方式，Phaser.CANVAS 为使用html5画布，Phaser.WEBGL 为使用性能更加好的WebGL来渲染，Phaser.AUTO为自动侦测，如果浏览器支持WebGL则使用WebGL,否则使用Canvas

parent: 用来放置canvas元素的父元素，可以是一个元素id，也可以是dom元素本身，phaser会自动创建一个canvas并插入到这个元素中。

state: state可以理解为场景，在这里指定state表示让游戏首先加载这个场景，但也可以不在这里指定state，而在之后的代码中决定首先加载哪个state。关于state我后面还会有详细的说明。

transparent: 是否使用透明的canvas背景

antialias: 是否启用抗锯齿

physicsConfig: 游戏物理系统配置参数

**实例：**

var game = new Phaser.Game(288,505,Phaser.AUTO,'game'); //实例化一个Phaser的游戏实例

&nbsp;

2、setPreloadSprite>(sprite, direction)

sprite：在加载过程中会出现的精灵或图像。

direction：等于0精灵将被水平裁剪，等于1精灵将被垂直裁剪

**实例：**
var preloadSprite=game.add.sprite(34,game.height/2,'loading');

game.load.setPreloadSprite(preloadSprite); //用setPreloadSprite方法来实现动态进度条的效果，preloadSprite为load的精灵

Loader对象提供了一个

[setPreloadSprite](http://docs.phaser.io/Phaser.Loader.html#setPreloadSprite) 方法，只要把一个sprite对象指定给这个方法，那么这个sprite对象的宽度或高度就会根据当前加载的百分比自动调整，达到一个动态的进度条的效果。

&nbsp;

3、new TileSprite(game, x, y, width, height, key, frame)
x：tilesprite的x坐标

y：tilesprite的y坐标

width：tilesprite的宽度

height：tilesprite的高度

key：要使用sprite的key值

frame：tilesprite使用精灵的帧

TileSprite本质上还是一个sprite对象，不过这个sprite的贴图是可以移动的，并且会自动平铺来弥补移动后的空缺，所以我们的素材图片要是平铺后看不出有缝隙，就可以拿来当做TileSprite的移动贴图了。TileSprite的贴图既可以水平移动也可以垂直移动，或者两者同时移动，我们只需要调用TileSprite对象的autoScroll(x,y)方法就可以使它的贴图动起来了，其中x是水平方向的速度，y是垂直方向的速度。

**实例：**

var bg = game.add.tileSprite(0,0,game.width,game.height,'background'); //当作背景的tileSprite

var ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //当作地面的tileSprite

bg.autoScroll(-10,0); //让背景动起来

ground.autoScroll(-100,0); //让地面动起来

&nbsp;

4、spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing)

key : 给这张图片指定的名称，以后在创建sprite等对象时会要用到的

url: 图片的地址

frameWidth :  图片中每帧的宽度

frameHeight : 图片中每帧的高度

frameMax : 最多有几帧

margin : 每帧的外边距

spacing : 每帧之间的间隔

**实例：**

game.load.spritesheet('bird','assets/bird.png',34,24,3); //鸟

&nbsp;

5、：[Phaser.Group](http://docs.phaser.io/Phaser.Group.html)，也就是组。组相当于一个父容器，我们可以把许多对象放进一个组里，然后就可以使用组提供的方法对这些对象进行一个批量或是整体的操作。比如要使组里的对象同意进行一个位移，只需要对组进行位移就可以了，又比如要对组里的所有对象都进行碰撞检测，那么就只需要对这个组对象进行碰撞检测就行了。下面我们要制作的这个游戏标题是由一张文字图片和一支鸟组成的，我们就是把这两个东西放在一个组中，然后来进行整体的操作。
方法：create(x,y,key) 通过组的create方法创建标题图片并添加到组里

**实例：**

var titleGroup=game.add.group();//创建存放标题的组

titleGroup.create(0,0,'title');//通过组的create方法创建标题图片并添加到组里

var bird=titleGroup.create(190,10,'bird');

&nbsp;

6、sprite对象有个[animations](http://docs.phaser.io/Phaser.Sprite.html#animations)属性，代表的是Phaser中专门管理动画的对象：[AnimationManager](http://docs.phaser.io/Phaser.AnimationManager.html)，该对象有一个add方法，用来添加动画，还有一个play方法，用来播放动画

add(name, frames, frameRate,loop,useNumericIndex)

name: 动画名称，即“运行”，“火”，“走”。

frames:对应于该帧的数字/字符串数组，以添加到该动画中，并在该命令中。例如，[ 1，2，3 ]或[ 'run0 '，'run1，run2 ]）。如果空所有帧将被使用。

frameRate:动画应该发挥的速度。每秒的速度是按每秒的帧进行的。

loop:是否循环

useNumericIndex:是否使用数字索引（默认）或字符串的给定的帧

play(name, frameRate,loop,killOnComplete)

name：要播放动画的名称

frameRate:帧频率

loop：是否循环

killOnComplete：如果设置为真，当动画完成时（只有loop==false）父精灵将被杀死。

**实例：**

bird.animations.add('fly'); //给鸟添加动画

bird.animations.play('fly',12,true);//播放动画

titleGroup.x = 35; //调整组的水平位置

titleGroup.y = 100; //调整组的垂直位置

&nbsp;

7、Tween对象，是专门用来实现补间动画的。通过game.add的tween方法得到一个Tween对象,这个方法的参数是需要进行补间动画的物体。然后我们可以使用Tween对象的to方法来实现补间动画。

to(properties, duration, ease, autoStart, delay, repeat, yoyo)

properties :

一个js对象，里面包含着需要进行动画的属性，如上面代码中的 {y:120}

duration : 补间动画持续的时间，单位为毫秒

ease : 缓动函数，默认为匀速动画

autoStart : 是否自动开始

delay : 动画开始前的延迟时间，单位为毫秒

repeat : 动画重复的次数，如果需要动画永远循环，则把该值设为 Number.MAX_VALUE

yoyo : 如果该值为true,则动画会自动反转

**实例：**

game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true); //对这个组添加一个tween动画，让它不停的上下移动

&nbsp;

**PS：**
1、game.add代表的是[Phaser.GameObjectFactory](http://docs.phaser.io/Phaser.GameObjectFactory.html)对象，该对象提供了了一系列快捷方法来方便我们创建游戏的各种组件。

2、sprite对象有个[animations](http://docs.phaser.io/Phaser.Sprite.html#animations)属性，代表的是Phaser中专门管理动画的对象：[AnimationManager](http://docs.phaser.io/Phaser.AnimationManager.html)，该对象有一个add方法，用来添加动画，还有一个play方法，用来播放动画

&nbsp;