import { combineReducers } from "redux";
import currentMenuReducer from "./current-menu-reducer";
import listaTutoresReducer from "./lista-tutores-reducer";
import countTutoresReducer from "./count-tutores-reducer";
import getUserReducer from "./get-user-reducer"
import materiasReducer from "./materias-reducer"
import direccionesAlternasReducer from "./direcciones-alternas-reducer"

export default combineReducers({
	current: currentMenuReducer,
	tutores: listaTutoresReducer,
	counttutores: countTutoresReducer,
	loggedIn: getUserReducer,
	materias: materiasReducer,
	direccionesalternas: direccionesAlternasReducer
});
