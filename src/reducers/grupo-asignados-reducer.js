import { GET_GRUPOS_ASIGNADOS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
    case GET_GRUPOS_ASIGNADOS:
    console.log("Este es el payload: ", action.payload)
			state = action.payload;
			return [...state];
		default:
			return state;
	}
};