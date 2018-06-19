---
title: DOT.JS使用详解
tags:
  - DOT.JS
  - DOT.JS使用介绍
  - DOT.JS使用详解
  - DOT.JS使用说明
id: 2203
categories:
  - 前端杂货
date: 2016-03-11 23:41:04
---

## 一、DOT.js介绍

dot.js是一个模板框架，在web前端使用，其主要特点是快，小，无依赖其他插件。

主要的用途就是，在写好的模板上，放进数据，生成含有数据的html代码。

这是很简单的web前端模板框架，简单说几个东西，你就会用了！

1、在模板中，it这个变量，就是传递进去的数据对象，应该就是英语的items；

2、doT.template( template )( obj ) 代码解释：把模板template，作为参数传入doT.template() 方法，dot就把模板处理一下，然后你再把数据对象传入，返回值，就是html与数据 一起生成的html代码了，再拼接到页面即可；

3、在模板中，&#123;&#123;&#125;&#125;包裹的内容，就是javascript代码，dot会负责处理，因为这写法怪异，新手一般出现模板写错的情况，仔细排查即可；

## 二、性能介绍

曾经研究过jquery tmpl，于是在项目里引入JS模版，有人告诉我这个引擎的速度很慢，于是我又去搜集了一下资料，结果发现jquery tmpl是最慢的，于是乎我就放弃了，对比下来发现胜出的有以下几种artTemplate,dot,juicer三个从速度上胜出(chrome)，但是在IE下最终选择了dot，dot的文件是最小只有5K（没有压缩），并且在IE里也是最快的。

## 三、DOT.js的API标签介绍

- &#123;&#123; &#125;&#125;&emsp;JS原生态代码
- &#123;&#123;= &#125;&#125;&emsp;变量运算，赋值 &#123;&#123;=it.f1 + it.f2&#125;&#125;
- &#123;&#123;! &#125;&#125;&emsp;&emsp;赋值并且编码
- &#123;&#123;# &#125;&#125;&emsp;&emsp;&#123;&#123;### &#125;&#125;&emsp;&emsp;这两个没有仔细研究，基本我也不用它
- &#123;&#123;? &#125;&#125;&emsp;条件语句
- &#123;&#123;- &#125;&#125;&emsp; 循环，其实条件语句和循环可以用
```javascript
{{if }}
{{else if}}
{{for(var i=0;i<length;i++)}}
```
来代替，也就是JS的原生态代码


## 四、DOT.js使用方法

**调用方式：**
```javascript
var tmpText = doT.template(模板);
tmpText(数据源);
```

**例子一：**

1、for interpolation 赋值

格式：
&#123;&#123;= &#125;&#125;&emsp;

数据源：
```javascript
{"name":"Jake","age":31}
```

区域:`<div id="interpolation"></div>`

模板：
```javascript
<script id="interpolationtmpl" type="text/x-dot-template">
<div>Hi {{=it.name}}!</div>
<div>{{=it.age || ''}}</div>
</script>
```

调用方式：
```javascript
var dataInter = {"name":"Jake","age":31};
var interText = doT.template($("#interpolationtmpl").text());
$("#interpolation").html(interText(dataInter));
```

**例子二：**

2、for evaluation for in 循环

**格式：**
```javascript
{{ for var key in data { }}
{{= key }}
{{ } }}
```

**数据源：**
```javascript
{
    "name":"Jake",
    "age":31,
    "interests":["basketball","hockey","photography"],
    "contact":{"email":"jake@xyz.com","phone":"999999999"}
}
```

区域：`<div id="evaluation"></div>`

**模板：**
```javascript
<script id="evaluationtmpl" type="text/x-dot-template">
{{ for(var prop in it) { }}
<div>KEY:{{= prop }}---VALUE:{{= it[prop] }}</div>
{{ } }}
</script>
```

**调用方式：**
```javascript
var dataEval = {"name":"Jake","age":31,"interests":["basketball","hockey","photography"],"contact":{"email":"jake@xyz.com","phone":"999999999"}};
var evalText = doT.template($("#evaluationtmpl").text());
$("#evaluation").html(evalText(dataEval));
```

**例子三：**

3、for array iteration 数组

**格式：**
```javascript
{{~data.array :value:index }}
...
{{~}}
```

**数据源:**
```javascript
{"array":["banana","apple","orange"]}
```

区域：`<div id="arrays"></div>`

**模板：**
```javascript
<script id="arraystmpl" type="text/x-dot-template">
{{~it.array:value:index}}
<div>{{= index+1 }}{{= value }}!</div>
{{~}}
</script>
```

**调用方式：**
```javascript
var dataArr = {"array":["banana","apple","orange"]};
var arrText = doT.template($("#arraystmpl").text());
$("#arrays").html(arrText(dataArr));
```

**例子四：**

4、&#123;&#123;? &#125;&#125;&emsp; for conditionals 条件

**格式：**
```javascript
{{? }} if
{{?? }} else if
{{??}} else
```

