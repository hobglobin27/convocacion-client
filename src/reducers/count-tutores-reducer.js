import { GET_COUNT_TUTORES } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
    case GET_COUNT_TUTORES:
      state=action.payload
      return state;
		default:
			return state;
	}
};