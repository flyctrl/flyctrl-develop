---
title: 可以直接拿来用的15个jQuery代码片段
tags:
  - jQuery代码
id: 111
categories:
  - JS/Jq
date: 2015-07-12 01:28:56
---

&emsp;&emsp;jQuery里提供了许多创建交互式网站的方法，在开发Web项目时，开发人员应该好好利用jQuery代码，它们不仅能给网站带来各种动画、特效，还会提高网站的用户体验。

&emsp;&emsp;本文收集了15段非常实用的jQuery代码片段，你可以直接复制黏贴到代码里，但请开发者注意了，要理解代码再使用哦。下面就让我们一起来享受jQuery代码的魅力之处吧。

**1.预加载图片**

```javascript
(function($) {
var cache = [];
// Arguments are image paths relative to the current page.
$.preLoadImages = function() {
var args_len = arguments.length;
for (var i = args_len; i--;) {
var cacheImage = document.createElement('img');
cacheImage.src = arguments[i];
cache.push(cacheImage);
}
}
jQuery.preLoadImages("image1.gif", "/path/to/image2.png");
```

**2\. 让页面中的每个元素都适合在移动设备上展示**

```javascript
var scr = document.createElement('script');
scr.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');
document.body.appendChild(scr);
scr.onload = function(){
$('div').attr('class', '').attr('id', '').css({
'margin' : 0,
'padding' : 0,
'width': '100%',
'clear':'both'
});
};
```

**3.图像等比例缩放**

```javascript
$(window).bind("load", function() {
// IMAGE RESIZE
$('#product_cat_list img').each(function() {
var maxWidth = 120;
var maxHeight = 120;
var ratio = 0;
var width = $(this).width();
var height = $(this).height();
if(width > maxWidth){
ratio = maxWidth / width;
$(this).css("width", maxWidth);
$(this).css("height", height * ratio);
height = height * ratio;
}
var width = $(this).width();
var height = $(this).height();
if(height > maxHeight){
ratio = maxHeight / height;
$(this).css("height", maxHeight);
$(this).css("width", width * ratio);
width = width * ratio;
}
});
//$("#contentpage img").show();
// IMAGE RESIZE
});
```

**4.返回页面顶部**

```javascript
// Back To Top
$(document).ready(function(){
$('.top').click(function() {
$(document).scrollTo(0,500);
});
});
//Create a link defined with the class .top
<a href="#" class="top">Back To Top</a>
```

**5.使用jQuery打造手风琴式的折叠效果**

```javascript
var accordion = {
init: function(){
var $container = $('#accordion');
$container.find('li:not(:first) .details').hide();
$container.find('li:first').addClass('active');
$container.on('click','li a',function(e){
e.preventDefault();
var $this = $(this).parents('li');
if($this.hasClass('active')){
if($('.details').is(':visible')) {
$this.find('.details').slideUp();
} else {
$this.find('.details').slideDown();
}
} else {
$container.find('li.active .details').slideUp();
$container.find('li').removeClass('active');
$this.addClass('active');
$this.find('.details').slideDown();
}
});
}
};
```

**6.通过预加载图片廊中的上一幅下一幅图片来模仿Facebook的图片展示方式**

```javacsript
var nextimage = "/images/some-image.jpg";
$(document).ready(function(){
window.setTimeout(function(){
var img = $("").attr("src", nextimage).load(function(){
//all done
});
}, 100);
});
```

**7.使用jQuery和Ajax自动填充选择框**

```javascript
$(function(){
$("select#ctlJob").change(function(){
$.getJSON("/select.php",{id: $(this).val(), ajax: 'true'}, function(j){
var options = '';
for (var i = 0; i < j.length; i++) {
options += '
' + j[i].optionDisplay + '
';
}
$("select#ctlPerson").html(options);
})
})
})
```

**8.自动替换丢失的图片**

```javascript
// Safe Snippet
$("img").error(function () {
$(this).unbind("error").attr("src", "missing_image.gif");
});
// Persistent Snipper
$("img").error(function () {
$(this).attr("src", "missing_image.gif");
});
```

**9.在鼠标悬停时显示淡入/淡出特效**

```javascript
$(document).ready(function(){
$(".thumbs img").fadeTo("slow", 0.6); // This sets the opacity of the thumbs to fade down to 60% when the page loads
$(".thumbs img").hover(function(){
$(this).fadeTo("slow", 1.0); // This should set the opacity to 100% on hover
},function(){
$(this).fadeTo("slow", 0.6); // This should set the opacity back to 60% on mouseout
});
});
```

**10.清空表单数据**

```javascript
function clearForm(form) {
// iterate over all of the inputs for the form
// element that was passed in
$(':input', form).each(function() {
var type = this.type;
var tag = this.tagName.toLowerCase(); // normalize case
// it's ok to reset the value attr of text inputs,
// password inputs, and textareas
if (type == 'text' || type == 'password' || tag == 'textarea')
this.value = "";
// checkboxes and radios need to have their checked state cleared
// but should *not* have their 'value' changed
else if (type == 'checkbox' || type == 'radio')
this.checked = false;
// select elements need to have their 'selectedIndex' property set to -1
// (this works for both single and multiple select elements)
else if (tag == 'select')
this.selectedIndex = -1;
});
};
```

**11.预防对表单进行多次提交**

```javascript
$(document).ready(function() {
$('form').submit(function() {
if(typeof jQuery.data(this, "disabledOnSubmit") == 'undefined') {
jQuery.data(this, "disabledOnSubmit", { submited: true });
$('input[type=submit], input[type=button]', this).each(function() {
$(this).attr("disabled", "disabled");
});
return true;
}
else
{
return false;
}
});
});
```

**12.动态添加表单元素**

```javascript
//change event on password1 field to prompt new input
$('#password1').change(function() {
//dynamically create new input and insert after password1
$("#password1").append("");
});
```

**13.让整个Div可点击**

```javascript
 $(".myBox").click(function(){
 window.location=$(this).find("a").attr("href");
 return false; 
 });
```

**14.平衡高度或Div元素**

```javascript
var maxHeight = 0;
$("div").each(function(){
if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});
$("div").height(maxHeight);
```

**15\. 在窗口滚动时自动加载内容**

```javascript
var loading = false;
$(window).scroll(function(){
if((($(window).scrollTop()+$(window).height())+250)>=$(document).height()){
if(loading == false){
loading = true;
$('#loadingbar').css("display","block");
$.get("load.php?start="+$('#loaded_max').val(), function(loaded){
$('body').append(loaded);
$('#loaded_max').val(parseInt($('#loaded_max').val())+50);
$('#loadingbar').css("display","none");
loading = false;
});
}
}
});
$(document).ready(function() {
$('#loaded_max').val(50);
});
```