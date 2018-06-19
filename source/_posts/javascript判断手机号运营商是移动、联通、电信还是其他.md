---
title: JavaScript判断手机号运营商是移动、联通、电信还是其他
tags:
  - js判断手机号运营商
id: 1810
categories:
  - JS/Jq
date: 2015-10-07 17:13:58
---

在做WEB项目时，有时候需要根据用户的输入手机号码判断该号的运营商是移动、联通、电信或其他，再根据不同的运营商做出相应的处理，下面介绍js中如何判断手机号的运营商的代码

纯js代码
```javascript
var isChinaMobile = /^134[0-8]\\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\\d{8}$/; //移动方面最新答复 
var isChinaUnion = /^(?:13[0-2]|145|15[56]|176|18[56])\\d{8}$/; //向联通微博确认并未回复 
var isChinaTelcom = /^(?:133|153|177|18[019])\\d{8}$/; //1349号段 电信方面没给出答复，视作不存在 
var isOtherTelphone = /^170([059])\\d{7}$/;//其他运营商
var utils={
checkMobile: function(telphone){
	telphone = this.trim(telphone);
	if(telphone.length !== 11){
		return this.setReturnJson(false, '未检测到正确的手机号码');
	}
	else{
		if(isChinaMobile.test(telphone)){
			return this.setReturnJson(true, '移动', {name: 'ChinaMobile'});
		}
		else if(isChinaUnion.test(telphone)){
			return this.setReturnJson(true, '联通', {name: 'ChinaUnion'});
		}
		else if(isChinaTelcom.test(telphone)){
			return this.setReturnJson(true, '电信', {name: 'ChinaTelcom'});
		}
		else if(isOtherTelphone.test(telphone)){
			var num = isOtherTelphone.exec(telphone);
			return this.setReturnJson(true, '', {name: ''});
		}
		else{
			return this.setReturnJson(false, '未检测到正确的手机号码');
		}
	}
},
setReturnJson: function(status, msg, data){
	if(typeof status !== 'boolean' && typeof status !== 'number'){
		status = false;
	}
	if(typeof msg !== 'string'){
		msg = '';
	}
	return{
		'status': status,
		'msg': msg,
		'data': data
	};
}
}
```
以上代码超简单吧，希望对大家学习js判断手机号运行尚有所帮助。