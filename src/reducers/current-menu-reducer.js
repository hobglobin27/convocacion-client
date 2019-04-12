import { CURRENT_REGISTRO, 
				CURRENT_LOGIN,
				CURRENT_HOME,
				CURRENT_TUTOR,
				CURRENT_LIDER_GRUPO,
				CURRENT_HELP,
				CURRENT_COMPLETA_PERFIL,
				CURRENT_CAMBIA_CONTRASENA_PERFIL,
				CURRENT_SALIR_PERFIL,
				CURRENT_AVATAR_TUTOR,
				CURRENT_ASIGNACIONES,
				CURRENT_ARTICULOS_TUTOR,
				CURRENT_CAMBIA_CONTRASENA_TUTOR,
				CURRENT_SALIR_TUTOR,
				CURRENT_AVATAR_LIDER,
				CURRENT_GRUPOS,
				CURRENT_ARTICULOS_LIDER,
				CURRENT_CAMBIA_CONTRASENA_LIDER,
				CURRENT_SALIR_LIDER,
				CURRENT_BUSCAR_TUTOR,
				CURRENT_INICIO } from "../actions/types";

const initialState = "";

export default (state = initialState, action) => {
	switch (action.type) {
		case CURRENT_LOGIN:
			return state="sign-in";
		case CURRENT_REGISTRO:
			return state="user-plus";
		case CURRENT_TUTOR:
			return state="tutor";
		case CURRENT_LIDER_GRUPO:
			return state="lider-grupo";
		case CURRENT_HELP:
			return state="help";
		case CURRENT_COMPLETA_PERFIL:
			return state="completa-perfil";
		case CURRENT_CAMBIA_CONTRASENA_PERFIL:
			return state="cambia-contrasena-perfil";
		case CURRENT_SALIR_PERFIL:
			return state="salir-perfil";
		case CURRENT_AVATAR_TUTOR:
			return state="avatar-tutor";
		case CURRENT_ASIGNACIONES:
			return state="asignaciones";
		case CURRENT_ARTICULOS_TUTOR:
			return state="articulos-tutor";
		case CURRENT_CAMBIA_CONTRASENA_TUTOR:
			return state="cambia-contrasena-tutor";
		case CURRENT_SALIR_TUTOR:
			return state="salir-tutor";
		case CURRENT_AVATAR_LIDER:
			return state="avatar-lider";
		case CURRENT_GRUPOS:
			return state="grupos";
		case CURRENT_ARTICULOS_LIDER:
			return state="articulos-lider";
		case CURRENT_CAMBIA_CONTRASENA_LIDER:
			return state="cambia-contrasena-lider";
		case CURRENT_SALIR_LIDER:
			return state="salir-lider";
		case CURRENT_BUSCAR_TUTOR:
			return state="buscar-tutor"
		case CURRENT_HOME:
			return state="";
		case CURRENT_INICIO:
			return state="inicio";
		default:
			return state;
	}
};
