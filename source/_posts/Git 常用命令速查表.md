---
title: Git常用命令速查表
tags:
  - Git
  - Git常用命令
id: 2654
categories:
  - 前端杂货
date: 2017-10-09 09:24:33
---
本文将对Git 命令，做一下全面而系统的简短总结，整理成简洁、明了的图表结构，方便查询

 

## 一、 Git 常用命令速查

git branch 查看本地所有分支

git status 查看当前状态 

git commit 提交 

git branch -a 查看所有的分支

git branch -r 查看远程所有分支

git commit -am "init" 提交并且加注释 

git remote add origin 
git@192.168.1.119:ndshow

git push origin master 将文件给推到服务器上 

git remote show origin 显示远程库origin里的资源 

git push origin master:develop

git push origin master:hb-dev 将本地库与服务器上的库进行关联 

git checkout --track origin/dev 切换到远程dev分支

git branch -D master develop 删除本地库develop

git checkout -b dev 建立一个新的本地分支dev

git merge origin/dev 将分支dev与当前分支进行合并

git checkout dev 切换到本地dev分支

git remote show 查看远程库

git add .

git rm 文件名(包括路径) 从git中删除指定文件

git clone git://github.com/schacon/grit.git 从服务器上将代码给拉下来

git config --list 看所有用户

git ls-files 看已经被提交的

git rm [file name] 删除一个文件

git commit -a 提交当前repos的所有的改变

git add [file name] 添加一个文件到git index

git commit -v 当你用－v参数的时候可以看commit的差异

git commit -m "This is the message 
describing the commit" 添加commit信息

git commit -a -a是代表add，把所有的change加到git index里然后再commit

git commit -a -v 一般提交命令

git log 看你commit的日志

git diff 查看尚未暂存的更新

git rm a.a 移除文件(从暂存区和工作区中删除)

git rm --cached a.a 移除文件(只从暂存区中删除)

git commit -m "remove" 移除文件(从Git中删除)

git rm -f a.a 强行移除修改后文件(从暂存区和工作区中删除)

git diff --cached 或 $ git diff --staged 查看尚未提交的更新

git stash push 将文件给push到一个临时空间中

git stash pop 将文件从临时空间pop下来

---

git remote add origin 

git@github.com:username/Hello-World.git

git push origin master 将本地项目给提交到服务器中

---

git pull 本地与服务器端同步

---
git push (远程仓库名) (分支名) 将本地分支推送到服务器上去。

git push origin serverfix:awesomebranch

---

git fetch 相当于是从远程获取最新版本到本地，不会自动merge

git commit -a -m "log_message" (-a是提交所有改动，-m是加入log信息) 本地修改同步至服务器端 ：

git branch branch_0.1 master 从主分支master创建branch_0.1分支

git branch -m branch_0.1 branch_1.0 将branch_0.1重命名为branch_1.0

git checkout branch_1.0/master 切换到branch_1.0/master分支

git branch 删除远程branch

git push origin :branch_remote_name

git branch -r -d branch_remote_name

---

初始化版本库，并提交到远程服务器端
>mkdir WebApp

>cd WebApp

>git init	本地初始化

>touch README

>git add README	添加文件

>git commit -m 'first commit'

>git remote add origin git@github.com:daixu/WebApp.git	增加一个远程服务器端

上面的命令会增加URL地址为'git@github.com:daixu/WebApp.git'，名称为origin的远程服务器库，以后提交代码的时候只需要使用 origin别名即可
 
