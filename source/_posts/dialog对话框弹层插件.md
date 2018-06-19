---
title: dialog对话框弹层插件
tags:
  - dialog对话框弹层
  - 弹框插件
id: 1939
categories:
  - 插件库
date: 2015-12-15 17:58:37
---

![](http://www.npm8.com/wp-content/uploads/2015/12/2.jpg)

## 用法:

```html
<link rel="stylesheet" type="text/css" href="../dist/dialog.css">
<input type="button" id="btn_dialog" value="打开浮层"/>
<div id="dialog-content" style="display:none;">这是内容</div>
<script src="../src/jquery-1.9.1.min.js"></script>
<script src="../src/dialog.js"></script>
<script>
 var dialog = new Dialog();
 dialog.init({target:"#dialog-content",trigger:"#btn_dialog",mask:true,width:500,height:300,title:'标题'});
</script>```

## 或者用jquery方式调用:

```html
<link rel="stylesheet" type="text/css" href="../dist/dialog.css">
<input type="button" id="btn_dialogjquery" value="jq打开浮层"/>
<div id="dialog-contentjq" style="display:none;">这是内容22</div>
<script src="../src/dialog-jquery.js"></script>
<script>
$('#btn_dialogjquery').Dialog({target:"#dialog-contentjq",mask:true,width:500,height:300,title:'标题'})
</script>
```

## 继承类alert和confirm提示(jquery模式下)：

HTML
```html
<link rel="stylesheet" type="text/css" href="../dist/dialog.css">
<input type="button" id="btn_alert" value="alert"/>
<input type="button" id="btn_alert2" value="alert定时关闭"/>
<input type="button" id="btn_confirm" value="confirm三种按钮"/>
<input type="button" id="btn_confirmdefault" value="confirm默认"/>
```
Javascript
```javascript
$('#btn_alert').click(function(){
    $.alert('选好商品才能上传素材哦',true,function(){
        alert('你点击了ok')
    })
});
$('#btn_alert2').click(function(){
    $.alert('选好商品才能上传素材哦')
});
$('#btn_confirm').click(function() {
   $.confirm('下载全部9张图片至本地相册? < divclass = "confirm-title2" > 文字内容已复制 < /div>', [{
     yes: "是"
   }, {
     no: '否'
   }, {
     close: '关闭'
   }], function(type) {
     $.alert('您点击了' + type);
     this.hide();
   });
 }) $('#btn_confirmdefault').click(function() {
   $.confirm('你确定要删除这条消息吗? ', null, function(type) {
     $.alert('您点击了' + type);
     this.hide();
   });
 })
```

## 属性或方法

trigger:
触发对象

target:
弹出内容，可以为#id,或者jquery对象

mask:
是否有遮罩层

title:
标题

zIndex:
z-index

closeTpl:
关闭html(默认:```<span class="ui-dialog-close js-dialog-close">x</span>```)

titleTpl:
标题html(默认：```<div class="ui-dialog-title"></div>```)

fixed:bool
是否固定位置，默认不固定
方法及回调

show:
显示弹层

hide:
隐藏

beforeShow：function(content)
显示前的方法回调,content是浮层内容对象

beforeHide：function(content)
隐藏前的方法回调,content是浮层内容对象

setPosition:function()
设置位置居中

## 事件

hide:
```$('.ui-dialog').trigger('hide');```触发弹窗的隐藏事件.

[查看演示](http://demo.grycheng.com/case/dialogalert/example/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/12/dialog-master.zip)