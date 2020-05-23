

const express = require('express'),
app = express();
require('dotenv').config()
var sslRedirect = require('heroku-ssl-redirect');
var compression = require('compression');
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || " mongodb://localhost:27017/messages",
{useNewUrlParser : true,
 useUnifiedTopology :true,
 retryWrites:false});
const db = mongoose.connection;
db.once("open",() => {
    console.log("successfully connected to mongodb using moongose!!");
});
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true);


//MIDDLEWARE ON TOP OF EXPRESS
app.use(express.json());
app.use(sslRedirect());
app.disable('x-powered-by');
app.set("view engine", "ejs");
app.use(compression());
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
const middleware = require('./controllers/middleware');

app.get('/', (req, res,next) => {
   res.render('index')
    });
app.get('/contact', (req, res) => {
     res.render('contact')})
app.get('/projects', (req, res) => {
  
    res.render('projects')});
app.get('/services', (req, res) => {
    res.render('services')});

app.post('/contact-form',quoteController.saveQuote);

app.get('/call',(req , res) => {
    res.render('callpage')
});

app.post('/call-form',quoteController.SaveCallBack);


app.get('/thanks' ,(req,res) => {

    res.render('thanks')
});
app.get('/roofingblog' , (req , res) => {
   
    
    res.render('roofingBlog')
});
app.get('/gutterblog' , (req , res) => {
   
    res.render('gutterBlog')
});
app.get('/flooringblog' , (req , res) => {
   
    res.render('flooringBlog')
});
app.get('/carpentryblog' ,(req , res ) => {
   
    res.render('carpinteria')
});


app.get('/blog' , (req , res) => {
    
    res.render('blog')
});
app.get('/deluxesiding.com/contact/*' , (req , res) => {
     res.render('contact')});

    app.use(middleware.checkUrl);
   
   
    app.get('/*',function(req,res){  
        res.redirect(301 ,res.redirect('https://www.' + req.headers.host + req.url)
    )});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);







app.listen(app.get("port") , () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

