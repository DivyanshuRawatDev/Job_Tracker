const express = require("express");
require("dotenv").config({});
const { connection } = require("./database/db");
const cookieParser = require("cookie-parser");
const userAuthRoute = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const { authorization } = require("./middlewares/authorization");

const app = express();

app.use(express.json());
app.use(cookieParser());

//auth
app.use("/api/auth", userAuthRoute);
app.use("/api/company", authorization, companyRoutes);

//test
app.get("/", authorization, (req, res) => {
  res.send("Running");
});

const PORT = process.env.PORT || 3000;

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port : " + PORT);
    });
  })
  .catch((err) => console.log("Error while connect db : " + err.message));
