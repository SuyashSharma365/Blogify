// const express = require("express");
// const connectDB = require("./config/db"); // adjust path if needed
// // const app = express();

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();
// const User = require("./models/User");
// const app = express();
// app.use(express.json());

// connectDB().then(() => {
//   console.log("Starting server...");

// const port = 8080;
// app.get('/',(req , res) => {
//     res.send("server is running on port 8080");

// })

// app.post('/', async (req , res)=>{
//     const {username , email , password} = req.body;
//     const existingUser = await User.findOne({username});
    
//     if(existingUser){
//         return res.status(400).json({message : 'User already exists'});
//     }
    
//     const hashedPassword = await bcrypt.hash(password , 10);
    
//     const user = await User.create({
//         username,
//         email,
//         password : hashedPassword,
//         role:'admin'
//     });

//     res.send({message : 'done'});
// })


// app.listen(8080 , ()=>{
//     console.log(process.env.MONGO_URI);
//     console.log('Server running on port 8080');
// })



const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./config/db"); 
const User = require("./models/User");

const app = express();
app.use(express.json());

// ❗ CALL DB FIRST
connectDB().then(() => {
  console.log("Starting server...");

  const port = 8080;

  app.get("/", (req, res) => {
    res.send("Server is running on port 8080");
  });

  app.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });

      res.json({ message: "User created", user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});