const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const OrderSchema = new Schema({
  sellerName: {
    type: String,
    require: true
  },
  sellerImage: {
    type: String,
    require: true
  },
  menu: {
    type: Array,
    require: true
  },
  number: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  }
})

module.exports = mongoose.model('Order', OrderSchema) // model create Model
