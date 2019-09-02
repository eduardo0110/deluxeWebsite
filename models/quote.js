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
        unique:true
    },
    number:{
        type: Number,
        required:true,
        unique:true,
        min: [0000000000, "You are missing a number"],
        max: 9999999999

    },
    message:{
        type:String,
        required:true,
        unique:true
    }
    
});

module.exports = mongoose.model("Quote" , QuoteSchema);