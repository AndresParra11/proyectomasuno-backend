const Event = require('../models/event')

createEvent = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a event',
        })
    }

    const event = new Event(body)

    if (!event) {
        return res.status(400).json({ success: false, error: err })
    }

    event
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: event._id,
                code: event.code,
                message: 'Event created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })
        })
}

updateEvent = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Event.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Event not found!',
            })
        }
        event.code = body.code
        event.kollaCodeId = body.kollaCodeId
        event.password = body.password
        event.name = body.name
        event.startDate = body.startDate
        event.endDate = body.endDate
        event.status = body.status
        event.logo = body.logo
        event.badgeId = body.badgeId
        event.hasCheckin = body.hasCheckin
        event.hasRegistration = body.hasRegistration
        event.hasAttendanceList = body.hasAttendanceList
        event.hasSessionAttendance = body.hasSessionAttendance
        event.location = body.location
        event.coordinates = body.coordinates
        event.description = body.description

        event
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event._id,
                    message: 'Event updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Event not updated!',
                })
            })
    })
}

deleteEvent = async (req, res) => {
    await Event.findOneAndDelete({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }

        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}

getEventByCode = async (req, res) => {
    await Event.findOne({ code: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }
        return res.status(200).json({ success: true, data: event })
    }).populate('client').catch(err => console.log(err))
}

getEvents = async (req, res) => {
    const eventsInfo = [];
    const client = '';
    await Event.find({}, (err, events) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!events.length) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }
        //return res.status(200).json({ success: true, data: events, clients: "jose" })
        return res.status(200).json({ success: true, data: events})
    }).populate('client').catch(err => console.log(err))
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventByCode
}