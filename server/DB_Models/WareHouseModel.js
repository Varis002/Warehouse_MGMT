const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code:{
    type: String,
    required: true,
  },
  id:{
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  space_available: {
    type: Number,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  cluster: {
    type: String,
    required: true,
  },
  is_registered:{
    type: Boolean,
    required: true,
  },
  is_live: {
    type: Boolean,
    required: true,
  },
  customFields: [
    {
      fieldName: {
        type: String,
        required: false,
      },
      fieldValue: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
      },
    },
  ],
},{timestamps: true});

module.exports = mongoose.model('WarehouseModel', warehouseSchema);

