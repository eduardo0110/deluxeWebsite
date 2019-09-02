
//statusCode = require('http-status-codes'),
//ejs = require('ejs'),
//MONGOOSE SETUP
mongoose = require("mongoose");
const dotenv = require('dotenv');
mongoose.connect(process.env.MONGODB_URI || " mongodb://localhost:27017/messages",
{useNewUrlParser : true});

const db = mongoose.connection;

db.once("open",() => {
    console.log("successfully connected to mongodb using moongose!!");
});
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true);

//EXPRESSS
const express = require('express'),
app = express();
//MIDDLEWARE ON TOP OF EXPRESS
app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("port",process.env.PORT || 3000);

app.use(
    express.urlencoded({
        extended:false
    })
);

//ROUTES****

const quoteController = require('./controllers/quote-controller');
const errorController= require('./controllers/errorController');

app.use(express.json());
app.get('/', (req, res) => {
    res.render('index')})
app.get('/contact', (req, res) => {
    res.render('contact')})
app.get('/projects', (req, res) => {
    res.render('projects')})
app.get('/services', (req, res) => {
    res.render('services')})
app.post('/contact-form',quoteController.saveQuote);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port") , () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

