const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const WareHouseModel = require('../DB_Models/WareHouseModel');
const Warehouse = mongoose.model("WarehouseModel");

//get all warehouse data
router.get('/warehouse/data', (req, res) => {
    Warehouse.find()
        .then((data) => {
            res.status(200).json({ message: "WareHouse data found", data: data });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error getting warehouse data", error: error});
        })
})

//get warehouse details by id
router.get('/warehouse/details/:id', (req, res) => {
    const id = req.params.id;
    Warehouse.findOne({ _id: id })
        .then((data) => {
            res.status(200).json({ message: "WareHouse details found", data: data });
        })
        .catch((error) => {
            res.status(401).json({ message: "Warehouse data error", err: error })
        });
})

//update warehouse details by id
router.put('/warehouse/update/:id', (req, res) => {
    const warehouse_id = req.params.id;
    const { name, code, id, city, space_available, type, cluster, is_registered, is_live , customFields} = req.body;

    if (!name || !code || !id || !city || !space_available || !type || !cluster ||
        typeof is_registered !== 'boolean' || typeof is_live !== 'boolean') {
        return res.status(402).json({ error: "Please fill all mandatory details" });
    }

    Warehouse.findOneAndUpdate(
        { _id: warehouse_id },
        { $set: { name, code, id, city, space_available, type, cluster, is_registered, is_live ,customFields} },
        { new: true }
    )
        .then((warehouseinDB) => {
            if (!warehouseinDB) {
                return res.status(404).json({ error: "Warehouse not found" });
            }
            res.status(200).json({ message: "Updated successfully", data: warehouseinDB });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error while saving the changes: " + error.message });
        });
});

//add the custom fields
router.post('/warehouse/custom/:id',(req,res)=>{
    const id = req.params.id
    const { fieldName , fieldValue} = req.body;
    if(!fieldName||!fieldValue){
        return res.status(404).json({ error:"Please fill all mandatory feilds"});
    }
    WareHouseModel.findById(id)
    .then((warehouse)=>{
        if(!warehouse){
            return res.status(404).json({ error:"Warehouse not found"});
        }
        warehouse.customFields.push({fieldName,fieldValue})
        warehouse.save()
        .then((data)=>{
            res.status(200).json({message:`Custom field ${fieldName} was successfully saved`,data:data});
        })
        .catch((error) =>{
            res.status(500).json({message:"Error occured",error:error})
        })
    })
    .catch((error) =>{
        res.status(500).json({message:"Error occured",error:error});
    });
})





module.exports = router