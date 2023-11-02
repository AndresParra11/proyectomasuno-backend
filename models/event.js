const mongoose = require('mongoose');
//const clients = require('./client');
const Schema = mongoose.Schema
const Client = require('../models/event')

const Event = new Schema(
    {
        code: { type: String, unique: true },
        kollaCodeId: { type: String },
        password: { type: String },
        name: { type: String },
        region: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        client: { type: Schema.Types.ObjectId, ref: 'clients' },
        status: { type: String },
        logo: { type: String },
        badgeId: { type: Number },
        hasCheckin: { type: Boolean },
        hasRegistration: { type: Boolean },
        hasAttendanceList: { type: Boolean },
        hasSessionAttendance: { type: Boolean },
        location: { type: String },
        coordinates: { type: String },
        description: { type: String },
    },
    { timestamps: true },
)

module.exports = mongoose.model('events', Event)