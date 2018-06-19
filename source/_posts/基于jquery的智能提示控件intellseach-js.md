---
title: 基于jquery的智能提示控件intellSeach.js
tags:
  - intellSeach.js
  - js智能提示
id: 1572
categories:
  - JS/Jq
date: 2015-09-09 23:31:23
---

## 一、需求

&emsp;&emsp;我们经常会遇到【站内搜索】的需求，为了提高用户体验，我们希望能做到像百度那样的即时智能提示。例如：某公司人事管理系统，想搜索李XX，只要输入“李”，系统自然会提示一些姓李的员工，这样方便用户使用。说白了，就是用户边输入，系统会提示相关的结果；或者，当用户点击搜索框时，就推荐一些内容，如360、百度都会提示今天的主要新闻或搜索量大的内容。

&emsp;&emsp;jquery 已经有一个这样的插件了，叫 autocomplete, 但我觉得不好用。关于autocomplete的介绍也很多，有兴趣的朋友可以去试试。

&emsp;&emsp;看标题就知道，这里只是分享一个插件，不会讨论后台搜索的相关算法和过程，也就是说，后台返回特定格式的数据，控件负责渲染结果呈现。ok,先看一下效果图：

效果一：

![1](http://www.npm8.com/wp-content/uploads/2015/09/13.jpg)

效果图二：

![2](http://www.npm8.com/wp-content/uploads/2015/09/23.jpg)

样式与控件无关，只需要一个 input text 就可以了。

## 二、参数说明

&emsp;&emsp;控件以json格式作为传输格式。参数比较多，大部分都有默认值（具体看源码），有些可能不常用，保持默认即可。如下：

url: 请求地址。如：Handler.ashx, 后台获取数据的地址

property: 要显示的json对象的属性。如果我们直接返回["tom","tom cat","tom2"] 这样的形式，那么该属性可以不用设置；但有时候我们会返回[{"Name":"tom","ID":"001"},{"Name":"tom cat","ID":"002"},{"Name":"tom2","ID":"003"}] 这样的形式，显示的是Name，那么设置该属性为"Name"即可。至于我们想在点击的时候获得点击的项的ID,通过点击事件即可。

itemNumber: 显示的项数目。

isEmptyRequest: focus时，空白是否发起请求。就像前面说的，如果点击搜索框时(此时没有内容)，想要推荐一些内容，设置该属性为true，即会发起请求。

defaultValue: 默认值。通常会是：“请输入关键词...” 这类的提示。

width: 下拉列表宽度。

aligner: 要对齐的元素。

maxHeight: 最大高度。如果设置该高度，超过时就会出现滚动条。

ajax:{
timeout: 超时时间
cache: 是否缓存
},

event:{
setData: 发送请求前触发。用于设置参数
itemClick: 点击项触发
enterKeydown: 按下enter键触发
beforeRender: 所有项呈现前触发
endRender: 所有项呈现后触发
itemBeforeRender: 项呈现前触发
itemAfterRender: 项呈现后触发
beforeSend: 发送请求前触发。用户设置请求头部参数等，相当于jquery ajax 的 beforeSend。
}

event 里的方法都会在适当的时候触发，需要注意的是，所有方法都接收一个参数，该参数是一个对象，有4个属性，某些情况如果没有该属性的，则为空。包括如下属性：

jthis: input 的 jQuery 对象。

jItem: 项的 jQuery 对象。

data: 返回的 json 字符串。如果在前台需要对返回 json 再进行处理，那么可以通过 data 属性获得，处理完成后，需要将 json 字符串 return。

event: 事件对象，如按下 enter 时的事件对象。

## 三、例子

使用例子：
```javascript
$("#search").intellSearch({
    url:"Handler.ashx",
    property:"Name",
    itemNumber:5,
    isEmptyRequest:false,
    defaultValue:"请输入关键字...",       
    width:$("#search").width() + 2,
    maxHeight:-1,
    event:{
        itemClick:function(obj){
            alert(obj.item.ID);
        },
        enterKeydown:function(obj){
            if(obj.item){
                alert("有当前项");
            }else{
                alert("没有当前项");
            }
        }
    }   
});
```
## 四、总结

&emsp;&emsp; 如果你还有自己的逻辑需要处理，也支持链式调用，大可以这样写 $("#search").intellSearch({参数...}).focus(function(){你的处理...});

&emsp;&emsp;分享该插件希望能帮助到有需要的朋友，主要用于学习。由于是v1.0，可能还有一些bug，有发现的朋友也可以告诉我，我会及时修正。

[js附源代码下载](http://www.npm8.com/wp-content/uploads/2015/09/intellSeach.js)

样式
```css
.intellResult{margin:0;padding:0;background:#fff;border:1px solid #b6b6b6;clear:both;z-index:999;display:none;}
.intellResult li{margin:0;padding:0;padding:5px 15px;height:20px;line-height:20px;overflow:hidden;text-overflow:ellipsis;cursor:pointer;white-space:nowrap;}
.intellResult li.cur{background:#E5E0E0;}
```