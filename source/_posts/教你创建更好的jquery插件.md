---
title: 教你创建更好的jQuery插件
tags:
  - jQuery插件
id: 1164
categories:
  - JS/Jq
date: 2015-08-05 17:15:47
---

&emsp;&emsp;在开发过很多 jQuery 插件以后，我慢慢的摸索出了一套开发jQuery插件比较标准的结构和模式。这样我就可以 copy &amp; paste 大部分的代码结构，只要专注最主要的逻辑代码就行了。使用相同的设计模式和架构也让修复bug或者二次开发更容易。一套经过验证的架构可以保证我的插件不出大的问题，不论插件简单还是复杂。我在这里分享10条我总结的经验。

&nbsp;

**1\. 把你的代码全部放在闭包里面**
这是我用的最多的一条。但是有时候在闭包外面的方法会不能调用。
不过你的插件的代码只为你自己的插件服务，所以不存在这个问题，你可以把所有的代码都放在闭包里面。
而方法可能应该放在Prototype方法内部。
```javascript
(function($)  {   
   //code here  
})(jQuery);
```
&nbsp;

**2\. 提供插件的默认选项**
你的插件应该会有一些选项是可以让开发者设置的，所以提供恢复默认选项是以有必要的。 你可以通过jQuery的extend功能来设置这些选项：
```javascript
var defaultSettings = {      mode            : 'Pencil',     
                             lineWidthMin    : '0',     
                             lineWidthMax    : '10',      
                             lineWidth       : '2' }; 
  settings = $.extend({}, defaultSettings, settings || {});
```
&nbsp;

**3\. 使用返回一个元素**
JavaScript/jQuery有一个很好的特点就是可以进行方法级联，所以我们不应该破坏这个特性，始终在方法中返回一个元素。我在我的每一个jQuery插件中都遵守这一条。
```javascript$.fn.wPaint = function(settings)  {    
  return this.each(function()  {  
        var elem = $(this);        
   //run some code here     
 } 
 }
```
&nbsp;

**4\. 一次性代码放在主循环以外**
这一条很重要，但是常常被忽略。简单的讲，如果你有一段代码是一堆默认值，只需要被实例化一次，而不是每次调用你插件功能的时候都实例化，你应该把这段代码放在插件方法的外面。这样可以让你的插件运行的更高效，节省内存。
```javascript
var defaultSettings = {    
                             mode            : 'Pencil',     
                             lineWidthMin    : '0',     
                             lineWidthMax    : '10',      
                             lineWidth       : '2' }; 
  settings = $.extend({}, defaultSettings, settings || {});

$.fn.wPaint = function(settings)  {    
  return this.each(function()  {  
        var elem = $(this);        
   //run some code here     
 } 
 }
```
&emsp;&emsp;你可以注意到，上面代码中的“defaultSettings”是完全在插件方法外面的，由于这些代码是在闭包里面，我们不用担心这些变量被重写。

**5\. 为什么要设置 Class Prototyping**
作为你代码的血与肉，方法和函数应该放在prototype函数内。有两个原因：
◆ 它可以节省很多内存，因为可以不用重复创建这些方法。
◆ 引用一个现成的方法比重新创建一个好快很多。
简单的说，prototype就是扩展了一个对象，为它提供方法，而不用在每一个对象中实例化这些方法。这也让你的代码更有条理和高效。一旦你习惯这种开发方式，你会发现它在你将来的项目中为你节省了很多时间。

&nbsp;

**6\. 如何设置 Class Prototyping**
设置一个 prototype 方法有两个部分。首先我们需要创建我们最初的类定义，在多数情况下这就意味着创建一个对象。这个定义包含了每一个对象实例都不同的部分。在我的Paint jQuery Plugin 插件中，我是这么写的：
```javascript
function Canvas(settings)  {    
  this.settings = settings;     
 this.draw = false;     
 this.canvas = null;       
      this.ctx = null;    
   return this;  }
```
下面来添加全局的方法：
```javascript
Canvas.prototype =  {     
 generate: function() {  
        //generate code    
  }  
}
```
这里的关键是要让prototype的方法是通用的，但是数据是每个实例自己的，可以用“this”引用。

&nbsp;

**7\. 使用 “this” 对象**
通过使用“$this”，我们可以向别的闭包传递正确的引用。我们也可能需要向别的方法传入 $this 引用。需要注意的是， $this 这个名字是可以改的，任意的变量名都可以。
```javascript
Canvas.prototype =  {    
  generate: function()   {  
        //some code       
    var $this = this;       
    var buton = //...some code   
        button.click(function(){  
        //using this will not be found since it has it's own this       
        //use $this instead.          
     $this.someFunc($this);       
   });    
  },  

  someFunc: function($this)      {   
       //won't know what "this" is.    
      //use $this instead passed the click event   
   }  
}
```
&nbsp;

**8\. 在每一个对象中保存设置**
&emsp;&emsp;我一直在每一个对象中保存自己的设置，然后操作它自己的设置。这样你就不用在不同的方法中传递很多参数。把这些变量放在对象中，也方便你在其他地方调用这些变量。
```javascript
function Canvas(settings)  {    
  this.settings = settings;    
   return this;  
}
```
&nbsp;

**9\. 分离你的Prototype方法逻辑**
这可能是一个基本的原则。当你在犹豫是否需要提供一个方法的时候，你可以问你自己 “如果其他人要重写这个方法的话，你的代码是否能满足他的需求?”或者“别人来写这个方法有多困难?”。当然这是一个灵活性拿捏的问题。这里列出了我的Color Picker jQuery Plugin 的方法，你可以参考一下：
```javascript
generate()  
appendColors()  
colorSelect()  
colorHoverOn()  
colorHoverOff() 
appendToElement() 
showPalette() 
hidePalette()
```
&nbsp;

**10\. 提供 Setter/Getter 选项**
这一条不是必须的，但是我发现我所有的插件都包用到了这一条。因为它只需要一点点代码，就能为别人提供一个他可能需要的功能。
基本上，我们只要让开发者能够设置或者获取元素已经存在的值：
```javascript
var lineWidth = $("#container").wPaint("lineWidth");  $("#container").wPaint("lineWidth", "5");
```
总结：以上十条基本上覆盖了jQuery插件开发的核心，并且可以作为开发的模板。有一套基本的代码可以极大的缩短你的开发时间，并且能够让你设计插件架构的时候更自信。