const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const HomeSchema = new Schema({
  code: {
    type: Number,
    require: true
  },
  gray_switch: {
    type: Number,
    require: true
  },
  sequence: {
    type: Number,
    require: true
  },
  brand_type: {
    type: Number,
    require: true
  },
  method: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  gray_url: {
    type: String,
    require: true
  },
  skip_protocol: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  first_tag_codes: {
    type: Array,
    require: true
  },
  second_tag_codes: {
    type: Array,
    require: true
  },
  bubble: {
    type: Object,
    require: true
  }
})

module.exports = mongoose.model('Home', HomeSchema) // model create Model
