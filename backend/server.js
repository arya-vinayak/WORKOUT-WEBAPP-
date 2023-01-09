
require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts.js')

//mongodb
const mongoose = require('mongoose');

//express app
const app = express()

//middleware function
app.use(express.json())

app.use((req,res,next)=>
{
    console.log(req.path,req.method);
    next();
})

//request routes
app.use('/api/workouts',workoutRoutes)

//connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(()=>
{
    //mongoose.set('strictQuery', true);
    //listen for requests
    app.listen(process.env.PORT,()=>
    {
        console.log("Connected to the database & Listening on port ",process.env.PORT);
    })
})

.catch((error)=>{
    console.log(error);
})


