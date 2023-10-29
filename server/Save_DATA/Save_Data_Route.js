const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Warehouse = mongoose.model("WarehouseModel");
const fs = require('fs');

const rawData = fs.readFileSync('./warehouse.json');
const warehouseData = JSON.parse(rawData)

router.get('/data', (req, res) => {
    // res.json({ Data: warehouseData });
    // console.log(warehouseData);
    Warehouse.insertMany(warehouseData)
    .then((result)=>{
        console.log(result);
        res.json({ Data: result });
    })
    .catch((error) => {
        console.log(error);
        res.json({error: error});
    });
})

module.exports = router;
