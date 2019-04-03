import { CURRENT_LOGIN } from "../actions/types";
import { CURRENT_REGISTRO } from "../actions/types";
import { CURRENT_HOME } from "../actions/types";

const initialState = "";

export default (state = initialState, action) => {
	switch (action.type) {
		case CURRENT_LOGIN:
			return state="sign-in";
		case CURRENT_REGISTRO:
			return state="user-plus";
		case CURRENT_HOME:
		return state="";
		default:
			return state;
	}
};
