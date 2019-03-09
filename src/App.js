import React, { Component } from 'react';
import Inicio from "./components/Inicio"
import './components/estilos/styles.css';
import 'antd/dist/antd.css';
import NavBar from './components/NavBar';
import { Layout} from 'antd';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            <img className="logoProps" src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1552166212/imagenes/logo2.png" alt=""/>
          </div>
          <NavBar/>
        </Header>
        <Content className="fondo">
          <Inicio />
        </Content>        
        <Footer className="fondoFooter" style={{background: "#09182e", color: "#ffffff"}}>
          Con vocación ©2018 Created by IPA
        </Footer>
      </Layout>

    );
  }
}
export default App;
