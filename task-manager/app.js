const express = require("express");
const app = express();
const taskroutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
//middleware

// app.use(express.urlencoded)
app.use(express.json());
app.use(express.static("./public"));

//routes


app.use("/api/v1/tasks", taskroutes);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log("server is listening"));
  } catch (error) {
    console.log(error);
  }
};

start();
