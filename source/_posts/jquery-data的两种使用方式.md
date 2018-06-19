---
title: Jquery-data的两种使用方式的对比
tags:
  - Jquery-data
  - Jquery-data的两种使用方式
id: 2207
categories:
  - JS/Jq
date: 2016-03-12 14:03:59
---

曾经发表过的关于data的博文：[使用 data-* 属性来嵌入自定义数据](http://www.npm8.com/?p=1568)，想对data定义数据有深入了解的小伙伴请转至那篇博文，今天将再次提及data-*属性，以及在使用Jquery时如果要再DOM上储存数据（jquery的data方法）：

```javascript
//最好不要使用下面这种形式
var elem = $('#elem');
elem.data(key,value);
//尽可能用：
var elem = $('#elem');
$.data(elem[0],key,value);
```
解释原因为：**后一种写法要比前一种写法，快了将近10倍。因为elem.data()方法是定义在jQuery函数的prototype对象上面的，而$.data()方法是定义jQuery函数上面的，调用的时候不从复杂的jQuery对象上调用，所以速度快得多。**

乍一看可能有点懵逼，去W3School上找这两种方法，可以看到解释概念不太一样，点进去后却发现两个方法的内容几乎完全一样，顿时有种被骗的感觉：

![Jquery-data的两种使用方式](http://www.npm8.com/wp-content/uploads/2016/03/2-2-660x348.png)

没关系，今天我们就是要详细说说这两种形式的区别。
如果看过Jquery源码也许会发现对于jquery的extend有两种使用方式，

第一种：**jQuery.extend();>**

第二种：**jQuery.fn.extend();**

其实往简单的说，就是$.extend()和$.fn.extend()用法和区别。

我们自己写jquery插件时候应该常用到这两种函数，乍一看很像，其实两个函数差别还是很大，下面具体讲讲有什么区别

## 1、$.extend()

该方法用于扩展jQuery类，它的方法是全局的，直接用jquery类便可以引用：
```javascript
$.extend({
getName:function(name){
return name;
}
});
$.getName("侠名风");
```
通常我们把这类函数称作为工具函数，它们不直接操作DOM元素，而是操作Javascript的非元素对象，或者执行其他非对象的特定操作。

## 2、$.fn.extend()

该方法则是用来扩展jQuery的实例方法，也就是说jQuery类的实例对象可以调用此函数（你也可以理解为操作dom来实现），代码如下:
```html
<html>
<head>
<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
$.fn.extend({
sayHello:function(){
alert("你好，侠名风！");
}
})
$("#btn").click(function(){
$(this).sayHello()
});
})
</script>
</head>
<body>
<div id="btn">点我</div>
</body>
</html>
```
该例子通过$.fn.extend()方法为jQuery扩展一个实例方法，那么就必须要用对象实例来调用此方法，$("#btn")就是一个对象实例，这样它就可以调用添加的方法。

有的人会问了，你不是在讲data吗？干嘛扯出来extend？别急，那么回到我们最初的问题，data这两种方式跟extend有何区别？
打开jquery源码，我这里以jquery最新的2.2.1版本作为例子讲解。

## 1、elem.data(key,value);

查看jQuery源码关于data此形式定义的方法：
```javascript
jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],   
			attrs = elem &amp;&amp; elem.attributes;

		// 如果你在标签定义data-xxxx属性，此方法会获取到所有的value并返回
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );
				if ( elem.nodeType === 1 &amp;&amp; !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}
		return access( this, function( value ) {
			var data, camelKey;
			//如果你通过$selector.data()此方法查找并返回已存入的data
			if ( elem &amp;&amp; value === undefined ) {
				data = dataUser.get( elem, key ) ||
					dataUser.get( elem, key.replace( rmultiDash, "-$&amp;" ).toLowerCase() );
				if ( data !== undefined ) {
					return data;
				}
				camelKey = jQuery.camelCase( key );
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}
				return;
			}
			camelKey = jQuery.camelCase( key );
			this.each( function() {
				var data = dataUser.get( this, camelKey );
				dataUser.set( this, camelKey, value );
				if ( key.indexOf( "-" ) > -1 &amp;&amp; data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},
    //...省略...
} );
```
值得注意的是data会获取多个对象，但是返回的只有一个对象（值）。
由此可以看出，使用elem.data(key,value)会执行]jQuery.fn.extend()中的data方法，代码量真不少啊。

## 2、$.data(elem[0],key,value);

此种方式代码相简洁接很多了...
```javascript
jQuery.extend( {
	//...省略多余方法...
	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},
	//...省略多余方法...
} );
```
可能你会问，也许代码都封装在dataUser.access中了，我书读得少你别骗我。
那我们看看这个data.access里都有些什么：
```javascript
Data.prototype = {
	//...省略...
	access: function( owner, key, value ) {
		var stored;
		if ( key === undefined ||
				( ( key &amp;&amp; typeof key === "string" ) &amp;&amp; value === undefined ) ) {
			stored = this.get( owner, key );
			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}
		this.set( owner, key, value );
		return value !== undefined ? value : key;
	},
	//...省略...
}
```
其实access方法在第一种方式中返回时也调用，而由于html5的data标签和很多判断绕了许多弯路，使用jquery函数上上的data方法更加直接效率更高。那么有人会问了，那我们以后都用第二种方式还需要第一种干嘛？这就要讲讲elem.data(key,value)和$.data(elem[0],key,value)的区别了。
先看下面的例子：
```javascript
var div1 = $("div"),
    div2 = $("div");
div1.data('key',"1");
div2.data('key',"2");
console.log(div1.data('key'),div2.data('key')); //2 2

$.data(div1,'key','1');
$.data(div2,'key','2');
console.log($.data(div1,'key'),$.data(div2,'key'));//1 2
```
你看出区别了吗$.data(div1, "key", "1")的方法会根据elem的不同创建不同的对象来进行存储数据， div1.data("key", "1")的方法则替换掉了原来的数据。

讲了这么多总结一下：

**1、如果在全局定义变量，而要在每次方法中替换data值用第一种方式（elem.data(key,value)）；**

**2、如果是为了获取并赋值dom的data并且记录每次改变的值，推荐使用第二种形式（$.data(elem[0],key,value)）；**

**3、还有一点需要注意：jquery-data是单向绑定，不会因为你改变data而联动改变html5中data-属性值，切记；**