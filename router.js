const express = require("express");
const routes = express.Router();
const jwt_middleware = require("express-jwt");

const LoginController = require("./controller/login");
const BooksController = require("./controller/books");

routes.post("/login", LoginController.postLogin);
routes.post("/register", LoginController.registerUser);

routes.post("/books/register", BooksController.bookRegister);
routes.get("/books/findAll", BooksController.findAllBooks);
routes.get("/books/find", BooksController.findBook);

routes.get("/role", LoginController.getRole);

module.exports = routes;
