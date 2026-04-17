const express = require("express");
const app = express();

app.use(express.json());

const port = 8080;
app.get('/',(req , res) => {
    res.send("server is running on port 8080");
})

app.listen(8080 , ()=>{
    console.log('Server running on port 3000');
})