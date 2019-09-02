const mongoose = require("mongoose")

const QuoteSchema = mongoose.Schema({
    name:{
        type:String,
        required :true 
    },
    email : {
        type : String ,
        required: true,
        lowercase:true,
        sparse:true
    },
    number:{
        type: Number,
        required:true,
        sparse:true,
        min: [0000000000, "You are missing a number"],
        max: 9999999999

    },
    message:{
        type:String,
        required:true,
        sparse:true
    }
    
});

module.exports = mongoose.model("Quote" , QuoteSchema);