## 二、 Git 命令速查表
### 1、常用的Git命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git add</p></td><td><p align="left">添加至暂存区</p></td></tr><tr><td><p align="left">git add–interactive</p></td><td><p align="left">交互式添加</p></td></tr><tr><td><p align="left">git apply</p></td><td><p align="left">应用补丁</p></td></tr><tr><td><p align="left">git am</p></td><td><p align="left">应用邮件格式补丁</p></td></tr><tr><td><p align="left">git annotate</p></td><td><p align="left">同义词，等同于git blame</p></td></tr><tr><td><p align="left">git archive</p></td><td><p align="left">文件归档打包</p></td></tr><tr><td><p align="left">git bisect</p></td><td><p align="left">二分查找</p></td></tr><tr><td><p align="left">git blame</p></td><td><p align="left">文件逐行追溯</p></td></tr><tr><td><p align="left">git branch</p></td><td><p align="left">分支管理</p></td></tr><tr><td><p align="left">git cat-file</p></td><td><p align="left">版本库对象研究工具</p></td></tr><tr><td><p align="left">git checkout</p></td><td><p align="left">检出到工作区、切换或创建分支</p></td></tr><tr><td><p align="left">git cherry-pick</p></td><td><p align="left">提交拣选</p></td></tr><tr><td><p align="left">git citool</p></td><td><p align="left">图形化提交，相当于git gui&nbsp;命令</p></td></tr><tr><td><p align="left">git clean</p></td><td><p align="left">清除工作区未跟踪文件</p></td></tr><tr><td><p align="left">git clone</p></td><td><p align="left">克隆版本库</p></td></tr><tr><td><p align="left">git commit</p></td><td><p align="left">提交</p></td></tr><tr><td><p align="left">git config</p></td><td><p align="left">查询和修改配置</p></td></tr><tr><td><p align="left">git describe</p></td><td><p align="left">通过里程碑直观地显示提交ID</p></td></tr><tr><td><p align="left">git diff</p></td><td><p align="left">差异比较</p></td></tr><tr><td><p align="left">git difftool</p></td><td><p align="left">调用图形化差异比较工具</p></td></tr><tr><td><p align="left">git fetch</p></td><td><p align="left">获取远程版本库的提交</p></td></tr><tr><td><p align="left">git format-patch</p></td><td><p align="left">创建邮件格式的补丁文件。参见git am&nbsp;命令</p></td></tr><tr><td><p align="left">git grep</p></td><td><p align="left">文件内容搜索定位工具</p></td></tr><tr><td><p align="left">git gui</p></td><td><p align="left">基于Tcl/Tk的图形化工具，侧重提交等操作</p></td></tr><tr><td><p align="left">git help</p></td><td><p align="left">帮助</p></td></tr><tr><td><p align="left">git init</p></td><td><p align="left">版本库初始化</p></td></tr><tr><td><p align="left">git init-db*</p></td><td><p align="left">同义词，等同于git init</p></td></tr><tr><td><p align="left">git log</p></td><td><p align="left">显示提交日志</p></td></tr><tr><td><p align="left">git merge</p></td><td><p align="left">分支合并</p></td></tr><tr><td><p align="left">git mergetool</p></td><td><p align="left">图形化冲突解决</p></td></tr><tr><td><p align="left">git mv</p></td><td><p align="left">重命名</p></td></tr><tr><td><p align="left">git pull</p></td><td><p align="left">拉回远程版本库的提交</p></td></tr><tr><td><p align="left">git push</p></td><td><p align="left">推送至远程版本库</p></td></tr><tr><td><p align="left">git rebase</p></td><td><p align="left">分支变基</p></td></tr><tr><td><p align="left">git rebase–interactive</p></td><td><p align="left">交互式分支变基</p></td></tr><tr><td><p align="left">git reflog</p></td><td><p align="left">分支等引用变更记录管理</p></td></tr><tr><td><p align="left">git remote</p></td><td><p align="left">远程版本库管理</p></td></tr><tr><td><p align="left">git repo-config*</p></td><td><p align="left">同义词，等同于git config</p></td></tr><tr><td><p align="left">git reset</p></td><td><p align="left">重置改变分支“游标”指向</p></td></tr><tr><td><p align="left">git rev-parse</p></td><td><p align="left">将各种引用表示法转换为哈希值等</p></td></tr><tr><td><p align="left">git revert</p></td><td><p align="left">反转提交</p></td></tr><tr><td><p align="left">git rm</p></td><td><p align="left">删除文件</p></td></tr><tr><td><p align="left">git show</p></td><td><p align="left">显示各种类型的对象</p></td></tr><tr><td><p align="left">git stage*</p></td><td><p align="left">同义词，等同于git add</p></td></tr><tr><td><p align="left">git stash</p></td><td><p align="left">保存和恢复进度</p></td></tr><tr><td><p align="left">git status</p></td><td><p align="left">显示工作区文件状态</p></td></tr><tr><td><p align="left">git tag</p></td><td><p align="left">里程碑管理</p></td></tr></tbody></table>

