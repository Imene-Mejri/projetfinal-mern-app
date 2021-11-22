//create a server
const express = require("express");
const app = express();
const cors = require("cors");
//dotenv
require("dotenv").config();
//import the connect function
const connectDB = require("./config/connectDB");
connectDB();
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", require("./routes/users"));
app.use("/api/auth", require("./routes/controller"));
app.use("/api/auth/client/project", require("./routes/projects"));

app.use("/api/auth/client/innvoice", require("./routes/innvoiceClient"));
app.use("/api/auth/freelancer/project", require("./routes/projects"));

app.use(
  "/api/auth/freelancer/innvoice",
  require("./routes/innvoiceFreelancer")
);
app.use("/api/auth/admin/project", require("./routes/projects"));

//listen to the port
const Port =process.env.PORT ||  8080;
app.listen(Port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${Port} `);
});
