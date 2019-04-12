import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../estilos/styles.css';

class SerTutor extends Component{

  render(){
    
    return(
      <div className="d-flex container flex-wrap justify-content-center">

        <div className="row col-12 titulo-ayuda">
          <p>Tienes <b>Vocación de Servir?</b> Se parte de <b>ConVocacion</b> dando tutorías.</p>
        </div>
        
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959995/imagenes/preparate.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">1. Prepárate para enseñar.</p>
              <p><b>Identifica en qué eres experto.</b> No cabe duda de que ya sabes en qué lo eres, 
              pero si no o si eres experto en muchas cosas, concéntrate en tu disciplina o tema 
              favorito.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">2. Gana reconocimiento. </p>
              <p>Ademas del reconocimiento que puedes obtener en <b>ConVocacion</b> te puede ayudar el estar 
                activamente involucrado en la ciencia o la disciplina que representas, ya sea con un 
                título o con otra documentación oficial (o ambos).</p>
              <p>Participa en foros en línea y haz trabajo voluntario como orador invitado en seminarios 
                y otras congregaciones profesionales.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959995/imagenes/reconicimiento.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1555000869/imagenes/clasesninios.jpg" alt="" style={{width:"85%"}}/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">3. Se impecable en tu comportamiento.</p>
              <p>En <b>ConVocacion</b> seras  tutor de niños y adolecentes por lo que hay reglas y leyes al 
                respecto que debes de cumplir dependiendo del área en la que apoyes.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">4. Entiende el plan de estudios.</p>
              <p>Asegúrate de saber y entender el plan de estudios o el temario que enseñarás, de esta 
                manera puedes maximizar la efectividad de tu plan de lecciones.</p>
              <p>Prepara tus lecciones y practícalas. Debes ser muy organizado desde el inicio. 
                Es mejor estar excesivamente preparado que quedarte sin ideas en la mitad de 
                una sesión.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959994/imagenes/entiende.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959994/imagenes/interesante.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">5. Haz que tus lecciones sean interesantes e interactivas.</p>
              <p>En una buena lección los estudiantes harán gran parte del trabajo. Debes guiarlos a 
                hacer descubrimientos.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">6. Escucha a tus estudiantes.</p>
              <p>Responde a lo que no saben o no entienden y prepara las futuras lecciones para dar 
                cuenta de las deficiencias.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959994/imagenes/escuchar.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="row col-12 titulo-ayuda">
          <p><b>Consejos.</b></p>
        </div>        
        
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="col-12">            
            <p className="titulo-pregunta"><b>- </b>Sé amable con tus estudiantes.</p>
            <p className="titulo-pregunta"><b>- </b>Trata de mantener a los líderes de grupo informados sobre los 
            progresos. Nunca infles las habilidades de los estudiantes, pero al mismo tiempo anímalos. 
            "Su ritmo es mucho mejor ahora", es mejor que "Toca como un pianista de concierto", cuando 
            eso no es cierto.</p>
            <p className="titulo-pregunta"><b>- </b>Lee varias técnicas de enseñanza y básate en algunas en las 
            que seas bueno. Eso será muy útil.</p>
            <p className="titulo-pregunta"><b>- </b>Sé amable con tus estudiantes. No seas un tutor aburrido, tu 
            estudiante tal vez no preste atención a lo que dices y podrías empeorar las cosas.</p>
            <p className="titulo-pregunta"><b>- </b>Aprende una manera divertida: haz dibujos de lo que describes 
            y cuando leas haz diferentes sonidos, lo cual hará reír a tu estudiante.</p>
            <p className="titulo-pregunta"><b>- </b>Toma pruebas periódicas para mantener a tus estudiantes 
            activos. Esto puede ayudar en el futuro cercano.</p>
            <p className="titulo-pregunta"><b>- </b>Asegúrate de encontrar puntos en común con tu estudiante.</p>
            <p className="titulo-pregunta"><b>- </b>Haz tus lecciones más interesantes usando presentaciones de 
            Power Point, proyectos divertidos, etc. Haz el aprendizaje divertido; de otra manera, 
            los niños no aprenderán nada.</p>
          </div>
        </div>

        <div className="row col-12 titulo-ayuda">
          <p><b>Advertencias.</b></p>
        </div> 

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="col-12 text-danger">            
            <p className="titulo-pregunta"><b>- </b>Evita cualquier situación que te ponga a ti o a tus estudiantes 
            en peligro. Reúnanse en lugares públicos o en la casa del estudiante, siempre y cuando un 
            padre o líder de grupo se encuentre en casa. Siempre asegúrate que algún otro adulto esté 
            presente.</p>
            <p className="titulo-pregunta"><b>- </b>No te involucres emocionalmente con tus estudiantes fuera de 
            emocionarte por sus logros académicos.</p>
            <p className="titulo-pregunta"><b>- </b>Arreglar los hechos para parecer inteligente puede parecer 
            una buena solución al principio, pero te traerá problemas después. ¡Sé honesto!</p>                      
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
)(SerTutor);