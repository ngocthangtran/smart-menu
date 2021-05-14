const express = require('express');
const app = express();
const server = require('http').createServer(app);

require('dotenv').config();
const menuRoute = require('./routes/menuRoute');

const port = process.env.PORT

app.use('/menu', menuRoute);

server.listen(port, ()=>{
    console.log(`App listen port ${port}`)
})