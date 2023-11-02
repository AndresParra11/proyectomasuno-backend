const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    name: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    last_name: { type: String, required: true },
    company: { type: String, required: false },
    ocuppation: { type: String, required: true },
    speciality: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    id_type: { type: String, required: false },
    id: { type: Number, required: false },
    accept_privacy: { type: Boolean, required: true },
    accept_newsletter: { type: Boolean, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('users', User)
