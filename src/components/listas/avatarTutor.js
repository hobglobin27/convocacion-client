
import React, { Component } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

class AvatarTutor extends Component {

  render(){
    return(
      <div>
        <Avatar size={200} src={this.props.foto.path} style={{border:"solid rgb(238, 96, 40) 5px"}}/>
      </div>         
    )
  }
}

export default AvatarTutor;