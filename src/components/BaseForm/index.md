---
category: Components
subtitle: 基础表单
type: Data Entry
title: BaseForm
---

基础表单组件，对 antd 的表单进行了封装，用配置化的方式生成表单。

## API

### 参数说明 props

- **formItems: object**  
  表单域配置。
  对象键名为域名，键值为对象表示的域配置，对象的配置一般为：

  ```
  {
    type: string,
    label: string,
    defaultValue: any,
    rules: Array,
    options: Array | function, // for type of 'combo', 'checkbox', 'radio'
    onLabel: string,  // for type of 'switcher'
    offLabel: string, // for type of 'switcher'
    render: (decorator: function, form: object) => Component  // for type of 'custom'
  }
  ```

  其中 type 目前支持 'text', 'textarea', 'password', 'combo', 'checkbox', 'radio', 'radioButton', 'switcher', 'timepicker' 以及 'custom' 类型，根据类型的不同又有各种不同的配置。

- **formKeys: Array**  
  需要渲染的表单域。
  可以传入一个域名数组以渲染出单列的表单；
  也可以传入一个对象数组以渲染多列的表单，如下配置可以渲染出一个两列的表单：

  ```
  formKeys = [{
    col: { span: 12 },
    keys: ['name']
  }, {
    col: { span: 12 },
    keys: ['sex']
  }]
  ```

  可以通过 formKeys 参数来实现表单域的显示和隐藏。
  *注意：所有的 keys 必须都要在 formItems 中定义过。*

- formData?: object  
  表单域值。
  *注意：从后台接收的数据可能需要先处理成表单组件可以接收的值。*

- disabledKeys?: Array  
  禁用的表单域。

- getForm?: (form: object) => any  
  获取到该表单的实例。
  表单实例有一些常用的方法，例如表单验证等，具体请参见[antd Form 表单](https://ant.design/components/form-cn/);

- onChange?: (key: string, value: any) => any  
  任一表单域的值发生改变时的回调。


