const mongoose = require("mongoose")
const Quote = require("../models/quote")


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

