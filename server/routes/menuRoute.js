const express = require('express');
const route = express.Router();
const Menu = require('../Controllers/MenuController');

route.get('/allproduct/:classify', async (req, res) => {
    const { classify } = req.params
    let data = await Menu.getData(classify);
    if (data === null) {
        res.status(404).send({
            message: 'Không có sản phẩm nào'
        });
        return
    }
    res.status(200).send(data);
})

route.get('/product', async (req, res) => {
    console.log(req.query)
    Menu.getaData(`${req.query.classify}/${req.query.category}/${req.query.key}`, res);
})

route.post('/addproduct/', (req, res) => {
    const { data, classify } = req.body;

    Menu.addData(`${classify}/${data.category}`, data, res);
})

route.post('/repairproduct', (req, res) => {
    const { data, key, classify } = req.body;

    Menu.repairData(`${classify}/${data.category}`, data, key, res)
})

route.post('/deleteproduct/', (req, res) => {
    const { category, key, classify } = req.body;
    Menu.deleteData(`${classify}/${category}`, key, res)
})

route.post('/oderoption', (req, res) => {
    const { data, key, classify } = req.body;
    Menu.repairData(`${classify}/${data.category}`, data, key, res)
})

route.get('/category', (req, res) => {
    const { classify } = req.query;
    Menu.getKeyOfParent(classify, res)
})
module.exports = route;