### 2、对象库操作相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git commit-tree</p></td><td><p align="left">从树对象创建提交</p></td></tr><tr><td><p align="left">git hash-object</p></td><td><p align="left">从标准输入或文件计算哈希值或创建对象</p></td></tr><tr><td><p align="left">git ls-files</p></td><td><p align="left">显示工作区和暂存区文件</p></td></tr><tr><td><p align="left">git ls-tree</p></td><td><p align="left">显示树对象包含的文件</p></td></tr><tr><td><p align="left">git mktag</p></td><td><p align="left">读取标准输入创建一个里程碑对象</p></td></tr><tr><td><p align="left">git mktree</p></td><td><p align="left">读取标准输入创建一个树对象</p></td></tr><tr><td><p align="left">git read-tree</p></td><td><p align="left">读取树对象到暂存区</p></td></tr><tr><td><p align="left">git update-index</p></td><td><p align="left">工作区内容注册到暂存区及暂存区管理</p></td></tr><tr><td><p align="left">git unpack-file</p></td><td><p align="left">创建临时文件包含指定blob&nbsp;的内容</p></td></tr><tr><td><p align="left">git write-tree</p></td><td><p align="left">从暂存区创建一个树对象</p></td></tr></tbody></table>

### 3、引用操作相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git check-ref-format</p></td><td><p align="left">检查引用名称是否符合规范</p></td></tr><tr><td><p align="left">git for-each-ref</p></td><td><p align="left">引用迭代器，用于shell编程</p></td></tr><tr><td><p align="left">git ls-remote</p></td><td><p align="left">显示远程版本库的引用</p></td></tr><tr><td><p align="left">git name-rev</p></td><td><p align="left">将提交ID显示为友好名称</p></td></tr><tr><td><p align="left">git peek-remote*</p></td><td><p align="left">过时命令，请使用git ls-remote</p></td></tr><tr><td><p align="left">git rev-list</p></td><td><p align="left">显示版本范围</p></td></tr><tr><td><p align="left">git show-branch</p></td><td><p align="left">显示分支列表及拓扑关系</p></td></tr><tr><td><p align="left">git show-ref</p></td><td><p align="left">显示本地引用</p></td></tr><tr><td><p align="left">git symbolic-ref</p></td><td><p align="left">显示或者设置符号引用</p></td></tr><tr><td><p align="left">git update-ref</p></td><td><p align="left">更新引用的指向</p></td></tr><tr><td><p align="left">git verify-tag</p></td><td><p align="left">校验GPG&nbsp;签名的Tag</p></td></tr></tbody></table>

