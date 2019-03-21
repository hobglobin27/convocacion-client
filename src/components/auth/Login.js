import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import * as actions from "../../actions";
import {CURRENT_REGISTRO} from "../../actions/types"

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  registroSelected = () => this.props.setCurrentNav(CURRENT_REGISTRO);

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{border:"solid #FE9A2E 1px",  borderRadius: "10px",  width: "30%", padding:"1%", margin: "1%", background:"#FE9A2E"}}>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Por favor ingresa tu nombre de usuario!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Por favor ingresa tu Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
            Log in
          </Button>
          ó <Link to={"/registro"} onClick={this.registroSelected}> Registrate!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({ current: state.current });

export default connect(
  mapStateToProps,
  actions
)(Login);