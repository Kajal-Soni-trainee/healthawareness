const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("./services/worker");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
const route = require("./routes/route");
const passport = require("passport");
const cron = require("node-cron");
const { sendNotification } = require("./middlewares/sendNoti");
const { generateReport } = require("./controllers/medi_schedule");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials","true")
  
  next();
};
app.use(allowCrossDomain);
app.use("/", route);
app.listen(port, () => {
  console.log("port listen on ", port);
});
// app.use(cors({
//     origin:"http://localhost:8080",
// }));
cron.schedule("* * * * *", () => {
  sendNotification();
  // generateReport();
});
cron.schedule("0 8 * * */6", () => {
     generateReport();
});
