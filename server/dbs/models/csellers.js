const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const CSellerSchema = new Schema({
  id: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  score: {
    type: Number,
    require: true
  },
  serviceScore: {
    type: Number,
    require: true
  },
  foodScore: {
    type: Number,
    require: true
  },
  rankRate: {
    type: Number,
    require: true
  },
  ratingCount: {
    type: Number,
    require: true
  },
  minPrice: {
    type: Number,
    require: true
  },
  deliveryPrice: {
    type: Number,
    require: true
  },
  deliveryTime: {
    type: Number,
    require: true
  },
  bulletin: {
    type: String,
    require: true
  },
  supports: {
    type: Array,
    require: true
  },
  infos: {
    type: Array,
    require: true
  },
  pics: {
    type: Array,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  sellCount: {
    type: Number,
    require: true
  }
})

module.exports = mongoose.model('CSeller', CSellerSchema) // model create Model
