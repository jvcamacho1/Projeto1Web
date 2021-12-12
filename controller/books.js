const Books = require("../model/books");
const jwt = require("jsonwebtoken");

const checkForAuth = (req, res) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, "huehuehuehue", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
    });
  } else {
    return res.sendStatus(401);
  }
};

class BooksController {
  async bookRegister(req, res) {
    checkForAuth(req, res);
    const exists = await Books.exists({
      author: req.body.author,
      title: req.body.title,
    });

    const { role } = req.user.login;

    if (role !== "admin") {
      return res.sendStatus(403);
    }

    if (exists) {
      return res.send({ message: "Livro já cadastrado" });
    } else {
      const newBook = new Books(req.body);
      const saveBook = await newBook.save();
      res.send(saveBook);
    }
  }

  async findAllBooks(req, res) {
    checkForAuth(req, res);
    const data = await Books.find();
    if (data) {
      return res.send(data);
    } else {
      return res.send({ message: "Ocorreu um erro com a requisição" });
    }
  }

  async findBook(req, res) {
    checkForAuth(req, res);
    const book = await Books.findOne({ title: req.query.title });
    if (book) {
      return res.send(book);
    } else {
      return res.send({ message: "Livro não encontrado" });
    }
  }
}

module.exports = new BooksController();
