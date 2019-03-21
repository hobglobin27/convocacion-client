class AuthService {

  signup = (username, password) =>{
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    return fetch("http://localhost:3001/api/signup", options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
  }
}

export default AuthService;