### 4、版本库管理相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git count-objects</p></td><td><p align="left">显示松散对象的数量和磁盘占用</p></td></tr><tr><td><p align="left">git filter-branch</p></td><td><p align="left">版本库重构</p></td></tr><tr><td><p align="left">git fsck</p></td><td><p align="left">对象库完整性检查</p></td></tr><tr><td><p align="left">git fsck-objects*</p></td><td><p align="left">同义词，等同于git fsck</p></td></tr><tr><td><p align="left">git gc</p></td><td><p align="left">版本库存储优化</p></td></tr><tr><td><p align="left">git index-pack</p></td><td><p align="left">从打包文件创建对应的索引文件</p></td></tr><tr><td><p align="left">git lost-found*</p></td><td><p align="left">过时，请使用git fsck–lost-found&nbsp;命令</p></td></tr><tr><td><p align="left">git pack-objects</p></td><td><p align="left">从标准输入读入对象ID，打包到文件</p></td></tr><tr><td><p align="left">git pack-redundant</p></td><td><p align="left">查找多余的pack&nbsp;文件</p></td></tr><tr><td><p align="left">git pack-refs</p></td><td><p align="left">将引用打包到.git/packed-refs&nbsp;文件中</p></td></tr><tr><td><p align="left">git prune</p></td><td><p align="left">从对象库删除过期对象</p></td></tr><tr><td><p align="left">git prune-packed</p></td><td><p align="left">将已经打包的松散对象删除</p></td></tr><tr><td><p align="left">git relink</p></td><td><p align="left">为本地版本库中相同的对象建立硬连接</p></td></tr><tr><td><p align="left">git repack</p></td><td><p align="left">将版本库未打包的松散对象打包</p></td></tr><tr><td><p align="left">git show-index</p></td><td><p align="left">读取包的索引文件，显示打包文件中的内容</p></td></tr><tr><td><p align="left">git unpack-objects</p></td><td><p align="left">从打包文件释放文件</p></td></tr><tr><td><p align="left">git verify-pack</p></td><td><p align="left">校验对象库打包文件</p></td></tr></tbody></table>

### 5、数据传输相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td colspan=""width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git fetch-pack</p></td><td colspan="2"><p align="left">执行git fetch&nbsp;或git pull命令时在本地执行此命令，用于从其他版本库获取缺失的对象</p></td></tr><tr><td><p align="left">git receive-pack</p></td><td colspan="2"><p align="left">执行git push&nbsp;命令时在远程执行的命令，用于接受推送的数据</p></td></tr><tr><td><p align="left">git send-pack</p></td><td colspan="2"><p align="left">执行git push&nbsp;命令时在本地执行的命令，用于向其他版本库推送数据</p></td></tr><tr><td><p align="left">git upload-archive</p></td><td colspan="2"><p align="left">执行git archive–remote&nbsp;命令基于远程版本库创建归档时，远程版本库执行此命令传送归档</p></td></tr><tr><td><p align="left">git upload-pack</p></td><td colspan="2"><p align="left">执行git fetch&nbsp;或git pull命令时在远程执行此命令，将对象打包、上传</p></td></tr></tbody></table>

### 6、邮件相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git imap-send</p></td><td><p align="left">将补丁通过IMAP&nbsp;发送</p></td></tr><tr><td><p align="left">git mailinfo</p></td><td><p align="left">从邮件导出提交说明和补丁</p></td></tr><tr><td><p align="left">git mailsplit</p></td><td><p align="left">将mbox&nbsp;或Maildir格式邮箱中邮件逐一提取为文件</p></td></tr><tr><td><p align="left">git request-pull</p></td><td><p align="left">创建包含提交间差异和执行PULL操作地址的信息</p></td></tr><tr><td><p align="left">git send-email</p></td><td><p align="left">发送邮件</p></td></tr></tbody></table>

