const mongoose=require('mongoose');
const url="mongodb://localhost:27017/Assignment";

const connectDb=async()=>{
    try {
        await mongoose.connect(url);
        console.log("Database connection successfull")
        
    } catch (error) {
        console.error("database connection failed");
        process.exit(0)
    }
}
module.exports=connectDb;