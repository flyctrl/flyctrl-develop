---
title: 复制网页内容自动添加版权信息的方法(兼容IE、Firefox和Chrome)
tags:
  - Firefox和Chrome)
  - 复制网页内容自动添加版权信息的方法(兼容IE
id: 2184
categories:
  - JS/Jq
date: 2016-03-10 23:54:18
---

&emsp;&emsp;在网上一搜可以看到很多类似的代码，加入网页body部分就可以。
例如下面这段代码：
```javascript
//复制内容自动添加版权信息
document.body.oncopy = function (){
    setTimeout(function (){
        var text = clipboardData.getData("text");
        if (text)
        {
            text = text + "\r\n原文出自【grycheng前端博客】，转载请保留原文链接："+location.href;
            clipboardData.setData("text", text);
        }
    },
    100
    )
}
```
&emsp;&emsp;这段代码就可以实现，别忘了要写在js文件中或者直接写在页面中用```<script ="text/javascript">``` 代码 ```</script>```包含进去。
加上以上代码后，别人在你网站的任何一个页面，复制任何一个文字的东西，粘贴时都会自动带上版权信息。
但这个代码的不足之处是：在IE6上测试通过，而在Firefox、Opera浏览器上没有效果。

&emsp;&emsp;为了解决这个问题，请教了很多高手，也在网上查了很多资料，终于解决了，在这里想说一句，度娘真的很强大。

以下贴出兼容代码:
```javascript
//复制内容自动添加版权信息 
 var Sys = {}; 
    var ua = navigator.userAgent.toLowerCase(); 
    if( window.ActiveXObject ) 
    { 
        document.body.oncopy=function() 
        { 
            event.returnValue = false; 
            var t=document.selection.createRange().text; 
            var s="\r\n原文出自[grycheng前端博客] 转载请保留原文链接:"+location.href; 
            clipboardData.setData('Text',t+'\r\n'+s); 
        } 
    } 
    else 
    { 
        function addLink() 
        { 
            var body_element = document.getElementsByTagName('body')[0]; 
            var selection; 
            selection = window.getSelection(); 
            var pagelink = " 原文出自[grycheng前端博客] 转载请保留原文链接:"+document.location.href; 

            var copytext = selection + pagelink; 
            var newdiv = document.createElement('div'); 
            newdiv.style.position='absolute'; 
            newdiv.style.left='-99999px'; 
            body_element.appendChild(newdiv); 
            newdiv.innerHTML = copytext; 
            selection.selectAllChildren(newdiv); 
            window.setTimeout 
            ( 
                function() 
                { 
                    body_element.removeChild(newdiv); 
                },0 
            ); 
        } 
        document.oncopy = addLink; 
    }
```
&emsp;&emsp;这个代码经测试，可以兼容，可能还有不足的地方，如有发现，可以在下方留言，共同探讨、改进。
最好说一点，注意编码问题，如发现复制的内容添加的版权信息乱码，可以自行检查编码问题。