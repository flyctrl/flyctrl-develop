---
title: React技术栈整理
tags:
  - Reactjs
  - React技术栈整理
id: 2657
categories:
  - Reactjs
date: 2017-10-27 14:16:45
---

这里梳理下React技术栈需要的最小知识集，让你可以最短时间掌握React,Redux,React-Router,ES6的相关知识，更快的上手React”全家桶“。预计会有ES6、React、Redux、React-Router、Webpack，实时更新目录。
## ES6知识
### 变量声明
#### let 和 const
不要用var，而是用let 和 const 。const声明一个只读的常量，let用来声明变量，const 和 let 都是块级作用域。
```javascript
const PLUS = 'PLUS';

let availableId = 0;
availableId ++;
```
#### 模板字符串
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```javascript
const user = 'world';
console.log(`hello ${user}`);  // hello world

// 多行（所有的空格和缩进都会被保留在输出之中）
const content = `
  Hello ${firstName},
  Thanks for ordering ${qty} tickets to ${event}.
`;
```
#### 默认参数
```javascript
function log(user = 'World') {
  console.log(user);
}

log() //  World
```
### 箭头函数
ES6 允许使用“箭头”（=>）定义函数。
函数的快捷写法，不需要通过 function 关键字创建函数，并且还可以省略 return 关键字。
同时，箭头函数还会继承当前上下文的 this 关键字，即：函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
```javascript
// ES6
function Timer() {
  this.s1 = 0;
  setInterval(() => this.s1++, 1000);
}

// 等同于ES5
function Timer() {
  this.s1 = 0;
  setInterval((function () {
    this.s1++;
  }).bind(this), 1000);
}

const timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100); 
// s1:3
```
### 模块的 Import 和 Export
import 用于引入模块，export 用于导出模块。
```javascript
//导出默认, counter.js
export default function counter() { 
  // ...
}

import counter from 'counter'; 

// 普通导出和导入，reducer.js
export const injectReducer = ( ) => {
  //...
}

import { injectReducer } from 'reducers'

// 引入全部并作为 reducers 对象
import * as reducers from './reducers';
```
### 对象和数组
#### 解构赋值
```javascript
// 数组
let [a, b, c] = [1, 2, 3];
a // 1

//对象
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
```
函数的参数也可以使用解构赋值。
```javascript
function add ([x, y]) {
  return x + y;
}

add([1, 2]); // 3
```
从作为函数实参的对象中提取数据
```javascript
function userId({id}) {
  return id;
}

function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(displayName + " is " + name);
}

var user = { 
  id: 42, 
  displayName: "jdoe",
  fullName: { 
      firstName: "John",
      lastName: "Doe"
  }
};

console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
```
#### 属性的简洁表示法
```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};
```
除了属性简写，方法也可以简写。
```javascript
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};
```
#### 扩展运算符
扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
组装数组
```javascript
const a = [1, 2];
const b = [...a, 3];
b // [1,2,3]
```
获取数组部分
```javascript
const arr = ['a', 'b', 'c'];
const [first, ...rest] = arr;
rest;  // ['b', 'c']

// With ignore
const [first, , ...rest] = arr;
rest;  // ['c']
```
还可收集函数参数为数组。
```javascript
function directions(first, ...rest) {
  console.log(rest);
}
directions('a', 'b', 'c');  // ['b', 'c'];
```
代替 apply。
```javascript
function foo(x, y, z) {}
const args = [1,2,3];

// 下面两句效果相同
foo.apply(null, args);
foo(...args);
```
组装对象
```javascript
const a = { x : 1, y : 2 }
const b = { ...a, z : 3 }
b // {x:1, y: 2, z: 3}
```
### Promise
Promise 用于更优雅地处理异步请求。比如发起异步请求：
```javascript
fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));
```
定义 Promise 。
```javascript
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

delay(1000).then(() => {
  console.log('executed');
});
```
## React知识
### JSX
```javascript
const element = <h1>Hello, world!</h1>;
```
#### 在 JSX 中使用表达式
你可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号里。
```javascript
<h1>{title}</h1>
```
#### JSX 嵌套
如果 JSX 标签是闭合式的，那么你需要在结尾处用 />, 就好像 XML/HTML 一样：
```javascript
const element = <img src={user.avatarUrl} />;
```
#### 互相嵌套
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
#### className
class 是保留词，所以添加样式时，需用 className 代替 class 。
```javascript
<h1 className="loading">Hello world</h1>
```
#### Mapping Arrays to JSX
```javascript
<div>
  {text.map(item => (
    <p key={item.id}>{item.text}</p>
  ))}
</div>
```
### React组件3种形式
分别是 React.createClass, class 和 Stateless Functional Component（无状态组件）。推荐尽量使用最后一种，保持简洁和无状态。这是函数，不是 Object，没有 this 作用域，是 pure function。
#### createClass
```javascript
var MyComponent = React.createClass({
  componentWillMount: function(){

  },
  render: function() {
    return (
      <div>ES5</div>
    );
  },
});
```
createClass写法是React官方反对的，会在React v15.*短期保留，在v16.0版本会被移除。
#### stateless function
```javascript
const MyComponent = () => (
  <div>
    ES6
  </div>
);
```
#### class
```javascript
class MyComponent extends React.Component {
  render() {
    return (
      <div>ES6</div>
    );
  }
}
```
### PropTypes
使用PropTypes检查props

