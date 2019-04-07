import { GET_TOP_TUTORES, GET_MATERIAS_TUTOR, GET_DIRECCION_TUTOR, GET_MATERIA_DIRECCION_TUTOR } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
		case GET_TOP_TUTORES:
		case GET_MATERIA_DIRECCION_TUTOR:
		case GET_MATERIAS_TUTOR:
		case GET_DIRECCION_TUTOR:
			state = action.payload;
			return [...state];
		/*case GET_MATERIAS_TUTOR:					
			state = action.payload;case GET_DIRECCION_TUTOR:
		return [...state];
		case GET_DIRECCION_TUTOR:					
			state = action.payload;
		return [...state];
		case GET_MATERIA_DIRECCION_TUTOR:					
			state = action.payload;
			return [...state];*/
		default:
			return state;
	}
};