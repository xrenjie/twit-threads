const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URL;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const tweetRouter = require("./routes/tweet");
const userRouter = require("./routes/user");
app.use("/tweets", tweetRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
