---
title: Phaser官方示例教程整理—Sprite（精灵）
tags:
  - phaser中的sprite（精灵）
id: 1720
categories:
  - Phaser
date: 2015-09-21 20:13:33
---

官方教程示例 http://phaser.io/examples

## 精灵 Sprite

### **1\. 创建一个精灵**
```javascript
game.load.image('mushroom', 'assets/sprites/mushroom2.png');
var test = game.add.sprite(200, 200, 'mushroom');game.add.bitmapText(200, 100, '字体名称', '文本内容', 64);
```
&nbsp;

### **2\. 创建一个图像**
精灵和图像的区别在于，图像不能添加物理属性和帧动画
```javascript
var image = game.add.image(100, 100, 'pic');
```
&nbsp;

### **3\. 精灵对齐方式**
```javascript
Sprite.anchor.x = 0;
```
x方向上，0/0.5/1分别对应中心点在图像左、中、右

y方向上，​0/0.5/1分别对应中心点在图像上、中、下

&nbsp;

### **4\. 精灵动画**
动画每一帧大小为37x45，一共有18帧图片在一张PNG文件上；如果png上充满了动画帧，则不需要标明帧图片的数量，如果有多余的空白，则需要填入数值
动画帧应该是从上至下，从左至右进行播放
```javascript
game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
var mummy = game.add.sprite(10, 10, 'mummy');
mummy.animations.add('walk');
mummy.animations.play('walk', 20, true);
```
&nbsp;

### **5\. 子精灵**
```javascript
parent = game.add.sprite(100, 100, 'mushroom');
parent.addChild(game.make.sprite(-50, -50, 'mummy'));
```
&nbsp;

### **6\. 精灵碰撞**
```javascript
//设置物理引擎对象组
pineapples = game.add.group();
pineapples.enableBody = true;
pineapples.physicsBodyType = Phaser.Physics.ARCADE;
for (var i = 0; i < 10; i++)
{
    var pineapple = pineapples.create(200 + i * 48,50, 'pineapple');
    //设置和世界边界的碰撞、xy方向上的重力值、弹性
    pineapple.body.collideWorldBounds = true;
    pineapple.body.gravity.x = game.rnd.integerInRange(-50, 50);
    pineapple.body.gravity.y = 100 + Math.random() * 100;
    pineapple.body.bounce.setTo(0.9, 0.9);
}
```
&nbsp;

### **7\. 销毁精灵**
```javascript
sprite.inputEnabled = true;
//鼠标悬停时显示手型形状
sprite.input.useHandCursor = true;
sprite.events.onInputDown.add(destroySprite, this);
destroySprite：sprite.destroy();
```
&nbsp;

### **8\. 动态遮罩**
```javascript
//设置背景图片
pic = game.add.sprite(0, 0, 'trsi');
w = pic.width;
h = pic.height;
//设置窗口大小
cropRect = new Phaser.Rectangle(0, 0, 128, 128);
//使用遮罩
pic.crop(cropRect);
function update() {
    if (game.input.x < w &amp;&amp; game.input.y < h)
    {
        pic.x = game.input.x;
        pic.y = game.input.y;
        cropRect.x = game.input.x;
        cropRect.y = game.input.y;
        pic.updateCrop();
    }
}
```
&nbsp;

**9\. 子精灵固定大小**
```javascript
parent = game.add.sprite(100, 100, 'disk');
child = game.make.sprite(0, 0, 'ball');
parent.addChild(child);
//  Fix the scale of the child so it will never scale below 1 or above 2
child.setScaleMinMax(1, 2);
//  Even though the parent will scale, the child will remain at its own scale (and this is carried on down to any of its children)
game.add.tween(parent.scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
```
&nbsp;

### **10\. 圆形遮罩**
```javascript
//Here we add a Sprite to the display list
sprite = game.add.sprite(0, 0, 'chaos');
sprite.scale.set(2);
//创建遮罩形状
mask = game.add.graphics(0, 0);
//填充
mask.beginFill(0xffffff);
mask.drawCircle(100, 100, 100);
sprite.mask = mask;
//移动鼠标或遮罩时
game.input.addMoveCallback(move, this);
move:mask.x = x - 100;mask.y = y - 100;
```
&nbsp;

### **11\. 移动精灵**
加载不规则的精灵图集方法，需要json文件说明
```javascript
game.load.atlasJSONHash('bot',
'assets/sprites/running_bot.png',
'assets/sprites/running_bot.json');
```
制作工具app: "http://www.texturepacker.com",

&nbsp;

### **12\. 不使用引擎的碰撞检测**
```javascript
sprite1 = game.add.sprite(100, 200, 'atari1');
sprite1.inputEnabled = true;
sprite1.input.enableDrag();
sprite2 = game.add.sprite(400, 400, 'atari2');
sprite2.inputEnabled = true;
sprite2.input.enableDrag();
//检测函数
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
```
&nbsp;

### **13\. 精灵旋转和缩放**
```javascript
sprite = game.add.sprite(400, 100, 'disk');
game.add.tween(sprite).to( { angle: 45 }, 2000, Phaser.Easing.Linear.None, true);
game.add.tween(sprite.scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
```
&nbsp;

### **14\. 精灵定点旋转**
```javascript
orb.position.rotate(ship.x, ship.y, 2, true, 100);
```
&nbsp;

### **15\. 加载bitmap精灵**
```javascript
// 创建bitmap
var bmd = game.add.bitmapData(128,128);
// draw to the canvas context like normal
bmd.ctx.beginPath();
bmd.ctx.rect(0,0,128,128);
bmd.ctx.fillStyle = '#ff0000';
bmd.ctx.fill();
var sprite = game.add.sprite(200, 200, bmd);
```
&nbsp;

### **16\. 加载图集**
```javascript
game.load.atlas('atlas', 'assets/pics/texturepacker_test.png', 'assets/pics/texturepacker_test.json');
chick = game.add.sprite(64, 64, 'atlas');
chick.frameName = 'budbrain_chick.png';
chick.frame = 0;
```
可以通过名称或顺序来获得切图

&nbsp;