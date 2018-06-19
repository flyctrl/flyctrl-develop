---
title: 浅谈Reactjs工作原理
tags:
  - Reactjs
  - Reactjs工作原理
id: 2652
categories:
  - Reactjs
date: 2017-08-24 23:30:45
---
&emsp;&emsp;Reactjs 起源于Facebook内部项目，是一个用来构建用户界面的 javascript 库，相当于MVC架构中的V层框架，与市面上其他框架不同的是，React 把每一个组件当成了一个状态机，组件内部通过state来维护组件状态的变化，当组件的状态发生变化时，React通过虚拟DOM技术来增量并且高效的更新真实DOM。本文将对React 的这些特点进行简单的介绍。

## Hello React 

&emsp;&emsp;考虑到有的同学还不曾了解过React，我们先来写一个简单的React组件，让大家一睹为快！
```javascript
// 创建一个HelloReact组件
class HelloReact extends React.Component{
    render(){
        return (
            <div>
                 Hello React!
            </div>
        )
    }
}
 
// 使用HelloReact组件
ReactDOM.render(
    <HelloReact />,
    document.querySelector('body')
)
```
&emsp;&emsp;这样就定义了一个React组件，当然要运行这段代码是有条件的，需要引入React库，还需要引入JSX语法转换库，这里不多说了，这些基础的东西还需要各位亲自实践才好！

## 虚拟DOM（Virtual DOM）
&emsp;&emsp;在前端开发的过程中，我们经常会做的一件事就是将变化的数据实时更新到UI上，这时就需要对DOM进行更新和重新渲染，而频繁的DOM操作通常是性能瓶颈产生的原因之一，有时候我们会遇到这样一种尴尬的情况：比如有一个列表数据，当用户执行刷新操作时，Ajax会重新从后台请求数据，即使新请求的数据和上次完全相同，DOM也会被全部更新一遍并进行重新渲染，这样就产生了不必要的性能开销。

&emsp;&emsp;React为此引入了**虚拟DOM（Virtual DOM）**
机制：对于每一个组件，React会在内存中构建一个相对应的DOM树，基于React开发时所有的DOM构造都是通过虚拟DOM进行，每当组件的状态发生变化时，React都会重新构建整个DOM数据，然后将当前的整个DOM树和上一次的DOM树进行对比，得出DOM结构变化的部分(Patchs)，然后将这些Patchs 再更新到真实DOM中。整个过程都是在内存中进行，因此是非常高效的。借用一张图可以清晰的表示虚拟DOM的工作机制：
![image](http://www.npm8.com/wp-content/uploads/2017/08/virtualdom.jpg)

## React 生命周期

&emsp;&emsp;React 把每个组件都当作一个状态机来维护和管理，因此每个组件都拥有一套完整的生命周期，大致可以分为三个过程：初始化、更新和销毁。生命周期的每一个过程都明确的反映了组件的状态变化。对于开发来说就能很容易的把握组件的每个状态，不同的状态时期做对应的事情，互不干扰。以下是和组件生命周期相关的几个方法：
```javascript
getDefaultProps //创建组建
getInitialState  //实例化状态
componentWillMount  //挂载前
componentDidMount //挂载后
componentWillReceiveProps //属性被改变时
shouldComponentUpdate //是否更新
componentWillUpdate //更新前
componentDidUpdate //更新后
componentWillUnmount //销毁前
```
## 初始化
&emsp;&emsp;对于外部系统来说，组件是一个独立存在的封闭系统，内部的逻辑被隐藏，只对外暴露传递数据的接口，而React为我们提供了两种方式来向组件传递数据，即 props 和 state。

&emsp;&emsp;props 是在调用 `ReactDOM.render()` 时通过标签属性xxx传递，然后通过 this.props.xxx 来获取，getDefaultProps 允许你为组件设置一个默认的props值，在没有传递props的情况下显示默认值。
```javascript
// 创建HelloReact组件
class HelloReact extends React.Component{
    /**
     * 当设置props的默认值 当没有传递时显示默认值
     * @return {}
     */
    getDefaultProps(){
       return {
           data:"暂无数据"
       }
    }
    render(){
        return (
            <div>
               //显示data，当props发生变化时会自动更新
               {this.props.data}
            </div>
        )
    }
};//传递props属性data
ReactDOM.render(
   <HelloReact data={"Hello React!"} />,
   document.querySelector('body')
)
```
&emsp;&emsp;和 props 不同的是，state不能通过外部传递，因此在使用state之前，需要在 getInitialState 中为state设置一个默认值，然后才能通过 this.state.xxx 来访问，当组件被挂载完成时，触发 componentDidMount 方法，我们可以在这里通过Ajax请求服务器数据，然后再通过 `setState()` 把state的值设置为真实数据。
```javascript
// 创建HelloReact组件
class HelloReact extends React.Component{
    /**
     * 设置组件的初始值
     * @returns {{data: Array, msg: string}}
     */
    getInitialState(){
        return {
            data:"数据加载中..." //初始值为[]
        }
    }
    /**
     * 挂载后首次加载数据
     */
    componentDidMount(){
        this.requestData();//请求数据
    }
    /**
     * 请求后台数据
     */
    requestData(){
        $.ajax({
            url:'xxxx.ashx',
            data:{},
            success:function(data){
                this.setState({
                    data:data  //通过setState()更新服务器数据
                })
            }
        }.bind(this))
    }
    render(){
        return (
            <div>
               {this.state.data}
            </div>
        )
    }
};
ReactDOM.render(
    <HelloReact  />,
    document.querySelector('body')
)
```
## 更新

&emsp;&emsp;props属性是只读的，如果想要改变props的值，只能通过重新调用`render()`来传递新的props，但要注意的是，重新执行`render()`组件不会被重新挂载，而是通过虚拟DOM技术进行增量更新和渲染，这时还会触发 componentWillReceiveProps 方法，并将新的props作为参数传递，你可以在这里对新的props进行处理。

&emsp;&emsp;相比props，state天生就是用来反映组件状态的，因此它的值是可以被改变的，当state的值被改变时，通过setState就可以改变state的值，React同样也是采用虚拟DOM技术来计算需要被更新的部分，而不是牵一发动全身的更新和渲染。

&emsp;&emsp;当 props 和 state 的状态发生变化后，组件在即将更新之前还会触发一个叫 shouldConponentUpdate 的方法，如果 shouldConponentUpdate 返回的是 true，不管props和state 的值和上一次相比有没有变化，React 都会老老实实的进行对比。此时，如果你确定以及肯定两次数据没有变化，那就让 shouldConponentUpdate 返回 false，React就不会进行diff了，更不会重新渲染了。瞬间省去了diff的时间。

## 销毁

&emsp;&emsp;当组件从DOM中被移除时，React会销毁之。在销毁之前，细心的React还触发 componentWillUnmount 来通知你，看你最后有没有什么话想对这个即将销毁的组件说，当然你没什么事就不用了。

## 什么时候用props,什么时候用state

&emsp;&emsp;我们已经知道可以通过props和state两种方式向组件传递数据，props是只读的不能被改变，而 state 是用来反映一个组件的状态，是可以改变的。因此，当组件所需要的数据在调用时是已经确定的，不频繁发生变化的，就可以使用props来传递，相反，当组件所需要的数据在调用时不能确定，需要等待异步回调时才能确定，比如ajax请求数据，input的onchange事件，这时就需要使用state来记录和改变这些值得变化。