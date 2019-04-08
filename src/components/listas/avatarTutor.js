import React, { Component,Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { Avatar, Modal, Button, message } from 'antd';
import { connect } from "react-redux";
import * as actions from "../../actions";
import ComunService from "../../servicios/comun-service"
import {CURRENT_REGISTRO, CURRENT_LOGIN} from "../../actions/types"

const comunService = new ComunService();

class AvatarTutor extends Component {

  state = {
    dentro:false,
    visible: false,
    loading: false,
    registro: false,
    login: false,
    errorCorreo: false,
    errorMessage: "",
    correoSuccess: false 
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
    const emailTutor = this.props.username;
    const subjectTutor = `ConVocacion. ${this.props.loggedIn.nombre} requiere de tu apoyo`
    const messageTutor = `<div style="text-align: center;"><img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1552166212/imagenes/logo2.png"></img></div><br>
    <div><b>Hola ${this.props.nombre}.</b></div><br>
    <div>Haz sido seleccionado por uno de nuestros líderes de grupo.</div><br>
    <div>Estos son los datos de quien puede ser tu proximo contacto para que puedas aportar al desarrollo de nuestro niños y adolecentes: </div><br>
    <div><b>${this.props.loggedIn.nombre} ${this.props.loggedIn.paterno} ${this.props.loggedIn.materno}</b></div>
    <div><b>Email: ${this.props.loggedIn.username}</b></div>
    <div><b>Direccion: ${this.props.loggedIn.direccion}</b></div><br>
    <div>Por favor contactactalo por este medio o a traves de la aplicacion.</div><br><br>
    <div>Gracias por tu ayuda.</div>
    <div>El equipo de ConVocacion.</div>`;

    const emailLider = this.props.loggedIn.username;
    const subjectLider = "Convocacion. Tu correo ha sido enviado al tutor seleccionado"
    const messageLider = `<div style="text-align: center;" ><img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1552166212/imagenes/logo2.png"></img></div><br>
    <div><b>En hora buena ${this.props.loggedIn.nombre}.</b></div><br>
    <div>En breve seras contactado por <b>${this.props.nombre}</b> quien puede ser el proximo tutor(a) de tu grupo.</div><br><br>
    <div>Espera noticias.</div>
    <div>El equipo de ConVocacion.`;
    
     console.log("Este es el email", emailTutor)       
      comunService.sendEmail(emailTutor, subjectTutor, messageTutor)
      .then( response => {        
        comunService.sendEmail(emailLider, subjectLider, messageLider)
        .then( response => {
          const errorMessage = "";     
          this.setState({errorMessage});         
        })
        .catch( error => console.log(error) )        
      })
      .catch( error => console.log(error) )

      this.setState({ loading: true});

      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 2000);
      this.setState({correoSuccess: true});   
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

    if(this.state.correoSuccess){
      message.success('El correo se ha enviado correctamente', 3);
      this.setState({correoSuccess: false})
    }

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
                <p className="col-12" style={{color: "rgb(238, 96, 40)", fontSize: "15.6px"}}>Eres lider de grupo? Debes estar en sesión para poder contactar a este tutor. </p>
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