import mongoose from "mongoose";
export const db = mongoose.connection;
const connectDb = async()=>{
    var CONNECTION_URL = 'mongodb+srv://codefrenetics:codefrenetics@cadarch.dcyogmr.mongodb.net/?retryWrites=true&w=majority'
    // const CONNECTION_URL = "mongodb://cadarch:cadarch123@cluster0-shard-00-00.cj44q.mongodb.net:27017,cluster0-shard-00-01.cj44q.mongodb.net:27017,cluster0-shard-00-02.cj44q.mongodb.net:27017/?ssl=true&replicaSet=atlas-dmzu4u-shard-0&authSource=admin&retryWrites=true&w=majority";
    // var CONNECTION_URL = "mongodb+srv://cadarch:cadarch123@cluster0.cj44q.mongodb.net/cadarch?retryWrites=true&w=majority";
   mongoose.connect(CONNECTION_URL, { keepAliveInitialDelay: 300000 });
    // mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true });
    
    
    db.on('connected', () => {
        console.log('Succesfully connected to database')
    
    })
    db.on('error', (error) => {
        console.log(`Error occured connecting to database: ${error.message}`)
    })
}

export default connectDb