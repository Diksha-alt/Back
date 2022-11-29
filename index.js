const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/userRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/newcollection", () => {
  // console.log("its connected")
});

app.use("/new", router);

app.listen(5000);
