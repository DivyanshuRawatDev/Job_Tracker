const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken)
      return res.status(400).json({ message: "Invalid Request" });

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.log("Error while authorize user : " + error.message);
  }
};

module.exports = {authorization}
