const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schedule = new Schema(
  {
    advertiser: {
      type: Object,
      required: true,
    },
    client: {
      type: Object,
      required: true,
    },
    schedule: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedules", Schedule);
