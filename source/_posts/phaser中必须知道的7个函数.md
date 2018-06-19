---
title: Phaser中必须知道的7个函数
tags:
  - phaser函数
id: 1681
categories:
  - Phaser
date: 2015-09-17 10:34:22
---

Phaser有很多能在游戏特定阶段执行的函数，分别用来保存特定代码：

**preload**

这是整个游戏最先执行的函数，可以用来加载游戏所需的资源，例如：game.load.image()等等。

注意：当此函数执行时，游戏并不会执行update和render函数，取而代之的是2个特殊的函数(如果它们存在的话)：loadUpdate and loadRender.

preload的功能并不只是加载资源，它还可以用来初始化整个游戏世界，比如设置canvas背景颜色，游戏屏幕适配模式。无论如何都要保证代码条理清晰，否则，我只能建议你只做加载资源的事。这个函数是自动加载的，不需要调用。

**loadUpdate**

如上文所说，这个函数只在加载资源的时候被调用，可以用来设置游戏的加载进度条(Phaser提供了更简单的方法，具体可以参考Phaser游戏开发教程-Monster-Wants-Candy).

**loadRender**

这个函数不是必须的，在游戏开发过程一般不会调用。（尤其不适合WebGL的游戏）**
**

**create**

preload执行完成后自动调用此函数(create), 同样的，如果你不需要加载资源或者没有preload函数，create就是Phaser第一个调用的函数，在create函数里可以用来创建精灵(sprite),粒子(particles)和任何你需要的使用preload加载的资源，整个游戏的大部分代码都将在这里完成，创建游戏对象等等...

**update**

这个函数对于游戏开发者来说一定不陌生，游戏的每一帧都会调用它，每秒60帧，通过它你可以完成Input的监听，碰撞检测等等，这是整个游戏的核心。

**render**

**此函数在WebGL/canvas渲染之后执行，一般用来抓取Debug信息。例如：当我开始开发一个游戏时，把游戏渲染模式切换到canvas，使用render函数去绘制debug信息在游戏上方。**

一旦每帧的渲染完成，就会又一次回到update函数。

**resize**

这个函数在Phaser2.1.0版本中介绍过，只有在游戏改变适配模式的时候调用，有两个变量，新的游戏width和height。**
**

**shutdown**

state被关闭是调用(比如切换state时)。

在游戏中我们不能使用以上的函数名，就像不能使用系统的保留关键字一样。

以上的方法都属于Phaser的State对象，包含一组默认的属性：
```javascript
/**
* @property {Phaser.Game} game - This is a reference to the currently running Game.
*/this.game = null;/**
* @property {Phaser.GameObjectFactory} add - A reference to the GameObjectFactory which can be used to add new objects to the World.
*/this.add = null;/**
* @property {Phaser.GameObjectCreator} make - A reference to the GameObjectCreator which can be used to make new objects.
*/this.make = null;/**
* @property {Phaser.Camera} camera - A handy reference to World.camera.
*/this.camera = null;/**
* @property {Phaser.Cache} cache - A reference to the game cache which contains any loaded or generated assets, such as images, sound and more.
*/this.cache = null;/**
* @property {Phaser.Input} input - A reference to the Input Manager.
*/this.input = null;/**
* @property {Phaser.Loader} load - A reference to the Loader, which you mostly use in the preload method of your state to load external assets.
*/this.load = null;/**
* @property {Phaser.Math} math - A reference to Math class with lots of helpful functions.
*/this.math = null;/**
* @property {Phaser.SoundManager} sound - A reference to the Sound Manager which can create, play and stop sounds, as well as adjust global volume.
*/this.sound = null;/**
* @property {Phaser.ScaleManager} scale - A reference to the Scale Manager which controls the way the game scales on different displays.
*/this.scale = null;/**
* @property {Phaser.Stage} stage - A reference to the Stage.
*/this.stage = null;/**
* @property {Phaser.Time} time - A reference to the game clock and timed events system.
*/this.time = null;/**
* @property {Phaser.TweenManager} tweens - A reference to the tween manager.
*/this.tweens = null;/**
* @property {Phaser.World} world - A reference to the game world. All objects live in the Game World and its size is not bound by the display resolution.
*/this.world = null;/**
* @property {Phaser.Particles} particles - The Particle Manager. It is called during the core gameloop and updates any Particle Emitters it has created.
*/this.particles = null;/**
* @property {Phaser.Physics} physics - A reference to the physics manager which looks after the different physics systems available within Phaser.
*/this.physics = null;/**
* @property {Phaser.RandomDataGenerator} rnd - A reference to the seeded and repeatable random data generator.
*/this.rnd = null;
```
再次提醒：以上都是phaser保留字段，如果你喜欢，你可以重写或者替换它们，但不太容易哦。