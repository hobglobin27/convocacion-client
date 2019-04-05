import { GET_MATERIAS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
    case GET_MATERIAS:
			state = action.payload;
			console.log("Este es el state: ",state)
			return [...state];
		default:
			return state;
	}
};