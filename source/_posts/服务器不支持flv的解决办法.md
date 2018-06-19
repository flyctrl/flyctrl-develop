---
title: 服务器不支持FLV的解决办法
tags:
  - 服务器flv
id: 209
categories:
  - 前端杂货
date: 2015-07-12 21:56:13
---

&emsp;&emsp;随着各大视频提供商对视频网站的投入，FLV文件开始越来越多的出现在我们的身边，闲暇之余，自己也想在服务器上提供一些简单的FLV视频文件，结果发现无法播放。
打开IIS，然后在mypc(本地计算机)上面点击右键属性（很多帮助文件都没有说这一点，很多人以为是在站点上面点击右键，却发现找不到MIME类型，其中mypc是你的计算机名）如图所示：

[![a](http://www.npm8.com/wp-content/uploads/2015/07/a.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/a.jpg)
然后点击“MIME类型”，接着点击新建加入关联扩展名：.flv，内容类型：flv-application/octet-stream　如图所示：

[![b](http://www.npm8.com/wp-content/uploads/2015/07/b.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/b.jpg)

&emsp;&emsp;确定以后，服务器就可以支持FLV视频播放了，如果依然不可以的话，可以尝试重新启动
IIS！
**FLV**文件介绍FLV视频文件其实是Flash视频，也就是 Flash Video我们都知道一般的视频文件，如asf、wmv格式使用mediaplayer进行播放，再如rm格式需要使用RealPlayer播放。 

&emsp;&emsp;这样的问题是格式的不同就需要选择不同的播放器，这对于本地计算机没有安装相应播放器的用户来说，这些视频根本无法收看，并且由于这些文件的容量过大，下载慢，观看也很不流畅。

&emsp;&emsp;所以，解决播放器和容量的问题：将各类视频文件转换成Flash视频文件。

&emsp;&emsp;播放器有嵌入在浏览器中的Flash播放器，解决了其它一般视频文件需要挑选播放器的问题，当然这也就是Flash的优势。容量方面，从 FlashMX2004起就支持了转换为Flash视频的功能，经过相关设置后，可缩小原有视频的容量，最终转换的文件扩展名是 FLV。

&emsp;&emsp;另外提供一个小技巧：如果不能在计算机中添加“MIME类型”，可以吧FLV的后缀名改为SWF，这样也可以！

**附：服务器不支持FLV的解决办法**

&emsp;&emsp;在处理FLV文件时，您可能需要配置服务器以便于处理FLV文件格式。多用途Internet邮件扩展(MIME)是标准的数据规范，允许您通过Internet 连接发送非 ASCII文件。

&emsp;&emsp;Web浏览器和电子邮件客户端经过配置，可以解释多种MIME类型，因此它们可以发送和接收视频、音频、图形和格式化文本。若要从Web 服务器加载FLV文件，则可能需要向您的Web服务器注册文件扩展名和MIME类型，因此应当检查您的Web服务器文档。FLV文件的MIME类型是video/x-flv。

下面列出FLV文件类型的完整信息：Mime 类型： 

video/x-flv
文件扩展名：.flv

必需的参数：无

可选的参数：无

编码注意事项：FLV文件是二进制文件；有些应用程序可能需要设置应用程序八位字节流子类型。

安全问题：无

&emsp;&emsp;已发布的规范：www.macromedia.com/go/flashfileformat。 Microsoft更改了在 Microsoft Internet 信息服务(IIS) 6.0 Web服务器中处理流媒体的方式，不再采用早期版本中的处理方式。早期版本的IIS不需要对 Flash 视频流做任何修改。在 Windows 2003附带的默认Web服务器、 IIS 6.0中，服务器需要借助MIME 类型来确认 FLV 文件为流媒体。

&emsp;&emsp;当采用流式媒体的方式加载外部 FLV 文件的 SWF文件被置于 Microsoft Windows 2003服务器上，并在浏览器中查看时，可以正确播放 SWF文件，但FLV视频却不能采用流式媒体的方式加载。这个问题会影响到放置在 Windows 2003服务器上的所有 FLV文件，包括用早期版本的Flash创作工具 (Macromedia Flash Video Kit for Dreamweaver MX 2004)制作的那些文件。如果在其它操作系统上对这些文件进行测试，则这些文件可以正常工作。

&emsp;&emsp;有关配置 Microsoft Windows 2003 和 Microsoft IISServer 6.0 以采用流式媒体的方式加载 FLV 视频的信息，请访问[www.macromedia.com/go/tn_19439](http://www.macromedia.com/go/tn_19439)。 今天遇到一个难题，用FLASH8制作的FLV格式文件上传服务器后不能播放，原以为是路径错了，或者太大，检查过后不是，因为国内大多都是Win2003的主机.默认是没有指定输出FLV这种格式的虽然FTP里面可以看见,但无法通过http访问,也就无法播放了.

&emsp;&emsp;[原因：WIN2003加强了IIS6的MIME验证，一切未注册扩展文件格式统统显示404错误。手动在IIS中HTTP头->MIME添加MIME影射关系，MIME类型: video/x-flv 扩展名:.flv，即可通过Flash7+客户端Load进来播放]

&emsp;&emsp;[办法解决“虚拟主机都不支持Flv格式文件”的问题：比如你的Flv文件名称是a.flv,在虚拟主机上建一个名为“a.flv”的目录，在此目录下放你的Flv格式文件，将其改名为：index.htm ,这样就行了，播放器中的文件名保持原样不动