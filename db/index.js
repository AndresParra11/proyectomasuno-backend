const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://proyectomasuno:<password>@proyectomasuno.0xy2fxm.mongodb.net/proyectomasuno?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    user: "proyectomasuno",
    pass: "NY3RaYKZdb8CA09O",
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
