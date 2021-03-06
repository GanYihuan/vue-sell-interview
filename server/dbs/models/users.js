﻿const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('User', UserSchema) // model create Model
