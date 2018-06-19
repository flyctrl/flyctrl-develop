---
title: 深入分析详解Phaser状态管理(StateManager)
tags:
  - phaser StateManger
  - phaser状态管理
id: 1436
categories:
  - Phaser
date: 2015-08-29 23:18:29
---

当我们在玩一个简单的网页游戏的时候，其流程通常会包含以下步骤：

1、 出现一个载入进度条，载入一些必须的图片、音频、字体等文件；

2、 显示主菜单，提示用户开始游戏；

3、 进入游戏主逻辑。在游戏过程中，当用户胜利或者失败，或是触发了某个按钮或者按键时，游戏会退出，显示主菜单。

&emsp;&emsp;上面所述的每一个步骤，在 Phaser 中都可以用一个状态（State）来表示。因此上面的三个状态可概括为：
1、 加载资源

2、 显示主菜单，需监听并响应用户输入

3、 进入游戏逻辑，需监听并响应用户输入

&nbsp;

这三个状态可以进一步抽象为：

1、 加载资源

2、 创建主菜单界面元素（精灵、文字、图片等）、根据一定的规则和用户输入渲染界面

3、 创建主游戏界面元素（精灵、文字、图片等）、根据一定的规则和用户输入渲染界面

&nbsp;

&emsp;&emsp;这里出现个问题，在第一步加载资源中显示的进度条的资源是怎么来的呢？所以，我们需要加一个“游戏启动”这个状态，用于游戏最基本的一些变量的初始化，以及载入进度条的加载。最终的状态变为：

1、 加载资源（进度条素材）

2、 加载资源（游戏必要的其他素材）

3、 创建主菜单界面元素（精灵、文字、图片等）、根据用户输入和一定的规则渲染界面

4、 创建主游戏界面元素（精灵、文字、图片等）、根据用户输入和一定的规则渲染界面

&nbsp;

&emsp;&emsp;在这四个状态中，我们发现一个相同的部分：加载资源、创建游戏元素、根据用户输入和游戏规则渲染界面。在Phaser中，分别用这三个函数来表示：preload、create、update，也就是说，在一个State中，必须要包含preload、create、update三者中的一个或多个，这样才能构成一个完整的状态。实际上，在Phaser中还有render这个函数。Render用于渲染界面，是在游戏和插件的渲染之后再执行渲染，通常被用作后处理。Render这个函数平时用的很少，一般用于添加debug信息。状态已经定义好了，那如何对这些状态进行排序并顺序调用呢，在Phaser中，我们用状态管理器（StateManager）来管理状态。状态管理器包含了两个最常用函数add(key,state)和start(key)，分别用于添加状态和启动状态。其中，参数key表示对应于状态state的键值，key与state需一一对应，这样，以后需要对某个状态进行操作时，只需要对key进行操作即可。

&nbsp;

