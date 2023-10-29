const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose')
const Mongo_URL = process.env.MONGODB_URI
const cors = require('cors');

//Connect to Mongo
mongoose.connect(Mongo_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDb: ' + error);
    })

//using Mongo Models
require('./DB_Models/WareHouseModel.js');

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json())

//routes
// app.use(require('./Save_DATA/Save_Data_Route.js'))  USE THIS FOR ONLY FIRST TIME TO STORE THE GIVEN WAREHOUSE DATA IN MONGODB
app.use(require('./Routes/warehouse_routes.js'))


app.get('/hello', (req, res) => {
    res.send('Hello');
})


app.listen(5000, () => {
    console.log('listening on port 5000');
})