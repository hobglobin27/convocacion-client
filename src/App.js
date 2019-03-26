//Imports para React
import React, { Component } from 'react';
import {Switch, Route} from "react-router-dom"
import { Layout} from 'antd';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./reduxstore/store";

//Imports componentes propios
import Inicio from "./components/comunes/Inicio"
import NavBar from './components/comunes/NavBar'
import Articulos from './components/listas/Articulos'
import Login from './components/auth/Login'
import Registro from './components/auth/Registro'

//Imports estilos
import './components/estilos/styles.css';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;
const LoginForm = Form.create({ name: 'normal_login' })(Login);
const RegistroForm = Form.create({ name: 'register' })(Registro);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Layout className="layout">
          <Header> 
            <div className="logo">
              <Link to="/"><img className="logoProps" src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1552166212/imagenes/logo2.png" alt=""/></Link>          
            </div>
            <NavBar />         
          </Header>
          <Content className="fondo">   
            <Switch> 
              <Route exact path="/" component={Inicio}/>
              <div className='container-fluid'>
                <div className='contenedor-reg'>
                  <Route exact path="/registro" component={RegistroForm}/>
                </div> 
                <div className='contenedor-log'>
                <Route exact path="/login" component={LoginForm} />
                </div>      
              </div>                     
            </Switch> 
          </Content>    
          <Footer className="fondoFooter" style={{background: "#09182e", color: "#ffffff"}}>
            Con vocación ©2018 Created by IPA
          </Footer>
        </Layout>
      </Provider>
    );
  }
}

export default App;
