---
title: HTTP之GET与POST区别
tags:
  - get
  - pot
id: 193
categories:
  - HTML5/CSS3
date: 2015-07-12 21:47:20
---

HTTP定义了与服务器交互的不同方法，最基本的方法是 GET 和 POST.

HTTP-GET和HTTP-POST是使用HTTP的标准协议动词，用于编码和传送变量名/变量值对参数，并且使用相关的请求语义。每个HTTP-GET和HTTP-POST都由一系列HTTP请求头组成，这些请求头定义了客户端从服务器请求了什么，而响应则是由一系列HTTP应答头和应答数据组成，如果请求成功则返回应答。


HTTP-GET以使用MIME类型application/x-www-form-urlencoded的urlencoded文本的格式传递参数。Urlencoding是一种字符编码，保证被传送的参数由遵循规范的文本组成，例如一个空格的编码是"%20"。附加参数还能被认为是一个查询字符串。

与HTTP-GET类似，HTTP-POST参数也是被URL编码的。然而，变量名/变量值不作为URL的一部分被传送，而是放在实际的HTTP请求消息内部被传送。

GET和POST之间的主要区别如下：
* （1）get是从服务器上获取数据，post是向服务器传送数据。
* （2）在客户端，Get方式在通过URL提交数据，数据在URL中可以看到；POST方式，数据放置在HTML HEADER内提交。
* （3）对于get方式，服务器端用Request.QueryString获取变量的值，对于post方式，服务器端用Request.Form获取提交的数据。
* （4） GET方式提交的数据最多只能有1024字节，而POST则没有此限制。
* （5） 安全性问题。正如在（2）中提到，使用 Get 的时候，参数会显示在地址栏上，而 Post 不会。所以，如果这些数据是中文数据而且是非敏感数据，那么使用 get；如果用户输入的数据不是中文字符而且包含敏感数据，那么还是使用 post为好。

注：所谓安全的意味着该操作用于获取信息而非修改信息。幂等的意味着对同一 URL 的多个请求应该返回同样的结果。完整的定义并不像看起来那样严格。换句话说，GET 请求一般不应产生副作用。从根本上讲，其目标是当用户打开一个链接时，她可以确信从自身的角度来看没有改变资源。比如，新闻站点的头版不断更新。虽然第二次请求会返回不同的一批新闻，该操作仍然被认为是安全的和幂等的，因为它总是返回当前的新闻。反之亦然。POST 请求就不那么轻松了。

POST 表示可能改变服务器上的资源的请求。仍然以新闻站点为例，读者对文章的注解应该通过POST请求实现，因为在注解提交之后站点已经不同了（比方说文章下面出现一条注解）。

一个简单的例子来说明它们的区别：  

```html
<!-分别通过get和post方式提交表单-->
<FORM ACTION="getpost.asp" METHOD="get">
<INPUT TYPE="text" NAME="Text" VALUE="http://wxf0701.cnblogs.com//>
<INPUT TYPE="submit" VALUE="Get方式"></INPUT>
</FORM>


<FORM ACTION="getpost.asp" METHOD="post">
<INPUT TYPE="text" NAME="Text" VALUE="http://wxf0701.cnblogs.com/>
<INPUT TYPE="submit" VALUE="Post方式"></INPUT>
</FORM>
```

<% If Request.QueryString("Text") <> "" Then %>

通过get方式传递的字符串是：

<%= Request.QueryString("Text") %>
<% End If %>

<% If Request.Form("Text") <> "" Then %> 

通过Post方式传递的字符串是： 

<%= Request.Form("Text") %></B>

<% End If %>