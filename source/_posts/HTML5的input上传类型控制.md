---
title: HTML5的input上传类型控制
tags:
  - HTML5的input上传类型控制
  - input[type=file]
  - input上传
id: 2662
categories:
  - HTML5/CSS3
date: 2017-10-31 15:00:00
---

## 一、input:file属性
属性值有以下几个比较常用：

accept：表示可以选择的文件MIME类型，多个MIME类型用英文逗号分开，常用的MIME类型见下表。

multiple：是否可以选择多个文件，多个文件时其value值为第一个文件的虚拟路径。

### 1、accept
只能选择png和gif图片
```html
<input id="fileId1" type="file" accept="image/png,image/gif" name="file" />
```
### 2、multiple
多文件上传
```html
<input id="fileId2" type="file" multiple="multiple" name="file" />
```

### 3、常用MIME类型
```javascript
后缀名       MIME名称
*.3gpp    audio/3gpp, video/3gpp
*.ac3    audio/ac3
*.asf       allpication/vnd.ms-asf
*.au           audio/basic
*.css           text/css
*.csv           text/csv
*.doc    application/msword    
*.dot    application/msword    
*.dtd    application/xml-dtd    
*.dwg    image/vnd.dwg    
*.dxf      image/vnd.dxf
*.gif            image/gif    
*.htm    text/html    
*.html    text/html    
*.jp2            image/jp2    
*.jpe       image/jpeg
*.jpeg    image/jpeg
*.jpg          image/jpeg    
*.js       text/javascript, application/javascript    
*.json    application/json    
*.mp2    audio/mpeg, video/mpeg    
*.mp3    audio/mpeg    
*.mp4    audio/mp4, video/mp4    
*.mpeg    video/mpeg    
*.mpg    video/mpeg    
*.mpp    application/vnd.ms-project    
*.ogg    application/ogg, audio/ogg    
*.pdf    application/pdf    
*.png    image/png    
*.pot    application/vnd.ms-powerpoint    
*.pps    application/vnd.ms-powerpoint    
*.ppt    application/vnd.ms-powerpoint    
*.rtf            application/rtf, text/rtf    
*.svf           image/vnd.svf    
*.tif         image/tiff    
*.tiff       image/tiff    
*.txt           text/plain    
*.wdb    application/vnd.ms-works    
*.wps    application/vnd.ms-works    
*.xhtml    application/xhtml+xml    
*.xlc      application/vnd.ms-excel    
*.xlm    application/vnd.ms-excel    
*.xls           application/vnd.ms-excel    
*.xlt      application/vnd.ms-excel    
*.xlw      application/vnd.ms-excel    
*.xml    text/xml, application/xml    
*.zip            aplication/zip    
*.xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

## 二、AJAX上传文件
在说到ajax上传文件。ajax上传的时候，需要获得input:file选择的文件（可能为多个文件），获取其文件列表为：
```javascript
// input标签的files属性
document.querySelector("#fileId").files
// 返回的是一个文件列表数组
```
获得的文件列表，然后遍历插入到表单数据当中。即：
```javascript
// 获得上传文件DOM对象
var oFiles = document.querySelector("#fileId");


// 实例化一个表单数据对象
var formData = new FormData();



// 遍历图片文件列表，插入到表单数据中
for (var i = 0, file; file = oFiles[i]; i++) {
    // 文件名称，文件对象
    formData.append(file.name, file);
}
```
获得表单数据之后，就可以用ajax的POST上传。
```javascript
// 实例化一个AJAX对象
var xhr = new XMLHttpRequest();
xhr.onload = function() {
    alert("上传成功！");
}
xhr.open("POST", "upload.php", true);

// 发送表单数据
xhr.send(formData);
```
上传到服务器之后，获取到文件列表为：
```javascript
Array
(
    [jpg_jpg] => Array
        (
            [name] => jpg.jpg
            [type] => image/jpeg
            [tmp_name] => D:\xampp\tmp\phpA595.tmp
            [error] => 0
            [size] => 133363
        )

    [png_png] => Array
        (
            [name] => png.png
            [type] => image/png
            [tmp_name] => D:\xampp\tmp\phpA5A6.tmp
            [error] => 0
            [size] => 1214628
        )

)
```
在服务端循环遍历这个数组就可以上传文件了。