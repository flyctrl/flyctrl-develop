---
title: 移动端下拉刷新、加载更多插件dropload.js(基于jQuery/Zepto)
tags:
  - dropload.js
  - 移动端下拉刷新
  - 移动端加载更多
id: 1869
categories:
  - 插件库
date: 2015-10-26 16:36:30
---

废话不多说，先让大家看一下案例效果：

![](http://www.npm8.com/wp-content/uploads/2015/10/demo1.png)

[DEMO1，加载底部](http://demo.grycheng.com/case/dropload/examples/load-bottom.html)

&nbsp;

![](http://www.npm8.com/wp-content/uploads/2015/10/demo2.png)

[DEMO2，加载顶部、底部](http://demo.grycheng.com/case/dropload/examples/load-top-bottom.html)

&nbsp;

![](http://www.npm8.com/wp-content/uploads/2015/10/demo3.png)

[DEMO3，固定布局，加载顶部、底部](http://demo.grycheng.com/case/dropload/examples/product-list.html)

&nbsp;

## 使用方法

引用css和js
```html
<link rel="stylesheet" href="../dist/dropload.min.css">
<script src="../dist/dropload.min.js"></script>```
$('.element').dropload({
    scrollArea : window,
    loadDownFn : function(me){
        $.ajax({
            type: 'GET',
            url: 'json/more.json',
            dataType: 'json',
            success: function(data){
                alert(data);
                // 代码执行后必须重置
                me.resetload();
            },
            error: function(xhr, type){
                alert('Ajax error!');
                me.resetload();
            }
        });
    }
});
```
参数列表
<table border="1">
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>默认值</th>
<th>可填值</th>
</tr>
</thead>
<tbody>
<tr>
<td>scrollArea</td>
<td>滑动区域</td>
<td>绑定元素自身</td>
<td>window</td>
</tr>
<tr>
<td>domUp</td>
<td>上方DOM</td>
<td>{
domClass : 'dropload-up',
domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
domUpdate : '<div class="dropload-update">↑释放更新</div>',
domLoad : '<div class="dropload-load">○加载中...</div>'
}</td>
<td>数组</td>
</tr>
<tr>
<td>domDown</td>
<td>下方DOM</td>
<td>{
domClass : 'dropload-down',
domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
domUpdate : '<div class="dropload-update">↓释放加载</div>',
domLoad : '<div class="dropload-load">○加载中...</div>'
}</td>
<td>数组</td>
</tr>
<tr>
<td>distance</td>
<td>拉动距离</td>
<td>50</td>
<td>数字</td>
</tr>
<tr>
<td>loadUpFn</td>
<td>上方function</td>
<td>空</td>
<td>function(me){
//你的代码
me.resetload();
}</td>
</tr>
<tr>
<td>loadDownFn</td>
<td>下方function</td>
<td>空</td>
<td>function(me){
//你的代码
me.resetload();
}</td>
</tr>
</tbody>
</table>

## API

暴露一些功能，可以让dropload更灵活的使用

lock() 锁定dropload

unlock() 解锁dropload

&nbsp;

本站下载地址：[点击下载](http://www.npm8.com/wp-content/uploads/2015/10/dropload.zip)

&nbsp;