---
title: 手把手教你实现JS拖拽插件
tags:
  - JS拖拽插件
id: 1107
categories:
  - JS/Jq
date: 2015-08-05 13:07:10
---

## **一、js拖拽插件的原理**

常见的拖拽操作是什么样的呢？整过过程大概有下面几个步骤：

1、用鼠标点击被拖拽的元素

2、按住鼠标不放，移动鼠标

3、拖拽元素到一定位置，放开鼠标

这里的过程涉及到三个dom事件：onmousedown,onmousemove,onmouseup。所以拖拽的基本思路就是：

1、用鼠标点击被拖拽的元素触发onmousedown

（1）设置当前元素的可拖拽为true，表示可以拖拽

（2）记录当前鼠标的坐标x,y

（3）记录当前元素的坐标x,y

2、移动鼠标触发onmousemove

（1）判断元素是否可拖拽，如果是则进入步骤2，否则直接返回

（2）如果元素可拖拽，则设置元素的坐标

元素的x坐标 = 鼠标移动的横向距离+元素本来的x坐标 = 鼠标现在的x坐标 - 鼠标之前的x坐标 + 元素本来的x坐标

元素的y坐标 = 鼠标移动的横向距离+元素本来的y坐标 = 鼠标现在的y坐标 - 鼠标之前的y坐标 + 元素本来的y坐标

3、放开鼠标触发onmouseup

（1）将鼠标的可拖拽状态设置成false


## **二、根据原理实现的最基本效果**

在实现基本的效果之前，有几点需要说明的：

1、元素想要被拖动，它的postion属性一定要是relative或absolute

2、通过event.clientX和event.clientY获取鼠标的坐标

3、onmousemove是绑定在document元素上而不是拖拽元素本身，这样能解决快速拖动造成的延迟或停止移动的问题

代码如下：
```javascript
var dragObj = document.getElementById("test");
        dragObj.style.left = "0px";
        dragObj.style.top = "0px";

        var mouseX, mouseY, objX, objY;
        var dragging = false;

        dragObj.onmousedown = function (event) {
            event = event || window.event;

            dragging = true;
            dragObj.style.position = "relative";

            mouseX = event.clientX;
            mouseY = event.clientY;
            objX = parseInt(dragObj.style.left);
            objY = parseInt(dragObj.style.top);
        }

        document.onmousemove = function (event) {
            event = event || window.event;
            if (dragging) {

                dragObj.style.left = parseInt(event.clientX - mouseX + objX) + "px";
                dragObj.style.top = parseInt(event.clientY - mouseY + objY) + "px";
            }

        }

        document.onmouseup = function () {
            dragging = false;
        }
```

## **三、代码抽象与优化**

上面的代码要做成插件，要将其抽象出来，基本结构如下：
```javascript
; (function (window, undefined) {            

            function Drag(ele) {}

            window.Drag = Drag;
        })(window, undefined);
```
&emsp;&emsp;用自执行匿名函数将代码包起来，内部定义Drag方法并暴露到全局中，直接调用Drag，传入被拖拽的元素。

首先对一些常用的方法进行简单的封装：
```javascript
; (function (window, undefined) {
            var dom = {
                //绑定事件
                on: function (node, eventName, handler) {
                    if (node.addEventListener) {
                        node.addEventListener(eventName, handler);
                    }
                    else {
                        node.attachEvent("on" + eventName, handler);
                    }
                },
                //获取元素的样式
                getStyle: function (node, styleName) {
                    var realStyle = null;
                    if (window.getComputedStyle) {
                        realStyle = window.getComputedStyle(node, null)[styleName];
                    }
                    else if (node.currentStyle) {
                        realStyle = node.currentStyle[styleName];
                    }
                    return realStyle;
                },
                //获取设置元素的样式
                setCss: function (node, css) {
                    for (var key in css) {
                        node.style[key] = css[key];
                    }
                }
            };

            window.Drag = Drag;
        })(window, undefined);
```
&emsp;&emsp;在一个拖拽操作中，存在着两个对象：被拖拽的对象和鼠标对象，我们定义了下面的两个对象以及它们对应的操作：

首先的拖拽对象，它包含一个元素节点和拖拽之前的坐标x和y：
```javascript
function DragElement(node) {
                this.node = node;//被拖拽的元素节点
                this.x = 0;//拖拽之前的x坐标
                this.y = 0;//拖拽之前的y坐标
            }
            DragElement.prototype = {
                constructor: DragElement,
                init: function () {                    
                    this.setEleCss({
                        "left": dom.getStyle(node, "left"),
                        "top": dom.getStyle(node, "top")
                    })
                    .setXY(node.style.left, node.style.top);
                },
                //设置当前的坐标
                setXY: function (x, y) {
                    this.x = parseInt(x) || 0;
                    this.y = parseInt(y) || 0;
                    return this;
                },
                //设置元素节点的样式
                setEleCss: function (css) {
                    dom.setCss(this.node, css);
                    return this;
                }
            }
```
还有一个对象是鼠标，它主要包含x坐标和y坐标：
```javascript
function Mouse() {
                this.x = 0;
                this.y = 0;
            }
            Mouse.prototype.setXY = function (x, y) {
                this.x = parseInt(x);
                this.y = parseInt(y);
            }
```
这是在拖拽操作中定义的两个对象。

