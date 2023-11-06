const express = require("express");

const UserCtrl = require("../controllers/user-ctrl");
const ProjectCtrl = require("../controllers/project-ctrl");
const EventCtrl = require("../controllers/event-ctrl");
const KollacodeEventCtrl = require("../controllers/kollacode_event-ctrl");
const Event_StatusCtrl = require("../controllers/event_status-ctrl");
const router = express.Router();

router.post("/user", UserCtrl.createUser);
router.put("/user/:uid", UserCtrl.updateUser);
router.delete("/user/:uid", UserCtrl.deleteUser);
router.get("/user/:uid", UserCtrl.getUserByUid);
router.get("/users", UserCtrl.getUsers);

router.post("/project", ProjectCtrl.createProject);
router.put("/project/:id", ProjectCtrl.updateProject);
router.delete("/project/:id", ProjectCtrl.deleteProject);
router.get("/project/:id", ProjectCtrl.getProjectById);
router.get("/projects", ProjectCtrl.getProjects);
router.get("/projectsbyowner/:owner", ProjectCtrl.getProjectsByOwner);
router.get(
  "/projectstitlesbyowner/:owner",
  ProjectCtrl.getProjectsTitlesByOwner
);
router.get(
  "/projectspresetsbyambient/:ambient",
  ProjectCtrl.getProjectsPresetsByAmbient
);

router.post("/event", EventCtrl.createEvent);
router.put("/event/:id", EventCtrl.updateEvent);
router.delete("/event/:id", EventCtrl.deleteEvent);
router.get("/event/:id", EventCtrl.getEventByCode);
router.get("/events", EventCtrl.getEvents);

router.post("/event_status", Event_StatusCtrl.createEvent_Status);
router.put("/event_status/:id", Event_StatusCtrl.updateEvent_Status);
router.delete("/event_status/:id", Event_StatusCtrl.deleteEvent_Status);
router.get("/event_status/:id", Event_StatusCtrl.getEvent_StatusById);
router.get("/events_status", Event_StatusCtrl.getEvents_Status);

module.exports = router;
