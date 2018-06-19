---
title: placeholder的兼容处理(基于jq)
tags:
  - placeholder
  - placeholder兼容处理
id: 1971
categories:
  - JS/Jq
date: 2015-12-21 17:52:46
---

这是一个老问题，结合项目的经验，需要处理的问题有一下几个。

1.只有输入框（input/textarea）下的palaceholder属性存在的时候才需要处理这类兼容

2.处理好输入框上焦点和是焦点的文本显示

3.密码输入框比较特殊，因为为其设置显示文本时显示的是一串“***”。这个问题后面分析。处理好前两点还是比较简单的，处理源码为如下

```javascript
var browserSupport = {
    placeholder: 'placeholder' in document.createElement('input')
}

$(function() {
    //模拟placeholder
    if( !browserSupport.placeholder){
        $('input[placeholder],textarea[placeholder]').each(function(){
            var that = $(this),
                text= that.attr('placeholder'),
                oldType; 
            if(that.val()===""){
                that.val(text).addClass('placeholder');                
            }   
            that.focus(function(){
                //ie8下readonly依然可以上焦点的处理
                if(that.attr('readonly')){
                    that.blur();
                    return;
                }

                that.removeClass('placeholder');

                if(that.val()===text){   
                    that.val("");   
                }   
            }).blur(function(){
                if(that.val()===""){ 
                    that.val(text).addClass('placeholder');
                //防止异常情况：当有placeholder类，且值不为空（代码设置值时容易出现）
                }else{
                    that.removeClass('placeholder');
                }   
            }).closest('form').submit(function(){   
                if(that.val() === text){   
                    that.val('');   
                }   
            });   
        });
    }
});
```
可以看出处理还是比较简单的。在不支持placeholder的浏览器下没有上焦点的为placeholder的空白输入框添加class placeholder并设置其内容为placeholder值。上焦点的placeholder的输入框判断其值是否是手动设置的placeholder值，如果是则重置输入框为空白。当然免不了提交表单的时候要清除兼容placeholder的影响。

这里面有一个细节事件是绑定在标签对应的缓存中，而不是委托document等祖先节点，为什么？有两个考虑：

**1.避免有设置事件禁止冒泡导致绑定到document上的事件没法处理。**

**2.事件执行的先后顺序是先执行绑定到自身节点的事件，然后在冒泡到document节点执行事件源委托到document的事件。**


至于第3点密码输入框的问题。我们首先考虑是当密码输入框失焦的时候先更改输入框的type为text类型然后按照正常的设置其值为placeholder值；聚焦的时候将type值设置回来并恢复其值。但是这个存在问题是IE8不允许更改type类型。没招了，只能额外的添加一个元素来展示密码输入框的placeholder值。结果完整的源码就变成了如下
```javascript
/*
.placeholder{    
    color: #aaa!important;
}
span.placeholder{
    position: absolute;
    left: 0;
    line-height: 34px;
    padding-left: 12px;
}
*/
var browserSupport = {
    placeholder: 'placeholder' in document.createElement('input')
}

/* ajax请求发现未登录时，服务端返回401错误，然后此处统一处理401错误，跳转到登录页面 */
$(document).ready(function() {
    //模拟placeholder
    if( !browserSupport.placeholder){
        $('input[placeholder],textarea[placeholder]').each(function(){
            var that = $(this),
                text= that.attr('placeholder'),
                oldType; 
            if(that.val()===""){
                if(that.attr('type') != 'password'){
                    that.val(text).addClass('placeholder');  
                }else{
                    that.before('<span class="placeholder">请输入密码</span>');
                }
            }   
            that.focus(function(){
                //ie8下readonly依然可以上焦点的处理
                if(that.attr('readonly')){
                    that.blur();
                    return;
                }
                //清除span.placeholder
                that.prev("span.placeholder").remove();
                that.removeClass('placeholder');

                if(that.val()===text){   
                    that.val("");   
                }   
            }).blur(function(){
                if(that.val()===""){
                    if(that.attr('type') != 'password'){   
                        that.val(text).addClass('placeholder');
                    }else{
                        that.before('<span class="placeholder">请输入密码</span>');
                    }
                //防止异常情况：当有placeholder类，且值不为空（代码设置值时容易出现）
                }else{
                    that.removeClass('placeholder');
                }   
            }).closest('form').submit(function(){   
                if(that.val() === text){   
                    that.val('');   
                }   
            });   
        });
        $(document).on('click','span.placeholder',function(){
            $(this).next("[placeholder]").focus();
            //删除span.placeholder会在[placeholder]的focus中进行
        })
    }
})
```
我自己专门添加了一个span.placeholder来显示密码输入框的占位符显示。然后添加了一个监听器监听span.placeholder被点击。

功能是完成了，在测试的时候还是会遇到一个问题，浏览器有自动填写表单的时候初始化可能会出现异常，现在为止还没有什么好的方法捕获自动填写表单事件，结果可能导致密码输入框的placeholder显示和内容一起显示。所以如果要使用这种密码输入框的placeholder兼容方式，最好让浏览器不自动填充，也有利于信息保密：给密码input设置autocomplete=off即可。

需要注意的是autocomplete=off在chrome下也有兼容问题，不过这里是专门给IE下用的到没有什么问题，只不过chrome下是没有保密而已。更多的信息自行百度。