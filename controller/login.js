const Login = require("../model/login");
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

class LoginController {
  async postLogin(req, res) {
    const exists = await Login.exists({
      username: req.body.username,
      password: req.body.password,
    });
    if (exists) {
      const login = await Login.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      const token = jwt.sign(
        {
          login,
        },
        "huehuehuehue"
      );
      return res.send({ token });
    } else {
      return res.send({ message: "Usuário não cadastrado" });
    }
  }
  async registerUser(req, res) {
    const exists = await Login.exists({ username: req.body.username });
    if (exists) {
      return res.json({ message: "Usuário já cadastrado" });
    } else {
      const newUser = new Login({ ...req.body, role: "user" });
      const savedUser = await newUser.save();
      res.send(savedUser);
    }
  }

  async getRole(req, res) {
    checkForAuth(req, res);
    const { role } = req.user.login;
    return res.send({ role });
  }
}

module.exports = new LoginController();
