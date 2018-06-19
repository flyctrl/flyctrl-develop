---
title: jQuery+CSS3实现点击动画弹出表单代码
tags:
  - jq+css3 弹出表单
id: 1459
categories:
  - 插件库
date: 2015-08-31 19:27:27
---

分享一款基于jQuery+CSS3点击动画弹出表单代码是一款鼠标点击图标按钮动画弹出表单特效代码。效果图如下：

[![201508191436039075](http://www.npm8.com/wp-content/uploads/2015/08/201508191436039075-650x377.jpg)](http://www.npm8.com/wp-content/uploads/2015/08/201508191436039075.jpg)
实现的代码。

html代码：
```html
<div class="buttonCollection">
<div class="qutton" id="qutton_upload">
<div class="qutton_dialog" id="uploadDialog">
<h2>上传</h2>
<div class="urlField">
<input type="text" id="fileUrl" placeholder="文件地址" />
</div>
<div id="button_basic_upload">选择文件</div>
</div>
</div>

<div class="qutton" id="qutton_delete">
<div class="qutton_dialog" id="deleteDialog">
<h2>确定？</h2>
<div id="button_basic_confirm_delete">确定删除</div>
</div>
</div>

<div class="qutton" id="qutton_comment">
<div class="qutton_dialog" id="commentDialog">
<textarea name="comment" id="commentInput" placeholder="你的评论..."></textarea>
<div id="button_basic_submit_comment">发送</div>
</div>
</div>
</div>
```
js代码：
```javascript
$(function () {
     var quttonUpload = Qutton.getInstance($('#qutton_upload'));
     quttonUpload.init({
         icon: 'images/icon_upload.png',
         backgroundColor: '#917466'
     });

     var quttonDelete = Qutton.getInstance($('#qutton_delete'));
     quttonDelete.init({
         icon: 'images/icon_delete.png',
         backgroundColor: "#eb1220"
     });

     var quttonComment = Qutton.getInstance($('#qutton_comment'));
     quttonComment.init({
         icon: 'images/icon_comment.png',
         backgroundColor: "#41aaf1"
     });
});
```
[查看演示](http://demo.grycheng.com/case/jqCss3Animate/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/08/jqCss3Animate.zip)