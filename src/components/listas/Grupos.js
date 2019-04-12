import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../estilos/styles.css';




class Grupos extends Component{

  componentWillMount() {
   
  }

  
  render(){

    if(this.props.loggedIn === null || this.props.loggedIn === undefined)
    return <Redirect to="/" />

    const gruposPendientes = this.props.grupospendientes;
    const gruposAsignados = this.props.gruposasignados;

    console.log("Estos son los grupos pendientes", this.props.grupospendientes);
    console.log("Estos son los grupos asignados", this.props.gruposasignados);


    return(
      <div>
        Hola grupo
      </div>
    )
  }
}

const mapStateToProps = state => ({ materias: state.materias,
                                    loggedIn: state.loggedIn,
                                    gruposasignados: state.grupoasignados,
                                    grupospendientes: state.grupopendientes});

export default connect(
	mapStateToProps,
	actions
)(Grupos);