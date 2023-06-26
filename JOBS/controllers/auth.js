const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // const { name, email, password } = req.body;

  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  // if (!name || !email || !password) {
  //   throw new BadRequestError("please provide name email and password");
  // }

  // const tempUser={name,email,password:hashPassword}

  const user = await User.create(req.body);

  // const token = await jwt.sign(
  //   { userId: user._id, name: user.name },
  //   "jwtSecret",
  //   { expiresIn: "30d" }
  // );

  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  
  const { email, password } = req.body;

  if(!email||!password){
    throw new BadRequestError('please provide email and password')
  }

  const user=await User.findOne({email})

  if(!user){
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPasswordCorrect=await user.comparePassword(password)

   if (!isPasswordCorrect) {
     throw new UnauthenticatedError("Invalid credentials");
   }

  const token=user.createJWT();
  res.status(StatusCodes.OK).json({user:{name:user.name},token})

};

module.exports = { register, login };
