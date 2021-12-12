const moongose = require("mongoose");
const BooksSchema = new moongose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = moongose.model("Books", BooksSchema);
