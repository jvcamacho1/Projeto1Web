const moongose = require("mongoose");
const LoginSchema = new moongose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

module.exports = moongose.model("Login", LoginSchema);
