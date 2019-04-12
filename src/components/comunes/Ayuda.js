import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../estilos/styles.css';

class Ayuda extends Component{

  render(){
    
    return(
      <div className="d-flex container flex-wrap justify-content-center">
        <div className="row col-12 titulo-ayuda">
          <p>Esto es lo que debes de saber acerca de <b>ConVocacion</b></p>
        </div>
        
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554956132/imagenes/tutor.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">Para registrarme como tutor, ¿tengo que pagar?</p>
              <p>Para ser tutor de <b>ConVocacion</b> no se tiene que pagar nada. Si aun no te has dado de
                 alta,  <Link to="/registro">click aquí.</Link></p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
          <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">¿En qué zonas puedo dar tutorías?</p>
              <p><b>ConVocacion</b> está diseñada para que puedas dar tutorías cerca de la dirección que 
                ingresaste al momento de tu registro.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959083/imagenes/elmundo.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959993/imagenes/cobrar.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">¿Puedo cobrar  por las tutorías?</p>
              <p><b>ConVocacion</b> es una plataforma para ayudar a personas que no tienen los recursos suficientes para 
                pagar por clases de nivelación académica. En este caso, todos los tutores dan un servicio <b className="titulo-pregunta">altruista</b> para poner su 
                granito de arena con la comunidad en donde se desarrollan. <b>ConVocacion</b> agradece tu ayuda a 
                nombre de los alumnos que apoyas.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
          <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">¿Cómo se forman los grupos de alumnos?</p>
              <p>Los grupos se dan de alta a través de un Lider de Grupo.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959994/imagenes/grupos.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959993/imagenes/cantidad.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">¿Cuántos alumnos puede tener un grupo?</p>
              <p>La cantidad de alumnos corresponde a las necesidades de quien solicita las tutorías.</p>
            </div>
          </div>
        </div>        
      </div>      
    )
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

export default connect(
	mapStateToProps,
	actions
)(Ayuda);