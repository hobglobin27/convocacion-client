import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Icon} from 'antd';
import AuthService from "../../servicios/auth-service"
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import {CURRENT_LOGIN, CURRENT_COMPLETA_PERFIL} from "../../actions/types"

const service = new AuthService();

class Registro extends Component {
  state = {
    confirmDirty: false,
    confirmEmail: false,
    autoCompleteResult: [],
    username: "",
    password: "",
    errorSignup: false,
    errorMessage: ""
  };

  componentWillMount(){
    this.props.getListaMaterias();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    console.log("Este es el usuario: ",username)
    console.log("Este es el password: ", password)

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    service.signup(username, password)
    .then( response => {
      if(response._id !== undefined && response._id !== null){
        const username = "";
        const password = "";
        this.setState({username,password});
        this.props.getUser(response);
        this.props.form.resetFields();
      }
      else{
        this.setState({errorSignup: true,
                      errorMessage: response.message})
        }
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

  valida = (rule, value, callback) => {
    const form = this.props.form;
    const campo = form.getFieldValue('email');    
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(campo)) {
      this.setState({confirmEmail : true});
    } else {
      this.setState({confirmEmail : false});
    }
    callback();
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

    if(this.props.loggedIn && this.props.loggedIn.tipoUsuario !== undefined &&
      this.props.loggedIn.tipoUsuario !== "")
      return <Redirect to="/homepage" />
    if(this.props.loggedIn && this.props.loggedIn.tipoUsuario === undefined){
      this.props.setCurrentNav(CURRENT_COMPLETA_PERFIL);
      return <Redirect to="/perfil" />
    }

    return (
      <div className="row" style={{paddingBottom: "2px"}}>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" style={{width:"50%"}}>
          <Form {...formItemLayout} className="estilo-reg" onSubmit={this.handleSubmit} style={{paddingTop:"1%", paddingBottom:"1%", paddingLeft:"5%", paddingRight:"5%", marginLeft:"5%", marginRight:"5%", marginTop: "13%", marginBottom: "13%"}}>
            <br/>
            <Form.Item
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'El e-mail introducido no es valido!', 
                }, {
                  required: true, message: 'Por favor ingresa tu e-mail!'
                },{
                  validator: this.valida
                }],
              })(
                <Input name="username" onChange = { e => this.handleChange(e)} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email"/>
              )}
            </Form.Item>
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
            <Form.Item {...tailFormItemLayout}>
              {this.state.confirmDirty && this.state.confirmEmail ?
                <Button type="primary" htmlType="submit" >Registrate</Button>
              :
                <Button type="primary" htmlType="submit" disabled="true">Registrate</Button>}
            </Form.Item>
            <p>Ya tienes una cuenta? 
              <Link to={"/login"} onClick={this.loginSelected}> Ingresa</Link>
          </p>
          </Form>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" style={{width:"50%"}}>
          <div className="estilo-text-reg">
            Nuestros niños te necesitan. Gracias por apoyar!
          </div>
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
)(Registro);