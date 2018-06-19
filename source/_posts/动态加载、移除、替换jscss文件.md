---
title: 动态加载、移除、替换js/css文件
tags:
  - 动态加载css/js文件
  - 动态替换css/js文件
  - 动态移除css/js文件
id: 1471
categories:
  - JS/Jq
date: 2015-09-02 11:50:34
---

## 1、动态加载一个js/css文件
```javascript
function loadjscssfile(filename, filetype){
    if (filetype=="js"){
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }else if (filetype=="css"){
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
```
使用示例：
```javascript
loadjscssfile("myscript.js", "js")
loadjscssfile("javascript.php", "js")
loadjscssfile("mystyle.css", "css")
```

## 2、移动已经加载过的js/css
```javascript
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] &amp;&amp; allsuspects[i].getAttribute(targetattr)!=null &amp;&amp; allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
           allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}
```
使用示例：
```javascriptremovejscssfile("somescript.js", "js")
removejscssfile("somestyle.css", "css")
```

## 3、替换已经加载的js/css文件，

代码如下：
```javascript
function createjscssfile(filename, filetype){
    if (filetype=="js"){
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }else if (filetype=="css"){
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    return fileref
}
    
function replacejscssfile(oldfilename, newfilename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
           var newelement=createjscssfile(newfilename, filetype)
           allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
        }
    }
}
```
使用示例：
```javascript
replacejscssfile("oldscript.js", "newscript.js", "js")
replacejscssfile("oldstyle.css", "newstyle", "css")
```
&nbsp;