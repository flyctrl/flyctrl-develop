---
title: jquery-barcode.js绘制条码生成打印插件
tags:
  - jquery-barcode.js
  - jQuery生成二维码
  - jQuery生成条码
  - jQuery绘制条码
  - jq生成二维码
  - jq生成条码
  - jq绘制条码
id: 2241
categories:
  - 插件库
date: 2016-03-24 13:17:08
---

![1](http://www.npm8.com/wp-content/uploads/2016/03/1-1.jpg)

query-barcode.js 条形码插件官方下载，barcode-coder ，一款优秀的 barcode 条形码插件，可以实现任一效果条形码的在线生成。

jQuery 条形码插件可以自定义条形码颜色、背景颜色、高度与宽度，jQuery barcode plugin 还可以方便地设置字符串或/和数字信息到条形码中，得到标准、美观、规范的显示。

javascript绘制条形码/二维码，居于jquery的实现，示例和API如下，翻译来源：[http://barcode-coder.com/en/barcode-jquery-plugin-201.html](http://barcode-coder.com/en/barcode-jquery-plugin-201.html)
jquery绘制条形码/二维码插件jquery.barcode.js API文档和使用说明如下

**1**）**query.barcode.js导入**

同其他jquery插件一样，只需要将jquery框架和jquery.barcode.js导入页面即可。
```html
<script type="text/javascript" src="jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="jquery-barcode.js"></script>
```
&nbsp;

**2**）**jquery.barcode.js使用方法**

2.1）定义一个DOM对象作为条形码/二维码的容器
```html
<div id="bcTarget"></div>
```
&nbsp;

2.2）使用javascript调用jquery.barcode.js绘制条形码/二维码
```javascript
$("#bcTarget").barcode("1234567890128", "ean13");
```
&nbsp;

**jquery对象扩展方法barcode参数说明**：barcode: function(datas, type, settings)

1.  **datas参数支持2种类型**

    *   **string：**
    要绘制的条形码字符串内容（依赖于条形码的类型）。如果条形码类型能容纳这些字符，并且存在校验不是强制性的，字符串的ISE将会自动计算（原文：If barcode type include it, the presence of the checksum is not mandatory, it ise automatically recalculated）
    *   **object![2](http://www.npm8.com/wp-content/uploads/2016/03/2.jpg)**

2.  **type (string)：条形码类型**

    *   codabar
    *   code11 (code 11)
    *   code39 (code 39)
    *   code93 (code 93)
    *   code128 (code 128)
    *   ean8 (ean 8)
    *   ean13 (ean 13)
    *   std25 (standard 2 of 5 - industrial 2 of 5)
    *   int25 (interleaved 2 of 5)
    *   msi
    *   datamatrix (ASCII + extended)

3.  **settings (object)：条形码样式的配置**

    *   ![3](http://www.npm8.com/wp-content/uploads/2016/03/3.jpg)

**示例代码**
```html
<script type="text/javascript" src="http://barcode-coder.com/js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="http://barcode-coder.com/js/jquery-barcode-last.min.js"></script>
<div id="bcTarget1"></div>
<div id="bcTarget2"></div>
<div id="bcTarget3"></div>
<script>
window.onload = function () {
$("#bcTarget1").barcode("NF98768574", "code128", { barWidth: 2, barHeight: 30 });
$("#bcTarget2").barcode("1234567890128", "code128", { barWidth: 2, barHeight: 30 });
$("#bcTarget3").barcode("ABC12345611", "code128", { barWidth: 2, barHeight: 30 });
}
</script>
```
&nbsp;

[DEMO演示](http://demo.grycheng.com/case/jquery-barcode/jquery-barcode.html)
&nbsp;

DEMO演示图片：

![031850314849390](http://www.npm8.com/wp-content/uploads/2016/03/031850314849390-660x107.jpg)
&nbsp;

[DEMO下载（jquery-barcode）](http://www.npm8.com/wp-content/uploads/2016/03/jquery-barcode.zip)
&nbsp;