const express = require('express');
const { CreateNewOder, CreateListFoodOder, DeleteFood, DeleteOder } = require('../Controllers/OderControllers');
const { addData, database } = require('../firebase/handlingRealtime');
const route = express.Router();

route.get('/:tablekey', (req, res) => {
    const { keyOder } = req.params
    CreateNewOder(keyOder, res)
})

//api add a food for table
route.post('/:tableKey', (req, res) => {
    const data = req.body;
    const tablekey = req.params.tableKey
    CreateListFoodOder(`Oder/${tablekey}`, data, res)
})

route.get('/deletefood/:tableKey/:productKey', (req, res) => {
    const { tableKey, productKey } = req.params;
    DeleteFood(`Oder/${tableKey}`, productKey, res)
})

route.get('/deletetable/:tableKey/', (req, res) => {
    const { tableKey } = req.params;
    DeleteOder(`Oder/${tableKey}`, res)
})


module.exports = route