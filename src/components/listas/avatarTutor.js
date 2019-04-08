import React, { Component,Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { Avatar, Modal, Button } from 'antd';
import { connect } from "react-redux";
import * as actions from "../../actions";
import {CURRENT_REGISTRO, CURRENT_LOGIN} from "../../actions/types"

class AvatarTutor extends Component {

  state = {
    dentro:false,
    visible: false,
    loading: false,
    registro: false,
    login: false
  }

  componentWillMount(){
    this.setState({registro: false})
    this.setState({login: false})
  }

  handleMouseEnter = (event) => {
    this.setState({dentro: true})
    console.log("Entra")
  }

  handleMouseLeave = (event) => {
    this.setState({dentro: false})
    console.log("Sale")
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  registroSelected = () => {
    this.setState({ visible: false });
    this.props.setCurrentNav(CURRENT_REGISTRO)
    this.setState({registro: true})
  }

  loginSelected = () => {
    this.setState({ visible: false });
    this.props.setCurrentNav(CURRENT_LOGIN)
    this.setState({login: true})
  }

  render(){
    const { visible, loading } = this.state;

    if(this.state.registro)
      return <Redirect to="/registro" />

    if(this.state.login)
      return <Redirect to="/login" />

    return(
      <Fragment>
      {        
        this.state.dentro ?
        <div className="row justify-content-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" style={{marginBottom:"15px"}}>
          <a><Avatar className="avatar-enter" onClick={e => this.showModal()} onMouseLeave={this.handleMouseLeave} key={this.props.index} size={200} style={{color: "#09182e", background: "rgb(236, 228, 223)", fontSize: "11px"}}>{this.props.nombre}</Avatar></a>
          <p className = "estilo-materias" style={{marginTop: "5px"}}>{this.props.materias[0]}</p>
          <p className = "estilo-materias">{this.props.materias[1]}</p>
          <p className = "estilo-materias">{this.props.materias[2]}</p>
        </div> 
        :
        <div className="row justify-content-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" style={{marginBottom:"15px"}}>
          <Avatar onMouseEnter={this.handleMouseEnter} key={this.props.index} size={200} src={this.props.fotos[0].path} style={{border:"solid rgb(238, 96, 40) 5px"}}/>
          <p className = "estilo-materias" style={{marginTop: "5px"}}>{this.props.materias[0]}</p>
          <p className = "estilo-materias">{this.props.materias[1]}</p>
          <p className = "estilo-materias">{this.props.materias[2]}</p>
        </div> 
      }
      {
        this.props.loggedIn !== null && this.props.loggedIn !== undefined ?
        <Modal
          visible={visible}
          title="Información del tutor..."
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cerrar</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Contactar
            </Button>,
          ]}
        >
          <span style={{color: "#09182e", fontSize: "30px"}}>{this.props.nombre}</span>
          <span style={{color: "#09182e", fontSize: "30px"}}> {this.props.paterno}</span>
          <span style={{color: "#09182e", fontSize: "30px"}}> {this.props.materno}</span>
          <div className="d-flex">
            <div className="row col-12">
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <p>Rol en convocacion:</p>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              {
                this.props.tipoUsuario === "T" ?
                  <p>Tutor</p>
                :
                  <p>Líder de grupo</p> 
              }
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <p>Direccion:</p>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                <p>{this.props.direccion}</p>
              </div>       
            </div>
          </div>          
        </Modal>
        :
        <Modal
          visible={visible}
          title="Información del tutor..."
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cerrar</Button>
          ]}
        >
          <span style={{color: "#09182e", fontSize: "30px"}}>{this.props.nombre}</span>
          <span style={{color: "#09182e", fontSize: "30px"}}> {this.props.paterno}</span>
          <span style={{color: "#09182e", fontSize: "30px"}}> {this.props.materno}</span>
          <div className="d-flex">
            <div className="row col-12">
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <p>Rol en convocacion:</p>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              {
                this.props.tipoUsuario === "T" ?
                  <p>Tutor</p>
                :
                  <p>Líder de grupo</p> 
              }
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <p>Direccion:</p>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                <p>{this.props.direccion}</p>
              </div>
              <div className="row col-12">
                <p className="col-12" style={{color: "rgb(238, 96, 40)"}}>Si deseas contactar a este tutor debes estar en sesión. </p>
                <p className="col-lg-6 col-md-6 col-sm-12 col-12">Deseas ingresar? <a href="#" onClick={this.loginSelected}> Click aqui</a></p>
                <p className="col-lg-6 col-md-6 col-sm-12 col-12" style={{paddingLeft: "0px"}}>No tienes cuenta? <a href="#" onClick={this.registroSelected}> Registrate!</a></p>
              </div>      
            </div>
          </div>          
        </Modal>
      }        
    </Fragment>         
    )
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

export default connect(
mapStateToProps,
actions
)(AvatarTutor);