import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Form, Row, Col, Button, Input, Select, Checkbox, Radio,
  Switch, DatePicker, InputNumber, Cascader
} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { Button: RadioButton, Group: RadioGroup } = Radio;
const { MonthPicker, RangePicker } = DatePicker;

const getUUID = (() => {
  let uuid = 0;
  return () => uuid++;
})();

// function getValueFromEvent(evt) {
//   if (!evt || !evt.target) {
//     return evt;
//   }
//   const { target = {} } = evt;
//   return target.type === 'checkbox' ? target.checked : target.value;
// }

@Form.create({
  onValuesChange(props, values) {
    props.onChange(values);
  },
})
export default class BaseForm extends PureComponent {
  static defaultProps = {
    layout: 'horizontal',
    formKeys: [],
    formData: {},
    formItems: {},
    disabledKeys: [],
    getForm: () => {},
    getRefs: () => {},
    onChange: () => {},
  };
  static propTypes = {
    layout: PropTypes.string,
    formKeys: PropTypes.array,
    formData: PropTypes.object,
    formItems: PropTypes.object,
    disabledKeys: PropTypes.array,
    getForm: PropTypes.func,
    getRefs: PropTypes.func,
    onChange: PropTypes.func,
  };
  state = {

  };
  formRefs = {

  };
  componentDidMount() {
    const { getForm, getRefs, form } = this.props;
    getForm(form);
    getRefs(this.formRefs);
    this.initFormChange();
  }

  componentWillUnmount() {
    this.props.form.resetFields();
  }

  initFormChange() {
    const formData = this.props.form.getFieldsValue();
    const formKeys = Object.keys(formData);
    formKeys.forEach(key => this.handleChange(key, formData[key]));
  }

  handleChange = (key, value) => {
    const { onChange } = this.props;
    let values = {};
    values[key] = value;
    onChange(values);
  }

  decorateFormField(key, options, itemCfg = {}) {
    const { formData, disabledKeys } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { disabled = false, placeholder = '', rules = [] } = itemCfg;
    const isDisabled = disabled === true || disabledKeys.indexOf(key) > -1;
    const _rules = rules.map(rule => {
      if (rule.validator) {
        //矫正validator函数的this
        return { ...rule, validator: rule.validator.bind(this) };
      }
      return rule;
    });
    return formElement => getFieldDecorator(key, {
      rules: _rules,
      initialValue: formData[key] === undefined ? itemCfg.defaultValue : formData[key],
      // 表单的每个域改变的时候如果本域没有value(eg:checkbox),通过getValueFromEvent获取value,
      // onChange: (...args) => {
      //   const value = options.getValueFromEvent
      //     ? options.getValueFromEvent(...args)
      //     : getValueFromEvent(...args);
      //   this.handleChange(key, value);
      // },
      validateTrigger: 'onBlur',
      ...options
    })(React.cloneElement(formElement, {
      disabled: formElement.props.disabled || isDisabled,
      placeholder: formElement.props.placeholder || placeholder,
      ref: (ref) => this.formRefs[key] = ref,
      ...itemCfg.props,
    }));
  }

  getOptions(key, options) {
    if (typeof options === 'function') {
      if (this.state[key]) return this.state[key];
      options().then(options => this.setState({
        [key]: options
      }));
      return [];
    }
    return options || [];
  }

  mapFormItems(keys){
    const { form, formItems } = this.props;
    return keys.map((key, idx) => {
      const item = formItems[key];
      const { type } = item;
      const formItemLayout = {
        labelCol: item.labelCol || { span: 8 },
        wrapperCol: item.wrapperCol || { span: 16 }
      };
      let children = null;
      switch (type) {
        case 'text':
        case 'textarea':
        case 'password':
          children = this.decorateFormField(key, {}, item)(
            <Input type={type} />
          );
          break;
        case 'number':
            children = this.decorateFormField(key, {}, item)(
              <InputNumber
                min={item.min}
                max={item.max}
                step={item.step}
              />
            );
            break;
        case 'combo':
          const comboClassName = `${key}_${getUUID()}`;
          children = this.decorateFormField(key, {}, {
            ...item,
            props: {
              className: comboClassName,
              getPopupContainer: () => document.querySelector(`.${comboClassName}`),
              ...item.props
            }
          })(
            <Select
              multiple={item.multiple}
            >
              {this.getOptions(key, item.options).map((option, idx) => (
                <Option key={idx} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          );
          break;
        case 'checkbox':
          children = this.decorateFormField(key, {}, item)(
            <CheckboxGroup options={this.getOptions(key, item.options)} />
          );
          break;
        case 'radio':
        case 'radioButton':
          const ChildRadio = type == 'radio' ? Radio : RadioButton;
          children = this.decorateFormField(key, {}, item)(
            <RadioGroup>
              {item.options.map((option, idx) => (
                <ChildRadio key={idx} value={option.value}>{option.label}</ChildRadio>
              ))}
            </RadioGroup>
          );
          break;
        case 'switcher':
          children = this.decorateFormField(key, {
            valuePropName: 'checked'
          }, item)(
            <Switch checkedChildren={item.onLabel || '开启'} unCheckedChildren={item.offLabel || '关闭'} />
          );
          break;
        case 'timepicker':
        case 'timepickerMonth':
        case 'timepickerRange':
          const pickerMap = { timepicker: DatePicker, timepickerMonth: MonthPicker, timepickerRange: RangePicker };
          const Picker = pickerMap[type];
          children = this.decorateFormField(key, {}, item)(
            <Picker showTime={item.showTime} format={item.format} />
          );
          break;
        case 'cascade':
          const cascaderClassName = `${key}_${getUUID()}`;
          children = this.decorateFormField(key, {}, {
            ...item,
            props:{
              className: cascaderClassName,
              getPopupContainer: () => document.querySelector(`.${cascaderClassName}`),
              ...item.props
            }
          })(
            <Cascader
              size={item.size}
              options={item.options}
            />
          );
          break;
        case 'custom':
          children = item.render((options = {}) => {
            const { key: _key = key, ..._options } = options;
            return this.decorateFormField(_key, _options, item);
          }, form);
          break;
      }
      return children ? (
        <FormItem key={key}
          {...formItemLayout}
          label={item.label}
          hasFeedback={item.hasFeedback}
          extra={item.extra}
        >
          {children}
        </FormItem>
      ) : null;
    });
  }
  render(){
    const { formKeys, layout } = this.props;
    const isMultiCol = formKeys.length > 0 && typeof formKeys[0] === 'object';
    return(
      <Form
        className={styles.formContainer}
        layout={layout}
      >
        {isMultiCol ? (
          <Row>
            {formKeys.map((cfg, idx) => (
              <Col key={idx} {...cfg.col}>
                {this.mapFormItems(cfg.keys)}
              </Col>
            ))}
          </Row>
        ) : (this.mapFormItems(formKeys))}
      </Form>
    )
  }
}
