const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        nombre: { type: String, required: true },
        emailUsuario: { type: String, required: true},
        ambiente: { type: String, required: true},
        muebles: { type: Array, required: true },
        estado: { type: Boolean, required: true },
        predefinido: { type: Boolean, required: true },
        texturaPiso: { type: String, required: true},
        texturaMeson: { type: String, required: false},
        img: { type: String, required: false},

    },
    { timestamps: true },
)

module.exports = mongoose.model('projects', Project)