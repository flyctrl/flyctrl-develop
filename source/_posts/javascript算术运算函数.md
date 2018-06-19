---
title: Javascript算术运算函数
tags:
  - js算术函数
id: 1687
categories:
  - JS/Jq
date: 2015-09-18 16:41:03
---

**一、数学函数的使用**

Math.pow(2,53) =>2的53次幂

Math.round(.6) =>四舍五入

Math.ceil(.6) =>向上求整

Math.floor(.6) =>向下求整

Math.abs(-5) =>求绝对值

Math.max(x,y,z) =>返回最大值

Math.min(x,y,z) =>返回最小值

Math.random() =>生成一个大于等于0小于1.0的伪随机数

Math.PI =>圆周率

Math.E =>自然对数的底数

Math.sqrt(3) =>3的平方根

Math.pow(3,1/3) =>3的立方根

Math.sin(0) =>三角函数：还有Math.cos,Math.atan等

Math.log(10) =>10的自然对数

Math.log(100)/Math.LN10 =>以10为底100的对数

Math.log(512)/Math.LN2 =>以2为底数512的对数

Math.exp(3) =>e的三次幂

**二、字符串的使用**

var s="hellow,world" //定义一个字符串

s.charAt(0) // =>"h": 第一个字符

s.charAt(s.length-1) // => "d": 最后一个字符

s.substring(1,4) // => "ell":第2~4个字符

s.slice(1,4) // =>"ell":同上

s.slice(-3) // =>"rld":最后三个字符

s.indexOf("1") // =>2:字符1首次出现的位置

s.lastIndexOf("1") // =>10:字符最后一次出现的位置

s.indexOf("1",3) // =>3:在位置3及之后首次出现字符1的位置

s.split(",") // =>["hello","world"]分割成子串

s.replace("h","H") // =>"Hello,world":全文字符替换

s.toUpperCase() // ="HELLO,WORLD"