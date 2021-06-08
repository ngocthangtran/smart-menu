const { request } = require('express');
const express = require('express');
const route = express.Router();
const firebase = require('../firebase/handling');

route.get('/allproduct', async (req, res) => {
    let data = await firebase.getData('product');
    res.status(200).send(data);
})

route.get('/product', async (req, res) => {
    console.log(req.query)
    firebase.getaData(`product/${req.query.category}/${req.query.key}`, res);
})

route.post('/addproduct/', (req, res) => {
    const data = req.body;
    firebase.addData(`product/${data.category}`, data, res);
})

route.post('/repairproduct', (req, res) => {
    const data = req.body;
    firebase.repairData(`product/${data.category}`, data, data.key, res)
})

route.get('/deleteproduct', (req, res) => {
    const {key} = req.body;
    firebase.deleteData(`product/${data.category}`, key, res)
})

module.exports = route;