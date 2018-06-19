---
title: javascript 常用DOM操作整理
tags:
  - javascript常用DOM操作
  - js常用DOM操作
id: 2512
categories:
  - JS/Jq
date: 2016-10-08 10:57:52
---

1.抽取了DOM操作中常用的部分

2.DOM属性和方法的对象归属可能并不完全准确

3.某些兼容性和特点做了标识(绝大部分的兼容性是ie8~9上下)

## 节点类型

| 节点类型 | 节点值 |
| --- | --- |
| 标签节点(Element) | 1 |
| 属性节点(Attr) | 2 |
| 文本节点(Text) | 3 |
| CDATA节点(CDATASetion) | 4 |
| 实体引用节点(EntityReference) | 5 |
| 实体节点(Entity) | 6 |
| 处理指令节点(ProcessingInstruction) | 7 |
| 注释节点(Comment) | 8 |
| 文档节点(Document) | 9 |
| 文档类型节点(DocumentType) | 10 |
| 文档片段节点(DocumentFragment) | 11 |
| DTD声明节点(Notation) | 12 |

## Node类型

| 属性 | 说明 |
| --- | --- |
| nodeType | 节点类型 |
| nodeName | 节点名 |
| nodeValue | 节点值 |
| childNodes | 子节点 |
| parentNode | 父节点 |
| ownerDocument | 文档节点 |
| previousSibling | 上一个节点 |
| nextSibling | 下一个节点 |
| firstChild | 第一个子节点 |
| lastChild | 最后一个子节点 |

## Document类型

| 属性 | 说明 |
| --- | --- |
| documentElement | html标签 |
| head [兼容性不够] | head标签 |
| body | body标签 |
| URL | 当前页url |
| referrer | 来源页url |
| domain [可修改] | 页面域名 |
| images | 所有图片集合 |
| cookie | cookie信息 |
| title | 页面标题 |
| activeElement | 当前焦点元素 |
| documentMode | 文档模式 |
| readyState | 文档状态 |
| doctype | 文档类型声明 |
| scripts | 脚本集合 |
| forms | form标签集合 |
| children | 元素类型的子节点集合 |
| defaultView | document关联的window对象 |

| 方法 | 说明 |
| --- | --- |
| getElementById() | 返回对应id的元素 |
| getElementsByName() | 返回对应名称元素集合 |
| getElementsByTagName() | 返回对应标签名元素集合 |
| getElementsByClassName() | 返回指定类名的元素集合 |
| querySelector() | 返回符合选择器的第一个元素 |
| querySelectorAll() | 返回符合选择器的元素集合 |
| createElement() | 创建元素节点 |
| createTextNode() | 创建文本节点 |
| createAttribute() | 创建属性节点 |
| createComment() | 创建注释节点 |
| createDocumentFragment() | 创建空的 DocumentFragment 对象 |
| matchesSelector()**[兼容性不够，需要前缀]** | 该选择器是否符合元素匹配 |
| write()**[输出后光标不换行]** | 文档文本写入 |
| writeIn()**[输出后光标换行]** | 文档文本写入 |
| implementation.hasFeature(特性,版本) | 特性监测 |

## Element类型

| 属性 | 说明 |
| --- | --- |
| id | id |
| className | 类名 |
| title | 标题 |
| style | 设置或返回元素的样式属性 |
| innerHTML | 设置或者返回元素的内容 |
| outerHTML**[包含自身]** | 设置或者返回元素的内容 |
| textContent**[ie-innerText]** | 设置或返回文本内容 |
| contentEditable | 设置或返回元素的可编辑状态 |
| isContentEditable | 是否可编辑 |
| childElementCount | 子元素节点个数 |
| firstElementChild | 第一个元素节点 |
| lastElementChild | 最后一个元素节点 |
| previousElementSibling | 上一个元素节点 |
| nextElementSibling | 下一个元素节点 |

| 方法 | 说明 | 返回 |
| --- | --- | --- |
| focus() | 设置焦点 |  |
| blur() | 失去焦点 |  |
| appendChild(节点) | 在子节点列表之后插入 | 新增节点 |
| insertBefore(节点,参照节点) | 在参照节点之前插入节点 | 插入节点 |
| removeChild(节点) | 节点删除 | 被删节点 |
| replaceChild(节点,被替换的节点) | 节点替换 | 被替换节点 |
| cloneNode(布尔值) | 复制节点 | 克隆节点 |
| importNode(节点,布尔值) | 从A文档中取得a节点，将其导入B文档(类似cloneNode方法) |  |
| contains(节点) | 该节点是否为调用节点的子级 | 布尔值 |
| hasFocus() | 是否获得了焦点 | 布尔值 |
| hasChildNodes() | 是否存在子节点 | 布尔值 |
| isDefaultNamespace(url) | 是否指定了名称空间 | 布尔值 |
| isEqualNode(节点) | 两个元素是否相等 | 布尔值 |
| isSupported(特性，版本) | 是否支持某特性 | 布尔值 |

## Attr类型

| 属性 | 说明 |
| --- | --- |
| name | 属性名 |
| value | 属性值 |
| isId | 是否为id类型 |
| specified | 属性是否被指定 |
| length | 属性长度 |
| attributes | 属性集合 |

