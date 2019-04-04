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
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o'

//Imports Estilos
import 'antd/dist/antd.css';
import '../estilos/styles.css'

import { connect } from "react-redux";
import * as actions from "../../actions";
import { CURRENT_REGISTRO, CURRENT_LOGIN } from '../../actions/types';

class NavBar extends Component {

  handleClick = (e) => {
    console.log('click ', e);
    if(e.key === "user-plus")
      this.props.setCurrentNav(CURRENT_REGISTRO);
    if(e.key === "sign-in")
      this.props.setCurrentNav(CURRENT_LOGIN);
  }

  componentDidUpdate(){
    console.log("Este es el current" + this.props.current);
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
                    <Link to="/" className="estilo-nav"><FaGraduationCap/> Quieres ser Tutor?</Link>
                  </div>
              </Menu.Item>
              <Menu.Item key="lider-grupo">
                  <div>
                    <Link to="/" className="estilo-nav"><FaGroup/> Se un líder de grupo</Link>
                  </div>
              </Menu.Item>
              <Menu.Item key="help">
                  <div>
                    <Link to="/login" className="estilo-nav"><MdHelp /> Ayuda</Link>
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
                      <Link to="/" className="estilo-nav"><FaLock/> Cambiar contraseña</Link>
                    </div>
                </Menu.Item>
                <Menu.Item key="salir-perfil">
                    <div>
                      <Link to="/" className="estilo-nav"><FaSignOut /> Salir</Link>
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
                  <Menu.Item key="asignaciones">
                      <div>
                        <Link to="/" className="estilo-nav"><FaListAlt/> Asignaciones</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="articulos-tutor">
                      <div>
                        <Link to="/" className="estilo-nav"><FaNewspaperO/> Articulos</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="cambia-contrasena-tutor">
                      <div>
                        <Link to="/" className="estilo-nav"><FaLock/> Cambiar contraseña</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="salir-tutor">
                      <div>
                        <Link to="/" className="estilo-nav"><FaSignOut /> Salir</Link>
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
                  <Menu.Item key="grupos">
                      <div>
                        <Link to="/" className="estilo-nav"><FaGroup/> Grupos</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="articulos-lider">
                      <div>
                        <Link to="/" className="estilo-nav"><FaNewspaperO/> Articulos</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="cambia-contrasena-lider">
                      <div>
                        <Link to="/" className="estilo-nav"><FaLock/> Cambiar contraseña</Link>
                      </div>
                  </Menu.Item>
                  <Menu.Item key="salir-lider">
                      <div>
                        <Link to="/" className="estilo-nav"><FaSignOut /> Salir</Link>
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
