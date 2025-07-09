const express = require("express");
require("dotenv").config({});
const { connection } = require("./database/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const userAuthRoute = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const conversationRoute = require("./routes/conversation.routes");
const messageRoute = require("./routes/message.routes");

const { authorization } = require("./middlewares/authorization");
const { initilizedSocket } = require("./socket/socket");

const app = express();
const server = http.createServer(app);
// app.use(cors({  origin: "https://job-tracker-xlbc.vercel.app", credentials: true }));
app.use(cors({ origin: ["http://localhost:5173","https://job-tracker-zulr.onrender.com"], credentials: true }));

app.use(express.json());
app.use(cookieParser());

//auth
app.use("/api/auth", userAuthRoute);
app.use("/api/company", authorization, companyRoutes);
app.use("/api", authorization, conversationRoute);
app.use("/api", authorization, messageRoute);

//test
app.get("/", authorization, (req, res) => {
  res.send("Running");
});

const PORT = process.env.PORT || 3000;

connection()
  .then(() => {
    server.listen(PORT, () => {
      console.log("server is running on port : " + PORT);
      initilizedSocket(server);
    });
  })
  .catch((err) => console.log("Error while connect db : " + err.message));
