const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes');
const purchasingRoutes = ('./routes/purchasingRoutes');
const session = require('express-session');
const db = require('./models/db.js');
const mongoStore = require('connect-mongo');

const app = express();

dotenv.config();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
// Hindi na ginamit ni sir Arren ito  kasi meron an sa express na urlencoded sa baba
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// parses incoming requests with urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// implement 'express-session'
app.use(session({
    'secret': 'InStock-session',
    'resave': false,
    'saveUninitialized': false,
    store: mongoStore.create({mongoUrl: 'mongodb+srv://draco:nAG5fKmyDbDqsUS5@itisdev-in-stock.mjmm5.mongodb.net/inventory?retryWrites=true&w=majority'})
}));

// define the paths contained to './routes/routes.js
app.use('/', routes);

// paths to purchasing routes
// app.use('/purchasing', purchasingRoutes);

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