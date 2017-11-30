import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Icon, Row, Col, message, notification } from 'antd';
import styles from './Login.less';
import img from '../../assets/blog.png';

const FormItem = Form.Item;

@connect(state => ({
  login: state.login,
  register: state.register,
}))
@Form.create()
export default class Login extends PureComponent {
  state = {

  }

  componentWillReceiveProps(nextProps) {
    const { login, register } = nextProps;
    if (login.status === 'ok') {
      this.props.dispatch(routerRedux.push('/note/javascript'));
    } else if (register.loading === true && register.status === 'ok') {
      message.success('注册成功');
    } else if (login.loading === true && login.status === 'error'){
      notification.error({
        message: '登录失败',
        description: '用户名或密码错误'
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `login/Login`,
            payload: values,
          });
        }
      }
    );
  }

  handleRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `register/Register`,
            payload: values,
          });
        }
      }
    );
  }

  render() {
    const { form, login, register } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={img} />
          <span>Blog Blog</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,message:'请输入用户名',
                },
              ],
            })(<Input size="large" prefix={<Icon type="user"/>} placeholder="admin" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,message:'请输入密码',
                },
              ],
            })(<Input size="large" type="password" prefix={<Icon type="lock"/>} placeholder="888888" />)}
          </FormItem>
          <Row>
            <Col offset={3} span={8}>
              <Button type="primary" size="large" onClick={this.handleSubmit} loading={login.loading}>
                登录
              </Button>
            </Col>
            <Col offset={3} span={8}>
              <Button type="ghost" size="large" onClick={this.handleRegister} loading={register.loading}>
                注册
              </Button>
            </Col>
          </Row>
        </form>
    </div>
    );
  }
}
