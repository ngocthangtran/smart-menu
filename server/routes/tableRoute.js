const express = require('express');
const route = express.Router();
const qr = require('qr-image')
const database = require('../firebase/handling')

route.get('/qrimg', (req, res) => {
    var code = qr.image('https://www.facebook.com/tranthangit/', { type: 'png' });
    // res.type('png');
    // code.pipe(res);
})

route.post('/createtable/:nametable', (req, res)=>{
    const data = req.body;
    database.addData(`Tables`,data,res)
})

module.exports = route;