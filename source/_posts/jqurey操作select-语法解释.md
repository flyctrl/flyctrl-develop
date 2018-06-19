---
title: jqurey操作select 语法解释
tags:
  - select语法
id: 287
categories:
  - JS/Jq
date: 2015-07-13 14:57:13
---

jQuery获取Select选择的Text和Value:

语法解释：

1\. $("#selectId").change(function(){ ... }); //为Select添加事件，当选择其中一项时触发

2\. var checkText=$("#selectId").find("option:selected").text(); //获取Select选择的Text

3\. var checkValue=$("#selectId").val(); //获取Select选择的Value

4\. var checkIndex=$("#selectId ").get(0).selectedIndex; //获取Select选择的索引值

5\. var maxIndex=$("#selectId option:last").attr("index"); //获取Select最大的索引值

jQuery设置Select选择的 Text和Value:

语法解释：

1\. $("#selectId ").get(0).selectedIndex=1; //设置Select索引值为1的项选中

2\. $("#selectId ").val(4); // 设置Select的Value值为4的项选中

3\. $("#selectId option[text=jQuery]").attr("selected", true); //设置Select的Text值为jQuery的项选中

jQuery添加/删除Select的Option项：

语法解释：

1\. $("#selectId").append("<option value='Value'>Text</option>"); //为Select追加一个Option(下拉项)

2\. $("#selectId").prepend("<option value='0'>请选择</option>"); //为Select插入一个Option(第一个位置)

3\. $("#selectId option:last").remove(); //删除Select中索引值最大Option(最后一个)

4\. $("#selectId option[index='0']").remove(); //删除Select中索引值为0的Option(第一个)

5\. $("#selectId option[value='1']").remove(); //删除Select中Value='1'的Option

6\. $("#selectId option[text='2']").remove(); //删除Select中Text='2'的Option
