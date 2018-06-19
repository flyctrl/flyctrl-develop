---
title: NPM常用命令
tags:
  - npm常用命令
id: 2665
categories:
  - ECMAScript6
date: 2017-11-01 14:42:45
---

npm是什么，大家都应该很熟悉了。npm的常用命令很多，为了避免经常到npm官网查找，特将常用的npm命令整理下来。

### npm install
包安装模块
#### 本地安装
npm install express 就会默认安装express的最新版本，也可以通过在后面加版本号的方式安装指定版本，如npm install express@3.0.5
安装结束后，当前目录下回多出一个node_modules目录,里面有express模块 

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm1.png)

简单说明一下上图
* express@3.0.5 当前安装的package为express，版本为3.0.5
* node_modules/express：安装目录
* methods@0.0.1: 依赖的模块有methods、fresh等以及各自的版本和依赖。

#### 全局安装
npm install express -g 将包安装到全局环境中,可以直接在命令行里使用。

### npm uninstall
卸载模块

我们可以使用以下命令来卸载 Node.js 模块。
```javascript
npm uninstall express
```
卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：
```javascript
npm ls
```
### npm update
更新模块
```javascript
npm update express
```
更新express模块

如果想知道npm上是否已经更新，npm info express可以查看到express在npm上发布过哪些版本以及最新的版本，但是内容太多，让人眼花缭乱，使用npm dist-tags ls express直接列出react发布过哪些tag

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm2.png)

### npm outdated
检查模块是否已经过时

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm3.png)

此命令会列出所有已经过时的包，可以及时进行包的更新

### npm ls
查看安装的模块

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm4.png)

这个命令可以查看安装的模块及依赖

### npm init
创建模块，package.json 文件是必不可少的。

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm5.png)

npm init 会引导创建一个package.json文件，包括名称、版本、作者这些信息等

接下来我们可以使用以下命令在 npm 资源库中注册用户（使用邮箱注册）：
```javascript
npm adduser
Username: mcmohd
Password:
Email: (this IS public) mcmohd@gmail.com
```
接下来我们就用以下命令来发布模块：
```javascript
npm publish
```
如果以上的步骤都操作正确，就可以跟其他模块一样使用 npm 来安装。

### package.json说明
```javascript
{
  "name": "test",
  "version": "0.0.1",
  "description": "this is a test",
  "main": "index.js",
  "dependencies": {
    "connect": "^3.4.1",
    "express": "^3.0.5"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
* name - 包名。
* version - 包的版本号。
* description - 包的描述。
* homepage - 包的官网 url 。
* author - 包的作者姓名。
* contributors - 包的其他贡献者姓名。
* dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
* repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
* main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")。
* keywords - 关键字

### npm help
查看某条命令的详细帮助

例如npm help install，系统在默认的浏览器或者默认的编辑器中打开本地nodejs安装包的文件/nodejs/node_modules/npm/html/doc/cli/npm-install.html

### npm root
查看包的安装路径

输出 node_modules的路径

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm6.png)

### npm config
管理npm的配置路径

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm7.png)

npm的配置工作主要是通过npm config命令，主要包含增、删、改、查几个步骤，下面就以最为常用的proxy配置为例。

#### 设置proxy
内网使用npm设置代理，如下
```javascript
npm config set proxy http://proxy.example.com:8080
```
#### 查看proxy
```javascript
npm config get proxy
```
#### 删除proxy
```javascript
npm config delete proxy
```
#### 查看所有配置
```javascript
npm config list
```
![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm8.png)

#### 直接修改配置文件
```javascript
npm config edit
```
此时会在默认编辑器中打开配置文件，可以手动修改配置文件

### npm cache
管理模块的缓存

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm9.png)

常用命令 清除npm本地缓存 npm cache clean

### npm start
启动模块

基础语法
```javascript
npm start [-- < args >]
```
该命令写在package.json文件scripts的start字段中，可以自定义命令来配置一个服务器环境和安装一系列的必要程序，如
"scripts": { "start": "gulp -ws" }
此时在cmd中输入npm start命令相当于执行gulpfile.js文件自定义的watch和server命令。
如果package.json文件没有设置start，则将直接启动node server.js

### npm test
测试模块

基础语法
```javascript
npm test [--< args > ]
```
该命令写在package.json文件scripts的test字段中，可以自定义该命令来执行一些操作，如
"scripts": { "test": "gulp release" },
此时在cmd中输入npm test命令相当于执行gulpfile.js文件自定义的release命令。

### npm version
查看模块版本

![npm](http://www.npm8.com/wp-content/uploads/2017/11/npm10.png)

### npm view
查看模块的注册信息
```javascript
npm view moduleNames：查看node模块的package.json文件
```
注意事项：如果想要查看package.json文件夹下某个标签的内容，可以使用
```javascript
npm view moduleName labelName
```
