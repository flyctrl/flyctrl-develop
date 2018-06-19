---
title: requireJS模块加载器优化工具，bulid.js详解
tags:
  - bulid.js
  - requireJS
id: 2618
categories:
  - 前端杂货
date: 2017-04-11 11:48:48
---

requireJS是javascript的模块加载器，是基于AMD规范实现的。

r.js是其提供的对模块进行打包和构建的一个工具

下载 r.js

创建r.js 的配置文件 build.js

build.js

```javascript
({
    appDir: './', 　　 //项目根目录
    out: 'main-build.js',　　//输出文件名
    dir: './outdir',　　 //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
　　　　/* 有了dir，就不能使用out配置项了，你在编译时它有非常明确的提示 */
    baseUrl: './js/pages', 　　 //相对于appDir，代表要查找js文件的起始文件夹，下文所有文件路径的定义都是基于这个baseUrl的
    modules: [
　　　　//要优化的模块 —— 里面的配置项即各页面的 相对baseUrl路径的 省略后缀“.js”的 入口文件(入口文件 ---- 即加载页面时引入require.js的script标签上data-main属性所指定的文件)
　　　　//该属性必不可少，因为一个程序至少需要有一个入口
        { name:'main'},
        { name:'index'} 
],
　　fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,　　 //正则匹配过滤文件，匹配到的文件将不会被输出到输出目录去，这里过滤掉的是 r.js、build.js、*.scss三类文件
　　optimizeCss: 'standard',
　　removeCombined: true, //如果为true，优化器将从输出目录中删除已合并的文件
　　paths: { //各模块相对baseUrl的路径，直接从require.config的path配置中烤取即可
        "underscore": "../libs/underscore/underscore-min",
        "backbone": "../libs/backbone/backbone-min",
　　},
    shim:{// 配置不符合AMD规范的模块，直接从require.config的shim配置中烤取即可
        "underscore": {
　　        exports: "_"
        },
        "backbone": {
　　        deps: ["underscore", "jquery"],
　　        exports: "Backbone"
        },
    } 
})
```

**常用的build.js的参数属性解释：**

![bulidjs](http:www.npm8.com/wp-content/uploads/2017/04/bulid-660x434.png)

r.js把各页面所需要用到的脚本全部都整合到各自的入口文件(一个或多个js)中去，从而减少了对服务器的请求。

mainConfigFile：'common.js'　　//多页面复杂工程的多个入库文件的统一的 require.config 的配置放置文件，相对baseUrl的路径

由于多页面工程需要多个入库文件，此时就会出现相同的 require config 的在一个工程下配置多次的问题，为了避免这种问题，可以将多个入库文件的相同config提出到一个js文件中，进行统一配置，

并且就会用到build.js的mainConfigFile参数来对其进行重新定义模块

实例可参考：https://github.com/requirejs/example-multipage-shim

一篇通俗易懂的r.js打包应用简例：http://www.tuicool.com/articles/iYNJbqZ