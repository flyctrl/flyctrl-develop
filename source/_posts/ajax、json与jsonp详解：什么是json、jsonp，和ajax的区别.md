---
title: ajax、json与jsonp详解：什么是json、jsonp，和ajax的区别
tags:
  - json
  - jsonp
id: 150
categories:
  - JS/Jq
date: 2015-07-12 21:05:58
---

现在前后端跨域传输比较流行的技术就是jsonp了，传递格式那就是json，至于ajax，历史比较久了吧，05年的时候虽然才开始高调登台，但从技术利用历史上看，98年的时候就已经在使用了。

由于现在很多人（当然我们团队也是）都在使用jquery、ext等各种库，而且使用这些库来调用jsonp非常容易，但这里有很多误解。因为这些库均把jsonp归入了ajax范畴（可能是为了方便整个库的结构开发，毕竟两者或多或少还是有一些关系的）。一直想写一下ajax、json、jsonp三者之间的区别，但苦于没时间。今日突然发现有篇博文不错，转过来，作为资料保存。

本文主要讲解**ajax、json、jsonp的区别**，相关提问可能会是**什么是ajax**、**什么是json**、**什么是jsonp**？**json和jsonp的区别**、**ajax和jsonp的联系与区别**，jsonp和ajax有关系吗？等等。

以下内容转自互联网，从转载地方看，应该也是转载，或者说是采集来的，就不再去找原文地址了。

### 一、前言

由于Sencha Touch 2这种开发模式的特性，基本决定了它原生的数据交互行为几乎只能通过AJAX来实现。

当然了，通过调用强大的PhoneGap插件然后打包，你可以实现100%的Socket通讯和本地数据库功能，又或者通过HTML5的WebSocket也可以实现与服务器的通讯和服务端推功能，但这两种方式都有其局限性，前者需要PhoneGap支持，后者要求用户设备必须支持WebSocket，因此都不能算是ST2的原生解决方案，原生的只有AJAX。

说到AJAX就会不可避免的面临两个问题，第一个是AJAX以何种格式来交换数据？第二个是跨域的需求如何解决？这两个问题目前都有不同的解决方案，比如数据可以用自定义字符串或者用XML来描述，跨域可以通过服务器端代理来解决。

但到目前为止最被推崇或者说首选的方案还是用JSON来传数据，靠JSONP来跨域。而这就是本文将要讲述的内容。

JSON和JSONP虽然只有一个字母的差别，但其实他们根本不是一回事儿：JSON是一种数据交换格式，而JSONP是一种依靠开发人员的聪明才智创造出的一种非官方跨域数据交互协议。我们拿最近比较火的谍战片来打个比方，JSON是地下党们用来书写和交换情报的“暗号”，而JSONP则是把用暗号书写的情报传递给自己同志时使用的接头方式。看到没？一个是描述信息的格式，一个是信息传递双方约定的方法。


既然随便聊聊，那我们就不再采用教条的方式来讲述，而是把关注重心放在帮助开发人员理解是否应当选择使用以及如何使用上。


### 二、什么是json？json到底是什么？

前面简单说了一下，JSON是一种基于文本的数据交换方式，或者叫做数据描述格式，你是否该选用他首先肯定要关注它所拥有的优点。

**JSON的优点：**

*   基于纯文本，跨平台传递极其简单；
*   Javascript原生支持，后台语言几乎全部支持；
*   轻量级数据格式，占用字符数量极少，特别适合互联网传递；
*   可读性较强，虽然比不上XML那么一目了然，但在合理的依次缩进之后还是很容易识别的；
*   容易编写和解析，当然前提是你要知道数据结构；
JSON的缺点当然也有，但在作者看来实在是无关紧要的东西，所以不再单独说明。

**JSON的格式或者叫规则：**

JSON能够以非常简单的方式来描述数据结构，XML能做的它都能做，因此在跨平台方面两者完全不分伯仲。

*   JSON只有两种数据类型描述符，大括号{}和方括号[]，其余英文冒号:是映射符，英文逗号,是分隔符，英文双引号""是定义符。
*   大括号{}用来描述一组“不同类型的无序键值对集合”（每个键值对可以理解为OOP的属性描述），方括号[]用来描述一组“相同类型的有序数据集合”（可对应OOP的数组）。
*   上述两种集合中若有多个子项，则通过英文逗号,进行分隔。
*   键值对以英文冒号:进行分隔，并且建议键名都加上英文双引号""，以便于不同语言的解析。
*   JSON内部常用数据类型无非就是字符串、数字、布尔、日期、null 这么几个，字符串必须用双引号引起来，其余的都不用，日期类型比较特殊，这里就不展开讲述了，只是建议如果客户端没有按日期排序功能需求的话，那么把日期时间直接作为字符串传递就好，可以省去很多麻烦。
现在前后端跨域传输比较流行的技术就是jsonp了，传递格式那就是json，至于ajax，历史比较久了吧，05年的时候虽然才开始高调登台，但从技术利用历史上看，98年的时候就已经在使用了。

由于现在很多人（当然我们团队也是）都在使用jquery、ext等各种库，而且使用这些库来调用jsonp非常容易，但这里有很多误解。因为这些库均把jsonp归入了ajax范畴（可能是为了方便整个库的结构开发，毕竟两者或多或少还是有一些关系的）。一直想写一下ajax、json、jsonp三者之间的区别，但苦于没时间。今日突然发现有篇博文不错，转过来，作为资料保存。

本文主要讲解**ajax、json、jsonp的区别**，相关提问可能会是**什么是ajax**、**什么是json**、**什么是jsonp**？**json和jsonp的区别**、**ajax和jsonp的联系与区别**，jsonp和ajax有关系吗？等等。

