const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const RatingSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  rateTime: {
    type: Number,
    require: true
  },
  deliveryTime: {
    type: Number,
    require: true
  },
  score: {
    type: Number,
    require: true
  },
  rateType: {
    type: Number,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  recommend: {
    type: Array,
    require: []
  }
})

module.exports = mongoose.model('Rating', RatingSchema) // model create Model
