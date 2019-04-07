import { GET_COUNT_TUTORES, GET_MATERIAS_TUTOR, GET_DIRECCION_TUTOR, GET_MATERIA_DIRECCION_TUTOR } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_COUNT_TUTORES:
		case GET_MATERIAS_TUTOR:
		case GET_DIRECCION_TUTOR:
		case GET_MATERIA_DIRECCION_TUTOR:
      state=action.payload
      return state;
		default:
			return state;
	}
};