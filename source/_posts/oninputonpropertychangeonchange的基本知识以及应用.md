---
title: 'oninput,onpropertychange,onchange的基本知识以及应用'
tags:
  - onchange
  - oninput
  - onpropertychange
id: 1280
categories:
  - JS/Jq
date: 2015-08-26 13:05:32
---

**onchange触发事件必须满足两个条件：**

a）当前对象属性改变，并且是由键盘或鼠标事件激发的（脚本触发无效）

b）当前对象失去焦点(onblur)；

&nbsp;
**onpropertychange与oninput**

只要当前对象属性发生改变，都会触发事件，但是它是IE专属的；

oninput是onpropertychange的非IE浏览器版本，支持firefox和opera等浏览器，但有一点不同，它绑定于对象时，并非该对象所有属性改变都能触发事件，它只在对象value值发生改变时奏效。

在textarea中，如果想捕获用户的键盘输入，用onkeyup检查事件就可以了，但是onkeyup并不支持复制和粘贴，因此需要动态监测textarea中值的变化，这就需要onpropertychange（用在IE浏览器）和oninput（非IE浏览器）结合在一起使用了。

&nbsp;
**onpropertychange的bug**

在代码实现时，发现在响应用户onclick了textarea时，如果使用obj.className="XX";

来改变textarea输入框中字体的样式，会导致在ie下会有在输入第一个字符的时候onpropertychange不会触发的bug，因此需要这样设置：obj.style.color="#000";

&nbsp;