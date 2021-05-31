const express=require('express');
const app= express();
const port = 5000;

const cors = require("cors");

const user = require('./src/user/user');
const lcm = require('./src/lcm/lcm');
 console.log(user);
 console.log(lcm);

//middleware
app.use(cors());
app.use(express.json()); 

//routes
user.userRoutes(app);
lcm.lcmRoutes(app);

app.listen(5000, () =>{
 console.log(`server is listing on port ${port}`)
})