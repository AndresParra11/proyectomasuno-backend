const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event_Status = new Schema(
    {
        name: { type: String, required: true },
        status: {
            type: String,
            enum: ['Pending',
                'Live',
                'Sunset',
                'Cancelled'
            ]
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('events_status', Event_Status)

// case scheduled = "Scheduled"
//     case canceled = "Canceled"
//     case inProgress = "In Progress"
//     case pnHold = "On Hold"
//     case stopped = "Stopped"
//     case completed = "Completed"
//     case verified = "Verified"
//     case closed = "Closed"
//     case completedAndVerified = "Completed and Verified"