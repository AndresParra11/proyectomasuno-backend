const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://duratex:<password>@duratex-3d.a7zm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, user: 'duratex', pass:'1nf0s3g.00' }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;
