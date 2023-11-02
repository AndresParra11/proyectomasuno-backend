const Event_Status = require('../models/event_status')

createEvent_Status = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a event_status',
        })
    }

    const event_status = new Event_Status(body)

    if (!event_status) {
        return res.status(400).json({ success: false, error: err })
    }

    event_status
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: event_status._id,
                message: 'Event_Status created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event_Status not created!',
            })
        })
}

updateEvent_Status = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Event_Status.findOne({ _id: req.params.id }, (err, event_status) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Event_Status not found!',
            })
        }
        event_status.name = body.name
        event_status.status = body.status

        event_status
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event_status._id,
                    message: 'Event_Status updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Event_Status not updated!',
                })
            })
    })
}

deleteEvent_Status = async (req, res) => {
    await Event_Status.findOneAndDelete({ _id: req.params.id }, (err, event_status) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event_status) {
            return res
                .status(404)
                .json({ success: false, error: `Event_Status not found` })
        }

        return res.status(200).json({ success: true, data: event_status })
    }).catch(err => console.log(err))
}

getEvent_StatusById = async (req, res) => {
    await Event_Status.findOne({ _id: req.params.id }, (err, event_status) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event_status) {
            return res
                .status(404)
                .json({ success: false, error: `Event_Status not found` })
        }
        return res.status(200).json({ success: true, data: event_status })
    }).catch(err => console.log(err))
}

getEvents_Status = async (req, res) => {
    await Event_Status.find({}, (err, event_statuss) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!event_statuss.length) {
            return res
                .status(404)
                .json({ success: false, error: `Event_Status not found` })
        }
        return res.status(200).json({ success: true, data: event_statuss })
    }).catch(err => console.log(err))
}

module.exports = {
    createEvent_Status,
    updateEvent_Status,
    deleteEvent_Status,
    getEvents_Status,
    getEvent_StatusById

}