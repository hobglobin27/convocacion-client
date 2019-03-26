//Imports para React
import { Menu} from 'antd';
import React from "react";
import { Link } from 'react-router-dom';

//Imports Iconos
import FaUserPlus from 'react-icons/lib/fa/user-plus'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import MdHelp from 'react-icons/lib/md/help'
import FaGraduationCap from 'react-icons/lib/fa/graduation-cap'
import FaGroup from 'react-icons/lib/fa/group'

//Imports Estilos
import 'antd/dist/antd.css';
import '../estilos/styles.css'

import { connect } from "react-redux";
import * as actions from "../../actions";
import { CURRENT_REGISTRO, CURRENT_LOGIN } from '../../actions/types';

class NavBar extends React.Component {

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
      <Menu style={{fontSize: "110%", marginTop: "0.6%", color: "rgb(236, 228, 223)"}}
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
    );
  }
}

const mapStateToProps = state => ({ current: state.current });

export default connect(
  mapStateToProps,
  actions
)(NavBar);
