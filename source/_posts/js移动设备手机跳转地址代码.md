---
title: js移动设备手机跳转地址代码
tags:
  - 手机跳转地址
id: 397
categories:
  - 移动前端
date: 2015-07-14 17:52:30
---

```javascript
if(/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|
PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
    if(window.location.href.indexOf("?mobile")<0){
        try{
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                window.location.href="手机页面";
            }else if(/iPad/i.test(navigator.userAgent)){
                window.location.href="平板页面";
            }else{
                window.location.href="其他移动端页面"
            }
        }catch(e){}
    }
}
```
另外的三种：

### 版本1

```javascript
<script language="javascript"> 
//平台、设备和操作系统  
var system ={  
win : false,  
mac : false,  
xll : false  
};  
//检测平台  
var p = navigator.platform;  
system.win = p.indexOf("Win") == 0;  
system.mac = p.indexOf("Mac") == 0;  
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);  
//跳转语句，如果是手机访问就自动跳转到grycheng.com页面  
if(system.win||system.mac||system.xll){  
}else{  
window.location.href="http://grycheng.com";  
}  
</script>
```

### 版本2

```javascript
<script language="javascript"> 
function is_mobile() {
    var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
  var u = navigator.userAgent;
  if (null == u) {
   return true;
  }
  var result = regex_match.exec(u);

  if (null == result) {
   return false
  } else {
   return true
  }
 }
 if (is_mobile()) {
  document.location.href= 'http://grycheng.com';  //修改http://grycheng.com为你所需跳转目标页地址
 }
</script>
```

### 版本3 百度webapp版

```javascript
<!---识别手机或电脑的js开始--->
<script language="javascript"> 
(function(){
    var res = GetRequest();
    var par = res['index'];
    if(par!='gfan'){
        var ua=navigator.userAgent.toLowerCase();
        var contains=function (a, b){
            if(a.indexOf(b)!=-1){return true;}
        };
//将下面的http://grycheng.com改成你的wap手机版页面地址 如我的 http://grycheng.com
        var toMobileVertion = function(){
            window.location.href = 'http://grycheng.com/'
        }

        if(contains(ua,"ipad")||(contains(ua,"rv:1.2.3.4"))||(contains(ua,"0.0.0.0"))||(contains(ua,"8.0.552.237"))){return false}
        if((contains(ua,"android") &amp;&amp; contains(ua,"mobile"))||(contains(ua,"android") &amp;&amp; contains(ua,"mozilla")) ||(contains(ua,"android") &amp;&amp; contains(ua,"opera"))
    ||contains(ua,"ucweb7")||contains(ua,"iphone")){toMobileVertion();}
    }
})();
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&amp;");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}
</script>
<!---识别手机或电脑的js结束--->
```