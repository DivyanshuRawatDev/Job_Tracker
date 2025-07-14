const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { admin } = require("../utils/firebase");

const userSignup = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(500)
        .json({ message: "User already present. Please Login" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    let profilePic;
    if (gender === "male") {
      profilePic = "https://cdn-icons-png.freepik.com/256/6997/6997484.png";
    } else {
      profilePic =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2DTMJ8c7OjQabbW3c-qqikkhN_K216qf-Q&s";
    }

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      gender,
      profilePic
    });
    console.log(newUser);

    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.log("Error while signup : " + error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Wrong credentials" });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({
          message: "This user signed up with Google. Please use Google Login.",
        });
    }

    const decodedPassword = await bcrypt.compare(password, user.password);

    if (!decodedPassword) {
      res.status(400).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24,
    });

    const { password: _, ...passwordRemovedUser } = user._doc;

    return res
      .status(200)
      .json({ message: "User LoggedIn", data: passwordRemovedUser });
  } catch (error) {
    console.log("Error while login : " + error.message);
  }
};

const googleAuthLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        name: name,
        email: email,
        profilePic: picture,
      });

      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      message: user ? "User logged in" : "User signed up",
      data: user,
    });
  } catch (error) {
    console.log("Error while google auth : " + error.message);
  }
};

const authVerify = async (req, res) => {
  try {
    return res.status(200).json({ message: "Verified", user: req.userId });
  } catch (error) {
    console.log("Error while auth verification : " + error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  userSignup,
  userLogin,
  googleAuthLogin,
  authVerify,
  userLogout,
};
