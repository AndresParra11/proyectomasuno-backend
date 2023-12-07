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
      type: {
        date: { type: String, required: true },
        time: { type: String, required: true },
        statusPayment: { type: String, required: true },
        services: { type: Array, required: true },
        timeService: { type: String, required: true },
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedules", Schedule);
