---
title: css3动画简介以及动画库animate.css的使用
tags:
  - animate.css
id: 502
categories:
  - HTML5/CSS3
date: 2015-07-16 21:59:38
---

在这个年代，你要是不懂一点点css3的知识，你都不好意思说你是个美工。美你妹啊，请叫我前端工程师好不好。呃。。好吧，攻城尸。。。呵呵，作为一个攻城尸，没有点高端大气上档次的东西怎么能行呢，那么css3的动画就绝对是值得你拥有了，虽说IE9以及更早版本的IE浏览器都不支持css3动画，但是IE6-8浏览器已是江河日下，使用谷歌浏览器、火狐浏览器、IE10+浏览器以及移动端浏览器等这些支持css3动画的浏览器的人数越来越多，所以如果很简单的就能让一部分人获得更好的用户体验，那何乐而不为呢。
从广义上来讲，css3动画可以分为两种。

&nbsp;

**过渡动画**

第一种叫过渡（transition）动画，就是从初始状态过渡到结束状态这个过程中所产生的动画。所谓的状态就是指大小、位置、颜色、变形（transform）等等这些属性。css过渡只能定义首和尾两个状态，所以是最简单的一种动画。要想使一个元素产生过渡动画，首先要在这个元素上用transition属性定义动画的各种参数。可定义的参数有

transition-property：规定对哪个属性进行过渡
transition-duration：定义过渡的时间，默认是0
transition-timing-function：定义过渡动画的缓动效果，如淡入、淡出等，默认是 ease
transition-delay：规定过渡效果的延迟时间，即在过了这个时间后才开始动画，默认是0

