---
title: ajax分页插件
tags:
  - ajax分页插件
  - jq分页插件
  - js分页插件
id: 1946
categories:
  - 插件库
date: 2015-12-15 18:12:03
---

![paging](http://www.npm8.com/wp-content/uploads/2015/12/paging.jpg)

## 使用方法案例:
```javascript
$('#pageTool').Paging({pagesize:10,count:100});
//或者
var p = new Paging();
p.init({target:'#pageTool',pagesize:10,count:100});
```

## 属性和方法

hash:true
是否用url hash值的形式来表达分页，默认为true,但如果出现两个分页时，为导致互相影响，应保证只有一个对应hash

pagesize:
每页的条数

current:
当前页码，默认为1

prevTpl
上一页的模板,默认“上一页”

nextTpl
下一页的模板，默认“下一页”

firstTpl
首页的模板，默认“首页”

lastTpl
末页的模板，默认“末页”

ellipseTpl
省略号的模板，默认“...”

toolbar: bool
是否显示工具栏,默认为false

pageSizeList:[]
当显示工具栏时有效，可设置每页条数，默认为[5,10,15,20]

callback:function(page,size,count)
翻页时的回调方法，page为当前页码,size为每页条数，count为总页数

changePagesize:function(ps)
修改每页的条数,参数为int

go:function(p)
跳转至某一页,默认到current

render:function(ops)
重新渲染,ops:{count:int,pagesize:int,current:int,pagecount:int}

[查看演示](http://demo.grycheng.com/case/paging-master/example/index-requirejs.html)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/12/paging-master.zip)