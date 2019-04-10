import React, {Component, Fragment, } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../estilos/styles.css';
import { Card } from 'antd';

const { Meta } = Card;

class MiPerfil extends Component{

    
  render(){

    if(this.props.loggedIn === null || this.props.loggedIn === undefined)
    return <Redirect to="/" />
    return(
      <Fragment>
      <br/><br/>
      <div className="d-flex justify-content-center">
        <div className="barra-principal">   
          <br/><br/>
          <section className="justify-content-center">
            <div className="d-flex flex-wrap">         
                <div className="row col-lg-7 col-md-7 col-sm-12 col-12 justify-content-center">
                  <div className="col-8">                
                    <Card
                      cover={<img alt="example" src={this.props.loggedIn.fotos[0].path} />}
                    >
                    {
                      this.props.loggedIn === "T" ?
                        <Meta
                          title="Tutor"
                        />
                      :
                        <Meta
                          title="Líder de grupo"
                        />
                    }
                    </Card>
                  </div>
                  <br/>
                  <div className="nombre-perfil col-7">
                    <span>{this.props.loggedIn.nombre} </span>
                    <span>{this.props.loggedIn.paterno} </span>
                    <span>{this.props.loggedIn.materno} </span>
                  </div>
                </div>
              
                <div className="row barra-derecha-perfil col-lg-5 col-md-5 col-sm-12 col-12">
                  <div className="">
                    <p>Dirección:</p>
                    <p>{this.props.loggedIn.direccion}</p>
                    <p>Correo Electronico:</p>
                    <p>{this.props.loggedIn.username}</p>
                    <p>Género:</p>
                    <p>{this.props.loggedIn.genero}</p>
                    <div>
                      <p>Medios de contacto.</p>
                    </div>
                    <p>Hangouts:</p>
                    <p>{this.props.loggedIn.hangouts}</p>
                    <p>Skype:</p>
                    <p>{this.props.loggedIn.skype}</p>

                  </div>                         
                </div>                                
              </div>
              <div className="cuerpo">
                <div className="textoInicio">Con <span style={{color: "rgb(238, 96, 40)"}}>vocacion</span></div> 
                <div className="textoInicio"> 
                  <span>, se tu mejor version...</span>
                </div>
              </div>     
              </section>       
        </div>
      </div>
      <br/><br/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

export default connect(
	mapStateToProps,
	actions
)(MiPerfil);