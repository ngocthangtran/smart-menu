const express = require('express');
const app = express();
const server = require('http').createServer(app);

require('dotenv').config();


const menuRoute = require('./routes/menuRoute');
const PORT = process.env.PORT

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use('/menu', menuRoute);


server.listen(PORT, ()=>{
    console.log(`App listen PORT ${PORT}`)
})