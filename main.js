
//statusCode = require('http-status-codes'),
//ejs = require('ejs'),
//MONGOOSE SETUP

const https = require('https'),
mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || " mongodb://localhost:27017/messages",
{useNewUrlParser : true, useUnifiedTopology :true});

const db = mongoose.connection;

db.once("open",() => {
    console.log("successfully connected to mongodb using moongose!!");
});
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true);

//EXPRESSS
var sslRedirect = require('heroku-ssl-redirect');
const express = require('express'),
app = express();
//MIDDLEWARE ON TOP OF EXPRESS
app.use(sslRedirect());
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
function checkUrl(req, res, next) {
    let host = req.headers.host;
    if (!host.match(/^www\..*/i)) {
      return res.redirect(301, "https://www." + host + req.url);
    } else if (req.headers['x-forwarded-proto'] !== 'https') {{
      return res.redirect('https://' + req.hostname + req.url);
    }
    next();
  }}

app.get('/', (req, res) => {
    app.use(checkUrl);
    res.render('index')});

app.get('/contact', (req, res) => {
     app.use(checkUrl);
    res.render('contact')})
app.get('/projects', (req, res) => {
    app.use(checkUrl);
    res.render('projects')});
app.get('/services', (req, res) => {
    app.use(checkUrl);
    res.render('services')});
app.post('/contact-form',quoteController.saveQuote);

app.get('/thanks' ,(req,res) => {
    app.use(checkUrl);
    res.render('thanks')
});
app.get('/roofingblog' , (req , res) => {
    app.use(checkUrl);
    res.render('roofingBlog')
});
app.get('/gutterblog' , (req , res) => {
    app.use(checkUrl);
    res.render('gutterBlog')
});
app.get('/flooringblog' , (req , res) => {
    app.use(checkUrl);
    res.render('flooringblog')
});
app.get('/carpinteriablog' ,(req , res ) => {
    app.use(checkUrl);
    res.render('carpinteria')
});


app.get('/blog' , (req , res) => {
    app.use(checkUrl);
    res.render('blog')
});
app.get('/deluxesiding.com/contact/*' , (req , res) => {
    app.use(checkUrl);
    res.render('contact')})
app.get('/deluxesiding.com/*' , (req , res) => {
    app.use(checkUrl);
    res.render('index')})

    app.get('*',function(req,res){  
        res.redirect(301 ,res.redirect('https://www.' + req.headers.host + req.url)
    )});
    
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);




app.use(express.json());


app.listen(app.get("port") , () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

