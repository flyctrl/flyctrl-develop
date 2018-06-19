---
title: IE下javascript的各种错误与js兼容问题
tags:
  - js兼容
id: 243
categories:
  - 前端兼容
date: 2015-07-13 13:56:43
---

ie6下会出现一些很奇怪的错误

比如：

1、使用关键词fields,class等关键词做变量或者属性名会出现语法错误，可以加上单引号{'class',1}

2、在object里多加了逗号也会出错，var obj={a:0;b:1,}//错误

3、ie规定了一些只读元素类似table,dl等，如果在其内部添加其他元素会出现"未指明的错误"

4、ie6下的document.getElementById会匹配name属性

5、父元素使用了滤镜filter:AlphaImageLoader不仅子元素中的input、a等不能正常使用，而且子元素的mouseover、mousedown等事件也不会触发。

6、flash as3中使用flash.external.ExternalInterface.call调用js的时候，如果flash没有给定id则会出现 'null'为空或不是对象 //document.getElementById("").SetReturnValue(__flash__toXML()))

7、ie6或ie7中直接用appendChild或者innerHTML改变table内容会导致表格不显示（但内容确实添加）或出错，解决方法是添加tbody元素。

8、ie6 substr不支持负数

9、ie中form.elements如果不给下标或键值 它等于form本身，因此不能使用for in来遍历

10、win7中ietester不支持滤镜，当使用js改变fliter属性时会出现"不支持此接口"错误