---
title: js Date对象详解
tags:
  - js date
id: 1140
categories:
  - JS/Jq
date: 2015-08-05 15:46:56
---

Date在js中和Array类似，都是拥有自己的特殊方法的特殊对象。

由于平常用到Date着实不多，对它的了解颇浅。上周被问到怎么样获取某年某个月的天数，我当时想了一会儿，回答说有两种，一种自己写判断闰年的逻辑，每个月天数分两种情况存数组，一种是利用js Date对象的特性(其实是他总结的...)。不过具体用到什么特性我答不上来。现在既然想起来了，也学习总结一下好了。

### 1.Date get和set系列

[![1](http://www.npm8.com/wp-content/uploads/2015/08/1.png)](http://www.npm8.com/wp-content/uploads/2015/08/1.png)

(注：getTime()具体的参照时间为1970年1月1日8点0分0秒)

所有的set对应都有get系列，详情参照 [http://www.w3school.com.cn/jsref/jsref_obj_date.asp](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)。

值得注意的是所有的get和set都必须初始化一个实例并以实例的属性方式调用。如:

[![2](http://www.npm8.com/wp-content/uploads/2015/08/2.png)](http://www.npm8.com/wp-content/uploads/2015/08/2.png)

其实也很容易理解，毕竟要设置或者返回Date对象的值，肯定这个值得先存在啊。标准点的写法是var date=new Date(2015,7,30);date.getDate()

如果new Date()里面没有传任何参数，也没有用任何set系列方法，那么就指的是当前的值(本地计算时钟)，包括时分秒。js中可以很容易用这个特征来以任何形式显示当前时间。
```javascript
var date = new Date(),
    nowYear = date.getFullYear(),
    nowMonth = date.getMonth() + 1,  //注意getMonth从0开始，getDay()也是(此时0代表星期日)
    nowDay = date.getDate(),
    nowHour = date.getHours(),
    nowMinute = date.getMinutes(),
    nowSecond = date.getSeconds(),
    weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    nowWeek = weekday[date.getDay()];
console.log(nowYear + '年' + nowMonth + '月' + nowDay + '日' + nowHour + '时' + nowMinute + '分' + nowSecond + '秒' + nowWeek);
```
[![3](http://www.npm8.com/wp-content/uploads/2015/08/3-650x40.png)](http://www.npm8.com/wp-content/uploads/2015/08/3.png)

同样，利用内置的 setInterval 或者 setTimeout 回调自身的方法，可以很容易的做时钟效果。见w3cSchool [http://www.w3school.com.cn/tiy/t.asp?f=jsrf_date_timing_clock](http://www.w3school.com.cn/tiy/t.asp?f=jsrf_date_timing_clock)。

&nbsp;

### 2.其它方法

首先是每个对象都有的valueOf()(得到真实值)和toString()(得到字符串形式表示值)。注意红色框内的不同。

[![4](http://www.npm8.com/wp-content/uploads/2015/08/4.png)](http://www.npm8.com/wp-content/uploads/2015/08/4.png)

然后是

toTimeString() ：将Date对象时间部分转化为字符串并返回，因此必须有时间参数，必须有实例，

toDateString() ：将Date对象的日期部分转化为字符串并返回，必须有实例。

[![5](http://www.npm8.com/wp-content/uploads/2015/08/5.png)](http://www.npm8.com/wp-content/uploads/2015/08/5.png)

最后是

parse() : 返回1970年1月1日8点整到指定日期（字符串）的毫秒数，精确到秒。只能用Date.parse(Date实例)的形式调用。 (注意比较getTime(),精确到毫秒。)

toSource() : 返回源代码。

[![6](http://www.npm8.com/wp-content/uploads/2015/08/6.png)](http://www.npm8.com/wp-content/uploads/2015/08/6.png)

注:toLocaleString：根据本地时间格式，将Date对象转化为字符串，与UTC，GMT对应，在Array和在Date中这个方法都已经过时，就不再纠结。UTC系列用得很少，也就是格式有所不同，详情参见[http://www.w3school.com.cn/jsref/jsref_obj_date.asp](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)。

&nbsp;

### 3.重要知识点小结

#### (1)set系列的参数讨论

[![7](http://www.npm8.com/wp-content/uploads/2015/08/7.png)](http://www.npm8.com/wp-content/uploads/2015/08/7.png)

setFullYear()前三个参数有用，时分秒还是本地的~~~

[![8](http://www.npm8.com/wp-content/uploads/2015/08/8.png)](http://www.npm8.com/wp-content/uploads/2015/08/8.png)

[![9](http://www.npm8.com/wp-content/uploads/2015/08/9.png)](http://www.npm8.com/wp-content/uploads/2015/08/9.png)

&nbsp;

其它set系列都只有第一个参数有用，返回值分别为在new Date()(当前时间)的基础上加上了Month/Date/Minutes * 对应的第一个参数。

&nbsp;

#### (2)设置完整时间

[![10](http://www.npm8.com/wp-content/uploads/2015/08/10.png)](http://www.npm8.com/wp-content/uploads/2015/08/10.png)

[![11](http://www.npm8.com/wp-content/uploads/2015/08/11.png)](http://www.npm8.com/wp-content/uploads/2015/08/11.png)

很明显setTime也是set系列，故而只是在原来的基础上增加了1992毫秒(显示为1s)。由于setTime比较特殊，是以1970年1月1日早上8点( FF、Chrome、IE5+、Opera (safari用得少就没测) 中测试，虽然w3School中说是0点,但是测试一下new Date(1970,0,1,8,0,0).getTime()显示为0就很明显了 )为基准开始算的，因此在实际执行前其实date实例已经不是new Date()所对应的当前时间了，而是有一个被转化为基准时间的过程。所以显示的为1970,0,1,8,0,1。如果将1992改为5000则为1970,0,1,8,0,5。

而设置完整时间的方法，为new Date对象的时候传入需要设置的时间的参数。可以为1992,10,3,10,2,50 (还可以加上毫秒级，然后用getTime()检测出来，但是一般用不上) 的数字形式 (表示1992年11月3日10时2分50秒)，也可以为标准字符串格式(但一般不会这么写吧~~~)。

&nbsp;

#### (3)getDate()

一般放在后面就是用来压轴用的，嘿嘿。

作为get系列，除了参数的个数有些讲究之外，参数的取值也是很有讲究的。首先回答最初的问题，得到某年某个月的最大天数(可以理解为判断闰年~)。
```javascript
new Date(2014,2,0).getDate();     //返回2014年2月份的最后一天(28)
```
当第三个参数为0的时候，其实是返回上一个月的最后一天 (注意月份的数字2实际上是三月份，故而代码是返回2月份的最后一天在当月中的序号)。看更多例子
```javascript
new Date(2014,1,30).getDate(); //返回2014年3月2日在3月份中的天数(2)
new Date(2014,2,-1).getDate(); //返回2014年2月份的倒数第二天(27)

//当参数缺少的时候显示1
new Date(2014,8).getDate(); 
new Date(14,18).getDate(); 
new Date(180).getDate();

//当参数多余的时候多余的不起作用(并没有设置对arguments[3+]的操作)
new Date(2015,2,0,2).getDate();
```
天数多了会自动往下月计算，天数为负数则往上个月计算。参数少了有问题，多了的话多的部分没作用。对比其它的set系列其实也差不多就是这么个实现的思路，看(2)就知道了。
&nbsp;