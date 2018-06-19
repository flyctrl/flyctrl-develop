---
title: JQuery中append和appendTo的，及js中的appendChild、insertBefore 讲解
tags:
  - append
  - appendChild
  - appendTo
  - insertBefore
id: 300
categories:
  - JS/Jq
date: 2015-07-13 15:09:34
---

**append和appendTo的区别**

append()前面是要选择的对象，后面是要在对象内插入的元素内容

appendTo()前面是要插入的元素内容**且为Jquery对象**，而后面是要选择的对象

实例：
```javascript
$('#a').append('**content**');
$('**<div>content</div>**').appendTo($('#a'));
```
注意appendTo前面一定要是Jquery对象。

**appendChild、insertBefore的用法**

appendChild 学过的都知道，appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
如果对它理解不深，经常会犯一些错误。我以前就是哈哈。

下面我们来分析一下。
```javascript
var myDiv = document.createElement_x("div");
var text = document.createTextNode("sichaoyun");
myDiv.appendChild(text);
alert(myDiv.childNodes[0].nodeValue);
```
text 就会添加到div节点里面。

我们用的时候一定要注意，text一定要是节点。不能直接添加内容或数组里面的内容。

```var arr = ["si","chaoyun"];```

比如：myDiv.appendChild(arr[0]); 就会出错。

必须把节点添加到数组里面 才可以用appendChild.
```javascript
var arr=[];
arr[0]=document.createTextNode("si");
arr[1]=document.createTextNode("chaoyun");
myDiv.appendChild(arr[0]);这样就ok啦。这样添加的是节点。
```
appendChild另一个需要注意的就是它会删除源节点。
来看下面这个demo。

```javascript
var str1=document.createElement_x('div');
str1.innerHTML="<span>1</span><span>2</span>";
alert(str1.childNodes.length); //2
document.getElementByIdx_x('mydiv').appendChild(str1.childNodes[0]);
alert(str1.childNodes.length); //1
```

str1里面的1添加到mydiv里面之后str1里面的span已经不存在了。

你可以理解为是移动到mydiv里面。所以第二个会弹出1.
另外insertBefore也是会删除源节点。

来看下面这个例子：

```javascript
var src = document.createElement_x("div");
src.innerHTML = "<span>1</span><span>2</span>";
var dest = document.createElement_x("div");
dest.innerHTML = "<span>3</span>";
for (var i = 0; i< src.childNodes.length; i++)
{
dest.insertBefore(src.childNodes[i], dest.childNodes[0]);
}
alert(dest.childNodes.length);
```

看看 alert 会显示几？按常理，dest 本来有一个节点，再加上 src 的两个，应该是三个才对，可是结果却是 2。原因是使用 insertBefore 后，src 对应的子节点已经被删除，或者说已经被移动到 dest，要解决，有两种方法。

使用 while 循环可以解决这个问题
```javascript
<script type="text/javascript">
var src = document.createElement_x("div");
src.innerHTML = "<span>1</span><span>2</span>";
var dest = document.createElement_x("div");
dest.innerHTML = "<span>3</span>";
while (src.childNodes.length > 0)
{
dest.insertBefore(src.childNodes[0], dest.childNodes[0]);
}
alert(dest.childNodes.length);
</script>
```

appendChild(Node)这个 方法一般是在指定元素节点的最后一个子节点之后添加节点
但如果Node是页面中的DOM对象，那么就不是添加节点了，就是直接Move节点。


appendChild你可以理解为移动一个元素。如果想复制一份过去，要事先clone