如果一个页面可以有多个拖拽元素，那应该注意什么：

1、每个元素对应一个拖拽对象实例

2、每个页面只能有一个正在拖拽中的元素

为此，我们定义了唯一一个对象用来保存相关的配置：
```javascript
var draggableConfig = {
                zIndex: 1,
                draggingObj: null,
                mouse: new Mouse()
            };
```
这个对象中有三个属性：

（1）zIndex：用来赋值给拖拽对象的zIndex属性，有多个拖拽对象时，当两个拖拽对象重叠时，会造成当前拖拽对象有可能被挡住，通过设置zIndex使其显示在最顶层

（2）draggingObj：用来保存正在拖拽的对象，在这里去掉了前面的用来判断是否可拖拽的变量，通过draggingObj来判断当前是否可以拖拽以及获取相应的拖拽对象

（3）mouse：唯一的鼠标对象，用来保存当前鼠标的坐标等信息

最后是绑定onmousedown，onmouseover，onmouseout事件，整合上面的代码如下：
```javascript
; (function (window, undefined) {
            var dom = {
                //绑定事件
                on: function (node, eventName, handler) {
                    if (node.addEventListener) {
                        node.addEventListener(eventName, handler);
                    }
                    else {
                        node.attachEvent("on" + eventName, handler);
                    }
                },
                //获取元素的样式
                getStyle: function (node, styleName) {
                    var realStyle = null;
                    if (window.getComputedStyle) {
                        realStyle = window.getComputedStyle(node, null)[styleName];
                    }
                    else if (node.currentStyle) {
                        realStyle = node.currentStyle[styleName];
                    }
                    return realStyle;
                },
                //获取设置元素的样式
                setCss: function (node, css) {
                    for (var key in css) {
                        node.style[key] = css[key];
                    }
                }
            };

            //#region 拖拽元素类
            function DragElement(node) {
                this.node = node;
                this.x = 0;
                this.y = 0;
            }
            DragElement.prototype = {
                constructor: DragElement,
                init: function () {                    
                    this.setEleCss({
                        "left": dom.getStyle(node, "left"),
                        "top": dom.getStyle(node, "top")
                    })
                    .setXY(node.style.left, node.style.top);
                },
                setXY: function (x, y) {
                    this.x = parseInt(x) || 0;
                    this.y = parseInt(y) || 0;
                    return this;
                },
                setEleCss: function (css) {
                    dom.setCss(this.node, css);
                    return this;
                }
            }
            //#endregion

            //#region 鼠标元素
            function Mouse() {
                this.x = 0;
                this.y = 0;
            }
            Mouse.prototype.setXY = function (x, y) {
                this.x = parseInt(x);
                this.y = parseInt(y);
            }
            //#endregion

            //拖拽配置
            var draggableConfig = {
                zIndex: 1,
                draggingObj: null,
                mouse: new Mouse()
            };

            function Drag(ele) {
                this.ele = ele;

                function mouseDown(event) {
                    var ele = event.target || event.srcElement;

                    draggableConfig.mouse.setXY(event.clientX, event.clientY);

                    draggableConfig.draggingObj = new DragElement(ele);
                    draggableConfig.draggingObj
                        .setXY(ele.style.left, ele.style.top)
                        .setEleCss({
                            "zIndex": draggableConfig.zIndex++,
                            "position": "relative"
                        });
                }                

                ele.onselectstart = function () {
                    //防止拖拽对象内的文字被选中
                    return false;
                }
                dom.on(ele, "mousedown", mouseDown);
            }

            dom.on(document, "mousemove", function (event) {
                if (draggableConfig.draggingObj) {
                    var mouse = draggableConfig.mouse,
                        draggingObj = draggableConfig.draggingObj;
                    draggingObj.setEleCss({
                        "left": parseInt(event.clientX - mouse.x + draggingObj.x) + "px",
                        "top": parseInt(event.clientY - mouse.y + draggingObj.y) + "px"
                    });
                }
            })

            dom.on(document, "mouseup", function (event) {
                draggableConfig.draggingObj = null;
            })

            window.Drag = Drag;
        })(window, undefined);
```
调用方法：Drag(document.getElementById("obj"));

&emsp;&emsp;注意的一点，为了防止选中拖拽元素中的文字，通过onselectstart事件处理程序return false来处理这个问题。

## **四、扩展：有效的拖拽元素**

