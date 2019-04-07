
class ComunService {

  sendEmail = (email, subject, message) =>{
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        subject: subject,
        message: message
      })
    }

    return fetch(process.env.REACT_APP_API_URL + "/send-email", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  remueveImagen = (imagen, id) =>{
    //const idUsuario=id;
    const idUsuario = '5c99202d69d07315f42517da';
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: imagen.name
      })
    }

    return fetch(process.env.REACT_APP_API_URL + `/removeimage/${idUsuario}`, options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  actualizaPerfil = (perfil) =>{
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idUsuario: perfil.idUsuario,
        nombre: perfil.nombre,
        paterno: perfil.paterno,
        materno: perfil.materno,
        genero: perfil.genero,
        fotos: perfil.fotos,
        hangouts: perfil.hangouts,
        skype: perfil.skype,
        notificacionEmail: perfil.notificacionEmail,
        tipoUsuario: perfil.tipoUsuario,
        materias: perfil.materias,
        direccion: perfil.direccion,
        inmueble: perfil.inmueble,
        dataGrupo: perfil.dataGrupo,
        grupoLider: perfil.grupoLider,
        direccionesAlternas: perfil.direccionesAlternas
      })
    }

    return fetch(process.env.REACT_APP_API_URL + '/actualizaperfil', options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  /*getListaMaterias = () =>{
    const options = {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    }
  return fetch(process.env.REACT_APP_API_URL + `/materias`, options)
    .then( res => res.json())
    .catch( error => console.log(error) )
  }*/
}

export default ComunService;