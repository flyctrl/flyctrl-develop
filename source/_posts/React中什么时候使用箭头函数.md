---
title: React中什么时候使用箭头函数
tags:
  - 箭头函数
  - React
  - React中什么时候使用箭头函数
id: 2663
categories:
  - Reactjs
date: 2017-10-31 15:24:14
---

> 当我们想起箭头函数时，脑海里可能会浮现 棒，酷，简洁，有趣等形容词，其实，我们存在一些 更充分的理由 使我们在联想起 箭头函数 时不得不想到的

## 解决 this 引起的问题
箭头函数不会在函数体内重新定义`this` 的值，这使得在回调中的行为更容易预测，并且避免了`this`在回调中潜存的`bug`

下面我们来看一个`example`

我们期望点击按钮，改变按钮颜色，代码如下
```javascript
class BrokenButton extends React.Component {
  render() {
    return (
      <button onClick={this.handleClick} style={this.state}>
        Set background to red
      </button>
    );
  }

  handleClick() {
    this.setState({ backgroundColor: "red" });
  }
}

render(<BrokenButton />, document.getElementById("root"));
```
然而，当我们点击按钮时，什么效果都没有，为什么会这样呢

其实，不是`handleClick`方法没有起作用，因为`JavaScript` 中压根没有方法，`JavaScript`中只有函数，而函数中的`this` 存在一些规则，正是这些规则，让上面的`handleClick`中的`this` 值变成了`null`

你需要清楚明白的是：你无法确定一个方法函数中`this`的指向，因为它的值跟函数的调用方式有关

除非，你使用`箭头函数`，因为箭头函数中`this`的值是继承自 外围作用域
```javascript
class Button extends React.Component {
  render() {
    return (
      <button
        onClick={() => this.setState({ backgroundColor: "red" })}
        style={this.state}
      >
        Set background to red
      </button>
    );
  }
}

render(<Button />, document.getElementById("root"));
```
现在就对了，接下来，我们继续

## 浏览器支持

浏览器对`箭头函数`的支持大概是73%，因为目前，IE 并不支持。但如果你已经意识到这一点，并且你还会代码转译，这对你来说就不算什么问题

## 性能问题

大家都发现了,`箭头函数` 书写起来是非常容易的，但书写忒多的函数，也会造成一些问题

定义函数是昂贵的

浏览器每执行一次 =>，就需要创建一个新的函数对象，这其实是一个比较 昂贵 的操作

当然，如果你不是想构建一个性能超级无敌宇宙螺旋棒 的组件，渲染一个非常长的列表或非常大的表格，你也不会发现这是一个问题

所以，如果你的组件只是在页面中渲染个几次，你也没必要忒担心 性能这方面的问题

两个相同的箭头函数并不相等

为了让大家意识到这个问题，接下来，我们用`==`比较一下两个相同的箭头函数相不相等
```javascript
const a = x => x,
      b = x => x;

render(
  <div>
    <h3>
      Are <code>a</code> and <code>b</code> equal by <code>==</code>?
    </h3>
    <p>
      {a == b ? "Yes!" : "No :("}
    </p>
  </div>,
  document.getElementById("root")
);
```
如果你在 render 中使用箭头函数，那么你在每次调用`render`时都会去创建一个新的函数对象，此时，即使使用`PureComponent`和`shouldComponentUpdate`也起不到优化作用

你可以在下面实例中看清这一点，其中，`<PropChangeCounter />` 组件用于打印`props`改变的次数
```javascript
import PropChangeCounter from "react-armory-prop-change-counter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }
  render() {
    return (
      <div>
        <input
          placeholder="Email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <PropChangeCounter
          constant={"this doesn't change"}
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
```
只定义一次

如果你觉得性能对你的组件很重要，那么你肯定会想如果在组件中只定义箭头函数一次该有多好

其中一种实现方式是在`constructor`中使用箭头函数，当然，对于复杂些的组价来说，这会变的很笨拙

如果你使用了`Babel`或`create-react-app`构建你的应用，你可以将箭头函数设置为`class` `fields`或`arrow` `function` `methods`

如下，你可以将`handleClick`重新定义为一个`arrow` `function` `method`，来修复第一个`example`中的`bug`
```javascript
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.handleClick} style={this.state}>
        Set background to red
      </button>
    );
  }

  // Note: this syntax is not yet part of JavaScript proper, but is slated
  // for inclusion in the next version. It should already work with Babel.
  handleClick = () => {
    this.setState({ backgroundColor: "red" });
  };
}
```
## 总结

* 如果环境支持箭头函数，那么鼓励使用

* 尽量避免对React组件 使用箭头函数，它会使调试变的困难

* 如果有需要，可以在render中使用箭头函数

* 为性能着想，避免在render中使用大量函数