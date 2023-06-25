//check username,password in post (login) request
//if exist create new JWT
//send back to front-end

//setup authentication so only the request with JWT can access the dashboard
// require('dotenv').config()

const jwt = require("jsonwebtoken");
const costumAPIError = require("../errors/custom-error");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new costumAPIError("pls provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  //   console.log(req.headers);
  console.log(req.user);
  const luckynumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `here is authorized data , your lucky number is ${luckynumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
