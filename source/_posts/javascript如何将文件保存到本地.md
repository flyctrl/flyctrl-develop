---
title: javascript如何将文件保存到本地
tags:
  - js将文件保存到本地
id: 859
categories:
  - JS/Jq
date: 2015-07-25 15:50:12
---

下面是保存一个图片为示例，代码来源于网络，希望能够给大家带来一定的帮助，代码如下:
```javascript
<script type="text/javascript">
function saveFile(imgUrl)
{
var oPop=window.open(imgUrl,"","width=1, height=1, top=5000, left=5000");
for(;oPop.document.readyState != "complete"; )
{
if(oPop.document.readyState=="complete")break;
}
oPop.document.execCommand("SaveAs");
oPop.close();
}
</script>
</head>
<body>
<img src="../mytest.jpg" id="theimage" border="0">
<a href="#" onclick="saveFile(document.getElementById('theimage').src)"> 点击这里下载图片 </a>
</body>
</html>
```
&nbsp;

&nbsp;