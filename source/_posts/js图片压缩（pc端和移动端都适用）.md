---
title: JS图片压缩（pc端和移动端都适用）
tags:
  - js图片压缩
id: 1454
categories:
  - JS/Jq
date: 2015-08-31 19:13:11
---

最近在做移动端遇到了一个问题就是：手机拍照后，图片过大如果上传到服务器务必会浪费带宽，最重要的是流量啊别慌，好事儿来了，务必就会有人去研究研究图片的压缩：

鄙人结合前人的经验，结合自己实战，总结出一个方法供大家参考:
```javascript
/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path    
 *         pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *         obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *         回调函数有一个参数，base64的字符串数据
 */
function dealImage(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
        var quality = 0.7;        // 默认图片质量为0.7

        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);

        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality );
        // 回调函数返回base64的值
        callback(base64);
    }
}
```

当然返回的是一个base64的一个字符串；
如果可以试着测试一下压缩后的图片大小：
```javascript
// 调用函数处理图片 　　　　　　　　　　　　　　　　
dealImage("路径", {
// 注意：在pc端可以用绝对路径或相对路径，移动端最好用绝对路径（因为用take photo后的图片路径，我没有试成功（如果有人试成功了可以分享一下经验））
    width : 200
}, function(base){
//直接将获取到的base64的字符串，放到一个image标签中就可看到测试后的压缩之后的样式图了
    document.getElementById("transform").src = base;
    console.log("压缩后：" + base.length / 1024 + "   " + base);　　　　
})
```
PS：主要思想就是获取到图片，利用H5 canvas技术进行图片数据化为 base64 的字符串，最后传到后台进行，后台将base64的字符串数据进行图像化储存。
&nbsp;