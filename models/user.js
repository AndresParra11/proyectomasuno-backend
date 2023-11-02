const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true,
    unique: true
  }
},
  { timestamps: true },
)

module.exports = mongoose.model('users', User)
