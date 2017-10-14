import configureStore from 'redux-mock-store';
import _ from 'lodash';

import { contactosLimpiarFormMiddleware } from '../../src/js/middlewares/contactos';

import {
	CREAR_CONTACTO, ACTUALIZAR_CONTACTO, ESTADO_CONTACTOS,
} from '../../src/js/constants/contactos';

import {
	crearContactoCompletado,
	actualizarContactoCompletado,
	borrarContactoCompletado,
	limpiarFormulario,
} from '../../src/js/actions/contactos';

const middlewares = [contactosLimpiarFormMiddleware];
const mockStore = configureStore(middlewares);
const expect = global.expect;

describe('Contactos - Middleware', () => {
	let store;
	beforeEach(() => {
		store = mockStore({});
	});

	it(`contactosLimpiarFormMiddleware debe ejecutar limpiarFormulario() cuando ${CREAR_CONTACTO.COMPLETADO}`, () => {
		store.dispatch(crearContactoCompletado({ name: 'Jane', celular: '22-11-44-22' }));

		const actual = _.chain(store.getActions())
			.filter({ type: ESTADO_CONTACTOS.LIMPIAR_FORMULARIO })
			.first()
			.value();

		const esperado = limpiarFormulario();

		expect(actual).toEqual(esperado);
	});

	it(`contactosLimpiarFormMiddleware debe ejecutar limpiarFormulario() cuando ${ACTUALIZAR_CONTACTO.COMPLETADO}`, () => {
		store.dispatch(actualizarContactoCompletado({ name: 'Jane', celular: '22-11-44-22' }));

		const actual = _.chain(store.getActions())
			.filter({ type: ESTADO_CONTACTOS.LIMPIAR_FORMULARIO })
			.first()
			.value();

		const esperado = limpiarFormulario();

		expect(actual).toEqual(esperado);
	});

	it(`contactosLimpiarFormMiddleware NO debe ejecutar limpiarFormulario() en acciones diferentes a ${ACTUALIZAR_CONTACTO.COMPLETADO} y ${CREAR_CONTACTO.COMPLETADO}`, () => {
		store.dispatch(borrarContactoCompletado(0));

		const actual = _.chain(store.getActions())
			.filter({ type: ESTADO_CONTACTOS.LIMPIAR_FORMULARIO })
			.first()
			.isUndefined()
			.value();

		const esperado = true;

		expect(actual).toEqual(esperado);
	});
});