**数据源：**

```javascript
{"name":"Jake","age":31}
```

**区域：**

`<div id="condition"></div>`

**模板：**
```javascript
<script id="conditionstmpl" type="text/x-dot-template">
{{? !it.name }}
<div>Oh, I love your name, {{=it.name}}!</div>
{{?? !it.age === 0}}
<div>Guess nobody named you yet!</div>
{{??}}
You are {{=it.age}} and still dont have a name?
{{?}}
</script>
```

**调用方式：**
```javascript
var dataEncode = {"uri":"http://grycheng.com/?keywords=Yoga","html":"<div style='background: #f00; height: 30px; line-height: 30px;'>html元素</div>"};
var EncodeText = doT.template($("#encodetmpl").text());
$("#encode").html(EncodeText(dataEncode));
```

**例子五：**

5、for interpolation with encoding

**数据源：**

```javascript
{"uri":"http://grycheng.com/?keywords=Yoga"}
```

**格式：**

```javascript
{{!it.uri}}
```

**区域：**

`<div id="encode"></div>`

**模板：**
```javascript
<script id="encodetmpl" type="text/x-dot-template">
Visit {{!it.uri}} {{!it.html}}
</script>
```

**调用方式：**
```javascript
var dataEncode = {"uri":"http://grycheng.com/?keywords=Yoga","html":"<div style='background: #f00; height: 30px; line-height: 30px;'>html元素</div>"};
var EncodeText = doT.template($("#encodetmpl").text());
$("#encode").html(EncodeText(dataEncode));
```

**例子六：**

6、&#123;&#123;# &#125;&#125;&emsp; for compile-time evaluation/includes and partials

&#123;&#123;## #&#125;&#125;&emsp; for compile-time defines

**数据源：**

```javascript
{"name":"Jake","age":31}
```

**区域：**

`<div id="part"></div>`

**模板：**
```javascript
<script id="parttmpl" type="text/x-dot-template">
{{##def.snippet:
<div>{{=it.name}}</div>{{#def.joke}}
#}}
{{#def.snippet}}
{{=it.html}}
</script>
```

**调用方式：**
```javascript
var dataPart = {"name":"Jake","age":31,"html":"<div style='background: #f00; height: 30px; line-height: 30px;'>html元素</div>"};
var defPart = {"joke":"<div>{{=it.name}} who?</div>"};
var partText = doT.template($("#parttmpl").text(), undefined, defPart);
$("#part").html(partText(dataPart));
```

## 五、使用扩展

我们用到的只有前三种标签就完全够用了，下面给出一个例子，就很容易看明白了：
```javascript
<script id="tmpl-demo" type="text/tmpl">
{%if($data.suc){%}
{%for (var i = 0; i < $data.users.length; i++) { %}
{%var user=$data.users[i];%}
<div style="margin-bottom:10px;">
<span style="margin-left:10px;">{%= user.Name%}</span>
{%! user.url%}{%=global%}
</div>
{%}%}
{%each($data);%}
{%}%}
</script>
<script type="text/javascript">
function demo() {
var fn = doT.template($("#tmpl-demo").html());
$("#demo").append(fn(data));
}
</script>
<div id="demo"></div>
```
可能是有人疑问，不是&#123;&#123; &#125;&#125;吗，其实dot允许自定义包括的标签，这样就会让你使用自己喜欢的模版标签，他的本来的设置是这样的，是不是很容易修改
```javascript
var doT = {
    version: '1.0.1',
    templateSettings: {
        evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
        encode: /\{\{!([\s\S]+?)\}\}/g,
        use: /\{\{#([\s\S]+?)\}\}/g,
        useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
        define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
        defineParams: /^\s*([\w$]+):([\s\S]+)/,
        conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
        iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
        varname: '$data',
        varoption: '$item',
        strip: true,
        append: true,
        selfcontained: false
    },
    template: undefined, //fn, compile template
    compile: undefined  //fn, for express
    }, global;
```
修改完就是下面这样的，非常简单：
```javascript
var doT = {
    version: '1.0.1',
    templateSettings: {
        evaluate: /\{\%([\s\S]+?(\}?)+)\%\}/g,
        interpolate: /\{\%=([\s\S]+?)\%\}/g,
        encode: /\{\%!([\s\S]+?)\%\}/g,
        use: /\{\%#([\s\S]+?)\%\}/g,
        useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
        define: /\{\%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\%\}/g,
        defineParams: /^\s*([\w$]+):([\s\S]+)/,
        conditional: /\{\%\?(\?)?\s*([\s\S]*?)\s*\%\}/g,
        iterate: /\{\%~\s*(?:\%\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\%\})/g,
        varname: '$data',
        varoption: '$item',
        strip: true,
        append: true,
        selfcontained: false
    },
    template: undefined, //fn, compile template
    compile: undefined  //fn, for express
    }, global;
```

## 六、下载地址

官网：[http://olado.github.io](http://olado.github.io)