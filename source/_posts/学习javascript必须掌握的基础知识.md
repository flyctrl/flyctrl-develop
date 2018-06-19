---
title: 学习javascript必须掌握的基础知识
tags:
  - JavaScript基础
id: 61
categories:
  - JS/Jq
date: 2015-07-11 16:16:10
---

**好多人想要学习前端……自学或者培训那么我们在学习过程中到底需要掌握那些基础知识呢！下面分类了JS中必备的知识也是必须要了解学会的！看一看你是否已经将JS的基础知识都了如指掌了呢？**

**事件:**
* onmousedown 鼠标按下 
* onmouseup   鼠标抬起 
* onmouseover  鼠标移入 
* onmouseout   鼠标移除 
* onmousemove 鼠标移动 
* onclick       点击事件 
* onfocus      获得焦点 
* onblur                 失去焦点         
* oncontextmenu        鼠标右键 
* onsubmit   表单提交//不会有冒泡的，坑 
* onkeydown        键盘按下 
* onkeyup                键盘抬起 
* onload                页面加载 
* onscroll                页面滚动 
* onresize                窗口大小变化          
* 鼠标滚轮事件onmousewheel DOMMouseScroll 
* 输入框中value改变触发的事件onreadystatechange 
* attachEvent事件绑定（IE）addEventListener 
* event对象 
* clientX/clientY  鼠标当前窗口的位置 
* 取消冒泡cancelBubble 
* 键盘键值keyCode     
* 特殊的键值Event altKey、ctrlKey、shiftKey 
* 阻止默认事件preventDefault()return false
* 
**DOM操作:**

* getElementById        获取ID元素 
* getElementsByTagName                获取tag类元素 
* childNodes                子节点 特殊浏览器包括默认的文本节点（换行等……） 
* children                        子节点 
* firstChild/firstElementChildlastChild/lastElementChild
* 兄弟节点 
nextSibling/nextElementSiblingpreviousSibing/previousElementSibing 
* parentNode 父节点 
* offsetParent        有定位属性的父节点 
* nodeType                节点类型 
* offsetWidth        元素的宽度（包括padding和border） 
* offsetHeight        元素的高度（包括padding和border)
* clientWidth        可视区宽度 
* clientHeight        可视区高度 
* createElement                创建dom节点 
* appendChild                插入子节点 
* insertBefore                在子节点的第一个前面插入 
* removeChild                删除子节点 
* replaceChild                替换节点 并返回被替换元素  
**BOM操作:**

* window.open()         
* window.close() 
* window.location 
* window.location.search 
* window.location.hash 
* window.navigator.userAgent

**js基础:**

判断
* if else 
* switch case  
* ? :

循环
* for 
* for in 
* while

跳出循环
* continue 
* break
* 比较undefined null  === == !

定时器类
* setTimeout 
* clearTimeout 
* setInterval 
* clearInterval

参数集合

arguments

**调回THIS指向**
* call 
* apply 
* callee

**数组和数组操作**
* var arr = []; 
* var arr = new Array(); 
* push                               
* pop 
* shift 
* unshift 
* splice 
* join 
* sort 
* concat

**字符串操作**

* split 
* substring 
* indexOf 
* charAt
* 
**正则**
* var re = //; 
* var re = new RegExp(); 
* search 
* match 
* test 
* replace
*
量词:

{n,m} + * ?字符类: [^0-9]标识: i g首尾: ^ $转义: \d \s \b \w

**JS时间**
* var oDate = new Date(); 
* getHours() 
* getMinutes() 
* getSeconds() 
* getFullYear() 
* getDay() 
* getDate() 
* setDate()

**图片预加载**

var oImg = new Image();

**常用方法:**
* getByClass() 
* getStyle() 
* posLeft() 
* veiwHeight() 
* documentHeight() 
* scrollY() 
* first() 
* last() 
* next() 
* pre()

**常用的JS操作应用**
* 加开关:bBtn 
* 加索引:index 
* 枚举 
* 递归 
* 迭代 
* 定时器 
* alert/console.log测试

**JS运动类的应用**
* 匀速运动 
* 缓冲运动 
* 弹性运动 
* 碰撞运动 
* 运动框架编写/使用

**Math函数应用:**
* max 
* min 
* abs 
* random 
* ceil 
* floor 
* round
 
**ajax内容**

**什么是ajax?**

**post和get的区别?**

**发送数据是什么样的?**

**返回数据是什么样的?**

**ajax的编写步骤?**

**json怎么取?**

**面向对象:**

**什么是面向对象?**

**引用类型是什么意思?**

**原型是什么?**

**面向对象怎么写?**

**继承采用的方式?**

**this指向理解?**