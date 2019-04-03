import { GET_USER } from "../actions/types";

const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
    case GET_USER:
      state=action.payload
      return state;
		default:
			return state;
	}
};