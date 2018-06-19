---
title: ajax请求且带返回值的代码实例
tags:
  - ajax 返回值
id: 1606
categories:
  - JS/Jq
date: 2015-09-13 21:26:47
---

经常使用jquery的ajax来实现一些无刷新请求效果，本次提供一个非常简单的代码实例供大家参考之用，希望能够给需要的朋友带来一定的帮助，代码如下:
```javascript
<script type="text/javascript">
/* 请求Ajax 带返回值，并弹出提示框提醒*/
function getAjax(url,parm,callBack)
{
$.ajax({
type:'post',
dataType:"text",
url:url,
data:parm,
cache:false,
async:false,
success:function (msg) {
callBack(msg);
}
})
}
/*删除*/
/*url: 表示请求路径*/
function DeleteData(url,id)
{
var parm='active=Del&amp;id='+id;
if(id==undefined||id=="")
{
showAlertMsg('请选择要删除一行');
}
else
{
showConfirmMsg("此操作不可恢复，确定要删除吗？",function(r){
if(r)
{
getAjax(url,parm,function(rs)
{
if(parseInt(rs)>0)
{
showOverAlertMsg("删除成功！",2000,4);
}
else if(parseInt(rs) == 0)
{
showOverAlertMsg("该数据被关联,无法删除！",2000,3);
}
else
{
showOverAlertMsg("删除失败！", 2000, 5);
}
})
}
})
}
}
//删除
function DeleteOnclick()
{
DeleteData('SysMenu_List.aspx', Menu_Id);
}
</script>
```
以上代码实现了标题中所说的功能，代码非常的简单，这里就不多介绍了。
&nbsp;