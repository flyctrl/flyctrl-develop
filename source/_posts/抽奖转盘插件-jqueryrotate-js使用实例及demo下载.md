---
title: 抽奖转盘插件-jqueryrotate.js使用实例及demo下载
tags:
  - jqueryrotate.js
  - 抽奖 rotate.js
  - 抽奖转盘插件 rotate.js
  - 旋转插件 rotate.js
id: 1841
categories:
  - 插件库
date: 2015-10-19 11:42:18
---

&emsp;&emsp;很多公司到了年底都会做一些抽奖活动来刺激、吸引、粘住客户，比如抽奖转盘活动。
前几天用一个jqueryRotate插件实现了转盘的效果。比起那些很炫丽的flash是稍逊点，但也基本实现了需求
实现这个其实蛮简单的，转动的效果用的jqueryRotate插件，所以只要判断每个奖荐对应的角度，然后设置指针的转动角度就可以了。比如关键的是jqueryRotate这个插件的用法。

&emsp;&emsp;jqueryRotate的资料：
支持Internet Explorer 6.0+ 、Firefox 2.0 、Safari 3 、Opera 9 、Google Chrome，高级浏览器下使用Transform，低版本ie使用VML实现
google code地址：http://code.google.com/p/jqueryrotate/

## 调用和方法：

```javascript
$(el).rotate({ 　
　　　　angle:0,  //起始角度
　　　　　animateTo:180,  //结束的角度
　　　　　duration:500， //转动时间
　　　　　callback:function(){}, //回调函数
　　　　　easing: $.easing.easeInOutExpo //定义运动的效果，需要引用jquery.easing.min.js的文件
　 })

$(el).rotate(45); //直接这样子调用的话就是变换角度

$(el).getRotateAngle(); //返回对象当前的角度

$(el).stopRotare(); //停止旋转动画
```
另外可以更方便的通过调用$(el).rotateRight()和$(el).rotateLeft()来分别向右旋转90度和向左旋转90度。


### rotate(angle)

angle参数：[Number] – 默认为 0 – 根据给定的角度旋转图片
例如:
```javascript
$("#img").rotate(45);
```
rotate(parameters)

parameters参数：[Object] 包含旋转参数的对象。

支持的属性:
1、angle属性：[Number] – default 0 – 旋转的角度数，并且立即执行例如:
$("#img").rotate({angle:45});

2、bind属性：[Object] 对象，包含绑定到一个旋转对象的事件。事件内部的$(this)指向旋转对象-这样你可以在内部链式调用- $(this).rotate(…)。例如 (click on arrow):
```javascript
$("#img").rotate({
    bind: {
        click: function () {
            $(this).rotate({
                angle: 0,
                animateTo: 180
            })
        }
    }
});
```
3、animateTo属性：[Number] – default 0 – 从当前角度值动画旋转到给定的角度值 （或给定的角度参数）例如: 结合上面的例子，请参阅使用。

4、duration属性：[Number] – 指定使用animateTo的动画执行持续时间例如 (click on arrow):
```javascript
$("#img").rotate({
    bind: {
        click: function () {
            $(this).rotate({
                duration: 6000,
                angle: 0,
                animateTo: 100
            })
        }
    }
});
```
5、step属性：[Function] – 每个动画步骤中执行的回调函数，当前角度值作为该函数的第一个参数

6、easing属性：[Function] – 默认 (see below) – Easing function used to make animation look more natural. It takes five parameters (x,t,b,c,d) to support easing from http://gsgd.co.uk/sandbox/jquery/easing/ (for more details please see documentation at their website). Remember to include easing plugin before using it in jQueryRotate!Default function:
```javascript
function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }
```
Where:t: current time,
b: begInnIng value,
c: change In value,
d: duration,
x: unused
No easing (linear easing):
```javascript
function(x, t, b, c, d) { return (t/d)*c ; }```
Example (click on arrow):
```javascript$("#img").rotate({bind: {
    click: function () {
        $(this).rotate({
            angle: 0,
            animateTo: 180,
            easing: $.easing.easeInOutElastic
        })
    }
}
});
```
7、callback属性：[Function] 动画完成时执行的回调函数例如 (click on arrow):
```javascript
$("#img").rotate({bind: {

    click: function () {
        $(this).rotate({
            angle: 0,
            animateTo: 180,
            callback: function () {
                alert(1)
            }
        })
    }
}
});
```

### getRotateAngle

这个函数只是简单地返回旋转对象当前的角度。
例如:
```javascript
$("#img").rotate({
    angle: 45,
    bind: {
        click: function () {
            alert($(this).getRotateAngle());
        }
    }
});
```

### stopRotate

这个函数只是简单地停止正在进行的旋转动画。
例如:
```javascript
$("#img").rotate({
    bind: {
        click: function () {
            $("#img").rotate({
                angle: 0,
                animateTo: 180,
                duration: 6000
            });
            setTimeout(function () {
                $("#img").stopRotate();
            }, 1000);
        }
    }
});
```
用这个可以实现很多关于旋转的网页特效，我用这个做了个抽奖大转盘，效果不错，就是没flash顺畅，基本能跑哈哈。

最后分享一下最终的一个demo的效果图及代码：
**效果图：**
![2014111549526457](http://www.npm8.com/wp-content/uploads/2015/10/2014111549526457.png)
**代码(基于ajax来开发抽奖的，需要在服务端去运行)：**
```html
<!DOCTYPE>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>转盘<a href="http://www.suchso.com/UIweb/jquery-fangtaobao-choujiang-zhuanpan-demo.html" class="keylink" title=" 抽奖" target="_blank">抽奖</a></title>
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/Rotate.js"></script>
<style>
*{padding:0; margin:0;}
.lotteryMain{ width:100%; padding:20px 0; }
.lotteryBg{ width:520px; height:520px; margin:0 auto; background:url(images/lotteryBg.jpg) no-repeat; position:relative; overflow:hidden;}
#run{ width:153px; height:214px; position:absolute; left:50%; top:50%; margin-left:-76px; margin-top:-107px; z-index:1; transform:rotate(0deg); -ms-transform:rotate(0deg); }
#btn_run{ width:125px; height:125px; background:url(images/btn_start.png) no-repeat; border:none; outline:none; position:absolute; left:50%; top:50%; margin-left:-62px; margin-top:-62px; z-index:2;cursor:pointer;}
</style>
</head>
<body>
<section class="lotteryMain">
<div class="lotteryBg">
<img id="run" src="images/start.png" />
<input id="btn_run" type="button" value="" />
</div>
<div id="results">

</div>
</section>
<script>
$(function(){
$("#btn_run").click(function(){
$("#btn_run").attr('disabled',true).css("cursor","default");
lottery();
});
});
function lottery(){
$.ajax({
type: 'get',
url: 'json2.js',
dataType: 'json',
cache: false,
error: function(){return false;},
success:function(obj){
$("#run").rotate({
duration:3000, //转动时间
angle: 0, //默认角度
animateTo:360*6+obj.rotate, //转动角度
easing: $.easing.easeOutSine,
callback: function(){
alert(obj.results);
$("#btn_run").attr('disabled',false).css("cursor","pointer");
}
});
}
});
};

</script>
</body>
</html>
```
[查看演示](http://demo.grycheng.com/case/lottery/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/10/lottery.zip)