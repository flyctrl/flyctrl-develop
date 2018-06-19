---
title: JS获取几种URL地址的方法
tags:
  - js
  - 获取url
id: 133
categories:
  - JS/Jq
date: 2015-07-12 18:42:25
---

以下为JS获取几种URL地址的方法
```
javascript
thisURL = document.URL;
thisHREF = document.location.href;
thisSLoc = self.location.href;
thisDLoc = document.location;

thisTLoc = top.location.href;
thisPLoc = parent.document.location;
thisTHost = top.location.hostname;
thisHost = location.hostname;

tmpHPage = thisHREF.split( "/" );
thisHPage = tmpHPage[ tmpHPage.length-1 ];
tmpUPage = thisURL.split( "/" );
thisUPage = tmpUPage[ tmpUPage.length-1 ];
```

下面为使用JS获取MAC地址、IP地址及主机名的方法：
```html
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>

<body>

<object classid="CLSID:76A64158-CB41-11D1-8B02-00600806D9B6" id="locator" style="display:none;visibility:hidden"></object>
<object classid="CLSID:75718C9A-F029-11d1-A1AC-00C04FB6C223" id="foo" style="display:none;visibility:hidden"></object>

<form name="myForm">
<br/>MAC地址：<input type="text" name="macAddress">
<br/>IP地址：<input type="text" name="ipAddress">
<br/>主机名：<input type="text" name="hostName">
</form>

</body>
</html>
<script language="javascript">
var sMacAddr="";
var sIPAddr="";
var sDNSName="";

var service = locator.ConnectServer();
service.Security_.ImpersonationLevel=3;
service.InstancesOfAsync(foo, 'Win32_NetworkAdapterConfiguration');

</script>

<script FOR="foo" EVENT="OnObjectReady(objObject,objAsyncContext)" LANGUAGE="JScript">
if(objObject.IPEnabled != null &amp;&amp; objObject.IPEnabled != "undefined" &amp;&amp; objObject.IPEnabled == true){
if(objObject.IPEnabled &amp;&amp; objObject.IPAddress(0) !=null &amp;&amp; objObject.IPAddress(0) != "undefined")
sIPAddr = objObject.IPAddress(0);
if(objObject.MACAddress != null &amp;&amp;objObject.MACAddress != "undefined")
sMacAddr = objObject.MACAddress;
if(objObject.DNSHostName != null &amp;&amp;objObject.DNSHostName != "undefined")
sDNSName = objObject.DNSHostName;
}
</script>

<script FOR="foo" EVENT="OnCompleted(hResult,pErrorObject, pAsyncContext)" LANGUAGE="JScript">

myForm.macAddress.value=sMacAddr;
myForm.ipAddress.value=sIPAddr;
myForm.hostName.value=sDNSName;
</script>
```