import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import '../estilos/styles.css';

import ListaTutores from "../listas/listaTutores"

class Inicio extends Component{
  render(){
    return(
      <div className="container-fluid">
        <br/><br/>
        <section className="d-flex justify-content-center">
          <div className="d-flex flex-wrap justify-content-around  barra-principal">          
            <div className="barra-izquierda">
              <p>Se parte de nuestra comunidad de profesionales</p>
              <p style={{fontSize:"2.5rem", fontFamily:"Plok", color: "#09182e"}}><b>Con Vocacion</b></p>
            </div>
            <div className="barra-derecha">
              <p>Tutores Registrados</p>
              <p>Aqui va el numero de tutores</p>            
            </div>                        
          </div>
        </section>        
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
              height='40vw'
            />            
          </div> 
          <section className="posicion">
            <div className="cuerpo">
              <div className="textoInicio">Con <b>vocacion</b></div> 
              <div className="textoInicio"> 
                <span>, se tu mejor version...</span>
              </div>
            </div>
          </section>        
        </div>
        <section>
          <br/><br/>
          <div className="d-flex flex-wrap justify-content-center">
            <h1 className="barras">Nuestros tutores</h1>
          </div>
          <ListaTutores/>
        </section>
      </div>
    )
  }
}

export default Inicio;