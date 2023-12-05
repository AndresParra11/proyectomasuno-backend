const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
    },
    typeID: {
      type: String,
      required: false,
    },
    identificationNumber: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    cellphone: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },

    dateOfExpedition: { type: String, required: false },
    nameContactEmergency: { type: String, required: false },
    kinship: { type: String, required: false },
    cellphoneContactEmergency: { type: String, required: false },
    addressContactEmergency: { type: String, required: false },
    nickname: { type: String, required: false },
    cellphoneJob: { type: String, required: false },
    emailJob: { type: String, required: false },
    height: { type: String, required: false },
    skinTone: { type: String, required: false },
    hairLength: { type: String, required: false },
    hairColor: { type: String, required: false },
    breastType: { type: String, required: false },
    breastSize: { type: String, required: false },
    physicalBuild: { type: String, required: false },
    buttType: { type: String, required: false },
    buttSize: { type: String, required: false },
    modalityJob: { type: String, required: false },
    atHome: { type: String, required: false },
    extraPrice: { type: String, required: false },
    zonesJob: { type: Object, required: false },
    otherZoneJob: { type: String, required: false },
    halfHourPrice: { type: String, required: false },
    oneHourPrice: { type: String, required: false },
    twoHourPrice: { type: String, required: false },
    allDayPrice: { type: String, required: false },
    extrasServices: { type: Object, required: false },
    lingerie: { type: String, required: false },
    valueLingerie: { type: String, required: false },
    others: { type: String, required: false },
    valueOthers: { type: String, required: false },
    profileType: { type: String, required: false },
    descriptionAdvertiser: { type: String, required: false },
    paymentType: { type: String, required: false },
    numberAccount: { type: String, required: false },
    confirmNumberAccount: { type: String, required: false },
    experienceType: { type: String, required: false },
    profileStatus: { type: String, required: false },
    images: { type: Object, required: false },
    selectedData: { type: Object, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
