import { GET_DIRECCIONES_ALTERNAS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	//state=[];
	switch (action.type) {
    case GET_DIRECCIONES_ALTERNAS:
			state = action.payload;
			return [...state];
		default:
			return state;
	}
};