import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Spin, Icon, Button } from 'antd';
import styles from './detail.less';
import Moment from 'moment';
import clonedeep from 'lodash.clonedeep';

import BaseForm from '../../components/BaseForm';

@connect(state => ({
  loading: state.detail.loading,
  userInfo: state.detail.userInfo,
}))
@Form.create()
export default class Detail extends PureComponent{
  state = {

  }
  infoForm = null;
  componentWillMount(){
    this.props.dispatch({
      type:'detail/fetchUserInfo',
    })
  }
  handleData(){
    const { userInfo } = this.props;
    const formData = clonedeep(userInfo);
    formData.gender = String(formData.gender);
    formData.date = Moment(formData.date);
    return formData;
  }
  handleFormChange(values){
    console.log(values);
  }
  handleEdit(){

  }
  handleReset(){
    this.infoForm && this.infoForm.resetFields();
  }
  render(){
    const { loading } = this.props;
    const formItems = {
      'name': {
        label: '姓名',
        type: 'text',
        wrapperCol: { span: 8 },
        placeholder: '请输入姓名',
        extra: '姓名只限4-8位拼音 <_<',
        rules:[
          {required:true, message: '请输入姓名'},
          {pattern:/[a-zA-Z]+/, message: '请输入拼音'},
          {min:4, message: '长度不能低于四位'},
          {max:8, message: '长度不能高于八位'}
        ],
        props: {
          prefix: <Icon type="user" />,
        },
      },
      'age': {
        defaultValue: 0,
        label:'年龄',
        type: 'number',
        min: 0,
      },
      'gender': {
        label: '性别',
        type: 'radioButton',
        options:[
          {label: '男', value: '0'},
          {label: '女', value: '1'},
        ],
      },
      'date': {
        label: '入驻日期',
        type: 'timepicker',
        showTime:true,
        format:'YYYY/MM/DD HH:mm:ss',
      },
      'address': {
        label: '地址',
        type: 'cascade',
        placeholder: '请选择地址',
        options: [{
          value: 'beijing',
          label: '北京',
          children: [{
            value: 'beijing',
            label: '北京',
            children: [{
              value: 'beijing',
              label: '北京',
            }, {
              value: '南京',
              label: '南京',
              disabled: true,
            }],
          }],
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [{
            value: 'nanjing',
            label: '南京',
            children: [{
              value: 'zhonghuamen',
              label: '中华门',
            }],
          }],
        }],
        props:{
          changeOnSelect: true,
          showSearch: true,
          expandTrigger: 'hover',
        },
      },
    };
    const formKeys = [{
      keys:['name','age','gender','date','address'],
      col:{span: 14, offset: 4},
    }];
    return(
      <div className={styles.container}>
        <Spin spinning={loading}>
          <BaseForm
            getForm={form => this.infoForm = form}
            formItems={formItems}
            formKeys={formKeys}
            formData={this.handleData()}
            onChange={this.handleFormChange}
          />
          <div className={styles.buttonWrap}>
            <Button type="primary" onClick={()=>this.handleEdit()}>修改</Button>
            <Button onClick={()=>this.handleReset()}>重置</Button>
          </div>
        </Spin>
      </div>
    )
  }
}
