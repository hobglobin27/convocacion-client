
import React, { Component } from 'react';
import { Avatar, Rate } from 'antd';
import { Link } from 'react-router-dom';

class AvatarTutor extends Component {

  state = {
    dentro:false
  }

  handleMouseEnter = (event) => {
    this.setState({dentro: true})
    console.log("Entra")
  }

  handleMouseLeave = (event) => {
    this.setState({dentro: false})
    console.log("Sale")
  }

  render(){

    if(this.state.dentro)
      return(
        <div className="row justify-content-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
          <Avatar className="avatar-enter" onMouseLeave={this.handleMouseLeave} key={this.props.index} size={200} style={{color: "#09182e", background: "rgb(236, 228, 223)"}}>{this.props.nombre}</Avatar>
        </div> 
        )    
    return(
      <div className="row justify-content-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
        <Avatar onMouseEnter={this.handleMouseEnter} key={this.props.index} size={200} src={this.props.foto.path} style={{border:"solid rgb(238, 96, 40) 5px"}}/>
      </div>         
    )
  }
}

export default AvatarTutor;