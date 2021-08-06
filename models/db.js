const mongoose = require("mongoose");

// To fix all deprecation warnings according to mongoose documentation
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const database = {
  connect: function () {
    const dbURI =
      "mongodb+srv://admin:admin@jkl.8e9pu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose
      .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) => console.log("Connected to db"))
      .catch((err) => console.log(err));
  },
};

module.exports = database;