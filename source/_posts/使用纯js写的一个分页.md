---
title: 使用纯js写的一个分页
tags:
  - js分页
id: 1327
categories:
  - JS/Jq
date: 2015-08-26 21:18:59
---

上图晒效果：

[![261504567658315](http://www.npm8.com/wp-content/uploads/2015/08/261504567658315-650x195.png)](http://www.npm8.com/wp-content/uploads/2015/08/261504567658315.png) [![261505054227294](http://www.npm8.com/wp-content/uploads/2015/08/261505054227294-650x147.png)](http://www.npm8.com/wp-content/uploads/2015/08/261505054227294.png)
&emsp;&emsp;网上确实有很多分页的插件以及开源代码，单本是一个后台开发猿，前台css等样式还驾驭不住，所以就开始自己去写了。其实这个分页原理很简单，就是用ajax往后台传值(当前页码)，后台使用limit进行分页。

&emsp;&emsp;因为时间紧张，写的应该也不是很完美，有些公共的没有抽取出来，但是用起来还是可以的，这块代码是可以把它当做公共的分页去处理的，我就是用这块代码写了两个稍微不同一些的分页！公共的代码抽取的也差不多，主要就是ajax后台以及返回的值不同而已，只要把总页码的值获取到，点击首页/下一页等传值正确的话，基本上分页是不会出什么问题的，废话不多说，直接上代码了！ 注：本项目是全程使用js来写的，前台的数据通过ajax进行获取，然后再进行拼装，动态加载到页面。

**1.先把上一页，下一页等的代码附上(里面的值都是伪值，下面会在js里进行重新赋值的！)**

```html
<ul class="page" id="page">
<li id="shouye" class="p-prev disabled">
<a href='javascript:indexpage(1);'>首 页</a>
</li>

<li id="shangyiye" class="p-prev disabled" >
<a href='javascript:indexpage(-1);'><i></i>上一页</a>
</li>
<li ><a id="one" href="javascript:void(0);" >1</a></li>
<li><a id="two" href="javascript:void(0);" >2</a></li>
<li><a id="three" href="javascript:void(0);" >3</a></li>
<li class="more"><a id="five" href="javascript:void(0);" >...</a></li>
<li><a id="fore" href="javascript:void(0);" >13855</a></li>
<li class='p-next'>
<a href='javascript:indexpage(-3);' onclick="jumpToPage('2','/goods/ajaxqueryGoodsList.do.html','','goodsListContainer','13855', listPageCallback);">下一页<i></i></a>
</li>
<li id="weiye" class='p-next'>
<a href='javascript:void(0);' onclick="indexpage(0);">尾 页</a>
</li>

<li class="total">
<span id="span_number">共13855页 到第<input type="text" id="input_number" class="page-txtbox" />页
<input name="" value="确定" type="button" onclick="jumpToPage(jQuery('#input_number').val(),'/goods/ajaxqueryGoodsList.do.html','','goodsListContainer','13855', listPageCallback);" class="page-btn"/>
</span>
</li>
</ul>
```
**2.首先在页面放两个隐藏域，一个是当前页码，一个是总页码，总页码是页面加载完，从后台查询出来后直接附上值的，当前页码是没操作一个，就要对当前页码赋值**
```html
<input id="jiazai" type="hidden" ><!-- 当前页码 -->
<input id="totalpage" type="hidden" ><!-- 总页码 -->
```
**3.写一个页面加载完的function，给总页码和当前页码赋值**
```javascript
$(function(){
     $('#jiazai').val(1);//给当前页码进行赋值，默认为第一页
     ajaxfunction(page,arg,chipssort,'');//这个方法是抽取的ajax后台访问的方法

});
```
**4.抽取的ajax方法，此页面会用到好几次这个方法，所有把它收取了出来，因为页面的数据时通过ajax从后台获取到的，后台返回的是一个List集合**
```javascript
//抽取ajax的方法
function ajaxfunction(page,arg,chipssort,fontval){
    $.ajax({
        type:'POST',
        url:'/admin/receptionchips/showlist',//请求的url地址
        data:{
            page:page,
            sort:arg,
            chipssort:chipssort,
            fontval:fontval
        },
        dataType:'json',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        success:function(data){
            //返回值在进行访问抽取的方法，从后台返回
            commonfunction(data);
        }
    });
}
```
**5.代码看到这也不是很多，最后一个了**
```javascript
//抽取拼串的方法
function commonfunction(data){
    $('#projectlist').find("li").remove();
      for (var i=0;i<data.length;i++ )
     { 
        /*****因为此页面是动态加载的，这里主要就是进行拼串，代码也不少，就不漏出来占空间了*****/

     }
　　　　　　//开始是分页的核心了
      if(data.length>0){
          //设置页码
            var pading =  data[0].padingnum;//总页码
            $('#totalpage').val(pading);
            var page = $('#jiazai').val();//当前页
             $('#countpage').html("**"+page+"**/"+pading+"");

             $('#span_number').html("共"+pading+"页 到第<input id="input_number" class="page-txtbox" type="text" />页<input class="page-btn" name="" type="button" value="确定" />")
      }else{
          $('#countpage').html("**"+0+"**/"+0+"");
      }
      //设置分页的底部 就是 首页  1   2   3   4   5   6   尾页
      var pading =  data[0].padingnum;//总页码href="javascript:void(0);"
      var nowpage = $('#jiazai').val();//当前页
      //one  two  three five fore
　　　　　　//下面代码看着是比较麻烦，但是也不难理解  全是一样的代码，只不过是加了些判断
      if(nowpagepading){
              $('#five').parent().hide();
              $('#fore').parent().hide();
          }else{
              $('#five').parent().show();
              $('#five').text(Number(nowpage)+1);
              $('#five').attr('href','javascript:indexpage("'+(Number(nowpage)+1)+'");');
          }
          //判断下一页的第二页是否超过了总页数
          if(Number(nowpage)+2>pading){
              $('#fore').parent().hide();
          }else{
              $('#fore').parent().show();
              $('#fore').text(Number(nowpage)+2);
              $('#fore').attr('href','javascript:indexpage("'+(Number(nowpage)+2)+'");');
          }

      }
      //如果总页数小于5，这块代码主要就是设置  1  2  3  4  5  这些的显示和隐藏的
      if(pading==0){
          $('#one').parent().hide();
          $('#two').parent().hide();
          $('#three').parent().hide();
          $('#five').parent().hide();
          $('#fore').parent().hide();
      }else if(pading==1){
          $('#shouye').hide();
          $('#weiye').hide();
          $('#one').parent().hide();
          $('#two').parent().hide();
          $('#three').parent().hide();
          $('#five').parent().hide();
          $('#fore').parent().hide();
      }else if(pading==2){
          $('#one').parent().show();
          $('#two').parent().show();
          $('#three').parent().hide();
          $('#five').parent().hide();
          $('#fore').parent().hide();
      }else if(pading==3){
          $('#one').parent().show();
          $('#two').parent().show();
          $('#three').parent().show();
          $('#five').parent().hide();
          $('#fore').parent().hide();
      }else if(pading==4){
          $('#one').parent().show();
          $('#two').parent().show();
          $('#three').parent().show();
          $('#five').parent().show();
          $('#fore').parent().hide();
      }else{
          $('#one').parent().show();
          $('#two').parent().show();
          $('#three').parent().show();
          $('#five').parent().show();
          $('#fore').parent().show();
      }

      //设置高亮显示的，就是是第一页时，1亮，第二页时  2亮
      $('#page a').each(function() {
          $(this).parent().removeClass("current");
            if($(this).text()==nowpage){
                $(this).parent().addClass("current");
            }
        });
      //分页完返回页面顶端
      $("html,body").animate({scrollTop:0}, 500);

     //最后，给当前页码加1
    $('#jiazai').val(Number(bianlaing)+Number(1)); 
}
```
&emsp;&emsp;好了，到这里分页就完成了，如果你们需要使用的话，可能会话费一会去理解我的代码，其实代码不难，我是使用了两个小时把它写完的，只要一行一行代码看，并且自己再加注释，把这块弄过去，不出半小时绝对搞定！