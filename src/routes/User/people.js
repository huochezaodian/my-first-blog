import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, message, Button } from 'antd';
import styles from './people.less';
import clonedeep from 'lodash.clonedeep';
import BaseForm from '../../components/BaseForm';

@connect(state => ({
  list: state.user.list,
  loading: state.user.loading
}))
export default class People extends PureComponent {
  constructor(props) {
    super(props);
    this.searchForm = null;
    this.state = {
      formData:{}
    };
  }
  componentWillMount(){
    this.props.dispatch({
      type: 'user/fetchUsers',
    });
  }
  handleDelete(record){
    this.props.dispatch({
      type: 'user/fetchDeleteUser',
      payload: { userid : record.userid }
    }).then(data => {
      if(data.status === 'ok'){
        message.success('删除成功');
      }else{
        message.success('删除失败');
      }
    })
  }
  handleFormChange(values){
    console.log(values);
  }
  handleReset(){
    this.searchForm && this.searchForm.resetFields();
  }
  handleQuery(){
    this.searchForm.validateFieldsAndScroll((errors, values) => {
      console.log(errors, values);
    });
  }
  render(){
    const {
      list : {
        users = []
      },
      loading
    } = this.props;
    const { formData } = this.state;

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      { title: 'Register Time', dataIndex: 'date', key: 'date' },
      { title: 'Action', dataIndex: '', key: 'action',
        render: (text, record, index) => <Popconfirm title="Are you sure？" onConfirm={e => this.handleDelete(record)}>
                      <a href="#">Delete</a>
                    </Popconfirm> ,
        fixed: 'right', width: '100'},
    ];

    const data = clonedeep(users);
    data.map(item => {
      item.description = `我的名字是${item.name}， 我现在${item.age}岁了， 我住在${item.address}。`;
      item.gender = item.gender === 0 ? '男' : '女';
      item.key = item.userid;
      return item;
    });

    const pageProps = {
      pageSizeOptions:['10', '20', '30'],
      //showQuickJumper: true,
      showSizeChanger: true,
      showTotal(total, range){
        return `total ${total}`;
      },
      total: data.length,
    };

    const formItems = {
      'name':{
        label:'姓名',
        placeholder:'请输入查询的姓名',
        type: 'text',
      },
      'age':{
        defaultValue: 0,
        label:'年龄',
        type: 'number',
        min: 0,
      },
      'gender':{
        label:'性别',
        type: 'combo',
        options:[
          {label:'全部',value:''},
          {label:'男',value:'0'},
          {label:'女',value:'1'},
        ],
        defaultValue: '',
      },
      'date':{
        label:'注册时间',
        type:'timepickerRange',
        showTime:true,
        format:'YYYY/MM/DD HH:mm:ss',
        placeholder:['starttime', 'endtime'],
      }
    };
    const formKeys = [
      {
        col:{ span: 8 },
        keys: [ 'name', 'date'],
      },
      {
        col:{ span: 6 },
        keys: [ 'gender',  ],
      },
      {
        col:{ span: 6 },
        keys: [ 'age',  ],
      },
    ];
    //const formKeys = ['name','age','gender','date'];
    return(
      <div className={styles.container}>
        <div className={styles.formWrap}>
          <BaseForm
            getForm={form => this.searchForm = form }
            //layout="inline"
            formKeys={formKeys}
            formItems={formItems}
            formData={formData}
            onChange={this.handleFormChange}
          />
          <div className={styles.buttonWrap}>
            <Button type="primary" onClick={()=>this.handleQuery()}>查询</Button>
            <Button onClick={()=>this.handleReset()}>重置</Button>
          </div>
        </div>
        <Table
          columns={columns}
          loading={loading}
          pagination={pageProps}
          expandedRowRender={record => <p>{record.description}</p>}
          dataSource={data}
          scroll={{ x: 950 }}
        />
      </div>
    )
  }
}