**JSON实例：**
```javascript
// 描述一个人
var person = {
"Name": "Bob",
"Age": 32,
"Company": "IBM",
"Engineer": true
}

// 获取这个人的信息
var personAge = person.Age;

// 描述几个人
var members = [
{
"Name": "Bob",
"Age": 32,
"Company": "IBM",
"Engineer": true
},
{
"Name": "John",
"Age": 20,
"Company": "Oracle",
"Engineer": false
},
{
"Name": "Henry",
"Age": 45,
"Company": "Microsoft",
"Engineer": false
}
]

// 读取其中John的公司名称
var johnsCompany = members[1].Company;
// 描述一次会议
var conference = {
"Conference": "Future Marketing",
"Date": "2012-6-1",
"Address": "Beijing",
"Members":
[
{
"Name": "Bob",
"Age": 32,
"Company": "IBM",
"Engineer": true
},
{
"Name": "John",
"Age": 20,
"Company": "Oracle",
"Engineer": false
},
{
"Name": "Henry",
"Age": 45,
"Company": "Microsoft",
"Engineer": false
}
]
}

// 读取参会者Henry是否工程师
var henryIsAnEngineer = conference.Members[2].Engineer;
```
关于JSON，就说这么多，更多细节请在开发过程中查阅资料深入学习。

**JSONP的客户端具体实现：**

不管jQuery也好，extjs也罢，又或者是其他支持jsonp的框架，他们幕后所做的工作都是一样的，下面我来循序渐进的说明一下jsonp在客户端的实现：

1、我们知道，哪怕跨域js文件中的代码（当然指符合web脚本安全策略的），web页面也是可以无条件执行的。

远程服务器remoteserver.com根目录下有个remote.js文件代码如下：
```
alert('我是远程文件');
```
本地服务器localserver.com下有个jsonp.html页面代码如下：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
</head>
<body>
</body>
</html>
```
毫无疑问，页面将会弹出一个提示窗体，显示跨域调用成功。

2、现在我们在jsonp.html页面定义一个函数，然后在远程remote.js中传入数据进行调用。

jsonp.html页面代码如下：
```html
<script type="text/javascript">// <![CDATA[
var localHandler = function(data){           alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result);       };
// ]]></script><script src="http://remoteserver.com/remote.js" type="text/javascript"></script>
```
这次的代码变化比较大，不再直接把远程js文件写死，而是编码实现动态查询，而这也正是jsonp客户端实现的核心部分，本例中的重点也就在于如何完成jsonp调用的全过程。

我们看到调用的url中传递了一个code参数，告诉服务器我要查的是CA1998次航班的信息，而callback参数则告诉服务器，我的本地回调函数叫做flightHandler，所以请把查询结果传入这个函数中进行调用。

OK，服务器很聪明，这个叫做flightResult.aspx的页面生成了一段这样的代码提供给jsonp.html（服务端的实现这里就不演示了，与你选用的语言无关，说到底就是拼接字符串）：
```javascript
flightHandler({
    "code": "CA1998",
    "price": 1780,
    "tickets": 5
});
```
我们看到，传递给flightHandler函数的是一个json，它描述了航班的基本信息。运行一下页面，成功弹出提示窗口，jsonp的执行全过程顺利完成！

4、到这里为止的话，相信你已经能够理解jsonp的客户端实现原理了吧？剩下的就是如何把代码封装一下，以便于与用户界面交互，从而实现多次和重复调用。

什么？你用的是jQuery，想知道jQuery如何实现jsonp调用？好吧，那我就好人做到底，再给你一段jQuery使用jsonp的代码（我们依然沿用上面那个航班信息查询的例子，假定返回jsonp结果不变）：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>Untitled Page</title>
<script type="text/javascript" src=jquery.min.js"></script>
<script type="text/javascript">
jQuery(document).ready(function(){
$.ajax({
type: "get",
async: false,
url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
dataType: "jsonp",
jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
success: function(json){
alert('您查询到航班信息：票价： ' + json.price + ' 元，余票： ' + json.tickets + ' 张。');
},
error: function(){
alert('fail');
}
});
});
</script>
</head>
<body>
</body>
</html>
```
是不是有点奇怪？为什么我这次没有写flightHandler这个函数呢？而且竟然也运行成功了！哈哈，这就是jQuery的功劳了，jquery在处理jsonp类型的ajax时（还是忍不住吐槽，虽然jquery也把jsonp归入了ajax，但其实它们真的不是一回事儿），自动帮你生成回调函数并把数据取出来供success属性方法来调用，是不是很爽呀？

好啦，写到这里，我已经无力再写下去，又困又累，得赶紧睡觉。朋友们要是看这不错，觉得有启发，给点个“推荐”呗！由于实在比较简单，所以就不再提供demo源码下载了。

### 三、总结补充

*   ajax和jsonp这两种技术在调用方式上“看起来”很像，目的也一样，都是请求一个url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装；

*   但ajax和jsonp其实本质上是不同的东西。ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加< script>标签来调用服务器提供的js脚本。

*   所以说，其实ajax与jsonp的区别不在于是否跨域，ajax通过服务端代理一样可以实现跨域，jsonp本身也不排斥同域的数据的获取。

*   还有就是，jsonp是一种方式或者说非强制性协议，如同ajax一样，它也不一定非要用json格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用jsonp提供公开服务。
总而言之，jsonp不是ajax的一个特例，哪怕jquery等巨头把jsonp封装进了ajax，也不能改变着一点！