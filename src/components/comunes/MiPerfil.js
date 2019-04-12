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

    let materias = [];
    let grupos = [];

    if(this.props.loggedIn.materias !== null && this.props.loggedIn.materias !== undefined)
      materias = this.props.loggedIn.materias.map((materia,index) => {
        return <li key={index}>{materia}</li>})

    if(this.props.loggedIn.grupos !== null && this.props.loggedIn.grupos !== undefined)
      grupos = this.props.loggedIn.grupos.map((grupo,index) => {
        return <li key={index}>{grupo}</li>})
    
    const longGrupos = grupos.length;

    return(
      <Fragment>
      <br/><br/>
      <div className="titulo-perfil">
        <p>Estos son los datos de tu perfil:</p>               
      </div> 
      <div className="d-flex justify-content-center">    
        <div className="barra-principal">   
          <br/><br/>
          <section className="justify-content-center">
            <div className="d-flex flex-wrap">         
                <div className="row col-lg-8 col-md-8 col-sm-12 col-12 justify-content-center">
                  <div className="col-7">                
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
                  <div className="nombre-perfil col-9">
                    <span>{this.props.loggedIn.nombre} </span>
                    <span>{this.props.loggedIn.paterno} </span>
                    <span>{this.props.loggedIn.materno} </span>
                  </div>
                </div>
              
                <div className="row barra-derecha-perfil col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="seccion-detalle">
                    <p className="estilo-detalle-perfil">Dirección:</p>
                    <p className="descripciones">{this.props.loggedIn.direccion}</p>
                    <p className="estilo-detalle-perfil">Correo Electronico:</p>
                    <p className="descripciones">{this.props.loggedIn.username}</p>
                    <p className="estilo-detalle-perfil">Género:</p>

                    {
                      this.props.loggedIn.genero === "H" ? 
                        <p className="descripciones">Hombre</p>
                      :
                        <p className="descripciones">Mujer</p>
                   }
                    
                    <div>
                      <p className="estilo-detalle-perfil">Medios de contacto.</p>
                    </div>
                    <span className="descripciones">Hangouts:</span>
                    {
                      this.props.loggedIn.hangouts !== null && this.props.loggedIn.hangouts !== undefined
                        && this.props.loggedIn.hangouts !== "" ?
                        <span>{this.props.loggedIn.hangouts}</span>
                      :
                        <span>No proporcionado</span>
                    }
                    <br/>
                    <span className="descripciones">Skype: </span>
                    {
                      this.props.loggedIn.skype !== null && this.props.loggedIn.skype !== undefined
                        && this.props.loggedIn.skype !== "" ?
                        <span>{this.props.loggedIn.skype}</span>
                      :
                        <span>No proporcionado</span>
                    }
                    <br/><br/>
                    {
                      this.props.loggedIn.tipoUsuario ==="T" ?
                      <Fragment>
                        <div>
                          <p className="estilo-detalle-perfil">Materias.</p>
                        </div>                       
                        <ul className="descripciones">
                          {materias}
                        </ul>
                      </Fragment>
                      :
                      <div></div>
                    }
                    {
                      this.props.loggedIn.tipoUsuario ==="L" ?
                      <Fragment>
                        <div>
                          <p className="estilo-detalle-perfil">Grupos:</p>
                        </div>
                        {
                          longGrupos !== 0 ?
                            <ul className="descripciones">
                              {grupos}
                            </ul>
                          :
                            <p className="descripciones">Sin grupos asignados.</p>
                        }
                      </Fragment>
                      :
                      <div></div>
                    }
                    

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

const mapStateToProps = state => ({ loggedIn: state.loggedIn,
                                    materias: state.materias });

export default connect(
	mapStateToProps,
	actions
)(MiPerfil);