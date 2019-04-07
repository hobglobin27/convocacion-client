import {GET_TOP_TUTORES,
        GET_COUNT_TUTORES,
        GET_USER,
        GET_MATERIAS,
        GET_MATERIAS_TUTOR,
        GET_DIRECCION_TUTOR,
        GET_MATERIA_DIRECCION_TUTOR,
        GET_DIRECCIONES_ALTERNAS} from "./types"

export const setCurrentNav = accion => dispatch => dispatch({ type: accion});

export const getUser = response => dispatch => dispatch({ type: GET_USER, payload: response});

export const getListaTutores = (tipoBusqueda, materia, direccion) => async dispatch => {
  let response;
  let results;
  switch(tipoBusqueda){
    case GET_TOP_TUTORES:
      response = await fetch(process.env.REACT_APP_API_URL + "/toptutores",{
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }});
      results = await response.json();
      dispatch({ type: tipoBusqueda, payload: results });
    break;
    case GET_MATERIAS_TUTOR:
      response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/materia?materia=${materia}`,{
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }});
      results = await response.json();
      dispatch({ type: tipoBusqueda, payload: results });
    break;
    case GET_DIRECCION_TUTOR:
      response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/direccion?direccion=${direccion}`,{
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }});
      results = await response.json();
      dispatch({ type: tipoBusqueda, payload: results });
    break;
    case GET_MATERIA_DIRECCION_TUTOR:
      response = await fetch(process.env.REACT_APP_API_URL + `/buscatutores/direccionmateria?materia=${materia}&direccion=${direccion}`,{
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }});
      results = await response.json();
      dispatch({ type: tipoBusqueda, payload: results });
    break;
    default:
    break;
  }
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



