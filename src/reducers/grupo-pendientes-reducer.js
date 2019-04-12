import { GET_GRUPOS_PENDIENTES } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
    case GET_GRUPOS_PENDIENTES:
    console.log("Este es el payload: ", action.payload)
			state = action.payload;
			return [...state];
		default:
			return state;
	}
};