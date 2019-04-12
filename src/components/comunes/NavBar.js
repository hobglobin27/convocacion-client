//Imports para React
import { Menu, Avatar } from 'antd';
import React, {Fragment, Component} from "react";
import { Link } from 'react-router-dom';

//Imports Iconos
import FaUserPlus from 'react-icons/lib/fa/user-plus'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import MdHelp from 'react-icons/lib/md/help'
import FaGraduationCap from 'react-icons/lib/fa/graduation-cap'
import FaGroup from 'react-icons/lib/fa/group'
import FaPuzzlePiece from 'react-icons/lib/fa/puzzle-piece'
import FaLock from 'react-icons/lib/fa/lock'
import FaSignOut from 'react-icons/lib/fa/sign-out'
import FaListAlt from 'react-icons/lib/fa/list-alt'
import FaSearch from 'react-icons/lib/fa/search'
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o'
import FaHome from 'react-icons/lib/fa/home'

//Imports Estilos
import 'antd/dist/antd.css';
import '../estilos/styles.css'

import { connect } from "react-redux";
import * as actions from "../../actions";
import AuthService from "../../servicios/auth-service"
import { CURRENT_REGISTRO, 
        CURRENT_LOGIN,
        CURRENT_TUTOR,
        CURRENT_LIDER_GRUPO,
        CURRENT_HELP,
        CURRENT_COMPLETA_PERFIL,
        CURRENT_CAMBIA_CONTRASENA_PERFIL,
        CURRENT_SALIR_PERFIL,
        CURRENT_AVATAR_TUTOR,
        CURRENT_ASIGNACIONES,
        CURRENT_ARTICULOS_TUTOR,
        CURRENT_CAMBIA_CONTRASENA_TUTOR,
        CURRENT_SALIR_TUTOR,
        CURRENT_AVATAR_LIDER,
        CURRENT_GRUPOS,
        CURRENT_ARTICULOS_LIDER,
        CURRENT_CAMBIA_CONTRASENA_LIDER,
        CURRENT_SALIR_LIDER,
        CURRENT_HOME,
        CURRENT_BUSCAR_TUTOR,
        CURRENT_INICIO } from '../../actions/types';

const authService = new AuthService();

class NavBar extends Component {

  handleClick = (e) => {
    console.log('click ', e);
    if(e.key === "inicio")
      this.props.setCurrentNav(CURRENT_INICIO);
    if(e.key === "user-plus")
      this.props.setCurrentNav(CURRENT_REGISTRO);
    if(e.key === "sign-in")
      this.props.setCurrentNav(CURRENT_LOGIN);
    if(e.key === "tutor")
      this.props.setCurrentNav(CURRENT_TUTOR);
    if(e.key === "lider-grupo")
      this.props.setCurrentNav(CURRENT_LIDER_GRUPO);
    if(e.key === "help")
      this.props.setCurrentNav(CURRENT_HELP);
    if(e.key === "completa-perfil")
      this.props.setCurrentNav(CURRENT_COMPLETA_PERFIL);
    if(e.key === "cambia-contrasena-perfil")
      this.props.setCurrentNav(CURRENT_CAMBIA_CONTRASENA_PERFIL);
    if(e.key === "salir-perfil")
      this.props.setCurrentNav(CURRENT_SALIR_PERFIL);
    if(e.key === "avatar-tutor")
      this.props.setCurrentNav(CURRENT_AVATAR_TUTOR);
    if(e.key === "asignaciones")
      this.props.setCurrentNav(CURRENT_ASIGNACIONES);
    if(e.key === "articulos-tutor")
      this.props.setCurrentNav(CURRENT_ARTICULOS_TUTOR);
    if(e.key === "cambia-contrasena-tutor")
      this.props.setCurrentNav(CURRENT_CAMBIA_CONTRASENA_TUTOR);
    if(e.key === "salir-tutor")
      this.props.setCurrentNav(CURRENT_SALIR_TUTOR);
    if(e.key === "avatar-lider")
      this.props.setCurrentNav(CURRENT_AVATAR_LIDER);
    if(e.key === "grupos")
      this.props.setCurrentNav(CURRENT_GRUPOS);
    if(e.key === "articulos-lider")
      this.props.setCurrentNav(CURRENT_ARTICULOS_LIDER);
    if(e.key === "cambia-contrasena-lider")
      this.props.setCurrentNav(CURRENT_CAMBIA_CONTRASENA_LIDER);
    if(e.key === "salir-lider")
      this.props.setCurrentNav(CURRENT_SALIR_LIDER);
    if(e.key === "buscar-tutor")
      this.props.setCurrentNav(CURRENT_BUSCAR_TUTOR);
  }
  

  componentDidUpdate(){
    console.log("Este es el current" + this.props.current);
  }

  handleClickLogOut = (event) => {
    authService.logout()
    .then(() => {
      this.props.getUser(null)
    })
  }

