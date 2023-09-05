const mongoose= require('mongoose')
require('dotenv').config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DATA_BASE)
        console.log('database connected')
    }catch(err){
        console.log(err,'error')
        process.exit(1)
    }
}
module.exports = connectDB;

  