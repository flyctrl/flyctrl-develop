---
title: select接收后台返回值的解决方案
tags:
  - select接收后台返回值
id: 871
categories:
  - JS/Jq
date: 2015-07-25 16:22:13
---

在做页面表单或者条件筛选的时候，如何把select标签的值，在刷新页面后，保持选择的值。下面，将给出两种解决方案：

前提： 前台select标签 name为type ； 后台接收type的值，业务完成后把type值反回给页面。

**一：利用jquery为select标签赋值。**

第1步： 为select增加id，便于jquery控制。
```html
<select name="type" id="type">
   <option value="0">优</option>
   <option value="1">良</option>
   <option value="2">及格</option>
</select>
```
第2步：利用jquery接收后台type的值并为select标签赋值。
```javascript
<script type="text/javascript">
   $(function(){
      $("[name='type']").val(${type});
   })
</script>
```
//或者
```javascript
<script type="text/javascript">
   $(function(){
      $("#type").val(${type});
   })
</script>
```
**二：利用jstl控制select的option是否选中。**
```html
<select name="type">
   <option value="0" <c:if test="${type==0}">selected</c:if>>优</option>
   <option value="1" <c:if test="${type==1}">selected</c:if>>良</option>
   <option value="2" <c:if test="${type==2}">selected</c:if>>及格</option>
</select>
```
&nbsp;

&nbsp;