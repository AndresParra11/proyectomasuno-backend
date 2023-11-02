const User = require('../models/user')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                uid: user.uid,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ uid: req.params.uid }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.uid = body.uid
        user.email = body.email
        user.name = body.name
        user.last_name = body.last_name
        user.company = body.company
        user.ocuppation = body.ocuppation
        user.speciality = body.speciality
        user.country = body.country
        user.city = body.city
        user.address = body.address
        user.phone = body.phone
        user.id_type = body.id_type
        user.id = body.id
        user.accept_privacy = body.accept_privacy
        user.accept_newsletter = body.accept_newsletter

        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    last_name: user.last_name,
                    company: user.company,
                    ocuppation: user.ocuppation,
                    speciality: user.speciality,
                    country: user.country,
                    city: user.city,
                    address: user.address,
                    phone: user.phone,
                    id_type: user.id_type,
                    id: user.id,
                    accept_privacy: user.accept_privacy,
                    accept_newsletter: user.accept_newsletter,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ uid: req.params.uid }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserByUid = async (req, res) => {
    console.log("obteniendo user...s")
    await User.findOne({ uid: req.params.uid }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserByUMail = async (req, res) => {
    console.log("obteniendo user...s")

    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to find user',
        })
    }


    await User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByUid,
    getUserByUMail

}