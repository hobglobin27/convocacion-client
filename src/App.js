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
import Perfil from './components/complementar/Perfil'
import Login from './components/auth/Login'
import Registro from './components/auth/Registro'
import HomePage from './components/comunes/HomePage'
import CambioPassword from './components/auth/CambioPassword'
import MiPerfil from './components/comunes/MiPerfil';
import Ayuda from './components/comunes/Ayuda';
import SerTutor from './components/comunes/SerTutor';
import SerLider from './components/comunes/SerLider';
import Grupos from './components/listas/Grupos';

//Imports estilos
import './components/estilos/styles.css';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;
const LoginForm = Form.create({ name: 'normal_login' })(Login);
const RegistroForm = Form.create({ name: 'register' })(Registro);
const PerfilForm = Form.create({ name: 'perfil' })(Perfil);
const CambioPasswordForm = Form.create({ name: 'perfil' })(CambioPassword);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Layout className="layout">
          <Header className="sticky">            
            <div className="logo">
              <Link to="/"><img className="logoProps" src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1552166212/imagenes/logo2.png" alt=""/></Link>          
            </div>
            <NavBar />      
          </Header>
          <Content className="fondo">   
            <Switch> 
              <Route exact path="/" component={Inicio}/>
              <Route exact path="/consultaperfil" component={MiPerfil} />
              <div className='container-fluid'>
                <div className='contenedor-reg'>
                  <Route exact path="/registro" component={RegistroForm}/>
                </div> 
                <div className='contenedor-log'>
                  <Route exact path="/login" component={LoginForm} />
                </div>
                <div className=''>
                  <Route exact path="/perfil" component={PerfilForm} />
                </div>
                <div className=''>
                  <Route exact path="/homepage" component={HomePage} />
                </div>
                <div className=''>
                  <Route exact path="/ayuda" component={Ayuda} />
                </div>
                <div className=''>
                  <Route exact path="/ser-tutor" component={SerTutor} />
                </div>  
                <div className=''>
                  <Route exact path="/ser-lider" component={SerLider} />
                </div>
                <div className=''>
                  <Route exact path="/grupos" component={Grupos} />
                </div>        
                <div className='contenedor-cambio-psw'>
                  <Route exact path="/cambiopassword" component={CambioPasswordForm} />
                </div> 
              </div>                     
            </Switch> 
          </Content>    
          <Footer className="fondoFooter" style={{background: "#09182e", color: "#ffffff"}}>
            Con vocación ©2019 Created by IPA
          </Footer>
        </Layout>
      </Provider>
    );
  }
}

export default App;
