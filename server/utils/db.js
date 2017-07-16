const nowdb = require('nowdb')({ path: './server/db', fileName: 'db.json' });
// Init DB
const { schema, setTable } = nowdb;
schema.init();
// Create tblContactos
const tblContactos = setTable({ table: 'Contactos' });
tblContactos.create();

module.exports = {
	tblContactos,
};
