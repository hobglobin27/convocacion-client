import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Steps, Button, message, Input, Form, Icon, Radio } from 'antd';

const Step = Steps.Step;
const RadioGroup = Radio.Group;

const steps = [{
  title: 'Datos Personales',
  content: 'First-content'  
}, {
  title: 'Datos de la Direccion',
  content: 'Second-content',
}, {
  title: 'Finalizar Perfil',
  content: 'Last-content',
}];

class Perfil extends Component {
    state = {
    current: 0,
    value: 1
  };  

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <br/>
        <h3 style={{color:"rgb(238, 96, 40)", paddingLeft:"3.5%"}}>Dedica un momento para completar tu perfil</h3>
        
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          <Form onSubmit={this.handleSubmit} className="login-form" style={{paddingLeft: "1%", paddingRight: "1%"}}>
            { this.state.current === 0 ?
            <Fragment>
              <span>Selecciona tu rol dentro de ConVocacion:</span>
              <RadioGroup onChange={this.onChange} value={this.state.value} style={{paddingLeft: "5%"}}>
                <Radio value={1}>Tutor</Radio>
                <Radio value={2}>Lider de grupo</Radio>
              </RadioGroup>
              <br/><br/>
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
            
              <Form.Item >         
                <a className="login-form-forgot" onClick={this.showModal} href="#">Olvidaste tu password?</a>
                {this.state.confirmDirty && this.state.confirmUser ?
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                    Log in
                  </Button>
                :
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}} disabled={true}>
                    Log in
                  </Button>}
                No tienes cuenta?<Link to={"/registro"} onClick={this.registroSelected}> Registrate!</Link>
              </Form.Item>
            </Fragment>
            :
              <Fragment>
              {this.state.current === 1 ?
                <Fragment>
                  <p>este es el dos</p>
                  <span>Selecciona tu rol dentro de ConVocacion:</span>
                  <RadioGroup onChange={this.onChange} value={this.state.value} style={{paddingLeft: "5%"}}>
                    <Radio value={1}>Tutor</Radio>
                    <Radio value={2}>Lider de grupo</Radio>
                  </RadioGroup>
                  <br/><br/>
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
                
                  <Form.Item >         
                    <a className="login-form-forgot" onClick={this.showModal} href="#">Olvidaste tu password?</a>
                    {this.state.confirmDirty && this.state.confirmUser ?
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                        Log in
                      </Button>
                    :
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}} disabled={true}>
                        Log in
                      </Button>}
                    No tienes cuenta?<Link to={"/registro"} onClick={this.registroSelected}> Registrate!</Link>
                  </Form.Item>
                </Fragment>
                :
                <Fragment>
                  <p>este es el tres</p>
                  <span>Selecciona tu rol dentro de ConVocacion:</span>
                  <RadioGroup onChange={this.onChange} value={this.state.value} style={{paddingLeft: "5%"}}>
                    <Radio value={1}>Tutor</Radio>
                    <Radio value={2}>Lider de grupo</Radio>
                  </RadioGroup>
                  <br/><br/>
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
                
                  <Form.Item >         
                    <a className="login-form-forgot" onClick={this.showModal} href="#">Olvidaste tu password?</a>
                    {this.state.confirmDirty && this.state.confirmUser ?
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                        Log in
                      </Button>
                    :
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}} disabled={true}>
                        Log in
                      </Button>}
                    No tienes cuenta?<Link to={"/registro"} onClick={this.registroSelected}> Registrate!</Link>
                  </Form.Item>
                </Fragment>
              }
              </Fragment>
            }
            
          </Form>
        </div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
        <br/><br/>
      </div>
    );
  }
}

export default Perfil;