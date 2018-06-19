---
title: JQUERY 只能投票一次（根据cookies判断）
tags:
  - cookies只能投票一次
  - jq只能投票一次
id: 1384
categories:
  - JS/Jq
date: 2015-08-27 23:02:41
---

根据cookie来判断，只能投票一次，下面贴上代码：

```html
<html>
<head>
<title>test</title>

<script type="text/javascript" src="jquery-132min2.js" ></script>
<script type="text/javascript" src="Jquery-cookie.js" ></script>

<script type="text/javascript">
document.oncontextmenu = function() {
  return false;
}
$(document).ready(function() {
  if (document.cookie & amp; & amp; document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      var id = cookie.substring(cookie.indexOf('=') + 1);
      $("#vote-up-" + id).attr("disabled", "disabled");
      $("#vote-dn-" + id).attr("disabled", "disabled");
    }
  }
});

function votes(id, num) {
  var cookieName = $.cookie('isClick' + id);
  if (cookieName == id) return;
  var posscore = parseInt($('#up-' + id).text()),
    negscore = parseInt($('#dn-' + id).text()),
    d = (num > 0 ? 'up' : 'dn');
  num > 0 ? posscore++ : negscore--;
  var val = 0;
  if (num > 0)
    val = posscore;
  else
    val = negscore;
  $("#" + d + "-" + id).html(val);
  showAnimation(d + '-' + id, num);
  // $("#vote-up-"+id).removeClass("");
  // $("#vote-up-"+id).addClass("");
  // $("#vote-dn-"+id).removeClass("");
  // $("#vote-dn-"+id).addClass("");
  $("#vote-up-" + id).attr("disabled", "disabled");
  $("#vote-dn-" + id).attr("disabled", "disabled");
  $.cookie('isClick' + id, id);
}

function showAnimation(containerId, actionValue) {
  var obj = $('#' + containerId),
    pos = obj.offset(),
    ani = $('<div id="vote-ani" style="font-size:24px;z-index:1000;">' + (actionValue > 0 ? "+1" : "-1") + "</div>");
  ani.appendTo('body');
  $("#vote-ani").css({
    top: pos.top + 10,
    left: pos.left + 10,
    display: 'block',
    position: 'absolute'
  });
  $("#vote-ani").animate({
    opacity: 0,
    left: "-=10px",
    top: "-=10px"
  }, 500, 'linear', function() {
    ani.remove()
  });
}

</script>

</head>
<body>
<div class="bar clearfix" id="qiushi_counts_4283026">
<div class="up" id="vote-up-4282280">
<a href="javascript:votes(4282280,1)" id="up-4282280">1574 </a>
</div>
<div class="down" id="vote-dn-4282280">
<a href="javascript:votes(4282280,-1)" id="dn-4282280">-55 </a>
</div>
</div><br />
<div class="bar clearfix" id="Div1">
<div class="up" id="vote-up-4282281">
<a href="javascript:votes(4282281,1)" id="up-4282281">11 </a>
</div>
<div class="down" id="vote-dn-4282281">
<a href="javascript:votes(4282281,-1)" id="dn-4282281">-11 </a>
</div>
</div>
</body>
</html>
```
&nbsp;