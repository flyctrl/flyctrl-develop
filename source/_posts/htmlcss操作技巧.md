---
title: html+css操作技巧
tags:
  - css技巧
  - html技巧
id: 168
categories:
  - 前端杂货
date: 2015-07-12 21:24:26
---

1\. 文字强制不换行,多余部分用省略号代替

```css
white-space:nowrap;text-overflow:ellipsis;overflow:hidden;
```

2\. 火狐，```<textarea>```禁止拖拽拉动

```css
resize:none; 或者 min-width:;max-width:;min-height:;max-height:;
```

3\. 火狐，`<label>`放入多个input, text需要多次点击才可以打字，radio则无法实现单选改用`<p></p>`标记书写

4\. `<a> `标记去除虚线框
```css
a{outline:none;blr:expression(this.onFocus=this.blur());}
```

5\. `<img>`下方出现5px空白
```css
img{display:block;}
```

6\. banner图片满屏居中显示`<img >`

div {position:relative;overflow:hidden;height:200px;text-align:center;}
div img{position:absolute;left:50%;top:0;margin-left:-1250px;}
(注意：margin-left:所得到的值是img的尺寸除以2。)

7\. 背景透明
```css
filter:alpha(opacity=80);opacity:0.8;
```

8\. 火狐里,`<label>`放入多个input,text则需要多次点击才可以打字，若为radio则无法实现单选改用`<p>`标记书写

9\. `<p></p>`可在网页上直接更改内容,规定是否允许用户编辑内容`Contenteditable=“true”`

10.input失去焦点文字消失
```html
<input type="text" value="请输入用户名" class="in_serch" />
```
