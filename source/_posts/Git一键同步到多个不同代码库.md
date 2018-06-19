---
title: Git一键同步到多个不同代码库
tags:
  - git
  - git使用两个库
id: 2651
categories:
  - 前端杂货
date: 2017-08-23 00:30:04
---
## 需求
&emsp;&emsp;现在代码库众多，有京东、csdn.github、bitbucket,最早我的项目在bitbucket上，但是发现在家里电信网络慢的动都动不了，应该是被电信和谐了，所以不得不改用国内的，但也不想重新建个git，如果能够一键同步到多个不是更好？

## 建立多个远程仓库
&emsp;&emsp;比如在Github的地址是git@github.com:xxx/xxx.git，在Git@OSC的地址是git@git.oschina.net:yyyy/yyy.git。 
按照原先的思路，我们在建立远程库的时候都是运行
```javascript
git remote add origin git@github.com:xxx/xxx.git
git add .
git commit -m 'First commit'
git push -u origin master
```
&emsp;&emsp;Git@OSC类似，以前只是知道origin表示远程仓库的名字，不懂具体含义，后来才知道origin只是git@github.com:xxx/xxx.git的别名，于是这个名字便不再重要。这么解释的话，我们可以通过命令添加多个远程仓库，保证这个“别名”不重复既可。
```javascript
git remote add origin git@github.com:xxx/xxx.git
git remote add osc git@git.oschina.net:yyyy/yyy.git
git add .
git commit -m 'First commit'
git push -u origin master
git push -u osc master
```
&emsp;&emsp;运行几条命令，我们便可以把同一次提交提交到多个远程库，当然首次push到京东的时候会报冲突错误，这个时候push后面加--force可以搞定 为了方便，我创建了一个push.sh的脚本，内容是：
```javascript
#!/bin/bash
echo 'Push to origin master'
git push origin master
echo 'Push to osc master'
git push osc master
```
这样每次提交，我就可以只运行这个脚本就可以，十分方便。

注：git push -u中的-u参数为第一次提交使用，作用是把本地的master分支和远程的master分支关联起来，简化命令，之后提交不需要这个参数。