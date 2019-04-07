import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { connect } from "react-redux";
import * as actions from "../../actions";
import { CURRENT_HOME } from "../../actions/types"
import '../estilos/styles.css';
import { Button, AutoComplete } from 'antd';
import ListaTutores from "../listas/listaTutores"

let dataSourceMaterias = [];
let dataSourceDirecciones = [];

class Inicio extends Component{

  state={
    disabledAgregar: true,
    existeMateria: true,
    existeDireccion: true,
    materia: "",
    direccion: ""
  }

  componentWillMount() {
    this.props.getCountTutores();
    this.props.getListaMaterias();
    this.props.getListaDireccionesAlternas();
    this.homeSelected();    
  }

  handleSelectAutoComMateria = (event) => {
    this.setState({disabledAgregar: false});
    this.setState({existeMateria: true});
  }
  
  handleSelectAutoComDireccion = (event) => {
    this.setState({disabledAgregar: false});
    this.setState({existeDireccion: true});
  }

  handleChangeAutoComMateria = (event) => {
    this.setState({materia: event})
  }

  handleChangeAutoComDireccion = (event) => {
    this.setState({direccion: event})
  }

  handleClickBuscar = (event) => {
    let existeMateria = dataSourceMaterias.find(elemento => elemento === this.state.materia)
    if(existeMateria === undefined){
      this.setState({existeMateria: false})
    }

    let existeDireccion = dataSourceDirecciones.find(elemento => elemento === this.state.direccion)
    if(existeDireccion === undefined){
      this.setState({existeDireccion: false})
    }

    /*if(existeMateria !== undefined || existeDireccion !== undefined){
      let datosLista = this.state.data;
      if(!datosLista.find(elemento => elemento === this.state.materia)){
        datosLista.push(this.state.materia)
        this.setState({data: datosLista})
        this.setState({disabledAgregar: true});
        this.setState({materias: datosLista});
      }        
    }*/
  }

  homeSelected = () => this.props.setCurrentNav(CURRENT_HOME);
  
  render(){
    dataSourceMaterias = this.props.materias.map(materia => materia.descripcion)
    const longMaterias = dataSourceMaterias.length;
    dataSourceDirecciones = this.props.direccionesAlternas;
    const longDirecciones = dataSourceDirecciones.length;
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
                          onSelect={e => this.handleSelectAutoComMateria(e)}
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
                          onSelect={e => this.handleSelectAutoComDireccion(e)}
                          onChange={e => this.handleChangeAutoComDireccion(e)}
                        />
                      </div>
                    :
                      <div></div>
                  }
                  <div className="col-lg-2 col-md-2 col-sm-12 col-12">                  
                    {
                      this.state.disabledAgregar ?
                        <Button id="botonBuscar" size="large" onClick={e => this.handleClickBuscar(e)} type="primary" icon="search" disabled={true}>Buscar</Button>
                        :
                        <Button id="botonBuscar" size="large" onClick={e => this.handleClickBuscar(e)} type="primary" icon="search" disabled={false}>Buscar</Button>
                    }
                  </div>
                  {
                    !this.state.existeMateria && this.state.materia !== "" ?
                      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <p style={{color:"red"}}>La materia no existe en el catalogo!</p>
                      </div>
                    :
                      <div></div>
                  }               
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
                <p>Se parte de nuestra comunidad de profesionales</p>
              </div>
              <div className="barra-derecha">
                <div className="count-tutor-style">
                  <p className="count-tutortext-style">Tutores Registrados</p>
                  <p className="count-tutorcount-style">{this.props.counttutores}</p> 
                </div>                         
              </div>                                
            </div>
            <div className="cuerpo">
              <div className="textoInicio">Con <b style={{color: "rgb(238, 96, 40)"}}>vocacion</b></div> 
              <div className="textoInicio"> 
                <span>, se tu mejor version...</span>
              </div>
            </div>
            <section>
              <br/>
              <div className="container d-flex justify-content-center">
                <p className="barras">Nuestros tutores</p>
              </div>
              <br/>
              <ListaTutores/>
              <br/><br/>
            </section>      
          </div>          
        </section>
        <br/><br/> 
        <div>
          <br/>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <ReactPlayer
              url='https://res.cloudinary.com/dbwsjcrfc/video/upload/v1552011762/videos/educacion.mp4'
              className='video_background'
              playing
              loop
              muted
              width='100%'
              height='30vw'
            />            
          </div>        
        </div>
        <br/><br/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ counttutores: state.counttutores,
                                    materias: state.materias,
                                    direccionesAlternas: state.direccionesalternas });

export default connect(
	mapStateToProps,
	actions
)(Inicio);