---
title: Phaser新手教程：开发”怪物要糖果“游戏
tags:
  - phaser 怪物要糖果demo
  - phaser教程
id: 1421
categories:
  - Phaser
date: 2015-08-29 22:41:45
---

在这个特别长的教程里，我将详细解释“怪物要糖果”的代码。这是一个多平台游戏，使用Phaser（HTML5游戏引擎）制作。这样你就可以了解Phaser，并将学到的技巧用来创建你自己的HTML5游戏。

### **说明**

如果你想制作HTML5游戏，最好选择一个框架或引擎。你可以用JavaScript写游戏，但使用一个框架，会大大提高开发效率。

Phaser是一个新的HTML5游戏开发框架，如果你第一次听说它，那一定要试一试。

### **Phaser是什么？**

Phaser是由Photon Storm开发的HTML5游戏框架。该框架用纯JavaScript编写，但也包含TypeScript定义文件 。

Phaser 是基于Flash游戏开发平台 Flixel编写的，所以Flash开发者会感到很熟悉。它使用pixi.js 引擎在屏幕上用Canvas或WebGL渲染。

![](http://www.npm8.com/wp-content/uploads/2015/08/eee-650x476.png)

这是相当新的引擎，在活跃社区[html5gamedevs](http://www.html5gamedevs.com/forum/14-phaser/)的帮助下增长迅速。已经有 [很多的教程和文章](http://www.lessmilk.com/phaser-tutorial/) 可以找到，你也可以查阅 [官方文档](http://docs.phaser.io/) ，里面收集了大量的 [开发实例](http://examples.phaser.io/) ，是非常有用的。Phaser是[开源](https://github.com/photonstorm/phaser)的，你可以直接深入了解并学习它的源代码。

Phaser 最新的稳定版，是2.0\. 7。

### **什么是怪物要糖果？**

当我开始制作游戏，首先确定核心玩法，并尝试迅速建立了一个[游戏原型](http://candy-demo.enclavegames.com/)。在这个案例中，我们从一个相当简单的演示 发展出来的游戏名字叫 [怪物要糖果](http://enclavegames.com/games/monster-wants-candy/) 。 首先我会告诉你项目的结构，所以你可以理解整个游戏玩法。我们将根据游戏运行的逻辑顺序来讲解：装载图片资源，创建主菜单，实际的游戏循环。你可以[试玩怪物要糖果](http://candy-demo.enclavegames.com/)。

[![monster-demo-screens](http://www.npm8.com/wp-content/uploads/2015/08/monster-demo-screens.jpg)](http://www.npm8.com/wp-content/uploads/2015/08/monster-demo-screens.jpg)

怪物要糖果的故事很简单：邪恶的国王绑架了你的爱人，你必须收集足够多的糖果才能让她回来。玩法很简单：糖果掉落下来，你可以点击吃掉它们。你吃糖果越多，积分就越高，就会有更好的糖果被解锁。如果你让糖果掉出来屏幕，就会减少生命，然后游戏就结束了。

正如你所看到的，这是一个非常简单但结构完整的游戏。你会发现框架的最重要的用途是，载入图像，绘制精灵以及检测用户活动。这是一个很好的开始，你可以复制代码，研究它们，制作你自己的游戏。

### **项目设置及结构**

你可以阅读框架作者写的“[如何开始使用Phaser](http://gamedevelopment.tutsplus.com/articles/how-to-learn-the-phaser-html5-game-engine--gamedev-13643)” ，或者可以从[GitHub](https://github.com/photonstorm/phaser/blob/master/build/phaser.min.js)复制 phaser.min.js 文件到你的项目目录。不需要IDE，点击 index.html就可以在浏览器 文件立即看到源代码所做的更改。

我们的项目目录中包含 index.html 文件（包括HTML5结构和所有必要的JS文件）。还有两个子目录：

IMG目录，里面是美术资源，SRC目录，里面是游戏的源代码。

这里是目录结构预览：

[![1](http://www.npm8.com/wp-content/uploads/2015/08/15.png)](http://www.npm8.com/wp-content/uploads/2015/08/15.png)

在 SRC 目录，你会看到JavaScript文件。在本教程中，我将描述在该文件夹中的所有文件的内容和用途。 你可以看到每个文件的[源代码](https://github.com/tutsplus/Monster-Wants-Candy-demo)。

**index.html **

我们从index.html 文件开始。它看起来像一个HTML5网站，但代替文本和HTML元素是Phaser框架渲染的Canvas元素。
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Monster Wants Candy demo</title>
<style> body { margin: 0; background: #B4D9E7; } </style>
<script src="src/phaser.min.js"></script>
<script src="src/Boot.js"></script>
<script src="src/Preloader.js"></script>
<script src="src/MainMenu.js"></script>
<script src="src/Game.js"></script>
</head>
<body>
<script>
(function() {
var game = new Phaser.Game(640, 960, Phaser.AUTO, 'game');
game.state.add('Boot', Candy.Boot);
game.state.add('Preloader', Candy.Preloader);
game.state.add('MainMenu', Candy.MainMenu);
game.state.add('Game', Candy.Game);
game.state.start('Boot');
})();
</script>
</body>
</html>
```
我们在`<head>` 标签定义文档：字符集编码，网页标题以及CSS样式。通常我们会引用外部CSS文件，但在这里不需要，正如我前面提到的，一切都将在一个canvas元素中呈现，所以我们不会有任何的HTML元素。

要做的最后一件事是：我们所有的JS文件：从 phaser.min.js 文件到所有包含游戏代码的文件。为了减少浏览器的请求数，使游戏的载入速度更快，我们将在游戏需要的时候单独载入它们。

我们来看`<body>` 标签，在这里初始化框架并开始我们的游戏。第一行代码调用函数；看起来像这样：
```javascript
var game = new Phaser.Game(640, 960, Phaser.AUTO, 'game');
```
此代码将初始化Phaser：

640 是游戏的宽度，960 是游戏的高度。

phaser.auto 通知框架我们希望游戏如何渲染到画布上。这里有三个选项： CANVAS, WEBGL 和 AUTO。第一个将我们的游戏渲染在2D Canvas上；第二个使用WebGL在可能的情况下渲染游戏（现在主要用于桌面游戏，但是移动端支持也会越来越好）；第三个通知框架，自动检查是否支持WebGL，从而决定游戏如何呈现，如果不支持WebGL，那么2D Canvas将被使用。

该框架初始化将被分配到单个对象称为 game。

下一行的是关于我们的游戏：
```javascript
game.state.add('Boot', Candy.Boot);
```
'Boot' 是一个状态名， Candy.Boot 是一个对象（在下面代码中定义），我们开始进入状态时将被执行。我们为Boot 添加状态（配置），Preloader （加载资源），MainMenu （你猜对了；这是游戏主菜单）和Game （游戏主循环）。最后一行， game.state.start('Boot')，启动Boot 状态，Candy.Boot  对象将被执行。

你可以看到，一个主要的JavaScript游戏对象已被创建。在游戏中，我们有 Boot, Preloader, MainMenu,和 Game 对象，我们使用原型定义它们。有一些特殊功能的对象名被框架本身保留（preload() ，create() ，update()，和 render()），但我们也可以定义自己的（startgame() ，spawncandy() ，managepause()）。如果你不确定你明白这一切，别担心我会使用示例代码解释这一切。

### **游戏**

现在让我们忘记 Boot, Preloader和 MainMenu 。他们将在以后详细解释；此刻你要知道的是Boot  状态决定游戏的基本配置， Preloader 将加载所有的美术资源，并 MainMenu 将开始游戏菜单。

让我们关注游戏本身，看看Game代码。在解释game.js 代码之前，让我们从开发者的角度来谈谈游戏概念本身。

### **Portrait 模式**

游戏是竖屏模式。

![2](http://www.npm8.com/wp-content/uploads/2015/08/24.png)

在这种模式下，屏幕的高度大于其宽度。有的游戏适合竖屏（像怪物要糖果），有的游戏适合横屏（包括平台游戏， 比如[Craigen](http://enclavegames.com/games/craigen/)），甚至某些类型的游戏在两种模式下都可以运行，通常这样的游戏比较难写。

### **Game.js**

在我们开始game.js 文件之前，先看看它的结构。这里有一个为我们创造的世界，有一个玩家角色在里面，它的工作就是吃糖果。

游戏世界：怪物后面的世界是静态的。背景中有一张糖果大陆的图片，我们可以在前景中看到怪物，还有一个用户界面。

玩家角色： 这个演示非常简单，所以小怪物除了等待糖果什么也不做。对于玩家，主要任务就是收集糖果。

糖果：游戏的核心机制是吃尽可能多的糖果。糖果在屏幕的顶部边缘产生，玩家必须在它们掉落的时候点击（或点击）。如果任何糖果掉出屏幕的底部，删除它，玩家将受到伤害。我们还没有生命系统，因此，游戏结束后立即显示适当的消息。

好吧，现在让我们看看game.js：
```javascript
Candy.Game = function(game) {
// ...
};
Candy.Game.prototype = {
create: function() {
// ...
},
managePause: function() {
// ...
},
update: function() {
// ...
}
};
Candy.item = {
spawnCandy: function(game) {
// ...
},
clickCandy: function(candy) {
// ...
},
removeCandy: function(candy) {
// ...
}
};
```
Candy.Game有三个函数：
* · create() 初始化
* · managepause() 暂停和继续游戏
* · update() 管理游戏主循环

我们将创建一个方便的对象称为 item  代表单一的糖果。它会有一些有用的方法：

* · spawncandy() 增加新糖果
* · clickcandy() 当用户点击时，糖果消失
* · removecandy() 删除糖果

让我们使用这些代码：
```javascript
Candy.Game = function(game) {
this._player = null;
this._candyGroup = null;
this._spawnCandyTimer = 0;
this._fontStyle = null;
Candy._scoreText = null;
Candy._score = 0;
Candy._health = 0;
};
```
在这里，我们声明所有将使用的变量。
通过定义 this._name，我们限制了Candy.Game变量使用的范围。 这意味着他们不能用在其他状态中。

通过定义Candy._name，我们允许这些变量被对象使用，例如， Candy._score 的数值可以被 Candy.item.clickCandy()函数增加。

对象初始化为null，需要的变量初始化为零。

看看candy.game.prototype的代码：
```javascript
create: function() {
this.physics.startSystem(Phaser.Physics.ARCADE);
this.physics.arcade.gravity.y = 200;

this.add.sprite(0, 0, 'background');
this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');
this.add.sprite(10, 5, 'score-bg');
this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);

this._player = this.add.sprite(5, 760, 'monster-idle');
this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
this._player.animations.play('idle');

this._spawnCandyTimer = 0;
Candy._health = 10;

this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle);

this._candyGroup = this.add.group();
Candy.item.spawnCandy(this);
},
```
create() 函数开始之前，我们建立了ARCADE 物理系统----Phaser中有现成的，这是最简单的一种。之后，我们添加了重力。然后我们添加三个图片：背景，怪物，得分UI。第四个增加的元素是暂停按钮，注意我们使用的是 candy.game_width和 candy.game_height 变量，定义在 Candy.Preloader() 。

然后我们创建怪物，玩家的虚拟形象。这是一个动画精灵。看起来像是站着在呼吸。

animations.add()

函数创建帧动画，需要四个参数：
* · 动画的名称（可以参考它以后）
* · 包含所有帧的table（我们可以只使用其中一些）
* · 帧速
* · 一个决定动画是否循环的标签

我们使用 animations.play() 播放动画。 我们将 spawncandytimer 设为0 ；的怪物生命 health设为10。

### **文本格式**

接下来的两行代码，可以让我们在屏幕上显示文字。this.add.text()函数有四个参数：屏幕左侧和顶部的绝对位置，实际的文本字符串和配置对象。

我们可以使用CSS那样设置文本格式。 代码如下：
```javascript
this._fontStyle = {
font: "40px Arial",
fill: "#FFCC00",
stroke: "#333",
strokeThickness: 5,
align: "center"
};
```
字体是Arial，40像素高，黄色，可以设置描边（颜色和厚度），文本中心对齐。

之后，我们定义 candygroup 和第一颗糖果。

### **暂停游戏**

暂停功能看起来像这样：
```javascript
managePause: function() {
this.game.paused = true;
var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
this.input.onDown.add(function(){
pausedText.destroy();
this.game.paused = false;
}, this);
},
```
每次暂停按钮被点击时，我们改变this.game.paused状态为 true ，显示相应的提示给玩家，并为玩家单击或点击屏幕的行为建立一个事件侦听器。当单击或点击被检测到，我们删除文本并设 this.game.paused 为 false 。

paused 变量在 game  对象中是特殊的，因为它将暂停游戏中所有动画以及计算，所以一切都被冻结，直到我们取消暂停，游戏暂停状态被设置为false。

### **更新循环**

update() 函数Phaser保留的函数之一。当你用这个名字命名一个函数，它将在游戏的每一帧被执行。
```javascript
update: function() {
this._spawnCandyTimer += this.time.elapsed;
if(this._spawnCandyTimer > 1000) {
this._spawnCandyTimer = 0;
Candy.item.spawnCandy(this);
}
this._candyGroup.forEach(function(candy){
candy.angle += candy.rotateMe;
});
if(!Candy._health) {
this.add.sprite((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
this.game.paused = true;
}
}
```
我们用spawncandytimer 变量来跟踪时间。if 语句每秒检查一次，在游戏世界中释放一个新糖果后时间是否被重置，（也就是说，对于spawncandytimer是 1000毫秒）。然后，我们用forEach遍历所有糖果对象内的糖果集团（我们可以有一个以上的屏幕上使用 ），增加固定的数值到糖果的angle变量（存储在糖果对象中的rotateMe），使他们以固定的速度下落。我们做的最后一件事是检查 health 是否 下降到0，如果这样的话，那么我们在屏幕上显示游戏结束并暂停游戏。

### **糖果事件管理**

我们使用item定义糖果，包含的函数有： spawncandy() ，clickcandy() 和 removecandy()。为了方便使用在 Game保留一些糖果的变量。
```javascript
spawnCandy: function() {
var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
var dropOffset = [-27,-36,-36,-38,-48];
var candyType = Math.floor(Math.random()*5);
var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
candy.animations.add('anim', [candyType], 10, true);

game.physics.enable(candy, Phaser.Physics.ARCADE);
candy.inputEnabled = true;
candy.events.onInputDown.add(this.clickCandy, this);

candy.checkWorldBounds = true;
candy.events.onOutOfBounds.add(this.removeCandy, this);
candy.anchor.setTo(0.5, 0.5);
candy.rotateMe = (Math.random()*4)-2;
game._candyGroup.add(candy);
},
```
函数首先定义三个值：
* · 糖果随机下落x坐标（数值在0和游戏画面宽度之间）
* · 糖果随机下落y坐标，基于糖果自身的高度
* · 随机的糖果类型（糖果一共有五个不同的图像）

然后我们添加一个糖果作为精灵，其起始位置和图像根据上面的定义。我们还需要为糖果旋转设定动画帧。

接下来我们用物理引擎使糖果自然地从屏幕顶部坠落。然后，我们使糖果对点击产生回应，加入事件监听器。

为确保糖果离开游戏屏幕时被销毁，我们将checkWorldBounds 设为true。糖果离开屏幕时，函数events.onOutOfBounds()将被调用；我们用它调用removecandy() 函数。设置锚点在糖果上，使其绕轴线旋转。在这里我们设置了 rotateMe 变量，在update()循环中转动糖果；我们选择 -2和 +2之间的一个值。最后一行代码将新创建的糖果加入到糖果群组，这样我们就可以不停的循环他们 。

我们来讲下一个函数， clickcandy()：
```javascript
clickCandy: function(candy) {
candy.kill();
Candy._score += 1;
Candy._scoreText.setText(Candy._score);
},
```
这里需要将一个糖果作为参数，采用Phaser自带的方法 kill() 删除它。我们还增加了得分1，并更新得分的文本。

重置糖果也同样容易和简单：
```javascript
removeCandy: function(candy) {
candy.kill();
Candy._health -= 10;
},
```
当糖果被点击或掉出屏幕。removecandy() 函数会被调用。candy对象会被删除，玩家失去10点生命。（游戏一开始玩家有10点生命，所以有一个糖果掉出屏幕游戏就结束了）

### **原型和游戏状态**

我们已经了解了游戏机制，核心理念，以及游戏玩法。现在是时候去看代码的其他部分了：加载屏幕，加载资源，管理按钮点击等等。

我们已经知道了游戏状态，让我们一个接一个看看他们：

### **Boot.js**

boot.js 是JavaScript文件，我们将定义主要游戏对象Candy（你可以取个你喜欢的名字）。这里boot.js 文件的源代码：
```javascript
var Candy = {};
Candy.Boot = function(game) {};
Candy.Boot.prototype = {
preload: function() {
this.load.image('preloaderBar', 'img/loading-bar.png');
},
create: function() {
this.input.maxPointers = 1;
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
this.scale.pageAlignHorizontally = true;
this.scale.pageAlignVertically = true;
this.scale.setScreenSize(true);
this.state.start('Preloader');
}
};
```
正如你所看到的，我们从 var Candy = {} 开始，为游戏创建了一个全局对象。

Candy.Boot = function(game){} 代码创建一个新函数称为 boot() （index.html  有调用）将game 对象作为参数（index.html也被创建 ）。

Candy.Boot.prototype = {} 代码是使用原型定义Candy.Boot 内容的一种方式。
```javascript
Candy.Boot.prototype = {
preload: function() {
// code
},
create: function() {
// code
}
};
```
Phaser有一些保留的函数名称，正如我之前提到 ；preload() 和 create() 就是其中的两个。 preload() 用于加载所有资源； create() 只调用一次（在 preload()之后），所以你可以把代码当对象一样安排，就像定义变量或添加精灵。

我们的Boot对象包含这两个函数，这样他们就可以被Candy.Boot.preload()和Candy.Boot.create()调用。正如你所看到 boot.js 文件的完整的源代码，preload() 函数加载了一个图像到框架中：
```javascript
preload: function() {
this.load.image('preloaderBar', 'img/loading-bar.png');
[size=14px]},
```
this.load.image()中第一个参数是我们给图像取的名字，第二个是图像文件的路径。

为什么我们要在 boot.js 文件中加载图像，用preload.js 不行吗？好吧，因为我们需要一个加载条来显示所有资源（preload.js）的加载状态， 因此它需要第一个被加载。

### **缩放选项**

create() 函数包含了一些Phaser特定的输入和缩放设置：
```javascript
create: function() {
this.input.maxPointers = 1;
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
this.scale.pageAlignHorizontally = true;
this.scale.pageAlignVertically = true;
this.scale.setScreenSize(true);
this.state.start('Preloader');
}
```
第一行，input.maxpointers 设为1，我们的游戏不需要多点触摸。

scale.scalemode 控制游戏的旋转。可用的设置有： exact_fit ，no_scale 和 show_all你可以枚举他们，使用数值0，1，或2。exact_fit，将最大化游戏；no_scale将禁用缩放；show_all将确保游戏符合给定的尺寸，一切都会显示在屏幕上（按比例缩放 ）。

将 scale.pagealignhorizontally 和 scale.pagealignvertically 设为 true  ，将使游戏在水平和垂直方向居中。

调用 scale.setScreenSize(true) “激活”缩放。

最后一行， state.start('Preloader')，执行下一个Preloader 状态

### **Preloader.js**

与preload()函数相比，create() 函数非常简单，因为 create() 函数只需要负责切换状态。

preloader.js 源代码：
```javascript
Candy.Preloader = function(game){
Candy.GAME_WIDTH = 640;
Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype = {
preload: function() {
this.stage.backgroundColor = '#B4D9E7';
this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2,
(Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
this.load.setPreloadSprite(this.preloadBar);

this.load.image('background', 'img/background.png');
this.load.image('floor', 'img/floor.png');
this.load.image('monster-cover', 'img/monster-cover.png');
this.load.image('title', 'img/title.png');
this.load.image('game-over', 'img/gameover.png');
this.load.image('score-bg', 'img/score-bg.png');
this.load.image('button-pause', 'img/button-pause.png');

this.load.spritesheet('candy', 'img/candy.png', 82, 98);
this.load.spritesheet('monster-idle',
'img/monster-idle.png', 103, 131);
this.load.spritesheet('button-start',
'img/button-start.png', 401, 143);
},
create: function() {
this.state.start('MainMenu');
}
};
```
与 boot.js 比较像；定义 Preloader 对象和两个原型函数（preload() 和 create()）。

Prototype 对象，我们定义了两个变量： candy.game_width 和 candy.game_height；它们设置游戏屏幕默认的宽度和高度。

preload() 的前3行代码设置舞台的背景颜色（ # b4d9e7，浅蓝色），显示游戏中的精灵，setPreloadSprite() 函数将负责资源的加载。 我们来看add.sprite() 函数：

this.preloadBar = this.add.sprite((640-311)/2, (960-27)/2, 'preloaderBar');

正如你所看到的，我们需要三个值：图像x轴绝对坐标（舞台宽度减去图像宽度再除以2），图像y轴绝对坐标（类似计算）以及图像的名称（我们已经在 boot.js 文件中加载）。

### **加载spritesheets**

接下来的几行是使用 load.image()  （你已经看到了）加载所有的图形资源。

最后3行代码有点不同：
```javascript
this.load.spritesheet('candy', 'img/candy.png', 82, 98);
```
load.spritesheet()函数，不是加载单一的图片，而是spritesheet。两个额外的参数告诉函数单个图像的尺寸。

![3](http://www.npm8.com/wp-content/uploads/2015/08/34.png)

在这里candy.png我们有5种不同类型的糖果。图片尺寸410x98px，但是单一元素的大小是82x98px，在load.spritesheet()函数中定义。玩家spritesheet以同样的方式加载。

create()函数开始游戏的下一个状态MainMenu，当所有资源加载完毕就会显示游戏菜单。

### **MainMenu.js**

在这里渲染图片，添加按钮以及游戏循环。
```javascript
Candy.MainMenu = function(game) {};
Candy.MainMenu.prototype = {
create: function() {
this.add.sprite(0, 0, 'background');
this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10,
'button-start', this.startGame, this, 1, 0, 2);
},
startGame: function() {
this.state.start('Game');
}
};
```
MainMenu没有preload()函数，因为资源已在Preload.js加载。

这里有2个函数，create()，startGame()。 先看 startGame() 函数:
```javascript
startGame: function() {
this.state.start('Game');
}
```
这个函数只负责开始游戏循环，但是它不会自动执行，我们需要通过按钮来触发它。
```javascript
create: function() {
this.add.sprite(0, 0, 'background');
this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10,
'button-start', this.startGame, this, 1, 0, 2);
},
```
create()有3个add.sprite()函数，它们加载图片到舞台上。我们的主菜单在背景上，小怪物在角落里，还有游戏的标题。

### **按钮**

还有一个我们早已在Game 状态使用的对象，就是按钮：
```javascript
this.startButton = this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10,'button-start', this.startGame, this, 1, 0, 2);
```
这个按钮看起来比我们之前的代码都要复杂。我们通过八种不同的参数创建按钮：x轴位置，y轴位置，图像的名称（或精灵），单击该按钮时执行的函数，该函数执行环境，指定按钮使用的图片。

这是按钮的spritesheet，包含状态标签：

![button-start](http://www.npm8.com/wp-content/uploads/2015/08/button-start-150x150.png)

与candy.png非常相似，垂直排列。

记住最后三位数字传递给函数的意义—1 0 2-它们分别代表按钮的不同状态：over（鼠标悬停），out（正常），和down（触摸或点击）。在 button.png我们有不同的图片代表他们。

现在你已经了解了Phaser游戏框架的基础。恭喜你！

### **游戏成品**

本文中使用的demo游戏已经演变成一个[完整的游戏](http://enclavegames.com/games/monster-wants-candy/) ， 你可以[在这里玩](http://candy.enclavegames.com/)。你看，有生命，成就，得分，和其他有趣的功能，他们中的大多数都基于你已经学到的知识。

&nbsp;

![11](http://www.npm8.com/wp-content/uploads/2015/08/11.jpg)

你还可以阅读 [这一篇记录](http://enclavegames.com/blog/2014/06/02/monster-wants-candy-the-making-of/) ，了解游戏起源以及游戏背后的故事，还有一些有趣的事实。

### **资源**

在过去的几个月里，为移动设备开发HTML5游戏已经非常流行了。该技术将越来越好，几乎每天都有新的工具和服务出现，现在是进入潜在市场的最佳时机。

类似Phaser这样的引擎给了你开发适配各种不同手机设备游戏的能力。多亏了HTML5，你的目标不再仅仅是移动平台和桌面浏览器，还将包括其他不同的操作系统和原生平台。

现在有很多资源可以帮助你进入HTML5游戏开发，例如 [HTML5游戏开发新手教程](http://html5devstarter.enclavegames.com/) 列表或者 [开始用HTML5开发游戏](https://hacks.mozilla.org/2013/09/getting-started-with-html5-game-development/) 。如果你需要任何帮助，可以在[html5gamedevs](http://www.html5gamedevs.com/) 论坛寻求帮助或直接在  freenode IRC的[# BBG通道](http://webchat.freenode.net/?channels=bbg)上提问。你还可以关注即将发布的新书[Firefox OS and HTML5 games](http://firefoxos.enclavegames.com/)。甚至还有一个[Gamedev.js Weekly](http://gamedevjsweekly.com/) 通邮件列表你可以订阅。

### **概要**

这是一段关于[怪物要糖果demo](http://candy-demo.enclavegames.com/)代码的漫长旅程，我希望能帮助你学习Phaser，在不久的将来你可以开发很酷的游戏。