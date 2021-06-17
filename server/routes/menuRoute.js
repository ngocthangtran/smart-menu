const express = require('express');
const route = express.Router();
const Menu = require('../Controllers/MenuRouter');

route.get('/allproduct', async (req, res) => {
    let data = await Menu.getData('product');
    res.status(200).send(data);
})

route.get('/product', async (req, res) => {
    console.log(req.query)
    Menu.getaData(`product/${req.query.category}/${req.query.key}`, res);
})

route.post('/addproduct/', (req, res) => {
    const data = req.body;
    Menu.addData(`product/${data.category}`, data, res);
})

route.post('/repairproduct', (req, res) => {
    const data = req.body;
    Menu.repairData(`product/${data.category}`, data, data.key, res)
})

route.get('/deleteproduct/', (req, res) => {
    const { category, key } = req.query;
    Menu.deleteData(`product/${category}`, key, res)
})

module.exports = route;