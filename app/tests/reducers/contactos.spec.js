import cloneDeep from 'lodash/cloneDeep';

import * as CONSTANTES from '../../src/js/constants/contactos';
import * as ACCIONES from '../../src/js/actions/contactos';
import reducerContactos from '../../src/js/reducers/contactos';

const expect = global.expect;

describe('Contactos - Reducer', () => {
	let estadoInicial;

	beforeEach(() => {
		estadoInicial = {
			nombre: '',
			celular: '',
			contactos: [],
			cargando: false,
			error: '',
		};
	});

	describe('Acciones Generales', () => {
		it('Retorna el estado incial', () => {
			const actual = reducerContactos(estadoInicial, {});
			const esperado = estadoInicial;

			expect(actual).toEqual(esperado);
		});

		it(`${CONSTANTES.ESTADO_CONTACTOS.LIMPIAR_FORMULARIO} retorna el objeto esperado.`, () => {
			const mockEstado = cloneDeep(estadoInicial);

			estadoInicial.nombre = 'Randall';
			estadoInicial.celular = '22-33-11-00';

			const actual = reducerContactos(estadoInicial, ACCIONES.limpiarFormulario());
			const esperado = mockEstado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.ESTADO_CONTACTOS.GUARDAR_NOMBRE} retorna el objeto esperado.`, () => {
			const mockEstado = cloneDeep(estadoInicial);

			const nombre = 'Jane';
			mockEstado.nombre = nombre;

			const actual = reducerContactos(estadoInicial, ACCIONES.guardarNombre(nombre));
			const esperado = mockEstado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.ESTADO_CONTACTOS.GUARDAR_CELULAR} retorna el objeto esperado.`, () => {
			const mockEstado = cloneDeep(estadoInicial);

			const celular = '22-11-22-33';
			mockEstado.celular = celular;

			const actual = reducerContactos(estadoInicial, ACCIONES.guardarCelular(celular));
			const esperado = mockEstado;

			expect(actual).toEqual(esperado);
		});
	});

	describe('Obtener Contactos', () => {
		const contacto = { nombre: 'John', celular: '22-11-33-22', uid: 'abc!123' };

		it(`${CONSTANTES.OBTENER_CONTACTOS.INICIO} retorna el objeto esperado.`, () => {
			const mockEstadoInicial = {
				...estadoInicial,
				contactos: [contacto],
				cargando: false,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [],
				cargando: true,
				error: '',
			};

			const actual = reducerContactos(mockEstadoInicial, ACCIONES.obtenerContactosInicio());
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.OBTENER_CONTACTOS.COMPLETADO} retorna el objeto esperado.`, () => {
			const mockEstadoInicial = {
				...estadoInicial,
				contactos: [],
				cargando: true,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [contacto],
				cargando: false,
				error: '',
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.obtenerContactosCompletado([contacto])
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.OBTENER_CONTACTOS.ERROR} retorna el objeto esperado.`, () => {
			const error = 'Debe mostrar este mensaje de error';

			const mockEstadoInicial = {
				...estadoInicial,
				contactos: [],
				cargando: true,
				error: '',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [],
				cargando: false,
				error,
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.obtenerContactosError(error)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
	});

	describe('Crear Contactos', () => {
		it(`${CONSTANTES.CREAR_CONTACTO.INICIO} retorna el objeto esperado.`, () => {
			const contacto = { nombre: 'John', celular: '22-11-33-22', uid: 'abc!1' };

			const mockEstadoInicial = {
				...estadoInicial,
				contactos: [contacto],
				cargando: false,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [contacto],
				cargando: true,
				error: '',
			};

			const actual = reducerContactos(mockEstadoInicial, ACCIONES.crearContactoInicio());
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.CREAR_CONTACTO.COMPLETADO} retorna el objeto esperado.`, () => {
			const contacto = { nombre: 'John', celular: '22-11-33-22', uid: 'abc!1' };
			const nuevoContacto = { nombre: 'Jane', celular: '22-11-33-22' };

			const mockEstadoInicial = {
				...estadoInicial,
				contactos: [contacto],
				cargando: true,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [contacto, nuevoContacto],
				cargando: false,
				error: '',
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.crearContactoCompletado(nuevoContacto)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.CREAR_CONTACTO.ERROR} retorna el objeto esperado.`, () => {
			const contacto = { nombre: 'John', celular: '22-11-33-22', uid: 'abc!1' };
			const error = 'Debe mostrar este mensaje de error';

			const mockEstadoInicial = {
				...estadoInicial,
				contactos: [contacto],
				cargando: true,
				error: '',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [contacto],
				cargando: false,
				error,
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.crearContactoError(error)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
	});

	describe('Actualizar Contactos', () => {
		const contactos = [
			{ nombre: 'John', celular: '22-11-33-22', uid: 'abc!1' },
			{ nombre: 'Jane', celular: '22-55-33-22', uid: 'abc!2' },
		];

		it(`${CONSTANTES.ACTUALIZAR_CONTACTO.INICIO} retorna el objeto esperado.`, () => {
			const mockEstadoInicial = {
				...estadoInicial,
				contactos,
				cargando: false,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos,
				cargando: true,
				error: '',
			};

			const actual = reducerContactos(mockEstadoInicial, ACCIONES.actualizarContactoInicio());
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});

		it(`${CONSTANTES.ACTUALIZAR_CONTACTO.COMPLETADO} retorna el objeto esperado.`, () => {
			const index = 0;
			const contactoActualizado = { nombre: 'Yolo', celular: '00-00-00-00', uid: 'abc!1' };

			const mockEstadoInicial = {
				...estadoInicial,
				contactos,
				cargando: true,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [
					contactoActualizado,
					contactos[1],
				],
				cargando: false,
				error: '',
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.actualizarContactoCompletado(contactoActualizado, index)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});

		it(`${CONSTANTES.ACTUALIZAR_CONTACTO.ERROR} retorna el objeto esperado.`, () => {
			const error = 'Debe mostrar este mensaje de error';

			const mockEstadoInicial = {
				...estadoInicial,
				contactos,
				cargando: true,
				error: '',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos,
				cargando: false,
				error,
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.actualizarContactoError(error)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
	});

	describe('Borrar Contactos', () => {
		const contactos = [
			{ nombre: 'John', celular: '22-11-33-22', uid: 'abc!1' },
			{ nombre: 'Jane', celular: '22-55-33-22', uid: 'abc!2' },
		];

		it(`${CONSTANTES.BORRAR_CONTACTO.INICIO} retorna el objeto esperado.`, () => {
			const mockEstadoInicial = {
				...estadoInicial,
				contactos,
				cargando: false,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos,
				cargando: true,
				error: '',
			};

			const actual = reducerContactos(mockEstadoInicial, ACCIONES.borrarContactoInicio());
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.BORRAR_CONTACTO.COMPLETADO} retorna el objeto esperado.`, () => {
			const index = 0;

			const mockEstadoInicial = {
				...estadoInicial,
				contactos,
				cargando: true,
				error: 'Este mensaje debe limpiarse',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos: [
					contactos[1],
				],
				cargando: false,
				error: '',
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.borrarContactoCompletado(index)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
		it(`${CONSTANTES.BORRAR_CONTACTO.ERROR} retorna el objeto esperado.`, () => {
			const error = 'Debe mostrar este mensaje de error';

			const mockEstadoInicial = {
				...estadoInicial,
				contactos,
				cargando: true,
				error: '',
			};

			const mockEstadoEsperado = {
				...estadoInicial,
				contactos,
				cargando: false,
				error,
			};

			const actual = reducerContactos(
				mockEstadoInicial, ACCIONES.borrarContactoError(error)
			);
			const esperado = mockEstadoEsperado;

			expect(actual).toEqual(esperado);
		});
	});

});
