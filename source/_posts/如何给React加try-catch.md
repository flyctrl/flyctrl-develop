---
title: 如何给React加try-catch
tags:
  - react try catch
  - React
  - 给React加try-catch
id: 26634
categories:
  - Reactjs
date: 2017-11-01 14:26:14
---

最近在一个使用fis构建的react.js项目里遇到个问题，render函数里如果发生了运行时错误，比如说某个对象没有判断就直接去访问其属性，那我所知道的就是，页面不正常了，特别是有嵌套子组件的时候，我可得一个个一层层去排查判断，去加try-catch。。。

好像react的开发体验不应该是这样子的。

通常来说，使用react的时候都配合以webpack构建，再加个webpack-dev-client，不仅有js live reload还能hot module reload，不离开编辑器的情况下就能一直调试下去。而且当出现运行时错误时，会有明确的error stack打印在页面上。为什么使用fis构建的就不行呢？

先就自己遇到的这个问题来说，我通过多次手动try-catch的方式，找到了render失败的原因，那么这个“手动”的方式是不是可以自动？通常就是monkeypatch，在当前类定义之后，借助于js这种动态修改类定义的特性，可以这样子：
```javascript
var unsafeCreateClass = React.createClass;
React.createClass = function(spec) {
    var unsafeRender = spec['render'];
    spec['render'] = function() {
        try {
            return unsafeRender.apply(this, arguments);
        } catch(e) {
            console.log(e);
        }
    }

    return unsafeCreateClass.apply(this, arguments);
}
```
S6的组件上是无效的，所以针对另一种写法可以这样子：
```javascript
class MyComponent extends React.Component {
    render() {
        return <div>render something here</div>;
    }
}
function wrapTryCatch(Component) {
    let oldRender = Component.prototype.render;
    Component.render = function() {
        try {
            oldRender.apply(this, arguments);
        } catch(e) {
            console.log(e);
        }
    }

    return Component;
}

exports default wrapTryCatch(MyComponent);
```
看起来大同小异，不过需要在每个Component的实现之后再wrap一下，包装出一个新的组件出来。而这种wrapper，借助于es7的新语法，decorator，(引入babel-plugin-transform-decorators)又可以这么写：
```javascript
@wrapTryCatch
class MyComponent extends React.Component {
    render() {
        return <div>render something here</div>;
    }
}
```
然而，这还是不能让人满意的，毕竟遗留代码那么多，难道我要一个个去添加这种wrapper? 想想看，现在连decorator这种新语法都能通过babel插件来支持了，为什么不能再通过类似方法来把decorator都自动加进去呢？

事实上，react-try-catch-render(也就是上个例子)这个文档是指出其由react-transform-catch-errors得到的启发，顺着这一点，最后是找到了babel-plugin-react-transform这个插件，刚好就能满足这个需求。而且，它本身已经内置在webpack-dev-client中，所以webpack构建的开发方式才会如此方便看到错误。

按照给出的步骤，自行安装完依赖之后，在fis中对应的babel plugins配置部分添加：
```javascript
"plugins": [
        ["react-transform", {
          "transforms": [{
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }]
        }]
      ]
```
配置选项中的imports传入了两个参数，这两个参数是react-transform会传给transform插件使用的，其中redbox-react 是一个自定义的错误处理组件，之前在webpack构建方式下的开发经常看到的红色框框原来就是它了！在实际使用中，可以按需替换，比如说实现badjs上报等。最后试了一下，在fis的构建方式下，也成功看到了红色框框，以后开发过程出现运行错误就页面不会安安静静地失败了。

当然，到这里为止都只是在关心render函数的报错，其它阶段的回调，其实都是类似的实现。

最后一种方式给了很大的启发和想象空间，现在借助于babel的帮助，我们可以在语法层面对js进行增强，在构建阶段就完成对功能的补充，这种方法现在看来，work like a charm!

惹不住还是看了下babel transform插件是如何开发实现的，[文档在此](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-introduction/)。babel作为一个源码转换编译器，是一个源码->ast->源码的过程，而transform插件所做的事就是在ast->源码的阶段。在对AST遍历的过程，按插件接口形式提供visitor，可以细致到对每个AST 节点进行修改(添加，删除，替换等)。所谓的visitor其实就是访问节点时候的钩子/回调。给visitor传入的参数path，给我一种一沙一宇宙的感觉，path提供的属性和操作就可以勾画出整个AST。