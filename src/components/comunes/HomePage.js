import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../estilos/styles.css';
import {CURRENT_HOME} from "../../actions/types"

class HomePage extends Component{

  render(){
    if(this.props.loggedIn == null || this.props.loggedIn === undefined){
      this.props.setCurrentNav(CURRENT_HOME);
      return <Redirect to="/" />
    }
    return(
      <div>
        <br/>
        <div>
          <p className="titulo-busqueda" style={{textAlign: "center"}}>Que gusto tenerte de vuelta {this.props.loggedIn.nombre}!!!</p>
          <br/>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <ReactPlayer
              url='https://res.cloudinary.com/dbwsjcrfc/video/upload/v1552011762/videos/educacion.mp4'
              className='video_background'
              playing
              loop
              muted
              width='100%'
              height='35vw'
            />            
          </div>        
        </div>
        <br/><br/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

export default connect(
	mapStateToProps,
	actions
)(HomePage);