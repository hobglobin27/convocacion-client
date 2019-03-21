import { combineReducers } from "redux";
import currentmenureducer from "./current-menu-reducer";
import listatutoresreducer from "./lista-tutores-reducer";

export default combineReducers({
	current: currentmenureducer,
	tutores: listatutoresreducer
});
