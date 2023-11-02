const express = require('express'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),
  fileUpload = require('./lib/index'),
  db = require('./db'),
  router = require('./routes/router'),
  fs = require('fs'),
  config = require('./configs/config'),
  app = express(),
  apiPort = 80,
  serverPath = config.serverPath;

app.set('llave', config.llave);

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, app.get('llave'), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: 'Token no proveída.'
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',rutasProtegidas, router)
app.set('view engine', 'ejs');

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


app.get('/media/uploads', function (req, res) {

  //const pathUploads = '/Users/usuario/Documents/GitHub/AttendIQ-backend/uploads';
  const pathUploads = config.pathUploads;
  let fileName = req.query.image;
  let route = `${pathUploads}/${fileName}`

  try {
    if (fs.existsSync(route)) {
      res.sendFile(route);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }

})

app.post('/safety/auth', (req, res) => {
  if (req.body.contrasena === config.passAuth && req.body.usuario === config.userAuth) {
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('llave'), {});
    res.json({
      mensaje: 'Autenticación correcta',
      token: token
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" })
  }
})

app.post('/api/upload',rutasProtegidas, function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.logo;

  //uploadPath = '/Users/usuario/Documents/GitHub/AttendIQ-backend/uploads/' + sampleFile.name;
  uploadPath = config.pathUploads + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(__dirname);
    }

    res.json({ path: serverPath + 'media/uploads?image=' + sampleFile.name, otherInfo: { dir: __dirname } });
  });
});