ES6写法
```javascript
import Proptypes from 'prop-types'
class Video extends React.Component {
  render() {
      return (
          <View />
      );
  }
}
Video.defaultProps = {
    autoPlay: false,
    maxLoops: 10,
};
Video.propTypes = {
    autoPlay: PropTypes.bool.isRequired,
    maxLoops: PropTypes.number.isRequired
};
```
ES 试验特性写法：

static是类的静态属性，不会被实例继承
```javascript
class Video extends React.Component {
  static defaultProps = {
    autoPlay: false,
    maxLoops: 10,
  }
  static propTypes = {
    autoPlay: PropTypes.bool.isRequired,
    maxLoops: PropTypes.number.isRequired
  }
  state = {
    loopsRemaining: this.props.maxLoops,
  }
}
```
### State
initialState的设定应放在constructor中
```javascript
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }
}
```
也可以按照ES 试验特性写法
```javascript
export default class Header extends Component {
  state = {
    title: this.props.title
  };
    
  // followed by constructor...
}
```
### destructuring & spread attributes
```javascript
class AutoloadingPostsGrid extends React.Component {
  render() {
    const {
      className,
      ...others,  // contains all properties of this.props except for className
    } = this.props;
    return (
      <div className={className}>
        <PostsGrid {...others} />
        <button onClick={this.handleLoadMoreClick}>Load more</button>
      </div>
    );
  }
}

// with arrow function
const App = ({className, ...rest}) => (
  <div className={classnames(className)} {...rest}>
    <MyComponent />
  </div>
);
```
### React组件生命周期
![React组件生命周期](http://www.npm8.com/wp-content/uploads/2017/10/reactlife.png)

counstruct方法的作用：设置初始state或者绑定方法，在其他任何表达式前应调用super(props)
```javascript
constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
  this.logger.bind(this)
}

logger () {
  console.log('hello world')
}
```
super(props)：super方法提供this给其他表达式引用，提供props给其他表达式调用。

this.logger.bind(this)用来绑定this。可用箭头函数结合ES7的静态属性替代
```javascript
logger = () => {
  console.log('hello')
}
```
commentDidMount方法内可以设置state,触发组件更新重渲。
### React数据向上和向下传递展示
![React数据向上和向下传递](http://www.npm8.com/wp-content/uploads/2017/10/reactdata.png)
## Redux知识
![Redux](http://www.npm8.com/wp-content/uploads/2017/10/reactredux.png)
### React Redux 数据流
通过这张流程图，我们可以更好的理解Redux和React直接数据如何流通，关系如何映射。

让我们一步步来了解图中的各个概念。
### action & actionCreator
action creator 就是函数而已,负责构建一个 action （是的，action creator 这个名字已经很明显了）并返回它。通过几行简单的代码就可以解释清楚了！
```javascript
const actionCreator = function () {
  return {
    type : 'AN_ACTION'
  }
}
```
一般约定 action 是一个拥有 type 属性的对象。
```javascript
console.log(actionCreator())
//  { type: 'AN_ACTION' }
```
### reducer
Reducer 函数只是一个纯函数，它接收应用程序的当前状态以及发生的 action，然后返回修改后的新状态（或者有人称之为归并后的状态）。Reducer 函数是 action 的订阅者。
```javascript
const reducer = function (state = {}, action) {
  console.log('reducer was called with state', state, 'and action', action);

  return state;
}
```
### Store
以上，action描述“发生了什么”，而reducer根据action来更新state。但是他们两者之间是如何关联的呢？

不用担心，Redux 会帮你把action和reducer连接起来。

我们把 Redux实例称为store 并用以下方式创建：
```javascript
import { createStore } from 'redux'

const store_0 = createStore(() => {})
```
注意：在createStore时，需要给它传入一个 reducer 函数。

每当一个action发生时，Redux都能调用这个函数。往 createStore 传 Reducer 的过程就是给 Redux绑定 action处理函数（也就是Reducer）的过程。

接下来，试着在 Reducer 中打印一些 log
```javascript
const reducer = function (...args) {
  console.log('Reducer was called with args', args)
}

const store_1 = createStore(reducer)
// 输出：Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]
```
我们没有dispatch(分发)任何action，但是reducer被调用了！这是由于初始化应用state的时候，Redux dispatch 了一个初始化的 action ({ type: '@@redux/INIT' })。reducer的入参为(state, action)。state还没有被初始化，自然为undefined。

如何读取store中的state?

Redux为我们提供了store.getState()方法。
```javascript
import { createStore } from 'redux'

const reducer_2 = function (state = {}, action) {
  console.log('reducer_2 was called with state', state, 'and action', action)

  return state;
}

const store_2 = createStore(reducer_2)
// 输出: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// 输出: store_2 state after initialization: {}
```
如何dispatch action?

我们需要使用store.dispatch(action)方法。
```javascript
// 接以上代码
const anAction = {
  type : 'AN_ACTION'
}
store_2.dispatch(anAction);
// 输出：reducer_2 was called with state {} and action { type: 'AN_ACTION' }
```
### combineReducers
combineReducer用于合并Reducers，并且合并对应的State。
```javascript
const userReducer  = function (state = {}, action) {
  console.log('userReducer was called with state', state, 'and action', action)

  switch (action.type) {
    // etc.
    default:
      return state;
  }
}
const itemsReducer = function (state = [], action) {
  console.log('itemsReducer was called with state', state, 'and action', action)

  switch (action.type) {
    // etc.
    default:
      return state;
  }
}
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  user  : userReducer,
  items : itemsReducer
})

// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_9.r.k.r.i.c.n.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_4.f.i.z.l.3.7.s.y.v.i' }

var store_0 = createStore(reducer)

// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

console.log('store_0 state after initialization:', store_0.getState())
// 输出：
// store_0 state after initialization: { user: {}, items: [] }
```
### 回过头来看看文章开头的数据流向图
View组件通过click等事件，dispatch一个(actionCreator返回的)action，通过Store把当前状态state和action传递给订阅者reducer函数,reducer返回一个新的状态存储在Store中，Store又把新的State传递给View组件触发组件更新。

为了将Redux和React联系到一起。就需要用到React-Redux这个库。
```javascript
import { connect } from 'react-redux'
const containerComponent = connect(mapStateToProps, mapDispatchToProps)(presentationalComponent)
```
简单来说，mapStateToProps和mapDispatchToProps就是分别把Redux的state,和dispatch(action)映射到React组件中作为props。connect将展示组件(presentationalComponent)封装成高阶的容器组件(containerComponent)。state的更新意味着props更新。

## React脚手架构图
最后贴一张react脚手架架构图以作备用。

![React](http://www.npm8.com/wp-content/uploads/2017/10/reactstage.png)