[![1](http://www.npm8.com/wp-content/uploads/2015/07/16.png)](http://www.npm8.com/wp-content/uploads/2015/07/16.png)

为了书写方便，也可以把这四个属性按照以上顺序简写在一个 transition 属性上：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/24.png)](http://www.npm8.com/wp-content/uploads/2015/07/24.png)

如果是使属性的默认值，则可以省略：

[![3](http://www.npm8.com/wp-content/uploads/2015/07/32.png)](http://www.npm8.com/wp-content/uploads/2015/07/32.png)相当于：![4](http://www.npm8.com/wp-content/uploads/2015/07/43.png)

如果想要同时过渡多个属性，可以用逗号隔开，如：
[![5](http://www.npm8.com/wp-content/uploads/2015/07/52.png)](http://www.npm8.com/wp-content/uploads/2015/07/52.png)使用transtion属性只是规定了要如何去过渡，要想让动画发生，还得要有元素状态的改变。如何改变元素状态呢，当然就是在css中给这个元素定义一个类（:hover等伪类也可以），这个类描述的是过渡动画结束时元素的状态。

[![6](http://www.npm8.com/wp-content/uploads/2015/07/6-650x126.png)](http://www.npm8.com/wp-content/uploads/2015/07/6.png)

这样，当我们把鼠标移动到div上的时候，div的状态发生了变化，就能看到宽度从100到400，高度从100到400，背景颜色从黑到红的，过渡时间为3秒的过渡效果了。

除了使用hover等系统提供的伪类外，我们也可以随意的定义自己的类，然后想要过渡时就通过js把类加到元素上面：

[![7](http://www.npm8.com/wp-content/uploads/2015/07/72.png)](http://www.npm8.com/wp-content/uploads/2015/07/72.png)

&nbsp;

**关键帧动画**

第二种叫做关键帧（keyframes）动画。不同于第一种的过渡动画只能定义首尾两个状态，关键帧动画可以定义多个状态，或者用关键帧来说的话，过渡动画只能定义第一帧和最后一帧这两个关键帧，而关键帧动画则可以定义任意多的关键帧，因而能实现更复杂的动画效果。

关键帧动画的定义方式也比较特殊，它使用了一个关键字 @keyframes 来定义动画。具体格式为：

@keyframes 动画名称{
时间点 {元素状态}
时间点 {元素状态}
…
}

例如：

[![8](http://www.npm8.com/wp-content/uploads/2015/07/82.png)](http://www.npm8.com/wp-content/uploads/2015/07/82.png)

这段代码定义了一个名为demo,且有5个关键帧的动画。0% ，10% 等这些表示的是时间点，是相对于整个动画的持续时间来说的，时间点之后的花括号里则是元素的状态属性集合，描述了这个元素在这个时间点的状态，动画发生时，就是从第一个状态到第二个状态进行过渡，然后从第二个状态到第三个状态进行过渡，直到最后一个状态。一般来说，0%和100%这两个关键帧是必须要定义的。

关键帧的书写方式很灵活，一行可以写多个关键帧。

[![9](http://www.npm8.com/wp-content/uploads/2015/07/91.png)](http://www.npm8.com/wp-content/uploads/2015/07/91.png)

甚至它们之间的空格也是可以不要的。

现在我们知道了怎么去定义一个关键帧动画了，那怎么去实现这个动画呢？其实很简单，只要把这个动画绑定到某个要进行动画的元素上就行了。
把动画绑定到元素上，我们可以使用animation属性。animation属性有以下这些：

[![10](http://www.npm8.com/wp-content/uploads/2015/07/101.png)](http://www.npm8.com/wp-content/uploads/2015/07/101.png)

像前面讲的transition属性一样，也可以把这些animation属性简写到一个animation中，使用默认值的也可以省略掉。但 animation-play-state 属性不能简写到animation中。

[![11](http://www.npm8.com/wp-content/uploads/2015/07/112.png)](http://www.npm8.com/wp-content/uploads/2015/07/112.png)

只要像这样把定义好的动画绑定到元素上，就能实现关键帧动画了，而不是像第一种过渡动画那样，需要一个状态的改变才能触发动画。

[![12](http://www.npm8.com/wp-content/uploads/2015/07/122.png)](http://www.npm8.com/wp-content/uploads/2015/07/122.png)

--------------------------------------------------------------------------------------------------------------------

<span style="color: #ff0000;">注意，为了达到最佳的浏览器兼容效果，在实际书写代码的时候，还必须加上各大浏览器的私有前缀</span>

[![13](http://www.npm8.com/wp-content/uploads/2015/07/131.png)](http://www.npm8.com/wp-content/uploads/2015/07/131.png)

**animate.css的使用**

[animate.css](https://daneden.me/animate/)是一个css3动画库，可以到[github](https://github.com/daneden/animate.css)上去下载，里面预设了很多种常用的动画，[可以先在本页看下演示效果](http://www.cnblogs.com/2050/p/3409129.html#demo)，使用也很简单，因为它是把不同的动画绑定到了不同的类里，所以我们想要使用哪种动画的时候，只需要简单的把那个相应的类添加到元素上就行了：

首先在head中引入下载的animate.css文件

[![a](http://www.npm8.com/wp-content/uploads/2015/07/a3.png)](http://www.npm8.com/wp-content/uploads/2015/07/a3.png)

然后你想要哪个元素进行动画，就给那个元素添加上animated类 以及特定的动画类名，animated是每个要进行动画的元素都必须要添加的类。
假设使用jquery，要给一个id为demo的元素添加一个摇动的动画,因为摇动的动画类名为shake，所以代码是这样的：

[![b](http://www.npm8.com/wp-content/uploads/2015/07/b2.png)](http://www.npm8.com/wp-content/uploads/2015/07/b2.png)

这样载入页面，元素就能动起来了。你也可以在动画完成后，把动画类移除，以便可以再次进行同一个动画。

[![c](http://www.npm8.com/wp-content/uploads/2015/07/c7.png)](http://www.npm8.com/wp-content/uploads/2015/07/c7.png)

至于动画的配置参数，比如动画持续时间，动画的执行次数等等，你可以在你的的元素上自行定义，覆盖掉animate.css里面所定义的就行了。

[![d](http://www.npm8.com/wp-content/uploads/2015/07/d.png)](http://www.npm8.com/wp-content/uploads/2015/07/d.png)

注意这些属性还要记得加上各浏览器的前缀。

总之是很灵活的，说到底不就是一个css文件吗，一看就懂的，你在里面想怎么整就怎么整，不想用它提供的类名，就在里面改掉就行了。如果你只想用里面的部分动画，也可以把那些要使用的动画分离出来，它的[官网也提供了这样的功能](https://daneden.me/animate/build)。

&nbsp;

下面展示了animate.css里面提供的所有动画，动画名就是类名，你想使用哪个动画，加上这个类名就行了。

<iframe style="border: none; outline: none; background: none;overflow:hidden;" src="http://demo.grycheng.com/case/animate/" width="650" height="600"></iframe>