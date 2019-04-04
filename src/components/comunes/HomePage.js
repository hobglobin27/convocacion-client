import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { CURRENT_HOME } from "../../actions/types"
import '../estilos/styles.css';

class HomePage extends Component{

  componentWillMount() {
    this.props.getCountTutores();
    this.homeSelected();
    
  }

  homeSelected = () => this.props.setCurrentNav(CURRENT_HOME);
  
  render(){
    return(
      <div>
        Este es el home del usuario
      </div>
    )
  }
}

const mapStateToProps = state => ({ counttutores: state.counttutores });

export default connect(
	mapStateToProps,
	actions
)(HomePage);