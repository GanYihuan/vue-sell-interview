const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const GoodSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  foods: {
    type: Array,
    require: true
  },
  type: {
    type: Number,
    require: true
  }
})

module.exports = mongoose.model('Good', GoodSchema) // model create Model
