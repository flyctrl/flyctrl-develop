---
title: 跨浏览器复制粘贴插件-ZeroClipboard快速入门详解(JS复制粘贴功能)
tags:
  - JavaScript复制功能
  - JavaScript复制粘贴功能
  - js 复制功能
  - js复制粘贴功能
  - ZeroClipboard api
  - ZeroClipboard.js
  - ZeroClipboard.js详解
id: 2227
categories:
  - 插件库
date: 2016-03-22 21:16:24
---

&emsp;&emsp;有些时候，我们希望让用户在网页上完成某个操作就能自动将指定的内容复制到用户计算机的剪贴板中。但是出于安全原因，大多数现代浏览器都未提供通用的剪贴板复制接口(或即便有，也默认被禁用)。只有IE浏览器可以通过如下方式来进行复制。
```javascript
window.clipboardData.setData("Text", "这里是需要复制的文本内容");
```
想要实现跨浏览器的复制功能，我们就可以使用 ZeroClipboard。

## **一、ZeroClipboard 及其原理介绍**

&emsp;&emsp;ZeroClipboard 是国外大神开发的一个用于剪贴板复制的 JS 插件，它是基于 Flash 来实现跨浏览器的复制功能的。当我们使用 ZeroClipboard 的时候，它会悄悄隐藏一个小小的 Flash 影片(swf)，不会对我们的用户界面造成影响。我们只需要借助它实现复制功能就行了。ZeroClipboard 中的 "Zero" 指的就是"不可见，零干扰"。

&emsp;&emsp;不过从 Flash 10开始，由于浏览器和Flash的安全限制，要求用户必须在Flash区域上进行真实操作才能操作剪贴板。于是，ZeroClipboard 的作者想到一个办法：它将 Flash 做成透明的，以便于我们放在诸如链接、按钮等需要放置的任何地方。这样，用户界面看起来没有变化，当点击链接或按钮时，实际上点击是却是 Flash，从而实现复制操作。

## **二、ZeroClipboard 快速入门**

&emsp;&emsp;使用 ZeroClipboard 的方法非常简单，我们只需要在页面中引入它的一个JS文件并稍作配置(最简单只需一行代码)即可(实际上还需要引入一个Flash的swf文件，不过 ZeroClipboard 会自动引入它)。

请参考下面的示例代码：

