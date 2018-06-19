---
title: 手机端页面rem自适应脚本
tags:
  - rem自适应脚本
  - 移动端自适应脚本
id: 1704
categories:
  - 移动前端
date: 2015-09-21 13:50:06
---

### 什么是rem

&emsp;&emsp;rem就是1rem单位就等于html节点fontsize的像素值。所以改变html节点的fontsize是最为关键的一步。根据手机宽度改变相对大小就可以实现自适应了，就不用什么媒体查询那些的。

&emsp;&emsp;我们的设计图往往宽度是640或者其他尺寸的，不过我建议是用这个尺寸，以640为基准，以小到大，实现自适应，下面实现的比例为1rem=40px(640宽度)。

### 为什么这样搞？

&emsp;&emsp;这样一套代码就搞定手机端尺寸自适应，不需要媒体查询，而且利用Sass和Less能够给我们节约更多的时间，以及更好的体验。

### 扩展

&emsp;&emsp;因为是要计算rem的值，所以我们前端在看到设计图量尺寸的时候会去计算下这个东西，需要花费一些时间，所以我提供了Sass（不知道的自己去百度）和Less（不知道的自己去百度）相对变量的代码，

Sass相对变量地址：[Sass相对变量](https://csssprite.herokuapp.com/sassVar)

Less相对变量地址：[Less相对变量](https://csssprite.herokuapp.com/lessVar)

&emsp;&emsp;打开页面，1-400的相对变量都在上面，只需要全选复制，然后放入你的项目中，直接拿来用就是了，当然我写的css雪碧图生成工具也会用到里面的变量，大家不妨一试。

### 手机自适应代码

&emsp;&emsp;下面的代码是拷贝自淘宝的手机app，当然，我把有的变量还原了，有的注释了。直接引用这个js，不需要设计viewport标签
```javascript
!function(win) {
    function resize() {
        var domWidth = domEle.getBoundingClientRect().width;
        if(domWidth / v > 540){
            domWidth = 540 * v;
        }
        win.rem = domWidth / 16;
        domEle.style.fontSize = win.rem + "px";
    }
    var v, initial_scale, timeCode, dom = win.document, domEle = dom.documentElement, viewport = dom.querySelector('meta[name="viewport"]'), flexible = dom.querySelector('meta[name="flexible"]');
    if (viewport) {
        var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        if(o){
            initial_scale = parseFloat(o[2]);
            v = parseInt(1 / initial_scale);
        }
    } else if(flexible) {
        var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
        if (o) {
            v = parseFloat(o[2]);
            initial_scale = parseFloat((1 / v).toFixed(2))
        }
    }
    if (!v && !initial_scale) {
        var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
        v = win.devicePixelRatio;
        v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
    }
    //没有viewport标签的情况下
    if (domEle.setAttribute("data-dpr", v), !viewport) {
        if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
            domEle.firstElementChild.appendChild(viewport)
        } else {
            var m = dom.createElement("div");
            m.appendChild(viewport), dom.write(m.innerHTML)
        }
    }
    win.dpr = v;
    win.addEventListener("resize", function() {
        clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
    }, false);
    win.addEventListener("pageshow", function(b) {
        b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
    }, false);
    resize();
}(window);
```
&nbsp;
&emsp;&emsp;执行完代码后你的页面就会跟随手机的宽度而自适应了，根本就不用什么媒体查询那些，很简洁，很使用，站在巨人的肩膀上吧这就叫做！