const project = require('../models/project')
const Project = require('../models/project')

createProject = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a project',
    })
  }

  const project = new Project(body)

  if (!project) {
    return res.status(400).json({ success: false, error: err })
  }

  project
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        uid: project.uid,
        id: project._id,
        message: 'Project created!',
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Project not created!',
      })
    })
}

updateProject = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Project.findOne({ _id: req.params.id }, (err, project) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Project not found!',
      })
    }
    project.nombre = body.nombre
    project.emailUsuario = body.emailUsuario
    project.ambiente = body.ambiente
    project.img = body.img
    project.muebles = body.muebles
    project.estado = body.estado
    project.predefinido = body.predefinido
    project.texturaPiso = body.texturaPiso
    project.texturaMeson = body.texturaMeson

    project
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: project._id,
          nombre: project.nombre,
          owner: project.owner,
          ambiente: project.ambiente,
          img: project.img,
          muebles: project.muebles,
          estado: project.estado,
          predefinido: project.predefinido,
          texturaPiso: project.texturaPiso,
          texturaMeson: project.texturaMeson,
          message: 'Project updated!',
        })
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Project not updated!',
        })
      })
  })
}

deleteProject = async (req, res) => {
  await Project.findOneAndDelete({ _id: req.params.id }, (err, project) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: `Project not found` })
    }

    return res.status(200).json({ success: true, data: project })
  }).catch((err) => console.log(err))
}

getProjectById = async (req, res) => {
  await Project.findOne({ _id: req.params.id }, (err, project) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: `Project not found` })
    }
    return res.status(200).json({ success: true, data: project })
  }).catch((err) => console.log(err))
}

getProjects = async (req, res) => {
  await Project.find({}, (err, projects) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!projects.length) {
      return res
        .status(404)
        .json({ success: false, error: `Project not found` })
    }
    return res.status(200).json({ success: true, data: projects })
  }).catch((err) => console.log(err))
}
getProjectsTitlesByOwner = async (req, res) => {
  await Project.find({ owner: req.params.owner }, (err, projects) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!projects.length) {
      return res
        .status(404)
        .json({ success: false, error: `Project not found` })
    }
    var titlesProjects = projects
      .filter((project) => {
        return project.status == true
      })
      .map((project) => {
        const newProject = {
          _id: project._id,
          name: project.name,
          ambient: project.ambient,
        }
        return newProject
      })
    return res.status(200).json({ success: true, data: titlesProjects })
  }).catch((err) => console.log(err))
}

getProjectsPresetsByAmbient = async (req, res) => {
  await Project.find({ ambient: req.params.ambient }, (err, projects) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!projects.length) {
      return res
        .status(404)
        .json({ success: false, error: `Projects not found` })
    }
    return res.status(200).json({
      success: true,
      data: projects.filter((project) => {
        return project.status && project.preset
      }),
    })
  }).catch((err) => console.log(err))
}

getProjectsByOwner = async (req, res) => {
  Promise.all([
    Project.find({ emailUsuario: req.params.owner }),
    Project.find({ emailUsuario: 'predeterminado' }),
    Project.find({ emailUsuario: 'init' }),
  ])
    .then(([projects, projectsPred, projectsInit]) => {
      var allProjects = projects.concat(projectsPred, projectsInit)
      return res.status(200).json({ success: true, data: allProjects })
    })
    .catch((err) => console.log(err))
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectsByOwner,
  getProjectsTitlesByOwner,
  getProjectsPresetsByAmbient,
  getProjectById,
}
