require('dotenv').config();

module.exports = {
    llave: process.env.KEY,
    serverPath: process.env.SERVERPATH,
    userAuth: process.env.USERAUTH,
    passAuth: process.env.PASSAUTH,
    pathUploads: process.env.PATHUPLOADS,
}