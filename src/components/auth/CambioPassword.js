import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Icon, message} from 'antd';
import AuthService from "../../servicios/auth-service"
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import {CURRENT_LOGIN, CURRENT_COMPLETA_PERFIL} from "../../actions/types"

const service = new AuthService();

class CambioPassword extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    password: "",
    errorCambio: true,
    errorMessage: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const password = this.state.password;

    console.log("Este es el password: ", password)

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    service.updatePassword(this.props.loggedIn.username, this.state.password)
    .then(response => {
      const password = ""; 
      const errorMessage = "";     
      this.setState({password, errorMessage}); 
      this.setState({errorCambio: false})    
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
    if(event.target.value === "")
      this.setState({confirmDirty : false})
    this.setState({errorMessage: false,
                   message: ""})
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      this.setState({confirmDirty : false})
      callback('Los passwords que informaste no son iguales!');      
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

    if(this.props.loggedIn === null || this.props.loggedIn === undefined)
     return <Redirect to="/" />

    if(!this.state.errorCambio){
      message.loading('La tarea esta en proceso...', 2.5)
      .then(() => message.success('El contraseña se ha cambiado correctamente...', 2.5))
      this.setState({correoSuccess: false})
      return <Redirect to="/homepage" />
    }

    return (
      <div className="row" style={{paddingBottom: "2px"}}>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{width:"100%"}}>
          <div >
            <div style={{paddingTop: "8%", textAlign:"center", fontSize:"1.8rem"}}>
              Deseas hacer cambio de password?
            </div>
            <div style={{paddingTop: "1%", textAlign:"center", fontSize:"1.5rem"}}>
              Introduce tus nuevas credenciales.
            </div>
          </div>
          <Form className="login-form estilo-login" onSubmit={this.handleSubmit} style={{paddingTop:"1%", paddingBottom:"2%", paddingLeft:"5%", paddingRight:"5%", marginLeft:"5%", marginRight:"5%", marginTop: "13%", marginBottom: "13%"}}>
            <br/>
            <Form.Item
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Por favor ingresa tu password!'
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input name="password" type="password" onChange = { e => this.handleChange(e)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password"/>
              )}
            </Form.Item>
            <br/>
            <Form.Item
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Por favor confirma tu password!'
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input name="confirm" type="password" onBlur ={e => this.handleConfirmBlur(e)} onChange = { e => this.handleChange(e)}prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirmar password"/>
              )}
            </Form.Item>
            {this.state.errorMessage ? 
              <p style={{color: "red"}}>{this.state.errorMessage}!</p>
              :
              <p></p>
            }
            <br/>
            <Form.Item>
              {this.state.confirmDirty ?
                <Button type="primary" htmlType="submit" style={{width:"100%"}}>Cambiar Password</Button>
              :
                <Button type="primary" htmlType="submit" disabled="true" style={{width:"100%"}}>Cambiar Password</Button>}
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ current: state.current,
                                    loggedIn: state.loggedIn });

export default connect(
  mapStateToProps,
  actions
)(CambioPassword);