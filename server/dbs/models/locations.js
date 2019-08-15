const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const LocationSchema = new Schema({
  hotCities: {
    type: Array,
    require: true
  },
  cities: {
    type: Object,
    require: true
  }
})

module.exports = mongoose.model('Location', LocationSchema) // model create Model
