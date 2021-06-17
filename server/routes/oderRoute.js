const express = require('express');
const { CreateNewOder, CreateListFoddOder } = require('../Controllers/OderControllers');
const { addData, database } = require('../firebase/handlingRealtime');
const route = express.Router();

route.get('/:tablekey', (req, res)=>{
    const {tablekey} = req.params
    CreateNewOder(tablekey, res)
})

route.post('/:tableKey', (req, res)=>{
    const data= req.body;
    const tablekey = req.params.tableKey
    CreateListFoddOder(`Oder/${tablekey}`, data, res)
})

module.exports = route