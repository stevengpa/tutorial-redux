import axios from 'axios';
import findIndex from 'lodash/findIndex';
import * as CONSTANTES from '../constants/contactos';
import { apiUrl } from '../utils/http';

// d_ GENERALES
// >> Action Creators <<
export function limpiarFormulario() {
	return {
		type: CONSTANTES.ESTADO_CONTACTOS.LIMPIAR_FORMULARIO,
		payload: {
			nombre: '',
			celular: '',
		},
	};
}

export function guardarNombre(nombre) {
	return {
		type: CONSTANTES.ESTADO_CONTACTOS.GUARDAR_NOMBRE,
		payload: {
			nombre,
		},
	};
}

export function guardarCelular(celular) {
	return {
		type: CONSTANTES.ESTADO_CONTACTOS.GUARDAR_CELULAR,
		payload: {
			celular,
		},
	};
}

// d_ OBTENER CONTACTOS
// >> Action Creators <<
export function obtenerContactosInicio() {
	return {
		type: CONSTANTES.OBTENER_CONTACTOS.INICIO,
		payload: {
			contactos: [],
			cargando: true,
			error: '',
		},
	};
}

export function obtenerContactosCompletado(contactos) {
	return {
		type: CONSTANTES.OBTENER_CONTACTOS.COMPLETADO,
		payload: {
			contactos,
			cargando: false,
			error: '',
		},
	};
}

export function obtenerContactosError(error) {
	return {
		type: CONSTANTES.OBTENER_CONTACTOS.ERROR,
		payload: {
			error,
			cargando: false,
		},
	};
}

// >> Async Action Creator <<
export function obtenerContactos() {
	return (dispatch, getState) => {
		dispatch(obtenerContactosInicio());

		return axios.get(`${apiUrl}/contactos`)
			.then(({ data }) => dispatch(obtenerContactosCompletado(data)))
			.catch(error => {
				const mensaje = error.message || error;
				dispatch(obtenerContactosError(mensaje));
			});
	};
}

// d_ CREAR CONTACTO
// >> Action Creators <<
export function crearContactoInicio() {
	return {
		type: CONSTANTES.CREAR_CONTACTO.INICIO,
		payload: {
			cargando: true,
			error: '',
		},
	};
}

export function crearContactoCompletado(contacto) {
	return {
		type: CONSTANTES.CREAR_CONTACTO.COMPLETADO,
		payload: {
			contacto,
			cargando: false,
			error: '',
		},
	};
}

export function crearContactoError(error) {
	return {
		type: CONSTANTES.CREAR_CONTACTO.ERROR,
		payload: {
			error,
			cargando: false,
		},
	};
}

// >> Async Action Creator <<
export function crearContacto(nombre, celular) {
	return (dispatch, getState) => {
		dispatch(crearContactoInicio());

		return axios.post(`${apiUrl}/contactos`, { nombre, celular })
			.then( ({ item: contacto }) => dispatch(crearContactoCompletado(contacto)) )
			.catch((error) => {
				const mensaje = error.message || error;
				dispatch(crearContactoError(mensaje));
			});
	};
}

// d_ ACTUALIZAR CONTACTO
// >> Action Creators <<
export function actualizarContactoInicio() {
	return {
		type: CONSTANTES.ACTUALIZAR_CONTACTO.INICIO,
		payload: {
			cargando: true,
			error: '',
		},
	};
}

export function actualizarContactoCompletado(contacto, index) {
	return {
		type: CONSTANTES.ACTUALIZAR_CONTACTO.COMPLETADO,
		payload: {
			contacto,
			index,
			cargando: false,
			error: '',
		},
	};
}

export function actualizarContactoError(error) {
	return {
		type: CONSTANTES.ACTUALIZAR_CONTACTO.ERROR,
		payload: {
			error,
			cargando: false,
		},
	};
}

// >> Async Action Creator <<
export function actualizarContacto(nombre, celular, uid) {
	return (dispatch, getState) => {
		dispatch(actualizarContactoInicio());

		// Validación
		const { contactos } = getState().contactos;
		const index = findIndex(contactos, { uid });
		if (index === -1) {
			return dispatch(actualizarContactoError('El contacto no ha sido encontrado.'));
		}

		return axios.put(`${apiUrl}/contactos/${uid}`, { nombre, celular })
			.then( ({ item: contacto }) => dispatch(actualizarContactoCompletado(contacto, index)))
			.catch((error) => {
				const mensaje = error.message || error;
				dispatch(actualizarContactoError(mensaje));
			});
	};
}

// d_ BORRAR CONTACTO
// >> Action Creators <<
export function borrarContactoInicio() {
	return {
		type: CONSTANTES.BORRAR_CONTACTO.INICIO,
		payload: {
			cargando: true,
			error: '',
		},
	};
}

export function borrarContactoCompletado(uid, index) {
	return {
		type: CONSTANTES.BORRAR_CONTACTO.COMPLETADO,
		payload: {
			uid,
			index,
			cargando: false,
			error: '',
		},
	};
}

export function borrarContactoError(error) {
	return {
		type: CONSTANTES.BORRAR_CONTACTO.ERROR,
		payload: {
			error,
			cargando: false,
		},
	};
}

// >> Async Action Creator <<
export function borrarContacto(uid) {
	return (dispatch, getState) => {
		dispatch(borrarContactoInicio());

		// Validación
		const { contactos } = getState().contactos;
		const index = findIndex(contactos, { uid });
		if (index === -1) {
			return dispatch(borrarContactoError('El contacto no ha sido encontrado.'));
		}

		return axios.delete(`${apiUrl}/contactos/${uid}`)
			.then(({ uid }) => dispatch(borrarContactoCompletado(uid, index)))
			.catch((error) => {
				const mensaje = error.message || error;
				dispatch(borrarContactoError(mensaje));
			});
	};
}
