const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db").user;





exports.signup = async (req, res) => {
  const { login, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);


  const user = await User.create({
    login: login,
    password: hash
  })

 
  res.send("Success");
};

exports.signin = async (req, res) => {
  const {login, password } = req.body
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  let user = await User.findOne({
    where: {
      login: login
    }
  });

  if (!user) {
    res.status(404).send({ message: "User not found!" });
  }
  let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    res.status(404).send({ accsessToken: null, message: "Password invalid!" });
  }

  let token = jwt.sign({ id: user.id }, '1243', {
    expiresIn: 86400,
  });

  res.status(200).send({
    userId: user.id,
    username: user.login,
    accsessToken: token,
  });
};
