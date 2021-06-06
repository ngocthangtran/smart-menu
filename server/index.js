const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

require('dotenv').config();

const menuRoute = require('./routes/menuRoute');

const PORT = process.env.PORT

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(cors())
app.use('/menu', menuRoute);


app.listen(PORT, ()=>{
    console.log(`App listen PORT ${PORT}`)
})