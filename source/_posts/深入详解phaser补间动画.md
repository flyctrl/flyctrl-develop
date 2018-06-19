---
title: 深入详解Phaser补间动画
tags:
  - Phaser tween
  - Phaser补间动画
id: 1748
categories:
  - Phaser
date: 2015-09-22 22:58:30
---

## Tweens是什么?

&emsp;&emsp;Tweens通常被称为补间动画。补间动画是指在确定好两个关键帧之后，由计算机自动生成这两帧之间插补帧，从而实现动画的过程。例如，物体从当前位置在两秒内向右移动200个像素，只要设置好目标位置（当前位置的右边200像素）和时长（两秒），则计算机会自动生成补间动画，在两秒内使物体从当前位置移到目标位置。

## 创建一个Tween

**补间的目标对象**
最常见的创建一个补间动画的语句如下所示：
```javascript
var tween =this.game.add.tween(this.sprite).to({ x: 400 }, 5000,Phaser.Easing.Linear.None, false, 0, -1, true);
tween.start();
```
第一句：调用Phaser.Game中的补间管理类创建一个补间动画tween。this.sprite表示针对这个精灵创建动画，这里也可以是一个组。to()函数是最关键的函数，记录着精灵的属性变化、时长及其他相关属性，关于这个函数，我们将在下文最详细的介绍。

第二句：启动动画。

**Tween.to**
to(properties, duration, ease, autoStart, delay, repeat, yoyo)
设置目标值。补间将从当前属性值变为to函数设置的值（参数properties）

其参数如下：

properties 包含补间属性的对象，例如`Sprite.x` ， `Sound.volume`。这个参数表示目标关键帧中精灵的属性；

duration=1000 补间持续时长，单位毫秒；

ease=null 缓动函数。 可以用数学公式控制动画，这样就可以实现加速以及减速效果，或者向动画添加特殊效果，比如弹跳效果；

将在下文重点介绍。

autoStart=false 补间是否自动开始；

delay=0 启动延时，单位毫秒；

repeat=0 重复次数。-1表示不停地重复。只对本补间有效，对串联的补间无效；

yoyo=false 是否自动反过来回放。如果设置为true，则不会触发onComplete，所以应监听onLoop；

在下面这几句示例代码中，分别设置了平移、旋转、透明度变化的

补间动画：
```javascript
// 平移
this.add.tween(boss).to({x:20, y: 20}, 2000, Phaser.Easing.Linear.None)

// 旋转
seaLifeTween.to({angle: -gameTitleSeaLife.angle},5000,Phaser.Easing.Linear.None,true,0,1000,true);

// 透明度
fadeTween.to({ alpha:0},2000,Phaser.Easing.Cubic.Out,true);
```
**Tween.from**

from(properties,duration, ease, autoStart, delay, repeat, yoyo)
设置起始值。补间将从from函数设置的属性值变为当前值
参数及其含义与to函数相同、

## Tween常用方法

**重复**

**repeat(total, index=0)**

设置tween重复次数。total：重复次数，0表示不重复，-1表示一直重复。index：子tween编号。本函数可以对某个子tween单独设置重复次数，-1表示对所有的子tween进行设置

**repeatAll(total)**

设置当前tween和所有子tween的重复次数。tween A和三个子tween B,C,C，重复次数为2，则运行结果为：ABCDABCD，然后再调用onLoop。total：重复次数，0表示不重复，-1表示一直重复。

**loop(value=true)**

设置tween及其子tween是否循环。如果没有子tween，则此函数无效；如果传入true，则相当于Tween.repeatAll(-1)，如果传入false，则相当于Tween.repeatAll(0)。

&emsp;&emsp;下面这段代码使精灵先右移400像素，再下移250像素，再左移400像素，再上移250像素，然后不断重复上面四步。实际上这个精灵就是不断的在画一个矩形。
```javascript
this.game.add.tween(this.sprite)
.to({ x: 400 }, 2000)
.to({ y: 250 }, 2000)
.to({ x: 0 }, 2000)
.to({ y: 0 }, 2000).loop().start();
```
**启停**
pause();

**暂停补间**
resume();

**继续补间**
start(index=0)

启动补间，并调用onStart。index：指定某个子tween启动

stop(complete=false)

结束补间。如果补间正在运行，则设置一个结束标志。complete表示这个补间是否已经结束。只有当complete设置为true的时候，才会调用onComplete，并启动串联的tween。

