import { Menu} from 'antd';
import React from "react";
import 'antd/dist/antd.css';
import './estilos/styles.css'
import FaUserPlus from 'react-icons/lib/fa/user-plus'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import MdHelp from 'react-icons/lib/md/help'


class NavBar extends React.Component {
  state = {
    current: '',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme='dark'
      >
        <Menu.Item key="user-plus">
          <FaUserPlus/> Registrate
        </Menu.Item>
        <Menu.Item key="sign-in">
          <FaSignIn/> Ingresa
        </Menu.Item>
        <Menu.Item key="help">
          <MdHelp /> Ayuda
        </Menu.Item>
        
      </Menu>
    );
  }
}

export default NavBar;
