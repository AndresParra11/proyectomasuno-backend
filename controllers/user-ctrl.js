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
    user.zoneJob = body.zoneJob;
    user.extraPrice = body.extraPrice;
    user.otherZoneJob = body.otherZoneJob;
    user.halfHourPrice = body.halfHourPrice;
    user.oneHourPrice = body.oneHourPrice;
    user.twoHourPrice = body.twoHourPrice;
    user.allDayPrice = body.allDayPrice;
    user.valueVaginalCondon = body.valueVaginalCondon;
    user.valueVaginalSinCondon = body.valueVaginalSinCondon;
    user.valueAnalCondon = body.valueAnalCondon;
    user.valueAnalSinCondon = body.valueAnalSinCondon;
    user.valueOralCondon = body.valueOralCondon;
    user.valueOralSinCondon = body.valueOralSinCondon;
    user.valueKisses = body.valueKisses;
    user.valueTouchBreast = body.valueTouchBreast;
    user.valueTouchButtocks = body.valueTouchButtocks;
    user.valueMasturbation = body.valueMasturbation;
    user.valueTouchVagina = body.valueTouchVagina;
    user.valueInsertFingersVagina = body.valueInsertFingersVagina;
    user.valueInsertToysOrObjectsVagina = body.valueInsertToysOrObjectsVagina;
    user.valueReceivingSexoOral = body.valueReceivingSexoOral;
    user.lingerie = body.lingerie;
    user.valueLingerie = body.valueLingerie;
    user.others = body.others;
    user.valueOthers = body.valueOthers;
    user.valueBasicPhotoPack = body.valueBasicPhotoPack;
    user.valuePremiumPhotoPack = body.valuePremiumPhotoPack;
    user.valueVideoPack = body.valueVideoPack;
    user.valuePhotoAndVideoPack = body.valuePhotoAndVideoPack;
    user.descriptionAdvertiser = body.descriptionAdvertiser;
    user.paymentType = body.paymentType;
    user.numberAccount = body.numberAccount;
    user.experienceType = body.experienceType;
    user.images = body.images;
    user.vaginalCondon = body.vaginalCondon;
    user.vaginalSinCondon = body.vaginalSinCondon;
    user.analCondon = body.analCondon;
    user.analSinCondon = body.analSinCondon;
    user.oralCondon = body.oralCondon;
    user.oralSinCondon = body.oralSinCondon;
    user.kisses = body.kisses;
    user.touchBreast = body.touchBreast;
    user.touchButtocks = body.touchButtocks;
    user.masturbation = body.masturbation;
    user.touchVagina = body.touchVagina;
    user.insertFingersVagina = body.insertFingersVagina;
    user.insertToysOrObjectsVagina = body.insertToysOrObjectsVagina;
    user.receivingSexoOral = body.receivingSexoOral;
    user.includeVaginalCondon = body.includeVaginalCondon;
    user.includeVaginalSinCondon = body.includeVaginalSinCondon;
    user.includeAnalCondon = body.includeAnalCondon;
    user.includeAnalSinCondon = body.includeAnalSinCondon;
    user.includeOralCondon = body.includeOralCondon;
    user.includeOralSinCondon = body.includeOralSinCondon;
    user.includeTouchVagina = body.includeTouchVagina;
    user.includeTouchBreast = body.includeTouchBreast;
    user.includeTouchButtocks = body.includeTouchButtocks;
    user.includeKisses = body.includeKisses;
    user.includeMasturbation = body.includeMasturbation;
    user.includeInsertFingersVagina = body.includeInsertFingersVagina;
    user.includeInsertToysOrObjectsVagina =
      body.includeInsertToysOrObjectsVagina;
    user.includeReceivingSexoOral = body.includeReceivingSexoOral;
    user.basicPhotoPack = body.basicPhotoPack;
    user.includeBasicPhotoPack = body.includeBasicPhotoPack;
    user.premiumPhotoPack = body.premiumPhotoPack;
    user.includePremiumPhotoPack = body.includePremiumPhotoPack;
    user.videoPack = body.videoPack;
    user.includeVideoPack = body.includeVideoPack;
    user.photoAndVideoPack = body.photoAndVideoPack;
    user.includePhotoAndVideoPack = body.includePhotoAndVideoPack;
    user.profileStatus = body.profileStatus;

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
