const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors())
app.use(bodyparser.urlencoded({extended: true}));
app.use(fileUpload());

//Route imports 
const user = require('./routes/userRoute');
const addCar = require('./routes/carRoute');

app.use("/api/v1", user);
app.use("/api/v1",addCar);



module.exports = app;