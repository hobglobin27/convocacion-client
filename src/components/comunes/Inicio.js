import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { connect } from "react-redux";
import * as actions from "../../actions";
import { CURRENT_HOME } from "../../actions/types"
import '../estilos/styles.css';

import ListaTutores from "../listas/listaTutores"

class Inicio extends Component{

  componentWillMount() {
    this.props.getCountTutores();
    this.homeSelected();
    
  }

  homeSelected = () => this.props.setCurrentNav(CURRENT_HOME);
  
  render(){
    return(
      <div>
        <br/><br/>
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
                <h1 className="barras">Nuestros tutores</h1>
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

const mapStateToProps = state => ({ counttutores: state.counttutores });

export default connect(
	mapStateToProps,
	actions
)(Inicio);