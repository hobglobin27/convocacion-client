class AuthService {

  signup = (username, password) =>{
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    return fetch(process.env.REACT_APP_API_URL + "/signup", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  login = (username, password) =>{
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    return fetch(process.env.REACT_APP_API_URL + "/login", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  logout = () =>{
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }

    return fetch(process.env.REACT_APP_API_URL + "/logout", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  updatePassword = (username, password) =>{
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    return fetch(process.env.REACT_APP_API_URL + "/updatepassword", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }

  recuperaUsuario = (username) =>{
    const options = {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    }

    return fetch(process.env.REACT_APP_API_URL + "/recuperaUsuario", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }
  
  loggedin = () => {
    return fetch(process.env.REACT_APP_API_URL + "/loggedin",{
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }})
      .then( response => response.json() )
      .catch( error => console.log(error) )
  };  
  
}

export default AuthService;