### 7、协议相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git daemon</p></td><td><p align="left">实现Git协议</p></td></tr><tr><td><p align="left">git http-backend</p></td><td><p align="left">实现HTTP协议的CGI程序，支持智能HTTP协议</p></td></tr><tr><td><p align="left">git instaweb</p></td><td><p align="left">即时启动浏览器通过gitweb&nbsp;浏览当前版本库</p></td></tr><tr><td><p align="left">git shell</p></td><td><p align="left">受限制的shell，提供仅执行Git命令的SSH访问</p></td></tr><tr><td><p align="left">git update-server-info</p></td><td><p align="left">更新哑协议需要的辅助文件</p></td></tr><tr><td><p align="left">git http-fetch</p></td><td><p align="left">通过HTTP协议获取版本库</p></td></tr><tr><td><p align="left">git http-push</p></td><td><p align="left">通过HTTP/DAV协议推送</p></td></tr><tr><td><p align="left">git remote-ext</p></td><td><p align="left">由Git命令调用，通过外部命令提供扩展协议支持</p></td></tr><tr><td><p align="left">git remote-fd</p></td><td><p align="left">由Git命令调用，使用文件描述符作为协议接口</p></td></tr><tr><td><p align="left">git remote-ftp</p></td><td><p align="left">由Git命令调用，提供对FTP协议的支持</p></td></tr><tr><td><p align="left">git remote-ftps</p></td><td><p align="left">由Git命令调用，提供对FTPS协议的支持</p></td></tr><tr><td><p align="left">git remote-http</p></td><td><p align="left">由Git命令调用，提供对HTTP协议的支持</p></td></tr><tr><td><p align="left">git remote-https</p></td><td><p align="left">由Git命令调用，提供对HTTPS协议的支持</p></td></tr><tr><td><p align="left">git remote-testgit</p></td><td><p align="left">协议扩展示例脚本</p></td></tr></tbody></table>

### 8、版本库转换和交互相关命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git archimport</p></td><td><p align="left">导入Arch版本库到Git</p></td></tr><tr><td><p align="left">git bundle</p></td><td><p align="left">提交打包和解包，以便在不同版本库间传递</p></td></tr><tr><td><p align="left">git cvsexportcommit</p></td><td><p align="left">将Git的一个提交作为一个CVS检出</p></td></tr><tr><td><p align="left">git cvsimport</p></td><td><p align="left">导入CVS版本库到Git。或者使用cvs2git</p></td></tr><tr><td><p align="left">git cvsserver</p></td><td><p align="left">Git的CVS协议模拟器，可供CVS命令访问Git版本库</p></td></tr><tr><td><p align="left">git fast-export</p></td><td><p align="left">将提交导出为git-fast-import&nbsp;格式</p></td></tr><tr><td><p align="left">git fast-import</p></td><td><p align="left">其他版本库迁移至Git的通用工具</p></td></tr><tr><td><p align="left">git svn</p></td><td><p align="left">Git&nbsp;作为前端操作Subversion</p></td></tr></tbody></table>

### 9、合并相关的辅助命令
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git merge-base</p></td><td><p align="left">供其他脚本调用，找到两个或多个提交最近的共同祖先</p></td></tr><tr><td><p align="left">git merge-file</p></td><td><p align="left">针对文件的两个不同版本执行三向文件合并</p></td></tr><tr><td><p align="left">git merge-index</p></td><td><p align="left">对index中的冲突文件调用指定的冲突解决工具</p></td></tr><tr><td><p align="left">git merge-octopus</p></td><td><p align="left">合并两个以上分支。参见git merge&nbsp;的octopus合并策略</p></td></tr><tr><td><p align="left">git merge-one-file</p></td><td><p align="left">由git merge-index&nbsp;调用的标准辅助程序</p></td></tr><tr><td><p align="left">git merge-ours</p></td><td><p align="left">合并使用本地版本，抛弃他人版本。参见git merge&nbsp;的ours合并策略</p></td></tr><tr><td><p align="left">git merge-recursive</p></td><td><p align="left">针对两个分支的三向合并。参见git merge&nbsp;的recursive合并策略</p></td></tr><tr><td><p align="left">git merge-resolve</p></td><td><p align="left">针对两个分支的三向合并。参见git merge&nbsp;的resolve合并策略</p></td></tr><tr><td><p align="left">git merge-subtree</p></td><td><p align="left">子树合并。参见git merge&nbsp;的subtree合并策略</p></td></tr><tr><td><p align="left">git merge-tree</p></td><td><p align="left">显式三向合并结果，不改变暂存区</p></td></tr><tr><td><p align="left">git fmt-merge-msg</p></td><td><p align="left">供执行合并操作的脚本调用，用于创建一个合并提交说明</p></td></tr><tr><td><p align="left">git rerere</p></td><td><p align="left">重用所记录的冲突解决方案</p></td></tr></tbody></table>

