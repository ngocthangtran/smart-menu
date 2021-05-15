const express = require('express');
const route = express.Router();
const firebase = require('../firebase/handling');

route.get('/',async (req, res) => {
    let data = await firebase.getData('product');
    res.status(200).send(data);
})

module.exports = route;