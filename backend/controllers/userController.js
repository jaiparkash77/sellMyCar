const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

//Register a user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendToken(user, 201, res);
};

//Login a user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter Email & Password",
    });
  }

  // find user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  sendToken(user, 200, res);
};

//Logout User
exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
