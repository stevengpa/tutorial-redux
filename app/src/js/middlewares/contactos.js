import includes from 'lodash/includes';
import { CREAR_CONTACTO, ACTUALIZAR_CONTACTO } from '../constants/contactos';
import { limpiarFormulario } from '../actions/contactos';

export const contactosLimpiarFormMiddleware = store => next => action => {
	const limpiarFormEnAcciones = [
		CREAR_CONTACTO.COMPLETADO,
		ACTUALIZAR_CONTACTO.COMPLETADO,
	];

	const debeLimpiarForm = includes(limpiarFormEnAcciones, action.type);
	debeLimpiarForm && store.dispatch(limpiarFormulario());

	return next(action);
};
