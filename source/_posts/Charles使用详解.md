---
title: Charles使用详解
tags:
  - Charles
  - Charles使用详解
id: 2666
categories:
  - 前端杂货
date: 2017-11-02 14:51:41
---

## 一、开始
连接方式
* 方法一：电脑和手机连接同一个wifi
* 方法二：电脑使用网线连接网络，手机通过USB连接电脑

## 二、过滤网络请求
### 1.简单过滤
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles1.png)

在Sequence模式下，就可以看到Filter，输入要过滤的关键字即可。

### 2.长期特定的网络封包
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles2.png)

路径：Proxy->Recording Settings->Include→Add

在编辑框中填入要封的网络请求

### 3.关注特定的网络请求
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles3.png)

在想要特定关注的网络请求那行，右键勾选"Focus"即可

## 三、抓取手机网络包
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles4.png)

前提：手机，电脑连结的是通一个wifi网络

在菜单栏上选择 Proxy->Proxy Settings，填入代理端口 8888，并勾上 “Enable transparent HTTP proxying” 即完成了代理

查看电脑IP地址

在手机wifi网络中添加代理，输入电脑IP和charles的端口号 8888

### 抓HTTPS包
#### 1.Mac安装SSL证书
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles5.png)

在Help→SSL Proxying→Install....

选择后，就会出现证书下载，下载成功后会电脑”钥匙串访问“中看见(这里我已经安装并信任过了)，然后双击下载的证书，勾选信任即可。

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles6.png)

#### 2.手机安装SSL证书
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles7.png)

在SSL Proxying中勾选Install ...Mobile Device 会弹出一个框，用手机(处于代理状态下)登陆指定的url下载证书即可。

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles8.png)

这时候你抓https的时候还是发现不行，乱码加unknown（如下图）

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles9.png)

这时候我们还需要一步操作，就是将想要抓的https加入到SSL代理中，这样才能被Charles识别并解析

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles10.png)

选择我们要抓的请求，右键选择"Enable SSL Proxying"

这时我们发现不再乱码和unknown了

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles11.png)

## 四、网络限速

开发中常备限速，通常对于Chrome我们可以使用浏览器中的"Network中Online修改"，下拉还有3G等设置。

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles12.png)

但是通过代理我们可以做的更全更多

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles13.png)

在"Proxy→Throttle Settings"中，我们可以给所有的网络限速，也可以通过勾选"Only for selected hosts"限制指定的请求速度

## 五、修改网络请求内容
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles14.png)

选中一条网络请求，然后右键选择"Compose"，就会出现上图下半部分的框，可以修改几乎任何你可以想到的请求参数，点击"Execute"执行即可

## 六、修改服务器返回的内容
### 1.Map Remote(Tools→Map Remote Settings)
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles15.png)

将网络响应定向至另外一个网络服务，从而达到修改返回内容的目的

### 2.Map Local(Tools->Map Local Settings)
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles16.png)

将网络响应定向至本地文件，从而达到修改返回内容的目的

### 3.Breakpoints替换返回内容（右键->Breakpoints）
![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles17.png)

通过名称也可以看的出来，这个类似于一种断点的功能，代理会在发送请求的时候拦截并断点网络请求，这就为我们修改网络信息提供了便利。

可以编辑请求的参数和返回的参数。

## 七、反向代理
反向代理(Proxy→Reverse Proxies Settings)也是一个常用的功能，特别是对于本地开发且需要域名的情况下

![Charles](http://www.npm8.com/wp-content/uploads/2017/11/charles18.png)

这个截图的意思是 将本地 57689端口映射到www.os.com域名的80端口