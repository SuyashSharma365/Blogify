// const mongoose = require('mongoose');
// require("dotenv").config();

// const connectDB = async () => {
//     try{
//         await mongoose.connect("mongodb+srv://2k23cs2314112:admin123@cluster0.0jzej91.mongodb.net/blogify?retryWrites=true&w=majority");
//         console.log("MongoDB connect sucessfully");
//     }catch(error){
//         console.error('DB connection error: ',error.message);
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("Connecting to MongoDB...");

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("❌ DB ERROR:");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;