  render() {
    return (
      <Fragment>        
        {
          this.props.loggedIn === null ?            
            <Menu style={{fontSize: "100%", marginTop: "0.6%", color: "rgb(236, 228, 223)", textAlign:"right"}}
            onClick={this.handleClick}
            selectedKeys={[this.props.current]}
            mode="horizontal"
            theme='dark'
            > 
              <Menu.Item key="inicio">
                <div>
                  <Link to="/" className="estilo-nav"><FaHome/> Inicio</Link>  
                </div>
              </Menu.Item>
              <Menu.Item key="user-plus">
                <div>
                  <Link to="/registro" className="estilo-nav"><FaUserPlus/> Registrate</Link>  
                </div>
              </Menu.Item>
              <Menu.Item key="sign-in">
                  <div>
                    <Link to="/login" className="estilo-nav"><FaSignIn/> Ingresa</Link>
                  </div>
              </Menu.Item>
              <Menu.Item key="tutor">
                  <div>
                    <Link to="/ser-tutor" className="estilo-nav"><FaGraduationCap/> Quieres ser Tutor?</Link>
                  </div>
              </Menu.Item>
              <Menu.Item key="lider-grupo">
                  <div>
                    <Link to="/ser-lider" className="estilo-nav"><FaGroup/> Se un líder de grupo</Link>
                  </div>
              </Menu.Item>
              <Menu.Item key="help">
                  <div>
                    <Link to="/ayuda" className="estilo-nav"><MdHelp /> Ayuda</Link>
                  </div>
              </Menu.Item>
            </Menu>
            :
            this.props.loggedIn !== null && this.props.loggedIn.tipoUsuario === undefined ?
              <Menu style={{fontSize: "100%", marginTop: "0.6%", color: "rgb(236, 228, 223)", textAlign:"right"}}
              onClick={this.handleClick}
              selectedKeys={[this.props.current]}
              mode="horizontal"
              theme='dark'
              >
                <Menu.Item key="completa-perfil">
                  <div>
                    <Link to="/perfil" className="estilo-nav"><FaPuzzlePiece/> Completando perfil</Link>                      
                  </div>
                </Menu.Item>
                <Menu.Item key="cambia-contrasena-perfil">
                    <div>
                      <Link to="/cambiopassword" className="estilo-nav"><FaLock/> Cambiar contraseña</Link>
                    </div>
                </Menu.Item>
                <Menu.Item key="salir-perfil">
                    <div>
                      <Link onClick = {e => this.handleClickLogOut(e)} to="/" className="estilo-nav"><FaSignOut /> Salir</Link>
                    </div>
                </Menu.Item>
              </Menu>
              :
              this.props.loggedIn !== null && this.props.loggedIn.tipoUsuario === "T" ?
                <Menu style={{fontSize: "100%", marginTop: "0.6%", color: "rgb(236, 228, 223)", textAlign:"right"}}
                onClick={this.handleClick}
                selectedKeys={[this.props.current]}
                mode="horizontal"
                theme='dark'
                >
                  <Menu.Item key="avatar-tutor">
                    <div>
                      <Link to="/consultaperfil" className="estilo-nav">
                      <Avatar  size={30} src={this.props.loggedIn.fotos[0].path} style={{color: "#09182e", background: "rgb(236, 228, 223)"}}></Avatar> Mi perfil</Link>
                    </div>
                  </Menu.Item>
                  {/*<Menu.Item key="asignaciones">
                      <div>
                        <Link to="/" className="estilo-nav"><FaListAlt/> Asignaciones</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="articulos-tutor">
                      <div>
                        <Link to="/" className="estilo-nav"><FaNewspaperO/> Articulos</Link>
                      </div>
                  </Menu.Item>*/}
                  <Menu.Item key="cambia-contrasena-tutor">
                      <div>
                        <Link to="/cambiopassword" className="estilo-nav"><FaLock/> Cambiar contraseña</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="salir-tutor">
                      <div>
                        <Link onClick = {e => this.handleClickLogOut(e)} to="/" className="estilo-nav"><FaSignOut /> Salir</Link>
                      </div>
                  </Menu.Item>
                </Menu>
                :
                <Menu style={{fontSize: "100%", marginTop: "0.6%", color: "rgb(236, 228, 223)", textAlign:"right"}}
                onClick={this.handleClick}
                selectedKeys={[this.props.current]}
                mode="horizontal"
                theme='dark'
                >
                  <Menu.Item key="avatar-lider">
                    <div>
                      <Link to="/consultaperfil" className="estilo-nav">
                      <Avatar  size={30} src={this.props.loggedIn.fotos[0].path} style={{color: "#09182e", background: "rgb(236, 228, 223)"}}></Avatar> Mi perfil</Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="buscar-tutor">
                      <div>
                        <Link to="/" className="estilo-nav"><FaSearch/> Buscar tutor</Link>
                      </div>
                  </Menu.Item>
                  {/*<Menu.Item key="grupos">
                      <div>
                        <Link to="/grupos" className="estilo-nav"><FaGroup/> Grupos</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="articulos-lider">
                      <div>
                        <Link to="/" className="estilo-nav"><FaNewspaperO/> Articulos</Link>
                      </div>
                  </Menu.Item>*/}
                  <Menu.Item key="cambia-contrasena-lider">
                      <div>
                        <Link to="/cambiopassword" className="estilo-nav"><FaLock/> Cambiar contraseña</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="salir-lider">
                      <div>
                        <Link onClick = {e => this.handleClickLogOut(e)} to="/" className="estilo-nav"><FaSignOut /> Salir</Link>
                      </div>
                  </Menu.Item>
                </Menu>
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
)(NavBar);
