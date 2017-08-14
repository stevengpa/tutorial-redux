import { definirAccion } from '../utils/definirAccion';
import { INICIO, COMPLETADO, ERROR } from './estadosFrecuentes';

const accionesHttp = [INICIO, COMPLETADO, ERROR];

// ESTADO LOCAL
export const ESTADO_CONTACTOS = definirAccion('ESTADO_CONTACTOS',
	['LIMPIAR_FORMULARIO', 'GUARDAR_NOMBRE', 'GUARDAR_CELULAR']
);

// PETICIONES AL SERVIDOR
export const OBTENER_CONTACTOS = definirAccion('OBTENER_CONTACTOS', accionesHttp);
export const CREAR_CONTACTO = definirAccion('CREAR_CONTACTO', accionesHttp);
export const ACTUALIZAR_CONTACTO = definirAccion('ACTUALIZAR_CONTACTO', accionesHttp);
export const BORRAR_CONTACTO = definirAccion('BORRAR_CONTACTO', accionesHttp);
