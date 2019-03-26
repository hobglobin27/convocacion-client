import React, {Component, Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import * as actions from "../../actions";
import {CURRENT_REGISTRO} from "../../actions/types"
import AuthService from "../../servicios/auth-service"
import ComunService from "../../servicios/comun-service"

const authService = new AuthService();
const comunService = new ComunService();

class Login extends Component {

  state = {
    confirmDirty: false,
    username: "",
    password: "",
    loading: false,
    visible: false,
    confirmEmail: false,
    confirmUser: false,
    correo: "",
    errorLogin: false,
    errorCorreo: false,
    errorMessage: "",
    modalOlvidoPassword: false,
    modalCambioPassword: false     
  };

  showModalOlvidoPassword = () => {   
    this.setState({
      visible: true,
      modalOlvidoPassword: true,
      modalCambioPassword: false
    });
  }

  showModalCambioContraseña = () => {   
    this.setState({
      visible: true,
      modalOlvidoPassword: false,
      modalCambioPassword: true
    });
  }

  handleOk = () => {
    const email = this.state.correo;
    const subject = "Tu recuperación de password"
    const message = `<div><b>Tu recuparacion de password.</b></div><br><br>
    <div><img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1552166212/imagenes/logo2.png"></img></div><br>
    <div>Este es tu nuevo password. Favor de cambiarlo cuando ingreses a la plataforma.</div><br>
    <div>Password: <b>${process.env.REACT_APP_PASSWORD_TEMP}</b></div>`;

    console.log("Este es state error correo: ", this.state.errorCorreo)
    
    authService.recuperaUsuario(email)
    .then( response => {
      console.log("Entra a response recupera usuario: ", response)
      if(response._id !== undefined && response._id !== null){        
        comunService.sendEmail(email, subject, message)
        .then( response => {
          console.log("Este es el correo a enviar: ",this.state.correo)
          authService.updatePassword(this.state.correo)
          .then(response => {
            const password = "";
            const correo = ""; 
            const errorMessage = "";     
            this.setState({password, correo, errorMessage});
            if(this.state.errorCorreo)
              this.props.form.resetFields(["password"]);
            if(!this.state.errorCorreo)
              this.props.form.resetFields(["correo","password"]);
          })
          .catch( error => console.log(error) )
        })
        .catch( error => console.log(error) )

        this.setState({ loading: true});

        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      }
      else{
        console.log("Entra a else response recupera usuario: ", response)
        this.setState({errorCorreo: true,
          errorMessage: response.message})
      }      
    })
    .catch(error => console.log(error))    
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  validaPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && form.getFieldValue('password')!== "" && form.getFieldValue('password')!== undefined) {
      this.setState({confirmDirty : true})
    } else {
      this.setState({confirmDirty : false})
      callback();
    }
  }

  validaUser = (rule, value, callback) => {
    const form = this.props.form;
    const campo = form.getFieldValue('username');
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(campo)) {
      this.setState({confirmUser : true});
    } else {
      this.setState({confirmUser : false});
    }
    callback();
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
    this.setState({errorLogin: false,
                  message: "",
                  errorCorreo: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    authService.login(username, password)
    .then( response => {     
      if(response._id !== undefined && response._id !== null){
        this.props.getUser(response);
        const username = "";
        const password = "";
        this.setState({username,password});
      }
      else{
      this.setState({errorLogin: true,
                    errorMessage: response.message})
      }
    })
    .catch( error => console.log(error) )
  }

  registroSelected = () => this.props.setCurrentNav(CURRENT_REGISTRO);

  validaCorreo = (rule, value, callback) => {    
    const form = this.props.form;
    const campo = form.getFieldValue('correo');
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(campo)) {
      this.setState({confirmEmail : true});
      if(document.getElementById("botonEnvioPassword"))
        document.getElementById("botonEnvioPassword").disabled = false;
    } else {
      this.setState({confirmEmail : false});
      if(document.getElementById("botonEnvioPassword"))
        document.getElementById("botonEnvioPassword").disabled = true;
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, loading } = this.state;

    if(this.props.loggedIn)
      return <Redirect to="/" />

    return (
      <Fragment>
      <Form onSubmit={this.handleSubmit} className="login-form estilo-login" style={{paddingTop: "5%", paddingLeft: "1%", paddingRight: "1%", paddingBottom: "3%", marginTop: "5%", marginBottom: "5.5%"}}>
        <Form.Item
          hasFeedback
        >
          {getFieldDecorator('username', {
             rules: [{
              type: 'email', message: 'El usuario introducido no es valido!', 
            },
            {
              validator: this.validaUser,
            }],
          })(
            <Input name="username" onChange = { e => this.handleChange(e)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
          )}
        </Form.Item>
        <br/>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Por favor ingresa tu Password!' },
            {
              validator: this.validaPassword,
            }],
          })(
            <Input name="password" onChange = { e => this.handleChange(e)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        {this.state.errorLogin ?
          <p style={{color: "red"}}>{this.state.errorMessage}!</p>
          :
          <p></p>
        }
        <Form.Item >         
          <a className="login-form-forgot" onClick={this.showModalOlvidoPassword} href="#">Olvidaste tu password?</a>
          {this.state.confirmDirty && this.state.confirmUser ?
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
              Log in
            </Button>
          :
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}} disabled={true}>
              Log in
            </Button>}
          No tienes cuenta?<Link to={"/registro"} onClick={this.registroSelected}> Registrate!</Link>
          <br/>
          <a className="login-form-forgot" onClick={this.showModalCambioContraseña} href="#">Cambia tu contraseña.</a>
        </Form.Item>
      </Form>
      {this.state.modalOlvidoPassword ?
        <Modal
          visible={visible}
          title="Introduce tu correo y te enviaremos tu contraseña"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancelar</Button>,
            <Button id="botonEnvioPassword" key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Enviar correo
            </Button>,
          ]}>
          
          <Form>
            <Form.Item
              hasFeedback
            >
              {getFieldDecorator('correo', {
                rules: [{
                  type: 'email', message: 'El usuario introducido no es valido!', 
                },
                {
                  validator: this.validaCorreo,
                }],
              })(
                <Input id="correoEnvioPassword" name="correo" onChange = {this.handleChange} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Intruduce tu email" />
              )}
            </Form.Item>
            {this.state.errorCorreo ? 
              <p style={{color: "red"}}>{this.state.errorMessage}!</p>
              :
              <p></p>
            }
          </Form> 
        </Modal>
        :
        <Modal
          visible={visible}
          title="Introduce tu correo y te enviaremos tu contraseña"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancelar</Button>,
            <Button id="botonEnvioPassword" key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Enviar correo
            </Button>,
          ]}>
          
          
        </Modal>
      }
      
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ current: state.current,
                                  loggedIn: state.loggedIn });

export default connect(
  mapStateToProps,
  actions
)(Login);