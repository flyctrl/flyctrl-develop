---
title: Phaser官方示例教程整理—Buttons(按钮)
tags:
  - phaser中的buttons
id: 1733
categories:
  - Phaser
date: 2015-09-21 17:03:09
---

官方教程示例 http://phaser.io/examples

## 按钮 Buttons

### **1\. 点击事件**

添加按钮 button = game.add.button(X, Y, '按钮图片名', 函数名, this, 2, 1, 0);

最后的2，1，0是针对按钮悬停、离开、按下三种状态（还有一种弹起状态）的背景图片ID标识，也可以用文本进行命名图片​

鼠标悬停 button.onInputOver.add(over, this);

鼠标离开 button.onInputOut.add(out, this);

按钮弹起 button.onInputUp.add(up, this);

以上三种响应事件中的over/out/up均为函数名


&nbsp;

### **2\. 加入群组**
按钮加入到群组中的方式与其他元素没什么区别，创建群组之后再加入按钮即可

```javascript
group = game.add.group();​
group.add(button);​
```
&nbsp;

### **3\. 按钮属性**
主要是示范了如何调整按钮的角度、​固定宽高、缩放

角度：button.angle = 32

固定宽高：button.width(height) = 300

按比例缩放（1为原始比例）：button.scale.setTo(0.5, 0.5)​；

&nbsp;

### **4\. 按钮背景变化（图集）​**

根据按钮不同状态（按下、悬停等）改变按钮的背景图片，首先需要准备好图集资源（集合了多张按钮背景的图片）​，然后在生成按钮时标注上不同状态对应的图片名称

```javascript
button = game.add.button(x, y, 'button', actionOnClick, this, 'over', 'out', 'down');
```
&nbsp;

### **5\. ​按钮的取消功能**

​示例中主要的意思是实现了一个带有取消功能的按钮，特别之处在于如果鼠标点击这个取消按钮之后，然后又将鼠标移出按钮之后再放开，将认为用户后悔了，不想再进行取消。

​主要实现步骤是在回调函数中添加对鼠标行为的监视：

```javascript
function onUp(button, pointer, isOver) {
    if (isOver)
    {
        background.visible =! background.visible;
    }
}
```
&nbsp;

### **​6\. 改变按钮背景**
可以通过button.setFrames(0,1,2,3)来重新设定按钮不同状态的背景图片

&nbsp;

### **7\. 按钮旋转**
主要是展示了，即时按钮在旋转状态也是可以点击的，旋转的实现方法是在update()保留函数中实时增加button.angle的值

在按钮的教程中，用到了spritesheet和​atlas两种方式来加载按钮背景图片。一般来看，固定宽高的图片用spritesheet更加方便，而atlas更加灵活也稍微麻烦一些。