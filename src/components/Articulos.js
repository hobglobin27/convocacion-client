import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Articulos extends Component {

  state = {
    titulo: ""
  }
  
  getPruebas = () =>{
    fetch(process.env.REACT_APP_API_URL + "/prueba",{
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json"
      }})
      .then(responseFromApi => {
        responseFromApi.json().then(json=>{
          this.setState({
            titulo: json.titulo
        })
      })
    })
  }

  componentDidMount() {
    this.getPruebas();
  }

  render(){
    return(
      <div>
        <h3>{this.state.titulo}</h3>
      </div>     
    )
  }
}

export default Articulos;