| 方法 | 说明 |
| --- | --- |
| getAttribute() | 获取属性值 |
| getAttributeNode() | 获取属性节点 |
| setAttribute() | 设置属性值 |
| setAttributeNode() | 设置属性节点 |
| removeAttribute() | 删除属性 |
| removeAttributeNode()**[ie不支持]** | 删除属性节点 |
| hasAttribute() | 是否存在指定的属性 |
| hasAttributes() | 是否存在属性 |

## Text类型

| 方法 | 说明 |
| --- | --- |
| appendData(文本) | 将text添加到节点的末尾 |
| deleteData(位置,数量) | 从指定位置开始删除n个字符 |
| insertData(位置,文本) | 从指定位置插入文本 |
| replaceData(位置,数量,文本) | 用text替换从offset位置开始到offset+count为止处的文本 |
| splitText(位置) | 从指定位置将当前文本节点分裂成两个文本节点 |
| substringData(位置,数量) | 截取从offset位置开始到offset+count为止处的字符串 |
| normalize() | 合并相邻文本节点，并删除空的文本节点 |

# 表格操作

## table元素

元素，将其放到表格中，返回引用 元素，将其放到表格中，返回引用

| 属性方法 | 说明 |
| --- | --- |
| caption | caption元素指针 |
| tBodies | tbody集合 |
| tFoot | tfoot集合 |
| tHead | thead元素 |
| rows | 表格所有行集合 |
| createTHead() | 创建 |
| createTFoot() | 创建 |
| --- | --- |
| createCaption() | 创建caption元素，将其放到表格中，返回引用 |
| deleteTHead() | 删除thead元素 |
| deleteTFoot() | 删除tfoot元素 |
| deleteCaption() | 删除caption元素 |
| deleteRow(pos) | 删除指定位置的行 |
| insertRow(pos) | 向行集合中的指定位置插入一行 |

## tbody元素

| 属性方法 | 说明 |
| --- | --- |
| rows | tbody所有行集合 |
| deleteRow(pos) | 删除指定位置的行 |
| insertRow(pos) | 向行集合中的指定位置插入一行，返回引用 |

## tr元素

| 属性方法 | 说明 |
| --- | --- |
| cells | tr所有单元格集合 |
| deleteCell(pos) | 删除指定位置的单元格 |
| insertCell(pos) | 向单元格集合中的指定位置插入一个单元格，返回引用 |

# 样式操作

## 访问元素样式

*   DOM样式——js通过dom.style只能访问直接样式属性，不能访问嵌入样式表和外部样式表

| 属性方法(dom.style) | 说明 |
| --- | --- |
| cssText | 返回style特性中所有样式的字符串形式 |
| length | 返回元素中CSS属性数量 |
| parentRule | 返回CSS信息的CSSRule对象 |
| getPropertyCSSValue(name) | 返回属性值的CSSValue对象(包含cssText和cssValueType) |
| getPropertyPriority(name) | 是否使用了!important属性 |
| getPropertyValue(name) | 返回给定属性的字符串值 |
| removeProperty(name) | 从样式中删除给定属性 |
| setProperty(name,value,优先级) | 将给定属性设置为相应的值并加上优先级 |

*   计算样式——样式层叠后实际起用的样式

| 属性方法 | 说明 |
| --- | --- |
| document.defaultView.getComputedStyle(dom,伪元素字符串)**[ie不支持]** | 返回当前元素所有计算后的样式 |
| dom.currentStyle **[ie支持]** | 返回当前元素所有计算后的样式 |

## 操作样式表

*   document.styleSheets——应用于文档的所有样式表

| 属性(document.styleSheet) | 说明 |
| --- | --- |
| cssRules**[ie不支持]** | 单个样式表中的所有样式规则 |
| rules**[ie支持]** | 单个样式表中的所有样式规则 |

*   document.styleSheets[n].cssRules/rules下

| 属性 | 说明 |
| --- | --- |
| cssText**[ie不支持]** | 整条样式规则的字符串 |
| selectorText | 样式选择符 |
| style | 具体样式对象 |

## 大小和偏移

| 属性 | 说明 |
| --- | --- |
| offsetParent | 偏移的父容器 |
| getBoundingClientRect() | 获取页面元素实际位置和宽高(返回属性对象） |
| offsetWidth | 元素宽度(可视内容区+滚动条+内边距+边框) |
| offsetHeight | 元素高度(可视内容区+滚动条+内边距+边框) |
| offsetLeft | 与相邻父级的左距离 |
| offsetTop | 与相邻父级的上距离 |
| clientWidth | 元素宽度 **(可视内容区+内边距)** |
| clientHeight | 元素高度 **(可视内容区+内边距)** |
| clientLeft | 内边距边缘与边框边缘的距离 **(左边框)** |
| clientTop | 内边距边缘与边框边缘的距离 **(上边框)** |
| scrollWidth | 元素宽度 **(可视内容区+滚动内容区+内边距)** |
| scrollHeight | 元素高度 **(可视内容区+滚动内容区+内边距)** |
| scrollLeft | 隐藏的滚动宽度 **(待滚动宽度)** |
| scrollTop | 隐藏的滚动高度 **(待滚动宽度)** |

## 兼容性

clientWidth/clientHeight和scrollWidth/scrollHeight存在游览器差异