**反向**

yoyo(enable, index= 0)

如果enable设置为true，则补间先从from到to，然后再从to到from。如果设置为false，则可以禁用已经激活的yoyo。index：子tween编号，-1表示所有子tween

## **缓动函数**

&emsp;&emsp;缓动函数是用来指定动画效果在执行时的速度，使其看起来更加真实。现实物体照着一定节奏移动，并不是一开始就移动很快的。例如，当我们打开抽屉时，首先会让它加速，然后慢下来。当某个东西往下掉时，首先是越掉越快，撞到地上后回弹，最终才又碰触地板。

在Phaser中内置了十一种缓动函数：
```javascript
Phaser.Easing() {
Phaser.Easing.Linear 线性
Phaser.Easing.Quadratic 二次次
Phaser.Easing.Cubic 三次方。创建使用公式image 加速和/或减速的动画。 与圆缓冲类似，但是是基于立方体函数的时间来产生一个一开始加速度较慢然后越来越快的动画。
Phaser.Easing.Quartic 四次方
Phaser.Easing.Quintic 五次方
Phaser.Easing.Sinusoidal 正弦
Phaser.Easing.Exponential 指数
Phaser.Easing.Circular 圆形。创建使用循环函数加速和/或减速的动画。 基于三角函数（圆函数）来加速动画，一开始的加速度比较慢，越往后加速度越快。
Phaser.Easing.Elastic 弹性
Phaser.Easing.Back 倒退。让动画在继续之前往后退一点。这有点象在斜坡上启动汽车，会往后倒退一点然后才前进。
Phaser.Easing.Bounce 反弹。有弹回效果的动画，类似篮球落下，弹起，再落下，即弹跳反冲。
}
```
其中，Phaser.Easing.Linear是最基本的匀速运动。
另外十种动画示例如下（摘自[http://easings.net/zh-cn](http://easings.net/zh-cn)）：


## Tween 事件

**onStart**

Tween开始的时候调用。如果在tween开始之前有一个延时，则要等延时结束后才调用onStart

**onRepeat**

当Tween和他的所有子Tween重复的时候调用。如果Tween没有子Tween，则不会调用

**onLoop**

Tween或者子Tween循环的时候调用

**onComplete**

&emsp;&emsp;当Tween和他的所有子Tween都结束时候调用。如果Tween设置为循环或者repeatAll(-1)，则不会调用。这个函数是最常用的，例如，当补间动画ballTween结束的时候，触发adjustBalances()函数，在adjustBalances()函数中又创建了另一个补间动画balanceTween，在其结束时触发函数allowBallFalling()：
```javascript
ballTween.onComplete.add(adjustBalances,this);

function adjustBalances(){
var balanceTween = game.add.tween(……);
……
balanceTween.onComplete.add(allowBallFalling)
}

function allowBallFalling(){
……
}
```
**onChildComplete**

当Tween或者他的任意一个子Tween结束时调用。每一个子Tween结束的时候都会调用，除非无限循环下去


## Phaser内部如何管理Tweens

**补间管理器**

在Game类中维护了一个补间管理器tweens：
```javascript
// core/game.js
Phaser.Game () {
this.tweens = new Phaser.TweenManager(this);
}
```

补间管理里主要用来管理补间动画，常用的有增加、删除、暂停、继续某个补间动画：
```javascript
// tween/TweenManager.js
Phaser.TweenManager() {
add(tween);
remove(tween);
pauseAll();
resumeAll();
}
```

**补间接口**

```javascript
// tween/Tween.js
// 生成
to(properties, duration, ease, autoStart,delay, repeat, yoyo)
from(properties, duration, ease, autoStart,delay, repeat, yoyo)

// 控制
loop(value=true)
repeat(total, index=0)
repeatAll(total)
pause();
resume();
start(index=0)
stop(complete=false)
yoyo(enable, index= 0)

// 响应
this.onStart(target, this);
this.onLoop(target, this);
this.onRepeat(target, this);
this.onChildComplete(target, this);
this.onComplete(target, this);
```
on开头的响应函数返回的都是Phaser.Signal()，Signal具有如下方法：
```javascript
// Core/Signal.js
add()
addOnce() 一次性的，即调用之后就会被删掉
remove()
removeAll()
```
&nbsp;