---
title: Phaser官方示例教程整理—Text(文本)
tags:
  - Phaser中的text
id: 1731
categories:
  - Phaser
date: 2015-09-21 18:59:36
---

官方教程示例 http://phaser.io/examples

## 文本 Text

### 1\. 加载位图字体
```javascript
game.load.bitmapFont('名称', '位图png', '位图xml');
game.add.bitmapText(200, 100, '字体名称', '文本内容', 64);
```
### 2\. 位图文本拖拽
```javascript
bmpText = game.add.bitmapText(200, 100, '字体名称', '文本内容', 64);
bmpText​.inputEnabled = true;
```
### 3\. 文本对齐
```javascriptText​.anchor.x = 0;```
x方向上，0/0.5/1分别对应靠右、中间、靠左对齐​
y方向上，​0/0.5/1分别对应靠上、中间、靠下对齐

### 4\. 位图文本最大显示宽度
```javascript
bmpText​.maxWidth = 400;
```
### 5\. 位图文本清除
```javascript
var purged = bmpText.purgeGlyphs();
```
### 6\. 位图文本使用物理系统
```javascript
game.physics.arcade.enable( [text1, text2] );
//意思就是位图可以和普通图片一样使用物理系统引擎吧
game.physics.startSystem(Phaser.Physics.ARCADE);//开始使用引擎
game.physics.arcade.enable([ text1, text2 ]);//在文本上添加引擎

//设置速度、碰撞边界、弹性
text1.body.velocity.setTo(200, 200);
text1.body.collideWorldBounds = true;
text1.body.bounce.set(1);
game.physics.arcade.collide(text1, text2, onCollide);//碰撞检测
```
### 7\. 文本居中（阴影和背景）
style里面设置align:"center"​即可

text.setShadow(x,y,color,blur);

text.setTextBounds(x,y,w,h);

### 8\. 文本居中（图片上居中）
实际上是通过图片的位置，实时调整字体的坐标

### 9\. 文本字母颜色设置
可以从字符串某个位置开始，设置后面字符的颜色
text.addColor('颜色值', 起始位置);

### 10\. 文本动态阴影
实现了字体的阴影动态变化，效果比较酷炫

### 11\. 字体扩展功能
可以自定义特殊的字体类，直接在游戏中创建

### 12\. 在线字体
直接使用在线的字体库

### 13\. 文本逐字逐句出现
展现输入文字过程的效果​

### 14\. 文本颜色控制
通过字体style中，以函数来返回相应的值，达到控制字体的效果
fill:generateHexColor()​

### 15\. 文本制作工具
kvazars.com/littera

### 15\. 文本删除
text.destroy();

### 16\. 字体复古风格效果

### 17\. ​修改文本样式
text.fontSize = 30;

### 18\. ​文本区设置和对齐
```javascript
text.setTextBounds(x, y, w, h);
text.align = align[i].a;
text.boundsAlignH = align[i].h;
text.boundsAlignV = align[i].v;
```
### 19\. ​文本事件响应
```javascript
text.inputEnabled = true;
text.input.enableDrag();
text.events.onInputOver.add(over, this);
text.events.onInputOut.add(out, this);
text.events.onInputDown.add(down, this);
text.events.onInputUp.add(up, this);
```
### 20\. ​文本渐变样式
```javascript
var grd = text.context.createLinearGradient(0, 0, 0, text.height);
//渐变的两个色值
grd.addColorStop(0, '#8ED6FF');   
grd.addColorStop(1, '#004CB3');
text.fill = grd;
```
### 21\. ​文本行距
text.lineSpacing = 40;

### 22\. ​文本边距
text.padding = 40;

### 23\. ​文本倒影样式
制作出文本的倒影

### 24\. ​文本分辨率设置
text.resolution = 1;

### 25\. ​文本描边
```javascript
text.stroke = "#de77ea";   
text.strokeThinckness = 16;​
text.addstrokeColor("#de77ea", 30)​
```
### 26\. ​文本tab对齐
text.tabs = 123;

"Armor \t spell"​ \t来表示tab键

可以用数组来分别设置tab距离：tabs:[143, 234, 50]​

headings = ['Name', 'Damage', 'Speed', 'Notes']​

text.parseList(headings)​

### 27\. ​文本颜色填充
```javascript
text.tint =  (item.tint === 0xffffff) ? 0xff0000 : 0xffffff;
```

### 28\. ​文本使用物理引擎

### 29\. ​文本内容设置
text.setText("string");

### 30\. ​文本自动换行
```javascript
style = {
font: 'bold 60pt Arial',
fill: 'white',
align: 'left',
wordWrap: true,
wordWrapWidth: 450
};
```
注：换行设置对中文无效...​