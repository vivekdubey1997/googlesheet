const mongoose = require("mongoose")
 
const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONECTION_STRING);
        console.log(
            "DATABASE CONNECTED",
            connect.connection.host,
            connect.connection.name,
        )
    } catch (Error){
        console.log(err);
        process.exit(1)
    }

    }

    module.exports = connectDb;
