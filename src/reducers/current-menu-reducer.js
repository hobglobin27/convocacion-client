import { CURRENT_LOGIN } from "../actions/types";
import { CURRENT_REGISTRO } from "../actions/types";

const initialState = "";

export default (state = initialState, action) => {
	console.log("Accion: " + action.type);
	switch (action.type) {
		case CURRENT_LOGIN:
			console.log("Entra a current reducer")
			return state="sign-in";
		case CURRENT_REGISTRO:
			console.log("Entra a current reducer")
			return state="user-plus";
		default:
			return state;
	}
};
