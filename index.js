const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes');
const db = require('./models/db.js');

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// parses incoming requests with urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// define the paths contained to './routes/routes.js
app.use('/', routes);

// connects to the database
db.connect();

// if the route is not defined in the server, render `../views/error.hbs`
app.use((req, res) => {
	res.status(404);
	res.write("Not Found");
});


app.listen(port, hostname, () => {
    console.log('Server is running at:');
    console.log('http://' + hostname + ':' + port);
});