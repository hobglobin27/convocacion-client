import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../estilos/styles.css';

class SerLider extends Component{

  render(){
    
    return(
      <div className="d-flex container flex-wrap justify-content-center">

        <div className="row col-12 titulo-ayuda">
          <p>Líderes de grupo.</p>
        </div>
        <div className="row col-12 titulo-pregunta">
          <p><span style={{fontSize:"20px"}}>Liderar grupos y equipos no es tarea fácil y menos cuando se trata de niños o adolecentes. </span>
            Por muchas dotes de liderazgo que tengamos, podemos cometer errores si pasamos por alto 
            algunos aspectos esenciales.</p> 
            <p style={{fontSize:"20px"}}>Siempre debemos considerar los siguentes lineamientos:</p>
        </div>
        
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959993/imagenes/comunicacion.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">1. Apostar por una comunicación eficaz.</p>
              <p>Para comunicar efectivamente tenemos que observar al grupo que coordinamos, saber 
                gestionar las emociones y escuchar. Una vez hecho esto, debemos ser claros en nuestras 
                indicaciones.</p>
                <p><b>Las indirectas o los dobles sentidos no son características de un buen líder de 
                  grupo.</b> Un grupo de estudio necesita directrices claras y transparentes. 
                  Solamente así, sabrán lo que tienen que hacer. En caso contrario, los resultados no 
                  serán demasiado buenos.</p>
                <p>Cuando comunicamos, no solo debemos fijarnos en lo que decimos a través de las 
                  palabras, sino también a través de los gestos. Recordemos que un 70% es comunicación 
                  no verbal, mientras que la oralidad tiene un 30%.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">2. No apelar a la autoridad.</p>
              <p>Apelar a la autoridad es algo que solemos ver en nuestro hogar desde muy pequeños con 
                frases por parte como “porque soy tu padre” o “porque lo digo yo y punto”. <b>Este es un 
                error en el que no podemos caer en el momento de liderar grupos de estudio.</b></p>
              <p>El motivo está en que el grupo no ve como guia a quien ejerce como tal, si se utiliza 
                la autoridad. Ese puesto hay que ganárselo porque no solo es una etiqueta. <b>Apelar a 
                la autoridad nos restará credibilidad y esto afectará al grupo</b>, así como a las metas y 
                objetivos que nos hayamos propuesto.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959993/imagenes/autoridad.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959995/imagenes/objetivos.jpg" alt=""/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">3. Establecer metas y objetivos periódicos.</p>
              <p><b>Cuando somos líderes de un grupo, en el momento en el que no hay metas u objetivos 
                este se estanca.</b> Esta situación puede llegar a ser muy nociva, ya que lleva a perder 
                motivación y a no saber hacia dónde nos dirigimos.</p>
              <p><b>Si un grupo o equipo no avanza, nuestro objetivo estara lejos de conseguirse.</b></p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center barras-ayuda">
          <div className="row col-12 flex-wrap">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <p className="titulo-pregunta">4. Resolver conflictos es esencial.</p>
              <p><b>Para liderar grupos es necesario enfrentar los conflictos que aparezcan.</b> De ahí que sea importante no verlos 
                como algo negativo, sino como oportunidades para aprender y hacer las cosas de otro modo. 
                Es importante tener en cuenta que <b>los grupos están formados por niños o adolecentes 
                completamente diferentes.</b> Esto es enriquecedor, siempre y cuando se dirija 
                de una buena manera. La resolución de conflictos fortalecerá al grupo y le permitirá 
                llegar a los objetivos propuestos.</p>
              <p>Los conflictos siempre van a estar ahí. Si no los resolvemos de manera adecuada, 
                saldrán en el momento más inesperado echando por tierra todo lo conseguido hasta el 
                momento.</p>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 estilo-imagenes">
              <img src="https://res.cloudinary.com/dbwsjcrfc/image/upload/v1554959994/imagenes/conflictos.jpg" alt=""/>
            </div>              
          </div>
        </div>

        <div className="row col-12 titulo-ayuda">
          <p><b>En resúmen.</b></p>
        </div> 

        <div className="d-flex justify-content-center barras-ayuda">
          <div className="col-12">            
            <p>Liderar grupos de estudio no es algo sencillo, aunque con 
            esfuerzo y ganas, los consejos mencionados nos permitirán llevar al grupo a conseguir 
            sus objetivos de mejorar en sus estudios. Lo ideal es que una vez al mes, teniendo en 
            cuenta los consejos comentados, analicemos cómo está la situación y hacernos los siguientes 
            cuestionamientos:</p>
            <p className="titulo-pregunta">¿No estamos acercando a los objetivos planteados? 
            ¿Hay algún conflicto sin resolver? ¿Falla algo en la comunicación?</p> 
            <p>Responder a estas y otras preguntas nos ayudará a mejorar las condiciones.</p>                     
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
)(SerLider);