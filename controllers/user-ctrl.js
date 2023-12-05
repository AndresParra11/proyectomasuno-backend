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
    user.name = body.name;
    user.lastname = body.lastname;
    user.email = body.email;
    user.uid = body.uid;
    user.userType = body.userType;
    user.typeID = body.typeID;
    user.identificationNumber = body.identificationNumber;
    user.dateOfBirth = body.dateOfBirth;
    user.cellphone = body.cellphone;
    user.city = body.city;
    user.address = body.address;
    user.dateOfExpedition = body.dateOfExpedition;
    user.nameContactEmergency = body.nameContactEmergency;
    user.kinship = body.kinship;
    user.cellphoneContactEmergency = body.cellphoneContactEmergency;
    user.addressContactEmergency = body.addressContactEmergency;
    user.nickname = body.nickname;
    user.cellphoneJob = body.cellphoneJob;
    user.emailJob = body.emailJob;
    user.height = body.height;
    user.skinTone = body.skinTone;
    user.hairLength = body.hairLength;
    user.hairColor = body.hairColor;
    user.breastType = body.breastType;
    user.breastSize = body.breastSize;
    user.physicalBuild = body.physicalBuild;
    user.buttType = body.buttType;
    user.buttSize = body.buttSize;
    user.modalityJob = body.modalityJob;
    user.atHome = body.atHome;
    user.extraPrice = body.extraPrice;
    user.zonesJob = body.zonesJob;
    user.otherZoneJob = body.otherZoneJob;
    user.halfHourPrice = body.halfHourPrice;
    user.oneHourPrice = body.oneHourPrice;
    user.twoHourPrice = body.twoHourPrice;
    user.allDayPrice = body.allDayPrice;
    user.extrasServices = body.extrasServices;
    user.lingerie = body.lingerie;
    user.valueLingerie = body.valueLingerie;
    user.others = body.others;
    user.valueOthers = body.valueOthers;
    user.profileType = body.profileType;
    user.descriptionAdvertiser = body.descriptionAdvertiser;
    user.paymentType = body.paymentType;
    user.numberAccount = body.numberAccount;
    user.confirmNumberAccount = body.confirmNumberAccount;
    user.experienceType = body.experienceType;
    user.profileStatus = body.profileStatus;
    user.images = body.images;
    user.selectedData = body.selectedData;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          uid: user.uid,
          name: user.name,
          userType: user.userType,
          nickname: user.nickname,

          message: "User updated!",
        });
      })
      .catch((error) => {
        console.log("error: ", error);
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

updateProfileStatus = async (req, res) => {
  const { profileStatus } = req.body;

  try {
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    user.profileStatus = profileStatus;
    if (profileStatus === "aprobada") {
      user.userType = "advertiser";
    }
    await user.save();

    return res.status(200).json({
      success: true,
      user,
      message: "User profileStatus updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to update profileStatus",
    });
  }
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

getAdvertisers = async (req, res) => {
  try {
    const users = await User.find({ userType: "advertiser" }).exec();
    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, error: "No advertisers found" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  updateProfileStatus,
  deleteUser,
  getUsers,
  getAdvertisers,
  getUserByUid,
};
