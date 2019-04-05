import {GET_TOP_TUTORES} from "./types"
import {GET_COUNT_TUTORES} from "./types"
import {GET_USER} from "./types"
import {GET_MATERIAS} from "./types"

export const setCurrentNav = accion => dispatch => dispatch({ type: accion});

export const getUser = response => dispatch => dispatch({ type: GET_USER, payload: response});

export const getListaTutores = () => async dispatch => {
	const response = await fetch(process.env.REACT_APP_API_URL + "/toptutores",{
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }});
  const results = await response.json();
	dispatch({ type: GET_TOP_TUTORES, payload: results });
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




