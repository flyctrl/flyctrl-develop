---
title: Phaser游戏开发之屏幕适配策略
tags:
  - phaser屏幕适配
  - phaser游戏开发
id: 1669
categories:
  - Phaser
date: 2015-09-17 10:31:33
---

**序言（Welcome）**

现在的HTML5游戏都要具备一种功能，不管在哪一种设备上运行，都应该适应它的分辨率，为此Phaser内置了一个屏幕适配管理对象(Scale Manager)。本片教程就涵盖了此管理对象的方方面面，包括各种适配模式及其属性。（注意：本教程基于Phaser2.2.0以上版本）

![1](http://www.npm8.com/wp-content/uploads/2015/09/17.jpg)

**为你的戏选择一个分辨率(Picking a resolution for your game)**

不管你使用哪一种适配模式，也不管你是否决定去创建一个能在任何设备上都全屏的完全响应式游戏，你都需要先定下一个基本的分辨率。在这个分辨率里会创建所有游戏需要的资源，也会创建游戏视图，还要计划按钮和其他基本元素的位置，对齐方式。选择一个正确的分辨率不是一件太容易的事，原因是它很大程度上取决你要制作的游戏的类型和目标受众。你可以参考以下内容以便于做出决定：

**性能（Performance）**

关于游戏性能您是怎么想的？很明显每个人都希望自己的游戏运行的很顺畅，但是不同类型的游戏有不同的处理方法，而本质上都是关于游戏每帧需要移动的像素的数量。

如果你正制作一个match-3类型的游戏，那么大部分时间游戏屏幕是不会变化的，但也许有下落的宝石，动画，和粒子等等，但很明显正在移动的像素数量实际上在任何时候都很少。

相较于这没有尽头的酷跑类游戏，它有一个不断滚动的背景，可能它上方还有个视觉层

**目标受众(Target Audience)**

记住你的游戏是为谁而作。

**跨平台性(Cross Platform?)**

PC端屏幕大，不用担心显示问题，可以使用高清资源，移动端则反之。

**预算(Budgets)**

基于预算可做两套不同的资源（分别用于SD和HD或者“移动端”和“PC端”），游戏启动时检测屏幕大小，进而选择合适的资源加载。若预算不足，也无需如此，一套资源足以。

**带宽(Bandwidth)**

游戏复杂，动画过多，需要加载的资源就多，需要的带宽就要大，否则加载时间就会很长，影响用户体验。

**竖屏 横屏?(Portrait or Landscape)**

竖屏还是横屏，对应的分辨率自然是不同的，游戏是用竖屏还是竖屏，必须要进行需求分析并深思熟虑再下决定，然后经过最终测试。

上面几点都是我们选择游戏基础分辨率的参考条件，下面让我们一起来探索Phaser游戏的缩放方式吧。

**适配的概念(Scaling Concepts)**

在文章开始之前需要介绍几个名词，Phaser中都是通过“the Game”，“the World”，和“the Parent”来进行元素缩放的。

**Game Size**

**固定模式(Fixed Dimensions)**

在Phaser游戏引擎有一个名词“Game Size”，在Game构造函数中用像素值来定义游戏的长宽，例如下面的代码就是设置游戏的大小为640 x 480像素:
```javascript
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'container');
```
Phaser则会在定义的尺寸下创建Canvas对象。

**百分比模式(Percentage based Dimensions)**

除了使用整数也可以使用百分比来定义游戏大小，如下：
```javascript
var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'container');
```
在这里Phaser游戏大小被设置成container元素可用的宽和高（这里的container被称作the Game Parent）,如果没有设置container元素，Phaser引擎会自动将页面body标签作为the Game Parent。游戏大小则是当前浏览器窗口大小。（值得注意的是：改变浏览器窗口大小，游戏窗口不会自动跟随改变）

**world size**

有Phaser game对象的存在就有The Game World（游戏世界）存在，当你创建一个新的sprite时，它就会被添加到The World 并活在其中。The World的大小是可以改变的，通过Phaser  camera我们可以查看到The World的一部分。

The World默认大小则是我们定义的game的大小，通过下面的代码改变其大小：
```game.world.resize(2000, 1000);```
执行上述代码，The World大小会被重设成2000x1000像素。如果我们设置的游戏初始值是640x480像素的话，那么我们看到的将是整个游戏世界的左上角。通过改变camera.x 和camera.y 移动查看游戏世界其他位置。

Sprites和其他游戏对象可以在这个世界2000x1000像素区域的任何位置。当游戏视角移动到他们的位置或者它们移动到游戏视觉的时候，他们才会被绘制。（The World是一个虚拟尺寸，和实际的游戏现实大小无关，这一点在sprites缩放时尤为重要。）

父容器(Parent  Container)

在web浏览器创建一个Phaser游戏时，通常都是需要一个父容器的，这个Phaser game构造函数的规则：
```var game = new Phaser.Game(640, 480, Phaser.AUTO, 'myDiv');```
上面的代码可以解释为，游戏开始时会在myDiv容器里创建一个Canvas DOM元素，在本例中这个Canvas的大小是640x480像素。任何CSS设置都可通过myDiv控制布局。例如：设置myDiv的宽500px，并且overflow：none，那么我们就不能看到游戏右面的140px，这部分被切除了。同样你的如果没有对myDiv设置CSS，myDiv就会自动适配Canvas大小。记住：myDiv的控制权是你的CSS而不是PHASER。
如果myDiv不存在，或为空，Phaser会选择浏览器的窗口（body元素）作为父容器（如果你不选择一个父容器，那代码如下）
```var game = new Phaser.Game(640, 480, Phaser.AUTO, '');```
Phaser将浏览器窗口作为父容器，创建了Canvas 元素，并添加到body里，如果当前页面已有内容，那么Canvas将会添加到这些内容的后面。

The Game Parent 就是用来容纳Phaser Canvas并管理所有缩放的浏览器窗口或者一个DOM元素，我们称之为game's parent container，简称：“the' parent”。

**设置Phaser适配模式(Setting a Phaser Scale Mode)**

你可以在游戏代码任何位置设置游戏的适配模式，但我们强烈建议只做一次设置，之后不再改变。这样做最好的地方就在init方法。下面的代码就是在设置Phaser默认的适配模式中的一种，并且游戏在父容器下左右上下居中。
```javascript
function init() {
    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
}
```
任何缩放操作都是直接由Phaser Scale Manager来管理，如果有一个全局变量game，你可以通过game.scale来操作，就像上面的代码一样。但如果你正在使用[Phaser states](http://www.ipastimes.com/post/33.html "PHASER中你必须知道的7个函数")，那就应该在Boot state文件里添加下面的代码替代上面的：
```javascript
init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
}
```
scale是Phaser state的常用属性，也可以通过game直接引用。在本文中我们的示例代码会一直使用全局变量game，但你可以通过上面方法替换代码风格并且效果是一样的。

**缩放模式一： EXACT_FIT**
```javascript
game.scale.scaleMode =
Phaser.ScaleManager.EXACT_FIT;
```
The Exact Fit缩放模式是一个特殊的模式，它将游戏的大小重设成适合父容器的大小，而且并不会保持游戏的宽高比例。也就是意味着当the parent的大小和游戏的不一样时，游戏将会随之缩放，就像下图：
![2](http://www.npm8.com/wp-content/uploads/2015/09/26.jpg)可以看到，当浏览器又宽又短时图像是很扭曲的。

**缩放模式二： NO_SCALE**
```javascript
game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
```
这是默认的适配模式，通过模式的名称就能够知道，实际上它什么都没做，游戏大小就是你在game构造函数定义的大小，不会有任何改变。它和EXACT_FIT不同的地方在于不管父容器如何改变，NO_SCALE都不会扭曲游戏图像。

![3](http://www.npm8.com/wp-content/uploads/2015/09/31.jpg)

上图中黑色的区域就是网页其他部分，游戏大小800x600像素，在左上角。让我们再来看看当父容器变小时，会发生什么（如下图）：

![4](http://www.npm8.com/wp-content/uploads/2015/09/42.jpg)

注意：你依然能够通过CSS来改变Canvas大小，但在Phaser缩放模式下是不起作用的。

**缩放模式三： SHOW_ALL**
```javascript
game.scale.scaleMode =
Phaser.ScaleManager.SHOW_ALL;
```
这种模式通过调整你的游戏大小，以适应父元素的大小，但会保持游戏的宽高比例。它不像EXACT_FIT这种模式，它不会扭曲你的游戏画面。它通过计算游戏的宽高比。然后再依据父元素的的大小调整Canvas尺寸，与此同时自动保持自身的宽高比。

像这种以父元素大小为依据，有时会导致出现被称为“边框化”的效果：

![5](http://www.npm8.com/wp-content/uploads/2015/09/51.jpg)

上图中浏览器窗口大小是705 x 670像素，而游戏的是800x600像素，为了适配窗口大小并保证宽高比不变，Phaser重置game大小为705x529像素，图中下方的黑色区域就是页面的剩余部分。

The Scale Manager能使游戏在父元素中居中的功能，这能更好的改进边框化模式，下文会有这部分的详细介绍。

**缩放模式四： RESIZE**
```javascript
game.scale.scaleMode =
Phaser.ScaleManager.RESIZE;
```
RESIZE模式是创建一个和其父元素同样大小的Canvas元素，如果父元素是900x1200，那么游戏大小也是900x1200像素.在这个适配模式下，Phaser引擎一直会跟踪父元素的大小变化，如果父元素大小发生变化，那游戏大小就会跟着变化。它和SHOW_ALL模式的不同在于RESIZE的canvas元素缩放并非真正的缩放去适配父元素，而是1:1的去匹配显示，它只是基于父元素在其或大或小的区域绘制。

看下面两张图，第一张浏览器窗口大小是638x584

![6](http://www.npm8.com/wp-content/uploads/2015/09/62.jpg)

而下面这张也是相同游戏大小而浏览器窗口大小重设为855 x 584

![7](http://www.npm8.com/wp-content/uploads/2015/09/72.jpg)

正如你看到的，在第二张图你可以看到更多的背景。而随着浏览器窗口变大会有更多的图像变得可见。

这个模式就是一个真正的响应式游戏模式，但依赖于你的代码要如何利用额外的空间，以及如何使用它。Phaser有一些功能在FlexGrid类中，但还在测试中。

**Resize callback**

The RESIZE模式还有个一额外的功能是其他模式没有的，如果游戏State有一个resize方法时，无论何时父元素大小发生变化时这个方法都会被调用。同时会有传入两个参数：’width‘ 和 ’height‘。可以通过这两个参数去调整游戏对象的位置。

例如：我们要创建两个精灵。
```javascript
kirito = game.add.sprite(0, game.world.bounds.bottom, 'kirito');
kirito.anchor.y = 1;
asuna = game.add.sprite(game.world.bounds.right, 0, 'asuna');
asuna.anchor.x = 1;
```
两个精灵分别被放置在游戏的左下角和右上角，然后通过锚点(anchor)这个属性，我们不需要担心游戏中精灵显示不全。此时游戏开始看起来就像下图：

![8](http://www.npm8.com/wp-content/uploads/2015/09/81.jpg)

在State中有一个resize方法：
```javascript
function resize(width, height) {
    kirito.y = height;
    asuna.x = width;
}
```
随着浏览器的大小变化，此函数将被反复调用。给定的参数可以用来在游戏中调整两个精灵的位置，所以他们仍然在游戏的左下方和右上方，无论如何缩放。
下图就是浏览器窗口被调整更大后的效果

![9](http://www.npm8.com/wp-content/uploads/2015/09/9.jpg)

你可以看到，虽然浏览器现在比背景图像还大，但精灵们仍然在各自的岗位上。

这是所有响应的游戏设计的基础。

**缩放模式五：USER_SCALE**
```javascript
game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
```
最后一个模式是USER_SCALE,这个模式是在Phaser2.2版本出现的，它允许自定义动态缩放，它与setUserScale方法组合使用：
```javascript
game.scale.setUserScale(hScale, vScale, hTrim, vTrim);
```
参数hScale和vScale控制如何缩放游戏，1代表不缩放，0.5代表缩小一半，2代表放大2倍，以此类推，在Phaser中可以任意缩放。

参数hTrim和vTrim，必须是整数，用来定义缩放后从画布的水平或垂直尺寸删除的值。
它的计算方式如下：
```javascript
canvas.width = (game.width * hScale) - hTrim
canvas.height = (game.height * vScale) - vTrim
```
你可以在游戏任何位置调用setUserScale方法，但通常你会想在resize时回调，这有两个选择，一个是setResizeCallback方法，另一个是onSizeChange监听：
```javascript
game.scale.setResizeCallback(callback, context);
game.scale.onSizeChange.add(callback, context);
```

回调函数被调用之前的大小计算。这是调用自定义动态缩放setuserscale适当的地方。

回调函数提供两个参数scale和parentBounds，scale是ScaleManager对象，parentBounds则是一个Phaser.Rectangle，父元素的大小。

注意，这个回调函数会有以下问题：

父元素或canvas大小没有变化也有可能被调用；

不像onSizeChange，它运行在canvas上的保证是update可能被preUpdate调用，即使游戏已经暂停了。
&nbsp;