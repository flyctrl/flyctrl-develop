---
title: 'wamp改网站默认根目录,使用域名重定向,多站点配置'
tags:
  - wamp
  - wamp使用域名重定向
  - wamp多站点配置
  - wamp改网站默认根目录
id: 2137
categories:
  - 前端杂货
date: 2016-02-08 09:33:06
---

wamp安装目录:C:\wamp

安装wamp前保存的项目目录:E:\wamp\www

先在源目录:C:\wamp中实现多站点配置:

1.在C:\wamp\bin\apache\apache2.4.9\conf目录中文件:httpd.conf找到这一行`#Include conf/extra/httpd-vhosts.conf`
去掉最前面的#(这样httpd-vhosts.conf文件才能生效)

查找:(这里安装在c盘所以是c)
`<Directory "c:/wamp/www/">`
再往下面# onlineoffline tag - don't remove这一行下面
这一行上面
本来可能是:
Deny from all
或者是
Allow from 127.0.0.1
都用#在最前面加#号注释掉
#Allow from 127.0.0.1
#Deny from all
添加一行:
Allow from all

2.在
C:\wamp\bin\apache\apache2.4.9\conf\extra
目录中文件:httpd-vhosts.conf
添加下面配置:

DocumentRoot "c:\wamp\www\test"
ServerName test01.com

在文件夹中:c:\wamp\www\test
新建一个测试文件1.php

3.在
C:\Windows\System32\drivers\etc
目录中文件:hosts
用记事本打开,在最后添加一行
127.0.0.1 test01.com

重启wamp,在浏览器输入:
test01.com/1.php
能够正确访问说明配置成功

第二部分:改网站源码的根目录是:e:\wamp\www

1.在C:\wamp\bin\apache\apache2.4.9\conf目录文件:httpd.conf查找:DocumentRoot "c:/wamp/www/"改为:DocumentRoot "e:/wamp/www/"

查找:

<`Directory "c:/wamp/www/">`

改为:

`<Directory "e:/wamp/www/">`

拷贝：index.php

将C:/wamp/www/拷贝至e:/wamp/www/

查找：

$wampConfFile =

$aliasDir =

修改：

$wampConfFile = 'c:/wamp/wampmanager.conf';

$aliasDir = 'c:/wamp/alias/';

修改wampmanager.ini和wampmanager.tpl

1 修改C:\wamp\wampmanager.ini:

(1)打开：C:\wamp\wampmanager.ini

(2)查找：Type: item; Caption: "www 目录"; Action: shellexecute; FileName: "c:/wamp/www/"; Glyph: 2

(3)修改：Type: item; Caption: "www 目录"; Action: shellexecute; FileName: "e:/wamp/www/"; Glyph: 2

2 修改C:\wamp\wampmanager.tpl：

（1）打开：C:\wamp\wampmanager.tpl

（2）查找：Type: item; Caption: "${w_wwwDirectory}"; Action: shellexecute; FileName: "${wwwdir}"; Glyph: 2

（3）修改：Type: item; Caption: "${w_wwwDirectory}"; Action: shellexecute; FileName: "e:/wamp/www/"; Glyph: 2

在
C:\wamp\bin\apache\apache2.4.9\conf\extra
目录中文件:httpd-vhosts.conf
配置:改一下,并且在e:\wamp\www\中建立项目test

DocumentRoot "e:\wamp\www\test"
ServerName test01.com

重启wamp,浏览器测试,能够访问则成功配置.