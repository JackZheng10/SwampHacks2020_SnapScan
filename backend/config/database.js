const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI || require("./keys").MongoURI;

module.exports = {
  start: function() {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(console.log("MongoDB connected successfully"))
      .catch(err => console.log("nooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"));
  },
  connection: mongoose.connection
};
