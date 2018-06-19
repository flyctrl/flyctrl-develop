---
title: jQuery异步上传文件
tags:
  - ajax 上传文件
  - jq 上传文件
  - jquery.form.js
  - jQuery异步上传文件
id: 2378
categories:
  - JS/Jq
date: 2016-05-27 10:03:45
---

### 问题描述：

通过jQuery异步上传文件，这是HTML:
```html
<span>File</span>
<input type="file" id="file" name="file" size="10"/>
<input id="uploadbutton" type="button" value="Upload"/>
```
JavaScript代码：
```javascript
$(document).ready(function () {
$("#uploadbutton").click(function () {
var filename = $("#file").val();

$.ajax({
type: "POST",
url: "addFile.do",
enctype: 'multipart/form-data',
data: {
file: filename
},
success: function () {
alert("Data Uploaded: ");
}
});
});
});
```
以上方法只能得到上传的文件名，怎么办？

&nbsp;

**解决办法1：** 

直接通过jQuery Form插件来解决这个问题：[http://malsup.com/jquery/form/#code-samples](http://malsup.com/jquery/form/#code-samples)，相关的API、Options对象可以自行查阅官网；

**解决办法2：**

采用HTML5，用jQuery,Ajax实现文件上传，不仅如此，你可以做文件验证（名称，大小，MIME类型）或利用HTML5的进度标签（或者div）处理进度事件；
HTML代码：
```html
<form enctype="multipart/form-data">
<input name="file" type="file" />
<input type="button" value="Upload" />
</form>
<progress></progress>
```
首先，你可以做一些验证，例如文件的onChange事件：
```javascript
$(':file').change(function(){
    var file = this.files[0];
    name = file.name;
    size = file.size;
    type = file.type;
    //your validation
});
```
按钮点击触发Ajax:
```javascript
$(':button').click(function(){
    var formData = new FormData($('form')[0]);
    $.ajax({
        url: 'upload.php',  //server script to process data
        type: 'POST',
        xhr: function() {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax事件
        beforeSend: beforeSendHandler,
        success: completeHandler,
        error: errorHandler,
        // Form数据
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        contentType: false,
        processData: false
    });
});
```
处理进度：
```javascript
function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}
```