import {GET_TOP_TUTORES,
        GET_COUNT_TUTORES,
        GET_USER,
        GET_MATERIAS,
        GET_MATERIAS_TUTOR,
        GET_DIRECCION_TUTOR,
        GET_MATERIA_DIRECCION_TUTOR,
        GET_DIRECCIONES_ALTERNAS,
        GET_GRUPOS_ASIGNADOS,
        GET_GRUPOS_PENDIENTES} from "./types"

export const setCurrentNav = accion => dispatch => dispatch({ type: accion});

export const getUser = response => dispatch => dispatch({ type: GET_USER, payload: response});

export const getListaTutores = (tipoAccion, materia, direccion) => async dispatch => {
  let response="";
  let results=[];
  switch(tipoAccion){
    case GET_TOP_TUTORES:
      response = await fetch(process.env.REACT_APP_API_URL + "/toptutores",{
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }});
      results = await response.json();
      dispatch({ type: GET_TOP_TUTORES, payload: results }); 
    break;
    case GET_MATERIAS_TUTOR:
      response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/materia?materia=${materia}`,{
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }});
      results = await response.json();
      dispatch({ type: GET_MATERIAS_TUTOR, payload: results });
    break;
    case GET_DIRECCION_TUTOR:
      response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/direccion?direccion=${direccion}`,{
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }});
      results = await response.json();
      dispatch({ type: GET_MATERIAS_TUTOR, payload: results });
    break;
    case GET_MATERIA_DIRECCION_TUTOR:
      response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/direccionmateria?direccion=${direccion}&materia=${materia}`,{
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }});
      results = await response.json();
      dispatch({ type: GET_MATERIAS_TUTOR, payload: results });
    break;
    default:
      break;
  }
};


export const getListaTutoresMateria = (materia) => async dispatch => {  
  const response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/materia?materia=${materia}`,{
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }});
        console.log("Entra tutores materias")
  const results = await response.json();
      console.log("Este es result: ", results)
      dispatch({ type: GET_MATERIAS_TUTOR, payload: results });   
};



export const getCountTutores = () => async dispatch => {
	const response = await fetch(process.env.REACT_APP_API_URL + "/totaltutores",{
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }});
  const results = await response.json();
	dispatch({ type: GET_COUNT_TUTORES, payload: results });
};

export const getListaMaterias = () => async dispatch => {
	const response = await fetch(process.env.REACT_APP_API_URL + "/materias",{
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }});
  const results = await response.json();
	dispatch({ type: GET_MATERIAS, payload: results });
};

export const getListaDireccionesAlternas = () => async dispatch => {
	const response = await fetch(process.env.REACT_APP_API_URL + "/direccionesalternas",{
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }});
  const results = await response.json();
	dispatch({ type: GET_DIRECCIONES_ALTERNAS, payload: results });
};

export const getListaAsignaciones = (idUsuario) => async dispatch => {
  let response="";
  let results=[];
  response = await fetch(process.env.REACT_APP_API_URL + `/gruposasignados/${idUsuario}`,{
  mode: 'cors',
  headers: {
    "Content-Type": "application/json"
  }});
  results = await response.json();
  dispatch({ type: GET_GRUPOS_ASIGNADOS, payload: results });  
};

export const getListaPendientes = (idUsuario) => async dispatch => {
  let response="";
  let results=[];  
  response = await fetch(process.env.REACT_APP_API_URL + `/grupospendientes/${idUsuario}`,{
  mode: 'cors',
  headers: {
    "Content-Type": "application/json"
  }});
  results = await response.json();
  dispatch({ type: GET_GRUPOS_PENDIENTES, payload: results });
};


