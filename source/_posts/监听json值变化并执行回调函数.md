---
title: 监听json值变化并执行回调函数
tags:
  - 监听json值变化
id: 1010
categories:
  - JS/Jq
date: 2015-07-26 17:00:07
---

用法：
```javascript
var obj = {_name:"test"}
obj.bind("name",function(){
console.log("callback");
})

obj.name = "测试";    // 会触发bind方法
```

```javascript
if(!Object.prototype.bind){
        Object.prototype.bind = function(key, callback){
        var _key = "_" + key;
        Object.defineProperty(this, key, {
                get: function(){
                        return this[_key];
                },
                set: function(value){
                        if(value !== this[_key]){
                        this[_key] = value;
                        callback();
                        }
                }
        });
        }
}
```
&nbsp;