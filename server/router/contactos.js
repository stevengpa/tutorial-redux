const express = require('express');
const router = express.Router({ mergeParams: true });

const routesContactos = require('../routes/contactos');

router.get('/contactos', routesContactos.selectAll);
router.post('/contactos', routesContactos.insert);
router.put('/contactos/:contacto_id', routesContactos.update);
router.delete('/contactos/:contacto_id', routesContactos.delete);

module.exports = router;
