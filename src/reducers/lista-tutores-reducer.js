import { GET_TOP_TUTORES } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
    case GET_TOP_TUTORES:
			state = action.payload;
			return [...state];
		default:
			return state;
	}
};