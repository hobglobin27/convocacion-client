import { GET_TOP_TUTORES } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
    case GET_TOP_TUTORES:
      console.log("Revisando el contenido del payload", action.payload )
			state = action.payload;
			return [...state];
		default:
			return state;
	}
};