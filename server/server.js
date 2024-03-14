require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const myFirstSecret = process.env.FIRST_SECRET_KEY

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));  
require('./config/mongoose.config');   
require('./routes/user.routes')(app);
require('./routes/movie.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})