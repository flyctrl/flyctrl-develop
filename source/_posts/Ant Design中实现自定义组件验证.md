---
title: Ant Design中实现自定义组件验证
tags:
  - Ant Design
  - Ant Design自定义组件验证
id: 2658
categories:
  - Reactjs
date: 2017-10-27 15:25:23
---

ant.design是蚂蚁金服前端团队开发出来的一个基于React的框架，有比较丰富的组件可供使用。在实际开发中，一个常见任务是表单验证。ant.design自身的Input, Upload等组件已经自带了ant.design的form验证，但我们自己开发的组件很多同学不清楚怎么实现，所以还借助了jquery等来取值或直接取dom值，然后自己写验证，这种方式可以实现，但往往体验不是一致。今天要给大家介绍一招即可实现自定义组件的表单验证。

直接撸代码
```javascript
class MyTag extends React.Component {
    constructor(){
        super();
        this.state = {
            tags: [],
            adding: false
        }
    };

    addTag = () => {
        let tag = this.refs.tag.refs.input.value.trim();
        if(tag == ''){
            message.error("标签不能为空");
        }
        if(tag.length>16){
            message.error("长度不能大于16");
        }
        const tags = [...this.state.tags, { name: tag }];
        this.setState({ tags: tags, adding: false });
        this.props.onChange(tags);//只用加这行
    };

    add = ()=>{
        this.setState({adding: true});
    };

    cancel = ()=>{
        this.setState({adding: false});
    };

    render() {
        return (
            <div>
                <div>
                    {this.state.tags.map((tag,i) =>
                        <Tag key={i} closable={true}>
                            {tag.name}
                        </Tag>
                    )}
                </div>
                {this.state.add?
                    <InputGroup size="large">
                        <Col span="8">
                            <Input type="text" ref="tag" />
                        </Col>
                        <Col span="8">
                            <Button onClick={this.addTag}>添加</Button> <Button onClick={this.cancel}>取消</Button>
                        </Col>
                    </InputGroup> :
                    <Button onClick={this.add}>添加</Button>
                }
            </div>
        );
    }
}
```
上面代码有很多,其中最关键的是在addTag方法中调用了this.props.onChange()方法，这个方法是组件经过getFieldDecorator包装后就会有的一个方法。所以实际的验证代码如下：
```javascript
<FormItem
    label="标签"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 14 }}>
    {getFieldDecorator('tags', {
        rules: [ { required: true, message: '必填', type:'array'}],})(
            <MyTag  tags={[]}/>
    )}
</FormItem>
```
在这里MyTag的使用和Input的在验证方式上没什么不同，这里面就是一个必填验证。所以实现验证原理上很简单，就是那么一行代码！只要在改变数据的时候回调onChange即可实现！

以上使用this.props.onChange成功使用上了ant.design的系统验证方式，但是以required验证来举例。进一步想，如果要实现验证tag，除了在保存的时候主动验证之外，还有其它方式来实现吗？其实ant.design内部使用了async-validator，通过阅读async-validator的文档，了解到每个rule其实都是可以定制validator。

validator是个函数，其中有三个参数很重要：rule,value和callback。

* rule：这个是规则，可以不用
* value：这个是要验证的值
* callback：这个是回调函数，验证出错后可以把错误信息作为参数调用callback

理解了这三个参数后，就很容易写一个定制的validator，最后我们的代码是这样的：
```javascript
<FormItem
    label="标签"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 14 }}>
    {getFieldDecorator('tags', {
        rules: [{
            required: true,
            type:'array',
            message:'必填',
        },{
            validator(rule, values, callback){
                if(values && values.length>0){
                    values.map((value,i)=>{
                        if(value.name.length > 16 ){
                            callback(`第${i+1}个标签超过16个字符`);
                        }else if(value.name.length == 0){    
                            callback(`第${i+1}个标签不能为空`);
                        }else{    
                            callback();
                        }
                    });
                }else{
                    callback();
                }
            }
        }],
    })(
        <MyTag />
    )}
</FormItem>
```
至此可以删除addTag中的验证代码了