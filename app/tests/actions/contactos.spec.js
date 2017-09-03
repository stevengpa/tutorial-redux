import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as CONSTANTES_CONTACTO from '../../src/js/constants/contactos';
import * as ACCIONES from '../../src/js/actions/contactos';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const expect = global.expect;

describe('Contactos - Acciones', () => {
	describe('Acciones Generales', () => {
		it('limpiarFormulario() retorna el objecto esperado.', () => {
			const actual = ACCIONES.limpiarFormulario();
			const esperado = {
				type: CONSTANTES_CONTACTO.ESTADO_CONTACTOS.LIMPIAR_FORMULARIO,
				payload: {
					nombre: '',
					celular: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('guardarNombre(nombre) retorna el objecto esperado.', () => {
			const actual = ACCIONES.guardarNombre('Steven');
			const esperado = {
				type: CONSTANTES_CONTACTO.ESTADO_CONTACTOS.GUARDAR_NOMBRE,
				payload: {
					nombre: 'Steven',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('guardarCelular(celular) retorna el objecto esperado.', () => {
			const actual = ACCIONES.guardarCelular('2211-33-00');
			const esperado = {
				type: CONSTANTES_CONTACTO.ESTADO_CONTACTOS.GUARDAR_CELULAR,
				payload: {
					celular: '2211-33-00',
				},
			};

			expect(actual).toEqual(esperado);
		});
	});

	describe('Obtener Contactos', () => {
		it('obtenerContactosInicio() retorna el objecto esperado.', () => {
			const actual = ACCIONES.obtenerContactosInicio();
			const esperado = {
				type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.INICIO,
				payload: {
					contactos: [],
					cargando: true,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('obtenerContactosCompletado(contactos) retorna el objecto esperado.', () => {
			const mockContactos = [{ nombre: 'Steven', celular: '2211-33-00' }];

			const actual = ACCIONES.obtenerContactosCompletado(mockContactos);
			const esperado = {
				type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.COMPLETADO,
				payload: {
					contactos: mockContactos,
					cargando: false,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('obtenerContactosError(error) retorna el objecto esperado.', () => {
			const error = 'Este es un error';

			const actual = ACCIONES.obtenerContactosError(error);
			const esperado = {
				type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.ERROR,
				payload: {
					error,
					cargando: false,
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('obtenerContactos() retorna el objecto esperado cuando es Completado.', (done) => {
			const mockContactos = [{
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: 'asda!E3-##@$#@$#-DSFdsfs',
			}];

			// Detener y simular una llamada satisfactoria
			const stubAxiosObtener = sinon.stub(axios, 'get')
				.callsFake(() => Promise.resolve({ data: mockContactos }));

			const store = mockStore({});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.obtenerContactos())
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.INICIO,
						payload: {
							contactos: [],
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.COMPLETADO,
						payload: {
							contactos: mockContactos,
							cargando: false,
							error: '',
						},
					}];

					stubAxiosObtener.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
		it('obtenerContactos() retorna el objecto esperado cuando es Error.', (done) => {
			const error = 'Se produjo un error';
			const mockContactos = [{
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: 'asda!E3-##@$#@$#-DSFdsfs',
			}];

			// Detener y simular una llamada satisfactoria
			const stubAxiosObtener = sinon.stub(axios, 'get')
				.callsFake(() => Promise.reject(error));

			const store = mockStore({});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.obtenerContactos())
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.INICIO,
						payload: {
							contactos: [],
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.OBTENER_CONTACTOS.ERROR,
						payload: {
							cargando: false,
							error,
						},
					}];

					stubAxiosObtener.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
	});

	describe('Crear Contacto', () => {
		it('crearContactoInicio() retorna el objecto esperado.', () => {
			const actual = ACCIONES.crearContactoInicio();
			const esperado = {
				type: CONSTANTES_CONTACTO.CREAR_CONTACTO.INICIO,
				payload: {
					cargando: true,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('crearContactoCompletado(contacto) retorna el objecto esperado.', () => {
			const mockContacto = { nombre: 'Steven', celular: '2211-33-00' };

			const actual = ACCIONES.crearContactoCompletado(mockContacto);
			const esperado = {
				type: CONSTANTES_CONTACTO.CREAR_CONTACTO.COMPLETADO,
				payload: {
					contacto: mockContacto,
					cargando: false,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('crearContactoError(error) retorna el objecto esperado.', () => {
			const error = 'Este es un error';

			const actual = ACCIONES.crearContactoError(error);
			const esperado = {
				type: CONSTANTES_CONTACTO.CREAR_CONTACTO.ERROR,
				payload: {
					error,
					cargando: false,
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('crearContacto(nombre, celular) retorna el objecto esperado cuando es Completado.', (done) => {
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: '24342#$@#$-234@#$23-23423423',
			};

			// Detener y simular una llamada satisfactoria
			const stubAxiosCrear = sinon.stub(axios, 'post')
				.callsFake(() => Promise.resolve({ item: mockContacto }));

			const store = mockStore({});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.crearContacto(mockContacto.nombre, mockContacto.celular))
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.CREAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.CREAR_CONTACTO.COMPLETADO,
						payload: {
							cargando: false,
							contacto: mockContacto,
							error: '',
						},
					}];

					stubAxiosCrear.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
		it('crearContacto(nombre, celular) retorna el objecto esperado cuando es Error.', (done) => {
			const error = 'Se produjo un error';
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: '24342#$@#$-234@#$23-23423423',
			};

			// Detener y simular una llamada satisfactoria
			const stubAxiosCrear = sinon.stub(axios, 'post')
				.callsFake(() => Promise.reject(error));

			const store = mockStore({});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.crearContacto(mockContacto.nombre, mockContacto.celular))
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.CREAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.CREAR_CONTACTO.ERROR,
						payload: {
							cargando: false,
							error,
						},
					}];

					stubAxiosCrear.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
	});

	describe('Actualizar Contacto', () => {
		it('actualizarContactoInicio() retorna el objecto esperado.', () => {
			const actual = ACCIONES.actualizarContactoInicio();
			const esperado = {
				type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.INICIO,
				payload: {
					cargando: true,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('actualizarContactoCompletado(contacto, index) retorna el objecto esperado.', () => {
			const mockContacto = { nombre: 'Steven', celular: '2211-33-00' },
				index = 100;

			const actual = ACCIONES.actualizarContactoCompletado(mockContacto, index);
			const esperado = {
				type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.COMPLETADO,
				payload: {
					contacto: mockContacto,
					index,
					cargando: false,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('actualizarContactoError(error) retorna el objecto esperado.', () => {
			const error = 'Este es un error';

			const actual = ACCIONES.actualizarContactoError(error);
			const esperado = {
				type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.ERROR,
				payload: {
					error,
					cargando: false,
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('actualizarContacto(nombre, celular, uid) retorna el objecto esperado cuando es Completado.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};

			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [mockContacto],
					cargando: false,
					error: '',
				},
			};
			// Detener y simular una llamada satisfactoria
			const stubAxiosActualizar = sinon.stub(axios, 'put')
				.callsFake(() => Promise.resolve({ item: mockContacto }));

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			return store.dispatch(
				ACCIONES.actualizarContacto(mockContacto.nombre, mockContacto.celular, uid)
			)
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.COMPLETADO,
						payload: {
							contacto: mockContacto,
							cargando: false,
							error: '',
							index: 0,
						},
					}];

					stubAxiosActualizar.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
		it('actualizarContacto(nombre, celular, uid) retorna el objecto esperado cuando es Error.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid,
			};
			const error = 'Se produjo un error';

			// Detener y simular una llamada satisfactoria
			const stubAxiosActualizar = sinon.stub(axios, 'put')
				.callsFake(() => Promise.reject(error));

			const store = mockStore({
				contactos: {
					contactos: [mockContacto],
				},
			});
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.actualizarContacto(mockContacto.nombre, mockContacto.celular, uid))
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.ERROR,
						payload: {
							cargando: false,
							error,
						},
					}];

					stubAxiosActualizar.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
		it('actualizarContacto(nombre, celular, uid) retorna el objecto esperado cuando el uid no se encontró.', () => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockContacto = {
				nombre: 'Steven',
				celular: '2211-99-11',
				uid: 'asda!E3-##@$#@$#',
			};
			const error = 'El contacto no ha sido encontrado.';

			const store = mockStore({
				contactos: {
					contactos: [mockContacto],
				},
			});
			// Ejecutar el Async Action Creator
			const actual =
				store.dispatch(ACCIONES.actualizarContacto(mockContacto.nombre, mockContacto.celular, uid));

			const esperado = {
				type: CONSTANTES_CONTACTO.ACTUALIZAR_CONTACTO.ERROR,
				payload: {
					cargando: false,
					error,
				},
			};

			expect(actual).toEqual(esperado);
		});
	});

	describe('Borrar Contactos', () => {
		it('borrarContactoInicio() retorna el objecto esperado.', () => {
			const actual = ACCIONES.borrarContactoInicio();
			const esperado = {
				type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.INICIO,
				payload: {
					cargando: true,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('borrarContactoCompletado(index) retorna el objecto esperado.', () => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs',
				index = 100;

			const actual = ACCIONES.borrarContactoCompletado(index);
			const esperado = {
				type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.COMPLETADO,
				payload: {
					index,
					cargando: false,
					error: '',
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('borrarContactoError(error) retorna el objecto esperado.', () => {
			const error = 'Este es un error';

			const actual = ACCIONES.borrarContactoError(error);
			const esperado = {
				type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.ERROR,
				payload: {
					error,
					cargando: false,
				},
			};

			expect(actual).toEqual(esperado);
		});
		it('borrarContacto(uid) retorna el objecto esperado cuando es Completado.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [{
						nombre: 'Steven',
						celular: '2211-99-11',
						uid,
					}],
					cargando: false,
					error: '',
				},
			};
			// Detener y simular una llamada satisfactoria
			const stubAxiosDelete = sinon.stub(axios, 'delete')
				.callsFake(() => Promise.resolve({ uid }));

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.borrarContacto(uid))
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.COMPLETADO,
						payload: {
							cargando: false,
							error: '',
							index: 0,
						},
					}];

					stubAxiosDelete.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
		it('borrarContacto(uid) retorna el objecto esperado cuando es Error.', (done) => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const error = 'Se produjo un error';

			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [{
						nombre: 'Steven',
						celular: '2211-99-11',
						uid,
					}],
					cargando: false,
					error: '',
				},
			};
			// Detener y simular una llamada no satisfactoria
			const stubAxiosDelete = sinon.stub(axios, 'delete')
				.callsFake(() => Promise.reject(error));

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			return store.dispatch(ACCIONES.borrarContacto(uid))
				.then(() => {
					const actual = store.getActions();
					const esperado = [{
						type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.INICIO,
						payload: {
							cargando: true,
							error: '',
						},
					}, {
						type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.ERROR,
						payload: {
							cargando: false,
							error,
						},
					}];

					stubAxiosDelete.restore();
					expect(actual).toEqual(esperado);
					done();
				});
		});
		it('borrarContacto(uid) retorna el objecto esperado cuando el uid no se encontró.', () => {
			const uid = 'asda!E3-##@$#@$#-DSFdsfs';
			const error = 'El contacto no ha sido encontrado.';

			const mockEstado = {
				contactos: {
					nombre: '',
					telefono: '',
					contactos: [{
						nombre: 'Steven',
						celular: '2211-99-11',
						uid: 'asda!E3-##@$#@$#',
					}],
					cargando: false,
					error: '',
				},
			};

			const store = mockStore(mockEstado);
			// Ejecutar el Async Action Creator
			const actual = store.dispatch(ACCIONES.borrarContacto(uid));
			const esperado = {
				type: CONSTANTES_CONTACTO.BORRAR_CONTACTO.ERROR,
				payload: {
					cargando: false,
					error,
				},
			};
			expect(actual).toEqual(esperado);
		});
	});
});
