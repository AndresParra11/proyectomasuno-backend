const Schedule = require("../models/schedule");

createSchedule = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a schedule",
    });
  }

  const schedule = new Schedule(body);

  if (!schedule) {
    return res.status(400).json({ success: false, error: err });
  }

  schedule
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        client: schedule.client.name,
        advertiser: schedule.advertiser.nikcname,
        schedule: schedule.schedule.date,
        message: "Schedule created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Schedule not created!",
      });
    });
};

getSchedules = async (req, res) => {
  await Schedule.find({}, (err, schedules) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!schedules.length) {
      return res
        .status(404)
        .json({ success: false, error: `Schedule not found` });
    }
    return res.status(200).json({ success: true, data: schedules });
  }).catch((err) => console.log(err));
};

module.exports = {
  getSchedules,
  createSchedule,
};