### 10、 杂项
<table style="width: 700px"border="1"cellspacing="0"cellpadding="5"><thead><tr><td width="200"><p align="left"><strong>命令</strong></p></td><td><p align="left"><strong>简要说明</strong></p></td></tr></thead><tbody><tr><td><p align="left">git bisect–helper</p></td><td><p align="left">由git bisect&nbsp;命令调用，确认二分查找进度</p></td></tr><tr><td><p align="left">git check-attr</p></td><td><p align="left">显示某个文件是否设置了某个属性</p></td></tr><tr><td><p align="left">git checkout-index</p></td><td><p align="left">从暂存区拷贝文件至工作区</p></td></tr><tr><td><p align="left">git cherry</p></td><td><p align="left">查找没有合并到上游的提交</p></td></tr><tr><td><p align="left">git diff-files</p></td><td><p align="left">比较暂存区和工作区，相当于git diff–raw</p></td></tr><tr><td><p align="left">git diff-index</p></td><td><p align="left">比较暂存区和版本库，相当于git diff–cached–raw</p></td></tr><tr><td><p align="left">git diff-tree</p></td><td><p align="left">比较两个树对象，相当于git diff–raw A B</p></td></tr><tr><td><p align="left">git difftool–helper</p></td><td><p align="left">由git difftool&nbsp;命令调用，默认要使用的差异比较工具</p></td></tr><tr><td><p align="left">git get-tar-commit-id</p></td><td><p align="left">从git archive&nbsp;创建的tar包中提取提交ID</p></td></tr><tr><td><p align="left">git gui–askpass</p></td><td><p align="left">命令git gui&nbsp;的获取用户口令输入界面</p></td></tr><tr><td><p align="left">git notes</p></td><td><p align="left">提交评论管理</p></td></tr><tr><td><p align="left">git patch-id</p></td><td><p align="left">补丁过滤行号和空白字符后生成补丁唯一ID</p></td></tr><tr><td><p align="left">git quiltimport</p></td><td><p align="left">将Quilt补丁列表应用到当前分支</p></td></tr><tr><td><p align="left">git replace</p></td><td><p align="left">提交替换</p></td></tr><tr><td><p align="left">git shortlog</p></td><td><p align="left">对git log&nbsp;的汇总输出，适合于产品发布说明</p></td></tr><tr><td><p align="left">git stripspace</p></td><td><p align="left">删除空行，供其他脚本调用</p></td></tr><tr><td><p align="left">git submodule</p></td><td><p align="left">子模组管理</p></td></tr><tr><td><p align="left">git tar-tree</p></td><td><p align="left">过时命令，请使用git archive</p></td></tr><tr><td><p align="left">git var</p></td><td><p align="left">显示Git&nbsp;环境变量</p></td></tr><tr><td><p align="left">git web–browse</p></td><td><p align="left">启动浏览器以查看目录或文件</p></td></tr><tr><td><p align="left">git whatchanged</p></td><td><p align="left">显示提交历史及每次提交的改动</p></td></tr><tr><td><p align="left">git-mergetool–lib</p></td><td><p align="left">包含于其他脚本中，提供合并/差异比较工具的选择和执行</p></td></tr><tr><td><p align="left">git-parse-remote</p></td><td><p align="left">包含于其他脚本中，提供操作远程版本库的函数</p></td></tr><tr><td><p align="left">git-sh-setup</p></td><td><p align="left">包含于其他脚本中，提供shell&nbsp;编程的函数库</p></td></tr></tbody></table>