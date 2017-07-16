const app = require('express')();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
// Routers
const routerContactos = require('./router/contactos');

const PORT = 7071;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cors());

// Set Routers
app.use('/api/', routerContactos);

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
