require('dotenv/config'); //env file required
const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const authJwt=require("./controller/auth")
const error_handler=require('./controller/error_handler')

//require api
const api=process.env.API_URL

//routes
const userRoutes = require('./routes/users');

//middleware
app.use(authJwt())
app.use(error_handler)
app.use(express.json()); //parse request body as json
app.use(bodyParser.urlencoded({ extended: true }));  // parse request body
app.use(bodyParser.json())
app.use(`${api}/users`, userRoutes);

//handling errors
app.use((err, req, res, next) => {
    console.log(`Error:${err.message}`);
    res.status(400).send({ error: err.message });
});

//Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Database connected!!")).catch((err) => console.log(err));

//PORT
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
