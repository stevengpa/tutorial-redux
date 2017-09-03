import cloneDeep from 'lodash/cloneDeep';
import * as CONSTANTES from '../constants/contactos';

const estadoInicial = {
	nombre: '',
	celular: '',
	contactos: [],
	cargando: false,
	error: '',
};

export default function contactos(state = cloneDeep(estadoInicial), action) {
	const { type, payload } = action;

	switch (type) {
		case CONSTANTES.ESTADO_CONTACTOS.LIMPIAR_FORMULARIO:
		case CONSTANTES.ESTADO_CONTACTOS.GUARDAR_NOMBRE:
		case CONSTANTES.ESTADO_CONTACTOS.GUARDAR_CELULAR:
		case CONSTANTES.OBTENER_CONTACTOS.INICIO:
		case CONSTANTES.OBTENER_CONTACTOS.COMPLETADO:
		case CONSTANTES.OBTENER_CONTACTOS.ERROR:
		case CONSTANTES.CREAR_CONTACTO.INICIO:
		case CONSTANTES.CREAR_CONTACTO.ERROR:
		case CONSTANTES.ACTUALIZAR_CONTACTO.INICIO:
		case CONSTANTES.ACTUALIZAR_CONTACTO.ERROR:
		case CONSTANTES.BORRAR_CONTACTO.INICIO:
		case CONSTANTES.BORRAR_CONTACTO.ERROR:
			return {
				...state,
				...payload,
			};

		case CONSTANTES.CREAR_CONTACTO.COMPLETADO: {
			const { contacto, ...propEstados } = payload;
			return {
				...state,
				...propEstados,
				contactos: [
					...state.contactos,
					contacto,
				],
			};
		}

		case CONSTANTES.ACTUALIZAR_CONTACTO.COMPLETADO: {
			const { contacto, index, ...propEstados } = payload;
			return {
				...state,
				...propEstados,
				contactos: [
					...state.contactos.slice(0, index),
					contacto,
					...state.contactos.slice(index + 1),
				],
			};
		}

		case CONSTANTES.BORRAR_CONTACTO.COMPLETADO: {
			const { index, ...propEstados } = payload;
			return {
				...state,
				...propEstados,
				contactos: [
					...state.contactos.slice(0, index),
					...state.contactos.slice(index + 1),
				],
			};
		}

		default:
			return state;
	}
}
