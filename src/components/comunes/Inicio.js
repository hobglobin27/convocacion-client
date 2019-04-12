import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { CURRENT_HOME, GET_TOP_TUTORES, GET_MATERIAS_TUTOR, GET_DIRECCION_TUTOR, GET_MATERIA_DIRECCION_TUTOR, CURRENT_INICIO, CURRENT_ASIGNACIONES, CURRENT_COMPLETA_PERFIL } from "../../actions/types";
import '../estilos/styles.css';
import { Button, AutoComplete} from 'antd';
import ListaTutores from "../listas/listaTutores";

let dataSourceMaterias = [];
let dataSourceDirecciones = [];

class Inicio extends Component{

  state={
    disabledAgregar: true,
    existeMateria: false,
    existeDireccion: false,
    materia: "",
    direccion: ""
  }

  componentWillMount() {
    this.props.getCountTutores();
    this.props.getListaMaterias();
    this.props.getListaDireccionesAlternas();
    if(this.props.loggedIn === null || this.props.loggedIn === undefined)
      this.homeSelected();
    this.props.getListaTutores(GET_TOP_TUTORES);
  }

  handleChangeAutoComMateria = (event) => {
    /*if(event === "")
      this.setState({existeMateria: false})
    else
      this.setState({existeMateria: true})
    */
    this.setState({materia: event})
  }

  handleChangeAutoComDireccion = (event) => {
    /*if(event === "")
      this.setState({existeDireccion: false})
    else
      this.setState({existeDireccion: true})
*/
    this.setState({direccion: event})
  }

  handleClickBuscar = (event) => {

    if(this.state.materia === "" && this.state.direccion === ""){
      this.setState({existeMateria: false, existeDireccion: false})
      this.props.getListaTutores(GET_TOP_TUTORES);
      return;  
    }

    if(this.state.materia !== "" && this.state.direccion === ""){
      this.setState({existeMateria: true, existeDireccion: false})
      this.props.getListaTutores(GET_MATERIAS_TUTOR, this.state.materia, this.state.direccion);
      return;  
    }

    if(this.state.materia === "" && this.state.direccion !== ""){
      this.setState({existeMateria: false, existeDireccion: true})
      this.props.getListaTutores(GET_DIRECCION_TUTOR, this.state.materia, this.state.direccion);
      return;  
    }

    if(this.state.materia !== "" && this.state.direccion !== ""){
      this.setState({existeMateria: true, existeDireccion: true})
      this.props.getListaTutores(GET_MATERIA_DIRECCION_TUTOR, this.state.materia, this.state.direccion);
      return;  
    }    
  }

  homeSelected = () => this.props.setCurrentNav(CURRENT_INICIO);
  
  render(){
    dataSourceMaterias = this.props.materias.map(materia => materia.descripcion)
    const longMaterias = dataSourceMaterias.length;
    dataSourceDirecciones = this.props.direccionesAlternas;
    const longDirecciones = dataSourceDirecciones.length;

    if(this.props.loggedIn !== null && this.props.loggedIn !== undefined &&
      this.props.loggedIn.tipoUsuario === "T"){
      this.props.setCurrentNav(CURRENT_HOME);
      return <Redirect to="/homepage" />
    }

    if(this.props.loggedIn !== null && this.props.loggedIn !== undefined &&
      this.props.loggedIn.tipoUsuario === ""){
      this.props.setCurrentNav(CURRENT_COMPLETA_PERFIL);
      return <Redirect to="/perfil" />
    }

    return(
      <div>
        <br/>        
        <section className="d-flex justify-content-center">
          <div className="barra-busqueda">
            <div className="d-flex flex-wrap justify-content-left">             
              <div className="col-12">
                <p className="titulo-busqueda">Busqueda de tutores.</p>
              </div>              
                <div className=" row col-12">
                  {
                    longMaterias !==0 ?             
                      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <AutoComplete
                          name="materia"
                          style={{ width: "100%", fontSize:"17px", margin: "3px" }}
                          dataSource={dataSourceMaterias}
                          placeholder="Que materia deseas?"
                          defaultValue=""
                          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                          onChange={e => this.handleChangeAutoComMateria(e)}
                        />
                      </div>
                    :
                      <div></div>
                  }
                  {
                    longDirecciones !==0 ?  
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AutoComplete
                          name="direccion"
                          style={{ width: "100%", fontSize:"17px", margin: "3px" }}
                          dataSource={dataSourceDirecciones}
                          placeholder="En que localidad te ubicas?"
                          defaultValue=""
                          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                          onChange={e => this.handleChangeAutoComDireccion(e)}
                        />
                      </div>
                    :
                      <div></div>
                  }
                  <div className="col-lg-2 col-md-2 col-sm-12 col-12">              
                    <Button id="botonBuscar" size="large" onClick={e => this.handleClickBuscar(e)} type="primary" icon="search">Buscar</Button>
                  </div>                               
                </div>             
              <br/><br/>
            </div>      
          </div>          
        </section>
        <br/>
        <section className="d-flex justify-content-center">
          <div className="barra-principal">
            <div className="d-flex flex-wrap justify-content-around">          
              <div className="barra-izquierda">
                <p style={{marginBottom: "10px"}}>Se parte de nuestra comunidad de profesionales</p>
              </div>
              <div className="barra-derecha">
                <div className="count-tutor-style">
                  <p className="count-tutortext-style">Tutores Registrados</p>
                  <p className="count-tutorcount-style" style={{marginBottom: "10px"}}>{this.props.counttutores}</p> 
                </div>                         
              </div>                                
            </div>
            <div className="cuerpo">
            {
              !this.state.existeDireccion && !this.state.existeMateria ?
                <Fragment>
                  <div className="textoInicio">Con <span style={{color: "rgb(238, 96, 40)"}}>vocacion</span></div> 
                  <div className="textoInicio"> 
                    <span>, se tu mejor version...</span>
                  </div>
                </Fragment>
              :
                <Fragment>
                  {
                  this.state.existeDireccion || this.state.existeMateria ?
                  <Fragment></Fragment>
                  :
                  <Fragment>
                    <div className="textoInicio">Con <span style={{color: "rgb(238, 96, 40)"}}>vocacion</span></div> 
                    <div className="textoInicio"> 
                      <span>, se tu mejor version...</span>
                    </div>
                 </Fragment>
                  }
                </Fragment>
            }
            </div>
            <section>
              <br/>
              <div className="container d-flex justify-content-center">
                {
                  !this.state.existeDireccion && !this.state.existeMateria ?
                    <p className="barras">Nuestros tutores</p>
                  :
                    <Fragment>
                      {
                      this.state.existeDireccion || this.state.existeMateria ?
                        <Fragment>
                          <p className="barras-resultado">Resultados de tu busqueda:</p>
                        </Fragment>
                      :
                        <p className="barras">Nuestros tutores</p>
                      }
                    </Fragment>
                }
              </div>
              <br/>
              <ListaTutores/>
              <br/><br/>
            </section>      
          </div>          
        </section>
        <br/><br/>
        <br/><br/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ counttutores: state.counttutores,
                                    materias: state.materias,
                                    direccionesAlternas: state.direccionesalternas,
                                    loggedIn: state.loggedIn });

export default connect(
	mapStateToProps,
	actions
)(Inicio);