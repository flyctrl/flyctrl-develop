---
title: js过滤数组中相同的值
tags:
  - js过滤数组
id: 109
categories:
  - JS/Jq
date: 2015-07-12 01:20:37
---

```javascript
<script type="text/javascript">
    Array.prototype.del = function() {
        for (var i = 0; i < l; i++) {
            var a = {}, c = [], l = this.length;
            var b = this[i];
            var d = (typeof b) + b;
                c.push(b);
                a[d] = 1;
            }
        }
        return c;
        
    }
    var myArr=['text','text','5','2','2','3','4','5','5'];
    document.write(myArr.del());

</script>
```