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

const modifyStatusPayment = async (req, res) => {
  try {
    const { id } = req.params; // Usa req.params.id en lugar de req.body._id
    const { statusPayment } = req.body;

    if (!id || !statusPayment) {
      return res.status(400).json({
        success: false,
        error: "You must provide both 'id' and 'statusPayment'",
      });
    }

    const schedule = await Schedule.findById(id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        error: "Schedule not found",
      });
    }

    schedule.schedule.statusPayment = statusPayment;
    await schedule.save().then(() => {
      return res.status(200).json({
        success: true,
        data: schedule,
        message: "Schedule date modified successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getSchedules,
  createSchedule,
  modifyStatusPayment,
};
