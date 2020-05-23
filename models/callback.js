const mongoose = require("mongoose");

const CallBackSchema = mongoose.Schema({
    name:{
        type:String,
        required :true 
    },
    number:{
        type: Number,
        required:true,
        sparse:true,
        min: [0000000000, "You are missing a number"],
        max: 9999999999

    }
    
    
});

module.exports = mongoose.model("CallBack" , CallBackSchema);