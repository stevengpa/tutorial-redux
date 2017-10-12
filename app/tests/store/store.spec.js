import map from 'lodash/map';

import store from '../../src/js/store';
import { guardarNombre } from '../../src/js/actions/contactos';

const expect = global.expect;

describe('Store', () => {
	it('Verifica que el estado contiene las secciones esperadas.', () => {
		const secciones = map(store.getState(), (value, key) => key);

		const actual = secciones;
		const esperado = ['contactos'];

		expect(actual).toEqual(esperado);
	});

	it('Verifica que el dispatch actualiza el estado.', () => {
		store.dispatch(guardarNombre('Jane'));

		const actual = store.getState().contactos;
		const esperado = {
			nombre: 'Jane',
			celular: '',
			contactos: [],
			cargando: false,
			error: '',
		};

		expect(actual).toEqual(esperado);
	});
});