我们常见的一些拖拽效果很有可能是这样的：
![022105124857184](http://www.npm8.com/wp-content/uploads/2015/08/022105124857184.png)
弹框的顶部是可以进行拖拽操作的，内容区域是不可拖拽的，怎么实现这样的效果呢：

&emsp;&emsp;首先优化拖拽元素对象如下，增加一个目标元素target，表示被拖拽对象，在上图的登录框中，就是整个登录窗口。

&emsp;&emsp;被记录和设置坐标的拖拽元素就是这个目标元素，但是它并不是整个部分都是拖拽的有效部分。我们在html结构中为拖拽的有效区域添加类draggable表示有效拖拽区域：
```html
<div id="obj1" class="dialog" style="position:relative;left:50px">
 <div class="header draggable">
 拖拽的有效元素
 </div>
 <div class="content">
 拖拽对象1
 </div>
 </div>
```
然后修改Drag方法如下：
```javascript
function drag(ele) {
        var dragNode = (ele.querySelector(".draggable") || ele);
        dom.on(dragNode, "mousedown", function (event) {
            var dragElement = draggableConfig.dragElement = new DragElement(ele);

            draggableConfig.mouse.setXY(event.clientX, event.clientY);
            draggableConfig.dragElement
                .setXY(dragElement.target.style.left, dragElement.target.style.top)
                .setTargetCss({
                    "zIndex": draggableConfig.zIndex++,
                    "position": "relative"
                });
        }).on(dragNode, "mouseover", function () {
            dom.setCss(this, draggableStyle.dragging);
        }).on(dragNode, "mouseout", function () {
            dom.setCss(this, draggableStyle.defaults);
        });
    }
```
&emsp;&emsp;主要修改的是绑定mousedown的节点变成了包含draggable类的有效元素，如果不含有draggable，则整个元素都是有效元素。

## **五、性能优化和总结**

&emsp;&emsp;由于onmousemove在一直调用，会造成一些性能问题，我们可以通过setTimout来延迟绑定onmousemove事件，改进move函数如下
```javascript
function move(event) {
        if (draggableConfig.dragElement) {
            var mouse = draggableConfig.mouse,
                dragElement = draggableConfig.dragElement;
            dragElement.setTargetCss({
                "left": parseInt(event.clientX - mouse.x + dragElement.x) + "px",
                "top": parseInt(event.clientY - mouse.y + dragElement.y) + "px"
            });

            dom.off(document, "mousemove", move);
            setTimeout(function () {
                dom.on(document, "mousemove", move);
            }, 25);
        }
    }
```
总结：

整个拖拽插件的实现其实很简单，主要是要注意几点

1、实现思路：元素拖拽位置的改变就等于鼠标改变的距离，关键在于获取鼠标的变动和元素原本的坐标

2、通过setTimeout来延迟加载onmousemove事件来提供性能

## **六、jquery插件化**

简单地将其封装成jquery插件，主要是相关的dom方法替换成jquery方法来操作
```javascript
; (function ($, window, undefined) {
    //#region 拖拽元素类
    function DragElement(node) {

        this.target = node;

        node.onselectstart = function () {
            //防止拖拽对象内的文字被选中
            return false;
        }
    }
    DragElement.prototype = {
        constructor: DragElement,
        setXY: function (x, y) {
            this.x = parseInt(x) || 0;
            this.y = parseInt(y) || 0;
            return this;
        },
        setTargetCss: function (css) {
            $(this.target).css(css);
            return this;
        }
    }
    //#endregion

    //#region 鼠标元素
    function Mouse() {
        this.x = 0;
        this.y = 0;
    }
    Mouse.prototype.setXY = function (x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }
    //#endregion

    //拖拽配置
    var draggableConfig = {
        zIndex: 1,
        dragElement: null,
        mouse: new Mouse()
    };

    var draggableStyle = {
        dragging: {
            cursor: "move"
        },
        defaults: {
            cursor: "default"
        }
    }

    var $document = $(document);

    function drag($ele) {
        var $dragNode = $ele.find(".draggable");
        $dragNode = $dragNode.length > 0 ? $dragNode : $ele;

        $dragNode.on({
            "mousedown": function (event) {
                var dragElement = draggableConfig.dragElement = new DragElement($ele.get(0));

                draggableConfig.mouse.setXY(event.clientX, event.clientY);
                draggableConfig.dragElement
                    .setXY(dragElement.target.style.left, dragElement.target.style.top)
                    .setTargetCss({
                        "zIndex": draggableConfig.zIndex++,
                        "position": "relative"
                    });
            },
            "mouseover": function () {
                $(this).css(draggableStyle.dragging);
            },
            "mouseout": function () {
                $(this).css(draggableStyle.defaults);
            }
        })
    }

    function move(event) {
        if (draggableConfig.dragElement) {
            var mouse = draggableConfig.mouse,
                dragElement = draggableConfig.dragElement;
            dragElement.setTargetCss({
                "left": parseInt(event.clientX - mouse.x + dragElement.x) + "px",
                "top": parseInt(event.clientY - mouse.y + dragElement.y) + "px"
            });

            $document.off("mousemove", move);
            setTimeout(function () {
                $document.on("mousemove", move);
            }, 25);
        }
    }

    $document.on({
        "mousemove": move,
        "mouseup": function () {
            draggableConfig.dragElement = null;
        }
    });

    $.fn.drag = function (options) {
        drag(this);
    }

})(jQuery, window, undefined)
```
&nbsp;
[点击下载](http://www.npm8.com/wp-content/uploads/2015/08/draggable.7z)
&nbsp;