import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { contactosLimpiarFormMiddleware } from '../middlewares/contactos';

import reducers from '../reducers';

const createStoreWithMiddleware = compose(
	applyMiddleware(thunk, contactosLimpiarFormMiddleware),
)(createStore);

export default createStoreWithMiddleware(reducers);
