const mongoose=require("mongoose");

const trendSchema=mongoose.Schema({
    trend1:{
        type:String,
        
    },
    trend2:{
        type:String,
       
    },
    trend3:{
        type:String,
       
    },
    trend4:{
        type:String,
       
    },
    trend5:{
        type:String,
       
    },
})

const trending= new mongoose.model("trend",trendSchema);
module.exports=trending;