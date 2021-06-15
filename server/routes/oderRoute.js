const express = require('express');
const route = express.Router();

route.get('/:tablekey', (req, res)=>{
    console.log(req.params)
})

module.exports = route