注意：这里介绍的是目前最新版 ZeroClipboard 2.1.6 的用法，2.x 版本均可参考，但 1.x 的用法与此并不相同！
ZeroClipboard 2.x 原则上不兼容IE 6 ~ IE 8等低版本IE浏览器，如果需要兼容IE 6 ~ IE 8，请使用 1.x 或者 2.0.2 版本(详情可以参考下方评论中的官方链接)，推荐使用 2.0.2 版本。此外，由于 Flash [本地沙箱](http://help.adobe.com/zh_CN/as3/dev/WS5b3ccc516d4fbf351e63e3d118a9b90204-7e3f.html#WS5b3ccc516d4fbf351e63e3d118a9b90204-7c8f)的安全限制，以下代码如果是在本地HTML文件中被浏览器直接打开，将无法正常工作。
```html
<!-- 这里是HTML代码部分 -->
<textarea id="content" rows="10" cols="60">这里是需要复制的内容</textarea>
<input id="copy" type="button" data-clipboard-target="content" value="复制">
<!-- 这里是JS代码部分 -->
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.min.js" ></script>
<script type="text/javascript">
// 将【复制】按钮充当复制数据的元素载体
var clip = new ZeroClipboard( document.getElementById("copy") );
</script>
```
&emsp;&emsp;以上就是引入并使用 ZeroClipboard 的最简代码。我们为【复制】按钮指定了`data-clipboard-target`属性，其值为将被复制数据的元素id。此时，我们点击【复制】按钮就可以复制id为content的textarea中的文本数据。

## **三、ZeroClipboard 重要事项**

### 1、关于文件引入和本地化使用

&emsp;&emsp;上面我们引入的JS文件是 ZeroClipboard 官方提供的 CDN，你可以直接使用。如果你想将其下载到本地服务器上使用，你可以进入[官方网](https://github.com/zeroclipboard/zeroclipboard)站下载最新版本。然后将dist目录下的**ZeroClipboard.js**(或者压缩版的ZeroClipboard.min.js)和**ZeroClipboard.swf**这两个文件上传到自己的服务器即可。

&emsp;&emsp;请确保它们被放在**同一目录**下，以便于 ZeroClipboard.js 自动加载 ZeroClipboard.swf 文件。否则你需要在使用前额外配置swf文件的路径。
```javascript
// 在 new ZeroClipboard()之前，需要先配置 ZeroClipboard.swf 文件的路径
ZeroClipboard.config( { swfPath: 'http://YOURSERVER/path/ZeroClipboard.swf' } );
```

### 2、多个复制载体

&emsp;&emsp;如果你希望在页面中有多个按钮、链接等元素充当复制数据的载体，你可以以数组(或类数组)形式传入多个元素。以下几种方式都是可以的：
```javascript
// 方式一 (生成多个ZeroClipboard对象，适合不同载体复制不同来源的数据)
var clip = new ZeroClipboard( document.getElementById("copy") );
var clip2 = new ZeroClipboard( document.getElementById("copy2") );

// 方式二 (生成一个ZeroClipboard对象，适合不同载体复制相同来源的数据)
var doms = [ document.getElementById("copy"), document.getElementById("copy2") ];
// var doms = document.getElementsByName("copy"); // 通过ByName或ByTagName获取多个元素也是可以的
// var doms = $(".copy"); // 通过jQuery对象也是可以的
// 只要是通过length属性访问元素个数、通过数字索引来访问DOM元素的对象都是可以的
var clip = new ZeroClipboard( doms );
```

### 3、更改复制载体

&emsp;&emsp;如果之前你使用【按钮1】来充当复制载体，现在你想添加【按钮2】来充当复制载体。你可以调用 ZeroClipboard 实例的<span style="color: #ff6600;">**clip()**</span>方法：
```javascript
var clip = new ZeroClipboard( document.getElementById("copy") );
// 添加id为copy2的元素作为复制载体，原来id为copy的元素依然可用
clip.clip( document.getElementById("copy2") /* 也可以数组形式传入多个 */  );
```
如果你想要卸载指定的复制载体，你可以使用unclip()方法。
```javascript
// 取消id为copy2的元素上注册的复制功能
clip.unclip( document.getElementById("copy2") /* 也可以数组形式传入多个 */  );

// 不指定任何参数，则取消该对象之前在所有元素上注册的复制功能
clip.clip();
```
如果指定了`data-clipboard-target`属性，ZeroClipboard 将依次尝试通过该元素的value、textContent、innerText属性来获取文本数据(依次判断是否有上述属性，并以最靠前的属性为准)。

&emsp;当然，ZeroClipboard 也并非只能通过其他元素才能获得用于复制的文本数据，我们还可以给复制载体自身的`data-clipboard-text`属性来设置用于复制的文本数据，之后你还可以通过设置该属性值(`setAttribute`())来更改需要复制的文本内容。
```html
<input id="copy" type="button" data-clipboard-text="这里是用于复制的内容，CodePlayer" value="复制">
```
&emsp;&emsp;此外，我们甚至无需通过元素节点的属性来设置用于复制的文本数据，我们可以直接使用 ZeroClipboard 对象的`setText()`方法来设置文本数据。注意，该方法设置的数据是一次性的，使用该方法设置复制数据后，只在下一次复制操作时生效。之后即使你点击复制按钮也不再执行复制，除非你再次调用`setText()`方法(你可以绑定复制("copy")事件来调用该方法，从而实现每次复制操作都设置数据，下面我们会讲到)。
```javascript
clip.setText("设置用于复制的文本内容");
```
**数据来源的优先级问题**：如果我们同时为复制载体设置了`data-clipboard-text`、`data-clipboard-target`属性，并调用了`setText()`方法，那么 ZeroClipboard 复制数据的优先级是：`setText()` > `data-clipboard-target` > `data-clipboard-text`。

&emsp;&emsp;如果前者没有文本数据(没有调用、 没有属性或者数据为空字符串)，则以下一个优先级为准，如果都没有文本数据，则不复制。

举例来说，如果同时设置上述三者。第一次复制：先取`setText()`设置的数据，如果为空字符串，则取`data-clipboard-target`对应元素的数据；如果它也为空字符串，则取`data-clipboard-text`属性的文本数据；如果它也为空字符串，则不复制。注意，由于`setText()`设置的数据是一次性的，下一次复制将以`data-clipboard-target`属性为准(除非再次调用`setText()`方法)。

### 4、数据类型

&emsp;&emsp;众所周知，剪贴板中的数据是有类型的，每一种类型都可以有自己的数据。我们复制的数据可以有多种类型，当我们粘贴的时候，会粘贴当前程序可接受类型的数据。

&emsp;&emsp;ZeroClipboard也支持设置多种类型的剪贴板数据。它为我们提供了setText()、setHtml、setRichText()方法分别用于设置纯文本数据、HTML内容、富文本内容。
```javascript
// 可同时设置，粘贴时根据接收程序的不同，而粘贴出不同的内容
clip.setText("CodePlayer");
clip.setHtml("**CodePlayer**");
clip.setRichText("{\\rtf1\\ansi\n{\\b CodePlayer}}");
```
此外，ZeroClipboard还提供了一个通用的设置方法`setData()`，用于设置各种类型的数据。
```javascript
// 可同时设置，粘贴时根据接收程序的不同，而粘贴出不同的内容
clip.setData("text/plain", "CodePlayer");
clip.seData("text/html", "**CodePlayer**");
clip.setData("application/rtf", "{\\rtf1\\ansi\n{\\b CodePlayer}}");
```

### 5、事件处理

&emsp;&emsp;ZeroClipboard 还为我们提供了事件支持，以便于处理ZeroClipboard触发的各种事件。ZeroClipboard支持的事件有"ready"、 "beforecopy"、 "copy"、 "aftercopy"、 "destroy"、 "error"。

我们可以通过`on()`方法来注册事件处理函数。
```javascript
// 当Flash SWF文件加载完成并准备就绪时触发ready事件
clip.on("ready", function(){ alert("加载完成!"); });

// 当触发copy事件时，设置用于复制的文本数据
clip.on("copy", function(e){
    e.clipboardData.setData("text/plain", "这里是用于复制的纯文本数据")
});
```
此外，`off()`方法用来取消注册的事件处理函数，`emit()`方法用来手动触发事件。其用法与jQuery的`on()`、 `off()`、 `trigger()`方法非常相似。

&emsp;&emsp;此外，如果你有多个ZeroClipboard对象，你想为它们都注册事件处理函数。你可以使用全局对象ZeroClipboard的静态方法`ZeroClipboard.on()`、 `ZeroClipboard.off()`、` ZeroClipboard.emit()`来全局性地设置事件。全局事件将对每个对象都生效。

## **四、ZeroClipboard 全局对象的属性和方法**

&emsp;&emsp;以下没有标注返回值类型的方法，均表示该方法没有返回值(即undefined)。
`version`
`String类型`返回当前使用的 ZeroClipboard 的版本号，例如 "2.1.6"。

`config(...)`
`任意类型`设置或返回 ZeroClipboard 的配置选项。具体的配置选项请参见这里。
```javascript
// 用法一
var config = ZeroClipboard.config(); // 获取对象形式的所有配置选项(副本)
// 用法二
var swfPath = ZeroClipboard.config("swfPath"); // 获取某个具体的配置选项
// 用法三
var config = ZeroClipboard.config( {
    forceHandCursor: true ,
    title: "点击复制"
} ); // 以对象形式设置配置选项，并同时返回所有配置选项的新对象(副本)。

// 返回的包含所有配置选项的对象都是副本，对其进行操作不会影响ZeroClipboard中的配置选项
```
**create()**

创建 Flash bridge SWF 对象。注意：该方法应该被认为是私有的，不建议用户直接访问。

**destroy()**

触发destroy事件，删除所有事件处理器，并销毁Flash bridge。

**setData(...)**

设置用于复制的数据，可以设置多种格式(MIME类型)的数据，如果接收粘贴的程序支持对应的MIME类型，就会在粘贴时粘贴对应类型的数据。
```javascript
// 其用法如下：其中type表示MIME类型，data表示用于复制的数据
ZeroClipboard.setData(type, data);

// 例如：
ZeroClipboard.setData("text/plain", "用于<复制>的文本数据");
ZeroClipboard.setData("text/html", "用于<复制>的文本数据");
```
`getData(...)`

String/Object类型，获取用于复制的数据。
```javascript
// 用法一
var text = ZeroClipboard.getData("text/html"); //获取用于复制的"text/html"类型的数据
// 用法二
var dataObj = ZeroClipboard.getData(); //获取用于复制的所有类型的数据，并以对象形式返回(副本)
```
**clearData(...)**

清空剪贴板中的数据。
```javascript
// 用法一
ZeroClipboard.clearData(); // 清空剪贴板中所有类型的数据
// 用法二
ZeroClipboard.clearData("text/plain"); // 清空剪贴板中"text/plain"类型的数据
```
**focus(...) &amp; activate(...)**

focus()和activate()方法是相同的。用于通过移动Flash SWF 对象到指定的元素上来暂时聚焦/"激活"该元素。激活后，点击该元素可以进行一次复制操作，但仅有一次，之后Flash SWF 对象将从该元素上移除。

activate()是focus()方法的别名，请优先使用focus()方法，activate()主要用于向后兼容。
```javascript
// 激活该元素
ZeroClipboard.focus( document.getElementById("d_clip_button") );
```
**blur() &amp;&amp; deactivate()**
与focus()和activate()方法相对，用于让当前"激活"的元素失去焦点(取消"激活")。deactivate()是blur()的别名。

**activeElement()**

Element类型返回当前被激活的元素，如果没有则返回null。
```javascript
var btn = document.getElementById("d_clip_button");
ZeroClipboard.focus( btn );
var activeEl = ZeroClipboard.activeElement();  // activeEl === btn
```

**state()**

Object类型状态检测方法，用于检测浏览器、Flash 和 ZeroClipboard 的状态。其内容大致如下：
```javascript
var state = ZeroClipboard.state();
/*
state = {
    browser : {
        appName: "Netscape"
        platform: "Win32"
        userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.76 Safari/537.36"
    },
    flash : {
        deactivated: false
        disabled: false
        outdated: false
        overdue: false
        pluginType: "pepper"
        ready: true
        unavailable: false
        version: "12.0.0"
    },
    zeroclipboard : {
        config: Object // 包含所有配置选项的对象副本
        version: "2.1.6"
    }
}
*/
```

**isFlashUnavailable()**

Boolean类型,检测Flash是否明确不可用(包括禁用、过时、不可用、无效等)。注意：该方法应该被看作私有的，一般无需用户去检测。

**on(...)**

为 ZeroClipboard 的全局事件绑定事件处理函数。支持的事件有"ready"、 "beforecopy"、 "copy"、 "aftercopy"、 "destroy"、 "error"，详情参见下面。
```javascript
var listenerFn = function(e) { var ZeroClipboard = this; /* ... */ };
// 为ready事件绑定处理函数，函数内部的this指向全局对象ZeroClipboard
ZeroClipboard.on("ready", listenerFn);

var listenerObj = {
    handleEvent: function(e) { var listenerObj = this; /* ... */ }
};
// 为error事件绑定包含处理函数在内的对象，对象属性名称必须是handleEvent，否则无效。
// 处理函数内部的this指向该函数所在对象
ZeroClipboard.on("error", listenerObj);

// 同时为多个事件绑定相同的处理函数
ZeroClipboard.on("ready error", function(e) { /* ... */ });

// 以对象形式同时为多个事件绑定不同的处理函数
ZeroClipboard.on({
    "ready": function(e) { /* ... */ },
    "error": function(e) { /* ... */ }
});

// 同一个事件都可以多次调用，从而绑定多个处理函数
```
**off(...)**

解除之前为 ZeroClipboard 绑定的全局事件处理函数。
```javascript
// 解除ready事件上绑定的listenerFn函数
ZeroClipboard.off("ready", listenerFn);
// 解除ready事件上绑定的listenerObj对象
ZeroClipboard.off("error", listenerObj);

// 解除多个事件上绑定的同一listenerFn函数
ZeroClipboard.off("ready error", listenerFn);

// 同时解除多个事件上绑定的不同函数
ZeroClipboard.off({
    "ready": readyListenerFn,
    "error": errorListenerFn
});

// 解除ready事件上绑定的所有事件处理函数或对象
ZeroClipboard.off("ready");

// 解除所有事件的所有绑定
ZeroClipboard.off();
```
**emit(...)**

手动触发 ZeroClipboard 的全局事件，会触发该事件上注册的所有事件处理函数。
```javascript
// 触发ready事件
ZeroClipboard.emit("ready");

// 触发error事件
// 这里的name属性是 ZeroClipboard 内部定义的错误类型名称，表示Flash被禁用或未安装。此外还有flash-outdated(版本过低)、 flash-unavailable(无法与JS交互)、 flash-deactivated(未激活)、 flash-overdue(加载Flash SWF超时)。
ZeroClipboard.emit({
    type: "error",
    name: "flash-disabled"
});

// 只有触发copy事件时，会返回被复制的数据
// 由于Flash 10+的安全限制因素，将无法通过代码触发beforecopy、copy、aftercopy等事件
var copyData = ZeroClipboard.emit("copy");
```
**handlers(...)**

Array/Object类型,返回 ZeroClipboard 中指定全局事件绑定的事件处理函数或对象的副本。
```javascript
// 以数组形式返回ready事件的所有事件处理函数或对象
var listeners = ZeroClipboard.handlers("ready");

// 以对象形式返回所有事件的所有事件处理函数或对象
var listenersObj = ZeroClipboard.handlers();
```

### 事件处理及其属性细节

**ready 事件**

&emsp;&emsp;当Flash SWF文件加载完成并准备就绪时触发ready事件。请注意，你必须在 ZeroClipboard.create()方法被自动调用前设置大多数配置选项，否则你无法在之后更改这些选项。
```javascript
ZeroClipboard.on("ready", function(e) {
/*
e = {
    type: "ready",
    message: "Flash communication is established",
    target: null,
    relatedTarget: null,
    currentTarget: flashSwfObjectRef,
    version: "11.2.202",
    timeStamp: Date.now()
};
*/
```

**beforecopy 事件**

&emsp;&emsp;在点击时，Flash对象会触发 beforecopy 事件。这是一个同步事件，只有你指定的处理操作完成后，才会触发copy事件。
```javascript
ZeroClipboard.on("beforecopy", function(e) {
/*
e = {
    type: "beforecopy",
    target: currentlyActivatedElementOrNull,
    relatedTarget: dataClipboardElementTargetOfCurrentlyActivatedElementOrNull,
    currentTarget: flashSwfObjectRef,
    timeStamp: Date.now()
};
*/
```
**copy 事件**

&emsp;&emsp;当点击时，Flash 对象会触发copy事件(在beforecopy之后触发)。你可以通过事件对象e.clipboardData.setData()方法来设置用于复制的数据。
```javascript
ZeroClipboard.on("copy", function(e) {
/*
e = {
    type: "copy",
    target: currentlyActivatedElementOrNull,
    relatedTarget: dataClipboardElementTargetOfCurrentlyActivatedElementOrNull,
    currentTarget: flashSwfObjectRef,
    timeStamp: Date.now(),
    clipboardData: {
     setData: ZeroClipboard.setData,
     clearData: ZeroClipboard.clearData
    }
};
*/
});
```
**aftercopy 事件**

&emsp;&emsp;当数据被复制到剪贴板后，触发该事件。
```javascript
ZeroClipboard.on("aftercopy", function(e) {
/*
  e = {
    type: "aftercopy",
    target: currentlyActivatedElementOrNull,
    relatedTarget: dataClipboardElementTargetOfCurrentlyActivatedElementOrNull,
    currentTarget: flashSwfObjectRef,
    timeStamp: Date.now(),
    success: {
      "text/plain": true,
      "text/html": true,
      "application/rtf": false
    },
    data: {
      "text/plain": "Blah",
      "text/html": "**Blah**",
      "application/rtf": "{\\rtf1\\ansi\n{\\b Blah}}"
    }
  };
*/
});
```
**destroy 事件**

&emsp;&emsp;当ZeroClipboard.destroy()被调用时触发该事件。ZeroClipboard 会确保该事件的处理函数执行完后才完成销毁操作。
```javascript
ZeroClipboard.on("destroy", function(e) {
/*
  e = {
    type: "destroy",
    target: null,
    relatedTarget: null,
    currentTarget: flashSwfObjectRef,
    timeStamp: Date.now(),
    success: {
      "text/plain": true,
      "text/html": true,
      "application/rtf": false
    },
    data: {
      "text/plain": "Blah",
      "text/html": "**Blah**",
      "application/rtf": "{\\rtf1\\ansi\n{\\b Blah}}"
    }
  };
*/
});
```
**error 事件**

&emsp;&emsp;当满足一系列条件时触发该事件，一般是出现错误时触发该事件。
```javascript
// 由于错误有多种，因此事件对象的属性值和个数也不固定，其他错误类型多一个version属性
ZeroClipboard.on("error", function(e) {
/*
  e = {
    type: "error",
    name: "flash-disabled",
    messsage: "Flash is disabled or not installed",
    target: null,
    relatedTarget: null,
    currentTarget: flashSwfObjectRef,
    timeStamp: Date.now(),
    minimumVersion: "11.0.0"
//  ,version: "10.3.183" // 其他错误类型具有该属性，表示当前Flash的版本
  };
*/
});
```

## **五、ZeroClipboard的配置选项**

&emsp;&emsp;以下是 ZeroClipboard 的所有配置选项，所有的选项都具有默认值。你可以调用`ZeroClipboard.config()来设置其中的一个或多个配置选项。

如果特别说明，以下每个属性的值均表示该属性的默认值。
```javascript
var globalConfig = {

  // 指定SWF文件的URL，相对于当前页面。
  // 其默认值指向与ZeroClipboard JS 文件同目录下的"ZeroClipboard.swf"文件
  swfPath: _swfPath,

  // SWF入内的脚本策略: 用于指定SWF应该信任的页面域名
  // (单个字符串，字符串数组)
  // 默认为当前域名
  trustedDomains: window.location.host ? [window.location.host] : [],

  // 是否阻止SWF文件缓存，默认为true
  // 此时，将在SWF请求上添加一个"noCache"的查询参数后缀来阻止访问缓存内容
  cacheBust: true,

  // 启用功能花哨的"桌面"剪贴板，甚至在Linux上，它是众所周知的让人讨厌
  forceEnhancedClipboard: false,

  // 指定等待加载Flash SWF文件的毫秒数，超过该时间就假定Flash在用户浏览器上是未激活的
  // 如果你不在意加载花费的时间，你可以将其设为null
  flashLoadTimeout: 30000,

  // 将其设为false，将允许用户调用ZeroClipboard.focus(...)来处理
  // 而不是依赖于每个DOM元素的mouseover处理程序
  autoActivate: true,

  // 当Flash对象接收处理后，是否在JS中冒泡Flash模拟的对应事件。
  // 例如，你点击进行复制之后，是否让Flash模拟一个click事件，以便于该元素去冒泡触发对应的JS事件
  bubbleEvents: true,

  // 设置放置Flash对象的div的ID属性
  // 其值将会经过针对ID属性的HTML4 规范验证.
  containerId: "global-zeroclipboard-html-bridge",

  // 设置放置Flash对象的div的CSS类名
  containerClass: "global-zeroclipboard-container",

  // 设置Flash对象的div的ID属性和name属性
  // 其值将会经过针对ID属性和name属性的HTML4 规范验证.
  swfObjectId: "global-zeroclipboard-flash-bridge",

  // 将鼠标滑过复制载体元素时使用的CSS类名
  hoverClass: "zeroclipboard-is-hover",

  // The class used to indicate that a clipped element is active (is being clicked).
  activeClass: "zeroclipboard-is-active",

  // 强制所有复制载体元素使用手形光标("cursor: pointer")
  // 重要: 该配置的值可以被一个活动的嵌入SWF修改
  forceHandCursor: false,

  // 设置放置Flash对象的div的title属性，鼠标悬停时显示的提示文本
  // 重要: 该配置的值可以被一个活动的嵌入SWF修改
  title: null,

  //Flash对象的 z-index CSS属性
  // 最大值为(332位): 2147483647.
  // 重要: 该配置的值可以被一个活动的嵌入SWF修改
  zIndex: 999999999

};
```
官方地址：[http://zeroclipboard.org/](http://zeroclipboard.org/)

相应版本下载地址：[http://www.bootcdn.cn/zeroclipboard/](http://www.bootcdn.cn/zeroclipboard/)

&nbsp;