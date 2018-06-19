---
title: H5游戏开发之phaser学习笔记（二）
tags:
  - phaser笔记
id: 1272
categories:
  - Phaser
date: 2015-08-29 01:20:25
---

## **一、启用物理系统**

默认的游戏中的每个对象的物理系统是关闭的，要启用一个对象的物理系统，可以使用 game.physics.enable() 方法
enable(object, system, debug)

object : 要开启物理系统的对象，可以是单个对象，也可以是一个包含多个对象的数组

system : 要启用的物理系统，默认为 Phaser.Physics.ARCADE，Phaser目前支持三种物理引擎，分别是Arcade ，P2 以及 Ninja。

debug : 是否开启调试

只有开启了对象的物理系统，该对象才具有物理特性，开启了物理系统后，对象的body属性指向该对象拥有的物理系统，所有与物理相关的属性或方法都必须在body上进行操作。

**实例：**

```javascript
game.physics.enable(this.bird,Phaser.Physics.ARCADE); //开启鸟的物理系统
this.bird.body.gravity.y = 0; //鸟的重力,未开始游戏，先让重力为0，不然鸟会掉下来
game.physics.enable(this.ground,Phaser.Physics.ARCADE);//开启地面的物理系统
this.ground.body.immovable = true; //让地面在物理环境中固定不动
```
## **二、鼠标点击事件**

addOnce(listener, listenerContext, priority, args)

listener：当发送此信号时，该函数调用。

listenerContext：表示该变量的对象。

priority：事件侦听器的优先级级别。具有较高优先级的侦听器将在较低优先级的侦听器前执行。具有相同优先级的侦听器将按相同的顺序执行（默认值= 0）

args：附加的参数传递给回调函数。在任何参数通常被调度的参数之后，它们将被追加。

Phaser中的鼠标、键盘、触摸等交互事件都统一由[Input对象](http://docs.phaser.io/Phaser.Input.html)来处理。我们需要鼠标点击屏幕后进行响应，可以使用Input对象的[onDown](http://docs.phaser.io/Phaser.Input.html#onDown)属性，该属性指向一个[Phaser.Signal](http://docs.phaser.io/Phaser.Signal.html)对象，我们可以在这个对象上绑定事件，每当鼠标按键下，就会触发一个onDown的信号，如果这个onDown信号对象上绑定了事件，那么这些事件就会执行。例如：

```javascript
var input = game.input; //当前游戏的input对象
var signal = input.onDown; //鼠标按下时的 Signal对象
signal.add(function(){}); //给Signal 绑定事件处理函数
signal.add(function(){}); //再绑定一个
signal.addOnce(function(){}); //绑定一个只会执行一次的事件函数
```
```javascript
game.input.onDown.addOnce(this.statrGame, this); //点击屏幕后正式开始游戏
```
## **三、时钟对象**

有时我们需要定时或者每隔一段时间就执行一段代码，在原生js中我们可以通过setTimeout和setInterval来实现。Phaser给我们提供了功能更强大的[Timer](http://docs.phaser.io/Phaser.Timer.html)对象来实现这些功能。Timer对象主要有以下几个方法：
```javascript
loop(delay, callback, callbackContext, arguments); //以指定的时间间隔无限重复执行某一个函数，直到调用了Timer对象的stop()方法才停止
repeat(delay, repeatCount, callback, callbackContext, arguments); //让某个函数重复执行，可以指定重复的次数
```
当前的Timer对象我们可以通过 game.time.events 来得到，在调用了Timer对象的loop或repeat方法后，还必须调用start方法来启动。但是我使用的Phaser 2.0.4 版本，好像不调用start方法，loop方法就自动起作用了，不知道这是不是一个bug。如上面代码中我们用到的：
```javascript
game.time.events.loop(900, this.generatePipes, this); //利用时钟对象来重复产生管道
game.time.events.stop(false); //先让他停止，因为即使没调用start方法，它也会自动启动，这应该是一个bug
```

## **四、按钮对象**

button(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group)

x：x轴位置

y：y轴位置

key：图像的名称（或精灵）

callback：单击该按钮时执行的函数

callbackContext：该函数执行环境

传递给函数的意义 1 0 2 它们分别代表按钮的不同状态：over（鼠标悬停），out（正常），和down（触摸或点击）

**实例：**

this.startButton = this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10,'button-start', this.startGame, this, 1, 0, 2);

其他的小结：

1、game.input.maxPointers=1;//游戏不需要多点触摸

2、scale.scalemode 控制游戏的旋转。可用的设置有： exact_fit ，no_scale 和 show_all你可以枚举他们，使用数值0，1，或2。exact_fit，将最大化游戏；no_scale将禁用缩放；show_all将确保游戏符合给定的尺寸，一切都会显示在屏幕上（按比例缩放 ）。 

将 scale.pagealignhorizontally 和 scale.pagealignvertically 设为 true  ，将使游戏在水平和垂直方向居中。 
调用 scale.setScreenSize(true) “激活”缩放。 

3、启动物理引擎的几种方式：

A、
game.physics.startSystem(Phaser.Physics.ARCADE);
game.physics.arcade.gravity.y=200;

B、
game.physics.enable(candy, Phaser.Physics.ARCADE);

4、candy.inputEnabled = true; 如果启用了输入处理程序，将处理输入请求并监视指针活动。

5、candy.checkWorldBounds = true;保证精灵离开游戏屏幕时被销毁