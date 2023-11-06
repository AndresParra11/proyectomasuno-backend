const User = require("../models/user");

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  const user = new User(body);

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        uid: user.uid,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ uid: req.params.uid }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.uid = body.uid;
    user.email = body.email;
    user.name = body.name;
    user.lastname = body.lastname;
    user.userType = body.userType;
    user.typeID = body.typeID;
    user.identificationNumber = body.identificationNumber;
    user.dateOfBirth = body.dateOfBirth;
    user.cellphone = body.cellphone;
    user.address = body.address;
    user.city = body.city;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          uid: user.uid,
          name: user.name,
          email: user.email,
          lastname: user.lastname,
          userType: user.userType,
          typeID: user.typeID,
          identificationNumber: user.identificationNumber,
          dateOfBirth: user.dateOfBirth,
          city: user.city,
          address: user.address,
          cellphone: user.cellphone,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ uid: req.params.uid }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUserByUid = async (req, res) => {
  console.log("obteniendo user...s");
  await User.findOne({ uid: req.params.uid }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByUid,
};
