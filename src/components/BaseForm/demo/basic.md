### 用法示例 demo

- 基本用法  
  
  ```
  const formItems = {
    name: {
      type: 'text',
      label: '姓名',
      rules: [
        required: true, message: '姓名不能为空'
      ]
    },
    gender: {
      type: 'combo',
      label: '性别',
      options: [
        { value: 0, label: '男' },
        { value: 1, label: '女' }
      ]
    }
  };

  const formData = {
    name: 'andy',
    gender: 0
  };

  const formKeys = ['name', 'gender'];
  or 需要展示多列的时候
  const formKeys = [{col:{},keys:['name']},{col:{},keys:['gender']}];

  const Form = (props) => (
    <BaseForm
      formItems={formItems}
      formData={formData}
      formKeys={formKeys}
    />
  );
  ```

- 异步加载的选择框  
  对于需要异步加载的选择项，可以将 options 设置为一个函数并返回一个 Promise 对象。

  ```
  const formItems = {
    key: {
      ...
      options: () => fetch(url, options)
        .then(response => response.json)
        .then(json => Promise.resolve(json.records.map(record => ({
          value: record.value,
          label: record.name
        }))))
    }
  };
  ```

- 自定义表单域  
  如果已有的 type 无法满足需求，则可以使用自定义表单域（type为'custom'）。

  ```
  const formItems = {
    key: {
      ...
      render: (decorator, form) => (
        <Row>
          <Col>
            {decorator({
              ...
            })(
              <Input size="large" disabled />
            )}
          </Col>
        </Row>
      )
    }
  };
  ```

  *注意：当自定义组件中有多个域需要验证时，必须用 Form.FormItem 来包裹每个域。*
