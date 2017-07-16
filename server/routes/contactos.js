const tblContactos = require('../utils/db').tblContactos;

module.exports = {
	selectAll(req, res) {
		const resultado = tblContactos.read();
		resultado.tableRead ?
			res.status(201).send({ data: resultado.rows }) :
			res.status(400).end();
	},
	insert(req, res) {
		const { nombre, celular } = req.body;

		const resultado = tblContactos.insert({ value: { nombre, celular } });
		resultado.tableRowInserted ?
			res.status(201).send({ item: resultado.newVal }) :
			res.status(400).end();
	},
	update(req, res) {
		const uid = req.params.contacto_id;
		const nombre = req.body.nombre;
		const celular = req.body.celular;

		const value = { nombre, celular };
		const resultado = tblContactos.update({ uid, value });

		resultado.tableRowUpdated ?
			res.status(202).send({ item: resultado.newVal }) :
			res.status(400).end();
	},
	delete(req, res) {
		const uid = req.params.contacto_id;
		const resultado = tblContactos.del({ uid });

		resultado.tableRowDeleted ?
			res.status(202).send({ uid }) :
			res.status(400).end();
	},
};
