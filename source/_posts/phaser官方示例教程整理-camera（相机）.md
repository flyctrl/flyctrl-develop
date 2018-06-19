---
title: Phaser官方示例教程整理—Camera（相机）
tags:
  - phaser中的Camera(相机)
id: 1724
categories:
  - Phaser
date: 2015-09-21 19:23:08
---

官方教程示例 http://phaser.io/examples

## 相机 Camera

### **1\. 镜头跟随**
实现游戏角色在大地图中的镜头跟随效果，角色保持在镜头中间，靠近边界时镜头也不会超出地图边界。
```javascript
game.physics.startSystem(Phaser.Physics.P2JS);
player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
game.physics.p2.enable(player);
cursors = game.input.keyboard.createCursorKeys();
game.camera.follow(player);  //镜头跟随关键
```
&nbsp;

### **2\. 镜头移动**
可以直接通过game.camera来控制镜头的位置
```javascript
game.camera.x = 50;
```
&nbsp;

### **​3\. 镜头跟随触发区域dead zone**

在镜头跟随的基础上，可以设定一个方形的触发镜头移动的区域Dead Zone。即当角色到达Dead Zone的边界时，镜头就触发往相应方向移动的效果。如果不设置的话，角色必须到达镜头边界后，才会移动镜头（也就是默认的Dead Zone大小与镜头区域大小一致）。
```javascript
game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
```
&nbsp;

### **4\. 保持在镜头固定位置**

如果想在镜头某处固定一个元素，比如电视台的图标那样，只需要将元素的fixedToCamera设置成true
```javascript
logo.fixedToCamera = true;
```
&nbsp;

### **5\. 镜头跟随模式**
共有四种跟随模式：LOCKON/PLATFORMER/TOPDOWN/TOPDOWN_TIGHT

实际上就是设置了四种不同大小的Dead Zone:

```javascript
w = width/8   h = height/3​   
LOCKON：Dead Zone 设置为null
PLATFORMER​：（-7w/16, -1h/3, w,h）
helper  = max(w, h)/4​
TOPDOWN：（(width-helper)/2, (height-helper)/2, helper, helper）
helper  = max(w, h)/8​
​TOPDOWN_TIGHT​：（(width-helper)/2, (height-helper)/2,  helper, helper）
```
&nbsp;

### **6\. 角色不出镜头范围**
需要给游戏角色的图片加上物理碰撞检测，碰到边界时，角色将无法在继续向前