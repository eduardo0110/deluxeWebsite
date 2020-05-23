const mongoose = require("mongoose");
const Quote = require("../models/quote");
const CallBack = require("../models/callback");


exports.saveQuote = (req , res) => {
    let newQuote = new Quote({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        number:req.body.number
       
        

    });


    newQuote.save()
    .then( () => {
      res.render("thanks")
    })
    .catch((error) => {
      res.send(error);
    })

}

exports.SaveCallBack = (req , res) => {
 let newCallBack = new CallBack({
   name:req.body.name,
   number:req.body.number
 });

 newCallBack.save()
 .then( ()=> {
   res.render("thanks")
 })
 .catch((error) => {
   res.send(error);
 })
}
