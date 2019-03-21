import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button} from 'antd';
import AuthService from "./auth-service"
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import {CURRENT_LOGIN} from "../../actions/types"

const service = new AuthService();

class Registro extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    username: "",
    password: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    service.signup(username, password)
    .then( () => {
      const username = "";
      const password = "";
      this.setState({username,password});
      // this.props.getUser(response)
  })
  .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
    if(event.target.value === "")
      this.setState({confirmDirty : false})
  }

  loginSelected = () => this.props.setCurrentNav(CURRENT_LOGIN);

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      this.setState({confirmDirty : false})
      callback('Two passwords that you enter is inconsistent!');      
    } else {
      if(value === "")
        this.setState({confirmDirty : false})
      else
        this.setState({confirmDirty : true})
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value === form.getFieldValue('confirm')) {
      this.setState({confirmDirty : true})
      form.validateFields(['confirm'], { force: true });      
    }
    else
      this.setState({confirmDirty : false})
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{border:"solid #FE9A2E 1px",  borderRadius: "10px",  width: "30%", padding:"1%", margin: "1%", background:"#FE9A2E" }}>
          <Form.Item
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input name="username" onChange = { e => this.handleChange(e)}/>
            )}
          </Form.Item>
          <Form.Item
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" name="password" onChange = { e => this.handleChange(e)}/>
            )}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" name="confirm" onBlur ={e => this.handleConfirmBlur(e)} onChange = { e => this.handleChange(e)}/>
            )}
          </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            {this.state.confirmDirty === true ?
              <Button type="primary" htmlType="submit" >Register</Button>
            :
              <Button type="primary" htmlType="submit" disabled="true"  >Register</Button>}
          </Form.Item>
          <p>Already have account? 
            <Link to={"/login"} onClick={this.loginSelected}> Ingresa</Link>
        </p>
        </Form>
    );
  }
}

const mapStateToProps = state => ({ current: state.current });

export default connect(
  mapStateToProps,
  actions
)(Registro);