下面的框图展示了上面总结的四个状态与状态管理器的关系：
![1](http://www.npm8.com/wp-content/uploads/2015/08/16.png)
&emsp;&emsp;我们将四个状态分别命名为Boot，Preload，MainMenu，Game。其中，MainMenu和Game之间可相互跳转，当用户在主菜单界面上点击进入游戏，则进入 Game；当用户在游戏过程中胜利、失败或者按了某个按键，则退回到主菜单。

&nbsp;

下面是源代码：
```javascript
window.onload = function() {

//创建 Phaser 游戏，并注入到 gmeContainer 这个 div 容器中
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'container');

//添加四个的状态。game.state 是 Game 内部维护的一个 StateManager
game.state.add('Boot', BasicGame.Boot);
game.state.add('Preloader', BasicGame.Preloader);
game.state.add('MainMenu', BasicGame.MainMenu);
game.state.add('Game', BasicGame.Game);

//启动 Boot 状态
game.state.start('Boot');
};
var BasicGame = {
};
```
下面是四个状态的定义。

**第一个状态：**
```javascript
BasicGame.Boot = function(game) {
};

BasicGame.Boot.prototype = {

init: function() {

//如果你很明确的知道你的游戏需要支持多点触摸，你可以把这个设置为 1
this.input.maxPointers = 1;

if (this.game.device.desktop) {
//如果你有一些特殊的桌面相关的设置，你可以放在这里
} else {
//移动设备相关的设置
//在这里我们定义了：“缩放游戏，不小于 480x260, 不超过 1024x768”
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
this.scale.setMinMax(480, 260, 1024, 768);
this.scale.forceLandscape = true;
}
this.scale.pageAlignHorizontally = true;
this.scale.pageAlignVertically = true;
},

preload: function() {
//在这里，我们载入了 preloader 所需的资源（一个载入进度条）
this.load.image('preloaderBar', 'assets/preloader-bar.png');
},

create: function() {
//当游戏把 preloader 相关资源载入缓存，进入真正的 preloader
this.state.start('Preloader');
}

};
```
&nbsp;

**第二个状态：**

```javascript
BasicGame.Preloader = function(game) {
this.background = null;
this.preloadBar = null;
};

BasicGame.Preloader.prototype = {

preload: function() {

//添加载入进度条
this.stage.backgroundColor = '#2d2d2d';

this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2,'preloaderBar');
this.add.text(this.game.width / 2, this.game.height / 2 - 30, "Loading...", {font: "32px monospace",fill:"#fff"}).anchor.setTo(0.5, 0.5);

//这里把 preloadBar 精灵设置为一个载入器精灵。当文件在载入时，他会自动从0 到全长进行裁剪长度
this.load.setPreloadSprite(this.preloadBar);

//开始加载游戏所需的剩下的精灵、图片、精灵表、音频文件等
this.load.image('titlepage', 'assets/titlepage.png');
this.load.image('bullet', 'assets/bullet.png');
this.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
this.load.audio('explosion', ['assets/explosion.ogg', 'assets/explosion.wav']);
this.load.audio('playerExplosion', ['assets/player-explosion.ogg',
'assets/player-explosion.wav']);
},

create: function() {
//当加载完成后，禁止裁剪载入条，因为在音乐解码之后，将进入 update 循环
this.preloadBar.cropEnabled = false;
},

update: function() {

//这样能提供一个更好的游戏体验
//它会在进入 MainMenu 前等待我们的音频文件解码完毕
//如果你直接跳到主菜单，音乐仍然可以播放，但是会有几秒钟的延迟，因为这个时候 mp3 正在解码
//所以，如果你需要音乐与菜单同步，最好就在这里等待解码结束

//如果游戏中没有音乐文件，可以把 game.state.start 这一行代码放到 create 函数中，并完全删除 update 这个函数。

if (this.cache.isSoundDecoded('titleMusic') &amp;&amp; this.ready == false)
{
this.ready = true;
//进入 MainMenu 状态
this.state.start('MainMenu');
}
}
};
```
&nbsp;

**第三个状态：**

```javascript
BasicGame.MainMenu = function (game) {

this.music = null;
this.playButton = null;

};

BasicGame.MainMenu.prototype = {

create: function () {

//我们已经把所有资源都加载进来了，所以，现在可以进入主菜单
//在这里，我们将播放一段音乐，添加一张图片和一个按钮

this.add.sprite(0, 0, 'titlepage');

this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Press Z or tap/click game to start", { font: "20px monospace", fill: "#fff" });
this.loadingText.anchor.setTo(0.5, 0.5);
this.add.text(this.game.width / 2, this.game.height - 90, "image assets Copyright (c) 2002 AriFeldman", {font:"12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
this.add.text(this.game.width / 2, this.game.height - 75, "sound assets Copyright (c) 2012 -2013 Devin Watson", {font: "12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);

},

update: function () {

if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
this.startGame();
}
//在这里可以做一些漂亮的主菜单效果

},

startGame: function (pointer) {

//开始按钮已经被点击或者触摸了，停止音乐播放
this.music.stop();

//进入真正的游戏
this.state.start('Game');

}

};
```
&nbsp;

**第四个状态：**

```javascript
BasicGame.Game = function(game) {

};

BasicGame.Game.prototype = {

create: function() {
// 创建游戏背景、玩家、敌人、子弹、文字、音频等，并启动监听键盘输入
this.setupBackground();
this.setupPlayer();
this.setupEnemies();
this.setupBullets();
this.setupText();
this.setupAudio();

this.cursors = this.input.keyboard.createCursorKeys();
},

update: function() {
// 检测碰撞、生成敌人、开火、响应玩家输入，任何东西都可以放在这里
this.checkCollisions();
this.spawnEnemies();
this.enemyFire();
this.processPlayerInput();

if(…) {
quitGame(); 
}
}

quitGame: function(pointer) {

//  在这里，你应该销毁你不再需要的东西：停止播放音乐、删除精灵、清空缓存、释放资源等等
this.player.destroy();
this.enemyPool.destroy();
this.bulletPool.destroy();
this.shooterPool.destroy();
this.scoreText.destroy();
this.returnText.destroy();

//  然后，回到主菜单
this.state.start('MainMenu');

}
}
```
下面我们来看下 Phaser.js 中是如何对状态进行管理和调用的。Game初始化中，等设备准备好之后执行boot函数：
```javascript
// core/Game.js
this.device.whenReady(this.boot, this);
```
Game.boot()中调用包装了浏览器动画绘制方法的 Phaser.RequestAnimationFrame：
```javascript
// core/Game.js
this.raf = new Phaser.RequestAnimationFrame(this, false);
this.raf.start();
```
Phaser.RequestAnimationFrame.start()中会调用系统函数 window.requestAnimationFrame（需浏览器支持，如果不支持，则改为调用 window.setTimeout）：
```javascript
// system/RequestAnimationFrame.js
start: function () {
…
this._timeOutID = window.requestAnimationFrame(this._onLoop);
….
}
//让浏览器不停地调用 this._onLoop，进而调用 this.game.update()
Phaser.RequestAnimationFrame._onLoop = function() {
……
this.game.update(Math.floor(rafTime));
this._timeOutID = window.requestAnimationFrame(this._onLoop);
……
}
```
在 Game.update 中调用了 updateLogic，在 updateLogic 中会对缩放、调试、世界、物理引擎、转改、插件、舞台进行更新：
```javascript
// core/Game.js
Game.update(time) {
……
updateLogic(timeStep);
……
}

Game.updateLogic(timeStep) {
……
this.scale.preUpdate();
this.debug.preUpdate();
this.world.camera.preUpdate();
this.physics.preUpdate();
// 在这个函数中将获取待执行的状态，即用户调用了 Phaser.StateManager.start(key)时，key对应的状态。
// 然后调用状态的 preload 和 create 方法
this.state.preUpdate(timeStep);
this.plugins.preUpdate(timeStep);
this.stage.preUpdate();

//这里会调用状态的 update 方法
this.state.update();
this.stage.update();
this.tweens.update(timeStep);
this.sound.update();
this.input.update();
this.physics.update();
this.particles.update();
this.plugins.update();

this.stage.postUpdate();
this.plugins.postUpdate();
…… 

}
```
&emsp;&emsp;这里只是对一个简单游戏的状态管理进行分析，我们还可以这个演示程序进行优化，例如在游戏启动时只加载主菜单所需的资源，以提高游戏启动的速度。然后在每进入一关时，加载这一关所必须的资源。这样能更好的改善用户体验。