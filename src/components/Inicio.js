import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import './estilos/styles.css';

class Inicio extends Component{
  render(){
    return(
      <div className="container-fluid">
        <div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <ReactPlayer
              url='https://res.cloudinary.com/dbwsjcrfc/video/upload/v1552011762/videos/educacion.mp4'
              className='video_background'
              playing
              loop
              width='100%'
              height='47.5vw'
            />            
          </div> 
          <section className="posicion">
            <div className="cuerpo">
              <div className="textoInicio">Con <b>vocación</b></div> 
              <div className="textoInicio"> 
                <span>, se tu mejor version...</span>
              </div>
            </div>
          </section>        
        </div>
      </div>
    )
  }
}

export default Inicio;