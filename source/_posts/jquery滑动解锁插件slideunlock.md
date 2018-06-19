---
title: jQuery滑动解锁插件SlideUnlock
tags:
  - jQuery滑动解锁插件
  - SlideUnlock
id: 2287
categories:
  - 插件库
date: 2016-04-07 11:07:14
---

插件描述：基于jQuery的滑动解锁插件SlideUnlock

插件效果图：

![基于jQuery的滑动解锁插件SlideUnlock](http://www.npm8.com/wp-content/uploads/2016/04/3.jpg)

**html**
```html<div class="slideunlock-wrapper">
    <input type="hidden" value="" class="slideunlock-lockable"/>
    <div class="slideunlock-slider">
        <span class="slideunlock-label"></span>
        <span class="slideunlock-lable-tip">Slide to unlock!</span>
    </div>
</div>```
**css**
```css.slideunlock-wrapper{
    width: 360px;
    position: relative;
    padding: 50px;
    background: #ECF0F1;
    margin: 0 auto;
}
.slideunlock-slider{
    padding:20px;
    position: relative;
    border-radius: 2px;
    background-color: #FDEB9C;
    overflow: hidden;
    text-align: center;
}
.slideunlock-slider.success{
    background-color: #E5EE9F;
}
.slideunlock-label{
    width: 40px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #E67E22;
    z-index: 999;
    border-radius: 2px;
    cursor: pointer;
}
.slideunlock-label-tip{
    z-index: 9;
}
@media screen and (max-width: 640px) {
    .slideunlock-wrapper{
        width: 64%;
    }
}
```
**JavaScript**

depend on jQuery
```javascript
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.slideunlock.min.js"></script>
<script type="text/javascript">
    $(function () {
        var slider = new SliderUnlock(".slideunlock-slider", {
            labelTip: "滑动解锁",
            successLabelTip: "解锁成功",
            duration: 200   // 动画效果执行时间，默认200ms
        }, function(){
            alert('success');
        }, function(){
            $(".warn").text("index:" + slider.index + "， max:" + slider.max + ",lableIndex:" + slider.lableIndex + ",value:" + $(".slideunlock-lockable").val() + " date:" + new Date().getUTCDate());
        });
        slider.init();
        $("#reset-btn").on('click', function(){
            slider.reset();
        });
    })
</script>
var slider = new SliderUnlock(element, options, success, always);
slider.init();
// element is required and right. id or class or any identifying which can be loaded by jquery.
// if you dont want to give options, please give a null object, like this -- {}
//If you need to support mobile，Please add jQuery mobile plugin：
<script type="text/javascript" src="js/jquery.mobile.min.js"></script>
```
&nbsp;

[查看演示](http://demo.grycheng.com/case/jQuery-slide-unlock/)

[点击下载](http://www.npm8.com/wp-content/uploads/2016/04/jQuery-slide-unlock.zip)

&nbsp;