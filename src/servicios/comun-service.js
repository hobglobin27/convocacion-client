
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
}

export default ComunService;