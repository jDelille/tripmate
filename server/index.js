const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require('axios')
dotenv.config();

// set up express server

const app = express();
const PORT = process.env.PORT || 3535;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cranky-goldstine-76b293.netlify.app"],
    credentials: true,
  })
);

app.use(cookieParser())

app.listen(PORT, () => console.log(`Server running on port ${PORT}!!`))

// set up routers 
app.use("/trip", require("./routers/tripRouter"));
app.use('/auth', require('./routers/userRouter'));

// connect to mongoDB 

mongoose.connect(
 process.env.MDB_CONNECT_STRING,
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 }, 
 (error) => {
  if (error) return console.log(error)
  console.log("Connected to mongoDB!")
 }
)