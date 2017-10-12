import store from './index';
import { guardarNombre, guardarCelular, crearContactoCompletado } from '../actions/contactos';

console.log('=========  Estado Inicial  =========');
console.log(store.getState());
console.log('=====  End of Estado Inicial>  =====');

const cancelarSucripcion = store.subscribe(() => {
	console.log('=========  Nuevo Estado  =========');
	console.log(store.getState());
	console.log('=====  End of Nuevo Estado>  =====');
});

store.dispatch(guardarNombre('Jane'));
store.dispatch(guardarCelular('22-11-00-11'));
store.dispatch(crearContactoCompletado({ name: 'Jane', celular: '22-11-00-11' }));

cancelarSucripcion();
